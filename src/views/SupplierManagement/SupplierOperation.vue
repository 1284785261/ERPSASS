<!--供应商管理-->
<template>
  <div class="SupplierOperation-Box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="供应商编码" label-width="120px">
            <el-input v-model.trim="SupplierCode" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入供应商编码进行查询" />
          </el-form-item>
          <el-form-item label="供应商单位名称" label-width="140px">
           <el-input v-model.trim="SupplierUnitName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入供应商单位名称进行查询" />
          </el-form-item>
          <el-form-item label="税务登记号" label-width="120px">
            <el-input v-model.trim="TaxRegistrationNo" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入税务登记号进行查询" />
          </el-form-item>
        </el-form>
         <el-button class="search-button" size="mini" round @click="Reset">重置</el-button>
         <el-button class="search-button" size="mini" round @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" v-if="tabidx==1" @click.native="AddSupplierInformation">添加</el-button>
    </div>
    <div class="tab clearfix">
          <div class="tab-name" v-for="(item, index) in SupplierStatus" :key="index" :class="{active:tabidx==item.value}" @click="chooseschedule(item.value)">{{ item.describe }}</div>
    </div>
    <div class="operate-table" v-if="tabidx==0">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="Id" min-width="120" fixed label="序号" />
          <el-table-column align="center" prop="Code" label="供应商编码" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="Name" label="供应商单位名称" min-width="180" show-overflow-tooltip/>
          <el-table-column align="center" prop="Abbreviation" label="简称" min-width="120" />
          <el-table-column align="center" prop="Address" label="地址" min-width="200" show-overflow-tooltip/>
          <el-table-column align="center" prop="Corporation" label="法人代表" min-width="120" />
          <el-table-column align="center" prop="BusinessRegistrationNo" label="工商注册号" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="TaxRegistrationNo" label="税务登记号" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="UpdateTime" label="创建时间" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.UpdateTime">{{scope.row.UpdateTime | Time}}</span>
              <span v-else>——</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-table" v-if="tabidx==1">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableDatas" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="Id" min-width="120" fixed label="序号" />
          <el-table-column align="center" prop="Code" label="供应商编码" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="Name" label="供应商单位名称" min-width="180" show-overflow-tooltip/>
          <el-table-column align="center" prop="TaxRegistrationNo" label="税务登记号" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="AccountTypeText" label="账户类型" min-width="120"/>
          <el-table-column align="center" prop="AccountName" label="开户名称" min-width="120"/>
          <el-table-column align="center" prop="AccountClassText" label="账号类别" min-width="120"/>
          <el-table-column align="center" prop="AccountCode" label="银行卡号/支付宝账号" min-width="180" show-overflow-tooltip/>
          <el-table-column align="center" prop="AccountBranch" label="开户网点" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.AccountBranch">{{scope.row.AccountBranch}}</span>
              <span v-else>——</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item  v-if="$operatebtn(operates, 'Modify')" @click.native="modify(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="Delete(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
      <AddExternalSupplier :dialogTitle="dialogTitle" :showDlg="showDlg" :dialogId="dialogId" @CloseDialog="CloseDialog" @SaveSupplierInformation="SaveSupplierInformation"></AddExternalSupplier>
  </div>
</template>
<script>
import AddExternalSupplier from './components/AddExternalSupplier.vue'
import {AddExternalSuppliers,GetExternalSupplierPageList,DeleteExternalSupplier,EditExternalSupplier,GetInsideSupplierPageList} from '@/api/Supplier.js'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
export default {
  components:{AddExternalSupplier},
  data() {
    return {
      dialogId:-1,
      showDlg:false,
      dialogTitle:'添加外部供应商',
      SupplierCode:'',
      SupplierUnitName:'',
      TaxRegistrationNo:'',
      SupplierStatus:[{
        value:0,
        describe:'内部供应商'
      },{
        value:1,
        describe:'外部供应商'
      }],
      tabidx:0,
      currentPage:1,
      PageSize:10,
      total:0,
      tableloading:false,
      tableData:[],
      tableDatas:[],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
    }
  },
  created(){
    console.log(this.$route.meta.operations);
   if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.GetExternalSupplierPageList(this.operatiOBj)
      this.GetInsideSupplierPageList(this.operatiOBj)
    }
  },
  methods:{
    //获取内部供应商分页列表
    GetInsideSupplierPageList(e){
      let obj={
        Code: this.SupplierCode,
        Name: this.SupplierUnitName,
        TaxRegistrationNo: this.TaxRegistrationNo,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: e.menuid || MenuIdDate(),
        operationcode: e.OperationCode || '1',
      }
      GetInsideSupplierPageList(obj).then(res=>{
         if(res.MessageCode==0&&res.Data!=null){
           this.tableData=res.Data
           this.total=res.Total
        }else{
          this.tableData=[]
          this.total=0
        }
      })
    },
    //获取外部供应商分页列表
    GetExternalSupplierPageList(e){
      let obj={
        Code: this.SupplierCode,
        Name: this.SupplierUnitName,
        TaxRegistrationNo: this.TaxRegistrationNo,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: e.menuid || MenuIdDate(),
        operationcode: e.OperationCode || '1',
      }
      GetExternalSupplierPageList(obj).then(res=>{
        if(res.MessageCode==0&&res.Data!=null){
           this.tableDatas=res.Data
           this.total=res.Total
        }else{
          this.tableDatas=[]
          this.total=0
        }
      })
    },
    //保存添加供应商
    SaveSupplierInformation(e){
      if(this.dialogTitle=='添加外部供应商'){
        e.menuid=MenuIdDate(),
        e.operationcode='1'
        AddExternalSuppliers(e).then(res=>{
          if(res.MessageCode==0){
            this.$message({
              type:'success',
              message:'添加成功'
            })
          this.showDlg=false
          this.GetExternalSupplierPageList(this.operatiOBj)
          }else{
            this.$message({
              type:'error',
              message:res.MessageContent
            })
          }
        })
      }else if(this.dialogTitle=='修改外部供应商'){
        const operating = this.$operatedata(this.operates,'Modify')
            e.Id=this.dialogId
            e.menuid=operating.MenuId,
            e.operationcode=operating.OperationCode
            EditExternalSupplier(e).then(res=>{
          if(res.MessageCode==0){
            this.$message({
              type:'success',
              message:'修改成功'
            })
          this.showDlg=false
          this.GetExternalSupplierPageList(this.operatiOBj)
          }else{
            this.$message({
              type:'error',
              message:res.MessageContent
            })
          }
        })
      }
    },
    //添加
    AddSupplierInformation(){
      this.dialogTitle='添加外部供应商'
      this.showDlg=true
    },
    //关闭弹窗
    CloseDialog(e){
      this.showDlg=e
    },
    //修改
    modify(e){
      this.dialogTitle='修改外部供应商'
      this.dialogId=e.Id
      this.$nextTick(()=>{
        this.showDlg=true
      })
    },
    //删除
    Delete(e,str){
    const operating = this.$operatedata(this.operates, str)
       this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
     let obj={
        Id:e.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
     }
     DeleteExternalSupplier(obj).then(res=>{
       if(res.MessageCode==0){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
       }else{
         this.$message({
            type: 'error',
            message: res.MessageContent
          });
       }
     })
      this.GetExternalSupplierPageList(this.operatiOBj)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //重置
    Reset(){
      this.SupplierCode=''
      this.SupplierUnitName=''
      this.TaxRegistrationNo=''
    },
    //查询
    searchtable(){
     if(this.tabidx==1){
        this.GetExternalSupplierPageList(this.operatiOBj)
      }else{
        this.GetInsideSupplierPageList(this.operatiOBj)
      }
    },
    //切换类型
    chooseschedule(e){
      this.tabidx = e
      this.currentPage = 1
      // this.Reset()
      if(this.tabidx==1){
        this.GetExternalSupplierPageList(this.operatiOBj)
      }else{
        this.GetInsideSupplierPageList(this.operatiOBj)
      }
    },
     // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
     if(this.tabidx==1){
        this.GetExternalSupplierPageList(this.operatiOBj)
      }else{
        this.GetInsideSupplierPageList(this.operatiOBj)
      }
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      if(this.tabidx==1){
        this.GetExternalSupplierPageList(this.operatiOBj)
      }else{
        this.GetInsideSupplierPageList(this.operatiOBj)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.SupplierOperation-Box{
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