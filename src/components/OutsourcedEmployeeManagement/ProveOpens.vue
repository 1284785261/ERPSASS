//证明开具
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box dialog-account" append-to-body :visible.sync="showProve" :show-close="false" :destroy-on-close="true" width="700px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-Account">
        <el-form-item label="申请人" prop="StaffId">
          <el-select v-model="dataObject.StaffId" clearable filterable remote placeholder="请查询或者下拉选择申请人" @clear="clearCompany" :remote-method="remoteMethod" :loading="loading" class="select-input">
            <el-option v-for="item in ApplicantPageList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间" prop="AddTime" class="Date">
          <el-date-picker v-model="dataObject.AddTime" clearable type="date" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="证明类型" prop="ProveType">
          <el-select v-model="dataObject.ProveType" clearable size="mini" placeholder="请选择证明类型" :class="dataObject.ProveType == '2170'? 'ProveType':''">
            <el-option v-for="item in CatagoryList" :key="item.ClassName" :label="item.ClassName" :value="item.Id" />
          </el-select>
          <el-button size="small" class="erpbtn LookButton" v-if="dataObject.ProveType == '2170'" @click="LookBothwage">查看月均工资</el-button>
        </el-form-item>
        <el-form-item label="收件人" prop="UserName" class="recipientMan1">
          <el-input v-model="dataObject.UserName" clearable size="small" />
        </el-form-item>
        <el-form-item label="收件人电话" prop="Tel" class="recipientPhone1">
          <el-input v-model="dataObject.Tel" clearable size="small" />
        </el-form-item>
        <el-form-item label="受理人" prop="SysUserId">
          <el-select v-model="dataObject.SysUserId" clearable filterable remote placeholder="请查询或者下拉选择受理人" @clear="clearUser" :remote-method="UserMethod" :loading="loading" class="select-input">
            <el-option v-for="item in SysUserList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用途" prop="UsedFor" class="textarea-note">
          <el-input type="textarea" :rows="10" maxlength="500" show-word-limit v-model="dataObject.UsedFor" size="small" />
        </el-form-item>
        <el-form-item label="备注" prop="UsedFor" class="textarea-note">
          <el-input type="textarea" :rows="10" maxlength="500" show-word-limit v-model="dataObject.Remark" size="small" />
        </el-form-item>
        <el-form-item label="收件地址" prop="Type" class="Address">
          <el-select v-model="province" filterable clearable placeholder="请选择省份">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in provincelist" :key="index"></el-option>
          </el-select>
          <el-select v-model="city" filterable clearable placeholder="请选择城市">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in citylist" :key="index"></el-option>
          </el-select>
          <el-select v-model="AreaId" filterable clearable placeholder="请选择区县">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in arealist" :key="index"></el-option>
          </el-select>
          <el-input class="address-input" clearable v-model="dataObject.Address" maxlength="100" placeholder="详细地址"></el-input>
        </el-form-item>

      </el-form>
      <!-- 查看月均工资 -->
      <LookWage :showWage="showWage" :WageId="WageId" @closeWage="closeWage"></LookWage>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetStaffPageList } from '@/api/OutsourcedEmployeeManagement.js'
import { GetCatagoryList, GetAreaList } from '@/api/Public.js'
import LookWage from './LookWage.vue'
import { GetSysUserList } from '@/api/SystemSetting.js'
import { showLoading, hideLoading, copy, MenuIdDate } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'ProveOpens',
  components: {
    LookWage
  },
  props: ['showAddProve', 'title', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        StaffId: '',
        SysUserId: '',
        ProveType: '',
        UsedFor: '',
        Remark: '',
        Address: '',
        UserName: '',
        Tel: '',
        AddTime: '',
        AreaId: '',
      },
      province: '',
      city: '',
      AreaId: '',
      loading: false,
      CatagoryList: [],
      ApplicantPageList: [],
      SysUserList: [],
      provincelist: [],//省
      citylist: [],//市
      arealist: [],//区
      showProve: false,
      Formrules: {
        ProveType: [{ required: true, message: '请选择证明类型', trigger: 'change' }]
      },
      showWage: false,
      WageId: '',
      ProjectId: ''
    }
  },
  watch: {
    showAddProve (newvalue, oldvalue) {
      this.showProve = newvalue
      if (this.$route.query && this.$route.query.Id) {
        this.ProjectId = this.$route.query.Id
      } else {
        this.ProjectId = ''
      }
      this.dataObject = this.$options.data().dataObject
      if (this.title == '新增证明开具') {
        let UsedFor = JSON.parse(localStorage.getItem('Current'))
        this.dataObject.SysUserId = UsedFor.currentId
        this.UserMethod(UsedFor.currentUser)
        this.remoteMethod()
      } else if (this.title == '修改证明开具') {
        this.dataObject = this.tempData
        this.remoteMethod(this.dataObject.StaffName)
        this.UserMethod(this.dataObject.SysUserName)
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
    this.getCatagoryType()
    this.getAreaList()
  },
  methods: {
    //查询申请人列表
    remoteMethod (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          UserName: query,
          PageIndex: 1,
          PageSize: 99,
          Type: -1,
          Diploma: -1,
          ProjectId: this.ProjectId,
          Status: '',
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetStaffPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            this.ApplicantPageList = response.Data
          } else {
            this.ApplicantPageList = []
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
    //查询受理人列表
    UserMethod (query) {
      let obj = {
        UserId: '',
        UserName: query,
        Status: 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.loading = true
      setTimeout(() => {
        GetSysUserList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              this.SysUserList = response.Data
            } else {
              this.SysUserList = []
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
    clearUser () {
      this.UserMethod()
    },
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
    //弹出平均工资窗口
    LookBothwage () {
      if (this.dataObject.StaffId) {
        this.WageId = this.dataObject.StaffId
        this.showWage = true
      } else {
        this.$message({
          message: '请先选择申请人查询月均工资',
          type: 'error'
        })
        return false
      }
    },
    closeWage (val) {
      this.showWage = val
    },
    //获取证明类型数据
    getCatagoryType () {
      let obj = {
        status: 1,
        ClassType: 6,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCatagoryList(qs.stringify(obj)).then(response => {
        if (response.Data) {
          this.CatagoryList = response.Data
        }
      })
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      let dataObj = this.dataObject
      this.$refs[form].validate((valid) => {
        if (valid) {
          dataObj.AreaId = this.AreaId || this.city || this.province
          this.$emit('ProveSave', dataObj)
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
      this.province = ''
      this.city = ''
      this.AreaId = ''
      this.dataObject = this.$options.data().dataObject
      this.$emit('closeProve', false)
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
        }
        .el-input__suffix {
          top: 10px;
        }
      }
      .el-input {
        font-size: 14px;
        .el-input__inner {
          height: 36px;
          line-height: 36px;
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
    position: absolute;
    left: 0;
    top: 156px;
  }
  /deep/ .recipientPhone {
    position: absolute;
    left: 0;
    top: 235px;
  }
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
      height: 40px;
    }
  }
  /deep/ .Address {
    width: 100%;
    .el-form-item__label {
      width: 100%;
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
}
</style>