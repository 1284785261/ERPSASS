//查看招聘需求详情
<template>
  <div>
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="Details-box">
      <div class="babel">
        <div class="title-name">基本信息</div>
        <div class="babel-container">
          <el-row class="follow-row">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">文件编号</div>
                <div class="content-detail" v-if="ProjectDetail.FinanceCode">{{ProjectDetail.FinanceCode}}</div>
                <div class="content-detail" v-else-if="ProjectDetail.DocumentCode">{{ProjectDetail.DocumentCode}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">文件名称</div>
                <div class="content-detail" v-if="ProjectDetail.DocumentName">{{ProjectDetail.DocumentName}}</div>
                <div class="content-detail" v-else-if="ProjectDetail.BfCompanyName">{{ProjectDetail.BfCompanyName+ProjectDetail.FinanceName+ProjectDetail.FinanceTypeText}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">所属公司</div>
                <div class="content-detail" v-if="ProjectDetail.BfCompanyName">{{ProjectDetail.BfCompanyName}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">档案类型</div>
                <div class="content-detail" v-if="ProjectDetail.DocumentTypeText">{{ProjectDetail.DocumentTypeText}}</div>
                <div class="content-detail" v-else-if="ProjectDetail.FinanceTypeText">{{ProjectDetail.FinanceTypeText}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">档案上传时间</div>
                <div class="content-detail" v-if="ProjectDetail.AddTime">{{ProjectDetail.AddTime | Time}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">创建人</div>
                <div class="content-detail" v-if="ProjectDetail.SysUserName">{{ProjectDetail.SysUserName}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="babel">
        <div class="title-name">档案状态</div>
        <div class="babel-container">
          <el-row class="follow-row">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">存档模式</div>
                <div class="content-detail" v-if="ProjectDetail.ArchiveType!=null">{{ProjectDetail.ArchiveType==0?'纸质存档':'电子存档'}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">存档状态</div>
                <div class="content-detail" v-if="ProjectDetail.ArchiveStatus!=null">{{ProjectDetail.ArchiveStatus==0?'待存档':'已存档'}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">档案存档时间</div>
                <div class="content-detail" v-if="ProjectDetail.ArchiveTime!=null">{{ProjectDetail.ArchiveTime | Time}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">档案柜号</div>
                <div class="content-detail" v-if="ProjectDetail.ArchivesCabinetCode">{{ProjectDetail.ArchivesCabinetCode}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">签收人</div>
                <div class="content-detail" v-if="ProjectDetail.SignedName">{{ProjectDetail.SignedName}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
       <div class="babel">
        <div class="title-name">操作日志</div>
        <div class="babel-container">
         <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="OperationLogList" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="OperationObjCode" min-width="120" fixed label="档案柜编号" />
          <!-- <el-table-column align="center" prop="Amount" label="金额明细" min-width="120" show-overflow-tooltip /> -->
          <el-table-column align="center" prop="OperationObjName" label="文件名称" min-width="100" show-overflow-tooltip/>
          <!-- <el-table-column align="center" prop="CabinetPositionName" label="档案柜位置" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="MarkerColor" label="标志色系" min-width="80"/> -->
          <el-table-column align="center" prop="SysUserName" label="操作人" min-width="80" />
          <el-table-column align="center" prop="AddTime" label="操作时间" min-width="180"  show-overflow-tooltip>
             <template slot-scope="scope">
              <div>
                {{scope.row.AddTime.split('T').toString().replace(/-/g,'/').replace(/,/g,'    ')}}
              </div>
            </template>
          </el-table-column>
           <el-table-column align="center" prop="OperationTypeText" label="操作类型" min-width="100"/>
        </el-table>
         <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="Total">
        </el-pagination>
      </div>
        </div>
      </div>
       <div class="babel">
        <div class="title-name">档案附件</div>
    <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
        <div class="babel-container">
         <div class="img-box-list" @mouseenter="visible=!visible" @mouseleave="visible=!visible">
          <div class="ext">{{ext}}</div>
          <div class="Urlname">{{Urlname}}</div>
          <div class="Footer-Box" v-show="visible">
            <div @click="preview(ProjectDetail.AttachUrl)">
              <i class="el-icon-view"></i>
              <span>预览</span>
            </div>
            <div @click="Download">
            <i class="el-icon-download"></i>
              <span>下载</span>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div class="footer-button">
        <el-button class="erpbtn" size="small" @click="cancel">关闭</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {GetDocumentArchivesInfo,DownloadDocumentArchives,DownloadContractArchives,DownloadFinanceArchives,GetArchivesOperationLogPageList,GetFinanceArchivesInfo,GetContractArchivesInfo} from '@/api/FileManagement.js'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import filters from '@/utils/filters'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    PreviewFile
  },
  data () {
    return {
      visible:false,
      isImg: 1,
      previewFileUrl: '',
      titlename: '文书附件预览',
      iframeShow: false,
      urlList: [],
      ProjectDetail: {},
      Id: '',
      tableloading:false,
      OperationLogList:[],
      currentPage:1,
      PageSize:10,
      Total:0,
      ext:'',
      Urlname:'',
      DataId:0,
      SysUserName:'',
      FileDetail:{},
    }
  },
  created () {
    this.FileDetail=JSON.parse(localStorage.getItem('FileDetails'))
    console.log(this.$route);
    this.SysUserName=this.FileDetail.SysUserName
    this.Id = this.FileDetail.Id
    if(this.FileDetail.name=='文书档案详情'){
      this.urlList= [{
        name: '文书档案管理',
        router: '/FileManagement/DocumentArchivesManagement'
      }, {
        name: '文书档案详情',
        router: ''
      }]
      this.GetDocumentArchivesInfo()
    }else if(this.FileDetail.name=='财务档案详情'){
        this.urlList= [{
        name: '财务档案管理',
        router: '/FileManagement/FinancialArchivesManagement'
      }, {
        name: '财务档案详情',
        router: ''
      }]
      this.GetFinanceArchivesInfo()
    }else if(this.FileDetail.name=='合同档案详情'){
       this.urlList= [{
        name: '合同档案管理',
        router: '/FileManagement/ContractFileManagement'
      }, {
        name: '合同档案详情',
        router: ''
      }]
      this.GetContractArchivesInfo()
    }
    this.GetArchivesOperationLogPageList()
  },
  methods: {
     closeFileShow (val) {
      this.iframeShow = val
    },
    preview(e){
      if(this.FileDetail.name=='财务档案详情'){
        this.titlename='财务附件预览'
      }
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
    Download(){
      if(this.FileDetail.name=='文书档案详情'){
      this.DownloadDocumentArchives()
    }else if(this.FileDetail.name=='财务档案详情'){
      this.DownloadFinanceArchives()
    }
    },
     DownloadDocumentArchives(){
      if(this.Id!=null){
        let obj={
        IdArr:this.Id.toString(),
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
    DownloadDocumentArchives(obj).then(res=>{
      if(res.IsSuccess&&res.Data!=null){
        this.GetArchivesOperationLogPageList()
      hideLoading()
        console.log(res.Data);
        window.open(res.Data)
         this.$message({
              type:'success',
              message:'下载成功'
             })
        this.IdArr=[]
      }else{
        this.$message({
              type:'warning',
              message:res.MessageContent
             })
      }
    })
      }
    },
    DownloadContractArchives(){
      if(this.Id!=null){
        let obj={
        IdArr:this.Id.toString(),
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
    DownloadContractArchives(obj).then(res=>{
      if(res.IsSuccess&&res.Data!=null){
        this.GetArchivesOperationLogPageList()
        hideLoading()
        window.open(res.Data)
         this.$message({
              type:'success',
              message:'下载成功'
             })
        this.IdArr=[]
      }else{
        this.$message({
              type:'warning',
              message:res.MessageContent
             })
      }
    })
      }
    },
    DownloadFinanceArchives(){
      if(this.Id!=null){
        let obj={
        IdArr:this.Id.toString(),
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
    DownloadFinanceArchives(obj).then(res=>{
      if(res.IsSuccess&&res.Data!=null){
        window.open(res.Data)
        this.GetArchivesOperationLogPageList()
        hideLoading()
         this.$message({
              type:'success',
              message:'下载成功'
             })
        this.IdArr=[]
      }else{
        this.$message({
              type:'warning',
              message:res.MessageContent
             })
      }
    })
      }
    },
    GetArchivesOperationLogPageList(){
      let obj={
       OperationObjType: 1,
       OperationObjId:this.Id,
       SysUserName: this.SysUserName,
       StartTime:'',
       EndTime: '',
       OperationType:-1,
       PageIndex:this.currentPage,
       PageSize:this.PageSize,
       menuid: MenuIdDate(),
       operationcode: '1'
    }
    if(this.FileDetail.name=='财务档案详情'){
      obj.OperationObjType=2
    }else if(this.FileDetail.name=='合同档案详情'){
       obj.OperationObjType=3
    }
    GetArchivesOperationLogPageList(obj).then(res=>{
      if(res.IsSuccess&&res.Data!=null){
        this.OperationLogList=res.Data
        console.log(this.OperationLogList);
        this.Total=res.Total
      }else{
        this.OperationLogList=[]
      }
    })
    },
    // 获取招聘信息
    cancel () {
      window.open('about:blank', '_self').close()
    },
     handleSizeChange (val) {
      this.PageSize = val
      this.GetArchivesOperationLogPageList()
    },
    //获取文书档案详情
    GetDocumentArchivesInfo(){
      let obj={
        Id:this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetDocumentArchivesInfo(obj).then(res=>{
        if(res.IsSuccess&&res.Data!=null){
          this.ProjectDetail=res.Data
          console.log(this.ProjectDetail);
          let url=this.ProjectDetail.AttachUrl.split('/')
          this.Urlname=url[url.length-1].split('.')[0];
          this.ext=url[url.length-1].split('.')[1];
        }
      })
    },
    //获取财务档案详情
    GetFinanceArchivesInfo(){
      let obj={
        Id:this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetFinanceArchivesInfo(obj).then(res=>{
        if(res.IsSuccess&&res.Data!=null){
          this.ProjectDetail=res.Data
          console.log(this.ProjectDetail);
          let url=this.ProjectDetail.AttachUrl.split('/')
          this.Urlname=url[url.length-1].split('.')[0];
          this.ext=url[url.length-1].split('.')[1];
        }
      })
    },
    //获取合同档案详情
    GetContractArchivesInfo(){
      let obj={
        Id:this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetContractArchivesInfo(obj).then(res=>{
        if(res.IsSuccess&&res.Data!=null){
          this.ProjectDetail=res.Data
          console.log(this.ProjectDetail);
          let url=this.ProjectDetail.AttachUrl.split('/')
          this.Urlname=url[url.length-1].split('.')[0];
          this.ext=url[url.length-1].split('.')[1];
        }
      })
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.GetArchivesOperationLogPageList()
    },
  }
}
</script>
<style lang="scss" scoped>
.Details-box {
  margin: 20px;
  background: #fff;
}
.bread {
  margin-left: 24px;
  margin-bottom: 24px;
}
.babel {
  padding-bottom: 40px;
  padding: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .title-name {
    font-size: $f16;
    color: $erp333;
    position: relative;
    padding-left: 12px;
    line-height: 16px;
    font-weight: 700;
    margin-bottom: 24px;
    &::after {
      content: "";
      width: 4px;
      height: 16px;
      background-color: $erpcolor;
      position: absolute;
      left: 0;
    }
  }
  .babel-container {
    padding-bottom: 16px;
    border-bottom: 1px solid $erpBK;
    .img-box-list{
      position: relative;
      margin-bottom: 20px;
      width: 160px;
      height: 120px;
      background: #f0f4fa;
      border-radius: 8px;
      text-align: center;
      .ext{
        width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        color: #fff;
        text-align: center;
        background-color:$erpcolor;
        margin-bottom: 25px;
      }
      .Urlname{
        font-size: 14px;
        text-align: center;
      }
      .Footer-Box{
        width: 100%;
        height: 30px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #909198;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        display: flex;
        flex: 1;
        cursor: pointer;

        div{
          width: 50%;
            display: inline-block;
            line-height: 30px;
            text-align: center;
            height: 30px;
            font-size: 14px;
            color: #fff;
            vertical-align: top;
             i{
            margin-right: 10px;
            font-size: 14px;
          }
          &:hover {
              color: #1588f8;
            }
        }
      }
    }

    .content {
      display: flex;
      font-size: $f14;
      line-height: 14px;
      margin-bottom: 24px;
      .content-label {
        margin-right: 12px;
        width: 150px;
        text-align: right;
        font-weight: 700;
      }
      .content-detail {
        flex: 1;
        color: $erp999;
      }
    }
    .follow-row {
      padding-bottom: 16px;
      border-bottom: 1px solid $erpBK;
      margin-bottom: 40px;
      &:last-child {
        padding-bottom: 0;
        border-bottom: none;
        margin-bottom: 0;
      }
    }
  }
}
.footer-button {
  text-align: center;
  background: #ffffff;
  padding: 30px;
}
</style>