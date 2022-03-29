<!--添加管理费及税金-->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" class="dialog-box" append-to-body :visible.sync="showCard" :show-close="false" :destroy-on-close="true" width="880px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-row :gutter="64">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="所关联工资结算单" prop="PayrollStatementId">
          <el-select v-model="PayrollStatementId" filterable clearable remote placeholder="请查询或下拉选择所关联工资结算单" @clear="clears" class="select-input" :loading="loading" @input="SelectChange" @change="changes(PayrollStatementId)">
            <el-option v-for="item in PayrollStatementList" :key="item.Id" :label="item.Title" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="所属客户" prop="CompanyId">
          <el-select v-model="CompanyId" filterable clearable remote disabled placeholder="请查询或下拉选择所属客户" class="select-input" :loading="loading">
            <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="所属项目" prop="ProjectId">
          <el-select v-model="dataObject.ProjectId" filterable clearable disabled remote placeholder="请先查询客户再选择所属项目" class="select-input" :loading="loading" @change="selectChange(dataObject.ProjectId)">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="项目类型">
          <el-select class="select-input" clearable disabled filterable remote v-model="dataObject.ProjectType" placeholder="请查询或下拉选择项目类型">
            <el-option v-for="(item,idx) in ProjectTypeList" :key="idx" :label="item.describe" :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
         </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="所属年月" class="Date">
          <el-date-picker v-model="dataObject.YearMonth" disabled type="month" placeholder="请选择所属年月">
          </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="入账年月" class="Date">
          <el-date-picker v-model="dataObject.EntryDate" disabled type="month" placeholder="请选择所属年月">
          </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="到款金额">
          <el-input v-model="dataObject.AmountReceived" clearable class="select-input" placeholder="请输入到款金额">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="开票金额">
          <el-input v-model="dataObject.InvoiceAmount" clearable class="select-input" placeholder="请输入开票金额">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="管理费">
          <el-input v-model="dataObject.ManagementExpense" clearable class="select-input" placeholder="请输入开票金额">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-if="this.dataObject.ProjectType!=1">
        <el-form-item label="税金总额">
          <el-input v-model="dataObject.TotalTax" disabled class="select-input" placeholder="请输入开票金额">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="增值税税额">
          <el-input v-model="dataObject.VATAmount" disabled class="select-input" placeholder="请输入开票金额">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button class="erpbtn" size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {GetManagementAndTaxesDetail,QueryManagementAndTaxes} from '@/api/CompensationServiceManagement.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'AddCard',
  props: {
    showAddCard: {
      type: Boolean,
    },
    dialogId:{
      type: Number,
    },
    dialogTitle: {
      type: String,
      default: '添加管理费及税金'
    },
    tempData: {
      type: Object,
    },
  },
  data () {
    return {
      showCard: false,
      Formrules: {},
      dataObject: {
        InvoiceAmount: '',
        ManagementExpense:'',
        TotalTax:'',
        VATAmount:'',
        YearMonth: '',
        EntryDate:'',
        AmountReceived: '',
        Remark: '',
        ProjectId: '',//所属项目
        DeductionAmount:'',
        ProjectType: '',//项目类型
      },
      Year: 0,
      Month: 0,
      EntryYear: 0,
      EntryMonth: 0,
      BusinessType:'',
      ProjectTypeList:[],
      loading: false,
      CompanyId: '',//客户ID
      PayrollStatementId:'',//工资结算单ID
      PayrollStatementList:'',//工资结算单列表
      CompanyPageList: [],//客户列表
      ProjectList: [],//项目列表
      ProjectId: null,
      RelatedCapitalFlow: null,
    }
  },
  watch: {
    showAddCard (newvalue, oldvalue) {
      this.showCard = newvalue
      if(this.showCard==false){
          this.PayrollStatementId=''
          this.CompanyId=''
          this.dataObject.YearMonth=''
          this.dataObject.EntryDate=''
          this.dataObject.ProjectId=''
          this.dataObject.ProjectType=''
          this.dataObject.AmountReceived=''
          this.dataObject.InvoiceAmount=''
          this.dataObject.ManagementExpense=''
          this.dataObject.TotalTax=''
          this.dataObject.VATAmount=''
      }
      if (this.dialogTitle == '修改管理费及税金'&&this.showCard==true){
         this.GetManagementAndTaxesDetail()
    }
    },
  },
  created () {
    this.QueryManagementAndTaxes()
  },
  methods: {
    clears(){
      this.CompanyId=''
      this.dataObject.YearMonth=''
      this.dataObject.EntryDate=''
      this.dataObject.ProjectId=''
      this.dataObject.ProjectType=''
    },
    //切换
    changes(e){
      this.PayrollStatementList.forEach(data=>{
        if(data.Id==e){
          console.log(data);
          this.CompanyPageList=[{
            Id:data.CompanyId,
            Name:data.CompanyName
          }]
          this.ProjectList=[{
            Id:data.ProjectId,
            Name:data.ProjectName
          }]
          this.ProjectTypeList=[{
            value:data.BusinessType,
            describe:data.BusinessTypeName,
          }]
          this.dataObject.YearMonth=data.SalaryYear+'/'+data.SalaryMonth
          this.dataObject.EntryDate=data.PeriodYear+'/'+data.PeriodMonth   
          this.$nextTick(()=>{
          this.CompanyId=data.CompanyId
          this.dataObject.ProjectId=data.ProjectId
          this.dataObject.ProjectType=data.BusinessType
          })
        }else{
          return false
        }
      })
         
    },
    //输入搜索
    SelectChange(){
      this.QueryManagementAndTaxes()
    },
    //根据结算单查询项目及客户数据
    QueryManagementAndTaxes(){
      let obj={
        Title:'',
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      QueryManagementAndTaxes(obj).then(res=>{
        if(res.MessageCode==0){
          this.PayrollStatementList=res.Data
        }else{
          this.PayrollStatementList=[]
        }
      })
    },
    //获取管理费及税金详情
    GetManagementAndTaxesDetail(){
         let obj={
           Id:this.dialogId,
           menuid: MenuIdDate(),
           operationcode: '1'
         }
         GetManagementAndTaxesDetail(obj).then(res=>{
           if(res.MessageCode==0){
             if(res.Data!=null){
               console.log(res.Data);
               this.CompanyPageList=[{
                 Id:res.Data.CompanyId,
                 Name:res.Data.CompanyName
               }]
               this.ProjectList=[{
                 Id:res.Data.ProjectId,
                 Name:res.Data.ProjectName
               }]
               this.ProjectTypeList=[{
                 value:res.Data.BusinessType,
                 describe:res.Data.BusinessTypeName,
               }]
               this.$nextTick(()=>{
                 this.CompanyId=res.Data.CompanyId
                 this.dataObject.ProjectId=res.Data.ProjectId
                 this.dataObject.ProjectType=res.Data.BusinessType
               })
               this.dataObject.YearMonth=res.Data.Year+'/'+res.Data.Month
               this.dataObject.EntryDate=res.Data.EntryYear+'/'+res.Data.EntryMonth
               this.dataObject.AmountReceived=res.Data.AmountReceived
               this.dataObject.InvoiceAmount=res.Data.InvoiceAmount
               this.dataObject.ManagementExpense=res.Data.ManagementExpense
               this.dataObject.TotalTax=res.Data.TotalTax
               this.dataObject.VATAmount=res.Data.VATAmount
             }
           }
         })
    },
    getRelated () {
      this.getRelatedCapitalFlow()
    },
    dialogtrue (e) {
      // 调用接口,保存数据
      this.$refs[e].validate((valid) => {
        if (valid) {
          let myDate = new Date(this.dataObject.YearMonth)
          this.Year = myDate.getFullYear()
          this.Month = myDate.getMonth() + 1
          let data = new Date(this.dataObject.EntryDate)
          this.EntryYear= data.getFullYear()
          this.EntryMonth= data.getMonth() + 1
          let obj={
             CompanyId: this.CompanyId,
             ProjectId: this.dataObject.ProjectId,
             BusinessType: this.dataObject.ProjectType,
             Year: this.Year,
             Month: this.Month,
             EntryYear: this.EntryYear,
             EntryMonth: this.EntryMonth,
             AmountReceived: this.dataObject.AmountReceived,
             InvoiceAmount: this.dataObject.InvoiceAmount,
             ManagementExpense: this.dataObject.ManagementExpense,
             TotalTax: this.dataObject.TotalTax,
             VATAmount: this.dataObject.VATAmount,
          }
          this.$emit('AddCardSave', obj)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    close () {
      this.$emit('closeDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.forms {
  .colors{
    width: 300px;
    height: 30px;
    line-height: 30px;
    background-color: #fff2f1;
    padding-left: 10px;
    border-radius: 7px;
  }
  /deep/ .el-form-item {
    margin-bottom: 12px;

    .el-form-item__label {
      width: 50%;
      text-align: left;
      line-height: 24px;
      color: #666666;
    }

    .el-form-item__content {
      margin-left: 0;
      width: 100%;
      .el-select {
        display: block;
        .el-input__suffix {
          top: 24px;
          height: 40px;
        }
      }
    }
  }
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
    }
    .el-input__inner {
      border: none;
      background: $erinputbgc;
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      label {
        &:nth-child(1) {
          margin-right: 120px;
        }
      }
    }
  }
}
</style>