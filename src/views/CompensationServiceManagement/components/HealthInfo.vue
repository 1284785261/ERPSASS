<!-- 员工社保详情 -->
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <div class="From-header">
        <BreadCrumb :url-list="urlList" />
      </div>
      <div class="table-content">
        <div class="roletable-box">
          <el-table ref="industrtTable" v-loading="tableloading" :data="InsuranceInfoObj" class="role-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark">
            <el-table-column align="center" label="医保所属年月" min-width="150">
              <template slot-scope="scope">
                <span>{{scope.row.Year}}/{{scope.row.Month | Month}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="MedicalType" label="缴费类型" min-width="180" />
            <el-table-column align="center" label="医疗保险缴交基数" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalBase | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="医疗保险（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="医疗保险（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="医疗保险滞纳金（企业部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalDelayFeeEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="医疗保险滞纳金（个人部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalDelayFeePers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="医疗保险利息（企业部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalDelayFeeEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="医疗保险利息（个人部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalInterestPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="医疗保险补缴（企业部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalPaybackEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="医疗保险补缴（个人部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalPaybackPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="医疗保险退回（企业部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalRefundEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="医疗保险退回（个人部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalRefundPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="大额医疗缴交基数" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.BigMedicalBase | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="大额医疗保险（企业部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.BigMedicalEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="大额医疗保险（个人部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.BigMedicalPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="大额医疗滞纳金（企业部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.BigMedicalDelayFeeEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="大额医疗滞纳金（个人部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.BigMedicalDelayFeePers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="大额医疗利息（企业部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.BigMedicalInterestEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="大额医疗利息（个人部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.BigMedicalInterestPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="大额医疗补缴（企业部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.BigMedicalPaybackEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="大额医疗补缴（个人部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.BigMedicalPaybackPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="大额医疗退回（企业部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.BigMedicalRefundEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="大额医疗退回（个人部分）" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.BigMedicalRefundPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="其它合计（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.OtherEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="其它合计（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.OtherPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="滞纳金" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalDelayFeeEnt + scope.row.MedicalDelayFeePers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="缴费状态" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.Status | Status}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="个人利息合计" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalInterestPers + scope.row.BigMedicalInterestPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单位利息合计" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.MedicalInterestEnt + scope.row.BigMedicalInterestEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="缴纳总计（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.TotalEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="缴纳总计（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.TotalPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Total" label="总计（￥）" fixed="right" min-width="100">
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
import { GetMedicalInfo } from '@/api/CompensationServiceManagement.js'
import qs from 'qs'
import { MenuIdDate, showLoading, hideLoading, uuid } from '@/utils/CustomValidation'
import filters from '@/utils/filters'
export default {
  components: {
    BreadCrumb
  },
  filters: {
    Status (value) {
      if (value === 0) {
        return '待缴交'
      } else if (value === 1) {
        return '已缴交'
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      urlList: [{
        name: '实缴医保管理',
        router: '/CompensationServiceManagement/HealthInsuranceManagement'
      }, {
        name: '员工医保详情',
        router: ''
      }],
      tableloading: false,
      InsuranceInfoObj: []
    }
  },
  created () {
    if (this.$route.query && this.$route.query.Id) {
      this.getMedicalInfo(this.$route.query.Id)
    }
  },
  methods: {
    getMedicalInfo (Id) {
      let obj = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetMedicalInfo(qs.stringify(obj)).then(response => {
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