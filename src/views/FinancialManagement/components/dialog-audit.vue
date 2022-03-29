<!-- 提交审核-->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="800px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="审核标题">
          <el-input v-model="operateform.title" placeholder="请输入当前审核的标题"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="legalEntity" class="select">
          <el-select v-model="operateform.legalEntity" filterable clearable placeholder="搜索或选择单位名称">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in lagellist" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请部门" prop="expenseDepartment" class="select">
          <!-- <el-select v-model="operateform.expenseDepartment" filterable clearable placeholder="搜索或选择申请部门">
            <el-option :label="item.name" :value="item.id" v-show="item.active" v-for="(item, index) in departmentslist" :key="index"></el-option>
          </el-select> -->
          <treeselect ref="trees3" v-model="operateform.expenseDepartment" :normalizer="normalizer" placeholder="搜索或选择申请部门" :default-expand-level="1" :options="departmentslist" />
        </el-form-item>
        <el-form-item label="开票单位名称" prop="companyName">
          <el-input v-model="operateform.companyName" placeholder="请输入开票单位名称"></el-input>
        </el-form-item>
        <el-form-item label="客户单位性质" prop="customerType" class="select">
          <el-select v-model="operateform.customerType" filterable clearable placeholder="搜索或选择客户单位性质">
            <el-option :label="item.name" :value="item.id" v-show="item.active" v-for="(item, index) in customerlist" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开票时间" prop="requisitionDate">
          <el-date-picker v-model="operateform.requisitionDate" type="date" placeholder="选择开票时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="收款方式" prop="paymentType" class="select">
          <el-select v-model="operateform.paymentType" filterable clearable placeholder="搜索或选择收款方式">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in paymentlist" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用类型" prop="FeeTypeId" class="select">
          <!-- <el-select v-model="operateform.FeeTypeId" filterable clearable placeholder="搜索或选择费用类型" @change="chooseFeeType">
            <el-option :label="item.name" :value="item.id" v-show="item.active" v-for="(item, index) in Feelist" :key="index"></el-option>
          </el-select> -->
          <treeselect ref="trees3" disabled v-model="operateform.FeeTypeId" :normalizer="normalizerFee" placeholder="搜索或选择费用类型" :default-expand-level="1" :options="Feelist" @select="chooseFeeType" />
        </el-form-item>
        <el-form-item label="备注" class="text">
          <el-input type="textarea" :rows="5" maxlength="200" v-model="operateform.description"></el-input>
        </el-form-item>
        <el-form-item label="消费事由" class="text">
          <el-input type="textarea" :rows="5" maxlength="200" v-model="operateform.consumptionReasons"></el-input>
        </el-form-item>
        <!-- <el-form-item label="金额" prop="amount">
          <el-input v-model="operateform.amount" placeholder="请输入金额"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="日期" prop="FeeDate">
          <el-date-picker v-model="operateform.FeeDate" type="date" placeholder="选择时间"></el-date-picker>
        </el-form-item> -->
        <!-- <el-form-item label="消费事由" class="text" prop="consumptionReasons">
          <el-input type="textarea" :rows="5" maxlength="200" v-model="operateform.consumptionReasons"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer three-footer">
        <el-button class="erpbtn" size="small" @click="closedialog">取 消</el-button>
        <el-button class="erpbtn" size="small" @click="submitreview">提交审核</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uuid, MenuIdDate } from '@/utils/CustomValidation.js'
