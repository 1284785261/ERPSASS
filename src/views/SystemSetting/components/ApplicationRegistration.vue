<!-- 申请注册 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="申请注册" class="dialog-box" append-to-body :visible.sync="showRegist" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="ERP账号" prop="ObjId">
          <el-select v-model="dataObject.ObjId" placeholder="请查询或下拉选择ERP账号" filterable clearable remote size="mini" class="select-input" @clear="clearERPAccount" :remote-method="remoteERPAccount" :loading="loading">
            <el-option v-for="item in ERPAccountList" :key="item.UserId" :label="item.UserName+' - '+item.UserId" :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item label="认证公司" prop="BfCompanyId">
          <el-select v-model="dataObject.BfCompanyId" placeholder="请查询或下拉选择认证公司" filterable clearable remote size="mini" class="select-input" @clear="BfCompanyMethod('')" :remote-method="BfCompanyMethod" :loading="loading">
            <el-option v-for="(item,index) in ERPCompanyList" :key="index" :label="item.Name" :value="item.Id" />
            <div v-if="ERPCompanyList.length > 99" class="search-keyword">
              <span>只显示前99条结果，请完善搜索关键字</span>
            </div>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetSysUserList } from '@/api/SystemSetting.js'
import { GetBfCompanyPageList } from '@/api/BusinessSet.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'ApplicationRegistration',
  props: ['showRegistration'],
  data () {
    return {
      dataObject: {
        ObjId: '',
        Type: 2,
        BfCompanyId: '',
      },
      ERPAccountList: [],
      ERPCompanyList: [],
      loading: false,
      showRegist: false,
      Formrules: {
        ObjId: [{ required: true, message: '请选择ERP账号', trigger: 'change' }],
        BfCompanyId: [{ required: true, message: '请选择认证公司', trigger: 'change' }]
      }
    }
  },
  watch: {
    showRegistration (newvalue, oldvalue) {
      this.showRegist = newvalue
      this.dataObject = this.$options.data().dataObject
      this.remoteERPAccount()
      this.BfCompanyMethod('')
    }
  },
  methods: {
    remoteERPAccount (query) {
      let obj = {
        UserId: query,
        UserName: '',
        Status: 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.loading = true
      setTimeout(() => {
        GetSysUserList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              this.ERPAccountList = response.Data
            } else {
              this.ERPAccountList = []
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          this.loading = false
        })
      }, 500);
    },
    clearERPAccount () {
      this.dataObject.ObjId = ''
      this.remoteERPAccount()
    },
    // 获取公司列表
    BfCompanyMethod (value) {
      let obj = {
        Name: value,
        Level: -1,
        Status: 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.loading = true
      GetBfCompanyPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.ERPCompanyList = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        this.loading = false
      })
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('RegistrationSave', this.dataObject)
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
      this.$emit('CloseRegistration', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.dialog-box{
	/deep/ .el-dialog__header{
			padding: 26px 40px !important;
		.el-dialog__title{
				font-size: 18px !important;
			}
		
	}
	.closeButton{
		font-size: 24px ;
		top: -52px;
	}
	
}

.forms {
  /deep/ .el-form-item {
    margin-bottom: 12px;

    .el-form-item__label {
      width: 50%;
      text-align: left;
      line-height: 24px;
      color: #666666;
	  font-weight: 500;
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