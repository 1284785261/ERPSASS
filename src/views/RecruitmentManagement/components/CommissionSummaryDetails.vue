<template>
  <div class="CommissionSummaryDetails">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
      <div class="tab2 clearfix">
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
    </div>
    <div class="content">
      <div class="operate-table">
        <div class="Titles">{{Title}}</div>
        <!-- :span-method="objectSpanMethod" -->
        <el-table ref="multipleTable" class="erp-table tabs" v-loading="tableloading" show-summary :summary-method="getSummaries" :key="0" :data="tableData" tooltip-effect="dark" v-if="tabidx==0">
          <el-table-column align="center" prop="RecruitTypeName" min-width="120" fixed label="招聘类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.RecruitTypeName">{{scope.row.RecruitTypeName}}</div>
              <div v-else>{{scope.row.SubtotalRecruitTypeName}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SysOrgName" min-width="120" fixed label="推荐部门" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.SysOrgName">{{scope.row.SysOrgName}}</div>
              <div v-else>----</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="RecommenderName" min-width="80" fixed label="推荐人" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.RecommenderName">{{scope.row.RecommenderName}}</div>
              <div v-else>----</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="TotalNumber" min-width="120" fixed label="推荐人数（人）" show-overflow-tooltip>
             <template slot-scope="scope">
              <div v-if="scope.row.TotalNumber">{{scope.row.TotalNumber}}</div>
              <div v-else>{{scope.row.SubtotalTypeTotalNumber}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="BonusTatalNumber" min-width="120" fixed label="金额合计（元）" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.BonusTatalNumber">{{scope.row.BonusTatalNumber}}</div>
              <div v-else>{{scope.row.SubtotalTypeBonusTatalNumber}}</div>
            </template>
          </el-table-column>
        </el-table>
        <el-table ref="multipleTable" class="erp-table tabs" :key="1" v-loading="tableloading" :span-method="objectSpanMethod" :data="tableDatas" tooltip-effect="dark" v-if="tabidx==1">
          <el-table-column align="center" prop="ProjectName" min-width="120" fixed label="入职单位" show-overflow-tooltip/>
          <el-table-column align="center" prop="PositionName" min-width="120" label="入职岗位" show-overflow-tooltip/>
          <el-table-column align="center" prop="RecommenderName" min-width="120" label="姓名" show-overflow-tooltip/>
          <el-table-column align="center" prop="SysOrgName" min-width="120" label="推荐部门" show-overflow-tooltip/>
          <el-table-column align="center" prop="RecruitProvisionTypeText" min-width="120" label="招聘计提类型" show-overflow-tooltip/>
          <el-table-column align="center" prop="" min-width="120" label="业务类型" show-overflow-tooltip/>
          <el-table-column align="center" prop="TotalNumber" min-width="160" label="推荐入职人数（人）" show-overflow-tooltip/>
          <el-table-column align="center" prop="EntryTime" min-width="120" label="入职时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{scope.row.EntryTime | YYMMddhhmmssTime}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="DepartureText" min-width="120" label="在职状态" show-overflow-tooltip/>
          <el-table-column align="center" prop="DepartureTime" min-width="120" label="离职时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{scope.row.DepartureTime | YYMMddhhmmssTime}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="WorkDays" min-width="140" label="上班天数（天）" show-overflow-tooltip/>
          <el-table-column align="center" prop="BonusTatalNumber" fixed="right" min-width="120" label="奖金（元）" show-overflow-tooltip/>
        </el-table>
      </div>
    <div slot="footer" class="dialog-footer-multiple">
          <el-button round class="erpbtn" size="small" @click="cancel"
            >关闭</el-button
          >
        </div>
    </div>
  </div>
</template>
<script>
import {GetRecruitRecommendDrawAPercentageSumStatisticsInfoList,GetRecruitRecommendDrawAPercentageSumDetailedInfoList} from '@/api/RecruitmentManagement.js'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { MenuIdDate, showLoading, hideLoading } from "@/utils/CustomValidation";
export default {
  components:{BreadCrumb},
  data() {
    return {
      urlList: [{
        name: '提成汇总表',
        router: '/RecruitmentManagement/CommissionSummary'
      }, {
        name: '查看提成汇总详情',
        router: ''
      }],
      tablist:[{
        value:0,
        describe:'汇总统计数据'
      },{
        value:1,
        describe:'汇总明细数据'
      }],
      spanArr:[],
      pos:0,
      Title:'',
      tabidx:0,
      tableDatas:[],
      tableData:[],
      tableloading:false,
    }
  },
  created(){
    this.GetRecruitRecommendDrawAPercentageSumStatisticsInfoList()
  },
  methods:{
    //汇总统计数据列表
    GetRecruitRecommendDrawAPercentageSumStatisticsInfoList(){
      let obj={
           Id:this.$route.query.id,
           menuid: MenuIdDate(),
           operationcode: "1",
         }
         showLoading()
         GetRecruitRecommendDrawAPercentageSumStatisticsInfoList(obj).then(res=>{
           hideLoading()
           if(res.MessageCode==0){
             this.tableData=res.Data.StatisticsInfoList
             this.Title=res.Data.Name
            //  this.getSpanArr(this.tableData)
           }else{
             this.$message({
               type:'error',
               message:res.MessageContent
             })
           }
         })
    },
    //汇总明细数据列表
     GetRecruitRecommendDrawAPercentageSumDetailedInfoList(){
      let obj={
           Id:this.$route.query.id,
           menuid: MenuIdDate(),
           operationcode: "1",
         }
         showLoading()
         GetRecruitRecommendDrawAPercentageSumDetailedInfoList(obj).then(res=>{
           hideLoading()
           if(res.MessageCode==0){
             this.tableDatas=res.Data.DetailedInfoList
             this.Title=res.Data.Name
             this.getSpanArr(this.tableDatas)
           }else{
             this.$message({
               type:'error',
               message:res.MessageContent
             })
           }
         })
    },
    getSpanArr(data) {
      this.spanArr=[]
        // data就是我们从后台拿到的数据
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].PositionId === data[i - 1].PositionId&&data[i].SysOrgId=== data[i - 1].SysOrgId&&data[i].RecommenderId=== data[i - 1].RecommenderId) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
        // console.log(this.spanArr);
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex != 13) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        // console.log(`rowspan:${_row} colspan:${_col}`);
        return {
          // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col
        };
      }
    },
   //关闭
    cancel() {
      window.open("about:blank", "_self").close();
    },
    choosetab (e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.value
         if(this.tabidx==0){
           this.GetRecruitRecommendDrawAPercentageSumStatisticsInfoList()
        }else if(this.tabidx==1){
           this.GetRecruitRecommendDrawAPercentageSumDetailedInfoList()
        }
      }
    },
    getSummaries(param) {
      console.log(param);
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '招聘合计';
            return;
          }else if(index === 3||index === 4){
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
            } else {
              sums[index] = 'N/A';
            }
          }else{
             sums[index] = '----'
          }
        });

        return sums;
      }
    },
}
</script>
<style lang="scss" scoped>
.CommissionSummaryDetails{
  .bread {
  margin-left: 24px;
  margin-bottom: 24px;
}
.content {
    background-color: #fff;
    margin-left: 20px;
    padding: 20px;
    border-radius: 0;
    .Titles{
      padding: 12px 0;
      line-height: 32px;
      font-size: 16px;
      // border: 1px solid #EBEEF5;
      width: 100%;
      background: #E0EDFF;
      text-align: center;
      font-weight: 700;
    }
  }
  .dialog-footer-multiple{
    background: #fff;
    width: 100%;
    padding-top: 20px;
    text-align: center;
  }
}
</style>