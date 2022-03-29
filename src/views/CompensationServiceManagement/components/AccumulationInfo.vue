// 员工公积金详情
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <div class="From-header">
        <BreadCrumb :url-list="urlList" />
      </div>
      <div class="table-content">
        <div class="roletable-box">
          <el-table ref="industrtTable" v-loading="tableloading" :data="InsuranceInfoObj" class="role-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark">
            <el-table-column align="center" prop="Year" label="公积金所属期" min-width="150">
              <template slot-scope="scope">
                <span>{{scope.row.Year}}/{{scope.row.Month | Month}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="FundType" label="缴费类型" min-width="180" />
            <el-table-column align="center" prop="HouseFundBase" label="缴交基数" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.HouseFundBase | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="FeeRate" label="个人缴交比例" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.FeeRate | Proportion}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="FeeRateEnt" label="企业缴交比例" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.FeeRateEnt | Proportion}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="AmountEnt" label="金额（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.AmountEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="AmountPers" label="金额（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.AmountPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="PayBackEnt" label="补缴费用（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.PayBackEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="PayBackPers" label="补缴费用（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.PayBackPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="DiffPayEnt" label="差额补退（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.DiffPayEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="DiffPayPers" label="差额补退（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.DiffPayPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="DelayFee" label="滞纳金" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.DelayFee | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="OtherEnt" label="其他合计（企业部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.OtherEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="OtherPers" label="其他合计（个人部分）" min-width="210">
              <template slot-scope="scope">
                <span>{{scope.row.OtherPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="TotalEnt" label="企业部分" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.TotalEnt | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="TotalPers" label="个人部分" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.TotalPers | MoneyUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="TotalAmount" label="总计" fixed="right" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.TotalAmount | MoneyUnit}}</span>
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
import { GetHouseFundInfo } from '@/api/CompensationServiceManagement.js'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '实缴公积金管理',
        router: '/CompensationServiceManagement/ProvidentFundManagement'
      }, {
        name: '员工公积金详情',
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
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      const obj = {
        'Id': Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      GetHouseFundInfo(qs.stringify(obj)).then(response => {
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