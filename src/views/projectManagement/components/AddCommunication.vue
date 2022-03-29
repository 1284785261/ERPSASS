//添加沟通记录
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showCommunication" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="沟通人" prop="SysUserId">
          <el-select v-model="dataObject.SysUserId" filterable clearable remote placeholder="请查询或下拉沟通人" class="select-input" @clear="clearUser" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in UserList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="沟通时间" prop="FollowTime" class="Date">
          <el-date-picker v-model="dataObject.FollowTime" value-format="yyyy-MM-dd" type="date" placeholder="请选择沟通时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="沟通内容" prop="Content" class="textarea-note">
          <el-input type="textarea" :rows="10" maxlength="500" show-word-limit v-model="dataObject.Content" size="small" />
        </el-form-item>
        <el-form-item label="沟通阶段" prop="Progress">
          <el-select v-model="dataObject.Progress" clearable placeholder="请选择沟通阶段" size="mini" class="select-input">
            <el-option v-for="item in CommunicationStage" :key="item.describe" :label="item.describe" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import SupperUploader from '@/utils/SupperUploader'
import { uuid, copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import { GetProjectProgressEnum } from '@/api/projectManagement.js'
import { GetSysUserList, GetSysUserById } from '@/api/SystemSetting.js'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'AddCommuni',
  props: {
    showAddCommunication: {
      type: Boolean,
    },
    title: {
      type: String,
      default: '添加沟通记录'
    },
    AddCommunication: {
      type: Object,
    },
  },
  data () {
    return {
      dataObject: {
        Id: '',
        FollowTime: '',
        SysUserId: '',
        Content: '',
        BusinessType: '',
        Progress: '',
      },
      showCommunication: false,
      loading: false,
      UserList: [],//用户列表
      CommunicationStage: [],//沟通阶段
      fileName: '',
      filestype: '',
      optionShow: false,
      uploadLoading: false,
      Formrules: {}
    }
  },
  watch: {
    showAddCommunication (newvalue, oldvalue) {
      this.showCommunication = newvalue
      if (this.AddCommunication && this.AddCommunication.SysUserId) {
        this.dataObject = this.AddCommunication
        if (this.AddCommunication.SysUserId) {
          this.getSysUserById(this.AddCommunication.SysUserId)
        }
      } else {
        this.dataObject = this.$options.data().dataObject
        this.dataObject.FollowTime = new Date()
        let user = JSON.parse(window.localStorage.getItem('Current'))
        this.dataObject.SysUserId = user.currentId
        this.UserList = [{
          UserName: user.currentUser,
          Id: user.currentId
        }]
      }
    }
  },
  created () {
    this.getState()
    // this.remoteMethod()
  },
  methods: {
    // 获取详情人
    getSysUserById (e) {
      let obj = {
        Id: e,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSysUserById(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.UserList = [{
              Id: response.Data.Id,
              UserName: response.Data.UserName
            }]
          } else {
            this.UserList = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //获取沟通阶段列表
    getState () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectProgressEnum(qs.stringify(obj)).then(response => {
        this.CommunicationStage = response
      })
    },
    // 搜索沟通人
    remoteMethod (queryString) {
      let obj = {
        UserId: '',
        UserName: queryString,
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
              this.UserList = response.Data
            } else {
              this.UserList = []
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
      this.remoteMethod()
    },
    // uploadFile (e) {
    //   var uploader
    //   const files = e.target.files[0]
    //   var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
    //   if (ext == 'doc' || ext == 'docx' || ext == 'pdf' || ext == 'png' || ext == 'jpg' || ext == 'jpeg') {
    //   } else {
    //     this.$message({
    //       message: '不支持该格式文件上传',
    //       type: 'warning'
    //     })
    //     e.target.value = []
    //     return false
    //   }
    //   if (files.size > (20 * 1024 * 1024)) {
    //     this.$message({
    //       message: '文件大小超过最大限制',
    //       type: 'warning'
    //     })
    //     e.target.value = []
    //     return false
    //   } else {
    //     this.uploadLoading = true
    //     if (ext == 'doc' || ext == 'docx' || ext == 'pdf') {
    //       uploader = new SupperUploader(process.env.VUE_APP_BASE_API_UPLOAD, files, uuid(), (2 * 1024 * 1024))
    //       uploader.UploadFun(() => {
    //         if (uploader.urlResult) {
    //           this.uploadLoading = false
    //           this.dataObject.Attachment = uploader.urlResult.VideoUrl
    //           this.fileName = files.name
    //           this.filestype = ext.toUpperCase()
    //           e.target.value = []
    //         }
    //       })
    //     } else {
    //       let datas = new FormData();
    //       datas.append('file', files)
    //       datas.append('message', "{ImageStreamName:'file',BussinessType:0}");
    //       axios.post(process.env.VUE_APP_BASE_API_UPLOAD, datas)
    //         .then(res => {
    //           if (res.data.State) {
    //             this.uploadLoading = false
    //             this.dataObject.Attachment = res.data.ImageUrl
    //             this.fileName = files.name
    //             this.filestype = ext.toUpperCase()
    //             e.target.value = []
    //           }
    //         })
    //     }
    //   }
    // },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('CommunicationSave', this.dataObject)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    // // 移入文件显示操作
    // fileShow () {
    //   this.optionShow = true
    // },
    // // 移出文件隐藏操作
    // filenoShow () {
    //   this.optionShow = false
    // },
    // //删除文件
    // delFiles () {
    //   this.dataObject.Attachment = ''
    //   this.fileName = ''
    // },
    close () {
      this.$emit('closeAddCommunication', false)
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
        .el-input__suffix {
          top: 24px;
          height: 40px;
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
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
    }
    .el-input__inner {
      border: none;
      background: $erinputbgc;
    }
  }
  /deep/ .attachment {
    .el-form-item__label {
      display: block;
      text-align: left;
      float: initial;
    }
    /deep/ .upload {
      position: relative;
      height: 120px;
      img {
        position: absolute;
        left: 0;
        top: 0;
      }
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 160px;
        height: 120px;
        opacity: 0;
        cursor: pointer;
        &::-webkit-file-upload-button {
          height: 0;
        }
      }
      .files {
        width: 160px;
        height: 120px;
        background: #f2f3fb;
        border-radius: 8px;
        text-align: center;
        position: relative;
        float: left;
        .filestype {
          display: inline-block;
          width: 56px;
          height: 32px;
          background: #1588f8;
          font-size: 14px;
          color: #fff;
          border-radius: 8px;
          text-align: center;
          line-height: 32px;
          position: absolute;
          left: 0;
          top: 0;
        }
        p {
          width: 110px;
          position: absolute;
          top: 38%;
          left: 50%;
          font-size: 14px;
          line-height: 18px;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: block;
          text-align: center;
        }
        .option-button {
          width: 100%;
          height: 30px;
          position: absolute;
          bottom: 0;
          left: 0;
          background: #909198;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          a {
            width: 50%;
            display: inline-block;
            line-height: 30px;
            text-align: center;
            height: 30px;
            font-size: 14px;
            color: #fff;
            vertical-align: top;
            .svg-a {
              margin-right: 10px;
              font-size: 14px;
            }
            &:hover {
              color: #1588f8;
            }
          }
        }
      }
    }
  }
}
</style>