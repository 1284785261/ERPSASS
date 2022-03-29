<!-- 添加员工合同 -->
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <BreadCrumb :url-list="urlList" />
      <div class="From-box-content">
        <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-Compensation">
          <el-form-item label="员工姓名" prop="StaffId" class="Compensation-header">
            <el-select v-model="dataObject.StaffId" clearable filterable remote placeholder="请查询或者下拉选择员工姓名" @clear="clearUser" :remote-method="UserMethod" :loading="loading" class="select-input" @change="selectStaff">
              <el-option v-for="item in UserPageList" :key="item.Id" :label="item.UserName + '-' + item.IdCode" :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同类型" prop="Type" class="Compensation-header">
            <el-select v-model="dataObject.Type" clearable placeholder="请选择" class="select-input">
              <el-option v-for="item in ContractTypeList" :key="item.describe" :label="item.describe" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="就业单位" prop="CompanyName" class="Compensation-header">
            <el-input v-model="dataObject.CompanyName" placeholder="请选择员工获取就业单位" disabled size="small" />
          </el-form-item>
          <el-form-item label="就业项目" prop="ProjectName" class="Compensation-header">
            <el-input v-model="dataObject.ProjectName" placeholder="请选择员工获取就业项目" disabled size="small" />
          </el-form-item> -->

          <el-form-item label="合同工资" prop="Salary" class="Compensation-header">
            <el-input v-model="dataObject.Salary" clearable size="small">
              <svg-icon slot="suffix" icon-class="money" placeholder="请输入合同工资" class-name="way" />
            </el-input>
          </el-form-item>
          <el-form-item label="试用期起始日期" prop="TryStartDate" class="Date Compensation-header">
            <el-date-picker v-model="dataObject.TryStartDate" value-format="yyyy-MM-dd" :picker-options="pickerOptions1" type="date" placeholder="请选择试用期起始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="试用期终止日期" prop="TryExpireDate" class="Date Compensation-header">
            <el-date-picker v-model="dataObject.TryExpireDate" value-format="yyyy-MM-dd" :picker-options="pickerOptions2" type="date" placeholder="请选择试用期终止日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同起始日期" prop="StartDate" class="Date Compensation-header">
            <el-date-picker v-model="dataObject.StartDate" value-format="yyyy-MM-dd" :picker-options="pickerOptions3" type="date" placeholder="请选择合同起始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同终止日期" prop="ExpireDate" class="Date Compensation-header">
            <el-date-picker v-model="dataObject.ExpireDate" value-format="yyyy-MM-dd" :picker-options="pickerOptions4" type="date" placeholder="请选择合同终止日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同签订日期" prop="SignDate" class="Date Compensation-header">
            <el-date-picker v-model="dataObject.SignDate" type="date" placeholder="请选择合同签订日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同签订模式" prop="SignType" class="State">
            <el-radio-group v-model="dataObject.SignType">
              <el-radio v-for="(item,index) in CommisionRuleEnumCommisionBase" :key="index" :label="item.value">{{item.describe}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="" prop="CommisionType" class="Compensation-header">

          </el-form-item> -->
          <el-form-item label="合同附件" prop="CommisionType" class="attachment Compensation-header">
            <div class="upload">
              <div :title="fileName" v-if="fileName" class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()" v-loading="uploadLoading">
                <span class="filestype">{{filestype}}</span>
                <p>{{fileName}}</p>
                <div v-show="optionShow" class="option-button">
                  <a>
                    <svg-icon icon-class="replace" class-name="svg-a" />替换
                    <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile replaceFile" @change="uploadFile">
                  </a>
                  <a @click="delFiles">
                    <svg-icon icon-class="del" class-name="svg-a" />删除
                  </a>
                </div>
              </div>
              <div class="files" v-else v-loading="uploadLoading">
                <img src="../../../assets/upload.png">
                <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile" @change="uploadFile">
              </div>
              <div class="prompt">
                上传员工合同附件\电子档或者纸质版扫描文档
                上传格式为PNG、JPG、Word、PDF、XLS
              </div>
            </div>

          </el-form-item>

          <div class="footer-button">
            <el-button class="operation-button" type="primary" @click="cancel">取消</el-button>
            <el-button class="operation-button" type="primary" @click="Formsave('ruleForm')">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { GetStaffPageList, GetStaffContractType, AddStaffContract, EditStaffContract, GetStaffContract } from '@/api/OutsourcedEmployeeManagement.js'
import { MenuIdDate, showLoading, hideLoading, uuid, copy } from '@/utils/CustomValidation'
import SupperUploader from '@/utils/SupperUploader'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    BreadCrumb
  },
  data () {
    const _this = this
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          if (_this.dataObject.TryExpireDate) {
            const data = new Date(_this.dataObject.TryExpireDate)
            data.setDate(data.getDate() - 1)
            return time.getTime() > data
          } else {
            return false
          }
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          if (_this.dataObject.TryStartDate) {
            const data = new Date(_this.dataObject.TryStartDate)
            data.setDate(data.getDate())
            return time.getTime() < data
          } else {
            return false
          }
        }
      },
      pickerOptions3: {
        disabledDate: (time) => {
          if (_this.dataObject.ExpireDate) {
            const data = new Date(_this.dataObject.ExpireDate)
            data.setDate(data.getDate() - 1)
            return time.getTime() > data
          } else {
            return false
          }
        }
      },
      pickerOptions4: {
        disabledDate: (time) => {
          if (_this.dataObject.StartDate) {
            const data = new Date(_this.dataObject.StartDate)
            data.setDate(data.getDate())
            return time.getTime() < data
          } else {
            return false
          }
        }
      },
      urlList: [{
        name: '员工合同管理',
        router: '/OutsourcedEmployeeManagement/EmployeeContractManagement'
      }, {
        name: '添加员工合同',
        router: ''
      }],
      dataObject: {
        Id: '',
        StaffId: '',
        Type: '',
        // CompanyId: '',
        // CompanyName: '',
        // ProjectId: '1',
        // ProjectName: '',
        Salary: '',
        StartDate: '',
        ExpireDate: '',
        SignDate: '',
        SignType: '0',
        Attachment: '',
        Status: '0',
        TryStartDate: '',
        TryExpireDate: ''
      },
      Formrules: {
        Type: [{ required: true, message: '请选择合同类型', trigger: 'change' }],
        StartDate: [{ required: true, message: '请选择合同起始日期', trigger: 'change' }],
        ExpireDate: [{ required: true, message: '请选择合同终止日期', trigger: 'change' }],
        SignDate: [{ required: true, message: '请选择合同签订日期', trigger: 'change' }]
      },
      UserPageList: [],//员工列表
      ContractTypeList: [],//合同类型
      CommisionRuleEnumCommisionBase: [
        {
          value: '0',
          describe: '电子版'
        },
        {
          value: '1',
          describe: '纸质版'
        }
      ],//签订模式
      showAddPhase: false,
      optionShow: false,
      fileName: '',
      filestype: '',
      PhaseTitle: '',
      loading: false,
      uploadLoading: false,
      ProjectId: '',

      operating: {}
    }
  },
  created () {
    this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
    this.getType()
    if (this.$route.query && this.$route.query.ProjectId) {
      this.ProjectId = this.$route.query.ProjectId
      this.urlList[0] = {
        name: '项目详情',
        router: `/projectManagement/ProjectDetail?Id=${this.ProjectId}`
      }
    }
    if (this.$route.query && this.$route.query.Id) {
      this.urlList[1].name = '修改员工合同'
      this.ContractId = this.$route.query.Id
      this.getContractDetal(this.ContractId)
    } else {
      this.urlList[1].name = '添加员工合同'
      this.UserMethod()
    }
  },
  methods: {
    getType () {
      GetStaffContractType().then(response => {
        this.ContractTypeList = response
      })
    },
    //编辑获取数据
    getContractDetal (Id) {
      let obj = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffContract(qs.stringify(obj)).then(response => {
        if (response.IsSuccess && response.Data) {
          this.dataObject = response.Data
          this.dataObject.SignType += ''
          if (this.dataObject.Attachment) {
            this.fileName = this.dataObject.Attachment.slice(this.dataObject.Attachment.lastIndexOf('/') + 1, this.dataObject.Attachment.lastIndexOf('.'))
            this.filestype = this.dataObject.Attachment.slice(this.dataObject.Attachment.lastIndexOf('.') + 1).toUpperCase()
          }
          this.UserMethod(this.dataObject.StaffName)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    // 移入文件显示操作
    fileShow () {
      this.optionShow = true
    },
    // 移出文件隐藏操作
    filenoShow () {
      this.optionShow = false
    },
    //选择员工查询公司项目
    selectStaff (value) {
      // let obj = this.UserPageList[this.UserPageList.findIndex(item => item.Id == value)]
      // this.dataObject.CompanyId = obj.CompanyId
      // this.dataObject.CompanyName = obj.CompanyName
      // this.dataObject.ProjectId = obj.ProjectId
      // this.dataObject.ProjectName = obj.ProjectName
    },
    //查询员工
    UserMethod (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          UserName: query,
          IdCode: '',
          CompanyName: '',
          ProjectName: '',
          PageIndex: 1,
          PageSize: 99,
          Type: -1,
          ProjectId: this.ProjectId,
          Diploma: -1,
          Status: '',
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetStaffPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            this.UserPageList = response.Data
          } else {
            this.UserPageList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    //重置员工查询
    clearUser () {
      this.UserMethod()
    },
    uploadFile (e) {

      var uploader
      const files = e.target.files[0]
      var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
      if (ext == 'doc' || ext == 'docx' || ext == 'pdf' || ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'xls' || ext == 'xlsx') {
      } else {
        this.$message({
          message: '不支持该格式文件上传',
          type: 'warning'
        })
        e.target.value = []
        return false
      }
      if (files.size > (20 * 1024 * 1024)) {
        this.$message({
          message: '文件大小超过最大限制',
          type: 'warning'
        })
        e.target.value = []
        return false
      } else {
        this.uploadLoading = true
        if (ext == 'doc' || ext == 'docx' || ext == 'pdf' || ext == 'xls' || ext == 'xlsx') {
          uploader = new SupperUploader(process.env.VUE_APP_BASE_API_UPLOAD, files, uuid(), (2 * 1024 * 1024))
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              this.uploadLoading = false
              this.dataObject.Attachment = uploader.urlResult.VideoUrl
              this.fileName = files.name
              this.filestype = ext.toUpperCase()
              e.target.value = []
            }
          })
        } else {
          let datas = new FormData();
          datas.append('file', files)
          datas.append('message', "{ImageStreamName:'file',BussinessType:0}");
          axios.post(process.env.VUE_APP_BASE_API_UPLOAD, datas)
            .then(res => {
              if (res.data.State) {
                this.uploadLoading = false
                this.dataObject.Attachment = res.data.ImageUrl
                this.fileName = files.name
                this.filestype = ext.toUpperCase()
                e.target.value = []
              }
            })
        }
      }
    },
    //删除文件
    delFiles () {
      this.dataObject.Attachment = ''
      this.fileName = ''
    },
    //保存
    Formsave (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          showLoading()
          let obj = copy(this.dataObject)
          obj.menuid = this.operating.MenuId
          obj.operationcode = this.operating.OperationCode
          if (this.ContractId) {
            EditStaffContract(qs.stringify(obj)).then((response) => {
              hideLoading()
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '修改员工合同成功!'
                })
                setTimeout(() => {
                  this.$router.go(-1)
                }, 2000)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent
                })
              }
            })
          } else {
            AddStaffContract(qs.stringify(obj)).then((response) => {
              hideLoading()
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '添加员工合同成功!'
                })
                setTimeout(() => {
                  this.$router.go(-1)
                }, 2000)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent
                })
              }
            })
          }

        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //取消操作
    cancel () {
      this.$router.go(-1)
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.Compensation-box {
  margin-left: 24px;
}
.From-box-content {
  margin-top: 24px;
  background: #fff;
  overflow: hidden;
  .forms-Compensation {
    margin: 40px;
    /deep/ .Compensation-header {
      display: inline-block;
      input {
        background: $erinputbgc;
        border: none;
        height: 40px;
        line-height: 40px;
      }
    }
    /deep/ .attachment {
      width: 100%;
      .el-form-item__label {
        display: block;
        text-align: left;
      }
    }
    .el-form-item {
      min-width: 430px;
      margin: 0 50px;
      margin-bottom: 15px;
      /deep/ .el-form-item__label {
        width: 100%;
        display: block;
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
            top: 24px;
            height: 40px;
          }
        }
      }
    }
    /deep/ .is-error {
      .el-form-item__content {
        .el-input__inner {
          border: 1px solid #f56c6c;
        }
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
    /deep/ .State {
      display: inline-block;
      .el-radio-group {
        display: block;
        margin-top: 50px;
        label {
          display: inline-block;
          &:nth-child(1) {
            margin-right: 100px;
          }
        }
      }
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
    .prompt {
      float: left;
      width: 300px;
      font-size: 14px;
      color: #999999;
      margin-top: 20px;
      margin-left: 17px;
    }
    .footer-button {
      margin: 100px 0 200px 0;
      text-align: center;
      button {
        margin: 0 12px;
      }
    }
  }
}
</style>