//权限分组管理
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container" label-width="102px">
          <el-form-item label="分组名称">
            <el-input v-model="ListName" clearable suffix-icon="el-icon-search" class="select-input" placeholder="请输入分组名称进行查询" />
          </el-form-item>
          <el-form-item label="分组成员">
            <el-input v-model="ListMember" clearable suffix-icon="el-icon-search" class="select-input" placeholder="请输入分组成员进行查询" />
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="search">
            搜索
          </el-button>
        </el-form>

      </div>
      <div class="button-operation">
        <el-button class="operation-button" size="mini" round @click="handleCreate('Add')">
          新建分组
        </el-button>
      </div>
    </div>
    <div class="table-content">
      <div>
        <el-table ref="industrtTable" v-loading="tableloading" mini :data="RoleList" class="role-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="60" />
          <el-table-column align="center" prop="Name" label="分组名称" />
          <!-- <el-table-column align="center" prop="AppTypeText" label="分组成员" /> -->
          <el-table-column align="center" prop="Remark" label="备注" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','SetRights','Delete','Configuration']))">

                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item @click.native="sendList(scope.row)">配置人员</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')&&scope.row.Status==0" @click.native="StatusOn(scope.row,'Modify')">启用</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')&&scope.row.Status==1" @click.native="StatusOff(scope.row),'Modify'">禁用</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="handleEdit(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="roledetele(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="foot-operation" v-if="($operatebtns(operates,['Delete']))">
        <el-checkbox class="footcheck erpcheck" v-model="checked" @change="batchSelectAll(RoleList)">全选</el-checkbox>
        <el-button round class="operation-button del-button" v-if="$operatebtn(operates, 'Delete')" size="mini" @click="Alldelete('Delete')">删除</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <updataList :showAddrole="showAddrole" @closeGroup="closeGroup" :tempData="tempData" @groupSave="groupSave" :title="RoleTile"></updataList>
    <allocatePersonnel :showAddList="showAddList" @exit="exit" :treeData="treeData" @DialogSave="DialogSave" :treeList="treeList"></allocatePersonnel>
  </div>
</template>

<script>
import { GetSysGroupList, AddSysGroup, EditSysGroup,EditSysGroupStatus, GetSysGroup, DeleteSysGroup, GetSysUserByGroupId, AddSysUserGroup, GetSysOrgListAndUserInfoMerge } from '@/api/SystemSetting.js'
import updataList from './components/UpdataList'
import allocatePersonnel from './components/allocatePersonnel'
import { MenuIdDate } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    updataList,
    allocatePersonnel
  },
  data () {
    return {
      GroupId:'',
      showAddrole: false,
      RoleTile: '新建权限分组',
      multipleSelection: [], // 选中数据
      currentPage: 1,
      PageSize: 10,
      total: 0,
      checked: false,
      showAddList: false,
      treeData: [],
      RoleList: [],
      tableloading: false,
      configurationShow: false,
      ListName: '',
      ListMember: '',
      //   rules: {
      //     ListName: [
      //       { required: true, message: '请输入角色名称', trigger: 'blur' },
      //       { min: 3, message: '长度大于3个字符', trigger: 'blur' }
      //     ],
      //   },
      tempData: {},
      treeList: [],
      operates: [], // 权限列表
      operatiOBj: { // 父权限查看数据
        MenuId: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getList(this.operatiOBj)
    }
  },
  methods: {
    //启用
    StatusOn(e,str){
      const operating = this.$operatedata(this.operates, str)
      let obj={
        Id:e.Id,
        Status:1,
        menuid: operating.MenuId || MenuIdDate(),
        operationcode: operating.OperationCode || '1'
      }
      EditSysGroupStatus(obj).then(res=>{
        if(res.MessageCode==0){
          this.$message({
            type:'success',
            message:'启用成功'
          })
          this.getList(this.operatiOBj)
        }else{
          this.$message({
            type:'error',
            message:res.MessageContent
          })
        }
      })
    },
    //禁用
    StatusOff(e,str){
      console.log(e);
      const operating = this.$operatedata(this.operates, str)
      let obj={
        Id:e.Id,
        Status:0,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      EditSysGroupStatus(obj).then(res=>{
        if(res.MessageCode==0){
          this.$message({
            type:'success',
            message:'禁用成功'
          })
          this.getList(this.operatiOBj)
        }else{
          this.$message({
            type:'error',
            message:res.MessageContent
          })
        }
      })
    },
    DialogSave(e){
      const operating = this.$operatedata(this.operates, 'Add')
      e.GroupId=this.GroupId
      e.menuid= operating.MenuId,
      e.operationcode= operating.OperationCode
      AddSysUserGroup(e).then(res=>{
        if(res.MessageCode==0){
          this.$message({
            type:'success',
            message:'添加成功'
          })
          this.exit()
        }else{
           this.$message({
            type:'error',
            message:res.MessageContent
          })
        }
      })
    },
    // 获取分组列表
    getList (operat) {
      this.tableloading = true
      const obj = {
        Name: this.ListName,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid,
        operationcode: operat.OperationCode
      }
      GetSysGroupList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          // console.log(response.Data);
          this.RoleList = response.Data
          this.total = response.Total
          this.tableloading = false
        } else {
          this.RoleList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    getTree () {
      this.treeshow = true;
      var obj = {
        orgId: 0,
        menuid: MenuIdDate(),
        operationcode: '1',
      }
      GetSysOrgListAndUserInfoMerge(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.treeList = JSON.parse(JSON.stringify(response.Data))
          console.log(this.treeList);
        } else {
          this.treeList = []
          // this.RoleList = []
          // this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 搜索
    search () {
      this.currentPage = 1
      this.getList(this.operatiOBj)
    },
    handleSizeChange (val) {
      this.PageSize = val
      this.getList(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList(this.operatiOBj)
    },
    // 表头多选
    handleSelectionChange (value) {
      this.checked = value.length == this.RoleList.length
      this.multipleSelection = value
    },
    // 下方全选
    batchSelectAll (value) {
      this.$refs.industrtTable.toggleAllSelection(this.checked)
    },
    // 打开修改角色框
    handleEdit (data, str) {
      this.RoleTile = '修改权限分组'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSysGroup(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          console.log(this.tempData);
          this.showAddrole = true
          this.getList(this.operatiOBj)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 单个删除
    roledetele (value, str) {
      const operating = this.$operatedata(this.operates, str)
      // console.log(operating);
      const obj = {
        Id: value.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteSysGroup(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量删除
    Alldelete (str) {
      if (this.multipleSelection.length) {
        let arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].Id)
        }
        const operating = this.$operatedata(this.operates, str)
        const obj = {
          Id: arr.join(','),
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        this.$confirm('此操作将批量删除选中的分组', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteSysGroup(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList(this.operatiOBj)
            } else {
              this.$message({
                type: 'error',
                message: response.MessageContent
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的分组'
        })
      }
    },
    sendList (value) {
      this.GroupId=value.Id
      this.showAddList = true;
      this.treeData=[]
      this.getTree()
      // const operating = this.$operatedata(this.operates, str)
      // console.log(operating);
      const obj = {
        GroupId: value.Id,
        menuid: MenuIdDate(),
        operationcode: '1',
        // menuid: operating.MenuId,
        // operationcode: operating.OperationCode
      }
      // console.log(obj);
      GetSysUserByGroupId(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.treeData = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 打开添分组框
    handleCreate (str) {
      // const operating = this.$operatedata(this.operates, str)
      // localStorage.setItem('operating', JSON.stringify(operating))
      this.RoleTile = '添加权限分组'
      this.showAddrole = true
    },
    // 保存添加分组
    groupSave (data) {
      // console.log(data);
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      if (data.Id) {
        EditSysGroup(qs.stringify(data)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改分组成功!'
            })
            this.showAddrole = false
            this.getList(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      } else {
        AddSysGroup(qs.stringify(data)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '添加分组成功!'
            })
            this.showAddrole = false
            this.getList(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }
    },
    // 关闭角色窗口
    closeGroup (value) {
      this.showAddrole = value
    },
    exit (value) {
      this.showAddList = value
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.industry-box {
  height: 100%;
}
.table-header {
  .el-row {
    .el-col {
      .grid-content {
        line-height: 50px;
        padding: 20px;
        span {
          min-width: 100px;
          display: inline-block;
        }
        .select-box {
          display: inline-block;
          box-sizing: border-box;
          width: calc(100% - 150px);
          .el-select {
            width: 100%;
          }
        }
        .buttons {
          margin-left: 70%;
        }
      }
    }
  }
}
.industry-box {
  .industry-box-header {
    .industry-box-form {
      el-form {
        .el-form-item__label {
          font-size: 25px !important;
          padding: 0;
        }
      }
    }
  }
}
.pagePermissions,
.dataPermissions {
  .checkAlls {
    /deep/ .el-checkbox__input {
      .el-checkbox__inner {
        width: 16px;
        height: 16px;
        border-radius: 10px;
        border: 1px solid #638df8;
        &::before {
          background-color: #fff;
          height: 3px;
          top: 5px;
        }
      }
    }
    /deep/ .is-checked {
      .el-checkbox__inner {
        width: 16px;
        height: 16px;
        background: #638df8;
      }
    }
    /deep/ .is-indeterminate {
      .el-checkbox__inner {
        background: #638df8;
        &::before {
          background-color: #fff;
          height: 4px;
          top: 5px;
        }
      }
    }
  }
  .el-checkbox {
    min-width: 85px;
    margin-right: 15px;
  }
  .el-checkbox-group {
    display: inline-block;
    /deep/ .el-checkbox {
      &:nth-last-child(1) {
        margin-right: 0px;
      }
      .el-checkbox__input {
        .el-checkbox__inner {
          border-radius: 10px;
          width: 16px;
          height: 16px;
          border: 1px solid #638df8;
        }
      }
      .is-checked {
        .el-checkbox__inner {
          width: 16px;
          height: 16px;
          background: #638df8;
        }
      }
    }
  }
  .AddButton {
    margin: 0 10px;
    &:hover {
      color: #638df8;
    }
  }
}
// .dataPermissions {
// }
.roleDiglog {
  /deep/.el-form-item {
    margin-bottom: 19px;
    .el-input__inner {
      height: 30px;
      line-height: 30px;
      width: 210px;
    }
    textarea {
      width: 210px;
    }
    .Serialnumber {
      .el-input__inner {
        width: 90px;
      }
    }
  }
}
</style>
