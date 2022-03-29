<!-- //外包员工关系维护 -->
<template>
  <div class="RelationshipMaintenance-Box">
   <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="员工名称" label-width="80px">
            <el-input v-model.trim="EmployeeName" clearable class="selectWidth select-input" suffix-icon="el-icon-search" placeholder="请输入员工名称进行查询" />
          </el-form-item>
          <el-form-item label="身份证号码" label-width="100px">
            <el-input v-model.trim="IdCard" clearable class="selectWidth select-input" suffix-icon="el-icon-search" placeholder="请输入身份证号码进行查询" />
          </el-form-item>
          <el-form-item label="就职项目" label-width="80px">
            <el-input v-model.trim="InaugurationProject" clearable class="selectWidth select-input" suffix-icon="el-icon-search" placeholder="请输入就职项目进行查询" />
          </el-form-item>
          <el-form-item label="用工单位" label-width="80px">
            <el-input v-model.trim="Employer" clearable class="selectWidth select-input" suffix-icon="el-icon-search" placeholder="请输入用工单位进行查询" />
          </el-form-item>
          <el-form-item label="社保/工资/公积金打款账号" label-width="220px">
            <el-input v-model.trim="PaymentAccount" clearable class="selectWidth select-input" suffix-icon="el-icon-search" placeholder="请输入社保/工资/公积金打款账号进行查询" />
          </el-form-item>
        </el-form>
         <el-button class="search-button" size="mini" round @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="operate-top">
        <div class="screening-compent">
        <!-- 筛选列组件 -->
        <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
      </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableList" max-height="600" tooltip-effect="dark" @select="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" fixed="left" label="全选"/>
          <el-table-column align="center" v-if="$getColumsFlag('UserId',checkboxVal)"  width="120" prop="UserId" label="员工工号"/>
          <el-table-column align="center" v-if="$getColumsFlag('UserName',checkboxVal)" prop="ContractCode" label="员工姓名" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" v-if="$getColumsFlag('Sex',checkboxVal)" prop="ContractName" min-width="120" label="性别" show-overflow-tooltip/>
          <el-table-column align="center" v-if="$getColumsFlag('IdCart',checkboxVal)" prop="ContractTypeText" label="身份证号码" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" v-if="$getColumsFlag('Tel',checkboxVal)" prop="BfCompanyName" label="联系电话" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" v-if="$getColumsFlag('Email',checkboxVal)" prop="DocumentTypeText" label="电子邮件" min-width="100" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Address',checkboxVal)" prop="BusinessTypeText" label="户口所在地" min-width="160" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('PoliticalOutlook',checkboxVal)" prop="ArchiveType" label="政治面貌" min-width="100" show-overflow-tooltip/>
          <el-table-column align="center" v-if="$getColumsFlag('HigEducation',checkboxVal)" prop="SysUserName" label="最高学历" min-width="120"/>
          <el-table-column align="center" v-if="$getColumsFlag('HigDegree',checkboxVal)" prop="AddTime" label="最高学位" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" v-if="$getColumsFlag('PhysicalExaminationStatus',checkboxVal)" prop="ArchiveTime" label="健康体检状态" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" v-if="$getColumsFlag('UrgentTel',checkboxVal)" prop="ArchiveStatus" label="紧急联系电话" min-width="120"/>
          <el-table-column align="center" v-if="$getColumsFlag('EmergencyContact',checkboxVal)" prop="ArchivesCabinetCode" label="紧急联系人" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('EmergencyContactRelationship',checkboxVal)" prop="AttachUrl" label="紧急联系人关系" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" v-if="$getColumsFlag('PayrollCardId',checkboxVal)" prop="ArchivesCabinetCode" label="工资卡账号" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('PayrollCardBank',checkboxVal)" prop="ArchivesCabinetCode" label="工资卡开户行" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('SocialSecurityId',checkboxVal)" prop="ArchivesCabinetCode" label="社保账号" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('SpeedProgress',checkboxVal)" prop="ArchivesCabinetCode" label="社保制卡进度" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('InsuredLand',checkboxVal)" prop="ArchivesCabinetCode" label="参保地" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('ProvidentFundAccount',checkboxVal)" prop="ArchivesCabinetCode" label="公积金账号" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('SpeedProgres',checkboxVal)" prop="ArchivesCabinetCode" label="社保制卡进度" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('WagePaymentRules',checkboxVal)" prop="ArchivesCabinetCode" label="工资发放规则" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('SocialSecurityDeductionRules',checkboxVal)" prop="ArchivesCabinetCode" label="社保扣除规则" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('ProvidentFundDeductionRules',checkboxVal)" prop="ArchivesCabinetCode" label="公积金扣除规则" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('IndividualIncomeTaxDeductionRules',checkboxVal)" prop="ArchivesCabinetCode" label="个税扣除规则" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Employer',checkboxVal)" prop="ArchivesCabinetCode" label="用工单位" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('InaugurationProject',checkboxVal)" prop="ArchivesCabinetCode" label="就职项目" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Entrance',checkboxVal)" prop="ArchivesCabinetCode" label="就职岗位" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('JoiningCompany',checkboxVal)" prop="ArchivesCabinetCode" label="入职公司" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('EntryTime',checkboxVal)" prop="ArchivesCabinetCode" label="入职时间" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('ResignationCertificateStatus',checkboxVal)" prop="ArchivesCabinetCode" label="原公司离职证明状态" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('CurrentEmploymentStatus',checkboxVal)" prop="ArchivesCabinetCode" label="目前就职状态" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('ContractType',checkboxVal)" prop="ArchivesCabinetCode" label="合同类型" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('ContractSigningMode',checkboxVal)" prop="ArchivesCabinetCode" label="合同签订模式" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('ContractStartDate',checkboxVal)" prop="ArchivesCabinetCode" label="合同起始日期" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('ContractTerminationDate',checkboxVal)" prop="ArchivesCabinetCode" label="合同终止日期" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('ContractSigningStatus',checkboxVal)" prop="ArchivesCabinetCode" label="合同签署状态" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('SocialInsurancePaymentStatus',checkboxVal)" prop="ArchivesCabinetCode" label="社保缴纳状态" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('ProvidentFundPaymentStatus',checkboxVal)" prop="ArchivesCabinetCode" label="公积金缴纳状态" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('EntryHandlingPersonnel',checkboxVal)" prop="ArchivesCabinetCode" label="入职办理人员" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('EntryPersonnel',checkboxVal)" prop="ArchivesCabinetCode" label="录入人员" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('InputTime',checkboxVal)" prop="ArchivesCabinetCode" label="录入时间" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('UpdateTime',checkboxVal)" prop="ArchivesCabinetCode" label="更新时间" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="ArchivesCabinetCode" label="添加时间" min-width="120" />
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item  @click.native="AddCommunicationRecord(scope.row)">添加外包员工沟通记录</el-dropdown-item>
                     <el-dropdown-item  @click.native="addremind(scope.row, 'AddRemind')">新建提醒</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
         <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button size="small" class="addmenu erpbtn delete" @click="MaintenanceRules">选择维护规则</el-button>
        </div>
         <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
       </div>
      </div>
      <el-dialog :close-on-click-modal="false" title="添加外包员工沟通记录" :visible.sync="addVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <!-- <div class="select-box">
        <el-input class="AddRemark" type="textarea" size="small" style="font-size:15px;" v-model="remarks" resize="none" maxlength="100" :rows="5" show-word-limit></el-input>
      </div> -->
      <el-form label-position="top" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="沟通人">
          <el-input v-model="Communicator"  size="small" />
        </el-form-item>
        <el-form-item label="沟通时间">
          <el-date-picker
            v-model="CommunicationTime"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
          </el-form-item>
        <el-form-item label="沟通内容">
          <el-input class="AddRemark" type="textarea" size="small" style="font-size:15px;" v-model="CommunicationContent" resize="none" maxlength="500" :rows="5" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="附件" class="file" v-model="enclosure">
          <div class="img-box-list">
            <!-- 未上传样式 -->
            <input type="file" ref="upload" accept=".pdf,.doc,.png,.jpg,.docx" name="" id="" @change="uploadfile">
            <div class="img-box">
              <i class="el-icon-circle-plus-outline"></i><span>上传客户跟进附件</span>
            </div><br/>
            <div class="tip">当前位置支持导入pdf、word、jpg、png后缀文件</div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveimport">保 存</el-button>
      </span>
    </el-dialog>
    <AddRemind :showRemind="showRemind" :title="remindtitle" @closeshowAddRemind="closeshowAddRemind" @AddRemindSave="AddRemindSave"></AddRemind>
  </div>
