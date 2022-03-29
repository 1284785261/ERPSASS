<!-- 添加修改项目成本-->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="科目名称" class="select">
          <el-select v-model="operateform.Subject" clearable filterable placeholder="请选择当前费用的科目名称">
            <el-option v-for="(item,idx) in SubjectList" :key="idx" :value="item.Name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否保证金">
          <el-radio-group v-model="operateform.Ensure">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="是否参与工资结算">
          <el-radio-group v-model="operateform.JoinSettle">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="供应商类型">
          <el-radio-group v-model="operateform.SupplierType" @change="SelectChanges">
            <el-radio :label="0">内部供应商</el-radio>
            <el-radio :label="1">外部供应商</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择供应商" class="select">
          <el-select v-model="operateform.SupplierId" clearable filterable placeholder="搜索或选择供应商">
            <el-option v-for="(item,idx) in SelectSupplierList" :key="idx" :value="item.Id" :label="item.Name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用金额">
          <el-input v-model="operateform.Fee" placeholder="请输入费用金额">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="所属年月">
          <el-date-picker v-model="operateform.date" type="month" placeholder="选择所属年月"></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="挂账操作">
          <el-checkbox v-model="operateform.showCost">标记为挂账</el-checkbox>
        </el-form-item>
        <el-form-item label="所属挂账" class="select" v-if="operateform.showCost">
          <el-select v-model="operateform.OnCreditId" filterable clearable remote placeholder="搜索或选择所属挂账" :remote-method="getOnCreditPageList" @clear="getOnCreditPageList('')">
            <el-option :label="item.Title" :value="item.Id" v-for="(item, index) in creditlist" :key="index"></el-option>
            <div v-if="creditlist.length > 99" class="search-keyword">
              <span>只显示前100条结果，请完善搜索关键字</span>
            </div>
          </el-select>
        </el-form-item> -->
        <el-form-item label="费用说明" class="text">
          <el-input type="textarea" :rows="6" v-model="operateform.Remark" maxlength="500" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="费用明细附件" class="file" v-loading="fileloading">
          <div class="img-box-list" v-show="!fileter.Url">
            <!-- 未上传样式 -->
            <input type="file" ref="upload" accept=".doc,.docx,.pdf,.png,.jpg,.xls,.xlsx" name="" id="" @change="uploadfile">
            <div class="img-box">
              <img src="@/assets/down.png" alt="">
            </div>
          </div>
          <div class="img-box-list" v-show="fileter.Url" @mouseenter="fileter.visible=!fileter.visible" @mouseleave="fileter.visible=!fileter.visible">
            <div :title="fileter.name" class="img-box">
              <span class="filetype">{{fileter.filestype}}</span>
              <div class="filename">{{fileter.Url}}</div>
            </div>
            <div class="img-box-hover option-button" v-show="fileter.visible">
              <a class="btn">
                <input type="file" ref="upload" accept=".doc,.docx,.pdf,.png,.jpg,.xls,.xlsx" name="" id="" @change="uploadfile">
                <svg-icon icon-class="replace" class-name="svg-a" />
                <span>替换</span>
              </a>
              <a class="btn" @click="deletefile">
                <svg-icon icon-class="del" class-name="svg-a" />
                <span>删除</span>
              </a>
            </div>
          </div>
          <div class="tip">上传费用明细附件，上传格式为PNG、JPG、Word、PDF、XLS</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer three-footer">
        <el-button class="erpbtn" size="small" @click="closedialog">取 消</el-button>
        <el-button class="erpbtn" size="small" @click="save">保 存</el-button>
        <el-button class="erpbtn" size="small" @click="submitreview">提交审核</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {GetExternalSupplierPageList,GetInsideSupplierPageList} from '@/api/Supplier.js'
