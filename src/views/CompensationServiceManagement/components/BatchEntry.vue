<!-- 是否批量入职办理 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="titles" class="dialog-box" append-to-body :visible.sync="showBatchEntry" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm2" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="入职公司" prop="BfCompany">
          <el-select ref="company" v-model="dataObject.BfCompany" filterable remote clearable placeholder="搜索选择入职公司" :loading="loading" :remote-method="remoteBfCompany" @clear="clearBfCompany">
            <el-option v-for="item in BfCompanyList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联项目" prop="ProjectName">
          <el-input v-model="dataObject.ProjectName" disabled clearable class="select-input" placeholder="" />
        </el-form-item>
        <el-form-item label="项目入职时间" prop="EntyTime" class="Date">
          <el-date-picker v-model="dataObject.EntyTime" value-format="yyyy-MM-dd" type="date" placeholder="请选择项目入职时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="社保缴纳" prop="SiStatus" class="State">
          <el-radio-group v-model="dataObject.SiStatus">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="社保缴纳时间" prop="SiStart" class="Date" v-if="dataObject.SiStatus == '1'">
          <el-date-picker v-model="dataObject.SiStart" type="month" placeholder="请选择社保缴纳时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="公积金缴纳" prop="FundStatus" class="State">
          <el-radio-group v-model="dataObject.FundStatus">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公积金缴纳时间" prop="FundStart" class="Date" v-if="dataObject.FundStatus == '1'">
          <el-date-picker v-model="dataObject.FundStart" type="month" placeholder="请选择公积金缴纳时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="医保缴纳" prop="MedicalStatus" class="State">
          <el-radio-group v-model="dataObject.MedicalStatus">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="医保缴纳时间" prop="MedicalStart" class="Date" v-if="dataObject.MedicalStatus == '1'">
          <el-date-picker v-model="dataObject.MedicalStart" type="month" placeholder="请选择医保缴纳时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button class="erpbtn" size="small" @click="dialogtrue('ruleForm2')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import { GetBfCompanyPageList } from '@/api/BusinessSet.js'
import qs from 'qs'
export default {
  name: 'BatchEntry',
  props: {
    showBatchEntrys: {
      type: Boolean,
    },
    ProjectName: {
      type: String,
    },
    BatchEntryTitle: {
      type: String,
    },
  },
  data () {
    return {
      showBatchEntry: false,
      Formrules: {
        BfCompany: [
          { required: true, message: '请选择入职公司', trigger: 'change' },
        ],
        EntyTime: [
          { required: true, message: '请选择项目入职时间', trigger: 'change' },
        ],
      },
      dataObject: {
        BfCompany: '',
        CompanyName: '',
        ProjectName: '',
        EntyTime: '',
        SiStatus: '1',
        SiStart: '',
        SiStartYear: '',
        SiStartMonth: '',
        FundStatus: '1',
        FundStart: '',
        FundStartYear: '',
        FundStartMonth: '',
        MedicalStatus: '1',
        MedicalStart: '',
        MedicalStartYear: '',
        MedicalStartMonth: ''
      },
      loading: true,
      titles: '',
      BfCompanyList: []
    }
  },
  watch: {
    showBatchEntrys (newvalue, oldvalue) {
      this.showBatchEntry = newvalue
      this.dataObject = this.$options.data().dataObject
      this.titles = this.BatchEntryTitle
      this.dataObject.ProjectName = this.ProjectName
      this.remoteBfCompany()
    }
  },
  created () {
  },
  methods: {
    //选择用工单位
    remoteBfCompany (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          PageIndex: 1,
          PageSize: 99,
          Name: query,
          Status: 1,
          Level: -1,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetBfCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.BfCompanyList = response.Data
            } else {
              this.BfCompanyList = []
            }
          } else {
            this.BfCompanyList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearBfCompany () {
      this.remoteBfCompany()
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.dataObject.SiStart) {
            this.dataObject.SiStartYear = this.dataObject.SiStart.getFullYear()
            this.dataObject.SiStartMonth = this.dataObject.SiStart.getMonth() + 1
          }
          if (this.dataObject.FundStart) {
            this.dataObject.FundStartYear = this.dataObject.FundStart.getFullYear()
            this.dataObject.FundStartMonth = this.dataObject.FundStart.getMonth() + 1
          }
          if (this.dataObject.MedicalStart) {
            this.dataObject.MedicalStartYear = this.dataObject.MedicalStart.getFullYear()
            this.dataObject.MedicalStartMonth = this.dataObject.MedicalStart.getMonth() + 1
          }
          this.$emit('AddBatchEntry', this.dataObject)
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
      this.$emit('closeAddBatchEntry', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.forms {
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