//查看合同模板
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showContract" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms">
        <el-form-item label="模板名称" prop="ContractName">
          <el-input v-model="dataObject.ContractName" disabled size="small" />
        </el-form-item>
        <el-form-item label="上传文档" clearable prop="FileUrl" class="File-item">
          <el-input v-model="dataObject.FileUrl" disabled size="small" />
        </el-form-item>
        <el-form-item label="适用业务" prop="BusinessType">
          <el-input v-model="dataObject.BusinessTypeText" disabled size="small" />
        </el-form-item>
        <el-form-item label="使用状态" prop="Status">
          <p v-if="dataObject.Status =='1'">启用</p>
          <p v-else>禁用</p>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'lookContract',
  props: ['showlookContract', 'title', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        BusinessType: '',
        FileUrl: '',
        Status: '1'
      },
      showContract: false
    }
  },
  watch: {
    showlookContract (newvalue, oldvalue) {
      this.showContract = newvalue
      this.dataObject = this.tempData
      this.dataObject.Status += ''
    }
  },
  methods: {
    close () {
      this.$emit('closelookContract', false)
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
      color: #000;
    }

    .el-form-item__content {
      margin-left: 0;
      width: 100%;
      .el-select {
        display: block;
        /deep/ .el-input__suffix {
          top: 12px;
        }
      }
    }
  }
  p {
    margin-top: 24px;
  }
}
</style>