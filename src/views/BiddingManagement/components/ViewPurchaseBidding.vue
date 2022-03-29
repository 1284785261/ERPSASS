// 查看购买招标文件信息
<template>
  <div class="ViewPurchaseBidding-Box">
   <el-dialog :close-on-click-modal="false" title="查看购买招标文件信息" :visible.sync="dialogVisible" width="940px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form label-position="top" ref="operateform" label-width="100px" class="operateform">
        <el-row :gutter="64">
             <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
               <div>
                 <p class="LableContent">招标单位: </p>
                 <span class="contents">{{authorized}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
               <div>
                 <p class="LableContent">项目名称: </p>
                 <span class="contents">{{ProjectName}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
               <div>
                 <p class="LableContent">授权代表: </p>
                 <span class="contents">{{AuthorizedRepresentative}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
               <div>
                 <p class="LableContent">招标代理机构: </p>
                 <span class="contents">{{BiddingAgency}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
               <div>
                 <p class="LableContent">购买标书截止时间: </p>
                 <span class="contents">{{PurchaseBidTime}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
               <div>
                 <p class="LableContent">投标单位: </p>
                 <span class="contents">{{Bidder}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
               <div>
                 <p class="LableContent">招标文件费用: </p>
                 <span class="contents">{{BiddingFileCost}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
               <div>
                 <p class="LableContent">申请人: </p>
                 <span class="contents">{{Applicant}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
               <div>
                 <p class="LableContent">购买标书地址: </p>
                 <span class="contents">{{Address}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
               <div>
                 <p class="LableContent">购买标书方式: </p>
                 <span class="contents">{{PurchaseBidMethod}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
               <div>
                 <p class="LableContent">购买标书所需材料及要求: </p>
                 <span class="contents">{{TenderMaterials}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
               <div>
                 <p class="LableContent">备注: </p>
               <span class="contents">{{ReMark}}</span>
               </div>
             </el-col>
             <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                 <p class="LableContent">合同附件:</p>
              <div class="upload" v-if="enclosure">
             <div class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()">
                    <span class="filestype">{{filestype}}</span>
                    <p>{{fileName}}</p>
                    <div v-show="optionShow" class="option-button">
                      <div @click="preview(enclosure)">
                        <i class="el-icon-view"></i>
                        <span>预览</span>
                      </div>
                      <div @click="DownLoad(enclosure)">
                      <i class="el-icon-download"></i>
                       <span>下载</span>
                     </div>
                    </div>
                  </div>  
               </div>  
             </el-col>
        </el-row>          
      </el-form>
      <div class="footer-button">
            <el-button class="operation-button" type="primary" @click="closedialog">关闭</el-button>
          </div>
    <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
    </el-dialog>
  </div>
</template>
<script>
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import {GetBiddingDocumentInfo} from '@/api/Bidding.js'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
export default {
  props:['showContract','ShowId'],
  components:{PreviewFile},
  data() {
    return {
      previewFileUrl: '',
      iframeShow: false,
      isImg:1,
      titlename: '合同附件预览',
      dialogVisible:false,
      disabled:true,
      province:'',
      Applicant:'',
      Address:'',
      ReMark:'',
      enclosure:'',
      optionShow:false,
      filestype:'',
      fileName:'',
      PurchaseBidMethod:'',
      TenderMaterials:'',
      BiddingFileCost:'',
      city:'',
      AreaId:'',
      authorized:'',
      DetailedAddress:'',
      AuthorizedRepresentative:'',
      ProjectName:'',
      BiddingAgency:'',
      PurchaseBidTime:'',
      Bidder:'',
      Employees:'',
      AmountClaim:'',
      EntryDate:'',
      Remark:'',
      DeductionProjectCostAmount:'',
      DeductionCompanyExpenditure:'',
      ProjectGrossProfitAmount:'',
      ClaimedAmount:'',
      AmountClaimedEmployee:'',
      EmployeesList:[],
      Ids:0,
    }
  },
  watch:{
    showContract (newvalue, oldvalue) {
      this.dialogVisible = newvalue
    },
    ShowId(newvalue, oldvalue){
      if(newvalue){
        this.Ids=newvalue
      }else{
        this.Ids=oldvalue
      }
      this.GetBiddingDocumentInfo()
    }
  },
  created(){
    this.dialogVisible=this.isShow
    this.Ids=this.ShowId
  },
  methods:{
    // 移入文件显示操作
    fileShow () {
      this.optionShow = true
    },
    // 移出文件隐藏操作
    filenoShow () {
      this.optionShow = false
    },
    GetBiddingDocumentInfo(){
      let obj={
        Id:this.Ids,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBiddingDocumentInfo(obj).then(res=>{
        if(res.IsSuccess){
          this.authorized=res.Data.CompanyName
          this.ProjectName=res.Data.ProjectName
          this.AuthorizedRepresentative=res.Data.AuthorizedSysUser
          this.BiddingAgency=res.Data.BiddingAgency
          this.PurchaseBidTime=res.Data.DeadlineForPurchasingBids.split('T').toString().replace(/-/g,'/').replace(/,/g,'    ')
          this.Bidder=res.Data.BfCompanyName
          this.Address=res.Data.MergerName.split(',').join('')+res.Data.PurchaseBidingAddr
          // this.DetailedAddress=res.Data.PurchaseBidingAddr
          this.BiddingFileCost=res.Data.Account
          this.PurchaseBidMethod=res.Data.PurchaseBidingMode
          this.TenderMaterials=res.Data.MaterialAndRequirement
          this.ReMark=res.Data.Remark
          this.enclosure=res.Data.AttachUrl
           if(this.enclosure){
            this.fileName = this.enclosure.slice(this.enclosure.lastIndexOf('/') + 1, this.enclosure.lastIndexOf('.'))
            this.filestype = this.enclosure.slice(this.enclosure.lastIndexOf('.') + 1).toUpperCase()
          }
          this.Applicant=res.Data.SysUserName
        }
      })
    },
     //关闭预览弹窗
    closeFileShow (val) {
      this.iframeShow = val
    },
    //判断文件类型
    preview(e){
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
    //下载
    DownLoad(e){
      window.open(e)
    },
    //关闭弹窗
    closedialog(){
      this.$emit('isHide',false)
    },
  }
}
</script>
<style lang="scss" scoped>
.ViewPurchaseBidding-Box{
  /deep/.erpdialog .el-dialog__body {
    padding: 24px 5px 12px 5px;
}
  .LableContent{
    width: 168px;
    text-align: right;
    color: #666666;
    display: inline-block;
    margin-right: 10px;
  }
    .contents{
      color: #333333;
    }
  .ImgBox{
    width: 600px;
    display: flex;
    flex:1;
    p{
      white-space: nowrap;
      width: 168px;
      text-align: right;
      color: #666666;
      display: inline-block;
      margin-right: 10px;
    }
    .TextBox{
      margin-top: 16px;
      width: 180px;
      height: 80px;
      background-color: #F0F4FA;
      border-radius: 5px;
      margin-right: 20px;
      overflow: hidden;
      p{
        margin-top: 25px;
        width: 100%;
        text-align: center;
      }
    }
    .operationBox{
      margin-top: 16px;
      width: 180px;
      height: 80px;
      border-radius: 5px;
      background-color: #1588F8 ;
     div{
       display: inline-block;
       width: 50%;
       height: 100%;
       text-align: center;
       line-height: 80px;
       color: #F0F4FA;
       cursor: pointer;
       span{
         margin-left: 7px;
       }
     }
    }
  }
.upload {
    position: relative;
    left: 19%;
    top: -30px;
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
        div {
          cursor: pointer;
          width: 50%;
          display: inline-block;
          line-height: 30px;
          text-align: center;
          height: 30px;
          font-size: 14px;
          color: #fff;
          vertical-align: top;
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
    .prompt {
      float: left;
      width: 300px;
      font-size: 14px;
      color: #999999;
      margin-top: 20px;
      margin-left: 17px;
    }
  }
.footer-button {
      margin: 20px 0 20px 0;
      text-align: center;
      button {
        margin: 0 12px;
      }
    }
}
</style>