import { uuid } from '@/utils/CustomValidation.js'
import { GetOnCreditPageList, GetOnCreditInfo } from '@/api/CompensationServiceManagement.js'
import SupperUploader from '@/utils/SupperUploader'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import axios from 'axios'
import qs from 'qs'
export default {
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
    },
    contentdata: {
      type: Object
    }
  },
  data () {
    return {
      SubjectList:[{
        Name:'商业险'
      },{
        Name:'员工福利'
      },{
        Name:'雇主险'
      },{
        Name:'残保金'
      },{
        Name:'企业部分工会费'
      },{
        Name:'中标服务费'
      },{
        Name:'业务招待费'
      },{
        Name:'差旅费'
      },{
        Name:'劳保费'
      },{
        Name:'经济补偿金'
      },{
        Name:'水电房租'
      },{
        Name:'其他费用'
      }],
      dialogVisible: false,
      fileloading: false,
      operateform: {
        Subject: '',
        Ensure: 0,
        // JoinSettle: 0,  //是否参与结算
        SupplierType:0,
        SupplierId:'',
        Fee: '',
        Remark: '',
        Status: 0, // 待审批
        showCost: '',
        AddTime: new Date(), // 添加时间
        date: '', // 所属时间未处理
        Year: '',
        Month: '',
        OnCreditId: '', // 所属挂账
      },
      currentPage:1,
      PageSize:10,
      total:0,
      SelectSupplierList:[], //供应商列表
      creditlist: [], // 挂账列表
      rules: {},
      fileter: {

      }
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (this.contentdata.Id) {
        // 处理文件数据
        if (this.contentdata.Attachment) {
          this.fileter = {
            visible: false,
            name: this.contentdata.Attachment.slice(this.contentdata.Attachment.lastIndexOf('/') + 1, this.contentdata.Attachment.lastIndexOf('.')),
            Url: this.contentdata.Attachment,
            filestype: this.contentdata.Attachment.slice(this.contentdata.Attachment.lastIndexOf('.') + 1).toUpperCase()
          }
        }
        // 处理时间
          this.operateform = this.contentdata
        if(this.operateform.SupplierType==0||this.operateform.SupplierType==1){
          if(this.operateform.SupplierType==0){
            this.GetInsideSupplierPageList()
          }else{
            this.GetExternalSupplierPageList()
          }
          this.$nextTick(()=>{
            console.log(this.operateform);
            this.operateform.SupplierId=this.operateform.SupplierId
          })
        }
        if (this.operateform.OnCreditId == '0') {
          this.operateform.OnCreditId = ''
        }
        let date = ''
        if (this.contentdata.Year && this.contentdata.Month) {
          date = new Date(this.contentdata.Year, this.contentdata.Month - 1)
        }
        // 反推挂账列表
        // if (this.contentdata.OnCreditId) {
        //   let obj = {
        //     Id: this.contentdata.OnCreditId,
        //     menuid: MenuIdDate(),
        //     operationcode: '1'
        //   }
        //   GetOnCreditInfo(qs.stringify(obj)).then(response => {
        //     if (response.IsSuccess) {
        //       if (response.Data) {
        //         this.creditlist = [{
        //           Title: response.Data.Title,
        //           Id: response.Data.Id
        //         }]
        //       }
        //     } else {
        //       this.$message({
        //         message: response.MessageContent,
        //         type: 'error'
        //       })
        //     }
        //   })
        // }
        this.$set(this.operateform, 'date', date)
      } 
      // else {
      //   this.getOnCreditPageList('')
      // }
    }
  },
  created(){
    this.GetInsideSupplierPageList()
  },
  methods: {
    //切换类型
    SelectChanges(){
       this.operateform.SupplierId=''
      if(this.operateform.SupplierType==0){
        this.GetInsideSupplierPageList()
      }else{
        this.GetExternalSupplierPageList()
      }
    },
    //获取外部供应商分页列表
    GetExternalSupplierPageList(){
      let obj={
        Code: this.SupplierCode,
        Name: this.SupplierUnitName,
        TaxRegistrationNo: this.TaxRegistrationNo,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetExternalSupplierPageList(obj).then(res=>{
        if(res.MessageCode==0&&res.Data!=null){
           this.SelectSupplierList=res.Data
           this.total=res.Total
        }else{
          this.SelectSupplierList=[]
          this.total=0
        }
      })
    },
    //获取内部供应商分页列表
    GetInsideSupplierPageList(){
      let obj={
        Code: this.SupplierCode,
        Name: this.SupplierUnitName,
        TaxRegistrationNo: this.TaxRegistrationNo,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetInsideSupplierPageList(obj).then(res=>{
         if(res.MessageCode==0&&res.Data!=null){
           this.SelectSupplierList=res.Data
           this.total=res.Total
        }else{
          this.SelectSupplierList=[]
          this.total=0
        }
      })
    },
    // 获取挂账列表
    // getOnCreditPageList (value) {
    //   let obj = {
    //     PageIndex: 1,
    //     PageSize: 100,
    //     CompanyName: '',
    //     ProjectName: '',
    //     Year: '',
    //     Month: '',
    //     Title: value,
    //     menuid: MenuIdDate(),
    //     operationcode: '1'
    //   }
    //   GetOnCreditPageList(qs.stringify(obj)).then(response => {
    //     if (response.IsSuccess) {
    //       this.creditlist = response.Data
    //     } else {
    //       this.$message({
    //         message: response.MessageContent,
    //         type: 'error'
    //       })
    //     }
    //   })
    // },
    // 关闭弹框
    closedialog () {
      this.operateform = {
        Subject: '',
        Ensure: 0,
        // JoinSettle: 0,
        SupplierType:0,
      }
      this.fileter = {}
      this.$emit('closedialog')
    },
    // 删除文件
    deletefile () {
      this.fileter = {}
    },
    // 保存成本
    save () {
      if (this.fileter.Url) {
        this.operateform.Attachment = this.fileter.Url
      } else {
        this.operateform.Attachment = ''
      }
      // 处理所属时间
      if (this.operateform.date) {
        this.operateform.Year = this.operateform.date.getFullYear()
        this.operateform.Month = this.operateform.date.getMonth() + 1;
      } else {
        this.operateform.Year = ''
        this.operateform.Month = ''
      }
      // console.log(this.operateform)
      console.log(this.operateform);
      this.$emit('savecost', this.operateform)
    },
    // 上传
    uploadfile (e) {
      var uploader
      this.fileloading = true
      const files = e.target.files[0]
      var path = process.env.VUE_APP_BASE_API_UPLOAD
      if (files) {
        var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
        if (ext !== 'doc' && ext !== 'docx' && ext !== 'pdf' && ext !== 'png' && ext !== 'jpg' && ext !== 'xls' && ext !== 'xlsx') {
          this.$message({
            message: '不支持该格式',
            type: 'warning'
          })
          this.fileloading = false
          e.target.value = []
          return false
        }
        // 文件大小限制
        // if (files.size > (50 * 1024 * 1024)) {
        //   this.$message({
        //     message: '文件大小超过最大限制',
        //     type: 'warning'
        //   })
        //   this.fileloading = false
        //   return
        // }
        if (ext == 'doc' || ext == 'docx' || ext == 'pdf' || ext == 'xls' || ext == 'xlsx') {
          // 文件循环上传
          uploader = new SupperUploader(path, files, uuid(), (2 * 1024 * 1024))
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              const obj = {
                'name': ext,
                'Url': uploader.urlResult.VideoUrl,
                'visible': false
              }
              // if (index == undefined) {
              //   this.filterlist.push(obj)
              // } else {
              //   this.filterlist.splice(index, 1, obj)
              // }
              this.fileter = obj
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
                  'name': ext,
                  'Url': res.data.ImageUrl,
                  'visible': false
                }
                // if (index == undefined) {
                //   this.filterlist.push(obj1)
                // } else {
                //   this.filterlist.splice(index, 1, obj1)
                // }
                this.fileter = obj1
                this.fileter.filestype = ext.toUpperCase()
                console.log(this.fileter);
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
    // 提交审核
    submitreview () {
      if (this.fileter.Url) {
        this.operateform.Attachment = this.fileter.Url
      } else {
        this.operateform.Attachment = ''
      }
      // 处理所属时间
      if (this.operateform.date) {
        this.operateform.Year = this.operateform.date.getFullYear()
        this.operateform.Month = this.operateform.date.getMonth() + 1;
      } else {
        this.operateform.Year = ''
        this.operateform.Month = ''
      }
      // console.log(this.operateform)
      this.$emit('savecost', this.operateform, true)
    }
  },
}
</script>

<style lang="scss" scoped>
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
</style>