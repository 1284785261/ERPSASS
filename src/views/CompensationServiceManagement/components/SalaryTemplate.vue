<!-- 是否创建模板 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="titles" class="dialog-box" append-to-body :visible.sync="showTemplate" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <!-- <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms" v-if="!IsLists">
        <el-form-item label="创建新模板" prop="name">
          <el-input v-model="dataObject.name" clearable class="select-input" placeholder="请输入模板名称" />
        </el-form-item>
      </el-form> -->
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <div v-if="IsLists">表头内容解析成功，您是否需要创建新的模板，或者选择现有模板</div>
        <el-form-item label=" " prop="Type" class="State" v-if="IsLists">
          <el-radio-group v-model="dataObject.Type" @change="selectObject">
            <el-radio label="0">创建新模板</el-radio>
            <el-radio label="1">选择现有模板</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="创建新模板" prop="name" v-if="dataObject.Type == '0'">
          <el-input v-model="dataObject.name" clearable class="select-input" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item label="选择模板" prop="TemplateId" v-if="dataObject.Type == '1'">
          <el-select v-model="dataObject.TemplateId" clearable placeholder="请选择模板" class="select-input" @change="changeTemplate">
            <el-option v-for="item in TemplateList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button class="erpbtn" size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'SalaryTemplate',
  props: {
    showSalaryTemplate: {
      type: Boolean,
    },
    TemplateList: {
      type: Array,
    },
    TemplateObject: {
      type: Object,
    }
  },
  data () {
    return {
      showTemplate: false,
      Formrules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' },
        ],
        TemplateId: [
          { required: true, message: '请选择模板', trigger: 'change' },
        ],
      },
      dataObject: {
        Type: '0',
        name: '',
        TemplateId: ''
      },
      IsLists: true,
      titles: '创建模板',
      TemplateLists: []
    }
  },
  watch: {
    showSalaryTemplate (newvalue, oldvalue) {
      this.showTemplate = newvalue

      this.TemplateLists = this.TemplateList
      this.dataObject = this.TemplateObject
      console.log(this.TemplateObject)
      if (this.dataObject.Type == '1') {
        this.titles = '变更提示'
        this.IsLists = true
      } else {
        this.titles = '创建模板'
        this.IsLists = false
      }
    }
  },
  created () {
  },
  methods: {
    selectObject (e) {
      console.log(this.dataObject)
      this.dataObject.name = ''
      this.dataObject.TemplateId = ''
      this.$refs.ruleForm.clearValidate(['name', 'TemplateId']);
    },
    changeTemplate (e) {
      if (e) {
        this.dataObject.name = this.TemplateLists[this.TemplateLists.findIndex(item => item.Id == e)].Name
      }

    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('AddTemplateSave', this.dataObject)
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
      this.$emit('closeTemplateSave', false)
    }
  }
}
</script>
<style lang="scss" scoped>
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
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
    }
    .el-input__inner {
      border: none;
      background: $erinputbgc;
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