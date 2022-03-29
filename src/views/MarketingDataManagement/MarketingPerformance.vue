<!-- 营销业绩统计 -->
<template>
  <div class="market-performance-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">自定义时间段</div>
        <el-date-picker v-model="date" size="small" class="erpdatepicker" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <span class="tip">默认展示本周</span>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="card-container" v-loading="tableloading">
      <div class="card-box">
        <div class="card-title">
          <svg-icon icon-class="market"></svg-icon>
          <div class="name">{{cardlist[0].title}}</div>
        </div>
        <div class="card-content">
          <span class="cardnum">{{cardlist[0].num}}</span>
          <span class="unit">￥</span>
        </div>
      </div>
      <div class="card-line"></div>
      <div class="card-box">
        <div class="card-title">
          <svg-icon icon-class="order"></svg-icon>
          <div class="name">{{cardlist[1].title}}</div>
        </div>
        <div class="card-content">
          <span class="cardnum">{{cardlist[1].num}}</span>
          <span class="unit">单</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" tooltip-effect="dark" @expand-change="expandchange">
          <el-table-column align="center" type="expand" width="100" label="">
            <template slot-scope="scope">
              <div class="bgc-box">
                <el-table :data="scope.row.ProjectPerformanceAllocationInfoList" :span-method="objectSpanMethod" class="graytable">
                  <!-- <el-table-column align="center" prop="rankindex" label="排名" /> -->
                  <el-table-column align="center" prop="SysUserName" label="人员名称" />
                  <el-table-column align="center" prop="arry" label="新增订单数">
                    <template slot-scope="scopes">
                      {{scopes.row.arry | arrymap}}
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="OrgName" label="所属部门" />
                  <el-table-column align="center" prop="" label="业务类型">
                    <template slot-scope="scopes">
                      {{scope.row.BusinessTypeText}}
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="ProjectName" label="对应项目" />
                  <el-table-column align="center" prop="Achievement" label="新增业绩额(￥)" />
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="OrderNumber" width="100" label="排名" />
          <el-table-column align="center" prop="BusinessTypeText" label="业务名称" />
          <el-table-column align="center" prop="ContractNumber" label="新增订单数" />
          <el-table-column align="center" prop="TotalAmount" label="新增业绩额" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="watchperson(scope.row, scope.$index)">查看人员明细</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { GetMarketingStatisticsInfo } from '@/api/MarketingDataManagement.js'
import qs from 'qs'
import filters from '@/utils/filters.js'
import { MenuIdDate, getWeekStartDate } from '@/utils/CustomValidation.js'
export default {
  filters: {
    arrymap (value) {
      let array = []
      if (value && value.length) {
        array = [...new Set(value)]
      }
      return array.length
    }
  },
  data () {
    return {
      date: [],
      cardlist: [{
        title: '新增项目销售总额',
        num: 0
      }, {
        title: '新增订单数',
        num: 0
      }],
      tableloading: false,
      tableData: [],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    this.date[0] = getWeekStartDate()
    this.date[1] = new Date()
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getMarketingStatisticsInfo(this.operatiOBj)
    }
  },
  methods: {
    searchtable () {
      this.currentPage = 1
      this.getMarketingStatisticsInfo(this.operatiOBj)
    },
    // 获取数据详情
    getMarketingStatisticsInfo (operat) {
      let obj = {
        StartTime: this.date[0],
        EndTime: this.date[1],
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      this.tableloading = true
      GetMarketingStatisticsInfo(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data) {
            // 处理表格数据 处理合并数据
            for (let i = 0; i < response.Data.GetMarketingStatisticsInfoList.length; i++) {
              for (let j = 0; j < response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList.length; j++) {
                response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].num = 0
                response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].srot = 0
                // 订单数根据人员名称 相加 项目相同就算一次
                response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].arry = []
                for (let k = 0; k < response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList.length; k++) {
                  if (response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].SysUserId === response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[k].SysUserId) {
                    response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].num++
                    response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].srot++
                    response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].arry.push(response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[k].ProjectId)
                  }
                }
              }
            }
            // 处理合并之后 num值 符合element表格合并的数据格式
            for (let i = 0; i < response.Data.GetMarketingStatisticsInfoList.length; i++) {
              let obj = {}
              // let index = 0
              let rankindex = 1
              for (let j = 0; j < response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList.length; j++) {
                if (obj.SysUserId === response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].SysUserId && obj.srot === response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].srot) {
                  response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].num = 0
                }
                if (response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].srot > 1) {
                  obj = response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j]
                }
                // if (response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].num !== 0) {
                //   index ++
                //   response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].index = index
                // }
                // 比较排序
                // response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].rankindex = rankindex
                // for (let k = 0; k < response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList.length; k++) {

                //   if (response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].num !== 0) {
                //     console.log(response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].Achievement);
                //     console.log(response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[k].Achievement);
                //     if (response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].Achievement < response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[k].Achievement) {
                //       response.Data.GetMarketingStatisticsInfoList[i].ProjectPerformanceAllocationInfoList[j].rankindex ++
                //     }
                //   }
                // }
              }
            }
            // 
            this.tableData = response.Data.GetMarketingStatisticsInfoList
            this.cardlist = [{
              title: '新增销售总额',
              num: response.Data.SumTotalAmount
            }, {
              title: '新增订单数',
              num: response.Data.SumContractNumber
            }]
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 查看人员明细
    watchperson (e, i) {
      this.$refs.multipleTable.toggleRowExpansion(e, true)
    },
    expandchange (e, expandedRows) {
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 1 || columnIndex == 2) {
        if (row.num > 0) {
          return {
            rowspan: row.num,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 1
          };
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.market-performance-container /deep/ {
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
      .erpdatepicker {
        width: 240px;
      }
      .tip {
        font-size: $f14;
        color: $erp999;
        margin-left: 7px;
      }
      .el-input {
        display: inline-block;
        width: 216px;
      }
    }
  }
  .card-container {
    width: 100%;
    display: flex;
    height: 78px;
    padding: 27px 0;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 24px;
    margin-left: 24px;
    .card-box {
      flex: 1;
      line-height: 24px;
      display: flex;
      justify-content: center;
      .card-title {
        display: flex;
        align-items: center;
        margin-right: 48px;
        .svg-icon {
          font-size: 24px;
          margin-right: 8px;
        }
        .name {
          font-size: $f14;
          color: $erp333;
          line-height: 24px;
        }
      }
      .card-content {
        color: $erpcolor;
        .cardnum {
          font-size: 24px;
        }
        .unit {
          font-size: $f14;
          margin-left: 8px;
        }
      }
    }
    .card-line {
      width: 2px;
      height: 24px;
      background-color: #ccc;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
  }
  .bgc-box {
    padding: 16px;
    // background-color: #f5f9ff;
  }
  // 内部表格样式
  .el-table__expanded-cell {
    padding: 10px;
  }
}
</style>