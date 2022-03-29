<!-- 添加公积金或者社保窗口 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" class="dialog-box" append-to-body :visible.sync="showAccount" :show-close="false" :destroy-on-close="true" width="600px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms">
        <el-form-item label="账号" prop="Account">
          <el-input v-model="dataObject.Account" clearable placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="开户主体公司" prop="BfCompanyId">
          <el-select v-model="dataObject.BfCompanyId" filterable clearable remote placeholder="请查询或下拉选择开户主体公司" @clear="clearCompany" :remote-method="remoteCompany" :loading="loading">
            <el-option v-for="item in MainBbodyList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="所属客户" prop="CompanyId">
          <el-select v-model="dataObject.CompanyId" filterable clearable remote placeholder="请查询或下拉选择所属客户" @clear="clearCustomer" :remote-method="remoteCustomer" :loading="loading">
            <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="开户类型" prop="Type">
          <el-select v-model="dataObject.Type" disabled clearable placeholder="请选择开户类型">
            <el-option v-for="item in AccountTypes" :key="item.value" :label="item.describe" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户机构名称" prop="Institution">
          <el-input v-model="dataObject.Institution" clearable placeholder="请输入开户机构名称" />
        </el-form-item>
        <el-form-item label="开户机构地址" prop="Address">
          <el-input v-model="dataObject.Address" clearable placeholder="请输入开户机构地址" />
        </el-form-item>
        <el-form-item label="开户机构电话" prop="Tel">
          <el-input v-model="dataObject.Tel" clearable placeholder="请输入开户机构电话" />
        </el-form-item>
        <el-form-item label="开户机构联系人" prop="ContactPerson">
          <el-input v-model="dataObject.ContactPerson" clearable placeholder="请输入开户机构联系人" />
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
import { MenuIdDate } from '@/utils/CustomValidation'
import { GetBfInsuranceFundEnumType } from '@/api/CompensationServiceManagement.js'
import qs from 'qs'
export default {
  name: 'OpenAccount',
  props: ['showOpenAccount', 'dialogTitle', 'diglogType', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        BfCompanyId: '',
        CompanyId: '',
        Type: '',
        Account: '',
        Institution: '',
        Address: '',
        Tel: '',
        ContactPerson: ''
      },
      loading: false,
      showAccount: false,
      AccountTypes: [],
      MainBbodyList: [],//主体公司
      CompanyPageList: [],//客户公司列表
      rules: {
      }
    }
  },
  watch: {
    showOpenAccount (newvalue, oldvalue) {
      this.showAccount = newvalue
      if (this.dialogTitle == '修改社保账户' || this.dialogTitle == '修改公积金账户' || this.dialogTitle == '修改医保账户') {
        this.dataObject = this.tempData
        // if (this.tempData.CompanyName) {
        //   this.remoteCustomer(this.dataObject.CompanyName)
        // }
      } else {
        this.dataObject = this.$options.data().dataObject
        // this.remoteCustomer()
      }
      this.dataObject.Type = this.diglogType
    }
  },
  created () {
    this.remoteCompany()
    // this.remoteCustomer()
    this.getType()
  },
  methods: {
    //获取开户类型
    getType () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBfInsuranceFundEnumType(qs.stringify(obj)).then(response => {
        this.AccountTypes = response
      })
    },
    //查询主体公司
    remoteCompany (query) {
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
              this.MainBbodyList = response.Data
            } else {
              this.MainBbodyList = []
            }
          } else {
            this.MainBbodyList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    //清空主体公司
    clearCompany () {
      this.remoteCompany()
    },
    remoteCustomer (query) {
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
    clearCustomer () {
      this.remoteCustomer()
    },
    //添加保存事件
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('OpenAccountSave', this.dataObject)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //关闭添加窗口事件
    close () {
      this.$emit('closeOpenAccountSave', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  /deep/ .el-form-item {
    margin-bottom: 12px;
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
    &:nth-child(odd) {
      padding-right: 20px;
    }
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
  .upload-bts {
    position: absolute;
    right: 0;
    top: 24px;
    z-index: 10;
    background: #1588f8;
    button {
      padding: 12px 19px;
    }
  }
  .downloadBtn {
    color: #1588f8;
  }
}
</style>