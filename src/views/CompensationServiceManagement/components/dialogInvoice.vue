<!-- 开具发票 -->
<template>
  <div class="add-project-Invoice">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="Invoiceform" label-position="top" :model="recruitform" :rules="rules" label-width="140px" class="projectform">
        <div class="form-cont">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开票方式" prop="BillingType">
                <el-select v-model="recruitform.BillingType" clearable placeholder="请选择开票方式" class="select-input" @change="chooseInvoice">
                  <el-option v-for="item in InvoiceStyleType" :key="item.value" :label="item.describe" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开票公司" prop="BfCompanyId">
                <el-select v-model="recruitform.BfCompanyId" clearable filterable remote placeholder="请查询或下拉开票公司" @clear="clearCompany" :remote-method="remoteCompany" :loading="loading" class="select-input">
                  <el-option v-for="item in BfCompanyList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开票申请人" prop="ApplyUserId">
                <el-select v-model="recruitform.ApplyUserId" clearable filterable remote placeholder="请查询或下拉开票申请人" @clear="remoteUser('')" :remote-method="remoteUser" :loading="loading" class="select-input">
                  <el-option v-for="item in UserList" :key="item.Id" :label="item.UserName" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开票时间" class="datetime" prop="InvoiceDate">
                <el-date-picker v-model="recruitform.InvoiceDate" clearable format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开票时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开票总额">
                <el-input v-model="recruitform.Amount" :bind="addOne" disabled clearable placeholder="请输入开票总额">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="所属项目" prop="ProjectId">
                <el-select v-model="recruitform.ProjectId" clearable filterable remote placeholder="请查询或搜索所属项目" @clear="clearProject" :remote-method="remoteProject" @change="chooseproject" :loading="loading" class="select-input">
                  <el-option v-for="item in ProjectList" :key="item.Id" :label="item.CompanyName +' - '+ item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="选择预结算单" prop="SalaryBeforehandSettleId" v-if="recruitform.BillingType ==1">
                <el-select v-model="recruitform.SalaryBeforehandSettleId" clearable remote placeholder="请选择项目查询预结算单" class="select-input btn-select">
                  <el-option v-for="item in PreliminaryStatementList" :key="item.Id" :label="item.Title" :value="item.Id">
                  </el-option>
                </el-select>
                <el-button class="ButtonInvoice" size="medium" @click="openPreliminaryStatement('Invoiceform')" :disabled="Btndisabled">生成预结算单</el-button>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="recruitform.BillingType ==0">
              <el-form-item ref="SettleIdsList" label="选择关联结算单" prop="SettleIdsList">
                <el-select v-model="recruitform.SettleIdsList" clearable multiple collapse-tags placeholder="请选择项目查询关联结算单" class="select-input" @change="chooseMoney">
                  <el-option v-for="item in StatementList" :key="item.Id" :label="item.Title" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="发票抬头" prop="InvoiceTitle">
                <el-input v-model="recruitform.InvoiceTitle" clearable placeholder="请输入发票抬头" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="客户单位性质">
                <el-select v-model="recruitform.TaxType" clearable filterable placeholder="请选择客户单位性质" class="select-input">
                  <el-option v-for="item in InvoiceApplyEnumTaxType" :key="item.value" :label="item.describe" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="税号">
                <el-input v-model="recruitform.TaxNo" clearable placeholder="请输入税号" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="银行账号">
                <el-input v-model="recruitform.AccountNo" clearable placeholder="请输入银行账号" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开户行">
                <el-input v-model="recruitform.BankName" clearable placeholder="请输入开户行" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="公司注册地址">
                <el-input v-model="recruitform.RegAddress" clearable placeholder="请输入公司注册地址" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="公司联系电话">
                <el-input v-model="recruitform.CompanyTel" clearable placeholder="请输入公司联系电话" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="付款方式" prop="ReceipType">
                <el-select v-model="recruitform.ReceipType" clearable filterable placeholder="请选择付款方式" class="select-input">
                  <el-option v-for="item in InvoiceApplyEnumReceipType" :key="item.value" :label="item.describe" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" >
              <el-form-item label="选择回款流水" prop="MoneyRecordId" v-if="recruitform.ReceipType == 1" :key="1">
                <el-select v-model="recruitform.MoneyRecordId" clearable filterable placeholder="请选择项目查询回款流水" class="select-input">
                  <el-option v-for="item in MoneyDrawlist" :key="item.Id" :label="item.BfCompanyName+' - '+item.Amount+'元'" :value="item.MoneyRecordId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择回款流水" v-else :key="2">
                <el-select v-model="recruitform.MoneyRecordId" clearable filterable placeholder="请选择项目查询回款流水" class="select-input">
                  <el-option v-for="item in MoneyDrawlist" :key="item.Id" :label="item.BfCompanyName+' - '+item.Amount+'元'" :value="item.MoneyRecordId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开具类型">
                <el-select v-model="InvoiceTypes" clearable filterable placeholder="请选择开具类型" class="select-input">
                  <el-option v-for="item in FinanceInvoiceType" :key="item.value" :label="item.describe" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <div class="multiple-col" v-for="(item,index) in recruitform.AddInvoiceApplyDetailList" :key="index">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="开具发票类型">
                  <el-select v-model="InvoiceApplyEnumInvoiceType.InvoiceType" clearable filterable placeholder="请选择开具发票类型" class="select-input">
                    <el-option v-for="ite in InvoiceApplyEnumInvoiceType" :key="ite.value" :label="ite.describe" :value="ite.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="开票项目" :prop="`AddInvoiceApplyDetailList[${index}].Subject`" :rules="moreNotifyOjbectRules.Subject">
                  <el-input v-model="item.Subject" clearable placeholder="请输入开票项目" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="开票金额" :prop="`AddInvoiceApplyDetailList[${index}].Amount`" :rules="moreNotifyOjbectRules.Amount">
                  <el-input v-model="item.Amount" placeholder="请输入开票金额">
                    <svg-icon slot="suffix" icon-class="money" class-name="way" />
                  </el-input>
                </el-form-item>
              </el-col>
              <div class="multiple-button">
                <a class="Addbtn" v-if="index == recruitform.AddInvoiceApplyDetailList.length-1" @click="AddInvoice"><i class="el-icon-circle-plus-outline"></i>添加</a>
                <a class="Delbtn" v-if="index < recruitform.AddInvoiceApplyDetailList.length-1" @click="DelInvoice(index)"><i class="el-icon-delete"></i>删除</a>
              </div>
            </div>
            <el-col :span="24">
              <el-form-item label="备注" class="text">
                <el-input type="textarea" :rows="6" v-model="recruitform.Remark" maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="发票附件" prop="CommisionType" class="attachment Compensation-header">
                <div class="upload">
                  <div v-if="fileName" class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()" v-loading="uploadLoading">
                    <span class="filestype">{{filestype}}</span>
                    <p>{{fileName}}</p>
                    <div v-show="optionShow" class="option-button">
                      <a>
                        <svg-icon icon-class="replace" class-name="svg-a" />替换
                        <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile replaceFile" @change="uploadFile">
                      </a>
                      <a @click="delFiles">
                        <svg-icon icon-class="del" class-name="svg-a" />删除
                      </a>
                    </div>
                  </div>
                  <div class="files" v-else v-loading="uploadLoading">
                    <img src="../../../assets/upload.png">
                    <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile" @change="uploadFile">
                  </div>
                  <div class="prompt">
                    上传格式为PNG、JPG、Word、PDF、XLS格式文件，文件不能超过20M
                  </div>
                </div>

              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="bottom">
      <!-- 添加 -->
      <el-button class="erpbtn" size="small" @click="$router.go(-1)">取消</el-button>
      <el-button class="erpbtn" size="small" @click="ProjectInvoice('Invoiceform')">保存</el-button>
    </div>
    <dialogPreliminaryStatement :title="StatementTitle" :ProjectId="PreliminaryProjectId" :visible="StatementVisible" @successdialog="successdialog" @closedialog="closedialog"></dialogPreliminaryStatement>
  </div>
