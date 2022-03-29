<template>
  <div class="ViewDetails-Box">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="tab clearfix">
          <div class="tab-name" v-for="(item, index) in SummaryType" :key="index" :class="{active:tabidx==item.value}" @click="chooseschedule(item.value)">{{ item.describe }}</div>
    </div>
    <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableList" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="ContractCode" label="序号" fixed min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="ContractName" min-width="120" label="汇总表名称" show-overflow-tooltip/>
          <el-table-column align="center" prop="ContractTypeText" label="结算年月" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="BusinessTypeText" label="5天以上人数合计" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="ArchiveType" label="5天以下人数合计" min-width="150" show-overflow-tooltip>
             <template slot-scope="scope">
              <span>{{scope.row.ArchiveType==0?'纸质存档':'电子存档'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SysUserName" label="人数总计" min-width="120"/>
          <el-table-column align="center" prop="AddTime" label="奖励金额总计" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="ArchiveTime" label="审核结果" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{scope.row.AddTime.split('T').toString().replace(/-/g,'/').replace(/,/g,'    ')}}</span>
          </template>
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
export default {
  data() {
    return {
      tableList:[],
      tableloading:false,
      currentPage:1,
      PageSize:10,
      total:0,
      SummaryType:[],
      tabidx:-1,
      urlList:[{
        name: '提成汇总表',
        router: '/RecruitmentManagement/CommissionSummary'
      }, {
        name: '查看详情',
        router: ''
      }]
    }
  },
  components:{BreadCrumb},
  methods:{
    //切换类型
    chooseschedule(e){
      this.tabidx = e
      this.currentPage = 1
      this.GetDocumentArchivesPageList()
    },
  }
}
</script>
<style lang="scss" scoped>
.ViewDetails-Box{
  .operate-table{
       background-color: #fff;
      // min-height: calc(100vh - 141px);
      margin-left: 24px;
      padding: 16px 24px 24px 24px;
      border-radius:0;
      .watchcode{
        color: #1588F8;
        cursor: pointer;
      }
    }
    .tab {
      margin-left: 24px;
    }
}
</style>