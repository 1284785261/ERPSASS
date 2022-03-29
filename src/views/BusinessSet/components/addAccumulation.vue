//新建公积金
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showInterface" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-Interface">
        <el-form-item label="规则名称" prop="RuleName">
          <el-input v-model="dataObject.RuleName" size="small" />
        </el-form-item>
        <el-form-item label="缴纳基数" prop="FundBase" class="TheProportion">
          <el-input v-model="dataObject.FundBase" size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="公积金计算方式" prop="FundType" class="State">
          <el-radio-group v-model="dataObject.FundType">
            <el-radio label="0">百分比</el-radio>
            <el-radio label="1">固定值</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公积金缴纳比例（企业部分）" prop="FundCompany" class="TheProportion">
          <el-input v-model="dataObject.FundCompany" size="small">
            <svg-icon v-if="dataObject.FundType == '1'" slot="suffix" icon-class="money" class-name="way" />
            <svg-icon v-if="dataObject.FundType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="公积金缴纳比例（个人部分）" prop="FundPersonal" class="TheProportion">
          <el-input v-model="dataObject.FundPersonal" size="small">
            <svg-icon v-if="dataObject.FundType == '1'" slot="suffix" icon-class="money" class-name="way" />
            <svg-icon v-if="dataObject.FundType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="使用状态" prop="Status" class="State">
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
  name: 'addAccumulation',
  props: ['showAddAccumulation', 'title', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        RuleName: '',
        FundBase: '',
        FundType: '0',
        FundCompany: '',
        FundPersonal: '',
        Status: '1'
      },

      showInterface: false,
      Formrules: {}
    }
  },
  watch: {
    showAddAccumulation (newvalue, oldvalue) {
      this.showInterface = newvalue
      this.dataObject = this.$options.data().dataObject
      if (this.title == '新建公积金计算规则') {

      } else if (this.title == '修改公积金计算规则') {
        this.dataObject = this.tempData
        this.dataObject.Status += ''
        this.dataObject.FundType += ''
      }
    }
  },
  created () {

  },
  methods: {
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('AccumulationSave', this.dataObject)
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
      this.$emit('closeAddAccumulation', false)
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
  /deep/ .TheProportion {
    .way {
      font-size: 16px;
    }
  }
}
</style>