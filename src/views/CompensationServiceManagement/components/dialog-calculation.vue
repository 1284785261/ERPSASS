<!-- 工资结算 -->
<template>
  <div class="calculation-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="calculation-content">
      <div class="calculation-title">发起工资结算
        <el-tooltip class="ChannelName-icon" effect="dark" content="发起结算前，建议您前去补充完善当前结算表中的人员的入职信息，否则由于缺失数据导致的其他后果，系统不予承担" placement="top-start">
          <i class="el-icon-warning"></i>
        </el-tooltip>
      </div>

      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <el-row :gutter="64">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="结算单名称" prop="Title">
              <el-input v-model="operateform.Title" placeholder="输入结算单名称" disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="用工单位" prop="CompanyId" class="select">
              <el-select ref="company" v-model="operateform.CompanyId" filterable remote clearable placeholder="搜索选择用工公司" :remote-method="CompanyMethod" @change="changecompany" @clear="CompanyMethod('')">
                <el-option v-for="item in Companylist" :key="item.Id" :label="item.Name" :value="item.Id">
                </el-option>
                <div v-if="Companylist.length > 99" class="search-keyword">
                  <span>只显示前100条结果，请完善搜索关键字</span>
                </div>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="选择项目" prop="ProjectId" class="select">
              <el-select ref="project" v-model="operateform.ProjectId" filterable remote clearable placeholder="根据公司搜索选择项目" :remote-method="ProjectMethod" @change="changeproject" @clear="ProjectMethod('')">
                <el-option v-for="item in Projectlist" :key="item.Id" :label="item.Name" :value="item.Id">
                </el-option>
                <div v-if="Projectlist.length > 99" class="search-keyword">
                  <span>只显示前100条结果，请完善搜索关键字</span>
                </div>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="选择批次" prop="SalaryBatchId">
              <el-select v-model="operateform.SalaryBatchId" placeholder="请选择批次">
                <el-option v-for="item in SalaryBatchList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="选择工资打款账号">
              <el-select v-model="operateform.name" placeholder="选择工资打款账号">
                <el-option v-for="item in SalaryBatchList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="所属年月" prop="date">
              <el-date-picker v-model="operateform.date" type="month" @change="changedate" placeholder="选择入账年月"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="入账年月" prop="mounth">
              <el-date-picker v-model="operateform.mounth" type="month" @change="changemounth" placeholder="选择所属年月"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="结余款项(元)" prop="BalanceAmount">
              <el-input v-model="operateform.BalanceAmount" clearable placeholder="请输入结余款项"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="选择对应发票" prop="InvoiceList">
              <el-select v-model="operateform.InvoiceList" placeholder="选择对应发票" filterable multiple remote @change="SelectInvoice($event)">
                <el-option v-for="(item,index) in paymentList" :key="index" :label="item.BfCompanyName+' - '+item.Amount+'元'" :value="item.Id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="开票金额(元)" prop="InvoiceAmount">
              <el-input v-model="operateform.InvoiceAmount" type="Number" disabled clearable placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="挂账余额" prop="Amount">
              <el-input v-model="operateform.Amount" clearable disabled placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="card-box">
          <!-- <el-row :gutter="64">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="挂账所属年月" prop="date">
                <el-date-picker v-model="item.date" type="month" @change="changemounth" placeholder="选择挂账所属年月"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="支出金额" prop="money">
                <el-input v-model="item.money" clearable placeholder="请输入支出金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="支出科目" prop="subjects">
                <el-input v-model="item.subjects" clearable placeholder="请输入支出科目"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="16">
              <el-form-item label="费用说明" prop="note">
                <el-input :rows="5" v-model="operateform.note" type="textarea" maxlength="500" show-word-limit />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="border-bottom: 1px solid #E5E5E5;margin-bottom: 20px;">
            <el-col :span="16">
              <el-form-item label="支出明细附件">
                <div class="upload">
                  <div :title="fileName" v-if="fileName" class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()" v-loading="uploadLoading">
                    <span class="filestype">{{filestype}}</span>
                    <p>{{fileName}}</p>
                    <div v-show="optionShow" class="option-button">
                      <a>
                        <svg-icon icon-class="replace" class-name="svg-a" />替换
                        <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx,.zip,.rar" name="file" class="smaellFile replaceFile" @change="uploadFile($event)">
                      </a>
                      <a @click="delFiles()">
                        <svg-icon icon-class="del" class-name="svg-a" />删除
                      </a>
                    </div>
                  </div>
                  <div class="files" v-else v-loading="uploadLoading">
                    <img src="../../../assets/upload.png">
                    <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx,.zip,.rar" name="file" class="smaellFile" @change="uploadFile($event)">
                  </div>
                  <div class="prompt">
                    上传附件文件大小不超过100M,上传格式PNG.JPG.Word.PDF.XLSX.XLS.ZIP.RAR
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <div class="addcard">
            <el-button size="small" class="erpdelete" @click="DelcardList" v-if="index != (operateform.cardList.length - 1)">删除挂账支出</el-button>
            <el-button size="small" class="erpbtn" @click="AddcardList" v-if="index == (operateform.cardList.length - 1)">添加挂账支出</el-button>
          </div> -->
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否需要代垫" prop="IsSubstitute">
              <el-radio-group v-model="operateform.IsSubstitute">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="SubstituteTitle" v-if="operateform.IsSubstitute == 1"><i class="el-icon-info"></i><span>资金代垫管理规定:资金代垫超过25天的,资金占用费=代垫资金总额*0.02%（经审批同意)*超期天数计算</span></div>
        <el-row :gutter="64" v-if="operateform.IsSubstitute == 1">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="本次代垫金额" prop="SubstituteDetailAmount">
              <el-input v-model="operateform.SubstituteDetailAmount" clearable placeholder="请输入本次代垫金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="预计回款时间" prop="ReciveDateTime">
              <el-date-picker v-model="operateform.ReciveDateTime" value-format="yyyy-MM-dd" type="date" placeholder="选择预计回款时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="历史代垫未回款" prop="NotAmount">
              <el-input v-model="operateform.NotAmount" clearable disabled placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="ISThereTitle" v-if="ISThere"><i class="el-icon-warning"></i><span>当前项目的工资付款申请单还有代垫申请中<a @click="OpenSubstitute">查看代垫申请</a></span></div>
        <el-row v-if="operateform.IsSubstitute == 1">
          <el-col :span="16">
            <el-form-item label="代垫协议">
              <div class="upload">
                <div :title="AgreementfileName" v-if="AgreementfileName" class="files" @mouseenter="fileAgreementShow()" @mouseleave="fileAgreementnoShow()" v-loading="AgreementuploadLoading">
                  <span class="filestype">{{Agreementfiletype}}</span>
                  <p>{{AgreementfileName}}</p>
                  <div v-show="AgreementoptionShow" class="option-button">
                    <a>
                      <svg-icon icon-class="replace" class-name="svg-a" />替换
                      <input type="file" accept=".png,.jpg,.jpeg" name="file" class="smaellFile replaceFile" @change="uploadAgreementFile($event)">
                    </a>
                    <a @click="delAgreementFiles(index)">
                      <svg-icon icon-class="del" class-name="svg-a" />删除
                    </a>
                  </div>
                </div>
                <div class="files" v-else v-loading="AgreementuploadLoading">
                  <img src="../../../assets/upload.png">
                  <input type="file" accept=".png,.jpg,.jpeg" name="file" class="smaellFile" @change="uploadAgreementFile($event)">
                </div>
                <div class="prompt">
                  上传代垫协议附件，上传格式为PNG、JPG
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="border-bottom: 1px solid #E5E5E5;margin-bottom: 20px;">
          <el-col :span="16">
            <el-form-item label="备注" prop="AgreementRemark">
              <el-input :rows="5" v-model="operateform.AgreementRemark" type="textarea" maxlength="500" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="64">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="参与结算的员工">
              <el-table ref="finalTable" v-loading="staffloading" :data="choosestafflist" class="erp-table" tooltip-effect="dark" @cell-mouse-leave="mouseleave" show-summary :summary-method="getSummaries" @cell-mouse-enter="mouseenter">
                <el-table-column align="center" prop="Name" label="姓名" />
                <el-table-column align="center" prop="IdCode" label="身份证" />
                <el-table-column align="center" prop="Amount" label="实发工资">
                  <template slot-scope="scope">
                    <span v-show="!scope.row.isupdate">￥{{scope.row.Amount}}</span>
                    <el-input v-show="scope.row.isupdate" size="small" v-model="scope.row.Amount"></el-input>
                  </template>
                </el-table-column>
                <!-- <el-table-column align="center" width="60px">
                  <template slot-scope="scope">
                    <span v-show="scope.row.checked" @click="scope.row.isupdate=!scope.row.isupdate">
                      <svg-icon icon-class="update" class="cursor-pointer" :class="{'active': scope.row.isupdate}" />
                    </span>
                  </template>
                </el-table-column> -->
              </el-table>
              <div class="choosepeople">
                <div>已选择<span>{{choosestafflist.length}}</span>人</div>
                <el-button size="small" class="erpbtn" @click="updatepeople">修改参与结算的员工</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="footer">
        <el-button class="erpdelete" size="middle" @click="closedialog">取消</el-button>
        <el-button class="erpbtn" size="middle" @click="save">生成结算单</el-button>
      </div>
    </div>
    <div class="dialog">
      <settlement :title="settitle" :visible="setvisible" :contentdata="stafflist" @closeset="closeset" @saveset="saveset"></settlement>
    </div>
  </div>
