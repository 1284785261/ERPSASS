<!-- 导入发放回执弹框 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <div slot="title">
        <span>{{title}}</span>
        <el-popover class="prompt" placement="bottom" trigger="hover" :content="contenttip">
          <svg-icon slot="reference" icon-class="prompt" class="cursor-pointer" />
        </el-popover>
      </div>
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <el-row :gutter="24">
          <el-col :span="12" v-for="(item, index) in downlinks" :key="index">
            <div class="link-box" @click="downtemplate(item.link)">
              <span>{{ item.value }}</span>
            </div>
          </el-col>
          <el-col>
            <div class="downuniversal">
              <span class="down-title">点击下载通用模板：</span>
              <span class="down-name" @click="downtemplate(universal)">发放回执通用模板.xls</span>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="模板类型" prop="TemplateType" class="select">
          <el-select v-model="operateform.TemplateType" filterable clearable placeholder="搜索或选择模板类型">
            <el-option :label="item.describe" :value="item.value" v-for="(item, index) in temptypelist" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Sheet表名称" prop="SheetName">
          <el-input v-model="operateform.SheetName" placeholder="请输入Sheet表名称"></el-input>
        </el-form-item>
        <div class="file-box">
          <div class="title">选择文件</div>
          <div class="file" v-loading="uploadLoading">
            <div class="img-box-list" v-if="!files">
              <!-- 未上传样式 -->
              <input type="file" ref="upload" accept=".xls,.xlsx" name="" id="" @change="uploadfile">
              <div class="img-box">
                <img src="@/assets/down.png" alt="">
              </div>
            </div>
            <div class="img-box-list" v-if="files" @mouseenter="filterdata.visible=!filterdata.visible" @mouseleave="filterdata.visible=!filterdata.visible">
              <div class="img-box">
                <span class="filetype">{{filterdata.type}}</span>
                <div class="filename" :title="filterdata.name">{{filterdata.name}}</div>
              </div>
              <div class="img-box-hover" v-show="filterdata.visible==true">
                <div class="btn">
                  <input type="file" accept=".xls,.xlsx" name="" id="" @change="uploadfile($event)">
                  <svg-icon icon-class="replace" class-name="svg-a" />
                  <span>替换</span>
                </div>
                <div class="btn" @click="deletefile()">
                  <svg-icon icon-class="del" class-name="svg-a" />
                  <span>删除</span>
                </div>
              </div>
            </div>
            <div class="file-tip">
              只能上传.xls.xlsx格式文件，文件不能超过20M
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="middle" @click="closedialog">取 消</el-button>
        <el-button class="erpbtn" size="middle" @click="submitreview">导 入</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import SupperUploader from '@/utils/SupperUploader'
