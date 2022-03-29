<template>
  <!-- 菜单管理 -->
  <div class="menu-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">菜单名称</div>
        <el-input class="erpsearchinput" placeholder="请输入菜单名称" clearable size="small" v-model="searchform.Title" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <!-- <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">搜索</el-button>
      </div> -->
      <div class="operate-top">
        <el-button size="small" v-if="$operatebtn(operates, 'Add')" class="addmenu erpbtn" @click="addmenu('Add')">新增菜单</el-button>
      </div>
    </div>
    <div class="content">
      <div class="menu-table">
        <vxe-table ref="multipleTable" v-loading="tableloading" class="vxeTable" fit auto-resize border=none max-height="600" highlight-hover-row :tree-config="treeConfig" :edit-config="{trigger: 'click', mode: 'row', showStatus: true}" :data.sync="tableData" @select-all="selectAllEvent" @select-change="selectChangeEvent">
          <vxe-table-column type="checkbox" align="left" width="100" title="全选" />
          <vxe-table-column field="Sort" align="center" title="排序" width="80" />
          <vxe-table-column field="Ico" align="center" title="菜单图标">
            <!-- eslint-disable-next-line -->
            <template v-slot="{row}">
              <svg-icon v-if="row.Ico" class="test" :icon-class="row.Ico" />
            </template>
          </vxe-table-column>
          <vxe-table-column field="Title" title="菜单名称" tree-node />
          <vxe-table-column field="LinkUrl" align="center" title="对应URL" min-width="180"/>
          <vxe-table-column field="Id" align="center" title="菜单ID" />
          <vxe-table-column field="Remark" align="center" title="备注" />
          <!-- <vxe-table-column field="OrgName" align="center" title="使用状态" /> -->
          <vxe-table-column field="size" align="center" title="操作">
            <template v-slot="{ row }">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','AddSublevel','AddSibling','MenuOperationSet','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="Modify(row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'AddSublevel')" @click.native="AddSubset(row,'AddSublevel')">添加子级</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'AddSibling')" @click.native="AddSibling(row,'AddSibling')">添加同级</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'MenuOperationSet')" @click.native="MenuOperationSetting(row,'MenuOperationSet')">菜单操作设置</el-dropdown-item>
                    <!-- <el-dropdown-item @click.native="Disable(row)">禁用</el-dropdown-item> -->
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
        <el-button size="small" class="erpdelete" v-if="$operatebtn(operates, 'Delete')" @click="deletes('Delete')">删除</el-button>
      </div>
    </div>
    <div class="dialog">
      <updatemenu :title="titlename" :visible="dialogvisible" :contentdata="contentdata" @closedialog="closedialog" @savedialog="savedialog"></updatemenu>
      <el-dialog :close-on-click-modal="false" :title="menutitle" :visible.sync="menuVisible" width="480px" :lock-scroll="false" custom-class="erpdialog menuset" @close="closedialog">
        <div class="check-box">
          <el-checkbox v-for="(item, index) in newmenulist" :key="index" v-model="item.ischeck">{{item.Title}}</el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="savemenu">保 存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { GetSysMenuList, AddSysMenu, EditSysMenu, DeleteSysMenu, GetSysOperationList, GetSysMenuOperationList, EditSysMenuOperation } from '@/api/SystemSetting.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import updatemenu from './components/UpdateMenu'
