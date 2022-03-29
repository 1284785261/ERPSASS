//映射新街口
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showInterface" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-Interface">
        <el-form-item label="系统接口" prop="No">
          <el-input v-model="dataObject.No" size="small" />
        </el-form-item>
        <el-form-item label="钉钉接口" prop="roleName">
          <el-input v-model="dataObject.roleName" size="small" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input type="textarea" :rows="6" v-model="dataObject.note" size="small" class="textarea-note" />
        </el-form-item>
        <el-form-item label="使用状态" prop="note" class="State">
          <el-radio-group v-model="dataObject.Status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'addInterface',
  props: ['showAddInterface', 'title'],
  data () {
    return {
      dataObject: {
        No: '',
        roleName: '',
        note: '',
        radio1: ''
      },

      showInterface: false,
      Formrules: {}
    }
  },
  watch: {
    showAddInterface (newvalue, oldvalue) {
      this.showInterface = newvalue
    }
  },
  created () {

  },
  methods: {
    close () {
      this.$emit('closeInterface', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms-Interface {
  /deep/ .el-form-item {
    margin-bottom: 12px;

    .el-form-item__label {
      width: 50%;
      text-align: left;
      line-height: 24px;
      color: #666666;
    }

    .el-form-item__content {
      margin-left: 0;
      width: 100%;
    }
    .textarea-note {
      textarea {
        resize: none;
        background: $erinputbgc;
        border: none;
      }
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      label {
        &:nth-child(1) {
          margin-right: 120px;
        }
      }
    }
  }
}
</style>