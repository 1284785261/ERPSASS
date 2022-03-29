<!-- 项目数据面板 -->
<template>
  <div class="project-data-board-container">
    <div class="project-title">项目数据看板</div>
    <div class="seatch">
      <div class="shortcut">
        <div class="shortcut-btn" :class="{active: shortindex===item.index}" v-for="(item, index) in shortlist" :key="index" @click="chooseshort(item)">{{item.value}}</div>
      </div>
      <div class="time-box">
        <div class="time-babel">选择时间段</div>
        <el-date-picker class="erpdate" size="small" v-model="StartDate" type="date" placeholder="选择日期"></el-date-picker>
        <el-date-picker class="erpdate" size="small" v-model="EndDate" type="date" placeholder="选择日期"></el-date-picker>
        <el-button size="small" class="erpbtn" @click="searchboard">搜索</el-button>
        <el-button size="small" class="erpbtn" @click="deriveboard">导出</el-button>
      </div>
    </div>
    <div class="project-nav clearfix" v-loading="boardloading">
      <div class="nav-box">
        <svg-icon icon-class="Tobook" class-name="svg-icon" />
        <div class="nav-name">到账金额</div>
        <div class="nav-num">{{boarddata.Amount}}<span class="symbol">元</span></div>
      </div>
      <div class="nav-box">
        <svg-icon icon-class="costof" class-name="svg-icon" />
        <div class="nav-name">成本合计</div>
        <div class="nav-num">{{boarddata.Cost}}<span class="symbol">元</span></div>
      </div>
      <div class="nav-box">
        <svg-icon icon-class="GrossProfit" class-name="svg-icon" />
        <div class="nav-name">毛利</div>
        <div class="nav-num">{{boarddata.GrossProfit}}<span class="symbol">元</span></div>
      </div>
      <div class="nav-box">
        <svg-icon icon-class="receivable" class-name="svg-icon" />
        <div class="nav-name">待回款金额</div>
        <div class="nav-num">{{boarddata.Collecte}}<span class="symbol">元</span></div>
      </div>
      <div class="nav-box">
        <svg-icon icon-class="RecruitmentCosts" class-name="svg-icon" />
        <div class="nav-name">招聘费用</div>
        <div class="nav-num">{{boarddata.Recruitment}}<span class="symbol">元</span></div>
      </div>
      <div class="nav-box">
        <svg-icon icon-class="HavePeople" class-name="svg-icon" />
        <div class="nav-name">已有人数</div>
        <div class="nav-num">{{boarddata.StaffNum}}<span class="symbol">人</span></div>
      </div>
      <div class="nav-box">
        <svg-icon icon-class="newPeople" class-name="svg-icon" />
        <div class="nav-name">累计新增人数</div>
        <div class="nav-num">{{boarddata.Cumulative}}<span class="symbol">人</span></div>
      </div>
      <div class="nav-box">
        <svg-icon icon-class="LostPeople" class-name="svg-icon" />
        <div class="nav-name">累计流失人数</div>
        <div class="nav-num">{{boarddata.LossNum}}<span class="symbol">人</span></div>
      </div>
    </div>
    <div class="project-data-content">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="7">
          <div class="project-data-card">
            <div class="data-title">项目进度</div>
            <el-tooltip popper-class="erptip" effect="dark" :content="boarddata.StatusText" placement="top">
              <el-progress :text-inside="true" :percentage="70" :stroke-width="24" :format="format"></el-progress>
            </el-tooltip>
          </div>
          <div class="project-data-card">
            <div class="data-title time">项目合同有效期倒计时 <span class="red">{{boarddata.SurplusDays}}</span> 天</div>
          </div>
          <div class="project-data-card">
            <div class="data-title time">项目累计垫付次数 <span class="red">{{boarddata.PamentNum}}</span> 次</div>
          </div>
          <div class="project-data-card">
            <div class="data-title time">历史垫资金额 <span class="red">{{boarddata.Totalpayment}}</span> 元</div>
          </div>
          <div class="project-data-card">
            <div class="data-title time">当前垫资金额 <span class="red">{{boarddata.Currentpayment}}</span> 元</div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
          <Revenuepie :piedata="piedata"></Revenuepie>
        </el-col>
      </el-row>
    </div>
    <div class="project-table">
      <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
        <el-table-column align="center" prop="Year" label="月份">
          <template slot-scope="scope">
            <span v-if="scope.row.Year && scope.row.Month">{{scope.row.Year}}年{{scope.row.Month}}月</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Amount" label="到账金额" />
        <el-table-column align="center" prop="StaffNum" label="薪酬发放人数" />
        <el-table-column align="center" prop="ShouldSalary" label="应发工资" />
        <el-table-column align="center" prop="Insurance" label="社保" />
        <el-table-column align="center" prop="Unexpect" label="意外险/雇主责任险" />
        <el-table-column align="center" prop="NoHealth" label="残保金福利" />
        <el-table-column align="center" prop="Labor" label="劳保用品" />
        <el-table-column align="center" prop="Tax" label="票面税金" />
        <el-table-column align="center" prop="Cost" label="成本合计" />
        <el-table-column align="center" prop="MgrFee" label="管理费" />
        <el-table-column align="center" prop="Balance" label="本月结余" />
        <el-table-column align="center" prop="OnCredit" label="本月挂账" />
        <el-table-column align="center" prop="ActualInsuranceFun" label="实际转出社保款" />
        <el-table-column align="center" prop="Cumulative" label="项目招聘入职人数" />
        <el-table-column align="center" prop="Recruit" label="招聘费用" />
      </el-table>
    </div>
  </div>
