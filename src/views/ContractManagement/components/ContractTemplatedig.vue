<!-- 下载合同模板弹窗 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showContractTemplate" :show-close="false" :destroy-on-close="true" width="900px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <div class="search-bar clearfix">
        <div class="condition" v-if="IsEmployees">
          <div class="search-name">员工类型</div>
          <el-input class="erpsearchinput" disabled placeholder="" size="small" v-model="searchform.Employees" />
        </div>
        <div class="condition">
          <div class="search-name">模板名称</div>
          <el-input class="erpsearchinput" clearable placeholder="" size="small" v-model="searchform.Name" />
        </div>
        <div class="condition">
          <div class="search-name">业务类型</div>
          <el-select v-model="searchform.BusinessType" class="erpsearchinput" size="small" clearable placeholder="">
            <el-option v-for="item in ContractTypeList" :key="item.value" :label="item.describe" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="condition">
          <el-button size="small" class="erpbtn" @click="searchtable">搜索</el-button>
        </div>
      </div>
      <div class="content">
        <div class="operate-table">
          <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="400" tooltip-effect="dark">
            <el-table-column align="center" prop="Id" label="模板编号" width="120" />
            <el-table-column align="center" prop="Name" label="模板名称" min-width="120" />
            <el-table-column align="center" prop="OperaName" label="操作" min-width="100">
              <template slot-scope="scope">
                <a style="color:#1588F8;margin-right:10px;" @click="watchFile(scope.row)">预览</a>
                <a style="color:#1588F8;" @click="Download(scope.row)">下载</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="pagina-fonter dialog-pagina">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-dialog>
    <!-- 预览弹窗 -->
    <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>
<script>
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import { GetContractTemplateEnum, GetContractTemplatePageList } from '@/api/FileTemplateManagement.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'ContractTemplatedig',
  props: ['showContractTemplateLog', 'title'],
  components: {
    PreviewFile
  },
  data () {
    return {
      searchform: {
        Name: '',
        Employees: '外派员工',
        BusinessType: '-1'
      },
      IsEmployees: false,
      ContractTypeList: [],
      showContractTemplate: false,
      tableloading: false,
      tableData: [],
      isImg: 1,
      previewFileUrl: '',
      titlename: '合同模板预览',
      iframeShow: false,
      PageSize: 10,
      currentPage: 1,
      total: 0,
    }
  },
  watch: {
    showContractTemplateLog (newvalue, oldvalue) {
      this.showContractTemplate = newvalue
      this.searchform = this.$options.data().searchform
      if (this.title == '下载员工合同模板') {
        this.IsEmployees = true
      } else {
        this.IsEmployees = false
      }
      this.GetContractTemplateEnum()
      this.GetContract()
    }
  },
  created () {

  },
  methods: {
    // 查询
    searchtable () {
      this.currentPage = 1
      this.GetContract()
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.GetContract()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.GetContract()
    },
    //获取模板枚举
    GetContractTemplateEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetContractTemplateEnum(qs.stringify(obj)).then(res => {
        if (res) {
          this.ContractTypeList = res.ProjectBusinessType
          this.ContractTypeList.unshift({ value: '-1', describe: "全部" })
        }
      })
    },
    //获取合同模板列表
    GetContract () {
      let obj = {
        Name: this.searchform.Name,
        TempType: '-1',
        BusinessType: this.searchform.BusinessType,
        Status: 1,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      this.tableloading = true
      GetContractTemplatePageList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.tableData = response.Data
            this.total = response.Total
          } else {
            this.tableData = []
            this.total = 0
          }
        } else {
          this.tableData = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //预览附件
    watchFile (data) {
      const e = data.Attachment
      if (e) {
        const ext = e.slice(e.lastIndexOf('.') + 1).toLowerCase()
        console.log(e);
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = e
        } else if (ext == 'doc' || ext == 'docx' || ext == 'xlsx' || ext == 'xls') {
          this.isImg = 3
          this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + e
        } else {
          this.isImg = 1
          this.previewFileUrl = e
        }
        this.iframeShow = true
      }
    },
    //关闭预览
    closeFileShow (val) {
      this.iframeShow = val
    },
    //下载模板
    Download (data) {
      if (data.Attachment) {
        window.open(data.Attachment)
      } else {
        this.$message({
          message: '暂无合同模板文件下载',
          type: 'warning'
        })
      }
    },
    close () {
      this.$emit('CloseshowContractTemplate', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-bar {
  padding: 12px 24px 12px 0;
  // height: 80px;
  .condition {
    // float: left;
    display: inline-block;
    margin-right: 16px;
    margin-bottom: 12px;
    &:last-child {
      margin-right: 0;
    }
    .search-name {
      font-size: $f16;
      color: $erp666;
      font-weight: 700;
      display: inline-block;
      margin-right: 7px;
    }
    /deep/ .el-select {
      width: 150px;

      .el-input__inner {
        border: 1px solid #e3e3e6;
        border-radius: 5px;
      }
    }
    /deep/ .el-input {
      display: inline-block;
      width: 150px;
      .el-input__inner {
        border: 1px solid #e3e3e6;
        border-radius: 5px;
      }
    }
    .period {
      width: 250px;
    }
  }
}
.dialog-pagina {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>