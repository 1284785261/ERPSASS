//招投标文件购买管理
<template>
  <div class="ContractFileManagement-Box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="项目名称" label-width="80px">
            <el-input v-model.trim="ProjectName" clearable class="selectWidth select-input" suffix-icon="el-icon-search" placeholder="请输入项目名称进行查询" />
          </el-form-item>
          <el-form-item label="招标单位" label-width="80px">
            <el-input v-model.trim="BiddingUnit" clearable class="selectWidth select-input" suffix-icon="el-icon-search" placeholder="请输入招标单位名称进行查询" />
          </el-form-item>
          <el-form-item label="购买标书截止时间" label-width="150px">
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
          <el-form-item label="跟单员" label-width="65px">
            <el-input v-model.trim="Merchandiser" clearable class="selectWidth select-input" suffix-icon="el-icon-search" placeholder="请输入跟单员名称进行查询" />
          </el-form-item>
        </el-form>
        <el-button class="search-button" size="mini" round @click="Reset">重置</el-button>
        <el-button class="search-button" size="mini" round @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="operate-top">
      <el-button size="small" class="addmenu erpbtn" @click.native="PurchaseBiddingFile">申请购买招标文件</el-button>
      <div class="screening-compent">
        <!-- 筛选列组件 -->
        <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
      </div>
    </div>
    <!-- 列表 -->
    <div class="operate-table">
      <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableList" max-height="600" tooltip-effect="dark" @select="handleSelectionChange">
        <el-table-column align="center" v-if="$getColumsFlag('ContractCode',checkboxVal)" prop="Id" label="序号" fixed min-width="120" show-overflow-tooltip />
        <el-table-column align="center" v-if="$getColumsFlag('ContractName',checkboxVal)" prop="DeadlineForPurchasingBids" min-width="180" label="购买标书截止时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.DeadlineForPurchasingBids | YYMMddhhmmssTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" v-if="$getColumsFlag('ContractTypeText',checkboxVal)" prop="ProjectName" label="项目名称" min-width="160" show-overflow-tooltip />
        <el-table-column align="center" v-if="$getColumsFlag('BusinessTypeText',checkboxVal)" prop="CompanyName" label="招标单位" min-width="160" show-overflow-tooltip />
        <el-table-column align="center" v-if="$getColumsFlag('ArchiveType',checkboxVal)" prop="BiddingAgency" label="投标单位" min-width="100" show-overflow-tooltip />
        <el-table-column align="center" v-if="$getColumsFlag('SysUserName',checkboxVal)" prop="OwnerName" label="跟单员" min-width="120" />
        <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AuthorizedSysUser" label="授权代表" min-width="120" show-overflow-tooltip />
        <el-table-column align="center" v-if="$getColumsFlag('ArchiveTime',checkboxVal)" prop="Account" label="招标文件费用" min-width="120" show-overflow-tooltip />
        <el-table-column align="center" v-if="$getColumsFlag('ArchiveStatus',checkboxVal)" prop="PurchaseBidingMode" label="购买标书方式" min-width="120" />
        <el-table-column align="center" v-if="$getColumsFlag('ArchivesCabinetCode',checkboxVal)" prop="StatusText" label="审批状态" min-width="120" />
        <el-table-column align="center" v-if="$getColumsFlag('AttachUrl',checkboxVal)" prop="AddTime" label="申请时间" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" prop="Name" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item @click.native="lookUp(scope.row)">查看</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.Status==0||scope.row.Status==3" @click.native="Modify(scope.row)">修改</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.Status==0||scope.row.Status==3" @click.native="SubmitApproval(scope.row)">提交送审 </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.Status==1" @click.native="withdraw(scope.row)">撤回</el-dropdown-item>
                  <el-dropdown-item v-if="$operatebtn(operates, 'Delete')&&scope.row.Status!=2&&scope.row.Status!=1" @click.native="Delete(scope.row,'Delete')">删除</el-dropdown-item>
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
    <ViewPurchaseBidding :ShowId="ShowId" :showContract="showContract" @isHide="isHide"></ViewPurchaseBidding>
  </div>
