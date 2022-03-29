<!-- 招聘入职明细管理 -->
<template>
  <div class="recruitment-detail-management-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">推荐项目</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入推荐项目进行查询"
          size="small"
          clearable
          v-model="searchform.ProjectName"
        >
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">推荐人员</div>
        <el-input
          class="erpsearchinput"
          placeholder="请输入推荐人员进行查询"
          size="small"
          clearable
          v-model="searchform.RecruitName"
        >
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">招聘计提类型</div>
        <el-select
          v-model="searchform.Form"
          class="erpsearchinput"
          size="small"
          clearable
          placeholder="请选择计提类型"
        >
          <el-option
            v-for="item in RecruitRecommendEnumForm"
            :key="item.value"
            :label="item.describe"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable"
          >查询</el-button
        >
      </div>
    </div>
    <div class="content">
     <div class="tab clearfix">
          <div class="tab-name" v-for="(item, index) in tablist" :key="index" :class="{active:tabidx==item.value}" @click="chooseschedule(item.value)">{{ item.describe }}</div>
    </div>
      <div class="operate-top">
        <el-button
          size="small"
          class="addmenu erpbtn"
          @click="CalculateRewards"
          >自动计算推荐奖励</el-button
        >
        <el-button
          size="small"
          v-if="$operatebtn(operates, 'Add')"
          class="addmenu erpbtn"
          @click="GenerateCommissionSummary('Add')"
          >生成提成汇总表</el-button
        >
        <el-button
          size="small"
          v-if="$operatebtn(operates, 'Export')"
          class="addmenu erpbtn"
          @click="ExportDetail('Export')"
          >导出入职推荐奖金明细</el-button
        >
        <!-- <el-button
          size="small"
          v-if="$operatebtn(operates, 'Import')"
          class="addmenu erpbtn"
          @click="ImportDetail('Import')"
          >导入入职推荐奖金明细</el-button
        >
        <el-button
          size="small"
          v-if="$operatebtn(operates, 'Export')"
          class="addmenu erpbtn"
          @click="ExportDetail('Export')"
          >导出入职推荐奖金明细</el-button
        >
        <el-button
          size="small"
          v-if="$operatebtn(operates, 'Add')"
          class="addmenu erpbtn"
          @click="AddRecommended('Add')"
          >添加入职推荐</el-button
        > -->
      </div>
      <div class="operate-table">
        <el-table
          ref="multipleTable"
          class="erp-table"
          v-loading="tableloading"
          :data="RecruitRecommendList"
          max-height="600"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
         <el-table-column
            align="center"
            type="selection"
            width="55"
            fixed="left"
            label="全选"
          />
          <el-table-column
            align="center"
            prop="Id"
            min-width="55"
            fixed
            label="序号"
          />
          <el-table-column
            align="center"
            prop="StaffName"
            label="入职员工姓名"
            min-width="120"
          >
            <template slot-scope="scope">
              <a
                v-if="$operatebtn(operates, 'View')"
                @click="LookDetails(scope.row)"
                style="color: #1588f8"
                >{{ scope.row.StaffName }}</a
              >
              <span v-else>{{ scope.row.StaffName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="ProjectName"
            label="推荐项目"
            min-width="150"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="PositionName"
            label="推荐岗位"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="RecruitProvisionTypeText"
            label="招聘计提类型"
            min-width="120"
          />
          <el-table-column
            align="center"
            prop="RecruitTypeText"
            label="招聘类型"
            min-width="120"
          />
          <el-table-column
            align="center"
            prop="DepartureText"
            label="在职状态"
            min-width="120"
          />
          <el-table-column
            align="center"
            prop="EntryTime"
            label="入职时间"
            min-width="120"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.EntryTime | Time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="WorkDays"
            label="上班天数"
            min-width="120"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.WorkDays > 0">{{
                scope.row.WorkDays
              }}</span>
              <span v-else>——</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="DepartureTime"
            label="离职时间"
            min-width="120"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.DepartureTime | Time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="Bonus"
            label="奖金"
            min-width="120"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.Bonus | MoneyUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="Remark"
            label="备注"
            min-width="120"
          />
          <el-table-column
            align="center"
            prop="RecommenderName"
            label="推荐人"
            min-width="120"
          />
          <el-table-column
            align="center"
            prop="SysOrgName"
            label="推荐部门"
            min-width="120"
          />
          <el-table-column
            align="center"
            prop="ChannelTypeText"
            label="渠道类型"
            min-width="120"
          />
          <el-table-column
            align="center"
            prop="StatusText"
            label="渠道汇总"
            min-width="120"
          />
          <el-table-column
            align="center"
            prop="ExamineStatusText"
            label="审批状态"
            min-width="120"
          />
          <!-- <el-table-column align="center" prop="SalaryTry" label="在职情况" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.LeaveDate != '0001-01-01T00:00:00'">离职</span>
              <span v-else>在职</span>
            </template>
          </el-table-column>
           -->
          <el-table-column
            align="center"
            prop="AddTime"
            label="录入时间"
            min-width="120"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.AddTime | Time }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown
                trigger="click"
                v-if="$operatebtns(operates, ['Delete', 'View'])"
              >
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <!-- <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="EditRecruitment(scope.row,'Modify')">编辑</el-dropdown-item> -->
                    <el-dropdown-item
                      v-if="$operatebtn(operates, 'Delete')&&scope.row.Status==0"
                      @click.native="DelRecruitment(scope.row, 'Delete')"
                      >删除</el-dropdown-item
                    >
                     <el-dropdown-item
                      v-if="$operatebtn(operates, 'Revoke')&&scope.row.ExamineStatus==0||scope.row.ExamineStatus==3||scope.row.ExamineStatus==4"
                      @click.native="withdraw(scope.row, 'Revoke')"
                      >撤回</el-dropdown-item
                    >
                    <!-- <el-dropdown-item
                      v-if="$operatebtn(operates, 'View')"
                      @click.native="ViewDetail(scope.row, 'View')"
                      >查看</el-dropdown-item
                    > -->
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox
          class="allcheck erpcheck"
          v-model="allchecked"
          @change="selectall(allchecked)"
          >全选</el-checkbox
        >
      </div>
      <div class="pagina-fonter">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 生成提成汇总表 -->
      <GenerateCommissionSummary :GenerateVisible="GenerateVisible" @CloseDialog="CloseDialog" :DetailedList="DetailedList"></GenerateCommissionSummary>
      <!-- 添加修改推荐入职明细 -->
      <RecommendInduction
        :RecommendTitle="RecommendTitle"
        :RecommendVisible="RecommendVisible"
        :RecommendData="RecommendData"
        @CloseRecommend="CloseRecommend"
        @RecommendSave="RecommendSave"
      ></RecommendInduction>
      <!-- 查看修改推荐入职明细 -->
      <LookRecruitment
        :LookRecruitmentVisible="LookRecruitmentVisible"
        :DialogData="DialogData"
        @CloseLookRecruitment="CloseLookRecruitment"
      ></LookRecruitment>
      <!-- 导入入职推荐奖金明细 -->
      <ImportBonus
        :showImportBonus="showImportBonus"
        @ImportBonusSave="ImportBonusSave"
        @closeImportBonus="closeImportBonus"
      ></ImportBonus>
      <!-- 导入入职推荐奖金明细显示详情 -->
      <ImportTitle
        :TitleShow="TitleShow"
        :errorData="errorData"
        :title="ImportTitle"
        @closeTitle="closeTitle"
      ></ImportTitle>
    </div>
  </div>
