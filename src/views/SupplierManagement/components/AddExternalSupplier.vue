<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" class="dialog-box" append-to-body :visible.sync="showDialog" :show-close="false" :destroy-on-close="true" width="880px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-row :gutter="64">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="供应商名称" prop="Name">
              <el-input v-model="dataObject.Name" size="small" clearable class="select-input" placeholder="请输入供应商名称" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="税务登记号" prop="TaxRegistrationNumber">
              <el-input v-model="dataObject.TaxRegistrationNumber" size="small" clearable class="select-input" placeholder="请输入税务登记号" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="账户类型" prop="AccountType">
              <br>
              <el-radio-group v-model="dataObject.AccountType">
                <el-radio label="0">对公账户</el-radio>
                <el-radio label="1">个人账户</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="开户机构名称" prop="AccountOpeningInstitutionName">
              <el-input v-model="dataObject.AccountOpeningInstitutionName" size="small" clearable class="select-input" placeholder="请输入真实姓名，公司名或组织机构名称" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="账号类别" prop="AccountDifference">
              <el-select v-model="dataObject.AccountDifference" size="small" class="select-input" style="width:100%">
                  <el-option v-for="(item,idx) in AccountDifferenceList" :key="idx" :label="item.describe" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-if="dataObject.AccountDifference===0||dataObject.AccountDifference===2">
            <el-form-item label="银行卡号" prop="BankCardNo">
              <el-input v-model="dataObject.BankCardNo" size="small" clearable class="select-input" placeholder="请输入银行卡号" />
            </el-form-item>
          </el-col>
           <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-if="dataObject.AccountDifference===0">
            <el-form-item label="开户网点" prop="AccountOpeningOutlet">
              <el-input v-model="dataObject.AccountOpeningOutlet" size="small" clearable class="select-input" placeholder="请输入开户网点" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-if="dataObject.AccountDifference===1">
            <el-form-item label="支付宝账号" prop="BankCardNo">
              <el-input v-model="dataObject.BankCardNo" size="small" clearable class="select-input" placeholder="请输入支付宝账号" />
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
import {GetExternalSupplierEnumAccountClass,GetExternalSupplierInfo} from '@/api/Supplier.js'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
export default {
  props:{
    showDlg: {
      type: Boolean,
    },
    dialogId:{
      type: Number,
    },
    dialogTitle: {
      type: String,
      default: '添加外部供应商'
    },
  },
  watch:{
    showDlg(newVal,Val){
      this.showDialog=newVal
      if(this.showDialog==false){
        this.dataObject.Name=''
        this.dataObject.TaxRegistrationNumber=''
        this.dataObject.AccountType=''
        this.dataObject.AccountOpeningInstitutionName=''
        this.dataObject.AccountDifference=''
        this.dataObject.BankCardNo=''
        this.dataObject.AccountOpeningOutlet=''
        this.dataObject.AlipayAccount=''
      }
      if(this.dialogTitle=='修改外部供应商'&&this.showDialog==true){
        this.GetExternalSupplierInfo()
      }
    },
  },
  data() {
    return {
      showDialog:false,
      dataObject:{
        Name:'',
        TaxRegistrationNumber:'',
        AccountType:'',
        AccountOpeningInstitutionName:'',
        AccountDifference:'',
        BankCardNo:'',
        AccountOpeningOutlet:'',
        AlipayAccount:'',
      },
      AccountDifferenceList:[],
      Formrules: {
          Name: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
        ],
        TaxRegistrationNumber: [
          { required: true, message: '请输入税务登记号', trigger: 'blur' },
        ],
        AccountType: [
          { required: true, message: '请先选择账户类型后提交', trigger: 'change' },
        ],
        AccountOpeningInstitutionName: [
          { required: true, message: '请先输入开户机构名称', trigger: 'blur' },
        ],
        AccountDifference: [
          { required: true, message: '请选择账号类别', trigger: 'change' },
        ],
        BankCardNo: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
        ],
        AccountOpeningOutlet: [
          { required: true, message: '请输入开户网点', trigger: 'blur' },
        ],
        AlipayAccount: [
          { required: true, message: '请输入支付宝账号', trigger: 'blur' },
        ],
      },
    }
  },
  created(){
    this.GetExternalSupplierEnumAccountClass()
  },
  methods:{
    //获取外部供应商详情
    GetExternalSupplierInfo(){
        let obj={
          Id:this.dialogId,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetExternalSupplierInfo(obj).then(res=>{
          if(res.MessageCode==0&&res.Data!=null){
            let Datas=res.Data
            this.dataObject.Name=Datas.Name
            this.dataObject.TaxRegistrationNumber=Datas.TaxRegistrationNo
            this.dataObject.AccountType=Datas.AccountType.toString()
            this.dataObject.AccountOpeningInstitutionName=Datas.AccountName
            this.dataObject.AccountDifference=Datas.AccountClass
            this.dataObject.BankCardNo=Datas.AccountCode
            this.dataObject.AccountOpeningOutlet=Datas.AccountBranch
          }
        })
    },
    //获取账户类别
    GetExternalSupplierEnumAccountClass(){
      let obj={
          menuid: MenuIdDate(),
          operationcode: '1'
      }
      GetExternalSupplierEnumAccountClass(obj).then(res=>{
             this.AccountDifferenceList=res
      })
    },
    //关闭
    close(){
      this.$emit('CloseDialog',false)
    },
    //保存
    dialogtrue(form){
      this.$refs[form].validate((valid) => {
        if (valid) {
          let obj={
            Name:this.dataObject.Name ,
            TaxRegistrationNo:this.dataObject.TaxRegistrationNumber,
            AccountType:Number(this.dataObject.AccountType),
            AccountName:this.dataObject.AccountOpeningInstitutionName,
            AccountClass:this.dataObject.AccountDifference,
            AccountCode: this.dataObject.BankCardNo,
            AccountBranch: this.dataObject.AccountOpeningOutlet,
            SysUserId:JSON.parse(localStorage.getItem('Current')).currentId
          }
          this.$emit('SaveSupplierInformation',obj)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>

</style>