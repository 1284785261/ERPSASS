<!-- 导入薪酬表 -->
<template>
  <div class="payroll-header-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="payroll-content">
      <div class="payroll-title">导入薪酬表</div>
      <el-form ref="ruleForm" label-position="top" :model="searchObject" :rules="rules" class="forms-Compensation">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="所属客户">
              <el-select class="bginput" size="small" ref="project" v-model="searchObject.CompanyId" filterable remote clearable placeholder="搜索选择客户" :remote-method="CompanyMethod" @change="chooseCompany" @clear="CompanyMethod('')">
                <el-option v-for="item in CompanyList" :key="item.Id" :label="item.Name" :value="item.Id">
                </el-option>
                <div v-if="CompanyList.length > 99" class="search-keyword">
                  <span>只显示前100条结果，请完善搜索关键字</span>
                </div>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="所属项目" prop="ProjectId">
              <el-select class="bginput" size="small" ref="project" v-model="searchObject.ProjectId" filterable remote clearable placeholder="先选择客户再搜索选择项目" @change="changeproject" :remote-method="ProjectMethod" @clear="ProjectMethod('')">
                <el-option v-for="item in Projectlist" :key="item.Id" :label="item.Name" :value="item.Id">
                </el-option>
                <div v-if="Projectlist.length > 99" class="search-keyword">
                  <span>只显示前100条结果，请完善搜索关键字</span>
                </div>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="工资所属年月" prop="month">
              <el-date-picker size="small" v-model="searchObject.month" class="bginput" type="month" placeholder="选择工资所属年月"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="社保所属年月" prop="SiYearMonth">
              <el-date-picker size="small" v-model="searchObject.SiYearMonth" class="bginput" type="month" placeholder="选择社保所属年月"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="公积金所属年月" prop="FundYearMonth">
              <el-date-picker size="small" v-model="searchObject.FundYearMonth" class="bginput" type="month" placeholder="选择公积金所属年月"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="输入导入的sheet表名称">
              <el-input class="bginput" v-model="searchObject.SheetName" clearable size="small" placeholder="输入工作表名称" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="客户工资表标题起始行" prop="StartRow">
              <el-input class="bginput" v-model="searchObject.StartRow" clearable size="small" placeholder="表格内的行数(数字:例如:1,2,3...)" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="客户工资表标题结束行" prop="EndRow">
              <el-input class="bginput" v-model="searchObject.EndRow" clearable size="small" placeholder="表格内的行数(数字:例如:1,2,3...)" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="客户工资表标题起始列" prop="StartCol">
              <el-input class="bginput" v-model="searchObject.StartCol" clearable size="small" placeholder="表格内的列数(数字:例如:1,2,3...)" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="客户工资表标题结束列" prop="EndCol">
              <el-input class="bginput" v-model="searchObject.EndCol" clearable size="small" placeholder="表格内的列数(数字:例如:1,2,3...)" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="客户工资表内容结束行" prop="Finirow">
              <el-input class="bginput" v-model="searchObject.Finirow" clearable size="small" placeholder="表格内的行数(数字:例如:1,2,3...)" />
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="是否替换">
              <el-radio-group v-model="searchObject.Type" @change="radiochange">
                <el-radio :label="0">新增</el-radio>
                <el-radio :label="1">替换</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-if="searchObject.Type===1">
            <el-form-item label="所属批次" class="counternumber">
              <el-input-number size="small" class="bginput" v-model.number="searchObject.SalaryBatchId" :min="1" :max="100" label="入账批次"></el-input-number>
            </el-form-item>
          </el-col> -->
        </el-row>
        <div class="tableHeader-operation">
          <el-button class="erpbtn" size="middle" :loading="uploadLoading">选择工资表文档</el-button>
          <input ref="uploadfile" type="file" accept=".xls,.xlsx" name="file" @change="uploadFile">
          <span v-if="fileters && fileters.name" style="margin-left:20px;">{{fileters.name}}</span>
        </div>
        <div class="systemField-content" v-if="isheader">
          <el-table ref="industrtTable" :data="systemFieldList" class="ImportWages-table" tooltip-effect="dark">
            <el-table-column align="center" type="index" label="序号" width="80px" />
            <el-table-column align="center" prop="system" label="系统工资表字段名称" width="200px" />
            <el-table-column align="center" prop="name" label="客户工资表字段名称">
              <template slot-scope="scope">
                <div>
                  <el-select v-model="scope.row.Itemname" filterable clearable placeholder="请选择" class="select-input select-vlue">
                    <el-option v-for="(item,index) in CustomerFieldList" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="aliasaname" label="客户工资项别名">
              <template slot-scope="scope">
                <el-input class="input-select" v-model="scope.row.aliasaname" clearable size="small" placeholder="请输入客户工资项别名(多个请用逗号隔开)" />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="payroll-bottom">
          <el-button class="erpbtn" @click="closepayroll">取消</el-button>
          <el-button v-if="!isheader" class="erpbtn" @click="save">开始导入</el-button>
          <el-button v-if="isheader" class="erpbtn" @click="saveandimport('ruleForm')">开始导入</el-button>
        </div>
      </el-form>
    </div>
    <div class="dialog">
      <el-dialog :close-on-click-modal="false" title="工资导入结果反馈" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
        <div class="error-box">
          <div class="error-top">
            <!-- <div class="success-total">成功 {{errordata.Successes}}</div> -->
            <div class="error-total">员工合同信息异常 <span>{{errordata.length}}</span> 条</div>
          </div>
          <div class="error-content">
            <div class="row" v-for="(item, index) in errordata" :key="index">
              <!-- <div class="index">第{{item.Rows}}条</div> -->
              <div class="con">{{item}}</div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer three-footer">
          <el-button class="erpbtn" size="small" @click="dialogVisible=!dialogVisible">前去处理</el-button>
          <el-button v-show="showBtn" class="erpbtn" size="small" @click="beginimport">忽略, 继续导入</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { AddSalaryBatch, GetSalaryBatch } from '@/api/CompensationServiceManagement.js'
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetProjectList } from '@/api/projectManagement.js'
import { GetSalaryTableHead, AddSalaryMap, GetSalaryMap, EditSalaryMap } from '@/api/BusinessSet.js'
import { GetSalaryMapByProjectId } from '@/api/BusinessSet.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '薪酬管理',
        router: '/CompensationServiceManagement/CompensationManagement'
      }, {
        name: '导入薪酬表',
        router: ''
      }],
      searchObject: {
        SalaryBatchId: '',
        SheetName: '',
        StartRow: '',
        EndRow: '',
        EndCol: '',
        Finirow: '',
        StartCol: '',
        ProjectId: '',
        CompanyId: '',
        SalaryYear: '',
        SalaryMonth: '',
        SiYear: '',
        SiMonth: '',
        FundYear: '',
        FundMonth: '',
        Type: 0,
        SalaryBatchId: '',
        month: '', // 自定义的月份
        SiYearMonth: '',
        FundYearMonth: '',
        Status: 1
      },
      uploadLoading: false,
      CustomerFieldList: [],
      Projectlist: [], // 项目列表
      CompanyList: [], // 客户列表
      fileters: null, // 上传文件
      isheader: false, // 是否展示上传表头
      Id: '', // 批次导入信息
      headerId: '', // 表头Id

      dialogVisible: false,
      errordata: [], // 错误信息
      showBtn: true, // 显示忽略继续导入按钮

      rules: {
        ProjectId: [
          { required: true, message: '请选择项目', trigger: 'change' },
        ],
        month: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        SiYearMonth: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        FundYearMonth: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        StartRow: [
          { required: true, message: '请输入标题起始行', trigger: 'blur' },
        ],
        EndRow: [
          { required: true, message: '请输入标题结束行', trigger: 'blur' },
        ],
        StartCol: [
          { required: true, message: '请输入标题起始列', trigger: 'blur' },
        ],
        Finirow: [
          { required: true, message: '请输入内容结束行', trigger: 'blur' },
        ]
      }, // 规则

      systemFieldList: [{
        system: '基本工资',
        name: 'Base',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '应发工资',
        name: 'ShouldPay',
        Itemname: '',
        aliasaname: ''

      }, {
        system: '基本养老（企业部分）',
        name: 'EndowmentEnt',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '基本养老（个人部分）',
        name: 'EndowmentPers',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '失业保险（企业部分）',
        name: 'UnemploymentEnt',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '失业保险（个人部分）',
        name: 'UnemploymentPers',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '工伤保险（企业部分）',
        name: 'InjuryEnt',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '工伤保险（个人部分）',
        name: 'InjuryPers',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '医疗保险（企业部分）',
        name: 'MedicalEnt',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '医疗保险（个人部分）',
        name: 'MedicalPers',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '生育保险（企业部分）',
        name: 'BirthEnt',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '生育保险（个人部分）',
        name: 'BirthPers',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '公积金缴纳（企业部分）',
        name: 'HouseFundEnt',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '公积金缴纳（个人部分）',
        name: 'HouseFundPers',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '长护保险（企业部分）',
        name: 'LongCareEnt',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '长护保险（个人部分）',
        name: 'LongCarePers',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '公积金缴纳（企业部分）补收补退',
        name: 'HouseFundEntPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '公积金缴纳（个人部分）补收补退',
        name: 'HouseFundPersPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '养老保险（企业部分）补收补退',
        name: 'EndowmentEntPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '养老保险（个人部分）补收补退',
        name: 'EndowmentPersPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '医疗保险（企业部分）补收补退',
        name: 'MedicalEntPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '医疗保险（个人部分）补收补退',
        name: 'MedicalPersPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '大额医疗保险（企业部分）补收补退',
        name: 'BigMedicalEntPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '大额医疗保险（个人部分）补收补退',
        name: 'BigMedicalPersPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '失业保险（企业部分）补收补退',
        name: 'UnemploymentEntPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '失业保险（个人部分）补收补退',
        name: 'UnemploymentPersPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '生育保险（企业部分）补收补退',
        name: 'BirthEntPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '生育保险（个人部分）补收补退',
        name: 'BirthPersPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '工伤保险（企业部分）补收补退',
        name: 'InjuryEntPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '工伤保险（个人部分）补收补退',
        name: 'InjuryPersPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '长护保险（企业部分）补收补退',
        name: 'LongCareEntPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '长护保险（个人部分）补收补退',
        name: 'LongCarePersPayback',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '个税',
        name: 'PersonalTax',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '实发工资(税前)',
        name: 'RealPayTaxBefore',
        Itemname: '',
        aliasaname: ''

      }, {
        system: '实发工资(税后)',
        name: 'RealPayTaxAfter',
        Itemname: '',
        aliasaname: ''

      }, {
        system: '雇主险（企业部分）',
        name: 'Employer',
        Itemname: '',
        aliasaname: ''

      }, {
        system: '残保金（企业部分）',
        name: 'NoHealth',
        Itemname: '',
        aliasaname: ''

      }, {
        system: '大额医疗保险(企业部分)',
        name: 'BigMedicalEnt',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '大额医疗保险(个人部分)',
        name: 'BigMedicalPers',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '企业工会费',
        name: 'UnionFeeEnt',
        Itemname: '',
        aliasaname: ''

      }, {
        system: '个人工会费',
        name: 'UnionFeePers',
        Itemname: '',
        aliasaname: ''

      }, {
        system: '员工福利',
        name: 'Benifits',
        Itemname: '',
        aliasaname: ''

      }, {
        system: '体检费',
        name: 'HealthExam',
        Itemname: '',
        aliasaname: ''

      }, {
        system: '意外险',
        name: 'UnexpectEnt',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '管理费',
        name: 'MgrFee',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '税费',
        name: 'Tax',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '结算费用合计',
        name: 'TotalAmount',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '工资加项1',
        name: 'OtherAdd1',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '工资加项2',
        name: 'OtherAdd2',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '工资加项3',
        name: 'OtherAdd3',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '工资减项1',
        name: 'OtherReduce1',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '工资减项2',
        name: 'OtherReduce2',
        Itemname: '',
        aliasaname: ''
      }, {
        system: '工资减项3',
        name: 'OtherReduce3',
        Itemname: '',
        aliasaname: ''
      }],
    }
  },
  created () {
    // 判断是添加还是替换
    if (this.$route.query.id) {
      this.Id = this.$route.query.id
      this.getSalaryBatch()
    } else {
      this.searchObject.Type = 0
      // 判断是否自动填充客户项目
      const ProjectDetail = JSON.parse(window.localStorage.getItem('projectdetail')) || {}
      if (this.$route.query.ProjectId) {
        this.searchObject.ProjectId = ProjectDetail.Id
        this.Projectlist = [{
          Name: ProjectDetail.Name,
          Id: ProjectDetail.Id
        }]
        this.changeproject(ProjectDetail.Id)
      } else {
        this.CompanyMethod('')
      }
      if (this.$route.query.CompanyId) {
        this.searchObject.CompanyId = ProjectDetail.CompanyId
        this.CompanyList = [{
          Name: ProjectDetail.CompanyName,
          Id: ProjectDetail.CompanyId
        }]
      }
    }
    // this.ProjectMethod('')
  },
  methods: {
    ruleFunctions (arr) {
      let publicRulse1 = '企业'
      let publicRulse2 = '单位'
      let publicRulse3 = '个人'
      let publicRulse4 = '补收补退'
      let rulse1 = '养老'
      let rulse2 = '失业'
      let rulse3 = '工伤'
      let rulse4 = '医疗'
      let rulse5 = '生育'
      let rulse6 = '公积金'
      let rulse7 = '大'
      let rulse8 = '雇主险'
      let rulse9 = '残保金'
      let rulse10 = '合计'
      let rulse11 = '实发工资'
      let rulse12 = '长护'
      let rulse13 = '工会'
      let rulse14 = '税金'
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].Itemname == '') {
          for (let j = 0; j < this.CustomerFieldList.length; j++) {
            if (arr[i].system.length == 4 || arr[i].system.length < 4) {
              if (this.CustomerFieldList[j].indexOf(arr[i].system) >= 0) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
            }
            if (arr[i].system == '结算费用合计' && this.CustomerFieldList[j] == rulse10) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if (arr[i].system.indexOf(rulse8) >= 0 && this.CustomerFieldList[j].indexOf(rulse8) >= 0) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if (arr[i].system.indexOf(rulse9) >= 0 && this.CustomerFieldList[j].indexOf(rulse9) >= 0) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if (arr[i].system.indexOf(rulse11) >= 0 && this.CustomerFieldList[j].indexOf(rulse11) >= 0) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            // 税费匹配 税费|税金
            if (arr[i].system == '税费' && (this.CustomerFieldList[j].indexOf('税费') >= 0 ? this.CustomerFieldList[j].indexOf('税费') >= 0 : this.CustomerFieldList[j].indexOf(rulse14) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if (!arr[i].system.includes(publicRulse4) && !this.CustomerFieldList[j].includes(publicRulse4)) {
              // 匹配基本养老字段
              if ((arr[i].system.indexOf(rulse1) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse1) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              if ((arr[i].system.indexOf(rulse1) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse1) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              // 匹配失业保险字段
              if ((arr[i].system.indexOf(rulse2) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse2) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              if ((arr[i].system.indexOf(rulse2) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse2) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              // 匹配工伤保险字段
              if ((arr[i].system.indexOf(rulse3) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse3) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              if ((arr[i].system.indexOf(rulse3) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse3) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              // 匹配医疗保险字段
              if ((arr[i].system.indexOf(rulse4) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse4) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              if ((arr[i].system.indexOf(rulse4) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse4) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              // 匹配生育保险字段
              if ((arr[i].system.indexOf(rulse5) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse5) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              if ((arr[i].system.indexOf(rulse5) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse5) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              // 匹配公积金保险字段
              if ((arr[i].system.indexOf(rulse6) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse6) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              if ((arr[i].system.indexOf(rulse6) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse6) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              // 匹配大额医疗保险字段
              if ((arr[i].system.indexOf(rulse7) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse7) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              if ((arr[i].system.indexOf(rulse7) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse7) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              // 匹配长护保险字段
              if ((arr[i].system.indexOf(rulse12) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse12) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              if ((arr[i].system.indexOf(rulse12) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse12) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              // 匹配工会费
              if ((arr[i].system.indexOf(rulse13) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse13) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
              if ((arr[i].system.indexOf(rulse13) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse13) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
                arr[i].Itemname = this.CustomerFieldList[j]
              }
            }
          }
        }
      }
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < this.CustomerFieldList.length; j++) {
          if (arr[i].system.includes(publicRulse4) && this.CustomerFieldList[j].includes(publicRulse4)) {
            if ((arr[i].system.indexOf(rulse1) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse1) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if ((arr[i].system.indexOf(rulse1) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse1) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            // 匹配失业保险补收补退字段
            if ((arr[i].system.indexOf(rulse2) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse2) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if ((arr[i].system.indexOf(rulse2) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse2) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            // 匹配工伤保险补收补退字段
            if ((arr[i].system.indexOf(rulse3) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse3) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if ((arr[i].system.indexOf(rulse3) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse3) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            // 匹配医疗保险补收补退字段
            if ((arr[i].system.indexOf(rulse4) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse4) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if ((arr[i].system.indexOf(rulse4) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse4) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            // 匹配生育保险补收补退字段
            if ((arr[i].system.indexOf(rulse5) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse5) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if ((arr[i].system.indexOf(rulse5) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse5) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            // 匹配公积金保险补收补退字段
            if ((arr[i].system.indexOf(rulse6) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse6) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if ((arr[i].system.indexOf(rulse6) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse6) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            // 匹配大额医疗保险补收补退字段
            if ((arr[i].system.indexOf(rulse7) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse7) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if ((arr[i].system.indexOf(rulse7) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse7) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            // 匹配长护保险补收补退字段
            if ((arr[i].system.indexOf(rulse12) >= 0 && arr[i].system.indexOf(publicRulse1) >= 0) && (this.CustomerFieldList[j].indexOf(rulse12) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse2) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
            if ((arr[i].system.indexOf(rulse12) >= 0 && arr[i].system.indexOf(publicRulse3) >= 0) && (this.CustomerFieldList[j].indexOf(rulse12) >= 0 && this.CustomerFieldList[j].indexOf(publicRulse3) >= 0)) {
              arr[i].Itemname = this.CustomerFieldList[j]
            }
          }
        }
      }
    },
    // 获取工资批次信息详情
    getSalaryBatch () {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetSalaryBatch(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data.CompanyId) {
            this.CompanyList = [{
              Name: response.Data.CompanyName,
              Id: response.Data.CompanyId
            }]
          }
          if (response.Data.ProjectId) {
            this.Projectlist = [{
              Name: response.Data.ProjectName,
              Id: response.Data.ProjectId
            }]
          }
          if (response.Data.SalaryYear && response.Data.SalaryMonth) {
            response.Data.month = new Date(response.Data.SalaryYear, response.Data.SalaryMonth - 1)
          }
          if (response.Data.SiYear && response.Data.SiMonth) {
            response.Data.SiYearMonth = new Date(response.Data.SiYear, response.Data.SiMonth - 1)
          }
          if (response.Data.FundYear && response.Data.FundMonth) {
            response.Data.FundYearMonth = new Date(response.Data.FundYear, response.Data.FundMonth - 1)
          }
          this.searchObject = response.Data
          this.$set(this.searchObject, 'Type', 1)
          this.$set(this.searchObject, 'SalaryBatchId', this.Id)
          this.$set(this.searchObject, 'SheetName', '')
          // 搜索相应项目的影射
          this.changeproject(response.Data.ProjectId)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 搜索客户列表
    CompanyMethod (value) {
      let obj = {
        Name: value,
        SysUserName: '',
        ContactName: '',
        StartDate: '',
        EndDate: '',
        Type: -1,
        PageIndex: 1,
        PageSize: 100,
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetCompanyPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.CompanyList = response.Data
          } else {
            this.CompanyList = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 选择客户
    chooseCompany (e) {
      // console.log(e)
      if (e) {
        this.searchObject.ProjectId = ''
        this.ProjectMethod('')
      } else {
        this.Projectlist = []
        this.searchObject.ProjectId = ''
      }
    },
    // 搜索项目列表
    ProjectMethod (value) {
      let obj = {
        Name: value,
        SysUserName: '',
        Status: -1,
        BusinessType: -1,
        Priority: -1,
        CompanyId: this.searchObject.CompanyId,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetProjectList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.Projectlist = response.Data
          } else {
            this.Projectlist = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 查询工作表
    changeproject (e) {
      console.log(e);
      if (e) {
        let obj = {
          ProjectId: e,
          menuid: MenuIdDate(),
          operationcode: 1
        }
        showLoading()
        GetSalaryMapByProjectId(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data) {
              this.$set(this.searchObject, 'SheetName', response.Data.SheetName)
              this.$set(this.searchObject, 'StartRow', response.Data.StartRow)
              this.$set(this.searchObject, 'StartCol', response.Data.StartCol)
              // this.searchObject.SheetName = response.Data.SheetName
              // this.searchObject.StartRow = response.Data.StartRow
              // this.searchObject.StartCol = response.Data.StartCol
              this.headerId = response.Data.Id // 存储表头Id
            } else {
              // this.searchObject.SheetName = ''
              // this.searchObject.StartRow = ''
              // this.searchObject.StartCol = ''
              this.$set(this.searchObject, 'SheetName', '')
              this.$set(this.searchObject, 'StartRow', '')
              this.$set(this.searchObject, 'StartCol', '')
              this.headerId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          hideLoading()
        })
      }
    },
    //导入文件映射
    uploadFile (e) {
      console.log(e);
      var uploader
      const files = e.target.files[0]
      if (!this.searchObject.StartRow || !this.searchObject.StartCol) {
        this.$message({
          message: '请先输入映射表的起始行和起始列',
          type: 'warning'
        })
        e.target.value = []
        return false
      }
      if (files) {
        var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'xls' || ext == 'xlsx') {
        } else {
          this.$message({
            message: '不支持该格式文件上传',
            type: 'warning'
          })
          e.target.value = []
          return false
        }
        if (files.size > (20 * 1024 * 1024)) {
          this.$message({
            message: '文件大小超过最大限制',
            type: 'warning'
          })
          e.target.value = []
          return false
        } else {
          this.fileters = files
          this.isheader = false
          e.target.value = []
        }
      }
    },
    // 选择是否替换
    radiochange (e) {
      if (e === 0) {
        this.searchObject.SalaryBatchId = ''
      }
    },
    // 关闭导入薪酬表
    closepayroll () {
      this.$router.go(-1)
    },

    closedialog () {

    },

    // 保存
    save () {
      this.$refs.ruleForm.validate(v => {
        if (v) {
          // 处理月份
          if (this.searchObject.month) {
            this.searchObject.SalaryYear = this.searchObject.month.getFullYear()
            this.searchObject.SalaryMonth = this.searchObject.month.getMonth() + 1
          }
          if (this.searchObject.SiYearMonth) {
            this.searchObject.SiYear = this.searchObject.SiYearMonth.getFullYear()
            this.searchObject.SiMonth = this.searchObject.SiYearMonth.getMonth() + 1
          }
          if (this.searchObject.FundYearMonth) {
            this.searchObject.FundYear = this.searchObject.FundYearMonth.getFullYear()
            this.searchObject.FundMonth = this.searchObject.FundYearMonth.getMonth() + 1
          }
          // 判断是否选择了文件
          if (this.fileters) {
            console.log(this.fileters);
            let param = new FormData()
            param.append('file', this.fileters)
            param.append('SheetName', this.searchObject.SheetName)
            param.append('StartRow', this.searchObject.StartRow)
            param.append('EndRow', this.searchObject.EndRow)
            param.append('StartCol', this.searchObject.StartCol)
            param.append('EndCol', this.searchObject.EndCol)
            param.append('Finirow', this.searchObject.Finirow)
            param.append('ProjectId', this.searchObject.ProjectId)
            param.append('SalaryYear', this.searchObject.SalaryYear)
            param.append('SalaryMonth', this.searchObject.SalaryMonth)
            param.append('SiYear', this.searchObject.SiYear)
            param.append('SiMonth', this.searchObject.SiMonth)
            param.append('FundYear', this.searchObject.FundYear)
            param.append('FundMonth', this.searchObject.FundMonth)
            param.append('Continue', 0)
            param.menuid = MenuIdDate()
            param.operationcode = 1
            // 判断是否选择添加还是修改
            if (this.searchObject.Type === 1) {
              param.append('Type', this.searchObject.Type)
              param.append('SalaryBatchId', this.searchObject.SalaryBatchId)
            } else {
              param.append('Type', 0)
            }
            // 调用接口导入工资表
            showLoading()
            AddSalaryBatch(param).then(response => {
              hideLoading()
              if (response.IsSuccess) {
                // 成功时直接跳转到列表
                this.$message({
                  message: response.MessageContent,
                  type: 'success'
                })
                this.$router.go(-1)
              } else {
                if (response.MessageCode === 301) {
                  // 如果返回的结果为都不匹配就重新设置表头
                  this.$message({
                    message: '请重新配置映射字段!',
                    type: 'warning'
                  })
                  setTimeout(() => {
                    this.isheader = true
                    showLoading()
                    new Promise((resolve, reject) => {
                      let objparam = new FormData()
                      objparam.append('file', this.fileters)
                      objparam.append('SheetName', this.searchObject.SheetName)
                      objparam.append('StartRow', this.searchObject.StartRow)
                      objparam.append('EndRow', this.searchObject.EndRow)
                      objparam.append('StartCol', this.searchObject.StartCol)
                      objparam.append('EndCol', this.searchObject.EndCol)
                      objparam.menuid = MenuIdDate()
                      objparam.operationcode = 1
                      GetSalaryTableHead(objparam).then(response => {
                        if (response.IsSuccess) {
                          this.$message({
                            type: 'success',
                            message: '解析工资映射表成功'
                          })
                          this.CustomerFieldList = response.Data
                          resolve(this.CustomerFieldList)
                        } else {
                          hideLoading()
                          this.$message({
                            message: response.MessageContent,
                            type: 'error'
                          })
                        }
                      })
                    }).then(value => {
                      // 这里需要判断是否有表头headerId, 如果有表头headerId就进行修改操作,如果没有就进行获取表头操作
                      if (this.headerId) {
                        // 获取表头信息
                        let headerObj = {
                          Id: this.headerId,
                          menuid: MenuIdDate(),
                          operationcode: '1'
                        }
                        GetSalaryMap(qs.stringify(headerObj)).then(headerResponse => {
                          hideLoading()
                          if (headerResponse.IsSuccess) {
                            let ItemMap = JSON.parse(headerResponse.Data.ItemMap)
                            let arr = []
                            for (const key in ItemMap) {
                              // 新增判断搜索新列表里面的每一项和当前默认选中的一样, 进行清空操作
                              value.find(v => v == ItemMap[key]) ? false : ItemMap[key] = ''
                              let arr1 = ItemMap[key].split(':')
                              if (arr1.length > 1) {
                                arr.push({ 'name': key, 'Itemname': arr1[0], 'aliasaname': arr1[1] })
                              } else {
                                arr.push({ 'name': key, 'Itemname': arr1[0], 'aliasaname': '' })
                              }
                            }
                            for (let i = 0; i < this.systemFieldList.length; i++) {
                              for (let j = 0; j < arr.length; j++) {
                                if (arr[j].name == this.systemFieldList[i].name) {
                                  this.systemFieldList[i].Itemname = arr[j].Itemname
                                  this.systemFieldList[i].aliasaname = arr[j].aliasaname
                                }
                              }
                            }
                            this.ruleFunctions(this.systemFieldList)
                          } else {
                            this.$message({
                              message: headerResponse.MessageContent,
                              type: 'error'
                            })
                          }
                        })
                      } else {
                        hideLoading()
                        this.systemFieldList = this.$options.data().systemFieldList
                        this.ruleFunctions(this.systemFieldList)
                      }
                    })
                  }, 1000)
                  // setTimeout(() => {
                  //   this.isheader = true
                  //   let objparam = new FormData()
                  //   objparam.append('file', this.fileters)
                  //   objparam.append('SheetName', this.searchObject.SheetName)
                  //   objparam.append('StartRow', this.searchObject.StartRow)
                  //   objparam.append('EndRow', this.searchObject.EndRow)
                  //   objparam.append('StartCol', this.searchObject.StartCol)
                  //   objparam.append('EndCol', this.searchObject.EndCol)
                  //   objparam.menuid = MenuIdDate()
                  //   objparam.operationcode = 1
                  //   GetSalaryTableHead(objparam).then(response => {
                  //     hideLoading()
                  //     if (response.IsSuccess) {
                  //       this.CustomerFieldList = response.Data
                  //       this.systemFieldList = this.$options.data().systemFieldList
                  //       this.ruleFunctions(this.systemFieldList)
                  //       this.$message({
                  //         type: 'success',
                  //         message: '解析工资映射表成功'
                  //       })
                  //     } else {
                  //       this.$message({
                  //         message: response.MessageContent,
                  //         type: 'error'
                  //       })
                  //     }
                  //   })
                  // }, 1000)
                  return
                } else if (response.MessageCode === 305) {
                  // 数据不完整可以选择性操作
                  this.showBtn = true
                  this.dialogVisible = true
                  this.errordata = response.Data
                  return
                } else {
                  this.fileters = null
                  console.log(this.$refs.uploadfile);
                  this.$refs.uploadfile.value = null
                  // 20210226修改,当失败的时候打开失败弹框, 不能选择忽略继续导入按钮
                  // 判断有没有错误数据
                  if (response.Data && response.Data.length) {
                    this.showBtn = false
                    this.errordata = response.Data
                    this.dialogVisible = true
                  } else {
                    this.$message({
                      message: response.MessageContent,
                      type: 'error'
                    })
                  }
                }
              }
            })
          } else {
            this.$message({
              message: '请选择导入文件',
              type: 'warning'
            })
          }
        }
      })
    },
    // 保存表头并上传薪酬
    saveandimport (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 处理月份
          if (this.searchObject.month) {
            this.searchObject.SalaryYear = this.searchObject.month.getFullYear()
            this.searchObject.SalaryMonth = this.searchObject.month.getMonth() + 1
          }
          if (this.searchObject.SiYearMonth) {
            this.searchObject.SiYear = this.searchObject.SiYearMonth.getFullYear()
            this.searchObject.SiMonth = this.searchObject.SiYearMonth.getMonth() + 1
          }
          if (this.searchObject.FundYearMonth) {
            this.searchObject.FundYear = this.searchObject.FundYearMonth.getFullYear()
            this.searchObject.FundMonth = this.searchObject.FundYearMonth.getMonth() + 1
          }
          let param = {
            CompanyId: this.searchObject.CompanyId,
            ProjectId: this.searchObject.ProjectId,
            StartRow: this.searchObject.StartRow,
            StartCol: this.searchObject.StartCol,
            Status: this.searchObject.Status,
            FieldName: this.CustomerFieldList,
            SheetName: this.searchObject.SheetName,
            menuid: MenuIdDate(),
            operationcode: 1,
            ItemMap: '',
          }
          let obj = {}
          for (let i = 0; i < this.systemFieldList.length; i++) {
            if (this.systemFieldList[i].Itemname) {
              if (this.systemFieldList[i].aliasaname) {
                obj[this.systemFieldList[i].name] = this.systemFieldList[i].Itemname + ':' + this.systemFieldList[i].aliasaname
              } else {
                obj[this.systemFieldList[i].name] = this.systemFieldList[i].Itemname
              }

            }
          }
          if (JSON.stringify(obj) == '{}') {
            this.$message({
              type: 'error',
              message: '你未映射任何字段，无法提交'
            })
            hideLoading()
            return
          }
          param.ItemMap = JSON.stringify(obj)
          showLoading()
          console.log(param)
          // 用headerId判断表头影射是添加影射还是修改影射
          new Promise((resolve, reject) => {
            if (this.headerId) {
              // 修改
              param.Id = this.headerId
              EditSalaryMap(param).then(response => {
                if (response.IsSuccess) {
                  resolve()
                } else {
                  reject(response.MessageContent)
                }
              })
            } else {
              // 添加
              AddSalaryMap(param).then(response => {
                if (response.IsSuccess) {
                  resolve()
                } else {
                  reject(response.MessageContent)
                }
              })
            }
          }).then(value => {
            let paramobj = new FormData()
            console.log(this.fileters, paramobj)
            paramobj.append('file', this.fileters)
            paramobj.append('SheetName', this.searchObject.SheetName)
            paramobj.append('StartRow', this.searchObject.StartRow)
            paramobj.append('EndRow', this.searchObject.EndRow)
            paramobj.append('StartCol', this.searchObject.StartCol)
            paramobj.append('EndCol', this.searchObject.EndCol)
            paramobj.append('Finirow', this.searchObject.Finirow)
            paramobj.append('ProjectId', this.searchObject.ProjectId)
            paramobj.append('SalaryYear', this.searchObject.SalaryYear)
            paramobj.append('SalaryMonth', this.searchObject.SalaryMonth)
            paramobj.append('SiYear', this.searchObject.SiYear)
            paramobj.append('SiMonth', this.searchObject.SiMonth)
            paramobj.append('FundYear', this.searchObject.FundYear)
            paramobj.append('FundMonth', this.searchObject.FundMonth)
            paramobj.append('Continue', 0)
            paramobj.menuid = MenuIdDate()
            paramobj.operationcode = '1'
            // 判断导入薪酬是导入薪酬 还是替换薪酬
            if (this.searchObject.Type === 1) {
              paramobj.append('Type', this.searchObject.Type)
              paramobj.append('SalaryBatchId', this.searchObject.SalaryBatchId)
            } else {
              paramobj.append('Type', 0)
            }
            return new Promise((resolve, reject) => {
              AddSalaryBatch(paramobj).then(response => {
                hideLoading()
                if (response.IsSuccess) {
                  this.$message({
                    message: response.MessageContent,
                    type: 'success'
                  })
                  this.$router.go(-1)
                } else {
                  // 修改判断错误码305来判断是否内忽略继续导入
                  if (response.MessageCode === 305) {
                    // 数据不完整可以选择性操作
                    this.showBtn = true
                    this.dialogVisible = true
                    this.errordata = response.Data
                  } else {
                    this.isheader = false
                    this.fileters = null
                    this.$refs.uploadfile.value = null
                    if (response.Data && response.Data.length) {
                      this.showBtn = false
                      this.errordata = response.Data
                      this.dialogVisible = true
                    } else {
                      reject(response.MessageContent)
                    }
                  }
                }
              })
            })
          }).catch(error => {
            hideLoading()
            this.$message({
              message: error,
              type: 'error'
            })
          })
          // AddSalaryMap(param).then(response => {
          //   if (response.IsSuccess) {
          //     let paramobj = new FormData()
          //     console.log(this.fileters, paramobj)
          //     paramobj.append('file', this.fileters)
          //     paramobj.append('SheetName', this.searchObject.SheetName)
          //     paramobj.append('StartRow', this.searchObject.StartRow)
          //     paramobj.append('EndRow', this.searchObject.EndRow)
          //     paramobj.append('StartCol', this.searchObject.StartCol)
          //     paramobj.append('EndCol', this.searchObject.EndCol)
          //     paramobj.append('Finirow', this.searchObject.Finirow)
          //     paramobj.append('ProjectId', this.searchObject.ProjectId)
          //     paramobj.append('SalaryYear', this.searchObject.SalaryYear)
          //     paramobj.append('SalaryMonth', this.searchObject.SalaryMonth)
          //     paramobj.append('SiYear', this.searchObject.SiYear)
          //     paramobj.append('SiMonth', this.searchObject.SiMonth)
          //     paramobj.append('FundYear', this.searchObject.FundYear)
          //     paramobj.append('FundMonth', this.searchObject.FundMonth)
          //     paramobj.append('Continue', 0)
          //     paramobj.menuid = MenuIdDate()
          //     paramobj.operationcode = '1'
          //     // 判断导入薪酬是导入薪酬 还是替换薪酬
          //     if (this.searchObject.Type === 1) {
          //       paramobj.append('Type', this.searchObject.Type)
          //       paramobj.append('SalaryBatchId', this.searchObject.SalaryBatchId)
          //     } else {
          //       paramobj.append('Type', 0)
          //     }
          //     AddSalaryBatch(paramobj).then(response => {
          //       hideLoading()
          //       if (response.IsSuccess) {
          //         this.$message({
          //           message: response.MessageContent,
          //           type: 'success'
          //         })
          //         this.$router.go(-1)
          //       } else {
          //         // if (response.Data && response.Data.length > 0) {
          //         //   this.dialogVisible = true
          //         //   this.errordata = response.Data
          //         // } else {
          //         //   this.$message({
          //         //     type: 'error',
          //         //     message: response.MessageContent
          //         //   })
          //         // }
          //         // 修改判断错误码305来判断是否内忽略继续导入
          //         if (response.MessageCode === 305) {
          //           // 数据不完整可以选择性操作
          //           this.showBtn = true
          //           this.dialogVisible = true
          //           this.errordata = response.Data
          //         } else {
          //           this.isheader = false
          //           this.fileters = null
          //           this.$refs.uploadfile.value = null
          //           // this.showBtn = false
          //           // this.errordata = response.Data
          //           // this.dialogVisible = true
          //           if (response.Data && response.Data.length) {
          //             this.showBtn = false
          //             this.errordata = response.Data
          //             this.dialogVisible = true
          //           } else {
          //             this.$message({
          //               message: response.MessageContent,
          //               type: 'error'
          //             })
          //           }
          //         }
          //         hideLoading()

          //       }
          //     })
          //   } else {
          //     this.$message({
          //       type: 'error',
          //       message: response.MessageContent
          //     })
          //     hideLoading()
          //   }
          // })
        }
      })
    },
    // 忽略, 继续导入
    beginimport () {
      let param = new FormData()
      param.append('file', this.fileters)
      param.append('SheetName', this.searchObject.SheetName)
      param.append('StartRow', this.searchObject.StartRow)
      param.append('EndRow', this.searchObject.EndRow)
      param.append('StartCol', this.searchObject.StartCol)
      param.append('EndCol', this.searchObject.EndCol)
      param.append('Finirow', this.searchObject.Finirow)
      param.append('ProjectId', this.searchObject.ProjectId)
      param.append('SalaryYear', this.searchObject.SalaryYear)
      param.append('SalaryMonth', this.searchObject.SalaryMonth)
      param.append('SiYear', this.searchObject.SiYear)
      param.append('SiMonth', this.searchObject.SiMonth)
      param.append('FundYear', this.searchObject.FundYear)
      param.append('FundMonth', this.searchObject.FundMonth)
      param.append('Continue', 1)
      // param.append('menuid', MenuIdDate())
      // param.append('operationcode', 1)
      param.menuid = MenuIdDate()
      param.operationcode = '1'
      if (this.searchObject.Type === 1) {
        param.append('Type', this.searchObject.Type)
        param.append('SalaryBatchId', this.searchObject.SalaryBatchId)
      } else {
        param.append('Type', 0)
      }
      showLoading()
      AddSalaryBatch(param).then(response => {
        this.dialogVisible = false
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: response.MessageContent,
            type: 'success'
          })
          this.$router.go(-1)
        } else {
          if (response.MessageCode === 305) {
            // 数据不完整可以选择性操作
            this.showBtn = true
            this.dialogVisible = true
            this.errordata = response.Data
          } else {
            this.isheader = false
            this.fileters = null
            this.$refs.uploadfile.value = null
            if (response.Data && response.Data.length) {
              this.showBtn = false
              this.errordata = response.Data
              this.dialogVisible = true
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.payroll-header-container /deep/ {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .payroll-content {
    background: #fff;
    overflow: hidden;
    border-radius: 8px 0 0 8px;
    margin-left: 24px;
    padding: 40px;
    .forms-Compensation {
      .el-form-item {
        margin-bottom: 10px;
        .bginput {
          width: 100%;
          .el-input__inner {
            height: 36px;
            line-height: 36px;
            background-color: $erinputbgc;
            border-color: transparent;
          }
        }
        .el-form-item__label {
          display: inline;
        }
      }
      .is-error {
        .bginput {
          .el-input__inner {
            border: 1px solid #f56c6c;
          }
        }
      }
      .tableHeader-operation {
        margin-top: 10px;
        width: 100%;
        position: relative;
        > button {
          // position: absolute;
        }
        > input {
          position: absolute;
          left: 0;
          top: 0;
          width: 152px;
          height: 38px;
          opacity: 0;
          cursor: pointer;
        }
      }
    }
    .systemField-content {
      margin-top: 24px;
      margin: 0 auto;
      .ImportWages-table {
        background: #f0f4fa;
        padding: 24px;
        thead.has-gutter {
          font-size: 16px;
          color: #333;

          tr {
            th {
              padding: 0;
              background-color: #fff;

              .cell {
                line-height: 14px;
                padding: 21px 8px;
                text-overflow: initial;
              }
            }
          }
        }
        tbody {
          > tr {
            height: 60px;
            background-color: #f0f4fa;
            margin: 5px 0;
            > td {
              border: none;
              font-size: 14px;
              color: #666;
              padding: 0 !important;
              input {
                background: #fff;
                border: none;
                height: 40px;
                border-radius: 8px;
                line-height: 40px;
              }
              .input-select {
                width: 300px;
              }
            }
          }
        }
      }
    }
    .payroll-bottom {
      text-align: center;
      margin-top: 40px;
      .el-button + .el-button {
        margin-left: 24px;
      }
    }
  }
  .payroll-title {
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
}
.error-box {
  .error-top {
    margin-bottom: 24px;
    .error-total {
      font-size: $f14;
      color: $erp333;
      > span {
        color: $erpred;
      }
    }
  }
  .error-content {
    // margin-bottom: 24px;
    .row {
      line-height: 20px;
      margin-bottom: 24px;
      min-height: 20px;
      display: flex;
      color: $erp999;
      .index {
        width: 48px;
      }
      .con {
        color: $erp999;
        flex: 1;
      }
    }
  }
}
/deep/ .dialog-footer.three-footer {
  text-align: center;
  > button {
    width: auto;
    height: auto;
    background-color: $erpbtncolor;
    color: $erpcolor;
  }
  > button + button {
    margin-left: 24px;
  }
}
.select-vlue {
  width: 300px;
}
</style>