</template>

<script>
import {
  GetRecruitRecommendPageList,
  GetRecruitPipelineEnumRecruitProvisionType,
  AddRecruitRecommend,
  EditRecruitRecommend,
  GetRecruitRecommendInfo,
  DeleteRecruitRecommend,
  ImportToRecruitRecommendExcel,
  DownloadRecruitRecommend,
} from "@/api/RecruitmentManagement.js";
import GenerateCommissionSummary from './components//GenerateCommissionSummary.vue'
import RecommendInduction from "./components/RecommendInduction.vue";
import LookRecruitment from "./components/LookRecruitment.vue";
import ImportBonus from "./components/ImportBonus.vue";
import ImportTitle from "@/components/publicComponents/ImportTitle";
import qs from "qs";
import { MenuIdDate, showLoading, copy, hideLoading } from "@/utils/CustomValidation";
import filters from "@/utils/filters";
export default {
  components: {
    RecommendInduction,
    LookRecruitment,
    ImportBonus,
    ImportTitle,
    GenerateCommissionSummary,
  },
  data() {
    return {
      searchform: {
        ProjectName: "",
        RecruitName: "",
        Form: "-1",
      },
      tablist:[{
        value:-1,
        describe:'全部'
      },{
        value:0,
        describe:'待汇总'
      },{
        value:1,
        describe:'已汇总'
      }],
      tabidx:-1,
      currentPage: 1,
      PageSize: 10,
      total: 0,
      Ids:[],
      DialogData:{},
      DetailedList:[],
      GenerateVisible:false,
      allchecked:false,
      tableloading: false, // 加载动画
      RecruitRecommendList: [],
      RecruitRecommendEnumForm: [],
      RecommendTitle: "添加推荐入职明细",
      RecommendVisible: false,
      RecommendData: {},
      LookRecruitmentVisible: false,
      LookRecruitmentData: {},
      showImportBonus: false,
      TitleShow: false,
      errorData: {
        MessageContent: "",
        Data: [],
      },
      ImportTitle: "导入入职推荐奖金明细信息",
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: "",
        OperationCode: "Query",
      },
    };
  },
  created() {
    this.RecommendEnum();
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations;
      console.log(this.operates);
      this.operatiOBj.menuid = this.$operatedata(this.operates, "Query").MenuId;
      this.GetRecruit(this.operatiOBj);
    }
  },
  methods: {
    //撤回
    withdraw(e,str){},
    //关闭提成汇总弹窗
    CloseDialog(e){
      this.GenerateVisible=e
    },
    //计算推荐奖励
    CalculateRewards(){},
    //生成提成汇总表
    GenerateCommissionSummary(){
      if(this.DetailedList.length>0){
        this.GenerateVisible=true
      }else{
        this.$message({
          type:'info',
          message:'请选择人员信息后生成提成汇总表'
        })
      }
    },
    //导出入职推荐奖金明细
    // ExportDetail(){},
    //查看详情
    ViewDetail() {
      this.LookRecruitmentVisible=true
    },
    searchtable() {
      this.currentPage = 1;
      this.GetRecruit(this.operatiOBj);
    },
    //分页处理
    handleSizeChange(val) {
      this.PageSize = val;
      this.GetRecruit(this.operatiOBj);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetRecruit(this.operatiOBj);
    },
    // 多选
    handleSelectionChange(value) {
      this.Ids = [];
      this.DetailedList=[];
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id);
        this.DetailedList.push({
          RecruitRecommendId:value[i].Id
        })
      }
      console.log(this.DetailedList);
      if (this.Ids.length == this.RecruitRecommendList.length) {
        this.allchecked = true;
      } else {
        this.allchecked = false;
      }
    },
    //切换状态
    chooseschedule(e){
      this.tabidx = e
      this.currentPage = 1
      this.GetRecruit(this.operatiOBj);
    },
    RecommendEnum() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetRecruitPipelineEnumRecruitProvisionType(qs.stringify(obj)).then((response) => {
        if (response) {
          this.RecruitRecommendEnumForm = response;
          this.RecruitRecommendEnumForm.unshift({
            value: "-1",
            describe: "全部",
          });
        }
      });
    },
    //获取招聘需求列表数据
    GetRecruit(operat) {
      this.tableloading = true;
      // let data = this.searchform;
      // data.PageIndex = this.currentPage || 1;
      // data.PageSize = this.PageSize || 1;
      // data.menuid = operat.menuid;
      // data.operationcode = operat.OperationCode;
      let obj={
        ProjectName: this.searchform.ProjectName,
        RecommenderName: this.searchform.RecruitName,
        RecruitProvisionType: this.searchform.Form,
        Status: this.tabidx,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      GetRecruitRecommendPageList(qs.stringify(obj)).then((response) => {
        this.tableloading = false;
        if (response.MessageCode==0) {
          if (response.Data && response.Data.length > 0) {
            this.RecruitRecommendList = response.Data;
            this.total = response.Total;
          } else {
            this.RecruitRecommendList = [];
            this.total = 0;
          }
        } else {
          this.RecruitRecommendList = [];
          this.total = 0;
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    //导入入职明细
    ImportDetail(str) {
      const operating = this.$operatedata(this.operates, str);
      localStorage.setItem("operating", JSON.stringify(operating));
      this.showImportBonus = true;
    },
    //导入事件
    ImportBonusSave(data) {
      const operating = JSON.parse(localStorage.getItem("operating")) || {};
      data.menuid = operating.MenuId;
      data.operationcode = operating.OperationCode;
      showLoading();
      ImportToRecruitRecommendExcel(data).then((response) => {
        hideLoading();
        if (response.IsSuccess) {
          let data = response.Data;
          this.errorData.Data = [];
          if (data.Errors > 0) {
            this.errorData.MessageContent = `导入入职推荐奖金明细数据成功${data.Successes}条，失败${data.Errors}条`;
            for (let i = 0; i < data.ImportToExcelErrorList.length; i++) {
              this.errorData.Data.push(
                `第${data.ImportToExcelErrorList[i].Rows}条，${data.ImportToExcelErrorList[i].Message}`
              );
            }
          } else {
            this.errorData.MessageContent = `导入入职推荐奖金明细数据成功${data.Successes}条`;
          }
          this.TitleShow = true;
          this.showImportBonus = false;
          this.GetRecruit(this.operatiOBj);
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent,
          });
        }
      });
    },
    //导出入职明细
    ExportDetail(op) {
      const operating = this.$operatedata(this.operates, op);
      let obj = {
        ProjectName: this.searchform.ProjectName,
        RecommenderName: this.searchform.RecruitName,
        RecruitProvisionType: this.searchform.Form,
        Status: this.tabidx,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading();
      DownloadRecruitRecommend(qs.stringify(obj)).then((response) => {
        hideLoading();
        if (response.IsSuccess) {
          if (response.Data) {
            window.open(response.Data);
          } else {
            this.$message({
              message: "暂无入职推荐奖金明细",
              type: "warning",
            });
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "warning",
          });
        }
      });
    },
    //关闭导入窗口
    closeImportBonus(val) {
      this.showImportBonus = val;
    },
    closeTitle(val) {
      this.TitleShow = val;
    },
    //查看入职推荐
    LookDetails(data) {
      this.DialogData=data
      this.LookRecruitmentVisible = true;
      // const obj = {
      //   Id: data.Id,
      //   menuid: MenuIdDate(),
      //   operationcode: "1",
      // };
      // GetRecruitRecommendInfo(qs.stringify(obj)).then((response) => {
      //   if (response.IsSuccess) {
      //     this.LookRecruitmentData = response.Data;
      //   } else {
      //     this.$message({
      //       message: response.MessageContent,
      //       type: "error",
      //     });
      //   }
      // });
    },
    CloseLookRecruitment(val) {
      this.LookRecruitmentVisible = val;
    },
    //添加入职推荐
    AddRecommended(str) {
      const operating = this.$operatedata(this.operates, str);
      localStorage.setItem("operating", JSON.stringify(operating));
      this.RecommendTitle = "添加推荐入职明细";
      this.RecommendVisible = true;
    },
    //修改入职推荐
    EditRecruitment(data, str) {
      const operating = this.$operatedata(this.operates, str);
      localStorage.setItem("operating", JSON.stringify(operating));
      this.RecommendTitle = "修改推荐入职明细";
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetRecruitRecommendInfo(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          this.RecommendData = response.Data;
          this.RecommendVisible = true;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    // 单个删除
    DelRecruitment(data, str) {
      const operating = this.$operatedata(this.operates, str);
      const obj = {
        IdArr: data.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
      };
      this.$confirm("此操作将删除该入职推荐信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          DeleteRecruitRecommend(qs.stringify(obj)).then((response) => {
            if (response.IsSuccess) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.GetRecruit(this.operatiOBj);
            } else {
              this.$message({
                type: "error",
                message: response.MessageContent,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //关闭入职推荐
    CloseRecommend(val) {
      this.RecommendVisible = val;
    },
    //保存入职推荐
    RecommendSave(data) {
      const operating = JSON.parse(localStorage.getItem("operating")) || {};
      data.menuid = operating.MenuId;
      data.operationcode = operating.OperationCode;
      if (data.Id) {
        EditRecruitRecommend(qs.stringify(data)).then((response) => {
          hideLoading();
          if (response.IsSuccess) {
            this.$message({
              type: "success",
              message: "修改入职推荐成功!",
            });
            this.RecommendVisible = false;
            this.GetRecruit(this.operatiOBj);
          } else {
            this.$message({
              type: "error",
              message: response.MessageContent,
            });
          }
        });
      } else {
        AddRecruitRecommend(qs.stringify(data)).then((response) => {
          hideLoading();
          if (response.IsSuccess) {
            this.$message({
              type: "success",
              message: "添加入职推荐成功!",
            });
            this.RecommendVisible = false;
            this.GetRecruit(this.operatiOBj);
          } else {
            this.$message({
              type: "error",
              message: response.MessageContent,
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.recruitment-detail-management-container {
  .search-bar {
    padding: 24px 24px 12px 24px;
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
   .tab {
    padding-left: 0px;
  }
  .operate-top {
    float: right;
    margin-bottom: 16px;
  }
  .operate-table {
    margin-bottom: 20px;
  }
  .content {
    background-color: #fff;
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
    .operate-bottom {
      margin-top: 32px;
      padding-left: 21px;
      .allcheck {
        margin-right: 16px;
      }
    }
    .pagina-fonter {
      margin-top: 24px;
    }
  }
}
</style>