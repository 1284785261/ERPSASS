//申请招标
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box dialog-account" append-to-body :visible.sync="showApply" :show-close="false" :destroy-on-close="true" width="600px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-Account">
        <el-form-item label="招标被授权人" prop="TenderPerson">
          <el-select v-model="dataObject.TenderPerson" clearable :disabled="disabled" filterable remote placeholder="请查询或下拉招标被授权人" @clear="clearCompany" :remote-method="remoteMethod" :loading="loading" class="select-input">
            <el-option v-for="item in authorizedList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招标代理机构" prop="InviteCompany">
          <el-input v-model="dataObject.InviteCompany" clearable :disabled="disabled" placeholder="请输入招标代理机构" size="small" />
        </el-form-item>
        <el-form-item label="投标单位" prop="TenderCompany">
          <el-select v-model="dataObject.TenderCompany" clearable :disabled="disabled" filterable remote placeholder="请查询或选择投标单位" @clear="clearTenderCompany" :remote-method="CompanyMethod" :loading="loading" class="select-input">
            <el-option v-for="item in CompanyList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买标书截止日期" prop="EndTime" class="Date">
          <el-date-picker v-model="dataObject.EndTime" clearable :disabled="disabled" type="datetime" placeholder="请选择购买标书截止日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="招标文件费用" prop="TenderFee" class="recipientMan">
          <el-input v-model="dataObject.TenderFee" clearable :disabled="disabled" size="small">
            <svg-icon slot="suffix" icon-class="money" placeholder="招标文件费用" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="购买标书方式" prop="Mothod" class="recipientPhone">
          <el-input v-model="dataObject.Mothod" clearable :disabled="disabled" size="small" />
        </el-form-item>
        <el-form-item label="申请人" prop="SysUserId" class="recipientPhone">
          <el-select v-model="dataObject.SysUserId" :disabled="disabled" clearable filterable remote placeholder="请查询或下拉申请人" @clear="clearApply" :remote-method="ApplyMethod" :loading="loading" class="select-input">
            <el-option v-for="item in ApplyList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买标书地址" prop="Type" class="Address">
          <el-select v-model="province" filterable :disabled="disabled" clearable placeholder="请选择省份">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in provincelist" :key="index"></el-option>
          </el-select>
          <el-select v-model="city" filterable :disabled="disabled" clearable placeholder="请选择城市">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in citylist" :key="index"></el-option>
          </el-select>
          <el-select v-model="AreaId" filterable :disabled="disabled" clearable placeholder="请选择区县">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in arealist" :key="index"></el-option>
          </el-select>
          <el-input class="address-input" clearable :disabled="disabled" v-model="dataObject.Address" placeholder="详情地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue('ruleForm')" v-if="!disabled">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { GetSysUserList } from '@/api/OutsourcedEmployeeManagement.js'
