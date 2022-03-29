//营销提成统计
<template>
  <div class="social-security-management-container">
    <div class="search-bar clearfix">
      <div class="condition" v-if="!ShowSalaryDetail">
        <div class="search-name">员工姓名</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入员工姓名查询" size="small" v-model="searchform.SysUserName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition" v-if="!ShowSalaryDetail">
        <div class="search-name">计提时间段</div>
        <el-date-picker v-model="searchform.periodOf" class="period" value-format="yyyy-MM" type="monthrange" start-placeholder="开始月份" end-placeholder="结束月份">
        </el-date-picker>
      </div>
      <div class="condition" v-if="!ShowSalaryDetail">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top" v-if="!ShowSalaryDetail">
        <el-button size="small" v-if="$operatebtn(operates, 'Add')" class="erpbtn" @click="OpenAddCollection('Add')">生成员工提成</el-button>
      </div>
      <div class="operate-top" v-if="ShowSalaryDetail">
        <el-button size="small" class="erpbtn" @click="ReturnDetail">返回</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" v-if="!ShowSalaryDetail" class="erp-table" key="table1" v-loading="tableloading" :data="CommissionList" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" prop="Id" min-width="55" fixed label="序号" />
          <el-table-column align="center" prop="SysUserName" label="提成员工" min-width="120" />
          <el-table-column align="center" prop="StartYear" label="提成起始年月" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.StartYear}}/{{scope.row.StartMonth | Month}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="EndYear" label="提成截止年月" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.EndYear}}/{{scope.row.EndMonth | Month}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Status" label="发放状态" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.Status == 0">待发放</span>
              <span v-if="scope.row.Status == 1">已发放</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="OperatorName" label="提成计算人" min-width="120" />
          <el-table-column align="center" prop="Remark" label="备注" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" prop="AddTime" label="计算时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="LookMarketing(scope.row,'View')">查看提成明细</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="EditMarketing(scope.row,'Modify')">修改</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Export')" @click.native="ExportSubsidiary(scope.row,'Export')">导出明细</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="DeteleMarketing(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>

        <el-table ref="multipleTable" v-if="ShowSalaryDetail" class="erp-table" key="table2" v-loading="tableloading" :data="CommissionDetail" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" prop="Id" min-width="55" fixed label="序号" />
          <el-table-column align="center" prop="ProjectName" label="项目名称" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" prop="MoneyDate" label="到账时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.MoneyDate | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Amount" label="到账金额(￥)" min-width="150" />
          <el-table-column align="center" prop="Achieve" label="业绩收入(￥)" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.Show">{{scope.row.Achieve}}</span>
              <el-input v-else class="erpsearchinput tableInput" clearable size="small" v-model="scope.row.Achieve" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Tax" label="税金及附加(￥)" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.Show">{{scope.row.Tax}}</span>
              <el-input v-else class="erpsearchinput tableInput" clearable size="small" v-model="scope.row.Tax" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Cost" label="财务费用(￥)" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.Show">{{scope.row.Cost}}</span>
              <el-input v-else class="erpsearchinput tableInput" clearable size="small" v-model="scope.row.Cost" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="RiskScale" label="风险金比例(%)" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.Show">{{scope.row.RiskScale}}</span>
              <el-input v-else class="erpsearchinput tableInput" clearable size="small" v-model="scope.row.RiskScale" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="RiskAmount" label="风险金金额(￥)" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.Show">{{scope.row.RiskAmount}}</span>
              <el-input v-else class="erpsearchinput tableInput" clearable size="small" v-model="scope.row.RiskAmount" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="RealAchieve" label="实际计提业绩(￥)" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.Show">{{scope.row.RealAchieve}}</span>
              <el-input v-else class="erpsearchinput tableInput" clearable size="small" v-model="scope.row.RealAchieve" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="CommScale" label="提成比例(%)" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.Show">{{scope.row.CommScale}}</span>
              <el-input v-else class="erpsearchinput tableInput" clearable size="small" v-model="scope.row.CommScale" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Commission" label="提成金额(￥)" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.Show">{{scope.row.Commission}}</span>
              <el-input v-else class="erpsearchinput tableInput" clearable size="small" v-model="scope.row.Commission" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SignDate" label="签单时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.SignDate | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Remark" label="备注" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" prop="AddTime" label="生成时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <span title="修改" v-if="!scope.row.Show" @click="EditMarkeDetail(scope.$index)" class="buttons-scope"><i class="el-icon-edit-outline"></i></span>
              <span title="保存" v-if="scope.row.Show" @click="SaveMarkeDetail(scope.row,scope.$index)" class="buttons-scope"><i class="el-icon-document"></i></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>

      <!-- 生成员工提成 -->
      <OpenStaffCommission :showStaffCommission="showStaffCommission" :tempData="tempData" :StaffCommissionTitle="StaffCommissionTitle" @StaffCommissionSave="StaffCommissionSave" @closeStaffCommission="closeStaffCommission"></OpenStaffCommission>
    </div>
  </div>
</template>
<script>
import { GetCommissionPageList, GetCommissionInfo, AddCommission, EditCommission, DeleteCommission, GetCommissionDetailList, EditCommissionDetail, ExportCommissionDetail } from '@/api/MarketingDataManagement.js'
import OpenStaffCommission from './components/OpenStaffCommission.vue'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    OpenStaffCommission
  },
  data () {
    return {
      searchform: {
        SysUserName: '',
        periodOf: [],
        StartDate: '',
        EndDate: '',
        CommissionId: ''
      },
      currentPage: 1,
      PageSize: 10,
      total: 0,
      CommissionList: [],
      CommissionDetail: [],
      tableloading: false, // 加载动画
      showStaffCommission: false,
      StaffCommissionTitle: '',
      ShowSalaryDetail: false,
      tempData: {},
      checked: false,
      ShowclaimList: false,
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
  created () {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getMarketmulation(this.operatiOBj)
    }
  },
  methods: {
    searchtable () {
      this.currentPage = 1
      this.PageSize = 10
      this.total = 0
      this.getMarketmulation(this.operatiOBj)
    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      if (this.ShowSalaryDetail) {
        this.SalaryDetail()
      } else {
        this.getMarketmulation(this.operatiOBj)
      }

    },
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.ShowSalaryDetail) {
        this.SalaryDetail()
      } else {
        this.getMarketmulation(this.operatiOBj)
      }
    },
    //获取公司银行开户列表数据
    getMarketmulation (operat) {
      this.tableloading = true
      let data = {
        SysUserName: this.searchform.SysUserName,
        StartDate: this.searchform.periodOf && this.searchform.periodOf.length > 0 ? this.searchform.periodOf[0] : '',
        EndDate: this.searchform.periodOf && this.searchform.periodOf.length > 0 ? this.searchform.periodOf[1] : '',
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      console.log(JSON.stringify(data));

      GetCommissionPageList(qs.stringify(data)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.CommissionList = response.Data
            this.total = response.Total
          } else {
            this.CommissionList = []
            this.total = 0
          }
        } else {
          this.CommissionList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //查看工资明细
    LookMarketing (data, str) {
      this.searchform.CommissionId = data.Id
      const operating = this.$operatedata(this.operates, str)
      let obj = {
        PageIndex: 1,
        PageSize: this.PageSize,
        CommissionId: this.searchform.CommissionId,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      GetCommissionDetailList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.CommissionDetail = response.Data
            for (let i = 0; i < this.CommissionDetail.length; i++) {
              this.$set(this.CommissionDetail[i], 'Show', false)
            }
            this.total = response.Total
            this.ShowSalaryDetail = true
          } else {
            this.CommissionDetail = []
            this.$message({
              message: '暂无提成明细记录',
              type: 'error'
            })
          }

        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //分页搜索明细
    SalaryDetail () {
      let obj = {
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize,
        CommissionId: this.searchform.CommissionId,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      GetCommissionDetailList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.CommissionDetail = response.Data
            for (let i = 0; i < this.CommissionDetail.length; i++) {
              this.$set(this.CommissionDetail[i], 'Show', false)
            }
            this.total = response.Total
          } else {
            this.CommissionDetail = []
            this.total = 0
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        this.tableloading = false
      })
    },
    //返回提成列表
    ReturnDetail () {
      this.currentPage = 1
      this.ShowSalaryDetail = false
      this.getMarketmulation(this.operatiOBj)
    },
    //导出明细
    ExportSubsidiary (data, str) {
      const operating = this.$operatedata(this.operates, str)
      let obj = {
        CommissionId: data.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      ExportCommissionDetail(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            window.open(response.Data)
          } else {
            this.$message({
              message: '暂无明细数据',
              type: "warning"
            });
          }

        } else {
          this.$message({
            message: response.MessageContent,
            type: "warning"
          });
        }
      })
    },
    //单个修改明细
    EditMarkeDetail (index) {
      this.$set(this.CommissionDetail[index], 'Show', true)
    },
    //保存修改明细
    SaveMarkeDetail (data, index) {
      data.menuid = MenuIdDate()
      data.operationcode = '1'
      EditCommissionDetail(data).then(response => {
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '修改提成明细成功!'
          })
          this.$set(this.CommissionDetail[index], 'Show', false)
          this.SalaryDetail()
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    // 单个删除
    DeteleMarketing (value, str) {
      const operating = this.$operatedata(this.operates, str)
      const obj = {
        IdArr: value.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('此操作将删除该员工提成信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteCommission(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getMarketmulation(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //打开添加收款流水
    OpenAddCollection (str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.StaffCommissionTitle = '生成员工提成'
      this.showStaffCommission = true
    },
    //修改收款流水
    EditMarketing (data, str) {
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.StaffCommissionTitle = '修改员工提成'
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetCommissionInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showStaffCommission = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //保存员工提成信息
    StaffCommissionSave (data) {
      const operating = JSON.parse(localStorage.getItem('operating'))
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      if (data.Id) {
        EditCommission(qs.stringify(data)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改员工提成成功!'
            })
            this.showStaffCommission = false
            this.getMarketmulation(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        AddCommission(qs.stringify(data)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '生成员工提成成功!'
            })
            this.showStaffCommission = false
            this.getMarketmulation(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    // 关闭开户行窗口
    closeStaffCommission (val) {
      this.showStaffCommission = val
    },
    // 表头多选
    handleSelectionChange (value) {
      this.checked = value.length == this.CommissionList.length
      this.multipleSelection = value
    },
    // 下方全选
    batchSelectAll () {
      this.$refs.multipleTable.toggleAllSelection(this.checked)
    },
  }
}
</script>
<style lang="scss" scoped>
.social-security-management-container {
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
        width: 216px;
      }
      .period {
        height: 32px;
        border: 1px solid #fff;
        border-radius: 8px;
        /deep/ .el-input__icon {
          line-height: 24px;
        }
        /deep/ .el-range-separator {
          line-height: 24px;
        }
      }
    }
  }
  .operate-top {
    float: right;
    margin-bottom: 16px;
  }
  .operate-table {
    margin-bottom: 20px;
  }
  .content {
    background-color: #fff;
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
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
.tableInput {
  /deep/ input {
    background: #e0edff;
    border-color: #e0edff;
  }
}
.buttons-scope {
  cursor: pointer;
  i {
    font-size: 24px;
  }
  &:hover {
    color: #1588f8;
  }
}
</style>