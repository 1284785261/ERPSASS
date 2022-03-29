<!-- 我管理的项目 -->
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="项目名称" label-width="80px">
            <el-input v-model="searchObject.Name" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入项目名称" @keyup.enter.native="search" />
          </el-form-item>
          <el-form-item label="负责人名称" label-width="110px">
            <el-input v-model="searchObject.SysUserName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入负责人名称" @keyup.enter.native="search" />
          </el-form-item>
          <el-form-item label="项目业务类型" label-width="110px">
            <el-select v-model="searchObject.BusinessType" clearable placeholder="请选择项目业务类型" size="mini" class="select-input" @keyup.enter.native="search">
              <el-option v-for="item in BusinessList" :key="item.describe" :label="item.describe" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="项目优先级" label-width="100px">
            <el-select v-model="searchObject.Priority" clearable placeholder="请选择项目优先级" size="mini" class="select-input" @keyup.enter.native="search">
              <el-option v-for="item in PriorityList" :key="item.describe" :label="item.describe" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="search">
            搜索
          </el-button>
        </el-form>

      </div>
    </div>
    <div class="table-content">
      <div>
        <div class="tab clearfix">
          <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
          <!-- <el-button class="operation-button tableHeader-button" size="small" type="primary" @click="AddProject">新建项目</el-button> -->
          <!-- <el-button class="operation-button tableHeader-button erpbtn" size="small" @click="updateadmin">修改项目管理员</el-button> -->
        </div>
        <div class="screening-compent">
        <!-- 筛选列组件 -->
        <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
      </div>
        <div class="roletable-box">
          <el-table ref="industrtTable" v-loading="tableloading" :data="ProjectList" class="erp-table" max-height="600" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="60" />
            <el-table-column align="center" v-if="$getColumsFlag('Code',checkboxVal)" prop="Code" min-width="140" label="项目编码" />
            <el-table-column align="center" v-if="$getColumsFlag('Name',checkboxVal)" prop="Name" min-width="150" label="项目名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <a @click="PorjectDetails(scope.row, 'View')" style="color:#1588F8;">{{scope.row.Name}}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" v-if="$getColumsFlag('BusinessTypeText',checkboxVal)" prop="BusinessTypeText" min-width="100" label="项目类型" />
            <el-table-column align="center" v-if="$getColumsFlag('Priority',checkboxVal)" prop="Priority" min-width="100" label="项目优先级">
              <template slot-scope="scope">
                <span>{{scope.row.Priority | Priority}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" v-if="$getColumsFlag('OwnerName',checkboxVal)" prop="OwnerName" min-width="100" label="项目跟单员" />
            <el-table-column align="center" v-if="$getColumsFlag('ProgressText',checkboxVal)" v-show="tabidx =='0'" prop="ProgressText" min-width="120" label="项目跟单进度" key="1" />
            <el-table-column align="center" v-if="$getColumsFlag('AdminName',checkboxVal)" v-show="tabidx >'-1'" prop="AdminName" min-width="100" label="项目管理员" key="2" show-overflow-tooltip />
            <el-table-column align="center" v-if="$getColumsFlag('CompanyName',checkboxVal)" prop="CompanyName" min-width="150" label="相关客户" show-overflow-tooltip />
            <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" min-width="120" label="项目新建日期">
              <template slot-scope="scope">
                <span>{{scope.row.AddTime | Time}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" v-if="$getColumsFlag('FollowCount',checkboxVal)" prop="FollowCount" min-width="120" label="项目沟通记录">
              <template slot-scope="scope">
                <span>{{scope.row.FollowCount}}条</span>
              </template>
            </el-table-column>
            <el-table-column align="center" v-if="$getColumsFlag('StatusText',checkboxVal)" prop="StatusText" min-width="100" label="项目状态" />
            <el-table-column align="center" v-if="$getColumsFlag('ProgressTexts',checkboxVal)" v-show="tabidx =='1'" prop="ProgressText" min-width="120" label="转交审核状态" key="3" />
            <el-table-column align="center" v-if="$getColumsFlag('SysUserName',checkboxVal)" prop="SysUserName" min-width="100" label="项目创建人" />
            <el-table-column align="center" fixed="right" label="操作" min-width="100">
              <template slot-scope="scope">
                <el-dropdown trigger="click" v-if="$operatebtns(operates, ['Modify', 'AddCommunication', 'BusinessCommissionSet', 'MessageFeedback', 'ApplyBuyTenderDocument', 'SubmitQuotationReview', 'ServiceCommissionSet', 'RecommendOfficer', 'InitiatingRecruitmentService', 'AddRemind', 'AssignProjectLeader', 'ModifyAdmin'])">
                  <span class="el-dropdown-link" title="编辑">
                    <i class="el-icon-edit-outline setting"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <ul class="popout-list">
                      <el-dropdown-item v-if="(scope.row.Status != '3') && $operatebtn(operates, 'Modify')" @click.native="handleEdit(scope.row,'Modify')">修改</el-dropdown-item>
                      <!-- 营销人员 -->
                      <el-dropdown-item v-if="$operatebtn(operates, 'AddCommunication')" @click.native="AddCommun(scope.row,'AddCommunication')">添加项目沟通记录</el-dropdown-item>
                      <el-dropdown-item v-if="(scope.row.Status == '0' || scope.row.Status == '2') && $operatebtn(operates, 'BusinessCommissionSet')" @click.native="BusinessSet(scope.row,'BusinessCommissionSet')">业务提成设置</el-dropdown-item>
                      <el-dropdown-item v-if="(scope.row.Status == '0' || scope.row.Status == '2') && $operatebtn(operates, 'MessageFeedback')" @click.native="FormerFeedback(scope.row,'MessageFeedback')">标前信息反馈</el-dropdown-item>
                      <el-dropdown-item v-if="(scope.row.Status == '0' || scope.row.Status == '2') && $operatebtn(operates, 'ApplyBuyTenderDocument')" @click.native="ApplyBuy(scope.row,'ApplyBuyTenderDocument')">申请购买招标文件</el-dropdown-item>
                      <el-dropdown-item v-if="(scope.row.Status == '0' || scope.row.Status == '2') && $operatebtn(operates, 'SubmitQuotationReview')" @click.native="SubmitQuotation(scope.row,'SubmitQuotationReview')">提交项目报价审核</el-dropdown-item>
                      <!-- 项目人员/招聘人员 -->
                      <el-dropdown-item v-if="(scope.row.Status == '5' || scope.row.Status == '6') && $operatebtn(operates, 'ServiceCommissionSet')" @click.native="ServiceSet(scope.row,'ServiceCommissionSet')">服务提成设置</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '5' && (scope.row.BusinessType == '4' || scope.row.BusinessType == '5') && $operatebtn(operates, 'RecommendOfficer')" @click.native="LookProve(scope.row,'RecommendOfficer')">推荐人员</el-dropdown-item>
                      <el-dropdown-item v-if="(scope.row.Status == '5' || scope.row.Status == '6') && (scope.row.BusinessType == '1' || scope.row.BusinessType == '2' || scope.row.BusinessType == '3') && $operatebtn(operates, 'InitiatingRecruitmentService')" @click.native="OpenRecruitment(scope.row,'InitiatingRecruitmentService')">发起招聘服务</el-dropdown-item>
                      <el-dropdown-item v-if="$operatebtn(operates, 'AddRemind')" @click.native="OpenProjectRemind(scope.row,'AddRemind')">添加项目提醒</el-dropdown-item>
                      <el-dropdown-item v-if="(scope.row.Status == '5' || scope.row.Status == '6') && (scope.row.BusinessType >= 0 && scope.row.BusinessType <= 5) && $operatebtn(operates, 'AssignProjectLeader')" @click.native="Assignprojectmanager(scope.row,'AssignProjectLeader')">指派项目负责人</el-dropdown-item>
                      <el-dropdown-item key="15" v-if="$operatebtn(operates, 'ModifyAdmin')" @click.native="updateadmin(scope.row,'ModifyAdmin')">修改项目管理员</el-dropdown-item>
                    </ul>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown trigger="click" v-if="scope.row.Status != '3'">
                  <span class="el-dropdown-link" title="项目状态变更">
                    <i class="el-icon-tickets setting"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <ul class="popout-list">
                      <!-- 营销人员 -->
                      <el-dropdown-item v-if="scope.row.Status == '0' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,2,'Modify')">签约完成</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '0' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,1,'Modify')">签约失败</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '2' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,3,'Modify')">转交服务部门</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '1' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,0,'Modify')">重新跟进</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '4' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,0,'Modify')">变更为跟单中</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '4' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,9,'Modify')">取消项目</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '4' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,8,'Modify')">暂停项目</el-dropdown-item>
                      <!-- 项目人员/招聘人员 -->
                      <el-dropdown-item v-if="scope.row.Status == '5' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,6,'Modify')">开始服务</el-dropdown-item>
                      <el-dropdown-item v-if="(scope.row.Status == '5' || scope.row.Status == '6') && $operatebtn(operates, 'Modify') " @click.native="UploadStatus(scope.row,9,'Modify')">取消服务</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '6' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,8,'Modify')">暂停服务</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '6' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,7,'Modify')">完成服务</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '7' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,0,'Modify')">续签项目</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '8' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,5,'Modify')">重启服务</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.Status == '9' && $operatebtn(operates, 'Modify')" @click.native="UploadStatus(scope.row,0,'Modify')">重启项目</el-dropdown-item>
                    </ul>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="foot-operation" v-show="ProjectList.length > 0">
        <el-checkbox v-if="tabidx == '0' || tabidx == '2'|| tabidx == '5' || tabidx == '6'|| tabidx == '8'|| tabidx == '9'" class="footcheck erpcheck" v-model="checked" @change="batchSelectAll">全选</el-checkbox>
        <el-button round v-if="tabidx == '0' && $operatebtn(operates, 'Modify')" class="operation-button" size="mini" @click="BatchStatus(2,'Modify')">签约完成</el-button>
        <el-button round v-if="tabidx == '0' && $operatebtn(operates, 'Modify')" class="operation-button" size="mini" @click="BatchStatus(1,'Modify')">签约失败</el-button>
        <!-- <el-button round v-if="tabidx == '2' && $operatebtn(operates, 'Modify')" class="operation-button" size="mini" @click="BatchStatus(3,'Modify')">转交服务部门</el-button> -->
        <el-button round v-if="(tabidx == '5' || tabidx == '6') && $operatebtn(operates, 'Modify')" class="operation-button" size="mini" @click="BatchStatus(9,'Modify')">取消服务</el-button>
        <el-button round v-if="tabidx == '6' && $operatebtn(operates, 'Modify')" class="operation-button" size="mini" @click="BatchStatus(8,'Modify')">暂停服务</el-button>
        <el-button round v-if="tabidx == '6' && $operatebtn(operates, 'Modify')" class="operation-button" size="mini" @click="BatchStatus(7,'Modify')">完成服务</el-button>
        <el-button round v-if="tabidx == '8' && $operatebtn(operates, 'Modify')" class="operation-button" size="mini" @click="BatchStatus(3,'Modify')">重新服务</el-button>
        <el-button round v-if="tabidx == '9' && $operatebtn(operates, 'Modify')" class="operation-button" size="mini" @click="BatchStatus(0,'Modify')">重启项目</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>

    </div>
    <!-- 添加沟通记录 -->
    <AddCommunication :showAddCommunication="showAddCommunication" @CommunicationSave="CommunicationSave" @closeAddCommunication="closeAddCommunication"></AddCommunication>
    <!-- 业务设置 -->
    <SelectDivided :showDivided="showDivided" :TypeObj="TypeObj" @closeshowDivided="closeshowDivided" @DividedSave="DividedSave"></SelectDivided>
    <!-- 服务设置 -->
    <ServiceSet :showServiceSet="showServiceSet" :TypeObj="TypeObj" @closeshowServiceSet="closeshowServiceSet" @ServiceSetSave="ServiceSetSave"></ServiceSet>
    <!-- 提醒设置 -->
    <AddRemind :showRemind="showRemind" @closeshowAddRemind="closeshowAddRemind" @AddRemindSave="AddRemindSave"></AddRemind>
    <!-- 招标框 -->
    <ApplyBuy :title="ApplyBuyTitle" :showApplyBuy="showApplyBuy" :disabled="disabled" :tempData="tempData" @ApplySave="ApplySave" @closeApplyBuy="closeApplyBuy"></ApplyBuy>
    <!-- 转交服务部门 -->
    <ReferralServiceDepartment :showReferralServiceDepartment='showReferralServiceDepartment'  @closeReferralServiceDepartment="closeReferralServiceDepartment" @referralSubmit="referralSubmit" ></ReferralServiceDepartment>
    <div class="dialog">
      <!-- 修改人 -->
      <!-- <appointee :title="appointeename" :visible="appointeevisible" :contentdata="appointeecontentdata" :treetitle="treetitle" :placetitle="placetitle" @closedialog="closedialog" @saveappointee="saveappointee"></appointee> -->
      <!-- 修改项目管理员 -->
      <designate :title="designatename" :visible="designatevisible" :projectid="ProjectId" :contentdata="designatedata" @closedialog="closedialog" @saveappointee="savedesignate"></designate>
    </div>
  </div>
