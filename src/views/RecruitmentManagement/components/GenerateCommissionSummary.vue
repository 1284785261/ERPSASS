<!--生成提成汇总表-->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="生成提成汇总表" class="dialog-box" append-to-body :visible.sync="ShowDialog" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms">
        <el-form-item label="提成汇总表名称" prop="StaffName">
          <el-input v-model="dataObject.CommissionSummaryName" size="mini" />
        </el-form-item>
        <el-form-item label="提成发放月份" prop="ProjectName" class="Date">
          <el-date-picker v-model="dataObject.RoyaltyPaymentDate" clearable value-format="yyyy-MM" type="month" placeholder="请选择结算年月">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button round class="erpbtn" size="small" @click="Save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { MenuIdDate, showLoading, hideLoading } from "@/utils/CustomValidation";
import {AddRecruitRecommendDrawAPercentageSum} from '@/api/RecruitmentManagement.js'
export default {
  data() {
    return {
      ShowDialog:false,
      dataObject:{
        CommissionSummaryName:'',
        RoyaltyPaymentDate:'',
      },
      Year:'',
      Month:'',
    }
  },
  props:["GenerateVisible","DetailedList"],
  watch:{
    GenerateVisible(newVal,oldVal){
      this.ShowDialog=newVal
      if(this.ShowDialog==false){
        this.dataObject = this.$options.data().dataObject
      }
    }
  },
  methods: {
    //取消
    close(){
      this.$emit('CloseDialog',false)
    },
    //保存
    Save(){
      if(this.dataObject.RoyaltyPaymentDate!=null){
        this.Year=this.dataObject.RoyaltyPaymentDate.split('-')[0]
        this.Month=this.dataObject.RoyaltyPaymentDate.split('-')[1]
      }else{
        this.Year=''
        this.Month=''
      }
      let obj={
        Name: this.dataObject.CommissionSummaryName,
        Year: this.Year,
        Month: this.Month,
        DetailedList:this.DetailedList,
        menuid: MenuIdDate(),
        operationcode: "1",
      }
      AddRecruitRecommendDrawAPercentageSum(obj).then(res=>{
        if(res.MessageCode==0){
        this.close()
        const { href } = this.$router.resolve({
        path: '/RecruitmentManagement/CommissionSummary',
      })
      window.open(href, '_blank')
        }else{
          this.$message({
            type:'error',
            message:res.MessageContent
          })
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  position: relative;
  /deep/ .el-form-item {
    width: 100%;
    float: left;
    .el-form-item__label {
      width: 100%;
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
    &:nth-child(odd) {
      padding-right: 20px;
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      height: 26px;
      label {
        &:nth-child(1) {
          margin-right: 60px;
        }
      }
    }
  }
  /deep/ .Date {
    .el-date-editor {
      width: 95%;
    }
    .el-input__inner {
      border: none;
      background: $erinputbgc;
    }
  }
  /deep/ .textarea-note {
    width: 100%;
    .el-textarea.is-disabled .el-textarea__inner{
      background: $erinputbgc;
    }
  }
}
</style>