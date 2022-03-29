<!--管理费及税金管理-->
<template>
  <div class="ManagementAndTaxes-Box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="所属项目" label-width="80px">
            <el-input v-model.trim="ProjectName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入项目名称进行查询" />
          </el-form-item>
          <el-form-item label="所属客户" label-width="80px">
            <el-input v-model.trim="SupplierUnitName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入客户名称进行查询" />
          </el-form-item>
          <el-form-item label="项目类型" label-width="80px">
          <el-select size="mini" class="select-input" clearable v-model="ProjectType" placeholder="请选择项目类型进行查询">
            <el-option v-for="(item,idx) in ProjectTypeList" :key="idx" :label="item.describe" :value="item.value" ></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="所属年月" label-width="80px">
            <el-date-picker value-format="yyyy/MM" v-model="Datas" @change="DataChanges(Datas)" type="month" size="small" class="erpsearchinput" placeholder="请选择所属年月进行查询">
            </el-date-picker>
          </el-form-item>
        </el-form>
         <el-button class="search-button" size="mini" round @click="Reset">重置</el-button>
         <el-button class="search-button" size="mini" round @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" @click.native="AddInitiateMoneyAndTaxes">添加管理费及税金</el-button>
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
      </div>
    </div>
    <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @select="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" fixed="left" label="全选"/>
          <el-table-column align="center" v-if="$getColumsFlag('Id',checkboxVal)" prop="Id" min-width="120" fixed label="序号" />
          <el-table-column align="center" v-if="$getColumsFlag('CompanyName',checkboxVal)" prop="CompanyName" label="所属客户" min-width="160" show-overflow-tooltip/>
          <el-table-column align="center" v-if="$getColumsFlag('ProjectName',checkboxVal)" prop="ProjectName" label="所属项目" min-width="160" show-overflow-tooltip/>
          <el-table-column align="center" v-if="$getColumsFlag('BusinessTypeName',checkboxVal)" prop="BusinessTypeName" label="项目类型" min-width="120"/>
          <el-table-column align="center" v-if="$getColumsFlag('BelongingDate',checkboxVal)" label="所属年月" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.Year!=0&&scope.row.Month!=0">{{scope.row.Year+'年'+scope.row.Month+'月'}}</span>
              <span v-else>- - - -</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('EntryDate',checkboxVal)" label="入账年月" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.EntryYear!=0&&scope.row.EntryMonth!=0">{{scope.row.EntryYear+'年'+scope.row.EntryMonth+'月'}}</span>
              <span v-else>- - - -</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('AmountReceived',checkboxVal)" prop="AmountReceived" label="到款金额" min-width="120"/>
          <el-table-column align="center" v-if="$getColumsFlag('InvoiceAmount',checkboxVal)" prop="InvoiceAmount" label="开票金额" min-width="120"/>
          <el-table-column align="center" v-if="$getColumsFlag('ManagementExpense',checkboxVal)" prop="ManagementExpense" label="管理费" min-width="120"/>
          <el-table-column align="center" v-if="$getColumsFlag('TotalTax',checkboxVal)" prop="TotalTax" label="税金总额" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('VATAmount',checkboxVal)" prop="VATAmount" label="增值税税额" min-width="120" show-overflow-tooltip/>
          <!-- <el-table-column align="center" v-if="$getColumsFlag('ManagementFeeStatusText',checkboxVal)" prop="ManagementFeeStatusText" label="管理费状态" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('TaxStatusText',checkboxVal)" prop="TaxStatusText" label="税金状态" min-width="120" /> -->
          <el-table-column align="center" v-if="$getColumsFlag('SysUser',checkboxVal)" prop="SysUser" label="操作人" min-width="120"/>
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item  @click.native="modify(scope.row)">修改</el-dropdown-item>
                    <el-dropdown-item  v-if="$operatebtn(operates, 'Delete')" @click.native="Delete(scope.row)">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagina-fonter">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <AddManagementAndTaxes :dialogId="dialogId" :showAddCard="showAddCard" :dialogTitle="dialogTitle" :IsTrue="IsTrue" @closeDialog="closeDialog" @AddCardSave="AddCardSave"></AddManagementAndTaxes>
      </div>
  </div>