</template>

<script>
import { GetMyMasterProjectList, AddProjectAssign, AddProjectTenderApply, GetProjectStatusEnum, GetProjectList, GetProjectBusinessType, EditProjectStatus, AddProjectFollow, EditProjectProgress, AddProjectBuzCommision, AddProjectSrvCommision, GetProjectBuzCommisionList, GetProjectSrvCommisionList, EditProjectAssign, ProjectApproval, GetProject } from '@/api/projectManagement.js'
import AddCommunication from './components/AddCommunication'
import ApplyBuy from './components/ApplyBuy.vue'
import SelectDivided from './components/selectDivided'
import ServiceSet from './components/Serviceset'
import AddRemind from '@/components/publicComponents/AddRemind'
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
// import appointee from './components/dialog-designate.vue'
import ModifyStaff from './components/dialog-ModifyStaff.vue'
import designate from './components/dialog-designate'
import { GetBusinessList } from '@/api/Public.js'
import { AddReminds } from '@/api/Remind.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import ReferralServiceDepartment from './components/ReferralServiceDepartment'
import qs from 'qs'
export default {
  components: {
    AddCommunication,
    SelectDivided,
    ServiceSet,
    AddRemind,
    designate,
    ApplyBuy,
    ScreeningComponent,
    ReferralServiceDepartment
  },
  data () {
    return {
      showReferralServiceDepartment:false,
      responsiblePersonId:'',

      tableloading: false,
      searchObject: {
        Name: '',
        SysUserName: '',
        BusinessType: '',
        Priority: '',
        Status: ''
      },
      currentPage: 1,
      PageSize: 10,
      total: 0,
      BusinessList: [],//项目业务类型
      PriorityList: [{
        value: 0,
        describe: '低'
      }, {
        value: 1,
        describe: '中'
      }, {
        value: 2,
        describe: '高'
      }],//项目优先级
      ProjectId: '',//操作的项目Id
      showAddCommunication: false,//添加沟通记录显示
      ProjectList: [],
      multipleSelection: [],
      checked: false,
      tabidx: -1,
      tablist: [],
      showDivided: false,
      showServiceSet: false,
      treetitle: '请选择要修改的同事',
      placetitle: '搜索要修改的同事',
      appointeename: '指派项目负责人',
      appointeevisible: false,
      appointeecontentdata: {},
      TypeObj: {
        BusinessType: '',
        ChangeType: '',
        disabled: ''
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "项目编码", prop: "Code" },
        { label: "项目名称", prop: "Name" },
        { label: "项目类型", prop: "BusinessTypeText" },
        { label: "项目优先级", prop: "Priority" },
        { label: "项目跟单员", prop: "OwnerName" },
        { label: "项目跟单进度", prop: "ProgressText" },
        { label: "项目管理员", prop: "AdminName" },
        { label: "相关客户", prop: "CompanyName" },
        { label: "项目新建日期", prop: "AddTime" },
        { label: "项目沟通记录", prop: "FollowCount" },
        { label: "项目状态", prop: "StatusText" },
        { label: "转交审核状态", prop: "ProgressTexts" },
        { label: "项目创建人", prop: "SysUserName" },
      ],
      showRemind: false,
      designatename: '修改项目管理员',
      designatevisible: false,
      designatedata: {},
      ApplyBuyTitle: '',
      showApplyBuy: false,
      tempData: {},
      disabled: false,
      projectform: {},
      operates: [], // 获取页面权限
    }
  },
  created () {
    // 获取页面权限
    this.operates = this.$route.meta.operations
    console.log(JSON.parse(JSON.stringify(this.operates)));

    this.getProjectType()
    this.getCatagoryType()
    this.getProjectList()
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
    // 切换tab栏
    choosetab (e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.currentPage = 1
        this.tabidx = e.value
        this.getProjectList()
      }
    },
    //获取项目进度状态
    getProjectType () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectStatusEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.tablist = response
          this.tablist.unshift({
            value: -1,
            describe: "全部"
          })
        }
      })
    },
    //获取项目类型数据
    getCatagoryType () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectBusinessType(qs.stringify(obj)).then(response => {
        if (response) {
          this.BusinessList = response
        }
      })
    },
    //搜索
    search () {
      this.currentPage = 1
      this.getProjectList()
    },
    //获取项目数据列表
    getProjectList () {
      this.tableloading = true
      const obj = {
        Name: this.searchObject.Name,
        SysUserName: this.searchObject.SysUserName,
        BusinessType: this.searchObject.BusinessType > '-1' ? this.searchObject.BusinessType : '-1',
        Priority: this.searchObject.Priority > '-1' ? this.searchObject.Priority : '-1',
        Status: this.tabidx,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetMyMasterProjectList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data) {
            this.ProjectList = response.Data
            this.total = response.Total
          } else {
            this.ProjectList = []
            this.total = 0
          }
        } else {
          this.ProjectList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    closeReferralServiceDepartment(data){
      this.showReferralServiceDepartment=data;
    },
    //提交终审事件
    referralSubmit(data){
      let str='Modify'
      const operating = this.$operatedata(this.operates, str)
      let obj = {
        Id:this.responsiblePersonId,
        SysOrgId:data.transactionDepartment,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      ProjectApproval(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.showReferralServiceDepartment=false;
          this.$message({
            type: 'success',
            message: '提交项目到钉钉审批成功!'
          })
          this.getProjectList()
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //单个变更状态
    UploadStatus (data, value, str) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, str)
      let obj = {
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      if (value == 3) {
        //转交服务部门弹窗
        // obj.Id = data.Id
        this.responsiblePersonId=data.Id
        let objTwo = {
          Id: data.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        let IsContinue = true
        showLoading()
        GetProject(qs.stringify(objTwo)).then(res => {
          hideLoading()
          if (res.IsSuccess) {
            this.projectform = res.Data
            let ISMgrPrice = this.projectform.MgrPrice ? true : false
            let ISFirstSign = this.projectform.FirstSign ? true : false
            let ISYearth = this.projectform.Yearth > '-1' ? true : false
            let ISPositionName = this.projectform.PositionName ? true : false
            let ISMarketType = this.projectform.MarketType > '-1' ? true : false
            let ISFirstMonthIncome = this.projectform.FirstMonthIncome ? true : false
            let ISFirstMonthNum = this.projectform.FirstMonthNum ? true : false
            let ISFirstMonthMgrFee = this.projectform.FirstMonthMgrFee ? true : false
            if (!ISMgrPrice || !ISFirstSign || !ISYearth || !ISPositionName || !ISMarketType || !ISFirstMonthIncome || !ISFirstMonthNum || !ISFirstMonthMgrFee) {
              IsContinue = false
            }
            if (!IsContinue) {
              this.$message({
                type: 'error',
                message: '业务交接必填信息缺失,请补充后再转交服务部门'
              })
              setTimeout(() => {
                this.$router.push({
                  path: '/projectManagement/EduitProject',
                  query: {
                    Id: data.Id,
                    IsCheck: true
                  }
                })
              }, 2000)
            } else {
              this.showReferralServiceDepartment=true
              // this.$confirm('你确定提交项目到钉钉审批吗?', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type: 'warning'
              // }).then(() => {
              //   ProjectApproval(qs.stringify(obj)).then(response => {
              //     if (response.IsSuccess) {
              //       this.$message({
              //         type: 'success',
              //         message: '提交项目到钉钉审批成功!'
              //       })
              //       this.getProjectList()
              //     } else {
              //       this.$message({
              //         type: 'error',
              //         message: response.MessageContent
              //       })
              //     }

              //   })
              // }).catch(() => {
              //   this.$message({
              //     type: 'info',
              //     message: '已取消操作'
              //   })
              // })
            }
          } else {
            this.$message({
              message: res.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        obj.Id = data.Id
        obj.Status = value
        this.$confirm('你确定修改此项目状态吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          showLoading()
          EditProjectStatus(qs.stringify(obj)).then(response => {
            hideLoading()
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '变更项目状态成功!'
              })
              this.getProjectList()
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
      }

    },
    //批量变更状态
    BatchStatus (value, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      if (this.multipleSelection.length) {
        let arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].Id)
        }
        let param = {
          Id: arr.join(','),
          Status: value,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        this.$confirm('你确定批量修改项目状态吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          showLoading()
          EditProjectStatus(qs.stringify(param)).then(response => {
            hideLoading()
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '变更项目状态成功!'
              })
              this.getProjectList()
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
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要操作的项目'
        })
      }
    },
    //标前信息反馈
    FormerFeedback (data, op) {
      window.localStorage.removeItem('multipleBreadpath')
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))

      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/projectManagement/AddInformationFeedback',
        query: {
          Id: data.Id
        }
      })
    },
    //提交项目审核报价
    SubmitQuotation (data, op) {
      window.localStorage.removeItem('multipleBreadpath')
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))

      this.$router.push({
        path: '/projectManagement/ProjectReviewQuotation',
        query: {
          Id: data.Id
        }
      })
    },
    //打开申请招标
    ApplyBuy(data, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op);
        let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      window.localStorage.setItem("operating", JSON.stringify(operating));
      // this.ProjectId = data.Id
      window.localStorage.setItem("FeedbackProjectData", JSON.stringify(data));
      this.$router.push({
        path: "/BiddingManagement/ApplyPurchaseBiddingFile",
        query: {
          Id: data.Id
        }
      });
      // this.ApplyBuyTitle = '申请购买招标文件信息'
      // this.showApplyBuy = true
    },
    //招标信息保存
    ApplySave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      data.ProjectId = this.ProjectId
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      showLoading()
      AddProjectTenderApply(qs.stringify(data)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '申请购买招标文件成功!'
          })
          this.showApplyBuy = false
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })

    },
    //关闭招标框
    closeApplyBuy (val) {
      this.disabled = false
      this.showApplyBuy = val
    },
    //打开添加提醒
    OpenProjectRemind (data, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.showRemind = true
    },
    //保存添加提醒
    AddRemindSave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      showLoading()
      data.menuid = operating.MenuId,
        data.operationcode = operating.OperationCode
      data.Type = 1
      AddReminds(qs.stringify(data)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加项目提醒成功!'
          })
          this.showRemind = false
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //关闭添加提醒
    closeshowAddRemind (val) {
      this.showRemind = val
    },
    //打开添加沟通记录
    AddCommun (data, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.ProjectId = data.Id
      this.showAddCommunication = true
    },
    //关闭添加沟通记录
    closeAddCommunication (val) {
      this.showAddCommunication = val
    },
    //保存添加沟通记录
    CommunicationSave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      showLoading()
      let AddProject = {
        SysUserId: data.SysUserId,
        ProjectId: this.ProjectId,
        Content: data.Content,
        FollowTime: data.FollowTime,
        Progress: data.Progress,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      AddProjectFollow(qs.stringify(AddProject)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加沟通记录成功!'
          })
          this.showAddCommunication = false
          this.getProjectList()
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //打开项目详情
    PorjectDetails (data, op) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      //判断是否能查看
      let operatingIndex=this.operates.findIndex(v=>v.OperationCode==op)
      const { href } = this.$router.resolve({
        path: '/projectManagement/ProjectDetail',
        query: {
          Id: data.Id
        }
      })
      //判断是否能查看
      if(operatingIndex!=-1){
        window.open(href, '_blank')
      }else{
        this.$message({
          message: '暂无查看权限',
          type: 'warning'
        })
      }
    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      this.getProjectList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getProjectList()
    },
    // 表头多选
    handleSelectionChange (value) {
      if (this.ProjectList.length > 0) {
        this.checked = value.length == this.ProjectList.length
        this.multipleSelection = value
      }

    },
    // 下方全选
    batchSelectAll () {
      if (this.ProjectList.length > 0) {
        this.$refs.industrtTable.toggleAllSelection(this.checked)
      }

    },
    //打开业务设置
    BusinessSet (data, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.ProjectId = data.Id
      let dataArray = []
      let obj = {
        ProjectId: data.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      GetProjectBuzCommisionList(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            dataArray = response.Data
            this.TypeObj.BusinessType = dataArray[0].BusinessType
            this.TypeObj.ChangeType = dataArray[0].ChangeType
            this.TypeObj.disabled = true
          } else {
            dataArray = []
            this.TypeObj.disabled = false
          }
          this.showDivided = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //保存业务分成
    DividedSave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      data.forEach((item, index, array) => {
        item.ProjectId = this.ProjectId
      })
      let obj = {
        AddProjectBuzCommisionList: data,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      AddProjectBuzCommision(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加业务设置成功!'
          })
          this.showDivided = false
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //关闭设置分成窗口
    closeshowDivided (val) {
      this.showDivided = val
    },
    //打开服务设置
    ServiceSet (data, op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      let dataArray = []
      let obj = {
        menuid: operating.MenuId,
        operationcode: operating.OperationCode,
        ProjectId: data.Id
      }
      this.ProjectId = data.Id
      showLoading()
      GetProjectSrvCommisionList(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            dataArray = response.Data
            this.TypeObj.BusinessType = dataArray[0].BusinessType
            this.TypeObj.ChangeType = dataArray[0].ChangeType
            this.TypeObj.disabled = true

          } else {
            dataArray = []
            this.TypeObj.disabled = false
          }
          this.showDivided = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 推荐人员
    LookProve (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/RecruitmentManagement/InformationManagement'
      })
    },
    //关闭服务设置
    closeshowServiceSet (val) {
      this.showServiceSet = val
    },
    //保存服务设置
    ServiceSetSave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      data.forEach((item, index, array) => {
        item.ProjectId = this.ProjectId
      })
      let obj = {
        AddProjectSrvCommisionList: data,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      showLoading()
      AddProjectSrvCommision(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加服务设置成功!'
          })
          this.showServiceSet = false
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //跳转发起招聘服务
    OpenRecruitment (data, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.$router.push({
        path: '/projectManagement/RecruitmentService',
        query: {
          Id: data.Id
        }
      })
    },
    updateadmin (e, op) {
      // 废弃
      // if (this.multipleSelection.length !== 1) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请选择一个项目进行修改'
      //   })
      // } else {
      //   // this.appointeevisible = true
      //   // // 是否修改管理员
      //   // this.appointeename = '修改项目管理员'
      //   // this.treetitle = '请选择要修改的同事'
      //   // this.placetitle = '搜索要修改的同事'
      //   this.designatename = '修改项目管理员'
      //   this.designatevisible = true
      // }
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      // 修改
      this.ProjectId = e.Id
      this.designatename = '修改项目管理员'
      this.designatevisible = true
    },
    // 指派项目管理员
    Assignprojectmanager (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.ProjectId = e.Id
      this.designatename = '指派项目管理员'
      this.designatevisible = true
    },
    // 保存项目管理员
    savedesignate (e) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      let arry = []
      for (let i = 0; i < e.length; i++) {
        if (e[i].Type && e[i].Type.length) {
          for (let j = 0; j < e[i].Type.length; j++) {
            arry.push({
              Type: e[i].Type[j],
              UserId: e[i].Id,
              Remark: e[i].Remark
            })
          }
        } else {
          arry.push({
            Type: e[i].Type[0],
            UserId: e[i].Id,
            Remark: e[i].Remark
          })
        }
      }
      let obj = {
        // Id: 
        ProjectId: this.ProjectId,
        Members: arry,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      if (this.designatename == '修改项目管理员') {
        showLoading()
        EditProjectAssign(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.designatevisible = false
            this.getProjectList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        showLoading()
        AddProjectAssign(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              message: '指派项目负责人成功',
              type: 'success'
            })
            this.designatevisible = false
            this.getProjectList()
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }

    },
    closedialog () {
      this.appointeevisible = false
      this.designatevisible = false
    },
    saveappointee (e) {
      // // 修改项目负责人
      // let obj = {
      //   ProjectId: this.multipleSelection[0].Id,
      //   Master: e.Id,
      //   Salary: 0,
      //   Insurance: 0,
      //   Fund: 0
      // }
      // EditProjectAssign(qs.stringify(obj)).then(response => {
      //   if (response.IsSuccess) {
      //     this.$message({
      //       type: 'success',
      //       message: '修改成功'
      //     })
      //     this.appointeevisible = false
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: response.MessageContent
      //     })
      //   }
      // })
    },
    //新增项目
    AddProject () {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      this.$router.push({
        path: '/projectManagement/AddProject'
      })
    },
    //修改项目
    handleEdit (data, op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
        let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      this.$router.push({
        path: '/projectManagement/EduitProject',
        query: {
          Id: data.Id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.industry-box {
  height: 100%;
}
.tableHeader-button {
  height: 40px;
  float: right;
  margin: 0 20px 0 0;
}
.foot-operation {
  background: #fff;
  padding-left: 35px;
  padding-bottom: 20px;
}
.table-content {
  position: relative;
  background: #f0f4fa;
  padding: 0;
  .screening-compent {
      float: right;
      margin-bottom: 10px;
      margin-right: 15px;
    }
  .roletable-box {
    background: #fff;
    padding: 20px;
  }
}
.pagina-fonter {
  margin: 0;
  background-color: #fff;
  padding-bottom: 30px;
}
.el-dropdown-link {
  margin: 0 8px;
}
.setting {
  font-size: 24px;
  cursor: pointer;
}
</style>