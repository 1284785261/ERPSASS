//提交审核
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="提交审核" class="dialog-box" append-to-body :visible.sync="showSubAudit" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <div>
        当前证明开具信息提交审核后将不可修改 ，是否确认提交？
      </div>
      <div slot="footer" class="dialog-Archive">
        <el-button class="del-button" round size="small" @click="close">考虑一下</el-button>
        <el-button class="operation-button" round size="small" @click="dialogtrue('ruleForm')">提交审核</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'SubmitAudit',
  props: ['showAudit', 'tempData'],
  data () {
    return {
      showSubAudit: false,
      Formrules: {}
    }
  },
  watch: {
    showAudit (newvalue, oldvalue) {
      this.showSubAudit = newvalue
    }
  },
  created () {

  },
  methods: {
    dialogtrue () {

    },
    close () {
      this.$emit('closeAudit', false)
    }
  }
}
</script>
<style lang="scss" scoped>
// @import "@/styles/publicStyle.scss";
.dialog-Archive {
  text-align: center;
  .operation-button {
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    width: 80px !important;
    margin: 20px 12px;
    padding: 13px 11px !important;
    border: 1px solid #fff;
    &:hover {
      background: #fff;
      color: #1588f8;
      border: 1px solid #1588f8;
    }
  }
  .del-button {
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    width: 80px !important;
    margin: 20px 12px;
    padding: 13px 11px !important;
    border: 1px solid #fff;
    &:hover {
      background: #fff;
      color: #1588f8;
      border: 1px solid #1588f8;
    }
  }
}
</style>