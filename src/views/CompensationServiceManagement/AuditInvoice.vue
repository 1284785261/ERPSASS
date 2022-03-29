<!-- 开具发票管理 -->
<template>
  <div class="operate-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">发票抬头</div>
        <el-input class="erpsearchinput" placeholder="请输入发票抬头进行查询" size="small" clearable v-model="searchform.InvoiceTitle">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">所属项目</div>
        <el-input class="erpsearchinput" placeholder="请输入所属项目进行查询" size="small" clearable v-model="searchform.ProjectName">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">税号</div>
        <el-input class="erpsearchinput" placeholder="请输入税号进行查询" size="small" clearable v-model="searchform.TaxNo"></el-input>
      </div>
      <div class="condition">
        <div class="search-name">流水名称</div>
        <el-input class="erpsearchinput" placeholder="请输入流水名称进行查询" size="small" clearable v-model="searchform.MoneyRecordName"></el-input>
      </div>
      <div class="condition">
        <div class="search-name">开票申请</div>
        <el-input class="erpsearchinput" placeholder="请输入开票申请进行查询" size="small" clearable v-model="searchform.ApplyUserName"></el-input>
      </div>
      <div class="condition">
        <div class="search-name">开票人</div>
        <el-input class="erpsearchinput" placeholder="请输入开票人进行查询" size="small" clearable v-model="searchform.OperatorName">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" v-if="$operatebtn(operates, 'Invoice')" @click="issueinvoices('Invoice')">开具发票</el-button>
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" v-if="$getColumsFlag('Id',checkboxVal)" prop="Id" min-width="55" fixed label="编号" />
          <el-table-column align="center" v-if="$getColumsFlag('InvoiceTitle',checkboxVal)" prop="InvoiceTitle" label="发票抬头" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Amount',checkboxVal)" prop="Amount" label="发票金额(元)" min-width="150" />
          <!-- <el-table-column align="center" prop="" label="税率" /> -->
          <!-- <el-table-column align="center" prop="" label="发票性质" /> -->
          <el-table-column align="center" v-if="$getColumsFlag('ProjectName',checkboxVal)" prop="ProjectName" label="所属项目" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('TaxNo',checkboxVal)" prop="TaxNo" label="税号" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('MoneyRecordName',checkboxVal)" prop="MoneyRecordName" label="相关流水" min-width="250" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.MoneyRecordName && scope.row.Amount">{{scope.row.MoneyRecordName}}({{scope.row.MoneyRecordAmount}}元)</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('ReceipTypeText',checkboxVal)" prop="ReceipTypeText" label="收款方式" min-width="150" />
          <el-table-column align="center" v-if="$getColumsFlag('BfCompanyName',checkboxVal)" prop="BfCompanyName" label="开票公司" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('ApplyUserName',checkboxVal)" prop="ApplyUserName" label="发票申请人" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('OperatorName',checkboxVal)" prop="OperatorName" label="开票受理人" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('InvoiceDate',checkboxVal)" prop="InvoiceDate" label="开票日期" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.InvoiceDate | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" label="申请时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('StatusText',checkboxVal)" prop="StatusText" label="状态" min-width="120" />
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['View','SubmitAudit','Invoice']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="watchinvoice(scope.row, 'View')">查看</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ReceipType===0 && $operatebtn(operates, 'SignPayment')" @click.native="Markedreceived(scope.row, 'SignPayment')">标记为已收款</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status===0 && $operatebtn(operates, 'SubmitAudit')" @click.native="submitinvoice(scope.row, 'SubmitAudit')">提交审核</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status===2 && $operatebtn(operates, 'Invoice')" @click.native="begininvoices(scope.row, 'Invoice')">再次开具</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <!-- <dialoginvoice :title="invoicetitle" :visible="invoicevisible" :contentdata="invoicedata" @closedialog="closedialog" @savedialog="savedialog"></dialoginvoice> -->
      <dialogaudit :title="audittitle" :visible="auditvisible" :contentdata="auditdata" @closeauditdialog="closeauditdialog" @savecostaudit="savecostaudit"></dialogaudit>
      <el-dialog :close-on-click-modal="false" :title="Marketitle" append-to-body :visible.sync="MarkeVisible" width="480px" class="erpdialog dialog-box" :lock-scroll="false" @close="Markeclosedialog">
        <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
          <el-form-item label="选择开票流水" prop="MoneyRecordId" class="select">
            <el-select v-model="operateform.MoneyRecordId" clearable placeholder="选择开票流水" class="select-input">
              <el-option v-for="item in MoneyDrawlist" :key="item.MoneyRecordId" :label="item.BfCompanyName+'-'+item.Amount+'元'" :value="item.MoneyRecordId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结算单附件" class="file">
            <div class="upload">
              <div v-if="fileName" class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()" v-loading="uploadLoading">
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
                <img src="../../assets/upload.png">
                <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile" @change="uploadFile">
              </div>
              <div class="prompt">
                上传格式为PNG、JPG、Word、PDF、XLS格式文件，文件不能超过20M
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer-multiple">
          <el-button class="erpbtn" size="small" @click="Markeclosedialog">取消</el-button>
          <el-button class="erpbtn" size="small" @click="save">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { GetInvoiceApplyPageList, EditInvoiceApplyStatus, AddFinancialInvoice, EditInvoiceApplyMoneyRecordId, GetInvoiceApplyMoneyRecord, AddInvoiceApplyAddFlowing } from '@/api/FinancialManagement.js'
