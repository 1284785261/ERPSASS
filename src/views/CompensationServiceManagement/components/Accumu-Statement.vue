//公积金结算单
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="Statements" class="dialog-box" append-to-body :visible.sync="showGenerateStatement" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms">
        <el-form-item label="选择项目" prop="ExpireDate">
          <el-select v-model="dataObject.SysUserId" filterable clearable remote placeholder="请查询或下拉选择入账项目" class="select-input" @clear="clearProject" :remote-method="remoteProject" :loading="loading">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择社保打款账号" prop="ExpireDate">
          <el-select v-model="dataObject.SysUserId" filterable clearable remote placeholder="请查询或下拉选择社保打款账号" class="select-input" @clear="clearProject" :remote-method="remoteProject" :loading="loading">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用工单位" prop="ExpireDate">
          <el-select v-model="dataObject.SysUserId" filterable clearable remote placeholder="请查询或下拉选择用工单位" class="select-input" @clear="clearProject" :remote-method="remoteProject" :loading="loading">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="（缴纳所属期）缴纳年月" prop="ExpireDate" class="Date">
          <el-date-picker v-model="dataObject.ExpireDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择缴纳年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入账年月" prop="ExpireDate" class="Date">
          <el-date-picker v-model="dataObject.ExpireDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择入账年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="缴纳状态" prop="Status" class="State">
          <el-radio-group v-model="dataObject.Status">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round size="small" @click="close">取消</el-button>
        <el-button round size="small" @click="dialogtrue('ruleForm')">生成结算单</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetProjectList } from '@/api/projectManagement.js'
import SupperUploader from '@/utils/SupperUploader'
import { uuid, copy, MenuIdDate } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'ImportContract',
  props: ['showStatements', 'Statements'],
  data () {
    return {
      dataObject: {
        Id: '',
        FileUrl: ''
      },
      loading: false,
      showGenerateStatement: false,
      ProjectList: []
    }
  },
  watch: {
    showStatements (newvalue, oldvalue) {
      this.showGenerateStatement = newvalue
    }
  },
  created () {
    this.remoteProject()
  },
  methods: {
    remoteProject (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          Name: query,
          CompanyId: '',
          BusinessType: '-1',
          Priority: '-1',
          Status: '-1',
          PageIndex: 1,
          PageSize: 99,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetProjectList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.ProjectList = response.Data
            } else {
              this.ProjectList = []
            }
          } else {
            this.ProjectList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearProject () {
      this.remoteProject()
    },
    //导入公积金
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('StatementsSave', this.dataObject)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //关闭导入事件
    close () {
      this.dataObject.FileUrl = ''
      this.$emit('closeStatements', false)
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
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
    }
    .el-input__inner {
      border: none;
      background: $erinputbgc;
    }
  }
}
</style>