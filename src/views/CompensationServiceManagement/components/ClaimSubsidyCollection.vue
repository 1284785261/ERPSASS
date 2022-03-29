<!--补贴认领回款-->
<template>
  <div class="ClaimSubsidy-Box">
    <el-dialog :close-on-click-modal="false" title="认领补贴回款" :visible.sync="dialogVisible" width="800px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form label-position="top" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="需要认领的金额" class="fromItems">
          <el-input size="small" v-model="AmountClaim" placeholder="请输入需要认领的金额"></el-input>
        </el-form-item>
        <el-form-item label="入账年月" class="fromItems">
          <el-date-picker size="small" v-model="EntryDate" type="month" placeholder="选择年月"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" class="fromItem-textarea texts">
          <el-input type="textarea" resize="none" v-model="Remark" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
        <el-form-item label="是否要用作抵扣项目成本" class="fromItems">
          <el-radio-group v-model="ProjectCostRadio">
             <el-radio :label="0">否</el-radio>
             <el-radio :label="1">是</el-radio>
         </el-radio-group>
          <el-input v-if="ProjectCostRadio===1" size="small" v-model="projectCost" placeholder="请输入要抵扣的项目成本"></el-input>
        </el-form-item>
        <el-form-item label="是否要抵扣公司部分支出" class="fromItems">
          <el-radio-group v-model="PartialExpenditureRadio">
             <el-radio :label="0">否</el-radio>
             <el-radio :label="1">是</el-radio>
         </el-radio-group>
          <el-input v-if="PartialExpenditureRadio===1" size="small" v-model="CompanyPartialExpenditure" placeholder="请输入要抵扣的公司部分支出"></el-input>
        </el-form-item>
        <el-form-item label="是否作为项目毛利" class="fromItems">
          <el-radio-group v-model="ProjectGrossProfitRadio">
             <el-radio :label="0">否</el-radio>
             <el-radio :label="1">是</el-radio>
         </el-radio-group>
          <el-input v-if="ProjectGrossProfitRadio===1" size="small" v-model="ProjectGrossProfit" placeholder="请输入要抵扣的项目毛利"></el-input>
        </el-form-item>
        <el-form-item label="纳入毛利的项目" class="fromItems">
          <el-select v-model="GrossProfitProject" class="selects" placeholder="请选择纳入毛利的项目" size="small">
            <el-option v-for="(item,index) in GrossProfitProjectList" :key="index" :label="item.describe" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="纳入毛利的金额" class="fromItems">
          <el-input size="small" v-model="GrossProfitAmount" placeholder="请输入纳入毛利的金额"></el-input>
        </el-form-item>
        <el-form-item label="认领回款到项目" class="fromItems">
          <el-select v-model="ClaimPaymentProject" class="selects" placeholder="请选择要认领的项目" size="small">
            <el-option v-for="(item,index) in ClaimPaymentProjectList" :key="index" :label="item.describe" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目认领金额" class="fromItems">
          <el-input size="small" v-model="ClaimPaymentAmount" placeholder="请输入项目认领金额"></el-input>
        </el-form-item>
        <el-form-item label="认领到外包员工" class="fromItems">
          <el-select v-model="EmployeeClaim" class="selects" placeholder="请选择外包员工" size="small">
            <el-option v-for="(item,index) in EmployeeClaimList" :key="index" :label="item.describe" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工认领金额" class="fromItems">
          <el-input size="small" v-model="EmployeeClaimAmount" placeholder="请输入员工认领金额"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer-button">
        <el-button class="operation-button" type="primary" @click="closedialog">取消</el-button>
        <el-button class="operation-button" type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['DialogTrue'],
  data () {
    return {
      AmountClaim:'',
      ProjectGrossProfitRadio:0,
      ProjectCostRadio:0,
      PartialExpenditureRadio:0,
      dialogVisible: false,
      GrossProfitAmount: '',
      EntryDate: '',
      Remark: '',
      GrossProfitProject:'',
      GrossProfitProjectList: [],
      ClaimPaymentProject:'',
      ClaimPaymentProjectList:[],
      ClaimPaymentAmount:'',
      EmployeeClaim:'',
      EmployeeClaimList:[],
      EmployeeClaimAmount:'',
      projectCost:'',
      CompanyPartialExpenditure:'',
      ProjectGrossProfit:'',
    }
  },
  watch: {
    DialogTrue (newvalue, oldvalue) {
      //切换弹窗状态
      this.dialogVisible = newvalue
      //关闭弹窗清空数据
      if(this.dialogVisible==false){
          this.AmountClaim = ''
          this.ProjectGrossProfitRadio=-1
          this.ProjectCostRadio=-1,
          this.PartialExpenditureRadio=-1
          this.GrossProfitAmount=''
          this.EntryDate = ''
          this.Remark = ''
          this.GrossProfitProject=''
          this.ClaimPaymentProject=''
          this.ClaimPaymentAmount=''
          this.EmployeeClaim=''
          this.EmployeeClaimAmount=''
          this.projectCost=''
          this.CompanyPartialExpenditure=''
          this.ProjectGrossProfit=''
      }
    },
  },
  methods: {
    //关闭弹窗
    closedialog () {
      this.$emit('DialogFalse', false)
    },
    //保存
    save () {
      this.closedialog()
    },
  }
}
</script>
<style lang="scss" scoped>
.ClaimSubsidy-Box {
  .fromItems {
    width: 48%;
    display: inline-block;
    margin: 0 1%;
    .selects {
      width: 100%;
    }
  }
  .fromItem-textarea {
    width: 48% !important;
    display: inline-block !important;
    margin: 0 1% !important;
  }
  .footer-button {
    margin: 20px 0 20px 0;
    text-align: center;
    button {
      margin: 0 12px;
    }
  }
}
</style>