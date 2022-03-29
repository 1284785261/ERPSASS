//新增开户行窗口
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="AddBankTitle" class="dialog-box" append-to-body :visible.sync="showCollection" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="rules" class="forms">
        <el-form-item label="公司名称" prop="BfCompanyId">
          <el-select v-model="dataObject.BfCompanyId" filterable clearable remote placeholder="请查询或下拉选择公司名称" class="select-input" @clear="clearCompany" :remote-method="remoteCompany" :loading="loading">
            <el-option v-for="item in BfCompanyList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户行" prop="BankId">
          <el-select v-model="dataObject.BankId" filterable clearable placeholder="请选择开户行" class="select-input" :loading="loading">
            <el-option v-for="item in CatagoryPageList" :key="item.Id" :label="item.ClassName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户支行" prop="Branch">
          <el-input v-model="dataObject.Branch" minlength="0" maxlength="200" clearable size="small" placeholder="请输入开户支行" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="Account">
          <el-input v-model="dataObject.Account" minlength="1" maxlength="50" clearable size="small" placeholder="请输入银行卡号" />
        </el-form-item>

        <el-form-item label="备注说明" prop="Remark">
          <el-input v-model="dataObject.Remark" size="small" minlength="1" maxlength="20" clearable placeholder="请输入备注说明" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple" v-if="AddBankTitle != '查看开户行'">
        <el-button round class="erpbtn" size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetBfCompanyPageList } from '@/api/BusinessSet.js'
import { GetCatagoryPageList } from '@/api/SystemSetting.js'
import { MenuIdDate } from '@/utils/CustomValidation.js'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'AddBank',
  props: ['showAddBank', 'AddBankTitle', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        Account: '',
        BfCompanyId: '',
        BankId: '',
        Branch: '',
        Remark: ''
      },
      loading: false,
      uploadLoading: false,
      BfCompanyList: [],
      CatagoryPageList: [],
      showCollection: false,
      rules: {
        BfCompanyId: [
          { required: true, message: '请选择公司', trigger: 'change' }
        ],
        BankId: [
          { required: true, message: '请选择开户行', trigger: 'change' }
        ],
        Account: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    showAddBank (newvalue, oldvalue) {
      this.showCollection = newvalue
      if (this.AddBankTitle == '修改开户行') {
        this.dataObject = this.tempData
      } else {
        this.dataObject = this.$options.data().dataObject
      }
    }
  },
  created () {
    this.remoteCompany()
    this.getCatagoryList()
  },
  methods: {
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
    clearCompany () {
      this.remoteCompany()
    },
    getCatagoryList () {
      let obj = {
        PageIndex: 1,
        PageSize: 999,
        ClassName: '',
        ClassType: 5,
        ParentId: '',
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCatagoryPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.CatagoryPageList = response.Data
          } else {
            this.CatagoryPageList = []
          }
        } else {
          this.CatagoryPageList = []
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //导入员工
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('AddBankSave', this.dataObject)
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
      this.$emit('closeAddBank', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  position: relative;
  /deep/ .el-form-item {
    width: 100%;
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
}
</style>