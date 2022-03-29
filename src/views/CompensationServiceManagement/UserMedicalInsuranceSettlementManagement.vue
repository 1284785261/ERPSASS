<!--员工医保结算管理-->
<template>
  <div class="UserMedicalInsuranceSettlementManagement-Box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="结算单编码 " label-width="100px">
            <el-input v-model.trim="SettlementDocumentCode" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入结算单编码进行查询" />
          </el-form-item>
          <el-form-item label="外包员工名称" label-width="125px">
           <el-input v-model.trim="OutsourcingEmployeeName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入外包员工名称进行查询" />
          </el-form-item>
          <el-form-item label="所属年月" label-width="80px">
            <el-date-picker value-format="yyyy-MM" v-model="Dates" type="month" size="small" class="erpsearchinput" placeholder="请选择入账年月进行查询">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="参保地" label-width="80px">
           <el-select size="mini" class="select-input" clearable v-model="MedicalAreaId" placeholder="请选择项目类型进行查询">
            <el-option v-for="(item,idx) in MedicalAreaList" :key="idx" :label="item.MedicalAreaName" :value="item.MedicalAreaId" ></el-option>
          </el-select>
          </el-form-item>
        </el-form>
         <el-button class="search-button" size="mini" round @click="Reset">重置</el-button>
         <el-button class="search-button" size="mini" round @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="MedicalSettleId" min-width="80" fixed label="序号"/>
          <el-table-column align="center" prop="MedicalSettleCode" label="结算单编码" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="MedicalSettleTitle" label="结算单名称" min-width="140" show-overflow-tooltip/>
          <el-table-column align="center" prop="ProjectName" label="项目名称" min-width="130" show-overflow-tooltip/>
          <el-table-column align="center" prop="BusinessTypeText" label="项目业务类型" min-width="120"/>
          <el-table-column align="center" prop="CompanyName" label="客户名称" min-width="130" show-overflow-tooltip/>
          <el-table-column align="center" prop="UserName" label="外包员工名称" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="Amount" label="缴交总额" min-width="120"/>
          <el-table-column align="center" prop="MedicalAccount" label="医保账号" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="MedicalAreaName" label="医保参保地名称" min-width="150" show-overflow-tooltip/>
          <el-table-column align="center" prop="AmountPurpose" label="医保所属年月" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Year+'年'+scope.row.Month+'月'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="AmountPurpose" label="账期所属年月" min-width="120">
             <template slot-scope="scope">
              <span>{{scope.row.PeriodYear+'年'+scope.row.PeriodMonth+'月'}}</span>
            </template>
          </el-table-column>
        </el-table>
    </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
  </div>
</template>
<script>
import {GetMedicalSettleMemberSettlePageList,GetMedicalSettleMemberSettleAreaList} from '@/api/CompensationServiceManagement.js'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  data() {
    return {
      SettlementDocumentCode:'',
      OutsourcingEmployeeName:'',
      MedicalAreaId :'',
      Dates:'',
      Year:'',
      Month:'',
      currentPage:1,
      PageSize:10,
      total:0,
      tableloading:false,
      tableData:[],
      MedicalAreaList:[],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
    }
  },
  created () {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.GetMedicalSettleMemberSettlePageList(this.operatiOBj)
    }
  },
  mounted(){
    this.GetMedicalSettleMemberSettleAreaList(this.operatiOBj)
  },
  methods:{
    GetMedicalSettleMemberSettleAreaList(e){
      let obj={
        menuid: e.menuid,
        operationcode: e.OperationCode
      }
      GetMedicalSettleMemberSettleAreaList(obj).then(res=>{
        if(res.MessageCode==0&&res.Data!=null){
          this.MedicalAreaList=res.Data
        }else{
          this.MedicalAreaList=[]
        }
      })
    },
    GetMedicalSettleMemberSettlePageList(e){
      if(this.Dates!=null){
          this.Year=Number(this.Dates.split('-')[0])
          this.Month=Number(this.Dates.split('-')[1])
       }else{
          this.Year=''
          this.Month=''
       }
      let obj={
        MedicalSettleCode: this.SettlementDocumentCode,
        UserName: this.OutsourcingEmployeeName,
        // MedicalAccount: '',
        MedicalAreaId: this.MedicalAreaId,
        Year: this.Year,
        Month: this.Month,
        // PeriodYear:0,
        // PeriodMonth:0,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: e.menuid || MenuIdDate(),
        operationcode: e.OperationCode || '1'
      }
      showLoading()
      GetMedicalSettleMemberSettlePageList(obj).then(res=>{
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
    //重置
    Reset(){
      this.SettlementDocumentCode=''
      this.OutsourcingEmployeeName=''
      this.MedicalAreaId=''
      this.Dates=null
    },
    //查询
    searchtable(){
      this.currentPage=1
      this.GetMedicalSettleMemberSettlePageList(this.operatiOBj)
    },
     // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.GetMedicalSettleMemberSettlePageList(this.operatiOBj)
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.GetMedicalSettleMemberSettlePageList(this.operatiOBj)
    },
  },
}
</script>
<style lang="scss" scoped>
.UserMedicalInsuranceSettlementManagement-Box{
  .operate-top {
      margin: 26px 24px 0 24px;
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
  .pagina-fonter {
  margin:0px 0px 0px 24px;
  background-color: #fff;
  padding-bottom: 30px;
  border-bottom-left-radius: 7px;
}
}
</style>