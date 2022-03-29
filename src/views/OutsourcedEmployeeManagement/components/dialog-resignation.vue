<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateforms" label-width="100px" class="operateform">
        <el-form-item label="离职项目" v-if="this.searchobj.resignatType == 2" prop="ProjectId">
          <el-select v-model="operateform.ProjectId" class="selet" clearable placeholder="请选择离职项目">
            <el-option v-for="item in PorjectList" :key="item.ProjectId" :label="item.ProjectName" :value="item.ProjectId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="离职时间" prop="LeaveTime">
          <el-date-picker v-model="operateform.LeaveTime" type="date" placeholder="选择离职时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="社保停缴" v-show="this.searchobj.resignatType == 1">
          <el-radio-group v-model="operateform.SiStatus">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="社保停缴时间" v-show="operateform.SiStatus===1 && this.searchobj.resignatType == 1">
          <el-date-picker v-model="operateform.SiSTime" type="month" placeholder="选择社保停缴时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="公积金停缴" v-show="this.searchobj.resignatType == 1">
          <el-radio-group v-model="operateform.FundStatus">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公积金停缴时间" v-if="operateform.FundStatus===1 && this.searchobj.resignatType == 1">
          <el-date-picker v-model="operateform.FundTime" type="month" placeholder="选择公积金停缴时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="医保停缴" v-show="this.searchobj.resignatType == 1">
          <el-radio-group v-model="operateform.MedicalStatus">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="医保停缴时间" v-if="operateform.MedicalStatus===1 && this.searchobj.resignatType == 1">
          <el-date-picker v-model="operateform.MedicalTime" type="month" placeholder="选择医保停缴时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="离职原因" class="text">
          <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="operateform.LeaveReason"></el-input>
        </el-form-item>
        <el-form-item label="离职协议状态" class="useraido">
          <el-radio-group v-model="operateform.LeaveAgree">
            <el-radio :label="1">已签订</el-radio>
            <el-radio :label="0">未签订</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="离职协议附件" class="file" v-loading="fileloading">
          <div class="img-box-list" v-show="!fileter.Url">
            <!-- 未上传样式 -->
            <input type="file" ref="upload" accept=".doc,.docx,.pdf,.png,.jpg,.xls,.xlsx" name="" id="" @change="uploadfile">
            <div class="img-box">
              <img src="@/assets/down.png" alt="">
            </div>
          </div>
          <div class="img-box-list" v-show="fileter.Url" @mouseenter="fileter.visible=!fileter.visible" @mouseleave="fileter.visible=!fileter.visible">
            <div class="img-box">
              <span class="filetype">{{fileter.name}}</span>
              <div class="filename" :title="fileter.Url">{{fileter.Url}}</div>
            </div>
            <div class="img-box-hover" v-show="fileter.visible==true">
              <!-- <div class="btn" @click="watch(item)">
                <svg-icon icon-class="money" />
                <span>预览</span>
              </div>
              <div class="btn" @click="down(item)">
                <svg-icon icon-class="money" />
                <span>下载</span>
              </div> -->
              <div class="btn">
                <input type="file" ref="upload" accept=".doc,.docx,.pdf,.png,.jpg,.xls,.xlsx" name="" id="" @change="uploadfile">
                <svg-icon icon-class="replace" class-name="svg-a" />
                <span>重新上传</span>
              </div>
              <div class="btn" @click="deletefile">
                <svg-icon icon-class="del" class-name="svg-a" />
                <span>删除</span>
              </div>
            </div>
          </div>
          <div class="tip">请选择您要上传的离职协议，上传格式为PNG、JPG、Word、PDF、XLS</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('operateforms')">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uuid, MenuIdDate } from '@/utils/CustomValidation.js'
