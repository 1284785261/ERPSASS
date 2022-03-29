//导入推荐奖励
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="导入入职推荐奖金明细" class="dialog-box" append-to-body :visible.sync="showBonus" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms">
        <el-form-item label="选择文件" clearable prop="FileUrl" class="File-item">
          <el-button type="primary" class="upload-bts" :loading="uploadLoading">上传</el-button>
          <input type="file" accept=".xls,.xlsx," name="file" class="ButtonFile" @change="uploadFile">
          <el-input v-model="dataObject.FileUrl" disabled size="small" />
        </el-form-item>
        <span>当前位置仅支持导入Excel</span><a class="downloadBtn" @click="DownloadTemplate">点击下载模板</a>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue">开始导入</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetRecruitRecommendExcelModel } from '@/api/RecruitmentManagement.js'
import axios from 'axios'
export default {
  name: 'ImportBonus',
  props: ['showImportBonus'],
  data () {
    return {
      dataObject: {
        Id: '',
        FileUrl: ''
      },
      param: {},
      showBonus: false,
      uploadLoading: false
    }
  },
  watch: {
    showImportBonus (newvalue, oldvalue) {
      this.showBonus = newvalue
    }
  },
  created () {

  },
  methods: {
    uploadFile (e) {
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
        this.uploadLoading = true
        this.param = new FormData()
        this.param.append('file', files)
        setTimeout(() => {
          this.dataObject.FileUrl = files.name
          this.uploadLoading = false
        }, 2000)

      }
    },
    //模板下载
    DownloadTemplate () {
      GetRecruitRecommendExcelModel().then(response => {
        if (response.IsSuccess && response.Data) {
          window.open(response.Data)
        }
      })
    },
    //导入员工
    dialogtrue () {
      // 调用接口,保存数据
      this.$emit('ImportBonusSave', this.param)

    },
    //关闭导入事件
    close () {
      this.dataObject.FileUrl = ''
      this.param = {}
      this.$emit('closeImportBonus', false)
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
  .upload-bts {
    position: absolute;
    right: 0;
    top: 24px;
    z-index: 10;
    background: #1588f8;
    button {
      padding: 12px 19px;
    }
  }
  .downloadBtn {
    margin-left: 20px;
    color: #1588f8;
  }
}
</style>