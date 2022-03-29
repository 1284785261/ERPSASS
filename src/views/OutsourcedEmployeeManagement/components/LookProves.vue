//查看证明开具
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="查看" class="dialog-box dialog-account" append-to-body :visible.sync="showProve" :show-close="false" :destroy-on-close="true" width="600px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms-Account disabled">
        <el-form-item label="申请人" prop="StaffId">
          <!-- <el-select v-model="dataObject.StaffId" disabled clearable filterable remote placeholder="请查询或者下拉选择申请人" @clear="clearCompany" :remote-method="remoteMethod" :loading="loading" class="select-input">
            <el-option v-for="item in ApplicantPageList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select> -->
          <el-input v-model="dataObject.StaffName" disabled clearable size="small" />
        </el-form-item>
        <el-form-item label="申请时间" prop="AddTime" class="Date">
          <el-date-picker v-model="dataObject.AddTime" disabled clearable type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="证明类型" prop="ProveType">
          <el-select v-model="dataObject.ProveType" disabled clearable size="mini" placeholder="请选择证明类型">
            <el-option v-for="item in CatagoryList" :key="item.ClassName" :label="item.ClassName" :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item label="用途" prop="UsedFor" class="textarea-note">
          <el-input type="textarea" :rows="10" disabled maxlength="500" show-word-limit v-model="dataObject.UsedFor" size="small" />
        </el-form-item>
        <el-form-item label="收件人" prop="UserName" class="recipientMan">
          <el-input v-model="dataObject.UserName" disabled clearable size="small" />
        </el-form-item>
        <el-form-item label="收件人电话" prop="Tel" class="recipientPhone">
          <el-input v-model="dataObject.Tel" disabled clearable size="small" />
        </el-form-item>
        <el-form-item label="收件地址" prop="Type" class="Address">
          <el-select v-model="province" disabled filterable clearable placeholder="">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in provincelist" :key="index"></el-option>
          </el-select>
          <el-select v-model="city" disabled filterable clearable placeholder="">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in citylist" :key="index"></el-option>
          </el-select>
          <el-select v-model="AreaId" disabled filterable clearable placeholder="">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in arealist" :key="index"></el-option>
          </el-select>
          <el-input class="address-input" disabled clearable v-model="dataObject.Address" placeholder="详情地址"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { GetStaffPageList } from '@/api/OutsourcedEmployeeManagement.js'
import { GetCatagoryList, GetAreaList } from '@/api/Public.js'
import { showLoading, hideLoading, copy, MenuIdDate } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'ProveOpens',
  components: {
  },
  props: ['showLookProve', 'tempData'],
  data () {
    return {
      dataObject: {},
      province: '',
      city: '',
      AreaId: '',
      loading: false,
      CatagoryList: [],
      ApplicantPageList: [],
      provincelist: [],//省
      citylist: [],//市
      arealist: [],//区
      showProve: false
    }
  },
  watch: {
    showLookProve (newvalue, oldvalue) {
      this.showProve = newvalue
      console.log(this.tempData);

      this.dataObject = this.tempData

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
    this.remoteMethod()
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
    close () {
      this.dataObject = this.$options.data().dataObject
      this.$emit('closelookProve', false)
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
        /deep/ .el-input__suffix {
          top: 12px;
        }
      }
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
      height: 41px;
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
      margin-bottom: 16px;
    }
  }
}
</style>