import SupperUploader from '@/utils/SupperUploader'
import { GetProjectStaffPageList } from '@/api/projectManagement.js'
import axios from 'axios'
import qs from 'qs'
export default {
  props: ['title', 'visible', 'contentdata', 'searchIDobj'],
  data () {
    return {
      dialogVisible: false,
      operateform: {
        LeaveTime: '',
        LeaveReason: '',
        LeaveAgree: 1,
        AgreeUrl: '',
        Remark: '',
        SiStatus: 0,
        SiSTime: '',
        ProjectId: '',
        SiEndYear: '',
        SiEndMonth: '',
        FundStatus: 0,
        FundTime: '',
        FundEndYear: '',
        FundEndMonth: '',
        MedicalStatus: 0,
        MedicalTime: '',
        MedicalEndYear: '',
        MedicalEndMonth: '',
      },
      PorjectList: [],
      fileter: {}, // 上传文件对象
      rules: {},
      fileloading: false,
      searchobj: {},
      rules: {
        ProjectId: [
          { required: true, message: '请选择离职项目', trigger: 'change' },
        ],
        LeaveTime: [
          { type: 'date', required: true, message: '请选择离职时间', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (newvalue) {
        this.searchobj = this.searchIDobj
        this.operateform = this.$options.data().operateform
        this.$nextTick(() => {
          this.$refs.operateforms.resetFields();
        })
        if (this.searchobj.resignatType == 2) {
          this.getProject()
        }
      }
    },
  },
  methods: {
    uploadfile (e) {
      var uploader
      this.fileloading = true
      const files = e.target.files[0]
      var path = process.env.VUE_APP_BASE_API_UPLOAD
      if (files) {
        var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
        if (ext !== 'doc' && ext !== 'docx' && ext !== 'pdf' && ext !== 'png' && ext !== 'jpg' && ext !== 'xls' && ext !== 'xlsx') {
          this.$message({
            message: '不支持该格式',
            type: 'warning'
          })
          this.fileloading = false
          e.target.value = []
          return false
        }
        // 文件大小限制
        // if (files.size > (50 * 1024 * 1024)) {
        //   this.$message({
        //     message: '文件大小超过最大限制',
        //     type: 'warning'
        //   })
        //   this.fileloading = false
        //   return
        // }
        if (ext == 'doc' || ext == 'docx' || ext == 'pdf' || ext == 'xls' || ext == 'xlsx') {
          // 文件循环上传
          uploader = new SupperUploader(path, files, uuid(), (2 * 1024 * 1024))
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              const obj = {
                'name': ext,
                'Url': uploader.urlResult.VideoUrl,
                'visible': false
              }
              // if (index == undefined) {
              //   this.filterlist.push(obj)
              // } else {
              //   this.filterlist.splice(index, 1, obj)
              // }
              this.fileter = obj
            }
            this.fileloading = false
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
                  'name': ext,
                  'Url': res.data.ImageUrl,
                  'visible': false
                }
                // if (index == undefined) {
                //   this.filterlist.push(obj1)
                // } else {
                //   this.filterlist.splice(index, 1, obj1)
                // }
                this.fileter = obj1
              }
              this.fileloading = false
            }).catch(() => {
              this.fileloading = false
            })
        }
      }
    },
    deletefile () {
      this.fileter = {}
    },
    getProject () {
      let obj = {
        PageIndex: 1,
        PageSize: 999,
        ProjectId: this.searchobj.ProjectId,
        StaffId: this.searchobj.staffId,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectStaffPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess && response.Data && response.Data.length > 0) {
          if (this.searchobj.ProjectId) {
            this.operateform.ProjectId = Number(this.searchobj.ProjectId)
          }
          this.PorjectList = response.Data
        } else {
          this.PorjectList = []
        }
      })
    },
    save (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.fileter.Url) {
            this.operateform.AgreeUrl = this.fileter.Url
          }
          // 处理社保时间
          if (this.operateform.SiSTime) {
            this.operateform.SiEndYear = this.operateform.SiSTime.getFullYear()
            this.operateform.SiEndMonth = this.operateform.SiSTime.getMonth() + 1
          } else {
            this.operateform.SiEndYear = ''
            this.operateform.SiEndMonth = ''
          }
          // 处理公积金时间
          if (this.operateform.FundTime) {
            this.operateform.FundEndYear = this.operateform.FundTime.getFullYear()
            this.operateform.FundEndMonth = this.operateform.FundTime.getMonth() + 1
          } else {
            this.operateform.FundEndYear = ''
            this.operateform.FundEndMonth = ''
          }
          // 处理医保时间
          if (this.operateform.MedicalTime) {
            this.operateform.MedicalEndYear = this.operateform.MedicalTime.getFullYear()
            this.operateform.MedicalEndMonth = this.operateform.MedicalTime.getMonth() + 1
          } else {
            this.operateform.MedicalEndYear = ''
            this.operateform.MedicalEndMonth = ''
          }
          this.$emit('saveresignation', this.operateform, this.searchobj.resignatType)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
        }
      })
    },
    closedialog () {
      this.operateform = {
        LeaveTime: '',
        LeaveReason: '',
        LeaveAgree: 1,
        AgreeUrl: '',
        Remark: '',
      }
      this.fileter = {}
      this.$emit('closedialog')
    }
  },
}
</script>

<style lang="scss" scoped>
.el-form-item.file {
  .img-box-list {
    float: left;
    width: 160px;
    position: relative;
    height: 120px;
    > input {
      width: 160px;
      height: 120px;
      position: absolute;
      opacity: 0;
      z-index: 10;
      cursor: pointer;
    }
    > .img-box {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #f0f4fa;
      border-radius: 8px;
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
        margin: 12px 24px 0 24px;
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
      background-color: rgba(0, 0, 0, 1);
      opacity: 0.4;
      bottom: 0;
      display: flex;
      justify-content: center;
      border-radius: 0 0 8px 8px;
      .btn {
        position: relative;
        cursor: pointer;
        line-height: 30px;
        > input {
          width: 100%;
          height: 100%;
          opacity: 0;
          position: absolute;
          cursor: pointer;
        }
        .svg-icon {
          font-size: $f14;
          color: #fff;
        }
        > span {
          font-size: $f14;
          color: #fff;
        }
      }
      .btn + .btn {
        margin-left: 24px;
      }
    }
  }
  .tip {
    float: right;
    width: 50%;
    color: $erp999;
    margin-top: 20px;
  }
}
.selet {
  width: 100%;
}
</style>