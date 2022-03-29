<!-- 关联回款流水详情 -->
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <div class="From-header">
        <BreadCrumb :url-list="urlList" />
      </div>
      <div class="table-content">
        <div class="operate-table">
          <el-table ref="industrtTable" v-loading="tableloading" :data="InsuranceInfoObj" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" show-summary :summary-method="getSummaries">
            <el-table-column align="center" prop="Id" label="序号" min-width="50">
              <template slot-scope="scope">
                <span>{{scope.row.Id}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="ApplyTime" label="代垫申请时间" min-width="130">
              <template slot-scope="scope">
                <span>{{scope.row.ApplyTime | Time}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Amount" label="代垫金额" min-width="70">
              <template slot-scope="scope">
                <span>￥{{scope.row.Amount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="ActualAmountCashed" label="挂账抵扣金额" min-width="100">
              <template slot-scope="scope">
                <span>￥{{scope.row.ActualAmountCashed}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="PayTime" label="回款日期" min-width="130">
              <template slot-scope="scope">
                <span>{{scope.row.PayTime | YYMMddhhmmssTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="DayNumber" label="回款周期" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.DayNumber}}天</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="AmountCashed" label="实际抵扣金额" min-width="100">
              <template slot-scope="scope">
                <span>￥{{scope.row.AmountCashed}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="WaitAmount" label="待抵扣金额" min-width="100">
              <template slot-scope="scope">
                <span>￥{{scope.row.WaitAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="OverdueAmount" label="逾期金额" min-width="100">
              <template slot-scope="scope">
                <span>￥{{scope.row.OverdueAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="OverdueInterest" label="资金占用费" min-width="100">
              <template slot-scope="scope">
                <span>￥{{scope.row.OverdueInterest}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="发票附件" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <a class="watchcode" @click="ShowAttachUrl(scope.row.Annex)" target="_blank">{{scope.row.Annex}}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <svg-icon icon-class="setting" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <ul class="popout-list">
                      <el-dropdown-item @click.native="AddInvoiceFile(scope.row)">添加发票附件</el-dropdown-item>
                      <el-dropdown-item @click.native="revocation(scope.row)">撤销</el-dropdown-item>
                    </ul>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
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
                  <img src="../../../assets/upload.png">
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
      <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
    </div>
  </div>
</template>
<script>
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { GetSubstituteCushionDeductionList, AddSubstituteCushionDeductionAnnex, RevokeSubstituteCushionDeduction } from '@/api/CompensationServiceManagement.js'
import qs from 'qs'
import axios from 'axios'
import { MenuIdDate, showLoading, hideLoading, uuid } from '@/utils/CustomValidation'
import filters from '@/utils/filters'
export default {
  components: {
    BreadCrumb,
    PreviewFile
  },
  data () {
    return {
      urlList: [{
        name: '代垫管理',
        router: '/CompensationServiceManagement/ActingMatManagement'
      }, {
        name: '代垫抵扣记录',
        router: ''
      }],
      Ids: 0,
      tableloading: false,
      InsuranceInfoObj: [],
      operates: [], // 获取页面权限
      money: 0,
      isImg: 1,
      previewFileUrl: '',
      titlename: '发票附件预览',
      iframeShow: false,
      files: '',
      FileDatas: [],
      UrlList: [],
      optionShow: false,
      filestype: '',
      fileName: '',
      Files: '',
      uploadLoading: false,
      showSixtoDeduct: false,
    }
  },
  created () {
    this.operates = JSON.parse(localStorage.getItem('operating'));
    if (this.$route.query && this.$route.query.Id) {
      this.GetSubstituteCushionDeductionList(this.$route.query.Id)
    }
  },
  methods: {
    ShowAttachUrl (e) {
      if (e) {
        const ext = e.slice(e.lastIndexOf('.') + 1).toLowerCase()
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
    //关闭弹窗
    close () {
      this.Files = ''
      this.fileName = ''
      this.filestype = ''
      this.showSixtoDeduct = false
    },
    //保存
    dialogtrue () {
      if (this.Files != '') {
        let obj = {
          Id: this.Ids,
          Annex: this.Files,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        AddSubstituteCushionDeductionAnnex(obj).then(res => {
          if (res.MessageCode == 0) {
            this.$message({
              type: 'success',
              message: '上传发票附件成功'
            })
            this.showSixtoDeduct = false
            this.GetSubstituteCushionDeductionList(this.$route.query.Id)
          } else {
            this.$message({
              type: 'error',
              message: res.MessageContent
            })
          }
        })
      }
    },
    // 处理合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '小计'
        } else if (index === 2 || index === 3 || index === 6 || index === 7 || index === 8 || index === 9) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] = '￥' + sums[index]
          } else {
            sums[index] = 'N/A'
          }
        } else {
          sums[index] = '--'
        }
      })
      return sums
    },
    // 移入文件显示操作
    fileShow () {
      this.optionShow = true
    },
    // 移出文件隐藏操作
    filenoShow () {
      this.optionShow = false
    },
    //删除输入框
    reduceDomain (idx) {
      this.dynamicValidateForm.domains.splice(idx, 1)
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
    //关闭预览
    closeFileShow (val) {
      this.iframeShow = val
    },
    //添加发票附件
    AddInvoiceFile (data) {
      this.showSixtoDeduct = true
      this.Ids = data.Id
    },
    //撤销
    revocation (data) {
      this.$confirm('此操作将撤销该列表对应的代垫信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          Id: data.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        RevokeSubstituteCushionDeduction(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.MessageCode == 0) {
            this.$message({
              type: 'success',
              message: '撤销代垫成功!'
            })
            this.GetSubstituteCushionDeductionList()
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
          message: '已取消撤销'
        })
      })
    },
    GetSubstituteCushionDeductionList (Id) {
      let obj = {
        SubstituteCushionId: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      GetSubstituteCushionDeductionList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data) {
            // console.log(response.Data);
            this.InsuranceInfoObj = response.Data
            // this.InsuranceInfoObj.forEach(data=>{
            //   this.money+=data.OverdueInterest
            // })
          }
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.subtotal {
  // display: flex;
  width: 100%;
  height: 40px;
  margin-top: 30px;
  text-align: center;
  line-height: 40px;
  // span{
  //   flex: 1;
  // }
}
.watchcode {
  color: rgb(21, 174, 245);
}
.From-header {
  margin-left: 20px;
  margin-bottom: 24px;
}
.dialog-footer-multiple {
  text-align: center;
}
.ToolTips {
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  color: #e7a23c;
  margin-bottom: 20px;
  i {
    font-size: 18px;
    display: inline-block;
    line-height: 25px;
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
</style>