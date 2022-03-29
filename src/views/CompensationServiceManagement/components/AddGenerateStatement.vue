<!-- 生成结算单页面 -->
<template>
  <div class="AddGenerateStatement-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="AddGenerateStatement-content">
      <div class="calculation-title">生成结算单</div>
      <el-form :model="dataObject" label-position="top" :rules="rules" ref="dataObject" label-width="100px" class="dataObject">
        <el-row :gutter="64">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="结算单名称" prop="Title">
              <el-input v-model="dataObject.Title" placeholder="输入结算单名称"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="结算单维度" prop="Type">
              <el-select v-model="dataObject.Type" placeholder="请选择结算单维度" @change="changeDimensionality">
                <el-option v-for="item in dimensionList" :key="item.label" :label="item.Name" :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="选择客户" prop="CompanyId" class="select">
              <el-select ref="company" v-model="dataObject.CompanyId" filterable remote clearable placeholder="搜索选择客户" :loading="loading" :remote-method="remoteCompany" @change="changeCompany" @clear="clearCompany">
                <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
                </el-option>
                <div v-if="CompanyPageList.length > 99" class="search-keyword">
                  <span>只显示前100条结果，请完善搜索关键字</span>
                </div>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="选择项目" prop="ProjectId" class="select">
              <el-select ref="project" v-model="dataObject.ProjectId" filterable remote clearable placeholder="根据客户搜索选择项目" :loading="loading" @change="changeEmployees" :remote-method="remoteProject" @clear="clearProject">
                <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id">
                </el-option>
                <div v-if="ProjectList.length > 99" class="search-keyword">
                  <span>只显示前100条结果，请完善搜索关键字</span>
                </div>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-if="dataObject.Type == '1' && dimensionType == '0'">
            <el-form-item label="选择企业社保账号" prop="SiId" class="select" v-if="dataObject.Type == '1' && dimensionType == '0'">
              <el-select ref="company" v-model="dataObject.SiId" filterable remote clearable placeholder="搜索选择企业社保账号" :loading="loading" :remote-method="remoteAccount" @change="changeEmployees" @clear="clearAccount">
                <el-option v-for="item in SecurityAccountList" :key="item.Id" :label="item.BfCompanyName+' - '+item.Account" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-if="dataObject.Type == '1' && dimensionType == '1'">
            <el-form-item label="选择企业公积金账号" prop="FundId" class="select" v-if="dataObject.Type == '1' && dimensionType == '1'">
              <el-select ref="company" v-model="dataObject.FundId" filterable remote clearable placeholder="搜索选择企业公积金账号" :loading="loading" :remote-method="remoteAccount" @change="changeEmployees" @clear="clearAccount">
                <el-option v-for="item in SecurityAccountList" :key="item.Id" :label="item.BfCompanyName+' - '+item.Account" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-if="dataObject.Type == '1' && dimensionType == '2'">
            <el-form-item label="选择企业医保账号" prop="MedicalId" class="select">
              <el-select ref="company" v-model="dataObject.MedicalId" filterable remote clearable placeholder="搜索选择企业医保账号" :loading="loading" :remote-method="remoteAccount" @change="changeEmployees" @clear="clearAccount">
                <el-option v-for="item in SecurityAccountList" :key="item.Id" :label="item.BfCompanyName+' - '+item.Account" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-if="dimensionType == '1'">
            <el-form-item label="入职公司" prop="BfCompany" class="select">
              <el-select ref="company" v-model="dataObject.BfCompany" filterable remote clearable placeholder="搜索选择入职公司" :loading="loading" :remote-method="remoteBfCompany" @change="changeEmployees" @clear="clearBfCompany">
                <el-option v-for="item in BfCompanyList" :key="item.Id" :label="item.Name" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="入账年月" prop="PeriodYearMonth">
              <el-date-picker v-model="dataObject.PeriodYearMonth" type="month" @change="changeEmployees" placeholder="选择入账年月"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="关联工资结算单">
              <el-select v-model="dataObject.SettleId" placeholder="选择对应工资结算单" filterable multiple remote :loading="loading" :remote-method="remoteSettle" @clear="remoteSettle('')">
                <el-option v-for="item in finalList" :key="item.Id" :label="item.Title" :value="item.Id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="社保所属年月" prop="SocialSecurityDate">
              <el-date-picker v-model="dataObject.SocialSecurityDate" type="month" placeholder="选择入账年月"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="选择对应回款">
              <el-select v-model="dataObject.MoneyRecordId" placeholder="选择对应回款" :loading="loading" filterable multiple remote :remote-method="remoteRecord" @clear="remoteRecord('')">
                <el-option v-for="item in paymentList" :key="item.Id" :label="item.CompanyName + item.Amount + '元(' + item.PayTime + ')'" :value="item.Id"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="choosestafflist.length > 0">
            <el-form-item label="参与结算的员工">
              <el-table ref="finalTable" v-loading="staffloading" :data="choosestafflist" class="erp-table" tooltip-effect="dark" show-summary :summary-method="getSummaries" @cell-mouse-leave="mouseleave" @cell-mouse-enter="mouseenter">
                <el-table-column align="center" prop="Name" label="姓名" />
                <el-table-column align="center" prop="IdCode" label="身份证号码" />
                <el-table-column v-if="dimensionType=='0'" align="center" prop="TotalPers" label="个人社保合计">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.TotalPers}}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="dimensionType=='0'" align="center" prop="TotalEnt" label="单位社保合计">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.TotalEnt}}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="dimensionType=='0'" align="center" prop="Total" label="合计金额">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.Total}}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="dimensionType=='1'" align="center" prop="TotalPers" label="个人公积金合计">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.TotalPers}}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="dimensionType=='1'" align="center" prop="TotalEnt" label="单位公积金合计">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.TotalEnt}}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="dimensionType=='1'" align="center" prop="TotalAmount" label="合计金额">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.TotalAmount}}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="dimensionType=='2'" align="center" prop="TotalPers" label="个人医保合计">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.TotalPers}}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="dimensionType=='2'" align="center" prop="TotalEnt" label="单位医保合计">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.TotalEnt}}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="dimensionType=='2'" align="center" prop="Total" label="合计金额">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.Total}}</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column align="center" width="60px">
                  <template slot-scope="scope">
                    <span v-show="scope.row.checked" @click="scope.row.isupdate=!scope.row.isupdate">
                      <svg-icon icon-class="update" class="cursor-pointer" :class="{'active': scope.row.isupdate}" />
                    </span>
                  </template>
                </el-table-column> -->
              </el-table>
              <div class="choosepeople">
                <div>已选择 <span class="num">{{choosestafflist.length}}</span> 人 <el-button size="small" class="erpbtn" @click="updatepeople">修改参与结算的员工</el-button>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="footer">
        <el-button class="erpbtn" size="middle" @click="closedialog">取消</el-button>
        <el-button class="erpbtn" size="middle" @click="generateSingle('dataObject')">生成结算单</el-button>
      </div>
    </div>
    <GenerateStatement :Statements="StatementsTitle" :dimensionType="dimensionType" :showStatements="showStatements" :tableData="tableData" @StatementsSave="StatementsSave" @closeStatements="closeStatements"></GenerateStatement>
  </div>