</template>
<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import { AddReminds } from '@/api/Remind.js'
import ViewPurchaseBidding from './components/ViewPurchaseBidding.vue'
import { uuid } from '@/utils/CustomValidation.js'
import SupperUploader from '@/utils/SupperUploader'
import { GetBiddingDocumentPageList, DeleteBiddingDocuments, EditBiddingDocumentsStatus } from '@/api/Bidding.js'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import axios from 'axios'
import filters from '@/utils/filters'
import qs from 'qs'
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
  components: { ScreeningComponent, ViewPurchaseBidding },
  data () {
    return {
      showContract: false,
      isImg: 1,
      previewFileUrl: '',
      titlename: '合同模板预览',
      iframeShow: false,
      SigningTimeYearList: [],
      SigningTimeMonthList: [],
      SigningTimeDayList: [],
      ProjectName: '',
      BiddingUnit: '',
      ContractTypeList: [],
      BusinessType: '',
      BusinessTypeList: [],
      dialogTitle: '上传文件信息',
      showConfirmReceipt: false,
      Total: 0,
      OperationLogList: [],
      showOperationLogDetails: false,
      AffiliatedCompanyLists: [],
      FileTypeList: [],
      OperationType: -1,
      ArchiveModeList: [{
        value: 0,
        describe: '纸质存档'
      }, {
        value: 1,
        describe: '电子存档'
      }],
      ArchiveStatusList: [{
        value: 0,
        describe: '否'
      }, {
        value: 1,
        describe: '是'
      }],
      dataObject: {
        AffiliatedCompany: '',
        FileType: '',
        FileTime: '',
        ArchiveMode: '',
        ArchiveStatus: '',
        FilingCabinetNo: '',
        SelectFile: '',
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "序号", prop: "ContractCode" },
        { label: "购买标书截止时间", prop: "ContractName" },
        { label: "项目名称", prop: "ContractTypeText" },
        { label: "招标单位", prop: "BusinessTypeText" },
        { label: "投标单位", prop: "ArchiveType" },
        { label: "跟单员", prop: "SysUserName" },
        { label: "授权代表", prop: "AddTime" },
        { label: "招标文件费用", prop: "ArchiveTime" },
        { label: "购买标书方式", prop: "ArchiveStatus" },
        { label: "审批状态", prop: "ArchivesCabinetCode" },
        { label: "申请时间", prop: "AttachUrl" },
      ],
      ModifyId: 0,
      contractId: 0,
      SysUserName: '',
      Ids: [],
      DocumentCode: '',
      fileloading: false,
      operateform: [],
      dialogVisible: false,
      tabidx: -1,
      ArchivesCabinetId: 0,
      AffiliatedCompany: '',
      FileType: '',
      FileTime: '',
      SigningTime: '',
      SigningTimeYear: '',
      SigningTimeMonth: '',
      SigningTimeDay: '',
      Merchandiser: '',
      YearData: '',
      MonthData: '',
      DayData: '',
      FileList: [],
      allchecked: false,
      AffiliatedCompanyList: [],
      AffiliatedCompanyText: '',
      YearDataList: [],
      MonthDataList: [],
      DayDataList: [],
      StorageStatus: [
        { value: -1, describe: "全部" },
        { value: 0, describe: "待存档" },
        { value: 1, describe: "已存档" }],
      tableList: [],
      tableloading: false,
      currentPage: 1,
      PageSize: 10,
      total: 0,
      Idx: 0,
      EndTimes: '',
      StartTimes: '',
      Modifiers: '',
      ShowId: 0,
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
      fileter: {

      },
      IdArr: [],
      nums: 200,
      withdrawStatus: true,
    }
  },
  created () {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.GetBiddingDocumentPageList()
      this.Addnums(this.nums)
      // let date=new Date();
      // this.SigningTimeYear=date.getFullYear()
      // this.SigningTimeMonth=date.getMonth() + 1
      // this.SigningTimeDay=date.getDate()
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  watch: {
    FileType (newval, oldval) {
      this.BusinessType = ''
      this.ContractType = ''
    },
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
  methods: {
    //获取年
    GetYear () {
      let date = new Date();
      this.SigningTimeYear = date.getFullYear()
    },
    //获取月
    GetMonth () {
      if (this.SigningTimeYear != '') {
        let date = new Date();
        this.SigningTimeMonth = date.getMonth() + 1
      }
    },
    //获取日
    GetDay () {
      if (this.SigningTimeYear != '' || this.SigningTimeMonth != '') {
        let date = new Date();
        this.SigningTimeDay = date.getDate()
      }
    },
    //关闭查看详情
    isHide (e) {
      this.showContract = e
    },
    //查看
    lookUp (e) {
      this.showContract = true
      this.ShowId = e.Id
    },
    //提交送审
    SubmitApproval (e) {
      let obj = {
        Id: e.Id,
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      EditBiddingDocumentsStatus(obj).then(res => {
        if (res.MessageCode == 0) {
          this.withdrawStatus = false
          this.$message({
            type: 'success',
            message: '提交送审成功'
          })
          this.GetBiddingDocumentPageList()
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
    withdraw (e) {
      if (this.withdrawStatus == true) {
        let obj = {
          Id: e.Id,
          Status: 0,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        EditBiddingDocumentsStatus(obj).then(res => {
          if (res.MessageCode == 0) {
            this.$message({
              type: 'success',
              message: '撤回成功'
            })
            this.GetBiddingDocumentPageList()
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
    //申请购买招标文件
    PurchaseBiddingFile () {
      this.$router.push({
        name: '申请购买招标文件',
        path: '/BiddingManagement/ApplyPurchaseBiddingFile',
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        UserName: localStorage.getItem('Current').split('"')[5],
        name: '申请购买招标文件'
      }))
    },
    //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    //关闭预览
    closeFileShow (val) {
      this.iframeShow = val
    },
    selectLoadmore () {
      this.nums = this.nums + 100
      this.Addnums(this.nums)
    },
    Addnums (num) {
      this.SigningTimeYearList = []
      for (let i = 1900; i < 1900 + num; i++) {
        let obj = {
          value: i,
          describe: i
        }
        this.SigningTimeYearList.push(obj)
      }
    },
    sendIdx (e) {
      this.currentPage = e
      this.GetArchivesOperationLogPageList()
    },
    sendSize (e) {
      this.PageSize = e
      this.GetArchivesOperationLogPageList()
    },
    ShowAttachUrl (e) {
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
    Modifier (e, StartTime, EndTimes) {
      this.Modifiers = e
      this.StartTimes = StartTime
      this.EndTimes = EndTimes
      this.GetArchivesOperationLogPageList()
    },
    hideConfirmReceipt (e) {
      this.showConfirmReceipt = e
    },
    RefreshPage (e) {
      this.showConfirmReceipt = e
      this.GetBiddingDocumentPageList()
    },
    //确认签收
    ConfirmReceipt (e) {
      // console.log(e);
      this.contractId = e.Id
      this.showConfirmReceipt = true
    },
    //删除
    Delete (e, str) {
      let operationcode = this.$operatedata(this.operates, str).MenuId
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
      let obj = {
        Id: e.Id,
        menuid: operationcode,
        operationcode: str
      }
      showLoading()
      DeleteBiddingDocuments(obj).then(res => {
        hideLoading()
        if (res.MessageCode == 0) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.GetBiddingDocumentPageList()
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
      });
    })
  },
    closeDialog (str) {
      this.EndTimes = '',
        this.StartTimes = '',
        this.Modifiers = '',
        this.showOperationLogDetails = str
    },
    // 修改
    Modify (e) {
      this.$router.push({
        name: '申请购买招标文件',
        path: '/BiddingManagement/ApplyPurchaseBiddingFile',
      })
      localStorage.setItem('BiddingFile', JSON.stringify({
        UserName: localStorage.getItem('Current').split('"')[5],
        name: '修改购买招标文件',
        Id: e.Id
      }))
    },
    //取消
    closedialog () {
      this.dialogVisible = false
      this.dataObject.AffiliatedCompany = ''
      this.dataObject.FileType = ''
      this.dataObject.FileTime = ''
      this.dataObject.ArchiveMode = ''
      this.dataObject.ArchiveStatus = ''
      this.dataObject.SelectFile = ''
      this.dataObject.FilingCabinetNo = ''
    },
    //删除文件
    deletefile () {
      this.fileter = {}
    },
    //获取合同档案分页列表
    GetBiddingDocumentPageList () {
      let obj = {
        CompanyName: this.BiddingUnit,
        ProjectName: this.ProjectName,
        ApprovalTimeLimitYear: this.SigningTimeYear,
        ApprovalTimeLimitMonth: this.SigningTimeMonth,
        ApprovalTimeLimitDay: this.SigningTimeDay,
        OwnerName: this.Merchandiser,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: this.operatiOBj.menuid || MenuIdDate(),
        operationcode: this.operatiOBj.OperationCode || '1'
      }
      showLoading()
      GetBiddingDocumentPageList(obj).then(res => {
        hideLoading()
        if (res.MessageCode == 0 && res.Data != null) {
          this.tableList = res.Data
          this.total = res.Total
        } else {
          this.tableList = []
        }
      })
    },
    // 上传
    uploadfile (e) {
      var uploader
      this.fileloading = true
      const files = e.target.files[0]
      var path = process.env.VUE_APP_BASE_API_UPLOAD
      if (files) {
        var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
        if (ext !== 'pdf' && ext !== 'doc' && ext !== 'docx' && ext !== 'png' && ext !== 'jpg') {
          this.$message({
            message: '不支持该格式',
            type: 'warning'
          })
          this.fileloading = false
          e.target.value = []
          return false
        }
        // 文件大小限制
        if (files.size > (25 * 1024 * 1024)) {
          this.$message({
            message: '文件大小超过最大限制',
            type: 'warning'
          })
          this.fileloading = false
          return
        }
        if (ext == 'doc' || ext == 'docx' || ext == 'pdf') {
          // 文件循环上传
          uploader = new SupperUploader(path, files, uuid(), (2 * 1024 * 1024))
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              console.log(uploader.urlResult);
              const obj = {
                'name': files.name,
                'Url': uploader.urlResult.VideoUrl,
                'visible': true
              }
              // if (index == undefined) {
              //   this.filterlist.push(obj)
              // } else {
              //   this.filterlist.splice(index, 1, obj)
              // }
              this.fileter = obj
              this.dataObject.SelectFile = this.fileter.Url
              // console.log(this.fileter);
            }
            this.fileloading = false
            this.fileter.filestype = ext.toUpperCase()
            this.$refs.upload.value = null
          })
        } else {
          // 图片上传
          console.log('上传图片');
          let datas = new FormData();
          datas.append('file', files)
          datas.append('message', "{ImageStreamName:'file',BussinessType:0}");
          axios.post(path, datas)
            .then(res => {
              if (res.data.State) {
                const obj1 = {
                  'name': files.name,
                  'Url': res.data.ImageUrl,
                  'visible': true
                }
                // if (index == undefined) {
                //   this.filterlist.push(obj1)
                // } else {
                //   this.filterlist.splice(index, 1, obj1)
                // }
                this.fileter = obj1
                // console.log(this.fileter.Url);
                this.dataObject.SelectFile = this.fileter.Url
                this.fileter.filestype = ext.toUpperCase()
              }
              this.fileloading = false
            }).catch(() => {
              this.fileloading = false
            })
        }
      } else {
        this.fileloading = false
      }
    },
    //重置
    Reset () {
      this.SigningTimeYear = ''
      this.AffiliatedCompany = ''
      this.ProjectName = ''
      this.BiddingUnit = ''
      this.Merchandiser = ''
    },
    //查询
    searchtable () {
      this.currentPage = 1
      this.GetBiddingDocumentPageList()
    },
    //切换类型
    chooseschedule (e) {
      this.tabidx = e
      this.currentPage = 1
      this.GetBiddingDocumentPageList()
    },
    //多选
    handleSelectionChange (value) {
      this.Ids = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
      }
      console.log(this.Ids);
      if (this.Ids.length == this.tableList.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    // 全选
    selectall () {
      this.Idx++
      this.$refs.multipleTable.toggleAllSelection()
      if (this.Idx % 2 == 1) {
        this.$refs.multipleTable.tableData.forEach(data => {
          if (data.Id) {
            this.Ids.push(data.Id)
          }
        });
      } else {
        this.Ids = []
        this.Idx = 0
      }
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.GetBiddingDocumentPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.GetBiddingDocumentPageList()
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.ContractFileManagement-Box {
  .selectWidth {
    width: 200px !important;
  }
  .SigningTime {
    margin: 0 5px !important;
    width: 120px !important;
    // .el-select-dropdown .el-popper{
    //   height: 300px;
    // }
  }
  .SpanText {
    font-size: 16px;
    font-weight: 700;
    color: $erp666;
  }
  .operate-top {
    margin: 26px 24px 8px 24px;
    float: right;
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
  }
  .BtnBox {
    display: inline-block;
  }
  .tab {
    margin-left: 24px;
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
  .operate-bottom {
    margin-left: 20px;
    margin-top: 16px;
    .delete {
      margin-left: 16px;
    }
  }
  /deep/ .el-form-item.file {
    .img-box-list {
      float: left;
      width: 160px;
      position: relative;
      height: 120px;
      > input {
        width: 160px;
        height: 120px;
        position: absolute;
        opacity: 0;
        z-index: 10;
        cursor: pointer;
      }
      > .img-box {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #f0f4fa;
        border-radius: 8px;
        > .filetype {
          display: inline-block;
          background-color: $erpcolor;
          padding: 10px 12px;
          font-size: $f14;
          line-height: 14px;
          color: #fff;
          border-radius: 8px;
        }
        > .filename {
          font-size: $f14;
          color: $erp666;
          height: 40px;
          width: 110px;
          margin: 0px 24px 0 24px;
          letter-spacing: 0;
          word-break: break-all;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2; /*要显示的行数*/
          -webkit-box-orient: vertical;
        }
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      > .img-box-hover {
        position: absolute;
        width: 100%;
        height: 30px;
        background: #909198;
        // opacity: 0.4;
        bottom: 0;
        display: flex;
        justify-content: center;
        border-radius: 0 0 8px 8px;
        .btn {
          position: relative;
          cursor: pointer;
          line-height: 30px;
          width: 50%;
          text-align: center;
          color: #fff;
          > input {
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            cursor: pointer;
            &::-webkit-file-upload-button {
              height: 0;
            }
          }
          .svg-icon {
            font-size: $f14;
            margin-right: 10px;
          }
          > span {
            font-size: $f14;
            color: #fff;
          }
          &:hover span {
            color: #1588f8;
          }
          &:hover .svg-icon {
            color: #1588f8;
          }
        }
      }
    }
    .tip {
      float: right;
      width: 50%;
      color: $erp999;
      margin-top: 20px;
    }
  }
  /deep/ .dialog-footer.three-footer {
    text-align: center;
    > button {
      width: auto;
      height: auto;
      background-color: $erpbtncolor;
      color: $erpcolor;
    }
  }
}
</style>