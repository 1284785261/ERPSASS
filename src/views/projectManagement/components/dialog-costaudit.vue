<!-- 提交审核项目成本-->
<template>
  <div>
    <el-dialog :close-on-click-modal="true" :title="title" :visible.sync="dialogVisible" :show-close="false" :destroy-on-close="true" width="880px" class="dialog-box" @close="close">
       <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-row :gutter="64">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="结算单名称" prop="SettlementDocumentName">
          <el-input v-model="dataObject.SettlementDocumentName" disabled clearable class="select-input" placeholder="请输入结算单名称">
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="所属客户" prop="CompanyId">
          <el-select v-model="dataObject.CompanyId" filterable clearable remote disabled placeholder="请选择所属客户" class="select-input" :loading="loading">
            <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="所属项目" prop="ProjectId">
          <el-select v-model="dataObject.ProjectId" filterable clearable disabled remote placeholder="请选择所属项目" class="select-input" :loading="loading">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="项目类型" prop="ProjectType">
          <el-select class="select-input" clearable disabled filterable remote v-model="dataObject.ProjectType" placeholder="请选择项目类型">
            <el-option v-for="(item,idx) in ProjectTypeList" :key="idx" :label="item.Name" :value="item.Id" ></el-option>
          </el-select>
        </el-form-item>
         </el-col>
        <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="所属年月" class="Date" prop="YearMonth">
          <el-date-picker v-model="dataObject.YearMonth" disabled type="month" placeholder="请选择所属年月">
          </el-date-picker>
        </el-form-item>
        </el-col> -->
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="供应商名称" prop="SupplierName">
          <el-input v-model="dataObject.SupplierName" disabled clearable class="select-input" placeholder="请输入供应商名称">
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <p class="Texts"><i class="el-icon-warning" style="color:#d81e06;font-size:18px;margin-left:15px;"></i>当前供应商还有其他未结算科目，可以勾选一并发起结算 <span class="watchcode" @click="ViewUnsettledAccount">查看其他未结算科目</span></p>
        <div class="operate-table" v-if="Tabidx==1&&tableData.length>0">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="selected">
          <el-table-column align="center" :disabled="disableds" type="selection" width="55" fixed="left" label="全选" />
          <el-table-column align="center" prop="Code" min-width="100" fixed label="项目成本编号" />
          <el-table-column align="center" prop="Subject" label="科目名称" min-width="60" />
          <el-table-column align="center" label="所属年月" min-width="60">
            <template slot-scope="scope">
              <span>{{scope.row.Year+'年'+scope.row.Month+'月'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Fee" label="费用金额" min-width="60" />
          <el-table-column align="center" prop="Remark" label="费用说明" min-width="60" />
        </el-table>
      </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="入账年月" class="Date" prop="EntryDate">
          <el-date-picker v-model="dataObject.EntryDate" value-format="yyyy-MM" type="month" placeholder="请选择所属年月">
          </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="所属企业" prop="AffiliatedEnterprise">
          <el-select v-model="dataObject.AffiliatedEnterprise" filterable clearable remote placeholder="请选择所属企业" class="select-input" :loading="loading">
            <el-option v-for="item in AffiliatedEnterpriseList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer-multiple TextCtr">
        <el-button class="erpbtn" size="small" @click="close">取 消</el-button>
        <el-button class="erpbtn" size="small" @click="submitreview('ruleForm')">提交审核</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {GetBfCompanyPageList} from '@/api/BusinessSet.js'
import {GetProjectFeeBySupplierIdList} from '@/api/projectManagement.js'
// import Treeselect from '@riophae/vue-treeselect'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import axios from 'axios'
import qs from 'qs'
export default {
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
    },
    contentdata: {
      type: Object
    }
  },
  data () {
    return {
      disableds:false,
      OtherExpenseDetail:[],
      Tabidx:0,
      tableloading:false,
      tableData:[],
      dialogVisible: false,
      loading: false,
      dataObject: {
        SettlementDocumentName:'',
        CompanyId:'',
        ProjectId:'',
        ProjectType:'',
        YearMonth:'',
        SupplierName:'',
        SupplierId:'',
        EntryDate:'',
        AffiliatedEnterprise:'',
      },
      CurrentPage:1,
      PageSize:99,
      CompanyPageList:[],
      ProjectList:[],
      ProjectTypeList:[],
      AffiliatedEnterpriseList:[],
      Formrules: {
        SettlementDocumentName: [{ required: true, message: '请输入结算单名称', trigger: 'blur' }],
        CompanyId: [{ required: true, message: '请选择所属客户', trigger: 'change' }],
        ProjectId: [{ required: true, message: '请选择所属项目', trigger: 'change' }],
        ProjectType: [{ required: true, message: '请选择项目类型', trigger: 'change' }],
        YearMonth: [{ required: true, message: '请选择所属年月', trigger: 'blur' }],
        SupplierName: [{ required: true, message: '请输入供应商名称', trigger: 'change' }],
        SupplierId: [{ required: true, message: '请输入供应商名称', trigger: 'change' }],
        EntryDate: [{ required: true, message: '请选择所属年月', trigger: 'change' }],
        AffiliatedEnterprise: [{ required: true, message: '请选择所属企业', trigger: 'change' }],
      },
    }
  },
  created(){
    this.GetBfCompanyPageList()
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
       console.log(this.contentdata);
      if (this.dialogVisible==true) {
        this.CompanyPageList=[{
           Name:this.contentdata.CompanyName,
           Id:this.contentdata.CompanyId
        }]
        this.ProjectList=[{
           Name:this.contentdata.ProjectName,
           Id:this.contentdata.ProjectId
        }]
        this.ProjectTypeList=[{
           Name:this.contentdata.BusinessTypeText,
           Id:this.contentdata.BusinessType
        }]
        this.dataObject.YearMonth=this.contentdata.Year+'/'+this.contentdata.Month
        this.dataObject.SupplierName=this.contentdata.SupplierName
        this.dataObject.SupplierId=this.contentdata.SupplierId
        this.$nextTick(()=>{
          this.dataObject.SettlementDocumentName=this.contentdata.ProjectName+this.contentdata.Year+'年'+this.contentdata.Month+'月其他费用结算单',
          this.dataObject.CompanyId=this.contentdata.CompanyId
          this.dataObject.ProjectId=this.contentdata.ProjectId
          this.dataObject.ProjectType=this.contentdata.BusinessType
        })
      }
    }
  },
  methods: {
    selected(value){
      this.OtherExpenseDetail=[]
      for (let i = 0; i < value.length; i++) {
        this.OtherExpenseDetail.push({ProjectFeeId:value[i].Id})
      }
      console.log(this.OtherExpenseDetail);
    },
    //查看其他未结算科目
    ViewUnsettledAccount(){
      this.Tabidx++
      if(this.Tabidx%2==1){
       this.$nextTick(()=>{
          this.GetProjectFeeBySupplierIdList()
       })
      }else{
        this.Tabidx=0
        this.tableData=[]
      }
    },
    //获取项目费用列表供应商信息查询
    GetProjectFeeBySupplierIdList(){
      let obj={
         ProjectId: this.contentdata.ProjectId,
         SupplierType: this.contentdata.SupplierType,
         SupplierId: this.contentdata.SupplierId,
         menuid: MenuIdDate(),
         operationcode: '1'
      }
      showLoading()
      GetProjectFeeBySupplierIdList(obj).then(res=>{
        if(res.Data!=null&&res.MessageCode==0){
         this.tableData=res.Data
         this.tableData.forEach(data=>{
           setTimeout(()=>{
             if(data.Id==this.contentdata.Id){
             this.$refs.multipleTable.toggleRowSelection(data,true);
           }
           },500)
           hideLoading()
         })
        }else{
          this.tableData=[]
        }
      })
    },
    //投标单位
    GetBfCompanyPageList(){
      let obj={
        Name: "",
        Level: -1,
        Status: 1,
        PageIndex: this.CurrentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBfCompanyPageList(obj).then(res=>{
        if(res.Data.length>0&&res.MessageCode==0){
          this.AffiliatedEnterpriseList=res.Data
          console.log(this.AffiliatedEnterpriseList);
        }
      })
    },
    // 关闭弹框
    close () {
      this.dataObject= {
        SettlementDocumentName:'',
        CompanyId:'',
        ProjectId:'',
        ProjectType:'',
        YearMonth:'',
        SupplierName:'',
        SupplierId:'',
        EntryDate:'',
        AffiliatedEnterprise:'',
      },
      this.$refs['ruleForm'].resetFields();
      this.$emit('closeauditdialog')
    },
    // 提交审核
    submitreview () {
      this.$refs.ruleForm.validate((v) => {
        if (v) {
          if(this.OtherExpenseDetail.length==0){
            this.OtherExpenseDetail.push({ProjectFeeId:this.contentdata.Id})
            console.log(this.OtherExpenseDetail);
          }
          let obj = {
        Name: this.dataObject.SettlementDocumentName,
        ProjectId: this.dataObject.ProjectId,
        // SupplierId:this.dataObject.SupplierId,
        BfCompanyId: this.dataObject.AffiliatedEnterprise,
        EntryYear: Number(this.dataObject.EntryDate.split('-')[0]),
        EntryMonth: Number(this.dataObject.EntryDate.split('-')[1]),
        OtherExpenseDetail:this.OtherExpenseDetail,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
          this.$emit('savecostaudit', obj, true)
        }
      })
    }
  },
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
  /deep/.el-dialog__footer{
    text-align: center !important;
  }
  .Texts{
    background-color: #fff2f1;
    margin: 0px 0px 18px 0px;
    padding: 7px 0px;
    width: 550px;
    border-radius: 5px;
  }
   .watchcode{
      color: #1588F8;
      cursor: pointer;
      margin-left: 20px;
    }
</style>