//添加缴纳阶段
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showPhase" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms">
        <el-form-item label="阶段最小值" prop="LevelMin">
          <el-input v-model="dataObject.LevelMin" clearable size="small" @blur="filterMin">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="阶段最大值" prop="LevelMax">
          <el-input v-model="dataObject.LevelMax" clearable size="small" @blur="filterMax">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="缴纳比例" clearable prop="Scale">
          <el-input v-model="dataObject.Scale" clearable size="small">
            <svg-icon slot="suffix" icon-class="baifen" class-name="way" />
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { copy } from '@/utils/CustomValidation'
import axios from 'axios'
export default {
  name: 'addRole',
  props: ['showAddPhase', 'title', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        LevelMin: '',
        LevelMax: '',
        Scale: ''
      },
      SystemAppList: [],
      showPhase: false
    }
  },
  watch: {
    showAddPhase (newvalue, oldvalue) {
      this.showPhase = newvalue
      this.dataObject = this.$options.data().dataObject
      if (this.title == '添加缴纳阶段') {

      } else if (this.title == '修改缴纳阶段') {
        this.dataObject = copy(this.tempData)
      }
    }
  },
  created () {
  },
  methods: {
    filterMin (index) {
      if (Number(this.searchObject.AddPersonalTaxLevelRuleList[0].LevelMin) < Number(this.searchObject.StartBase)) {
        this.$message({
          type: 'error',
          message: '起征点不能小于第一阶段最小值'
        })
        this.showValidation = false
      }
    },
    filterMax () {
      if (Number(this.dataObject.LevelMax) < Number(this.dataObject.LevelMin)) {
        this.$message({
          type: 'error',
          message: '当前阶段最大值不能小于阶段最小值'
        })
        this.showValidation = false
      }
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('PhaseSave', this.dataObject)
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
      this.$emit('closePhase', false)
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
        /deep/ .el-input__suffix {
          top: 12px;
        }
      }
    }
    .way {
      font-size: 16px;
    }
  }
}
</style>