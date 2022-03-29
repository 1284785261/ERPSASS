<!-- 发起工资付款申请 -->
<template>
  <div class="add-payment-request-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="paymentform" label-position="top" :model="paymentform" :rules="rules" label-width="140px" class="paymentform">
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Type" label="类型" prop="Type">
                <el-select disabled v-model="paymentform.Type" placeholder="请选择">
                  <el-option v-for="item in ApplyPayEnumType" :key="item.value" :label="item.describe" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="BusinessNo" label="业务单号">
                <el-input v-model="paymentform.BusinessNo" disabled clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="BfCompanyId" label="付款公司" prop="BfCompanyId">
                <el-select v-model="paymentform.BfCompanyId" remote filterable clearable placeholder="搜索或选择付款公司" :remote-method="BfCompanyMethod" autocomplete="off" @clear="BfCompanyMethod('')">
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in BfCompanylist" :key="index"></el-option>
                  <div v-if="BfCompanylist.length > 99" class="search-keyword">
                    <span>只显示前100条结果，请完善搜索关键字</span>
                  </div>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Accepter" label="收款方" prop="Accepter" v-if="Type === 2 || Type === 3 || Type === 4">
                <el-input v-model="paymentform.Accepter" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="BankName" label="开户行" prop="BankName" v-if="Type === 2 || Type === 3 || Type === 4">
                <el-select v-model="paymentform.BankName" placeholder="选择或搜索开户行" autocomplete="off">
                  <el-option v-for="item in BankNameTolist" :key="item.Id" :label="item.ClassName" :value="item.Id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="开户支行" v-if="Type === 2 || Type === 3 || Type === 4">
                <el-input v-model="paymentform.BankBranch" placeholder="请输入开户支行" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Account" label="银行账号" prop="Account" v-if="Type === 2 || Type === 3 || Type === 4">
                <el-input v-model="paymentform.Account" placeholder="请输入银行账号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Method" label="付款方式" prop="Method">
                <el-select v-model="paymentform.Method" placeholder="请选择" clearable autocomplete="off">
                  <el-option v-for="item in ApplyPayEnumMethod" :key="item.value" :label="item.describe" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="Type!=1">
              <el-form-item ref="Amount" label="付款金额" prop="Amount">
                <el-input v-model="paymentform.Amount" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="PayType" label="支出类型" prop="PayType" v-if="Type===1">
                <el-select v-model="paymentform.PayType" clearable placeholder="请选择支出类型" autocomplete="off">
                  <!-- <el-option label="正常" :value="0"></el-option>
                  <el-option label="挂账" :value="1"></el-option>
                  <el-option label="结余" :value="2"></el-option>
                  <el-option label="管理费" :value="3"></el-option> -->
                  <el-option v-for="(it, index) in PayTypeList" :key="index" :label="it.describe" :value="it.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="OnCreditId" label="所属挂账" v-if="paymentform.PayType === 1">
                <el-select v-model="paymentform.OnCreditId" filterable clearable placeholder="请选择所属挂账" autocomplete="off">
                  <el-option v-for="(item, index) in Creditlist" :key="index" :label="item.Title" :value="item.OnCreditId"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Advance" label="是否需要代垫" v-if="Type===1">
                <el-radio-group v-model="paymentform.AdvanceType">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Advance" label="本次垫付金额" prop="Advance" v-if="paymentform.AdvanceType===1">
                <el-input v-model="paymentform.Advance" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="CollectionTime" label="预计回款时间" v-if="paymentform.AdvanceType===1">
                <el-date-picker v-model="paymentform.CollectionTime" style="width:310px;" type="datetime" format="yyyy 年 MM 月 dd 日    HH 时 mm 分 ss 秒" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" @change="changes(paymentform.CollectionTime)">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="OutstandingHistoricalAdvances" label="历史代垫未回款" v-if="paymentform.AdvanceType===1">
                <el-input v-model="paymentform.OutstandingHistoricalAdvances" readonly="readonly" type="text" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Advance" label="代垫协议" v-if="paymentform.AdvanceType===1">
                <el-input type="readonly" class="FileIpt" placeholder="选择上传文件" :loading="uploadLoading">上传文件</el-input>
                <input type="file" accept=".png,.jpg," name="fileUrl" class="FileButtons" @change="uploadFile($event)">
                <p style="font-size:12px;margin:0;color:#999;">只能上传jpg、png格式文件，文件不能超过5M</p>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="薪酬类型" v-if="Type === 1">
                <el-input v-model="paymentform.SalaryText" placeholder="请输入薪酬类型" clearable></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col v-if="Type !== 1" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="已选对应回款">
                <el-select v-model="paymentform.PaymentLists" disabled multiple placeholder="">
                  <el-option v-for="(item, index) in PaymentList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
          </el-row>

          <!-- 选择对应发票和流水, 选择条件1.工资付款申请 2.不需要代垫 -->
          <div v-if="Type===1 && paymentform.AdvanceType===0" class="invoice-info">
            <el-row :gutter="64">
              <el-col :span="24">
                <el-form-item label="对应发票">
                  <el-select v-model="InvoiceInfo" disabled multiple filterable placeholder="当前结算单所对应发票" @change="chooseInvoice($event, index)" autocomplete="off">
                    <el-option v-for="item in InvoiceList" :key="item.Id" :label="item.InvoiceTitle+item.Amount+'元 ( '+item.InvoiceDate +' )'" :value="item.Id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <el-form-item ref="MoneyRecordId" label="选择对应流水" :prop="'InvoiceInfo.' + index + '.MoneyRecordId'">
                  <el-select v-model="item.MoneyRecordId" :disabled="item.isdisable" filterable clearable placeholder="选择或搜索对应流水" autocomplete="off">
                    <el-option v-for="it in MoneyRecordList" :key="it.Id" :label="it.Amount+'_'+it.PayTime+'_'+it.BankName+'_'+it.Account" :value="it.Id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="handle cursor-pointer" @click="addInvoic">
                  <svg-icon icon-class="add" class="add" />
                  <span>添加</span>
                </div>
                <div v-if="paymentform.InvoiceInfo.length!==1 && !item.isdisable" class="handle cursor-pointer" @click="delInvoic(item, index)">
                  <svg-icon icon-class="del" class-name="del" />
                  <span>删除</span>
                </div>
              </el-col> -->
            </el-row>
          </div>

          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="SettleType" label="结算方式" prop="SettleType" v-if="Type === 1">
                <el-radio-group v-model="paymentform.SettleType" @change="SettleTypeChange">
                  <el-radio :label="0">单银行结算</el-radio>
                  <el-radio :label="1">多银行结算</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="BankName" label="选择工资打款行" prop="BankName" v-if="Type === 1 && paymentform.SettleType === 0">
                <el-select v-model="paymentform.BankName" filterable clearable placeholder="选择或搜索工资打款行">
                  <el-option v-for="item in BankNamelist" :key="item.BankId" :label="item.BankName" :value="item.BankId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="64" v-if="SettleMemberlist.length > 0">
            <div v-for="(item,index) in SettleMemberlist" :key="index">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="员工工资卡所属行" v-if="Type === 1 && paymentform.SettleType === 1">
                  <el-input v-model="item.BankName" clearable disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="人数" v-if="Type === 1 && paymentform.SettleType === 1">
                  <el-input v-model="item.Num" clearable disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form-item label="选择工资打款行" v-if="Type === 1 && paymentform.SettleType === 1">
                  <el-select v-model="item.CompanyBankId" filterable clearable placeholder="请选择或搜索工资打款行" @change="chooseCompanyBankId($event, index)">
                    <el-option v-for="item in BankNamelist" :key="item.BankId" :label="item.BankName" :value="item.BankId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </div>

          </el-row>
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item ref="UsedFor" label="用途说明" class="text">
                <el-input type="textarea" :rows="6" v-model="paymentform.UsedFor" maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="AdvanceBack" label="上次垫付回款">
                <el-input v-model="paymentform.AdvanceBack" clearable></el-input>
              </el-form-item>
            </el-col> -->

            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="HandleUserId" label="经办人" prop="HandleUserId">
                <el-select v-model="paymentform.HandleUserId" disabled filterable clearable placeholder="搜索选择经办人" @clear="userMethod">
                  <el-option :label="item.UserName" :value="item.Id" v-for="(item, index) in userlist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="HandleOrgId" label="经办部门" prop="HandleOrgId">
                <el-select v-model="paymentform.HandleOrgId" clearable filterable remote placeholder="请选择经办部门">
                  <el-option v-for="item in ApplicationDepartmentList" :key="item.OrgId" :label="item.FullOrgName" :value="item.OrgId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item ref="Remark" label="备注" class="text">
                <el-input type="textarea" :rows="6" v-model="paymentform.Remark" maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="btn-box">
                <el-button class="erpbtn" @click="paymentcancel">取消</el-button>
                <el-button class="erpbtn" @click="paymentsave">保存</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="dialog">
      <!-- <orgteam :orgtitle="orgtitle" :visible="showOrg" :temporary="temporary" @closeorg="closeorg" @saveorg="saveorg"></orgteam> -->
    </div>
  </div>
