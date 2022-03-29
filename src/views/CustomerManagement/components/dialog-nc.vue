<!-- 跟进信息 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="客户NC编码">
          <el-input class="erpsearchinput" placeholder="请输入客户NC编码" clearable size="small" v-model="operateform.NCCode" />
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
import { copy, MenuIdDate } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  props: ['title', 'visible', 'contentdata'],
  data () {
    return {
      operateform: {
        NCCode: ''
      },
      user: {},
      dialogVisible: false,
      rules: {
        NCCode: [
          { required: true, message: '请输入客户NC编码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      this.operateform.NCCode = this.contentdata
    }
  },
  created () {
  },
  methods: {
    // 关闭
    closedialog () {
      this.$refs.operateform.resetFields()
      this.$emit('closedialog', false)
    },
    save () {
      this.$refs.operateform.validate(v => {
        if (v) {
          let obj = copy(this.operateform)
          this.$emit('savedialog', obj)
        }
      })
    }
  },
}
</script>

<style lang="scss">
.search-keyword {
  text-align: center;
  padding: 3px 0;
  color: #ccc;
  font-size: 13px;
}
</style>