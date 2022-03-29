<!-- 开具发票 -->
<template>
  <div class="add-project-Invoice">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="Invoiceform" label-position="top" :model="recruitform" :rules="rules" label-width="140px" class="projectform">
        <div class="form-cont">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开票公司" prop="BfCompanyId">
                <el-select v-model="recruitform.BfCompanyId" clearable filterable remote placeholder="请查询或下拉开票公司" @clear="clearCompany" :remote-method="remoteCompany" :loading="loading" class="select-input">
                  <el-option v-for="item in BfCompanyList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开票申请人" prop="applicant">
                <el-input v-model="recruitform.applicant" clearable placeholder="请输入开票申请人" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开票时间" class="datetime" prop="InvoiceDate">
                <el-date-picker v-model="recruitform.InvoiceDate" clearable value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开票时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开票总额">
                <el-input v-model="recruitform.Amount" :bind="addOne" disabled clearable placeholder="请输入开票总额">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="所属项目">
                <el-input v-model="recruitform.ProjectName" disabled clearable placeholder="请输入所属项目" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="发票抬头" prop="InvoiceTitle">
                <el-input v-model="recruitform.InvoiceTitle" clearable placeholder="请输入发票抬头" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="客户单位性质">
                <el-select v-model="recruitform.TaxType" clearable filterable placeholder="请选择客户单位性质" class="select-input">
                  <el-option v-for="item in InvoiceApplyEnumTaxType" :key="item.value" :label="item.describe" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="税号">
                <el-input v-model="recruitform.TaxNo" clearable placeholder="请输入税号" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="银行账号">
                <el-input v-model="recruitform.AccountNo" clearable placeholder="请输入银行账号" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开户行">
                <el-input v-model="recruitform.BankName" clearable placeholder="请输入开户行" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="公司注册地址">
                <el-input v-model="recruitform.RegAddress" clearable placeholder="请输入公司注册地址" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="公司联系电话">
                <el-input v-model="recruitform.CompanyTel" clearable placeholder="请输入公司联系电话" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="收款方式">
                <el-select v-model="recruitform.ReceipType" clearable filterable placeholder="请选择收款方式" class="select-input">
                  <el-option v-for="item in InvoiceApplyEnumReceipType" :key="item.value" :label="item.describe" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <div class="multiple-col" v-for="(item,index) in recruitform.AddInvoiceApplyDetailList" :key="index">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="开具发票类型">
                  <el-select v-model="item.InvoiceType" clearable filterable placeholder="请选择开具发票类型" class="select-input">
                    <el-option v-for="ite in InvoiceApplyEnumInvoiceType" :key="ite.value" :label="ite.describe" :value="ite.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="开票项目" :prop="`AddInvoiceApplyDetailList[${index}].Subject`" :rules="moreNotifyOjbectRules.Subject">
                  <el-select v-model="item.Subject" clearable filterable placeholder="请选择开票项目" class="select-input">
                    <el-option v-for="ite in BusinessList" :key="ite.value" :label="ite.describe" :value="ite.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="开票金额" :prop="`AddInvoiceApplyDetailList[${index}].Amount`" :rules="moreNotifyOjbectRules.Amount">
                  <el-input v-model="item.Amount" placeholder="请输入开票金额">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <div class="multiple-button">
                <a class="Addbtn" v-if="index == recruitform.AddInvoiceApplyDetailList.length-1" @click="AddInvoice"><i class="el-icon-circle-plus-outline"></i>添加</a>
                <a class="Delbtn" v-if="index < recruitform.AddInvoiceApplyDetailList.length-1" @click="DelInvoice(index)"><i class="el-icon-delete"></i>删除</a>
              </div>
            </div>
            <el-col :span="24">
              <el-form-item label="备注" class="text">
                <el-input type="textarea" :rows="6" v-model="recruitform.Remark" maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="bottom">
      <!-- 添加 -->
      <el-button class="erpbtn" size="small" @click="$router.go(-1)">取消</el-button>
      <el-button class="erpbtn" size="small" @click="ProjectInvoice('Invoiceform')">保存</el-button>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { AddInvoiceApply, GetInvoiceApplyAllEnum } from '@/api/FinancialManagement.js'