</template>
<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import {GetProjectBusinessType} from '@/api/projectManagement.js'
import {GetManagementAndTaxesPageList,AddManagementAndTaxe,DeleteManagementAndTaxes,EditManagementAndTaxes} from '@/api/CompensationServiceManagement.js'
import { MenuIdDate, uuid, showLoading, hideLoading, } from '@/utils/CustomValidation'
import AddManagementAndTaxes from './components/AddManagementAndTaxes.vue'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components:{AddManagementAndTaxes,ScreeningComponent},
  data() {
    return {
      dialogId:-1,
      showAddCard:false,
      dialogTitle:'',
      ProjectName:'',
      SupplierUnitName:'',
      ProjectType:'',
      Datas:'',
      ProjectTypeList:[],
      Year:'',
      Month:'',
      tabidx:0,
      currentPage:1,
      PageSize:10,
      tableloading:false,
      tableData:[],
      Ids:[],
      total:0,
      IsTrue:false,
      formTheadOptions: [
        { label: "序号", prop: "Id" },
        { label: "所属客户", prop: "CompanyName" },
        { label: "所属项目", prop: "ProjectName" },
        { label: "项目类型", prop: "BusinessTypeName" },
        { label: "所属年月", prop: "BelongingDate" },
        { label: "入账年月", prop: "EntryDate" },
        { label: "到款金额", prop: "AmountReceived" },
        { label: "开票金额", prop: "InvoiceAmount" },
        { label: "管理费", prop: "ManagementExpense" },
        { label: "税金总额", prop: "TotalTax" },
        { label: "增值税税额", prop: "VATAmount" },
        // { label: "管理费状态", prop: "ManagementFeeStatusText" },
        // { label: "税金状态", prop: "TaxStatusText" },
        { label: "操作人", prop: "SysUser" },
      ],
      checkboxVal: [],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
    }
  },
  created(){
    // console.log(this.$route.meta.operations);
   if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.GetManagementAndTaxesPageList()
      this.GetProjectBusinessType()
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  methods:{
    //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    //添加管理费及税金
    AddCardSave(e){
      if(this.dialogTitle=='添加管理费及税金'){
        const operating = this.$operatedata(this.operates, 'Add')
        e.menuid= operating.MenuId,
        e.operationcode= operating.OperationCode
        AddManagementAndTaxe(e).then(res=>{
             if(res.MessageCode==0){
               this.$message({
                 type:'success',
                 message:'添加管理费及税金成功'
               })
               this.showAddCard=false
               this.GetManagementAndTaxesPageList()
             }else{
               this.$message({
                 type:'error',
                 message:res.MessageContent
               })
             }
        })
      }else if(this.dialogTitle=='修改管理费及税金'){
        const operating = this.$operatedata(this.operates, 'Modify')
        e.Id=this.dialogId
        e.menuid= operating.MenuId
        e.operationcode= operating.OperationCode
        EditManagementAndTaxes(e).then(res=>{
           if(res.MessageCode==0){
               this.$message({
                 type:'success',
                 message:'修改管理费及税金成功'
               })
               this.showAddCard=false
               this.GetManagementAndTaxesPageList()
             }else{
               this.$message({
                 type:'error',
                 message:res.MessageContent
               })
             }
        })
      }
    },
    //关闭添加弹窗
    closeDialog(e){
      this.showAddCard=e
    },
    //变更时间
    DataChanges(e){
      if(e!=null){
      this.Year=e.split('/')[0]
      this.Month=e.split('/')[1]
      }else{
        this.Year=''
        this.Month=''
      }
    },
    //多选
     handleSelectionChange (value) {
      this.Ids = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
      }
      console.log(this.Ids);
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    //获取项目类型
    GetProjectBusinessType(){
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectBusinessType(qs.stringify(obj)).then(response => {
        if (response) {
          this.ProjectTypeList = response
        }else{
          this.ProjectTypeList=[]
        }
      })
    },
    //获取管理费及税金分页列表
    GetManagementAndTaxesPageList(){
      const operating = this.$operatedata(this.operates, 'View')
      let obj={
          CompanyName: this.SupplierUnitName,
          ProjectName: this.ProjectName,
          BusinessType: this.ProjectType,
          Year: this.Year,
          Month: this.Month,
          PageIndex: this.currentPage,
          PageSize: this.PageSize,
          menuid: operating.MenuId || MenuIdDate(),
          operationcode: operating.OperationCode || '1'
      }
      showLoading()
      GetManagementAndTaxesPageList(obj).then(res=>{
            if(res.MessageCode==0){
              this.tableData=res.Data
              this.total=res.Total
              hideLoading()
            }else{
              this.tableData=[]
            }
      })
    },
    //添加管理费及税金
    AddInitiateMoneyAndTaxes(){
      this.dialogTitle='添加管理费及税金'
      this.showAddCard=true
    },
    //修改
    modify(e){
      this.dialogId=e.Id
      this.dialogTitle='修改管理费及税金'
      this.showAddCard=true
    },
    //删除
    Delete(e){
      const operating = this.$operatedata(this.operates, 'Delete')
       let obj={
          Id:e.Id,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
       }
       DeleteManagementAndTaxes(obj).then(res=>{
             if(res.MessageCode==0){
             this.$message({
               type:'success',
               message:'删除成功'
             })
             this.GetManagementAndTaxesPageList()
           }else{
             this.$message({
               type:'error',
               message:res.MessageContent
             })
           }
       })
    },
    //重置
    Reset(){
      this.ProjectName=''
      this.SupplierUnitName=''
      this.ProjectType=''
      this.Datas=''
      this.Year=''
      this.Month=''
    },
    //查询
    searchtable(){
      this.GetManagementAndTaxesPageList()
    },
     // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.GetManagementAndTaxesPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.GetManagementAndTaxesPageList()
    },
  }
}
</script>
<style lang="scss" scoped>
.ManagementAndTaxes-Box{
  .operate-top {
      margin: 15px 24px 7px 24px;
      float: right;
      .screening-compent {
        float: right;
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
    .pagina-fonter {
      margin-top: 24px;
    }
  }
}
</style>