import { GetUserDefinedFile, GetPayeeInfos, GetDepartments, EKuaiBaoAuth, GetFeeTypes } from '@/api/FinancialManagement.js'
import SupperUploader from '@/utils/SupperUploader'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    Treeselect
  },
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
  data() {
    return {
      dialogVisible: false,
      fileloading: false,
      operateform: {
        title: '', // 标题
        legalEntity: '', // 单位名称(法人实体)-获取自定义档案值
        expenseDepartment: null, // 申请部门-获取易快报部门列表
        companyName: '', // 开票单位名称
        customerType: '', // 客户单位性质(客户单位性质)-获取自定义档案值	
        requisitionDate: '', // 开票时间
        paymentType: '', // 收款方式(收款方式)-获取自定义档案值
        description: '', // 备注
        FeeTypeId: null, // 费用类型Id-获取费用类型请列表
        FeeTypeCode: '', // 费用类型编码-获取费用类型请列表
        amount: '', // 金额
        FeeDate: '', // 日期
        invoiceForm: '', // 发票情况(wait 待开发票 exist已有发票 noExist 无发票 noWrite 无需填写,前端写死)
        consumptionReasons: '', // 消费事由
      },
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },
      normalizerFee(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },
      lagellist: [], // 法人实体列表
      paymentlist: [], // 付款方式列表
      departmentslist: [], // 易快报部门列表
      customerlist: [], // 客户单位性质列表
      Feelist: [], // 费用类型
      rules: {
        title: [{ required: true, message: '请输入审核标题', trigger: 'blur' }],
        legalEntity: [{ required: true, message: '请选择公司', trigger: 'change' }],
        expenseDepartment: [{ required: true, message: '请选择申请部门', trigger: 'change' }],
        paymentType: [{ required: true, message: '请选择开票方式', trigger: 'change' }],
        companyName: [{ required: true, message: '请输入开票单位名称', trigger: 'blur' }],
        customerType: [{ required: true, message: '请选择客户单位性质', trigger: 'change' }],
        requisitionDate: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        FeeTypeId: [{ required: true, message: '请选择费用类型', trigger: 'change' }],
        amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
      },
    }
  },
  watch: {
    visible(newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (newvalue) {
        console.log(this.contentdata);
        // 匹配弹框填充数据
        // this.operateform.paymentType = this.contentdata.ReceipTypeText
        this.operateform.title = this.contentdata.InvoiceTitle
        // this.operateform.amount = this.contentdata.Amount
        this.operateform.companyName = this.contentdata.BfCompanyName
        if (this.contentdata.InvoiceDate === '0001-01-01T00:00:00' || this.contentdata.InvoiceDate === null) {
        } else {
          this.operateform.requisitionDate = new Date(this.contentdata.InvoiceDate)
        }
        if (this.lagellist && this.lagellist.length) {
        } else {
          this.getUserDefinedFilelagel()
        }
        if (this.departmentslist && this.departmentslist.length) {
        } else {
          this.getDepartments()
        }
        if (this.paymentlist && this.paymentlist.length) {
          if (this.contentdata.ReceipTypeText) {
            let data = this.paymentlist.find(v => {
              if (v.name.indexOf(this.contentdata.ReceipTypeText) !== -1) {
                return v
              }
            })
            if (data) {
              this.operateform.paymentType = data.id
            }
          }
        } else {
          this.getUserDefinedFilepayment()
        }
        if (this.customerlist && this.customerlist.length) {
          if (this.contentdata.TaxTypeText) {
            let data = this.customerlist.find(v => {
              if (v.name.indexOf(this.contentdata.TaxTypeText) !== -1) {
                return v
              }
            })
            if (data) {
              this.operateform.customerType = data.id
            }
          }
        } else {
          this.getUserDefinedFilecust()
        }
        if (this.Feelist && this.Feelist.length) {
          this.operateform.FeeTypeId = 'Ze8aPj_gGEqw00'
          this.operateform.FeeTypeCode = 'COST71'
        } else {
          this.getFeeTypes()
        }
      }
    }
  },
  methods: {
    // 获取易快报部门列表
    getDepartments(value) {
      let obj = {
        Start: 1,
        Count: 999,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetDepartments(qs.stringify(obj)).then(response => {
        this.departmentslist = response.items
        this.upAndDown(this.departmentslist)
      })
    },
    // 删除数据的空children
    upAndDown(arr) {
      arr.forEach(obj => {
        if (obj.children.length <= 0) {
          delete obj.children
          return
        } else {
          this.upAndDown(obj.children)
        }
      })
    },
    // 获取自定义档案值
    getUserDefinedFilelagel() {
      let obj = {
        Start: 1,
        Count: 999,
        type: '法人实体',
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetUserDefinedFile(qs.stringify(obj)).then(response => {
        this.lagellist = response.items
      })
    },
    // 获取自定义档案值
    getUserDefinedFilepayment() {
      let obj = {
        Start: 1,
        Count: 999,
        type: '收款方式',
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetUserDefinedFile(qs.stringify(obj)).then(response => {
        this.paymentlist = response.items
        if (this.contentdata.ReceipTypeText) {
          let data = this.paymentlist.find(v => {
            if (v.name.indexOf(this.contentdata.ReceipTypeText) !== -1) {
              return v
            }
          })
          if (data) {
            this.operateform.paymentType = data.id
          }
        }
      })
    },
    // 获取自定义档案值
    getUserDefinedFilecust() {
      let obj = {
        Start: 1,
        Count: 999,
        type: '客户单位性质',
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetUserDefinedFile(qs.stringify(obj)).then(response => {
        this.customerlist = response.items
        // TaxTypeText
        if (this.contentdata.TaxTypeText) {
          let data = this.customerlist.find(v => {
            if (v.name.indexOf(this.contentdata.TaxTypeText) !== -1) {
              return v
            }
          })
          if (data) {
            this.operateform.customerType = data.id
          }
        }
      })
    },
    // 获取费用类型列表
    getFeeTypes() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetFeeTypes(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.Feelist = response.Data.items
            this.upAndDown(this.Feelist)
            this.operateform.FeeTypeId = 'Ze8aPj_gGEqw00'
            this.operateform.FeeTypeCode = 'COST71'
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 选择费用类型
    chooseFeeType(node, instanceId) {
      this.operateform.FeeTypeCode = node.code
      console.log(node);
    },
    // 关闭弹框
    closedialog() {
      this.operateform = this.$options.data().operateform
      this.$refs['operateform'].resetFields();
      this.$emit('closeauditdialog')
    },
    // 提交审核
    submitreview() {
      this.$refs.operateform.validate((v) => {
        if (v) {
          this.$emit('savecostaudit', this.operateform)
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item.file {
  .img-box-list {
    float: left;
    width: 160px;
    position: relative;
    height: 120px;
    > input {
      width: 160px;
      height: 120px;
      position: absolute;
      opacity: 0;
      z-index: 10;
      cursor: pointer;
    }
    > .img-box {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #f0f4fa;
      border-radius: 8px;
      > .filetype {
        display: inline-block;
        background-color: $erpcolor;
        padding: 10px 12px;
        font-size: $f14;
        line-height: 14px;
        color: #fff;
        border-radius: 8px;
      }
      > .filename {
        font-size: $f14;
        color: $erp666;
        height: 40px;
        width: 110px;
        margin: 0px 24px 0 24px;
        letter-spacing: 0;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2; /*要显示的行数*/
        -webkit-box-orient: vertical;
      }
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    > .img-box-hover {
      position: absolute;
      width: 100%;
      height: 30px;
      background: #909198;
      // opacity: 0.4;
      bottom: 0;
      display: flex;
      justify-content: center;
      border-radius: 0 0 8px 8px;
      .btn {
        position: relative;
        cursor: pointer;
        line-height: 30px;
        width: 50%;
        text-align: center;
        color: #fff;
        > input {
          width: 100%;
          height: 100%;
          opacity: 0;
          position: absolute;
          cursor: pointer;
          &::-webkit-file-upload-button {
            height: 0;
          }
        }
        .svg-icon {
          font-size: $f14;
          margin-right: 10px;
        }
        > span {
          font-size: $f14;
          color: #fff;
        }
        &:hover span {
          color: #1588f8;
        }
        &:hover .svg-icon {
          color: #1588f8;
        }
      }
    }
  }
  .tip {
    float: right;
    width: 50%;
    color: $erp999;
    margin-top: 20px;
  }
}
/deep/ .dialog-footer.three-footer {
  text-align: center;
  > button {
    width: auto;
    height: auto;
    background-color: $erpbtncolor;
    color: $erpcolor;
  }
}
.operateform {
  /deep/ .el-form-item {
    min-height: 65px;
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
      .vue-treeselect .vue-treeselect__control {
        margin-top: 0 !important;
      }
    }
    &:nth-child(odd) {
      padding-right: 20px;
    }
  }
}
</style>