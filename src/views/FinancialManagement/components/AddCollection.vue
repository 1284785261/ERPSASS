//添加回款
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="CollectionTitle" class="dialog-box" append-to-body :visible.sync="showCollection" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="rules" class="forms">
        <el-form-item label="打款客户" prop="CompanyId">
          <el-select v-model="dataObject.CompanyId" filterable clearable remote placeholder="请查询或下拉选择打款客户" class="select-input" @clear="clearCompany" :remote-method="remoteCompany" :loading="loading">
            <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款企业" prop="BfCompanyId">
          <el-select v-model="dataObject.BfCompanyId" filterable clearable remote placeholder="请查询或下拉选择收款企业" class="select-input" @clear="clearInsurance" :remote-method="remoteInsurance" @change="ChangeInsurance" :loading="loading">
            <el-option v-for="item in BfInsuranceList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打款客户银行账号" prop="CompanyAccount">
          <el-input v-model="dataObject.CompanyAccount" clearable size="small" placeholder="请输入打款客户银行账号" />

        </el-form-item>
        <el-form-item label="收款银行账号" prop="Account">
          <el-select v-model="dataObject.Account" filterable clearable placeholder="请输入收款银行账号" class="select-input" @change="ChangeAccount">
            <el-option v-for="item in AccountList" :key="item.Id" :label="item.Account" :value="item.Account">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打款客户银行名称" prop="CompanyBankName">
          <el-input v-model="dataObject.CompanyBankName" clearable size="small" placeholder="请输入打款客户银行名称" />
        </el-form-item>
        <el-form-item label="收款银行名称" prop="BankName">
          <el-input v-model="dataObject.BankName" clearable size="small" placeholder="请输入收款银行名称" />
        </el-form-item>
        <el-form-item label="银行流水号" prop="Sn">
          <el-input v-model="dataObject.Sn" size="small" clearable placeholder="请输入银行流水号" />
        </el-form-item>
        <el-form-item label="流水金额" prop="Amount">
          <el-input v-model="dataObject.Amount" clearable size="small" placeholder="请输入流水金额">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="到账时间" prop="PayTime" class="Date">
          <el-date-picker v-model="dataObject.PayTime" format="yyyy-MM-dd" clearable type="date" placeholder="请选择到账时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="Remark" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="dataObject.Remark" size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button round class="erpbtn" size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetBfCompanyPageList } from '@/api/BusinessSet.js'
import { GetBfBankList } from '@/api/FinancialManagement.js'
import { MenuIdDate } from '@/utils/CustomValidation.js'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'AddCollection',
  props: ['showAddCollection', 'CollectionTitle', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        CompanyId: '',
        CompanyBankName: '',
        CompanyAccount: '',
        BfCompanyId: '',
        BankName: '',
        Account: '',
        Sn: '',
        Amount: '',
        PayTime: '',
        Remark: '',
        MoneyRecordType :1,
      },
      loading: false,
      uploadLoading: false,
      showCollection: false,
      BfInsuranceList: [],
      CompanyPageList: [],
      AccountList: [],
      rules: {
        CompanyId: [
          { required: true, message: '请选择打款客户', trigger: 'change' }
        ],
        BfCompanyId: [
          { required: true, message: '请选择收款企业', trigger: 'change' }
        ],
        Amount: [
          { required: true, message: '请输入流水金额', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    showAddCollection (newvalue, oldvalue) {
      this.showCollection = newvalue
      if (this.CollectionTitle == '修改收款流水') {
        this.dataObject = this.tempData
        this.remoteCompany(this.dataObject.CompanyName)
        console.log(this.dataObject);
      } else if(this.CollectionTitle == '添加收款流水') {
        this.dataObject = this.$options.data().dataObject
        // console.log(this.dataObject);
        this.remoteCompany()
      }else if(this.CollectionTitle =='添加补贴回款'){
        this.dataObject.MoneyRecordType=2
        this.remoteCompany()
      }
    }
  },
  created () {
    this.remoteInsurance()

  },
  methods: {
    //查询打款客户列表
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
          operationcode: '1'
        }
        GetCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.CompanyPageList = response.Data
            } else {
              this.CompanyPageList = []
            }
          } else {
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
      this.ProjectList = []
      this.remoteCompany()
    },
    remoteInsurance (query) {
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
              this.BfInsuranceList = response.Data
            } else {
              this.BfInsuranceList = []
            }
          } else {
            this.BfInsuranceList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearInsurance () {
      this.remoteInsurance()
    },
    //选择收款企业获取银行信息
    ChangeInsurance (Id) {
      if (Id) {
        let data = {
          BfCompanyId: Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetBfBankList(qs.stringify(data)).then(response => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.AccountList = response.Data
            } else {
              this.dataObject.Account = ''
              this.dataObject.BankName = ''
              this.AccountList = []
            }
          } else {
            this.dataObject.Account = ''
            this.dataObject.BankName = ''
            this.AccountList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    //选择银行账号获取银行名称
    ChangeAccount (val) {
      if (val) {
        this.dataObject.BankName = this.AccountList[this.AccountList.findIndex(item => item.Account == val)].BankName
      } else {
        this.dataObject.BankName = ''
      }
    },
    //导入员工
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('AddCollectionSave', this.dataObject)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //关闭导入事件
    close () {
      this.$refs.ruleForm.resetFields()
      this.$emit('closeAddCollection', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  position: relative;
  /deep/ .el-form-item {
    width: 50%;
    float: left;
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
        .el-input {
          .el-input__inner {
            height: 36px;
            line-height: 36px;
          }
          .el-input__suffix {
            top: 24px;
            height: 40px;
            line-height: 40px;
          }
        }
      }
      .el-input {
        font-size: 14px;
        .el-input__inner {
          height: 36px;
          line-height: 36px;
        }
        .el-input__suffix {
          height: 36px;
          line-height: 36px;
        }
      }
    }
    & {
      padding-right: 20px;
    }

    // &:first-child + .el-form-item {
    //   padding-right: 20px;
    // }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      label {
        &:nth-child(1) {
          margin-right: 60px;
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
  /deep/ .textarea-note {
    width: 100%;
  }
}
</style>