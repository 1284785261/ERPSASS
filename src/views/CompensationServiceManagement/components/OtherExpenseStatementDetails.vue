<!--其他费用结算单详情-->
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <div class="From-header">
        <BreadCrumb :ShowButton="false" :url-list="urlList" />
      </div>
      <div class="content">
        <div class="operate-top">
          <el-button
            size="small"
            class="erpbtn"
            @click="InitiatePaymentApplication"
            >发起付款申请</el-button
          >
        </div>
        <div class="operate-table">
          <el-table
            ref="industrtTable"
            v-loading="tableloading"
            :data="InsuranceInfoObj"
            class="erp-table"
            style="width: 100%; margin-bottom: 20px"
            tooltip-effect="dark"
          >
            <el-table-column
              align="center"
              prop="Code"
              label="项目成本编号"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="Subject"
              label="科目名称"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="Ensure"
              label="是否保证金"
              min-width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.Ensure == 0 ? "否" : "是" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="SupplierType"
              label="供应商类型"
              min-width="120"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.SupplierType == 0 ? "内部供应商" : "外部供应商"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="SupplierName"
              label="供应商名称"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="Year"
              label="所属年月"
              min-width="120"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.Year + "年" + scope.row.Month + "月"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="Fee"
              label="费用金额"
              min-width="120"
            />
            <el-table-column
              align="center"
              prop="Remark"
              label="费用说明"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="Attachment"
              label="费用明细表"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="IsSubmit"
              label="状态"
              min-width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.IsSubmit == 0 ? "未结算" : "已结算" }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div> -->
        <div slot="footer" class="dialog-footer-multiple">
          <el-button round class="erpbtn" size="small" @click="cancel"
            >关闭</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import { GetOtherExpenseDetail } from "@/api/CompensationServiceManagement.js";
import qs from "qs";
import {
  MenuIdDate,
  showLoading,
  hideLoading,
  uuid,
} from "@/utils/CustomValidation";
import filters from "@/utils/filters";
export default {
  components: {
    BreadCrumb,
  },
  filters: {
    Status(value) {
      if (value === 0) {
        return "待缴交";
      } else if (value === 1) {
        return "已缴交";
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      urlList: [
        {
          name: "结算单管理",
          router: "/CompensationServiceManagement/FinalStatement",
        },
        {
          name: "其他费用结算单详情",
          router: "",
        },
      ],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      tableloading: false,
      InsuranceInfoObj: [],
    };
  },
  created() {
    this.GetOtherExpenseDetail();
  },
  methods: {
    //发起付款申请
    InitiatePaymentApplication() {
      this.$router.push({
        path: "/CompensationServiceManagement/OtherExpensePaymentApplication",
        query: {
          type: 3,
          Id: this.$route.query.Id,
        },
      });
    },
    //获取详情
    GetOtherExpenseDetail() {
      let obj = {
        Id: this.$route.query.Id,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetOtherExpenseDetail(obj).then((res) => {
        if (res.MessageCode == 0) {
          this.InsuranceInfoObj = res.Data.OtherExpenseDetailList;
          // this.total=res.Total
        } else {
          this.InsuranceInfoObj = [];
          this.total = 0;
        }
      });
    },
    //关闭
    cancel() {
      window.open("about:blank", "_self").close();
    },
    //分页处理
    handleSizeChange(val) {
      this.PageSize = val;
      this.GetOtherExpenseDetail();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetOtherExpenseDetail();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.From-header {
  margin-left: 20px;
  margin-bottom: 24px;
}
.dialog-footer-multiple {
  text-align: center;
  margin-left: 100px;
}
.content {
  .operate-top {
    float: right;
    margin-bottom: 16px;
  }
  background-color: #fff;
  // min-height: calc(100vh - 141px);
  margin-left: 24px;
  padding: 16px 24px 24px 24px;
  border-radius: 8px 0px 0px 8px;
  .pagina-fonter {
    margin-bottom: 24px;
  }
}
</style>