import { GetBfCompanyPageList } from '@/api/BusinessSet.js'
import { GetProjectBusinessType } from '@/api/projectManagement.js'
import { uuid, showLoading, hideLoading, checkNumber, MenuIdDate } from '@/utils/CustomValidation'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '项目详情',
        router: '/projectManagement/ProjectDetail'
      }, {
        name: '发票申请表',
        router: ''
      }],
      recruitform: {
        ProjectId: '',
        ProjectName: '',
        BfCompanyId: '',
        InvoiceDate: '',
        InvoiceTitle: '',
        TaxType: '',
        TaxNo: '',
        AccountNo: '',
        BankName: '',
        RegAddress: '',
        CompanyTel: '',
        Amount: 0,
        ReceipType: '',
        Remark: '',
        applicant: '',
        AddInvoiceApplyDetailList: [{
          InvoiceType: '',
          Subject: '',
          Amount: 0
        }]
      },
      rules: {
        BfCompanyId: [
          { required: true, message: '请选择开票公司', trigger: 'change' }
        ],
        applicant: [
          { required: true, message: '请选择开票公司', trigger: 'blur' }
        ],
        InvoiceDate: [
          { required: true, message: '请选择开票时间', trigger: 'change' }
        ],
        InvoiceTitle: [
          { required: true, message: '请选择开票抬头', trigger: 'blur' }
        ]
      },
      moreNotifyOjbectRules: {
        Subject: [
          { required: true, message: '请选择开票项目', trigger: 'change' }
        ],
        Amount: [
          { required: true, validator: checkNumber, trigger: 'blur' }
        ]
      },
      BfCompanyList: [],
      InvoiceApplyEnumTaxType: [],//客户单位性质
      InvoiceApplyEnumReceipType: [],//收款方式
      InvoiceApplyEnumInvoiceType: [],//发票类型
      BusinessList: [],
      authorizedList: []
    }
  },
  created () {
    this.remoteCompany()
    this.getApplyAllEnum()
    this.getCatagoryType()
    let UsedFor = JSON.parse(localStorage.getItem('Current'))
    this.recruitform.applicant = UsedFor.currentUser
    if (this.$route.query && this.$route.query.Id) {
      this.recruitform.ProjectId = this.$route.query.Id
      this.recruitform.ProjectName = this.$route.query.ProjectName
    }
  },
  computed: {
    addOne () {
      this.recruitform.Amount = 0;
      for (var i = 0; i < this.recruitform.AddInvoiceApplyDetailList.length; i++) {
        this.recruitform.Amount += parseFloat(this.recruitform.AddInvoiceApplyDetailList[i].Amount)
      }
      return this.recruitform.Amount
    }
  },
  methods: {
    getApplyAllEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetInvoiceApplyAllEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.InvoiceApplyEnumTaxType = response.InvoiceApplyEnumTaxType
          this.InvoiceApplyEnumReceipType = response.InvoiceApplyEnumReceipType
          this.InvoiceApplyEnumInvoiceType = response.InvoiceApplyEnumInvoiceType
        }
      })
    },
    //获取项目类型数据
    getCatagoryType () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectBusinessType(qs.stringify(obj)).then(response => {
        if (response) {
          this.BusinessList = response
        }
      })
    },
    //获取下拉公司
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
    AddInvoice () {
      this.recruitform.AddInvoiceApplyDetailList.push({
        InvoiceType: '',
        Subject: '',
        Amount: 0
      })
    },
    DelInvoice (index) {
      this.recruitform.AddInvoiceApplyDetailList.splice(index, 1)
    },
    ProjectInvoice (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let obj = this.recruitform
          obj.menuid = MenuIdDate()
          obj.operationcode = '1'
          AddInvoiceApply(qs.stringify(obj)).then(response => {
            if (response.IsSuccess && response.Data.Id) {
              this.$message({
                type: 'success',
                message: '开具发票成功!'
              })
              setTimeout(() => {
                this.$router.go(-1)
              }, 1000)
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.add-project-Invoice {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .projectform {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 80px 40px;
    .form-title {
      font-size: $f16;
      color: $erp333;
      line-height: 16px;
      position: relative;
      padding-left: 12px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      > .operate {
        font-size: $f14;
        color: $erpplaceholder;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 16px;
        background-color: $erpcolor;
      }
    }
    // 表格样式
    .el-form-item {
      margin-bottom: 20px;
      .el-form-item__label {
        line-height: 14px;
        font-size: $f14;
        color: $erp666;
        font-weight: 400;
        padding-bottom: 8px;
      }
      .el-form-item__content {
        width: calc(100% - 64px);
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
        border: 1px solid #f0f4fa;
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
    .is-error {
      input {
        border: 1px solid #f56c6c;
      }
    }
    // 循环的样式
    .form-cont {
      padding-bottom: 16px;
      margin-bottom: 40px;
      border-bottom: 1px solid $erpBK;
      &:last-child {
        border-bottom: none;
      }
      .post-list {
        position: relative;
        margin-bottom: 40px;
        padding-bottom: 16px;
        border-bottom: 1px solid $erpBK;
        // 最后一个添加联系人样式
        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
          .operate-btn {
            bottom: 24px;
          }
        }
        // 底部操作按钮
        .operate-btn {
          // position: absolute;
          // right: 0;
          // bottom: 0px;
          justify-content: flex-end;
          display: flex;
        }
        .btn {
          cursor: pointer;
          margin-left: 64px;
          font-size: $f14;
          color: $erpplaceholder;
        }
      }
    }
  }
  // 底部添加按钮
  .bottom {
    position: fixed;
    box-shadow: 0px 0px 20px 0px rgba(21, 136, 248, 0.1);
    bottom: 0;
    right: 0;
    margin-bottom: 0;
    text-align: center;
    width: calc(100% - 224px);
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    z-index: 999;
    .el-button + .el-button {
      margin-left: 24px;
    }
  }
}
.form-cont {
  .tip {
    font-size: $f14;
    color: $erp999;
    margin-bottom: 16px;
    margin-top: 25px;
  }
  .upload {
    position: relative;
    height: 120px;
    img {
      position: absolute;
      left: 0;
      top: 0;
    }
    input {
      position: absolute;
      left: 0;
      top: 0;
      width: 160px;
      height: 120px;
      opacity: 0;
      cursor: pointer;
      &::-webkit-file-upload-button {
        height: 0;
      }
    }
    .files {
      width: 160px;
      height: 120px;
      background: #f2f3fb;
      border-radius: 8px;
      text-align: center;
      position: relative;
      float: left;
      margin-right: 24px;
      margin-bottom: 24px;
      .filestype {
        display: inline-block;
        width: 56px;
        height: 32px;
        background: #1588f8;
        font-size: 14px;
        color: #fff;
        border-radius: 8px;
        text-align: center;
        line-height: 32px;
        position: absolute;
        left: 0;
        top: 0;
      }
      p {
        width: 110px;
        position: absolute;
        top: 38%;
        left: 50%;
        font-size: 14px;
        line-height: 18px;
        transform: translate(-50%, -50%);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: block;
        text-align: center;
      }
      .option-button {
        width: 100%;
        height: 30px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #909198;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        a {
          width: 50%;
          display: inline-block;
          line-height: 30px;
          text-align: center;
          height: 30px;
          font-size: 14px;
          color: #fff;
          vertical-align: top;
          .svg-a {
            margin-right: 10px;
            font-size: 14px;
          }
          &:hover {
            color: #1588f8;
          }
          .replaceFile {
            width: 80px;
            height: 30px;
          }
        }
      }
    }
  }
}
.multiple-col {
  float: left;
  width: 100%;
  .multiple-button {
    text-align: right;
    margin-right: 80px;
    .Addbtn {
      color: #1588f8;

      font-size: 14px;
      i {
        margin-right: 8px;
      }
      &:hover {
        color: #a3b1cc;
      }
    }
    .Delbtn {
      color: #1588f8;
      font-size: 14px;
      margin-left: 50px;
      i {
        margin-right: 8px;
      }
      &:hover {
        color: #f56262;
      }
    }
  }
}
</style>