<!-- 导入薪酬 -->
<template>
  <div class="ImportCompensationForm">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="ImportCompensationForm-content">
      <div class="description-box">
        <el-steps :active="currentActive" align-center>
          <el-step title="导入基础信息" description="请选择项目以及录入导入的表格的基础信息"></el-step>
          <el-step title="选择工资表及数据区域" description="请选择你需要导入系统的sheet表格"></el-step>
          <el-step title="配置映射关系" description="设置表中的字段和系统中的字段的对应关系，若计算关系有误请调整"></el-step>
          <el-step title="导入浮动情况反馈" description="导入结果反馈信息"></el-step>
        </el-steps>
      </div>
      <div v-if="currentActive == 0" class="payroll-content">
        <el-form ref="ruleForm" label-position="top" :model="searchObject" :rules="rules" class="forms-Compensation">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="所属客户" prop="CompanyId">
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
              <el-form-item label="工资类型" prop="Type">
                <el-select v-model="searchObject.Type" filterable clearable placeholder="请选择工资类型" class="bginput">
                  <el-option :label="item.label" :value="item.type" v-for="(item, index) in WageTypes" :key="index"></el-option>
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
          </el-row>
          <div class="tableHeader-operation">
            <el-button class="erpbtn" size="middle" :loading="uploadLoading">上传工资表</el-button>
            <input ref="uploadfile" type="file" accept=".xls,.xlsx" name="file" @change="uploadFile">
            <span v-if="fileters && fileters.name" style="margin-left:20px;">{{fileters.name}}</span>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="blueBtn" round size="small" @click="goreturn()">取消</el-button>
          <el-button class="blueBtn" round size="small" @click="dialogtrue1('ruleForm')">新增导入</el-button>
        </div>
      </div>
      <div v-if="currentActive == 1">
        <div class="TwoArea">
          <div class="TwoArea-footer">
            <div class="TwoArea-footerright">
              <el-select v-model="radio" placeholder="请选择" class="selectSheet" @change="SelecttableName">
                <el-option v-for="item in tableNameList" :key="item.title" :label="item.title" :value="item.title">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="TwoArea-center">
            <div class="TwoArea-centerbox">
              <div class="TwoArea-centerboxright erpscroll" v-loading="TwoArealoading">
                <table class="TwoArea-table">
                  <tr v-for="(item,index) in currentTableOBJ.RowData" :key="index">
                    <td>
                      <el-checkbox v-model="item.radio" @change="selectTitleStart(item,index)"></el-checkbox>
                    </td>
                    <template v-for="(ite,inx) in item">
                      <td :key="inx" v-if="ite && ite.rowspan && ite.colspan" :rowspan=ite.rowspan :colspan=ite.colspan>
                        {{ite.CellValue}}
                      </td>
                      <td :key="inx" v-else-if="ite && !ite.rowspan && !ite.colspan">
                        {{ite.CellValue}}
                      </td>
                    </template>
                  </tr>
                </table>

              </div>
              <div class="TwoArea-centerboxtitles">
                <i class="el-icon-warning-outline"></i>请选择可识别的有效列表起始表头行
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button class="blueBtn" round size="small" @click="Goreturnstep(0)">上一步</el-button>
          <el-button class="blueBtn" round size="small" @click="dialogtrue2()">下一步</el-button>
        </div>
      </div>
      <div v-if="currentActive == 2">
        <el-form label-position="top" ref="dataObject" :model="dataObject" label-width="100px" class="ErpStructuraDataObject">
          <div v-for="(item,index) in dataObject.ErpStructuraArr" :key="'x'+index" class="ErpStructuraArr">
            <div class="calculation-title">{{item.title}}</div>
            <el-row :gutter="64">
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(ite,inx) in item.ListArr" :key="'w'+inx">
                <el-form-item :label="ite.stytitle+'(必填)'" :prop="ite.header" v-if="ite.Ismandatory" :class="[ite.Ismandatory?'Ismandatory':'']">
                  <el-select v-model="ite.header" filterable clearable placeholder="请选择" @change="slectInput" @clear="ClearSlectInput">
                    <el-option v-for="item in DisableImportToExcelStructuralData" :key="'m'+item.title" :label="item.title" :value="item.title" :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="ite.stytitle" :prop="ite.header" v-else>
                  <el-select v-model="ite.header" filterable clearable placeholder="请选择" @change="slectInput" @clear="ClearSlectInput">
                    <el-option v-for="item in DisableImportToExcelStructuralData" :key="'m'+item.title" :label="item.title" :value="item.title" :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-for="(ite,inx) in item.CombinedArr" :key="'t'+inx">
                <el-form-item :label="ite.stytitle+'(必填)'" :prop="ite.header" v-if="ite.Ismandatory" :class="[ite.Ismandatory?'Ismandatory':'']">
                  <div class="selectFormula">
                    <div class="selectFormula-left">
                      <div class="tag-item" v-for="(itemin,indexmin) in ite.ContentArray" :key="'m'+indexmin">
                        <span class="symbol" v-if="indexmin > 0">{{itemin.symbol}}</span>
                        <span class="tagxm">
                          <span class="tiele">{{itemin.title}}</span>
                          <i class="el-icon-close" @click="DelectResults(index,inx,indexmin)"></i>
                        </span>
                      </div>
                    </div>
                    <a class="buttonFormula" @click="OpenSetCalculationFormula(ite,index,inx)">设置计算公式</a>
                  </div>
                </el-form-item>
                <el-form-item :label="ite.stytitle" :prop="ite.header" v-else>
                  <div class="selectFormula">
                    <div class="selectFormula-left">
                      <div class="tag-item" v-for="(itemin,indexmin) in ite.ContentArray" :key="'m'+indexmin">
                        <span class="symbol" v-if="indexmin > 0">{{itemin.symbol}}</span>
                        <span class="tagxm">
                          <span class="tiele">{{itemin.title}}</span>
                          <i class="el-icon-close" @click="DelectResults(index,inx,indexmin)"></i>
                        </span>
                      </div>
                    </div>
                    <a class="buttonFormula" @click="OpenSetCalculationFormula(ite,index,inx)">设置计算公式</a>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding-bottom:40px;">
          <el-button class="blueBtn" round size="small" @click="Goreturnstep(1)">上一步</el-button>
          <el-button class="blueBtn" round size="small" @click="dialogtrue3()">下一步</el-button>
        </div>
      </div>
      <div v-if="currentActive == 3">
        <div class="Four-tableBox">
          <div class="tab2 clearfix">
            <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}({{item.sum}})</div>
          </div>
          <div class="table-content">
            <div class="operate-table">
              <el-table ref="FloatingSuCCTable" class="erp-table" v-loading="tableloading" :data="FloatingSuCCList" max-height="600" tooltip-effect="dark" show-summary :summary-method="getSummaries">
                <el-table-column align="center" type="index" min-width="100" label="序号" />
                <el-table-column align="center" prop="StaffName" label="员工姓名" min-width="150" />
                <el-table-column align="center" prop="Sex" label="性别" min-width="120" />
                <el-table-column align="center" prop="SalaryBatchBeforehandId" label="工资发放批次" min-width="150" />
                <el-table-column align="center" prop="Year" label="所属年月" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.Year}}年{{scope.row.Month}}月</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="Base" label="基本工资" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.Base | MoneyUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="ShouldPay" label="应发工资" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.ShouldPay | MoneyUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="InsuranceTotalEnt" label="单位社保合计" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.InsuranceTotalEnt | MoneyUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="InsuranceTotalPers" label="个人社保合计" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.InsuranceTotalPers | MoneyUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="PersonalTax" label="个税" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.PersonalTax | MoneyUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="RealPay" label="实发工资" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.RealPay | MoneyUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="MgrFee" label="管理费" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.MgrFee | MoneyUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="Tax" label="票面税金" min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.Tax | MoneyUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="PayTotal" fixed="right" label="应转合计" min-width="120" />
              </el-table>
            </div>
            <div slot="footer" class="dialog-footer" style="padding-bottom:40px;">
              <el-button class="abnormal" round size="small" @click="OpenAbnormal()" v-show="FloatingBtShow">异常数据（{{FloatingList.length}}）</el-button>
              <el-button class="blueBtn" round size="small" @click="Goreturnstep(2)">上一步</el-button>
              <el-button class="blueBtn" round size="small" @click="BatchEntry()" v-if="tabidx == 1">批量入职</el-button>
              <el-button class="blueBtn" round size="small" @click="CompleteImport()">暂不处理，完成导入</el-button>
              <el-button class="grayBtn" round size="small" @click="ExportList()">导出人员清单</el-button>
              <el-button class="cancelBtn" round size="small" @click="CancelImport()">取消导入</el-button>
            </div>
          </div>
        </div>

      </div>
    </div>
    <template>
      <div class="tag-container">
        <el-dialog :close-on-click-modal="false" title="异常数据明细" class="dialog-box" append-to-body :visible.sync="showErrData" :show-close="false" :destroy-on-close="true" width="700px" @close="closeErrData">
          <i class="el-icon-circle-close closeButton" @click="closeErrData"></i>
          <el-table ref="multipleTable2" class="erp-table" v-loading="tableloading2" :data="FloatingList" max-height="500" tooltip-effect="dark">
            <el-table-column align="center" type="index" width="60" label="序号" />
            <el-table-column align="center" prop="StaffName" label="员工姓名" width="100" />
            <el-table-column align="center" prop="Sex" label="性别" width="60" />
            <el-table-column align="center" prop="Description" label="失败原因" show-overflow-tooltip min-width="120" />
          </el-table>
          <el-button class="erpbtn" icon="el-icon-download" size="small" @click="downErrList" style="margin-top: 20px;">下载异常数据</el-button>
          <div slot="footer" class="dialog-footer-multiple">
            <el-button class="erpbtn" size="small" @click="closeErrData">关闭</el-button>
          </div>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" title="导入结果" :visible.sync="ResultsVisible" width="480px" :lock-scroll="false" :show-close="false" custom-class="erpdialog">
          <div class="error-box">
            <div class="error-top">
              <div class="error-total">{{Resultscontent}}</div>
            </div>
            <el-button class="erpbtn" v-if="ResultsBtn" icon="el-icon-download" size="small" @click="DownloadImport" style="margin-top: 20px;">下载导入失败数据</el-button>
          </div>
          <span slot="footer" class="dialog-footer three-footer">
            <el-button class="erpbtn" size="small" @click="confirmImport">确认</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 是否弹出模板弹窗 -->
      <SalaryTemplate :TemplateList="TemplateList" :TemplateObject="TemplateObject" :showSalaryTemplate="showSalaryTemplate" @AddTemplateSave="AddTemplateSave" @closeTemplateSave="closeTemplateSave"></SalaryTemplate>
      <!-- 是否弹出计算公式弹窗 -->
      <SetCalculationFormula :CalculationFormulaTitle="CalculationFormulaTitle" :ContentArrays="ContentArrays" :showCalculationFormula="showCalculationFormula" :ImportToExcelStructuralData="ImportToExcelStructuralData" @AddCalculationFormula="AddCalculationFormula" @closeCalculationFormula="closeCalculationFormula"></SetCalculationFormula>
      <!-- 是否弹出批量入职 -->
      <BatchEntry :BatchEntryTitle="BatchEntryTitle" :ProjectName="ProjectName" :showBatchEntrys="showBatchEntrys" @AddBatchEntry="AddBatchEntry" @closeAddBatchEntry="closeAddBatchEntry"></BatchEntry>
    </template>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import SalaryTemplate from './components/SalaryTemplate.vue'
