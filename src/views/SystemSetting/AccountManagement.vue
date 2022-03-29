<!-- 账号管理 -->
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container" label-width="80px">
          <el-form-item label="登录账号">
            <el-input v-model="searchObject.UserId" suffix-icon="el-icon-search" clearable class="select-input" placeholder="请输入登录账号" />
          </el-form-item>
          <el-form-item label="用户姓名">
            <el-input v-model="searchObject.UserName" clearable class="select-input" placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="启用状态">
            <el-select v-model="searchObject.Status" placeholder="请选择" size="mini" class="select-input">
              <el-option v-for="item in statusList" :key="item.label" :label="item.label" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="search">
            搜索
          </el-button>
        </el-form>

      </div>
      <div class="button-operation">
        <el-button class="operation-button" v-if="$operatebtn(operates, 'Add')" size="mini" round @click="handleCreate('Add')">
          添加账号
        </el-button>
      </div>
    </div>
    <div class="table-content">
      <div>
        <el-table ref="industrtTable" v-loading="tableloading" :data="getAccountList" class="role-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark"
          @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="60" />
          <el-table-column align="center" prop="UserId" label="登录账号" />
          <el-table-column align="center" prop="UserName" label="姓名" />
          <el-table-column align="center" prop="OrgList" width="200" label="所属部门" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.OrgList | OrgLists}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="PositionName" label="职位" />
          <el-table-column align="center" prop="RoleName" label="角色" />
          <el-table-column align="center" prop="Mobile" label="电话" />
          <el-table-column align="center" prop="Status" label="启用状态">
            <template slot-scope="scope">
              <span>{{scope.row.Status | Status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','Enabled','Disabled','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="handleEdit(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == 0 && $operatebtn(operates, 'Enabled')" @click.native="UploadStatus(scope.row,'Enabled')">启用</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == 1 && $operatebtn(operates, 'Disabled')" @click.native="UploadStatus(scope.row,'Disabled')">禁用</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="roledetele(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="foot-operation" v-if="($operatebtns(operates,['Delete']))">
        <el-checkbox class="footcheck erpcheck" v-model="checked" @change="batchSelectAll()">全选</el-checkbox>
        <el-button round class="operation-button del-button" v-if="$operatebtn(operates, 'Delete')" size="mini" @click="Alldelete('Delete')">删除</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
    <AddAccount :showAddaccount="showAddaccount" @closeAccount="closeAccount" :tempData="tempData" @AccountSave="AccountSave" :title="AccountTile"></AddAccount>
  </div>
</template>

<script>
import AddAccount from '@/components/SystemManagement/addAccount'
import {
  GetSysUserList,
  GetSysUserById,
  AddSysUser,
  EditSysUser,
  EditSysUserStatus,
  DeleteSysUser,
} from '@/api/SystemSetting.js'
import {
  MenuIdDate,
  showLoading,
  hideLoading,
} from '@/utils/CustomValidation.js'
import qs from 'qs'
const cityOptions = ['查看', '启用', '禁用']
export default {
  components: {
    AddAccount,
  },
  filters: {
    Status(value) {
      if (value == 1) {
        return '启用'
      } else {
        return '禁用'
      }
    },
    OrgLists(arr) {
      let OrgName = ''
      if (arr && arr.length > 0) {
        if (arr.length == 1) {
          OrgName = arr[0].OrgName
        } else {
          for (let i = 0; i < arr.length; i++) {
            OrgName += arr[i].OrgName + ','
          }
        }
      }else{
          OrgName = ''
      }
      return OrgName
    },
  },
  data() {
    return {
      tableloading: false,
      showAddaccount: false,
      AccountTile: '添加账号',
      searchObject: {
        UserId: '',
        UserName: '',
        Status: -1,
      },
      currentPage: 1,
      PageSize: 10,
      total: 0,
      tempData: {},
      multipleSelection: [], // 选中数据
      statusList: [
        {
          id: -1,
          label: '全部',
        },
        {
          id: 0,
          label: '禁用',
        },
        {
          id: 1,
          label: '启用',
        },
      ],
      checked: false,
      getAccountList: [],
      rules: {
        RoleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, message: '长度大于3个字符', trigger: 'blur' },
        ],
        Remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
      },
      operations: [], // 权限列表
      operatiOBj: {
        // 父权限查看数据
        MenuId: '',
        OperationCode: 'Query',
      },
    }
  },
  created() {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getAccount(this.operatiOBj)
    }
  },
  methods: {
    // 获取账号列表
    getAccount(operat) {
      this.tableloading = true
      const obj = {
        UserId: this.searchObject.UserId,
        UserName: this.searchObject.UserName,
        Status: this.searchObject.Status,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1',
      }
      GetSysUserList(qs.stringify(obj)).then((res) => {
        this.tableloading = false
        if (res.IsSuccess) {
          this.getAccountList = res.Data
          this.total = res.Total
        } else {
          this.getAccountList = []
          this.total = 0
          this.$message({
            message: res.MessageContent,
            type: 'error',
          })
        }
      })
    },
    closeAccount(value) {
      this.showAddaccount = value
    },
    // 搜索
    search() {
      this.currentPage = 1
      this.getAccount(this.operatiOBj)
    },
    // 表头多选
    handleSelectionChange(value) {
      this.checked = value.length == this.getAccountList.length
      this.multipleSelection = value
    },
    // 下方全选
    batchSelectAll() {
      this.$refs.industrtTable.toggleAllSelection(this.checked)
    },
    AccountSave(data) {
      console.log(data)
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      showLoading()
      if (data.Id) {
        EditSysUser(qs.stringify(data)).then((response) => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改账号信息成功!',
            })
            this.showAddaccount = false
            this.getAccount(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent,
            })
          }
        })
      } else {
        AddSysUser(qs.stringify(data)).then((response) => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '添加账号成功!',
            })
            this.showAddaccount = false
            this.getAccount(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent,
            })
          }
        })
      }
    },
    // 单个删除
    roledetele(value, str) {
      const operating = this.$operatedata(this.operates, str)
      const obj = {
        Id: value.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
      }
      this.$confirm('此操作将删除该账号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          DeleteSysUser(qs.stringify(obj)).then((response) => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.getAccount(this.operatiOBj)
            } else {
              this.$message({
                type: 'error',
                message: response.MessageContent,
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
    // 批量删除
    Alldelete(str) {
      if (this.multipleSelection.length) {
        let arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].Id)
        }
        const operating = this.$operatedata(this.operates, str)
        const obj = {
          Id: arr.join(','),
          menuid: operating.MenuId,
          operationcode: operating.OperationCode,
        }
        this.$confirm('此操作将批量删除选中的账号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            DeleteSysUser(qs.stringify(obj)).then((response) => {
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
                this.getAccount(this.operatiOBj)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent,
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
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的账号',
        })
      }
    },
    handleSizeChange(val) {
      this.PageSize = val
      this.getAccount(this.operatiOBj)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAccount(this.operatiOBj)
    },
    // 打开添加账号框
    handleCreate(str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.AccountTile = '添加账号'
      this.showAddaccount = true
      this.tempData = {}
    },
    // 打开修改账号框
    handleEdit(data, str) {
      this.AccountTile = '修改账号'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1',
      }
      GetSysUserById(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          console.log(this.tempData)
          this.tempData = response.Data
          //   this.tempData.data = {
          //     Id: data.OrgId,
          //     OrgName: data.OrgName
          //   }
          this.showAddaccount = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
      })
    },
    UploadStatus(data, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      let param = {
        Id: data.Id,
        Status: '',
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
      }
      let strPrompt = '',
        successPrompt = ''
      if (data.Status == '1') {
        param.Status = '0'
        strPrompt = '你确定禁用此账号吗?'
        successPrompt = '禁用账号成功！'
      } else if (data.Status == '0') {
        param.Status = '1'
        strPrompt = '你确定启用此账号吗?'
        successPrompt = '启用账号成功！'
      }
      this.$confirm(strPrompt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          EditSysUserStatus(qs.stringify(param)).then((response) => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: successPrompt,
              })
              this.getAccount(this.operatiOBj)
            } else {
              this.$message({
                type: 'error',
                message: response.MessageContent,
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作',
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/publicStyle.scss';
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
</style>
