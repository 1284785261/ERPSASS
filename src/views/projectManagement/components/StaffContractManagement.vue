<!-- 项目员工合同管理  -->
<template>
  <div class="project-contract-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">员工姓名</div>
        <el-input class="erpsearchinput" placeholder="请输入员工姓名进行查询" clearable size="small" v-model="searchform.StaffName" />
      </div>
      <div class="condition">
        <div class="search-name">入职公司</div>
        <el-input class="erpsearchinput" placeholder="请输入入职公司进行查询" clearable size="small" v-model="searchform.BfCompanyName" />
      </div>
      <div class="condition">
        <div class="search-name">合同类型</div>
        <el-select v-model="searchform.Type" clearable placeholder="请选择在职状态" size="small" class="erpselect">
          <el-option v-for="item in BusinessList" :key="item.value" :label="item.describe" :value="item.value" />
        </el-select>
      </div>
      <div class="condition">
        <div class="search-name">在职状态</div>
        <el-select v-model="searchform.JobStatus" clearable placeholder="请选择在职状态" size="small" class="erpselect">
          <el-option v-for="item in statusList" :key="item.label" :label="item.label" :value="item.id" />
        </el-select>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="tab2 clearfix">
        <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
      </div>
      <div class="operate-top">
        <el-button class="operation-button" size="small" type="primary" @click="DownloadContractTemplate">下载合同模板</el-button>
        <el-button class="operation-button" size="small" type="primary" @click="importcontract">合同导入</el-button>
        <el-button class="operation-button" size="small" type="primary" @click="UploadFile">上传合同</el-button>
        <el-button class="operation-button" size="small" type="primary" @click="ExportFile">导出合同</el-button>
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" fixed="left" type="selection" width="60" />
          <el-table-column align="center" v-if="$getColumsFlag('Code',checkboxVal)" prop="Code" label="合同编号" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <a class="watchcode" @click="watchtalent(scope.row)">{{scope.row.Code}}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('StaffName',checkboxVal)" prop="StaffName" label="员工姓名" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('TypeText',checkboxVal)" prop="TypeText" label="合同类型" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('BfCompanyName',checkboxVal)" prop="BfCompanyName" label="入职公司" show-overflow-tooltip min-width="150" />
          <el-table-column align="center" v-if="$getColumsFlag('Salary',checkboxVal)" prop="Salary" label="合同工资" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('TryExpireText',checkboxVal)" prop="TryExpireText" label="试用期限" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('SignDate',checkboxVal)" prop="SignDate" label="签订时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.SignDate | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('SignType',checkboxVal)" prop="SignType" label="合同签订模式" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.SignType | SignType}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" label="合同上传时间" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('ApproveStatusText',checkboxVal)" prop="ApproveStatusText" label="合同状态" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Status',checkboxVal)" prop="Status" label="存档状态" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.Status | archiveType}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('UserName',checkboxVal)" prop="UserName" label="创建人" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Attachment',checkboxVal)" prop="Attachment" label="合同附件" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <a v-if="scope.row.Attachment" class="watchcode" @click="watchFile(scope.row)">{{scope.row.Attachment}}</a>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="(scope.row.ApproveStatus == 0 || scope.row.ApproveStatus == 5 || scope.row.ApproveStatus == 6)" @click.native="handleEdit(scope.row)">修改</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus != 4" @click.native="SingleDown(scope.row)">下载</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 0" @click.native="ModifyState(scope.row,'1')">提交初审</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 2" @click.native="ModifyState(scope.row,'3')">提交终审</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 5" @click.native="ModifyState(scope.row,'2')">重新提交初审</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 6" @click.native="ModifyState(scope.row,'3')">重新提交终审</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 1" @click.native="ModifyState2(scope.row,'0')">撤回</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 3" @click.native="ModifyState2(scope.row,'2')">撤回</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 4 && scope.row.SignType == 1" @click.native="OfflineSigning(scope.row,'7')">线下签约</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 4 && scope.row.SignType == 0" @click.native="OfflineSignup(scope.row,'7')">在线签署</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 9 && scope.row.SignType == 0" @click.native="OfflineSignup(scope.row,'7')">再次提交</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 7" @click.native="SigningSteps(scope.row)">签署进度</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 8 && scope.row.AdditionalStatus == 2" @click.native="ToRenewContent(scope.row)">续签合同</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 8 && scope.row.AdditionalStatus != 2 && scope.row.Status == 0" @click.native="ToArchiveContent(scope.row)">转交存档</el-dropdown-item>
                    <el-dropdown-item @click.native="AddRecommended(scope.row)">操作日志</el-dropdown-item>
                    <el-dropdown-item v-if="(scope.row.ApproveStatus == 8 || scope.row.ApproveStatus ==9 || scope.row.ApproveStatus ==11 || scope.row.ApproveStatus ==12)" @click.native="OpenTermination(scope.row,'8')">终止合同</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.ApproveStatus == 10" @click.native="LookAgreement(scope.row)">查看终止协议</el-dropdown-item>
                    <el-dropdown-item v-if="(scope.row.ApproveStatus == 0 || scope.row.ApproveStatus == 2 || scope.row.ApproveStatus == 4 || scope.row.ApproveStatus == 5 || scope.row.ApproveStatus == 6 || scope.row.ApproveStatus == 9)" @click.native="roledetele(scope.row)">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot-operation">
        <el-checkbox class="footcheck erpcheck" v-model="allchecked" @change="batchSelectAll">全选</el-checkbox>
        <el-button round class="operation-button" size="mini" @click="AllDown">下载</el-button>
        <el-button round class="operation-button" v-if="tabidx == 8" size="mini" @click="AllToArchiveContent">转交存档</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div>
      <!-- 下载模板弹窗 -->
      <ContractTemplatedig :showContractTemplateLog="showContractTemplateLog" :title="ContractTemplateTitle" @CloseshowContractTemplate="CloseshowContractTemplate"></ContractTemplatedig>
      <!-- 预览弹窗 -->
      <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
      <!-- 导入合同 -->
      <ImportContract :showImportContract="showImportContract" @ImportContractSave="ImportContractSave" @closeImportContract="closeImportContract"></ImportContract>
      <!-- 添加员工合同信息 -->
      <AddEmployeescontract :showAddContract="showAddContract" :tempData="tempData" :title="ContractTitle" @closeProjectContract="closeProjectContract" @ProjectContractSave="ProjectContractSave"></AddEmployeescontract>
      <!-- 线下签约 -->
      <EmployeesOfflineSigning :showEmployeesOffline="showEmployeesOffline" :tempData="tempData" @closeEmployeesOffline="closeEmployeesOffline" @EmployeesOfflineSave="EmployeesOfflineSave"></EmployeesOfflineSigning>
      <!-- 在线签署 -->
      <EmployeesOfflineSignup :showEmployeesOfflineUp="showEmployeesOfflineUp" :tempData="tempData" @closeEmployeesOfflineUp="closeEmployeesOfflineUp" @EmployeesOfflineSaveUp="EmployeesOfflineSaveUp"></EmployeesOfflineSignup>
      <!-- 操作日志 -->
      <OperationLog :showOperationLog="showOperationLog" :Id="OperationLogId" :type="Logtype" :title="OperationLogTitle" @CloseOperationLog="CloseOperationLog"></OperationLog>
      <!-- 上传终止协议 -->
      <TerminationContract :showTerminationContract="showTerminationContract" @closeTerminationContract="closeTerminationContract" @TerminationContractSave="TerminationContractSave"></TerminationContract>
      <!-- 查看终止协议 -->
      <el-dialog :close-on-click-modal="false" title="终止协议附件" class="dialog-box" append-to-body :visible.sync="showLookAgreement" :show-close="false" :destroy-on-close="true" width="480px" @close="closeLook">
        <i class="el-icon-circle-close closeButton" @click="closeLook"></i>
        <el-form ref="ruleForm" class="forms-box">
          <el-form-item label="终止协议文件" class="attachment">
            <div class="upload">
              <div :title="TerminationObj.fileName" class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()">
                <span class="filestype">{{TerminationObj.filesType}}</span>
                <p>{{TerminationObj.fileName}}</p>
                <div v-show="optionLookShow" class="option-button">
                  <a @click="preview()">
                    <svg-icon icon-class="replace" class-name="svg-a" />预览
                  </a>
                  <a @click="downloadFile()">
                    <svg-icon icon-class="download" class-name="svg-a" />下载
                  </a>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer-multiple">
          <el-button round size="small" @click="closeLook">关闭</el-button>
        </div>
      </el-dialog>
      <!-- 续签合同 -->
      <!-- <RenewContract :showRenewContract="showRenewContract" :title="RenewTitle" @ContractSave="ContractSave" @closeRenewContract="closeRenewContract"></RenewContract> -->
      <!-- 导入合同成功显示详情 -->
      <ImportTitle :TitleShow="TitleShow" :errorData="errorData" :title="ImportTitle" @closeTitle="closeTitle"></ImportTitle>
    </div>
  </div>
