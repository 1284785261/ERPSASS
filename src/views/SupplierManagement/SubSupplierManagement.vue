<!--供应商资金往来-->
<template>
  <div class="SubSupplierManagement-Box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="供应商编码" label-width="100px">
            <el-input v-model.trim="SupplierCode" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入供应商编码进行查询" />
          </el-form-item>
          <el-form-item label="供应商单位名称" label-width="125px">
           <el-input v-model.trim="SupplierUnitName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入供应商单位名称进行查询" />
          </el-form-item>
          <el-form-item label="所属客户" label-width="80px" v-if="tabidx==1">
            <el-input v-model.trim="Customer" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入所属客户名称进行查询" />
          </el-form-item>
          <el-form-item label="所关联结算单" label-width="110px">
            <el-input v-model.trim="SettlementSheetCode" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入所关联结算单名称进行查询" />
          </el-form-item>
        </el-form>
         <el-button class="search-button" size="mini" round @click="Reset">重置</el-button>
         <el-button class="search-button" size="mini" round @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="tab clearfix">
          <div class="tab-name" v-for="(item, index) in SupplierStatus" :key="index" :class="{active:tabidx==item.value}" @click="chooseschedule(item.value)">{{ item.describe }}</div>
    </div>
    <div class="operate-table" v-if="tabidx==0">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="ArchivesCabinetCode" min-width="120" fixed label="序号" />
          <el-table-column align="center" prop="SupplierCode" label="供应商编码" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="SupplierName" label="供应商单位名称" min-width="140" show-overflow-tooltip/>
          <el-table-column align="center" prop="ProvideType" label="提供类型" min-width="120"/>
          <el-table-column align="center" prop="SettleName" label="所关联结算单" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="Amount" label="往来资金" min-width="120"/>
          <el-table-column align="center" prop="BfCompanyName" label="应缴单位" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="AmountPurpose" label="备注" min-width="120"/>
        </el-table>
      </div>
      <div class="operate-table" v-if="tabidx==1">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="SupplierCode" min-width="80" fixed label="序号" />
          <el-table-column align="center" prop="SupplierCode" label="供应商编码" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="SupplierName" label="供应商单位名称" min-width="180" show-overflow-tooltip/>
          <el-table-column align="center" prop="CompanyName" label="所属客户" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="ProjectName" label="所属项目" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="SettleName" label="所关联结算单" min-width="140" show-overflow-tooltip/>
          <el-table-column align="center" prop="Amount" label="总价" min-width="120" show-overflow-tooltip/>
          <el-table-column align="center" prop="CabinetPosition" label="发票是否到账" min-width="140" />
          <el-table-column align="center" prop="AttachUrl" label="附件" min-width="120">
            <template slot-scope="scope">
              <el-popover ref="popover" placement="bottom" width="500" trigger="click">
                <el-table :data="popovertable" class="projecttable" v-loading="popoverloading" style="max-height: 300px;overflow-y: scroll;">
                  <el-table-column align="center" property="Id" label="附件名称"></el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scopes">
                      <span @click="preview(scopes.row)" class="watchcode">预览</span>
                      <span @click="DownLoad(scopes.row)" class="watchcode">下载</span>
                    </template>
                  </el-table-column>
                </el-table>
                <span slot="reference" class="watchcode">{{ scope.row.Id }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="AmountPurpose" label="资金用途" min-width="120"/>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item  v-if="$operatebtn(operates, 'Add')" @click.native="AddFile(scope.row)">添加发票附件</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
      <div class="tag-container">
          <el-dialog :close-on-click-modal="false" title="添加发票附件" class="dialog-box" append-to-body :visible.sync="showSixtoDeduct" :show-close="false" :destroy-on-close="true" width="420px" @close="close">
            <i class="el-icon-circle-close closeButton" @click="close"></i>
            <div class="tip" style="width:350px;line-height:40px;">只能上传JPG、PNG、PDF格式文件，文件不能超过5M</div>
            <div class="file">
              <div class="upload">
                <div v-if="fileName" class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()" v-loading="uploadLoading">
                  <span class="filestype">{{filestype}}</span>
                  <p>{{fileName}}</p>
                  <div v-show="optionShow" class="option-button">
                    <a>
                      <svg-icon icon-class="replace" class-name="svg-a" /> 替换
                      <input type="file" accept=".png,.jpg,.pdf" name="file" class="replaceFile" @change="uploadFile">
                    </a>
                    <a @click="delFiles">
                      <svg-icon icon-class="del" class-name="svg-a" /> 删除
                    </a>
                  </div>
                </div>
                <div class="files" v-else v-loading="uploadLoading">
                  <img src="../../assets/upload.png">
                  <input type="file" accept=".png,.jpg,.pdf" class="fileSty" name="file" @change="uploadFile">
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer-multiple">
              <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
              <el-button round class="erpbtn" size="small" @click="dialogtrue">保存</el-button>
            </div>
          </el-dialog>
        </div>
  </div>
</template>
<script>
import {GetTransactionsInsideSupplierPageList,GetTransactionsExternalSupplierPageList,AddTransactionsExternalSupplierAttachment}  from '@/api/Supplier.js'
import qs from 'qs'
import axios from 'axios'
import filters from '@/utils/filters'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
export default {
  data() {
    return {
      popoverloading:false,
      popovertable:[{Id:1}],
      showSixtoDeduct:false,
      Files:'',
      uploadLoading:false,
      fileName:'',
      filestype:'',
      optionShow:false,
      SupplierCode:'',
      SupplierUnitName:'',
      Customer:'',
      SettlementSheetCode:'',
      SupplierStatus:[{
        value:0,
        describe:'内部供应商'
      },{
        value:1,
        describe:'外部供应商'
      }],
      ProjectFeeId:-1,
      tabidx:0,
      currentPage:1,
      PageSize:10,
      total:0,
      tableloading:false,
      tableData:[],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
    }
  },
  created(){
    console.log(this.$route.meta.operations);
   if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.GetTransactionsInsideSupplierPageList(this.operatiOBj)
    }
  },
  methods:{
    //获取[内部]供应商资金往来分页列表
    GetTransactionsInsideSupplierPageList(e){
      let obj={
        SupplierName: this.SupplierUnitName,
        SupplierCode: this.SupplierCode,
        CompanyName: this.Customer,
        SettleName: this.SettlementSheetCode,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: e.menuid || MenuIdDate(),
        operationcode: e.OperationCode || '1',
      }
      GetTransactionsInsideSupplierPageList(obj).then(res=>{
        if(res.MessageCode==0&&res.Data!=null){
            this.tableData=res.Data
            this.total=res.Total
        }else{
            this.tableData=[]
            this.total=0
        }
      })
    },
    //获取[外部]供应商资金往来分页列表
    GetTransactionsExternalSupplierPageList(e){
      let obj={
        SupplierName: this.SupplierUnitName,
        SupplierCode: this.SupplierCode,
        CompanyName: this.Customer,
        SettleName: this.SettlementSheetCode,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: e.menuid,
        operationcode: e.OperationCode,
      }
      GetTransactionsExternalSupplierPageList(obj).then(res=>{
        if(res.MessageCode==0&&res.Data!=null){
            this.tableData=res.Data
            this.total=res.Total
        }else{
            this.tableData=[]
            this.total=0
        }
      })
    },
    //保存
    dialogtrue(){
      const operating = this.$operatedata(this.operates, 'Add')
        let obj={
          ProjectFeeId:this.ProjectFeeId,
          Attachment: this.Files,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        AddTransactionsExternalSupplierAttachment(obj).then(res=>{
          if(res.MessageCode==0){
            this.showSixtoDeduct=false
            this.GetTransactionsExternalSupplierPageList(this.operatiOBj)
            this.$message({
              type:'success',
              message:'添加发票附件成功'
            })
          }else{
            this.$message({
              type:'error',
              message:res.MessageContent
            })
          }
        })
    },
    //添加发票附件
    AddFile(e){
      if(e.ProjectFeeId!=-1){
      this.ProjectFeeId=e.ProjectFeeId
      }
      this.showSixtoDeduct=true
    },
    //预览
    preview(e){
      console.log(11);
    },
    //下载
    DownLoad(e){
      console.log(1122);
    },
    //重置
    Reset(){
      this.SupplierCode=''
      this.SupplierUnitName=''
      this.Customer=''
      this.SettlementSheetCode=''
    },
    //查询
    searchtable(){
       if(this.tabidx==1){
        this.GetTransactionsExternalSupplierPageList(this.operatiOBj)
      }else{
        this.GetTransactionsInsideSupplierPageList(this.operatiOBj)
      }
    },
    //切换类型
    chooseschedule(e){
      this.tabidx = e
      this.currentPage = 1
       if(this.tabidx==1){
        this.GetTransactionsExternalSupplierPageList(this.operatiOBj)
      }else{
        this.GetTransactionsInsideSupplierPageList(this.operatiOBj)
      }
    },
     // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
    },
     // 移入文件显示操作
    fileShow () {
      this.optionShow = true
    },
    // 移出文件隐藏操作
    filenoShow () {
      this.optionShow = false
    },
    //删除文件
    delFiles () {
      this.Files = ''
      this.fileName = ''
      this.filestype = ''
    },
    //上传文件
    uploadFile (e) {
      var uploader
      const files = e.target.files[0]
      var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
      if (ext == 'png' || ext == 'jpg' || ext == 'pdf') {
      } else {
        this.$message({
          message: '不支持该格式文件上传',
          type: 'warning'
        })
        e.target.value = []
        return false
      }
      if (files.size > (5 * 1024 * 1024)) {
        this.$message({
          message: '文件大小超过最大限制',
          type: 'warning'
        })
        e.target.value = []
        return false
      } else {
        this.uploadLoading = true
        if (ext == 'pdf') {
          uploader = new SupperUploader(process.env.VUE_APP_BASE_API_UPLOAD, files, uuid(), (2 * 1024 * 1024))
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              this.uploadLoading = false
              this.Files = uploader.urlResult.VideoUrl
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
                this.Files = res.data.ImageUrl
                this.fileName = files.name
                this.filestype = ext.toUpperCase()
                e.target.value = []
              }
            })
        }
      }
    },
     //关闭弹窗
    close () {
      this.Files = ''
      this.fileName = ''
      this.filestype = ''
      this.showSixtoDeduct = false
    },
  }
}
</script>
<style lang="scss" scoped>
.SubSupplierManagement-Box{
    .tab {
    margin-left: 24px;
    padding-left: 24px;
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
  .pagina-fonter {
  margin:0px 0px 0px 24px;
  background-color: #fff;
  padding-bottom: 30px;
  border-bottom-left-radius: 7px;
 }
}
.dialog-box {
  // 附件上传样式
  .file {
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
        // float: left;
        margin-left: 90px;
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
  }
}
  .watchcode{
      color: #1588F8;
      cursor: pointer;
      margin: 0px 7px;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
</style>