</template>

<script>
import Revenuepie from './Revenuepie.vue'
import { GetProjectBoardList, GetProjectBoard, GrossProfitList, ExportProjectBoard } from '@/api/projectManagement.js'
import { getMonthTime, getLastMonthStartDate, getLastMonthEndDate, getQuarterStartDate, getQuarterEndDate, getLastQuarterStartDate, getLastQuarterEndDate } from '@/utils/CustomValidation.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import filters from '@/utils/filters.js'
import qs from 'qs'
export default {
  components: {
    Revenuepie
  },
  data () {
    return {
      Id: '',
      StartDate: '',
      EndDate: '',
      boarddata: {},
      tableData: [],
      tableloading: false,
      piedata: [],
      shortlist: [{
        index: 0,
        value: '近一年'
      }, {
        index: 1,
        value: '近半年'
      }, {
        index: 2,
        value: '近一季度'
      }, {
        index: 3,
        value: '近一月'
      }],
      shortindex: 0,
      boardloading: false,
    }
  },
  created () {
    // this.StartDate = getMonthTime()
    // this.EndDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    let nowdate = new Date()
    let date = new Date(nowdate.getFullYear(), 12, 0).Format('yyyy/MMM/dd')
    if (nowdate.Format('yyyy/MMM/dd') === date) {
      this.StartDate = new Date(nowdate.getFullYear(), 0, 1)
      this.EndDate = date
    } else {
      this.StartDate = new Date(nowdate.getFullYear() - 1, 0, 1)
      this.EndDate = new Date(nowdate.getFullYear() - 1, 12, 0)
    }
    this.Id = this.$route.query.Id
    this.getProjectBoardList()
    this.getProjectBoard()
    this.grossProfitList()
  },
  methods: {
    format (percentage) {
      if (this.boarddata.Status === 0) {
        return '跟单中'
      } else if (this.boarddata.Status === 1) {
        return '签约失败'
      } else if (this.boarddata.Status === 2) {
        return '签约完成'
      } else if (this.boarddata.Status === 3) {
        return '待审批'
      } else if (this.boarddata.Status === 4) {
        return '审批未通过'
      } else if (this.boarddata.Status === 5) {
        return '待服务'
      } else if (this.boarddata.Status === 6) {
        return '服务中'
      } else if (this.boarddata.Status === 7) {
        return '服务已完成'
      } else if (this.boarddata.Status === 8) {
        return '服务已暂停'
      } else if (this.boarddata.Status === 9) {
        return '服务已取消'
      }
    },
    // 搜索
    searchboard () {
      this.getProjectBoardList()
      this.getProjectBoard()
      this.grossProfitList()
    },
    // 导出
    deriveboard () {
      let obj = {
        ProjectId: this.Id,
        StartDate: this.StartDate,
        EndDate: this.EndDate,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      ExportProjectBoard(qs.stringify(obj)).then(response => {
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
    },
    getProjectBoardList () {
      let obj = {
        ProjectId: this.Id,
        StartDate: this.StartDate,
        EndDate: this.EndDate,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      GetProjectBoardList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          this.tableData = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    getProjectBoard () {
      let obj = {
        ProjectId: this.Id,
        StartDate: this.StartDate,
        EndDate: this.EndDate,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.boardloading = true
      GetProjectBoard(qs.stringify(obj)).then(response => {
        this.boardloading = false
        if (response.IsSuccess) {
          this.boarddata = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    grossProfitList () {
      let obj = {
        ProjectId: this.Id,
        StartDate: this.StartDate,
        EndDate: this.EndDate,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GrossProfitList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.piedata = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 选择时间段
    chooseshort (e) {
      this.shortindex = e.index
      if (e.index === 0) {
        // 判断今天是不是今年最后一天
        let nowdate = new Date()
        let date = new Date(nowdate.getFullYear(), 12, 0).Format('yyyy/MMM/dd')
        if (nowdate.Format('yyyy/MMM/dd') === date) {
          this.StartDate = new Date(nowdate.getFullYear(), 0, 1)
          this.EndDate = date
        } else {
          this.StartDate = new Date(nowdate.getFullYear() - 1, 0, 1)
          this.EndDate = new Date(nowdate.getFullYear() - 1, 12, 0)
        }
      } else if (e.index === 1) {
        // 判断今天是不是半年的最后一天
        let nowdate = new Date()
        let date1 = new Date(nowdate.getFullYear(), 6, 0)
        let date2 = new Date(nowdate.getFullYear(), 12, 0)
        let date = new Date(new Date().Format('yyyy/MMM/dd')).getTime()
        if (date < date1.getTime()) {
          // 查询上一年时间
          this.StartDate = new Date(nowdate.getFullYear() - 1, 6, 1)
          this.EndDate = new Date(nowdate.getFullYear() - 1, 12, 0)
        } else if (date < date2.getTime()) {
          // 查询今年上半年
          this.StartDate = new Date(nowdate.getFullYear(), 0, 1)
          this.EndDate = new Date(nowdate.getFullYear(), 6, 0)
        } else if (date === date2.getTime()) {
          // 查询今天下半年
          this.StartDate = new Date(nowdate.getFullYear(), 6, 1)
          this.EndDate = new Date(nowdate.getFullYear(), 12, 0)
        }
      } else if (e.index === 2) {
        // 判断今天是不是这个季度最后一天
        let date = getQuarterEndDate()
        if (date === new Date().Format('yyyy-MMM-dd')) {
          this.StartDate = new Date(getQuarterStartDate())
          this.EndDate = new Date(getQuarterEndDate())
        } else {
          this.StartDate = getLastQuarterStartDate()
          this.EndDate = getLastQuarterEndDate()
        }
      } else if (e.index === 3) {
        // 判断今天是不是这个月最后一天
        if (new Date().Format('yyyy/MMM/dd') === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).Format('yyyy/MMM/dd')) {
          this.StartDate = getMonthTime()
          this.EndDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        } else {
          this.StartDate = getLastMonthStartDate()
          this.EndDate = getLastMonthEndDate()
        }
      }
      this.getProjectBoardList()
      this.getProjectBoard()
      this.grossProfitList()
    },
  },
}
</script>

<style lang="scss" scoped>
.project-data-board-container /deep/ {
  padding: 24px;
  .project-title {
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
  .seatch {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .shortcut {
      display: flex;
      min-width: 352px;
      margin-bottom: 24px;
      .shortcut-btn {
        background-color: $erinputbgc;
        border-radius: 8px;
        color: $erpplaceholder;
        margin-right: 16px;
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        cursor: pointer;
        &.active {
          background-color: $erpcolor;
          color: #fff;
        }
      }
    }
    .time-box {
      display: flex;
      margin-bottom: 24px;
      .time-babel {
        line-height: 32px;
        font-size: $f14;
        color: $erp333;
      }
      .erpdate {
        width: 160px;
        margin-left: 8px;
        .el-input__inner {
          border-color: transparent;
          background-color: $erinputbgc;
        }
      }
      .erpbtn {
        margin-left: 16px;
      }
    }
  }
  .project-nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .nav-box {
      // float: left;
      width: 144px;
      height: 144px;
      border-radius: 8px;
      background-color: $erinputbgc;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 24px;
      margin-bottom: 24px;
      .svg-icon {
        margin-bottom: 20px;
        font-size: 24px;
      }
      .nav-name {
        font-size: $f14;
        color: $erp999;
        margin-bottom: 14px;
      }
      .nav-num {
        color: $erp333;
        font-size: 20px;
        > span {
          color: #1588f8;
          font-size: 14px;
          margin-left: 8px;
        }
      }
    }
  }
  .project-data-content {
    .project-data-card {
      background-color: $erinputbgc;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 24px;
      &.flex {
        display: flex;
        .data-left {
          width: 50%;
          .echart-line {
            display: flex;
            font-size: $f14;
            line-height: 32px;
            align-items: center;
            .ring {
              width: 16px;
              height: 16px;
              border-radius: 8px;
              margin-right: 7px;
              &.c2DD15C {
                background-color: #2dd15c;
              }
              &.c1588F8 {
                background-color: #1588f8;
              }
              &.cFFAD0A {
                background-color: #ffad0a;
              }
              &.cFF5D62 {
                background-color: #ff5d62;
              }
            }
          }
        }
        .data-right {
          flex: 1;
        }
      }
      .data-title {
        font-size: $f14;
        color: $erp333;
        > span {
          color: $erpred;
          font-size: 24px;
          display: inline-block;
          padding: 0 24px;
          height: 100%;
          line-height: 24px;
        }
        &.time {
          line-height: 24px;
          padding: 16px 0;
        }
      }
      .el-progress {
        margin: 40px 0 16px 0;
      }
    }
  }
}
</style>