// import dialoginvoice from './components/dialog-invoice.vue'
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import SupperUploader from '@/utils/SupperUploader'
import dialogaudit from '@/views/FinancialManagement/components/dialog-audit.vue'
import { copy, uuid, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import filters from '@/utils/filters.js'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    // dialoginvoice,
    dialogaudit,
    ScreeningComponent
  },
  data () {
    return {
      searchform: {

      },
      tableloading: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      Id: '', // 发票管理
      ProjectId: '',
      Ids: [],
      choosedata: [],
      allchecked: false,
      invoicevisible: false,
      invoicetitle: '',
      invoicedata: {},
      checkboxVal: [],
      formTheadOptions: [
        { label: "编号", prop: "Id" },
        { label: "发票抬头", prop: "InvoiceTitle" },
        { label: "发票金额(元)", prop: "Amount" },
        { label: "所属项目", prop: "ProjectName" },
        { label: "税号", prop: "TaxNo" },
        { label: "相关流水", prop: "MoneyRecordName" },
        { label: "收款方式", prop: "ReceipTypeText" },
        { label: "开票公司", prop: "BfCompanyName" },
        { label: "发票申请人", prop: "ApplyUserName" },
        { label: "开票受理人", prop: "OperatorName" },
        { label: "开票日期", prop: "InvoiceDate" },
        { label: "申请时间", prop: "AddTime" },
        { label: "状态", prop: "StatusText" },
      ],
      // 提交审核弹框
      audittitle: '提交发票审核',
      auditvisible: false,
      auditdata: {},
      rules: {
        MoneyRecordId: [{ required: true, message: '请选择回款流水', trigger: 'change' }]
      },
      Marketitle: '标记为已收款',
      MarkeVisible: false,
      MoneyDrawlist: [],
      operateform: {
        MoneyRecordId: ''
      },
      optionShow: false,
      uploadLoading: false,
      fileName: '',
      filestype: '',
      ApplyAdd: {
        Attachment: ''
      },
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  watch: {
    // MarkeVisible (newvalue, oldvalue) {
    //   if (newvalue) {
    //     // 获取流水列表
    //     if (this.ProjectId) {
    //       let obj = {
    //         ProjectId: this.ProjectId,
    //         menuid: MenuIdDate(),
    //         operationcode: '1'
    //       }
    //       GetInvoiceApplyMoneyRecord(qs.stringify(obj)).then(response => {
    //         if (response.IsSuccess) {
    //           this.MoneyDrawlist = response.Data
    //         } else {
    //           this.$message({
    //             message: response.MessageContent,
    //             type: 'error'
    //           })
    //         }
    //       })
    //     }
    //   }
    // },
  },
  created () {
    // 获取页面权限
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getInvoiceApplyPageList(this.operatiOBj)
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  methods: {
    //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    // 获取开票信息列表
    getInvoiceApplyPageList (operat) {
      let obj = {
        InvoiceTitle: this.searchform.InvoiceTitle,
        ProjectName: this.searchform.ProjectName,
        TaxNo: this.searchform.TaxNo,
        MoneyRecordName: this.searchform.MoneyRecordName,
        ApplyUserName: this.searchform.ApplyUserName,
        OperatorName: this.searchform.OperatorName,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      this.tableloading = true
      GetInvoiceApplyPageList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.total = response.Total
            this.tableData = response.Data
          } else {
            this.total = 0
            this.tableData = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getInvoiceApplyPageList(this.operatiOBj)
    },
    // 查看发票
    watchinvoice (e, op) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))

      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))

      const { href } = this.$router.resolve({
        path: '/FinancialManagement/InvoiceDetail',
        query: {
          id: e.Id
        }
      })
      window.open(href, '_blank')
    },

    // 开具发票
    issueinvoices (op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/CompensationServiceManagement/dialogInvoice'
      })
    },
    // 再次开具
    begininvoices (e, op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/CompensationServiceManagement/dialogInvoice',
        query: {
          id: e.Id
        }
      })
    },

    // 提交审核
    submitinvoice (e, op) {
      // 操作码
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.auditdata = copy(e)
      this.Id = e.Id
      this.auditvisible = true
    },
    closeauditdialog () {
      this.auditvisible = false
    },
    savecostaudit (e) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      let obj = copy(e)
      obj.InvoiceApplyId = this.Id
      obj.menuid = operating.MenuId
      obj.operationcode = operating.OperationCode
      showLoading()
      AddFinancialInvoice(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: response.MessageContent,
            type: 'success'
          })
          this.auditvisible = false
          this.getInvoiceApplyPageList(this.operatiOBj)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },

    // 标记为已收款
    Markedreceived (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      if (e.Attachment) {
        this.ApplyAdd.Attachment = e.Attachment
        this.fileName = e.Attachment
        this.filestype = e.Attachment.slice(e.Attachment.lastIndexOf('.') + 1).toUpperCase()
      }
      // 标记为已付款
      this.Id = e.Id
      this.ProjectId = e.ProjectId
      let obj = {
        ProjectId: this.ProjectId,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetInvoiceApplyMoneyRecord(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data.length > 0) {
            this.MoneyDrawlist = response.Data
          } else {
            this.MoneyDrawlist = []
          }
          if (e.MoneyRecordId) {
            this.MoneyDrawlist.push({
              BfCompanyName: e.MoneyRecordName,
              MoneyRecordId: e.MoneyRecordId,
              Amount: e.MoneyRecordAmount,
              CompanyName: '',
              ProjectId: this.ProjectId
            })
            this.operateform.MoneyRecordId = e.MoneyRecordId
          }
          this.MarkeVisible = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    Markeclosedialog () {
      this.ApplyAdd.Attachment = ''
      this.fileName = ''
      this.filestype = ''
      this.$refs.operateform.resetFields()
      this.MarkeVisible = false
    },
    save () {
      this.$refs.operateform.validate((v) => {
        if (v) {
          const operating = JSON.parse(localStorage.getItem('operating'))
          let obj = {
            Id: this.Id,
            ProjectId: this.ProjectId,
            MoneyRecordId: this.operateform.MoneyRecordId,
            Attachment: this.ApplyAdd.Attachment,
            menuid: operating.MenuId,
            operationcode: operating.OperationCode
          }
          showLoading()
          AddInvoiceApplyAddFlowing(qs.stringify(obj)).then(response => {
            hideLoading()
            if (response.IsSuccess) {
              this.$message({
                message: '标记已收款成功',
                type: 'success'
              })
              this.MarkeVisible = false
              this.getInvoiceApplyPageList(this.operatiOBj)
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        }
      })
    },

    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getInvoiceApplyPageList(this.operatiOBj)
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getInvoiceApplyPageList(this.operatiOBj)
    },
    uploadFile (e) {
      var uploader
      const files = e.target.files[0]
      var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
      if (ext == 'doc' || ext == 'docx' || ext == 'pdf' || ext == 'xls' || ext == 'xlsx' || ext == 'png' || ext == 'jpg' || ext == 'jpeg') {
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
              this.ApplyAdd.Attachment = uploader.urlResult.VideoUrl
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
                this.ApplyAdd.Attachment = res.data.ImageUrl
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
      this.ApplyAdd.Attachment = ''
      this.fileName = ''
    },
    // 移入文件显示操作
    fileShow () {
      this.optionShow = true
    },
    // 移出文件隐藏操作
    filenoShow () {
      this.optionShow = false
    },
  },
}
</script>

<style lang="scss">
.operate-container {
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
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
    .addmenu {
      margin-bottom: 16px;
      // width: 96px;
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
.upload {
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
    margin-right: 24px;
    margin-bottom: 24px;
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
        .replaceFile {
          width: 80px;
          height: 30px;
        }
      }
    }
  }
}
</style>