<!-- 结算工资项 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="结算项名称" prop="SalaryItem">
          <el-input v-model="operateform.SalaryItem"></el-input>
        </el-form-item>
        <el-form-item label="合计归属项" class="select" prop="Type">
          <el-select v-model="operateform.Type" placeholder="请选择合计归属项">
            <el-option v-for="item in DetailType" :key="item.value" :label="item.describe" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否挂账" v-if="operateform.Type === 5" prop="IsOnCredit">
          <el-radio-group v-model="operateform.IsOnCredit">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="是否分账" v-if="operateform.Type === 5" prop="OnCreditType">
          <el-radio-group v-model="operateform.OnCreditType">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="人数" prop="TotalStaff">
          <el-input v-model="operateform.TotalStaff"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="Amount">
          <el-input v-model="operateform.Amount"></el-input>
        </el-form-item>
        <el-form-item label="备注" class="text">
          <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="operateform.Remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetSalarySettleDetailType } from '@/api/CompensationServiceManagement.js'
import qs from 'qs'
export default {
  props: {
    title: {
      type: String,
      default: '添加结算工资项'
    },
    visible: {
      type: Boolean
    },
    contentdata: {
      type: Object
    }
  },
  computed: {
    // ...mapGetters([
    //   'detailType'
    // ])
  },
  data () {
    return {
      dialogVisible: false,
      operateform: {
        SalarySettleId: '',
        Type: '',
        SalaryItem: '',
        TotalStaff: '',
        Amount: '',
        Remark: '',
        IsOnCredit: 0,
        OnCreditType: 0
      },
      rules: {
        SalaryItem: [
          { required: true, message: '请输入结算项名称', trigger: 'blur' },
        ],
        TotalStaff: [
          { required: true, message: '请输入人数', trigger: 'blur' },
        ],
        Amount: [
          { required: true, message: '请输入金额', trigger: 'blur' },
        ],
        Type: [
          { required: true, message: '请选择归属项', trigger: 'change' }
        ]
      },
      DetailType: [], // 结算类型
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      // this.DetailType = this.detailType.slice(0, this.detailType.length - 1)
      this.$nextTick(() => {
        this.$refs.operateform.clearValidate()
      })

      // if (this.contentdata.Id) {
      //   this.operateform = this.contentdata
      // }else{

      }
    // },
  },
  created () {
    this.getSalarySettleDetailType()
  },
  methods: {
    getSalarySettleDetailType() {
      GetSalarySettleDetailType().then(response => {
        if (response) {
          this.DetailType = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    save () {
      this.$refs.operateform.validate(v => {
        if (v) {
          console.log(this.operateform)
          this.$emit('saveitem', this.operateform)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    closedialog () {
      this.operateform = this.$options.data().operateform
      // this.$refs.operateform.clearValidate()
      this.$emit('closedialog')
    },
  },
}
</script>

<style lang="scss">
</style>