<!-- 导入工资映射表 -->
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <BreadCrumb :url-list="urlList" />
      <div class="From-box-content">
        <el-form ref="ruleForm" :model="searchObject" class="forms-Compensation">
          <el-form-item label="输入导入的sheet表名称" prop="SheetName" class="Compensation-header">
            <el-input v-model="searchObject.SheetName" clearable placeholder="未填写工作表系统将默认导入选中的sheet表" size="small" />
          </el-form-item>
          <el-form-item label="对应客户" prop="CompanyId" class="Compensation-header">
            <el-select v-model="searchObject.CompanyId" clearable filterable remote placeholder="请搜索对应客户" @clear="clearCompany" :remote-method="remoteMethod" :loading="loading" class="select-input" @change="changeCompany">
              <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="对应项目" prop="ProjectId" class="Compensation-header">
            <el-select v-model="searchObject.ProjectId" clearable filterable remote placeholder="请搜索对应客户查询项目" class="select-input" @clear="clearProject" :remote-method="ProjectMethod" :loading="loading">
              <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户工资表标题起始行" prop="StartRow" class="Compensation-header">
            <el-input v-model="searchObject.StartRow" clearable size="small" placeholder="表格内的行数(数字:例如:1,2,3...)" />
          </el-form-item>
          <el-form-item label="客户工资表标题结束行" prop="EndRow" class="Compensation-header">
            <el-input v-model="searchObject.EndRow" clearable size="small" placeholder="表格内的行数(数字:例如:1,2,3...)" />
          </el-form-item>

          <el-form-item label="客户工资表标题起始列" prop="StartCol" class="Compensation-header">
            <el-input v-model="searchObject.StartCol" clearable size="small" placeholder="表格内的列数(数字:例如:A:1,B:2,C:3...)" />
          </el-form-item>
          <el-form-item label="客户工资表标题结束列" prop="EndCol" class="Compensation-header">
            <el-input v-model="searchObject.EndCol" clearable size="small" placeholder="表格内的列数(数字:例如:A:1,B:2,C:3...)" />
          </el-form-item>
          <div class="tableHeader-operation">
            <el-button class="erpbtn" size="middle" :loading="uploadLoading">导入工资表头模板</el-button>
            <input type="file" accept=".xls,.xlsx" name="file" class="smaellFile" @change="uploadFile">
            <span style="margin-left:10px;">{{FileName}}</span>
          </div>
          <div class="systemField-content">
            <el-table ref="industrtTable" :data="systemFieldList" class="ImportWages-table" tooltip-effect="dark">
              <el-table-column align="center" type="index" label="序号" width="80px" />
              <el-table-column align="center" prop="system" label="系统工资表字段名称" width="260px" />
              <el-table-column align="center" prop="Itemname" label="客户工资表字段名称" width="300px">
                <template slot-scope="scope">
                  <div>
                    <el-select v-model="scope.row.Itemname" filterable clearable placeholder="请选择" class="select-input">
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
          <div class="footer-button">
            <el-button class="operation-button" type="primary" @click="cancel">取消</el-button>
            <el-button class="operation-button" type="primary" @click="Formsave('ruleForm')">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { GetSalaryTableHead, AddSalaryMap, EditSalaryMap, GetSalaryMap } from '@/api/BusinessSet.js'
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetProjectList } from '@/api/projectManagement.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '工资映射表管理',
        router: '/BusinessSet/WageMapping'
      }, {
        name: '导入工资映射',
        router: ''
      }],
      loading: false,
      WagesId: '',
      statusList: [{
        id: -1,
        label: '全部'
      }, {
        id: 0,
        label: '禁用'
      },
      {
        id: 1,
        label: '启用'
      }],
      CustomerFieldList: [],
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
      CompanyPageList: [],//对应客户
      ProjectList: [],//对应项目
      searchObject: {
        CompanyId: '',
        ProjectId: '',
        SheetName: '',
        StartRow: '',
        EndRow: '',
        StartCol: '',
        EndCol: '',
        Status: '1'
      },
      FileName: '',
      uploadLoading: false
    }
  },
  created () {
    this.remoteMethod()
    if (this.$route.query && this.$route.query.Id) {
      this.WagesId = this.$route.query.Id
      this.getWages(this.WagesId)
    }
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
    // 编辑状态获取数据
    getWages (Id) {
      let data = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSalaryMap(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          let param = response.Data
          if (param.CompanyName) {
            this.searchObject.CompanyId = param.CompanyId
            this.searchObject.ProjectId = param.ProjectId
            this.remoteMethod(param.CompanyName)
            this.changeCompany(this.searchObject.CompanyId)
          }
          this.searchObject.StartRow = param.StartRow
          this.searchObject.StartCol = param.StartCol
          this.searchObject.SheetName = param.SheetName
          this.CustomerFieldList = param.FieldName
          let ItemMap = JSON.parse(param.ItemMap);
          let arr = []
          for (const key in ItemMap) {
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
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //查询公司列表
    remoteMethod (query) {
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
      this.searchObject.ProjectId = ''
      this.ProjectList = []
      this.remoteMethod()
    },
    //获取项目下拉列表
    ProjectMethod (val) {
      let data = {
        Name: val,
        CompanyId: this.searchObject.CompanyId || '',
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
            this.searchObject.ProjectId = ''
          }

        } else {
          this.ProjectList = []
          this.searchObject.ProjectId = ''
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    clearProject () {
      this.ProjectMethod()
    },
    //选择客户查询项目
    changeCompany () {
      if (this.searchObject.CompanyId) {
        this.ProjectMethod()
      }

    },
    // 匹配字段
    matchefield () {
      console.log(this.systemFieldList)
      for (let i = 0; i < this.systemFieldList.length; i++) {

      }
    },

    //导入文件映射
    uploadFile (e) {
      var uploader
      const files = e.target.files[0]
      if (!this.searchObject.StartRow || !this.searchObject.StartCol) {
        this.$message({
          message: '请先输入映射表的起始行和起始列',
          type: 'warning'
        })
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
          this.uploadLoading = true
          let param = new FormData();
          param.append('file', files)
          param.append('SheetName', this.searchObject.SheetName)
          param.append('StartRow', this.searchObject.StartRow)
          param.append('EndRow', this.searchObject.EndRow)
          param.append('StartCol', this.searchObject.StartCol)
          param.append('EndCol', this.searchObject.EndCol)
          // param.append('menuid', MenuIdDate())
          // param.append('operationcode', '1')
          param.menuid = MenuIdDate()
          param.operationcode = '1'
          GetSalaryTableHead(param).then(response => {
            this.uploadLoading = false
            if (response.IsSuccess) {
              this.CustomerFieldList = response.Data
              this.FileName = files.name
              this.systemFieldList = this.$options.data().systemFieldList
              this.ruleFunctions(this.systemFieldList)
              this.$message({
                type: 'success',
                message: '解析工资映射表成功'
              })
              e.target.value = []
              this.matchefield()
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'warning'
              })
              e.target.value = []
              return false
            }

          })
        }
      }

    },
    //保存事件
    Formsave (form) {
      // let showBase = this.systemFieldList[this.systemFieldList.findIndex(item => item.name == "Base")].Itemname ? true : false
      // let showPay = this.systemFieldList[this.systemFieldList.findIndex(item => item.name == "ShouldPay")].Itemname ? true : false
      // let showRealPayBefore = this.systemFieldList[this.systemFieldList.findIndex(item => item.name == "RealPayTaxBefore")].Itemname ? true : false
      // let showRealPayAfter = this.systemFieldList[this.systemFieldList.findIndex(item => item.name == "RealPayTaxAfter")].Itemname ? true : false
      // let showMgrFee = this.systemFieldList[this.systemFieldList.findIndex(item => item.name == "MgrFee")].Itemname ? true : false
      // let showTax = this.systemFieldList[this.systemFieldList.findIndex(item => item.name == "Tax")].Itemname ? true : false
      // let showTotalAmount = this.systemFieldList[this.systemFieldList.findIndex(item => item.name == "TotalAmount")].Itemname ? true : false
      // if (!showBase || !showPay || !showMgrFee || !showTax || !showTotalAmount) {
      //   this.$message({
      //     type: 'error',
      //     message: '请填写完成所有必填项!'
      //   })
      //   hideLoading()
      //   return
      // }
      // if (!showRealPayBefore && !showRealPayAfter) {
      //   this.$message({
      //     type: 'error',
      //     message: '实发工资税前/税后需必填一项'
      //   })
      //   hideLoading()
      //   return
      // }
      showLoading()
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
      this.$refs[form].validate((valid) => {
        if (valid) {
          const operating = JSON.parse(localStorage.getItem('operating')) || {}
          let param = {
            Id: this.WagesId,
            CompanyId: this.searchObject.CompanyId,
            ProjectId: this.searchObject.ProjectId,
            StartRow: this.searchObject.StartRow,
            StartCol: this.searchObject.StartCol,
            Status: this.searchObject.Status,
            FieldName: this.CustomerFieldList,
            SheetName: this.searchObject.SheetName,
            menuid: operating.MenuId,
            operationcode: operating.OperationCode,
            ItemMap: '',
          }
          param.ItemMap = JSON.stringify(obj)
          if (this.WagesId) {
            EditSalaryMap(param).then(response => {
              hideLoading()
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '修改工资映射表成功'
                })
                this.$router.push({
                  path: '/BusinessSet/WageMapping'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent
                })
              }
            })
          } else {
            AddSalaryMap(param).then(response => {
              hideLoading()
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '添加工资映射表成功'
                })
                this.$router.push({
                  path: '/BusinessSet/WageMapping'
                })
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
    //取消操作
    cancel () {
      this.$router.go(-1)
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.Compensation-box {
  margin-left: 24px;
}
.From-box-content {
  margin-top: 24px;

  background: #fff;
  overflow: hidden;
  .forms-Compensation {
    margin: 40px;
    max-width: 1000px;
    margin: 40px auto;
    /deep/ .Compensation-header {
      display: inline-block;
      margin-right: 230px;
      &:nth-child(2n) {
        margin-right: 0px;
      }
      input {
        background: $erinputbgc;
        border: none;
        height: 40px;
        line-height: 40px;
      }
    }
    .el-form-item {
      min-width: 384px;
      margin-bottom: 0;
      .el-form-item__label {
        // width: 50%;
        text-align: left;
        line-height: 24px;
        color: #666666;
      }

      .el-form-item__content {
        margin-left: 0;
        // width: 290px;
        .el-select {
          display: block;
          /deep/ .el-input__suffix {
            top: 20px;
          }
        }
      }
    }
    .systemField-content {
      .ImportWages-table /deep/ {
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
                width: 100%;
              }
            }
          }
        }
      }
    }

    .footer-button {
      margin: 50px auto;
      text-align: center;
      button {
        margin: 0 12px;
      }
    }
  }
}
.tableHeader-operation {
  position: relative;
  text-align: left;
  margin-bottom: 20px;
  margin: 10px auto;
  max-width: 1000px;
  height: 40px;

  .smaellFile {
    width: 154px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    display: inline-block;
    z-index: 100;
    cursor: pointer;
    &::-webkit-file-upload-button {
      height: 0;
    }
  }
}
</style>