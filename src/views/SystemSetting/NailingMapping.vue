//钉钉账号映射
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container" label-width="80px">
          <el-form-item label="操作名称">
            <el-input v-model="RoleName" suffix-icon="el-icon-search" class="select-input" placeholder="请输入操作名称" />
          </el-form-item>
          <el-form-item label="菜单ID">
            <el-select v-model="RoleName" placeholder="请选择" size="mini" class="select-input">
              <el-option v-for="item in status" :key="item.label" :label="item.label" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="search">
            搜索
          </el-button>
        </el-form>

      </div>
      <div class="button-operation">
        <el-button class="operation-button" size="mini" round @click="handleCreate('Add')">
          映射新接口
        </el-button>
      </div>
    </div>
    <div class="table-content">
      <div>
        <el-table ref="industrtTable" v-loading="tableloading" :data="getIndustrtList" class="role-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="60" />
          <el-table-column align="center" prop="RoleName" label="系统接口" />
          <el-table-column align="center" prop="RoleName" label="OA/NC接入接口" />
          <el-table-column align="center" prop="Remark" label="备注" />
          <el-table-column align="center" prop="Remark" label="使用状态" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item @click.native="handleEdit(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item @click.native="OpenConfiguration(scope.row,'SetRights')">配置权限</el-dropdown-item>
                    <el-dropdown-item @click.native="roledetele(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="foot-operation">
        <el-checkbox class="footcheck erpcheck" v-model="checked" @change="batchSelectAll(getIndustrtList)">全选</el-checkbox>
        <el-button round class="operation-button" size="mini" @click="Alldelete('Delete')">删除</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <AddInterface :showAddInterface="showAddInterface" @closeInterface="closeInterface" :title="InterfaceTile"></AddInterface>
  </div>
</template>

