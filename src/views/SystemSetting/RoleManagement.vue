//角色管理
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="RoleName" clearable suffix-icon="el-icon-search" class="select-input" placeholder="请输入角色名称" />
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="search">
            搜索
          </el-button>
        </el-form>

      </div>
      <div class="button-operation">
        <el-button class="operation-button" v-if="$operatebtn(operates, 'Add')" size="mini" round @click="handleCreate('Add')">
          添加角色
        </el-button>
      </div>
    </div>
    <div class="table-content">
      <div>
        <el-table ref="industrtTable" v-loading="tableloading" mini :data="RoleList" class="role-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="60" />
          <el-table-column align="center" prop="RoleName" label="角色名称" />
          <el-table-column align="center" prop="AppTypeText" label="角色类型" />
          <el-table-column align="center" prop="Remark" label="备注" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','SetRights','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="handleEdit(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'SetRights')" @click.native="OpenConfiguration(scope.row,'SetRights')">配置权限</el-dropdown-item>
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
    <!-- <el-dialog :close-on-click-modal="false" :title="textconfiguration" :visible.sync="configurationShow" width="620px" class="newDiglog">
      <el-form ref="form" class="filter-container" label-width="70px">
        <el-form-item label="页面权限">
          <div v-for="(item,index) in PermissionsData.pagePermissions" :key="index" class="pagePermissions">
            <el-checkbox v-model="item.checkAll" class="checkAlls" :indeterminate="isIndeterminate" @change="handleCheckAllChange">{{ item.project }}</el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
            </el-checkbox-group>
            <a class="AddButton">添加</a>
            <a class="AddButton">修改</a>
          </div>
        </el-form-item>
        <el-form-item label="数据权限">
          <div v-for="(item,index) in PermissionsData.dataPermissions" :key="index" class="dataPermissions">
            <el-checkbox v-model="item.checkAll" class="checkAlls" :indeterminate="isIndeterminate" @change="handleCheckAllChange">{{ item.project }}</el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="sassbtn" size="mini" round @click="dialogStatus==='create'?createData():updateData()">
          保存
        </el-button>
      </div>
    </el-dialog> -->
    <AddRole :showAddrole="showAddrole" @closeRole="closeRole" :tempData="tempData" @RoleSave="RoleSave" :title="RoleTile"></AddRole>
  </div>
</template>

<script>
import { GetSysRoleList, AddSysRole, EditSysRole, GetSysRole, DeleteSysRole } from '@/api/SystemSetting.js'
import AddRole from '@/components/SystemManagement/addRole'
import { MenuIdDate } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    AddRole
  },
  data () {
    return {
      showAddrole: false,
      RoleTile: '添加角色',
      multipleSelection: [], // 选中数据
      currentPage: 1,
      PageSize: 10,
      total: 0,
      checked: false,
      RoleList: [
      ],
      tableloading: false,
      configurationShow: false,
      RoleName: '',
      rules: {
        RoleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, message: '长度大于3个字符', trigger: 'blur' }
        ],
      },
      tempData: {},
      operations: [], // 权限列表
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
      this.getRole(this.operatiOBj)
    }
  },
  methods: {
    // 获取角色列表
    getRole (operat) {
      this.tableloading = true
      const obj = {
        RoleName: this.RoleName,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      GetSysRoleList(qs.stringify(obj)).then(response => {
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
    // 搜索
    search () {
      this.currentPage = 1
      this.getRole(this.operatiOBj)
    },
    handleSizeChange (val) {
      this.PageSize = val
      this.getRole(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getRole(this.operatiOBj)
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
      this.RoleTile = '修改角色'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSysRole(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showAddrole = true
          this.getRole(this.operatiOBj)
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
        DeleteSysRole(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getRole(this.operatiOBj)
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
        this.$confirm('此操作将批量删除选中的角色', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteSysRole(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getRole(this.operatiOBj)
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
          message: '请选择要删除的角色'
        })
      }
    },
    // 打开添加角色框
    handleCreate (str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.RoleTile = '添加角色'
      this.showAddrole = true
    },
    // 保存添加角色
    RoleSave (data) {
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      if (data.Id) {
        EditSysRole(qs.stringify(data)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改角色信息成功!'
            })
            this.showAddrole = false
            this.getRole(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      } else {
        AddSysRole(qs.stringify(data)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '添加角色成功!'
            })
            this.showAddrole = false
            this.getRole(this.operatiOBj)
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
    closeRole (value) {
      this.showAddrole = value
    },
    OpenConfiguration (data, str) {
      this.$router.push({
        path: '/SystemSetting/permissions',
        query: {
          Id: data.Id
        }
      })
    }
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
.dataPermissions {
}
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