</template>

<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { GetMoneyRecordRecordList } from '@/api/FinancialManagement.js'
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetProjectList } from '@/api/projectManagement.js'
import { GetBfCompanyPageList } from '@/api/BusinessSet.js'
import { GetBfInsuranceFundPageList, GetInsuranceSettleMember, AddSiSettle, GetHouseFundSettleMember, AddHouseFundSettle, GetMedicalSettleMember, AddMedicalSettle, GetSalarySettlePeriodInfo } from '@/api/CompensationServiceManagement.js'
import GenerateStatement from './GenerateStatement.vue'
import { MenuIdDate, showLoading, hideLoading, uuid } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    GenerateStatement
  },
  data () {
    return {
      urlList: [],
      dimensionList: [{
        label: '0',
        Name: '按项目'
      }, {
        label: '1',
        Name: '按企业社保账号'
      }],
      CompanyPageList: [],
      ProjectList: [],
      BfCompanyList: [],
      SecurityAccountList: [],
      paymentList: [],
      finalList: [],
      dataObject: {
        SocialSecurityDate:'',
        Title: '',
        Type: '0',
        CompanyId: '',
        ProjectId: '',
        SiId: '',
        BfInsuranceFundId: '',
        MedicalId: '',
        FundId: '',
        BfCompany: '',
        Year: '',
        Month: '',
        PeriodYear: '',
        PeriodMonth: '',
        PeriodYearMonth: '',
        MoneyRecordId: [],
        SettleId: []
      },
      choosestafflist: [],
      rules: {
        Title: [
          { required: true, message: '请输入结算单名称', trigger: 'blur' },
        ],
        CompanyId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        ProjectId: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        SiId: [
          { required: true, message: '请选择企业社保账号', trigger: 'change' }
        ],
        FundId: [
          { required: true, message: '请选择企业公积金账号', trigger: 'change' }
        ],
        MedicalId: [
          { required: true, message: '请选择企业医保账号', trigger: 'change' }
        ],
        BfCompany: [
          { required: true, message: '请选择用工单位', trigger: 'change' }
        ],
        PeriodYearMonth: [
          { type: 'date', required: true, message: '请选择入账年月', trigger: 'change' }
        ],
        // MoneyRecordId: [
        //   { required: true, message: '请选择对应回款', trigger: 'change' }
        // ]
      },
      StatementsTitle: '修改参与结算的员工',
      tableData: [],
      showStatements: false,
      dimensionType: 0,
      loading: false,
      staffloading: false,
    }
  },
  watch: {
    // 'dataObject.ProjectId'(newvalue, oldvalue) {
    //   const data = this.ProjectList.find(v => {
    //     return v.Id === newvalue
    //   })
    //   this.projectname = data?data.Name : ''
    //   let salaryyear = this.dataObject.PeriodYearMonth?this.dataObject.PeriodYearMonth.getFullYear() + '年' : ''
    //   let salarymonth = this.dataObject.PeriodYearMonth?this.dataObject.PeriodYearMonth.getMonth() + 1 + '月' : ''
    //   this.typename = ''
    //   if (this.dimensionType == '0') {
    //     this.typename = '社保结算单'
    //   } else if (this.dimensionType == '1') {
    //     this.typename = '公积金结算单'
    //   } else if (this.dimensionType == '2') {
    //     this.typename = '医保结算单'
    //   }
    //   this.dataObject.Title = this.projectname + salaryyear + salarymonth + this.typename
    // },
    // 'dataObject.PeriodYearMonth'(newvalue, oldvalue) {
    //   const data = this.ProjectList.find(v => {
    //     return v.Id === this.dataObject.ProjectId
    //   })
    //   this.projectname = data?data.Name : ''
    //   let salaryyear = this.dataObject.PeriodYearMonth?this.dataObject.PeriodYearMonth.getFullYear() + '年' : ''
    //   let salarymonth = this.dataObject.PeriodYearMonth?this.dataObject.PeriodYearMonth.getMonth() + 1 + '月' : ''
    //   this.typename = ''
    //   if (this.dimensionType == '0') {
    //     this.typename = '社保结算单'
    //   } else if (this.dimensionType == '1') {
    //     this.typename = '公积金结算单'
    //   } else if (this.dimensionType == '2') {
    //     this.typename = '医保结算单'
    //   }
    //   this.dataObject.Title = this.projectname + salaryyear + salarymonth + this.typename
    // }
  },
  created () {
    if (this.$route.query && this.$route.query.Type) {
      this.dimensionType = this.$route.query.Type
      if (this.dimensionType == '0') {
        this.urlList = [{
          name: '实缴社保管理',
          router: '/CompensationServiceManagement/SocialSecurityManagement'
        }, {
          name: '生成社保结算单',
          router: ''
        }]
        this.dimensionList = [{
          label: '0',
          Name: '按项目'
        }, {
          label: '1',
          Name: '按企业社保账号'
        }]
      } else if (this.dimensionType == '1') {
        this.urlList = [{
          name: '实缴公积金管理',
          router: '/CompensationServiceManagement/ProvidentFundManagement'
        }, {
          name: '生成公积金结算单',
          router: ''
        }]
        this.dimensionList = [{
          label: '0',
          Name: '按项目'
        }, {
          label: '1',
          Name: '按企业公积金账号'
        }]
        this.remoteBfCompany()
      } else if (this.dimensionType == '2') {
        this.urlList = [{
          name: '实缴医保管理',
          router: '/CompensationServiceManagement/HealthInsuranceManagement'
        }, {
          name: '生成医保结算单',
          router: ''
        }]
        this.dimensionList = [{
          label: '0',
          Name: '按项目'
        }, {
          label: '1',
          Name: '按企业医保账号'
        }]
        this.remoteBfCompany()
      }
      this.remoteCompany()
      this.remoteAccount()
    }
  },
  methods: {
    // 处理合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 2 || index === 3 || index === 4) {
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
              sums[index] = sums[index].toFixed(2) + '元'
            }
          } else {
            sums[index] = 'N/A'
          }
        } else if (index === 1) {
          sums[index] = data.length + '人'
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    //查询公司列表
    remoteCompany (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          Name: query,
          PageIndex: 1,
          PageSize: 99,
          Type: -1,
          Status: 1,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.CompanyPageList = response.Data
            } else {
              this.CompanyPageList = []
            }
          } else {
            this.CompanyPageList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearCompany () {
      this.dataObject.ProjectId = ''
      this.ProjectList = []
      this.remoteCompany()
    },
    //获取项目下拉列表
    remoteProject (val) {
      let data = {
        Name: val,
        CompanyId: this.dataObject.CompanyId || '',
        BusinessType: '-1',
        Priority: '-1',
        Status: '-1',
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectList(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ProjectList = response.Data
          } else {
            this.ProjectList = []
            this.dataObject.ProjectId = ''
          }

        } else {
          this.ProjectList = []
          this.dataObject.ProjectId = ''
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    clearProject () {
      this.remoteProject()
    },
    //选择客户查询项目
    changeCompany () {
      if (this.dataObject.CompanyId) {
        this.remoteProject()
      }
    },
    // // 选择维度
    // changeDimensionality (e) {
    //   this.dataObject.CompanyId = ''
    //   this.dataObject.ProjectId = ''
    //   this.dataObject.SiId = ''
    //   this.dataObject.FundId = ''
    //   this.dataObject.MedicalId = ''
    //   this.dataObject.BfCompany = ''
    //   this.choosestafflist = []
    //   this.tableData = []
    //   this.remoteAccount()
    //   this.$nextTick(() => {
    //     this.$refs.dataObject.clearValidate()
    //   })
    // },
    //获取社保/公积金账户列表
    remoteAccount (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          Account: query,
          PageIndex: 1,
          PageSize: 99,
          Type: 0,
          BfCompanyName: '',
          CompanyName: '',
          Institution: '',
          ContactPerson: '',
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        if (this.dimensionType == '0') {
          data.Type = '0'
        } else if (this.dimensionType == '1') {
          data.Type = '1'
        } else if (this.dimensionType == '2') {
          data.Type = '2'
        }
        GetBfInsuranceFundPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.SecurityAccountList = response.Data
            } else {
              this.SecurityAccountList = []
            }
          } else {
            this.SecurityAccountList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearAccount () {
      this.remoteAccount()
    },
    //选择用工单位
    remoteBfCompany (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          PageIndex: 1,
          PageSize: 99,
          Name: query,
          Status: 1,
          Level: -1,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetBfCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.BfCompanyList = response.Data
            } else {
              this.BfCompanyList = []
            }
          } else {
            this.BfCompanyList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearBfCompany () {
      this.remoteBfCompany()
    },
    // 选择工资结算单
    remoteSettle (query) {
      this.loading = true
      let obj = {
        CompanyName: query,
        HFId: this.dataObject.SiId || this.dataObject.FundId || this.dataObject.MedicalId,
        ProjectId: this.dataObject.ProjectId,
        PeriodYear: this.dataObject.PeriodYearMonth.getFullYear(),
        PeriodMonth: this.dataObject.PeriodYearMonth.getMonth() + 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetSalarySettlePeriodInfo(qs.stringify(obj)).then(response => {
        this.loading = false
        if (response.IsSuccess) {
          this.finalList = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // // 选择对应汇款单
    // remoteRecord (query) {
    //   this.loading = true
    //   let obj = {
    //     PageIndex: 1,
    //     PageSize: 99,
    //     CompanyName: query,
    //     HFId: this.dataObject.SiId || this.dataObject.FundId || this.dataObject.MedicalId,
    //     ProjectId: this.dataObject.ProjectId,
    //     PeriodYear: this.dataObject.PeriodYearMonth.getFullYear(),
    //     PeriodMonth: this.dataObject.PeriodYearMonth.getMonth() + 1,
    //     menuid: MenuIdDate(),
    //     operationcode: 1
    //   }
    //   GetMoneyRecordRecordList(qs.stringify(obj)).then(response => {
    //     this.loading = false
    //     if (response.IsSuccess) {
    //       this.paymentList = response.Data
    //     } else {
    //       this.$message({
    //         message: response.MessageContent,
    //         type: 'error'
    //       })
    //     }
    //   })
    // },
    //根据填入的值获取员工列表
    changeEmployees () {
      let isProjectId = this.dataObject.ProjectId ? true : false
      let isSiId = this.dataObject.SiId ? true : false
      let isFundId = this.dataObject.FundId ? true : false
      let isMedicalId = this.dataObject.MedicalId ? true : false
      let isBfCompany = this.dataObject.BfCompany ? true : false
      let isPeriodYearMonth = this.dataObject.PeriodYearMonth ? true : false
      let isValidation = true
      if (this.dimensionType == '0') {
        //为社保时
        if (this.dataObject.Type == '0') {
          // 按项目
          if (isProjectId && isPeriodYearMonth) {
            isValidation = true
            this.remoteSettle('')
            // this.remoteRecord('')
          } else {
            isValidation = false
          }
        } else {
          // 按账号维度
          if (isSiId && isPeriodYearMonth) {
            isValidation = true
            this.remoteSettle('')
            // this.remoteRecord('')
          } else {
            isValidation = false
          }
        }
      } else if (this.dimensionType == '1') {
        // 为公积金时
            console.log(isProjectId);
            console.log(isPeriodYearMonth);
          if (isProjectId && isPeriodYearMonth) {
            isValidation = true
          } else {
            isValidation = false
          }
          if (isProjectId && isPeriodYearMonth) {
            this.remoteSettle('')
            // this.remoteRecord('')
          }
          // if (isFundId && isBfCompany && isPeriodYearMonth) {
          //   console.log(isBfCompany);
          //   console.log(isFundId);
          //   console.log(isPeriodYearMonth);
          //   isValidation = true
          // } else {
          //   isValidation = false
          // }
          if (isFundId && isPeriodYearMonth) {
            this.remoteSettle('')
            // this.remoteRecord('')
          }
        
      } else if (this.dimensionType == '2') {
        // 为医保时
        if (this.dataObject.Type == '0') {
          if (isProjectId && isPeriodYearMonth) {
            isValidation = true
            this.remoteSettle('')
            // this.remoteRecord('')
          } else {
            isValidation = false
          }
        } else {
          if (isMedicalId && isPeriodYearMonth) {
            isValidation = true
            this.remoteSettle('')
            // this.remoteRecord('')
          } else {
            isValidation = false
          }
        }
      }
      if (this.dimensionType == '0') {
        console.log(111);
        if (isValidation) {
          let obj = {
            ProjectId: this.dataObject.ProjectId,
            SiId: this.dataObject.SiId,
            Year: 0,
            Month: 0,
            PeriodYear: this.dataObject.PeriodYearMonth.getFullYear(), // 接口文档有误 PeriodYear
            PeriodMonth: this.dataObject.PeriodYearMonth.getMonth() + 1,
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          console.log(obj);
          GetInsuranceSettleMember(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              if (response.Data && response.Data.length > 0) {
                this.choosestafflist = response.Data
                this.tableData = response.Data
                for (let i = 0; i < this.tableData.length; i++) {
                  this.$set(this.tableData[i], 'isshow', true)
                }
              } else {
                this.choosestafflist = []
                this.$message({
                  message: '未查找到需要结算的员工',
                  type: 'error'
                })
              }
            } else {
              this.choosestafflist = []
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }
      } else if (this.dimensionType == '1') {
        console.log(111);
        if (isValidation) {
          let obj = {
            BfCompany: this.dataObject.BfCompany,
            ProjectId: this.dataObject.ProjectId,
            FundId: this.dataObject.FundId,
            PeriodYear: this.dataObject.PeriodYearMonth.getFullYear(), // 接口文档有误 PeriodYear
            PeriodMonth: this.dataObject.PeriodYearMonth.getMonth() + 1,
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          GetHouseFundSettleMember(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              if (response.Data && response.Data.length > 0) {
                this.choosestafflist = response.Data
                this.tableData = response.Data
                for (let i = 0; i < this.tableData.length; i++) {
                  this.$set(this.tableData[i], 'isshow', true)
                }
              } else {
                this.choosestafflist = []
                this.$message({
                  message: '未查找到需要结算的员工',
                  type: 'error'
                })
              }
            } else {
              this.choosestafflist = []
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }
      } else if (this.dimensionType == '2') {
        if (isValidation) {
          let obj = {
            ProjectId: this.dataObject.ProjectId,
            MedicalId: this.dataObject.MedicalId,
            PeriodYear: this.dataObject.PeriodYearMonth.getFullYear(), // 接口文档有误 PeriodYear
            PeriodMonth: this.dataObject.PeriodYearMonth.getMonth() + 1,
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          GetMedicalSettleMember(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              if (response.Data && response.Data.length > 0) {
                this.choosestafflist = response.Data
                this.tableData = response.Data
                for (let i = 0; i < this.tableData.length; i++) {
                  this.$set(this.tableData[i], 'isshow', true)
                }
              } else {
                this.choosestafflist = []
                this.$message({
                  message: '未查找到需要结算的员工',
                  type: 'error'
                })
              }
            } else {
              this.choosestafflist = []
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }
      }
    },
    // 单元格移入
    mouseenter (row, column, cell, event) {
      row.checked = true
    },
    mouseleave (row, column, cell, event) {
      row.checked = false
    },
    //打开参与结算员工事件
    updatepeople () {
      this.showStatements = true
    },
    //修改参与结算员工事件
    StatementsSave (data) {
      this.choosestafflist = data
      this.showStatements = false
    },
    //关闭修改结算员工事件
    closeStatements (val) {
      this.showStatements = val
    },
    //生成结算单
    generateSingle (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const operating = JSON.parse(localStorage.getItem('operating')) || {}
          let FormObj = {
            'Title': this.dataObject.Title,
            'Type': this.dataObject.Type,
            'Year': this.dataObject.SocialSecurityDate ? this.dataObject.SocialSecurityDate.getFullYear() : '',
            'Month': this.dataObject.SocialSecurityDate ? this.dataObject.SocialSecurityDate.getMonth() + 1 : '',
            'PeriodYear': this.dataObject.PeriodYearMonth ? this.dataObject.PeriodYearMonth.getFullYear() : '',
            'PeriodMonth': this.dataObject.PeriodYearMonth ? this.dataObject.PeriodYearMonth.getMonth() + 1 : '',
            'menuid': operating.MenuId,
            'operationcode': operating.OperationCode,
            'SettleInfo': []
          }
          // 处理对应工资结算单
          // if (this.dataObject.MoneyRecordId && this.dataObject.MoneyRecordId.length) {
          //   FormObj.MoneyRecordIds = this.dataObject.MoneyRecordId.join(',')
          // } else {
          //   FormObj.MoneyRecordIds = ''
          // }
          if (this.dataObject.SettleId && this.dataObject.SettleId.length) {
            FormObj.SalarySettleIds = this.dataObject.SettleId.join(',')
          } else {
            FormObj.SalarySettleIds = ''
          }
          if (this.dimensionType == '0') {
            // 生成社保结算单
            if (this.dataObject.Type == '0') {
              FormObj.CompanyId = this.dataObject.CompanyId
              FormObj.ProjectId = this.dataObject.ProjectId
            }
            //  else {
            //   FormObj.BfInsuranceFundId = this.dataObject.SiId
            // }
            for (let i = 0; i < this.choosestafflist.length; i++) {
              FormObj.SettleInfo.push({ 'SiId': this.choosestafflist[i].SiId, 'Amount': this.choosestafflist[i].Total })
            }
            AddSiSettle(qs.stringify(FormObj)).then(response => {
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '生成社保结算单成功'
                })
                this.$router.go(-1)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent
                })
              }
            })
          } else if (this.dimensionType == '1') {
            // 生成公积金结算单
            if (this.dataObject.Type == '0') {
              FormObj.CompanyId = this.dataObject.CompanyId
              FormObj.ProjectId = this.dataObject.ProjectId
            } else {
              FormObj.BfInsuranceFundId = this.dataObject.FundId
            }
            for (let i = 0; i < this.choosestafflist.length; i++) {
              FormObj.SettleInfo.push({ 'HouseFundId': this.choosestafflist[i].HouseFundId, 'Amount': this.choosestafflist[i].TotalAmount })
            }
            AddHouseFundSettle(qs.stringify(FormObj)).then(response => {
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '生成公积金结算单成功'
                })
                this.$router.go(-1)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent
                })
              }
            })
          } else if (this.dimensionType == '2') {
            // 生成医保结算单
            if (this.dataObject.Type == '0') {
              FormObj.CompanyId = this.dataObject.CompanyId
              FormObj.ProjectId = this.dataObject.ProjectId
            } else {
              FormObj.BfInsuranceFundId = this.dataObject.MedicalId
            }
            for (let i = 0; i < this.choosestafflist.length; i++) {
              FormObj.SettleInfo.push({ 'MedicalId': this.choosestafflist[i].MedicalId, 'Amount': this.choosestafflist[i].Total })
            }
            AddMedicalSettle(qs.stringify(FormObj)).then(response => {
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '生成医保结算单成功'
                })
                this.$router.go(-1)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent
                })
              }
            })
          }
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    closedialog () {
      this.$router.go(-1)
    },
  }
}
</script>
<style lang="scss" scoped>
.AddGenerateStatement-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .AddGenerateStatement-content {
    background: #fff;
    overflow: hidden;
    border-radius: 8px 0 0 8px;
    margin-left: 24px;
    padding: 40px;
    .calculation-title {
      font-size: $f16;
      color: $erp333;
      line-height: 16px;
      position: relative;
      padding-left: 12px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      > .operate {
        font-size: $f14;
        color: $erpplaceholder;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 16px;
        background-color: $erpcolor;
      }
    }
    // 表格样式
    /deep/ .el-form-item {
      margin-bottom: 24px;
      .el-form-item__label {
        line-height: 14px;
        font-size: $f14;
        color: $erp666;
        font-weight: 400;
        padding-bottom: 8px;
      }
      .el-form-item__content {
        width: 100%;
        .el-input {
          font-size: 14px;
          .el-input__inner {
            height: 36px;
            line-height: 36px;
          }
          .el-input__suffix {
            height: 36px;
            line-height: 36px;
          }
        }
        .el-input__inner {
          border: 1px solid $erinputbgc;
          background-color: $erinputbgc;
        }
        .el-select {
          width: 100%;
          .el-input {
            .el-input__inner {
              height: 36px;
              line-height: 36px;
            }
          }
          .el-input__suffix {
            height: 38px;
            line-height: 38px;
          }
        }
        .el-date-editor {
          width: 100%;
          .el-range-input {
            background-color: #f0f4fa;
          }
        }
      }
      .choosepeople {
        margin-top: 20px;
        .num {
          color: #1588f8;
        }
        .erpbtn {
          margin-left: 10px;
        }
      }
    }
    /deep/ .is-error {
      .el-form-item__content {
        .el-input__inner {
          border: 1px solid #f56c6c;
        }
      }
    }
    .footer {
      text-align: center;
      .el-button + .el-button {
        margin-left: 24px;
      }
    }
  }
}
</style>