<script>
// import { GetCompanyRoleList, AddCompanyRole, EditCompanyRole, GetCompanyRole, DeleteCompanyRole } from '@/api/Authority/role.js'
import AddInterface from '@/components/SystemManagement/addInterface'
import { MenuIdDate } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    AddInterface
  },
  data () {
    return {
      showAddInterface: false,
      InterfaceTile: '映射新接口',
      multipleSelection: [], // 选中数据
      dialogStatus: '', // 新增还是修改
      buttonName: '保存', // 角色按钮
      RoleName: '', // 角色名称
      category: [
        {
          id: '1',
          label: '互联网'
        },
        {
          id: '2',
          label: '地产/金融'
        }
      ],
      status: [{
        id: '1',
        label: '启用'
      },
      {
        id: '2',
        label: '禁用'
      }
      ],
      value: '',
      checked: false,
      getIndustrtList: [
        {
          RoleName: '1111',
          Remark: '123'
        }
      ],
      tableloading: false,
      textMap: '添加角色',
      textconfiguration: '配置权限',
      dialogFormVisible: false,
      configurationShow: false,
      rules: {
        RoleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, message: '长度大于3个字符', trigger: 'blur' }
        ],
        Remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      temp: {
        RoleName: '',
        Remark: ''
      },
      num2: '',
      statusOptions: [],
      checkAll: false,
      isIndeterminate: false,
      checkedCities: [],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      operations: [], // 权限列表
      operatiOBj: { // 父权限查看数据
        MenuId: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    if (this.$route.meta.operations) {
      this.operations = this.$route.meta.operations
      this.operatiOBj = this.$operatedata(this.operations, 'Query')
      // this.getIndustrt(this.operatiOBj)
    }
  },
  methods: {
    // 获取角色列表
    getIndustrt (objs) {
      this.tableloading = true
      const obj = {
        RoleName: this.RoleName,
        menuid: objs.MenuId,
        operationcode: objs.OperationCode
      }
      // GetCompanyRoleList(qs.stringify(obj)).then(response => {
      //   if (response.IsSuccess) {
      //     setTimeout(() => {
      //       this.getIndustrtList = response.Data
      //       this.tableloading = false
      //     }, 500)
      //   } else {
      //     this.$message({
      //       message: response.MessageContent,
      //       type: 'error'
      //     })
      //   }
      // })
    },
    // 搜索
    search () {
      this.currentPage = 1
      this.getIndustrt(this.operatiOBj)
    },
    closeInterface (value) {
      this.showAddInterface = value
    },
    // 表头多选
    handleSelectionChange (value) {
      this.checked = value.length == this.getIndustrtList.length
      this.multipleSelection = value
    },
    // 下方全选
    batchSelectAll (value) {
      this.$refs.industrtTable.toggleAllSelection(this.checked)
    },
    // 打开修改角色框
    handleEdit (data, str) {
      const objs = {
        MenuId: this.$operatedata(this.operations, str).MenuId,
        OperationCode: this.$operatedata(this.operations, str).OperationCode
      }
      localStorage.setItem('operate', JSON.stringify(objs))
      this.dialogFormVisible = true
      this.textMap = '修改角色'
      this.dialogStatus = ''
      this.buttonName = '修改'
      const obj = {
        Id: data.Id,
        MenuId: MenuIdDate(),
        OperationCode: '1'
      }
      // GetCompanyRole(qs.stringify(obj)).then(response => {
      //   if (response.IsSuccess) {
      //     this.temp = response.Data
      //   }
      // })
    },
    // 单个删除
    roledetele (value, str) {
      const obj = {
        Ids: value.Id,
        MenuId: this.$operatedata(this.operations, str).MenuId,
        OperationCode: this.$operatedata(this.operations, str).OperationCode
      }
      this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // DeleteCompanyRole(qs.stringify(obj)).then(response => {
        //   if (response.IsSuccess) {
        //     this.$message({
        //       type: 'success',
        //       message: '删除成功!'
        //     })
        //     this.getIndustrt(this.operatiOBj)
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: response.MessageContent
        //     })
        //   }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量删除
    Alldelete (strs) {
      if (this.multipleSelection.length) {
        let str = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          str += this.multipleSelection[i].Id + ','
        }
        str = str.substring(0, str.length - 1)
        const obj = {
          ids: str,
          MenuId: this.$operatedata(this.operations, strs).MenuId,
          OperationCode: this.$operatedata(this.operations, strs).OperationCode
        }
        this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // DeleteCompanyRole(qs.stringify(obj)).then(response => {
          //   if (response.IsSuccess) {
          //     this.$message({
          //       type: 'success',
          //       message: '删除成功!'
          //     })
          //     // this.$refs.industrtTable.clearSelection();
          //     this.getIndustrt(this.operatiOBj)
          //   } else {
          //     this.$message({
          //       type: 'error',
          //       message: response.MessageContent
          //     })
          //   }
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的账号'
        })
      }
    },
    handleSizeChange () { },
    handleCurrentChange () { },
    // 打开添加角色框
    handleCreate (str) {
      this.InterfaceTile = '映射新接口'
      this.showAddInterface = true
    },
    // 保存添加角色
    rolecreateData () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.temp.MenuId = JSON.parse(localStorage.getItem('operate')).MenuId
          this.temp.OperationCode = JSON.parse(localStorage.getItem('operate')).OperationCode
          // AddCompanyRole(qs.stringify(this.temp)).then(response => {
          //   if (response.IsSuccess) {
          //     this.$message({
          //       message: '添加成功',
          //       type: 'success'
          //     })
          //     this.dialogFormVisible = false
          //     this.getIndustrt(this.operatiOBj)
          //   } else {
          //     this.$message({
          //       message: response.MessageContent,
          //       type: 'error'
          //     })
          //   }
          // })
        }
      })
    },
    // 保存角色修改
    roleupdateData () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.temp.MenuId = JSON.parse(localStorage.getItem('operate')).MenuId
          this.temp.OperationCode = JSON.parse(localStorage.getItem('operate')).OperationCode
          // EditCompanyRole(qs.stringify(this.temp)).then(response => {
          //   if (response.IsSuccess) {
          //     this.$message({
          //       message: '添加成功',
          //       type: 'success'
          //     })
          //     this.dialogFormVisible = false
          //     this.getIndustrt(this.operatiOBj)
          //   } else {
          //     this.$message({
          //       message: response.MessageContent,
          //       type: 'error'
          //     })
          //   }
          // })
        }
      })
    },
    // 关闭角色窗口
    closetextMap () {
      this.temp = {
        RoleName: '',
        Remark: ''
      }
      this.dialogStatus = 'create'
    },
    OpenConfiguration (data, str) {
      const obj = {
        MenuId: this.$operatedata(this.operations, str).MenuId,
        OperationCode: this.$operatedata(this.operations, str).OperationCode
      }
      localStorage.setItem('operate', JSON.stringify(obj))
      this.$router.push({
        path: '/users/jurisdiction',
        query: {
          id: data.Id
        }
      })
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    delrole () {
      this.$router.push({ path: '/ConfigurePermissions' })
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