import { mapGetters } from 'vuex'
import qs from 'qs'
export default {
  components: {
    updatemenu
  },
  data () {
    return {
      searchform: {
        Title: ""
      },
      checked: false, // 全选的状态
      tableloading: false,
      sums: [], // 树状数据总条数
      treeConfig: {
        children: "children"
      },
      tableData: [],
      titlename: '',
      dialogvisible: false, // 是否打开弹框
      contentdata: {}, // 弹框的内容
      issave: false,
      setTablelist: [],
      Id: '', // 菜单Id
      newmenulist: [],
      getmenulist: [], // 获得已选择的操作
      menuVisible: false,
      menutitle: '菜单操作设置',
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    };
  },
  watch: {
    menuVisible (newvalue, oldvalue) {
      if (newvalue) {
        let data = {
          Id: this.Id,
          menuid: MenuIdDate(),
          operationcode: 1
        }
        GetSysMenuOperationList(qs.stringify(data)).then(response => {
          if (response.IsSuccess) {
            this.getmenulist = response.Data
            // 处理数据
            for (let i = 0; i < this.newmenulist.length; i++) {
              this.$set(this.newmenulist[i], 'ischeck', false)
              for (let j = 0; j < this.getmenulist.length; j++) {
                if (this.newmenulist[i].Id === this.getmenulist[j].OperationId) {
                  this.newmenulist[i].ischeck = true
                }
              }
            }
            console.log(this.newmenulist);
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'menulist',
    ]),
  },
  created () {
    // 获取列表数据
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getSysMenuList(this.operatiOBj)
    }

  },
  methods: {
    // 获取列表
    getSysMenuList (operat) {
      let data1 = {
        Title: this.searchform.Title,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      this.tableloading = true
      GetSysMenuList(qs.stringify(data1)).then(response => {
        if (response.IsSuccess) {
          this.tableData = response.Data
          this.rearlist(response.Data)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        this.tableloading = false
      })
    },
    rearlist (list) {
      if (list) {
        for (let i = 0; i < list.length; i++) {
          this.sums.push(list[i])
          if (list[i].children.length > 0) {
            this.rearlist(list[i].children)
          }
        }
      }
    },
    // 搜索
    searchtable () {
      this.getSysMenuList(this.operatiOBj)
    },
    // 新增菜单
    addmenu (str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '新建菜单'
      this.dialogvisible = true
      this.issave = true // 保存
      this.contentdata = {
        ParentId: 0,
        Title: '',
        LinkUrl: '',
        Ico: '',
        Sort: 1,
        Remark: ''
      }
    },
    // 全选
    selectall (boolean) {
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
    // 删除
    deletes (str) {
      var array = []
      if (this.setTablelist.length == 0) {
        this.$message({
          message: '你未选中任何操作！',
          type: 'warning'
        })
        return
      } else {
        for (let i = 0; i < this.setTablelist.length; i++) {
          array.push(this.setTablelist[i].Id)
        }
      }
      const operating = this.$operatedata(this.operates, str)
      array = array.join(',')
      let data1 = {
        IdArr: array,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('你确定删除选中的菜单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DeleteSysMenu(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getSysMenuList(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          hideLoading()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 表格头部全选
    selectAllEvent ({ selection, checked }) {
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
    selectChangeEvent ({ selection }) {
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
    Modify (e, str) {
      // 修改菜单
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '修改菜单'
      this.dialogvisible = true
      this.issave = false // 修改
      this.Id = e.Id
      this.contentdata = {
        ParentId: e.ParentId,
        Title: e.Title,
        LinkUrl: e.LinkUrl,
        Ico: e.Ico,
        Sort: e.Sort,
        Remark: e.Remark
      }
    },
    AddSubset (e, str) {
      // 添加子集
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '添加子菜单'
      this.dialogvisible = true
      this.issave = true // 保存
      this.contentdata = {
        ParentId: e.Id,
        Title: '',
        LinkUrl: '',
        Ico: '',
        Sort: 1,
        Remark: ''
      }
    },
    AddSibling (e, str) {
      // 添加同级菜单
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.titlename = '添加同级菜单'
      this.dialogvisible = true
      this.issave = true // 保存
      this.contentdata = {
        ParentId: e.ParentId,
        Title: '',
        LinkUrl: '',
        Ico: '',
        Sort: 1,
        Remark: ''
      }
    },
    MenuOperationSetting (e, str) {
      // 首先先获取一次所有的菜单,并把它存起来,判断是否为空,如果为空就再掉一次接口

      // if (this.menulist && this.menulist.length) {
      //   this.newmenulist = this.menulist
      //   this.menuVisible = true
      // } else {
      showLoading()
      this.Id = e.Id
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      let obj = {
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetSysOperationList(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$store.dispatch('systemsetting/getmenulist', response.Data)
          this.newmenulist = response.Data
          this.menuVisible = true
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
      // }
    },
    // 保存操作按钮
    savemenu () {
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      let operalist = []
      for (let i = 0; i < this.newmenulist.length; i++) {
        if (this.newmenulist[i].ischeck === true) {
          operalist.push(this.newmenulist[i].Id)
        }
      }
      console.log(operalist);
      let data1 = {
        Id: this.Id,
        OperationId: operalist.join(','),
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      EditSysMenuOperation(qs.stringify(data1)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '保存成功!',
            type: 'success'
          })
          this.menuVisible = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    Delete (e, str) {
      // 删除
      const operating = this.$operatedata(this.operates, str)
      let data1 = {
        IdArr: e.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('你确定删除选中的菜单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DeleteSysMenu(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getSysMenuList(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          hideLoading()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 关闭弹窗
    closedialog () {
      this.dialogvisible = false
    },
    // 提交保存
    savedialog (data) {
      console.log(data);
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      if (this.issave) {
        // 保存
        let data1 = {
          ParentId: data.ParentId,
          Title: data.Title,
          LinkUrl: data.LinkUrl,
          Sort: data.Sort,
          Ico: data.Ico,
          Remark: data.Remark,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        AddSysMenu(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '添加成功!',
              type: 'success'
            })
            this.dialogvisible = false
            this.getSysMenuList(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          hideLoading()
        })
      } else {
        // 修改
        let data1 = {
          Id: this.Id,
          ParentId: data.ParentId,
          Title: data.Title,
          LinkUrl: data.LinkUrl,
          Sort: data.Sort,
          Ico: data.Ico,
          Remark: data.Remark,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        EditSysMenu(qs.stringify(data1)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
            this.dialogvisible = false
            this.getSysMenuList(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    }
  }
};
</script>

<style lang="scss">
.test {
  color: $erp666;
}
.menu-container {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
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
  .dialog {
    .check-box {
      margin: 0 26px 0 26px;
      height: 290px;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      &::-webkit-scrollbar {
        width: 8px;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-track-piece {
        background-color: #fff;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 5px #a3b1cc;
        background: #a3b1cc;
      }

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px #a3b1cc;
        border-radius: 4px;
        background: #a3b1cc;
      }
      .el-checkbox {
        width: 50%;
        margin-right: 0;
        margin-bottom: 24px;
        .el-checkbox__inner {
          width: 16px;
          height: 16px;
          background-color: $erpcolor;
          // border-color: #638DF8;
          border: none;
          &::after {
            border: 2px solid #fff;
            border-left: 0;
            border-top: 0;
            height: 10px;
            left: 6px;
          }
        }
        .el-checkbox__label {
          color: $erp999;
        }
      }
    }
  }
}
</style>