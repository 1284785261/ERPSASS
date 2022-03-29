<!--其他费用管理-->
<template>
  <div class="ManagementAndTaxes-Box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="所属项目" label-width="80px">
            <el-input
              v-model.trim="ProjectName"
              clearable
              class="select-input"
              suffix-icon="el-icon-search"
              placeholder="请输入项目名称进行查询"
            />
          </el-form-item>
          <el-form-item label="所属客户" label-width="80px">
            <el-input
              v-model.trim="SupplierUnitName"
              clearable
              class="select-input"
              suffix-icon="el-icon-search"
              placeholder="请输入客户名称进行查询"
            />
          </el-form-item>
          <el-form-item label="项目类型" label-width="80px">
            <el-select
              size="mini"
              class="select-input"
              clearable
              v-model="ProjectType"
              placeholder="请选择项目类型进行查询"
            >
              <el-option
                v-for="(item, idx) in ProjectTypeList"
                :key="idx"
                :label="item.describe"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属年月" label-width="80px">
            <el-date-picker
              value-format="yyyy/MM"
              v-model="Datas"
              type="month"
              size="small"
              class="erpsearchinput"
              placeholder="请选择所属年月进行查询"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-button class="search-button" size="mini" round @click="Reset"
          >重置</el-button
        >
        <el-button class="search-button" size="mini" round @click="searchtable"
          >查询</el-button
        >
      </div>
    </div>
    <!-- <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" @click="addprojectcost">添加项目成本</el-button>
    </div> -->
    <div class="operate-table">
      <el-table
        ref="multipleTable"
        class="erp-table"
        v-loading="tableloading"
        :data="tableData"
        max-height="600"
        tooltip-effect="dark"
      >
        <el-table-column
          align="center"
          prop="Code"
          width="120"
          label="项目成本编号"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="Subject"
          min-width="120"
          label="科目名称"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="Ensure"
          width="120"
          label="是否保证金"
        >
          <template slot-scope="scope">
            {{ scope.row.Ensure | Ensure }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="BusinessTypeText"
          width="120"
          label="供应商类型"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="BfCompanyName"
          width="120"
          label="供应商名称"
          show-overflow-tooltip
        />
        <el-table-column align="center" width="100" label="所属年月">
          <template slot-scope="scope">
            {{ scope.row.Year + "年" + scope.row.Month + "月" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="Fee"
          width="100"
          label="支出金额"
        />
        <el-table-column
          align="center"
          prop="Remark"
          min-width="120"
          label="支出说明"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="Attachment"
          min-width="120"
          label="费用明细表"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="watchcode" @click="preview(scope.row.Attachment)">{{
              scope.row.Attachment
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="StatusText"
          width="100"
          label="状态"
        />
        <el-table-column align="center" fixed="right" width="80" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click" v-show="scope.row.Status !== 1">
              <span class="el-dropdown-link">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item
                    v-show="scope.row.Status === 0 || scope.row.Status === 2"
                    @click.native="handleEdit(scope.row, 'Modify')"
                    >修改</el-dropdown-item
                  >
                  <el-dropdown-item
                    v-show="scope.row.Status === 0"
                    @click.native="submitaudit(scope.row, 'SetRights')"
                    >发起结算</el-dropdown-item
                  >
                  <!-- <el-dropdown-item v-show="scope.row.Status === 4" @click.native="issueinvoice(scope.row,'SetRights')">开具发票</el-dropdown-item> -->
                  <el-dropdown-item
                    v-show="scope.row.Status !== 1"
                    @click.native="cancellation(scope.row, 'Delete')"
                    >作废</el-dropdown-item
                  >
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagina-fonter">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <PreviewFile
        :isImg="isImg"
        :titlename="titlename"
        :iframeShow="iframeShow"
        :previewFileUrl="previewFileUrl"
        @closeFileShow="closeFileShow"
      ></PreviewFile>
      <costdialog
        :title="costtitle"
        :visible="costvisible"
        :contentdata="contentdata"
        @closedialog="closedialog"
        @savecost="savecost"
      ></costdialog>
      <costauditdialog
        :title="costaudittitle"
        :visible="costauditvisible"
        :contentdata="auditcontentdata"
        @closeauditdialog="closeauditdialog"
        @savecostaudit="savecostaudit"
      ></costauditdialog>
    </div>
  </div>
</template>
<script>
import { GetProjectBusinessType } from "@/api/projectManagement.js";
import PreviewFile from "@/components/publicComponents/PreviewFile.vue";
import costdialog from "@/views/projectManagement/components/dialog-cost.vue";
import costauditdialog from "@/views/projectManagement/components/dialog-costaudit.vue";
import {
  GetProjectFeePageList,
  AddProjectFee,
  EditProjectFee,
  DeleteProjectFee,
  AddProjectFeeExamine,
  GetProjectFeeInfo,
} from "@/api/projectManagement.js";
import { AddOtherExpense } from "@/api/FinancialManagement.js";
import {
  copy,
  MenuIdDate,
  showLoading,
  hideLoading,
} from "@/utils/CustomValidation.js";
import qs from "qs";
export default {
  components: {
    costdialog,
    costauditdialog,
    PreviewFile,
  },
  filters: {
    Ensure(value) {
      if (value == 0) {
        return "否";
      } else if (value == 1) {
        return "是";
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      ProjectTypeList: [],
      ProjectName: "",
      SupplierUnitName: "",
      ProjectType: "",
      Datas: "",
      previewFileUrl: "",
      iframeShow: false,
      isImg: 1,
      titlename: "费用明细表预览",
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      tableloading: false,
      Id: "", // 费用Id
      ProjectId: "", // 项目Id
      attachments: "", // 费用附件
      costtitle: "添加项目成本",
      costvisible: false,
      contentdata: {}, // 成本详情
      costaudittitle: "其他费用结算单",
      costauditvisible: false,
      auditcontentdata: {}, // 审核内容
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: "",
        OperationCode: "Query",
      },
    };
  },
  created() {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations;
      this.operatiOBj.menuid = this.$operatedata(this.operates, "Query").MenuId;
      this.getProjectFeePageList();
      this.GetProjectBusinessType();
    }
  },
  methods: {
    //关闭弹窗
    closeFileShow(val) {
      this.iframeShow = val;
    },
    //预览
    preview(e) {
      if (e) {
        const ext = e.slice(e.lastIndexOf(".") + 1).toLowerCase();
        if (ext == "pdf") {
          this.isImg = 2;
          this.previewFileUrl = e;
        } else if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "xlsx" ||
          ext == "xls"
        ) {
          this.isImg = 3;
          this.previewFileUrl =
            "https://view.officeapps.live.com/op/view.aspx?src=" + e;
        } else {
          this.isImg = 1;
          this.previewFileUrl = e;
        }
        this.iframeShow = true;
      }
    },
    //获取项目类型
    GetProjectBusinessType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetProjectBusinessType(qs.stringify(obj)).then((response) => {
        if (response) {
          this.ProjectTypeList = response;
        } else {
          this.ProjectTypeList = [];
        }
      });
    },
    // 获取项目费用列表
    getProjectFeePageList() {
      let obj = {
        ProjectName: this.ProjectName,
        CompanyName: this.SupplierUnitName,
        BusinessType: this.ProjectType,
        YearMonth: this.Datas,
        ProjectId: this.ProjectId,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      this.tableloading = true;
      GetProjectFeePageList(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          this.tableData = response.Data;
          // console.log(this.tableData);
          this.total = response.Total;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
        this.tableloading = false;
      });
    },
    //重置
    Reset() {
      this.ProjectName = "";
      this.SupplierUnitName = "";
      this.ProjectType = "";
      this.Datas = "";
    },
    //查询
    searchtable() {
      this.currentPage = 1;
      this.getProjectFeePageList();
    },

    // 添加项目成本
    addprojectcost() {
      this.costtitle = "添加项目成本";
      this.costvisible = true;
      this.contentdata = {};
    },

    // 修改
    handleEdit(e) {
      this.costtitle = "修改项目成本";
      this.ProjectId = e.ProjectId;
      // 获取成本详情
      let obj = {
        Id: e.Id,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      showLoading();
      GetProjectFeeInfo(qs.stringify(obj)).then((response) => {
        hideLoading();
        if (response.IsSuccess) {
          this.contentdata = copy(response.Data);
          console.log(this.contentdata);
          this.costvisible = true;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },

    // 提交审核
    submitaudit(e) {
      this.ProjectId = e.ProjectId;
      this.Id = e.Id;
      this.attachments = e.Attachment;
      this.auditcontentdata = copy(e);
      this.costauditvisible = true;
    },
    // 关闭审核弹框
    closeauditdialog() {
      this.costauditvisible = false;
    },
    // 保存提交审核
    savecostaudit(e) {
      console.log(e);
      showLoading();
      AddOtherExpense(qs.stringify(e)).then((response) => {
        hideLoading();
        if (response.IsSuccess) {
          this.$message({
            message: "成功发起审核!",
            type: "success",
          });
          this.costauditvisible = false;
          this.getProjectFeePageList();
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },

    // // 开具发票
    // issueinvoice (e) {
    //   this.$router.push({
    //     path: '/projectManagement/dialogInvoice',
    //     query: {
    //       Id: this.ProjectId,
    //       ProjectName: e.ProjectName
    //     }
    //   })
    // },
    // 作废
    cancellation(e) {
      this.$confirm("此操作将作废该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = {
            IdArr: e.Id,
            menuid: MenuIdDate(),
            operationcode: "1",
          };
          showLoading();
          DeleteProjectFee(qs.stringify(obj)).then((response) => {
            hideLoading();
            if (response.IsSuccess) {
              this.$message({
                message: "作废成功!",
                type: "success",
              });
              this.getProjectFeePageList();
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消作废",
          });
        });
    },

    // 选择分页大小
    handleSizeChange(val) {
      this.PageSize = val;
      this.getProjectFeePageList();
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getProjectFeePageList();
    },

    // 关闭弹框
    closedialog() {
      this.costvisible = false;
      this.contentdata = {};
    },
    savecost(e, isaudit) {
      console.log(e);
      if (!isaudit) {
        if (!e.Id) {
          let obj = {
            ProjectId: this.ProjectId,
            Subject: e.Subject,
            Ensure: e.Ensure,
            Fee: e.Fee,
            Remark: e.Remark,
            Attachment: e.Attachment,
            Status: e.Status,
            AddTime: e.AddTime,
            Year: e.Year,
            Month: e.Month,
            OnCreditId: e.OnCreditId,
            JoinSettle: e.JoinSettle,
            SupplierType: e.SupplierType,
            SupplierId: e.SupplierId,
            menuid: MenuIdDate(),
            operationcode: "1",
          };
          showLoading();
          AddProjectFee(qs.stringify(obj)).then((response) => {
            hideLoading();
            if (response.IsSuccess) {
              this.$message({
                message: "添加成功!",
                type: "success",
              });
              this.ProjectId = "";
              this.costvisible = false;
              this.getProjectFeePageList();
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error",
              });
            }
          });
        } else {
          let obj = {
            Id: e.Id,
            ProjectId: this.ProjectId,
            Subject: e.Subject,
            Ensure: e.Ensure,
            Fee: e.Fee,
            Remark: e.Remark,
            Attachment: e.Attachment,
            Status: e.Status,
            Year: e.Year,
            Month: e.Month,
            OnCreditId: e.OnCreditId,
            JoinSettle: e.JoinSettle,
            SupplierType: e.SupplierType,
            SupplierId: e.SupplierId,
            menuid: MenuIdDate(),
            operationcode: "1",
          };
          showLoading();
          EditProjectFee(qs.stringify(obj)).then((response) => {
            hideLoading();
            if (response.IsSuccess) {
              this.$message({
                message: "修改成功!",
                type: "success",
              });
              this.ProjectId = "";
              this.costvisible = false;
              this.getProjectFeePageList();
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error",
              });
            }
          });
        }
      } else {
        if (!e.Id) {
          let obj = {
            ProjectId: this.ProjectId,
            Subject: e.Subject,
            Ensure: e.Ensure,
            Fee: e.Fee,
            Remark: e.Remark,
            Attachment: e.Attachment,
            Status: e.Status,
            AddTime: e.AddTime,
            Year: e.Year,
            Month: e.Month,
            OnCreditId: e.OnCreditId,
            JoinSettle: e.JoinSettle,
            SupplierType: e.SupplierType,
            SupplierId: e.SupplierId,
            menuid: MenuIdDate(),
            operationcode: "1",
          };
          showLoading();
          AddProjectFee(qs.stringify(obj)).then((response) => {
            hideLoading();
            if (response.IsSuccess) {
              if (response.Data) {
                this.ProjectId = "";
                this.getProjectFeePageList();
                this.$message({
                  message: "成本创建成功!",
                  type: "success",
                });
                setTimeout(() => {
                  // 获取费用详情
                  let obj = {
                    Id: response.Data.Id,
                    menuid: MenuIdDate(),
                    operationcode: "1",
                  };
                  this.Id = response.Data.Id;
                  this.costvisible = false;
                  GetProjectFeeInfo(qs.stringify(obj)).then((response) => {
                    if (response.IsSuccess) {
                      this.auditcontentdata = copy(response.Data);
                      this.costauditvisible = true;
                    } else {
                      this.$message({
                        message: response.MessageContent,
                        type: "error",
                      });
                    }
                  });
                }, 1000);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: "error",
                });
              }
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error",
              });
            }
          });
        } else {
          let obj = {
            Id: e.Id,
            ProjectId: this.ProjectId,
            Subject: e.Subject,
            Ensure: e.Ensure,
            Fee: e.Fee,
            Remark: e.Remark,
            Attachment: e.Attachment,
            Status: e.Status,
            Year: e.Year,
            Month: e.Month,
            OnCreditId: e.OnCreditId,
            JoinSettle: e.JoinSettle,
            SupplierType: e.SupplierType,
            SupplierId: e.SupplierId,
            menuid: MenuIdDate(),
            operationcode: "1",
          };
          showLoading();
          EditProjectFee(qs.stringify(obj)).then((response) => {
            hideLoading();
            if (response.IsSuccess) {
              this.ProjectId = "";
              this.getProjectFeePageList();
              this.$message({
                message: "成本修改成功!",
                type: "success",
              });
              setTimeout(() => {
                // 获取费用详情
                let obj = {
                  Id: e.Id,
                  menuid: MenuIdDate(),
                  operationcode: "1",
                };
                this.Id = e.Id;
                this.costvisible = false;
                GetProjectFeeInfo(qs.stringify(obj)).then((response) => {
                  if (response.IsSuccess) {
                    this.auditcontentdata = copy(response.Data);
                    this.costauditvisible = true;
                  } else {
                    this.$message({
                      message: response.MessageContent,
                      type: "error",
                    });
                  }
                });
              }, 1000);
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error",
              });
            }
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.ManagementAndTaxes-Box {
  .operate-top {
    margin: 15px 24px 7px 24px;
    float: right;
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
  }
  .tab {
    margin-left: 24px;
    padding-left: 24px;
  }
  .operate-table {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 0;
    .watchcode {
      color: #1588f8;
      cursor: pointer;
    }
    .pagina-fonter {
      margin-top: 24px;
    }
  }
}
</style>