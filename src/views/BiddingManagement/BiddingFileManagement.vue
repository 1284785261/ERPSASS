<!--标前、标后信息管理-->
<template>
  <div class="BiddingFileManagement-Box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="项目名称" label-width="85px">
            <el-input class="erpsearchinput selectWidth" clearable placeholder="请输入项目名称" size="small" v-model="searchObject.ProjectName">
              <i class="el-icon-search el-input__icon" slot="suffix" />
            </el-input>
          </el-form-item>
          <el-form-item label="招标单位" label-width="90px">
            <el-input class="erpsearchinput selectWidth" clearable placeholder="请输入招标单位" size="small" v-model="searchObject.CompanyName">
              <i class="el-icon-search el-input__icon" slot="suffix" />
            </el-input>
          </el-form-item>
          <el-form-item label="开标截止时间" label-width="120px">
            <el-select class="SigningTime select-input" size="small" v-model="SigningTimeYear" @click.native="GetYear" clearable v-el-select-loadmore="selectLoadmore">
              <el-option v-for="(item,index) in SigningTimeYearList" :key="index" :label="item.describe" :value="item.value"></el-option>
            </el-select>
            <span class="SpanText">年</span>
            <el-select class="SigningTime select-input" size="small" v-model="SigningTimeMonth" @click.native="GetMonth" clearable>
              <el-option v-for="(item,index) in SigningTimeMonthList" :key="index" :label="item.describe" :value="item.value"></el-option>
            </el-select>
            <span class="SpanText">月</span>
            <el-select class="SigningTime select-input" size="small" v-model="SigningTimeDay" @click.native="GetDay" clearable>
              <el-option v-for="(item,index) in SigningTimeDayList" :key="index" :label="item.describe" :value="item.value"></el-option>
            </el-select>
            <span class="SpanText">日</span>
          </el-form-item>
          <el-form-item label="跟单员" label-width="80px">
            <el-input class="erpsearchinput selectWidth" clearable placeholder="请输入跟单员" size="small" v-model="searchObject.OwnerName">
              <i class="el-icon-search el-input__icon" slot="suffix" />
            </el-input>
          </el-form-item>
          <el-form-item label="项目招投标负责人" label-width="150px">
            <el-input class="erpsearchinput selectWidth" clearable placeholder="请输入项目招投标负责人" size="small" v-model="searchObject.ProjectBiddingUser">
              <i class="el-icon-search el-input__icon" slot="suffix" />
            </el-input>
          </el-form-item>
        </el-form>
        <el-button class="search-button" size="mini" round @click="reserve">重置</el-button>
        <el-button class="search-button" size="mini" round @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" @click="AddBiddingApply('Add')">添加标前、标后信息反馈</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'Export')" class="addmenu erpbtn" @click="ExportBiddingApply('Export')">批量导出</el-button>
        <div class="screening-compent">
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <!-- <el-table-column align="center" type="selection" width="55" fixed="left" label="全选" /> -->
          <el-table-column align="center" v-if="$getColumsFlag('Id',checkboxVal)" prop="Id" label="序号" min-width="90" />
          <el-table-column align="center" v-if="$getColumsFlag('Times',checkboxVal)" prop="BiddingOpeningDeadline" label="开标截止时间" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.BiddingOpeningDeadline | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('ProjectName',checkboxVal)" prop="ProjectName" label="项目名称" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('CompanyName',checkboxVal)" prop="CompanyName" label="招标单位" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('BusinessTypeText',checkboxVal)" prop="BusinessTypeText" label="业务类型" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Bidder',checkboxVal)" prop="BiddingBfCompanyName" label="投标单位" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Merchandiser',checkboxVal)" prop="OwnerName" label="跟单员" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('AuthorizedRepresentative',checkboxVal)" prop="BiddingAgency" label="授权代表" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('BidSecurityAmount',checkboxVal)" prop="SecurityAmount" label="投标保证金额（元）" min-width="160" />
          <el-table-column align="center" v-if="$getColumsFlag('ProjectStage',checkboxVal)" prop="ProjectStage" label="项目阶段" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('ApprovalStatus',checkboxVal)" prop="Status" label="审批状态" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.Status==0">待审批</span>
              <span v-if="scope.row.Status==1">审批中</span>
              <span v-if="scope.row.Status==2">审批通过</span>
              <span v-if="scope.row.Status==3">审批拒绝</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('ProjectBiddingUser',checkboxVal)" prop="SysUserName" label="项目招投标负责人" min-width="160" />
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" label="申请时间" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','Delete','Down','View','Export']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="LookBiddingApply(scope.row,'View')">查看</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && (scope.row.Status == '0' || scope.row.Status == '3')" @click.native="EditBiddingApply(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && (scope.row.Status == '0' || scope.row.Status == '3')" @click.native="SubmittedReviewApply(scope.row,'Modify')">提交送审</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify') && scope.row.Status == '1'" @click.native="WithdrawBidding(scope.row,'Modify')">撤回</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Import')" @click.native="UploadBidding(scope.row,'Import')">上传标书附件</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete') && (scope.row.Status == '0' || scope.row.Status == '3')" @click.native="DeleteBidding(scope.row,'Delete')">删除</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Export')" @click.native="ExportBidding(scope.row,'Export')">导出</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagina-fonter">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="tag-container">
      <el-dialog :close-on-click-modal="false" title="选择时间段导出" class="dialog-box" append-to-body :visible.sync="showDialog" :show-close="false" :destroy-on-close="true" width="360px" @close="close">
        <i class="el-icon-circle-close closeButton" @click="close"></i>
        <div class="condition">
          <el-date-picker class="picker" style="width: 280px;margin-bottom:30px;" value-format="yyyy-MM-dd HH:mm:ss" v-model="TimeDatas" type="daterange" size="small" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div slot="footer" class="dialog-footer-multiple">
          <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
          <el-button round class="erpbtn" size="small" @click="Save('ruleForm')">批量导出</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { GetBiddingInformationBasePageList, EditBiddingInformationBaseStatus, DeleteBiddingInformationBase, ExportBiddingInformation } from '@/api/Bidding.js'
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import { MenuIdDate, showLoading, hideLoading, copy } from '@/utils/CustomValidation'
export default {
  directives: {
    'el-select-loadmore': {
      bind (el, binding) {
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
        SELECTWRAP_DOM.addEventListener('scroll', function () {
          const condition = this.scrollHeight - (this.scrollTop+10) <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  components: { ScreeningComponent },
  data () {
    return {
      searchObject: {
        ProjectName: '',
        CompanyName: '',
        ApprovalTimeLimitDate: '',
        OwnerName: '',
        ProjectBiddingUser: ''
      },
      SigningTimeYear: '',
      SigningTimeMonth: '',
      SigningTimeDay: '',
      SigningTimeYearList: [],
      SigningTimeMonthList: [],
      SigningTimeDayList: [],
      TimeDatas: '',
      showDialog: false,
      tableloading: false,
      tableData: [],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      checkboxVal: [],
      formTheadOptions: [
        { label: "序号", prop: "Id" },
        { label: "开标截止时间", prop: "Times" },
        { label: "项目名称", prop: "ProjectName" },
        { label: "招标单位", prop: "CompanyName" },
        { label: "业务类型", prop: "BusinessTypeText" },
        { label: "投标单位", prop: "Bidder" },
        { label: "跟单员", prop: "Merchandiser" },
        { label: "授权代表", prop: "AuthorizedRepresentative" },
        { label: "投标保证金额（元）", prop: "BidSecurityAmount" },
        { label: "项目阶段", prop: "ProjectStage" },
        { label: "审批状态", prop: "ApprovalStatus" },
        { label: "项目招投标负责人", prop: "ProjectBiddingUser" },
        { label: "申请时间", prop: "AddTime" },
      ],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
      fileter: {

      },
      IdArr: [],
      nums: 200,
      messagesNumber: 0,
      withdrawStatus: true,
    }
  },
  watch: {
    SigningTimeYear () {
      // if(this.SigningTimeYear!=''){
      //         for(let i=1;i<13;i++){
      //       let obj= {
      //         value:i,
      //         describe:i
      //       }
      //       this.SigningTimeMonthList.push(obj)
      //     }
      //   }
      // this.SigningTimeMonth=''
      // this.SigningTimeDay=''
      // this.SigningTimeMonthList=[]
      if (this.SigningTimeYear != '') {
        for (let i = 1; i < 13; i++) {
          let obj = {
            value: i,
            describe: i
          }
          this.SigningTimeMonthList.push(obj)
        }
      } else {
        this.SigningTimeMonth = ''
        this.SigningTimeDay = ''
        this.SigningTimeMonthList = []
        this.SigningTimeDayList = []
      }
    },
    SigningTimeMonth () {
      this.SigningTimeDay = ''
      if (this.SigningTimeMonth == '') {
        this.SigningTimeDay = ''
        this.SigningTimeDayList = []
      }
      let days = 0
      if (this.SigningTimeMonth == 1 || this.SigningTimeMonth == 3 || this.SigningTimeMonth == 5 || this.SigningTimeMonth == 7 || this.SigningTimeMonth == 8 || this.SigningTimeMonth == 10 || this.SigningTimeMonth == 12) {
        days = 32
      } else if (this.SigningTimeMonth == 2) {
        if (this.SigningTimeYear % 4 == 0 && this.SigningTimeYear % 100 != 0 || this.SigningTimeYear % 400 == 0) {
          days = 30
        } else {
          days = 29
        }
      } else if (this.SigningTimeMonth == '') {
        days = 0
      } else {
        days = 31
      }
      this.SigningTimeDayList = []
      for (let i = 1; i < days; i++) {
        let obj = {
          value: i,
          describe: i
        }
        this.SigningTimeDayList.push(obj)
      }
    },
  },
  created () {
    console.log(this.$route.meta.operations);
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.GetBiddingInformationBasePageList(this.operatiOBj)
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
    this.Addnums(this.nums)
    // let date=new Date();
    // this.SigningTimeYear=date.getFullYear()
    // this.SigningTimeMonth=date.getMonth() + 1
    // this.SigningTimeDay=date.getDate()
    // if(this.SigningTimeYear!=''){
    //     for(let i=1;i<13;i++){
    //   let obj= {
    //     value:i,
    //     describe:i
    //   }
    //   this.SigningTimeMonthList.push(obj)
    // }
    //  }
  },
  methods: {
    GetYear () {
      let date = new Date();
      this.SigningTimeYear = date.getFullYear()
    },
    GetMonth () {
      if (this.SigningTimeYear != '') {
        let date = new Date();
        this.SigningTimeMonth = date.getMonth() + 1
      }
    },
    GetDay () {
      if (this.SigningTimeYear != '' || this.SigningTimeMonth != '') {
        let date = new Date();
        this.SigningTimeDay = date.getDate()
      }
    },
    Addnums (num) {
      this.SigningTimeYearList = []
      for (let i = 1980; i < 1980 + num; i++) {
        let obj = {
          value: i,
          describe: i
        }
        this.SigningTimeYearList.push(obj)
      }
    },
    selectLoadmore () {
      this.nums = this.nums + 100
      this.Addnums(this.nums)
    },
    //修改
    Save () {
      let obj = {
        IdArr: '',
        BiddingOpeningDeadlineStart: this.TimeDatas[0],
        BiddingOpeningDeadlineEnd: this.TimeDatas[1],
        menuid: MenuIdDate(),
        operationcode: 1
      }
      ExportBiddingInformation(obj).then(res => {
        if (res.MessageCode == 0) {
          window.open(res.Data.Url)
          this.messagesNumber = res.Data.Number
          this.$message({
            type: 'success',
            message: `导出成功</br></br>已成功导出${this.messagesNumber}条`,
            dangerouslyUseHTMLString: true,
            showClose: true,
            duration: 0,
          })
          this.close()
          this.TimeDatas = ''
        } else {
          this.$message({
            type: 'error',
            message: res.MessageContent
          })
        }
      })
    },
    //获取标前标后信息管理分页列表
    GetBiddingInformationBasePageList (operat) {
      let obj = {
        CompanyName: this.searchObject.CompanyName,
        ProjectName: this.searchObject.ProjectName,
        BiddingOpeningDeadlineYear: this.SigningTimeYear,
        BiddingOpeningDeadlineMonth: this.SigningTimeMonth,
        BiddingOpeningDeadlineDay: this.SigningTimeDay,
        OwnerName: this.searchObject.OwnerName,
        SysUserName: this.searchObject.ProjectBiddingUser,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      showLoading()
      GetBiddingInformationBasePageList(obj).then(res => {
        hideLoading()
        if (res.MessageCode == 0 && res.Data.length > 0) {
          this.tableData = res.Data
          this.total = res.Total
        } else {
          this.tableData = []
          this.total=0
        }
      })
    },
    //关闭导出弹窗
    close () {
      this.showDialog = false
    },
    //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
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
    //重置
    reserve () {
      this.searchObject.ProjectName = ''
      this.searchObject.CompanyName = ''
      this.SigningTimeYear = ''
      this.SigningTimeMonth = ''
      this.SigningTimeDay = ''
      this.searchObject.OwnerName = ''
      this.searchObject.ProjectBiddingUser = ''
    },
    //查询
    searchtable () {
      this.GetBiddingInformationBasePageList(this.operatiOBj)
    },
    //添加标前标后信息反馈
    AddBiddingApply (e) {
      this.$router.push({
        name: '添加投标信息反馈',
        path: '/BiddingManagement/AddBidInformationFeedback',
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        UserName: localStorage.getItem('Current').split('"')[5],
        name: '添加标前标后信息反馈'
      }))
    },
    //查看
    LookBiddingApply (e, str) {
      this.$router.push({
        name: '添加投标信息反馈',
        path: '/BiddingManagement/AddBidInformationFeedback',
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        Id: e.Id,
        name: '查看标前标后信息反馈'
      }))
    },
    //修改
    EditBiddingApply (e, str) {
      this.$router.push({
        name: '添加投标信息反馈',
        path: '/BiddingManagement/AddBidInformationFeedback',
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        Id: e.Id,
        name: '修改标前标后信息反馈'
      }))
    },
    //提交送审
    SubmittedReviewApply (e, str) {
      let codes = this.$operatedata(this.operates, str).MenuId
      let obj = {
        Id: e.Id,
        Status: 1,
        menuid: codes,
        operationcode: str
      }
      EditBiddingInformationBaseStatus(obj).then(res => {
        if (res.MessageCode == 0) {
          this.withdrawStatus = false
          this.$message({
            type: 'success',
            message: '提交送审成功'
          })
          // this.reserve()
          this.GetBiddingInformationBasePageList(this.operatiOBj)
          setTimeout(() => {
            this.withdrawStatus = true
          }, 15000)
        } else {
          this.$message({
            type: 'error',
            message: res.MessageContent
          })
        }
      })
    },
    //撤回
    WithdrawBidding (e, str) {
      if (this.withdrawStatus == true) {
        let codes = this.$operatedata(this.operates, str).MenuId
        let obj = {
          Id: e.Id,
          Status: 0,
          menuid: codes,
          operationcode: str
        }
        EditBiddingInformationBaseStatus(obj).then(res => {
          if (res.MessageCode == 0) {
            this.$message({
              type: 'success',
              message: '撤回成功'
            })
            // this.reserve()
            this.GetBiddingInformationBasePageList(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: res.MessageContent
            })
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请稍等后撤回'
        })
      }
    },
    //上传标书附件
    UploadBidding (e, str) {
      this.$router.push({
        name: '添加投标信息反馈',
        path: '/BiddingManagement/AddBidInformationFeedback',
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        Id: e.Id,
        name: '上传标书附件'
      }))
    },
    //删除
    DeleteBidding (e, str) {
      let codes = this.$operatedata(this.operates, str).MenuId
      this.$confirm('此操作将永久删除该信息是否继续删除','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
      let obj = {
        Id: e.Id,
        menuid: codes,
        operationcode: str
      }
      DeleteBiddingInformationBase(obj).then(res => {
        if (res.MessageCode == 0) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // this.reserve()
          this.GetBiddingInformationBasePageList(this.operatiOBj)
        } else {
          this.$message({
            type: 'error',
            message: res.MessageContent
          })
        }
      })
    }).catch(()=>{
      this.$message({
          type: 'info',
          message: '已取消删除'
        })
    })
  },
    //导出
    ExportBidding (e, str) {
      let codes = this.$operatedata(this.operates, str).MenuId
      let obj = {
        IdArr: e.Id,
        menuid: codes,
        operationcode: str
      }
      ExportBiddingInformation(obj).then(res => {
        if (res.MessageCode == 0) {
          window.open(res.Data.Url)
          this.$message({
            type: 'success',
            message: '导出成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.MessageContent
          })
        }
      })
    },
    //批量导出
    ExportBiddingApply (str) {
      this.showDialog = true
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      // this.reserve()
      this.GetBiddingInformationBasePageList(this.operatiOBj)
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      // this.reserve()
      this.GetBiddingInformationBasePageList(this.operatiOBj)
    },
  }
}
</script>
<style lang="scss" scoped>
.BiddingFileManagement-Box {
  // /deep/.el-message{
  //   /deep/.el-icon-success:before{
  //     font-size: 30px;
  //   }
  // }
  .el-message-box {
    width: 350px;
  }
  .selectWidth {
    width: 160px !important;
  }
  .SpanText {
    font-size: 16px;
    font-weight: 700;
    color: $erp666;
  }
  .SigningTime {
    margin: 0 5px !important;
    width: 120px !important;
  }
  .operate-table {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 0;
    .watchcode {
      color: #1588f8;
      cursor: pointer;
    }
  }
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
        .SigningTime {
          margin: 0 5px !important;
          width: 120px !important;
        }
      }
      .el-input {
        display: inline-block;
        width: 216px;
      }
    }
  }
  .operate-top {
    margin: 26px 24px 8px 24px;
    float: right;
    .screening-compent {
      float: right;
    }
  }
}
</style>