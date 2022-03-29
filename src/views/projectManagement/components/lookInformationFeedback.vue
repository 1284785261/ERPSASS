<!-- 查看标前信息反馈表 -->
<template>
  <div class="add-project-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="projectform" label-position="top" :model="recruitform" label-width="140px" class="projectform">
        <!-- <div class="form-title">标前评估反馈</div>
        <div class="form-cont">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="投标评估人">
                <p>1111</p>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="标前评估">
                <el-input type="textarea" :rows="6" v-model="recruitform.EvaluateRule" disabled maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div> -->
        <div class="form-title">标前信息反馈</div>
        <div class="form-cont">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="投标被授权人">
                <el-select v-model="recruitform.TenderPerson" disabled filterable remote placeholder="请查询或下拉招标被授权人" @clear="clearCompany" :remote-method="remoteMethod" :loading="loading" class="select-input">
                  <el-option v-for="item in authorizedList" :key="item.Id" :label="item.UserName" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="投标时间" class="datetime">
                <el-date-picker v-model="recruitform.TenderTime" disabled value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="投标单位">
                <el-select v-model="recruitform.TenderCompany" disabled filterable remote placeholder="请查询或下拉投标单位" @clear="clearTender" :remote-method="TenderMethod" :loading="loading" class="select-input">
                  <el-option v-for="item in TheTenderList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="投标地点" class="path">
                <el-select v-model="postprovince" disabled filterable placeholder="选择省份">
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in postprovincelist" :key="index"></el-option>
                </el-select>
                <el-select v-model="postcity" disabled filterable placeholder="选择城市">
                  <el-option :label="item.Name" disabled :value="item.Id" v-for="(item, index) in postcitylist" :key="index"></el-option>
                </el-select>
                <el-select v-model="recruitform.TenderAreaId" disabled filterable placeholder="选择区县">
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in postarealist" :key="index"></el-option>
                </el-select>
                <el-input v-model="recruitform.TenderAddress" disabled placeholder="请输入详情地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="招标单位">
                <el-input v-model="recruitform.InviteCompany" disabled placeholder="请输入招标文件份数" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="保证金额度">
                <el-input v-model="recruitform.BondAmount" disabled>
                  <svg-icon slot="suffix" icon-class="money" placeholder="请输入保证金额度" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="招标文件份数">
                <el-input v-model="recruitform.TenderNum" disabled placeholder="请输入招标文件份数" />
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="招标开始时间" class="datetime">
                <el-date-picker v-model="recruitform.StartTime" disabled value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="招标结束时间" class="datetime">
                <el-date-picker v-model="recruitform.EndTime" disabled value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开标时间" class="datetime">
                <el-date-picker v-model="recruitform.OpenTime" disabled value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="交标时间" class="datetime">
                <el-date-picker v-model="recruitform.SubmitEndTime" disabled value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="保证金状态">
                <p v-if="recruitform.BondStatus =='0'">待缴</p>
                <p v-if="recruitform.BondStatus =='1'">已缴未退</p>
                <p v-if="recruitform.BondStatus =='2'">已退</p>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="结算方式能否修改">
                <p v-if="recruitform.ContractSettleModify =='0'">是</p>
                <p v-if="recruitform.ContractSettleModify =='1'">否</p>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="条款能否修改">
                <p v-if="recruitform.ContractTermModify =='0'">是</p>
                <p v-if="recruitform.ContractTermModify =='1'">否</p>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="保证金交付方式" class="text2">
                <el-input type="textarea" :rows="5" maxlength="500" disabled show-word-limit v-model="recruitform.BondType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="招标保证金账户信息" class="text2">
                <el-input type="textarea" :rows="5" maxlength="500" disabled show-word-limit v-model="recruitform.BondAccount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="结算方式" class="text2">
                <el-input type="textarea" :rows="5" maxlength="500" disabled show-word-limit v-model="recruitform.ContractSettleType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="不利条款" class="text2">
                <el-input type="textarea" :rows="5" maxlength="500" disabled show-word-limit v-model="recruitform.ContractBadTerm"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="招标服务模式" class="text2">
                <el-input type="textarea" :rows="5" maxlength="500" disabled show-word-limit v-model="recruitform.ServiceMode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="岗位名称数量情况" class="text2">
                <el-input type="textarea" :rows="5" maxlength="500" disabled show-word-limit v-model="recruitform.PositionDesc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="其他特殊要求" class="text2">
                <el-input type="textarea" :rows="5" maxlength="500" disabled show-word-limit v-model="recruitform.OtherRequire"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="针对项目的分析及前期准备工作" class="text2">
                <el-input type="textarea" :rows="5" maxlength="500" disabled show-word-limit v-model="recruitform.ProjectAnalysis"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="参加本次招标的公司(及各公司跟踪情况)" class="text">
                <el-input type="textarea" :rows="6" v-model="recruitform.Together" disabled maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="开标时需要出示资料" class="text">
                <el-input type="textarea" :rows="6" v-model="recruitform.OpenMaterial" disabled maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="评标主要原则" class="text">
                <el-input type="textarea" :rows="6" v-model="recruitform.EvaluateRule" disabled maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-title">上传标书附件</div>
        <div class="form-cont">
          <div class="tip">招标书附件</div>
          <div class="upload" v-loading="uploadLoading">
            <div v-for="(item,index) in RfpUrlList" :key="index" class="files" @mouseenter="fileShow(index,1)" @mouseleave="filenoShow(index,1)" v-loading="uploadLoading">
              <span class="filestype">{{item.filestype}}</span>
              <p>{{item.fileName}}</p>
              <div v-show="item.optionShow" class="option-button">
                <a @click="preview(item)">
                  <svg-icon icon-class="replace" class-name="svg-a" />预览
                </a>
                <a @click="downloadFile(item)">
                  <svg-icon icon-class="download" class-name="svg-a" />下载
                </a>
              </div>
            </div>
          </div>
          <div class="tip">投标书附件</div>
          <div class="upload" v-loading="uploadLoading">
            <div v-for="(item,index) in TenderUrlList" :key="index" class="files" @mouseenter="fileShow(index,2)" @mouseleave="filenoShow(index,2)" v-loading="uploadLoading">
              <span class="filestype">{{item.filestype}}</span>
              <p>{{item.fileName}}</p>
              <div v-show="item.optionShow" class="option-button">
                <a @click="preview(item)">
                  <svg-icon icon-class="replace" class-name="svg-a" />预览
                </a>
                <a @click="downloadFile(item)">
                  <svg-icon icon-class="download" class-name="svg-a" />下载
                </a>
              </div>
            </div>
          </div>
          <div class="tip">中标通知书</div>
          <div class="upload" v-loading="uploadLoading">
            <div v-for="(item,index) in NoticeUrlList" :key="index" class="files" @mouseenter="fileShow(index,3)" @mouseleave="filenoShow(index,3)" v-loading="uploadLoading">
              <span class="filestype">{{item.filestype}}</span>
              <p>{{item.fileName}}</p>
              <div v-show="item.optionShow" class="option-button">
                <a @click="preview(item)">
                  <svg-icon icon-class="replace" class-name="svg-a" />预览
                </a>
                <a @click="downloadFile(item)">
                  <svg-icon icon-class="download" class-name="svg-a" />下载
                </a>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="bottom">
      <el-button class="erpbtn" size="small" @click="$router.go(-1)">关闭</el-button>
    </div>
    <PreviewFile :isImg="isImg" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import { GetAreaList } from '@/api/Public.js'