</template>

<script>
import { GetStaffContractType, GetStaffContractApprovalStatus, BatchDownLoadStaffContractTemplate, ExportStaffContract, OfflineSigningStaffContract, TerminationStaffContract, EditStaffContractApproveStatus } from '@/api/Public.js'
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import { GetStaffContractList, DeleteStaffContract, AddStaffContract, EditStaffContract, ImportStaffContract } from '@/api/OutsourcedEmployeeManagement.js'
import ImportContract from '@/components/OutsourcedEmployeeManagement/ImportContract'
import ImportTitle from '@/components/publicComponents/ImportTitle'
import ContractTemplatedig from '../../ContractManagement/components/ContractTemplatedig.vue'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import AddEmployeescontract from '../../ContractManagement/components/AddEmployeescontract.vue'
import EmployeesOfflineSigning from '../../ContractManagement/components/EmployeesOfflineSigning.vue'
import EmployeesOfflineSignup from '../../ContractManagement/components/EmployeesOfflineSignup.vue'
import OperationLog from '../../ContractManagement/components/OperationLog.vue'
import TerminationContract from '../../ContractManagement/components/TerminationContract.vue'
import filters from '@/utils/filters'
import { MenuIdDate, showLoading, hideLoading, copy, uuid, datemonth } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    ImportContract,
    ImportTitle,
    // RenewContract,
    ScreeningComponent,
    ContractTemplatedig,
    PreviewFile,
    AddEmployeescontract,
    EmployeesOfflineSigning,
    EmployeesOfflineSignup,
    OperationLog,
    TerminationContract
  },
  data () {
    return {
      searchform: {
        BfCompanyName: '',
        StaffName: '',
        JobStatus: -1,
        Type: '-1'
      },
      statusList: [{
        id: -1,
        label: '全部'
      }, {
        id: 1,
        label: '在职'
      },
      {
        id: 2,
        label: '离职'
      }],
      BusinessList: [],
      checkboxVal: [],
      Logtype: 0,
      tabidx: -1,
      tablist: [],
      formTheadOptions: [
        { label: "合同编号", prop: "Code" },
        { label: "员工姓名", prop: "StaffName" },
        { label: "合同类型", prop: "TypeText" },
        { label: "入职公司", prop: "BfCompanyName" },
        { label: "合同工资", prop: "Salary" },
        { label: "试用期限", prop: "TryExpireText" },
        { label: "签订时间", prop: "SignDate" },
        { label: "合同签订模式", prop: "SignType" },
        { label: "合同上传时间", prop: "AddTime" },
        { label: "合同状态", prop: "ApproveStatusText" },
        { label: "存档状态", prop: "Status" },
        { label: "创建人", prop: "UserName" },
        { label: "合同附件", prop: "Attachment" },
      ],
      tableloading: false,
      tableData: [],
      allchecked: false,
      showContractTemplateLog: false,
      ContractTemplateTitle: '下载员工合同模板',
      isImg: 1,
      previewFileUrl: '',
      titlename: '合同附件预览',
      iframeShow: false,
      showAddContract: false,
      ContractTitle: '添加员工合同信息',
      showOperationLog: false,//是否显示操作日志
      showEmployeesOffline: false,//是否显示线下签约
      showEmployeesOfflineUp: false,//是否显示在线签署
      showLooksteps: false,//查看签署进度
      OperationLogId: '',
      OperationLogTitle: '操作日志详情',
      TerminationId: '',//终止ID
      showTerminationContract: false,
      optionLookShow: false,
      showLookAgreement: false,//查看终止协议
      TerminationAttachment: '',//终止协议地址
      TerminationObj: {
        fileName: '',
        filesType: ''
      },
      tempData: {},
      PageSize: 10,
      currentPage: 1,
      total: 0,
      Ids: [],//选中数组ID
      selectArr: [],//选中数组
      Id: '',
      ProjectId: '',
      RenewTitle: '续签合同',
      showImportContract: false,
      ContractId: '',
      ImportTitle: '合同导入信息',
      TitleShow: false,
      errorData: {}//合同导入信息
    }
  },
  created () {
    this.$nextTick(() => {
      this.ProjectId = this.$route.query.Id
      this.getPageList()
      this.getCatagoryType()
      for (let i = 0; i < this.formTheadOptions.length; i++) {
        this.checkboxVal.push(this.formTheadOptions[i].prop)
      }
    })
  },
  methods: {
    //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    // 切换tab栏
    choosetab (e) {
      console.log(e)
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.value
        this.getPageList()
      }
    },
    //获取合同类型
    getCatagoryType () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffContractType(qs.stringify(obj)).then(response => {
        if (response) {
          this.BusinessList = response
          this.BusinessList.unshift({
            describe: '全部',
            value: '-1'
          })
        }
      })
      GetStaffContractApprovalStatus(qs.stringify(obj)).then(response => {
        if (response) {
          this.tablist = response
          this.tablist.splice(this.tablist.length - 1, 1)
          this.tablist.unshift({
            describe: '全部',
            value: '-1'
          })
        }
      })
    },
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getPageList()
    },
    // 获取项目合同
    getPageList () {
      this.tableloading = true
      let obj = {
        ProjectId: this.ProjectId,
        CompanyName: '',
        ProjectName: '',
        BfCompanyName: this.searchform.BfCompanyName,
        StaffName: this.searchform.StaffName,
        JobStatus: this.searchform.JobStatus,
        Type: this.searchform.Type,
        ApprovalStatus: this.tabidx,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetStaffContractList(qs.stringify(obj)).then(response => {
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
    // 添加合同
    addcontract () {
      this.$router.push({
        path: '/OutsourcedEmployeeManagement/AddContract',
        query: {
          ProjectId: this.ProjectId
        }
      })
    },
    //上传合同
    UploadFile () {
      this.ContractTitle = '添加员工合同信息'
      this.showAddContract = true
    },
    //修改合同
    handleEdit (data) {
      this.tempData = data
      this.ContractTitle = '修改员工合同信息'
      this.showAddContract = true
    },
    //保存添加修改员工合同
    ProjectContractSave (data) {
      console.log(data)
      let obj = data
      obj.menuid = MenuIdDate(),
        obj.operationcode = '1'
      if (data.Id) {
        showLoading()
        EditStaffContract(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改员工合同成功!'
            })
            this.showAddContract = false
            this.getPageList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        let message = ''
        if (this.ContractTitle == '添加员工合同信息') {
          message = '添加员工合同成功'
        } else {
          message = '续签员工合同成功'
        }
        showLoading()
        AddStaffContract(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: message
            })
            this.showAddContract = false
            this.getPageList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    //关闭上传员工合同
    closeProjectContract (val) {
      this.showAddContract = val
    },
    //线下签约
    OfflineSigning (data, status) {
      this.tempData = data
      this.showEmployeesOffline = true
    },
    //保存线下签约
    EmployeesOfflineSave (data) {
      console.log(data)
      let obj = {
        Id: data.Id,
        OfflineSigning: data.Attachment,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      showLoading()
      OfflineSigningStaffContract(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.showEmployeesOffline = false
          this.$message({
            type: 'success',
            message: '线下签约合同上传成功！'
          })
          this.getPageList()
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //关闭线下签约
    closeEmployeesOffline (str) {
      this.showEmployeesOffline = str
    },
    //状态变更
    ModifyState (data, status) {
      let param = {
        Id: data.Id,
        ApproveStatus: status,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      this.$confirm('你确定进行当前状态变更操作吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        EditStaffContractApproveStatus(qs.stringify(param)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '变更状态成功!'
            })
            this.getPageList()
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
    //撤回
    ModifyState2 (data, status) {
      let param = {
        Id: data.Id,
        ApproveStatus: status,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      this.$confirm('你确定要撤回当前审批吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        EditStaffContractApproveStatus(qs.stringify(param)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '合同审批已撤回!'
            })
            this.getPageList()
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
    //查看操作日志
    AddRecommended (data) {
      this.OperationLogId = data.Id
      this.Logtype = 2
      this.showOperationLog = true
    },
    //关闭操作日志弹窗
    CloseOperationLog (str) {
      this.showOperationLog = str
    },
    //打开在线签署
    OfflineSignup (data, status) {
      this.tempData = data
      this.showEmployeesOfflineUp = true
    },
    //在线签署事件
    EmployeesOfflineSaveUp (data) {
      console.log(data)
    },
    //关闭在线签署
    closeEmployeesOfflineUp (str) {
      this.showEmployeesOfflineUp = str
    },
    //打开上传终止合同
    OpenTermination (data, status) {
      this.TerminationId = data.Id
      this.showTerminationContract = true
    },
    //上传终止文件事件
    TerminationContractSave (data) {
      console.log(data)
      let param = {
        Id: this.TerminationId,
        TerminationAttachment: data.Attachment,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      showLoading()
      TerminationStaffContract(qs.stringify(param)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.showTerminationContract = false
          this.$message({
            type: 'success',
            message: '终止合同成功！'
          })
          this.getPageList()
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //关闭上传终止合同文件
    closeTerminationContract (str) {
      this.showTerminationContract = str
    },
    //查看终止合同协议
    LookAgreement (data) {
      this.TerminationAttachment = data.TerminationAttachment
      this.TerminationObj.fileName = this.TerminationAttachment
      this.TerminationObj.filesType = this.TerminationAttachment.slice(this.TerminationAttachment.lastIndexOf('.') + 1).toUpperCase()
      this.showLookAgreement = true
    },
    //关闭查看终止协议
    closeLook () {
      this.showLookAgreement = false
    },
    // 移入文件显示操作
    fileShow () {
      this.optionLookShow = true
    },
    // 移出文件隐藏操作
    filenoShow () {
      this.optionLookShow = false
    },
    // 预览终止协议
    preview () {
      if (this.TerminationAttachment) {
        const ext = this.TerminationAttachment.slice(this.TerminationAttachment.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = this.TerminationAttachment
        } else if (ext == 'doc' || ext == 'docx') {
          this.isImg = 3
          this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + this.TerminationAttachment
        } else {
          this.isImg = 1
          this.previewFileUrl = this.TerminationAttachment
        }
        this.iframeShow = true
      }
    },
    //下载终止协议
    downloadFile () {
      if (this.TerminationAttachment) {
        window.open(this.TerminationAttachment)
      }
    },
    //单个下载
    SingleDown (data) {
      if (data.Attachment) {
        window.open(data.Attachment)
      } else {
        this.$message({
          message: '暂无员工合同文件下载',
          type: 'warning'
        })
      }
    },
    //下载合同模板
    DownloadContractTemplate () {
      this.showContractTemplateLog = true
    },
    //关闭下载合同模板
    CloseshowContractTemplate (str) {
      this.showContractTemplateLog = str
    },
    //导出合同
    ExportFile () {
      if (this.Ids.length == 0) {
        this.$message({
          message: '请勾选你需要导出的员工合同',
          type: 'warning'
        })
        return
      }
      let param = {
        Ids: this.Ids.join(','),
        menuid: MenuIdDate(),
        operationcode: 1
      }
      showLoading()
      ExportStaffContract(qs.stringify(param)).then(response => {
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
    closeFileShow (val) {
      this.iframeShow = val
    },
    //批量下载
    AllDown () {
      if (this.Ids.length == 0) {
        this.$message({
          message: '请勾选你需要下载的员工合同',
          type: 'warning'
        })
        return
      }
      let param = {
        Ids: this.Ids.join(','),
        menuid: MenuIdDate(),
        operationcode: 1
      }
      showLoading()
      BatchDownLoadStaffContractTemplate(qs.stringify(param)).then(response => {
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
    //关闭合同导入详情
    closeTitle (val) {
      this.TitleShow = val
    },
    //删除合同
    roledetele (value, str) {
      const obj = {
        Id: value.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      if (value.Status == 0) {
        this.$confirm('确认删除当前员工合同吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          showLoading()
          DeleteStaffContract(qs.stringify(obj)).then(response => {
            hideLoading()
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getPageList()
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
      } else {
        this.$message({
          type: 'info',
          message: '当前合同已存档，无法删除！'
        })
      }
    },
    // 导入合同
    importcontract () {
      this.showImportContract = true
    },
    //导入合同事件是否成功信息
    ImportContractSave (data) {
      data.menuid = MenuIdDate()
      data.operationcode = '1'
      ImportStaffContract(data).then(response => {
        if (response.IsSuccess) {
          this.errorData = response
          this.TitleShow = true
          this.showImportContract = false
          this.getPageList()
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //关闭导入合同
    closeImportContract (val) {
      this.showImportContract = val
    },
    //查看合同详情
    watchtalent (data) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      const { href } = this.$router.resolve({
        path: '/ContractManagement/EmployeesContractDetails',
        query: {
          Id: data.Id,
          Type: 1
        }
      })
      window.open(href, '_blank')
    },
    // 多选
    handleSelectionChange (value) {
      this.Ids = []
      this.selectArr = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
        this.selectArr.push(value[i])
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    // 全选
    batchSelectAll () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getPageList()
    },
  },
}
</script>

<style lang="scss" scoped>
.project-contract-container /deep/ {
  .search-bar {
    padding: 24px 24px 12px 0;
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
        .el-input__inner {
          border-color: transparent !important;
          background-color: $erpbgcolor;
        }
      }
    }
  }
  .tab2 {
    padding-left: 0;
    margin-left: 0;
  }
  .operate-top {
    margin-top: 20px;
    float: right;
    .addmenu {
      margin-bottom: 16px;
      width: 96px;
    }
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
  }
  .foot-operation {
    margin-top: 20px;
  }
}
</style>
