//查看公积金
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showAccumulation" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms-Interface">
        <el-form-item label="规则名称" prop="RuleName">
          <el-input v-model="dataObject.RuleName" disabled size="small" />
        </el-form-item>
        <el-form-item label="缴纳基数" prop="FundBase" class="TheProportion">
          <el-input v-if="dataObject.FundBase" v-model="dataObject.FundBase" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="公积金计算方式" prop="FundType" class="State">

          <p v-if="dataObject.FundType =='1'">固定值</p>
          <p v-else>百分比</p>
        </el-form-item>
        <el-form-item label="公积金缴纳比例（企业部分）" prop="FundCompany" class="TheProportion">

          <el-input v-if="dataObject.FundCompany && dataObject.FundType == '0'" v-model="dataObject.FundCompany+'%'" disabled />
          <el-input v-else-if="dataObject.FundCompany && dataObject.FundType == '1'" v-model="dataObject.FundCompany+'￥'" disabled />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="公积金缴纳比例（个人部分）" prop="FundPersonal" class="TheProportion">
          <el-input v-if="dataObject.FundPersonal && dataObject.FundType == '0'" v-model="dataObject.FundPersonal+'%'" disabled />
          <el-input v-else-if="dataObject.FundPersonal && dataObject.FundType == '1'" v-model="dataObject.FundPersonal+'￥'" disabled />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="使用状态" prop="Status" class="State">
          <p v-if="dataObject.Status =='1'">启用</p>
          <p v-else>禁用</p>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'lookAccumulation',
  props: ['showlookAccumulation', 'title', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        RuleName: '',
        FundBase: '',
        FundType: '',
        FundCompany: '',
        FundPersonal: '',
        Status: ''
      },
      showAccumulation: false
    }
  },
  watch: {
    showlookAccumulation (newvalue, oldvalue) {
      this.showAccumulation = newvalue
      this.dataObject = this.tempData
      this.dataObject.Status += ''
      this.dataObject.FundType += ''
    }
  },
  created () {

  },
  methods: {
    close () {
      this.$emit('closelookAccumulation', false)
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
    display: inline-block;
    width: 100%;
    p {
      margin-top: 40px;
      margin-bottom: 0;
    }
  }
  /deep/ .TheProportion {
    .way {
      font-size: 16px;
    }
  }
}
</style>