</template>
<script>
// import {GetStaffCommunicationPageList} from '@/api/OutsourcedEmployeeManagement.js'
import AddRemind from '@/components/publicComponents/AddRemind.vue'
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import { uuid } from '@/utils/CustomValidation.js'
import SupperUploader from '@/utils/SupperUploader'
import axios from 'axios'
import qs from 'qs'
export default {
  components:{ScreeningComponent,AddRemind},
  data () {
    return {
        Idx:0,
        enclosure:'',
        CommunicationContent:'',
        CommunicationTime:'',
        Communicator:'',
        EmployeeName:'',
        IdCard:'',
        InaugurationProject:'',
        Employer:'',
        PaymentAccount:'',
        tabidx:-1,
        Ids:[],
        currentPage:1,
        PageSize:10,
        total:0,
        tableloading:false,
        tableList:[],
        allchecked:'',
        checkboxVal: [],
        fileter:{},
        remindtitle: '添加客户提醒',
        showRemind:false,
        addVisible:false,
      formTheadOptions: [
        { label: "员工工号", prop: "UserId" },
        { label: "员工姓名", prop: "UserName" },
        { label: "性别", prop: "Sex" },
        { label: "身份证号码", prop: "IdCart" },
        { label: "联系电话", prop: "Tel" },
        { label: "电子邮件", prop: "Email" },
        { label: "户口所在地", prop: "Address" },
        { label: "政治面貌", prop: "PoliticalOutlook" },
        { label: "最高学历", prop: "HigEducation" },
        { label: "最高学位", prop: "HigDegree" },
        { label: "健康体检状态", prop: "PhysicalExaminationStatus" },
        { label: "紧急联系电话", prop: "UrgentTel" },
        { label: "紧急联系人", prop: "EmergencyContact" },
        { label: "紧急联系人关系", prop: "EmergencyContactRelationship" },
        { label: "工资卡账号", prop: "PayrollCardId" },
        { label: "工资卡开户行", prop: "PayrollCardBank" },
        { label: "社保账号", prop: "SocialSecurityId" },
        { label: "社保制卡进度", prop: "SpeedProgress" },
        { label: "参保地", prop: "InsuredLand" },
        { label: "公积金账号", prop: "ProvidentFundAccount" },
        { label: "社保制卡进度", prop: "SpeedProgres" },
        { label: "工资发放规则", prop: "WagePaymentRules" },
        { label: "社保扣除规则", prop: "SocialSecurityDeductionRules" },
        { label: "公积金扣除规则", prop: "ProvidentFundDeductionRules" },
        { label: "个税扣除规则", prop: "IndividualIncomeTaxDeductionRules" },
        { label: "用工单位", prop: "Employer" },
        { label: "就职项目", prop: "InaugurationProject" },
        { label: "就职岗位", prop: "Entrance" },
        { label: "入职公司", prop: "JoiningCompany" },
        { label: "入职时间", prop: "EntryTime" },
        { label: "原公司离职证明状态", prop: "ResignationCertificateStatus" },
        { label: "目前就职状态", prop: "CurrentEmploymentStatus" },
        { label: "合同类型", prop: "ContractType" },
        { label: "合同签订模式", prop: "ContractSigningMode" },
        { label: "合同起始日期", prop: "ContractStartDate" },
        { label: "合同终止日期", prop: "ContractTerminationDate" },
        { label: "合同签署状态", prop: "ContractSigningStatus" },
        { label: "社保缴纳状态", prop: "SocialInsurancePaymentStatus" },
        { label: "公积金缴纳状态", prop: "ProvidentFundPaymentStatus" },
        { label: "入职办理人员", prop: "EntryHandlingPersonnel" },
        { label: "录入人员", prop: "EntryPersonnel" },
        { label: "录入时间", prop: "InputTime" },
        { label: "更新时间", prop: "UpdateTime" },
        { label: "添加时间", prop: "AddTime" },
      ],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
    }
  },
  created () {
    console.log(this.$route);
    if (this.$route.meta.operations){
      this.operates = this.$route.meta.operations
      console.log(this.operates);
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  methods: {
    // GetStaffCommunicationPageList(){
    //   let obj={
    //      StaffId: 0,
    //      PageIndex: 0,
    //      PageSize: 0,
    //      menuid: MenuIdDate(),
    //      operationcode: '1'
    //   }
    // },
         // 上传
    uploadfile (e) {
      var uploader
      this.fileloading = true
      const files = e.target.files[0]
      var path = process.env.VUE_APP_BASE_API_UPLOAD
      if (files) {
        var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
        if (ext !== 'pdf' && ext !== 'doc' && ext!=='docx'  && ext !== 'png' && ext !== 'jpg') {
          this.$message({
            message: '不支持该格式',
            type: 'warning'
          })
          this.fileloading = false
          e.target.value = []
          return false
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
              this.fileter = obj
              this.enclosure=this.fileter.Url
              console.log(this.enclosure);
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
                this.enclosure=this.fileter.Url
                console.log(this.enclosure);
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
    //外包员工沟通记录保存
    saveimport(){
      this.addVisible=false
    },
     // 添加提醒
    addremind (e, op) {
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.showRemind = true
    },
    // 关闭提醒
    closeshowAddRemind () {
      this.showRemind = false
    },
    // 保存提醒
    AddRemindSave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      data.Type = 0
      showLoading()
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
    //筛选项
     SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    //选择维护规则
    MaintenanceRules(){
      if(this.Ids.length>0){
       this.IdArr=this.Ids.toString()
      }else{
        this.Ids=[]
      }
    },
    //关闭弹窗
    closedialog(){
      this.addVisible=false
    },
    //添加外包员工沟通记录
    AddCommunicationRecord(data){
      this.addVisible=true
    },
    //新建提醒
    NewReminder(data){},
     //查询
    searchtable(){
      this.currentPage = 1
    },
    //切换类型
    chooseschedule(e){
      this.tabidx = e
      this.currentPage = 1
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
      if(this.Idx%2==1){
      this.$refs.multipleTable.tableData.forEach(data => {
        if(data.Id){
          this.Ids.push(data.Id)
        } 
      });
      }else{
        this.Ids=[]
        this.Idx=0
      }
    },
     // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.GetContractArchivesPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.GetContractArchivesPageList()
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.RelationshipMaintenance-Box{
  .selectWidth{
    width: 190px !important;
  }
  .SigningTime{
    margin: 0 5px !important;
    width: 120px !important;
    // .el-select-dropdown .el-popper{
    //   height: 300px;
    // }
  }
  .SpanText{
    font-size: 16px;
    font-weight: 700;
    color:$erp666;
  }
  .operate-top {
    margin: 26px 24px 0 24px;
    float: right;
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
  }
  .BtnBox{
    display: inline-block;
  }
  .tab {
    margin-left: 24px;
  }
  .operate-table{
     background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius:0;
    .watchcode{
      color: #1588F8;
      cursor: pointer;
    }
  }
 .operate-bottom{
    margin-left: 20px;
    margin-top: 16px;
    .delete{
    margin-left: 16px;
  }
  }
  /deep/ .el-form-item.file {
  .img-box-list {
    float: left;
    position: relative;
    > input {
      width: 36px;
      height: 36px;
      position: absolute;
      top: 23px;
      opacity: 0;
      z-index: 10;
      cursor: pointer;
    }
    > .img-box {
      position: absolute;
      top: 23px;
      i{
        font-size: 36px;
        color: #1588F8;
      }
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
    width: 100%;
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