<!-- 修改服务人员分提成 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="修改服务员提成和业绩分配" class="dialog-box" append-to-body :visible.sync="showselectDivided" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" class="forms">
        <div class="Object">
          <el-form-item label="服务人员" label-width="70px">
            <el-select v-model="dataObject.SysUserId" filterable placeholder="搜索或者下拉" remote clearable size="mini" @clear="clearMethod" :remote-method="remoteMethod" :loading="loading" class="select-input">
              <el-option v-for="ite in UserInfoList" :key="ite.Id" :label="ite.UserName" :value="ite.Id" />
            </el-select>
          </el-form-item>
          <el-form-item label="服务提成占比" label-width="120px">
            <el-input v-model="dataObject.CommScale" size="small" @blur="checkAchiScale(dataObject.CommScale)" />
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
  props: ['showEditService', 'tempObj'],
  data () {
    return {
      dataObject: {
        Id: '',
        SysUserId: '',
        CommScale: ''
      },
      showselectDivided: false,
      loading: false,
      UserInfoList: [],
      ProjectCommisionEnumBusinessType: [],//服务类型
      ProjectCommisionEnumChangeType: []//提成变动类型
    }
  },
  watch: {
    showEditService (newvalue, oldvalue) {
      this.showselectDivided = newvalue
      console.log(this.tempObj);
      
      this.dataObject = copy(this.tempObj)
      this.dataObject = {
        Id: this.tempObj.Id,
        SysUserId: this.tempObj.SysUserId,
        CommScale: this.tempObj.CommScale,
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
    this.remoteMethod()
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
    checkAchiScale (value) {
      const reg = /^\d+$|^\d+[.]?\d+$/
      if (!reg.test(value)) {
        this.dataObject.CommScale = ''
      }
      if (value < 0 || value > 100) {
        this.dataObject.CommScale = ''
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
    dialogtrue () {
      // 调用接口,保存数据
      let obj = this.dataObject
      this.$emit('EDitServiceSave', obj)

    },
    //关闭
    close () {
      this.$emit('closeshowEditService', false)
    },
    cancel () {
      this.$emit('closeshowEditService', false)
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