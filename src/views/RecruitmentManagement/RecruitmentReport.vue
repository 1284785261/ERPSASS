/* 招聘报表 */
<template>
  <div class="RecruitmentReport-Box">
     <!-- <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="档案类型" label-width="80px">
            <el-select v-model.trim="FileType" clearable placeholder="请选择项目业务类型" size="mini" class="selectWidth select-input" >
              <el-option v-for="(item,index) in FileTypeList" :key="index" :value="item.value" :label="item.describe"/>
            </el-select>
          </el-form-item>
          <el-form-item label="业务类型" label-width="80px" v-if="FileType===0">
            <el-select v-model.trim="BusinessType" clearable placeholder="请选择项目业务类型" size="mini" class="selectWidth select-input" >
              <el-option v-for="(item,index) in BusinessTypeList" :key="index" :value="item.value" :label="item.describe"/>
            </el-select>
          </el-form-item>
          <el-form-item label="合同类型" label-width="80px" v-if="FileType===1">
            <el-select v-model.trim="ContractType" clearable placeholder="请选择项目合同类型" size="mini" class="selectWidth select-input" >
              <el-option v-for="(item,index) in ContractTypeList" :key="index" :value="item.value" :label="item.describe"/>
            </el-select>
          </el-form-item>
          <el-form-item label="合同名称" label-width="80px">
            <el-input v-model.trim="ContractName" clearable class="selectWidth select-input" suffix-icon="el-icon-search" placeholder="请输入合同名称" />
          </el-form-item>
        </el-form>
         <el-button class="search-button" size="mini" round @click="Reset">重置</el-button>
         <el-button class="search-button" size="mini" round @click="searchtable">查询</el-button>
      </div>
    </div> -->
     <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableList" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="ContractCode" label="招聘人" fixed min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <a class="watchcode" @click="LookDetails(scope.row)">{{scope.row.ContractCode}}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ContractName" min-width="120" label="所属部门" show-overflow-tooltip/>
          <el-table-column align="center" prop="ContractTypeText" label="录入人才" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="BusinessTypeText" label="推荐人数" min-width="160" show-overflow-tooltip />
          <el-table-column align="center" prop="ArchiveType" label="面试人数" min-width="100" show-overflow-tooltip>
             <template slot-scope="scope">
              <span>{{scope.row.ArchiveType==0?'纸质存档':'电子存档 '}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SysUserName" label="试岗人数" min-width="120">
            <template slot-scope="scope">
              <a class="watchcode">{{scope.row.SysUserName}}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="AddTime" label="入职人数" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AddTime.split('T').toString().replace(/-/g,'/').replace(/,/g,'    ')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ArchiveTime" label="试岗离职" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{scope.row.AddTime.split('T').toString().replace(/-/g,'/').replace(/,/g,'    ')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ArchiveStatus" label="面试不通过" min-width="120">
             <template slot-scope="scope">
              <span>{{scope.row.ArchiveStatus==0?'待存档':'已存档'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ArchivesCabinetCode" label="业绩" min-width="120" />
        </el-table>
         <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
       </div>
      </div>
      <div class="Echarts">
        <chartDom :Data="Datas"></chartDom>
        <Funnel></Funnel>
        <StackedBarChart></StackedBarChart>
      </div>
  </div>
</template>
<script>
import chartDom from '@/components/workbench/chartDom.vue'
import Funnel from '@/components/workbench/Funnel.vue'
import StackedBarChart from '@/components/workbench/StackedBarChart.vue'
export default {
      data() {
        return {
          tableList:[],
          tableloading:false,
          currentPage:1,
          PageSize:10,
          total:0,
          Datas:{

          },
        }
      },
      components:{chartDom,Funnel,StackedBarChart},
      methods:{
        // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
    },
      }
}
</script>
<style lang="scss" scoped>
.operate-table{
    background-color: #fff;
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius:0;
    .watchcode{
      color: #1588F8;
      cursor: pointer;
    }
  }
</style>