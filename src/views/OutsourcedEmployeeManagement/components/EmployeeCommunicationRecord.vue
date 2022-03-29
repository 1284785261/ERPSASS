<template>
  <div class="EmployeeCommunicationRecord-Box">
    <el-dialog :close-on-click-modal="false" title="添加外包员工沟通记录" :visible.sync="isShow" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form label-position="top" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="沟通人">
          <el-select v-model="Communicator" style="width:100%;" filterable remote clearable placeholder="请输入关键词">
            <el-option v-for="item in optionList" :key="item.Id" :value="item.Id" :label="item.UserName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="沟通时间">
          <el-date-picker v-model="CommunicationTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="沟通内容">
          <el-input class="AddRemark" type="textarea" size="small" style="font-size:15px;" v-model="CommunicationContent" resize="none" maxlength="500" :rows="5" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="附件" class="file" v-model="enclosure">
          <div class="img-box-list">
            <!-- 未上传样式 -->
            <input type="file" ref="upload" accept=".pdf,.doc,.png,.jpg,.docx" name="" id="" @change="uploadfile">
            <div class="img-box">
              <i class="el-icon-circle-plus-outline"></i><span>{{titles}}</span>
            </div><br />
            <div class="tip">当前位置支持导入pdf、word、jpg、png后缀文件</div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveimport">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { uuid } from '@/utils/CustomValidation.js'
import { showLoading, hideLoading, copy, MenuIdDate } from '@/utils/CustomValidation'
import { GetSysUserList } from '@/api/SystemSetting.js'
import SupperUploader from '@/utils/SupperUploader'
import axios from 'axios'
import qs from 'qs'
export default {
  props: {    addVisible: {
      type: Boolean,
      default: false
    }  },
  data () {
    return {
      isShow: false,
      Communicator: '',
      CommunicationTime: '',
      CommunicationContent: '',
      enclosure: '',
      fileter: {},
      titles: '上传客户跟进附件',
      optionList: [],
    }
  },
  watch: {
    addVisible (newData, oldData) {
      this.isShow = newData
    }
  },
  created () {
    this.GetSysUserList()
  },
  methods: {
    GetSysUserList () {
      let obj = {
        UserId: "",
        UserName: "",
        Status: -1,
        PageIndex: 1,
        PageSize: 999,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSysUserList(obj).then(res => {
        console.log(res.Data);
        if (res.IsSuccess && res.Data.length > 0) {
          this.optionList = res.Data
        }
      })
    },
    //关闭
    closedialog () {
      this.$emit('CloseDialog', false)
      this.Communicator = ''
      this.CommunicationTime = ''
      this.CommunicationContent = ''
      this.enclosure = ''
      this.titles = '上传客户跟进附件'
    },
    // 上传
    uploadfile (e) {
      var uploader
      this.fileloading = true
      const files = e.target.files[0]
      var path = process.env.VUE_APP_BASE_API_UPLOAD
      if (files) {
        var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
        if (ext !== 'pdf' && ext !== 'doc' && ext !== 'docx' && ext !== 'png' && ext !== 'jpg') {
          this.$message({
            message: '不支持该格式',
            type: 'warning'
          })
          this.fileloading = false
          e.target.value = []
          return false
        }
        if (ext == 'doc' || ext == 'docx' || ext == 'pdf') {
          // 文件循环上传
          uploader = new SupperUploader(path, files, uuid(), (2 * 1024 * 1024))
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              console.log(uploader.urlResult);
              const obj = {
                'name': files.name,
                'Url': uploader.urlResult.VideoUrl,
                'visible': true
              }
              this.fileter = obj
              this.enclosure = this.fileter.Url
              this.titles = this.fileter.name
              console.log(this.enclosure.split('/')[this.enclosure.split.length]);
            }
            this.fileloading = false
            this.fileter.filestype = ext.toUpperCase()
            this.$refs.upload.value = null
          })
        } else {
          // 图片上传
          console.log('上传图片');
          let datas = new FormData();
          datas.append('file', files)
          datas.append('message', "{ImageStreamName:'file',BussinessType:0}");
          axios.post(path, datas)
            .then(res => {
              if (res.data.State) {
                const obj1 = {
                  'name': files.name,
                  'Url': res.data.ImageUrl,
                  'visible': true
                }
                // if (index == undefined) {
                //   this.filterlist.push(obj1)
                // } else {
                //   this.filterlist.splice(index, 1, obj1)
                // }
                this.fileter = obj1
                // console.log(this.fileter.Url);
                this.enclosure = this.fileter.Url
                this.titles = this.fileter.name
                console.log(this.enclosure);
                this.fileter.filestype = ext.toUpperCase()
              }
              this.fileloading = false
            }).catch(() => {
              this.fileloading = false
            })
        }
      } else {
        this.fileloading = false
      }
    },
    //外包员工沟通记录保存
    saveimport () {
      this.$emit('SaveCommunicationRecord', this.Communicator, this.CommunicationTime, this.CommunicationContent, this.enclosure)
      this.closedialog()
    },
  }
}
</script>
<style lang="scss" scoped>
.EmployeeCommunicationRecord-Box {
  /deep/ .el-form-item.file {
    .img-box-list {
      float: left;
      position: relative;
      > input {
        width: 36px;
        height: 36px;
        position: absolute;
        top: 23px;
        opacity: 0;
        z-index: 10;
        cursor: pointer;
      }
      > .img-box {
        position: absolute;
        top: 23px;
        i {
          font-size: 36px;
          color: #1588f8;
        }
        > .filetype {
          display: inline-block;
          background-color: $erpcolor;
          padding: 10px 12px;
          font-size: $f14;
          line-height: 14px;
          color: #fff;
          border-radius: 8px;
        }
        > .filename {
          font-size: $f14;
          color: $erp666;
          height: 40px;
          width: 110px;
          margin: 0px 24px 0 24px;
          letter-spacing: 0;
          word-break: break-all;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2; /*要显示的行数*/
          -webkit-box-orient: vertical;
        }
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      > .img-box-hover {
        position: absolute;
        width: 100%;
        height: 30px;
        background: #909198;
        // opacity: 0.4;
        bottom: 0;
        display: flex;
        justify-content: center;
        border-radius: 0 0 8px 8px;
        .btn {
          position: relative;
          cursor: pointer;
          line-height: 30px;
          width: 50%;
          text-align: center;
          color: #fff;
          > input {
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            cursor: pointer;
            &::-webkit-file-upload-button {
              height: 0;
            }
          }
          .svg-icon {
            font-size: $f14;
            margin-right: 10px;
          }
          > span {
            font-size: $f14;
            color: #fff;
          }
          &:hover span {
            color: #1588f8;
          }
          &:hover .svg-icon {
            color: #1588f8;
          }
        }
      }
    }
    .tip {
      float: right;
      width: 100%;
      color: $erp999;
      margin-top: 20px;
    }
  }
  /deep/ .dialog-footer.three-footer {
    text-align: center;
    > button {
      width: auto;
      height: auto;
      background-color: $erpbtncolor;
      color: $erpcolor;
    }
  }
}
</style>