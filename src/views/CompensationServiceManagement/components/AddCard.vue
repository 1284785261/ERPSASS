<!--添加挂账信息-->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" class="dialog-box" append-to-body :visible.sync="showCard" :show-close="false" :destroy-on-close="true" width="880px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-row :gutter="64">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="挂账名称" prop="Title">
              <el-input v-model="dataObject.Title" clearable class="select-input" placeholder="请输入挂账名称" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="所属客户" prop="CompanyId">
              <el-select v-model="dataObject.CompanyId" filterable clearable remote placeholder="请查询或下拉选择所属客户" class="select-input" @clear="clearCompany" :remote-method="remoteCompany" :loading="loading" @change="SelectCustom(dataObject.CompanyId)">
                <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="所属项目" prop="ProjectId">
              <el-select v-model="dataObject.ProjectId" filterable clearable remote placeholder="请先查询客户再选择所属项目" class="select-input" @clear="clearProject" :remote-method="remoteProject" :loading="loading" @change="selectProject(dataObject.ProjectId)">
                <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="回款流水" prop="ProjectMoneyDrawId">
              <el-select v-model="dataObject.ProjectMoneyDrawId" filterable clearable placeholder="请先查询所属客户再选择流水" class="select-input" :loading="loading">
                <el-option v-for="item in RelatedCapitalFlowList" :key="item.Id" :label="
                    '流水金额 ' +
                    item.Amount +
                    ' 元 - ' +
                    '打款账号' +
                    '[ ' +
                    item.CompanyAccount +
                    ' ]'
                  " :value="item.Id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="dataObject.DeductionAmount > '-1'">
            <el-form-item>
              <div>
                <div class="colors">
                  <i class="el-icon-warning" style="color: #d81e06; font-size: 18px"></i>
                  当前项目您需要抵扣的代垫金额为
                  {{ dataObject.DeductionAmount }} 元
                </div>
              </div>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="当前项目需要认领的金额">
          <el-input v-model="dataObject.ProjectAmountClaimed" clearable class="select-input" placeholder="请输入认领金额" />
        </el-form-item>
        </el-col> -->
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="所属年月" prop="YearMonth" class="Date">
              <el-date-picker v-model="dataObject.YearMonth" type="month" placeholder="请选择所属年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="挂账金额" prop="Amount">
              <el-input v-model="dataObject.Amount" clearable class="select-input" @input="AvailableAmount(dataObject.Amount)" placeholder="请输入挂账金额">
                <svg-icon slot="suffix" icon-class="money" class-name="way" />
              </el-input>
            </el-form-item>
          </el-col>
          <!-- <el-form-item label="是否分账" prop="Type" class="State">
          <el-radio-group v-model="dataObject.Type">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="备注" prop="Remark" class="textarea-note">
              <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="dataObject.Remark" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button class="erpbtn" size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetCompanyPageList,
  GetSubstituteCushionResidualByProjectId
} from "@/api/CustomerManagement.js";
import {
  GetProjectList,
  GetProjectMoneyDrawPageList,
  GetAvailableProjectMoneyDrawPageList
} from "@/api/projectManagement.js";
import { GetMoneyRecordPageList } from "@/api/FinancialManagement.js";
import { MenuIdDate, showLoading, hideLoading } from "@/utils/CustomValidation";
import qs from "qs";
export default {
  name: "AddCard",
  props: {
    showAddCard: {
      type: Boolean
    },
    dialogTitle: {
      type: String,
      default: "添加挂账"
    },
    tempData: {
      type: Object
    }
  },
  data() {
    return {
      showCard: false,
      Formrules: {
        Title: [{ required: true, message: "请输入挂账名称", trigger: "blur" }],
        CompanyId: [
          { required: true, message: "请选择所属客户", trigger: "change" }
        ],
        ProjectId: [
          { required: true, message: "请选择所属项目", trigger: "change" }
        ],
        ProjectMoneyDrawId: [
          { required: true, message: "请选择回款流水", trigger: "change" }
        ],
        YearMonth: [
          { required: true, message: "请选择所属年月", trigger: "change" }
        ],
        Amount: [{ required: true, message: "请输入挂账金额", trigger: "blur" }]
      },
      dataObject: {
        Id: "",
        Year: "",
        Month: "",
        YearMonth: "",
        Type: "",
        Amount: "",
        Remark: "",
        ProjectId: "",
        DeductionAmount: "",
        Title: "",
        CompanyId: "",
        ProjectMoneyDrawId: "",
        ProjectPrepaidAmount: "",
        ProjectAmountClaimed: ""
      },
      loading: false,
      CompanyPageList: [], //客户列表
      ProjectList: [], //项目列表
      RelatedCapitalFlowList: [],//汇款流水列表
      ProjectId: null,
      RelatedCapitalFlow: null
    };
  },
  watch: {
    // 'dataObject.ProjectMoneyDrawId' (newVal, oldVal) {
    //   console.log(newVal);
    //   this.RelatedCapitalFlowList.forEach(data => {
    //     if (newVal == data.Id) {
    //       this.dataObject.ProjectAmountClaimed = data.AvailableAmount
    //     }
    //   })
    // },
    showAddCard(newvalue, oldvalue) {
      this.showCard = newvalue;
      if (this.dialogTitle == "修改挂账") {
        this.dataObject = this.tempData;
        this.dataObject.Type = this.dataObject.Type + "";
        this.dataObject.YearMonth =
        this.dataObject.Year + "-" + this.dataObject.Month;
        this.remoteProject()
      } else {
        this.dataObject = this.$options.data().dataObject;
        this.CompanyPageList= [] //客户列表
        this.ProjectList=[] //项目列表
        this.RelatedCapitalFlowList= []//汇款流水列表
      }
      this.remoteCompany();
    },
    // "dataObject.CompanyId"(newval, oldVal) {
    //   this.CompanyId = newval;
    //   this.dataObject.DeductionAmount = "";
    //   this.dataObject.ProjectId = null;
    //   this.dataObject.ProjectMoneyDrawId = null;
    //   this.RelatedCapitalFlowList = [];
    //   if (this.dataObject.CompanyId != "") {
    //     this.remoteProject();
    //   } else {
    //     this.dataObject.ProjectId = null;
    //     this.dataObject.ProjectMoneyDrawId = null;
    //     this.RelatedCapitalFlowList = [];
    //   }
    // }
  },
  created() {
    // this.remoteCompany();
  },
  methods: {
    SelectCustom(id) {
      if (id) {
        let obj = {
          CompanyId: id,
          CompanyName: "",
          BfCompanyName: "",
          SysUserName: "",
          Account: "",
          MoneyRecordType: "1",
          Status: "0",
          PageIndex: 1,
          PageSize: 99,
          Sign: "",
          menuid: MenuIdDate(),
          operationcode: 1
        };
        GetMoneyRecordPageList(obj).then(res => {
          if (res.IsSuccess && res.Data != null) {
            let data = res.Data;
            console.log(data);
            for (let i = 0; i < data.length; i++) {
               if(data[i].UsedAmount>0){
                   this.RelatedCapitalFlowList.push(data[i])
               }
            }
            console.log(this.RelatedCapitalFlowList);
          } else {
            this.dataObject.ProjectMoneyDrawId = "";
            this.RelatedCapitalFlowList = [];
          }
        });
        this.remoteProject()
      }
    },
    //获取项目流水
    selectProject(id) {
      if (id) {
        let objs = {
          ProjectId: id,
          menuid: MenuIdDate(),
          operationcode: 1
        };
        GetSubstituteCushionResidualByProjectId(objs).then(res => {
          if (res.MessageCode == 0) {
            this.dataObject.DeductionAmount = res.Data.Residual;
            console.log(this.dataObject.DeductionAmount);
          }
        });
      }
    },
    AvailableAmount(e) {
      if (this.RelatedCapitalFlowList != "") {
        this.RelatedCapitalFlowList.map(data => {
          if (data.Id == this.dataObject.ProjectMoneyDrawId) {
            this.RelatedCapitalFlow = data.Amount;
          }
        });
      }

      if (this.RelatedCapitalFlow != null) {
        if (e > this.RelatedCapitalFlow) {
          this.dataObject.Amount = this.RelatedCapitalFlow;
          this.$message({
            message: "已调整为最大可挂账金额",
            type: "warning"
          });
        }
      }
    },
    //获取流水列表
    //     getRelatedCapitalFlow(){
    //       let obj={
    //           ProjectId:this.ProjectId,
    //           Year: 0,
    //           Month: 0,
    //           PageIndex: 1,
    //           PageSize: 99,
    //           Sign: '',
    //           menuid: MenuIdDate(),
    //           operationcode: 1
    // }
    // console.log(obj);
    // GetAvailableProjectMoneyDrawPageList(obj).then(res=>{
    //   console.log(res);
    //   if(res.IsSuccess&&res.Data.length>0){
    //     this.RelatedCapitalFlowList=res.Data
    //     console.log(this.RelatedCapitalFlowList);
    //   }else{
    //     this.RelatedCapitalFlowList=[]
    //   }
    // })
    //     },
    //查询公司列表
    remoteCompany(query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          Name: query,
          PageIndex: 1,
          PageSize: 50,
          Type: -1,
          Status: 1,
          menuid: MenuIdDate(),
          operationcode: 1
        };
        GetCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.CompanyPageList = response.Data;
            } else {
              this.dataObject.ProjectId = "";
              this.dataObject.ProjectMoneyDrawId = "";
              this.CompanyPageList = [];
            }
          } else {
            this.dataObject.ProjectId = "";
            this.dataObject.ProjectMoneyDrawId = "";
            this.CompanyPageList = [];
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }, 200);
    },
    clearCompany() {
      this.dataObject.ProjectId = "";
      this.dataObject.ProjectMoneyDrawId = "";
      this.dataObject.DeductionAmount = "";
      this.RelatedCapitalFlow = null;
      this.RelatedCapitalFlowList=[]
      this.ProjectList = [];
      this.remoteCompany();
    },
    //获取项目下拉列表
    remoteProject(val) {
      let data = {
        Name: val,
        CompanyId: this.dataObject.CompanyId || "",
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
            this.ProjectList = response.Data;
            // this.ProjectId=response.Data[0].Id
            // this.getRelatedCapitalFlow()
          } else {
            this.ProjectList = [];
            this.dataObject.ProjectId = "";
            this.dataObject.ProjectMoneyDrawId = "";
            this.RelatedCapitalFlow = null;
            this.RelatedCapitalFlowList = [];
          }
        } else {
          this.ProjectList = [];
          this.dataObject.ProjectId = "";
          this.dataObject.ProjectMoneyDrawId = "";
          this.RelatedCapitalFlow = null;
          this.RelatedCapitalFlowList = [];
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // getRelated () {
    //   this.getRelatedCapitalFlow()
    // },
    clearProject() {
      this.dataObject.ProjectId = "";
    },
    //选择客户查询项目
    // changeCompany (e) {
    //   if (this.dataObject.CompanyId) {
    //   if(this.dataObject.CompanyId!=this.dataObject.CompanyId){
    //     this.dataObject.ProjectId = ''
    //     this.dataObject.ProjectMoneyDrawId=''
    //   }
    //        this.remoteProject()
    //   }
    // if(this.dataObject.CompanyId!=this.dataObject.CompanyId){
    //   this.dataObject.ProjectId = ''
    //   this.dataObject.ProjectMoneyDrawId=''
    // }
    // },
    dialogtrue(form) {
      // 调用接口,保存数据
      this.$refs[form].validate(valid => {
        if (valid) {
          let myDate = new Date(this.dataObject.YearMonth);
          // this.dataObject.Year = myDate.getFullYear()
          // this.dataObject.Month = myDate.getMonth() + 1
          let obj = {
            ProjectId: this.dataObject.ProjectId,
            ChargeName: this.dataObject.Title,
            MoneyRecordId: this.dataObject.ProjectMoneyDrawId,
            Year: myDate.getFullYear(),
            Month: myDate.getMonth() + 1,
            Amount: this.dataObject.Amount,
            Remark: this.dataObject.Remark
          };
          this.$emit("AddCardSave", obj);
          this.dataObject.CompanyId = "";
          this.ProjectList = [];
        } else {
          this.$message({
            message: "请按要求填写表单内容",
            type: "error"
          });
          return false;
        }
      });
    },
    close() {
      this.$emit("closeAddCardSave", false);
      this.RelatedCapitalFlow = null;
      this.dataObject.CompanyId = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.forms {
  .colors {
    width: 300px;
    height: 30px;
    line-height: 30px;
    background-color: #fff2f1;
    padding-left: 10px;
    border-radius: 7px;
  }
  /deep/ .el-form-item {
    margin-bottom: 12px;

    .el-form-item__label {
      width: 50%;
      text-align: left;
      line-height: 24px;
      color: #666666;
    }

    .el-form-item__content {
      margin-left: 0;
      width: 100%;
      .el-select {
        display: block;
        .el-input__suffix {
          top: 24px;
          height: 40px;
        }
      }
    }
  }
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
    }
    .el-input__inner {
      border: none;
      background: $erinputbgc;
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      label {
        &:nth-child(1) {
          margin-right: 120px;
        }
      }
    }
  }
}
</style>