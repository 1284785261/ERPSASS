// 新增公司
<template>
  <div class="add-company-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="content">
      <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm">
        <div class="content-title">公司基本信息</div>
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="公司名称" ref="Name" prop="Name">
              <el-input v-if="!isview" v-model="ruleForm.Name" class="erpsearchinput"></el-input>
              <span v-if="isview">{{ruleForm.Name}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="公司级别" ref="Level" prop="Level">
              <el-select v-if="!isview" v-model="ruleForm.Level" filterable class="selet erpselect" clearable>
                <el-option v-for="item in companyLeave" :key="item.value" :label="item.describe" :value="item.value">
                </el-option>
              </el-select>
              <span v-if="isview">{{ruleForm.LevelText}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="公司代号" ref="Code" prop="Code">
              <el-input v-if="!isview" v-model="ruleForm.Code" class="erpsearchinput"></el-input>
              <span v-if="isview">{{ruleForm.Code}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="企业邮编">
              <el-input v-if="!isview" v-model="ruleForm.Zip" class="erpsearchinput"></el-input>
              <span v-if="isview">{{ruleForm.Zip}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="公司联系电话">
              <el-input v-if="!isview" v-model="ruleForm.Tel" class="erpsearchinput"></el-input>
              <span v-if="isview">{{ruleForm.Tel}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="公司办公地址">
              <el-input v-if="!isview" v-model="ruleForm.Addr" class="erpsearchinput"></el-input>
              <span v-if="isview">{{ruleForm.Addr}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="公司注册地址">
              <el-input v-if="!isview" v-model="ruleForm.RegAddress" class="erpsearchinput"></el-input>
              <span v-if="isview">{{ruleForm.RegAddress}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="content-title">企业账户及发票信息</div>
        <el-row>
          <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="银行卡号">
              <el-input v-if="!isview" v-model="ruleForm.BankCardNo"></el-input>
              <span v-if="isview">{{ruleForm.BankCardNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="开户行">
              <el-input v-if="!isview" v-model="ruleForm.BankName"></el-input>
              <span v-if="isview">{{ruleForm.BankName}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="开户地址">
              <el-input v-if="!isview" v-model="ruleForm.name"></el-input>
              <span v-if="isview">{{ruleForm.name}}</span>
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="税号">
              <el-input v-if="!isview" v-model="ruleForm.TaxNo" class="erpsearchinput"></el-input>
              <span v-if="isview">{{ruleForm.TaxNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="发票抬头">
              <el-input v-if="!isview" v-model="ruleForm.InvoiceTitle" class="erpsearchinput"></el-input>
              <span v-if="isview">{{ruleForm.InvoiceTitle}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="line"></div>
        <div class="content-title">公司状态</div>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item>
              <el-radio-group v-model="ruleForm.Status">
                <el-radio v-if="!isview" :label="1">正常营业</el-radio>
                <el-radio v-if="isview" disabled :label="1">正常营业</el-radio>
                <el-radio v-if="!isview" :label="0">已注销</el-radio>
                <el-radio v-if="isview" disabled :label="0">已注销</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item class="operate" v-if="!isview">
              <el-button @click="cancelform" size="small" class="erpbtn">取消</el-button>
              <!-- 添加 -->
              <el-button v-if="!isupdate" @click="saveform" size="small" class="erpbtn">保存</el-button>
              <!-- 修改 -->
              <el-button v-if="isupdate" @click="updateform" size="small" class="erpbtn">保存</el-button>
            </el-form-item>
            <el-form-item class="operate" v-if="isview">
              <el-button @click="cancelform" size="small" class="erpbtn">关闭</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { AddBfCompany, EditBfCompanyInfo, GetBfCompanyInfo } from '@/api/BusinessSet.js'
import { mapGetters } from 'vuex'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '公司信息管理',
        router: '/SystemSetting/CorporateInformation'
      }, {
        name: '新增公司',
        router: ''
      }],
      Id: '',
      isupdate: false, // 是否修改
      isview: false, // 是否查看
      companyLeave: [], // 枚举列表
      ruleForm: {
        Name: '',
        Level: '',
        Addr: '',
        Zip: '',
        Tel: '',
        BankName: '',
        BankCardNo: '',
        TaxNo: '',
        Code: '',
        InvoiceTitle: '',
        RegAddress: '',
        Status: ''
      },
      rules: {
        Name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 1, max: 36, message: '长度在 1 到 36 个字符', trigger: 'blur' }
        ],
        Level: [
          { required: true, message: '请选择公司级别', trigger: 'change' },
        ],
        Code: [
          { required: true, message: '请输入公司代号', trigger: 'blur' },
          { min: 1, max: 36, message: '长度在 1 到 36 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapGetters([
      'companystylelist'
    ])
  },
  watch: {
    companystylelist (newvalue, oldvalue) {
      this.companyLeave = companystylelist
    }
  },
  created () {
    // 判断是添加还是修改
    this.Id = this.$route.query.id
    if (this.Id) {
      this.isupdate = true
      this.urlList[1].name = '修改公司'
      this.getBfCompanyInfo()
      // 判断是否是查看
      if (this.$route.query.isview) {
        this.isview = true
        this.urlList[1].name = '查看公司'
      } else {
        this.isview = false
      }
    } else {
      this.isupdate = false
    }
    this.companyLeave = this.companystylelist
  },
  methods: {
    // 获取公司信息
    getBfCompanyInfo () {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBfCompanyInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.ruleForm = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 取消保存
    cancelform () {
      this.$router.go(-1)
    },
    // 保存
    saveform () {
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      this.$refs.ruleForm.validate((v, object) => {
        if (v) {
          let obj = this.ruleForm
          obj.menuid = operating.MenuId
          obj.operationcode = operating.OperationCode
          showLoading()
          AddBfCompany(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.go(-1)
              }, 500);
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
            hideLoading()
          })
        } else {
          for (const i in object) {
            this.$refs[i].$el.scrollIntoView({　　// 滚动到指定节点
              block: 'center',　　　　　// 值有start,center,end，nearest，当前显示在视图区域中间
              behavior: 'smooth'　　　　// 值有auto、instant,smooth，缓动动画（当前是慢速的）
            })
            break
          }
        }
      })
    },
    // 修改
    updateform () {
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      this.$refs.ruleForm.validate((v, object) => {
        if (v) {
          let obj = this.ruleForm
          obj.Id = this.Id
          obj.menuid = operating.MenuId
          obj.operationcode = operating.OperationCode
          showLoading()
          EditBfCompanyInfo(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.go(-1)
              }, 500);
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
            hideLoading()
          })
        } else {
          for (const i in object) {
            this.$refs[i].$el.scrollIntoView({　　// 滚动到指定节点
              block: 'center',　　　　　// 值有start,center,end，nearest，当前显示在视图区域中间
              behavior: 'smooth'　　　　// 值有auto、instant,smooth，缓动动画（当前是慢速的）
            })
            break
          }
        }
      })
    }
  },
}
</script>

<style lang="scss">
.add-company-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .content {
    margin-left: 24px;
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    padding: 40px 40px 24px 40px;
    .line {
      margin-bottom: 40px;
      margin-top: 16px;
      width: 100%;
      height: 1px;
      background-color: $erpBK;
    }
    .content-title {
      font-size: $f14;
      line-height: 14px;
      font-weight: 700;
      color: $erp333;
      position: relative;
      padding-left: 13px;
      margin-bottom: 4px;
      &::after {
        content: "";
        width: 4px;
        height: 16px;
        background-color: $erpcolor;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .el-form-item {
      margin-bottom: 24px;
      max-width: 336px;
      .el-form-item__label {
        line-height: 28px;
        font-size: $f14;
        color: $erp666;
        font-weight: 400;
        padding: 0;
      }
      .el-form-item__content {
        min-height: 40px;
        .el-input__inner {
          background-color: $erinputbgc;
        }
        .el-select {
          width: 100%;
          .el-input {
            .el-input__inner {
              height: 38px;
              line-height: 38px;
            }
          }
        }
      }
      &.operate {
        max-width: 100%;
        text-align: center;
        .el-button + .el-button {
          margin-left: 24px;
        }
      }
    }
  }
}
</style>