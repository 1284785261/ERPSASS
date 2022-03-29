<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" ref="operateform" label-width="100px" class="operateform">
        <el-form-item :label="itemname" prop="date" :rules="{ required: true, message: `请输入${this.itemname}`, trigger: 'change' }">
          <el-date-picker v-model="operateform.date" type="month"></el-date-picker>
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
  props: {
    itemname: {
      type: String,
    },
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
  data () {
    return {
      operateform: {
        date: ''
      },
      dialogVisible: false
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (newvalue) {
        this.operateform.date = this.contentdata.date
      }
    }
  },
  methods: {
    save () {
      this.$refs.operateform.validate(v => {
        if (v) {
          // 处理时间
          let obj = {
            Year: '',
            Month: ''
          }
          obj.Year = this.operateform.date.getFullYear()
          obj.Month = this.operateform.date.getMonth() + 1
          console.log(obj);

          this.$emit('saverevision', obj)
        }
      })
    },
    closedialog () {
      this.$emit('closeSaverevision', false)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>