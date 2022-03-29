//员工社保详情
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <div class="From-header">
        <BreadCrumb :url-list="urlList" />
      </div>
      <div class="table-content">
        <div class="roletable-box">
          <el-table ref="industrtTable" v-loading="tableloading" :data="InsuranceInfoObj" class="role-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark">
            <el-table-column align="center" prop="Year" label="社保所属期" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.Year}}/{{scope.row.Month | Month}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="SiType" label="缴费类型" min-width="180" />
            <el-table-column align="center" prop="PensionBase" label="养老保险缴交基数" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.PensionBase | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="PensionEnt" label="养老保险（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.PensionEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="PensionPers" label="养老保险（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.PensionPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="UnemployBase" label="失业保险缴交基数" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.UnemployBase | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="UnemployEnt" label="失业保险（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.UnemployEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="UnemployPers" label="失业保险（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.UnemployPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="BirthBase" label="生育保险缴交基数" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.BirthBase | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="BirthEnt" label="生育保险（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.BirthEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="BirthPers" label="生育保险（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.BirthPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="InjuryBase" label="工伤保险缴交基数" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.InjuryBase | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="InjuryEnt" label="工伤保险（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.InjuryEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="InjuryPers" label="工伤保险（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.InjuryPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="MedicalBase" label="医疗保险缴交基数" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalBase | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="MedicalEnt" label="医疗保险（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="MedicalPers" label="医疗保险（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="TotalEnt" label="缴纳总计（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.TotalEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="TotalPers" label="缴纳总计（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.TotalPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" prop="DiffPayEnt" label="差额补退（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.DiffPayEnt | MoneyUnit}}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column align="center" prop="DiffPayPers" label="差额补退（个人部分）" min-width="250">
              <template slot-scope="scope">
                <span>{{scope.row.DiffPayPers | MoneyUnit}}</span>
              </template>
            </el-table-column> -->
            <el-table-column align="center" prop="DelayFee" label="滞纳金" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.PensionDelayFeeEnt + scope.row.PensionDelayFeePers + scope.row.MedicalDelayFeeEnt + scope.row.MedicalDelayFeePers + scope.row.BigMedicalDelayFeeEnt + scope.row.BigMedicalDelayFeePers + scope.row.UnemployDelayFeeEnt + scope.row.UnemployDelayFeePers + scope.row.BirthDelayFeeEnt + scope.row.BirthDelayFeePers + scope.row.InjuryDelayFeeEnt + scope.row.InjuryDelayFeePers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="PensionInterestPers" label="个人利息" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.PensionInterestPers + scope.row.MedicalInterestPers + scope.row.BigMedicalInterestPers + scope.row.UnemployInterestPers + scope.row.BirthInterestPers + scope.row.InjuryInterestPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="DiffPayEnt" label="单位利息" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.PensionInterestEnt + scope.row.MedicalInterestEnt + scope.row.BigMedicalInterestEnt + scope.row.UnemployInterestEnt + scope.row.BirthInterestEnt + scope.row.InjuryInterestEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Total" label="总计（￥）" fixed="right" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.Total | MoneyUnit}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer-multiple">
          <el-button round class="erpbtn" size="small" @click="$router.go(-1)">关闭</el-button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { GetInsuranceInfo } from '@/api/CompensationServiceManagement.js'
import qs from 'qs'
import { MenuIdDate, showLoading, hideLoading, uuid } from '@/utils/CustomValidation'
import filters from '@/utils/filters'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '实缴社保管理',
        router: '/CompensationServiceManagement/SocialSecurityManagement'
      }, {
        name: '员工社保详情',
        router: ''
      }],
      tableloading: false,
      InsuranceInfoObj: []
    }
  },
  created () {
    if (this.$route.query && this.$route.query.Id) {
      this.getInsuranceInfo(this.$route.query.Id)
    }
  },
  methods: {
    getInsuranceInfo (Id) {
      let obj = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetInsuranceInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.InsuranceInfoObj.push(response.Data)
          }

        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.From-header {
  margin-left: 20px;
  margin-bottom: 24px;
}
.dialog-footer-multiple {
  text-align: center;
}
</style>