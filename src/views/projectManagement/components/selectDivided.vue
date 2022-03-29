<!-- 设置分成 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="提成和业绩分配" class="dialog-box" append-to-body :visible.sync="showselectDivided" :show-close="false" :destroy-on-close="true" width="1250px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" class="forms">
        <div class="FixedCommission">
          <el-form-item label="业务提成类型" label-width="100px">
            <el-select v-model="BusinessType" filterable placeholder="请选择业务提成类型" :disabled="disabled" clearable size="mini" class="select-input" style="width:400px">
              <el-option v-for="ite in ProjectCommisionEnumBusinessType" :key="ite.value" :label="ite.describe" :value="ite.value" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="提成变动类型" label-width="120px">
            <el-select v-model="ChangeType" filterable placeholder="请选择提成变动类型" :disabled="disabled" clearable size="mini" class="select-input">
              <el-option v-for="ite in ProjectCommisionEnumChangeType" :key="ite.value" :label="ite.describe" :value="ite.value" />
            </el-select>
          </el-form-item> -->
        </div>
        <div v-for="(item,index) in dataObject" :key="index" class="Object">
          <el-form-item label="提成人员类型" label-width="100px">
            <el-select v-model="item.Type" filterable placeholder="选择人员类型" size="mini" class="select-input" @change="choosetype(item)">
              <el-option :key="0" label="业务人员" :value="0" />
              <el-option :key="1" label="服务人员" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="营销人员属性" label-width="110px">
            <el-select v-model="item.SysUserId" filterable placeholder="搜索或者下拉" remote clearable size="mini" @focus="searchSysUser(item.SysUserId)" @clear="clearMethod" :remote-method="remoteMethod" :loading="loading" class="select-input">
              <el-option v-for="ite in UserInfoList" :key="ite.Id" :label="ite.UserName" :value="ite.Id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="item.typeName" label-width="90px">
            <el-select v-model="item.SysUserId" filterable placeholder="搜索或者下拉" remote clearable size="mini" @focus="searchSysUser(item.SysUserId)" @clear="clearMethod" :remote-method="remoteMethod" :loading="loading" class="select-input">
              <el-option v-for="ite in UserInfoList" :key="ite.Id" :label="ite.UserName" :value="ite.Id" />
            </el-select>
          </el-form-item>
          <el-form-item label="提成占比" label-width="90px">
            <el-input v-model="item.CommScale" size="small" @blur="checkCommScale(item.CommScale,index)" />
            <svg-icon icon-class="baifen" class-name="way" />
          </el-form-item>
          <el-form-item label="业绩占比" label-width="90px">
            <el-input v-model="item.AchiScale" size="small" @blur="checkAchiScale(item.AchiScale,index)" />
            <svg-icon icon-class="baifen" class-name="way" />
          </el-form-item>
          <a class="Add" v-if="index == dataObject.length -1" @click="AddList"><i class="el-icon-circle-plus-outline"></i>添加</a>
          <span class="del" title="删除" v-if="index < dataObject.length-1" @click="DelList(index)">
            <svg-icon icon-class="del" />
          </span>
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
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Divided',
  props: ['showDivided', 'TypeObj'],
  data() {
    return {
      BusinessType: '',
      ChangeType: '',
      Type: '',
      dataObject: [{
        Type: 0,
        typeName: '业务人员',
        Id: '',
        SysUserId: '',
        CommScale: '',
        AchiScale: ''
      }],
      showselectDivided: false,
      loading: false,
      UserInfoList: [],
      copyUserInfoList: [],
      ProjectCommisionEnumBusinessType: [],//业务类型
      ProjectCommisionEnumChangeType: [],//提成变动类型
      disabled: false,
      moreNotifyOjbectRules: {

      }
    }
  },
  watch: {
    showDivided(newvalue, oldvalue) {
      this.showselectDivided = newvalue
      if (this.TypeObj && this.TypeObj.disabled) {
        this.disabled = this.TypeObj.disabled
        this.BusinessType = this.TypeObj.BusinessType
        this.ChangeType = this.TypeObj.ChangeType
      } else {
        this.BusinessType = this.TypeObj.BusinessType
        this.ChangeType = this.TypeObj.ChangeType
      }
    }
  },
  created() {
    // this.remoteMethod()
    this.getEunm()
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
  },
  methods: {
    // 选择人员类型
    choosetype(e) {
      if (e.Type !== '') {
        if (e.Type === 0) {
          e.typeName = '业务人员'
        } else {
          e.typeName = '服务人员'
        }
      }
    },
    getEunm() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectBuzCommisionEnum(qs.stringify(obj)).then(response => {
        this.ProjectCommisionEnumBusinessType = response.ProjectCommisionEnumBusinessType
        this.ProjectCommisionEnumChangeType = response.ProjectCommisionEnumChangeType
      })
    },
    checkCommScale(value, index) {
      const reg = /^\d+$|^\d+[.]?\d+$/
      if (!reg.test(value)) {
        this.dataObject[index].CommScale = ''
      }
      if (value < 0 || value > 100) {
        this.dataObject[index].CommScale = ''
      }
    },
    checkAchiScale(value, index) {
      const reg = /^\d+$|^\d+[.]?\d+$/
      if (!reg.test(value)) {
        this.dataObject[index].AchiScale = ''
      }
      if (value < 0 || value > 100) {
        this.dataObject[index].AchiScale = ''
      }
    },
    //查询员工列表
    remoteMethod(query) {
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
    clearMethod() {
      this.remoteMethod()
    },
    // 搜索列表数据
    searchSysUser(e) {
      console.log(e);
      if (!e) {
        this.UserInfoList = copy(this.copyUserInfoList)
      } else {
        this.remoteMethod('')
      }
    },
    AddList() {
      this.dataObject.push({
        Type: 0,
        typeName: '业务人员',
        Id: '',
        SysUserId: '',
        BusinessType: '',
        CommScale: '',
        AchiScale: '',
      })
    },
    DelList(index) {
      this.dataObject.splice(index, 1)
    },
    dialogtrue() {
      // 调用接口,保存数据
      let obj = []
      for (let i = 0; i < this.dataObject.length; i++) {
        if (this.BusinessType !== '') {
          this.dataObject[i].BusinessType = this.BusinessType
        }
        if (this.ChangeType !== '') {
          this.dataObject[i].ChangeType = this.ChangeType
        }
        if (this.dataObject[i].SysUserId !== '') {
          obj.push(this.dataObject[i])
        }
      }
      if (obj.length === 0) {
        this.$message({
          message: '请选择设置人员',
          type: 'warning'
        })
        return
      }
      this.$emit('DividedSave', obj)

    },
    //关闭
    close() {
      this.dataObject = [{
        Id: '',
        SysUserId: '',
        CommScale: '',
        AchiScale: ''
      }]
      this.$emit('closeshowDivided', false)
    },
    cancel() {
      this.$emit('closeshowDivided', false)
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
      width: 140px;
      .el-input {
        width: 140px;
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
    margin-left: 20px;
    color: #a4b2cc;
    cursor: pointer;
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