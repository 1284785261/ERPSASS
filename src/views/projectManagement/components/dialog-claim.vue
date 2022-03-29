<!-- 认领回款弹框 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <div class="title">可认领最大金额: {{ contentdata.UsedAmount }}</div>
        <el-form-item label="需要认领的金额" prop="Amount">
          <el-input v-model="operateform.Amount" placeholder="请输入认领的金额"></el-input>
        </el-form-item>
        <el-form-item label="入账年月" prop="date">
          <el-date-picker v-model="operateform.date" type="month" placeholder="选择月"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" class="text">
          <el-input type="textarea" :rows="6" v-model="operateform.Remark" maxlength="500" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="erpbtn" size="small" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    visible: {
      type: Boolean
    },
    contentdata: {
      type: Object
    }
  },
  data() {
    return {
      dialogVisible: false,
      operateform: {
        date: '',
        Year: '',
        Month: '',
        Amount: '',
        Remark: '',

      },
      rules: {
        Amount: [
          { required: true, message: '请输入需要认领的金额', trigger: 'blur' },
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    visible(newvalue, oldvalue) {
      this.dialogVisible = newvalue
      // if (this.contentdata.Amount) {
      //   this.operateform.Amount = this.contentdata.Amount
      // }
    }
  },
  methods: {
    closedialog() {
      this.operateform = {
        date: '',
        Year: '',
        Month: '',
        Amount: '',
        Remark: '',
      },
      this.$refs.operateform.resetFields()
      this.$emit('closedialog')
    },
    // 保存
    save() {
      this.$refs['operateform'].validate((valid) => {
        if (valid) {
          if (this.operateform.Amount > this.contentdata.UsedAmount) {
            this.$message({
              message: '认领金额不能大于待认领金额',
              type: 'warning'
            })
            return
          }
          this.operateform.Year = this.operateform.date.getFullYear()
          this.operateform.Month = this.operateform.date.getMonth() + 1
          this.operateform.SysUserId = JSON.parse(window.localStorage.getItem('Current')).currentId
          this.$emit('saveclaim', this.operateform)
        }
      })
    },
  },
}
</script>

<style lang="scss">
  
</style>