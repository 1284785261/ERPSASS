<template>
  <div class="team-container">
    <!-- <h2>团队管理</h2> -->
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">组织名称</div>
        <el-input class="erpsearchinput" placeholder="请输入组织名称" clearable size="small" v-model="searchform.OrgName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon cursor-pointer" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="operate-top">
        <el-button class="erpbtn" @click="Synchronous('Add')">同步钉钉组织架构</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'Add')" class="addmenu erpbtn" @click="addteam('Add')">新建团队</el-button>
      </div>
    </div>
    <div class="content">
      <div class="team-table">
        <vxe-table ref="multipleTable" v-loading="tableloading" class="vxeTable" fit auto-resize border=none highlight-hover-row row-id="Id"
          :tree-config="{children: 'children', expandRowKeys: expandRowKeys}" :edit-config="{trigger: 'click', mode: 'row', showStatus: true}" :data.sync="tableData" @select-all="selectAllEvent"
          @select-change="selectChangeEvent">
          <vxe-table-column type="checkbox" align="left" width="10%" title="全选" />
          <vxe-table-column field="OrgName" title="团队名称" tree-node />
          <vxe-table-column field="Id" align="center" title="部门ID" />
          <!-- <vxe-table-column field="OrgName" align="center" title="级别" /> -->
          <vxe-table-column field="Remark" align="center" title="备注" />
          <vxe-table-column align="center" title="操作">
            <template v-slot="{ row }">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','AddSublevel','AddSibling','ViewOrgMember','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="Modify(row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'AddSublevel')" @click.native="AddSubset(row,'AddSublevel')">添加子级</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'AddSibling')" @click.native="AddSibling(row,'AddSibling')">添加同级</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'ViewOrgMember')" @click.native="ViewTeam(row,'ViewOrgMember')">查看团队人员</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="Delete(row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="operate-bottom" v-if="($operatebtns(operates,['Delete']))">
        <el-checkbox class="allcheck erpcheck" v-model="checked" @change="selectall(checked)">全选</el-checkbox>
        <el-button size="small" v-if="$operatebtn(operates, 'Delete')" class="erpdelete" @click="deletes('Delete')">删除</el-button>
      </div>
    </div>
    <div class="dialog">
      <updateteam :title="titlename" :visible="dialogvisible" :contentdata="contentdata" @closedialog="closedialog" @savedialog="savedialog"></updateteam>
    </div>
  </div>
</template>

