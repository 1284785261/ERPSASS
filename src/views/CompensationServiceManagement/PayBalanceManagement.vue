<!-- 缴纳差额管理 -->
<template>
  <div class="social-security-management-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">员工名称</div>
        <el-input v-model="searchform.StaffName" clearable class="erpsearchinput" size="small" suffix-icon="el-icon-search" placeholder="请输入员工名称" />
      </div>
      <div class="condition">
        <div class="search-name">身份证号码</div>
        <el-input v-model="searchform.IdCode" clearable class="erpsearchinput" size="small" suffix-icon="el-icon-search" placeholder="请输入身份证号码" />
      </div>
      <div class="condition">
        <div class="search-name">企业社保账号</div>
        <el-input v-model="searchform.SiAccount" clearable class="erpsearchinput" size="small" suffix-icon="el-icon-search" placeholder="请输入企业社保账号" />
      </div>
      <div class="condition">
        <div class="search-name">企业公积金账号</div>
        <el-input v-model="searchform.HousFundAccount" clearable class="erpsearchinput" size="small" suffix-icon="el-icon-search" placeholder="请输入企业公积金账号" />
      </div>
      <div class="condition">
        <div class="search-name">所属年月</div>
        <el-date-picker class="erpsearchinput" clearable size="samll" v-model="searchform.date" type="month" placeholder="请选择所属年月"></el-date-picker>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <!-- <el-button size="small" class="erpbtn" @click="balancedetails">一键生成差额明细</el-button> -->
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="BfInsuranceList" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" fixed min-width="55" label="全选" />
          <el-table-column align="center" v-if="$getColumsFlag('StaffId',checkboxVal)" prop="StaffId" label="员工工号" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Name',checkboxVal)" prop="Name" label="员工姓名" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('IdCode',checkboxVal)" prop="IdCode" label="身份证号码" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('SiAccount',checkboxVal)" prop="SiAccount" label="企业社保账号" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('HouseFundAccount',checkboxVal)" prop="HouseFundAccount" label="企业公积金账号" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('HouseFundAccounts',checkboxVal)" prop="HouseFundAccount" label="企业医保账号" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('SiDefference',checkboxVal)" prop="SiDefference" label="社保差额合计" min-width="150" />
          <el-table-column align="center" v-if="$getColumsFlag('HouseFunDefference',checkboxVal)" prop="HouseFunDefference" label="公积金差额合计" min-width="150" />
          <el-table-column align="center" v-if="$getColumsFlag('HouseFunDefferences',checkboxVal)" prop="HouseFunDefference" label="医保差额合计" min-width="150" />
          <el-table-column align="center" v-if="$getColumsFlag('TotalDefference',checkboxVal)" prop="TotalDefference" label="差额总计" min-width="150" />
          <el-table-column align="center" v-if="$getColumsFlag('SiSettle',checkboxVal)" label="所属年月" min-width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.Year">{{scope.row.Year}}年{{scope.row.Month}}月</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('HouseFunPeriodYear',checkboxVal)" label="公积金入账年月" min-width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.HouseFunPeriodYear">{{scope.row.HouseFunPeriodYear}}年{{scope.row.HouseFunPeriodMonth}}月</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('SiPeriodYear',checkboxVal)" label="社保入账年月" min-width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.SiPeriodYear">{{scope.row.SiPeriodYear}}年{{scope.row.SiPeriodMonth}}月</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('SiPeriodMonth',checkboxVal)" label="医保入账年月" min-width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.SiPeriodYear">{{scope.row.SiPeriodYear}}年{{scope.row.SiPeriodMonth}}月</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['View']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="LookAccount(scope.row,'View')">查看</el-dropdown-item>
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
      <div class="operate-bottom" v-if="($operatebtns(operates,['Export']))">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="batchSelectAll(allchecked)">全选</el-checkbox>
        <el-button v-if="$operatebtn(operates, 'Export')" size="small" class="erpbtn" @click="deriveAccount('Export')">导出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import { GetDifferenceList, ExportDifferenceList } from '@/api/CompensationServiceManagement.js'
