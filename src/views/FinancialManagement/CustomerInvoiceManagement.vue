<!-- 发票管理 -->
<template>
  <div class="operate-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">开具类型</div>
        <el-select v-model="OpenTypes" @change="GetOpenTypes(OpenTypes)" clearable size="small" class="erpsearchinput">
          <el-option v-for="item in FinanceInvoiceType" :key="item.value" :label="item.describe" :value="item.value"></el-option>
        </el-select>
      </div>

      <div class="condition">
        <div class="search-name">发票类型</div>
        <el-select v-model="InvoiceTypes" @change="GetInvoiceTypes(InvoiceTypes)" clearable size="small" class="erpsearchinput">
          <el-option v-for="item in InvoiceApplyEnumInvoiceType" :key="item.value" :label="item.describe" :value="item.value"></el-option>
        </el-select>
      </div>

      <div class="condition">
        <div class="search-name">查询</div>
        <el-input class="erpsearchinput" placeholder="请输入发票抬头/开户行账号/税务登记证号码进行查询" clearable size="small" v-model="ApplyUserName"></el-input>
      </div>

      <div class="condition">
        <el-button class="search-button" size="mini" round @click.native="querySelect(ApplyUserName)">查询</el-button>
      </div>
    </div>
    <!-- <el-form ref="form" class="filter-container">
          <el-form-item label="开具类型" label-width="85px">
            
          </el-form-item>
          <el-form-item label="发票类型" label-width="85px">
         
          </el-form-item>
          <div class="condition">
            <div class="search-name">日期范围</div>
            <el-date-picker @change="TimeChange(Datas)" value-format="yyyy-MM-dd HH:mm:ss" size="small" v-model="Datas" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <el-form-item label="查询" label-width="85px">
            <el-input class="erpsearchinput" placeholder="请输入发票抬头/开户行账号/税务登记证号码进行查询" clearable size="small" v-model="ApplyUserName"></el-input>
          </el-form-item>
        </el-form> -->
    <div class="content">
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" v-if="$operatebtn(operates, 'Add')" @click="markinvoices('Add')">新增客户发票信息</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="Id" min-width="55" label="序号" />
          <el-table-column align="center" prop="FinanceInvoiceTypeText" label="开具类型" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="InvoiceTypeText" label="发票类型" min-width="120" />
          <el-table-column align="center" prop="TaxNo" label="税务登记证号码" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="AccountNo" label="基本开户行账号" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="BankName" label="基本开户行名称" min-width="150" />
          <el-table-column align="center" prop="RegAddress" label="注册场所所在地址" min-width="150" />
          <el-table-column align="center" prop="CompanyTel" label="注册固定电话" min-width="120" />
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="watchinvoice(scope.row, 'View')">查看</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="markinvoice(scope.row, 'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="deleteData(scope.row, 'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="tag-container">
      <el-dialog :close-on-click-modal="false" :title="AddBankTitle" class="dialog-box" append-to-body :visible.sync="showCollection" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
        <i class="el-icon-circle-close closeButton" @click="close"></i>
        <el-form ref="ruleForm" :rules="rules" :model="ruleForm" class="forms-box">
          <el-form-item label="客户单位" prop="BfCompanyId">
            <el-select style="display:block" v-model="ruleForm.BfCompanyId" size="mini" @clear="clearCompany" :remote-method="remoteCompany" clearable filterable remote class="select-input" placeholder="请查询或下拉选择公司名称" :loading="loading">
              <el-option v-for="item in BfCompanyList" :key="item.Id" :label="item.Name" :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发票抬头" prop="invoiceTitle">
            <el-input v-model="ruleForm.invoiceTitle" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item label="开具类型">
            <el-select popper-append-to-body filterable v-model="OpenType" size="mini" clearable style="display:block" class="select-input" remote>
              <el-option v-for="item in FinanceInvoiceType" :key="item.value" :label="item.describe" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发票类型">
            <el-select popper-append-to-body filterable v-model="InvoiceType" size="mini" clearable style="display:block" class="select-input" remote>
              <el-option v-for="item in InvoiceApplyEnumInvoiceType" :key="item.value" :label="item.describe" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="税务登记号码" prop="taxRegistrationTel">
            <el-input v-model="ruleForm.taxRegistrationTel" minlength="0" maxlength="200" clearable size="mini" placeholder="请输入开户支行" />
          </el-form-item>
          <el-form-item label="基本开户行账号" prop="BankId">
            <el-input v-model="ruleForm.BankId" minlength="1" maxlength="50" clearable size="mini" placeholder="请输入银行卡号" />
          </el-form-item>
          <el-form-item label="客户单位性质" prop="Invoice">
            <el-select popper-append-to-body filterable remote style="display:block" size="mini" class="select-input" clearable v-model="ruleForm.Invoice">
              <el-option v-for="item in InvoiceApplyEnumTaxType" :key="item.value" :label="item.describe" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基本开户行名称" prop="Remark">
            <el-input v-model="accountName" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item label="注册场所所在地" prop="Remark">
            <el-input v-model="registeredAddress" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item label="注册固定电话" prop="Remark">
            <el-input v-model="RegisteredTel" size="mini" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer-multiple">
          <el-button round class="erpbtn" size="small" @click="dialogtrue()" v-if="$operatebtn(operates, 'Add')">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { GetCompanyPageList } from "@/api/CustomerManagement.js";
import {
  GetFinanceInvoiceTitlePageList,
  AddFinanceInvoiceTitle,
  DeleteFinanceInvoiceTitle,
  EditFinanceInvoiceTitle,
  GetFinanceInvoiceTitleInfo,
  GetInvoiceApplyAllEnum
} from "@/api/FinancialManagement.js";
import {
  copy,
  MenuIdDate,
  showLoading,
  hideLoading
} from "@/utils/CustomValidation.js";
import filters from "@/utils/filters.js";
import qs from "qs";
export default {
  data() {
    return {
      AddBankTitle: "添加客户发票信息",
      loading: false,
      uploadLoading: false,
      BfCompanyList: [],
      CatagoryPageList: [],
      showCollection: false,
      ruleForm: {
        BfCompanyId: "",
        invoiceTitle: "",
        taxRegistrationTel: "",
        BankId: "",
        Invoice: ""
      },
      rules: {
        BfCompanyId: [
          { required: true, message: "请选择公司", trigger: "blur" }
        ],
        invoiceTitle: [
          { required: true, message: "请输入发票抬头", trigger: "blur" }
        ],
        taxRegistrationTel: [
          { required: true, message: "请输入税务登记号码", trigger: "blur" }
        ],
        BankId: [
          { required: true, message: "请输入基本开户行账号", trigger: "blur" }
        ],
        Invoice: [
          { required: true, message: "请选择客户性质", trigger: "blur" }
        ]
      },
      // newTime: '',
      // oldTime: '',
      userId: 0, //用户ID
      InvoiceType: "", //发票类型
      OpenType: "", //开具类型
      Datas: "", //时间
      OpenTypes: null, //开具类型
      InvoiceTypes: null, //发票类型
      ApplyUserName: "", //查询内容
      tableloading: false,
      tableData: [], //列表数据
      PageSize: 10,
      currentPage: 1,
      total: 0,
      Id: "", // 发票管理
      Ids: [],
      // choosedata: [],
      // allchecked: false,
      InvoiceApplyEnumInvoiceType: [], //发票列表
      FinanceInvoiceType: [], //开具列表
      InvoiceApplyEnumTaxType: [], //客户单位性质
      invoicevisible: false, //开启关闭弹窗
      accountName: "", //开户行名称
      registeredAddress: "", //注册场所所在地
      RegisteredTel: "", //注册固定电话
      // invoicedata: {},
      addTime: [], //时间
      tableDataArr: [],
      // OpenTypeStatus:1,
      // 提交审核弹框
      // audittitle: '提交发票凭证',
      // auditvisible: false,
      // auditdata: {},
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: "",
        OperationCode: "Query"
      }
    };
  },
  created() {
    // 获取页面权限
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations;
      console.log(this.$route.meta.operations);
      this.operatiOBj.menuid = this.$operatedata(this.operates, "Query").MenuId;
      console.log(this.operatiOBj.OperationCode);
      this.GetFinanceInvoiceTitlePageList();
      this.GetInvoiceApplyAllEnum();
      this.remoteCompany();
    }
  },
  methods: {
    //根据时间段查询
    // TimeChange (e) {
    //   let arr = []
    //   let TimeArr = []
    //   if (e) {
    //     e.forEach(data => {
    //       arr.push(data.split(' ')[0].replace(/-/g, ''))
    //       this.newTime = arr[0]
    //       this.oldTime = arr[1]
    //       this.tableDataArr.forEach(data => {
    //         let newdata = data.AddTime.split('T')[0].replace(/-/g, '')
    //         if (newdata >= this.newTime && newdata <= this.oldTime) {
    //           TimeArr.push(data)
    //         }
    //       })
    //       this.tableData = TimeArr
    //       this.total = this.tableData.length
    //     })
    //   } else {
    //     this.GetFinanceInvoiceTitlePageList()
    //   }
    // },
    querySelect(data) {
      // if(this.OpenTypes==null|| this.InvoiceTypes==null){
      this.OpenTypes = "";
      this.InvoiceTypes = "";
      //       let obj={
      //       FinanceInvoiceType:this.OpenTypes,
      //       InvoiceType: this.InvoiceTypes,
      //       Query: this.ApplyUserName,
      //       PageIndex:this.currentPage || 1,
      //       PageSize: this.PageSize,
      //       Sign: "",
      //       menuid:this.operatiOBj.menuid,
      //       operationcode: this.operatiOBj.OperationCode
      //       }
      //       GetFinanceInvoiceTitlePageList(obj).then(res=>{
      //       this.tableData=res.Data
      //       this.tableDataArr=res.Data
      //       this.total=res.Total
      // })
      // }
      this.GetFinanceInvoiceTitlePageList();
    },
    //发票类型
    GetInvoiceTypes(id) {
      this.currentPage = 1;
      this.PageSize = 10;
      this.total = 0;
      let obj = {
        FinanceInvoiceType: -1,
        InvoiceType: id,
        Query: "",
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Sign: "",
        menuid: this.operatiOBj.menuid,
        operationcode: this.operatiOBj.OperationCode
      };
      if (this.OpenTypes > -1 && this.OpenTypes != null) {
        obj.FinanceInvoiceType = this.OpenTypes;
      } else {
        obj.FinanceInvoiceType = -1;
      }
      GetFinanceInvoiceTitlePageList(obj).then(res => {
        this.tableData = res.Data;
        this.total = res.Total;
      });
    },
    //开具查询
    GetOpenTypes(id) {
      this.currentPage = 1;
      this.PageSize = 10;
      this.total = 0;
      let obj = {
        FinanceInvoiceType: id,
        InvoiceType: -1,
        Query: "",
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Sign: "",
        menuid: this.operatiOBj.menuid,
        operationcode: this.operatiOBj.OperationCode
      };
      if (this.InvoiceTypes > -1 && this.InvoiceTypes != null) {
        obj.InvoiceType = this.InvoiceTypes;
      } else {
        obj.InvoiceType = -1;
      }
      GetFinanceInvoiceTitlePageList(obj).then(res => {
        this.tableData = res.Data;
        this.total = res.Total;
      });
    },
    //查看详情
    watchinvoice(data, str) {
      const operating = this.$operatedata(this.operates, str);
      localStorage.setItem("operating", JSON.stringify(operating));
      this.$router.push({
        path: "/FinancialManagement/CustomerInvoiceInformationDetails",
        query: {
          Id: data.Id
        }
      });
    },
    //修改发票信息
    markinvoice(data, str) {
      this.AddBankTitle = "修改客户发票信息";
      this.showCollection = true;
      this.ruleForm.BfCompanyId = data.CompanyId;
      this.ruleForm.invoiceTitle = data.Title;
      this.ruleForm.taxRegistrationTel = data.TaxNo;
      this.ruleForm.BankId = data.AccountNo;
      this.OpenType = data.FinanceInvoiceType;
      this.InvoiceType = data.InvoiceType;
      this.ruleForm.Invoice = data.CompanyNature;
      this.accountName = data.BankName;
      this.registeredAddress = data.RegAddress;
      this.RegisteredTel = data.CompanyTel;
      this.userId = data.Id;
    },
    //删除客户发票信息
    deleteData(data, str) {
      const operating = this.$operatedata(this.operates, str);
      let obj = {
        Id: data.Id,
        menuid: operating.MenuId,
        OperationCode: operating.OperationCode
      };
      showLoading();
      DeleteFinanceInvoiceTitle(obj).then(res => {
        hideLoading();
        if (res.IsSuccess) {
          this.GetFinanceInvoiceTitlePageList();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.MessageContent,
            type: "error"
          });
        }
      });
    },
    //添加客户发票信息
    dialogtrue() {
      if (this.AddBankTitle == "添加客户发票信息") {
        let obj = {
          CompanyId: this.ruleForm.BfCompanyId,
          Title: this.ruleForm.invoiceTitle,
          TaxNo: this.ruleForm.taxRegistrationTel,
          AccountNo: this.ruleForm.BankId,
          FinanceInvoiceType: this.OpenType,
          InvoiceType: this.InvoiceType,
          CompanyNature: this.ruleForm.Invoice,
          BankName: this.accountName,
          RegAddress: this.registeredAddress,
          CompanyTel: this.RegisteredTel,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        showLoading();
        AddFinanceInvoiceTitle(obj).then(res => {
          hideLoading();
          if (res.IsSuccess) {
            this.showCollection = false;
            this.GetFinanceInvoiceTitlePageList();
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
        //修改客户发票信息
      } else {
        let obj = {
          Id: this.userId,
          CompanyId: this.ruleForm.BfCompanyId,
          Title: this.ruleForm.invoiceTitle,
          TaxNo: this.ruleForm.taxRegistrationTel,
          AccountNo: this.ruleForm.BankId,
          FinanceInvoiceType: this.OpenType,
          InvoiceType: this.InvoiceType,
          CompanyNature: this.ruleForm.Invoice,
          BankName: this.accountName,
          RegAddress: this.registeredAddress,
          CompanyTel: this.RegisteredTel,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        showLoading();
        EditFinanceInvoiceTitle(obj).then(res => {
          hideLoading();
          if (res.IsSuccess) {
            this.showCollection = false;
            this.GetFinanceInvoiceTitlePageList();
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message({
              message: res.MessageContent,
              type: "error"
            });
          }
        });
      }
    },
    MortgageChoice() {
      console.log(this.ruleForm.BfCompanyId);
    },
    // //获取公司列表
    // GetCompanyPageList () {
    //   let obj = {
    //     PageIndex: 1,
    //     PageSize: 99,
    //     Name: '',
    //     SysUserName: '',
    //     ContactName: '',
    //     StartDate: '',
    //     EndDate: '',
    //     Type: -1,
    //     Status: 1,
    //     OpenPermission: false,
    //     menuid: MenuIdDate(),
    //     operationcode: '1'
    //   }
    //   GetCompanyPageList(qs.stringify(obj)).then(response => {
    //     if (response.IsSuccess) {
    //       this.BfCompanyList = response.Data
    //     } else {
    //       this.$message({
    //         message: response.Data,
    //         type: 'warning'
    //       })
    //     }
    //   })
    // },
    //查询公司列表
    remoteCompany(query) {
      this.loading = true;
      setTimeout(() => {
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
    clearCompany() {
      this.remoteCompany();
    },
    //新增客户发票信息
    markinvoices() {
      this.AddBankTitle = "添加客户发票信息";
      this.ruleForm.BfCompanyId = "";
      this.ruleForm.invoiceTitle = "";
      this.ruleForm.taxRegistrationTel = "";
      this.ruleForm.BankId = "";
      this.OpenType = "";
      this.InvoiceType = "";
      this.ruleForm.Invoice = "";
      this.accountName = "";
      this.registeredAddress = "";
      this.RegisteredTel = "";
      this.showCollection = true;
    },
    //关闭弹窗
    close() {
      this.showCollection = false;
    },
    // 获取发票抬头分页列表
    GetFinanceInvoiceTitlePageList() {
      let obj = {
        FinanceInvoiceType: -1,
        InvoiceType: -1,
        Query: this.ApplyUserName,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize,
        Sign: "",
        menuid: this.operatiOBj.menuid,
        operationcode: this.operatiOBj.OperationCode
      };
      GetFinanceInvoiceTitlePageList(obj).then(res => {
        if (res.Data.length > 0 || res.MessageCode == 0) {
          this.tableData = res.Data;
          this.tableDataArr = res.Data;
          this.total = res.Total;
        } else {
          this.tableData = [];
          this.tableDataArr = [];
          this.total = 0;
        }
      });
    },
    //获取开票申请信息所有枚举
    GetInvoiceApplyAllEnum() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1",
        InvoiceApplyEnumTaxType: [{}],
        InvoiceApplyEnumReceipType: [{}],
        InvoiceApplyEnumStatus: [{}],
        InvoiceApplyEnumInvoiceType: [{}],
        FinanceInvoiceType: [{}]
      };
      GetInvoiceApplyAllEnum(obj).then(res => {
        this.InvoiceApplyEnumInvoiceType = res.InvoiceApplyEnumInvoiceType;
        this.FinanceInvoiceType = res.FinanceInvoiceType;
        this.InvoiceApplyEnumTaxType = res.InvoiceApplyEnumTaxType;
      });
    },
    // 选择分页大小
    handleSizeChange(val) {
      this.PageSize = val;
      this.GetFinanceInvoiceTitlePageList();
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetFinanceInvoiceTitlePageList();
    },
    // 关闭弹框
    closedialog() {
      this.invoicevisible = true;
    },
    // 开具发票
    savedialog(e) {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.operate-container {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
  .search-bar {
    padding: 24px 24px 12px 24px;
    // height: 80px;
    .condition {
      float: left;
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 12px;
      &:last-child {
        margin-right: 0;
      }
      .search-name {
        font-size: $f16;
        color: $erp666;
        font-weight: 700;
        display: inline-block;
        margin-right: 7px;
      }
      .el-input {
        display: inline-block;
        width: 216px;
      }
    }
  }

  .operate-top {
    float: right;
    .addmenu {
      margin-bottom: 16px;
      // width: 96px;
    }
    .el-button + .el-button {
      margin-left: 16px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
  }
  
}
.forms-box {
    position: relative;
    /deep/ .el-form-item {
      margin-bottom: 12px;
      width: 50%;
      float: left;
      padding: 0 20px;
      .el-form-item__label {
        text-align: left;
        line-height: 24px;
        color: #666666;
      }

      .el-form-item__content {
        margin-left: 0;
        width: 100%;
        .el-select {
          display: block;
          .el-input {
            .el-input__inner {
              height: 36px;
              line-height: 36px;
            }
            .el-input__suffix {
              top: 22px;
              height: 40px;
              line-height: 40px;
            }
          }
        }
        .el-input {
          font-size: 14px;
          .el-input__inner {
            height: 36px;
            line-height: 36px;
          }
          .el-input__suffix {
            height: 38px;
            line-height: 38px;
          }
        }
      }
    }
    /deep/ .Address {
      width: 100%;
      .el-form-item__label {
        width: 100%;
        text-align: left;
      }
      .el-select {
        width: 162px;
        margin-right: 17px;
        display: inline-block !important;
        .el-input__suffix {
          top: 0 !important;
        }
        &:nth-child(3) {
          margin-right: 0;
        }
      }
      .address-input {
        margin-top: 16px;
      }
    }
    /deep/ .Date {
      .el-date-editor {
        width: 100%;
        height: 40px;
      }
    }
    /deep/ .recipientPhone {
      // width: 100%;
    }
    /deep/ .textarea-note {
      .el-textarea__inner {
        border: 1px solid #f0f4fa;
      }
    }
    /deep/ .is-error {
      .el-textarea__inner {
        border: 1px solid #f56c6c;
      }
    }
  }
</style>