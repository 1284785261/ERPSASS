<!-- 招投标报价管理 -->
<template>
  <div class="ContractTemplate-Container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">项目名称</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入项目名称" size="small" v-model="searchObject.ProjectName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">招标单位</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入招标单位" size="small" v-model="searchObject.CompanyName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">审批时限</div>
        <el-date-picker class="erpsearchinput" v-model="searchObject.ApprovalTimeLimitDate" value-format="yyyy-MM-dd" size="small" clearable type="date" placeholder="请选择审批时限">
        </el-date-picker>
      </div>
      <div class="condition">
        <div class="search-name">业务类型</div>
        <el-select v-model="searchObject.BusinessType" class="erpsearchinput" size="small" placeholder="请选择业务类型">
          <el-option v-for="item in BusinessList" :key="item.value" :label="item.describe" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">跟单员</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入跟单员" size="small" v-model="searchObject.OwnerName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" v-if="$operatebtn(operates, 'Add')" class="addmenu erpbtn" @click="AddBiddingApply('Add')">申请招投标报价审批</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <!-- <el-table-column align="center" type="selection" width="55" fixed="left" label="全选" /> -->
          <el-table-column align="center" prop="Id" label="序号" min-width="50" />
          <el-table-column align="center" prop="ApprovalTimeLimit" label="审批时限" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.ApprovalTimeLimit | Time }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ProjectName" label="项目名称" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="CompanyName" label="招标单位" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="BusinessTypeText" label="业务类型" min-width="120" />
          <el-table-column align="center" prop="OwnerName" label="跟单员" min-width="120" />
          <el-table-column align="center" prop="ProjectContent" label="报价内容" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="ProjectCostCalculation" label="项目成本及盈利测算" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="StatusText" label="审批状态" min-width="120" />
          <el-table-column align="center" prop="AddTime" label="申请时间" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.AddTime | YYMMddhhmmssTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="
                  $operatebtns(operates, ['Modify', 'Delete', 'Down', 'View'])
                ">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="LookBiddingApply(scope.row, 'View')">查看</el-dropdown-item>
                    <el-dropdown-item v-if="
                        $operatebtn(operates, 'Modify') &&
                        (scope.row.Status == '0' || scope.row.Status == '3')
                      " @click.native="EditBiddingApply(scope.row, 'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="
                        $operatebtn(operates, 'Modify') &&
                        (scope.row.Status == '0' || scope.row.Status == '3')
                      " @click.native="SubmittedReviewApply(scope.row, 'Modify')">提交送审</el-dropdown-item>
                    <el-dropdown-item v-if="
                        $operatebtn(operates, 'Modify') &&
                        scope.row.Status == '1'
                      " @click.native="WithdrawBidding(scope.row, 'Modify')">撤回</el-dropdown-item>
                    <el-dropdown-item v-if="
                        $operatebtn(operates, 'Delete') &&
                        (scope.row.Status == '0' || scope.row.Status == '3')
                      " @click.native="DeleteBidding(scope.row, 'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div>
      <!-- 添加修改报价审批 -->
      <EditBiddingApplyBuy :title="BiddingApplyBuyTitle" :showBiddingApplyBuy="showBiddingApplyBuy" :SendId="SendId" @EditBiddingApplyBuy="EditBiddingApplyBuy" @EditSubmittedReview="EditSubmittedReview" @closeApplyBuy="closeApplyBuy"></EditBiddingApplyBuy>
      <!-- 查看招投标报价审批 -->
      <LookBiddingApplyBuy :showLookBiddingApplyBuy="showLookBiddingApplyBuy" :SendId="SendId" @closeLookApplyBuy="closeLookApplyBuy"></LookBiddingApplyBuy>
    </div>
  </div>
</template>
<script>
import EditBiddingApplyBuy from "./components/EditBiddingApplyBuy.vue";
import LookBiddingApplyBuy from "./components/LookBiddingApplyBuy.vue";
import { GetProjectBusinessType } from "@/api/projectManagement.js";
import {
  GetBiddingQuotePageList,
  AddBiddingQuote,
  EditBiddingQuote,
  DeleteBiddingQuote,
  EditBiddingQuoteStatus,
  GetBiddingQuoteInfo
} from "@/api/Bidding.js";
import {
  MenuIdDate,
  showLoading,
  hideLoading,
  copy
} from "@/utils/CustomValidation";
import qs from "qs";
export default {
  components: {
    EditBiddingApplyBuy,
    LookBiddingApplyBuy
  },
  data() {
    return {
      searchObject: {
        CompanyName: "",
        ProjectName: "",
        OwnerName: "",
        ApprovalTimeLimitDate: "",
        ApprovalTimeLimitYear: "",
        ApprovalTimeLimitMonth: "",
        ApprovalTimeLimitDay: "",
        BusinessType: "-1"
      },
      SendId: "",
      BusinessList: [], //业务类型
      tableloading: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      tempData: {},
      Ids: [], //多选选中的数据ID
      allchecked: false, // 全选
      BiddingApplyBuyTitle: "",
      showBiddingApplyBuy: false,
      showLookBiddingApplyBuy: false,
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: "",
        OperationCode: "Query"
      }
    };
  },
  created() {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations;
      this.operatiOBj.menuid = this.$operatedata(this.operates, "Query").MenuId;
      this.GetBiddingApply(this.operatiOBj);
    }
    this.getCatagoryType();
  },
  methods: {
    //获取项目类型
    getCatagoryType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetProjectBusinessType(qs.stringify(obj)).then(response => {
        if (response) {
          this.BusinessList = response;
          this.BusinessList.unshift({
            describe: "全部",
            value: "-1"
          });
        }
      });
    },
    // 多选
    handleSelectionChange(value) {
      this.Ids = [];
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id);
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true;
      } else {
        this.allchecked = false;
      }
    },
    // 全选
    selectall() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    // 查询
    searchtable() {
      this.currentPage = 1;
      this.GetBiddingApply(this.operatiOBj);
    },
    // 选择分页大小
    handleSizeChange(val) {
      this.PageSize = val;
      this.GetBiddingApply(this.operatiOBj);
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetBiddingApply(this.operatiOBj);
    },
    //获取列表
    GetBiddingApply(operat) {
      this.tableloading = true;
      if (this.searchObject.ApprovalTimeLimitDate) {
        let myDate = new Date(this.searchObject.ApprovalTimeLimitDate);
        this.searchObject.ApprovalTimeLimitYear = myDate.getFullYear();
        this.searchObject.ApprovalTimeLimitMonth = myDate.getMonth() + 1;
        this.searchObject.ApprovalTimeLimitDay = myDate.getDate();
      } else {
        this.searchObject.ApprovalTimeLimitYear = "";
        this.searchObject.ApprovalTimeLimitMonth = "";
        this.searchObject.ApprovalTimeLimitDay = "";
      }
      const obj = {
        CompanyName: this.searchObject.CompanyName,
        ProjectName: this.searchObject.ProjectName,
        ApprovalTimeLimitYear: this.searchObject.ApprovalTimeLimitYear,
        ApprovalTimeLimitMonth: this.searchObject.ApprovalTimeLimitMonth,
        ApprovalTimeLimitDay: this.searchObject.ApprovalTimeLimitDay,
        BusinessType: this.searchObject.BusinessType,
        OwnerName: this.searchObject.OwnerName,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      };
      showLoading();
      GetBiddingQuotePageList(qs.stringify(obj)).then(res => {
        this.tableloading = false;
        hideLoading();
        if (res.IsSuccess) {
          this.tableData = res.Data;
          this.total = res.Total;
        } else {
          this.tableData = [];
          this.total = 0;
          this.$message({
            message: res.MessageContent,
            type: "error"
          });
        }
      });
    },
    //打开添加审批窗口
    AddBiddingApply(str) {
      this.BiddingApplyBuyTitle = "申请招投标报价审批";
      this.showBiddingApplyBuy = true;
    },
    //查看审批事件
    LookBiddingApply(data, str) {
      this.showLookBiddingApplyBuy = true;
      this.SendId = data.Id;
      // let obj = {
      //   Id: data.Id,
      //   menuid: MenuIdDate(),
      //   operationcode: "1",
      // };
      // GetBiddingQuoteInfo(obj).then((res) => {
      //   if (res.MessageCode == 0) {
      //     this.tempData = res.Data;
      //   } else {
      //     this.tempData = {};
      //   }
      // });
    },
    //关闭查看审批
    closeLookApplyBuy(str) {
      this.showLookBiddingApplyBuy = str;
    },
    //修改审批事件
    EditBiddingApply(data, str) {
      this.BiddingApplyBuyTitle = "修改招投标报价审批";
      // let obj = {
      //   Id: data.Id,
      //   menuid: MenuIdDate(),
      //   operationcode: "1",
      // };
      // GetBiddingQuoteInfo(obj).then((res) => {
      //   if (res.MessageCode == 0) {
      //     this.tempData = res.Data;
      //   } else {
      //     this.tempData = {};
      //   }
      // });
      this.SendId = data.Id;
      this.showBiddingApplyBuy = true;
    },
    //提交送审
    SubmittedReviewApply(data, str) {
      const operating = this.$operatedata(this.operates, str);
      const obj = {
        Id: data.Id,
        Status: 1,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      };
      this.$confirm("你确定要选择当前数据提交送审吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          EditBiddingQuoteStatus(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: "success",
                message: "提交送审成功!"
              });
              this.GetBiddingApply(this.operatiOBj);
            } else {
              this.$message({
                type: "error",
                message: response.MessageContent
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消送审！"
          });
        });
    },
    //保存添加修改审批事件
    EditBiddingApplyBuy(data) {
      console.log(data);
      if (data.Id) {
        showLoading();
        let obj = {
          Id: data.Id,
          ProjectId: data.ProjectId,
          ApprovalTimeLimit: data.ApprovalTimeLimit,
          ProjectCostCalculation: data.ProjectCostCalculation,
          ProjectOverview: data.ProjectOverview,
          ProjectContent: data.ProjectContent,
          ProjectExplain: data.ProjectExplain,
          Remark: data.Remark,
          AttachUrl: data.AttachUrl,
          Status: data.Status,
          SysOrgId: data.ApplicationDepartment,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        EditBiddingQuote(qs.stringify(obj)).then(response => {
          hideLoading();
          if (response.IsSuccess) {
            this.$message({
              type: "success",
              message: "修改招投标报价审批成功！"
            });
            this.showBiddingApplyBuy = false;
            this.GetBiddingApply(this.operatiOBj);
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        showLoading();
        let obj = {
          ProjectId: data.ProjectId,
          ApprovalTimeLimit: data.ApprovalTimeLimit,
          ProjectCostCalculation: data.ProjectCostCalculation,
          ProjectOverview: data.ProjectOverview,
          ProjectContent: data.ProjectContent,
          ProjectExplain: data.ProjectExplain,
          Remark: data.Remark,
          AttachUrl: data.AttachUrl,
          Status: data.Status,
          SysOrgId: data.ApplicationDepartment,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        AddBiddingQuote(qs.stringify(obj)).then(response => {
          hideLoading();
          if (response.IsSuccess) {
            this.$message({
              type: "success",
              message: "添加招投标报价审批成功！"
            });
            this.showBiddingApplyBuy = false;
            this.GetBiddingApply(this.operatiOBj);
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }
    },
    //弹窗提交送审事件
    EditSubmittedReview(data) {
      if (data.Id) {
        showLoading();
        let obj = {
          Id: data.Id,
          ProjectId: data.ProjectId,
          ApprovalTimeLimit: data.ApprovalTimeLimit,
          ProjectCostCalculation: data.ProjectCostCalculation,
          ProjectOverview: data.ProjectOverview,
          ProjectContent: data.ProjectContent,
          ProjectExplain: data.ProjectExplain,
          Remark: data.Remark,
          AttachUrl: data.AttachUrl,
          Status: data.Status,
          SysOrgId: data.ApplicationDepartment,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        EditBiddingQuote(qs.stringify(obj)).then(response => {
          hideLoading();
          if (response.IsSuccess) {
            this.$message({
              type: "success",
              message: "提交招投标报价审批成功！"
            });
            this.showBiddingApplyBuy = false;
            this.GetBiddingApply(this.operatiOBj);
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        showLoading();
        let obj = {
          ProjectId: data.ProjectId,
          ApprovalTimeLimit: data.ApprovalTimeLimit,
          ProjectCostCalculation: data.ProjectCostCalculation,
          ProjectOverview: data.ProjectOverview,
          ProjectContent: data.ProjectContent,
          ProjectExplain: data.ProjectExplain,
          Remark: data.Remark,
          AttachUrl: data.AttachUrl,
          Status: data.Status,
          SysOrgId: data.ApplicationDepartment,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        AddBiddingQuote(qs.stringify(obj)).then(response => {
          hideLoading();
          if (response.IsSuccess) {
            this.$message({
              type: "success",
              message: "提交招投标报价审批成功！"
            });
            this.showBiddingApplyBuy = false;
            this.GetBiddingApply(this.operatiOBj);
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }
    },
    //关闭添加修改审批窗口
    closeApplyBuy(str) {
      this.showBiddingApplyBuy = str;
    },
    //撤回招投标审批
    WithdrawBidding(data, str) {
      const operating = this.$operatedata(this.operates, str);
      const obj = {
        Id: data.Id,
        Status: 0,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      };
      this.$confirm(
        "此操作将撤回该招投标报价审批（提交送审后30秒内不能撤回）",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          EditBiddingQuoteStatus(qs.stringify(obj)).then(response => {
            if (response.MessageCode == "0") {
              this.$message({
                type: "success",
                message: "撤回成功!"
              });
              this.GetBiddingApply(this.operatiOBj);
            } else {
              this.$message({
                type: "error",
                message: response.MessageContent
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤回！"
          });
        });
    },
    //删除招投标审批
    DeleteBidding(data, str) {
      const operating = this.$operatedata(this.operates, str);
      this.$confirm("此操作将删除该招投标报价审批", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const obj = {
            Id: data.Id,
            menuid: operating.MenuId,
            operationcode: operating.OperationCode
          };
          DeleteBiddingQuote(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.GetBiddingApply(this.operatiOBj);
            } else {
              this.$message({
                type: "error",
                message: response.MessageContent
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.ContractTemplate-Container /deep/ {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
  .search-bar {
    padding: 24px 24px 12px 24px;
    // height: 80px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 12px;
      &:last-child {
        margin-right: 0;
      }
      .search-name {
        font-size: $f16;
        color: $erp666;
        font-weight: 700;
        display: inline-block;
        margin-right: 7px;
      }
      .el-input {
        display: inline-block;
        width: 216px;
      }
    }
  }
  .operate-top {
    float: right;
    .addmenu {
      margin-bottom: 16px;
    }
    .el-button + .el-button {
      margin-left: 16px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
  }
}
.erpdialog {
  .selectFile {
    position: relative;
    .titleText {
      margin-top: 16px;
    }
  }
  .input-Box {
    width: 400px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #f0f4fa;
    z-index: 0;
    position: relative;
    box-sizing: border-box;
    /deep/.el-input__inner {
      background-color: #f0f4fa;
      border: 0;
    }
    .flieBtn {
      position: absolute;
      right: 5px;
      top: 3px;
      z-index: 5;
      /deep/ .el-button--primary {
        border-color: #fff;
      }
    }
    .search-input {
      width: 80px;
      height: 28px;
      opacity: 0;
      z-index: 99;
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 3px;
    }
  }
  .select-input {
    width: 100%;
    height: auto;
    /deep/.el-input__inner {
      background-color: #f0f4fa;
    }
  }
  .file-box {
    padding: 0 120px;
    .title {
      font-size: $f14;
      color: $erp333;
      line-height: 28px;
    }
    .file {
      .img-box-list {
        position: relative;
        > input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 99;
        }
        .img-box {
          width: 160px;
          height: 120px;
          border-radius: 8px;
          overflow: hidden;
          background-color: $erinputbgc;
          position: relative;
          .filetype {
            position: absolute;
            background-color: $erpcolor;
            padding: 10px 12px;
            font-size: $f14;
            line-height: 14px;
            color: #fff;
            border-radius: 8px;
          }
          .filename {
            font-size: $f14;
            color: $erp666;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        > .img-box-hover {
          position: absolute;
          width: 100%;
          height: 30px;
          background-color: rgba(0, 0, 0, 1);
          opacity: 0.4;
          bottom: 0;
          display: flex;
          justify-content: center;
          border-radius: 0 0 8px 8px;
          .btn {
            position: relative;
            line-height: 30px;
            cursor: pointer;
            > input {
              width: 100%;
              height: 100%;
              opacity: 0;
              position: absolute;
              cursor: pointer;
            }
            .svg-icon {
              font-size: $f14;
              color: #fff;
            }
            > span {
              font-size: $f14;
              color: #fff;
              cursor: pointer;
            }
          }
          .btn + .btn {
            margin-left: 24px;
          }
        }
      }
      .downimport {
        font-size: $f14;
        color: $erpcolor;
        cursor: pointer;
      }
    }
  }
  .error-box {
    .error-top {
      margin-bottom: 24px;
      .error-total {
        font-size: $f14;
        color: $erp333;
        > span {
          color: $erpred;
        }
      }
    }
    .error-content {
      // margin-bottom: 24px;
      .row {
        line-height: 20px;
        margin-bottom: 24px;
        min-height: 20px;
        display: flex;
        color: $erp999;
        .index {
          width: 48px;
        }
        .con {
          color: $erp999;
          flex: 1;
        }
      }
    }
  }
}
.operate-bottom {
  margin-top: 32px;
  padding-left: 16px;
  .allcheck {
    margin-right: 16px;
  }
}
</style>