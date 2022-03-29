<!-- 项目合同管理 -->
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="客户名称" label-width="80px">
            <el-input v-model="searchObject.CompanyName" clearable class="select-input" placeholder="请输入客户名称" />
          </el-form-item>
          <el-form-item label="项目名称" label-width="80px">
            <el-input v-model="searchObject.ProjectName" clearable class="select-input" placeholder="请输入项目名称" />
          </el-form-item>
          <el-form-item label="业务类型" label-width="80px">
            <el-select v-model="searchObject.BusinessType" class="select-input" size="small" placeholder="请选择业务类型">
              <el-option v-for="item in BusinessList" :key="item.value" :label="item.describe" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="签订时间" label-width="80px">
            <el-date-picker v-model="searchObject.periodOf" class="period" size="small" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始时间" end-placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="创建人" label-width="80px">
            <el-input v-model="searchObject.SysUserName" clearable class="select-input" placeholder="请输入创建人" />
          </el-form-item>
          <el-form-item label="存档状态" label-width="80px">
            <el-select v-model="searchObject.Status" placeholder="请选择" size="mini" class="select-input">
              <el-option v-for="item in statusList" :key="item.label" :label="item.label" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="resetSearch">
            重置
          </el-button>
          <el-button class="search-button" size="mini" round @click="search">
            查询
          </el-button>
        </el-form>
      </div>
    </div>
    <div class="tab2 clearfix">
      <div class="tab-name" :class="{ active: tabidx == item.value }" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">
        {{ item.describe }}
      </div>
    </div>
    <div class="table-content">
      <div class="tableHeader-operation">
        <el-button class="operation-button" size="small" v-if="$operatebtn(operates, 'Down')" type="primary" @click="DownloadContractTemplate('Down')">下载合同模板</el-button>
        <el-button class="operation-button" size="small" v-if="$operatebtn(operates, 'Import')" type="primary" @click="UploadFile('Import')">上传合同</el-button>
        <el-button class="operation-button" size="small" v-if="$operatebtn(operates, 'Export')" type="primary" @click="ExportFile('Export')">导出合同</el-button>
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <el-table ref="industrtTable" v-loading="tableloading" :data="tableData" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed="left" type="selection" width="60" />
        <el-table-column align="center" v-if="$getColumsFlag('Code', checkboxVal)" prop="Code" label="合同编号" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <a v-if="$operatebtn(operates, 'View')" class="watchcode" @click="watchtalent(scope.row, 'View')">{{ scope.row.Code }}</a>
            <span v-else>{{ scope.row.Code }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" v-if="$getColumsFlag('Name', checkboxVal)" prop="Name" label="合同名称" min-width="150" show-overflow-tooltip />
        <el-table-column align="center" v-if="$getColumsFlag('BusinessTypeText', checkboxVal)" prop="BusinessTypeText" label="业务类型" min-width="120" />
        <el-table-column align="center" v-if="$getColumsFlag('CompanyName', checkboxVal)" prop="CompanyName" label="相关客户" show-overflow-tooltip min-width="150" />
        <el-table-column align="center" v-if="$getColumsFlag('ProjectName', checkboxVal)" prop="ProjectName" label="所属项目" show-overflow-tooltip min-width="150" />
        <el-table-column align="center" v-if="$getColumsFlag('Amount', checkboxVal)" prop="Amount" label="合同金额（元）" min-width="150" />
        <el-table-column align="center" v-if="$getColumsFlag('StartDate', checkboxVal)" prop="StartDate" label="起始日期" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.StartDate | Time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" v-if="$getColumsFlag('ExpireDate', checkboxVal)" prop="ExpireDate" label="终止日期" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.ExpireDate | Time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" v-if="$getColumsFlag('ContractPeriod', checkboxVal)" prop="ContractPeriod" label="合同期限" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.ContractPeriod }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" v-if="$getColumsFlag('SignDate', checkboxVal)" prop="SignDate" label="签订时间" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.SignDate | Time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" v-if="$getColumsFlag('SignType', checkboxVal)" prop="SignType" label="合同签订模式" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.SignType | SignType }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" v-if="$getColumsFlag('AddTime', checkboxVal)" prop="AddTime" label="合同上传时间" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.AddTime | YYMMddhhmmssTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" v-if="$getColumsFlag('ApproveStatusText', checkboxVal)" prop="ApproveStatusText" label="合同状态" min-width="120" />
        <el-table-column align="center" v-if="$getColumsFlag('SysUserName', checkboxVal)" prop="SysUserName" label="创建人" min-width="120" />
        <el-table-column align="center" v-if="$getColumsFlag('Status', checkboxVal)" prop="Status" label="存档状态" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.Status | archiveType }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" v-if="$getColumsFlag('Attachment', checkboxVal)" prop="Attachment" label="合同附件" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <a v-if="$operatebtn(operates, 'Down')" class="watchcode" @click="watchFile(scope.row)">{{ scope.row.Attachment }}</a>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click" v-if="
                $operatebtns(operates, [
                  'View',
                  'Modify',
                  'Disabled',
                  'Enabled',
                  'Delete'
                ])
              ">
              <span class="el-dropdown-link">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item v-if="$operatebtn(operates, 'Down')" @click.native="SingleDown(scope.row, 'Down')">下载</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 0
                    " @click.native="handleEditInformation(scope.row, 'Modify')">修改</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 3
                    " @click.native="SubmitAssessmentEdit(scope.row, 'Modify')">重新提交风险评估</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        (scope.row.ApproveStatus == 3 ||
                          scope.row.ApproveStatus == 6 ||
                          scope.row.ApproveStatus == 9)
                    " @click.native="LookAssessmentList(scope.row, 'Modify')">查看审批记录</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 0 &&
                        scope.row.IsNewTemplate == '0'
                    " @click.native="SubmitAssessmentEdit(scope.row, 'Modify')">提交风险评估</el-dropdown-item>

                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 0 &&
                        scope.row.IsNewTemplate == '1'
                    " @click.native="ModifyStateTrial(scope.row, '4', 'Modify')">提交初审</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 2
                    " @click.native="ModifyStateTrial(scope.row, '4', 'Modify')">提交初审</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 6
                    " @click.native="ModifyStateTrial(scope.row, 'Modify')">修改</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 6
                    " @click.native="ModifyStateTrial(scope.row, '4', 'Modify')">重新提交初审</el-dropdown-item>

                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 5
                    " @click.native="ModifyStateFinal(scope.row, '7', 'Modify')">提交终审</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 9
                    " @click.native="ModifyStateFinal(scope.row, 'Modify')">修改</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 9
                    " @click.native="ModifyStateFinal(scope.row, '7', 'Modify')">重新提交终审</el-dropdown-item>

                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 1
                    " @click.native="ModifyState2(scope.row, '1', 'Modify')">撤销</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 4
                    " @click.native="ModifyState2(scope.row, '4', 'Modify')">撤销</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 7
                    " @click.native="ModifyState2(scope.row, '7', 'Modify')">撤销</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 8
                    " @click.native="OfflineSigning(scope.row, '10', 'Modify')">线下签约</el-dropdown-item>

                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 10 &&
                        scope.row.AdditionalStatus == 2
                    " @click.native="ToRenewContent(scope.row, 'Modify')">续签合同</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 10 &&
                        scope.row.AdditionalStatus != 2 &&
                        scope.row.Status == 0
                    " @click.native="ToArchiveContent(scope.row, 'Modify')">转交存档</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="AddRecommended(scope.row, 'View')">操作日志</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 10 &&
                        scope.row.AdditionalStatus != 0
                    " @click.native="OpenTermination(scope.row, '8', 'Modify')">终止合同</el-dropdown-item>

                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Modify') &&
                        scope.row.ApproveStatus == 11
                    " @click.native="LookAgreement(scope.row, 'Modify')">查看终止协议</el-dropdown-item>
                  <el-dropdown-item v-if="
                      $operatebtn(operates, 'Delete') &&
                        (scope.row.ApproveStatus == 0 ||
                          scope.row.ApproveStatus == 2 ||
                          scope.row.ApproveStatus == 3 ||
                          scope.row.ApproveStatus == 5 ||
                          scope.row.ApproveStatus == 6 ||
                          scope.row.ApproveStatus == 8 ||
                          scope.row.ApproveStatus == 9)
                    " @click.native="roledetele(scope.row, 'Delete')">删除</el-dropdown-item>
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="foot-operation" v-if="$operatebtns(operates, ['Down', 'Modify'])">
        <el-checkbox class="footcheck erpcheck" v-model="allchecked" @change="batchSelectAll">全选</el-checkbox>
        <el-button round class="operation-button" v-if="$operatebtn(operates, 'Down')" size="mini" @click="AllDown('Down')">下载</el-button>
        <el-button round class="operation-button" v-if="
            $operatebtn(operates, 'Modify') && (tabidx == 7 || tabidx == 20)
          " size="mini" @click="AllToArchiveContent('Modify')">转交存档</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
    <div>
      <!-- 下载模板弹窗 -->
      <ContractTemplatedig :showContractTemplateLog="showContractTemplateLog" :title="ContractTemplateTitle" @CloseshowContractTemplate="CloseshowContractTemplate"></ContractTemplatedig>
      <!-- 预览弹窗 -->
      <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
      <!-- 续签项目合同 -->
      <AddProjectcontract :showAddContract="showAddContract" :tempData="tempData" :title="ContractTitle" @closeProjectContract="closeProjectContract" @ProjectContractSave="ProjectContractSave">
      </AddProjectcontract>
      <!-- 提交风险评估 -->
      <SubmitAssessment :showSubmitAssessment="showSubmitAssessment" :Id="ProjectContractId" @closeSubmitAssessment="closeSubmitAssessment" @SubmitAssessmentSave="SubmitAssessmentSave">
      </SubmitAssessment>
      <!-- 操作日志 -->
      <OperationLog :showOperationLog="showOperationLog" :Id="OperationLogId" :type="Logtype" :title="OperationLogTitle" @CloseOperationLog="CloseOperationLog"></OperationLog>
      <!-- 线下合同签约 -->
      <ProjectOfflineSigning :showEmployeesOffline="showEmployeesOffline" :tempData="tempData" @closeEmployeesOffline="closeEmployeesOffline" @EmployeesOfflineSave="EmployeesOfflineSave">
      </ProjectOfflineSigning>
      <!-- 上传终止协议 -->
      <TerminationContract :showTerminationContract="showTerminationContract" @closeTerminationContract="closeTerminationContract" @TerminationContractSave="TerminationContractSave">
      </TerminationContract>
      <!-- 提交终审 -->
      <SubmitFinal :showSubmitFinal="showSubmitFinal" :tempData="tempData" @closeSubmitFinal="closeSubmitFinal" @SubmitFinalSave="SubmitFinalSave"></SubmitFinal>
      <!-- 查看终止协议 -->
      <el-dialog :close-on-click-modal="false" title="终止协议附件" class="dialog-box" append-to-body :visible.sync="showLookAgreement" :show-close="false" :destroy-on-close="true" width="480px"
        @close="closeLook">
        <i class="el-icon-circle-close closeButton" @click="closeLook"></i>
        <el-form ref="ruleForm" class="forms-box">
          <el-form-item label="终止协议文件" class="attachment">
            <div class="upload">
              <div :title="TerminationObj.fileName" class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()">
                <span class="filestype">{{ TerminationObj.filesType }}</span>
                <p>{{ TerminationObj.fileName }}</p>
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
      <!-- 查看审批记录 -->
      <el-dialog :close-on-click-modal="false" title="审批记录" class="dialog-box" append-to-body :visible.sync="showAssessmentList" :show-close="false" :destroy-on-close="true" width="300px"
        @close="closeAssessment">
        <i class="el-icon-circle-close closeButton" @click="closeAssessment"></i>
        <el-timeline style="margin: 0 0 30px 0;" v-if="AssessmentList && AssessmentList.length > 0">
          <el-timeline-item v-for="(item, index) in AssessmentList" :key="index" :timestamp="item.Date">
            <p>
              <span style="margin-right:10px;">{{ item.UserName }}</span><span v-if="
                  item.OperationResult == '正常发起' ||
                    item.OperationResult == '同意'
                " style="color:#34C400;">{{ item.OperationResult }}</span><span v-else-if="item.OperationResult == '拒绝'" style="color:#FF3B3B;">{{ item.OperationResult }}</span>
            </p>
            <p v-if="item.Remark">备注：{{ item.Remark }}</p>
          </el-timeline-item>
        </el-timeline>
        <p style="text-align: center;margin-bottom:20px;" v-else>
          暂无审批记录
        </p>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import {
  GetProjectBusinessType,
  GetProjectContractApproveStatus,
  GetProjectContractPageList,
  ExportProjectContract,
  AddProjectContract,
  DownloadProjectContract,
  DeleteProjectContract,
  EditProjectContractApproveStatus,
  EditProjectContract,
  TerminationProjectContract,
  ProjectRiskAssessmentApprove,
  GetProjectContractApproveNodeInfo,
  ProjecctContractFinalApprove,
  RevokeRiskApprove,
  RevokeFirstApprove,
  RevokeFinalApprove,
  RenewalProjectContract,
} from '@/api/projectManagement.js'
import { AddContractArchives } from '@/api/FileManagement.js'
import SupperUploader from '@/utils/SupperUploader'
import AddProjectcontract from './components/AddProjectcontract.vue'
import TerminationContract from './components/TerminationContract.vue'
import ProjectOfflineSigning from './components/ProjectOfflineSigning.vue'
import SubmitAssessment from './components/SubmitAssessment.vue'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import OperationLog from './components/OperationLog.vue'
import ContractTemplatedig from './components/ContractTemplatedig.vue'
import SubmitFinal from './components/SubmitFinal.vue'
import {
  MenuIdDate,
  showLoading,
  hideLoading,
  uuid,
  copy,
} from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    ContractTemplatedig,
    PreviewFile,
    AddProjectcontract,
    TerminationContract,
    OperationLog,
    ScreeningComponent,
    ProjectOfflineSigning,
    SubmitAssessment,
    SubmitFinal,
  },
  data() {
    return {
      BusinessList: [],
      tableloading: false,
      searchObject: {
        CompanyName: '',
        ProjectName: '',
        BusinessType: '-1',
        SysUserName: '',
        periodOf: [],
        StartSignDate: '',
        EndSignDate: '',
        ApproveStatus: -1,
        Status: -1,
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: '合同编号', prop: 'Code' },
        { label: '合同名称', prop: 'Name' },
        { label: '业务类型', prop: 'BusinessTypeText' },
        { label: '相关客户', prop: 'CompanyName' },
        { label: '所属项目', prop: 'ProjectName' },
        { label: '合同金额', prop: 'Amount' },
        { label: '起始日期', prop: 'StartDate' },
        { label: '终止日期', prop: 'ExpireDate' },
        { label: '合同期限', prop: 'ContractPeriod' },
        { label: '签订时间', prop: 'SignDate' },
        { label: '合同签订模式', prop: 'SignType' },
        { label: '合同上传时间', prop: 'AddTime' },
        { label: '合同状态', prop: 'ApproveStatusText' },
        { label: '创建人', prop: 'SysUserName' },
        { label: '存档状态', prop: 'Status' },
        { label: '合同附件', prop: 'Attachment' },
      ],
      AssessmentList: [],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      Ids: [], //选中数组ID
      selectArr: [], //选中数组
      showContractTemplateLog: false,
      ContractTemplateTitle: '下载项目合同模板',
      isImg: 1,
      previewFileUrl: '',
      titlename: '合同附件预览',
      iframeShow: false,
      showAddContract: false,
      ContractTitle: '添加项目合同信息',
      tempData: {},
      TerminationId: '', //终止ID
      showTerminationContract: false,
      showLookAgreement: false, //查看终止协议
      showEmployeesOffline: false, //线下签约
      showSubmitAssessment: false, //提交风险评估
      TerminationAttachment: '', //终止协议地址
      TerminationObj: {
        fileName: '',
        filesType: '',
      },
      optionLookShow: false,
      showOperationLog: false, //是否显示操作日志
      showAssessmentList: false, //是否显示审批记录
      showSubmitFinal: false, //是否显示终审弹窗
      OperationLogId: '',
      OperationLogTitle: '操作日志详情',
      statusList: [
        {
          id: -1,
          label: '全部',
        },
        {
          id: 0,
          label: '待存档',
        },
        {
          id: 1,
          label: '已存档 ',
        },
      ],
      ProjectContractId: '',
      Logtype: 0,
      tabidx: -1,
      tablist: [],
      allchecked: false,
      tableData: [],
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: '',
        OperationCode: 'Query',
      },
    }
  },
  created() {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      console.log(this.$route.meta.operations)
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getWageList(this.operatiOBj)
      this.getCatagoryType()
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  methods: {
    //筛选项
    SelectCheck(val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    // 切换tab栏
    choosetab(e) {
      console.log(e)
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.value
        this.getWageList(this.operatiOBj)
      }
    },
    //重置
    resetSearch() {
      this.searchObject = this.$options.data().searchObject
      this.currentPage = 1
      this.getWageList(this.operatiOBj)
    },
    //搜索
    search() {
      this.currentPage = 1
      this.getWageList(this.operatiOBj)
    },
    //获取项目类型
    getCatagoryType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1',
      }
      GetProjectBusinessType(qs.stringify(obj)).then((response) => {
        if (response) {
          this.BusinessList = response
          this.BusinessList.unshift({
            describe: '全部',
            value: '-1',
          })
        }
      })
      GetProjectContractApproveStatus(qs.stringify(obj)).then((response) => {
        if (response) {
          this.tablist = response
          this.tablist.unshift({
            describe: '全部',
            value: '-1',
          })
        }
      })
    },
    //获取列表数据
    getWageList(operat) {
      this.tableloading = true
      const obj = {
        ProjectId: 0,
        CompanyName: this.searchObject.CompanyName,
        ProjectName: this.searchObject.ProjectName,
        SysUserName: this.searchObject.SysUserName,
        BusinessType: this.searchObject.BusinessType,
        Status: this.searchObject.Status,
        StartSignDate: '',
        EndSignDate: '',
        ApproveStatus: '',
        AdditionalQuery: 0,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1',
      }
      if (this.tabidx == 20) {
        obj.AdditionalQuery = 1
        obj.ApproveStatus = 10
      } else if (this.tabidx == 21) {
        obj.AdditionalQuery = 2
        obj.ApproveStatus = 10
      } else {
        obj.AdditionalQuery = 0
        obj.ApproveStatus = this.tabidx
      }
      if (this.searchObject.periodOf && this.searchObject.periodOf.length > 0) {
        obj.StartSignDate = this.searchObject.periodOf[0]
        obj.EndSignDate = this.searchObject.periodOf[1]
      }
      GetProjectContractPageList(qs.stringify(obj)).then((res) => {
        this.tableloading = false
        if (res.IsSuccess) {
          this.tableData = res.Data
          this.total = res.Total
        } else {
          this.tableData = []
          this.total = 0
          this.$message({
            message: res.MessageContent,
            type: 'error',
          })
        }
      })
    },
    //下载合同模板
    DownloadContractTemplate(str) {
      this.showContractTemplateLog = true
    },
    //关闭合同模板
    CloseshowContractTemplate(str) {
      this.showContractTemplateLog = str
    },
    //查看审批记录
    LookAssessmentList(data, str) {
      let ApproveType = 0
      if (data.ApproveStatus == 3) {
        ApproveType = 1
      } else if (data.ApproveStatus == 6) {
        ApproveType = 2
      } else if (data.ApproveStatus == 9) {
        ApproveType = 3
      }
      let param = {
        ProjectContractId: data.Id,
        ApproveType: ApproveType,
        menuid: MenuIdDate(),
        operationcode: '1',
      }
      showLoading()
      GetProjectContractApproveNodeInfo(qs.stringify(param)).then(
        (response) => {
          hideLoading()
          if (response.IsSuccess) {
            this.showAssessmentList = true
            if (response.Data && response.Data.length > 0) {
              this.AssessmentList = response.Data
            } else {
              this.AssessmentList = []
            }
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent,
            })
          }
        }
      )
    },
    //关闭审批记录
    closeAssessment() {
      this.showAssessmentList = false
    },
    //导出合同
    ExportFile(str) {
      const operating = this.$operatedata(this.operates, str)
      if (this.Ids.length == 0) {
        this.$message({
          message: '请勾选你需要导出的项目合同',
          type: 'warning',
        })
        return
      }
      let param = {
        IdArr: this.Ids.join(','),
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
      }
      showLoading()
      ExportProjectContract(qs.stringify(param)).then((response) => {
        hideLoading()
        if (response.IsSuccess && response.Data) {
          window.open(response.Data)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent,
          })
        }
      })
    },
    //预览附件
    watchFile(data) {
      const e = data.Attachment
      if (e) {
        const ext = e.slice(e.lastIndexOf('.') + 1).toLowerCase()
        console.log(e)
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = e
        } else if (
          ext == 'doc' ||
          ext == 'docx' ||
          ext == 'xlsx' ||
          ext == 'xls'
        ) {
          this.isImg = 3
          this.previewFileUrl =
            'https://view.officeapps.live.com/op/view.aspx?src=' + e
        } else {
          this.isImg = 1
          this.previewFileUrl = e
        }
        this.iframeShow = true
      }
    },
    closeFileShow(val) {
      this.iframeShow = val
    },
    //状态变更
    // ModifyState (data, status, str) {
    //   const operating = this.$operatedata(this.operates, str)
    //   let param = {
    //     Id: data.Id,
    //     ApproveStatus: status,
    //     menuid: operating.MenuId,
    //     operationcode: operating.OperationCode
    //   }
    //   this.$confirm('你确定进行当前状态变更操作吗', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     showLoading()
    //     EditProjectContractApproveStatus(qs.stringify(param)).then(response => {
    //       hideLoading()
    //       if (response.IsSuccess) {
    //         this.$message({
    //           type: 'success',
    //           message: '变更状态成功!'
    //         })
    //         this.getWageList(this.operatiOBj)
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: response.MessageContent
    //         })
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消操作'
    //     })
    //   })
    // },
    //提交初审
    ModifyStateTrial(data, status, str) {
      this.$router.push({
        path: '/ContractManagement/SubmitPreliminaryExamination',
        query: {
          Id: data.Id,
        },
      })
    },
    //提交终审
    ModifyStateFinal(data, status, str) {
      this.tempData = data
      this.showSubmitFinal = true
    },
    //确定提交终审
    SubmitFinalSave(data) {
      let param = {
        ProjectContractId: data.ProjectContractId,
        Area: data.Area,
        BfCompanyId: data.BfCompanyId,
        BfCompanyName: data.BfCompanyName,
        Describtion: data.Describtion,
        SysOrgId:data.OrgId,
        menuid: MenuIdDate(),
        operationcode: '1',
      }
      showLoading()
      ProjecctContractFinalApprove(qs.stringify(param)).then((response) => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '已提交项目合同终审!',
          })
          this.showSubmitFinal = false
          this.tabidx = 7
          this.getWageList(this.operatiOBj)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent,
          })
        }
      })
    },
    //取消提交终审
    closeSubmitFinal(str) {
      this.showSubmitFinal = str
    },
    //撤销
    ModifyState2(data, status, str) {
      const operating = this.$operatedata(this.operates, str)
      let param = {
        ProjectContractId: data.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
      }
      if (status == '1') {
        this.$confirm('你确定要撤销当前合同风险评估审批吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            showLoading()
            RevokeRiskApprove(qs.stringify(param)).then((response) => {
              hideLoading()
              if (response.MessageCode == '0') {
                this.$message({
                  type: 'success',
                  message: '合同风险评估审批已撤销!',
                })
                this.tabidx = 0
                this.getWageList(this.operatiOBj)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent,
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作',
            })
          })
      } else if (status == '4') {
        this.$confirm('你确定要撤销当前合同初审审批吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            showLoading()
            RevokeFirstApprove(qs.stringify(param)).then((response) => {
              hideLoading()
              if (response.MessageCode == '0') {
                this.$message({
                  type: 'success',
                  message: '合同初审审批已撤销!',
                })
                this.tabidx = 2
                this.getWageList(this.operatiOBj)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent,
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作',
            })
          })
      } else if (status == '7') {
        this.$confirm('你确定要撤销当前合同终审审批吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            showLoading()
            RevokeFinalApprove(qs.stringify(param)).then((response) => {
              hideLoading()
              if (response.MessageCode == '0') {
                this.$message({
                  type: 'success',
                  message: '合同终审审批已撤销!',
                })
                this.tabidx = 5
                this.getWageList(this.operatiOBj)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent,
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作',
            })
          })
      }
    },
    //线下签约
    OfflineSigning(data, status, str) {
      this.tempData = data
      this.showEmployeesOffline = true
    },
    //保存线下签约
    EmployeesOfflineSave(data) {
      let obj = {
        Id: data.Id,
        ApproveStatus: 10,
        Attachment: data.Attachment,
        menuid: MenuIdDate(),
        operationcode: 1,
      }
      showLoading()
      EditProjectContractApproveStatus(qs.stringify(obj)).then((response) => {
        hideLoading()
        if (response.IsSuccess) {
          this.showEmployeesOffline = false
          this.$message({
            type: 'success',
            message: '线下签约合同上传成功！',
          })
          this.tabidx = 10
          this.getWageList(this.operatiOBj)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent,
          })
        }
      })
    },
    //关闭线下签约
    closeEmployeesOffline(str) {
      this.showEmployeesOffline = str
    },
    //打开提交风险评估
    SubmitAssessmentEdit(data, str) {
      this.ProjectContractId = data.Id
      this.showSubmitAssessment = true
    },
    //提交风险评估事件
    SubmitAssessmentSave(data) {
      console.log(data)
      let param = {
        ProjectContractId: data.ProjectContractId,
        CustomerProfile: data.CustomerProfile,
        RiskLevel: data.RiskLevel,
        PlanOffer: data.PlanOffer,
        IncomeCalculation: data.IncomeCalculation,
        RiskPoint: data.RiskPoint,
        Countermeasure: data.Countermeasure,
        Attachment: data.Attachment,
        SysOrgId:data.OrgId,
        menuid: MenuIdDate(),
        operationcode: 1,
      }
      showLoading()
      ProjectRiskAssessmentApprove(qs.stringify(param)).then((response) => {
        hideLoading()
        if (response.MessageCode == '0') {
          this.showSubmitAssessment = false
          this.$message({
            type: 'success',
            message: '提交风险评估成功！',
          })
          this.tabidx = 1
          this.getWageList(this.operatiOBj)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent,
          })
        }
      })
    },
    //关闭提交风险评估
    closeSubmitAssessment(str) {
      this.showSubmitAssessment = str
    },
    //查看合同详情
    watchtalent(data, str) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path,
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      const { href } = this.$router.resolve({
        path: '/ContractManagement/ContractDetails',
        query: {
          Id: data.Id,
          Type: 0,
        },
      })
      window.open(href, '_blank')
    },
    //查看操作日志
    AddRecommended(data, str) {
      this.OperationLogId = data.Id
      this.Logtype = 1
      this.showOperationLog = true
    },
    //关闭操作日志弹窗
    CloseOperationLog(str) {
      this.showOperationLog = str
    },
    //打开上传终止合同
    OpenTermination(data, status, str) {
      this.TerminationId = data.Id
      this.showTerminationContract = true
    },
    //上传终止文件事件
    TerminationContractSave(data) {
      let param = {
        Id: this.TerminationId,
        TerminationAttachment: data.Attachment,
        menuid: MenuIdDate(),
        operationcode: 1,
      }
      showLoading()
      TerminationProjectContract(qs.stringify(param)).then((response) => {
        hideLoading()
        if (response.IsSuccess) {
          this.showTerminationContract = false
          this.$message({
            type: 'success',
            message: '终止合同成功！',
          })
          this.getWageList(this.operatiOBj)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent,
          })
        }
      })
    },
    //关闭上传终止合同文件
    closeTerminationContract(str) {
      this.showTerminationContract = str
    },
    //续签合同
    ToRenewContent(data, str) {
      if (data.Status == 1) {
        this.tempData = data
        this.ContractTitle = '续签项目合同信息'
        this.showAddContract = true
      } else {
        this.$message({
          message: '合同未转交存档，无法进行续签合同',
          type: 'warning',
        })
      }
    },
    //转交存档
    ToArchiveContent(data, str) {
      const operating = this.$operatedata(this.operates, str)
      let param = {
        AddContractArchivesDtoList: [
          {
            ContractName: '项目合同',
            ContractType: 0,
            SourceContractId: data.Id,
            BusinessType: data.BusinessType,
            ArchiveType: data.SignType,
            SigningTime: data.SignDate,
            ArchiveStatus: data.Status,
            ArchivesCabinetId: 0,
            AttachUrl: data.Attachment,
          },
        ],
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
      }
      this.$confirm('此操作将转交当前项目合同存档', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          showLoading()
          AddContractArchives(qs.stringify(param)).then((response) => {
            hideLoading()
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '项目合同已转交存档，请等待档案管理员确认签收!',
              })
              this.getWageList(this.operatiOBj)
            } else {
              this.$message({
                type: 'error',
                dangerouslyUseHTMLString: true,
                message: response.MessageContent,
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作',
          })
        })
    },
    //批量转交存档
    AllToArchiveContent(str) {
      console.log(this.selectArr)
      const operating = this.$operatedata(this.operates, str)
      let param = {
        AddContractArchivesDtoList: [],
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
      }
      if (this.selectArr.length == 0) {
        this.$message({
          message: '请先勾选需要转交存档的数据',
          type: 'warning',
        })
        return
      }
      let isGo = true
      for (let i = 0; i < this.selectArr.length; i++) {
        if (this.selectArr[i].Status == '1') {
          isGo = false
          this.$message({
            message: '你勾选的数据中已存在存档过数据',
            type: 'warning',
          })
          return
        }
      }
      if (isGo) {
        for (let i = 0; i < this.selectArr.length; i++) {
          param.AddContractArchivesDtoList.push({
            ContractName: '项目合同',
            ContractType: 0,
            SourceContractId: this.selectArr[i].Id,
            BusinessType: this.selectArr[i].BusinessType,
            ArchiveType: this.selectArr[i].SignType,
            SigningTime: this.selectArr[i].SignDate,
            ArchiveStatus: this.selectArr[i].Status,
            ArchivesCabinetId: 0,
            AttachUrl: this.selectArr[i].Attachment,
          })
        }
        this.$confirm('此操作将批量转交当前项目合同存档', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            showLoading()
            AddContractArchives(qs.stringify(param)).then((response) => {
              hideLoading()
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '项目合同已转交存档，请等待档案管理员确认签收!',
                })
                this.getWageList(this.operatiOBj)
              } else {
                this.$message({
                  type: 'error',
                  customClass: 'erpmessage',
                  dangerouslyUseHTMLString: true,
                  message: response.MessageContent,
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作',
            })
          })
      }
    },
    //查看终止合同协议
    LookAgreement(data) {
      this.TerminationAttachment = data.TerminationAttachment
      this.TerminationObj.fileName = this.TerminationAttachment
      this.TerminationObj.filesType = this.TerminationAttachment.slice(
        this.TerminationAttachment.lastIndexOf('.') + 1
      ).toUpperCase()
      this.showLookAgreement = true
    },
    //关闭查看终止协议
    closeLook() {
      this.showLookAgreement = false
    },
    // 移入文件显示操作
    fileShow() {
      this.optionLookShow = true
    },
    // 移出文件隐藏操作
    filenoShow() {
      this.optionLookShow = false
    },
    // 预览终止协议
    preview() {
      if (this.TerminationAttachment) {
        const ext = this.TerminationAttachment.slice(
          this.TerminationAttachment.lastIndexOf('.') + 1
        ).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = this.TerminationAttachment
        } else if (ext == 'doc' || ext == 'docx') {
          this.isImg = 3
          this.previewFileUrl =
            'https://view.officeapps.live.com/op/view.aspx?src=' +
            this.TerminationAttachment
        } else {
          this.isImg = 1
          this.previewFileUrl = this.TerminationAttachment
        }
        this.iframeShow = true
      }
    },
    //下载终止协议
    downloadFile() {
      if (this.TerminationAttachment) {
        window.open(this.TerminationAttachment)
      }
    },
    //单个下载
    SingleDown(data, str) {
      if (data.Attachment) {
        window.open(data.Attachment)
      } else {
        this.$message({
          message: '暂无项目合同文件下载',
          type: 'warning',
        })
      }
    },
    //批量下载
    AllDown(str) {
      const operating = this.$operatedata(this.operates, str)
      if (this.Ids.length == 0) {
        this.$message({
          message: '请勾选你需要下载的项目合同',
          type: 'warning',
        })
        return
      }
      let param = {
        IdArr: this.Ids.join(','),
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
      }
      showLoading()
      DownloadProjectContract(qs.stringify(param)).then((response) => {
        hideLoading()
        if (response.IsSuccess && response.Data) {
          window.open(response.Data)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent,
          })
        }
      })
    },
    // 单个删除
    roledetele(data, str) {
      const operating = this.$operatedata(this.operates, str)
      const obj = {
        Id: data.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
      }
      this.$confirm('此操作将删除该项目合同', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          showLoading()
          DeleteProjectContract(qs.stringify(obj)).then((response) => {
            hideLoading()
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.getWageList(this.operatiOBj)
            } else {
              this.$message({
                type: 'error',
                message: response.MessageContent,
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 批量删除
    // Alldelete (str) {
    //   if (this.multipleSelection.length) {
    //     let arr = []
    //     for (let i = 0; i < this.multipleSelection.length; i++) {
    //       arr.push(this.multipleSelection[i].Id)
    //     }
    //     const operating = this.$operatedata(this.operates, str)
    //     const obj = {
    //       Id: arr.join(','),
    //       menuid: operating.MenuId,
    //       operationcode: operating.OperationCode
    //     }
    //     this.$confirm('此操作将批量删除选中的工资映射表', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       DeleteSalaryMap(qs.stringify(obj)).then(response => {
    //         if (response.IsSuccess) {
    //           this.$message({
    //             type: 'success',
    //             message: '删除成功!'
    //           })
    //           this.getWageList(this.operatiOBj)
    //         } else {
    //           this.$message({
    //             type: 'error',
    //             message: response.MessageContent
    //           })
    //         }
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    //   } else {
    //     this.$message({
    //       type: 'warning',
    //       message: '请选择要删除的工资映射表'
    //     })
    //   }
    // },
    //上传合同
    UploadFile(str) {
      // this.ContractTitle = '添加项目合同信息'
      // this.showAddContract = true
      this.$router.push({
        path: '/ContractManagement/UploadFileContract',
        // query: {
        //   Id: data.Id,
        //   ProjectId: data.ProjectId
        // }
      })
    },
    //修改上传合同
    handleEditInformation(data, str) {
      this.$router.push({
        path: '/ContractManagement/UploadFileContract',
        query: {
          Id: data.Id,
        },
      })
    },
    //保存添加修改项目合同
    ProjectContractSave(data) {
      let obj = data
      obj.menuid = MenuIdDate()
      obj.operationcode = '1'
      let message = '续签项目合同成功'
      showLoading()
      RenewalProjectContract(qs.stringify(obj)).then((response) => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: message,
          })
          this.showAddContract = false
          this.tabidx = 0
          this.getWageList(this.operatiOBj)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error',
          })
        }
      })
    },
    //关闭上传项目合同
    closeProjectContract(val) {
      this.showAddContract = val
    },
    // 表头多选
    handleSelectionChange(value) {
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
    // 下方全选
    batchSelectAll() {
      this.$refs.industrtTable.toggleAllSelection()
    },
    handleSizeChange(val) {
      this.PageSize = val
      this.getWageList(this.operatiOBj)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getWageList(this.operatiOBj)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/publicStyle.scss';
.industry-box {
  height: 100%;
}
.tableHeader-operation {
  position: relative;
  text-align: right;
  margin-bottom: 20px;
  .screening-compent {
    float: right;
    margin-right: 5px;
  }
  .smaellFile {
    width: 116px;
    height: 34px;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    display: inline-block;
    z-index: 100;
    cursor: pointer;
    &::-webkit-file-upload-button {
      height: 0;
    }
  }
}
.table-content {
  border-radius: 0;
}
</style>
