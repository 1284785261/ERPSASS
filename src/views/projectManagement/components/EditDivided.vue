<!-- 修改人员业务分成 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="修改人员提成和业绩分配" class="dialog-box" append-to-body :visible.sync="showselectDivided" :show-close="false" :destroy-on-close="true" width="1000px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" class="forms">
        <div class="Object">
          <el-form-item label="提成人员类型" label-width="100px">
            <el-select v-model="dataObject.Type" filterable placeholder="选择人员类型" size="mini" class="select-input">
              <el-option :key="0" label="业务人员" :value="0" />
              <el-option :key="1" label="服务人员" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="提成人员" label-width="70px">
            <el-select v-model="dataObject.SysUserId" filterable placeholder="搜索或者下拉" remote clearable size="mini" @clear="clearMethod" :remote-method="remoteMethod" :loading="loading" class="select-input">
              <el-option v-for="ite in UserInfoList" :key="ite.Id" :label="ite.UserName" :value="ite.Id" />
            </el-select>
          </el-form-item>
          <el-form-item label="业务提成占比" label-width="120px">
            <el-input v-model="dataObject.CommScale" size="small" @blur="checkCommScale(dataObject.CommScale)" />
            <svg-icon icon-class="baifen" class-name="way" />

          </el-form-item>
          <el-form-item label="业务业绩占比" label-width="120px">
            <el-input v-model="dataObject.AchiScale" size="small" @blur="checkAchiScale(dataObject.AchiScale)" />
            <svg-icon icon-class="baifen" class-name="way" />
          </el-form-item>
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
import { GetProjectBuzCommisionEnum } from '@/api/projectManagement.js'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Divided2',
  props: ['showEDitDivided', 'tempObj'],
  data () {
    return {
      dataObject: {
        Type: '',
        Id: '',
        SysUserId: '',
        CommScale: '',
        AchiScale: ''
      },
      showselectDivided: false,
      loading: false,
      UserInfoList: [],
      copyUserInfoList: [],
      ProjectCommisionEnumBusinessType: [],//业务类型
      ProjectCommisionEnumChangeType: []//提成变动类型
    }
  },
  watch: {
    showEDitDivided (newvalue, oldvalue) {
      this.showselectDivided = newvalue
      console.log(this.tempObj);

      // this.dataObject = copy(this.tempObj)
      this.dataObject = {
        Type: this.tempObj.Type,
        Id: this.tempObj.Id,
        SysUserId: this.tempObj.SysUserId,
        CommScale: this.tempObj.CommScale,
        AchiScale: this.tempObj.AchiScale
      }
      if (this.tempObj.SysUserId) {
        this.UserInfoList = [{
          UserName: this.tempObj.SysUserName,
          Id: this.tempObj.SysUserId
        }]
      }
    }
  },
  created () {
    // this.remoteMethod()
    let obj = {
      UserId: '',
      UserName: '',
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
    this.getEunm()
  },
  methods: {
    getEunm () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectBuzCommisionEnum(qs.stringify(obj)).then(response => {
        this.ProjectCommisionEnumBusinessType = response.ProjectCommisionEnumBusinessType
        this.ProjectCommisionEnumChangeType = response.ProjectCommisionEnumChangeType
      })
    },
    checkCommScale (value) {
      const reg = /^\d+$|^\d+[.]?\d+$/
      if (!reg.test(value)) {
        this.dataObject.CommScale = ''
      }
      if (value < 0 || value > 100) {
        this.dataObject.CommScale = ''
      }
    },
    checkAchiScale (value) {
      const reg = /^\d+$|^\d+[.]?\d+$/
      if (!reg.test(value)) {
        this.dataObject.AchiScale = ''
      }
      if (value < 0 || value > 100) {
        this.dataObject.AchiScale = ''
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
    clearMethod () {
      this.remoteMethod()
    },
    // 搜索列表数据
    searchSysUser (e) {
      console.log(e);
      
      if (!e) {
        this.UserInfoList = copy(this.copyUserInfoList)
      } else {
        this.remoteMethod('')
      }
    },
    dialogtrue () {
      // 调用接口,保存数据
      let obj = this.dataObject
      this.$emit('EDitDividedSave', obj)

    },
    //关闭
    close () {
      this.$emit('closeshowEDitDivided', false)
    },
    cancel () {
      this.$emit('closeshowEDitDivided', false)
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
  .FixedCommission {
    display: block;
    overflow: hidden;
    margin-bottom: 10px;
    /deep/ .el-select {
      width: 200px;
      .el-input {
        width: 200px;
      }
    }
  }
  .Object {
    overflow: hidden;
  }
  .Add {
    font-size: 16px;
    line-height: 40px;
    margin-left: 20px;
    i {
      margin-right: 10px;
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
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      color: red;
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