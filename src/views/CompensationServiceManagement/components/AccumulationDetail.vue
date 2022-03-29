<!-- 公积金详情 -->
<template>
  <div class="addumulation-detail-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="tab2 clearfix">
      <div class="tab-name" :class="{active: tabidx==item.value}" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">{{item.describe}}</div>
    </div>
    <div class="final-statement-content">
      <div class="search-bar clearfix" v-show="tabidx==1">
        <div class="condition">
          <div class="search-name">所属项目</div>
          <el-input class="erpsearchinput" placeholder="请输入所属项目进行查询" size="small" v-model="searchform.ProjectName" clearable @keyup.enter.native="searchtable">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
          </el-input>
        </div>
        <div class="condition">
          <div class="search-name">企业公积金账号</div>
          <el-input class="erpsearchinput" placeholder="请输入企业公积金账号进行查询" size="small" v-model="searchform.bifAccount" clearable @keyup.enter.native="searchtable">
          </el-input>
        </div>
        <div class="condition">
          <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
        </div>
      </div>
      <el-table ref="finalTable" v-if="tabidx==0 && Type==1" key="1" v-loading="tableloading" :data="tableData" :span-method="objectSpanMethod" class="erp-table" tooltip-effect="dark">
        <el-table-column align="center" type="index" width="80" fixed label="序号" />
        <el-table-column align="center" prop="Account" label="企业公积金账号" min-width="150" />
        <el-table-column align="center" prop="ProjectName" label="项目" min-width="150" />
        <el-table-column align="center" prop="StaffNum" label="人数" min-width="120" />
        <el-table-column align="center" prop="HouseFundPers" label="个人部分公积金" min-width="150" />
        <el-table-column align="center" prop="HouseFundEnt" label="企业部分公积金" min-width="150" />
        <el-table-column align="center" prop="Remark" label="备注" min-width="200" />
      </el-table>
      <el-table ref="finalTable" v-if="tabidx==0 && Type==0" key="0" v-loading="tableloading" :data="tableData" :span-method="objectSpanMethod1" class="erp-table" tooltip-effect="dark">
        <el-table-column align="center" type="index" width="80" fixed label="序号" />
        <el-table-column align="center" prop="ProjectName" label="项目" min-width="150" />
        <el-table-column align="center" prop="Account" label="企业公积金账号" min-width="150" />
        <el-table-column align="center" prop="StaffNum" label="人数" min-width="120" />
        <el-table-column align="center" prop="HouseFundPers" label="个人部分公积金" min-width="150" />
        <el-table-column align="center" prop="HouseFundEnt" label="企业部分公积金" min-width="150" />
        <el-table-column align="center" prop="Remark" label="备注" min-width="200" />
      </el-table>
      <p v-if="tabidx==1">结算人员公积金总计：{{SettlementTotal | KeepTwo}}元</p>
      <el-table ref="finalTable2" v-if="tabidx==1" key="2" v-loading="tableloading" :data="tableData" class="erp-table" tooltip-effect="dark" show-summary :summary-method="getSummaries" @selection-change="handleSelectionChange">
        <!-- <el-table-column align="center" prop="Id" label="序号" /> -->
        <el-table-column align="center" type="selection" label="" width="80" fixed />
        <el-table-column align="center" prop="StaffName" label="员工姓名" min-width="120" />
        <el-table-column align="center" prop="Sex" label="性别" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.Sex | SexTWO}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="IdCode" label="身份证号码" min-width="150" />
        <el-table-column align="center" prop="Year" label="公积金所属年月" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.Year">{{scope.row.Year}}年{{scope.row.Month}}月</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="TotalPers" label="金额个人部分" min-width="120" />
        <el-table-column align="center" prop="TotalEnt" label="金额企业部分" min-width="120" />
        <el-table-column align="center" prop="TotalAmount" label="合计" min-width="120" />
        <el-table-column align="center" prop="PeriodYear" label="公积金入账年月" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.PeriodYear">{{scope.row.PeriodYear}}年{{scope.row.PeriodMonth}}月</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagina-fonter" v-if="tabidx==1">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div> -->
      <div class="operate-bottom">
        <el-button class="erpbtn" size="small" @click="closeweb">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { GetHouseFundSettleDetailList, GetHouseFundSettleMemberList } from '@/api/CompensationServiceManagement.js'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import filters from '@/utils/filters.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      Id: '',
      Type: 0,
      urlList: [{
        name: '结算单管理',
        router: '/CompensationServiceManagement/FinalStatement'
      }, {
        name: '结算单详情',
        router: ''
      }],
      tablist: [{
        value: 0,
        describe: '公积金结算明细单'
      }, {
        value: 1,
        describe: '公积金结算人员列表'
      }],
      currentPage: 1,
      PageSize: 999,
      total: 0,
      tabidx: 0,
      SettlementTotal: 0,
      tableData: [],
      tableloading: false,
      searchform: {
        ProjectName: '',
        bifAccount: ''
      },
      multipleSelection: [],
      arr: [],
      operating: {},
    }
  },
  created () {
    this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
    this.Id = this.$route.query.id
    this.Type = this.$route.query.type
    this.getHouseFundSettleDetailList()
  },
  methods: {
    // 处理合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 5 || index === 6 || index === 7) {
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
            if (sums[index] > 0) {
              sums[index] = sums[index].toFixed(2)
            }
          } else {
            sums[index] = 'N/A'
          }
        } else if (index === 1) {
          sums[index] = data.length
        } else {
          sums[index] = '--'
        }
      })
      return sums
    },
    choosetab (e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return
      } else {
        // 切换到第一页
        this.tabidx = e.value
        this.currentPage = 1
        if (e.value === 0) {
          this.getHouseFundSettleDetailList()
        } else {
          this.getHouseFundSettleMemberList()
        }
      }
    },
    // 公积金明细
    getHouseFundSettleDetailList () {
      let obj = {
        HouseFundSettleId: this.Id,
        menuid: this.operating.MenuId,
        operationcode: this.operating.OperationCode
      }
      this.tableloading = true
      GetHouseFundSettleDetailList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.tableData = response.Data
            if (this.Type == 1) {
              this.setTable(response.Data, 'BfInsuranceFundId')
            } else {
              this.setTable(response.Data, 'ProjectName')
            }
          } else {
            this.tableData = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          })
        }
        this.tableloading = false
      })
    },
    setTable (data, c) {
      let spanOneArr = []
      let concatOne = 0
      data.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
        } else {
          if (item[c] && item[c] === data[index - 1][c]) { //当前项和前一项比较 
            spanOneArr[concatOne] += 1 //相同值第一个出现的位置，统计需要合并多少行
            spanOneArr.push(0)//新增一个被合并行
          } else {
            spanOneArr.push(1) //否则不合并
            concatOne = index//指向位移
          }
        }
      })
      var obj = {}
      obj[c] = spanOneArr
      this.arr = []
      this.arr.push(obj)
    },
    // 公积金员工
    getHouseFundSettleMemberList () {
      let obj = {
        HouseFundSettleId: this.Id,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        ProjectName: this.searchform.ProjectName,
        bifAccount: this.searchform.bifAccount,
        menuid: this.operating.MenuId,
        operationcode: this.operating.OperationCode
      }
      this.tableloading = true
      this.multipleSelection = []
      GetHouseFundSettleMemberList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.tableData = response.Data
            this.total = response.Total
            for (let i = 0; i < this.tableData.length; i++) {
              this.SettlementTotal += parseFloat(this.tableData[i].TotalAmount)
            }
            this.toggle(this.tableData)
          } else {
            this.tableData = []
            this.total = 0
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          })
        }
        this.tableloading = false
      })
    },
    toggle (data) {
      if (data.length) {
        this.$nextTick(function () {
          data.forEach(item => {
            //multipleTable 是这个表格的ref属性 true为选中状态
            this.$refs.finalTable2.toggleRowSelection(item, true);
          })
        })
      }
    },
    // 合并行
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = this.arr[0].BfInsuranceFundId[rowIndex] //因为rowIndex出现会从1到结尾
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectSpanMethod1 ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = this.arr[0].ProjectName[rowIndex] //因为rowIndex出现会从1到结尾
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    // 选择分页
    handleSizeChange (val) {
      this.PageSize = val;
      this.getHouseFundSettleMemberList();
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getHouseFundSettleMemberList();
    },
    // 搜索
    searchtable () {
      this.getHouseFundSettleMemberList()
    },

    // 关闭页面
    closeweb () {
      window.open('about:blank', '_self').close()
    },
    // 多选
    handleSelectionChange (value) {
      this.multipleSelection = value
      this.SettlementTotal = 0
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.SettlementTotal += parseFloat(this.multipleSelection[i].TotalAmount)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.addumulation-detail-container /deep/ {
  .search-bar {
    // padding: 24px 24px 12px 24px;
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
        .el-input__inner {
          background-color: $erinputbgc;
        }
      }
    }
  }
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .final-statement-content {
    margin-left: 20px;
    border-radius: 0 0 0 8px;
    padding: 20px;
    background-color: #fff;
    .operate-bottom {
      text-align: center;
      margin-top: 24px;
    }
  }
}
</style>