import { GetImportAndIssueReceiptTemplate, GetImportAndIssueReceiptEnum } from '@/api/FinancialManagement.js'
import qs from 'qs'
import { uuid, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
export default {
  props: {
    title: {
      type: String,
    },
    visible: {
      type: Boolean,
    },
  },
  data () {
    return {
      dialogVisible: false,
      operateform: {
        TemplateType: '',
        SheetName: ''
      },
      contenttip: '系统目前支持导入交行跨行、兴业银行、中信、邮政、招行的表格，剩余银行请使用发放回执通用模板',
      rules: {
        SheetName: [
          { required: true, message: '请输入Sheet表名称', trigger: 'blur' },
        ],
        TemplateType: [
          { required: true, message: '请选择模板类型', trigger: 'change' }
        ]
      },

      downlinks: [{
        index: 0,
        value: '交行跨行模板.xls'
      }, {
        index: 1,
        value: '邮政发放明细表.xls'
      }, {
        index: 2,
        value: '中信发放明细表.xls'
      }, {
        index: 3,
        value: '新中信发放明细表.xls'
      }, {
        index: 4,
        value: '招行发放明细表.xls'
      }, {
        index: 5,
        value: '新兴业银行模板.xls'
      }],
      universal: '',
      temptypelist: [],

      importvisible: false, // 导入员工弹框
      uploadLoading: false, // 导入状态
      filterdata: { // 上传的文件
        type: '',
        name: '',
        visible: false
      },
      files: null, // 文件
    }
  },
  created () {
    this.getImportAndIssueReceiptTemplate()
    this.getImportAndIssueReceiptEnum()
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
    }
  },
  methods: {
    // 获取回执模板信息
    getImportAndIssueReceiptTemplate () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetImportAndIssueReceiptTemplate(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            for (const key in response.Data) {
              if (Object.hasOwnProperty.call(response.Data, key)) {
                const element = response.Data[key];
                console.log(key);
                switch (key) {
                  case "Currency":
                    this.universal = element
                    break;
                  case "BCM":
                    this.downlinks[0].link = element
                    break;
                  case "CIB":
                    this.downlinks[5].link = element
                    break;
                  case "NCCBC":
                    this.downlinks[3].link = element
                    break;
                  case "PSBC":
                    this.downlinks[1].link = element
                    break;
                  case "CMB":
                    this.downlinks[4].link = element
                    break;
                  case "CCBC":
                    this.downlinks[2].link = element
                    break;
                  default:
                    break;
                }
              }
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取回执模板枚举列表
    getImportAndIssueReceiptEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetImportAndIssueReceiptEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.temptypelist = response
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    closedialog () {
      this.files = null
      this.filterdata = {
        type: '',
        name: '',
        visible: false
      }
      this.operateform = {
        TemplateType: '',
        SheetName: ''
      }
      this.$refs.operateform.resetFields()
      this.$emit('closeimport')
    },
    // 确认标记为已发放
    submitreview () {
      // 判断文件是否上传
      if (this.files) {
      } else {
        this.$message({
          message: '请选择文件',
          type: 'warning'
        })
        return
      }
      this.$refs['operateform'].validate(v => {
        if (v) {
          let obj = this.operateform
          obj.files = this.files
          this.$emit('importreceipt', obj)
        }
      })
    },
    // 下载模板
    downtemplate (e) {
      console.log(e)
      window.open(e)
    },

    // 上传附件xls
    uploadfile (e) {
      var uploader
      const files = e.target.files[0]
      var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
      if (ext == 'xls' || ext == 'xlsx') {
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
        this.files = e.target.files[0]
        this.filterdata = {
          type: 'Excel',
          name: this.files.name,
          visible: false
        }
        // this.uploadLoading = true
        // uploader = new SupperUploader(process.env.VUE_APP_BASE_API_UPLOAD, files, uuid(), (2 * 1024 * 1024))
        // uploader.UploadFun(() => {
        //   if (uploader.urlResult) {
        //     this.uploadLoading = false
        //     this.filterdata.Attachment = uploader.urlResult.VideoUrl
        //     this.filterdata.name = files.name
        //     this.filterdata.visible = false
        //     this.filterdata.type = ext.toUpperCase()
        //     this.files = e.target.files[0]
        //     e.target.value = []
        //   }
        // })
      }
    },
    // 删除
    deletefile () {
      this.files = null
      this.filterdata = {
        type: '',
        name: '',
        visible: false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.erpdialog {
  .el-dialog__header {
    .prompt {
      float: none;
      margin-left: 10px;
    }
  }
  .operateform {
    .link-box {
      width: 100%;
      height: 32px;
      border-radius: 8px;
      line-height: 32px;
      text-align: center;
      background-color: $erinputbgc;
      margin-bottom: 16px;
      cursor: pointer;
      > span {
        color: $erpcolor;
      }
    }
    .downuniversal {
      .down-name {
        color: $erpcolor;
        cursor: pointer;
      }
    }
    .file-box {
      padding: 0 !important;
      .title {
        font-size: $f14;
        color: $erp666;
        line-height: 28px;
      }
      .file {
        display: flex;
        align-items: center;
        .img-box-list {
          width: 160px;
          position: relative;
          > input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            z-index: 99;
          }
          .img-box {
            width: 160px;
            height: 120px;
            border-radius: 8px;
            overflow: hidden;
            background-color: $erinputbgc;
            position: relative;
            .filetype {
              position: absolute;
              background-color: $erpcolor;
              padding: 10px 12px;
              font-size: $f14;
              line-height: 14px;
              color: #fff;
              border-radius: 8px;
            }
            .filename {
              font-size: $f14;
              color: $erp666;
              position: absolute;
              left: 50%;
              top: 50%;
              width: 110px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              transform: translate(-50%, -50%);
            }
          }
          > .img-box-hover {
            position: absolute;
            width: 100%;
            height: 30px;
            background-color: #909198;
            bottom: 0;
            display: flex;
            justify-content: center;
            border-radius: 0 0 8px 8px;
            .btn {
              position: relative;
              line-height: 30px;
              text-align: center;
              cursor: pointer;
              width: 50%;
              > input {
                width: 100%;
                height: 100%;
                opacity: 0;
                position: absolute;
                cursor: pointer;
              }
              .svg-icon {
                color: #fff;
                margin-right: 10px;
                font-size: $f14;
              }
              > span {
                font-size: $f14;
                color: #fff;
                cursor: pointer;
              }
              &:hover {
                .svg-icon {
                  color: #1588f8;
                }
                span {
                  color: #1588f8;
                }
              }
            }
          }
        }
        .file-tip {
          margin-left: 16px;
          color: $erp999;
          line-height: 21px;
        }
      }
    }
  }
  .el-dialog__footer {
    text-align: center !important;
    .dialog-footer-multiple {
      text-align: center;
      > button {
        width: auto;
        height: auto;
        background-color: $erpbtncolor;
        color: $erpcolor;
      }
    }
  }
}
</style>