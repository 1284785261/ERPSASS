<!--六项扣除管理-->
<template>
  <div class="social-security-management-container">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="员工名称" label-width="80px">
            <el-input v-model="searchform.StaffName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入员工名称" />
          </el-form-item>
          <el-form-item label="身份证号码" label-width="110px">
            <el-input v-model="searchform.IdCode" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入身份证号码" />
          </el-form-item>
          <el-form-item label="就职项目" label-width="100px">
            <el-input v-model="searchform.ProjectName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入就职项目" />
          </el-form-item>
          <el-form-item label="用工单位" label-width="100px">
            <el-input v-model="searchform.CompanyName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入用工单位" />
          </el-form-item>
          <el-form-item label="所属年月" label-width="80px">
            <el-date-picker v-model="searchform.YearMonth" clearable class="select-input" size="small" type="month" placeholder="请选择所属年月"></el-date-picker>
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="searchtable">
            搜索
          </el-button>
        </el-form>

      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" v-if="$operatebtn(operates, 'Import')" class="erpbtn" @click="OpenDeduct('Import')">导入六项专项扣除明细</el-button>
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="BfInsuranceList" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" v-if="$getColumsFlag('StaffId',checkboxVal)" prop="StaffId" label="员工工号" min-width="120" fixed />
          <el-table-column align="center" v-if="$getColumsFlag('StaffName',checkboxVal)" prop="StaffName" label="员工姓名" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Sex',checkboxVal)" prop="Sex" label="性别" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Sex | SexTWO}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('IdCode',checkboxVal)" prop="IdCode" label="身份证号码" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('StartDate',checkboxVal)" prop="StartDate" label="所属期起" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.StartDate | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('EndDate',checkboxVal)" prop="EndDate" label="所属期止" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.EndDate | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('Edu',checkboxVal)" prop="Edu" label="累计继续教育支出" min-width="180">
            <template slot-scope="scope">
              <span>{{scope.row.Edu | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('SonEdu',checkboxVal)" prop="SonEdu" label="累计子女教育支出" min-width="180">
            <template slot-scope="scope">
              <span>{{scope.row.SonEdu | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('HouseRent',checkboxVal)" prop="HouseRent" label="累计住房租金支出" min-width="180">
            <template slot-scope="scope">
              <span>{{scope.row.HouseRent | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('HouseLoan',checkboxVal)" prop="HouseLoan" label="累计房贷利息支出" min-width="180">
            <template slot-scope="scope">
              <span>{{scope.row.HouseLoan | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('SupportParent',checkboxVal)" prop="SupportParent" label="累计赡养老人支出" min-width="180">
            <template slot-scope="scope">
              <span>{{scope.row.SupportParent | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('BigMedical',checkboxVal)" prop="BigMedical" label="累计大病医疗支出" min-width="180">
            <template slot-scope="scope">
              <span>{{scope.row.BigMedical | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('Year',checkboxVal)" prop="Year" label="所属年月" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Year}}/{{ scope.row.Month | Month}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('SysUserName',checkboxVal)" prop="SysUserName" label="操作人" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" label="添加时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | Time}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 导入六项专项扣除明细 -->
    <ImportSixtoDeduct :showImportSixtoDeduct="showImportSixtoDeduct" @SaveImportSixtoDeduct="SaveImportSixtoDeduct" @closeImportSixtoDeduct="closeImportSixtoDeduct"></ImportSixtoDeduct>
    <!-- 导入六项专项扣除成功显示信息 -->
    <ImportTitle :TitleShow="TitleShow" :errorData="errorData" :title="ImportTitle" @closeTitle="closeTitle"></ImportTitle>
  </div>
</template>

<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import { GetPersonalTaxDeductPageList, GetPersonalTaxDeductInfo, ImportToPersonalTaxDeductExcel } from '@/api/CompensationServiceManagement.js'
import { MenuIdDate, showLoading, hideLoading, uuid } from '@/utils/CustomValidation'
import ImportSixtoDeduct from './components/ImportSixtoDeduct.vue'
import ImportTitle from '@/components/publicComponents/ImportTitle'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    ImportSixtoDeduct,
    ImportTitle,
    ScreeningComponent
  },
  data () {
    return {
      searchform: {
        StaffName: '',
        IdCode: '',
        ProjectName: '',
        CompanyName: '',
        YearMonth: ''
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "员工工号", prop: "StaffId" },
        { label: "员工姓名", prop: "StaffName" },
        { label: "性别", prop: "Sex" },
        { label: "身份证号码", prop: "IdCode" },
        { label: "所属期起", prop: "StartDate" },
        { label: "所属期止", prop: "EndDate" },
        { label: "累计继续教育支出", prop: "Edu" },
        { label: "累计子女教育支出", prop: "SonEdu" },
        { label: "累计住房租金支出", prop: "HouseRent" },
        { label: "累计房贷利息支出", prop: "HouseLoan" },
        { label: "累计赡养老人支出", prop: "SupportParent" },
        { label: "累计大病医疗支出", prop: "BigMedical" },
        { label: "所属年月", prop: "Year" },
        { label: "操作人", prop: "SysUserName" },
        { label: "添加时间", prop: "AddTime" },
      ],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      BfInsuranceList: [],
      tableloading: false, // 加载动画
      showImportSixtoDeduct: false,
      TitleShow: false,
      ImportTitle: '六项专项扣除明细导入结果反馈',
      errorData: {
        MessageContent: '',
        Data: []
      },
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
      GetPersonalTaxDeductPageList(qs.stringify(data)).then(response => {
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
    //打开导入六项扣除
    OpenDeduct (str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.showImportSixtoDeduct = true
    },
    //保存导入六项扣除
    SaveImportSixtoDeduct (data) {
      showLoading()
      let objdata = new FormData()
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      objdata.append('file', data.file)
      objdata.append('PeriodYearMonth', data.PeriodYearMonth)
      objdata.append('YearMonth', data.YearMonth)
      // objdata.append('menuid', operating.MenuId)
      // objdata.append('operationcode', operating.OperationCode)
      objdata.menuid = operating.MenuId
      objdata.operationcode = operating.OperationCode
      ImportToPersonalTaxDeductExcel(objdata).then(responseexcel => {
        hideLoading()
        if (responseexcel.IsSuccess) {
          let data = responseexcel.Data
          if (data.Errors > 0) {
            this.errorData.MessageContent = `导入员工六项扣除数据成功${data.Successes}条，失败${data.Errors}条`
            for (let i = 0; i < data.ImportToExcelErrorList.length; i++) {
              this.errorData.Data.push(`第${data.ImportToExcelErrorList[i].Rows}条，${data.ImportToExcelErrorList[i].Message}`)
            }
          } else {
            this.errorData.MessageContent = `导入员工六项扣除数据成功${data.Successes}条`
          }
          this.showImportSixtoDeduct = false
          this.TitleShow = true
        } else {
          this.$message({
            type: 'error',
            message: responseexcel.MessageContent
          })
        }
      })
    },
    //关闭导入六项专项扣除
    closeImportSixtoDeduct (val) {
      this.showImportSixtoDeduct = val
    },
    closeTitle (val) {
      this.errorData = this.$options.data().errorData
      this.TitleShow = val
      this.getInsuranceList(this.operatiOBj)
    }
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
</style>