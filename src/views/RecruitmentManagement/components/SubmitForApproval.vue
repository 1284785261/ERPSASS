<!--提交审批-->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="提交审批" class="dialog-box" append-to-body :visible.sync="showDlg" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="经办人" prop="Handler">
          <el-input v-model="dataObject.Handler" disabled></el-input>
        </el-form-item>
        <el-form-item label="经办部门" prop="HandlingDepartment">
          <el-select v-model="dataObject.HandlingDepartment" filterable clearable remote placeholder="请选择经办部门" class="select-input" :loading="loading">
            <el-option  v-for="item in ApplicationDepartmentList"
                    :key="item.OrgId"
                    :label="item.FullOrgName"
                    :value="item.OrgId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button class="erpbtn" size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetOrgByUserId } from "@/api/SystemSetting.js";
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
export default {
  data() {
    return {
      Formrules:{
        Handler:[{required: true, message: '请选择经办人', trigger: 'change'}],
        HandlingDepartment:[{required: true, message: '请选择经办部门', trigger: 'change'}],
      },
        dataObject:{
          Handler:'',
          HandlingDepartment:'',
        },
        Id:this.SFAId,
        loading:false,
        showDlg:false,
        ApplicationDepartmentList:[],
    }
  },
  props:["showdlg","SFAId"],
  watch:{
    showdlg(newVal,oldVal){
      this.showDlg=newVal
      if(this.showDlg==false){
        this.dataObject.HandlingDepartment=''
      }
    }
  },
  created() {
    this.Id=JSON.parse(localStorage.getItem("Current")).currentId
    this.dataObject.Handler=JSON.parse(localStorage.getItem("Current")).currentUser
    this.GetOrgByUserId()
  },
  methods:{
    //获取用户组织列表
    GetOrgByUserId() {
      let obj = {
        SysUserId: JSON.parse(localStorage.getItem("Current")).currentId,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetOrgByUserId(obj).then((res) => {
        if (res.MessageCode == 0 && res.Data.length > 0) {
          this.ApplicationDepartmentList = res.Data;
        } else {
          this.ApplicationDepartmentList = [];
        }
      });
    },
     close(){
       this.$emit('closeDlg',false)
     },
     dialogtrue(Form){
        this.$refs[Form].validate((valid) => {
        if (valid) {
          let obj={
             Id: this.SFAId,
             HandleSysUserId: this.Id,
             HandleSysOrgId: this.dataObject.HandlingDepartment,
             Status: 1,
             menuid: MenuIdDate(),
             operationcode: "1",
          }
          this.$emit('SFASave',obj)
        }
        }) 
     }
  },
}
</script>
<style lang="scss">
      // 表格样式
    .el-form-item {
      width: 100%;
      margin-bottom: 20px;
      .el-form-item__label {
        line-height: 14px;
        font-size: $f14;
        color: $erp666;
        font-weight: 400;
        padding-bottom: 8px;
      }
      .el-form-item__content {
        // width: calc(100% - 64px);
        .el-input__inner {
          background-color: $erinputbgc;
        }
        .el-select {
          width: 100%;
        }
        .el-date-editor--datetimerange {
          width: 100%;
          border: 1px solid #fff;
        }
      }
      input {
        background: #f0f4fa;
        border: none;
        height: 40px;
        line-height: 40px;
      }
      textarea {
        background: #f0f4fa;
        border: none;
      }

      // 地址样式
      &.path {
        .el-form-item__content {
          max-width: 100%;
          .el-select {
            max-width: 240px;
            margin-right: 24px;
            margin-bottom: 24px;
          }
          .el-input {
            max-width: 336px;
          }
        }
      }
      // 文本框样式
      &.text {
        .el-form-item__content {
          max-width: 100%;
          .el-textarea__inner {
            resize: none;
            background-color: $erinputbgc;
          }
          .el-input__count {
            bottom: 2px;
            height: 30px;
            line-height: 30px;
            right: 20px;
            background: $erinputbgc;
          }
        }
      }
      &.text2 {
        .el-form-item__content {
          .el-textarea__inner {
            resize: none;
            background-color: $erinputbgc;
          }
          .el-input__count {
            bottom: 2px;
            height: 30px;
            line-height: 30px;
            right: 20px;
            background: $erinputbgc;
          }
        }
      }
      // 两个时间
      &.dategroup {
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
          .el-date-editor {
            max-width: 160px;
            display: inline-block;
          }
        }
      }
      // 时间选择器样式
      &.datetime {
        .el-form-item__content {
          .el-date-editor {
            width: 100%;
          }
        }
      }
      // vue-tree-input样式
      &.vue-tree {
        .el-form-item__content {
          .vue-treeselect {
            // min-height: 40px;
            height: 40px;
            .vue-treeselect__control {
              height: 40px;
              background-color: $erinputbgc;
              .vue-treeselect__value-container {
                height: 40px;
              }
              .vue-treeselect__control-arrow-container {
                height: 40px;
              }
            }
          }
        }
      }
      // 添加客户关联关系样式
      &.addrelation {
        .el-form-item__content {
          > span {
            cursor: pointer;
            > .svg-icon {
              margin-right: 10px;
            }
          }
        }
      }
    }
</style>