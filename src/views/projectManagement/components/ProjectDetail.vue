<template>
  <!-- 项目详情 -->
  <div class="project-detail-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="project-content project-basis">
      <div class="babel babel-box">
        <el-tabs type="border-card" v-model="activeName" class="tabs-table" @tab-click="handleClick">
          <el-tab-pane label="项目信息" name="BusinessInformation">
            <BusinessInformation v-if="activeName == 'BusinessInformation'"></BusinessInformation>
          </el-tab-pane>
          <el-tab-pane label="项目报价信息" name="QuotationList" v-if="ProjectDetail.Status == '0' || ProjectDetail.Status == '2'">
            <QuotationList v-if="activeName == 'QuotationList'"></QuotationList>
          </el-tab-pane>
          <el-tab-pane label="招聘需求管理" name="InviteNeedManagement" v-if="(ProjectDetail.Status == '5' || ProjectDetail.Status == '6') && (ProjectDetail.BusinessType >= 1 && ProjectDetail.BusinessType <= 5)">
            <InviteNeedManagement v-if="activeName == 'InviteNeedManagement'" :BusinessType="BusinessType"></InviteNeedManagement>
          </el-tab-pane>
          <el-tab-pane label="项目合同管理" name="ProjectContract">
            <ProjectContract v-if="activeName == 'ProjectContract'"></ProjectContract>
          </el-tab-pane>
          <el-tab-pane label="员工合同管理" name="StaffContractManagement">
            <StaffContractManagement v-if="activeName == 'StaffContractManagement'"></StaffContractManagement>
          </el-tab-pane>
          <el-tab-pane label="项目招投标管理" v-if="ProjectDetail.Tender == '1'" name="TenderManagement">
            <TenderManagement v-if="activeName == 'TenderManagement'" @SupContract="SupContract"></TenderManagement>
          </el-tab-pane>
          <el-tab-pane label="提成设置" name="BusinessSetup">
            <BusinessSetup v-if="activeName == 'BusinessSetup'"></BusinessSetup>
          </el-tab-pane>
          <!-- <el-tab-pane label="服务提成设置" v-if="ProjectDetail.Status >= '5'" name="ServiceSetting">
            <ServiceSetting v-if="activeName == 'ServiceSetting'"></ServiceSetting>
          </el-tab-pane> -->
          <el-tab-pane label="项目成本管理" name="CostManagement">
            <CostManagement v-if="activeName == 'CostManagement'"></CostManagement>
          </el-tab-pane>
          <el-tab-pane label="项目员工管理" name="StaffManagement">
            <StaffManagement v-if="activeName == 'StaffManagement'"></StaffManagement>
          </el-tab-pane>
          <!-- <el-tab-pane label="招聘员工管理" v-if="ProjectDetail.Status < '6'" name="StaffRecruitment">
            <StaffRecruitment  v-if="activeName == 'StaffRecruitment'"></StaffRecruitment>
          </el-tab-pane> -->
          <el-tab-pane label="薪酬管理" name="PaymentManagement">
            <PaymentManagement v-if="activeName == 'PaymentManagement'"></PaymentManagement>
          </el-tab-pane>
          <el-tab-pane label="项目回款管理" name="MoneyManagement">
            <MoneyManagement v-if="activeName == 'MoneyManagement'" :CompanyId="CompanyId"></MoneyManagement>
          </el-tab-pane>
          <el-tab-pane label="项目数据看板" name="ProjectDataBoard">
            <ProjectDataBoard v-if="activeName == 'ProjectDataBoard'"></ProjectDataBoard>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="footer-button">
        <el-button class="erpbtn" size="small" @click="cancel">关闭</el-button>
      </div>
    </div>

    <!-- 右侧变更记录 -->
    <div :class="[buttonShow?'hiddenbutton':'buttonRight-name']">
      <a class="icon1" @click="showContent"><i class="el-icon-arrow-left"></i><span>项目变更记录</span></a>
    </div>
    <div :class="[buttonShow ? 'content-rights':'contenthidden-right']">
      <div class="button-name">
        <a class="icon2" @click="hiddenContent"><i class="el-icon-arrow-right"></i></a>
      </div>
      <div class="record-content">
        <div class="title-name">项目变更记录</div>
        <div class="erpscroll">
          <div class="record-box" v-for="(item, index) in porjectlist" :key="index">
            <div class="schedule">
              <div class="ring"></div>
              <div class="harp-line"></div>
            </div>
            <div class="record-con">
              <div class="record-time">{{item.AddTime | YYMMddhhmmssTime}}</div>
              <div class="alteration">
                <div class="alt-name">
                  <span>{{item.SysUserName}}</span>
                </div>
                <div class="alt-detail">{{item.Content}}</div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination background :current-page="currentPage" @current-change="handleCurrentChange" :pager-count="5" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MoneyManagement from './MoneyManagement.vue'
