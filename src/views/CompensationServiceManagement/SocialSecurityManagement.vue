<!-- 实缴社保管理 -->
<template>
  <div class="social-security-management-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">员工名称</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入员工名称查询" size="small" v-model="searchform.StaffName">
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
        <div class="search-name">企业社保账号</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入企业社保账号查询" size="small" v-model="searchform.Account">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">社保所属年月</div>
        <el-date-picker v-model="searchform.YearMonth" class="erpsearchinput" size="small" type="month" placeholder="请选择社保所属年月"></el-date-picker>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" v-if="$operatebtn(operates, 'Import')" class="erpbtn" @click="ImportSocialSecurity('Import')">导入社保</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'InitiateSecuritySettlement')" class="erpbtn" @click="OpenStatements('InitiateSecuritySettlement')">发起社保结算</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="InsuranceList" max-height="600" tooltip-effect="dark" show-summary :summary-method="getSummaries">
          <el-table-column align="center" prop="Id" min-width="55" fixed label="序号" />
          <el-table-column align="center" prop="StaffName" label="员工姓名" min-width="120" />
          <el-table-column align="center" prop="Sex" label="性别" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Sex | SexTWO}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="IdCode" label="身份证号码" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" prop="TotalEnt" label="企业部分社保合计" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.TotalEnt | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="TotalPers" label="个人部分社保合计" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.TotalPers | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Account" label="企业社保账号" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" prop="Month" label="社保所属年月" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Year}}/{{ scope.row.Month | Month}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="PeriodYear" label="入账年月" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.PeriodYear}}/{{scope.row.PeriodMonth | Month}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="PeriodYear" label="缴交状态" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.Status == 0">待发放</span>
              <span v-if="scope.row.Status == 1">已发放</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['View']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="LookSocialSecurity(scope.row,'View')">查看</el-dropdown-item>
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
    <!-- 导入社保 -->
    <ImportSocialSecurity :showImportSocialSecurity="showImportSocialSecurity" @ImportSocialSecuritySave="ImportSocialSecuritySave" @closeImportSocialSecurity="closeImportSocialSecurity"></ImportSocialSecurity>
    <!-- 导入社保表头 -->
    <HeaderRelationship :showHeaderRelationship="showHeaderRelationship" :headerData="headerData" @HeaderRelationshipSave="HeaderRelationshipSave" @closeAllHeaderRelationship="closeAllHeaderRelationship" @closeHeaderRelationship="closeHeaderRelationship"></HeaderRelationship>
    <!-- 导入社保成功显示信息 -->
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
import { GetInsurancePageList, GetImportToExcelOrErpStructuralData, ImportToExcelOrErpMapping } from '@/api/CompensationServiceManagement.js'
import ImportSocialSecurity from './components/ImportSocialSecurity.vue'
import HeaderRelationship from './components/HeaderRelationship.vue'
import ImportTitle from '@/components/publicComponents/ImportTitle'
import { MenuIdDate, showLoading, hideLoading, uuid } from '@/utils/CustomValidation'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
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
      currentPage: 1,
      PageSize: 10,
      total: 0,
      InsuranceList: [],
      tableloading: false, // 加载动画
      multipleSelection: [],
      showImportSocialSecurity: false,
      TitleShow: false,
      ImportTitle: '社保导入结果反馈',
      showHeaderRelationship: false,
      headerData: {},
      errorData: {
        MessageContent: '',
        Data: []
      },
      ImportData: {},
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
  components: {
    ImportSocialSecurity,
    HeaderRelationship,
    ImportTitle
  },
  created () {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getInsuranceList(this.operatiOBj)
    }
  },
  mounted () {
    console.log(ImportTitle);
  },
  methods: {
    // 处理合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 4 || index === 5) {
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
    // 获取列表数据
    getInsuranceList (operat) {
      this.tableloading = true
      let data = this.searchform
      data.PageIndex = this.currentPage || 1
      data.PageSize = this.PageSize || 1
      data.menuid = operat.menuid || MenuIdDate()
      data.operationcode = operat.OperationCode || '1'
      GetInsurancePageList(qs.stringify(data)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.InsuranceList = response.Data
            this.total = response.Total
          } else {
            this.InsuranceList = []
            this.total = 0
          }
        } else {
          this.InsuranceList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getInsuranceList(this.operatiOBj)
    },
    //导入社保
    ImportSocialSecurity () {
      // this.showImportSocialSecurity = true
      this.$router.push({
        path: '/CompensationServiceManagement/ImportSocialSecurityForm',
        query: {
        }
      })

    },
    //导入社保事件
    ImportSocialSecuritySave (data) {
      this.ImportData = data
      let excelObj = new FormData()
      excelObj.append('file', data.file)
      excelObj.append('StartRow', data.StartRow)
      excelObj.append('StartCol', data.StartCol)
      excelObj.append('EndRow', data.EndRow)
      excelObj.append('EndCol', data.EndCol)
      excelObj.append('ContentEndRow', data.ContentEndRow)
      excelObj.append('SiType', data.SiType)
      excelObj.append('SiTypeIndex', data.SiTypeIndex)
      excelObj.append('PayType', data.PayType)
      excelObj.append('PayerType', data.PayerType)
      excelObj.append('PayerIndex', data.PayerIndex)
      excelObj.append('SiCode', data.SiCode)
      excelObj.append('SiPeriod', data.SiPeriod)
      excelObj.append('SheetName', data.SheetName)
      // excelObj.append('menuid', MenuIdDate())
      // excelObj.append('operationcode', '1')
      excelObj.menuid = MenuIdDate()
      excelObj.operationcode = '1'
      showLoading()
      GetImportToExcelOrErpStructuralData(excelObj).then(response => {
        hideLoading()
        if (response && response.ErpStructuralData && response.ImportToExcelStructuralData) {
          this.headerData.ErpStructuralData = response.ErpStructuralData
          this.headerData.ImportToExcelStructuralData = response.ImportToExcelStructuralData
          this.showImportSocialSecurity = false
          this.showHeaderRelationship = true
        } else {
          if (response.MessageContent.includes('个人编号')) {
            this.title = response.MessageContent.split('[')[0]
            const content = response.MessageContent.split('[')[1].split(']')[0]
            this.errormessage = content.split(',')
            this.$nextTick(() => {
              const htmldaima = this.$refs.errormessage.innerHTML
              console.log(htmldaima);
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
    HeaderRelationshipSave (data) {
      let excelObj = new FormData()
      const operating = JSON.parse(localStorage.getItem('operating'))
      excelObj.append('file', this.ImportData.file)
      excelObj.append('BfInsuranceFundId', this.ImportData.BfInsuranceFundId)
      excelObj.append('PeriodYearMonth', this.ImportData.PeriodYearMonth)
      excelObj.append('SheetName', this.ImportData.SheetName)
      excelObj.append('StartRow', this.ImportData.StartRow)
      excelObj.append('StartCol', this.ImportData.StartCol)
      excelObj.append('EndRow', this.ImportData.EndRow)
      excelObj.append('EndCol', this.ImportData.EndCol)
      excelObj.append('ContentEndRow', this.ImportData.ContentEndRow)
      excelObj.append('SiType', this.ImportData.SiType)
      excelObj.append('SiTypeIndex', this.ImportData.SiTypeIndex)
      excelObj.append('PayType', this.ImportData.PayType)
      excelObj.append('PayerType', this.ImportData.PayerType)
      excelObj.append('PayerIndex', this.ImportData.PayerIndex)
      excelObj.append('SiCode', this.ImportData.SiCode)
      excelObj.append('SiPeriod', this.ImportData.SiPeriod)
      excelObj.append('InsuranceUrl', this.ImportData.InsuranceUrl)
      excelObj.append('AccountColumn', this.ImportData.AccountColumn ? this.ImportData.AccountColumn : 0)
      // excelObj.append('menuid', MenuIdDate())
      // excelObj.append('operationcode', '1')
      excelObj.menuid = MenuIdDate()
      excelObj.operationcode = '1'
      let arrobj = []
      for (let i = 0; i < data.length; i++) {
        arrobj.push({ 'ExcelName': data[i].ImportData, 'ERPName': data[i].SystemData })
      }
      excelObj.append('ExcelOrErpMappingList', JSON.stringify(arrobj))
      showLoading()
      ImportToExcelOrErpMapping(excelObj).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          let data = response.Data
          if (data.Errors > 0) {
            this.errorData.MessageContent = `导入员工社保数据成功${data.Successes}条，失败${data.Errors}条`
            for (let i = 0; i < data.ImportToExcelOrErpMappingErrorRowList.length; i++) {
              this.errorData.Data.push(`第${data.ImportToExcelOrErpMappingErrorRowList[i].Rows}条，${data.ImportToExcelOrErpMappingErrorRowList[i].Message}`)
            }
          } else {
            this.errorData.MessageContent = `导入员工社保数据成功${data.Successes}条`
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
    closeHeaderRelationship (val) {
      this.showHeaderRelationship = val
      this.showImportSocialSecurity = true
    },
    closeAllHeaderRelationship (val) {
      this.showHeaderRelationship = val
    },
    //关闭导入社保事件
    closeImportSocialSecurity (val) {
      this.showImportSocialSecurity = val
    },
    //查看社保
    LookSocialSecurity (data, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/CompensationServiceManagement/InsuranceInfo',
        query: {
          Id: data.Id
        }
      })
    },
    closeTitle (val) {
      this.errorData = this.$options.data().errorData
      this.TitleShow = val
    },
    //打开生成结算单
    OpenStatements (str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/CompensationServiceManagement/AddGenerateStatement',
        query: {
          Type: '0'
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.social-security-management-container {
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