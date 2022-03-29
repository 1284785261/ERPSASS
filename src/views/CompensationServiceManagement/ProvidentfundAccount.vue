<!-- 公积金账户管理 -->
<template>
  <div class="social-security-management-container">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="账号" label-width="50px">
            <el-input v-model="searchform.Account" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="开户公司主体" label-width="110px">
            <el-input v-model="searchform.BfCompanyName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入开户公司主体" />
          </el-form-item>
          <el-form-item label="所属客户" label-width="80px">
            <el-input v-model="searchform.CompanyName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入所属客户" />
          </el-form-item>
          <el-form-item label="开户机构" label-width="80px">
            <el-input v-model="searchform.Institution" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入开户机构" />
          </el-form-item>
          <el-form-item label="账号负责人" label-width="110px">
            <el-input v-model="searchform.ContactPerson" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入账号负责人" />
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="searchtable">
            搜索
          </el-button>
        </el-form>

      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" v-if="$operatebtn(operates, 'Add')" class="erpbtn" @click="OpenAccount('Add')">添加公积金账号</el-button>
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="BfInsuranceList" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" v-if="$getColumsFlag('Id',checkboxVal)" prop="Id" min-width="55" fixed label="序号" />
          <el-table-column align="center" v-if="$getColumsFlag('Account',checkboxVal)" prop="Account" label="账号" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('BfCompanyName',checkboxVal)" prop="BfCompanyName" label="开户主体公司" min-width="320" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('CompanyName',checkboxVal)" prop="CompanyName" label="所属客户数量" width="120">
            <template slot-scope="scope">
              <el-popover ref="popover" placement="bottom" width="500" trigger="click">
                <el-table :data="popovertable" class="projecttable" v-loading="popoverloading" style="max-height: 300px;overflow-y: scroll;">
                  <!-- <el-table-column align="center" property="CompanyId" label="客户Id"></el-table-column> -->
                  <el-table-column align="center" property="CompanyName" label="客户名称"></el-table-column>
                  <el-table-column align="center" label="删除">
                    <template slot-scope="scopes">
                      <svg-icon icon-class="del" class="delcom" @click="deletecompany(scopes.row)" />
                    </template>
                  </el-table-column>
                </el-table>
                <span slot="reference" class="watchcode" @click="watchcompany(scope.row)">{{ scope.row.RelationNumber }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('Institution',checkboxVal)" prop="Institution" label="开户机构" min-width="260" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Address',checkboxVal)" prop="Address" label="开户机构地址" min-width="260" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Tel',checkboxVal)" prop="Tel" label="开户机构电话" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('ContactPerson',checkboxVal)" prop="ContactPerson" label="开户机构联系人" min-width="180" />
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" label="添加时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('Status',checkboxVal)" prop="Status" label="状态" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Status | usestatus}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','Disabled','Enabled']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="EditOpenAccount(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Add')" @click.native="AddCompany(scope.row,'Add')">添加所属客户</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == '0' && $operatebtn(operates, 'Enabled')" @click.native="UploadStatus(scope.row,'Enabled')">启用</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == '1' && $operatebtn(operates, 'Disabled')" @click.native="UploadStatus(scope.row,'Disabled')">禁用</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 添加公积金窗口 -->
    <AddOpenAccount :showOpenAccount="showOpenAccount" :diglogType="diglogType" :tempData="tempData" :dialogTitle="dialogTitle" @OpenAccountSave="OpenAccountSave" @closeOpenAccountSave="closeOpenAccountSave"></AddOpenAccount>
    <!-- 添加所属客户 -->
    <AddCompanyId :showAddCompany="showAddCompany" @closeshowCompany="closeshowCompany" @CompanySave="CompanySave"></AddCompanyId>
  </div>
</template>

<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import { GetBfInsuranceFundPageList, AddBfInsuranceFund, GetBfInsuranceFundInfo, EditBfInsuranceFund, EditBfInsuranceFundStatus, GetBfInsuranceFundCompanyList, DeleteBfInsuranceFundCompany, AddBfInsuranceFundCompany } from '@/api/CompensationServiceManagement.js'
import { MenuIdDate, showLoading, hideLoading, uuid } from '@/utils/CustomValidation'
import AddOpenAccount from './components/AddOpenAccount.vue'
import AddCompanyId from './components/AddCompanyId.vue'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    AddOpenAccount,
    AddCompanyId,
    ScreeningComponent
  },
  data () {
    return {
      searchform: {
        BfCompanyName: '',
        CompanyName: '',
        Institution: '',
        ContactPerson: '',
        Type: 1,
        Account: ''
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "序号", prop: "Id" },
        { label: "账号", prop: "Account" },
        { label: "开户主体公司", prop: "BfCompanyName" },
        { label: "所属客户数量", prop: "CompanyName" },
        { label: "开户机构", prop: "Institution" },
        { label: "开户机构地址", prop: "Address" },
        { label: "开户机构电话", prop: "Tel" },
        { label: "开户机构联系人", prop: "ContactPerson" },
        { label: "添加时间", prop: "AddTime" },
        { label: "状态", prop: "Status" },
      ],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      BfInsuranceList: [],
      tableloading: false, // 加载动画
      multipleSelection: [],
      showOpenAccount: false,
      dialogTitle: '添加公积金账户',
      showAddCompany: false, // 添加所属客户
      popovertable: [],
      popoverloading: false,
      BfInsuranceFundId: '',
      diglogType: 1,//添加时 0为社保  1为公积金
      tempData: {},
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },

  created () {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getInsuranceList(this.operatiOBj)
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  methods: {
    //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    searchtable () {
      this.currentPage = 1
      this.getInsuranceList(this.operatiOBj)
    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      this.getInsuranceList(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getInsuranceList(this.operatiOBj)
    },
    // 获取列表详情
    getInsuranceList (operat) {
      this.tableloading = true
      let data = this.searchform
      data.PageIndex = this.currentPage || 1
      data.PageSize = this.PageSize || 1
      data.menuid = operat.menuid || MenuIdDate()
      data.operationcode = operat.OperationCode || '1'
      GetBfInsuranceFundPageList(qs.stringify(data)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.BfInsuranceList = response.Data
            this.total = response.Total
          } else {
            this.BfInsuranceList = []
            this.total = 0
          }
        } else {
          this.BfInsuranceList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取客户信息
    watchcompany (e) {
      let obj = {
        BfInsuranceFundId: e.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.popoverloading = true
      GetBfInsuranceFundCompanyList(qs.stringify(obj)).then(response => {
        this.popoverloading = false
        if (response.IsSuccess) {
          this.popovertable = response.Data
        } else {
          this.popovertable = []
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 多选
    handleSelectionChange (value) {
      this.checked = value.length == this.BfInsuranceList.length
      this.multipleSelection = value
    },
    batchSelectAll () {
      this.$refs.multipleTable.toggleAllSelection(this.checked)
    },
    //修改状态
    UploadStatus (data, str) {
      const operating = this.$operatedata(this.operates, str)
      let param = {
        Id: data.Id,
        Status: '',
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      let strPrompt = '', successPrompt = ''
      if (data.Status == '1') {
        param.Status = '0'
        strPrompt = '你确定禁用此公积金账户吗?'
        successPrompt = '禁用公积金账户成功！'
      } else if (data.Status == '0') {
        param.Status = '1'
        strPrompt = '你确定启用此公积金账户吗?'
        successPrompt = '启用公积金账户成功！'
      }
      this.$confirm(strPrompt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        EditBfInsuranceFundStatus(qs.stringify(param)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: successPrompt
            })
            this.getInsuranceList(this.operatiOBj)
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
          message: '已取消操作'
        })
      })
    },
    //添加开户
    OpenAccount (str) {
      this.dialogTitle = '添加公积金账户'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.showOpenAccount = true
    },
    //修改开户信息
    EditOpenAccount (data, str) {
      this.dialogTitle = '修改公积金账户'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBfInsuranceFundInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showOpenAccount = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //保存开户信息
    OpenAccountSave (data) {
      showLoading()
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      if (data.Id) {
        EditBfInsuranceFund(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改公积金账号信息成功!'
            })
            this.showOpenAccount = false
            this.getInsuranceList(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      } else {
        AddBfInsuranceFund(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '添加公积金账户信息成功!'
            })
            this.showOpenAccount = false
            this.getInsuranceList(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }
    },
    // 关闭开户窗口
    closeOpenAccountSave (val) {
      this.showOpenAccount = val
    },
    // 删除关联客户
    deletecompany (e) {
      let obj = {
        Id: e.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      DeleteBfInsuranceFundCompany(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '取消关联成功',
            type: 'success'
          })
          let data = {
            Id: e.BfInsuranceFundId
          }
          this.watchcompany(data)
          this.getInsuranceList(this.operatiOBj)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 添加关联客户
    AddCompany (data, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.BfInsuranceFundId = data.Id
      this.showAddCompany = true
    },
    // 关闭所属客户弹框
    closeshowCompany (data) {
      this.showAddCompany = false
    },
    // 保存所属客户
    CompanySave (data) {
      let obj = {
        BfInsuranceFundId: this.BfInsuranceFundId,
        CompanyIds: data.join(','),
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      AddBfInsuranceFundCompany(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '所属客户添加成功',
            type: 'success'
          })
          this.getInsuranceList(this.operatiOBj)
          this.showAddCompany = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.social-security-management-container {
  .operate-top {
    float: right;
    margin-bottom: 16px;
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
    .operate-bottom {
      margin-top: 32px;
      padding-left: 16px;
      .allcheck {
        margin-right: 16px;
      }
    }
    .pagina-fonter {
      margin-top: 24px;
    }
  }
}
.delcom {
  color: red;
  cursor: pointer !important;
}
</style>