</template>

<script>
import settlement from "./dialog-settlement.vue";
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import { GetInvoiceApplyPageAllList } from "@/api/FinancialManagement.js";
import { GetCompanyPageList } from "@/api/CustomerManagement.js";
import { GetProjectList } from "@/api/projectManagement.js";
import {
  MenuIdDate,
  showLoading,
  hideLoading,
  uuid,
  copy
} from "@/utils/CustomValidation";
import SupperUploader from "@/utils/SupperUploader";
import axios from "axios";
import {
  AddSalarySettle,
  SalarySettleMember,
  GetSalaryBatch,
  GetSubstituteCushionResidualByProjectId,
  GetChargeAvailableAmount
} from "@/api/CompensationServiceManagement.js";
import qs from "qs";
export default {
  components: {
    BreadCrumb,
    settlement
  },
  data() {
    return {
      urlList: [
        {
          name: "薪酬管理",
          router: "/CompensationServiceManagement/CompensationManagement"
        },
        {
          name: "发起结算",
          router: ""
        }
      ],
      operateform: {
        Remark: "",
        SalaryYear: "",
        SalaryMonth: "",
        Title: "",
        CompanyId: "",
        ProjectId: "",
        ProjectName: "",
        SettleInfo: "",
        PeriodYear: "",
        PeriodMonth: "",
        mounth: new Date(),
        date: "",
        MoneyRecordIds: "",
        name: [],
        IsSubstitute: 0,
        SubstituteDetailAmount: "",
        ReciveDateTime: "",
        AgreementRemark: "",
        Amount: "",
        note: "",
        InvoiceList: [],
        InvoiceInfo: [],
        cardList: [
          {
            cardName: "",
            date: "",
            Amount: "",
            subjects: "",
            note: "",
            optionShow: false,
            fileName: "",
            filestype: "",
            Attachment: ""
          }
        ]
      },
      Id: "",
      username: "", // 员工名字
      rules: {
        Title: [
          { required: true, message: "请输入结算单名称", trigger: "blur" }
        ],
        CompanyId: [
          { required: true, message: "请选择用工单位", trigger: "change" }
        ],
        ProjectId: [
          { required: true, message: "请选择项目", trigger: "change" }
        ],
        SubstituteDetailAmount: [
          { required: true, message: "请输入本次代垫金额", trigger: "blur" }
        ],
        ReciveDateTime: [
          {
            type: "date",
            required: true,
            message: "请选择预计回款时间",
            trigger: "change"
          }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        mounth: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
        // name: [
        //   { required: true, message: '请选择对应回款', trigger: 'change' }
        // ]
      },
      Companylist: [], // 用工单位列表
      Projectlist: [], // 项目列表
      stafflist: [], // 员工列表
      choosestafflist: [], // 选中员工列表
      SalaryBatchList: [], // 审核批次列表
      paymentList: [], // 项目对应发票
      checked: "", //
      staffloading: false, // 人员加载动画
      ischecked: false, // 全选
      chooseischecked: false, // 选中全选
      BusinessType: "", // 项目类型
      projectname: "", // 用工单位名称
      settitle: "修改参与结算的员工",
      setvisible: false,
      optionShow: false,
      fileName: "", //支出明细附件名称
      filestype: "", //支出明细附件类型
      Attachment: "", //支出明细附件URL
      loading: false,
      uploadLoading: false,
      AgreementfileName: "", //代垫协议名字
      AgreementfileUrl: "", //代垫协议URL
      Agreementfiletype: "", //代垫协议文件类型
      AgreementoptionShow: false,
      AgreementuploadLoading: false,
      NotAmount: 0,
      ISThere: true
    };
  },
  watch: {
    // 用工单位
    "operateform.ProjectId"(newvalue, oldvalue) {
      const data = this.Projectlist.find(v => {
        return v.Id === newvalue;
      });
      this.projectname = data ? data.Name : "";
      let salaryyear = this.operateform.SalaryYear
        ? this.operateform.SalaryYear + "年"
        : "";
      let salarymonth = this.operateform.SalaryMonth
        ? this.operateform.SalaryMonth + "月"
        : "";
      this.operateform.Title =
        this.projectname + salaryyear + salarymonth + "薪酬结算单";
    }
    // "stafflist": {
    //   handler(newVal) {
    //     console.log(newVal);
    //     this.choosestafflist = []
    //     for (let i = 0; i < newVal.length; i++) {
    //       if (newVal[i].checked) {
    //         this.choosestafflist.push({
    //           Name: newVal[i].Name,
    //           SalaryId: newVal[i].SalaryId,
    //           Amount: newVal[i].Amount,
    //           ischecked: false,
    //           isupdate: true,
    //         })
    //       }
    //     }
    //   },
    //   immediate: true,
    //   deep: true // 表示开启深度监听
    // }
  },
  created() {
    // 判断有没有id
    if (this.$route.query.id) {
      this.Id = this.$route.query.id;
      this.getSalaryBatch();
    } else {
      this.CompanyMethod("");
    }
    this.BusinessType = this.$route.query.BusinessType;
  },
  methods: {
    uploadFile(e) {
      console.log(e);
      var uploader;
      const files = e.target.files[0];
      var ext = files.name.slice(files.name.lastIndexOf(".") + 1).toLowerCase();
      if (
        ext == "doc" ||
        ext == "docx" ||
        ext == "pdf" ||
        ext == "png" ||
        ext == "jpg" ||
        ext == "jpeg" ||
        ext == "xls" ||
        ext == "xlsx" ||
        ext == "zip" ||
        ext == "rar"
      ) {
      } else {
        this.$message({
          message: "不支持该格式文件上传",
          type: "warning"
        });
        e.target.value = [];
        return false;
      }
      if (files.size > 100 * 1024 * 1024) {
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
          ext == "xlsx" ||
          ext == "zip" ||
          ext == "rar"
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
              this.Attachment = uploader.urlResult.VideoUrl;
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
              this.Attachment = res.data.ImageUrl;
              this.fileName = files.name;
              this.filestype = ext.toUpperCase();
              e.target.value = [];
            }
          });
        }
      }
    },
    //添加挂账列表
    AddcardList() {
      this.operateform.cardList.push({
        cardName: "",
        date: "",
        money: "",
        subjects: "",
        note: "",
        optionShow: false,
        fileName: "",
        filestype: "",
        Attachment: ""
      });
    },
    //删除挂账列表
    DelcardList(index) {
      this.operateform.cardList.splice(index, 1);
    },
    // 移入文件显示操作
    fileShow() {
      this.optionShow = true;
    },
    // 移出文件隐藏操作
    filenoShow() {
      this.optionShow = false;
    },
    //选择对应发票
    SelectInvoice(e) {
      this.operateform.InvoiceAmount = 0;
      this.operateform.InvoiceInfo = [];
      for (let i = 0; i < this.operateform.InvoiceList.length; i++) {
        for (let j = 0; j < this.paymentList.length; j++) {
          if (this.operateform.InvoiceList[i] == this.paymentList[j].Id) {
            this.operateform.InvoiceAmount += Number(
              this.paymentList[j].Amount
            );
            this.operateform.InvoiceInfo.push({
              InvoiceApplyId: this.paymentList[j].Id,
              Amount: this.paymentList[j].Amount
            });
          }
        }
      }
      console.log(this.operateform.InvoiceInfo);
    },
    //删除文件
    delFiles() {
      this.Attachment = "";
      this.fileName = "";
      this.filestype = "";
    },
    // 处理合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
        } else if (index === 2) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if (sums[index] > 0) {
              sums[index] = "￥" + sums[index].toFixed(2);
            }
          } else {
            sums[index] = "N/A";
          }
        } else if (index === 1) {
          sums[index] = data.length;
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    // 获取批次详情
    getSalaryBatch() {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      showLoading();
      GetSalaryBatch(qs.stringify(obj)).then(response => {
        hideLoading();
        if (response.IsSuccess) {
          if (response.Data.CompanyId) {
            this.Companylist = [
              {
                Name: response.Data.CompanyName,
                Id: response.Data.CompanyId
              }
            ];
          }
          if (response.Data.ProjectId) {
            this.Projectlist = [
              {
                Name: response.Data.ProjectName,
                Id: response.Data.ProjectId
              }
            ];
            this.GetSubstituteCushionResidualBy(response.Data.ProjectId);
            this.GetAvailableAmount(response.Data.ProjectId);
          }
          // 自动填充结算单名称
          this.operateform.CompanyId = response.Data.CompanyId;
          this.operateform.ProjectId = response.Data.ProjectId;
          this.operateform.ProjectName = response.Data.ProjectName;
          this.getInvoiceApplyPageList(this.operateform.ProjectName);
          this.operateform.date = new Date(
            response.Data.SalaryYear,
            response.Data.SalaryMonth - 1,
            1
          );
          this.operateform.SalaryYear = response.Data.SalaryYear;
          this.operateform.SalaryMonth = response.Data.SalaryMonth;
          this.operateform.PeriodYear = this.operateform.mounth.getFullYear();
          this.operateform.PeriodMonth = this.operateform.mounth.getMonth() + 1;
          this.$refs.operateform.clearValidate();
          this.salarySettleMember();
          // this.getMoneyRecordRecordList()
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 获取开票信息列表
    getInvoiceApplyPageList(value) {
      let obj = {
        InvoiceTitle: "",
        ProjectName: value,
        TaxNo: "",
        ApplyUserName: "",
        OperatorName: "",
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetInvoiceApplyPageAllList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.paymentList = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //获取当前项目挂账余额
    GetAvailableAmount(ProjectId) {
      let obj = {
        ProjectId: ProjectId,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetChargeAvailableAmount(qs.stringify(obj)).then(response => {
        console.log(response);
        if (response.IsSuccess) {
          this.operateform.Amount = response.Data.AvailableAmount;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //获取当前项目是否存在未代垫余额
    GetSubstituteCushionResidualBy(ProjectId) {
      let obj = {
        ProjectId: ProjectId,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetSubstituteCushionResidualByProjectId(qs.stringify(obj)).then(
        response => {
          console.log(response);
          if (response.IsSuccess) {
            this.operateform.NotAmount = response.Data.Residual;
            if (response.Data && response.Data.Residual > 0) {
              this.ISThere = true;
            } else {
              this.ISThere = false;
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        }
      );
    },
    closedialog() {
      this.$router.go(-1);
    },
    // 获取回款列表
    // getMoneyRecordRecordList(value) {
    //   let obj = {
    //     PageIndex: 1,
    //     PageSize: 99,
    //     CompanyName: value,
    //     HFId: '',
    //     ProjectId: this.operateform.ProjectId,
    //     PeriodYear: this.operateform.PeriodYear,
    //     PeriodMonth: this.operateform.PeriodMonth,
    //     menuid: MenuIdDate(),
    //     operationcode: 1,
    //   }
    //   GetMoneyRecordRecordList(qs.stringify(obj)).then((response) => {
    //     if (response.IsSuccess) {
    //       this.paymentList = response.Data
    //     } else {
    //       this.$message({
    //         message: response.MessageContent,
    //         type: 'error',
    //       })
    //       return
    //     }
    //   })
    // },
    save() {
      this.$refs.operateform.validate(v => {
        if (v) {
          // 处理工资所属年份
          if (this.operateform.date) {
            this.operateform.SalaryYear = this.operateform.date.getFullYear();
            this.operateform.SalaryMonth = this.operateform.date.getMonth() + 1;
          }
          // 处理入账年月
          if (this.operateform.mounth) {
            this.operateform.PeriodYear = this.operateform.mounth.getFullYear();
            this.operateform.PeriodMonth =
              this.operateform.mounth.getMonth() + 1;
          }
          // 处理流水编号
          //   if (this.operateform.name && this.operateform.name.length) {
          //     this.operateform.MoneyRecordIds = this.operateform.name.join(',')
          //   }
          // 处理员工数据
          let arry = [];
          arry = this.choosestafflist.map(v => {
            let obj = {
              SalaryId: v.SalaryId,
              Amount: v.Amount
            };
            return obj;
          });
          if (arry.length) {
          } else {
            this.$message({
              message: "请选择参与结算的员工",
              type: "warning"
            });
            return;
          }
          let operating =
            JSON.parse(window.localStorage.getItem("operating")) || {};
          let obj = {
            SalaryBatchId: this.Id,
            Title: this.operateform.Title,
            CompanyId: this.operateform.CompanyId,
            ProjectId: this.operateform.ProjectId,
            SalaryYear: this.operateform.SalaryYear,
            SalaryMonth: this.operateform.SalaryMonth,
            Remark: this.operateform.AgreementRemark,
            IsSubstitute: this.operateform.IsSubstitute,
            PeriodYear: this.operateform.PeriodYear,
            PeriodMonth: this.operateform.PeriodMonth,
            BusinessType: this.BusinessType,
            InvoiceAmount: this.operateform.InvoiceAmount,
            BalanceAmount: this.operateform.BalanceAmount,
            OnCreditInfo: {
              Attachment: this.Attachment,
              Remark: this.operateform.note
            },
            InvoiceInfo: this.operateform.InvoiceInfo,
            menuid: operating.MenuId || MenuIdDate(),
            operationcode: operating.OperationCode || 1,
            SettleInfo: arry
          };
          if (this.operateform.IsSubstitute == 1) {
            obj.SubstituteInfo = {
              Amount: this.operateform.SubstituteDetailAmount,
              ReciveDateTime: this.operateform.ReciveDateTime,
              Agreement: this.AgreementfileUrl
            };
          }
          console.log(JSON.stringify(obj));
          // let config = {
          //   headers:{}
          // }
          // for (const key in obj) {
          //   if (obj.hasOwnProperty(key)) {
          //     if (key === 'menuid') {
          //       config.headers['menuid'] = obj[key]
          //     }
          //     if (key === 'operationcode') {
          //       config.headers['operationcode'] = obj[key]
          //     }
          //   }
          // }
          // console.log(config.headers);
          // return
          showLoading();
          AddSalarySettle(qs.stringify(obj)).then(response => {
            hideLoading();
            if (response.IsSuccess && response.MessageCode == 0) {
              this.$message({
                message: "添加结算成功",
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
        } else {
        }
      });
    },
    // 搜索查询用工单位
    CompanyMethod(value) {
      let obj = {
        Name: value,
        SysUserName: "",
        ContactName: "",
        StartDate: "",
        EndDate: "",
        Type: -1,
        PageIndex: 1,
        PageSize: 100,
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetCompanyPageList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.Companylist = response.Data;
          } else {
            this.Companylist = [];
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 选择用工单位查询项目
    changecompany(e) {
      this.ProjectMethod("");
    },
    // // 临时保存数据
    // inputchange(e) {
    //   let obj = this.stafflist.find(v => {
    //     return v.SalaryId == e.SalaryId
    //   })
    //   if (obj) {
    //     obj.Amount = e.Amount
    //   }
    // },
    // 搜索项目列表
    ProjectMethod(value) {
      if (this.operateform.CompanyId) {
        let obj = {
          Name: value,
          SysUserName: "",
          Status: -1,
          BusinessType: -1,
          Priority: -1,
          CompanyId: this.operateform.CompanyId,
          PageIndex: 1,
          PageSize: 100,
          menuid: MenuIdDate(),
          operationcode: 1
        };
        GetProjectList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data) {
              this.Projectlist = response.Data;
            } else {
              this.Projectlist = [];
            }
            this.operateform.ProjectId = "";
            this.operateform.staffId = "";
            this.ischecked = false;
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.operateform.ProjectId = "";
        this.operateform.staffId = "";
        this.Projectlist = [];
        this.stafflist = [];
        this.ischecked = false;
      }
    },
    // 选择时间进行数据处理
    changedate(e) {
      if (this.operateform.ProjectId) {
        if (this.operateform.date) {
          this.operateform.SalaryYear = this.operateform.date.getFullYear();
          this.operateform.SalaryMonth = this.operateform.date.getMonth() + 1;
          this.salarySettleMember();
        } else {
          this.operateform.SalaryYear = "";
          this.operateform.SalaryMonth = "";
          this.stafflist = [];
          this.ischecked = false;
        }
      } else {
        this.operateform.SalaryYear = this.operateform.date.getFullYear();
        this.operateform.SalaryMonth = this.operateform.date.getMonth() + 1;
        this.$message({
          message: "请先选择项目",
          type: "warning"
        });
      }
      let salaryyear = this.operateform.SalaryYear
        ? this.operateform.SalaryYear + "年"
        : "";
      let salarymonth = this.operateform.SalaryMonth
        ? this.operateform.SalaryMonth + "月"
        : "";
      this.operateform.Title =
        this.projectname + salaryyear + salarymonth + "薪酬结算单";
    },
    // 选择时间进行数据处理
    changemounth(e) {
      console.log(e);
      if (this.operateform.ProjectId && e) {
        this.operateform.PeriodYear = this.operateform.mounth.getFullYear();
        this.operateform.PeriodMonth = this.operateform.mounth.getMonth() + 1;
        // this.getMoneyRecordRecordList()
      } else {
        this.paymentList = [];
      }
    },
    // 选择项目查询员工
    changeproject(e) {
      if (e) {
        let data = this.Projectlist.find(v => {
          return v.Id === e;
        });
        if (data) {
          this.BusinessType = data.BusinessType;
          this.getInvoiceApplyPageList(data.ProjectName);
        }
      }
      this.GetSubstituteCushionResidualBy(e);
      this.GetAvailableAmount(e);

      if (e && this.operateform.SalaryYear && this.operateform.SalaryMonth) {
        this.salarySettleMember();
      } else {
        this.stafflist = [];
      }
      if (e && this.operateform.mounth) {
        this.operateform.PeriodYear = this.operateform.mounth.getFullYear();
        this.operateform.PeriodMonth = this.operateform.mounth.getMonth() + 1;
      } else {
        this.paymentList = [];
      }
    },
    salarySettleMember() {
      let obj = {
        ProjectId: this.operateform.ProjectId,
        Year: this.operateform.SalaryYear,
        Month: this.operateform.SalaryMonth,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      this.staffloading = true;
      SalarySettleMember(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            for (let i = 0; i < response.Data.length; i++) {
              response.Data[i].checked = false; // 操作是否选中
              response.Data[i].isupdate = false; // 是否可以修改金额
              response.Data[i].isshow = false; // 是否展示
            }
            this.stafflist = response.Data;
            this.choosestafflist = response.Data;
          } else {
            this.stafflist = [];
            this.choosestafflist = [];
          }
          this.ischecked = false;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
        this.staffloading = false;
      });
    },
    // 全选
    selectall(e) {
      if (this.stafflist.length) {
        for (let i = 0; i < this.stafflist.length; i++) {
          this.stafflist[i].checked = e;
        }
      }
    },
    // 单选
    // choosecheck(e) {
    //   let isall = this.stafflist.every(v => {
    //     return v.checked == true
    //   })
    //   this.ischecked = isall
    // },
    // 选中单选
    // chooseischeck(e) {
    //   let isall = this.choosestafflist.every(v => {
    //     return v.ischecked == true
    //   })
    //   this.chooseischecked = isall
    // },
    // 选中多选
    // chooseselectall(e) {
    //   if (this.choosestafflist.length) {
    //     for (let i = 0; i < this.choosestafflist.length; i++) {
    //       this.choosestafflist[i].ischecked = e
    //     }
    //   }
    // },
    // 选中单个删除
    // deletepeople(e) {
    //   let obj = this.stafflist.find(v => {
    //     return v.SalaryId == e.SalaryId
    //   })
    //   if (obj) {
    //     obj.checked = false
    //   }
    // },
    // 选中多个删除
    // deletepeoples() {
    //   let arry = []
    //   for (let i = 0; i < this.choosestafflist.length; i++) {
    //     if (this.choosestafflist[i].ischecked) {
    //       arry.push(this.choosestafflist[i])
    //       let obj = this.stafflist.find(v => {
    //         return v.SalaryId == this.choosestafflist[i].SalaryId
    //       })
    //       if (obj) {
    //         obj.checked = false
    //       }
    //     }
    //   }
    //   if (arry.length) {

    //   } else {
    //     this.$message({
    //       message: '请选择人',
    //       type: 'warning'
    //     })
    //   }
    // },
    // 单元格移入
    mouseenter(row, column, cell, event) {
      row.checked = true;
    },
    mouseleave(row, column, cell, event) {
      row.checked = false;
    },
    // 修改参与结算的员工
    updatepeople() {
      // 处理数据
      for (let i = 0; i < this.stafflist.length; i++) {
        for (let j = 0; j < this.choosestafflist.length; j++) {
          if (this.stafflist[i].SalaryId === this.choosestafflist[j].SalaryId) {
            this.stafflist[i].isshow = true;
          }
        }
      }
      console.log(this.stafflist);
      this.setvisible = true;
    },
    // 关闭结算人员弹框
    closeset() {
      this.setvisible = false;
    },
    // 保存人员结算弹框的人
    saveset(e) {
      // 处理数据
      this.choosestafflist = e.filter(v => {
        return v.isshow;
      });
      this.setvisible = false;
    },
    // 移入文件显示操作
    fileAgreementShow(index) {
      this.AgreementoptionShow = true;
    },
    // 移出文件隐藏操作
    fileAgreementnoShow(index) {
      this.AgreementoptionShow = false;
    },
    //删除文件
    delAgreementFiles(index) {
      this.AgreementfileName = "";
      this.Agreementfiletype = "";
    },
    //上传代垫协议
    uploadAgreementFile(e) {
      console.log(e);
      const files = e.target.files[0];
      var ext = files.name.slice(files.name.lastIndexOf(".") + 1).toLowerCase();
      if (ext == "png" || ext == "jpg" || ext == "jpeg") {
      } else {
        this.$message({
          message: "不支持该格式文件上传",
          type: "warning"
        });
        e.target.value = [];
        return false;
      }
      if (files.size > 5 * 1024 * 1024) {
        this.$message({
          message: "文件大小超过最大限制",
          type: "warning"
        });
        e.target.value = [];
        return false;
      } else {
        this.uploadLoading = true;
        let datas = new FormData();
        datas.append("file", files);
        datas.append("message", "{ImageStreamName:'file',BussinessType:0}");
        axios.post(process.env.VUE_APP_BASE_API_UPLOAD, datas).then(res => {
          if (res.data.State) {
            this.uploadLoading = false;
            this.AgreementfileUrl = res.data.ImageUrl;
            this.AgreementfileName = files.name;
            this.Agreementfiletype = ext.toUpperCase();
            e.target.value = [];
          }
        });
      }
    },
    //查看代垫申请
    OpenSubstitute() {
      const { href } = this.$router.resolve({
        path: "/CompensationServiceManagement/ActingMatManagement",
        query: {
          ProjectName: this.operateform.ProjectName,
          Type: 1
        }
      });
      window.open(href, "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
.calculation-container /deep/ {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .calculation-content {
    background: #fff;
    overflow: hidden;
    border-radius: 8px 0 0 8px;
    margin-left: 24px;
    padding: 40px;
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
    .prompt {
      float: left;
      width: 300px;
      font-size: 14px;
      color: #999999;
      margin-top: 20px;
      margin-left: 17px;
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
        width: 100%;
        .el-input__inner {
          background-color: $erinputbgc;
        }
        .el-select {
          width: 100%;
        }
        .el-date-editor {
          width: 100%;
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
    .footer {
      text-align: center;
      .el-button + .el-button {
        margin-left: 24px;
      }
    }
    .cell {
      svg {
        color: $erpplaceholder;
        &.active {
          color: $erpred;
        }
      }
    }
    // .employ-box {
    //   display: flex;
    //   .left-box {
    //     flex: 1;
    //     background-color: $erinputbgc;
    //     padding: 16px 24px;
    //     margin-right: 24px;
    //     .el-input__inner {
    //       background-color: #fff;
    //       border-radius: 8px;
    //       border-color: transparent;
    //     }
    //     .erpscroll {
    //       height: 260px;
    //       overflow: auto;
    //       .erpcheck {
    //         display: block;
    //         .el-checkbox__label {
    //           font-size: $f14;
    //           color: $erp666;
    //           vertical-align: baseline;
    //         }
    //       }
    //       .nodata {
    //         display: block;
    //         text-align: center;
    //         color: $erp666;
    //         font-size: $f14;
    //       }
    //     }
    //   }
    //   .right-box {
    //     flex: 1;
    //     background-color: $erinputbgc;
    //     padding: 24px;
    //     overflow: auto;
    //     .title {
    //       font-size: $f14;
    //       color: $erp333;
    //       line-height: 14px;
    //     }
    //     .erpscroll {
    //       height: 274px;
    //       overflow: auto;
    //       margin-top: 10px;
    //       .choosepeople {
    //         display: flex;
    //         justify-content: space-between;
    //         padding-right: 10px;
    //         .erpcheck {
    //           width: 50%;
    //           .el-checkbox__label {
    //             width: 100%;
    //             overflow: hidden;
    //             font-size: $f14;
    //             vertical-align: sub;
    //             color: $erp666;
    //           }
    //         }
    //         .el-input {
    //           width: 100px;
    //         }
    //         .operate {
    //           > svg {
    //             margin-left: 6px;
    //           }
    //         }
    //       }
    //     }
    //     .operate-bottom {
    //       display: flex;
    //       justify-content: space-between;
    //       align-items: center;
    //     }
    //     .del {
    //       fill: $erpred;
    //       font-size: $f16;
    //     }
    //   }
    // }
  }
  .calculation-title {
    font-size: $f16;
    color: $erp333;
    line-height: 16px;
    position: relative;
    padding-left: 12px;
    margin-bottom: 10px;
    display: flex;
    // justify-content: space-between;
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
  .SubstituteTitle {
    font-size: 14px;
    color: #e7a23c;
    margin-bottom: 10px;
    i {
      margin-right: 5px;
    }
  }
  .ISThereTitle {
    font-size: 14px;
    color: #f56c6c;
    margin-bottom: 10px;
    i {
      color: #f56c6c;
      margin-right: 5px;
    }
    a {
      color: #1588f8;
      margin-left: 50px;
    }
  }
  .addcard {
    text-align: right;
    margin-bottom: 20px;
  }
}
</style>