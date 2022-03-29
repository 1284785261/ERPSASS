<!--补贴认领管理-->
<template>
  <div class="SubsidyClaimManagement-Box">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">打款方</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入打款客户查询" size="small" v-model="searchform.Payer" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">收款企业</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入收款企业查询" size="small" v-model="searchform.BfCompanyName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">添加人</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入添加流水人查询" size="small" v-model="searchform.SysUserName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">添加时间</div>
        <el-date-picker class="erpsearchinput" clearable v-model="searchform.AddTime" size="small" type="date" placeholder="选择日期" @keyup.enter.native="searchtable"></el-date-picker>
      </div>
      <div class="condition">
        <div class="search-name">补贴类型</div>
        <el-select v-model="searchform.SubsidyType" size="small" class="erpsearchinput" clearable placeholder="请选择付款申请单维度">
              <el-option v-for="item in SubsidyTypeList" :key="item.value" :label="item.describe" :value="item.value">
              </el-option>
        </el-select>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
    <div class="tab2 clearfix tabs">
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item.value)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
    </div>
      <div class="operate-top">
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" key="table1" v-loading="tableloading" :data="MoneyRecordList" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" v-if="$getColumsFlag('Id',checkboxVal)" prop="Id" min-width="120" label="回款编号" />
          <el-table-column align="center" v-if="$getColumsFlag('Sn',checkboxVal)" prop="Sn" label="银行流水号" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.Sn}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('Amount',checkboxVal)" prop="Amount" label="流水金额" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.Amount | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('CompanyAccount',checkboxVal)" prop="CompanyAccount" label="打款账号" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.CompanyAccount}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('CompanyName',checkboxVal)" prop="CompanyName" label="打款方" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('CompanyBankName',checkboxVal)" prop="CompanyBankName" label="打款客户银行名称" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('BankName',checkboxVal)" prop="BankName" label="回款类型" min-width="150" />
          <el-table-column align="center" v-if="$getColumsFlag('BfCompanyName',checkboxVal)" prop="BfCompanyName" label="收款企业" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Remark',checkboxVal)" prop="Remark" label="备注" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('SysUserName',checkboxVal)" prop="SysUserName" label="添加人" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('PayTime',checkboxVal)" prop="PayTime" label="到账时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.PayTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" label="添加时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('StatusText',checkboxVal)" prop="StatusText" label="状态" min-width="120" />
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item @click.native="ClaimSubsidyCollection(scope.row,'Modify')">认领补贴回款</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="LookClaimSituation(scope.row,'View')">查看认领情况</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <ClaimSubsidyCollection :DialogTrue="DialogTrue" @DialogFalse="DialogFalse" :DialogId="DialogId"></ClaimSubsidyCollection>
  </div>
</template>
<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import ClaimSubsidyCollection from './components/ClaimSubsidyCollection.vue'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components:{ScreeningComponent,ClaimSubsidyCollection},
  data() {
    return {
      tablist: [{
        value: 0,
        describe: '全部'
      }, {
        value: 1,
        describe: '收款'
      }, {
        value: 2,
        describe: '补贴'
      }],
      searchform: {
        Payer: '',
        BfCompanyName: '',
        SysUserName: '',
        AddTime:'',
        SubsidyType: '',
      },
      DialogId:-1,
      DialogTrue:false,
      SubsidyTypeList:[],
      checkboxVal: [],
      formTheadOptions: [
        { label: "回款编号", prop: "Id" },
        { label: "银行流水号", prop: "Sn" },
        { label: "流水金额", prop: "Amount" },
        { label: "打款账号", prop: "CompanyAccount" },
        { label: "打款客户", prop: "CompanyName" },
        { label: "打款客户银行名称", prop: "CompanyBankName" },
        { label: "回款类型", prop: "BankName" },
        { label: "收款企业", prop: "BfCompanyName" },
        { label: "备注", prop: "Remark" },
        { label: "添加人", prop: "SysUserName" },
        { label: "到账时间", prop: "PayTime" },
        { label: "添加时间", prop: "AddTime" },
        { label: "状态", prop: "StatusText" },
      ],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      MoneyRecordList: [],
      tableloading: false, // 加载动画
      tabidx: 0,
      MoneyRecordTypeIdx: 0,
      importvisible: false, // 导入员工弹框
      filterdata: { // 上传的文件
        type: '',
        name: '',
        visible: false
      },
      checked: false,
      multipleSelection: [],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    // 获取页面权限
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      console.log(this.operates);
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  methods: {
    //关闭弹窗
    DialogFalse(e){
      this.DialogTrue=e
    },
     //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    //认领补贴回款
    ClaimSubsidyCollection(){
      this.DialogId=e.Id
      this.DialogTrue=true
    },
    //查看认领情况
    LookClaimSituation(){
      this.DialogId=e.Id
    },
     choosetab(e){
      this.tabidx = e
      this.currentPage = 1
    },
    //查询
    searchtable(){},
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
  },
}
</script>
<style lang="scss">
.SubsidyClaimManagement-Box{
  .search-bar {
    padding: 24px 24px 12px 24px;
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
        width: 206px;
      }
    }
  }
  .operate-top {
    float: right;
    margin-bottom: 16px;
  }
  .content {
    background-color: #fff;
    margin-left: 20px;
    padding: 20px;
    border-radius: 8px 0px 0px 8px;
    .screening-compent {
      float: right;
      margin-right: 20px;
    }
    .tabs {
     padding-top: 0px;
     padding-left: 0px;
     margin-left: 0px;
     float: left;
    }
    .operate-bottom {
      margin-top: 32px;
      padding-left: 16px;
      .allcheck {
        margin-right: 16px;
      }
    }
    .pagina-fonter {
      margin-top: 24px;
    }
  }
}
</style>