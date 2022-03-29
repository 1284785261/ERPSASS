<!-- 实缴公积金管理 -->
<template>
  <div class="provident-fund-management-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">客户名称</div>
        <el-input class="erpsearchinput" placeholder="请输入公积金导入批次号查询" size="small" v-model="searchform.StaffName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">身份证号码</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入身份证号码查询" size="small" v-model="searchform.IdCode">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">就职项目</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入就职项目查询" size="small" v-model="searchform.ProjectName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">用工单位</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入用工单位查询" size="small" v-model="searchform.CompanyName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">企业公积金账号</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入企业公积金账号查询" size="small" v-model="searchform.Account">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">公积金所属年月</div>
        <el-date-picker v-model="searchform.YearMonth" class="erpsearchinput" size="small" type="month" placeholder="请选择公积金所属年月"></el-date-picker>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" v-if="$operatebtn(operates, 'Import')" class="erpbtn" @click="ImportAccumulation('Import')">导入公积金</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'InitiateAccumulationSettlement')" class="erpbtn" @click="OpenStatements('InitiateAccumulationSettlement')">发起公积金结算</el-button>
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="ProvidentList" max-height="600" tooltip-effect="dark" show-summary :summary-method="getSummaries">
          <el-table-column align="center" v-if="$getColumsFlag('Id',checkboxVal)" prop="Id" min-width="55" fixed label="序号" />
          <el-table-column align="center" v-if="$getColumsFlag('StaffName',checkboxVal)" prop="StaffName" label="员工姓名" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Sex',checkboxVal)" prop="Sex" label="性别" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Sex | SexTWO}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('IdCode',checkboxVal)" prop="IdCode" label="身份证号码" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Month',checkboxVal)" prop="Month" label="公积金所属年月" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.Year}}/{{ scope.row.Month | Month}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('HouseFundBase',checkboxVal)" prop="HouseFundBase" label="缴交基数" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.HouseFundBase | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('FeeRate',checkboxVal)" prop="FeeRate" label="个人缴交比例" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.FeeRate | Proportion}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('FeeRateEnt',checkboxVal)" prop="FeeRateEnt" label="企业缴交比例" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.FeeRateEnt | Proportion}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('AmountPers',checkboxVal)" prop="AmountPers" label="金额个人部分" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.AmountPers | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('AmountEnt',checkboxVal)" prop="AmountEnt" label="金额企业部分" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.AmountEnt | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('TotalEnt',checkboxVal)" prop="TotalEnt" label="企业部分总计" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.TotalEnt | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('TotalPers',checkboxVal)" prop="TotalPers" label="个人部分总计" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.TotalPers | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('TotalAmount',checkboxVal)" prop="TotalAmount" label="总计" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.TotalAmount | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('PeriodYear',checkboxVal)" prop="PeriodYear" label="入账年月" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.PeriodYear}}/{{scope.row.PeriodMonth | Month}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="$operatebtns(operates,['View'])">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="LookAccumulation(scope.row,'View')">查看</el-dropdown-item>
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
    <!-- 导入公积金 -->
    <ImportAccumulation :showImportAccumulation="showImportAccumulation" @ImportAccumulationSave="ImportAccumulationSave" @closeImportAccumulation="closeImportAccumulation"></ImportAccumulation>
    <!-- 公积金表头确认 -->
    <AccumulationHeaderRelationship :showHeaderRelationship="showHeaderRelationship" :headerData="headerData" @HeaderRelationshipSave="HeaderRelationshipSave" @closeAllHeaderRelationship="closeAllHeaderRelationship" @closeHeaderRelationship="closeHeaderRelationship"></AccumulationHeaderRelationship>
    <!-- 导入公积金成功显示信息 -->
    <ImportTitle :TitleShow="TitleShow" :errorData="errorData" :title="ImportTitle" @closeTitle="closeTitle"></ImportTitle>
    <template>
      <div v-show="false" ref="errormessage">
        <div class="erperrortitle">{{ title }}</div>
        <div class="erpscroll erperrormessage">
          <div class="err-box" v-for="(item, index) in errormessage" :key="index">{{ item }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import { GetHouseFundPageList, GetImportHouseFundToExcelOrErpStructuralData, ImportHouseFundToExcelOrErpMapping, IsExistsHouseFund } from '@/api/CompensationServiceManagement.js'
import ImportAccumulation from './components/ImportAccumulation.vue'
import AccumulationHeaderRelationship from './components/AccumulationHeaderRelationship.vue'
import ImportTitle from '@/components/publicComponents/ImportTitle'
import { MenuIdDate, showLoading, hideLoading, uuid } from '@/utils/CustomValidation'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    ImportTitle,
    ImportAccumulation,
    AccumulationHeaderRelationship,
    ScreeningComponent
  },
  data () {
    return {
      searchform: {
        StaffName: '',
        IdCode: '',
        ProjectName: '',
        CompanyName: '',
        Account: '',
        YearMonth: ''
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "序号", prop: "Id" },
        { label: "员工姓名", prop: "StaffName" },
        { label: "性别", prop: "Sex" },
        { label: "身份证号码", prop: "IdCode" },
        { label: "公积金所属年月", prop: "Month" },
        { label: "缴交基数", prop: "HouseFundBase" },
        { label: "个人缴交比例", prop: "FeeRate" },
        { label: "企业缴交比例", prop: "FeeRateEnt" },
        { label: "金额个人部分", prop: "AmountPers" },
        { label: "金额企业部分", prop: "AmountEnt" },
        { label: "企业部分总计", prop: "TotalEnt" },
        { label: "个人部分总计", prop: "TotalPers" },
        { label: "总计", prop: "TotalAmount" },
        { label: "入账年月", prop: "PeriodYear" },
      ],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      tableloading: false, // 加载动画
      ProvidentList: [], // 表格
      multipleSelection: [],
      showImportAccumulation: false,
      TitleShow: false,
      showHeaderRelationship: false,
      headerData: {},
      errorData: {
        MessageContent: '',
        Data: []
      },
      ImportData: {},
      ImportTitle: '公积金导入结果反馈',
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
      test: '',
      errormessage: [],
      title: ''
    }
  },
  created () {
    console.log(this.$route.meta.operations)
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
    // 处理合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 5 || index === 8 || index === 9 || index === 10 || index === 11 || index === 12) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            if (sums[index] > 0) {
              sums[index] = sums[index].toFixed(2)
            }
          } else {
            sums[index] = 'N/A'
          }
        } else if (index === 1) {
          sums[index] = data.length
        } else {
          sums[index] = '--'
        }
      })
      return sums
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
    // 获取实缴公积金列表
    getInsuranceList (operat) {
      this.tableloading = true
      let data = this.searchform
      data.PageIndex = this.currentPage || 1
      data.PageSize = this.PageSize || 1
      data.menuid = operat.menuid || MenuIdDate()
      data.operationcode = operat.OperationCode || '1'
      GetHouseFundPageList(qs.stringify(data)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ProvidentList = response.Data
            this.total = response.Total
          } else {
            this.ProvidentList = []
            this.total = 0
          }
        } else {
          this.ProvidentList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    searchtable () {
      this.currentPage = 1
      this.getInsuranceList(this.operatiOBj)
    },
    // 添加公积金明细
    ImportAccumulation (str) {
      // const operating = this.$operatedata(this.operates, str)
      // localStorage.setItem('operating', JSON.stringify(operating))
      // this.showImportAccumulation = true
      this.$router.push({
        path: '/CompensationServiceManagement/ImportProvidentFundForm',
        query: {
        }
      })
    },
    //导入公积金事件
    ImportAccumulationSave (data) {
      this.ImportData = data
      let excelObj = new FormData()
      excelObj.append('file', data.file)
      excelObj.append('StartRow', data.StartRow)
      excelObj.append('StartCol', data.StartCol)
      excelObj.append('EndRow', data.EndRow)
      excelObj.append('EndCol', data.EndCol)
      excelObj.append('ContentEndRow', data.ContentEndRow)
      excelObj.append('IdCodeIndex', data.IdCodeIndex)
      excelObj.append('SheetName', data.SheetName)
      // excelObj.append('menuid', MenuIdDate())
      // excelObj.append('operationcode', '1')
      excelObj.menuid = MenuIdDate()
      excelObj.operationcode = '1'
      showLoading()
      GetImportHouseFundToExcelOrErpStructuralData(excelObj).then(response => {
        hideLoading()
        if (response && response.ErpStructuralData && response.ImportToExcelStructuralData) {
          this.headerData.ErpStructuralData = response.ErpStructuralData
          this.headerData.ImportToExcelStructuralData = response.ImportToExcelStructuralData
          this.showImportAccumulation = false
          this.showHeaderRelationship = true
        } else {
          if (response.MessageContent.includes('个人编号')) {
            this.title = response.MessageContent.split('[')[0]
            const content = response.MessageContent.split('[')[1].split(']')[0]
            this.errormessage = content.split(',')
            this.$nextTick(() => {
              const htmldaima = this.$refs.errormessage.innerHTML
              this.$message({
                type: 'error',
                dangerouslyUseHTMLString: true,
                showClose: true,
                message: htmldaima,
                customClass: 'erpmessage',
                duration: 0
              })
            })
          } else {
            this.$message({
              type: 'error',
              dangerouslyUseHTMLString: true,
              showClose: true,
              message: `<div class="erpscroll erperrormessage">${response.MessageContent}</div>`,
            })
          }
        }
      })
    },
    //导入表头事件
    async HeaderRelationshipSave (data) {
      let IsExistShow = false
      let myDate = new Date(this.ImportData.YearMonth)
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      let IsExistObj = {
        Year: myDate.getFullYear(),
        Month: myDate.getMonth() + 1,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      await IsExistsHouseFund(qs.stringify(IsExistObj)).then(resExistObj => {
        if (resExistObj.MessageCode == 302) {
          IsExistShow = true
        }
      })
      if (IsExistShow) {
        this.$confirm('当前账期的数据已经导入，再次导入会替换掉原有的数据，您是否要替换?', '提示', {
          confirmButtonText: '确认替换',
          cancelButtonText: '取消导入',
          type: 'warning'
        }).then(() => {
          this.AddCallInterface(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导入'
          })
        })
      } else {
        this.AddCallInterface(data)
      }

    },
    AddCallInterface (data) {
      let excelObj = new FormData()
      excelObj.append('file', this.ImportData.file)
      excelObj.append('BfInsuranceFundId', this.ImportData.BfInsuranceFundId)
      excelObj.append('YearMonth', this.ImportData.YearMonth)
      excelObj.append('PeriodYearMonth', this.ImportData.PeriodYearMonth)
      excelObj.append('SheetName', this.ImportData.SheetName)
      excelObj.append('StartRow', this.ImportData.StartRow)
      excelObj.append('StartCol', this.ImportData.StartCol)
      excelObj.append('EndRow', this.ImportData.EndRow)
      excelObj.append('EndCol', this.ImportData.EndCol)
      excelObj.append('ContentEndRow', this.ImportData.ContentEndRow)
      excelObj.append('IdCodeIndex', this.ImportData.IdCodeIndex)
      excelObj.append('HouseFundUrl', this.ImportData.HouseFundUrl)
      excelObj.append('AccountColumn', this.ImportData.AccountColumn ? this.ImportData.AccountColumn : 0)
      // excelObj.append('menuid', MenuIdDate())
      // excelObj.append('operationcode', '1')
      excelObj.menuid = MenuIdDate()
      excelObj.operationcode = '1'
      let arrobj = []
      for (let i = 0; i < data.length; i++) {
        arrobj.push({ 'ExcelName': data[i].ImportData, 'ERPName': data[i].SystemData })
      }
      excelObj.append('HouseFundExcelOrErpMappingList', JSON.stringify(arrobj))
      showLoading()
      ImportHouseFundToExcelOrErpMapping(excelObj).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          let data = response.Data
          if (data.Errors > 0) {
            this.errorData.MessageContent = `导入员工公积金数据成功${data.Successes}条，失败${data.Errors}条`
            for (let i = 0; i < data.ImportHouseFundToExcelOrErpMappingErrorRowList.length; i++) {
              this.errorData.Data.push(`第${data.ImportHouseFundToExcelOrErpMappingErrorRowList[i].Rows}条，${data.ImportHouseFundToExcelOrErpMappingErrorRowList[i].Message}`)
            }
          } else {
            this.errorData.MessageContent = `导入员工公积金数据成功${data.Successes}条`
          }
          this.showHeaderRelationship = false
          this.TitleShow = true
          this.getInsuranceList(this.operatiOBj)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    closeTitle (val) {
      this.errorData = this.$options.data().errorData
      this.TitleShow = val
    },
    closeHeaderRelationship (val) {
      this.showHeaderRelationship = val
      this.showImportAccumulation = true
    },
    closeAllHeaderRelationship (val) {
      this.showHeaderRelationship = val
    },
    //关闭导入公积金
    closeImportAccumulation (val) {
      this.showImportAccumulation = val
    },
    //打开生成结算单
    OpenStatements (str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/CompensationServiceManagement/AddGenerateStatement',
        query: {
          Type: '1'
        }
      })
    },
    //查看公积金详情
    LookAccumulation (data, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/CompensationServiceManagement/AccumulationInfo',
        query: {
          Id: data.Id
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.provident-fund-management-container {
  .search-bar {
    padding: 24px 24px 12px 24px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 12px;
      &:last-child {
        margin-right: 0;
      }
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