import { GetBfCompanyInfo } from '@/api/BusinessSet.js'
import { GetSysUserList } from '@/api/SystemSetting.js'
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetProjectTenderEnum, GetProjectTenderInfo } from '@/api/projectManagement.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    PreviewFile
  },
  data () {
    return {
      urlList: [{
        name: '项目详情',
        router: '/projectManagement/ProjectDetail'
      }, {
        name: '查看标前信息反馈',
        router: ''
      }],
      authorizedList: [],//被授权人
      TheTenderList: [],//投标单位
      postprovince: '',
      postcity: '',
      postprovincelist: [],
      postcitylist: [],
      postarealist: [],
      ProjectTenderEnumBondStatus: [],//保证金状态
      recruitform: {
        TenderAreaId: ''
      },
      loading: false,
      RfpUrlList: [],//招标文件列表
      TenderUrlList: [],//投标文件列表
      NoticeUrlList: [],//中标文件列表
      uploadLoading: false,
      feedbackId: '',//反馈表ID
      isImg: 1,
      iframeShow: false,
      previewFileUrl: ''
    }
  },
  watch: {
    // 投标省变化
    postprovince (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.postcitylist = response.Data
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.postcitylist.find(v => {
              return v.Id == this.postcity
            })
            if (isclear) {
            } else {
              this.postcity = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.postcity = ''
        this.recruitform.AreaId = ''
        this.postcitylist = []
        this.postarealist = []
      }
    },
    // 投标市变化
    postcity (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.postarealist = response.Data
            let isclear = this.postarealist.find(v => {
              return v.Id == this.recruitform.AreaId
            })
            if (isclear) {
            } else {
              this.recruitform.AreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.postarealist = []
        this.recruitform.AreaId = ''
      }
    },
    // 投标地址反推
    "recruitform.TenderAreaId" (newvalue, oldvalue) {
      const str = this.postarealist.find(v => {
        return v.Id == newvalue
      })
      if (!str && !!newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var select = response.Data.filter(v => {
              return v.isselect
            })
            if (select.find(v => v.Level == 1) !== undefined) {
              this.postprovince = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.postcity = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.recruitform.TenderAreaId = select.find(v => v.Level == 3).Id
            } else {
              this.recruitform.TenderAreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    }

  },
  created () {
    this.getTenderEnum()
    this.getAreaList()
    // this.TenderMethod()
    if (this.$route.query.feedbackId) {
      this.feedbackId = this.$route.query.feedbackId
      this.getTenderInfo(this.feedbackId)
    } else {
      this.remoteMethod()
    }
    if (this.$route.query.Id) {
      this.urlList[0].router += `?Id=${this.$route.query.Id}`
    }
  },
  methods: {
    getTenderEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectTenderEnum(qs.stringify(obj)).then(response => {
        this.ProjectTenderEnumBondStatus = response.ProjectTenderEnumBondStatus
      })
    },
    // 获取一级地区
    getAreaList () {
      let obj = {
        ParentId: 0,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetAreaList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.postprovincelist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //查询申请人列表
    remoteMethod (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          UserName: query,
          Status: 1,
          PageIndex: 1,
          PageSize: 99,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetSysUserList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            this.authorizedList = response.Data
          } else {
            this.authorizedList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearCompany () {
      this.remoteMethod()
    },
    //查询投标单位
    TenderMethod (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          Name: query,
          Status: 1,
          PageIndex: 1,
          PageSize: 99,
          Type: -1,
          Status: 1,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            this.TheTenderList = response.Data
          } else {
            this.TheTenderList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearTender () {
      this.TenderMethod()
    },
    //编辑时获取数据
    getTenderInfo (Id) {
      let obj = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectTenderInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.recruitform = response.Data
          this.recruitform.ContractSettleModify += ''
          this.recruitform.ContractTermModify += ''
          this.authorizedList = [{
            Id: response.Data.TenderPerson,
            UserName: response.Data.TenderPersonName
          }]
          let obj1 = {
            Id: response.Data.TenderCompany,
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          GetBfCompanyInfo(qs.stringify(obj1)).then(res => {
            if (res.IsSuccess) {
              this.TheTenderList = [{
                Id: res.Data.Id,
                Name: res.Data.Name
              }]
            } else {
              this.$message({
                message: res.MessageContent,
                type: 'error'
              })
            }
          })
          if (this.recruitform.RfpUrl) {
            let arr = JSON.parse(this.recruitform.RfpUrl)
            for (let i = 0; i < arr.length; i++) {
              this.RfpUrlList.push({
                fileName: arr[i].fileName,
                RfpUrl: arr[i].Url,
                filestype: arr[i].fileName.slice(arr[i].fileName.lastIndexOf('.') + 1).toUpperCase(),
                optionShow: false
              })
            }
          }
          if (this.recruitform.TenderUrl) {
            let arr = JSON.parse(this.recruitform.TenderUrl)
            for (let i = 0; i < arr.length; i++) {
              this.TenderUrlList.push({
                fileName: arr[i].fileName,
                RfpUrl: arr[i].Url,
                filestype: arr[i].fileName.slice(arr[i].fileName.lastIndexOf('.') + 1).toUpperCase(),
                optionShow: false
              })
            }
          }
          if (this.recruitform.NoticeUrl) {
            let arr = JSON.parse(this.recruitform.NoticeUrl)
            for (let i = 0; i < arr.length; i++) {
              this.NoticeUrlList.push({
                fileName: arr[i].fileName,
                RfpUrl: arr[i].Url,
                filestype: arr[i].fileName.slice(arr[i].fileName.lastIndexOf('.') + 1).toUpperCase(),
                optionShow: false
              })
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 预览
    preview (data) {
      if (data.RfpUrl) {
        const ext = data.RfpUrl.slice(data.RfpUrl.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = data.RfpUrl
        } else if (ext == 'doc' || ext == 'docx') {
          this.isImg = 3
          this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + data.RfpUrl
        } else {
          this.isImg = 1
          this.previewFileUrl = data.RfpUrl
        }
        this.iframeShow = true
      } else {
        this.iframeShow = false
        this.$message({
          message: '该项目标书没有上传附件',
          type: 'error'
        })
      }
    },
    //下载文件
    downloadFile (data) {
      if (data.RfpUrl) {
        window.open(data.RfpUrl)
      } else {
        this.$message({
          message: '该项目标书没有上传附件',
          type: 'error'
        })
      }
    },
    closeFileShow (val) {
      this.iframeShow = val
    },
    // 移入文件显示操作
    fileShow (index, num) {
      if (num == 1) {
        this.RfpUrlList[index].optionShow = true
      } else if (num == 2) {
        this.TenderUrlList[index].optionShow = true
      } else if (num == 3) {
        this.NoticeUrlList[index].optionShow = true
      }

    },
    // 移出文件隐藏操作
    filenoShow (index, num) {
      if (num == 1) {
        this.RfpUrlList[index].optionShow = false
      } else if (num == 2) {
        this.TenderUrlList[index].optionShow = false
      } else if (num == 3) {
        this.NoticeUrlList[index].optionShow = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/publicStyle.scss";
.add-project-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .projectform {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 80px 40px;
    .form-title {
      font-size: $f16;
      color: $erp333;
      line-height: 16px;
      position: relative;
      padding-left: 12px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      > .operate {
        font-size: $f14;
        color: $erpplaceholder;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 16px;
        background-color: $erpcolor;
      }
    }
    // 表格样式
    .el-form-item {
      margin-bottom: 20px;
      .el-form-item__label {
        line-height: 14px;
        font-size: $f14;
        color: $erp666;
        font-weight: 400;
        padding-bottom: 8px;
      }
      .el-form-item__content {
        width: calc(100% - 64px);
        .el-input__inner {
          background-color: $erinputbgc;
        }
        .el-select {
          width: 100%;
        }
        .el-date-editor--datetimerange {
          width: 100%;
          border: 1px solid #fff;
        }
      }
      input {
        background: #f0f4fa;
        border: none;
        height: 40px;
        line-height: 40px;
      }
      textarea {
        background: #f0f4fa;
        border: none;
      }

      // 地址样式
      &.path {
        .el-form-item__content {
          max-width: 100%;
          .el-select {
            max-width: 240px;
            margin-right: 24px;
            margin-bottom: 24px;
          }
          .el-input {
            max-width: 336px;
          }
        }
      }
      // 文本框样式
      &.text {
        .el-form-item__content {
          max-width: 100%;
          .el-textarea__inner {
            resize: none;
            background-color: $erinputbgc;
          }
          .el-input__count {
            bottom: 2px;
            height: 30px;
            line-height: 30px;
            right: 20px;
            background: $erinputbgc;
          }
        }
      }
      &.text2 {
        .el-form-item__content {
          .el-textarea__inner {
            resize: none;
            background-color: $erinputbgc;
          }
          .el-input__count {
            bottom: 2px;
            height: 30px;
            line-height: 30px;
            right: 20px;
            background: $erinputbgc;
          }
        }
      }
      // 两个时间
      &.dategroup {
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
          .el-date-editor {
            max-width: 160px;
            display: inline-block;
          }
        }
      }
      // 时间选择器样式
      &.datetime {
        .el-form-item__content {
          .el-date-editor {
            width: 100%;
          }
        }
      }
      // vue-tree-input样式
      &.vue-tree {
        .el-form-item__content {
          .vue-treeselect {
            // min-height: 40px;
            height: 40px;
            .vue-treeselect__control {
              height: 40px;
              background-color: $erinputbgc;
              .vue-treeselect__value-container {
                height: 40px;
              }
              .vue-treeselect__control-arrow-container {
                height: 40px;
              }
            }
          }
        }
      }
      // 添加客户关联关系样式
      &.addrelation {
        .el-form-item__content {
          > span {
            cursor: pointer;
            > .svg-icon {
              margin-right: 10px;
            }
          }
        }
      }
    }
    // 循环的样式
    .form-cont {
      padding-bottom: 16px;
      margin-bottom: 40px;
      border-bottom: 1px solid $erpBK;
      &:last-child {
        border-bottom: none;
      }
      .post-list {
        position: relative;
        margin-bottom: 40px;
        padding-bottom: 16px;
        border-bottom: 1px solid $erpBK;
        // 最后一个添加联系人样式
        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
          .operate-btn {
            bottom: 24px;
          }
        }
        // 底部操作按钮
        .operate-btn {
          // position: absolute;
          // right: 0;
          // bottom: 0px;
          justify-content: flex-end;
          display: flex;
        }
        .btn {
          cursor: pointer;
          margin-left: 64px;
          font-size: $f14;
          color: $erpplaceholder;
        }
      }
    }
  }
  // 底部添加按钮
  .bottom {
    position: fixed;
    box-shadow: 0px 0px 20px 0px rgba(21, 136, 248, 0.1);
    bottom: 0;
    right: 0;
    margin-bottom: 0;
    text-align: center;
    width: calc(100% - 224px);
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    z-index: 999;
    .el-button + .el-button {
      margin-left: 24px;
    }
  }
}
.form-cont {
  .tip {
    font-size: $f14;
    color: $erp999;
    margin-bottom: 16px;
    margin-top: 25px;
  }
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
      float: left;
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
          width: 50%;
          display: inline-block;
          line-height: 30px;
          text-align: center;
          height: 30px;
          font-size: 14px;
          color: #fff;
          vertical-align: top;
          .svg-a {
            margin-right: 10px;
            font-size: 14px;
          }
          &:hover {
            color: #1588f8;
          }
        }
      }
    }
  }
}
</style>