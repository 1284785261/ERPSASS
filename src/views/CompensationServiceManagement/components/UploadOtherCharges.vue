<!--上传其他费用-->
<template>
  <div class="UploadOtherCharges-Box">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="UploadOtherCharges-Content">
      <div class="description-box">
        <el-steps :active="currentActive" align-center>
          <el-step title="上传基础信息" description="上传其他费用所属项目的基础信息"></el-step>
          <el-step title="上传详细数据" description="上传其他费用所属项目的详细数据"></el-step>
        </el-steps>
      </div>
      <div v-if="currentActive == 1" class="payroll-content">
        <el-form ref="ruleForm" label-position="top" :model="searchObject" :rules="rules" class="forms-Compensation">
          <el-row :gutter="24">
            <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="所属客户" prop="CompanyId">
                <el-select class="bginput" size="small" ref="project" v-model="searchObject.CompanyId" filterable remote clearable placeholder="搜索选择客户" :remote-method="CompanyMethod" @change="chooseCompany" @clear="CompanyMethod('')">
                  <el-option v-for="item in CompanyList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="所属项目" prop="ProjectId">
                <el-select class="bginput" size="small" ref="project" v-model="searchObject.ProjectId" filterable remote clearable placeholder="先选择客户再搜索选择项目" @change="changeproject" :remote-method="ProjectMethod" @clear="ProjectMethod('')">
                  <el-option v-for="item in Projectlist" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="其他费用信息" prop="Type">
                <el-select v-model="searchObject.Type" filterable clearable placeholder="请选择其他费用信息" class="bginput">
                  <el-option :label="item.label" :value="item.type" v-for="(item, index) in WageTypes" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="所属年月" prop="BelongingDate">
                <el-date-picker size="small" v-model="searchObject.BelongingDate" class="bginput" type="month" placeholder="选择工资所属年月"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="入账年月" prop="EntryDate">
                <el-date-picker size="small" v-model="searchObject.EntryDate" class="bginput" type="month" placeholder="选择社保所属年月"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="是否为预结算" prop="PreSettlement">
                <el-radio v-model="PreSettlement" label="0">是</el-radio>
                <el-radio v-model="PreSettlement" label="1">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="blueBtn" round size="small" @click="goreturn()">取消</el-button>
          <el-button class="blueBtn" round size="small" @click="dialogtrue1('ruleForm')">新增导入</el-button>
        </div>
      </div>
      <div v-if="currentActive == 2">
        <div class="Four-tableBox">
          <div class="table-content">
            <div class="operate-table">
              <el-table ref="FloatingSuCCTable" class="erp-table" v-loading="tableloading" :data="DetailedData" max-height="600" tooltip-effect="dark" show-summary :summary-method="getSummaries">
                <el-table-column align="center" prop="Id" min-width="120" fixed label="序号" />
                <el-table-column align="center" prop="StaffName" label="结算项" min-width="120" />
                <el-table-column align="center" prop="Sex" label="人数" min-width="120" />
                <el-table-column align="center" prop="SalaryBatchBeforehandId" label="金额" min-width="150" />
                <el-table-column align="center" prop="Year" label="备注" min-width="120"/>
                <el-table-column align="center" prop="Name" label="操作">
                 <template slot-scope="scope">
                  <el-dropdown trigger="click">
                     <span class="el-dropdown-link">
                      <svg-icon icon-class="setting" />
                     </span>
                    <el-dropdown-menu slot="dropdown">
                    <ul class="popout-list">
                    <el-dropdown-item @click.native="Delete(scope.row)">删除</el-dropdown-item>
                    </ul>
                   </el-dropdown-menu>
                 </el-dropdown>
               </template>
              </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button class="blueBtn" round size="small" @click="PreviousStep">上一步</el-button>
          <el-button class="blueBtn" round size="small" @click="goreturn">取消</el-button>
          <el-button class="blueBtn" round size="small" @click="Complete">完成</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
