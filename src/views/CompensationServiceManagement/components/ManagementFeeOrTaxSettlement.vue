<!--生成管理费/税金结算单-->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" class="dialog-box" append-to-body :visible.sync="showCard" :show-close="false" :destroy-on-close="true" width="880px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-row :gutter="64">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="结算单名称">
          <el-input v-model="dataObject.SettlementName" clearable class="select-input" placeholder="请输入到款金额">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="选择客户" prop="CompanyId">
          <el-select v-model="CompanyId" filterable clearable remote placeholder="请查询或下拉选择所属客户" class="select-input" @clear="clearCompany" :remote-method="remoteCompany" :loading="loading" @change="SelectCustom(CompanyId)">
            <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="选择项目" prop="ProjectId">
          <el-select v-model="dataObject.ProjectId" filterable clearable remote placeholder="请先查询客户再选择所属项目" class="select-input" @clear="clearProject" :remote-method="remoteProject" :loading="loading" @change="selectChange(dataObject.ProjectId)">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="项目类型">
          <el-select size="mini" class="select-input" clearable disabled v-model="dataObject.ProjectType">
            <el-option v-for="(item,idx) in ProjectTypeList" :key="idx" :label="item.describe" :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
         </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="入账年月" class="Date">
          <el-date-picker v-model="dataObject.EntryDate" type="month" placeholder="请选择所属年月">
          </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="所属年月" class="Date">
          <el-date-picker v-model="dataObject.YearMonth" type="month" placeholder="请选择所属年月">
          </el-date-picker>
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
          <el-input v-model="dataObject.TotalTax" clearable class="select-input" placeholder="请输入开票金额">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="增值税税额">
          <el-input v-model="dataObject.VATAmount" clearable class="select-input" placeholder="请输入开票金额">
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
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetProjectList, GetProjectBusinessType } from '@/api/projectManagement.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'AddCard',
  props: {
    showAddCard: {
      type: Boolean,
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
        SettlementName:'',
        InvoiceAmount: '',
        ManagementExpense:'',
        TotalTax:'',
        VATAmount:'',
        YearMonth: '',
        EntryDate:'',
        AmountReceived: '',
        Remark: '',
        ProjectId: '',
        DeductionAmount:'',
        ProjectType: '',
      },
      Year: 0,
      Month: 0,
      EntryYear: 0,
      EntryMonth: 0,
      BusinessType:'',
      ProjectTypeList:[],
      loading: false,
      CompanyId: '',
      CompanyPageList: [],//客户列表
      ProjectList: [],//项目列表
      ProjectId: null,
      RelatedCapitalFlow: null,
    }
  },
  watch: {
    showAddCard (newvalue, oldvalue) {
      this.showCard = newvalue
      if (this.dialogTitle == '修改挂账') {
        this.remoteCompany()
      } else {
        this.dataObject = this.$options.data().dataObject
      }
    },
    CompanyId (newval, oldVal) {
      this.CompanyId = newval
      this.dataObject.ProjectType=''
      this.dataObject.DeductionAmount=''
      this.dataObject.ProjectId = null
      this.RelatedCapitalFlowList = []
      if (this.CompanyId != '') {
        this.remoteProject()
        this.GetProjectBusinessType()
      } else {
        this.dataObject.ProjectId = null
        this.RelatedCapitalFlowList = []
      }
    },
  },
  created () {
    this.remoteCompany()
  },
  methods: {
    selectChange(e){
       this.ProjectList.forEach(data=>{
         if(e==data.Id){
           this.dataObject.ProjectType=data.BusinessType
         }
       })
    },
    SelectCustom (id) { },
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
    //查询公司列表
    remoteCompany (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          Name: query,
          PageIndex: 1,
          PageSize: 99,
          Type: -1,
          Status: 1,
          menuid: MenuIdDate(),
          operationcode: 1
        }
        GetCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.CompanyPageList = response.Data
            } else {
              this.dataObject.ProjectId = ''
              this.CompanyPageList = []
            }
          } else {
            this.dataObject.ProjectId = ''
            this.CompanyPageList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearCompany () {
      this.dataObject.ProjectId = ''
      this.dataObject.ProjectMoneyDrawId = ''
      this.RelatedCapitalFlow = null
      // this.RelatedCapitalFlowList=[]
      this.ProjectList = []
      this.remoteCompany()
    },
    //获取项目下拉列表
    remoteProject (val) {
      let data = {
        Name: val,
        CompanyId: this.CompanyId || '',
        BusinessType: '-1',
        Priority: '-1',
        Status: '-1',
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetProjectList(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ProjectList = response.Data
          } else {
            this.ProjectList = []
            this.dataObject.ProjectId = ''
            this.RelatedCapitalFlow = null
            this.RelatedCapitalFlowList = []
          }

        } else {
          this.ProjectList = []
          this.dataObject.ProjectId = ''
          this.RelatedCapitalFlow = null
          this.RelatedCapitalFlowList = []
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    getRelated () {
      this.getRelatedCapitalFlow()
    },
    clearProject () {
      this.dataObject.ProjectId = ''
      this.RelatedCapitalFlowList = []
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
          this.ProjectList=[]
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
      this.RelatedCapitalFlow = null
      this.CompanyId = null
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