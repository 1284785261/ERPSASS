//添加信息反馈表
<template>
  <div class="AddBidInformationFeedback-Box">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="ruleForm" label-position="top" :model="dataObject" :rules="Formrules" label-width="140px" class="projectform">
        <div class="form-title">
          第一阶段
        </div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="招标单位" prop="BiddingUnit">
                <el-select v-model="dataObject.BiddingUnit" size="small" clearable disabled @click.native="remoteCompany('')" :remote-method="remoteCompany" @clear="clearCompany" filterable remote placeholder="请选择所属客户" :loading="loading" class="select-input">
                  <el-option v-for="item in BiddingUnitList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-form-item label="项目名称" prop="ProjectName">
                <el-select v-model="dataObject.ProjectName" size="small" clearable disabled :remote-method="remoteProject" @clear="clearProject" filterable remote placeholder="请选择项目名称" :loading="loading" class="select-input">
                  <el-option v-for="item in ProjectNameList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="招标项目名称" prop="BiddingProjectName">
                <el-input v-model="dataObject.BiddingProjectName" clearable placeholder="请输入招标项目名称" :disabled="disabled" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-form-item label="招标项目编号" prop="BiddingProjectId">
                <el-input v-model="dataObject.BiddingProjectId" clearable :disabled="disabled" placeholder="请输入招标项目编号" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="开标截止时间" prop="BuyBidClosingTime" class="Date">
                <el-date-picker v-model="dataObject.BuyBidClosingTime" size="small" clearable :disabled="disabled" type="datetime" placeholder="请选择开标截止时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-form-item label="投标单位" prop="Bidder">
                <el-select v-model="dataObject.Bidder" size="small" clearable :disabled="disabled" filterable remote placeholder="请选择集团投标单位" :loading="loading" class="select-input">
                  <el-option v-for="item in BidderList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
               <el-form-item label="业务类型" prop="BusinessType" v-if="this.BiddingInformation.name=='查看标前标后信息反馈'">
          <el-select v-model="dataObject.BusinessType" :disabled="disabled" clearable filterable remote placeholder="请查询或下拉招标被授权人" :loading="loading" class="select-input">
            <el-option v-for="item in BusinessTypeList" :key="item.value" :label="item.describe" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
             </el-col> -->
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="招标代理" prop="BiddingAgency" class="recipientMan">
                <el-input v-model="dataObject.BiddingAgency" placeholder="请输入招标代理" clearable :disabled="disabled" size="small">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-form-item label="申请人" prop="Applicant" class="recipientPhone">
                <el-input v-model="dataObject.Applicant" disabled clearable size="small" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-form-item label="申请部门" prop="ApplicationDepartment">
                <el-select v-model="dataObject.ApplicationDepartment" clearable size="small" :disabled="disabled" filterable remote placeholder="请选择申请部门" :loading="loading">
                  <el-option v-for="item in ApplicationDepartmentList" :key="item.OrgId" :label="item.FullOrgName" :value="item.OrgId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="采购需求" prop="ProcurementDemand" class="text">
                <el-input v-model="dataObject.ProcurementDemand" placeholder="请输入采购需求" size="small" type="textarea" resize="none" :rows="2" maxlength="100" show-word-limit :disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="是否缴纳投标保证金" prop="WhetherPayBidSecurity" class="recipientPhone">
                <el-radio v-model="dataObject.WhetherPayBidSecurity" :disabled="disabled" label="1">是</el-radio>
                <el-radio v-model="dataObject.WhetherPayBidSecurity" :disabled="disabled" label="0">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" v-if="dataObject.WhetherPayBidSecurity == 1">
              <el-form-item label="投标保证金额" prop="BidSecurityAmount" class="recipientMan">
                <el-input v-model="dataObject.BidSecurityAmount" clearable :disabled="disabled" size="small">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-if="dataObject.WhetherPayBidSecurity == 1">
              <el-form-item label="汇出账号信息" prop="ExportAccountInformation" class="text">
                <el-input v-model="dataObject.ExportAccountInformation" resize="none" placeholder="请输入汇出账号信息" type="textarea" :rows="5" maxlength="1000" show-word-limit clearable :disabled="disabled" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="项目招标文件附件上传" v-model="dataObject.Files" prop="Files" class="recipientPhone file">
                <div class="tip">
                  上传附件电子档/文件大小不超过25M,上传格式PNG.JPG.Word.PDF.XLSX.XLS
                </div>
                <div class="upload">
                  <div v-if="fileName" class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()" v-loading="uploadLoading">
                    <span class="filestype">{{ filestype }}</span>
                    <p>{{ fileName }}</p>
                    <div v-show="optionShow" class="option-button">
                      <a>
                        <svg-icon icon-class="replace" class-name="svg-a" />替换
                        <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="replaceFile" @change="uploadFile" />
                      </a>
                      <a @click="delFiles">
                        <svg-icon icon-class="del" class-name="svg-a" />删除
                      </a>
                    </div>
                  </div>
                  <div class="files" v-else v-loading="uploadLoading">
                    <img src="../../../assets/upload.png" />
                    <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" @change="uploadFile" />
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-title">
          第二阶段
        </div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="合作分类">
                <el-radio v-model="Business" :disabled="disabled" label="0">新增业务</el-radio>
                <el-radio v-model="Business" :disabled="disabled" label="1">持有业务（老业务，到期重新招投标）</el-radio>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-form-item label="授权代表" prop="AuthorizedRepresentative">
                <el-select v-model="dataObject.AuthorizedRepresentative" size="small" :remote-method="GetSysUserList" :disabled="disabled" clearable filterable remote placeholder="请查询或下拉招标被授权人" :loading="loading" class="select-input">
                  <el-option v-for="item in AuthorizedRepresentativeList" :key="item.Id" :label="item.UserName" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="跟单情况分析" class="text">
                <el-input v-model="dataObject.DocumentaryAnalysis" resize="none" placeholder="跟单概括，客情关系，了解到什么项目情况" type="textarea" :rows="5" maxlength="1000" show-word-limit clearable :disabled="disabled" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="风险评估" class="text">
                <el-input v-model="dataObject.RiskAssessment" resize="none" placeholder="是否缴纳社保，有何风险，承担比例" type="textarea" :rows="5" maxlength="1000" show-word-limit clearable :disabled="disabled" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="利润评估" class="text">
                <el-input v-model="dataObject.ProfitEvaluation" resize="none" placeholder="总项目利润总额，核算过程" type="textarea" :rows="5" maxlength="1000" show-word-limit clearable :disabled="disabled" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="服务执行重点难点" prop="BiddingFileCost" class="text">
                <el-input v-model="dataObject.ImportantAndDifficult" resize="none" placeholder="服务执行有哪些重点难点需要关注，如招聘、外包服务" type="textarea" :rows="5" maxlength="1000" show-word-limit clearable :disabled="disabled" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="有哪些公司参与本项目投标" prop="PurchaseBidMethod" class="text">
                <el-input v-model="dataObject.ParticipateBidding" resize="none" placeholder="将已知参与本项目的公司一一列出" type="textarea" :rows="5" maxlength="1000" show-word-limit clearable :disabled="disabled" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="对投标文件要求" prop="MaterialsRequirements" class="text">
                <el-input v-model="dataObject.BiddingFileRequirements" resize="none" placeholder="需要在投标文件中重点突出什么内容" type="textarea" :rows="5" maxlength="1000" show-word-limit clearable :disabled="disabled" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="footer-button">
      <el-button class="erpbtn" size="small" @click.native="cancel">关闭</el-button>
      <el-button class="erpbtn" size="small" @click.native="SaveDraft('ruleForm')">存为草稿</el-button>
      <el-button class="erpbtn" size="small" @click.native="SubmitApproval('ruleForm')">提交送审</el-button>
    </div>
    <div class="footer-button" v-if="this.BiddingInformation.name == '查看标前标后信息反馈'">
      <el-button class="erpbtn" size="small" @click.native="cancel">关闭</el-button>
    </div>
    <div class="footer-button" v-if="this.BiddingInformation.name == '上传标书附件'">
      <el-button class="erpbtn" size="small" @click.native="cancel">取消</el-button>
      <el-button class="erpbtn" size="small" @click.native="SaveFile">保存</el-button>
    </div>
  </div>
