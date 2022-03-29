<template>
  <div class="ClaimSubsidy-Box">
    <el-dialog :close-on-click-modal="false" title="认领补贴" :visible.sync="dialogVisible" width="800px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form label-position="top" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="所属项目" class="fromItems">
          <el-select v-model="ProjectName" class="selects" placeholder="从当前账户所有项目列表选择或者搜索" size="small">
            <el-option v-for="(item,index) in ProjectNameList" :key="index" :label="item.describe" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属员工" class="fromItems">
          <el-select v-model="Employees" class="selects" placeholder="从所属项目中选择或者搜索员工" size="small">
            <el-option v-for="(item,index) in EmployeesList" :key="index" :label="item.describe" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需要认领的金额" class="fromItems">
          <el-input size="small" v-model="AmountClaim" placeholder="认领金额"></el-input>
        </el-form-item>
        <el-form-item label="入账年月" class="fromItems">
          <el-date-picker size="small" v-model="EntryDate" type="month" placeholder="选择年月"></el-date-picker>
        </el-form-item>

        <el-form-item label="抵扣项目成本金额" class="fromItems">
          <el-input size="small" v-model="DeductionProjectCostAmount" placeholder="补贴流水中抵扣项目成本金额，没有则为0，单位元"></el-input>
        </el-form-item>
        <el-form-item label="抵扣公司部分支出金额" class="fromItems">
          <el-input size="small" v-model="DeductionCompanyExpenditure" placeholder="补贴流水中抵扣公司部分支出金额，没有则为0，单位元"></el-input>
        </el-form-item>
        <el-form-item label="纳入项目毛利的金额" class="fromItems">
          <el-input size="small" v-model="ProjectGrossProfitAmount" placeholder="补贴流水中纳入项目毛利的金额，没有则为0，单位元"></el-input>
        </el-form-item>
        <el-form-item label="认领到项目金额" class="fromItems">
          <el-input size="small" v-model="ClaimedAmount" placeholder="补贴流水中认领到项目金额，没有则为0，单位元"></el-input>
        </el-form-item>
        <el-form-item label="认领到员工金额" class="fromItems">
          <el-input size="small" v-model="AmountClaimedEmployee" placeholder="补贴流水中认领到员工金额，没有则为0，单位元"></el-input>
        </el-form-item>
        <el-form-item label="备注" class="fromItem-textarea">
          <el-input type="textarea" resize="none" v-model="Remark" autosize></el-input>
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
  props: ['isShow'],
  data () {
    return {
      dialogVisible: false,
      ProjectName: '',
      Employees: '',
      AmountClaim: '',
      EntryDate: '',
      Remark: '',
      DeductionProjectCostAmount: '',
      DeductionCompanyExpenditure: '',
      ProjectGrossProfitAmount: '',
      ClaimedAmount: '',
      AmountClaimedEmployee: '',
      ProjectNameList: [],
      EmployeesList: [],
    }
  },
  watch: {
    isShow (newvalue, oldvalue) {
      this.dialogVisible = newvalue
    },
  },
  created () {
    this.dialogVisible = this.isShow
  },
  methods: {
    closedialog () {
      this.$emit('isHide', false)
      this.ProjectName = ''
      this.Employees = ''
      this.AmountClaim = ''
      this.EntryDate = ''
      this.Remark = ''
      this.DeductionProjectCostAmount = ''
      this.DeductionCompanyExpenditure = ''
      this.ProjectGrossProfitAmount = ''
      this.ClaimedAmount = ''
      this.AmountClaimedEmployee = ''
    },
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
    width: 100%;
    margin: 0 1%;
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