<!-- 导入员工 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" class="dialog-box" :title="title" :visible.sync="dialogVisible" destroy-on-close width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form ref="ruleForm" :model="dataObject" :rules="rules" class="forms">
        <el-form-item label="选择文件" clearable prop="fileUrl" class="File-item">
          <el-button type="primary" class="upload-bts" :loading="uploadLoading">上传</el-button>
          <input type="file" accept=".xls,.xlsx," name="file" class="ButtonFile" @change="uploadFile">
          <el-input v-model="dataObject.fileUrl" disabled size="small" />
        </el-form-item>
        <a class="downloadBtn" @click="DownloadTemplate">点击下载模板</a>
        <el-form-item label="sheet表名称" prop="SheetName">
          <el-input v-model="dataObject.SheetName" placeholder="请输入sheet表名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">导入</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
export default {
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
    }
  },
  data () {
    return {
      dialogVisible: false,
      dataObject: {
        fileUrl: '',
        SheetName: ''
      },
      uploadLoading: false,
      fileters: null,
      rules: {
        fileUrl: [
          { required: true, message: '请上传导入表格', trigger: 'change' }
        ],
        SheetName: [
          { required: true, message: '请输入sheet表名', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue;
      if (newvalue) {
      } else {
      }
    }
  },
  methods: {
    uploadFile (e) {
      const files = e.target.files[0]
      if (files) {
        this.uploadLoading = true
        var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
        this.dataObject.fileUrl = files.name
        if (ext == 'xls' || ext == 'xlsx') {
        } else {
          this.$message({
            message: '不支持该格式文件上传',
            type: 'warning'
          })
          e.target.value = []
          this.dataObject.fileUrl = ''
          this.uploadLoading = false
          return false
        }
        this.fileters = files
        this.uploadLoading = false
      }
    },
    closedialog () {
      this.dataObject.fileUrl = ''
      this.fileters = null
      this.$emit('closedialog')
    },
    save () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.fileters) {
            let param = new FormData()
            param.append('file', this.fileters)
            param.append('SheetName', this.dataObject.SheetName)
            this.$emit('savedialog', param)
          } else {
            this.$message({
              message: '请选择导入文件',
              type: 'warning'
            })
          }
        }
      })
    },
    // 模板下载
    DownloadTemplate () {
      this.$emit('downtemplete')
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  /deep/ .el-form-item {
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
  .upload-bts {
    position: absolute;
    right: 0;
    top: 24px;
    z-index: 10;
    background: #1588f8;
    /deep/ span {
      color: #fff;
    }
  }
  .downloadBtn {
    color: #1588f8;
  }
}

/deep/ .dialog-footer {
  padding: 0 !important;
}
</style>