export default {
  components: {
    BreadCrumb,
  },
  data() {
    return {
      PreSettlement:'',
      currentActive:1,
      WageTypes:[],
      tableloading:false,
      urlList: [{
        name: '其他费用管理',
        router: '/CompensationServiceManagement/OtherExpenseManagement'
      }, {
        name: '上传其他费用',
        router: ''
      }],
      rules: {
        Type: [
          { required: true, message: '请选择费用信息', trigger: 'change' },
        ],
        BelongingDate: [
          { required: true, message: '请选择所属年月', trigger: 'change' },
        ],
        EntryDate: [
          { required: true, message: '请选择入账年月', trigger: 'change' },
        ],
        PreSettlement:[
          { required: true, message: '请选择结算类型', trigger: 'change' }]
      },
      DetailedData:[{Id:1}],
      searchObject:{
        Type:'',
        BelongingDate:'',
        EntryDate:'',
      }
    }
  },
  methods:{
    //取消
    goreturn () {
      this.$router.go(-1)
    },
    //上一步
    PreviousStep(){
      this.currentActive=1
    },
    //完成
    Complete(){},
    //新增导入
    dialogtrue1 (form) {
      this.$refs[form].validate((valid) => {
        this.currentActive=2
        if (valid) {
        }
      })
    },
     // 处理合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
        }else if(index === 1){
          sums[index]='其他费用合计'
        }else if (index === 3) {
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
  },
}
</script>
<style lang="scss" scoped>
.UploadOtherCharges-Box{
 .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
.UploadOtherCharges-Content{
    background: #fff;
    min-height: 700px;
    .description-box {
      padding: 80px 0 20px 0;
    }
    .payroll-content {
      background: #fff;
      overflow: hidden;
      border-radius: 8px 0 0 8px;
      margin-left: 24px;
      padding: 40px;
      .forms-Compensation {
        /deep/ .el-form-item {
          margin-bottom: 10px;
          .bginput {
            width: 100%;
            .el-input__inner {
              height: 36px;
              line-height: 36px;
              border: 1px solid $erinputbgc;
              background-color: $erinputbgc;
            }
          }
          .el-form-item__label {
            display: inline;
            padding: 0;
            line-height: 28px;
          }
        }
        /deep/ .is-error {
          .bginput {
            .el-input__inner {
              border: 1px solid #f56c6c;
            }
          }
        }
        .tableHeader-operation {
          margin-top: 10px;
          width: 100%;
          position: relative;
          > button {
            // position: absolute;
          }
          > input {
            position: absolute;
            left: 0;
            top: 0;
            width: 152px;
            height: 38px;
            opacity: 0;
            cursor: pointer;
          }
        }
      }
    }
    .TwoArea {
      width: 90%;
      // border: 1px solid #666666;
      margin-left: 5%;
      .table-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
      .TwoArea-center {
        // border: 1px solid #666666;
        width: 100%;
        .TwoArea-centerTitle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-items: flex-start;
          border-bottom: 1px solid #666666;
          div {
            padding: 20px;
          }
          .title-left {
            width: 20%;
            border-right: 1px solid #666666;
          }
          .title-right {
            width: 80%;
          }
        }
        .TwoArea-centerbox {
          width: 100%;
          .TwoArea-centerboxright {
            width: 100%;
            overflow-x: scroll;
            .TwoArea-table {
              border-collapse: collapse;
              border: 1px solid #666666;
              tr {
                td {
                  border: 1px solid #e1e1e6;
                  min-width: 100px;
                  padding: 10px;
                  text-align: center;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-all;
                }
              }
            }
          }
          .TwoArea-centerboxtitles {
            color: #ff4a4a;
            margin-top: 20px;
            i {
              margin-right: 10px;
            }
          }
        }
      }
      .TwoArea-footer {
        width: 100%;
        .TwoArea-footerright {
          width: 100%;
          display: flex;
          align-items: center;
          justify-items: flex-start;
          margin-bottom: 30px;
          .selectSheet {
            width: 200px;
            margin: 0 30px 0 0;
            /deep/ input {
              border: 1px solid #1588f8;
              background: #1588f8;
              color: #fff;
            }
            .el-select__caret {
              color: #fff;
            }
          }
          .stylesss {
            min-width: 320px;
            span {
              margin-right: 20px;
            }
            .el-radio {
              margin-right: 30px;
            }
          }
        }
      }
    }
    /deep/ .ErpStructuraDataObject {
      padding: 50px 30px;
      .ErpStructuraArr {
        border-bottom: 1px solid #e3e3e6;
        margin-bottom: 30px;
        padding-bottom: 20px;
        .calculation-title {
          font-size: $f16;
          color: $erp333;
          line-height: 16px;
          position: relative;
          padding-left: 12px;
          margin-bottom: 20px;
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
        .selectFormula {
          border: 1px solid $erinputbgc;
          background-color: $erinputbgc;
          position: relative;
          border-radius: 5px;
          .selectFormula-left {
            min-height: 38px;

            padding-bottom: 5px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-left: 10px;
            width: 80%;
            .tag-item {
              display: inline-block;
              margin-top: 5px;
              height: 30px;
              .tagxm {
                padding: 0 10px 0 5px;
                min-width: 60px;
                max-width: 180px;
                background: #f4f6f9;
                border-radius: 5px;
                text-align: left;
                height: 30px;
                display: inline-block;
                line-height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                position: relative;
                .tiele {
                  padding: 0 10px 0 5px;
                }
                i {
                  margin-left: 10px;
                  position: absolute;
                  right: 5px;
                  top: 8px;
                  &:hover {
                    color: #1588f8;
                    cursor: pointer;
                  }
                }
              }
              .symbol {
                line-height: 30px;
                margin: 0 5px;
                vertical-align: top;
              }
            }
          }

          .buttonFormula {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translate(0, -50%);
            color: #1588f8;
          }
        }
        .el-form-item__label {
          padding: 0;
          line-height: 30px;
        }
        .el-form-item__content {
          .el-select {
            width: 100%;
            .el-input__inner {
              border: 1px solid $erinputbgc;
              background-color: $erinputbgc;
            }
          }
        }
      }
    }
    /deep/ .Ismandatory {
      .el-form-item__label {
        color: #ff4a4a;
      }
    }
    .Four-tableBox {
      .table-content {
        border-radius: 0;
      }
    }
  }
  .dialog-footer {
    margin-top: 50px;
    text-align: center;
    padding-bottom: 40px;
    button {
      min-width: 100px;
      padding: 13px 15px;
      border-radius: 8px;
      font-size: 14px;
    }
    .blueBtn {
      background: $erpbtncolor;
      color: $erpcolor;
      border: none;
      &:hover {
        background-color: $erpcolor !important;
        color: #fff !important;
      }
      &:active {
        background-color: $erpbtnactive !important;
        color: #fff !important;
      }
      &:focus {
        background-color: $erpbtncolor;
        color: $erpcolor;
      }
    }
    .abnormal {
      background: #e6a23c;
      color: $erpbgcolor;
      border: none;
      float: left;
    }
    .grayBtn {
      background: #fff;
      color: $erp999;
      padding: 12px 14px;
      border: 1px solid $erp999;
    }
    .cancelBtn {
      background: $erpredbtn;
      color: $erpredbtnactive;
      border: none;
      &:hover {
        background-color: $erpredbtnactive !important;
        color: #fff !important;
      }
      &:active {
        background-color: $erpredbtnactive !important;
        color: #fff !important;
      }
      &:focus {
        background-color: $erpredbtnactive;
        color: $erpcolor;
      }
    }
  }
}
</style>