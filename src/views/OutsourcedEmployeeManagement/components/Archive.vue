//转交存档
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="转交存档" class="dialog-box" append-to-body :visible.sync="showInterface" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <div>
        合同转交存档后，档案管理人员会进行审核，审核通过
        之后当前合同将不可在修改，是够还要继续转交存档？
      </div>
      <div slot="footer" class="dialog-Archive">
        <el-button class="del-button" round size="small" @click="close">考虑一下</el-button>
        <el-button class="operation-button" round size="small" @click="dialogtrue('ruleForm')">转交文档</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Archive',
  props: ['showArchive', 'tempData'],
  data () {
    return {
      showInterface: false,
      Formrules: {}
    }
  },
  watch: {
    showArchive (newvalue, oldvalue) {
      this.showInterface = newvalue
    }
  },
  created () {

  },
  methods: {
    dialogtrue () {

    },
    close () {
      this.$emit('closeArchive', false)
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