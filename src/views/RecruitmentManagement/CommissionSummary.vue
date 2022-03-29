<!--提成汇总表-->
<template>
  <div class="RecommendationDetailsReview-Box">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">汇总表名称</div>
        <el-input class="erpsearchinput" placeholder="请输入汇总表名称进行查询" size="small" clearable v-model="searchform.SummaryName">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">提成发放年月</div>
        <el-date-picker class="erpsearchinput" size="small" v-model="searchform.RoyaltyPaymentDate" clearable value-format="yyyy-MM" type="month" placeholder="请选择提成发放年月进行查询">
          </el-date-picker>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="tab2 clearfix">
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
      <!-- <el-button class="operation-button tableHeader-button" size="small" type="primary" v-if="$operatebtn(operates, 'Add')" @click="AddProject('Add')">新建项目</el-button> -->
    </div>
    <div class="content">
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="Id" min-width="120" fixed label="序号" />
          <el-table-column align="center" prop="Name" label="汇总表名称" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="ViewDetail(scope.row)">{{scope.row.Name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Sex" label="提成发放年月" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Year+'年'+scope.row.Month+'月'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="FivUpNumber" label="5天以上人数合计（人）" min-width="150">
            <template slot-scope="scope">
              <span class="watchcode" @click="ViewUpDetail(scope.row)">{{scope.row.FivUpNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="FivDownNumber" label="5天以下人数合计（人）" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="ViewDownDetail(scope.row)">{{scope.row.FivDownNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="TotalNumber" label="人数总计（人）" min-width="120" />
          <el-table-column align="center" prop="BonusTatalNumber" label="奖励金额总计（元）" min-width="150" />
          <el-table-column align="center" prop="StatusText" label="审批状态" min-width="120" />
          <el-table-column align="center" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <!-- <el-dropdown-item >查看</el-dropdown-item> -->
                    <el-dropdown-item v-if="scope.row.Status==0" @click.native="SubmitApproval(scope.row)">提交审批</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status==3||scope.row.Status==4" @click.native="SubmitApproval(scope.row)">再次提交</el-dropdown-item>
                    <el-dropdown-item @click.native="ExportBonusDetails(scope.row)">导出明细</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status==0||scope.row.Status==3||scope.row.Status==4" @click.native="Delete(scope.row)">删除</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status==1" @click.native="withdraw(scope.row)">撤回</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button size="small" class="addmenu erpbtn">提交钉钉审核</el-button>
      </div> -->
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <ViewTotalDetails :ViewShow="ViewShow" :ViewDetails="ViewDetails" :Titles="Titles" @closeDialog="closeDialog"></ViewTotalDetails>
    <SubmitForApproval :showdlg="showdlg" :SFAId="SFAId" @closeDlg="closeDlg" @SFASave="SFASave"></SubmitForApproval>
  </div>
</template>
<script>
import SubmitForApproval from './components/SubmitForApproval.vue'
import ViewTotalDetails from './components/ViewTotalDetails.vue'
import { MenuIdDate, showLoading, hideLoading } from "@/utils/CustomValidation";
import {GetSocialSecurityPayApplyEnumStatus} from '@/api/CompensationServiceManagement.js'
import {GetRecruitRecommendDrawAPercentageSumPageList,GetRecruitRecommendDrawAPercentageSumDetailedList,ExportRecruitRecommendDrawAPercentageSum,EditRecruitRecommendDrawAPercentageSumStatus,DeleteRecruitRecommendDrawAPercentageSum} from '@/api/RecruitmentManagement.js'
export default {
  components:{ViewTotalDetails,SubmitForApproval},
  data () {
    return {
      searchform: {
        SummaryName: '',
        RoyaltyPaymentDate: '',
      },
      showdlg:false,
      Year:0,
      Month:0,
      SFAId:'',
      tablist: [],
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      tabidx: -1,
      tableloading: false,
      Ids: [],
      ViewShow:false,
      ViewDetails:[],
      Titles:'',
      allchecked: false,
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: "",
        OperationCode: "Query",
      },
    }
  },
  created(){
    this.GetRecruitRecommendDrawAPercentageSumPageList()
    this.GetSocialSecurityPayApplyEnumStatus()
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations;
      console.log(this.operates);
      this.operatiOBj.menuid = this.$operatedata(this.operates, "Query").MenuId;
    }
  },
  methods: {
    //提交审批
    SubmitApproval(data){
      this.SFAId=data.Id
      this.showdlg=true
    },
    withdraw(data){
      let obj={
         Id:data.Id,
         Status:4,
         menuid: MenuIdDate(),
         operationcode: "1",
      }
      EditRecruitRecommendDrawAPercentageSumStatus(obj).then(res=>{
        if(res.MessageCode==0){
            this.$message({
            type:'success',
            message:'撤回成功'
          })
     this.GetRecruitRecommendDrawAPercentageSumPageList()
         }else{
           this.$message({
            type:'error',
            message:res.MessageContent
          })
         }
       })
    },
    //保存提交送审
    SFASave(data){
      EditRecruitRecommendDrawAPercentageSumStatus(data).then(res=>{
        if(res.MessageCode==0){
            this.$message({
            type:'success',
            message:'提交送审成功'
          })
          this.showdlg=false
          this.GetRecruitRecommendDrawAPercentageSumPageList()
         }else{
           this.$message({
            type:'error',
            message:res.MessageContent
          })
         }
       })
    },
    //关闭弹窗
    closeDlg(e){
      this.showdlg=e
    },
    //删除
    Delete(data){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj={
            Id:data.Id,
            menuid: MenuIdDate(),
            operationcode: "1",
      }
      DeleteRecruitRecommendDrawAPercentageSum(obj).then(res=>{
        if(res.MessageCode==0){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        this.GetRecruitRecommendDrawAPercentageSumPageList()
        }else{
          this.$message({
            type:'error',
            message:res.MessageContent
          })
        }
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    //查看详情
    ViewDetail(data){
      console.log(data);
      const { href } = this.$router.resolve({
        path: '/RecruitmentManagement/CommissionSummaryDetails',
        query: {
          id: data.Id,
        }
      })
      window.open(href, '_blank')
    },
    //查看五天以下招聘入职详情
    ViewDownDetail(e){
      let obj={
        RecruitRecommendDrawAPercentageSumId: e.Id,
        DayNumber: 0,
        menuid: MenuIdDate(),
        operationcode: "1",
      }
      showLoading()
      GetRecruitRecommendDrawAPercentageSumDetailedList(obj).then(res=>{
        hideLoading()
        if(res.MessageCode==0){
          this.ViewDetails=res.Data
          this.Titles="5天以下人数合计详情"
          this.ViewShow=true
        }else{
          this.$message({
            type:'error',
            message:res.MessageContent
          })
        }
      })
    },
    //查看五天以上招聘入职详情
    ViewUpDetail(e){
      let obj={
        RecruitRecommendDrawAPercentageSumId: e.Id,
        DayNumber: 1,
        menuid: MenuIdDate(),
        operationcode: "1",
      }
      showLoading()
      GetRecruitRecommendDrawAPercentageSumDetailedList(obj).then(res=>{
        hideLoading()
        if(res.MessageCode==0){
          this.ViewDetails=res.Data
          this.Titles="5天以上人数合计详情"
          this.ViewShow=true
        }else{
          this.$message({
            type:'error',
            message:res.MessageContent
          })
        }
      })
    },
    //关闭弹窗
    closeDialog(e){
      this.ViewShow=e
    },
    //导出审批通过的入职推荐奖金明细
    ExportBonusDetails(e){
      let obj={
        Id:e.Id,
        menuid: MenuIdDate(),
        operationcode: "1",
      }
      ExportRecruitRecommendDrawAPercentageSum(obj).then(res=>{
        if(res.MessageCode==0){
          window.open(res.Data)
          this.$message({
            type:'success',
            message:'导出成功'
          })
        }else{
           this.$message({
            type:'error',
            message:res.MessageContent
          })
        }
      })
    },
    //搜索
    searchtable () {
     this.GetRecruitRecommendDrawAPercentageSumPageList()
    },
    //获取审核类型枚举
    GetSocialSecurityPayApplyEnumStatus(e) {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetSocialSecurityPayApplyEnumStatus(obj).then((res) => {
        if (res.length > 0) {
          this.tablist = res;
          this.tablist.forEach((data) => {
            if (data.value == -1) {
              data.describe = "全部";
            }
          });
        } else {
          this.tablist = [];
        }
      });
    },
    //获取招聘推荐入职提成汇总分页列表
    GetRecruitRecommendDrawAPercentageSumPageList(){
      if(this.searchform.RoyaltyPaymentDate){
          this.Year=this.searchform.RoyaltyPaymentDate.split('-')[0]
          this.Month=this.searchform.RoyaltyPaymentDate.split('-')[1]
      }else{
        this.Year=0
        this.Month=0
      }
      let obj={
        Name: this.searchform.SummaryName,
        Year: this.Year,
        Month: this.Month,
        Status: this.tabidx,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: "1",
      }
      showLoading()
      GetRecruitRecommendDrawAPercentageSumPageList(obj).then(res=>{
        hideLoading()
        if(res.MessageCode==0&&res.Data!=null){
          this.tableData=res.Data
          this.total=res.Total
        }else{
          this.tableData=[]
          this.total=0
        }
      })
    },
    // 多选
    handleSelectionChange (value) {
      this.Ids = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    choosetab (e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.value
        this.GetRecruitRecommendDrawAPercentageSumPageList()
      }
    },
    // 全选
    selectall () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.GetRecruitRecommendDrawAPercentageSumPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.GetRecruitRecommendDrawAPercentageSumPageList()
    },
  },
}
</script>
<style lang="scss" scoped>
.RecommendationDetailsReview-Box /deep/ {
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
    margin-left: 20px;
    padding: 20px;
    border-radius: 0;
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