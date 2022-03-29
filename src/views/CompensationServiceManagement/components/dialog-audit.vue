<!-- 提交付款审核-->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <!-- <el-form-item label="审核标题">
          <el-input v-model="operateform.title" placeholder="请输入当前审核的标题"></el-input>
        </el-form-item> -->
        <el-form-item label="客户单位" prop="customer" class="select">
          <el-select v-model="operateform.customer" filterable clearable placeholder="搜索或选择客户单位">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in customerlist" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称" prop="legal" class="select">
          <el-select v-model="operateform.legal" filterable clearable placeholder="搜索或选择公司名称">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in lagellist" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经办部门" prop="expenseDepartment" class="select">
          <treeselect ref="trees3" v-model="operateform.expenseDepartment" :normalizer="normalizer" placeholder="搜索或选择经办部门" :default-expand-level="1" :options="departmentslist" />
        </el-form-item>
        <!-- <el-form-item label="金额" prop="loanMoney">
          <el-input v-model="operateform.loanMoney" placeholder="请输入金额"></el-input>
        </el-form-item> -->
        <el-form-item label="付款方式" prop="paymentType" class="select">
          <el-select v-model="operateform.paymentType" filterable clearable placeholder="搜索或选择付款方式">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in paymentlist" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支出类型" prop="spendType" class="select">
          <el-select v-model="operateform.spendType" filterable clearable placeholder="搜索或选择支出类型">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in spendlist" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用类型" prop="FeeTypeId" class="select">
          <treeselect ref="trees3" v-model="operateform.FeeTypeId" :normalizer="normalizer" placeholder="搜索或选择费用类型" :default-expand-level="1" :disable-branch-nodes="true" :options="Feelist" @select="chooseFeeType" />
        </el-form-item>
        <!-- <el-form-item label="收款信息" prop="payeeId" class="select">
          <el-select v-model="operateform.payeeId" filterable clearable placeholder="搜索或选择收款信息">
            <el-option :label="item.name+'-'+item.branch" :value="item.id" v-for="(item, index) in payeeinfos" :key="index"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="资金用途" prop="description" class="text">
          <el-input type="textarea" :rows="5" maxlength="200" v-model="operateform.description"></el-input>
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
import { MenuIdDate, uuid } from '@/utils/CustomValidation.js'
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
  data () {
    return {
      dialogVisible: false,
      fileloading: false,
      operateform: {
        // title: '', // 标题
        // legalEntity: '', // 公司名称(法人实体)-获取自定义档案值
        // loanDepartment: null, // 经办部门-获取易快报部门列表
        // loanMoney: '', // 金额
        // payeeId: '', // 收款信息-获取易快报账号信息
        // description: '', // 资金用途
        // attachments: '', // 附件
        expenseDepartment: null, // 费用承担部门-获取易快报部门列表
        paymentType: '', // 付款方式(付款方式)-获取自定义档案值 u_付款方式
        spendType: '', // 支出类型(支出类型)-获取自定义档案值 u_支出类型
        FeeTypeId: null, // 费用类型Id-获取费用类型请列表
        FeeTypeCode: '', // 费用类型编码-获取费用类型请列表
        customer: '', // 客户单位(客户单位)-获取自定义档案值 u_客户单位
        legal: '', // 法人实体(法人实体)-获取自定义档案值 法人实体
      },
      normalizer (node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },
      expenseobj: {}, // 经办人对象
      // payeeinfoso: [], // 收款信息
      paymentlist: [], // 付款方式列表
      spendlist: [], // 支出类型列表
      departmentslist: [], // 易快报部门列表
      Feelist: [], // 费用类型列表
      customerlist: [], // 客户单位列表
      lagellist: [], // 法人实体列表
      rules: {
        // title: [{ required: true, message: '请输入审核标题', trigger: 'blur' }],
        // legalEntity: [{ required: true, message: '请选择公司名称', trigger: 'change' }],
        // loanDepartment: [{ required: true, message: '请选择经办部门', trigger: 'change' }],
        // loanMoney: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        // payeeId: [{ required: true, message: '请选择收款信息', trigger: 'change' }],
        // description: [{ required: true, message: '请输入资金用途', trigger: 'blur' }],
        expenseDepartment: [{ required: true, message: '请选择经办部门', trigger: 'change' }],
        paymentType: [{ required: true, message: '请选择付款方式', trigger: 'change' }],
        spendType: [{ required: true, message: '请选择支出类型', trigger: 'change' }],
        FeeTypeId: [{ required: true, message: '请选择费用类型', trigger: 'change' }],
        customer: [{ required: true, message: '请选择客户单位', trigger: 'change' }],
        legal: [{ required: true, message: '请选择付款公司', trigger: 'change' }],
      },
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      console.log(this.contentdata);
      // this.operateform.title = this.contentdata.Title
      // this.operateform.loanMoney = this.contentdata.Amount
      // this.operateform.attachments = this.contentdata.Attachment
      // if (this.lagellist && this.lagellist.length) {
      // } else {
      //   this.getUserDefinedFilelagel()
      // }
      // if (this.payeeinfos && this.payeeinfos.length) {
      // } else {
      //   this.getpayeeinfos()
      // }
      if (this.departmentslist && this.departmentslist.length) {
        this.getTreeText(this.departmentslist, this.contentdata.HandleOrgName, 'expenseobj')
        this.operateform.expenseDepartment = this.expenseobj.id
      } else {
        this.getDepartments()
      }
      // if (this.paymentlist && this.paymentlist.length) {
      //   // 数据返填
      //   console.log(this.paymentlist)
      //   let selectdata = {}
      //   selectdata = this.paymentlist.find(v => {
      //     return v.name === this.contentdata.MethodText
      //   }) || {}
      //   this.operateform.paymentType = selectdata.id || ''
      // } else {
      // this.getUserDefinedFilepayment()
      // }
      // if (this.spendlist && this.spendlist.length) {
      //   // 数据返填
      //   let selectdata = {}
      //   console.log(this.spendlist)
      //   selectdata = this.spendlist.find(v => {
      //     return v.name === this.contentdata.TypeText
      //   }) || {}
      //   this.operateform.spendType = selectdata.id || ''
      // } else {
      // this.getUserDefinedFilespend()
      // }
      // if (this.Feelist && this.Feelist.length) {
      // } else {
      // this.getFeeTypes()
      // }
      // if (this.customerlist && this.customerlist.length) {
      //   let selectdata = {}
      //   selectdata = this.customerlist.find(v => {
      //     return v.name === this.contentdata.TypeText
      //   }) || {}
      //   this.operateform.customer = selectdata.id || ''
      // } else {
      // this.getUserDefinedFilecustomer()
      // }
      // if (this.lagellist && this.lagellist.length) {
      //   let selectdata = {}
      //   selectdata = this.lagellist.find(v => {
      //     return v.name === this.contentdata.TypeText
      //   }) || {}
      //   this.operateform.legal = selectdata.id || ''
      // } else {
      // this.getUserDefinedFilelegal()
      // }
    }

  },
  created () {
    // 
    // this.getFeeTypes()
    setTimeout(() => {
      this.getUserDefinedFilepayment()
      setTimeout(() => {
        this.getUserDefinedFilespend()
        setTimeout(() => {
          this.getUserDefinedFilecustomer()
          setTimeout(() => {
            this.getUserDefinedFilelegal()
          }, 1000)
        }, 1000)
      }, 1000)
    }, 1000)



    // this.getUserDefinedFilespend()
    // this.getFeeTypes()
    // this.getUserDefinedFilecustomer()
    // this.getUserDefinedFilelegal()

    // Promise.all([
    //   GetUserDefinedFile(qs.stringify({
    //     Start: 1,
    //     Count: 999,
    //     type: '付款方式',
    //     menuid: MenuIdDate(),
    //     operationcode: 1
    //   })),
    //   GetUserDefinedFile(qs.stringify({
    //     Start: 1,
    //     Count: 999,
    //     type: '支出类型',
    //     menuid: MenuIdDate(),
    //     operationcode: 1
    //   })),
    //   GetUserDefinedFile(qs.stringify({
    //     Start: 1,
    //     Count: 999,
    //     type: '客户单位',
    //     menuid: MenuIdDate(),
    //     operationcode: 1
    //   })),
    //   GetUserDefinedFile(qs.stringify({
    //     Start: 1,
    //     Count: 999,
    //     type: '法人实体',
    //     menuid: MenuIdDate(),
    //     operationcode: 1
    //   }))

    // ]).then(resin => {
    //   console.log(resin)
    // })
  },
  methods: {
    // // 获取易快报账号信息
    // getpayeeinfos (value) {
    //   let obj = {
    //     Start: 1,
    //     Count: 999,
    //     Names: '',
    //     CardNos: '',
    //     Ids: '',
    //     menuid: MenuIdDate(),
    //     operationcode: 1
    //   }
    //   GetPayeeInfos(qs.stringify(obj)).then(response => {
    //     this.payeeinfos = response.items
    //   })
    // },
    // // 获取自定义档案值
    // getUserDefinedFilelagel () {
    //   let obj = {
    //     Start: 1,
    //     Count: 999,
    //     type: '法人实体',
    //     menuid: MenuIdDate(),
    //     operationcode: 1
    //   }
    //   GetUserDefinedFile(qs.stringify(obj)).then(response => {
    //     this.lagellist = response.items
    //   })
    // },
    // 获取易快报部门列表
    getDepartments (value) {
      let obj = {
        Start: 1,
        Count: 999,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetDepartments(qs.stringify(obj)).then(response => {
        this.departmentslist = response.items
        this.upAndDown(this.departmentslist)
        this.getTreeText(this.departmentslist, this.contentdata.HandleOrgName, 'expenseobj')
        this.operateform.expenseDepartment = this.expenseobj.id
        // this.getTreeText(this.departmentslist, this.contentdata.HandleOrgName)
      })
    },
    // 删除数据的空children
    upAndDown (arr) {
      arr.forEach(obj => {
        if (obj.children.length <= 0) {
          delete obj.children
          return
        } else {
          this.upAndDown(obj.children)
        }
      })
    },
    // 根据文本模拟匹配树状图数据
    getTreeText (array, text, obj) {
      if (text && array && array.length) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].name === text) {
            this.expenseobj = array[i]
            return
          } else {
            this.getTreeText(array[i].children, text)
          }
        }
      }
    },
    // 获取费用类型
    getFeeTypes () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetFeeTypes(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.Feelist = response.Data.items
            this.upAndDown(this.Feelist)
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取自定义档案值客户单位
    async getUserDefinedFilecustomer () {
      let obj = {
        Start: 1,
        Count: 999,
        type: '客户单位',
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetUserDefinedFile(qs.stringify(obj)).then(response => {
        this.customerlist = response.items
        // 数据返填
        // let selectdata = {}
        // selectdata = this.customerlist.find(v => {
        //   return v.name === this.contentdata.TypeText
        // }) || {}
        // this.operateform.customer = selectdata.id || ''
      })
    },
    // 获取自定义档案值客户单位
    async getUserDefinedFilelegal () {
      let obj = {
        Start: 1,
        Count: 999,
        type: '法人实体',
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetUserDefinedFile(qs.stringify(obj)).then(response => {
        this.lagellist = response.items
        // 数据返填
        // let selectdata = {}
        // selectdata = this.lagellist.find(v => {
        //   return v.name === this.contentdata.TypeText
        // }) || {}
        // this.operateform.legal = selectdata.id || ''
      })
    },
    // 获取自定义档案值
    async getUserDefinedFilespend () {
      let obj = {
        Start: 1,
        Count: 999,
        type: '支出类型',
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetUserDefinedFile(qs.stringify(obj)).then(response => {
        this.spendlist = response.items
        // 数据返填
        // let selectdata = {}
        // selectdata = this.spendlist.find(v => {
        //   return v.name === this.contentdata.TypeText
        // }) || {}
        // this.operateform.spendType = selectdata.id || ''
      })
    },
    // 获取自定义档案值
    async getUserDefinedFilepayment () {
      let obj = {
        Start: 1,
        Count: 999,
        type: '付款方式',
        menuid: MenuIdDate(),
        operationcode: 1
      }
      // new Promise((resolve, reject) => {
      GetUserDefinedFile(qs.stringify(obj)).then(response => {
        this.paymentlist = response.items
        // resolve(response.items)
        // 数据返填
        // let selectdata = {}
        // selectdata = this.paymentlist.find(v => {
        //   return v.name === this.contentdata.MethodText
        // }) || {}
        // this.operateform.paymentType = selectdata.id || ''
      })
      // })

    },
    // 选择费用类型
    chooseFeeType (node, instanceId) {
      this.operateform.FeeTypeCode = node.code
    },
    // 关闭弹框
    closedialog () {
      this.operateform = {
        // title: '',
        // legalEntity: '',
        // loanDepartment: null,
        // loanMoney: '',
        // payeeId: '',
        // description: '',
        // attachments: '',
        paymentType: '',
        spendType: '',
        expenseDepartment: null,
        FeeTypeId: null,
        FeeTypeCode: '',
        customer: '',
        legal: ''
      }
      this.$refs['operateform'].resetFields();
      this.$emit('closeauditdialog')
    },
    // 提交审核
    submitreview () {
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
          color: #fff;
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
</style>