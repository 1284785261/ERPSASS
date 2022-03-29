// 客户详情
<template>
  <div class="customer-detail-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="detail-content">
      <!-- 左侧详情 -->
      <div class="content-left">
        <div class="babel">
          <div class="title-name">基本信息</div>
          <div class="babel-container">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">客户单位名称</div>
                  <div class="content-detail">{{customerdata.Name}}</div>
                </div>
                <div class="content">
                  <div class="content-label">客户编码</div>
                  <div class="content-detail">{{customerdata.Code}}</div>
                </div>
                <div class="content">
                  <div class="content-label">客户单位简称</div>
                  <div class="content-detail">{{customerdata.ShortName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">业务类型</div>
                  <div class="content-detail">
                    <span v-for="(item, index) in BusinessTypelist" :key="index">{{item.describe}} &nbsp;</span>
                  </div>
                </div>
                <div class="content">
                  <div class="content-label">管理执行权</div>
                  <div class="content-detail">{{customerdata.MgrRightText}}</div>
                </div>
                <div class="content">
                  <div class="content-label">客户公司规模</div>
                  <div class="content-detail">{{customerdata.SizeText}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">组织机构代码</div>
                  <div class="content-detail">{{customerdata.CertNo}}</div>
                </div>
                <div class="content">
                  <div class="content-label">单位性质</div>
                  <div class="content-detail">{{customerdata.NatureText}}</div>
                </div>
                <div class="content">
                  <div class="content-label">所属行业</div>
                  <div class="content-detail">{{getIndustrtname}}</div>
                </div>
                <div class="content">
                  <div class="content-label">客户公司联系方式</div>
                  <div class="content-detail">{{customerdata.Tel}}</div>
                </div>
                <div class="content">
                  <div class="content-label">客户等级</div>
                  <div class="content-detail">{{customerdata.SizeText}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="content">
                  <div class="content-label">客户公司地址</div>
                  <div class="content-detail">{{provinceName}} {{cityName}} {{AreaIdName}} &nbsp; {{customerdata.Addr}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="content">
                  <div class="content-label">客户介绍</div>
                  <div class="content-detail text">{{customerdata.Intro}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-for="(item, index) in RelationList" :key="index">
                <div class="content">
                  <div class="content-label">客户关联公司</div>
                  <div class="content-detail">{{item.RelationCompanyName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">关联关系</div>
                  <div class="content-detail">{{item.RelationType | RelationType}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="babel">
          <div class="title-name">客户NC信息</div>
          <div class="babel-container">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">客户NC编码</div>
                  <div class="content-detail">{{customerdata.NCCode}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="babel" v-if="customercontact.length > 0">
          <div class="title-name">客户联系人信息</div>
          <div class="babel-container">
            <el-row v-for="(item, index) in customercontact" :key="index" class="follow-row">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">客户联系人</div>
                  <div class="content-detail">{{item.UserName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">联系人职位</div>
                  <div class="content-detail">{{item.PositionName}}</div>
                </div>
                <div class="content">
                  <div class="content-label">获客时间</div>
                  <div class="content-detail">{{item.AddTime | YYMMddhhmmssTime}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">联系电话</div>
                  <div class="content-detail">{{item.Tel}}</div>
                </div>
                <div class="content">
                  <div class="content-label">联系人邮箱</div>
                  <div class="content-detail">{{item.Email}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="babel" v-if="customerfollow.length > 0">
          <div class="title-name">客户跟进信息</div>
          <div class="babel-container">
            <el-row v-for="(item, index) in customerfollow" :key="index" class="follow-row">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">跟进时间</div>
                  <div class="content-detail">{{item.FollowTime | Time}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">跟进人</div>
                  <div class="content-detail">{{item.SysUserName}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="content">
                  <div class="content-label">跟进内容</div>
                  <div class="content-detail">{{item.Content}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">关联的代办任务</div>
                  <div class="content-detail">{{item.TaskContent}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="content">
                  <div class="content-label">跟进方式</div>
                  <div class="content-detail">{{item.StepText}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="babel" v-if="filterlist.length > 0">
          <div class="title-name">客户资料附件</div>
          <div class="babel-container">
            <div class="file-cont" v-loading="fileloading">
              <div class="img-box-list" v-if="filterlist.length!=0" v-for="(item, index) in filterlist" :key="index" @mouseenter="item.visible=!item.visible" @mouseleave="item.visible=!item.visible">
                <!-- 上传文件成功后展示 -->
                <div class="img-box">
                  <span class="filetype">{{item.name}}</span>
                  <div class="filename" :title="item.Url">{{item.Url}}</div>
                </div>
                <div class="img-box-hover" v-show="item.visible==true">
                  <div class="btn" @click="watch(item)">
                    <svg-icon icon-class="replace" class-name="svg-a" />
                    <span>预览</span>
                  </div>
                  <div class="btn" @click="down(item)">
                    <svg-icon icon-class="del" class-name="svg-a" />
                    <span>下载</span>
                  </div>
                  <!-- <div class="btn">
                    <input type="file" accept=".doc,.docx,.pdf,.png,.jpg" name="" id="" @change="uploadfile($event, index)">
                    <svg-icon icon-class="money" />
                    <span>重新上传</span>
                  </div>
                  <div class="btn" @click="deletefile(index)">
                    <svg-icon icon-class="money" />
                    <span>删除</span>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧变更记录 -->
      <div class="content-right">
        <div class="title-name">客户变更记录</div>
        <div class="record-content">
          <div class="record-box" v-for="(item, index) in companylist" :key="index">
            <div class="schedule">
              <div class="ring"></div>
              <div class="harp-line"></div>
            </div>
            <div class="record-con">
              <div class="record-time">{{item.AddTime | YYMMddhhmmssTime}}</div>
              <div class="alteration">
                <div class="alt-name">
                  <span>{{item.UserName}}</span>
                </div>
                <div class="alt-detail">{{item.Content}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PreviewFile :isImg="isImg" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>

<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import { GetCompanyInfo, GetCompanyContactList, GetCompanyFollowList, GetCompanyRelationList, GetCompanyChangePageList } from '@/api/CustomerManagement.js'
import { GetAreaList, CompanyBusinessRegEnumBusinessType, GetCatagoryList } from '@/api/Public.js'
import { showLoading, hideLoading, MenuIdDate } from '@/utils/CustomValidation.js'
import filters from '@/utils/filters'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    PreviewFile
  },
  filters: {
    kong (value) {
      if (value) {
        return value
      } else {
        return ''
      }
    },
    RelationType (value) {
      const val = parseInt(value)
      let msg = ''
      switch (val) {
        case 0: msg = '父级公司'; break
        case 1: msg = '分公司'; break
        case 2: msg = '子公司'; break
        default:
          msg = ''
      }
      return msg
    },
    Step (value) {
      const val = parseInt(value)
      let msg = ''
      switch (val) {
        case 0: msg = '问卷调查'; break
        case 1: msg = '电话预约'; break
        case 2: msg = '客户回访'; break
        case 3: msg = '客户询价'; break
        case 4: msg = '技术谈判'; break
        default:
          msg = ''
      }
      return msg
    }
  },
  data () {
    return {
      urlList: [{
        name: '我的客户',
        router: '/CustomerManagement/MyCustomer'
      }, {
        name: '客户详情',
        router: ''
      }],
      customerdata: {}, // 客户对象
      RelationList: [], // 客户联系人
      customercontact: [], // 联系人对象
      customerfollow: [], // 客户跟进信息
      companylist: [], // 客户变更记录
      BusinessTypelist: [], // 报备类型
      getIndustrtname: '', // 所属行业
      fileloading: false,
      filterlist: [],
      provinceName: '',
      cityName: '',
      AreaIdName: '',
      Id: '', // 客户Id
      isImg: 1,
      iframeShow: false,
      previewFileUrl: '',
      operating: {}
    }
  },
  watch: {
    // 客户业务类型
    "customerdata.BusinessTypeArr" (newvalue, oldvalue) {
      if (newvalue) {
        let array = []
        array = newvalue.split(',')
        var mewres
        // 获取公司报备类型
        this.BusinessTypelist = []
        let obj = {
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        CompanyBusinessRegEnumBusinessType(qs.stringify(obj)).then(response => {
          if (response) {
            mewres = response.filter(v => {
              for (let i = 0; i < array.length; i++) {
                if (v.value == array[i]) {
                  return v
                }
              }
            })
            this.BusinessTypelist = mewres
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    // 所属行业
    "customerdata.IndustryId" (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          ClassName: '',
          Status: 1,
          ClassType: 1,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetCatagoryList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.find(response.Data, newvalue)
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
    // 获取操作operating
    this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
    this.Id = this.$route.query.id
    // 获取面包屑的内容
    let breadpath = JSON.parse(window.localStorage.getItem('breadpath')) || {}
    if (breadpath.router) {
      this.urlList[0] = breadpath
    }
    this.getCompanyInfo()
    this.getCompanyRelationList()
    this.getCompanyContactList()
    this.getCompanyFollowList()
    this.getCompanyChangePageList()
  },
  methods: {
    // 获取客户信息
    getCompanyInfo () {
      let obj = {
        Id: this.Id,
        menuid: this.operating.MenuId,
        operationcode: this.operating.OperationCode
      }
      showLoading()
      GetCompanyInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.customerdata = response.Data
          // 处理地址0
          if (response.Data.AreaId === 0) {
            response.Data.AreaId = ''
          } else {
            let obj = {
              AreaId: response.Data.AreaId,
              menuid: MenuIdDate(),
              operationcode: '1'
            }
            GetAreaList(qs.stringify(obj)).then(response => {
              if (response.IsSuccess) {
                var select = response.Data.filter(v => {
                  return v.isselect
                })
                if (select.find(v => v.Level == 1) !== undefined) {
                  this.provinceName = select.find(v => v.Level == 1).Name
                }
                if (select.find(v => v.Level == 2) !== undefined) {
                  this.cityName = select.find(v => v.Level == 2).Name
                }
                if (select.find(v => v.Level == 3) !== undefined) {
                  this.AreaIdName = select.find(v => v.Level == 3).Name
                } else {
                  this.AreaIdName = ''
                }
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: 'error'
                })
              }
            })
          }
          // 文件处理
          this.filterlist = []
          if (response.Data.CertPic) {
            var arry = response.Data.CertPic.split(';')
            for (let i = 0; i < arry.length; i++) {
              var namelist = arry[i].split('.')
              this.filterlist.push({
                name: namelist[namelist.length - 1],
                Url: arry[i],
                visible: false
              })
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    },
    find (arry, value) {
      for (let i = 0; i < arry.length; i++) {
        if (arry[i].children && arry[i].children.length) {
          this.find(arry[i].children, value)
        } else {
          if (arry[i].Id == value) {
            this.getIndustrtname = arry[i].ClassName
          }
        }
      }
    },

    // 获取客户联系
    getCompanyRelationList () {
      let obj = {
        CompanyId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCompanyRelationList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.RelationList = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取客户信息联系人
    getCompanyContactList () {
      let obj = {
        CompanyId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCompanyContactList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.customercontact = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取客户跟进人信息
    getCompanyFollowList () {
      let obj = {
        CompanyId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCompanyFollowList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.customerfollow = response.Data
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取客户变更记录
    getCompanyChangePageList () {
      let obj = {
        PageIndex: 1,
        PageSize: 999,
        CompanyId: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCompanyChangePageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.companylist = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },

    // 预览
    watch (e) {
      if (e.Url) {
        const ext = e.Url.slice(e.Url.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = e.Url
        } else if (ext == 'doc' || ext == 'docx' || ext == 'xls' || ext == 'xlsx') {
          this.isImg = 3
          this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + e.Url
        } else {
          this.isImg = 1
          this.previewFileUrl = e.Url
        }
        this.iframeShow = true
      }
    },
    // 下载
    down (e) {
      window.open(e.Url)
    },
    closeFileShow (val) {
      this.iframeShow = val
    },
  }
}
</script>

<style lang="scss">
.customer-detail-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .detail-content {
    border-radius: 8px 0 0 8px;
    background-color: #fff;
    margin-left: 24px;
    padding: 40px 24px 40px 40px;
    display: flex;
    .content-left {
      flex: 1;
      .babel {
        margin-bottom: 40px;
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
          margin-right: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid $erpBK;
          .content {
            display: flex;
            font-size: $f14;
            line-height: 14px;
            margin-bottom: 24px;
            .content-label {
              margin-right: 12px;
              width: 114px;
              text-align: right;
              font-weight: 700;
            }
            .content-detail {
              flex: 1;
              color: $erp999;
              &.text {
              }
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
          // 附件样式
          .file-cont {
            display: flex;
            flex-wrap: wrap;
            .img-box-list {
              width: 160px;
              height: 120px;
              position: relative;
              margin-bottom: 40px;
              > input {
                position: absolute;
                width: 100%;
                height: 100%;
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
                  margin: 12px 24px 0 24px;
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
                background-color: rgba(0, 0, 0, 1);
                opacity: 0.4;
                bottom: 0;
                display: flex;
                justify-content: center;
                border-radius: 0 0 8px 8px;
                .btn {
                  position: relative;
                  cursor: pointer;
                  > input {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    position: absolute;
                    cursor: pointer;
                  }
                  .svg-icon {
                    font-size: $f14;
                  }
                  > span {
                    font-size: $f14;
                    color: #fff;
                    padding-left: 4px;
                  }
                }
                .btn + .btn {
                  margin-left: 24px;
                }
              }
            }
            .img-box-list + .img-box-list {
              margin-left: 24px;
            }
          }
        }
      }
    }
    .content-right {
      width: 400px;
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
      .record-content {
        padding: 24px;
        background-color: $erinputbgc;
        border-radius: 8px;
        max-height: calc(100vh - 90px);
        overflow-y: auto;
        .record-box {
          display: flex;
          .schedule {
            width: 16px;
            .ring {
              width: 16px;
              height: 16px;
              border-radius: 8px;
              background-color: #fff;
              position: relative;
              &::after {
                content: "";
                position: absolute;
                width: 8px;
                height: 8px;
                border-radius: 4px;
                background-color: $erpcolor;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
            .harp-line {
              width: 2px;
              height: calc(100% - 16px);
              background-color: $erpcolor;
              margin-left: 7px;
            }
          }
          .record-con {
            flex: 1;
            padding-left: 16px;
            .record-time {
              line-height: 14px;
              font-size: $f14;
              color: $erp333;
              font-weight: 700;
            }
            .alteration {
              display: flex;
              align-items: center;
              padding: 16px 0;
              .alt-name {
                font-size: $f14;
                line-height: 14px;
                background-color: rgba(21, 136, 248, 0.1);
                padding: 5px 10px;
                border-radius: 8px;
                height: 24px;
                > span {
                  color: $erpcolor;
                  font-size: $f14;
                }
              }
              .alt-detail {
                flex: 1;
                padding-left: 16px;
                font-size: $f14;
                color: $erp999;
              }
            }
          }
        }
      }
    }
  }
}
</style>