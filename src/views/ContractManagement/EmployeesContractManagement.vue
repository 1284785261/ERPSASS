<!-- 员工合同管理 -->
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
          <el-form-item label="合同类型" label-width="80px">
            <el-select v-model="searchObject.Type" class="select-input" size="small" placeholder="请选择合同类型">
              <el-option v-for="item in BusinessList" :key="item.value" :label="item.describe" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工姓名" label-width="80px">
            <el-input v-model="searchObject.StaffName" clearable class="select-input" placeholder="请输入员工姓名" />
          </el-form-item>
          <el-form-item label="入职公司" label-width="80px">
            <el-input v-model="searchObject.BfCompanyName" clearable class="select-input" placeholder="请输入入职公司" />
          </el-form-item>
          <el-form-item label="在职状态" label-width="80px">
            <el-select v-model="searchObject.JobStatus" placeholder="请选择" size="mini" class="select-input">
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
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
    </div>
    <div class="table-content">

      <div class="tableHeader-operation">
        <el-button class="operation-button" size="small" v-if="$operatebtn(operates, 'Down')" type="primary" @click="DownloadContractTemplate('Down')">下载合同模板</el-button>
        <el-button class="operation-button" size="small" v-if="$operatebtn(operates, 'Import')" type="primary" @click="UploadFile('Import')">上传合同</el-button>
        <el-button class="operation-button" size="small" v-if="$operatebtn(operates, 'Import')" type="primary" @click="ImportFile('Import')">合同导入</el-button>
        <el-button class="operation-button" size="small" v-if="$operatebtn(operates, 'Export')" type="primary" @click="ExportFile('Export')">导出合同</el-button>
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <el-table ref="industrtTable" v-loading="tableloading" :data="tableData" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed="left" type="selection" width="60" />
        <el-table-column align="center" v-if="$getColumsFlag('Code',checkboxVal)" prop="Code" label="合同编号" min-width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <a v-if="$operatebtn(operates, 'View')" class="watchcode" @click="watchtalent(scope.row,'View')">{{scope.row.Code}}</a>
            <span v-else>{{scope.row.Code}}</span>
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
            <a v-if="$operatebtn(operates, 'Down')" class="watchcode" @click="watchFile(scope.row)">{{scope.row.Attachment}}</a>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Attachment" label="用印链接" min-width="180" show-overflow-tooltip v-if="tabidx == 7">
          <template slot-scope="scope">
            <a class="watchcode" v-if="scope.row.PartyASignyUrl" @click="CopyPartyASignyUrl(scope.row)" v-clipboard:copy="scope.row.PartyASignyUrl">复制用印链接</a>
            <a class="watchcode" v-if="scope.row.PartyASignyUrl" @click="SendPartyASignyUrl(scope.row)">点击发送短信</a>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Attachment" label="员工签署链接" min-width="180" show-overflow-tooltip v-if="tabidx == 7">
          <template slot-scope="scope">
            <a class="watchcode" v-if="scope.row.PartyBSignyUrl" @click="CopyPartyBSignyUrl(scope.row)" v-clipboard:copy="scope.row.PartyBSignyUrl">复制签署链接</a>
            <a class="watchcode" v-if="scope.row.PartyBSignyUrl" @click="SendPartyBSignyUrl(scope.row)">点击发送短信</a>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click" v-if="($operatebtns(operates,['View','Modify','Disabled','Enabled','Delete']))">
              <span class="el-dropdown-link">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <!-- 有初审终审版本 -->
                  <!-- <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && (scope.row.ApproveStatus == 0 || scope.row.ApproveStatus == 5 || scope.row.ApproveStatus == 6)" @click.native="handleEdit(scope.row,'Modify')">修改</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Down') && scope.row.ApproveStatus != 4" @click.native="SingleDown(scope.row,'Down')">下载</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 0" @click.native="ModifyState(scope.row,'1','Modify')">提交初审</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 2" @click.native="ModifyState(scope.row,'3','Modify')">提交终审</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 5" @click.native="ModifyState(scope.row,'2','Modify')">重新提交初审</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 6" @click.native="ModifyState(scope.row,'3','Modify')">重新提交终审</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 1" @click.native="ModifyState2(scope.row,'0','Modify')">撤回</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 3" @click.native="ModifyState2(scope.row,'2','Modify')">撤回</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 4 && scope.row.SignType == 1" @click.native="OfflineSigning(scope.row,'7','Modify')">线下签约</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 4 && scope.row.SignType == 0" @click.native="OfflineSignup(scope.row,'7','Modify')">在线签署</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 9 && scope.row.SignType == 0" @click.native="OfflineSignup(scope.row,'7','Modify')">再次提交</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 7" @click.native="SigningSteps(scope.row,'Modify')">签署进度</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 8 && scope.row.AdditionalStatus == 2" @click.native="ToRenewContent(scope.row,'Modify')">续签合同</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 8 && scope.row.AdditionalStatus != 2 && scope.row.Status == 0" @click.native="ToArchiveContent(scope.row,'Modify')">转交存档</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="AddRecommended(scope.row,'View')">操作日志</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && (scope.row.ApproveStatus == 8 || scope.row.ApproveStatus ==9 || scope.row.ApproveStatus ==11 || scope.row.ApproveStatus ==12)" @click.native="OpenTermination(scope.row,'8','Modify')">终止合同</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 10" @click.native="LookAgreement(scope.row,'Modify')">查看终止协议</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Delete') && (scope.row.ApproveStatus == 0 || scope.row.ApproveStatus == 2 || scope.row.ApproveStatus == 4 || scope.row.ApproveStatus == 5 || scope.row.ApproveStatus == 6 || scope.row.ApproveStatus == 9)" @click.native="roledetele(scope.row,'Delete')">删除</el-dropdown-item> -->
                  <!-- 无初审终审版本 -->
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && (scope.row.ApproveStatus == 0 || scope.row.ApproveStatus == 5 || scope.row.ApproveStatus == 6)" @click.native="handleEdit(scope.row,'Modify')">修改</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Down')" @click.native="SingleDown(scope.row,'Down')">下载</el-dropdown-item>
                  <!-- <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 0" @click.native="ModifyState(scope.row,'1','Modify')">提交初审</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 2" @click.native="ModifyState(scope.row,'3','Modify')">提交终审</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 5" @click.native="ModifyState(scope.row,'2','Modify')">重新提交初审</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 6" @click.native="ModifyState(scope.row,'3','Modify')">重新提交终审</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 1" @click.native="ModifyState2(scope.row,'0','Modify')">撤回</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 3" @click.native="ModifyState2(scope.row,'2','Modify')">撤回</el-dropdown-item> -->
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 0 && scope.row.SignType == 1" @click.native="OfflineSigning(scope.row,'7','Modify')">线下签约</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 0 && scope.row.SignType == 0" @click.native="OfflineSignup(scope.row,'7','Modify')">在线签署</el-dropdown-item>

                  <!-- <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 7" @click.native="CopyPartyASignyUrl(scope.row)" v-clipboard:copy="scope.row.PartyASignyUrl">复制甲方用印链接</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 7" @click.native="SendPartyASignyUrl(scope.row)">甲方用印链接发送至短信</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 7" @click.native="CopyPartyBSignyUrl(scope.row)" v-clipboard:copy="scope.row.PartyBSignyUrl">复制员工签署链接</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 7" @click.native="SendPartyBSignyUrl(scope.row)">员工签署链接发送至短信</el-dropdown-item> -->

                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 7" @click.native="ModifyState2(scope.row,'0','Modify')">撤回</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 9 && scope.row.SignType == 0" @click.native="ModifyState0(scope.row,'0','Modify')">再次提交</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 7" @click.native="SigningSteps(scope.row,'Modify')">签署进度</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 8 && scope.row.AdditionalStatus == 2" @click.native="ToRenewContent(scope.row,'Modify')">续签合同</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 8 && scope.row.AdditionalStatus != 2 && scope.row.Status == 0" @click.native="ToArchiveContent(scope.row,'Modify')">转交存档</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="AddRecommended(scope.row,'View')">操作日志</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && (scope.row.ApproveStatus == 8 || scope.row.ApproveStatus ==9 || scope.row.ApproveStatus ==11 || scope.row.ApproveStatus ==12)" @click.native="OpenTermination(scope.row,'8','Modify')">终止合同</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.ApproveStatus == 10" @click.native="LookAgreement(scope.row,'Modify')">查看终止协议</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Delete') && (scope.row.ApproveStatus == 0 || scope.row.ApproveStatus == 2 || scope.row.ApproveStatus == 4 || scope.row.ApproveStatus == 5 || scope.row.ApproveStatus == 6 || scope.row.ApproveStatus == 9)" @click.native="roledetele(scope.row,'Delete')">删除</el-dropdown-item>
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="foot-operation" v-if="($operatebtns(operates,['Down','Modify']))">
        <el-checkbox class="footcheck erpcheck" v-model="allchecked" @change="batchSelectAll">全选</el-checkbox>
        <el-button round class="operation-button" v-if="$operatebtn(operates,'Down')" size="mini" @click="AllDown('Down')">下载</el-button>
        <el-button round class="operation-button" v-if="$operatebtn(operates,'Modify') && tabidx == 8" size="mini" @click="AllToArchiveContent('Modify')">转交存档</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <div>
      <!-- 下载模板弹窗 -->
      <ContractTemplatedig :showContractTemplateLog="showContractTemplateLog" :title="ContractTemplateTitle" @CloseshowContractTemplate="CloseshowContractTemplate"></ContractTemplatedig>
      <!-- 预览弹窗 -->
      <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
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
      <!-- 查看签署进度 -->
      <el-dialog :close-on-click-modal="false" title="签署进度查看" class="dialog-box" append-to-body :visible.sync="showLooksteps" :show-close="false" :destroy-on-close="true" width="480px" @close="closeLooksteps">
        <i class="el-icon-circle-close closeButton" @click="closeLooksteps"></i>
        <el-form ref="ruleForm" class="forms-box">
          <div>
            <el-steps direction="vertical" :active="stepactive">
              <el-step title="上传合同" style="min-height: 80px;">
                <template slot="description">
                  <span>上传时间: {{ContractSignObject.UploadTime}}</span>
                </template>
              </el-step>
              <el-step title="甲方用印签署" style="min-height: 80px;">
                <template slot="description">
                  <span v-if="ContractSignObject.PartyASignStatus == 1" style="margin-right: 50px;">甲方用印签署成功</span>
                  <span v-else-if="ContractSignObject.PartyASignStatus == 2">甲方用印签署失败</span>
                  <span v-else>甲方用印还未签署</span>
                  <span v-if="ContractSignObject.PartyASignStatus == 1">用印签署时间：{{ContractSignObject.PartyASignTime}}</span>
                </template>
              </el-step>
              <el-step title="员工签署" style="min-height: 80px;">
                <template slot="description">
                  <span v-if="ContractSignObject.PartyBSignStatus == 1" style="margin-right: 50px;">员工签署成功</span>
                  <span v-else-if="ContractSignObject.PartyBSignStatus == 2">员工签署失败</span>
                  <span v-else>员工还未签署</span>
                  <span v-if="ContractSignObject.PartyBSignStatus == 1">员工签署时间：{{ContractSignObject.PartyBSignTime}}</span>
                </template>
              </el-step>
            </el-steps>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer-multiple">
          <el-button round size="small" @click="closeLooksteps">关闭</el-button>
        </div>
      </el-dialog>
      <!-- 导入合同 -->
      <ImportContract :showImportContract="showImportContract" @ImportContractSave="ImportContractSave" @closeImportContract="closeImportContract"></ImportContract>
      <!-- 导入合同成功显示详情 -->
      <ImportTitle :TitleShow="TitleShow" :errorData="errorData" :title="ImportTitle" @closeTitle="closeTitle"></ImportTitle>
    </div>
  </div>