<script>
import updateteam from './components/UpdateTeam'
import {
  AddSysOrg,
  GetSysOrgList,
  EditSysOrg,
  DeleteSysOrg,
  ExecutOrgSynch,
} from '@/api/SystemSetting.js'
import {
  MenuIdDate,
  showLoading,
  hideLoading,
} from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    updateteam,
  },
  data() {
    return {
      searchform: {
        OrgName: '',
      },
      checked: false, // 全选的状态
      tableloading: false,
      expandRowKeys: [],
      tableData: [],
      sums: [], // 树状数据总条数
      titlename: '',
      dialogvisible: false, // 是否打开弹框
      contentdata: {}, // 弹框的内容
      issave: false,
      setTablelist: [],
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: '',
        OperationCode: 'Query',
      },
    }
  },
  created() {
    // 获取列表数据
    // this.rearlist(this.tableData)
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getSysOrgList(this.operatiOBj)
    }
  },
  methods: {
    // 获取组织结构列表
    getSysOrgList(operat) {
      let data1 = {
        OrgName: this.searchform.OrgName,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1',
      }
      this.tableloading = true
      GetSysOrgList(qs.stringify(data1)).then((response) => {
        if (response.IsSuccess) {
          this.tableData = response.Data
          this.rearlist(response.Data)
          this.tableloading = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
      })
    },
    rearlist(list) {
      if (list) {
        for (let i = 0; i < list.length; i++) {
          this.sums.push(list[i])
          if (list[i].children.length > 0) {
            this.rearlist(list[i].children)
          }
        }
      }
    },
    searchtable() {
      this.getSysOrgList(this.operatiOBj)
    },
    addteam(str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '新建团队'
      this.dialogvisible = true
      this.issave = true // 保存
      this.contentdata = {
        OrgName: '',
        ParentId: 0,
        Id: '',
        Sort: '',
        Remark: '',
        Status: 1,
      }
    },
    // 全选
    selectall(boolean) {
      console.log(this.$refs.multipleTable)

      this.$refs.multipleTable.setRowExpansion(['20'], true)
      if (boolean) {
        this.$refs.multipleTable.setSelection(this.tableData, true)
        for (let i = 0; i < this.tableData.length; i++) {
          this.setTablelist.push(this.tableData[i])
        }
      } else {
        this.$refs.multipleTable.clearSelection()
        this.setTablelist = []
      }
    },
    //同步钉钉组织架构
    Synchronous(str) {
      let param = {
        menuid: MenuIdDate(),
        operationcode: 1,
      }
      showLoading()
      ExecutOrgSynch(qs.stringify(param)).then((response) => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '同步钉钉组织架构成功!',
            type: 'success',
          })
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
        
      })
    },
    // 删除
    deletes(str) {
      const operating = this.$operatedata(this.operates, str)
      var array = []
      if (this.setTablelist.length == 0) {
        this.$message({
          message: '你未选中任何操作！',
          type: 'warning',
        })
        return
      } else {
        for (let i = 0; i < this.setTablelist.length; i++) {
          array.push(this.setTablelist[i].Id)
        }
      }
      array = array.join(',')
      let data1 = {
        IdArr: array,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
      }
      console.log(data1)

      this.$confirm('你确定删除选中的部门吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          DeleteSysOrg(qs.stringify(data1)).then((response) => {
            if (response.IsSuccess) {
              this.$message({
                message: '删除成功!',
                type: 'success',
              })
              this.dialogvisible = false
              this.getSysOrgList(this.operatiOBj)
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error',
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 表格头部全选
    selectAllEvent({ selection, checked }) {
      if (checked) {
        this.checked = true
        for (let i = 0; i < this.tableData.length; i++) {
          this.setTablelist.push(this.tableData[i])
        }
      } else {
        this.checked = false
        this.setTablelist = []
      }
    },
    selectChangeEvent({ selection }) {
      if (selection) {
        this.setTablelist = selection
      }
      if (selection.length == this.sums.length) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    // 表格操作
    Modify(e, str) {
      // 修改团队
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '修改团队'
      this.dialogvisible = true
      this.issave = false // 修改
      this.contentdata = {
        OrgName: e.OrgName,
        ParentId: e.ParentId,
        Id: e.Id,
        Sort: e.Sort,
        Remark: e.Remark,
        Status: e.Status,
      }
    },
    AddSubset(e, str) {
      // 添加子集
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '添加团队'
      this.dialogvisible = true
      this.issave = true
      this.contentdata = {
        OrgName: '',
        ParentId: e.Id,
        Id: '',
        Sort: '',
        Remark: '',
        Status: 1,
      }
    },
    AddSibling(e, str) {
      // 添加同级
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '添加团队'
      this.dialogvisible = true
      this.issave = true
      this.contentdata = {
        OrgName: '',
        ParentId: e.ParentId,
        Id: '',
        Sort: '',
        Remark: '',
        Status: 1,
      }
    },
    ViewTeam(e, str) {
      // 查看团队成员
      this.$router.push({
        path: '/SystemSetting/CheckStaff',
        query: {
          Id: e.Id,
          OrgName: e.OrgName,
        },
      })
    },
    Delete(e, str) {
      // 删除
      const operating = this.$operatedata(this.operates, str)
      let data1 = {
        IdArr: e.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
      }
      console.log(data1)
      this.$confirm('你确定删除选中的部门吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          DeleteSysOrg(qs.stringify(data1)).then((response) => {
            if (response.IsSuccess) {
              this.$message({
                message: '删除成功!',
                type: 'success',
              })
              this.dialogvisible = false
              this.getSysOrgList(this.operatiOBj)
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error',
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 关闭弹窗
    closedialog() {
      this.dialogvisible = false
    },
    // 提交保存
    savedialog(data) {
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      if (this.issave) {
        // 保存
        let data1 = {
          OrgName: data.OrgName,
          ParentId: data.ParentId,
          Sort: data.Sort,
          Remark: data.Remark,
          Status: data.Status,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode,
        }
        console.log(data1)
        AddSysOrg(qs.stringify(data1)).then((response) => {
          if (response.IsSuccess) {
            this.$message({
              message: '添加成功！',
              type: 'success',
            })
            this.dialogvisible = false
            this.getSysOrgList(this.operatiOBj)
            this.treeConfig = {
              children: 'children',
              expandRowKeys: [response.Data.Id],
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error',
            })
          }
        })
      } else {
        // 修改
        let data1 = {
          OrgName: data.OrgName,
          Id: data.Id,
          Sort: data.Sort,
          Remark: data.Remark,
          Status: data.Status,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode,
        }
        console.log(data1)
        EditSysOrg(qs.stringify(data1)).then((response) => {
          if (response.IsSuccess) {
            this.$message({
              message: '修改成功！',
              type: 'success',
            })
            this.dialogvisible = false
            this.getSysOrgList(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error',
            })
          }
        })
      }
    },
  },
}
</script>

<style lang="scss">
.team-container {
  .search-bar {
    padding: 24px;
    // height: 80px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      .search-name {
        font-size: $f16;
        color: $erp666;
        font-weight: 700;
        display: inline-block;
        margin-right: 7px;
      }
      .el-input {
        display: inline-block;
        width: 216px;
      }
    }
  }
  .operate-top {
    float: right;
    .addmenu {
      width: 96px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 24px;
    border-radius: 8px 0px 0px 8px;
    .operate-bottom {
      margin-top: 32px;
      padding-left: 16px;
      .allcheck {
        margin-right: 16px;
      }
    }
  }
}
</style>