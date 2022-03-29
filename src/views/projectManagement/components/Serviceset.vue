<!-- 服务分成设置 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="服务人员提成和业绩分配" class="dialog-box" append-to-body :visible.sync="showService" :show-close="false" :destroy-on-close="true" width="900px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" class="forms">
        <div class="FixedCommission">
          <el-form-item label="服务提成类型" label-width="150px">
            <el-select v-model="BusinessType" filterable placeholder="请选择服务提成类型" :disabled="disabled" clearable size="mini" class="select-input">
              <el-option v-for="item in ProjectCommisionEnumBusinessType" :key="item.value" :label="item.describe" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="提成变动类型" label-width="150px">
            <el-select v-model="ChangeType" filterable placeholder="请选择提成变动类型" :disabled="disabled" clearable size="mini" class="select-input">
              <el-option v-for="item in ProjectCommisionEnumChangeType" :key="item.value" :label="item.describe" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>
        <div v-for="(item,index) in dataObject" :key="index" class="Object">
          <el-form-item label="服务人员" label-width="150px">
            <el-select v-model="item.SysUserId" filterable placeholder="搜索或者下拉"  @focus="searchSysUser(item.SysUserId)" remote clearable size="mini"  @clear="remoteMethod('')" :remote-method="remoteMethod" :loading="loading" class="select-input">
              <el-option v-for="item in UserInfoList" :key="item.Id" :label="item.UserName" :value="item.Id" />
            </el-select>
          </el-form-item>
          <el-form-item label="服务提成占比" label-width="150px">
            <el-input v-model="item.CommScale" size="small" @blur="checkAchiScale(item.CommScale,index)" />
            <svg-icon icon-class="baifen" class-name="way" />
          </el-form-item>
          <a class="Add" v-if="index == dataObject.length -1" @click="AddList"><i class="el-icon-circle-plus-outline"></i>添加</a>
          <span class="del" title="删除" v-if="index < dataObject.length-1" @click="DelList(index)"><i class="el-icon-delete"></i></span>
        </div>
        <div class="footer-button">
          <el-button class="operation-button" type="primary" @click="cancel">取消</el-button>
          <el-button class="operation-button" type="primary" @click="dialogtrue">保存</el-button>
        </div>
      </el-form>

    </el-dialog>
  </div>
</template>
<script>
import { GetSysUserList } from '@/api/SystemSetting.js'
import { GetProjectSrvCommisionEnum } from '@/api/projectManagement.js'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'addContract',
  props: ['showServiceSet', 'TypeObj'],
  data () {
    return {
      BusinessType: '',
      ChangeType: '',
      dataObject: [{
        Id: '',
        SysUserId: '',
        CommScale: ''
      }],
      loading: false,
      showService: false,
      UserInfoList: [],
      copyUserInfoList: [],
      ProjectCommisionEnumBusinessType: [],//服务类型
      ProjectCommisionEnumChangeType: [],//提成类型
      disabled: false
    }
  },
  watch: {
    showServiceSet (newvalue, oldvalue) {
      this.showService = newvalue
      if (this.TypeObj && this.TypeObj.disabled) {
        this.disabled = this.TypeObj.disabled
        this.BusinessType = this.TypeObj.BusinessType
        this.ChangeType = this.TypeObj.ChangeType
      }
    }
  },
  created () {
    // this.remoteMethod()
    this.getService()
  },
  mounted() {
    let obj = {
      UserId: '',
      UserName: '',
      Status: 1,
      PageIndex: 1,
      PageSize: 50,
      menuid: MenuIdDate(),
      operationcode: '1'
    }
    setTimeout(() => {
      GetSysUserList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.UserInfoList = response.Data
            this.copyUserInfoList = response.Data
          } else {
            this.UserInfoList = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        this.loading = false
      })
    }, 500);
  },
  methods: {
    getService () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectSrvCommisionEnum(qs.stringify(obj)).then(response => {
        this.ProjectCommisionEnumBusinessType = response.ProjectCommisionEnumBusinessType
        this.ProjectCommisionEnumChangeType = response.ProjectCommisionEnumChangeType
      })
    },
    checkAchiScale (value, index) {
      const reg = /^\d+$|^\d+[.]?\d+$/
      if (!reg.test(value)) {
        this.dataObject[index].CommScale = ''
      }
      if (value < 0 || value > 100) {
        this.dataObject[index].CommScale = ''
      }
    },
    // 搜索列表数据
    searchSysUser (e) {
      if (!e) {
        this.UserInfoList = copy(this.copyUserInfoList)
      } else {
        this.remoteMethod('')
      }
    },
    //查询员工列表
    remoteMethod (query) {
      let obj = {
        UserId: '',
        UserName: query,
        Status: 1,
        PageIndex: 1,
        PageSize: 50,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.loading = true
      setTimeout(() => {
        GetSysUserList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              this.UserInfoList = response.Data
            } else {
              this.UserInfoList = []
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          this.loading = false
        })
      }, 500);
    },
    AddList () {
      this.dataObject.push({
        Id: '',
        SysUserId: '',
        BusinessType: '',
        CommScale: ''
      })
    },
    DelList (index) {
      this.dataObject.splice(index, 1)
    },
    dialogtrue () {
      // 调用接口,保存数据
      let obj = this.dataObject
      for (let i = 0; i < this.dataObject.length; i++) {
        if (this.BusinessType) {
          this.dataObject[i].BusinessType = this.BusinessType
        }
        if (this.ChangeType) {
          this.dataObject[i].ChangeType = this.ChangeType
        }
      }
      this.$emit('ServiceSetSave', obj)

    },
    //关闭
    close () {
      this.dataObject = [{
        Id: '',
        SysUserId: '',
        CommScale: ''
      }]
      this.$emit('closeshowServiceSet', false)
    },
    cancel () {
      this.$emit('closeshowServiceSet', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  /deep/ .el-form-item {
    margin-bottom: 12px;
    float: left;
    .el-form-item__label {
      color: #666666;
    }
    .el-select {
      width: 160px;
      .el-input {
        width: 160px;
      }
    }
    .el-input {
      width: 64px;
    }
    .way {
      margin-left: 5px;
    }
  }
  /deep/ .FixedCommission {
    display: block;
    overflow: hidden;
    margin: 16px 0;
    /deep/ .el-select {
      width: 200px;
      .el-input {
        width: 200px;
      }
    }
  }
  .Object {
    overflow: hidden;
    /deep/ .el-select {
      width: 200px;
      .el-input {
        width: 200px;
      }
    }
  }
  .Add {
    font-size: 16px;
    line-height: 40px;
    margin-left: 100px;
    color: #a4b2cc;

    i {
      margin-right: 10px;
      font-size: 16px;
      font-weight: 600;
    }
    &:hover {
      color: #1588f8;
    }
  }
  .Edit {
    font-size: 16px;
    line-height: 40px;
    margin: 0 8px;

    cursor: pointer;
    &:hover {
      color: #1588f8;
    }
  }
  .del {
    font-size: 16px;
    line-height: 40px;
    margin: 0 8px;
    margin-left: 100px;
    cursor: pointer;
    color: #a4b2cc;
    &:hover {
      color: #f56262;
    }
  }
}
.footer-button {
  margin: 40px 0 24px 0;
  text-align: center;
  button {
    margin: 0 12px;
  }
}
</style>