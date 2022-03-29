<!-- 原始凭证模板管理 -->
<template>
  <div class="ContractTemplate-Container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">模板名称</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入模板名称进行查询" size="small" v-model="searchform.Name">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">启用状态</div>
        <el-select v-model="searchform.Status" class="erpsearchinput" size="small" clearable placeholder="请选择启用状态">
          <el-option v-for="item in StatusList" :key="item.value" :label="item.describe" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" v-if="$operatebtn(operates, 'Add')" class="addmenu erpbtn" @click="AddContract('Add')">创建模板</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" fixed="left" label="全选" />
          <el-table-column align="center" prop="Id" label="模板编号" min-width="120">
            <template slot-scope="scope">
              <a v-if="$operatebtn(operates, 'View')" class="watchcode" @click="watchtalent(scope.row,'View')">{{scope.row.Id}}</a>
              <span v-else>{{scope.row.Id}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Name" label="模板名称" min-width="120" />
          <el-table-column align="center" prop="TempTypeText" label="模板类型" min-width="120" />
          <el-table-column align="center" prop="SysUser" label="创建人" min-width="120" />
          <el-table-column align="center" prop="Status" label="启用状态" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Status | Status2}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="AddTime" label="创建时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="UpdateTime" label="更新时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.UpdateTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Attachment" label="模板附件" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <a v-if="$operatebtn(operates, 'Down')" class="watchcode" @click="watchFile(scope.row)">{{scope.row.Attachment}}</a>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','Delete','Down','View','Enabled','Disabled']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="EditCredentials(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Down')" @click.native="Download(scope.row,'Down')">下载</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="AddRecommended(scope.row,'View')">操作日志</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == 2 && $operatebtn(operates, 'Enabled')" @click.native="EditCredentialsStatus(scope.row,'Enabled')">启用</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status == 1 && $operatebtn(operates, 'Disabled')" @click.native="EditCredentialsStatus(scope.row,'Disabled')">禁用</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="DelectProve(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button size="small" v-if="$operatebtn(operates, 'Down')" class="addmenu erpbtn" @click="MultipleDownload('Down')">下载</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div>
      <!-- 新建修改原始凭证模板 -->
      <EditCredentials :showEditCredentials="showEditCredentials" :title="EditCredentialsTitle" :dataCredentials="dataCredentials" @EditCredentialsSave="EditCredentialsSave" @CloseEditCredentials="CloseEditCredentials"></EditCredentials>
      <!-- 预览弹窗 -->
      <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
      <!-- 操作日志详情 -->
      <OperationLog :showOperationLog="showOperationLog" :Id="OperationLogId" :title="OperationLogTitle" :type="OperationLogType" @CloseOperationLog="CloseOperationLog"></OperationLog>
    </div>
  </div>
</template>
<script>
import EditCredentials from './components/EditCredentials'
import OperationLog from './components/OperationLog'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import { GetContractTemplateEnum, GetVoucherTemplatePageList, AddVoucherTemplate, DelVoucherTemplate1, EditVoucherTemplate, BatchDownLoadVoucherTemplate } from '@/api/FileTemplateManagement.js'
import { MenuIdDate, showLoading, hideLoading, copy } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    EditCredentials,
    OperationLog,
    PreviewFile
  },
  data () {
    return {
      searchform: {
        Name: '',
        Status: '-1'
      },
      ProveTypeList: [], // 模板类型
      ProjectBusinessTypeList: [],//业务类型
      StatusList: [{
        value: '-1',
        describe: "全部"
      }, {
        value: '1',
        describe: "启用"
      }, {
        value: '2',
        describe: "禁用"
      }],
      tableloading: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      Ids: [],//多选选中的数据ID
      allchecked: false, // 全选
      showEditCredentials: false,
      EditCredentialsTitle: '新建原始凭证模板',
      showOperationLog: false,
      OperationLogTitle: '操作日志详情',
      dataCredentials: {},//修改的数据
      OperationLogType: '3', // 1 合同模板   2 证明模板   3 原始模板
      OperationLogId: '',
      isImg: 1,
      previewFileUrl: '',
      titlename: '原始凭证模板预览',
      iframeShow: false,
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    this.GetContractTemplateEnum()
    if (this.$route.meta.operations) {
      console.log(this.$route.meta.operations);
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.GetContract(this.operatiOBj)
    }
  },
  methods: {
    // 多选
    handleSelectionChange (value) {
      this.Ids = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    // 全选
    selectall () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    // 查询
    searchtable () {
      this.currentPage = 1
      this.GetContract(this.operatiOBj)
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.GetContract(this.operatiOBj)
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.GetContract(this.operatiOBj)
    },
    //获取原始凭证模板列表
    GetContract (operat) {
      let obj = {
        Name: this.searchform.Name,
        TempType: this.searchform.TempType,
        Status: this.searchform.Status,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid,
        operationcode: operat.OperationCode
      }
      this.tableloading = true
      GetVoucherTemplatePageList(qs.stringify(obj)).then(response => {
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
    //获取模板枚举
    GetContractTemplateEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetContractTemplateEnum(qs.stringify(obj)).then(res => {
        if (res) {
          this.ProveTypeList = res.ProveType
          this.ProjectBusinessTypeList = res.ProjectBusinessType
          this.ProveTypeList.unshift({ value: '-1', describe: "全部" })
          this.ProjectBusinessTypeList.unshift({ value: '-1', describe: "全部" })
        }
      })
    },
    watchtalent (data, str) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      window.localStorage.setItem('TemplateDetails', JSON.stringify(data))
      const { href } = this.$router.resolve({
        path: '/FileTemplateManagement/TemplateDetails',
        query: {
          type: 3
        }
      })
      window.open(href, '_blank')
    },
    //新建原始凭证模板
    AddContract (str) {
      this.EditCredentialsTitle = '新建原始凭证模板'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.showEditCredentials = true
    },
    //保存新建或修改模板
    EditCredentialsSave (data) {
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      if (data.Id) {
        let param = {
          Id: data.Id,
          Name: data.Name,
          TempType: data.TempType,
          Status: data.Status,
          Attachment: data.Attachment,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode,
          Type: 1
        }
        showLoading()
        EditVoucherTemplate(qs.stringify(param)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改原始凭证模板成功!'
            })
            this.showEditCredentials = false
            this.GetContract(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        let param = {
          TemplateName: data.Name,
          TempType: data.TempType,
          Status: data.Status,
          Attachment: data.Attachment,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        AddVoucherTemplate(qs.stringify(param)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '新建原始凭证模板成功!'
            })
            this.showEditCredentials = false
            this.GetContract(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    //删除原始凭证模板
    DelectProve (data, str) {
      const operating = this.$operatedata(this.operates, str)
      const obj = {
        Id: data.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('此操作将删除该原始凭证模板', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DelVoucherTemplate1(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.GetContract(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //预览附件
    // 查看
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
    //修改原始凭证模板
    EditCredentials (data, str) {
      this.EditCredentialsTitle = '编辑原始凭证模板'
      this.dataCredentials = data
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.showEditCredentials = true
    },
    //关闭原始凭证模板弹窗
    CloseEditCredentials (str) {
      this.showEditCredentials = str
    },
    //关闭操作日志弹窗
    CloseOperationLog (str) {
      this.showOperationLog = str
    },
    //修改状态
    EditCredentialsStatus (data, str) {
      const operating = this.$operatedata(this.operates, str)
      let param = {
        Id: data.Id,
        Name: data.Name,
        TempType: data.TempTypeValue,
        Status: '',
        Attachment: data.Attachment,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
        Type: 2
      }
      let strPrompt = '', successPrompt = ''
      if (data.Status == '1') {
        param.Status = '2'
        strPrompt = '你确定禁用当前原始凭证模板吗?'
        successPrompt = '禁用当前原始凭证模板成功！'
      } else if (data.Status == '2') {
        param.Status = '1'
        strPrompt = '你确定启用当前原始凭证模板吗?'
        successPrompt = '启用当前原始凭证模板成功！'
      }
      this.$confirm(strPrompt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        EditVoucherTemplate(qs.stringify(param)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: successPrompt
            })
            this.GetContract(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    //单个下载
    Download (data, str) {
      if (data.Attachment) {
        window.open(data.Attachment)
        let param = {
          Id: data.Id,
          Name: data.Name,
          TempType: data.TempTypeValue,
          Status: data.Status,
          Attachment: data.Attachment,
          menuid: MenuIdDate(),
          operationcode: 1,
          Type: 3
        }
        EditVoucherTemplate(qs.stringify(param)).then(response => {
        })
      } else {
        this.$message({
          message: '暂无原始凭证模板文件下载',
          type: 'warning'
        })
      }

    },
    //批量下载
    MultipleDownload (str) {
      const operating = this.$operatedata(this.operates, str)
      if (this.Ids.length == 0) {
        this.$message({
          message: '请勾选你需要下载的模板',
          type: 'warning'
        })
        return
      }
      let param = {
        Ids: this.Ids.join(','),
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,

      }
      showLoading()
      BatchDownLoadVoucherTemplate(qs.stringify(param)).then(response => {
        hideLoading()
        if (response.IsSuccess && response.Data) {
          window.open(response.Data)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //查看操作日志
    AddRecommended (data, str) {
      this.OperationLogId = data.Id
      this.OperationLogType = 3
      this.showOperationLog = true
    }
  },
}
</script>
<style lang="scss" scoped>
.ContractTemplate-Container /deep/ {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
  .search-bar {
    padding: 24px 24px 12px 24px;
    // height: 80px;
    .condition {
      float: left;
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
      .el-input {
        display: inline-block;
        width: 216px;
      }
    }
  }
  .operate-top {
    float: right;
    .addmenu {
      margin-bottom: 16px;
    }
    .el-button + .el-button {
      margin-left: 16px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
  }
}
.erpdialog {
  .selectFile {
    position: relative;
    .titleText {
      margin-top: 16px;
    }
  }
  .input-Box {
    width: 400px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #f0f4fa;
    z-index: 0;
    position: relative;
    box-sizing: border-box;
    /deep/.el-input__inner {
      background-color: #f0f4fa;
      border: 0;
    }
    .flieBtn {
      position: absolute;
      right: 5px;
      top: 3px;
      z-index: 5;
      /deep/ .el-button--primary {
        border-color: #fff;
      }
    }
    .search-input {
      width: 80px;
      height: 28px;
      opacity: 0;
      z-index: 99;
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 3px;
    }
  }
  .select-input {
    width: 100%;
    height: auto;
    /deep/.el-input__inner {
      background-color: #f0f4fa;
    }
  }
  .file-box {
    padding: 0 120px;
    .title {
      font-size: $f14;
      color: $erp333;
      line-height: 28px;
    }
    .file {
      .img-box-list {
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
            transform: translate(-50%, -50%);
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
            line-height: 30px;
            cursor: pointer;
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
              cursor: pointer;
            }
          }
          .btn + .btn {
            margin-left: 24px;
          }
        }
      }
      .downimport {
        font-size: $f14;
        color: $erpcolor;
        cursor: pointer;
      }
    }
  }
  .error-box {
    .error-top {
      margin-bottom: 24px;
      .error-total {
        font-size: $f14;
        color: $erp333;
        > span {
          color: $erpred;
        }
      }
    }
    .error-content {
      // margin-bottom: 24px;
      .row {
        line-height: 20px;
        margin-bottom: 24px;
        min-height: 20px;
        display: flex;
        color: $erp999;
        .index {
          width: 48px;
        }
        .con {
          color: $erp999;
          flex: 1;
        }
      }
    }
  }
}
.operate-bottom {
  margin-top: 32px;
  padding-left: 16px;
  .allcheck {
    margin-right: 16px;
  }
}
</style>