</template>
<script>
import PreviewFile from "@/components/publicComponents/PreviewFile.vue";
import {
  GetBiddingInformationInfo,
  AddBiddingInformation,
  EditBiddingInformationBase,
  EditBiddingInformationBaseAttach
} from "@/api/Bidding.js";
import { GetSysUserList, GetOrgByUserId } from "@/api/SystemSetting.js";
import { GetProjectBusinessType } from "@/api/projectManagement.js";
import { GetBfCompanyPageList } from "@/api/BusinessSet.js";
import { GetProjectList } from "@/api/projectManagement.js";
import { GetCompanyPageList } from "@/api/CustomerManagement.js";
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import SupperUploader from "@/utils/SupperUploader";
import {
  MenuIdDate,
  showLoading,
  hideLoading,
  uuid,
  copy
} from "@/utils/CustomValidation.js";
import axios from "axios";
import qs from "qs";
export default {
  components: { BreadCrumb, PreviewFile },
  data() {
    return {
      previewFileUrl: "",
      iframeShow: false,
      isImg: 1,
      titlename: "合同附件预览",
      visible: false,
      visibled: false,
      shows: false,
      show: false,
      showed: false,
      urlList: [],
      dataObject: {
        BiddingUnit: "",
        ProjectName: "",
        BiddingProjectName: "",
        BiddingProjectId: "",
        BuyBidClosingTime: "",
        Bidder: "",
        BusinessType: "",
        BiddingAgency: "",
        DocumentaryAnalysis: "",
        RiskAssessment: "",
        ProfitEvaluation: "",
        ImportantAndDifficult: "",
        ParticipateBidding: "",
        BiddingFileRequirements: "",
        BidSecurityAmount: "",
        ExportAccountInformation: "",
        ProcurementDemand: "",
        WhetherPayBidSecurity: "",
        Files: "",
        Merchandiser: "",
        Applicant: "",
        ApplicationDepartment: "",
        AuthorizedRepresentative: "",
        BiddingEvaluationOpinions: "",
        OpinionsBusinessLeaders: "",
        OpinionsLeadersChargeMarketing: "",
        BiddingOpinions: "",
        OpinionsCompanyLeaders: "",
        BiddingCollaboration: "",
        ProjectPersonCharge: "",
        TechnicalProposalLeader: "",
        WinningFallingBid: "",
        BidWinner: "",
        BidWinningGrossProfit: "",
        ResultsAnalysis: "",
        AnalysisAndHarvest: "",
        BiddingOtherSituations: "",
        InsuranceDepositRefund: "",
        ReturnAmount: "",
        ReturnTime: "",
        OtherSituations: "",
        ReturnVoucherAttachment: null,
        AssistBidding: "",
        OtherExpenses: "",
        OtherInformation: "",
        BiddingProjectStatus: "",
        RectificationContent: "",
        BiddingBookAttachUrl: [],
        WinningBookAttachUrl: [],
        ProcessMaterialsAttachUrl: []
      },
      ApplicationDepartmentList: [],
      filterlist: [],
      fileName: "",
      filestype: "",
      fileNames: "",
      filestypes: "",
      uploadLoading: false,
      Business: "",
      fileloading: false,
      Mldfileloading: false,
      Btmfileloading: false,
      fileter: {},
      enclosure: "",
      tableloading: false,
      tableData: [],
      AssistanceBiddingData: [],
      CostBiddingProcess: [],
      Formrules: {
        BiddingUnit: [
          { required: true, message: "请选择招标单位", trigger: "change" }
        ],
        ProjectName: [
          { required: true, message: "请选择项目名称", trigger: "change" }
        ],
        BusinessType: [
          { required: true, message: "请选择业务类型", trigger: "change" }
        ],
        BidSecurityAmount: [
          { required: true, message: "请输入投标保证金额", trigger: "blur" }
        ],
        ExportAccountInformation: [
          { required: true, message: "请输入汇出账号信息", trigger: "blur" }
        ],
        Merchandiser: [
          { required: true, message: "请输入跟单员", trigger: "blur" }
        ],
        BiddingProjectName: [
          { required: true, message: "请输入招标项目名称", trigger: "blur" }
        ],
        BiddingProjectId: [
          { required: true, message: "请输入招标项目编号", trigger: "blur" }
        ],
        BuyBidClosingTime: [
          {
            required: true,
            message: "请选择购买标书截止日期",
            trigger: "change"
          }
        ],
        Bidder: [
          { required: true, message: "请选择投标单位", trigger: "change" }
        ],
        BiddingAgency: [
          { required: true, message: "请输入招标代理名称", trigger: "blur" }
        ],
        ProcurementDemand: [
          { required: true, message: "请输入购买标书需求", trigger: "blur" }
        ],
        WhetherPayBidSecurity: [
          { required: true, message: "请选择购买标书地址", trigger: "change" }
        ],
        Files: [{ required: true, message: "请选择文件", trigger: "change" }],
        Applicant: [{ required: true, message: "", trigger: "blur" }],
        ApplicationDepartment: [
          {
            required: true,
            message: "请选择申请部门",
            trigger: "change"
          }
        ]
      },
      optionShow: false,
      disabled: false,
      loading: false,
      BiddingUnitList: [],
      ProjectNameList: [],
      BidderList: [],
      BusinessTypeList: [],
      AuthorizedRepresentativeList: [],
      titles: "上传附件",
      titlesUp: "上传投标文件附件",
      titlesMdl: "上传中标通知附件",
      titlesBtm: "上传过程材料附件",
      CurrentPage: 1,
      PageSize: 99,
      BiddingInformation: {}
    };
  },
  watch: {
    // "dataObject.BiddingUnit"() {
    //   this.remoteProject();
    // }
  },
  created() {
    // this.BiddingInformation = JSON.parse(localStorage.getItem("BiddingFile"));
    // console.log(this.BiddingInformation);
    // console.log(this.$route)
    // /projectManagement/ProjectManagement
    // this.remoteCompany();
    this.GetBfCompanyPageList();
    this.getCatagoryType();
    this.GetSysUserList();
    this.GetOrgByUserId();
    //判断操作类型
    // if (this.BiddingInformation.name == "查看标前标后信息反馈") {
    //   this.disabled = true;
    // }
    if (this.$route.query.Id) {
       // 获取面包屑
      let breadpath = JSON.parse(window.localStorage.getItem("breadpath")) || {};
      if (breadpath.router) {
        this.urlList = [
          {
            name: breadpath.name,
            router: breadpath.router
          },
          {
            name: "添加标前标后信息反馈",
            router: ""
          }
        ];
      }

      let ProjectData = JSON.parse(localStorage.getItem("FeedbackProjectData"));
      let Current = JSON.parse(localStorage.getItem("Current"));
      this.BiddingUnitList = [{
        Id:ProjectData.CompanyId,
        Name:ProjectData.CompanyName
      }]
        this.ProjectNameList = [{
        Id:ProjectData.Id,
        Name:ProjectData.Name
      }]
      this.dataObject.BiddingUnit = ProjectData.CompanyId
       this.dataObject.ProjectName = ProjectData.Id
       this.dataObject.Applicant = Current.currentUser;
      // this.urlList = [
      //   {
      //     name: "标前、标后信息管理",
      //     router: "/BiddingManagement/BiddingFileManagement"
      //   },
      //   {
      //     name: "添加标前标后信息反馈",
      //     router: ""
      //   }
      // ];
      // this.dataObject.Applicant = this.BiddingInformation.UserName;
    }
  },
  methods: {
    //获取用户组织列表
    GetOrgByUserId() {
      let obj = {
        SysUserId: JSON.parse(localStorage.getItem("Current")).currentId,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetOrgByUserId(obj).then(res => {
        if (res.MessageCode == 0 && res.Data.length > 0) {
          this.ApplicationDepartmentList = res.Data;
        } else {
          this.ApplicationDepartmentList = [];
        }
      });
    },
    // 上传文件
    uploadfile(e, index) {
      var uploader;
      this.fileloading = true;
      const files = e.target.files[0];
      console.log(files);
      var path = process.env.VUE_APP_BASE_API_UPLOAD;
      if (files) {
        var ext = files.name
          .slice(files.name.lastIndexOf(".") + 1)
          .toLowerCase();
        if (
          ext !== "doc" &&
          ext !== "docx" &&
          ext !== "pdf" &&
          ext !== "png" &&
          ext !== "jpg" &&
          ext !== "xls" &&
          ext !== "xlsx" &&
          ext !== "zip" &&
          ext !== "rar"
        ) {
          this.$message({
            message: "不支持该格式",
            type: "warning"
          });
          this.fileloading = false;
          e.target.value = [];
          return false;
        }
        if (files.size > 300 * 1024 * 1024) {
          this.$message({
            message: "文件大小超过最大限制",
            type: "warning"
          });
          this.fileloading = false;
          return;
        }
        if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "pdf" ||
          ext == "xls" ||
          ext == "xlsx" ||
          ext == "zip" ||
          ext == "rar"
        ) {
          // 文件循环上传
          showLoading();
          uploader = new SupperUploader(path, files, uuid(), 2 * 1024 * 1024);
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              const obj = {
                name: ext.toUpperCase(),
                Url: uploader.urlResult.VideoUrl,
                visible: false
              };
              hideLoading();
              if (index == undefined) {
                this.dataObject.BiddingBookAttachUrl.push(obj);
              } else {
                this.dataObject.BiddingBookAttachUrl.splice(index, 1, obj);
              }
            }
            this.fileloading = false;
            this.$refs.upload.value = null;
          });
        } else {
          // 图片上传
          console.log("上传图片");
          let datas = new FormData();
          datas.append("file", files);
          datas.append("message", "{ImageStreamName:'file',BussinessType:0}");
          axios
            .post(path, datas)
            .then(res => {
              if (res.data.State) {
                const obj1 = {
                  name: ext.toUpperCase(),
                  Url: res.data.ImageUrl,
                  visible: false
                };
                if (index == undefined) {
                  this.dataObject.BiddingBookAttachUrl.push(obj1);
                  console.log(this.dataObject.BiddingBookAttachUrl);
                } else {
                  this.dataObject.BiddingBookAttachUrl.splice(index, 1, obj1);
                }
              }
              this.fileloading = false;
            })
            .catch(() => {
              this.fileloading = false;
            });
        }
      } else {
        this.fileloading = false;
      }
    },
    deletefile(index) {
      this.dataObject.BiddingBookAttachUrl.splice(index, 1);
    },
    //删除文件
    delFiles() {
      this.dataObject.Files = "";
      this.fileName = "";
    },
    // 移入文件显示操作
    fileShow() {
      this.optionShow = true;
    },
    // 移出文件隐藏操作
    filenoShow() {
      this.optionShow = false;
    },
    //下载
    DownLoad(e) {
      window.open(e);
    },
    //切换样式
    changeShows(idx) {
      this.$refs.ImgBox[idx].style = "display:block";
    },
    changeHide(idx) {
      this.$refs.ImgBox[idx].style = "display:none";
    },
    TopchangeShows(idx) {
      this.$refs.TopImgBox[idx].style = "display:block";
    },
    TopchangeHide(idx) {
      this.$refs.TopImgBox[idx].style = "display:none";
    },
    MdlchangeShows(idx) {
      this.$refs.MdlImgBox[idx].style = "display:block";
    },
    MdlchangeHide(idx) {
      this.$refs.MdlImgBox[idx].style = "display:none";
    },
    //保存上传附件
    SaveFile() {
      let BiddingUrl = [];
      this.dataObject.BiddingBookAttachUrl.forEach(data => {
        BiddingUrl.push(data.Url);
      });
      let WinningUrl = [];
      this.dataObject.WinningBookAttachUrl.forEach(data => {
        WinningUrl.push(data.Url);
      });
      let ProcessUrl = [];
      this.dataObject.ProcessMaterialsAttachUrl.forEach(data => {
        ProcessUrl.push(data.Url);
      });
      let obj = {
        Id: this.BiddingInformation.Id,
        BiddingBookAttachUrl: BiddingUrl.join(","),
        WinningBookAttachUrl: WinningUrl.join(","),
        ProcessMaterialsAttachUrl: ProcessUrl.join(","),
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      EditBiddingInformationBaseAttach(obj).then(res => {
        if (res.IsSuccess) {
          this.$message({
            type: "success",
            message: "上传附件成功"
          });
          this.$nextTick(() => {
            this.cancel();
          });
        } else {
          this.$message({
            message: res.MessageContent,
            type: "error"
          });
        }
      });
    },
    //关闭弹窗
    closeFileShow(val) {
      this.iframeShow = val;
    },
    //判断文件类型
    preview(e) {
      if (e) {
        const ext = e.slice(e.lastIndexOf(".") + 1).toLowerCase();
        console.log(e);
        if (ext == "pdf") {
          this.isImg = 2;
          this.previewFileUrl = e;
        } else if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "xlsx" ||
          ext == "xls"
        ) {
          this.isImg = 3;
          this.previewFileUrl =
            "https://view.officeapps.live.com/op/view.aspx?src=" + e;
        } else {
          this.isImg = 1;
          this.previewFileUrl = e;
        }
        this.iframeShow = true;
      }
    },
    //查看详情
    GetBiddingInformationInfo() {
      let obj = {
        Id: this.BiddingInformation.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetBiddingInformationInfo(obj).then(res => {
        if (res.IsSuccess) {
          console.log(res.Data);
          if (res.Data.BiddingInformationBase != null) {
            this.BiddingUnitList = [
              {
                Id: res.Data.BiddingInformationBase.CompanyId,
                Name: res.Data.BiddingInformationBase.CompanyName
              }
            ];
            this.dataObject.ApplicationDepartment =
              res.Data.BiddingInformationBase.SysOrgId;
            this.dataObject.BiddingUnit =
              res.Data.BiddingInformationBase.CompanyId;
            this.dataObject.ProjectName =
              res.Data.BiddingInformationBase.ProjectId;
            this.dataObject.BiddingProjectName =
              res.Data.BiddingInformationBase.BiddingProjectName;
            this.dataObject.BiddingProjectId =
              res.Data.BiddingInformationBase.BiddingProjectCode;
            this.dataObject.BuyBidClosingTime =
              res.Data.BiddingInformationBase.BiddingOpeningDeadline;
            this.dataObject.Bidder =
              res.Data.BiddingInformationBase.BiddingBfCompanyId;
            this.dataObject.BiddingAgency =
              res.Data.BiddingInformationBase.BiddingAgency;
            this.dataObject.ProcurementDemand =
              res.Data.BiddingInformationBase.ProcurementDemand;
            this.dataObject.BidSecurityAmount =
              res.Data.BiddingInformationBase.SecurityAmount;
            if (this.dataObject.BidSecurityAmount > 0) {
              this.dataObject.WhetherPayBidSecurity = "1";
            } else {
              this.dataObject.WhetherPayBidSecurity = "0";
            }
            this.dataObject.ExportAccountInformation =
              res.Data.BiddingInformationBase.RemittanceAccount;
            this.dataObject.Files = res.Data.BiddingInformationBase.AttachUrl;
            if (this.dataObject.Files) {
              this.fileName = this.dataObject.Files.slice(
                this.dataObject.Files.lastIndexOf("/") + 1,
                this.dataObject.Files.lastIndexOf(".")
              );
              this.filestype = this.dataObject.Files.slice(
                this.dataObject.Files.lastIndexOf(".") + 1
              ).toUpperCase();
            }
            this.titles = res.Data.BiddingInformationBase.AttachUrl.split("/")[
              res.Data.BiddingInformationBase.AttachUrl.split("/").length - 1
            ];
            this.dataObject.Merchandiser =
              res.Data.BiddingInformationBase.SysUserName;
            this.dataObject.Applicant =
              res.Data.BiddingInformationBase.SysUserName;
            this.dataObject.BiddingProjectStatus =
              res.Data.BiddingInformationBase.BiddingProjectStatus;
            this.dataObject.RectificationContent =
              res.Data.BiddingInformationBase.RectificationContent;
            //操作字符串便于循环
            if (res.Data.BiddingInformationBase.BiddingBookAttachUrl != null) {
              console.log(res.Data.BiddingInformationBase.BiddingBookAttachUrl);
              let arry = res.Data.BiddingInformationBase.BiddingBookAttachUrl.split(
                ","
              );
              for (let i = 0; i < arry.length; i++) {
                let namelist = arry[i].split(".");
                this.dataObject.BiddingBookAttachUrl.push({
                  name: namelist[namelist.length - 1].toUpperCase(),
                  Url: arry[i],
                  visible: false
                });
              }
              console.log(this.dataObject.BiddingBookAttachUrl);
            } else {
              this.dataObject.BiddingBookAttachUrl = [];
            }
            if (res.Data.BiddingInformationBase.WinningBookAttachUrl != null) {
              let arry = res.Data.BiddingInformationBase.WinningBookAttachUrl.split(
                ","
              );
              for (let i = 0; i < arry.length; i++) {
                let namelist = arry[i].split(".");
                this.dataObject.WinningBookAttachUrl.push({
                  name: namelist[namelist.length - 1].toUpperCase(),
                  Url: arry[i],
                  visible: false
                });
              }
            } else {
              this.dataObject.WinningBookAttachUrl = [];
            }
            if (
              res.Data.BiddingInformationBase.ProcessMaterialsAttachUrl != null
            ) {
              let arry = res.Data.BiddingInformationBase.ProcessMaterialsAttachUrl.split(
                ","
              );
              for (let i = 0; i < arry.length; i++) {
                let namelist = arry[i].split(".");
                this.dataObject.ProcessMaterialsAttachUrl.push({
                  name: namelist[namelist.length - 1].toUpperCase(),
                  Url: arry[i],
                  visible: false
                });
              }
            } else {
              this.dataObject.ProcessMaterialsAttachUrl = [];
            }
          }
          if (res.Data.BiddingInformationTwo != null) {
            this.Business = res.Data.BiddingInformationTwo.CooperationType.toString();
            this.dataObject.AuthorizedRepresentative =
              res.Data.BiddingInformationTwo.AuthorizedSysUserId;
            this.dataObject.DocumentaryAnalysis =
              res.Data.BiddingInformationTwo.DocumentaryAnalysis;
            this.dataObject.RiskAssessment =
              res.Data.BiddingInformationTwo.RiskAssessment;
            this.dataObject.ProfitEvaluation =
              res.Data.BiddingInformationTwo.ProfitEvaluation;
            this.dataObject.ImportantAndDifficult =
              res.Data.BiddingInformationTwo.ImportantAndDifficult;
            this.dataObject.ParticipateBidding =
              res.Data.BiddingInformationTwo.BiddingOpponent;
            this.dataObject.BiddingFileRequirements =
              res.Data.BiddingInformationTwo.BiddingDocumentsRequired;
          }
          if (res.Data.BiddingInformationThree != null) {
            this.dataObject.BiddingEvaluationOpinions =
              res.Data.BiddingInformationThree.BiddingEvaluationOpinions;
            this.dataObject.OpinionsBusinessLeaders =
              res.Data.BiddingInformationThree.OpinionsOfBusinessLeaders;
            this.dataObject.OpinionsLeadersChargeMarketing =
              res.Data.BiddingInformationThree.OpinionsOfMarketingLeaders;
            this.dataObject.BiddingOpinions =
              res.Data.BiddingInformationThree.OpinionsOfCenterLeaders;
            this.dataObject.OpinionsCompanyLeaders =
              res.Data.BiddingInformationThree.OpinionsOfCompanyLeaders;
            this.dataObject.BiddingCollaboration =
              res.Data.BiddingInformationThree.BiddingCollaboration;
            this.dataObject.ProjectPersonCharge =
              res.Data.BiddingInformationThree.ProjectBiddingPerson;
            this.dataObject.TechnicalProposalLeader =
              res.Data.BiddingInformationThree.TechnicalProposalLeader;
          }
          if (res.Data.BiddingInformationFour != null) {
            this.dataObject.WinningFallingBid =
              res.Data.BiddingInformationFour.WinningAndFallingBid;
            this.dataObject.BidWinner =
              res.Data.BiddingInformationFour.BidWinningCompany;
            this.dataObject.BidWinningGrossProfit =
              res.Data.BiddingInformationFour.BidWinningGrossProfit;
            this.dataObject.ResultsAnalysis =
              res.Data.BiddingInformationFour.ResultsAnalysis;
            this.tableData =
              res.Data.BiddingInformationFour.BidOpeningQuotationList;
          }
          if (res.Data.BiddingInformationFive != null) {
            this.dataObject.AnalysisAndHarvest =
              res.Data.BiddingInformationFive.AnalysisAndHarvest;
            this.dataObject.BiddingOtherSituations =
              res.Data.BiddingInformationFive.BiddingOtherSituations;
            this.dataObject.InsuranceDepositRefund = res.Data.BiddingInformationFive.InsuranceDepositRefund.toString();
            this.dataObject.ReturnAmount =
              res.Data.BiddingInformationFive.ReturnAmount;
            this.dataObject.ReturnTime =
              res.Data.BiddingInformationFive.ReturnTime;
            this.dataObject.OtherSituations =
              res.Data.BiddingInformationFive.OtherSituations;
            this.dataObject.ReturnVoucherAttachment =
              res.Data.BiddingInformationFive.ReturnVoucherAttachment;
            if (this.dataObject.ReturnVoucherAttachment) {
              this.fileNames = this.dataObject.ReturnVoucherAttachment.slice(
                this.dataObject.ReturnVoucherAttachment.lastIndexOf("/") + 1,
                this.dataObject.ReturnVoucherAttachment.lastIndexOf(".")
              );
              this.filestypes = this.dataObject.ReturnVoucherAttachment.slice(
                this.dataObject.ReturnVoucherAttachment.lastIndexOf(".") + 1
              ).toUpperCase();
            }
            this.dataObject.AssistBidding = res.Data.BiddingInformationFive.AssistBidding.toString();
            this.dataObject.OtherExpenses =
              res.Data.BiddingInformationFive.OtherExpenses;
            this.dataObject.OtherInformation =
              res.Data.BiddingInformationFive.OtherInformation;
            this.AssistanceBiddingData =
              res.Data.BiddingInformationFive.BiddingAssistList;
            this.CostBiddingProcess =
              res.Data.BiddingInformationFive.BiddingProcessCostList;
          }
        }
      });
    },
    //授权代表(用户列表)
    GetSysUserList(query) {
      let obj = {
        UserId: "",
        UserName: query,
        Status: 1,
        PageIndex: this.CurrentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      showLoading();
      GetSysUserList(obj).then(res => {
        if (res.Data.length > 0 && res.IsSuccess) {
          hideLoading();
          this.AuthorizedRepresentativeList = res.Data;
        } else {
          this.AuthorizedRepresentativeList = [];
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //获取项目类型
    getCatagoryType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetProjectBusinessType(qs.stringify(obj)).then(response => {
        if (response) {
          this.BusinessTypeList = response;
        }
      });
    },
    //投标单位
    GetBfCompanyPageList() {
      let obj = {
        Name: "",
        Level: -1,
        Status: 1,
        PageIndex: this.CurrentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetBfCompanyPageList(obj).then(res => {
        if (res.Data.length > 0 && res.IsSuccess) {
          this.BidderList = res.Data;
        } else {
          this.BidderList = [];
        }
      });
    },
    //提交送审
    SubmitApproval(e) {
      this.$refs[e].validate(valid => {
        if (valid) {
          let obj = {
            BiddingInformationOne: {
              ProjectId: this.dataObject.ProjectName,
              BiddingProjectName: this.dataObject.BiddingProjectName,
              BiddingProjectCode: this.dataObject.BiddingProjectId,
              BiddingOpeningDeadline: this.dataObject.BuyBidClosingTime,
              BiddingBfCompanyId: this.dataObject.Bidder,
              BiddingAgency: this.dataObject.BiddingAgency,
              ProcurementDemand: this.dataObject.ProcurementDemand,
              SecurityAmount: this.dataObject.BidSecurityAmount,
              RemittanceAccount: this.dataObject.ExportAccountInformation,
              AttachUrl: this.dataObject.Files,
              BiddingProjectStatus: 0,
              Status: 1,
              SysOrgId: this.dataObject.ApplicationDepartment
            },
            BiddingInformationTwo: {
              CooperationType: this.Business,
              AuthorizedSysUserId: this.dataObject.AuthorizedRepresentative,
              DocumentaryAnalysis: this.dataObject.DocumentaryAnalysis,
              RiskAssessment: this.dataObject.RiskAssessment,
              ProfitEvaluation: this.dataObject.ProfitEvaluation,
              ImportantAndDifficult: this.dataObject.ImportantAndDifficult,
              BiddingOpponent: this.dataObject.ParticipateBidding,
              BiddingDocumentsRequired: this.dataObject.BiddingFileRequirements
            },
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          // if (this.BiddingInformation.name == "添加标前标后信息反馈") {
            AddBiddingInformation(obj).then(res => {
              if (res.IsSuccess) {
                this.$message({
                  type: "success",
                  message: "提交送审成功"
                });
                this.$nextTick(() => {
                  this.cancel();
                });
              } else {
                this.$message({
                  message: res.MessageContent,
                  type: "error"
                });
              }
            });
          // } else if (this.BiddingInformation.name == "修改标前标后信息反馈") {
          //   obj.BiddingInformationOne.Id = this.BiddingInformation.Id;
          //   EditBiddingInformationBase(obj).then(res => {
          //     if (res.IsSuccess) {
          //       this.$message({
          //         type: "success",
          //         message: "修改成功"
          //       });
          //       this.$nextTick(() => {
          //         this.cancel();
          //       });
          //     } else {
          //       this.$message({
          //         message: res.MessageContent,
          //         type: "error"
          //       });
          //     }
          //   });
          // }
        }
      });
    },
    //存为草稿
    SaveDraft(e) {
      this.$refs[e].validate(valid => {
        if (valid) {
          let obj = {
            BiddingInformationOne: {
              ProjectId: this.dataObject.ProjectName,
              BiddingProjectName: this.dataObject.BiddingProjectName,
              BiddingProjectCode: this.dataObject.BiddingProjectId,
              BiddingOpeningDeadline: this.dataObject.BuyBidClosingTime,
              BiddingBfCompanyId: this.dataObject.Bidder,
              BiddingAgency: this.dataObject.BiddingAgency,
              ProcurementDemand: this.dataObject.ProcurementDemand,
              SecurityAmount: this.dataObject.BidSecurityAmount,
              RemittanceAccount: this.dataObject.ExportAccountInformation,
              AttachUrl: this.dataObject.Files,
              BiddingProjectStatus: 0,
              Status: 0,
              SysOrgId: this.dataObject.ApplicationDepartment
            },
            BiddingInformationTwo: {
              CooperationType: this.Business,
              AuthorizedSysUserId: this.dataObject.AuthorizedRepresentative,
              DocumentaryAnalysis: this.dataObject.DocumentaryAnalysis,
              RiskAssessment: this.dataObject.RiskAssessment,
              ProfitEvaluation: this.dataObject.ProfitEvaluation,
              ImportantAndDifficult: this.dataObject.ImportantAndDifficult,
              BiddingOpponent: this.dataObject.ParticipateBidding,
              BiddingDocumentsRequired: this.dataObject.BiddingFileRequirements
            },
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          // if (this.BiddingInformation.name == "添加标前标后信息反馈") {
            AddBiddingInformation(obj).then(res => {
              if (res.IsSuccess) {
                this.$message({
                  type: "success",
                  message: "存为草稿成功"
                });
                this.$nextTick(() => {
                  this.cancel();
                });
              } else {
                this.$message({
                  message: res.MessageContent,
                  type: "error"
                });
              }
            });
          // } else if (this.BiddingInformation.name == "修改标前标后信息反馈") {
          //   obj.BiddingInformationOne.Id = this.BiddingInformation.Id;
          //   EditBiddingInformationBase(obj).then(res => {
          //     if (res.IsSuccess) {
          //       this.$message({
          //         type: "success",
          //         message: "修改成功"
          //       });
          //       this.$nextTick(() => {
          //         this.cancel();
          //       });
          //     } else {
          //       this.$message({
          //         message: res.MessageContent,
          //         type: "error"
          //       });
          //     }
          //   });
          // }
        }
      });
    },
    clearCompany() {
      this.dataObject.BiddingUnit = "";
      this.ProjectNameList = [];
      this.remoteCompany();
    },
    clearProject() {
      this.dataObject.ProjectId = "";
    },
    //获取项目下拉列表
    remoteProject(val) {
      let data = {
        Name: val,
        CompanyId: this.dataObject.BiddingUnit,
        BusinessType: "-1",
        Priority: "-1",
        Status: "-1",
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetProjectList(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ProjectNameList = response.Data;
            this.BiddingUnit = response.Data[0].Id;
          } else {
            this.ProjectNameList = [];
          }
        } else {
          this.ProjectNameList = [];
          this.dataObject.BiddingUnit = "";
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //查询公司列表
    remoteCompany(query) {
      this.loading = true;
      let data = {
        Name: query,
        PageIndex: 1,
        PageSize: 99,
        Type: -1,
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetCompanyPageList(qs.stringify(data)).then(response => {
        this.loading = false;
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.BiddingUnitList = response.Data;
          } else {
            this.dataObject.BiddingUnit = "";
            this.BiddingUnitList = [];
          }
        } else {
          this.dataObject.BiddingUnit = "";
          this.BiddingUnitList = [];
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //关闭页面
    cancel() {
      this.$router.go(-1);
    },
    // 上传
    // 上传文件
    uploadFile(e) {
      var uploader;
      const files = e.target.files[0];
      var ext = files.name.slice(files.name.lastIndexOf(".") + 1).toLowerCase();
      if (
        ext == "png" ||
        ext == "jpg" ||
        ext == "jpeg" ||
        ext == "doc" ||
        ext == "docx" ||
        ext == "pdf" ||
        ext == "xls" ||
        ext == "xlsx"
      ) {
      } else {
        this.$message({
          message: "不支持该格式文件上传",
          type: "warning"
        });
        e.target.value = [];
        return false;
      }
      if (files.size > 20 * 1024 * 1024) {
        this.$message({
          message: "文件大小超过最大限制",
          type: "warning"
        });
        e.target.value = [];
        return false;
      } else {
        this.uploadLoading = true;
        if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "pdf" ||
          ext == "xls" ||
          ext == "xlsx"
        ) {
          uploader = new SupperUploader(
            process.env.VUE_APP_BASE_API_UPLOAD,
            files,
            uuid(),
            2 * 1024 * 1024
          );
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              this.uploadLoading = false;
              this.dataObject.Files = uploader.urlResult.VideoUrl;
              this.fileName = files.name;
              this.filestype = ext.toUpperCase();
              e.target.value = [];
            }
          });
        } else {
          let datas = new FormData();
          datas.append("file", files);
          datas.append("message", "{ImageStreamName:'file',BussinessType:0}");
          axios.post(process.env.VUE_APP_BASE_API_UPLOAD, datas).then(res => {
            if (res.data.State) {
              this.uploadLoading = false;
              this.dataObject.Files = res.data.ImageUrl;
              this.fileName = files.name;
              this.filestype = ext.toUpperCase();
              e.target.value = [];
            }
          });
        }
      }
    },
    MiddleUploadFile(e, index) {
      var uploader;
      this.Mldfileloading = true;
      const files = e.target.files[0];
      var path = process.env.VUE_APP_BASE_API_UPLOAD;
      if (files) {
        var ext = files.name
          .slice(files.name.lastIndexOf(".") + 1)
          .toLowerCase();
        if (
          ext !== "doc" &&
          ext !== "docx" &&
          ext !== "pdf" &&
          ext !== "png" &&
          ext !== "jpg" &&
          ext !== "xls" &&
          ext !== "xlsx" &&
          ext !== "zip" &&
          ext !== "rar"
        ) {
          this.$message({
            message: "不支持该格式",
            type: "warning"
          });
          this.Mldfileloading = false;
          e.target.value = [];
          return false;
        }
        if (files.size > 300 * 1024 * 1024) {
          this.$message({
            message: "文件大小超过最大限制",
            type: "warning"
          });
          this.Mldfileloading = false;
          return;
        }
        if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "pdf" ||
          ext == "xls" ||
          ext == "xlsx" ||
          ext == "zip" ||
          ext == "rar"
        ) {
          // 文件循环上传
          uploader = new SupperUploader(path, files, uuid(), 2 * 1024 * 1024);
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              const obj = {
                name: ext.toUpperCase(),
                Url: uploader.urlResult.VideoUrl,
                visible: false
              };
              if (index == undefined) {
                this.dataObject.WinningBookAttachUrl.push(obj);
              } else {
                this.dataObject.WinningBookAttachUrl.splice(index, 1, obj);
              }
            }
            this.Mldfileloading = false;
            this.$refs.upload.value = null;
          });
        } else {
          // 图片上传
          console.log("上传图片");
          let datas = new FormData();
          datas.append("file", files);
          datas.append("message", "{ImageStreamName:'file',BussinessType:0}");
          axios
            .post(path, datas)
            .then(res => {
              if (res.data.State) {
                const obj1 = {
                  name: ext.toUpperCase(),
                  Url: res.data.ImageUrl,
                  visible: false
                };
                if (index == undefined) {
                  this.dataObject.WinningBookAttachUrl.push(obj1);
                } else {
                  this.dataObject.WinningBookAttachUrl.splice(index, 1, obj1);
                }
              }
              this.Mldfileloading = false;
            })
            .catch(() => {
              this.Mldfileloading = false;
            });
        }
      } else {
        this.Mldfileloading = false;
      }
    },
    BottomUploadFile(e, index) {
      var uploader;
      this.Btmfileloading = true;
      const files = e.target.files[0];
      var path = process.env.VUE_APP_BASE_API_UPLOAD;
      if (files) {
        var ext = files.name
          .slice(files.name.lastIndexOf(".") + 1)
          .toLowerCase();
        if (
          ext !== "doc" &&
          ext !== "docx" &&
          ext !== "pdf" &&
          ext !== "png" &&
          ext !== "jpg" &&
          ext !== "xls" &&
          ext !== "xlsx" &&
          ext !== "zip" &&
          ext !== "rar"
        ) {
          this.$message({
            message: "不支持该格式",
            type: "warning"
          });
          this.Btmfileloading = false;
          e.target.value = [];
          return false;
        }
        if (files.size > 300 * 1024 * 1024) {
          this.$message({
            message: "文件大小超过最大限制",
            type: "warning"
          });
          this.Btmfileloading = false;
          return;
        }
        if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "pdf" ||
          ext == "xls" ||
          ext == "xlsx" ||
          ext == "zip" ||
          ext == "rar"
        ) {
          // 文件循环上传
          uploader = new SupperUploader(path, files, uuid(), 2 * 1024 * 1024);
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              const obj = {
                name: ext.toUpperCase(),
                Url: uploader.urlResult.VideoUrl,
                visible: false
              };
              if (index == undefined) {
                this.dataObject.ProcessMaterialsAttachUrl.push(obj);
              } else {
                this.dataObject.ProcessMaterialsAttachUrl.splice(index, 1, obj);
              }
            }
            this.Btmfileloading = false;
            this.$refs.upload.value = null;
          });
        } else {
          // 图片上传
          console.log("上传图片");
          let datas = new FormData();
          datas.append("file", files);
          datas.append("message", "{ImageStreamName:'file',BussinessType:0}");
          axios
            .post(path, datas)
            .then(res => {
              if (res.data.State) {
                const obj1 = {
                  name: ext.toUpperCase(),
                  Url: res.data.ImageUrl,
                  visible: false
                };
                if (index == undefined) {
                  this.dataObject.ProcessMaterialsAttachUrl.push(obj1);
                } else {
                  this.dataObject.ProcessMaterialsAttachUrl.splice(
                    index,
                    1,
                    obj1
                  );
                }
              }
              this.Btmfileloading = false;
            })
            .catch(() => {
              this.Btmfileloading = false;
            });
        }
      } else {
        this.Btmfileloading = false;
      }
    }
  }
};
</script>
<style lang="scss">
.AddBidInformationFeedback-Box {
  .footer-button {
    text-align: center;
    background: #ffffff;
    padding: 30px;
    margin-left: 24px;
  }
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .projectform {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 20px 40px;
    .form-title {
      font-size: $f16;
      color: $erp333;
      line-height: 16px;
      position: relative;
      padding-left: 12px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      > span {
        flex: 1;
      }
      > .operate {
        font-size: $f14;
        color: $erpplaceholder;
        width: 11%;
        text-align: right;
        .svg-icon {
          margin-right: 8px;
          font-size: $f16;
          &.add {
            color: #fff;
          }
        }
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
      margin-bottom: 24px;
      .el-form-item__label {
        line-height: 14px;
        font-size: $f14;
        color: $erp666;
        font-weight: 400;
        padding-bottom: 8px;
      }
      .el-form-item__content {
        // max-width: 336px;
        // width: calc(100% - 64px);
        width: 460px;
        .el-input__inner {
          background-color: $erinputbgc;
          width: 460px;
          //  line-height: 42px;
        }
        .el-select {
          width: 460px;
        }
        .el-select .el-input .el-select__caret {
          line-height: 42px;
        }
        .el-date-editor {
          width: 100%;
          span {
            width: 8%;
          }
          .el-range-input {
            background-color: #f0f4fa;
          }
        }
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
            &.input {
              max-width: 240px;
              margin-right: 24px;
              margin-bottom: 24px;
            }
          }
        }
      }
      // 文本框样式
      &.text {
        .el-form-item__content {
          width: 960px !important;
          .el-textarea__inner {
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
            width: 100%;
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
      &.double {
        .el-form-item__content {
          height: 40px;
          display: flex;
          align-items: center;
          .el-radio-group {
            flex: 1;
          }
          .el-input {
            flex: 1;
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
      .TableTitle {
        font-size: 14px;
        color: #606266;
        font-weight: 700;
      }
      .babel {
        padding: 20px 20px 40px 0px;
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
          // padding-bottom: 16px;
          // border-bottom: 1px solid $erpBK;
          .img-box-list {
            margin-right: 20px;
            overflow: hidden;
            position: relative;
            margin-bottom: 20px;
            width: 300px;
            height: 180px;
            background: #f0f4fa;
            border-radius: 8px;
            text-align: center;
            .ext {
              width: 80px;
              height: 30px;
              line-height: 30px;
              border-radius: 5px;
              color: #fff;
              text-align: center;
              background-color: $erpcolor;
              margin-bottom: 25px;
            }
            .Urlname {
              margin-top: 60px;
              font-size: 14px;
              text-align: center;
            }
            .Footer-Box {
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

              div {
                width: 50%;
                display: inline-block;
                line-height: 30px;
                text-align: center;
                height: 30px;
                font-size: 14px;
                color: #fff;
                vertical-align: top;
                i {
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
      .file-cont {
        width: 1250px;
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
              width: 110px;
              line-height: 24px;
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
            background-color: rgba(0, 0, 0, 1);
            opacity: 0.4;
            bottom: 0;
            display: flex;
            justify-content: center;
            border-radius: 0 0 8px 8px;
            .btn {
              position: relative;
              cursor: pointer;
              line-height: 30px;
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
                margin-right: 4px;
              }
              > span {
                font-size: $f14;
                color: #fff;
                vertical-align: middle;
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
      .file {
        > input {
          width: 160px;
          height: 120px;
          position: absolute;
          left: 0px;
          top: 10px;
          opacity: 0;
          z-index: 10;
          cursor: pointer;
        }
        > .img-box {
          position: absolute;
          top: 10px;
          i {
            position: absolute;
            left: 133px;
            top: 56px;
            font-size: 36px;
            color: #999999;
          }
          p {
            margin-top: 80px;
            text-align: center;
            font-size: 14px;
            color: #999999;
            white-space: nowrap;
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
          border-radius: 8px 8px 8px 8px;
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
      padding-bottom: 16px;
      margin-bottom: 40px;
      border-bottom: 1px solid $erpBK;
      &:last-child {
        // border-bottom: none;
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
          .svg-icon {
            margin-right: 8px;
            font-size: $f16;
            &.add {
              color: #fff;
            }
          }
        }
        // 顶部编辑按钮
        .operate-top {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
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
    .tip {
      width: 600px;
      font-size: $f14;
      color: $erp999;
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
.textInput {
  .el-form-item__content {
    height: 100% !important;
  }
}
</style>