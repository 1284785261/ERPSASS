//查看工资映射表
<template>
  <div class="Compensation-box">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="systemField-content">
      <el-form class="ErpStructuraDataObject" style="padding: 20px 30px;">
        <el-row :gutter="64">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="映射模板名称">
              <el-input v-model="TemplateSalaryMap.Name" disabled clearable class="bginput" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="所属客户">
              <el-input v-model="TemplateSalaryMap.CompanyName" disabled clearable class="bginput" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="所属项目">
              <el-input v-model="TemplateSalaryMap.ProjectName" disabled clearable class="bginput" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="映射表Sheet名">
              <el-input v-model="TemplateSalaryMap.SheetName" disabled clearable class="bginput" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="映射表标题起始行">
              <el-input v-model="TemplateSalaryMap.StartRow" disabled clearable class="bginput" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="工资类型">
              <el-input v-model="TypeName" disabled clearable class="bginput" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form label-position="top" ref="dataObject" :model="dataObject" label-width="100px" class="ErpStructuraDataObject">
        <div v-for="(item,index) in dataObject.ErpStructuraArr" :key="'x'+index" class="ErpStructuraArr">
          <div class="calculation-title">{{item.title}}</div>
          <el-row :gutter="64">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(ite,inx) in item.ListArr" :key="'w'+inx">
              <el-form-item :label="ite.stytitle+'(必填)'" :prop="ite.header" v-if="ite.Ismandatory" :class="[ite.Ismandatory?'Ismandatory':'']">
                <el-select v-model="ite.header" filterable clearable disabled placeholder="">
                  <el-option v-for="item in DisableImportToExcelStructuralData" :key="'m'+item.title" :label="item.title" :value="item.title" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="ite.stytitle" :prop="ite.header" v-else>
                <el-select v-model="ite.header" filterable clearable disabled placeholder="">
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
                        <!-- <i class="el-icon-close" @click="DelectResults(index,inx,indexmin)"></i> -->
                      </span>
                    </div>
                  </div>
                  <!-- <a class="buttonFormula" @click="OpenSetCalculationFormula(ite,index,inx)">设置计算公式</a> -->
                </div>
              </el-form-item>
              <el-form-item :label="ite.stytitle" :prop="ite.header" v-else>
                <div class="selectFormula">
                  <div class="selectFormula-left">
                    <div class="tag-item" v-for="(itemin,indexmin) in ite.ContentArray" :key="'m'+indexmin">
                      <span class="symbol" v-if="indexmin > 0">{{itemin.symbol}}</span>
                      <span class="tagxm">
                        <span class="tiele">{{itemin.title}}</span>
                        <!-- <i class="el-icon-close" @click="DelectResults(index,inx,indexmin)"></i> -->
                      </span>
                    </div>
                  </div>
                  <!-- <a class="buttonFormula" @click="OpenSetCalculationFormula(ite,index,inx)">设置计算公式</a> -->
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="bottom">
      <el-button class="erpbtn" size="small" @click="$router.go(-1)">关闭</el-button>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { GetSalaryTableHead, GetSalaryMap } from '@/api/BusinessSet.js'
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
        name: '查看工资映射',
        router: ''
      }],
      loading: false,
      templateId: '',
      ProjectId: '',
      Type: '',
      TypeName: '',
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
      CompanyPageList: [],//对应客户
      TemplateSalaryMap: {},
      DisableImportToExcelStructuralData: []
    }
  },
  created () {
    if (this.$route.query && this.$route.query.Id) {
      this.Type = this.$route.query.Type
      switch (this.Type) {
        case 1:
          this.TypeName = '正常薪资'
          break;
        case 2:
          this.TypeName = '奖金'
          break;
        case 3:
          this.TypeName = '全年奖金'
          break;
        case 4:
          this.TypeName = '补偿'
          break;
        case 5:
          this.TypeName = '其它类型所得'
          break;
      }
      this.templateId = this.$route.query.Id
      this.ProjectId = this.$route.query.ProjectId
      this.GetSalaryMap(this.templateId)
      if (this.Type.Type != '1') {
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
    }
  },
  methods: {
    // 获取数据
    GetSalaryMap (Id) {
      let data = {
        Id: Id,
        ProjectId: this.ProjectId,
        Type: this.Type,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetSalaryMap(qs.stringify(data)).then(response => {
        if (response.IsSuccess && response.Data) {
          this.TemplateSalaryMap = response.Data
          this.DisableImportToExcelStructuralData = []
          // this.DisableImportToExcelStructuralData = this.TemplateSalaryMap.FieldName
          for (let i = 0; i < this.TemplateSalaryMap.FieldName.length; i++) {
            this.DisableImportToExcelStructuralData.push({ 'title': this.TemplateSalaryMap.FieldName[i], disabled: false })
          }
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
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.Compensation-box {
  margin-left: 24px;
  // 底部添加按钮
  .bottom {
    position: fixed;
    box-shadow: 0px 0px 20px 0px rgba(21, 136, 248, 0.1);
    bottom: 0;
    right: 0;
    margin-bottom: 0;
    text-align: center;
    width: calc(100% - 224px);
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    z-index: 999;
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
        border: 1px solid #dcdfe6;
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
        }
      }
    }
  }
  /deep/ .Ismandatory {
    .el-form-item__label {
      color: #ff4a4a;
    }
  }
  .systemField-content {
    background: #fff;
    min-height: 700px;
  }
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
}
</style>