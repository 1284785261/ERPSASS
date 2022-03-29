<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title + '办理'" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" ref="operateform" label-width="100px" class="operateform">
        <!-- 废弃 现在默认打开窗口就选择是 不存在否 -->
        <!-- <el-form-item :label="title" class="useraido" prop="Status" :rules="{ required: true, message: `请选择是否${this.title}`, trigger: 'change' }">
          <el-radio-group v-model="operateform.Status">
            <el-radio :label="1" v-if="!isstop">是</el-radio>
            <el-radio :label="2" v-if="isstop">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item :label="title + '时间'">
          <el-date-picker size="small" v-model="operateform.date" type="month" placeholder="选择月"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // props: ['title', 'visible', 'contentdata'],
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
    },
    contentdata: {
      type: Object
    },
    isstop: {
      type: Boolean,
    }
  },
  data() {
    return {
      dialogVisible: false,
      operateform: {
        Status: '',
        date: '',
        Year: '',
        Month: ''
      },
      rules: {
        Status: [
          { required: true, message: `请选择是否${this.title}`, trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    visible(newvalue, oldvalue) {
      this.dialogVisible = newvalue
      console.log(this.isstop);
      if (this.isstop) {
        // 停缴 2
        this.operateform.Status = 2
      } else {
        // 缴纳 1
        this.operateform.Status = 1
      }
    }
  },
  methods: {
    save() {
      this.$refs.operateform.validate(v => {
        if (v) {
          // 处理时间
          if (this.operateform.date) {
            this.operateform.Year = this.operateform.date.getFullYear()
            this.operateform.Month = this.operateform.date.getMonth() + 1
          } else {
            this.operateform.Year = ''
            this.operateform.Month = ''
          }
          this.$emit('savepayment', this.operateform)
        } else {
        }
      })
    },
    closedialog() {
      this.operateform = {
        Status: '',
        date: '',
        Year: '',
        Month: ''
      }
      this.$refs.operateform.resetFields()
      this.$emit('closepayment')
    }
  },
}
</script>

<style lang="scss">
  
</style>