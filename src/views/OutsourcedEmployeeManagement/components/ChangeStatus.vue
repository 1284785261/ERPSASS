//变更状态
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="变更状态" class="dialog-box" append-to-body :visible.sync="showChanges" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms">
        <el-form-item label="选择当前证明的状态" prop="Status" class="State">
          <el-radio-group v-model="dataObject.Status">
            <el-radio label="3">待开具</el-radio>
            <el-radio label="4">已开具</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-Status">
        <el-button class="operation-button" round size="small" @click="close">取消</el-button>
        <el-button class="operation-button" round size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'addContract',
  props: ['showChange'],
  data () {
    return {
      dataObject: {
        Status: ''
      },
      Status: 0,
      showChanges: false,
    }
  },
  watch: {
    showChange (newvalue, oldvalue) {
      this.showChanges = newvalue
    }
  },
  created () {

  },
  methods: {
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('ChangeSave', this.dataObject)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    close () {
      this.$emit('closeChange', false)
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
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      label {
        &:nth-child(1) {
          margin-right: 60px;
        }
      }
    }
  }
}
.dialog-Status {
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
}
</style>