</template>
<script>
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import dialogPreliminaryStatement from "../components/dialog-PreliminaryStatement.vue";
import { GetSysUserList } from "@/api/SystemSetting.js";
import {
  GetSalarySettleByProject,
  GetSalaryBeforehandSettle
} from "@/api/CompensationServiceManagement.js";
import {
  AddInvoiceApply,
  GetInvoiceApplyAllEnum,
  GetInvoiceApplyInfo,
  GetInvoiceApplyMoneyRecord,
  GetFinanceInvoiceTitlePageList,
  AddFinanceInvoiceTitle
} from "@/api/FinancialManagement.js";
import { GetBfCompanyPageList } from "@/api/BusinessSet.js";
import {
  GetProjectBusinessType,
  GetProjectList,
  GetProjectMoneyDrawPageList
} from "@/api/projectManagement.js";
import {
  uuid,
  showLoading,
  hideLoading,
  checkNumber,
  MenuIdDate,
  copy
} from "@/utils/CustomValidation";
import SupperUploader from "@/utils/SupperUploader";
import qs from "qs";
import axios from "axios";
import filters from "@/utils/filters";
export default {
  components: {
    BreadCrumb,
    dialogPreliminaryStatement
  },
  data() {
    return {
      urlList: [
        {
          name: "开具发票管理",
          router: "/CompensationServiceManagement/AuditInvoice"
        },
        {
          name: "发票申请表",
          router: ""
        }
      ],
      recruitform: {
        BillingType: 0,
        ProjectId: "",
        ProjectName: "",
        BfCompanyId: "",
        InvoiceDate: "",
        InvoiceTitle: "",
        TaxType: "",
        TaxNo: "",
        ApplyUserId: "",
        AccountNo: "",
        BankName: "",
        RegAddress: "",
        CompanyTel: "",
        Amount: 0,
        ReceipType: "",
        MoneyRecordId: "",
        Remark: "",
        applicant: "",
        Attachment: "",
        SettleIdsList: [],
        SalaryBeforehandSettleId: "",
        AddInvoiceApplyDetailList: [
          {
            InvoiceType: "",
            Subject: "",
            Amount: 0
          }
        ]
      },
      InvoiceTypes: null,
      CompanyId: null,
      CompanyIdDatas: [],
      Btndisabled: true,
      optionShow: false,
      uploadLoading: false,
      fileName: "",
      filestype: "",
      rules: {
        BillingType: [
          { required: true, message: "请选择开票方式", trigger: "change" }
        ],
        BfCompanyId: [
          { required: true, message: "请选择开票公司", trigger: "change" }
        ],
        ProjectId: [
          { required: true, message: "请选择所属项目", trigger: "change" }
        ],
        ApplyUserId: [
          { required: true, message: "请选择开票申请人", trigger: "change" }
        ],
        InvoiceDate: [
          { required: true, message: "请选择开票时间", trigger: "change" }
        ],
        InvoiceTitle: [
          { required: true, message: "请输入开票抬头", trigger: "blur" }
        ],
        MoneyRecordId: [
          { required: true, message: "请选择回款流水", trigger: "change" }
        ],
        ReceipType: [
          { required: true, message: "请选择付款方式", trigger: "change" }
        ],
        SalaryBeforehandSettleId: [
          { required: true, message: "请选择预结算单", trigger: "change" }
        ],
        SettleIdsList: [
          { required: true, message: "请选择关联结算单", trigger: "change" }
        ]
      },
      moreNotifyOjbectRules: {
        Subject: [
          { required: true, message: "请选择开票项目", trigger: "change" }
        ],
        Amount: [{ required: true, validator: checkNumber, trigger: "blur" }]
      },
      Addrules: {},
      BfCompanyList: [],
      InvoiceApplyEnumTaxType: [], //客户单位性质
      InvoiceApplyEnumReceipType: [], //收款方式
      InvoiceApplyEnumInvoiceType: [], //发票类型
      ProjectList: [], // 项目列表
      MoneyDrawlist: [], // 流水列表
      UserList: [], // 开票申请人列表
      BusinessList: [],
      StatementList: [], //关联结算单列表
      PreliminaryStatementList: [], //预估结算单列表
      authorizedList: [],
      InvoiceStyleType: [
        {
          describe: "正常开票",
          value: 0
        },
        {
          describe: "预结算开票",
          value: 1
        }
      ],
      FinanceInvoiceType: [],
      PreliminaryProjectId: "",
      StatementTitle: "生成预结算单",
      StatementVisible: false,
      operating: {} // 操作码
    };
  },
  watch: {
    // "recruitform.ReceipType"(newvalue, oldvalue) {
    //   if (newvalue === 1) {
    //     this.Addrules.MoneyRecordId = [
    //       { required: true, message: "请选择回款流水", trigger: "change" }
    //     ];
    //     this.$nextTick(() => {
    //       this.$refs.Invoiceform.validateField(["MoneyRecordId"]);
    //     });
    //   } else if (newvalue === 0) {
    //     this.Addrules = {};
    //     this.$refs.Invoiceform.clearValidate(["MoneyRecordId"]);
    //   }
    // },
    // "recruitform.MoneyRecordId"(newvalue, oldvalue) {
    //   console.log(newvalue);
    //   if (newvalue) {
    //     this.$refs.MoneyRecordId.clearValidate()
    //   }
    //   else {
    //     this.$nextTick(() => {
    //       this.$refs.Invoiceform.validateField(['MoneyRecordId'])
    //     })
    //   }
    // }
  },
  created() {
    // 获取操作operating
    this.operating = JSON.parse(window.localStorage.getItem("operating")) || {};
    this.remoteCompany();
    this.getApplyAllEnum();
    this.getCatagoryType();
    this.remoteProject();
    // 判断是否再开具
    if (this.$route.query.id) {
      // 获取详情然后填充进去
      let obj = {
        Id: this.$route.query.id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetInvoiceApplyInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data.ApplyUserId) {
            this.UserList = [
              {
                Id: response.Data.ApplyUserId,
                UserName: response.Data.ApplyUserName
              }
            ];
          } else {
            this.remoteUser("");
          }
          if (response.Data && response.Data.GetInvoiceApplyInfoList) {
            response.Data.AddInvoiceApplyDetailList =
              response.Data.GetInvoiceApplyInfoList;
          } else {
            response.Data.AddInvoiceApplyDetailList = [];
          }
          Object.keys(this.recruitform).forEach(key => {
            this.recruitform[key] = response.Data[key];
          });
          //判断类型回填结算单和预结算数据
          if (response.Data.BillingType == 0) {
            this.recruitform.SettleIdsList = [];
            let arr = response.Data.SettleIds.split(",");
            for (let i = 0; i < arr.length; i++) {
              this.recruitform.SettleIdsList.push(parseInt(arr[i]));
            }
          } else {
            this.recruitform.SalaryBeforehandSettleId =
              response.Data.SalaryBeforehandSettleId;
          }
          //回填附件
          if (this.recruitform.Attachment) {
            this.fileName = this.recruitform.Attachment.slice(
              this.recruitform.Attachment.lastIndexOf("/") + 1,
              this.recruitform.Attachment.lastIndexOf(".")
            );
            this.filestype = this.recruitform.Attachment.slice(
              this.recruitform.Attachment.lastIndexOf(".") + 1
            ).toUpperCase();
          }
          //查询列表数据
          if (response.Data.ProjectId) {
            this.chooseproject(this.recruitform.ProjectId);
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    } else {
      let UsedFor = JSON.parse(localStorage.getItem("Current"));
      this.recruitform.ApplyUserId = UsedFor.currentId;
      this.UserList = [
        {
          Id: UsedFor.currentId,
          UserName: UsedFor.currentUser
        }
      ];
    }
    if (this.$route.query && this.$route.query.Id) {
      this.recruitform.ProjectId = this.$route.query.Id;
      this.recruitform.ProjectName = this.$route.query.ProjectName;
    }
    if (window.localStorage.getItem("breadpath")) {
      this.urlList[0] = JSON.parse(window.localStorage.getItem("breadpath"));
    }
  },
  computed: {
    addOne() {
      this.recruitform.Amount = 0;
      for (
        var i = 0;
        i < this.recruitform.AddInvoiceApplyDetailList.length;
        i++
      ) {
        this.recruitform.Amount += parseFloat(
          this.recruitform.AddInvoiceApplyDetailList[i].Amount
        );
      }
      return this.recruitform.Amount;
    }
  },
  methods: {
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
              this.recruitform.Attachment = uploader.urlResult.VideoUrl;
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
              this.recruitform.Attachment = res.data.ImageUrl;
              this.fileName = files.name;
              this.filestype = ext.toUpperCase();
              e.target.value = [];
            }
          });
        }
      }
    },
    //删除文件
    delFiles() {
      this.recruitform.Attachment = "";
      this.fileName = "";
    },
    //打开生成预结算单弹窗
    openPreliminaryStatement(e) {
      this.PreliminaryProjectId = this.recruitform.ProjectId;
      this.StatementVisible = true;
    },
    //成功返回预结算单生成
    successdialog(e) {
      this.chooseproject(this.recruitform.ProjectId);
      this.recruitform.SalaryBeforehandSettleId = e;
      this.StatementVisible = false;
    },
    closedialog() {
      this.StatementVisible = false;
    },
    // 移入文件显示操作
    fileShow() {
      this.optionShow = true;
    },
    // 移出文件隐藏操作
    filenoShow() {
      this.optionShow = false;
    },
    getApplyAllEnum() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetInvoiceApplyAllEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.InvoiceApplyEnumTaxType = response.InvoiceApplyEnumTaxType;
          this.InvoiceApplyEnumReceipType = response.InvoiceApplyEnumReceipType;
          this.InvoiceApplyEnumInvoiceType =
            response.InvoiceApplyEnumInvoiceType;
          this.FinanceInvoiceType = response.FinanceInvoiceType;
          console.log(this.FinanceInvoiceType);
        }
      });
    },
    // 获取开票申请人
    remoteUser(value) {
      let obj = {
        UserId: "",
        UserName: value,
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetSysUserList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.UserList = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //获取项目类型数据
    getCatagoryType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetProjectBusinessType(qs.stringify(obj)).then(response => {
        if (response) {
          this.BusinessList = response;
        }
      });
    },
    //获取下拉公司
    remoteCompany(query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          PageIndex: 1,
          PageSize: 99,
          Name: query,
          Status: 1,
          Level: -1,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetBfCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.BfCompanyList = response.Data;
            } else {
              this.BfCompanyList = [];
            }
          } else {
            this.BfCompanyList = [];
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }, 200);
    },
    // 获取项目列表
    remoteProject(value) {
      this.loading = true;
      let obj = {
        Name: value,
        CompanyId: "",
        BusinessType: "-1",
        Priority: "-1",
        Status: "-1",
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetProjectList(qs.stringify(obj)).then(response => {
        this.loading = false;
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ProjectList = response.Data;
          } else {
            this.ProjectList = [];
          }
        } else {
          this.ProjectList = [];
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    clearProject() {
      this.recruitform.InvoiceTitle = "";
      this.Btndisabled = true;
      this.remoteProject("");

      this.chooseproject(this.recruitform.ProjectId);
    },
    chooseInvoice() {
      this.chooseproject(this.recruitform.ProjectId);
      this.recruitform.SalaryBeforehandSettleId = "";
      this.recruitform.SettleIdsList = [];
      this.StatementList = [];
      this.PreliminaryStatementList = [];
    },
    // 选择项目
    chooseproject(e) {
      this.recruitform.MoneyRecordId = "";
      this.MoneyDrawlist = [];
      if (e) {
        if (!this.$route.query.id) {
          let data = this.ProjectList.find(v => {
            this.CompanyId = v.CompanyId;
            return v.Id === e;
          });
          let objList = {
            CompanyId: this.CompanyId,
            FinanceInvoiceType: -1,
            InvoiceType: -1,
            Query: "",
            PageIndex: 1,
            PageSize: 99,
            Sign: "",
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          GetFinanceInvoiceTitlePageList(objList).then(res => {
            if (res.IsSuccess && res.Data != "") {
              this.CompanyIdDatas = res.Data;
              this.recruitform.AccountNo = this.CompanyIdDatas[0].AccountNo;
              this.recruitform.BankName = this.CompanyIdDatas[0].BankName;
              this.recruitform.TaxType = this.CompanyIdDatas[0].CompanyNature;
              this.recruitform.CompanyTel = this.CompanyIdDatas[0].CompanyTel;
              this.InvoiceTypes = this.CompanyIdDatas[0].FinanceInvoiceType;
              this.InvoiceApplyEnumInvoiceType.InvoiceType = this.CompanyIdDatas[0].InvoiceType;
              this.recruitform.RegAddress = this.CompanyIdDatas[0].RegAddress;
              this.recruitform.TaxNo = this.CompanyIdDatas[0].TaxNo;
              this.recruitform.InvoiceTitle = this.CompanyIdDatas[0].Title;
              console.log(res.Data == "");
            } else {
              this.CompanyIdDatas = [];
              this.recruitform.AccountNo = null;
              this.recruitform.BankName = null;
              this.recruitform.TaxType = null;
              this.recruitform.CompanyTel = null;
              this.InvoiceTypes = null;
              this.InvoiceApplyEnumInvoiceType.InvoiceType = null;
              this.recruitform.RegAddress = null;
              this.recruitform.TaxNo = null;
            }
          });
          console.log(this.CompanyIdDatas);
          this.recruitform.InvoiceTitle = data.CompanyName;
          if (this.recruitform.InvoiceTitle) {
            // this.$refs[formName].resetFields();
            this.$refs.Invoiceform.clearValidate("InvoiceTitle");
          }
        }
        this.Btndisabled = false;
        // 根据项目查询流水
        let obj = {
          ProjectId: e,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetInvoiceApplyMoneyRecord(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              console.log(response.Data);
              this.MoneyDrawlist = response.Data;
            } else {
              this.MoneyDrawlist = [];
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
        // if (!this.$route.query.id) {
        this.getSettleList(e);
        // }
      }
    },
    // 通过项目获取结算单
    getSettleList(e) {
      if (this.recruitform.BillingType == 0) {
        this.StatementList = [];
        // 根据项目查询结算单
        let obj2 = {
          ProjectId: e,
          Title: "",
          PageIndex: 1,
          PageSize: 999,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetSalarySettleByProject(qs.stringify(obj2)).then(response => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              this.StatementList = response.Data;
            } else {
              this.StatementList = [];
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else if (this.recruitform.BillingType == 1) {
        this.PreliminaryStatementList = [];
        // 根据项目查询预估结算单
        let obj3 = {
          ProjectId: e,
          Title: "",
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetSalaryBeforehandSettle(qs.stringify(obj3)).then(response => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              this.PreliminaryStatementList = response.Data;
            } else {
              this.PreliminaryStatementList = [];
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }
    },
    // 选择回款流水金额
    chooseMoney(e) {
      // let data = this.MoneyDrawlist.find(v => {
      //   return v.Id === e
      // })
    },
    clearCompany() {
      this.remoteCompany();
    },
    AddInvoice() {
      this.recruitform.AddInvoiceApplyDetailList.push({
        InvoiceType: "",
        Subject: "",
        Amount: 0
      });
    },
    DelInvoice(index) {
      this.recruitform.AddInvoiceApplyDetailList.splice(index, 1);
    },
    ProjectInvoice(form) {
      // console.log(this.CompanyIdDatas=='');
      // console.log(this.CompanyId!=null);
      // console.log(this.InvoiceTypes!=null);
      // console.log(this.InvoiceApplyEnumInvoiceType.InvoiceType!='');
      // console.log(this.InvoiceApplyEnumInvoiceType.InvoiceType);
      console.log(this.InvoiceApplyEnumInvoiceType.InvoiceType);
      // console.log(this.CompanyIdDatas==''&&this.CompanyId!=null&&this.InvoiceTypes!=null&&this.InvoiceApplyEnumInvoiceType.InvoiceType!='');
      if (
        this.CompanyIdDatas == "" &&
        this.CompanyId != null &&
        this.InvoiceTypes != null &&
        this.InvoiceApplyEnumInvoiceType.InvoiceType != ""
      ) {
        let obj = {
          CompanyId: this.CompanyId,
          Title: this.recruitform.InvoiceTitle,
          TaxNo: this.recruitform.TaxNo,
          AccountNo: this.recruitform.AccountNo,
          FinanceInvoiceType: this.InvoiceTypes,
          InvoiceType: this.InvoiceApplyEnumInvoiceType.InvoiceType,
          CompanyNature: this.recruitform.TaxType,
          BankName: this.recruitform.BankName,
          RegAddress: this.recruitform.RegAddress,
          CompanyTel: this.recruitform.CompanyTel,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        showLoading();
        AddFinanceInvoiceTitle(obj).then(res => {
          hideLoading();
          if (res.IsSuccess) {
            this.chooseproject(this.recruitform.ProjectId);
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.$message({
              message: res.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.$refs[form].validate(valid => {
          if (valid) {
            let obj = this.recruitform;
            obj.menuid = this.operating.MenuId;
            obj.operationcode = this.operating.OperationCode;
            let Amount = 0;
            // 增加判断如果选择先开票后付款就不做判断
            if (this.recruitform.ReceipType === 1) {
              if (this.recruitform.MoneyRecordId) {
                Amount = this.MoneyDrawlist[
                  this.MoneyDrawlist.findIndex(
                    item => item.MoneyRecordId == this.recruitform.MoneyRecordId
                  )
                ].Amount;
              }
              if (parseFloat(this.recruitform.Amount) > parseFloat(Amount)) {
                this.$message({
                  message: "开票金额不得大于回款总金额！",
                  type: "error"
                });
                return;
              }
            }
            if (this.recruitform.BillingType == 0) {
              if (this.recruitform.SettleIdsList.length > 0) {
                obj.SettleIds = this.recruitform.SettleIdsList.join(",");
              }
            }
            AddInvoiceApply(qs.stringify(obj)).then(response => {
              if (response.IsSuccess && response.Data.Id) {
                this.$message({
                  type: "success",
                  message: "开具发票成功!"
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: "error"
                });
              }
            });
          } else {
            this.$message({
              message: "请按要求填写表单内容",
              type: "error"
            });
            return false;
          }
        });
      }
    }
  }
};
</script>
<style lang="scss">
.add-project-Invoice {
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
      min-width: 400px;
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
          .el-input {
            .el-input__inner {
              height: 36px;
              line-height: 36px;
            }
            .el-input__suffix {
              height: 40px;
              line-height: 40px;
            }
          }
        }
        .el-date-editor--datetimerange {
          width: 100%;
          border: 1px solid #fff;
        }
      }
      .el-input {
        font-size: 14px;
        .el-input__inner {
          height: 36px;
          line-height: 36px;
        }
        .el-input__suffix {
          height: 36px;
          line-height: 36px;
        }
      }
      /deep/ .btn-select {
        width: calc(100% - 120px) !important;
      }
      .ButtonInvoice {
        float: right;
        width: 120px;
        border-radius: 0;
        border: none;
        margin-top: 3px;
        color: #fff;
        background-image: none;
        background-color: #1588f8;
      }
      input {
        background: #f0f4fa;
        border: 1px solid #f0f4fa;
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
    .is-error {
      input {
        border: 1px solid #f56c6c;
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
.multiple-col {
  float: left;
  width: 100%;
  .multiple-button {
    text-align: right;
    margin-right: 80px;
    .Addbtn {
      color: #1588f8;

      font-size: 14px;
      i {
        margin-right: 8px;
      }
    }
    .Delbtn {
      color: #1588f8;
      font-size: 14px;
      margin-left: 50px;
      i {
        margin-right: 8px;
      }
      &:hover {
        color: #f56262;
      }
    }
  }
}
</style>