</template>

<script>
import { GetCatagoryList } from "@/api/Public.js";
import {
  GetApplyPayAllEnum,
  GetBfBankList,
  GetInvoiceApplyBySettle,
  GetCompanyInvoiceApplyBySettle,
  GetCompanyMoneyRecordBySettle,
  GetApplyPayInfo
} from "@/api/FinancialManagement.js";
import {
  GetSysUserList,
  GetSysUserListByOrgId,
  GetOrgByUserId
} from "@/api/SystemSetting.js";
import {
  SalaryPayApply,
  SiPayApply,
  FundPayApply,
  GetOnCreditListByProject,
  MedicalPayApply,
  GetSalarySettleMemberBankList
} from "@/api/CompensationServiceManagement.js";
import { GetBfCompanyPageList, GetSalaryBankList } from "@/api/BusinessSet.js";
import {
  showLoading,
  hideLoading,
  MenuIdDate
} from "@/utils/CustomValidation.js";
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import orgteam from "@/components/publicComponents/dialog-orgteam.vue";
import axios from "axios";
import qs from "qs";
import { filter } from "minimatch";
export default {
  components: {
    BreadCrumb,
    orgteam
  },
  data() {
    return {
      urlList: [
        {
          name: "结算单",
          router: "/CompensationServiceManagement/FinalStatement"
        },
        {
          name: "发起工资付款申请",
          router: ""
        }
      ],
      paymentform: {
        // CollectionTime: "",
        // OutstandingHistoricalAdvances: "",
        Type: "",
        ProjectId: "",
        AdvanceType: 0,
        SettleType: 0,
        // Advance: "",
        // AdvanceBack: "",
        BusinessNo: "",
        BfCompanyId: "",
        Accepter: "",
        BankName: "",
        BankBranch: "",
        Account: "",
        Method: "",
        UsedFor: "",
        Amount: "",
        HandleOrgId: "",
        HandleUserId: "",
        Remark: "",
        SalarySettleIds:[],
        // PaymentLists: [],
        SalaryText: "工资"
      },
      // 发票关联流水列表
      InvoiceInfo: [],
      PayTypeList: [
        {
          describe: "正常",
          value: 0
        },
        {
          describe: "挂账",
          value: 1
        },
        {
          describe: "结余",
          value: 2
        },
        {
          describe: "管理费",
          value: 3
        }
      ],
      InvoiceList: [], // 发票列表
      MoneyRecordList: [], // 流水列表
      Type: "",
      ProjectId: "",
      fileUrl: "",
      uploadLoading: false,
      ApplicationDepartmentList: [], //用户组织列表
      ApplyPayEnumType: [], // 类型
      ApplyPayEnumMethod: [], // 付款方式
      ApplyPayEnumStatus: [], // 状态
      BfCompanylist: [], // 付款公司列表
      BankNameTolist: [],
      BankNamelist: [], // 开户行列表
      SettleMemberlist: [], //多银行列表
      userlist: [], // 经办人列表
      Creditlist: [], // 挂账列表
      PaymentList: [], //回款列表
      showOrg: false, // 组织结构弹框
      orgtitle: "",
      // temporary: {}, // 组织对象
      SettleMember: {}, //查询多银行列表
      rules: {
        Type: [{ required: true, message: "请选择类型", trigger: "change" }],
        BusinessNo: [
          { required: true, message: "请输入业务单号", trigger: "blur" }
        ],
        BfCompanyId: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
        PayType: [
          { required: true, message: "请选择支出类型", trigger: "change" }
        ],
        Advance: [
          { required: true, message: "请输入本次垫付金额", trigger: "blur" }
        ],
        Accepter: [
          { required: true, message: "请输入收款方", trigger: "blur" }
        ],
        BankName: [
          { required: true, message: "请选择开户行", trigger: "change" }
        ],
        Account: [
          { required: true, message: "请输入银行账号", trigger: "blur" }
        ],
        Method: [
          { required: true, message: "请选择付款方式", trigger: "change" }
        ],
        HandleUserId: [
          { required: true, message: "请选择经办人", trigger: "change" }
        ],
        Amount: [
          { required: true, message: "请输入付款金额", trigger: "blur" }
        ],
        HandleOrgId: [
          { required: true, message: "请选择经办部门", trigger: "change" }
        ],
        SettleType: [
          { required: true, message: "请选择结算方式", trigger: "change" }
        ]
      },

      operating: {}
    };
  },
  watch: {
    temporary(newvalue, oldvalue) {
      // this.paymentform.OrgName = newvalue.OrgName;
      if (newvalue.Id) {
        this.userMethod();
      } else {
        this.paymentform.HandleUserId = "";
        this.userlist = [];
      }
    }
  },
  created() {
    // 获取操作operating
    this.operating = JSON.parse(window.localStorage.getItem("operating")) || {};
    // 判断是否显示项目指派人员
    this.ProjectId = this.$route.query.projectId;
    this.paymentform.UsedFor = this.$route.query.name;
    this.paymentform.ProjectId = this.$route.query.projectId;
    this.SettleMember = this.$route.query.searchform || {};
    this.SettleId = this.$route.query.id;
    this.Type = Number(this.$route.query.type);
    // if (JSON.parse(localStorage.getItem("receivableList"))) {
    //   this.PaymentList = JSON.parse(
    //     localStorage.getItem("receivableList")
    //   ).split(",");
    //   this.paymentform.PaymentLists = this.PaymentList;
    // }

    // 获取当前登录账号自动填充经办部门经办人
    const orgdata = JSON.parse(window.localStorage.getItem("Org")) || {};
    const Current = JSON.parse(window.localStorage.getItem("Current")) || {};
    // this.temporary.OrgName = orgdata.OrgName;
    // this.temporary.Id = orgdata.OrgId;
    // this.paymentform.OrgName = orgdata.OrgName;
    this.paymentform.HandleUserId = Current.currentId;
    this.userlist = [
      {
        UserName: Current.currentUser,
        Id: Current.currentId
      }
    ];
    // 获取付款申请单详情
    if (this.$route.query && this.$route.query.isbeginid) {
      this.getApplyPayInfo();
    } else {
      this.BfCompanyMethod("");
    }
    this.getApplyPayAllEnum();
    this.getCatagoryList();
    this.getBfBankList();
    this.GetOrgByUserId();
    if (this.Type === 1) {
      this.urlList[1].name = "发起工资付款申请";
      // this.getOnCreditPageList('')
      // this.SettleMemberLists()
      // 获取当前结算单的发票数据和流水数据, 当获取付款申请之后就不再请求
      if (this.$route.query && this.$route.query.isbeginid) {
      } else {
        // 处理金额
        this.paymentform.Amount = 0;
        const customer = JSON.parse(window.localStorage.getItem("stafflist"));
        // console.log(customer, `1111111`);
        if (customer) {
          for (let i = 0; i < customer.length; i++) {
            this.paymentform.Amount += parseFloat(customer[i].Amount);
          }
          this.paymentform.Amount = Number(this.paymentform.Amount).toFixed(2);
        } else {
        }

        this.getInvoiceApplyBySettle();
        this.getOnCreditPageList("");
        this.SettleMemberLists();
      }
    } else if (this.Type === 2) {
      this.urlList[1].name = "发起社保付款申请";
      this.paymentform.Amount = this.$route.query.Amount;
    } else if (this.Type === 3) {
      this.urlList[1].name = "发起公积金付款申请";
      this.paymentform.Amount = this.$route.query.Amount;
    } else if (this.Type === 4) {
      this.urlList[1].name = "发起医保付款申请";
      this.paymentform.Amount = this.$route.query.Amount;
    }
    this.paymentform.BusinessNo = this.$route.query.code;
    this.paymentform.Type = Number(this.$route.query.type);

    // this.getOnCreditPageList('')
  },
  methods: {
    changes(data) {
      console.log(data);
    },
    //上传协议
    uploadFile(e) {
      const files = e.target.files[0];
      var ext = files.name.slice(files.name.lastIndexOf(".") + 1).toLowerCase();
      if (ext == "jpg" || ext == "png") {
      } else {
        this.$message({
          message: "不支持该格式文件上传",
          type: "warning"
        });
        this.fileUrl = "";
        e.target.value = [];
        return false;
      }
      if (files.size > 5 * 1024 * 1024) {
        this.$message({
          message: "文件大小超过最大限制",
          type: "warning"
        });
        this.fileUrl = "";
        e.target.value = [];
        return false;
      } else {
        let datas = new FormData();
        datas.append("file", files);
        datas.append("message", "{ImageStreamName:'file',BussinessType:0}");
        axios.post(process.env.VUE_APP_BASE_API_UPLOAD, datas).then(res => {
          if (res.data.State) {
            this.fileUrl = res.data.ImageUrl;
            console.log(this.fileUrl);
            e.target.value = [];
          }
        });
      }
    },
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
    // 获取付款申请详情
    getApplyPayInfo() {
      new Promise((resolve, reject) => {
        let obj = {
          Id: this.$route.query.isbeginid,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetApplyPayInfo(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data) {
              this.paymentform.BusinessNo = response.Data.BusinessNo;
              // 回填付款公司
              this.paymentform.BfCompanyId = response.Data.BfCompanyId;
              this.BfCompanylist = [
                {
                  Name: response.Data.BfCompanyName,
                  Id: response.Data.BfCompanyId
                }
              ];
              this.paymentform.Method = response.Data.Method;
              this.$set(this.paymentform, "PayType", response.Data.PayType);
              this.$set(this.paymentform, "ProjectId", response.Data.ProjectId);
              this.paymentform.AdvanceType = response.Data.AdvanceType;
              // 是否需要代垫, 如果需要则进行回填
              if (this.paymentform.AdvanceType === 1) {
                this.$set(this.paymentform, "Advance", response.Data.Advance);
              }
              this.$set(
                this.paymentform,
                "ApplyPayId",
                this.$route.query.isbeginid
              );
              this.$set(this.paymentform, "UsedFor", response.Data.UsedFor);
              this.$set(
                this.paymentform,
                "AdvanceBack",
                response.Data.AdvanceBack
              );
              this.$set(this.paymentform, "BankName", response.Data.BankName);
              this.$set(this.paymentform, "Remark", response.Data.Remark);
              // 覆盖掉默认的经办人, 改成付款申请单的经办人
              // this.$set(
              //   this.paymentform,
              //   "OrgName",
              //   response.Data.HandleOrgName
              // );
              this.$set(
                this.paymentform,
                "HandleUserId",
                response.Data.HandleUserId
              );
              // this.$set(this.temporary, "OrgName", response.Data.HandleOrgName);
              // this.$set(this.temporary, "Id", response.Data.HandleOrgId);
              this.userlist = [
                {
                  UserName: response.Data.HandleUserName,
                  Id: response.Data.HandleUserId
                }
              ];
              const backdata = {
                SalarySettleIds: response.Data.SalarySettleIds,
                ProjectId: response.Data.ProjectId
              };
              resolve(backdata);
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }).then(value => {
        console.log("第二步", value);
        this.SettleId = value.SalarySettleIds;
        this.ProjectId = value.ProjectId;
        this.getInvoiceApplyBySettle();
        this.getOnCreditPageList();
        this.SettleMemberLists();
      });
    },
    // 获取多银行列表
    SettleMemberLists() {
      let obj = {
        SalarySettleId: this.SettleId,
        StaffName: this.SettleMember.StaffName,
        IdCode: this.SettleMember.IdCode,
        Status: this.SettleMember.Status,
        BankId: this.SettleMember.BankId,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetSalarySettleMemberBankList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.SettleMemberlist = response.Data;
            for (let i = 0; i < this.SettleMemberlist.length; i++) {
              this.SettleMemberlist[i].StaffBankId = this.SettleMemberlist[
                i
              ].BankId;
              this.SettleMemberlist[i].StaffBankName = this.SettleMemberlist[
                i
              ].BankName;
              if (this.SettleMemberlist[i].BankId) {
                let CompanyBankId = "";
                let CompanyBankName = "";
                this.BankNamelist.map((val, index) => {
                  if (val.BankId == this.SettleMemberlist[i].BankId) {
                    CompanyBankId = val.BankId;
                    CompanyBankName = val.BankName;
                  }
                });
                this.$set(
                  this.SettleMemberlist[i],
                  "CompanyBankId",
                  CompanyBankId
                );
                this.$set(
                  this.SettleMemberlist[i],
                  "CompanyBankName",
                  CompanyBankName
                );
                // this.$set(this.SettleMemberlist[i], 'CompanyBankId', this.BankNamelist[this.BankNamelist.findIndex(item => item.BankId == this.SettleMemberlist[i].BankId)].BankId)
                // this.$set(this.SettleMemberlist[i], 'CompanyBankName', this.BankNamelist[this.BankNamelist.findIndex(item => item.BankId == this.SettleMemberlist[i].BankId)].BankName)
              }
            }
          } else {
            this.SettleMemberlist = [];
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取开户行
    getCatagoryList() {
      let obj = {
        ClassName: "",
        Status: 1,
        ClassType: 5,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetCatagoryList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.BankNameTolist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取付款申请枚举
    getApplyPayAllEnum() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetApplyPayAllEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.ApplyPayEnumType = response.ApplyPayEnumType;
          this.ApplyPayEnumMethod = response.ApplyPayEnumMethod;
          this.ApplyPayEnumStatus = response.ApplyPayEnumStatus;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取公司列表
    BfCompanyMethod(value) {
      // this.BankNamelist = []
      // this.paymentform.BankName = ''
      // this.paymentform.BankBranch = ''
      // this.paymentform.Account = ''
      let obj = {
        Name: value,
        Level: -1,
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetBfCompanyPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.BfCompanylist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取用户列表
    userMethod() {
      let obj = {
        OrgId: this.temporary.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      this.paymentform.HandleUserId = "";
      this.userlist = [];
      GetSysUserListByOrgId(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.userlist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取开户行列表
    getBfBankList() {
      this.BankNamelist = [];
      let obj = {
        BankName: "",
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetSalaryBankList;
      GetSalaryBankList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.BankNamelist = response.Data;
          // const res = new Map();
          // this.BankNamelist = this.BankNamelist.filter((v) => !res.has(v.BankId) && res.set(v.BankId, 1))
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // // 选择开户支行 废弃
    // chooseBankName(e) {
    //   let data = this.BankNamelist.find(v => {
    //     return v.Id === e
    //   })
    //   if (data) {
    //     this.paymentform.BankBranch = data.Branch
    //     this.paymentform.Account = data.Account
    //   }
    // },
    // 获取挂账列表
    getOnCreditPageList() {
      let obj = {
        ProjectId: this.ProjectId,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      console.log(obj);
      GetOnCreditListByProject(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.Creditlist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 选择是否单银行
    SettleTypeChange() {
      this.paymentform.BankName = "";
    },
    // 获取发票列表
    // getCompanyInvoiceApplyBySettle(value) {
    //   let obj = {
    //     SettleId: this.SettleId,
    //     Key: value,
    //     menuid: MenuIdDate(),
    //     operationcode: "1"
    //   };
    //   this.InvoiceInfo = []
    //   console.log(obj);
    //   GetCompanyInvoiceApplyBySettle(qs.stringify(obj)).then(response => {
    //     if (response.IsSuccess) {
    //       this.InvoiceList = response.Data;
    //       for(let i=0;i<this.InvoiceList.length;i++){
    //         this.InvoiceInfo.push(this.InvoiceList[i].Id)
    //       }
    //     } else {
    //       this.$message({
    //         message: response.MessageContent,
    //         type: "error"
    //       });
    //     }
    //   });
    // },
    // 获取流水列表
    // getCompanyMoneyRecordBySettle(value) {
    //   let obj = {
    //     SettleId: this.SettleId,
    //     Key: value,
    //     menuid: MenuIdDate(),
    //     operationcode: "1"
    //   };
    //   GetCompanyMoneyRecordBySettle(qs.stringify(obj)).then(response => {
    //     if (response.IsSuccess) {
    //       this.MoneyRecordList = response.Data;
    //     } else {
    //       this.$message({
    //         message: response.MessageContent,
    //         type: "error"
    //       });
    //     }
    //   });
    // },
    // 获取当前结算单有哪些发票
    getInvoiceApplyBySettle() {
      let obj = {
        SettleId: this.SettleId,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetInvoiceApplyBySettle(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
             this.InvoiceList = response.Data;
          for(let i=0;i<this.InvoiceList.length;i++){
            this.InvoiceInfo.push(this.InvoiceList[i].Id)
          }
          }
          // this.getCompanyMoneyRecordBySettle("");
          // this.getCompanyInvoiceApplyBySettle("");
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 选择银行的时候, 把名字替换进去
    chooseCompanyBankId(e, index) {
      for (let i = 0; i < this.BankNamelist.length; i++) {
        if (this.BankNamelist[i].BankId == e) {
          this.$set(
            this.SettleMemberlist[index],
            "CompanyBankName",
            this.BankNamelist[i].BankName
          );
        }
      }
    },
    // // 选择组织结构
    // chooseorg() {
    //   this.orgtitle = "选择组织结构";
    //   this.showOrg = true;
    // },
    // // 清除组织结构
    // clearableorg() {
    //   this.temporary = {
    //     Id: "",
    //     OrgName: ""
    //   };
    // },
    // 关闭组织结构
    // closeorg(e) {
    //   this.showOrg = false;
    // },
    // // 保存弹框
    // saveorg(e) {
    //   this.temporary = e;
    //   this.showOrg = false;
    // },

    // 取消
    paymentcancel() {
      this.$router.go(-1);
    },
    // 保存
    paymentsave() {
      // if (this.temporary.Id) {
      //   this.paymentform.HandleOrgId = this.temporary.Id;
      // } else {
      //   this.paymentform.HandleOrgId = "";
      // }
      let obj = this.paymentform;
      obj.SettleId = this.SettleId;
      obj.menuid = MenuIdDate();
      obj.operationcode = "1";
      console.log(obj);
      this.$refs.paymentform.validate(v => {
        if (v) {
          if (this.Type === 1) {
            // const ApplyInfo = JSON.parse(window.localStorage.getItem('stafflist'))
            // let arry = []
            // for (let i = 0; i < ApplyInfo.length; i++) {
            //   arry.push({
            //     SalaryId: ApplyInfo[i].SalaryId,
            //     Amount: ApplyInfo[i].Amount
            //   })
            // }
            // obj.ApplyInfo = arry

            let PayBankMapping = [];
            for (let i = 0; i < this.SettleMemberlist.length; i++) {
              PayBankMapping.push({
                CompanyBankId: this.SettleMemberlist[i].CompanyBankId,
                CompanyBankName: this.SettleMemberlist[i].CompanyBankName,
                StaffBankId: this.SettleMemberlist[i].StaffBankId,
                StaffBankName: this.SettleMemberlist[i].StaffBankName
              });
            }
            obj.PayBankMapping = PayBankMapping;
            showLoading();
            SalaryPayApply(qs.stringify(obj)).then(response => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  message: "成功发起付款申请",
                  type: "success"
                });
                this.$router.go(-1);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: "error"
                });
              }
            });
          } else if (this.Type === 2) {
            delete obj.InvoiceInfo;
            console.log(JSON.stringify(obj));
            showLoading();
            SiPayApply(qs.stringify(obj)).then(response => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  message: "成功发起付款申请",
                  type: "success"
                });
                this.$router.go(-1);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: "error"
                });
              }
            });
          } else if (this.Type === 3) {
            delete obj.InvoiceInfo;
            showLoading();
            FundPayApply(qs.stringify(obj)).then(response => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  message: "成功发起付款申请",
                  type: "success"
                });
                this.$router.go(-1);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: "error"
                });
              }
            });
          } else if (this.Type === 4) {
            delete obj.InvoiceInfo;
            showLoading();
            MedicalPayApply(qs.stringify(obj)).then(response => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  message: "成功发起付款申请",
                  type: "success"
                });
                this.$router.go(-1);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: "error"
                });
              }
            });
          }
        }
      });
    },

    // 添加流水
    addInvoic() {
      this.paymentform.InvoiceInfo.push({
        InvoiceApplyId: "",
        MoneyRecordId: "",
        isdisable: false
      });
    },
    // 删除流水
    delInvoic(data, i) {
      this.paymentform.InvoiceInfo.splice(i, 1);
    },
    // 选择对应发票查询相应的流水
    chooseInvoice(e, index) {
      // 获取选择对应的数据
      if (e) {
        const data =
          this.InvoiceList.find(v => {
            return v.Id === e;
          }) || {};
        console.log(data);
        if (data.MoneyRecordId) {
          this.paymentform.InvoiceInfo[index].MoneyRecordId =
            data.MoneyRecordId;
        }
      } else {
        this.paymentform.InvoiceInfo[index].MoneyRecordId = "";
      }
    }
  }
};
</script>

<style lang="scss">
.add-payment-request-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .form-content {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 24px 40px;
    .paymentform {
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
          min-height: 41px;
          width: 100%;
          .el-input__inner {
            background-color: $erinputbgc;
          }
          .el-select {
            width: 100%;
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
        // // 底部添加按钮
        // &.bottom {
        //   .el-form-item__content {
        //     text-align: center;
        //     max-width: 100%;
        //     .el-button+.el-button {
        //       margin-left: 24px;
        //     }
        //   }
        // }
      }
      .btn-box {
        text-align: center;
        .el-button + .el-button {
          margin-left: 24px;
        }
      }

      // 对应发票流水添加功能
      .invoice-info {
        .handle {
          font-size: $f14;
          color: $erpplaceholder;
          margin-top: 35px;
          display: inline-block;
          margin-right: 24px;
          .svg-icon {
            margin-right: 8px;
            font-size: $f16;
            &.add {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>