import { MenuIdDate, showLoading, hideLoading, uuid, getLastMonthStartDate, getLastMonthEndDate } from '@/utils/CustomValidation'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    ScreeningComponent
  },
  data () {
    return {
      searchform: {
        StaffName: '',
        IdCode: '',
        SiAccount: '',
        HousFundAccount: '',
        Year: '',
        Month: '',
        date: ''
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "员工工号", prop: "StaffId" },
        { label: "员工姓名", prop: "Name" },
        { label: "身份证号码", prop: "IdCode" },
        { label: "企业社保账号", prop: "SiAccount" },
        { label: "企业公积金账号", prop: "HouseFundAccount" },
        { label: "企业医保账号", prop: "HouseFundAccounts" },
        { label: "社保差额合计", prop: "SiDefference" },
        { label: "公积金差额合计", prop: "HouseFunDefference" },
        { label: "医保差额合计", prop: "HouseFunDefferences" },
        { label: "差额总计", prop: "TotalDefference" },
        { label: "所属年月", prop: "SiSettle" },
        { label: "公积金入账年月", prop: "HouseFunPeriodYear" },
        { label: "社保入账年月", prop: "SiPeriodYear" },
        { label: "医保入账年月", prop: "SiPeriodMonth" },
      ],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      AccountList: [],
      BfInsuranceList: [],
      tableloading: false, // 加载动画
      tableData: [], // 表格
      multipleSelection: [],
      allchecked: false,
      showBalanceDetails: false,
      StatementsTitle: '生成结算单',
      showStatements: false,
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },

  created () {
    // 获取上个月
    this.searchform.date = getLastMonthStartDate()
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getDifferenceList(this.operatiOBj)
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  methods: {
    //筛选项
    SelectCheck (val) {
      this.tableloading = true
      this.checkboxVal = val
      this.tableloading = false
    },
    searchtable () {
      this.currentPage = 1
      this.getDifferenceList(this.operatiOBj)
    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      this.getDifferenceList(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getDifferenceList(this.operatiOBj)
    },
    // 获取列表详情
    getDifferenceList (operat) {
      // 处理时间
      if (this.searchform.date) {
        this.searchform.Year = this.searchform.date.getFullYear()
        this.searchform.Month = this.searchform.date.getMonth() + 1
      } else {
        this.searchform.Year = ''
        this.searchform.Month = ''
      }
      let data = {
        StaffName: this.searchform.StaffName,
        IdCode: this.searchform.IdCode,
        SiAccount: this.searchform.SiAccount,
        HousFundAccount: this.searchform.HousFundAccount,
        Year: this.searchform.Year,
        Month: this.searchform.Month,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      this.tableloading = true
      GetDifferenceList(qs.stringify(data)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.BfInsuranceList = response.Data
            this.total = response.Total
          } else {
            this.BfInsuranceList = []
            this.total = 0
          }
        } else {
          this.BfInsuranceList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 多选
    handleSelectionChange (value) {
      this.allchecked = value.length == this.BfInsuranceList.length
      this.multipleSelection = value
    },
    batchSelectAll () {
      this.$refs.multipleTable.toggleAllSelection(this.checked)
    },

    // 查看详情
    LookAccount (data, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      localStorage.setItem('blancedetail', JSON.stringify(data))
      const { href } = this.$router.resolve({
        path: "/CompensationServiceManagement/PayBalanceDetail",
        query: {
          id: data.Id
        }
      });
      window.open(href, "_blank");
    },
    // 生成差额明细
    balancedetails () {

    },
    // 导出
    deriveAccount () {
      if (this.multipleSelection.length > 0) {
        let arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].StaffId)
        }
        // 处理时间
        if (this.searchform.date) {
          this.searchform.Year = this.searchform.date.getFullYear()
          this.searchform.Month = this.searchform.date.getMonth() + 1
        } else {
          this.searchform.Year = ''
          this.searchform.Month = ''
        }
        const obj = {
          StaffId: arr.join(','),
          Year: this.searchform.Year,
          Month: this.searchform.Month,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        ExportDifferenceList(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            window.open(response.Data)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要导出的员工'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.social-security-management-container {
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
    margin-bottom: 16px;
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
    .screening-compent {
      float: right;
      margin-bottom: 10px;
      margin-right: 5px;
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
  /deep/.erpsearchinput {
    .el-input__inner {
      line-height: 30px;
      height: 30px;
      transform: trans;
    }
    .el-input__icon {
      line-height: 30px;
    }
  }
}
</style>