</template>
<script>
import ScreeningComponent from "@/components/publicComponents/ScreeningComponent";
import { AddContractArchives } from "@/api/FileManagement.js";
import {
  GetStaffContractList,
  AddStaffContract,
  EditStaffContract,
  ImportStaffContract,
  SubmitStaffContractSign,
  GetStaffContractSign
} from "@/api/OutsourcedEmployeeManagement.js";
import {
  GetStaffContractType,
  GetStaffContractApprovalStatus,
  BatchDownLoadStaffContractTemplate,
  EditStaffContractApproveStatus,
  ExportStaffContract,
  EditStaffContractStatus,
  OfflineSigningStaffContract,
  TerminationStaffContract,
  DeleteStaffContract,
  SendPhoneVerification
} from "@/api/Public.js";
import SupperUploader from "@/utils/SupperUploader";
import ImportContract from "@/components/OutsourcedEmployeeManagement/ImportContract";
import ImportTitle from "@/components/publicComponents/ImportTitle";
import AddEmployeescontract from "./components/AddEmployeescontract.vue";
import TerminationContract from "./components/TerminationContract.vue";
import EmployeesOfflineSigning from "./components/EmployeesOfflineSigning.vue";
import EmployeesOfflineSignup from "./components/EmployeesOfflineSignup.vue";
import PreviewFile from "@/components/publicComponents/PreviewFile.vue";
import OperationLog from "./components/OperationLog.vue";
import ContractTemplatedig from "./components/ContractTemplatedig.vue";
import {
  MenuIdDate,
  showLoading,
  hideLoading,
  uuid,
  copy
} from "@/utils/CustomValidation";
import qs from "qs";
export default {
  components: {
    ContractTemplatedig,
    PreviewFile,
    AddEmployeescontract,
    TerminationContract,
    OperationLog,
    ScreeningComponent,
    EmployeesOfflineSigning,
    EmployeesOfflineSignup,
    ImportContract,
    ImportTitle
  },
  data() {
    return {
      BusinessList: [],
      tableloading: false,
      searchObject: {
        CompanyName: "",
        ProjectName: "",
        BfCompanyName: "",
        JobStatus: -1,
        StaffName: "",
        ApproveStatus: -1,
        Type: "-1"
      },
      checkboxVal: [],
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
        { label: "合同附件", prop: "Attachment" }
      ],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      Ids: [], //选中数组ID
      selectArr: [], //选中数组
      showContractTemplateLog: false,
      ContractTemplateTitle: "下载员工合同模板",
      isImg: 1,
      previewFileUrl: "",
      titlename: "合同附件预览",
      iframeShow: false,
      showAddContract: false,
      ContractTitle: "添加员工合同信息",
      tempData: {},
      TerminationId: "", //终止ID
      showTerminationContract: false,
      showLookAgreement: false, //查看终止协议
      TerminationAttachment: "", //终止协议地址
      TerminationObj: {
        fileName: "",
        filesType: ""
      },
      optionLookShow: false,
      showOperationLog: false, //是否显示操作日志
      showEmployeesOffline: false, //是否显示线下签约
      showEmployeesOfflineUp: false, //是否显示在线签署
      showLooksteps: false, //查看签署进度
      ContractSignObject: [],
      stepactive: 1,
      OperationLogId: "",
      OperationLogTitle: "操作日志详情",
      statusList: [
        {
          id: -1,
          label: "全部"
        },
        {
          id: 1,
          label: "在职"
        },
        {
          id: 2,
          label: "离职"
        }
      ],
      Logtype: 0,
      tabidx: -1,
      tablist: [],
      allchecked: false,
      tableData: [],
      showImportContract: false,
      ImportTitle: "合同导入信息",
      TitleShow: false,
      errorData: {}, //合同导入信息
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: "",
        OperationCode: "Query"
      }
    };
  },
  created() {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations;
      console.log(this.$route.meta.operations);
      this.operatiOBj.menuid = this.$operatedata(this.operates, "Query").MenuId;
      this.getPageList(this.operatiOBj);
      this.getCatagoryType();
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop);
    }
  },
  methods: {
    //筛选项
    SelectCheck(val) {
      this.tableloading = true;
      this.checkboxVal = val;
      this.tableloading = false;
    },
    // 切换tab栏
    choosetab(e) {
      console.log(e);
      // 防止重复点击
      if (this.tabidx == e.value) {
        return;
      } else {
        // 切换到第一页
        this.currentPage = 1;
        this.tabidx = e.value;
        this.getPageList(this.operatiOBj);
      }
    },
    //重置
    resetSearch() {
      this.searchObject = this.$options.data().searchObject;
      this.currentPage = 1;
      this.getPageList(this.operatiOBj);
    },
    //搜索
    search() {
      this.currentPage = 1;
      this.getPageList(this.operatiOBj);
    },
    //获取合同类型
    getCatagoryType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetStaffContractType(qs.stringify(obj)).then(response => {
        if (response) {
          this.BusinessList = response;
          this.BusinessList.unshift({
            describe: "全部",
            value: "-1"
          });
        }
      });
      GetStaffContractApprovalStatus(qs.stringify(obj)).then(response => {
        if (response) {
          this.tablist = response;
          this.tablist.splice(this.tablist.length - 1, 1);
          this.tablist.splice(1, 6);
          this.tablist.unshift({
            describe: "全部",
            value: "-1"
          });
        }
      });
    },
    //获取列表数据
    getPageList(operat) {
      this.tableloading = true;
      const obj = {
        ProjectId: 0,
        CompanyName: this.searchObject.CompanyName,
        ProjectName: this.searchObject.ProjectName,
        BfCompanyName: this.searchObject.BfCompanyName,
        StaffName: this.searchObject.StaffName,
        JobStatus: this.searchObject.JobStatus,
        Type: this.searchObject.Type,
        ApprovalStatus: this.tabidx,
        // AdditionalQuery: 0,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      };
      // if (this.tabidx == 20) {
      //   obj.AdditionalQuery = 1
      //   obj.ApproveStatus = 7
      // } else if (this.tabidx == 21) {
      //   obj.AdditionalQuery = 2
      //   obj.ApproveStatus = 7
      // } else {
      //   obj.AdditionalQuery = 0
      //   obj.ApproveStatus = this.tabidx
      // }
      // if (this.searchObject.periodOf && this.searchObject.periodOf.length > 0) {
      //   obj.StartSignDate = this.searchObject.periodOf[0]
      //   obj.EndSignDate = this.searchObject.periodOf[1]
      // }
      GetStaffContractList(qs.stringify(obj)).then(res => {
        this.tableloading = false;
        if (res.IsSuccess) {
          this.tableData = res.Data;
          this.total = res.Total;
        } else {
          this.tableData = [];
          this.total = 0;
          this.$message({
            message: res.MessageContent,
            type: "error"
          });
        }
      });
    },
    //下载合同模板
    DownloadContractTemplate(str) {
      this.showContractTemplateLog = true;
    },
    //关闭合同模板
    CloseshowContractTemplate(str) {
      this.showContractTemplateLog = str;
    },
    //导入合同
    ImportFile() {
      this.showImportContract = true;
    },
    //导入合同事件是否成功信息
    ImportContractSave(data) {
      data.menuid = MenuIdDate();
      data.operationcode = "1";
      ImportStaffContract(data).then(response => {
        if (response.IsSuccess) {
          this.errorData = response;
          this.TitleShow = true;
          this.showImportContract = false;
          this.getPageList(this.operatiOBj);
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    //关闭导入合同
    closeImportContract(val) {
      this.showImportContract = val;
    },
    //关闭合同导入详情
    closeTitle(val) {
      this.TitleShow = val;
    },
    //导出合同
    ExportFile(str) {
      const operating = this.$operatedata(this.operates, str);
      if (this.Ids.length == 0) {
        this.$message({
          message: "请勾选你需要导出的员工合同",
          type: "warning"
        });
        return;
      }
      let param = {
        Ids: this.Ids.join(","),
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      };
      showLoading();
      ExportStaffContract(qs.stringify(param)).then(response => {
        hideLoading();
        if (response.IsSuccess && response.Data) {
          window.open(response.Data);
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    //预览附件
    watchFile(data) {
      const e = data.Attachment;
      if (e) {
        const ext = e.slice(e.lastIndexOf(".") + 1).toLowerCase();
        console.log(e);
        if (ext == "pdf") {
          this.isImg = 2;
          this.previewFileUrl = e;
        } else if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "xlsx" ||
          ext == "xls"
        ) {
          this.isImg = 3;
          this.previewFileUrl =
            "https://view.officeapps.live.com/op/view.aspx?src=" + e;
        } else {
          this.isImg = 1;
          this.previewFileUrl = e;
        }
        this.iframeShow = true;
      }
    },
    closeFileShow(val) {
      this.iframeShow = val;
    },
    //状态变更
    ModifyState(data, status, str) {
      const operating = this.$operatedata(this.operates, str);
      let param = {
        Id: data.Id,
        ApproveStatus: status,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      };
      this.$confirm("你确定进行当前状态变更操作吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          EditStaffContractApproveStatus(qs.stringify(param)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: "success",
                message: "变更状态成功!"
              });
              this.getPageList(this.operatiOBj);
            } else {
              this.$message({
                type: "error",
                message: response.MessageContent
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    //撤回
    ModifyState2(data, status, str) {
      const operating = this.$operatedata(this.operates, str);
      let param = {
        Id: data.Id,
        ApproveStatus: status,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      };
      this.$confirm("你确定要撤回当前合同签署吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          EditStaffContractApproveStatus(qs.stringify(param)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: "success",
                message: "合同签署已撤回!"
              });
              this.getPageList(this.operatiOBj);
            } else {
              this.$message({
                type: "error",
                message: response.MessageContent
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    //再次提交
    ModifyState0(data, status, str) {
      const operating = this.$operatedata(this.operates, str);
      let param = {
        Id: data.Id,
        ApproveStatus: status,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      };
      EditStaffContractApproveStatus(qs.stringify(param)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            type: "success",
            message: "您需要在【待签约】中重新发起签署。"
          });
          this.getPageList(this.operatiOBj);
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    //复制甲方用印链接
    CopyPartyASignyUrl(data) {
      this.$message({
        type: "success",
        message: "内容已复制到剪切板！"
      });
    },
    //发送甲方用印链接至短信
    SendPartyASignyUrl(data) {
      let param = {
        Mobile: data.Mobile,
        Type: 2,
        Content: data.PartyASignyUrl,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      showLoading();
      SendPhoneVerification(qs.stringify(param)).then(response => {
        hideLoading();
        if (response.IsSuccess && response.MessageCode == 0) {
          this.$message({
            type: "success",
            message: "用印链接已发送至系统用户手机号!"
          });
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    //复制员工签署链接
    CopyPartyBSignyUrl(data) {
      this.$message({
        type: "success",
        message: "内容已复制到剪切板！"
      });
    },
    //发送员工签署链接至短信
    SendPartyBSignyUrl(data) {
      let param = {
        Mobile: data.StaffMobile,
        Type: 3,
        Content: data.PartyBSignyUrl,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      showLoading();
      SendPhoneVerification(qs.stringify(param)).then(response => {
        hideLoading();
        if (response.IsSuccess && response.MessageCode == 0) {
          this.$message({
            type: "success",
            message: "员工签署链接已发送至外包员工所绑定的手机号!"
          });
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    //查看合同详情
    watchtalent(data, str) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      const { href } = this.$router.resolve({
        path: "/ContractManagement/EmployeesContractDetails",
        query: {
          Id: data.Id,
          Type: 1
        }
      });
      window.open(href, "_blank");
    },
    //查看操作日志
    AddRecommended(data, str) {
      this.OperationLogId = data.Id;
      this.Logtype = 2;
      this.showOperationLog = true;
    },
    //关闭操作日志弹窗
    CloseOperationLog(str) {
      this.showOperationLog = str;
    },
    //查看签署进度
    SigningSteps(data, str) {
      let param = {
        ContractId: data.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      showLoading();
      GetStaffContractSign(qs.stringify(param)).then(response => {
        hideLoading();
        if (response.IsSuccess && response.MessageCode == "0") {
          this.ContractSignObject = response.Data;
          this.stepactive = 1;
          if (this.ContractSignObject.PartyASignyUrl) {
            this.stepactive = 2;
          }
          if (this.ContractSignObject.PartyBSignyUrl) {
            this.stepactive = 3;
          }
          this.showLooksteps = true;
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    //关闭查看签署进度
    closeLooksteps() {
      this.showLooksteps = false;
    },
    //打开上传终止合同
    OpenTermination(data, status, str) {
      this.TerminationId = data.Id;
      this.showTerminationContract = true;
    },
    //线下签约
    OfflineSigning(data, status, str) {
      this.tempData = data;
      this.showEmployeesOffline = true;
    },
    //保存线下签约
    EmployeesOfflineSave(data) {
      console.log(data);
      let obj = {
        Id: data.Id,
        OfflineSigning: data.Attachment,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      showLoading();
      OfflineSigningStaffContract(qs.stringify(obj)).then(response => {
        hideLoading();
        if (response.IsSuccess) {
          this.showEmployeesOffline = false;
          this.$message({
            type: "success",
            message: "线下签约合同上传成功！"
          });
          this.getPageList(this.operatiOBj);
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    //关闭线下签约
    closeEmployeesOffline(str) {
      this.showEmployeesOffline = str;
    },
    //打开在线签署
    OfflineSignup(data, status, str) {
      this.tempData = data;
      this.showEmployeesOfflineUp = true;
    },
    //在线签署事件
    EmployeesOfflineSaveUp(data) {
      console.log(data);
      let param = {
        ContractId: data.Id,
        PartAKey: data.PartAKey,
        PartBKey: data.PartBKey,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      showLoading();
      SubmitStaffContractSign(qs.stringify(param)).then(response => {
        hideLoading();
        if (response.IsSuccess && response.MessageCode == 0) {
          this.showEmployeesOfflineUp = false;
          this.$message({
            type: "success",
            message: "在线签署成功！"
          });
          this.getPageList(this.operatiOBj);
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    //关闭在线签署
    closeEmployeesOfflineUp(str) {
      this.showEmployeesOfflineUp = str;
    },
    //上传终止文件事件
    TerminationContractSave(data) {
      console.log(data);
      let param = {
        Id: this.TerminationId,
        TerminationAttachment: data.Attachment,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      showLoading();
      TerminationStaffContract(qs.stringify(param)).then(response => {
        hideLoading();
        if (response.IsSuccess) {
          this.showTerminationContract = false;
          this.$message({
            type: "success",
            message: "终止合同成功！"
          });
          this.getPageList(this.operatiOBj);
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    //关闭上传终止合同文件
    closeTerminationContract(str) {
      this.showTerminationContract = str;
    },
    //续签合同
    ToRenewContent(data, str) {
      if (data.Status == 1) {
        this.tempData = data;
        this.ContractTitle = "续签员工合同信息";
        this.showAddContract = true;
      } else {
        this.$message({
          message: "合同未转交存档，无法进行续签合同",
          type: "warning"
        });
      }
    },
    //转交存档
    ToArchiveContent(data, str) {
      const operating = this.$operatedata(this.operates, str);
      let param = {
        AddContractArchivesDtoList: [
          {
            ContractName: "员工合同",
            ContractType: 1,
            SourceContractId: data.Id,
            BusinessType: data.Type,
            ArchiveType: data.SignType,
            SigningTime: data.SignDate,
            ArchiveStatus: data.Status,
            ArchivesCabinetId: 0,
            AttachUrl: data.SignAttachment
          }
        ],
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      };
      this.$confirm("此操作将转交当前员工合同存档", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          showLoading();
          AddContractArchives(qs.stringify(param)).then(response => {
            hideLoading();
            if (response.IsSuccess) {
              this.$message({
                type: "success",
                message: "员工合同已转交存档，请等待档案管理员确认签收!"
              });
              this.getPageList(this.operatiOBj);
            } else {
              this.$message({
                type: "error",
                dangerouslyUseHTMLString: true,
                message: response.MessageContent
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //批量转交存档
    AllToArchiveContent(str) {
      console.log(this.selectArr);
      const operating = this.$operatedata(this.operates, str);
      let param = {
        AddContractArchivesDtoList: [],
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      };
      if (this.selectArr.length == 0) {
        this.$message({
          message: "请先勾选需要转交存档的数据",
          type: "warning"
        });
        return;
      }
      let isGo = true;
      for (let i = 0; i < this.selectArr.length; i++) {
        if (this.selectArr[i].Status == "1") {
          isGo = false;
          this.$message({
            message: "你勾选的数据中已存在存档过数据",
            type: "warning"
          });
          return;
        }
      }
      if (isGo) {
        for (let i = 0; i < this.selectArr.length; i++) {
          param.AddContractArchivesDtoList.push({
            ContractName: "员工合同",
            ContractType: 1,
            SourceContractId: this.selectArr[i].Id,
            BusinessType: this.selectArr[i].BusinessType,
            ArchiveType: this.selectArr[i].SignType,
            SigningTime: this.selectArr[i].SignDate,
            ArchiveStatus: this.selectArr[i].Status,
            ArchivesCabinetId: 0,
            AttachUrl: this.selectArr[i].Attachment
          });
        }
        this.$confirm("此操作将批量转交当前员工合同存档", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            showLoading();
            AddContractArchives(qs.stringify(param)).then(response => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  type: "success",
                  message: "员工合同已转交存档，请等待档案管理员确认签收!"
                });
                this.getPageList(this.operatiOBj);
              } else {
                this.$message({
                  type: "error",
                  customClass: "erpmessage",
                  dangerouslyUseHTMLString: true,
                  message: response.MessageContent
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //查看终止合同协议
    LookAgreement(data) {
      this.TerminationAttachment = data.TerminationAttachment;
      this.TerminationObj.fileName = this.TerminationAttachment;
      this.TerminationObj.filesType = this.TerminationAttachment.slice(
        this.TerminationAttachment.lastIndexOf(".") + 1
      ).toUpperCase();
      this.showLookAgreement = true;
    },
    //关闭查看终止协议
    closeLook() {
      this.showLookAgreement = false;
    },
    // 移入文件显示操作
    fileShow() {
      this.optionLookShow = true;
    },
    // 移出文件隐藏操作
    filenoShow() {
      this.optionLookShow = false;
    },
    // 预览终止协议
    preview() {
      if (this.TerminationAttachment) {
        const ext = this.TerminationAttachment.slice(
          this.TerminationAttachment.lastIndexOf(".") + 1
        ).toLowerCase();
        if (ext == "pdf") {
          this.isImg = 2;
          this.previewFileUrl = this.TerminationAttachment;
        } else if (ext == "doc" || ext == "docx") {
          this.isImg = 3;
          this.previewFileUrl =
            "https://view.officeapps.live.com/op/view.aspx?src=" +
            this.TerminationAttachment;
        } else {
          this.isImg = 1;
          this.previewFileUrl = this.TerminationAttachment;
        }
        this.iframeShow = true;
      }
    },
    //下载终止协议
    downloadFile() {
      if (this.TerminationAttachment) {
        window.open(this.TerminationAttachment);
      }
    },
    //单个下载
    SingleDown(data, str) {
      // console.log(data.Attachment)
      if (data.Attachment) {
        window.open(data.Attachment);
      } else {
        this.$message({
          message: "暂无员工合同文件下载",
          type: "warning"
        });
      }
    },
    //批量下载
    AllDown(str) {
      const operating = this.$operatedata(this.operates, str);
      if (this.Ids.length == 0) {
        this.$message({
          message: "请勾选你需要下载的员工合同",
          type: "warning"
        });
        return;
      }
      let param = {
        Ids: this.Ids.join(","),
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      };
      showLoading();
      BatchDownLoadStaffContractTemplate(qs.stringify(param)).then(response => {
        hideLoading();
        if (response.IsSuccess && response.Data) {
          window.open(response.Data);
        } else {
          this.$message({
            type: "error",
            message: response.MessageContent
          });
        }
      });
    },
    // 单个删除
    roledetele(data, str) {
      const operating = this.$operatedata(this.operates, str);
      const obj = {
        Id: data.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      };
      this.$confirm("此操作将删除该员工合同", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteStaffContract(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getPageList(this.operatiOBj);
            } else {
              this.$message({
                type: "error",
                message: response.MessageContent
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
    //           this.getPageList(this.operatiOBj)
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
      this.ContractTitle = "添加员工合同信息";
      this.showAddContract = true;
    },
    //查看表头映射
    lookWage(data, str) {
      // this.$router.push({
      //   path: '/BusinessSet/lookWages',
      //   query: {
      //     Id: data.Id,
      //     ProjectId: data.ProjectId,
      //     Type: this.tabidx
      //   }
      // })
    },
    //修改合同
    handleEdit(data, str) {
      this.tempData = data;
      this.ContractTitle = "修改员工合同信息";
      this.showAddContract = true;
    },
    //保存添加修改员工合同
    ProjectContractSave(data) {
      console.log(data);
      let obj = data;
      (obj.menuid = MenuIdDate()), (obj.operationcode = "1");
      if (data.Id) {
        showLoading();
        EditStaffContract(qs.stringify(obj)).then(response => {
          hideLoading();
          if (response.IsSuccess) {
            this.$message({
              type: "success",
              message: "修改员工合同成功!"
            });
            this.showAddContract = false;
            this.getPageList(this.operatiOBj);
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        let message = "";
        if (this.ContractTitle == "添加员工合同信息") {
          message = "添加员工合同成功";
        } else {
          message = "续签员工合同成功";
        }
        showLoading();
        AddStaffContract(qs.stringify(obj)).then(response => {
          hideLoading();
          if (response.IsSuccess) {
            this.$message({
              type: "success",
              message: message
            });
            this.showAddContract = false;
            this.getPageList(this.operatiOBj);
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }
    },
    //关闭上传员工合同
    closeProjectContract(val) {
      this.showAddContract = val;
    },
    // 表头多选
    handleSelectionChange(value) {
      this.Ids = [];
      this.selectArr = [];
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id);
        this.selectArr.push(value[i]);
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true;
      } else {
        this.allchecked = false;
      }
    },
    // 下方全选
    batchSelectAll() {
      this.$refs.industrtTable.toggleAllSelection();
    },
    handleSizeChange(val) {
      this.PageSize = val;
      this.getPageList(this.operatiOBj);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPageList(this.operatiOBj);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
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
.watchcode {
  display: block;
}
</style>