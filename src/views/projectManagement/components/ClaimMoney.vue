<!-- 认领回款 -->
<template>
  <div class="claim-money-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">打款客户</div>
        <el-input class="erpsearchinput" placeholder="请输入打款客户进行查询" size="small" v-model="searchform.CompanyName" @keyup.enter.native="searchtable">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" type="index" width="90" label="编号" />
          <el-table-column align="center" prop="CompanyName" min-width="120" label="打款账户" show-overflow-tooltip />
          <el-table-column align="center" prop="CompanyBankName" min-width="150" label="打款客户银行名称" show-overflow-tooltip />
          <el-table-column align="center" prop="CompanyAccount" min-width="150" label="打款客户银行账号" show-overflow-tooltip />
          <el-table-column align="center" prop="BfCompanyName" min-width="140" label="收款企业" show-overflow-tooltip />
          <el-table-column align="center" prop="Amount" width="100" label="流水金额" />
          <el-table-column align="center" prop="ReceiveAmount" width="100" label="已认领金额" />
          <el-table-column align="center" prop="UsedAmount" width="100" label="待认领金额" />
          <!-- <el-table-column align="center" prop="" label="用途" /> -->
          <el-table-column align="center" prop="SysUserName" width="100" label="添加流水人" />
          <!-- <el-table-column align="center" prop="StatusText" width="55" label="状态" /> -->
          <el-table-column align="center" prop="PayTime" width="120" label="打款时间">
            <template slot-scope="scope">
              <span>{{scope.row.PayTime | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="AddTime" width="120" label="添加时间">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" width="80" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-show="scope.row.UsedAmount>0">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <!-- <el-dropdown-item @click.native="noclaim(scope.row)">标记为无需认领</el-dropdown-item> -->
                    <el-dropdown-item v-show="scope.row.UsedAmount>0" @click.native="claim(scope.row)">认领回款</el-dropdown-item>
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
    <div class="dialog">
      <dialogclaim :title="claimtitle" :visible="claimvisible" :contentdata="contentdata" @saveclaim="saveclaim" @closedialog="closedialog"></dialogclaim>
    </div>
  </div>
</template>

<script>
import dialogclaim from './dialog-claim.vue'
import { AddProjectMoneyDraw } from '@/api/projectManagement.js'
import { GetMoneyRecordPageList } from '@/api/FinancialManagement.js'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import filters from '@/utils/filters.js'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    dialogclaim
  },
  data () {
    return {
      urlList: [{
        name: '项目管理',
        router: '/projectManagement/ProjectManagement'
      }, {
        name: '项目详情',
        router: '/projectManagement/ProjectDetail?Id=9'
      }, {
        name: '认领回款',
        router: ''
      }],
      tableloading: false,
      tableData: [],
      searchform: {
        CompanyName: '',
        BfCompanyName: '',
        SysUserName: ''
      },
      PageSize: 10,
      currentPage: 1,
      total: 0,
      Id: '',
      MoneyRecordId: '', // 回款流水Id
      CompanyId: '',
      claimtitle: '',
      claimvisible: false,
      contentdata: {},
    }
  },
  created () {
    this.Id = this.$route.query.id
    this.CompanyId = this.$route.query.CompanyId
    // 根据缓存判断面包屑
    let breadpath = JSON.parse(window.localStorage.getItem('breadpath')) || {}
    if (breadpath.router) {
      this.urlList[1] = breadpath
    }
    this.getMoneyRecordPageList()
  },
  methods: {
    // 获取回款列表
    getMoneyRecordPageList () {
      let obj = {
        CompanyId: this.CompanyId,
        CompanyName: this.searchform.CompanyName,
        BfCompanyName: this.searchform.BfCompanyName,
        SysUserName: this.searchform.SysUserName,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      GetMoneyRecordPageList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          this.tableData = response.Data
          this.total = response.Total
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    searchtable () {
      this.currentPage = 1
      this.getMoneyRecordPageList()
    },
    // 标记为不认领
    noclaim () {

    },
    // 认领
    claim (e) {
      this.MoneyRecordId = e.Id
      this.contentdata.UsedAmount = e.UsedAmount
      this.claimtitle = '认领款项额度'
      this.claimvisible = true
    },
    // 保存认领
    saveclaim (e) {
      console.log(e);
      let obj = {
        MoneyRecordId: this.MoneyRecordId,
        ProjectId: this.Id,
        Year: e.Year,
        Month: e.Month,
        Amount: e.Amount,
        Remark: e.Remark,
        SysUserId: e.SysUserId,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      AddProjectMoneyDraw(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '认领成功',
            type: 'success'
          })
          this.getMoneyRecordPageList()
          this.claimvisible = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 取消认领
    closedialog () {
      this.claimvisible = false
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getMoneyRecordPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getMoneyRecordPageList()
    },
  },
}
</script>

<style lang="scss" scoped>
.claim-money-container {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
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
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
    // .operate-table {
    //   // 右侧菜单栏固定的样式
    //   th.is-leaf {
    //     background: $tableHeader;
    //     font-weight: 700;
    //     color: $erp333;
    //     font-size: $f16;
    //   }
    //   .el-table__header-wrapper {
    //     // height: 56px;
    //     border-radius: 8px;
    //     overflow: hidden;
    //     .has-gutter {
    //       // height: 56px;
    //       th {
    //         line-height: 33px;
    //         background-color: $tableHeader;
    //         font-size: $f16;
    //         color: $erp333;
    //         .cell {
    //           .el-checkbox {
    //             .el-checkbox__inner {
    //               width: 16px;
    //               height: 16px;
    //               border: none;
    //               background-color: #A3B1CC;
    //               &::after {
    //                 border: 2px solid #FFF;
    //                 border-left: 0;
    //                 border-top: 0;
    //                 height: 10px;
    //                 left: 6px;
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   .el-table__body-wrapper {
    //     tr {
    //       td {
    //         .cell {
    //           .el-checkbox {
    //             .el-checkbox__inner {
    //               width: 16px;
    //               height: 16px;
    //               border: none;
    //               background-color: #A3B1CC;
    //               &::after {
    //                 border: 2px solid #FFF;
    //                 border-left: 0;
    //                 border-top: 0;
    //                 height: 10px;
    //                 left: 6px;
    //               }
    //             }
    //           }
    //           .watchcode {
    //             cursor: pointer;
    //             color: $erpcolor;
    //           }
    //         }
    //         &:first-child {
    //           border-radius: 8px 0 0 8px;
    //         }
    //         &:last-child {
    //           border-radius: 0 8px 8px 0;
    //         }
    //       }
    //     }
    //   }
    // }
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