import BatchEntry from './components/BatchEntry.vue'
import SetCalculationFormula from './components/SetCalculationFormula.vue'
import { GetAreaList } from '@/api/Public.js'
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetSalaryExcelDataStruct, AddSalaryBatch, GetSalaryBatch, BeforehandImportSalary, GetSalaryBeforehandList, SalaryStaffBatchInduction, DeleteSalaryBatchBeforehand, ImportSalaryExecute, ReplaceImportSalaryExecute } from '@/api/CompensationServiceManagement.js'
import { GetProjectList } from '@/api/projectManagement.js'
import SupperUploader from '@/utils/SupperUploader'
import { GetSalaryTableHead, AddSalaryMap, GetSalaryMap, EditSalaryMap, GetSalaryMapByProjectId, CheckMapChange } from '@/api/BusinessSet.js'
import { uuid, copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import FileSaver from 'file-saver'
import filters from '@/utils/filters'
import XLSX from 'xlsx'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    SalaryTemplate,
    SetCalculationFormula,
    BatchEntry
  },
  data () {
    return {
      ReplaceId: '',//替换的ID
      backfillObj: {},//回填总数据
      TemplateObject: {},//回填模板框数据
      urlList: [{
        name: '我的薪酬',
        router: '/CompensationServiceManagement/CompensationManagement'
      }, {
        name: '导入薪酬明细',
        router: ''
      }],
      tableloading: false,
      tableloading2: false,
      uploadLoading: false,//上传动画
      loading: false,
      currentActive: 0,
      //第一步数据
      Projectlist: [], // 项目列表
      CompanyList: [], // 客户列表
      WageTypes: [{
        label: '正常薪资',
        type: 1
      }, {
        label: '奖金',
        type: 2
      }, {
        label: '全年奖金',
        type: 3
      }, {
        label: '补偿',
        type: 4
      }, {
        label: '其它类型所得',
        type: 5
      }],
      searchObject: {
        SalaryBatchId: '',
        SheetName: '',
        ProjectId: '',
        ProjectName: '',
        CompanyId: '',
        SalaryYear: '',
        SalaryMonth: '',
        SiYear: '',
        SiMonth: '',
        FundYear: '',
        FundMonth: '',
        Type: '',
        month: '', // 自定义的月份
        SiYearMonth: '',
        FundYearMonth: '',
        Status: 1
      },
      rules: {
        CompanyId: [
          { required: true, message: '请选择所属客户', trigger: 'change' },
        ],
        ProjectId: [
          { required: true, message: '请选择所属项目', trigger: 'change' },
        ],
        Type: [
          { required: true, message: '请选择工资类型', trigger: 'change' },
        ],
        month: [
          { required: true, message: '请选择工资所属年月', trigger: 'change' },
        ],
        SiYearMonth: [
          { required: true, message: '请选择社保所属年月', trigger: 'change' },
        ],
        FundYearMonth: [
          { required: true, message: '请选择公积金所属年月', trigger: 'change' },
        ]
      },
      fileters: null, // 上传文件
      //Two
      radio: '',
      tableNameList: [],
      currentTableOBJ: {
        RowData: []
      },
      TwoArealoading: false,
      TwoFrom: {
        SheetName: '',
        StartRow: -1
      },
      showSalaryTemplate: false,
      TemplateList: [],//可选择的模板数据列表
      TemplateData: {},
      TemplateSalaryMap: {},//根据模板ID查询的映射数据
      //第三步数据
      ImportToExcelStructuralData: [],
      DisableImportToExcelStructuralData: [],
      dataObject: {
        ErpStructuraArr: [{
          'title': '基础信息',
          'ListArr': [{
            'stytitle': '姓名',
            'stytitleName': 'StaffName',
            'Ismandatory': true,
            'header': ''
          }, {
            'stytitle': '身份证号码',
            'stytitleName': 'IdCard',
            'Ismandatory': true,
            'header': ''
          }, {
            'stytitle': '银行卡号',
            'stytitleName': 'BankCard',
            'Ismandatory': true,
            'header': ''
          }, {
            'stytitle': '开户行名称',
            'stytitleName': 'BankName',
            'header': ''
          }, {
            'stytitle': '手机号码',
            'stytitleName': 'Mobile',
            'header': ''
          }]
        }, {
          'title': '工资信息',
          'ListArr': [{
            'stytitle': '基本工资',
            'stytitleName': 'Base',
            'header': ''
          }, {
            'stytitle': '岗位工资',
            'stytitleName': 'Post',
            'header': ''
          }, {
            'stytitle': '绩效工资',
            'stytitleName': 'Perform',
            'header': ''
          }, {
            'stytitle': '加班费',
            'stytitleName': 'Post',
            'header': ''
          }, {
            'stytitle': '考勤工资',
            'stytitleName': 'Daily',
            'header': ''
          }, {
            'stytitle': '提成总额',
            'stytitleName': 'Commission',
            'header': ''
          }, {
            'stytitle': '奖金总额',
            'stytitleName': 'Bonus',
            'header': ''
          }, {
            'stytitle': '罚金总额',
            'stytitleName': 'Fine',
            'header': ''
          }, {
            'stytitle': '应发工资',
            'stytitleName': 'ShouldPay',
            'Ismandatory': true,
            'header': ''
          }, {
            'stytitle': '实发工资(税前)',
            'stytitleName': 'RealPayTaxBefore',
            'header': ''
          }, {
            'stytitle': '实发工资(税后)',
            'stytitleName': 'RealPayTaxAfter',
            'Ismandatory': true,
            'header': ''
          }],
          'CombinedArr': [{
            'stytitle': '应发工资小计',
            'Ismandatory': true,
            'header': '',
            'Type': '1',
            'ContentArray': []
          }]
        }, {
          'title': '企业部分社保',
          'ListArr': [{
            'stytitle': '养老保险企业部分',
            'stytitleName': 'EndowmentEnt',
            'header': ''
          }, {
            'stytitle': '医疗保险企业部分',
            'stytitleName': 'MedicalEnt',
            'header': ''
          }, {
            'stytitle': '大额医疗保险企业部分',
            'stytitleName': 'BigMedicalEnt',
            'header': ''
          }, {
            'stytitle': '失业保险企业部分',
            'stytitleName': 'UnemploymentEnt',
            'header': ''
          }, {
            'stytitle': '工伤保险企业部分',
            'stytitleName': 'InjuryEnt',
            'header': ''
          }, {
            'stytitle': '长护保险企业部分',
            'stytitleName': 'LongCareEnt',
            'header': ''
          }, {
            'stytitle': '养老保险企业部分补收补退',
            'stytitleName': 'EndowmentEntPayback',
            'header': ''
          }, {
            'stytitle': '医疗保险企业部分补收补退',
            'stytitleName': 'MedicalEntPayback',
            'header': ''
          }, {
            'stytitle': '大额医疗保险企业部分补收补退',
            'stytitleName': 'BigMedicalEntPayback',
            'header': ''
          }, {
            'stytitle': '失业保险企业部分补收补退',
            'stytitleName': 'UnemploymentEntPayback',
            'header': ''
          }, {
            'stytitle': '工伤保险企业部分补收补退',
            'stytitleName': 'InjuryEntPayback',
            'header': ''
          }, {
            'stytitle': '长护保险企业部分补收补退',
            'stytitleName': 'LongCareEntPayback',
            'header': ''
          }, {
            'stytitle': '住房公积金企业部分',
            'stytitleName': 'HouseFundEnt',
            'header': ''
          }, {
            'stytitle': '住房公积金企业部分补收补退',
            'stytitleName': 'HouseFundEntPayback',
            'header': ''
          }],
          'CombinedArr': [{
            'stytitle': '企业部分社保合计',
            'Ismandatory': true,
            'header': '',
            'Type': '2',
            'ContentArray': []
          }]
        }, {
          'title': '个人部分社保',
          'ListArr': [{
            'stytitle': '养老保险个人部分',
            'stytitleName': 'EndowmentPers',
            'header': ''
          }, {
            'stytitle': '医疗保险个人部分',
            'stytitleName': 'MedicalPers',
            'header': ''
          }, {
            'stytitle': '大额医疗保险个人部分',
            'stytitleName': 'BigMedicalPers',
            'header': ''
          }, {
            'stytitle': '失业保险个人部分',
            'stytitleName': 'UnemploymentPers',
            'header': ''
          }, {
            'stytitle': '工伤保险个人部分',
            'stytitleName': 'InjuryPers',
            'header': ''
          }, {
            'stytitle': '长护保险个人部分',
            'stytitleName': 'LongCarePers',
            'header': ''
          }, {
            'stytitle': '养老保险个人部分补收补退',
            'stytitleName': 'EndowmentPersPayback',
            'header': ''
          }, {
            'stytitle': '医疗保险个人部分补收补退',
            'stytitleName': 'MedicalPersPayback',
            'header': ''
          }, {
            'stytitle': '大额医疗保险个人部分补收补退',
            'stytitleName': 'BigMedicalPersPayback',
            'header': ''
          }, {
            'stytitle': '失业保险个人部分补收补退',
            'stytitleName': 'UnemploymentPersPayback',
            'header': ''
          }, {
            'stytitle': '工伤保险个人部分补收补退',
            'stytitleName': 'InjuryPersPayback',
            'header': ''
          }, {
            'stytitle': '长护保险个人部分补收补退',
            'stytitleName': 'LongCarePersPayback',
            'header': ''
          }, {
            'stytitle': '住房公积金个人部分',
            'stytitleName': 'HouseFundPers',
            'header': ''
          }, {
            'stytitle': '住房公积金个人部分补收补退',
            'stytitleName': 'HouseFundPersPayback',
            'header': ''
          }],
          'CombinedArr': [{
            'stytitle': '个人部分社保',
            'Ismandatory': true,
            'header': '',
            'Type': '4',
            'ContentArray': []
          }]
        }, {
          'title': '企业承担其他部分',
          'ListArr': [{
            'stytitle': '意外伤害险企业部分',
            'stytitleName': 'UnexpectEnt',
            'header': ''
          }, {
            'stytitle': '雇主险企业部分',
            'stytitleName': 'Employer',
            'header': ''
          }, {
            'stytitle': '残保金企业部分',
            'stytitleName': 'NoHealth',
            'header': ''
          }, {
            'stytitle': '企业部分工会费',
            'stytitleName': 'UnionFeeEnt',
            'header': ''
          }, {
            'stytitle': '中标服务费',
            'stytitleName': 'BidWinningServiceFee',
            'header': ''
          }, {
            'stytitle': '业务招待费',
            'stytitleName': 'BusinessEntertainmentFee',
            'header': ''
          }, {
            'stytitle': '经济补偿金',
            'stytitleName': 'CompensateFee',
            'header': ''
          }, {
            'stytitle': '差旅餐饮费',
            'stytitleName': 'MealSupport',
            'header': ''
          }, {
            'stytitle': '差旅交通费',
            'stytitleName': 'TrafficSupport',
            'header': ''
          }, {
            'stytitle': '差旅住宿费',
            'stytitleName': 'HouseSupport',
            'header': ''
          }, {
            'stytitle': '差旅其它费',
            'stytitleName': 'OtherSupport',
            'header': ''
          }, {
            'stytitle': '劳保费1',
            'stytitleName': 'LaborProtectionFee1',
            'header': ''
          }, {
            'stytitle': '劳保费2',
            'stytitleName': 'LaborProtectionFee2',
            'header': ''
          }, {
            'stytitle': '劳保费3',
            'stytitleName': 'LaborProtectionFee3',
            'header': ''
          }, {
            'stytitle': '劳保费4',
            'stytitleName': 'LaborProtectionFee4',
            'header': ''
          }, {
            'stytitle': '劳保费5',
            'stytitleName': 'LaborProtectionFee5',
            'header': ''
          }, {
            'stytitle': '因公外地就医费企业部分',
            'stytitleName': 'EntFieldMedicalFee',
            'header': ''
          }, {
            'stytitle': '未实行医疗统筹企业职工医疗费企业部分',
            'stytitleName': 'EntNoMedicalTreatFee',
            'header': ''
          }, {
            'stytitle': '职工供养直系亲属医疗补贴费企业部分',
            'stytitleName': 'EntImmediateFamilyMedicalFee',
            'header': ''
          }, {
            'stytitle': '供暖费企业部分',
            'stytitleName': 'EntHeatingFee',
            'header': ''
          }, {
            'stytitle': '防暑降温费企业部分',
            'stytitleName': 'HighTempSupport',
            'header': ''
          }, {
            'stytitle': '困难补贴费企业部分',
            'stytitleName': 'EntDifficultySubsidyFee',
            'header': ''
          }, {
            'stytitle': '救济费',
            'stytitleName': 'EntReliefFee',
            'header': ''
          }, {
            'stytitle': '食堂经费补贴企业部分',
            'stytitleName': 'EntCanteenFee',
            'header': ''
          }, {
            'stytitle': '交通补贴费企业部分',
            'stytitleName': 'EntTransportationFee',
            'header': ''
          }, {
            'stytitle': '集体福利企业部分',
            'stytitleName': 'Benifits',
            'header': ''
          }, {
            'stytitle': '丧葬费企业部分',
            'stytitleName': 'EntFuneralFee',
            'header': ''
          }, {
            'stytitle': '抚恤费企业部分',
            'stytitleName': 'EntPensionFee',
            'header': ''
          }, {
            'stytitle': '安家费企业部分',
            'stytitleName': 'EntSettleDown',
            'header': ''
          }, {
            'stytitle': '探亲假路费企业部分',
            'stytitleName': 'EntVisitFamilyToll',
            'header': ''
          }, {
            'stytitle': '节日福利费企业部分',
            'stytitleName': 'EntHolidayFee',
            'header': ''
          }, {
            'stytitle': '季节福利费企业部分',
            'stytitleName': 'EntSeasonalFee',
            'header': ''
          }, {
            'stytitle': '公司福利费企业部分',
            'stytitleName': 'EntCompanyFee',
            'header': ''
          }, {
            'stytitle': '体检费',
            'stytitleName': 'HealthExam',
            'header': ''
          }, {
            'stytitle': '通讯补贴',
            'stytitleName': 'CommSupport',
            'header': ''
          }, {
            'stytitle': '其它福利费企业部分',
            'stytitleName': 'EntOtherBenifitsFee',
            'header': ''
          }, {
            'stytitle': '水费企业部分',
            'stytitleName': 'EntWaterFee',
            'header': ''
          }, {
            'stytitle': '电费企业部分',
            'stytitleName': 'EntElectricityFee',
            'header': ''
          }, {
            'stytitle': '房租企业部分',
            'stytitleName': 'EntRentFee',
            'header': ''
          }, {
            'stytitle': '其它费用企业部分1',
            'stytitleName': 'EntOtherFee1',
            'header': ''
          }, {
            'stytitle': '其它费用企业部分2',
            'stytitleName': 'EntOtherFee2',
            'header': ''
          }, {
            'stytitle': '其它费用企业部分3',
            'stytitleName': 'EntOtherFee3',
            'header': ''
          }],
          'CombinedArr': [{
            'stytitle': '企业福利合计',
            'header': '',
            'Type': '6',
            'ContentArray': []
          }, {
            'stytitle': '企业差旅费合计',
            'header': '',
            'Type': '7',
            'ContentArray': []
          }, {
            'stytitle': '企业劳保费合计',
            'header': '',
            'Type': '8',
            'ContentArray': []
          }, {
            'stytitle': '企业水电房租费合计',
            'header': '',
            'Type': '10',
            'ContentArray': []
          }, {
            'stytitle': '企业其它费用合计',
            'header': '',
            'Type': '9',
            'ContentArray': []
          }, {
            'stytitle': '企业承担其他部分',
            'header': '',
            'Type': '3',
            'ContentArray': []
          }]
        }, {
          'title': '个人其它扣款',
          'ListArr': [{
            'stytitle': '个税',
            'stytitleName': 'PersonalTax',
            'header': ''
          }, {
            'stytitle': '个人工会费',
            'stytitleName': 'UnionFeePers',
            'header': ''
          }, {
            'stytitle': '个人餐费',
            'stytitleName': 'PersMealFee',
            'header': ''
          }, {
            'stytitle': '个人尽孝金',
            'stytitleName': 'PersFilialPietyGoldFee',
            'header': ''
          }, {
            'stytitle': '个人工服费',
            'stytitleName': 'PersWorkClothesFee',
            'header': ''
          }, {
            'stytitle': '因公外地就医费个人代扣',
            'stytitleName': 'PersFieldMedicalFee',
            'header': ''
          }, {
            'stytitle': '未实行医疗统筹企业职工医疗费个人代扣',
            'stytitleName': 'PersNoMedicalTreatFee',
            'header': ''
          }, {
            'stytitle': '职工供养直系亲属医疗补贴费个人代扣',
            'stytitleName': 'PersImmediateFamilyMedicalFee',
            'header': ''
          }, {
            'stytitle': '供暖费个人代扣',
            'stytitleName': 'PersHeatingFee',
            'header': ''
          }, {
            'stytitle': '防暑降温费个人代扣',
            'stytitleName': 'PersHighTemp',
            'header': ''
          }, {
            'stytitle': '困难补贴费个人代扣',
            'stytitleName': 'PersDifficultySubsidyFee',
            'header': ''
          }, {
            'stytitle': '救济费个人代扣',
            'stytitleName': 'PersReliefFee',
            'header': ''
          }, {
            'stytitle': '食堂经费补贴个人代扣',
            'stytitleName': 'PersCanteenFee',
            'header': ''
          }, {
            'stytitle': '交通补贴费个人代扣',
            'stytitleName': 'PersTransportationFee',
            'header': ''
          }, {
            'stytitle': '集体福利个人代扣',
            'stytitleName': 'PersBenifits',
            'header': ''
          }, {
            'stytitle': '丧葬费个人代扣',
            'stytitleName': 'PersFuneralFee',
            'header': ''
          }, {
            'stytitle': '抚恤费个人代扣',
            'stytitleName': 'PersPensionFee',
            'header': ''
          }, {
            'stytitle': '安家费个人代扣',
            'stytitleName': 'PersSettleDown',
            'header': ''
          }, {
            'stytitle': '探亲假路费个人代扣',
            'stytitleName': 'PersVisitFamilyToll',
            'header': ''
          }, {
            'stytitle': '节日福利费个人代扣',
            'stytitleName': 'PersHolidayFee',
            'header': ''
          }, {
            'stytitle': '季节福利费个人代扣',
            'stytitleName': 'PersSeasonalFee',
            'header': ''
          }, {
            'stytitle': '公司福利费个人代扣',
            'stytitleName': 'PersCompanyFee',
            'header': ''
          }, {
            'stytitle': '体检费个人代扣',
            'stytitleName': 'PersHealthExam',
            'header': ''
          }, {
            'stytitle': '通讯补贴个人代扣',
            'stytitleName': 'PersComm',
            'header': ''
          }, {
            'stytitle': '其它福利费个人代扣',
            'stytitleName': 'PersOtherBenifitsFee',
            'header': ''
          }, {
            'stytitle': '水费个人部分',
            'stytitleName': 'PersWaterFee',
            'header': ''
          }, {
            'stytitle': '电费个人部分',
            'stytitleName': 'PersElectricityFee',
            'header': ''
          }, {
            'stytitle': '房租个人部分',
            'stytitleName': 'PersRentFee',
            'header': ''
          }, {
            'stytitle': '其它费用个人部分1',
            'stytitleName': 'PersOtherFee1',
            'header': ''
          }, {
            'stytitle': '其它费用个人部分2',
            'stytitleName': 'PersOtherFee2',
            'header': ''
          }, {
            'stytitle': '其它费用个人部分3',
            'stytitleName': 'PersOtherFee3',
            'header': ''
          }],
          'CombinedArr': [{
            'stytitle': '个人福利费合计',
            'header': '',
            'Type': '11',
            'ContentArray': []
          }, {
            'stytitle': '个人水电房租费合计',
            'header': '',
            'Type': '13',
            'ContentArray': []
          }, {
            'stytitle': '个人其它费用合计',
            'header': '',
            'Type': '12',
            'ContentArray': []
          }, {
            'stytitle': '个人其它扣款合计',
            'header': '',
            'Type': '5',
            'ContentArray': []
          }]
        }, {
          'title': '其他',
          'ListArr': [{
            'stytitle': '管理费',
            'stytitleName': 'MgrFee',
            'header': ''
          }, {
            'stytitle': '税金',
            'stytitleName': 'Tax',
            'header': ''
          }]
        }]
      },
      seletIndex: [],//打开计算公式窗口存储的数据下标
      ContentArrays: [],
      CalculationFormulaTitle: '',
      showCalculationFormula: false,
      BeforehandBatchId: '',
      BeforehandBatchUrl: '',
      FloatingList: [],//预导入出现的错误数据
      FloatingSuCCList: [],
      //第四步数据
      tablist: [{
        'value': 0,
        'describe': "全部",
        'sum': 0
      }, {
        'value': 1,
        'describe': "新增员工",
        'sum': 0
      }],
      tabidx: 0,
      FloatingBtShow: false,
      showErrData: false,
      ProjectName: '',
      showBatchEntrys: false,
      FloatingSuCCUrl: '',
      BatchEntryTitle: '',
      ResultsVisible: false,
      Resultscontent: '',
      ResultsErrUrl: '',
      ResultsBtn: false
    }
  },
  created () {
    // 判断是添加还是替换
    if (this.$route.query.id) {
      this.ReplaceId = this.$route.query.id
      this.getSalaryBatch()
    } else {
      // 判断是否自动填充客户项目
      if (this.$route.query.CompanyId) {
        this.searchObject.CompanyId = this.$route.query.CompanyId
        this.searchObject.ProjectId = this.$route.query.ProjectId
        this.CompanyList = [{
          Name: this.$route.query.CompanyName,
          Id: this.$route.query.CompanyId
        }]
        this.Projectlist = [{
          Name: this.$route.query.ProjectName,
          Id: this.$route.query.ProjectId
        }]

      } else {
        this.CompanyMethod('')
      }
    }
  },
  methods: {
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
    // 查询模板列表
    changeproject (e) {
      console.log(e);
      if (e) {
        this.searchObject.ProjectName = this.Projectlist[this.Projectlist.findIndex(item => item.Id == e)].Name
        let obj = {
          ProjectId: e,
          menuid: MenuIdDate(),
          operationcode: 1
        }
      }
    },
    //导入文件映射
    uploadFile (e) {
      console.log(e);
      var uploader
      const files = e.target.files[0]
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
          // this.isheader = false
          e.target.value = []

        }
      }
    },
    goreturn () {
      this.$router.go(-1)
    },
    Goreturnstep (e) {
      this.currentActive = e
    },
    //第一步新增导入
    dialogtrue1 (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          showLoading()
          let excelObj = new FormData()
          excelObj.append('file', this.fileters)
          excelObj.append('menuid', MenuIdDate())
          excelObj.append('operationcode', 1)
          this.tableNameList = []
          GetSalaryExcelDataStruct(excelObj).then(response => {
            hideLoading()
            if (response.IsSuccess && response.Data) {
              this.ExcelOBJArr = response.Data
              for (let i = 0; i < this.ExcelOBJArr.length; i++) {
                this.tableNameList.push({ 'title': this.ExcelOBJArr[i].SheetName })
              }
              console.log(this.tableNameList)
              this.currentActive = 1
              //初始化数据
              this.radio = this.ExcelOBJArr[0].SheetName
              this.currentTableOBJ = this.ExcelOBJArr[0]
              this.TwoFrom.SheetName = this.ExcelOBJArr[0].SheetName
              if (this.currentTableOBJ.Merges && this.currentTableOBJ.Merges.length > 0) {
                for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
                  for (let m = 0; m < this.currentTableOBJ.RowData[i].length; m++) {
                    for (let j = 0; j < this.currentTableOBJ.Merges.length; j++) {
                      if (this.currentTableOBJ.RowData[i][m] && this.currentTableOBJ.RowData[i][m].RowIndex == this.currentTableOBJ.Merges[j].StartRowIndex && m == this.currentTableOBJ.Merges[j].StartColumnIndex) {
                        this.currentTableOBJ.RowData[i][m].rowspan = this.currentTableOBJ.Merges[j].EndRowIndex - this.currentTableOBJ.Merges[j].StartRowIndex + 1
                        this.currentTableOBJ.RowData[i][m].colspan = this.currentTableOBJ.Merges[j].EndColumnIndex - this.currentTableOBJ.Merges[j].StartColumnIndex + 1
                      }
                    }
                  }

                }

              }
              for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
                this.$set(this.currentTableOBJ.RowData[i], 'radio', false)
                for (let j = 0; j < this.currentTableOBJ.RowData[i].length; j++) {
                  if (this.currentTableOBJ.RowData[i][j] && this.currentTableOBJ.RowData[i][j].IsMergeCell && this.currentTableOBJ.RowData[i][j].CellValue == '') {
                    this.currentTableOBJ.RowData[i][j] = null
                  }
                }
              }
            }
            else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //第二步Js
    //选择表名
    SelecttableName (e) {
      this.TwoArealoading = true
      this.TwoFrom.SheetName = e
      for (let i = 0; i < this.ExcelOBJArr.length; i++) {
        if (e == this.ExcelOBJArr[i].SheetName) {
          this.currentTableOBJ = this.ExcelOBJArr[i]
        }
      }
      if (this.currentTableOBJ.Merges && this.currentTableOBJ.Merges.length > 0) {
        for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
          for (let m = 0; m < this.currentTableOBJ.RowData[i].length; m++) {
            for (let j = 0; j < this.currentTableOBJ.Merges.length; j++) {
              if (this.currentTableOBJ.RowData[i][m] && this.currentTableOBJ.RowData[i][m].RowIndex == this.currentTableOBJ.Merges[j].StartRowIndex && m == this.currentTableOBJ.Merges[j].StartColumnIndex) {
                this.currentTableOBJ.RowData[i][m].rowspan = this.currentTableOBJ.Merges[j].EndRowIndex - this.currentTableOBJ.Merges[j].StartRowIndex + 1
                this.currentTableOBJ.RowData[i][m].colspan = this.currentTableOBJ.Merges[j].EndColumnIndex - this.currentTableOBJ.Merges[j].StartColumnIndex + 1
              }
            }
          }

        }

      }
      for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
        this.$set(this.currentTableOBJ.RowData[i], 'radio', false)
        for (let j = 0; j < this.currentTableOBJ.RowData[i].length; j++) {
          if (this.currentTableOBJ.RowData[i][j] && this.currentTableOBJ.RowData[i][j].IsMergeCell && this.currentTableOBJ.RowData[i][j].CellValue == '') {
            this.currentTableOBJ.RowData[i][j] = null
          }
        }
      }
      this.TwoArealoading = false
    },
    //选择起始行
    selectTitleStart (item, index) {
      for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
        if (i == index) {
          this.$set(this.currentTableOBJ.RowData[i], 'radio', true)
        } else {
          this.$set(this.currentTableOBJ.RowData[i], 'radio', false)
        }
      }
    },
    //第二步下一步操作
    dialogtrue2 () {
      for (let i = 0; i < this.currentTableOBJ.RowData.length; i++) {
        if (this.currentTableOBJ.RowData[i].radio) {
          this.TwoFrom.StartRow = i
        }
      }
      if (this.TwoFrom.StartRow < 0) {
        this.$message({
          message: '请勾选可识别的有效列表表头行',
          type: 'warning'
        })
        return
      }
      // this.changeproject(this.searchObject.ProjectId)
      console.log(this.searchObject.Type)
      let obj = {
        ProjectId: this.searchObject.ProjectId,
        Type: this.searchObject.Type,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      showLoading()
      GetSalaryMapByProjectId(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.TemplateList = response.Data
            //第二步数据回填
            if (this.TemplateList.length > 0) {
              this.$set(this.TemplateObject, 'Type', '1')
              if (this.backfillObj.SalaryMapId) {
                this.$set(this.TemplateObject, 'name', this.backfillObj.MapName)
                this.$set(this.TemplateObject, 'TemplateId', this.backfillObj.SalaryMapId)
              } else {
                this.$set(this.TemplateObject, 'name', '')
                this.$set(this.TemplateObject, 'TemplateId', '')
              }
            } else {
              this.$set(this.TemplateObject, 'name', '')
              this.$set(this.TemplateObject, 'TemplateId', '')
              this.$set(this.TemplateObject, 'Type', '0')
            }

            this.showSalaryTemplate = true
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    },
    //确认弹窗数据
    AddTemplateSave (data) {
      console.log(data)
      showLoading()
      this.TemplateData = data
      let param = new FormData();
      param.append('file', this.fileters)
      param.append('SheetName', this.TwoFrom.SheetName)
      param.append('StartRow', this.TwoFrom.StartRow)
      param.menuid = MenuIdDate()
      param.operationcode = '1'
      GetSalaryTableHead(param).then(response => {
        if (response.IsSuccess) {
          this.ImportToExcelStructuralData = response.Data
          this.DisableImportToExcelStructuralData = []
          for (let i = 0; i < this.ImportToExcelStructuralData.length; i++) {
            this.DisableImportToExcelStructuralData.push({ 'title': this.ImportToExcelStructuralData[i], disabled: false })
          }
          if (this.TemplateData.Type == '0') {
            //新建时智能匹配
            this.ruleFunctions(this.DisableImportToExcelStructuralData)
          } else {
            //选择模板进行回填
            this.GetSalaryMap(this.TemplateData.TemplateId)
          }
          if (this.searchObject.Type != '1') {
            for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
              for (let j = 0; j < this.dataObject.ErpStructuraArr[i].ListArr.length; j++) {
                if (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitleName == 'RealPayTaxAfter') {
                  this.$set(this.dataObject.ErpStructuraArr[i].ListArr[j], 'Ismandatory', false)
                }
              }
            }
            for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
              if (this.dataObject.ErpStructuraArr[i].CombinedArr && this.dataObject.ErpStructuraArr[i].CombinedArr.length > 0) {
                for (let j = 0; j < this.dataObject.ErpStructuraArr[i].CombinedArr.length; j++) {
                  if (this.dataObject.ErpStructuraArr[i].CombinedArr[j].stytitle == '应发工资小计') {
                    this.$set(this.dataObject.ErpStructuraArr[i].CombinedArr[j], 'Ismandatory', false)
                  }
                  if (this.dataObject.ErpStructuraArr[i].CombinedArr[j].stytitle == '企业部分社保合计') {
                    this.$set(this.dataObject.ErpStructuraArr[i].CombinedArr[j], 'Ismandatory', false)
                  }
                  if (this.dataObject.ErpStructuraArr[i].CombinedArr[j].stytitle == '个人部分社保') {
                    this.$set(this.dataObject.ErpStructuraArr[i].CombinedArr[j], 'Ismandatory', false)
                  }
                }
              }
            }

          }
          this.showSalaryTemplate = false
          this.currentActive = 2
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'warning'
          })
        }

      })
    },
    //新建时智能匹配表头
    ruleFunctions (arr) {
      console.log(arr, 'hdkjahd')
      let rulse1 = '姓名'
      let rulse2 = '身份证'
      let rulse3 = '银行'
      let rulse4 = '开户行'
      let rulse5 = '手机'

      let Salary1 = '基本工资'
      let Salary2 = '岗位'
      let Salary3 = '绩效'
      let Salary4 = '加班'
      let Salary5 = '考勤'
      let Salary6 = '提成'
      let Salary7 = '奖金'
      let Salary8 = '罚金'
      let Salary9 = '应发工资'
      let Salary10 = '实发工资'

      let publicRulse1 = '企业'
      let publicRulse2 = '大'
      let publicRulse3 = '个人'
      let publicRulse4 = '补收补退'
      let publicRulse5 = '单位'

      let enterprise1 = '养老'
      let enterprise2 = '医疗'
      let enterprise3 = '大额医疗'
      let enterprise4 = '失业'
      let enterprise5 = '工伤'
      let enterprise6 = '长护'
      let enterprise7 = '公积金'
      let enterprise8 = '管理费'
      let enterprise9 = '税金'
      let enterprise10 = '个税'
      for (let m = 0; m < arr.length; m++) {
        for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
          for (let j = 0; j < this.dataObject.ErpStructuraArr[i].ListArr.length; j++) {
            //匹配基本信息
            if (arr[m].title.indexOf(rulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(rulse1) >= 0) {
              console.log(arr[m])
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(rulse2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(rulse2) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(rulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(rulse3) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(rulse4) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(rulse4) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(rulse5) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(rulse5) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            //匹配工资信息
            if (arr[m].title.indexOf(Salary1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(Salary1) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(Salary2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(Salary2) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(Salary3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(Salary3) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(Salary4) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(Salary4) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(Salary5) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(Salary5) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(Salary6) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(Salary6) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(Salary7) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(Salary7) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(Salary8) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(Salary8) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(Salary9) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(Salary9) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(Salary10) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(Salary10) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(enterprise8) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise8) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(enterprise9) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise9) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
            if (arr[m].title.indexOf(enterprise10) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise10) >= 0) {
              this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
            }
          }
        }
      }
      for (let m = 0; m < arr.length; m++) {
        for (let i = 0; i < this.dataObject.ErpStructuraArr.length - 3; i++) {
          for (let j = 0; j < this.dataObject.ErpStructuraArr[i].ListArr.length; j++) {

            //匹配企业和个人部分社保
            if (!arr[m].title.includes(publicRulse4) && !this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.includes(publicRulse4)) {
              //企业部分
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise1) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise1) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) < 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) < 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise3) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise3) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise4) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise4) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise5) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise5) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise6) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise6) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise7) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise7) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              //单位部分
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise1) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise1) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) < 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) < 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise3) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise3) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise4) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise4) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise5) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise5) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise6) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise6) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise7) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise7) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              //个人部分
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise1) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise1) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) < 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) < 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise3) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise3) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise4) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise4) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise5) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise5) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise6) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise6) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise7) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise7) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
            }

          }
        }
      }
      for (let m = 0; m < arr.length; m++) {
        for (let i = 0; i < this.dataObject.ErpStructuraArr.length - 3; i++) {
          for (let j = 0; j < this.dataObject.ErpStructuraArr[i].ListArr.length; j++) {
            if (arr[m].title.includes(publicRulse4) && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.includes(publicRulse4)) {
              //企业部分
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise1) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise1) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) < 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) < 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise3) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise3) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise4) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise4) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise5) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise5) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise6) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise6) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse1) >= 0 && arr[m].title.indexOf(enterprise7) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise7) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              //单位部分
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise1) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise1) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) < 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) < 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise3) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise3) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise4) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise4) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise5) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise5) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise6) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise6) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse5) >= 0 && arr[m].title.indexOf(enterprise7) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse1) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise7) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              //个人部分
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise1) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise1) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise2) >= 0 && arr[m].title.indexOf(publicRulse2) < 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise2) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse2) < 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise3) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise3) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise4) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise4) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise5) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise5) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise6) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise6) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
              if ((arr[m].title.indexOf(publicRulse3) >= 0 && arr[m].title.indexOf(enterprise7) >= 0) && (this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(publicRulse3) >= 0 && this.dataObject.ErpStructuraArr[i].ListArr[j].stytitle.indexOf(enterprise7) >= 0)) {
                this.dataObject.ErpStructuraArr[i].ListArr[j].header = arr[m].title
              }
            }
          }
        }
      }
      //循环禁用已经使用过的表头
      for (let m = 0; m < this.DisableImportToExcelStructuralData.length; m++) {
        for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
          for (let j = 0; j < this.dataObject.ErpStructuraArr[i].ListArr.length; j++) {
            if (this.DisableImportToExcelStructuralData[m].title == this.dataObject.ErpStructuraArr[i].ListArr[j].header) {
              this.$set(this.DisableImportToExcelStructuralData[m], 'disabled', true)
            }
          }
        }
      }
      hideLoading()
    },
    //替换数据时获取回填参数以及模板ID
    getSalaryBatch () {
      let obj = {
        Id: this.ReplaceId,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetSalaryBatch(qs.stringify(obj)).then(response => {
        console.log(response)
        if (response.IsSuccess) {
          //第一步数据回填
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
            this.searchObject.month = new Date(response.Data.SalaryYear, response.Data.SalaryMonth - 1)
          }
          if (response.Data.SiYear && response.Data.SiMonth) {
            this.searchObject.SiYearMonth = new Date(response.Data.SiYear, response.Data.SiMonth - 1)
          }
          if (response.Data.FundYear && response.Data.FundMonth) {
            this.searchObject.FundYearMonth = new Date(response.Data.FundYear, response.Data.FundMonth - 1)
          }
          this.searchObject.CompanyId = response.Data.CompanyId
          this.searchObject.ProjectId = response.Data.ProjectId
          this.searchObject.Type = response.Data.Type
          this.backfillObj = response.Data
          // // 搜索相应项目的影射
          // this.changeproject(response.Data.ProjectId)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取模板的映射详情数据
    GetSalaryMap (Id) {
      let obj = {
        Id: Id,
        ProjectId: this.searchObject.ProjectId,
        Type: this.searchObject.Type,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetSalaryMap(qs.stringify(obj)).then(response => {
        console.log(response)
        if (response.IsSuccess && response.Data) {
          this.TemplateSalaryMap = response.Data
          //处理列表回填
          let ItemMapObj = JSON.parse(this.TemplateSalaryMap.ItemMap)
          for (const key in ItemMapObj) {
            for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
              for (let j = 0; j < this.dataObject.ErpStructuraArr[i].ListArr.length; j++) {
                if (key == this.dataObject.ErpStructuraArr[i].ListArr[j].stytitleName) {
                  this.dataObject.ErpStructuraArr[i].ListArr[j].header = ItemMapObj[key]
                }
              }
            }
          }
          //循环禁用已经使用过的表头
          for (let m = 0; m < this.DisableImportToExcelStructuralData.length; m++) {
            for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
              for (let j = 0; j < this.dataObject.ErpStructuraArr[i].ListArr.length; j++) {
                if (this.DisableImportToExcelStructuralData[m].title == this.dataObject.ErpStructuraArr[i].ListArr[j].header) {
                  this.$set(this.DisableImportToExcelStructuralData[m], 'disabled', true)
                }
              }
            }
          }
          //处理计算公式回填
          let TotalFormula = this.TemplateSalaryMap.TotalFormula
          for (let i = 0; i < TotalFormula.length; i++) {
            if (TotalFormula[i].Formula.indexOf('|') > -1) {
              TotalFormula[i].Formula = '+' + TotalFormula[i].Formula
              let strs1 = TotalFormula[i].Formula.replace(/[|]/g, '')
              let strs2 = strs1.replaceAll('+', ',+,')
              let strs3 = strs2.replaceAll('-', ',-,')
              TotalFormula[i].Content = strs3.split(',')
              TotalFormula[i].Content.shift()
            } else {
              TotalFormula[i].Content = ['+', TotalFormula[i].Formula]
            }
          }

          // var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;
          //通过数组组成本地数据数组
          for (let i = 0; i < TotalFormula.length; i++) {
            TotalFormula[i].ContentArrays = []
            if (TotalFormula[i].Content) {
              for (let j = 0; j < TotalFormula[i].Content.length; j++) {
                TotalFormula[i].ContentArrays.push({ 'symbol': TotalFormula[i].Content[j], 'title': TotalFormula[i].Content[j + 1] })
                j++
              }
            }
          }
          //通过对比还原表头字段
          for (let i = 0; i < TotalFormula.length; i++) {
            for (let j = 0; j < TotalFormula[i].ContentArrays.length; j++) {
              for (let m = 0; m < this.dataObject.ErpStructuraArr.length; m++) {
                for (let k = 0; k < this.dataObject.ErpStructuraArr[m].ListArr.length; k++) {
                  if (TotalFormula[i].ContentArrays[j].title == this.dataObject.ErpStructuraArr[m].ListArr[k].stytitleName) {
                    TotalFormula[i].ContentArrays[j].titles = this.dataObject.ErpStructuraArr[m].ListArr[k].header
                  }
                }
              }
            }
          }
          //通过对比还原表头字段数组
          for (let i = 0; i < TotalFormula.length; i++) {
            TotalFormula[i].ContentArray = []
            for (let j = 0; j < TotalFormula[i].ContentArrays.length; j++) {
              TotalFormula[i].ContentArray.push({ 'symbol': TotalFormula[i].ContentArrays[j].symbol, 'title': TotalFormula[i].ContentArrays[j].titles })
            }
          }
          for (let m = 0; m < TotalFormula.length; m++) {
            for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
              if (this.dataObject.ErpStructuraArr[i].CombinedArr && this.dataObject.ErpStructuraArr[i].CombinedArr.length) {
                for (let j = 0; j < this.dataObject.ErpStructuraArr[i].CombinedArr.length; j++) {
                  if (TotalFormula[m].Type == this.dataObject.ErpStructuraArr[i].CombinedArr[j].Type) {
                    this.dataObject.ErpStructuraArr[i].CombinedArr[j].ContentArray = TotalFormula[m].ContentArray
                  }
                }
              }

            }
          }
          console.log(TotalFormula)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    },
    //关闭模板弹窗
    closeTemplateSave (e) {
      this.showSalaryTemplate = e
    },
    //打开计算公式弹窗
    OpenSetCalculationFormula (e, index, inx) {
      this.seletIndex = [index, inx]
      this.CalculationFormulaTitle = e.stytitle
      // ContentArray回填数据
      this.ContentArrays = e.ContentArray
      this.showCalculationFormula = true
    },
    //保存计算公式
    AddCalculationFormula (data) {
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].stytitleName = ''
        }
      }

      this.dataObject.ErpStructuraArr[this.seletIndex[0]].CombinedArr[this.seletIndex[1]].ContentArray = data
      this.showCalculationFormula = false
    },
    //删除计算公式项
    DelectResults (index, inx, indexmin) {
      this.dataObject.ErpStructuraArr[index].CombinedArr[inx].ContentArray.splice(indexmin, 1)
    },
    //关闭计算公式弹窗
    closeCalculationFormula (e) {
      this.showCalculationFormula = e
    },
    //第三步下一步
    //选择下拉框时禁用选项
    slectInput (e) {
      //重置所有禁用表头
      for (let m = 0; m < this.DisableImportToExcelStructuralData.length; m++) {
        this.$set(this.DisableImportToExcelStructuralData[m], 'disabled', false)
      }
      //循环禁用已经使用过的表头
      for (let m = 0; m < this.DisableImportToExcelStructuralData.length; m++) {
        for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
          for (let j = 0; j < this.dataObject.ErpStructuraArr[i].ListArr.length; j++) {
            if (this.DisableImportToExcelStructuralData[m].title == this.dataObject.ErpStructuraArr[i].ListArr[j].header) {
              this.$set(this.DisableImportToExcelStructuralData[m], 'disabled', true)
            }
          }
        }
      }
    },
    //清空下拉框时取消禁用选项
    ClearSlectInput (e) {
      for (let m = 0; m < this.DisableImportToExcelStructuralData.length; m++) {
        this.$set(this.DisableImportToExcelStructuralData[m], 'disabled', false)
      }
      //循环禁用已经使用过的表头
      for (let m = 0; m < this.DisableImportToExcelStructuralData.length; m++) {
        for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
          for (let j = 0; j < this.dataObject.ErpStructuraArr[i].ListArr.length; j++) {
            if (this.DisableImportToExcelStructuralData[m].title == this.dataObject.ErpStructuraArr[i].ListArr[j].header) {
              this.$set(this.DisableImportToExcelStructuralData[m], 'disabled', true)
            }
          }
        }
      }
    },
    dialogtrue3 () {
      let Id = ''
      //检验必填项是否全部填写
      for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
        for (let j = 0; j < this.dataObject.ErpStructuraArr[i].ListArr.length; j++) {
          if (this.dataObject.ErpStructuraArr[i].ListArr[j].Ismandatory && this.dataObject.ErpStructuraArr[i].ListArr[j].header == '') {

            this.$message({
              message: '请填写完带红色标题的必填项',
              type: 'error'
            })
            return false
          }
        }
        if (this.dataObject.ErpStructuraArr[i].CombinedArr && this.dataObject.ErpStructuraArr[i].CombinedArr.length > 0) {
          for (let m = 0; m < this.dataObject.ErpStructuraArr[i].CombinedArr.length; m++) {
            if (this.dataObject.ErpStructuraArr[i].CombinedArr[m].Ismandatory && this.dataObject.ErpStructuraArr[i].CombinedArr[m].ContentArray.length == 0) {
              this.$message({
                message: '请填写完带红色标题的必填项',
                type: 'error'
              })
              return false
            }
          }
        }

      }
      //处理计算公式数据并检验计算公式内是否有项没有选择
      let ArrList2 = []
      // let ReArrList = []
      for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
        if (this.dataObject.ErpStructuraArr[i].CombinedArr && this.dataObject.ErpStructuraArr[i].CombinedArr.length > 0) {
          for (let j = 0; j < this.dataObject.ErpStructuraArr[i].CombinedArr.length; j++) {
            if (this.dataObject.ErpStructuraArr[i].CombinedArr[j].ContentArray && this.dataObject.ErpStructuraArr[i].CombinedArr[j].ContentArray.length > 0) {
              ArrList2.push(this.dataObject.ErpStructuraArr[i].CombinedArr[j])
            }
          }
        }
      }
      // let obj = {};
      // ReArrList = ArrList.reduce((cur, next) => {
      //   obj[next.title] ? "" : obj[next.title] = true && cur.push(next);
      //   return cur;
      // }, [])

      for (let i = 0; i < ArrList2.length; i++) {
        for (let j = 0; j < ArrList2[i].ContentArray.length; j++) {
          let strs = ArrList2[i].ContentArray[j].title
          for (let m = 0; m < this.dataObject.ErpStructuraArr.length; m++) {
            for (let k = 0; k < this.dataObject.ErpStructuraArr[m].ListArr.length; k++) {
              if (ArrList2[i].ContentArray[j].title == this.dataObject.ErpStructuraArr[m].ListArr[k].header) {
                ArrList2[i].ContentArray[j].stytitleName = this.dataObject.ErpStructuraArr[m].ListArr[k].stytitleName
              }
            }
          }
        }
      }
      for (let i = 0; i < ArrList2.length; i++) {
        for (let j = 0; j < ArrList2[i].ContentArray.length; j++) {
          if (!ArrList2[i].ContentArray[j].stytitleName) {
            this.$message({
              message: `你映射的（ ${ArrList2[i].stytitle} ）计算公式中未匹配到（ ${ArrList2[i].ContentArray[j].title} ）字段，计算公式存在异常 !`,
              type: 'error'
            })
            return
          }
        }
      }
      for (let i = 0; i < ArrList2.length; i++) {
        ArrList2[i].header = ''
        for (let j = 0; j < ArrList2[i].ContentArray.length; j++) {
          if (j == 0) {
            ArrList2[i].header += ArrList2[i].ContentArray[j].stytitleName
          } else {
            ArrList2[i].header += '|' + ArrList2[i].ContentArray[j].symbol + '|' + ArrList2[i].ContentArray[j].stytitleName
          }

        }
      }
      let TotalFormula = []
      for (let i = 0; i < ArrList2.length; i++) {
        TotalFormula.push({ 'Type': ArrList2[i].Type, 'Formula': ArrList2[i].header })
      }
      //处理映射字段数据
      let obj2 = {}
      let ItemMap = ''
      for (let i = 0; i < this.dataObject.ErpStructuraArr.length; i++) {
        for (let j = 0; j < this.dataObject.ErpStructuraArr[i].ListArr.length; j++) {
          obj2[this.dataObject.ErpStructuraArr[i].ListArr[j].stytitleName] = this.dataObject.ErpStructuraArr[i].ListArr[j].header
        }
      }
      console.log(obj2)
      ItemMap = JSON.stringify(obj2)
      console.log(ItemMap)
      let param = {
        CompanyId: this.searchObject.CompanyId,
        ProjectId: this.searchObject.ProjectId,
        Type: this.searchObject.Type,
        StartRow: this.TwoFrom.StartRow,
        Name: this.TemplateData.name,
        // StartCol: this.searchObject.StartCol,
        Status: this.searchObject.Status,
        FieldName: this.ImportToExcelStructuralData,
        SheetName: this.TwoFrom.SheetName,
        menuid: MenuIdDate(),
        operationcode: 1,
        ItemMap: ItemMap,
        TotalFormula: TotalFormula
      }
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
      showLoading()
      //判断是否选择模板
      if (this.TemplateData.TemplateId) {
        let TemplateObj = {
          "Id": this.TemplateData.TemplateId,
          "ItemMap": ItemMap,
          "TotalFormula": TotalFormula
        }
        //判断模板的映射关系是否改变并保存
        CheckMapChange(qs.stringify(TemplateObj)).then(response => {
          console.log(response)
          if (response.IsSuccess) {
            if (response.Data) {
              this.$confirm('检测到你当前的映射关系有更改，是否保存当前模板映射关系？', '提示', {
                confirmButtonText: '保存',
                cancelButtonText: '忽略',
                type: 'warning'
              }).then(() => {
                param.Id = this.TemplateData.TemplateId
                EditSalaryMap(param).then(response => {
                  if (response.IsSuccess) {
                    //进行预导入
                    this.ImportSalary(this.TemplateData.TemplateId)
                  } else {
                    this.$message({
                      message: response.MessageContent,
                      type: 'error'
                    })
                  }
                })
              }).catch(() => {
                this.ImportSalary(this.TemplateData.TemplateId)
              });
            } else {
              this.ImportSalary(this.TemplateData.TemplateId)
            }
          } else {
            hideLoading()
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
        // EditSalaryMap
        //判断是否有改变映射关系
      } else {
        AddSalaryMap(param).then(response => {
          if (response.IsSuccess) {
            //进行预导入
            this.ImportSalary(response.Data)
          } else {
            hideLoading()
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    //进行预导入
    ImportSalary (Id) {
      let ParamData = new FormData();
      ParamData.append('file', this.fileters)
      ParamData.append('SalaryMapId', Id)
      ParamData.append('SalaryYear', this.searchObject.SalaryYear)
      ParamData.append('SalaryMonth', this.searchObject.SalaryMonth)
      ParamData.append('SiYear', this.searchObject.SiYear)
      ParamData.append('SiMonth', this.searchObject.SiMonth)
      ParamData.append('FundYear', this.searchObject.FundYear)
      ParamData.append('FundMonth', this.searchObject.FundMonth)
      ParamData.append('StartRow', this.TwoFrom.StartRow)
      ParamData.append('SheetName', this.TwoFrom.SheetName)
      ParamData.append('menuid', MenuIdDate())
      ParamData.append('operationcode', 1)
      BeforehandImportSalary(ParamData).then(response => {
        hideLoading()
        if (response.IsSuccess && response.Data) {
          this.BeforehandBatchId = response.Data.BeforehandBatchId
          this.BeforehandBatchUrl = response.Data.Url
          this.FloatingList = response.Data.List
          if (this.FloatingList.length > 0) {
            this.FloatingBtShow = true
          } else {
            this.FloatingBtShow = false
          }
          this.currentActive = 3
          this.GetSalaryBeforehand()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //第四步Js

    //切换tab栏
    choosetab (e) {
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        // this.currentPage = 1
        this.tabidx = e.value
        this.GetSalaryBeforehand()
      }
    },
    //获取预导入数据
    GetSalaryBeforehand () {
      showLoading()
      let obj = {
        "SalaryBatchBeforehandId": this.BeforehandBatchId,
        "Type": this.tabidx,
        'menuid': MenuIdDate(),
        'operationcode': 1
      }
      GetSalaryBeforehandList(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess && response.Data) {
          this.FloatingSuCCList = response.Data.List
          this.tablist[this.tabidx].sum = this.FloatingSuCCList.length
          this.FloatingSuCCUrl = response.Data.Url
          for (let i = 0; i < this.FloatingSuCCList.length; i++) {
            this.FloatingSuCCList[i].SalaryBatchBeforehandId = this.BeforehandBatchId
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 处理合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 5 || index === 6 || index === 7 || index === 8 || index === 9 || index === 10 || index === 11 || index === 12 || index === 13) {
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
              sums[index] = '￥' + sums[index].toFixed(2)
            }
          } else {
            sums[index] = 'N/A'
          }
        } else {
          sums[index] = '--'
        }
      })
      return sums
    },
    //查看异常数据
    OpenAbnormal () {
      this.showErrData = true
    },
    //下载异常数据
    downErrList () {
      showLoading()
      window.open(this.BeforehandBatchUrl)
      hideLoading()
    },
    //关闭异常数据窗口
    closeErrData () {
      this.showErrData = false
    },
    //批量入职
    BatchEntry () {
      if (this.FloatingSuCCList.length > 0) {
        this.BatchEntryTitle = '批量入职办理'
        this.ProjectName = this.searchObject.ProjectName
        this.showBatchEntrys = true
      } else {
        this.$message({
          message: '未存在新增员工，不能进行批量入职操作',
          type: 'warning'
        })
      }

    },
    AddBatchEntry (data) {
      showLoading()
      let obj = {
        'SalaryBatchBeforehandId': this.BeforehandBatchId,
        'BfCompanyId': data.BfCompany,
        'EntyTime': data.EntyTime,
        'SiStatus': data.SiStatus,
        'SiStartYear': data.SiStartYear,
        'SiStartMonth': data.SiStartMonth,
        'FundStatus': data.FundStatus,
        'FundStartYear': data.FundStartYear,
        'FundStartMonth': data.FundStartMonth,
        'MedicalStatus': data.MedicalStatus,
        'MedicalStartYear': data.MedicalStartYear,
        'MedicalStartMonth': data.MedicalStartMonth,
        'menuid': MenuIdDate(),
        'operationcode': '1',
      }
      SalaryStaffBatchInduction(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '批量入职员工成功',
            type: 'success'
          })
          this.showBatchEntrys = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    closeAddBatchEntry (e) {
      this.showBatchEntrys = e
    },
    //完成导入
    CompleteImport () {
      showLoading()
      if (this.ReplaceId) {
        let obj = {
          SalaryBatchBeforehandId: this.BeforehandBatchId,
          SalaryBatchId: this.ReplaceId,
          menuid: MenuIdDate(),// operating.MenuId,
          operationcode: '1' // operating.OperationCode
        }
        ReplaceImportSalaryExecute(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            if (response.Data) {
              this.Resultscontent = `替换薪酬数据导入成功${response.Data.SuccessNum}条，数据导入失败${response.Data.FailNum}条。`
              if (response.Data.FailNum > 0 && response.Data.Url) {
                this.ResultsErrUrl = response.Data.Url
                this.ResultsBtn = true
              } else {
                this.ResultsBtn = false
              }
              this.ResultsVisible = true
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        let obj = {
          SalaryBatchBeforehandId: this.BeforehandBatchId,
          menuid: MenuIdDate(),// operating.MenuId,
          operationcode: '1' // operating.OperationCode
        }

        ImportSalaryExecute(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            if (response.Data) {
              this.Resultscontent = `薪酬数据导入成功${response.Data.SuccessNum}条，数据导入失败${response.Data.FailNum}条。`
              if (response.Data.FailNum > 0 && response.Data.Url) {
                this.ResultsErrUrl = response.Data.Url
                this.ResultsBtn = true
              } else {
                this.ResultsBtn = false
              }
              this.ResultsVisible = true
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }

    },
    //导出人员
    ExportList () {
      showLoading()
      window.open(this.FloatingSuCCUrl)
      hideLoading()
    },
    //取消导入
    CancelImport () {
      this.$confirm('此操作将取消导入和之前的步骤, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          BeforehandBatchId: this.BeforehandBatchId,
          menuid: MenuIdDate(),// operating.MenuId,
          operationcode: '1' // operating.OperationCode
        }
        showLoading()
        DeleteSalaryBatchBeforehand(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              message: '取消导入成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 2000)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // 下载导入结果
    DownloadImport () {
      showLoading()
      window.open(this.ResultsErrUrl)
      hideLoading()
    },
    //确认导入结果
    confirmImport () {
      this.ResultsVisible = false
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.ImportCompensationForm {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .ImportCompensationForm-content {
    background: #fff;
    min-height: 700px;
    .description-box {
      padding: 20px 0;
    }
    .payroll-content {
      background: #fff;
      overflow: hidden;
      border-radius: 8px 0 0 8px;
      margin-left: 24px;
      padding: 40px;
      .forms-Compensation {
        /deep/ .el-form-item {
          margin-bottom: 10px;
          .bginput {
            width: 100%;
            .el-input__inner {
              height: 36px;
              line-height: 36px;
              border: 1px solid $erinputbgc;
              background-color: $erinputbgc;
            }
          }
          .el-form-item__label {
            display: inline;
            padding: 0;
            line-height: 28px;
          }
        }
        /deep/ .is-error {
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
    }
    .TwoArea {
      width: 90%;
      // border: 1px solid #666666;
      margin-left: 5%;
      .table-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
      .TwoArea-center {
        // border: 1px solid #666666;
        width: 100%;
        .TwoArea-centerTitle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-items: flex-start;
          border-bottom: 1px solid #666666;
          div {
            padding: 20px;
          }
          .title-left {
            width: 20%;
            border-right: 1px solid #666666;
          }
          .title-right {
            width: 80%;
          }
        }
        .TwoArea-centerbox {
          width: 100%;
          .TwoArea-centerboxright {
            width: 100%;
            overflow-x: scroll;
            .TwoArea-table {
              border-collapse: collapse;
              border: 1px solid #666666;
              tr {
                td {
                  border: 1px solid #e1e1e6;
                  min-width: 100px;
                  padding: 10px;
                  text-align: center;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-all;
                }
              }
            }
          }
          .TwoArea-centerboxtitles {
            color: #ff4a4a;
            margin-top: 20px;
            i {
              margin-right: 10px;
            }
          }
        }
      }
      .TwoArea-footer {
        width: 100%;
        .TwoArea-footerright {
          width: 100%;
          display: flex;
          align-items: center;
          justify-items: flex-start;
          margin-bottom: 30px;
          .selectSheet {
            width: 200px;
            margin: 0 30px 0 0;
            /deep/ input {
              border: 1px solid #1588f8;
              background: #1588f8;
              color: #fff;
            }
            .el-select__caret {
              color: #fff;
            }
          }
          .stylesss {
            min-width: 320px;
            span {
              margin-right: 20px;
            }
            .el-radio {
              margin-right: 30px;
            }
          }
        }
      }
    }
    /deep/ .ErpStructuraDataObject {
      padding: 50px 30px;
      .ErpStructuraArr {
        border-bottom: 1px solid #e3e3e6;
        margin-bottom: 30px;
        padding-bottom: 20px;
        .calculation-title {
          font-size: $f16;
          color: $erp333;
          line-height: 16px;
          position: relative;
          padding-left: 12px;
          margin-bottom: 20px;
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
        .selectFormula {
          border: 1px solid $erinputbgc;
          background-color: $erinputbgc;
          position: relative;
          border-radius: 5px;
          .selectFormula-left {
            min-height: 38px;

            padding-bottom: 5px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-left: 10px;
            width: 80%;
            .tag-item {
              display: inline-block;
              margin-top: 5px;
              height: 30px;
              .tagxm {
                padding: 0 10px 0 5px;
                min-width: 60px;
                max-width: 180px;
                background: #f4f6f9;
                border-radius: 5px;
                text-align: left;
                height: 30px;
                display: inline-block;
                line-height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                position: relative;
                .tiele {
                  padding: 0 10px 0 5px;
                }
                i {
                  margin-left: 10px;
                  position: absolute;
                  right: 5px;
                  top: 8px;
                  &:hover {
                    color: #1588f8;
                    cursor: pointer;
                  }
                }
              }
              .symbol {
                line-height: 30px;
                margin: 0 5px;
                vertical-align: top;
              }
            }
          }

          .buttonFormula {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translate(0, -50%);
            color: #1588f8;
          }
        }
        .el-form-item__label {
          padding: 0;
          line-height: 30px;
        }
        .el-form-item__content {
          .el-select {
            width: 100%;
            .el-input__inner {
              border: 1px solid $erinputbgc;
              background-color: $erinputbgc;
            }
          }
        }
      }
    }
    /deep/ .Ismandatory {
      .el-form-item__label {
        color: #ff4a4a;
      }
    }
    .Four-tableBox {
      .table-content {
        border-radius: 0;
      }
    }
  }
  .dialog-footer {
    margin-top: 50px;
    text-align: center;
    padding-bottom: 40px;
    button {
      min-width: 100px;
      padding: 13px 15px;
      border-radius: 8px;
      font-size: 14px;
    }
    .blueBtn {
      background: $erpbtncolor;
      color: $erpcolor;
      border: none;
      &:hover {
        background-color: $erpcolor !important;
        color: #fff !important;
      }
      &:active {
        background-color: $erpbtnactive !important;
        color: #fff !important;
      }
      &:focus {
        background-color: $erpbtncolor;
        color: $erpcolor;
      }
    }
    .abnormal {
      background: #e6a23c;
      color: $erpbgcolor;
      border: none;
      float: left;
    }
    .grayBtn {
      background: #fff;
      color: $erp999;
      padding: 12px 14px;
      border: 1px solid $erp999;
    }
    .cancelBtn {
      background: $erpredbtn;
      color: $erpredbtnactive;
      border: none;
      &:hover {
        background-color: $erpredbtnactive !important;
        color: #fff !important;
      }
      &:active {
        background-color: $erpredbtnactive !important;
        color: #fff !important;
      }
      &:focus {
        background-color: $erpredbtnactive;
        color: $erpcolor;
      }
    }
  }
}
</style>