import { GetSysUserList } from '@/api/SystemSetting.js'
import { GetBfCompanyPageList } from '@/api/BusinessSet.js'
import { GetAreaList } from '@/api/Public.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  name: 'ApplyBuy',
  props: ['showApplyBuy', 'title', 'tempData', 'disabled'],
  data () {
    return {
      dataObject: {},
      loading: false,
      authorizedList: [],
      CompanyList: [],
      ApplyList: [],
      Formrules: {},
      province: '',
      city: '',
      AreaId: '',
      provincelist: [],//省
      citylist: [],//市
      arealist: [],//区
      showApply: false
    }
  },
  watch: {
    showApplyBuy (newvalue, oldvalue) {
      this.showApply = newvalue
      this.dataObject = this.$options.data().dataObject
      let UsedFor = JSON.parse(localStorage.getItem('Current'))
      this.dataObject.SysUserId = UsedFor.currentId
      if (newvalue) {
        this.ApplyMethod(UsedFor.currentUser)
      }
      if (this.title == '申请购买招标文件信息') {
        this.province = this.$options.data().province
        this.city = this.$options.data().city
        this.AreaId = this.$options.data().AreaId
        this.remoteMethod()
      } else if (this.title == '修改购买招标文件信息') {
        this.dataObject = this.tempData
        if (this.tempData.SysUserId) {
          this.authorizedList = [{
            Id: this.tempData.SysUserId,
            UserName: this.tempData.SysUserName
          }]
        }
      } else if (this.title == '查看购买招标文件信息') {
        this.dataObject = this.tempData
        if (this.tempData.SysUserId) {
          this.authorizedList = [{
            Id: this.tempData.SysUserId,
            UserName: this.tempData.SysUserName
          }]
        }
      }
    },
    province (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.citylist = response.Data
            let isclear = this.citylist.find(v => {
              return v.Id == this.city
            })
            if (isclear) {
            } else {
              this.city = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.city = ''
        this.AreaId = ''
        this.citylist = []
        this.arealist = []
      }
    },
    city (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.arealist = response.Data
            let isclear = this.arealist.find(v => {
              return v.Id == this.AreaId
            })
            if (isclear) {
            } else {
              this.AreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.arealist = []
        this.AreaId = ''
      }
    },
    "dataObject.AreaId" (newvalue, oldvalue) {
      const str = this.arealist.find(v => {
        return v.Id == newvalue
      })
      if (!str && !!newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var select = response.Data.filter(v => {
              return v.isselect
            })
            if (select.find(v => v.Level == 1) !== undefined) {
              this.province = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.city = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.AreaId = select.find(v => v.Level == 3).Id
            } else {
              this.AreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    }

  },
  created () {
    this.getAreaList()
    this.remoteMethod()
    this.CompanyMethod()
  },
  methods: {
    // 获取一级地区
    getAreaList () {
      let obj = {
        ParentId: 0,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetAreaList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.provincelist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //查询申请人列表
    remoteMethod (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          UserName: query,
          Status: 1,
          PageIndex: 1,
          PageSize: 100,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetSysUserList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            this.authorizedList = response.Data
          } else {
            this.authorizedList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearCompany () {
      this.remoteMethod()
    },
    CompanyMethod (query) {
      let obj = {
        PageIndex: 1,
        PageSize: 99,
        Name: query,
        Status: 1,
        Level: -1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.loading = true;
      GetBfCompanyPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.CompanyList = response.Data
          this.loading = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    clearTenderCompany () {
      this.CompanyMethod()
    },
    ApplyMethod (query) {
      console.log(query)
      this.loading = true;
      setTimeout(() => {
        let data = {
          UserName: query,
          Status: 1,
          PageIndex: 1,
          PageSize: 100,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetSysUserList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            this.ApplyList = response.Data
          } else {
            this.ApplyList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearApply () {
      this.ApplyMethod()
    },
    dialogtrue (form) {
      let dataObj = this.dataObject
      this.$refs[form].validate((valid) => {
        if (valid) {
          dataObj.AreaId = this.AreaId || this.city || this.province
          this.$emit('ApplySave', dataObj)
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
      this.$emit('closeApplyBuy', false)
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
        .el-input {
          .el-input__inner {
            height: 36px;
            line-height: 36px;
          }
          .el-input__suffix {
            top: 24px;
            height: 40px;
            line-height: 40px;
          }
        }
      }
      .el-input {
        font-size: 14px;
        .el-input__inner {
          height: 36px;
          line-height: 36px;
        }
        .el-input__suffix {
          height: 38px;
          line-height: 38px;
        }
      }
    }
  }
  /deep/ .Address {
    width: 100%;
    .el-form-item__label {
      width: 100%;
      text-align: left;
    }
    .el-select {
      width: 162px;
      margin-right: 17px;
      display: inline-block !important;
      .el-input__suffix {
        top: 0 !important;
      }
      &:nth-child(3) {
        margin-right: 0;
      }
    }
    .address-input {
      margin-top: 16px;
    }
  }
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
      height: 40px;
    }
  }
}
</style>