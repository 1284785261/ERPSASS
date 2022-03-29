//认领报销窗口
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box dialog-account" append-to-body :visible.sync="Submitwindow" :show-close="false" :destroy-on-close="true" width="600px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-Account">
        <el-form-item label="需要认领的金额" prop="StaffId">
          <el-input v-model="dataObject.StaffId" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" placeholder="请输入认领金额" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="入账年月" prop="AddTime" class="Date">
          <el-date-picker v-model="dataObject.AddTime" clearable type="date" placeholder="选择入账年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否要用作抵扣项目成本" prop="ProveType" class="State">
          <el-radio-group v-model="dataObject.ProveType">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="1" prop="UserName" class="recipientMan">
          <el-input v-model="dataObject.UserName" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="是否要抵扣公司部分支出" prop="ProveType" class="State">
          <el-radio-group v-model="dataObject.ProveType">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="1" prop="UserName" class="recipientMan">
          <el-input v-model="dataObject.UserName" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="是否要作为项目毛利" prop="ProveType" class="State">
          <el-radio-group v-model="dataObject.ProveType">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="1" prop="UserName" class="recipientMan">
          <el-input v-model="dataObject.UserName" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="纳入毛利的项目" prop="SysUserId">
          <el-select v-model="dataObject.SysUserId" clearable filterable remote placeholder="请查询或者纳入毛利的项目" @clear="clearUser" :remote-method="UserMethod" :loading="loading" class="select-input">
            <el-option v-for="item in SysUserList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="纳入毛利的金额" prop="UserName">
          <el-input v-model="dataObject.UserName" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="认领回款到项目" prop="SysUserId">
          <el-select v-model="dataObject.SysUserId" clearable filterable remote placeholder="请查询或者认领回款的项目" @clear="clearUser" :remote-method="UserMethod" :loading="loading" class="select-input">
            <el-option v-for="item in SysUserList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目认领金额" prop="UserName">
          <el-input v-model="dataObject.UserName" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="认领到外包员工" prop="SysUserId">
          <el-select v-model="dataObject.SysUserId" clearable filterable remote placeholder="从所选项目中筛选外包员工" @clear="clearUser" :remote-method="UserMethod" :loading="loading" class="select-input">
            <el-option v-for="item in SysUserList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工认领金额" prop="UserName">
          <el-input v-model="dataObject.UserName" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="UsedFor" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="dataObject.Remark" size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button round class="erpbtn" size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'SubmitExpen',
  props: ['showSubmitwindow', 'title', 'tempData'],
  data () {
    return {
      Submitwindow: false,
      Formrules: {},
      dataObject: {

      }
    }
  },
  watch: {
    showSubmitwindow (newvalue, oldvalue) {
      this.Submitwindow = newvalue
    }
  },
  created () {

  },
  methods: {
    dialogtrue (form) {

    },
    close () {

    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.dialog-account {
  /deep/ .el-dialog {
    .el-dialog__body {
      padding: 0 20px;
    }
  }
}
.forms-Account {
  position: relative;
  /deep/ .el-form-item {
    margin-bottom: 12px;
    width: 50%;
    float: left;
    padding: 0 20px;
    .el-form-item__label {
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
    .ProveType {
      width: 58%;
    }
    .LookButton {
      position: absolute;
      right: 0px;
      top: 24px;
      height: 40px;
    }
  }
  /deep/ .textarea-note {
    width: 100%;
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
  /deep/ .recipientMan {
    .el-form-item__label {
      opacity: 0;
    }
  }
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
      height: 40px;
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      label {
        &:nth-child(1) {
          margin-right: 160px;
        }
      }
    }
  }
}
</style>