//挂账管理
<template>
  <div class="social-security-management-container">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="所属客户" label-width="80px" v-if="!IsSpending">
            <el-input v-model="searchform.CompanyName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入所属客户查询" />
          </el-form-item>
          <el-form-item label="所属项目" label-width="80px" v-if="!IsSpending">
            <el-input v-model="searchform.ProjectName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入所属项目查询" />
          </el-form-item>
          <el-button class="search-button" size="mini" v-show="!IsSpending" round @click="searchtable">
            搜索
          </el-button>
          <el-button class="search-button" size="mini" v-show="IsSpending" round @click="ReturnCard">
            返回
          </el-button>
          <h2 v-show="IsSpending">挂账收支明细</h2>
        </el-form>

      </div>
    </div>
    <div class="content">
      <div class="tab clearfix" v-show="IsSpending">
          <div class="tab-name" v-for="(item, index) in ChargeStatus" :key="index" :class="{active:tabidx==item.value}" @click="chooseschedule(item.value)">{{ item.describe }}</div>
    </div>
      <div class="operate-top" v-if="!IsSpending">
        <el-button size="small" class="erpbtn" @click="OpenAddCard('Add')">添加挂账</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" v-if="!IsSpending" :data="CardList" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="ProjectId" min-width="55" fixed label="序号" />
          <!-- <el-table-column align="center" prop="Title" label="挂账名称" min-width="120" show-overflow-tooltip /> -->
          <el-table-column align="center" prop="ProjectName" label="所属项目" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="CompanyName" label="所属客户" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="StatisticalIncomeAmount" label="挂账总金额" min-width="120">
          <template slot-scope="scope">
                <span>{{scope.row.StatisticalIncomeAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SurplusAmount" label="剩余挂账金额" min-width="120"/>
          <el-table-column align="center" fixed="right" label="操作" min-width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['View']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="LookSpending(scope.row,'View')">查看收支明细</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!-- 支出明细列表 -->
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" v-if="IsSpending" :data="SpendingList" max-height="600" tooltip-effect="dark">
          <el-table-column align="center" prop="ChargeName" v-if="tabidx==0" label="挂账名称" min-width="150"/>
          <el-table-column align="center" prop="CompanyName" label="所属客户" min-width="150" />
          <el-table-column align="center" prop="ProjectName" label="所属项目" min-width="150"/>
          <el-table-column align="center" prop="SettleName" v-if="tabidx==1" label="支出科目" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" prop="Amount" label="金额" min-width="150">
            <template slot-scope="scope">
                <span>{{scope.row.Amount}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Year"  v-if="tabidx==0&&IsSpending==true" label="入账年月" min-width="150">
            <template slot-scope="scope">
                <span>{{scope.row.Year+'年'+scope.row.Month+'月'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="StatusText" v-if="tabidx==0" label="状态" min-width="120">
            <template slot-scope="scope">
                <span>{{scope.row.StatusText}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Remark"  v-if="tabidx==0" label="备注" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" prop="Attachment"  v-if="tabidx==1" label="支出明细" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{scope.row.Attachment}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Remark"  v-if="tabidx==1" label="费用说明" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{scope.row.Remark}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" v-if="tabidx==0" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Revoke')" @click.native="Revoke(scope.row,'Revoke' )">撤销</el-dropdown-item>
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
    <!-- 添加挂账窗口 -->
    <AddCard :showAddCard="showAddCard" :tempData="tempData" :dialogTitle="dialogTitle" @AddCardSave="AddCardSave" @closeAddCardSave="closeAddCardSave"></AddCard>
    <!-- 添加挂账支出窗口 -->
    <AddSpend :showAddSpend="showAddSpend" :tempID="tempID" :dialogTitle="dialogTitle" @AddSpendSave="AddSpendSave" @closeAddSpendSave="closeAddSpendSave"></AddSpend>
  </div>
</template>

<script>
// import { GetMoneyRecordPageList } from '@/api/FinancialManagement.js'
import { AddChargeIncome,RevenueChargeIncome, GetChargeStatisticalPageList,GetChargeExpensePageList, EditOnCredit, GetChargeIncomePageList, AddOnCreditIdExpense, GetOnCreditDetailed,RevokeOnCredit,DeleteOnCreditIdExpense } from '@/api/CompensationServiceManagement.js'
import { MenuIdDate, showLoading, hideLoading, uuid } from '@/utils/CustomValidation'
import AddCard from './components/AddCard.vue'
import AddSpend from './components/AddSpend.vue'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    AddCard,
    AddSpend
  },
  data () {
    return {
      searchform: {
        CompanyName: '',
        ProjectName: '',
        // Title: '',
        YearMonth: '',
        Year: '',
        Month: '',
      },
      ChargeStatus:[{
        value:0,
        describe:'添加挂账'
      },{
        value:1,
        describe:'挂账支出'
      }],
      tabidx:0,
      currentPage: 1,
      PageSize: 10,
      total: 0,
      AccountList: [],
      CardList: [],
      tableloading: false, // 加载动画
      showAddCard: false,
      dialogTitle: '添加挂账账户',
      tempData: {},
      tempID: null,
      LookSpendId: '',
      showAddSpend: false,
      IsSpending: false,
      SpendingList: [],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      }
    }
  },
   watch:{
    tabidx(){
    this.getSpendList()
    }
   },
  created () {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getCardList(this.operatiOBj)
    }
  },
  methods: {
    //撤销
    Revoke(data,str){
      const operating = this.$operatedata(this.operates, str)
      this.$confirm('此操作将撤销该列表的挂账信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       let obj = {
          Id: data.Id,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        RevenueChargeIncome(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '撤销挂账成功!'
            })
            this.getSpendList()
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
    //删除挂账支出
    deleteData(data){
this.$confirm('此操作将删除该列表的挂账信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(data);
        let obj = {
          OnCreditId:data.OnCreditId,
          ExpenseIdArr:data.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        DeleteOnCreditIdExpense(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除挂账成功!'
            })
            this.getSpendList()
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
    //撤销挂账
    RevokeCredit(data,str){
      this.$confirm('此操作将撤销挂账信息, 是否继续?', '提示', {
        message:`可挂账金额为:\t`+data.AvailableAmount+'\t￥',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const operating = this.$operatedata(this.operates, str)
        let obj = {
          Id: data.Id,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        showLoading()
        RevokeOnCredit(qs.stringify(obj)).then(response => {
        hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '撤销挂账成功!'
            })
            this.getCardList(this.operatiOBj)
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
          message: '已取消撤销'
        })
      })
    },
    searchtable () {
      this.currentPage = 1
      this.PageSize = 10
      this.total = 0
      if (this.IsSpending) {
        this.getSpendList()
      } else {
        this.getCardList(this.operatiOBj)
      }

    },
    //切换类型
    chooseschedule(e){
      this.tabidx = e
      this.currentPage = 1
    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      if (this.IsSpending) {
        this.getSpendList()
      } else {
        this.getCardList(this.operatiOBj)
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.IsSpending) {
        this.getSpendList()
      } else {
        this.getCardList(this.operatiOBj)
      }
    },
    // 获取列表详情
    getCardList (operat) {
      this.tableloading = true
      let data = {
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize,
        CompanyName: this.searchform.CompanyName,
        ProjectName: this.searchform.ProjectName,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      GetChargeStatisticalPageList(qs.stringify(data)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.CardList = response.Data
            this.total = response.Total
          } else {
            this.CardList = []
            this.total = 0
          }
        } else {
          this.CardList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //获取明细支出列表
    getSpendList () {
      let obj = {
        ProjectId: this.LookSpendId,
        menuid: MenuIdDate(),
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        operationcode: '1'
      }
      if(this.tabidx==0){
        showLoading()
        GetChargeIncomePageList(obj).then(res=>{
          hideLoading()
          if(res.MessageCode==0&&res.Data.length>0){
            this.SpendingList=res.Data
            this.total=res.Total
          }else{
            this.SpendingList=[]
          }
        })
      }else if(this.tabidx==1){
        showLoading()
        GetChargeExpensePageList(obj).then(res=>{
          hideLoading()
          if(res.MessageCode==0&&res.Data.length>0){
            this.SpendingList=res.Data
            this.total=res.Total
          }else{
            this.SpendingList=[]
          }
        })
      }
    },
    //打开添加挂账
    OpenAddCard (str) {
      this.dialogTitle = '添加挂账'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.showAddCard = true
    },
    //保存开户信息
    AddCardSave (data) {
      showLoading()
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      if (data.ProjectId) {
        AddChargeIncome(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '添加挂账信息成功!'
            })
            this.showAddCard = false
            this.getCardList(this.operatiOBj)
          } else {
            this.$message({
              type: 'error',
              message: response.MessageContent
            })
          }
        })
      }
    },
    //删除挂账
    // DelCard (data, str) {
    //   this.$confirm('此操作将删除该列表的挂账信息, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     const operating = this.$operatedata(this.operates, str)
    //     let obj = {
    //       IdArr: data.Id,
    //       menuid: operating.MenuId,
    //       operationcode: operating.OperationCode
    //     }
    //     showLoading()
    //     DeleteOnCredit(qs.stringify(obj)).then(response => {
    //       hideLoading()
    //       if (response.IsSuccess) {
    //         this.$message({
    //           type: 'success',
    //           message: '删除挂账成功!'
    //         })
    //         this.getCardList(this.operatiOBj)
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: response.MessageContent
    //         })
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    //添加挂账支出
    AddSpending (data, str) {
      this.dialogTitle = '添加挂账支出'
      this.tempID = data.Id
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.showAddSpend = true
    },
    //查看挂账支出明细
    LookSpending (data) {
      this.IsSpending = true
      this.LookSpendId = data.ProjectId
      this.searchtable()
    },
    ReturnCard () {
      this.IsSpending = false
      this.tabidx=0
      this.searchtable()
    },
    //保存添加挂账
    AddSpendSave (data) {
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      showLoading()
      AddOnCreditIdExpense(qs.stringify(data)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加挂账支出成功!'
          })
          this.showAddSpend = false
          this.getCardList(this.operatiOBj)
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //关闭添加挂账支出
    closeAddSpendSave (val) {
      this.showAddSpend = val
    },
    // 关闭开户窗口
    closeAddCardSave (val) {
      this.showAddCard = val
    }

  }
}
</script>

<style lang="scss" scoped>
.social-security-management-container {
  h2{
    display: inline-block;
    margin: 0px 0px 0px 20px;
    font-size: 27px;
  }
  .operate-top {
    float: right;
    margin-bottom: 16px;
  }
  .content {
    background-color: #fff;
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
    .el-table__fixed-right-patch {
    background-color: $tableHeader;
    border-radius: 0 8px 8px 0;
  }
    .tab {
   padding-left: 0px;
   margin-bottom: 10px;
  }
    .operate-bottom {
      margin-top: 32px;
      padding-left: 16px;
    }
    .pagina-fonter {
      margin-top: 24px;
    }
  }
}
</style>