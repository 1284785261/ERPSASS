// 加入黑名单备注框
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showContent" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms">
        <el-form-item label="备注" prop="Remark" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="dataObject.Remark" size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'BlackContent',
  props: {
    showBlackContent: {
      type: Boolean,
    },
    title: {
      type: String,
      default: '加入黑名单'
    },
    itemMap: {
      type: Object,
    },
  },
  data () {
    return {
      dataObject: {
        Id: '',
        Remark: ''
      },
      showContent: false
    }
  },
  watch: {
    showBlackContent (newvalue, oldvalue) {
      this.showContent = newvalue
      if (this.title == '修改黑名单') {
        this.dataObject = this.itemMap
      }
    }
  },
  created () {
  },
  methods: {
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$emit('BlackContentSave', this.dataObject)
    },
    close () {
      this.$emit('closeBlackContent', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
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
      .el-select {
        display: block;
        .el-input__suffix {
          top: 24px;
          height: 40px;
        }
      }
    }
  }

  /deep/ .textarea-note {
    textarea {
      resize: none;
      background: $erinputbgc;
      border: none;
    }
    .el-input__count {
      bottom: 2px;
      height: 30px;
      line-height: 30px;
      right: 20px;
      background: $erinputbgc;
    }
  }
}
</style>