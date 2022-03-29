<template>
  <div class="pay-balance-detail-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="balance-content">
      <div class="compensation-title">员工信息</div>
      <div class="comprow">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">员工姓名</div>
              <div class="message-con">{{balancedetail.Name}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">性别</div>
              <div class="message-con">{{balancedetail.Sex | Sex}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">身份证号</div>
              <div class="message-con">{{balancedetail.IdCode}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">所属年月</div>
              <div class="message-con" v-if="balancedetail.Year">{{balancedetail.Year}}年{{balancedetail.Month}}月</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">社保账号</div>
              <div class="message-con">{{balancedetail.SiAccount}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">公积金账号</div>
              <div class="message-con">{{balancedetail.HouseFundAccount}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="compensation-title">差额信息</div>
      <div class="comprow">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label lage">差额总计</div>
              <div class="message-con">{{balancedetail.TotalDefference | EedMoney}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label lage">社保差额</div>
              <div class="message-con">{{balancedetail.SiDefference | EedMoney}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label lage">公积金差额</div>
              <div class="message-con">{{balancedetail.HouseFunDefference | EedMoney}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label lage">社保账期</div>
              <div class="message-con" v-if="balancedetail.SiPeriodYear">{{balancedetail.SiPeriodYear}}年{{balancedetail.HouseFunPeriodMonth}}月</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label lage">公积金账期</div>
              <div class="message-con" v-if="balancedetail.HouseFunPeriodYear">{{balancedetail.HouseFunPeriodYear}}年{{balancedetail.HouseFunPeriodMonth}}月</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label lage"></div>
            </div>
          </el-col>
          <el-table ref="industrtTable" :data="systemFieldList" class="erp-table table-boxs" tooltip-effect="dark">
            <el-table-column align="center" prop="system" label="科目" />
            <el-table-column align="center" prop="ImportData" label="预收金额">
              <template slot-scope="scope">
                <div>
                  {{scope.row.ImportData | MoneyUnit}}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="SystemData" label="实缴金额">
              <template slot-scope="scope">
                <div>
                  {{scope.row.SystemData | MoneyUnit}}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="erpbtn" size="small" @click="dialogVisible">关 闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import filters from '@/utils/filters.js'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '缴纳差额管理',
        router: '/CompensationServiceManagement/PayBalanceManagement'
      }, {
        name: '缴纳差额详情',
        router: ''
      }],
      balancedetail: {

      },
      systemFieldList: [{
        system: '养老保险（企业部分）',
        name: 'EndowmentEnt',
        ImportData: '',
        SystemData: ''

      }, {
        system: '医疗保险（企业部分）',
        name: 'MedicalEnt',
        ImportData: '',
        SystemData: ''

      }, {
        system: '失业保险（企业部分）',
        name: 'UnemploymentEnt',
        ImportData: '',
        SystemData: ''
      }, {
        system: '生育保险（企业部分）',
        name: 'BirthEnt',
        ImportData: '',
        SystemData: ''

      }, {
        system: '工伤保险（企业部分）',
        name: 'InjuryEnt',
        ImportData: '',
        SystemData: ''

      }, {
        system: '养老保险（个人部分）',
        name: 'EndowmentPers',
        ImportData: '',
        SystemData: ''

      }, {
        system: '医疗保险（个人部分）',
        name: 'MedicalPers',
        ImportData: '',
        SystemData: ''

      }, {
        system: '失业保险（个人部分）',
        name: 'UnemploymentPers',
        ImportData: '',
        SystemData: ''

      }, {
        system: '生育保险（个人部分）',
        name: 'BirthPers',
        ImportData: '',
        SystemData: ''

      }, {
        system: '工伤保险（个人部分）',
        name: 'InjuryPers',
        ImportData: '',
        SystemData: ''

      }, {
        system: '住房公积金（企业部分）',
        name: 'HouseFundEnt',
        ImportData: '',
        SystemData: ''

      }, {
        system: '住房公积金（个人部分）',
        name: 'HouseFundPers',
        ImportData: '',
        SystemData: ''

      }],
    }
  },
  created () {
    if (window.localStorage.getItem('blancedetail')) {
      this.balancedetail = JSON.parse(localStorage.getItem('blancedetail'))
      for (let i = 0; i < this.systemFieldList.length; i++) {
        if (this.systemFieldList[i].name == 'EndowmentEnt') {
          this.systemFieldList[i].ImportData = this.balancedetail.EndowmentEnt
          this.systemFieldList[i].SystemData = this.balancedetail.SiPensionEnt
        }
        if (this.systemFieldList[i].name == 'MedicalEnt') {
          this.systemFieldList[i].ImportData = this.balancedetail.MedicalEnt
          this.systemFieldList[i].SystemData = this.balancedetail.SiMedicalEnt
        }
        if (this.systemFieldList[i].name == 'UnemploymentEnt') {
          this.systemFieldList[i].ImportData = this.balancedetail.UnemploymentEnt
          this.systemFieldList[i].SystemData = this.balancedetail.SiUnemployEnt
        }
        if (this.systemFieldList[i].name == 'BirthEnt') {
          this.systemFieldList[i].ImportData = this.balancedetail.BirthEnt
          this.systemFieldList[i].SystemData = this.balancedetail.SiBirthEnt
        }
        if (this.systemFieldList[i].name == 'InjuryEnt') {
          this.systemFieldList[i].ImportData = this.balancedetail.InjuryEnt
          this.systemFieldList[i].SystemData = this.balancedetail.SiInjuryEnt
        }
        if (this.systemFieldList[i].name == 'EndowmentPers') {
          this.systemFieldList[i].ImportData = this.balancedetail.EndowmentPers
          this.systemFieldList[i].SystemData = this.balancedetail.SiPensionPers
        }
        if (this.systemFieldList[i].name == 'MedicalPers') {
          this.systemFieldList[i].ImportData = this.balancedetail.MedicalPers
          this.systemFieldList[i].SystemData = this.balancedetail.SiMedicalPers
        }
        if (this.systemFieldList[i].name == 'UnemploymentPers') {
          this.systemFieldList[i].ImportData = this.balancedetail.UnemploymentPers
          this.systemFieldList[i].SystemData = this.balancedetail.SiUnemployPers
        }
        if (this.systemFieldList[i].name == 'BirthPers') {
          this.systemFieldList[i].ImportData = this.balancedetail.BirthPers
          this.systemFieldList[i].SystemData = this.balancedetail.SiBirthPers
        }
        if (this.systemFieldList[i].name == 'InjuryPers') {
          this.systemFieldList[i].ImportData = this.balancedetail.InjuryPers
          this.systemFieldList[i].SystemData = this.balancedetail.SiInjuryPers
        }
        if (this.systemFieldList[i].name == 'HouseFundEnt') {
          this.systemFieldList[i].ImportData = this.balancedetail.HouseFundEnt
          this.systemFieldList[i].SystemData = this.balancedetail.AmountEnt
        }
        if (this.systemFieldList[i].name == 'HouseFundPers') {
          this.systemFieldList[i].ImportData = this.balancedetail.HouseFundPers
          this.systemFieldList[i].SystemData = this.balancedetail.AmountPers
        }
      }
    }
  },
  methods: {
    dialogVisible () {
      window.open('about:blank', '_self').close();
    }
  }
}
</script>

<style lang="scss" scpoed>
.pay-balance-detail-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .balance-content {
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px 0 0 8px;
    padding: 40px;
    margin-left: 24px;
    .dialog-footer {
      width: 100%;
      margin-top: 20px;
      text-align: center;
      > button.erpbtn {
        width: auto;
        height: auto;
        color: #fff;
        background-color: $erpbtncolor;
        color: $erpcolor;
      }
    }
  }
  .compensation-title {
    margin-top: 40px;
    font-size: $f16;
    color: $erp333;
    line-height: 16px;
    position: relative;
    padding-left: 12px;
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
  .comprow {
    padding-bottom: 40px;
    border-bottom: 1px solid $erpBK;
    &:last-of-type {
      border-bottom: none;
    }
  }
  .message-box {
    margin-top: 24px;
    display: flex;
    .message-label {
      height: 24px;
      width: 88px;
      font-size: $f14;
      color: $erp333;
      text-align: right;
      font-weight: 700;
      &.social {
        width: 138px;
      }
      &.lage {
        width: 170px;
      }
    }
    .message-con {
      padding-left: 20px;
      font-size: $f14;
      color: $erp999;
    }
  }
}
.table-boxs {
  padding-top: 10px;
}
</style>