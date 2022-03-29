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
            <el-table-column align="center" label="编号" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.Id}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="发票抬头" fixed="right" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.Title}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="税号" fixed="right" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.TaxNo}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="银行账号" fixed="right" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AccountNo}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开户行" fixed="right" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.BankName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="公司注册地址" fixed="right" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.RegAddress}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="公司联系电话" fixed="right" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.CompanyTel}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
       
      </div>

    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import {GetFinanceInvoiceTitleInfo} from '@/api/FinancialManagement.js'
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
        name: '客户发票抬头管理',
        router: '/FinancialManagement/CustomerInvoiceManagement'
      }, {
        name: '客户发票抬头详情',
        router: ''
      }],
      tableloading: false,
      InsuranceInfoObj: []
    }
  },
  created () {
    if (this.$route.query && this.$route.query.Id) {
      this.GetFinanceInvoiceTitleInfo(this.$route.query.Id)
    }
  },
  methods: {
    GetFinanceInvoiceTitleInfo (Id) {
      let obj = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetFinanceInvoiceTitleInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            console.log(response.Data);
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