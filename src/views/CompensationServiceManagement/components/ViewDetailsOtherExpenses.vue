<!--查看其他费用明细-->
<template>
  <div class="ViewDetailsOtherExpenses-Box">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="operate-top">
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
      </div>
    </div>
    <div class="table-content">
        <div class="operate-table">
            <el-table ref="FloatingSuCCTable" class="erp-table" v-loading="tableloading" :data="CostData" max-height="600" tooltip-effect="dark">
                <el-table-column align="center" v-if="$getColumsFlag('CommercialInsurance',checkboxVal)" prop="CommercialInsurance" min-width="120" fixed label="商业险" />
                <el-table-column align="center" v-if="$getColumsFlag('EmployeeWelfare',checkboxVal)" prop="EmployeeWelfare" label="员工福利" min-width="120" />
                <el-table-column align="center" v-if="$getColumsFlag('EmployerInsurance',checkboxVal)" prop="EmployerInsurance" label="雇主险" min-width="120" />
                <el-table-column align="center" v-if="$getColumsFlag('DisabilityInsurance',checkboxVal)" prop="DisabilityInsurance" label="残保金" min-width="150" />
                <el-table-column align="center" v-if="$getColumsFlag('EnterpriseTradeUnionAmount',checkboxVal)" prop="EnterpriseTradeUnionAmount" label="企业部分工会费" min-width="140"/>
                <el-table-column align="center" v-if="$getColumsFlag('BidWinningServiceFee',checkboxVal)" prop="BidWinningServiceFee" label="中标服务费" min-width="120"/>
                <el-table-column align="center" v-if="$getColumsFlag('BusinessEntertainmentAmount',checkboxVal)" prop="BusinessEntertainmentAmount" label="业务招待费" min-width="120"/>
                <el-table-column align="center" v-if="$getColumsFlag('TravelExpenses',checkboxVal)" prop="TravelExpenses" label="差旅费" min-width="120"/>
                <el-table-column align="center" v-if="$getColumsFlag('LaborInsuranceFee',checkboxVal)" prop="LaborInsuranceFee" label="劳保费" min-width="120"/>
                <el-table-column align="center" v-if="$getColumsFlag('EconomicCompensation',checkboxVal)" prop="EconomicCompensation" label="经济补偿金" min-width="120"/>
                <el-table-column align="center" v-if="$getColumsFlag('OtherExpenses',checkboxVal)" prop="OtherExpenses" label="其他费用" min-width="120"/>
                <el-table-column align="center" v-if="$getColumsFlag('WaterAndElectricityRent',checkboxVal)" prop="WaterAndElectricityRent" label="水电房租" min-width="120"/>
                <el-table-column align="center" prop="TotalOtherExpenses" label="其他费用合计" min-width="120"/>
              </el-table>
        </div>
      <div class="compensation-bottom">
        <el-button class="erpbtn" size="small" @click="closeweb">关 闭</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
export default {
   components: {
    BreadCrumb,
    ScreeningComponent
  },
  data() {
    return {
      formTheadOptions: [
        { label: "商业险", prop: "CommercialInsurance" },
        { label: "员工福利", prop: "EmployeeWelfare" },
        { label: "雇主险", prop: "EmployerInsurance" },
        { label: "残保金", prop: "DisabilityInsurance" },
        { label: "企业部分工会费", prop: "EnterpriseTradeUnionAmount" },
        { label: "中标服务费", prop: "BidWinningServiceFee" },
        { label: "业务招待费", prop: "BusinessEntertainmentAmount" },
        { label: "差旅费", prop: "TravelExpenses" },
        { label: "劳保费", prop: "LaborInsuranceFee" },
        { label: "经济补偿金", prop: "EconomicCompensation" },
        { label: "其他费用", prop: "OtherExpenses" },
        { label: "水电房租", prop: "WaterAndElectricityRent" },
      ],
      checkboxVal: [],
      CostData:[],
      tableloading:false,
      urlList: [{
        name: '其他费用管理',
        router: '/CompensationServiceManagement/OtherExpenseManagement'
      }, {
        name: '查看其他费用明细',
        router: ''
      }],
    }
  },
  created(){
    if (this.$route.meta.operations) {}
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  methods:{
    //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    //关闭
    closeweb(){
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="scss" scoped>
.ViewDetailsOtherExpenses-Box{
  .operate-top {
      margin: 15px 24px 7px 24px;
      float: right;
      .screening-compent {
        float: right;
      }
    }
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .compensation-bottom{
    text-align: center;
    padding-top: 40px;
  }
}
</style>