import StaffManagement from './StaffManagement.vue'
import ProjectDataBoard from './ProjectDataBoard.vue'
import CostManagement from './CostManagement.vue'
import InviteNeedManagement from './InviteNeedManagement.vue'
import StaffRecruitment from './StaffRecruitment.vue'
import PaymentManagement from './PaymentManagement.vue'
import StaffContractManagement from './StaffContractManagement.vue'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import BusinessInformation from './BusinessInformation.vue'
import QuotationList from './QuotationList.vue'
import ProjectContract from './ProjectContract.vue'
import TenderManagement from './TenderManagement.vue'
import BusinessSetup from './BusinessSetup.vue'
// import ServiceSetting from './ServiceSetting.vue'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import { GetProject, GetProjectLogsPageList } from '@/api/projectManagement.js'
import filters from '@/utils/filters'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    MoneyManagement,
    BusinessInformation,
    ProjectContract,
    TenderManagement,
    StaffContractManagement,
    PaymentManagement,
    ProjectDataBoard,
    CostManagement,
    StaffManagement,
    // StaffRecruitment,
    InviteNeedManagement,
    BusinessSetup,
    // ServiceSetting,
    QuotationList
  },
  data () {
    return {
      isSys: false, // 是否展示项目指派人员
      urlList: [{
        name: '项目管理',
        router: '/projectManagement/ProjectManagement'
      }, {
        name: '项目详情',
        router: ''
      }],
      activeName: 'BusinessInformation',
      porjectlist: [],
      buttonShow: false,
      ProjectDetail: {},//项目详情
      Contacts: [],//联系人
      BusinessType: '',//项目类型
      // 日志分页
      currentPage: 1,
      total: 0,
      CompanyId: '',
      operating: {}
    }
  },
  created () {
    // 获取操作operating
    this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
    // 判断是否显示项目指派人员
    if (this.$route.query.isSys) {
      this.isSys = true
    }
    if (sessionStorage.getItem('activeName')) {
      this.activeName = sessionStorage.getItem('activeName')
    }
    if (window.localStorage.getItem('breadpath')) {
      this.urlList[0] = JSON.parse(window.localStorage.getItem('breadpath'))
    }
    if (this.$route.query && this.$route.query.Id) {
      this.getDetail(this.$route.query.Id)
      this.getProjectLogsPageList()
    }

  },
  mounted () {
    let arr = this.urlList
    arr[1].router = this.$route.fullPath
    window.localStorage.setItem('multipleBreadpath', JSON.stringify(arr))
  },
  methods: {
    handleClick (tab) {
      sessionStorage.setItem('activeName', this.activeName)
    },
    showContent () {
      this.buttonShow = true
    },
    hiddenContent () {
      this.buttonShow = false
    },
    getDetail (Id) {
      let obj = {
        Id: Id,
        menuid: this.operating.MenuId,
        operationcode: this.operating.OperationCode
      }
      showLoading()
      GetProject(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          window.localStorage.setItem('projectdetail', JSON.stringify(response.Data))
          this.ProjectDetail = response.Data
          this.CompanyId = this.ProjectDetail.CompanyId
          this.BusinessType = this.ProjectDetail.BusinessType
          if (this.ProjectDetail.Contacts && this.ProjectDetail.Contacts.length > 0) {
            this.Contacts = this.ProjectDetail.Contacts
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //补充合同跳转
    SupContract (val) {
      if (val) {
        this.activeName = 'ProjectContract'
      }
    },
    cancel () {
      window.open('about:blank', '_self').close()
    },
    // 获取员工日志列表
    getProjectLogsPageList () {
      let obj = {
        ProjectId: this.$route.query.Id,
        PageIndex: this.currentPage,
        PageSize: 10,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectLogsPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.porjectlist = response.Data
          this.total = response.Total
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 选择页数
    handleCurrentChange (val) {
      this.currentPage = val
      this.getProjectLogsPageList()
    }
  }
}
</script>

<style lang="scss">
.project-detail-container {
  .bread {
    margin-left: 24px;
    // margin-bottom: 24px;
  }
}
.project-basis {
  background: #f2f3f9 !important;
  padding-left: 0 !important;
}
.project-content {
  // width: 100%;
  background: #fff;
  margin: 0 0 0 24px;
  padding: 24px 0 24px 24px;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  .babel-box {
    margin-bottom: 0 !important;
  }
  .babel {
    margin-bottom: 40px;
    width: 100%;
    &:last-child .babel-container {
      border-bottom: none;
    }
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
                color: #fff;
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
    .babel-Contacts {
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
        }
      }
    }
    .tabs-table {
      background: #fff;
      border: none;
      box-shadow: none;
      .el-tabs__header {
        border-bottom: 0;
        background: #f2f3f9;
        .el-tabs__nav-wrap {
          .el-tabs__nav {
            .el-tabs__item {
              border: none;
              background: #a5b0cc;
              margin-right: 4px;
              font-size: 14px;
              color: #fff;
              border-top-right-radius: 8px;
              border-top-left-radius: 8px;
            }
            .is-active {
              color: #333333;
              background: #fff;
            }
          }
        }
        .is-scrollable {
          padding: 0 40px;
          .el-tabs__nav-prev,
          .el-tabs__nav-next {
            background: #1387f4;
            line-height: 40px;
            width: 40px;
            color: #fff;
            margin: auto;
            text-align: center;
            i {
              font-size: 16px;
            }
          }
        }
        .el-tabs__content {
          padding: 24px;
        }
      }
    }
  }
}
.buttonRight-name {
  position: fixed;
  right: 0;
  top: 30%;
  background: #8e9298;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  transform: all 2s;
  z-index: 99;
  .icon1 {
    width: 40px;
    height: 120px;
    color: #fff;
    font-size: 14px;
    display: inline-block;
    i {
      font-size: 16px;
      line-height: 120px;
      vertical-align: top;
    }
    span {
      color: #fff;
      font-size: 14px;
      width: 20px;
      display: inline-block;
      line-height: 15px;
      margin-top: 14px;
    }
  }
}
.hiddenbutton {
  display: none;
}
.button-name {
  position: absolute;
  top: 34%;
  right: 0;
  width: 24px;
  background: #8e9298;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  transition: all 1s;
}
.contenthidden-right {
  position: fixed;
  right: -40%;
  top: 20%;
  width: 400px;
  opacity: 0;
}
.content-rights {
  position: fixed;
  right: 0;
  top: 20%;
  width: 400px;
  opacity: 1;
  transition: all 1s;
  z-index: 99;
  max-height: 70%;
  box-shadow: 2px 1px 15px #ccc;
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
  .button-name {
    background: #8e9298;
    position: absolute;
    left: -24px;
    top: 34%;
    .icon2 {
      width: 24px;
      height: 120px;
      color: #fff;
      display: inline-block;
      font-size: 14px;
      text-align: center;
      i {
        font-size: 16px;
        line-height: 120px;
      }
    }
  }
  .record-content {
    padding: 24px;
    background-color: $erinputbgc;
    border-radius: 8px;
    height: calc(100vh - 400px);
    .erpscroll {
      overflow-y: auto;
      height: calc(100vh - 520px);
    }
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
    .el-pagination {
      margin-top: 10px;
      text-align: center;
    }
  }
}
.footer-button {
  text-align: center;
  background: #ffffff;
  padding-bottom: 20px;
}
</style>