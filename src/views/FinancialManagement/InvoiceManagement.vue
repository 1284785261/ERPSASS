<!-- 发票管理 -->
<template>
  <div class="operate-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">发票抬头</div>
        <el-input class="erpsearchinput" placeholder="请输入发票抬头进行查询" clearable size="small" v-model="searchform.InvoiceTitle">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">所属项目</div>
        <el-input class="erpsearchinput" placeholder="请输入所属项目进行查询" clearable size="small" v-model="searchform.ProjectName">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">税号</div>
        <el-input class="erpsearchinput" placeholder="请输入税号进行查询" clearable size="small" v-model="searchform.TaxNo"></el-input>
      </div>
      <div class="condition">
        <div class="search-name">开票申请</div>
        <el-input class="erpsearchinput" placeholder="请输入开票申请进行查询" clearable size="small" v-model="searchform.ApplyUserName"></el-input>
      </div>
      <div class="condition">
        <div class="search-name">开票人</div>
        <el-input class="erpsearchinput" placeholder="请输入开票人进行查询" clearable size="small" v-model="searchform.OperatorName">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" class="addmenu erpbtn" v-if="$operatebtn(operates, 'SignIssue')" @click="markinvoices('SignIssue')">标记为已开具</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" min-width="55" label="全选" fixed="left" />
          <el-table-column align="center" prop="Id" min-width="55" label="编号" />
          <el-table-column align="center" prop="InvoiceTitle" label="发票抬头" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="Amount" label="发票金额(元)" min-width="120" />
          <!-- <el-table-column align="center" prop="" label="税率" /> -->
          <!-- <el-table-column align="center" prop="" label="发票性质" /> -->
          <el-table-column align="center" prop="ProjectName" label="所属项目" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="TaxNo" label="税号" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="ReceipTypeText" label="收款方式" min-width="120" />
          <el-table-column align="center" prop="BfCompanyName" label="开票公司" min-width="150" />
          <el-table-column align="center" prop="ApplyUserName" label="发票申请人" min-width="120" />
          <el-table-column align="center" prop="OperatorName" label="开票受理人" min-width="120" />
          <el-table-column align="center" prop="InvoiceDate" label="开票日期" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.InvoiceDate | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="AddTime" label="申请时间" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="StatusText" label="状态" min-width="120" />
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="watchinvoice(scope.row, 'View')">查看</el-dropdown-item>
                    <!-- <el-dropdown-item v-if="(scope.row.Status===3 || scope.row.Status===4) && $operatebtn(operates, 'Modify')" @click.native="submitinvoice(scope.row, 'Modify')">提交发票凭证</el-dropdown-item> -->
                    <el-dropdown-item v-if="scope.row.Status===3 && $operatebtn(operates, 'SignIssue')" @click.native="markinvoice(scope.row, 'SignIssue')">标记为已开具</el-dropdown-item>
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
      <dialoginvoice :title="invoicetitle" :visible="invoicevisible" :contentdata="invoicedata" @closedialog="closedialog" @savedialog="savedialog"></dialoginvoice>
      <dialogaudit :title="audittitle" :visible="auditvisible" :contentdata="auditdata" @closeauditdialog="closeauditdialog" @savecostaudit="savecostaudit"></dialogaudit>
    </div>
  </div>
</template>

<script>
import { GetInvoiceApplyPageAllList, EditInvoiceApplyStatus, AddFinancialInvoice } from '@/api/FinancialManagement.js'
import dialoginvoice from './components/dialog-invoice.vue'
import dialogaudit from './components/dialog-audit.vue'
import { copy, MenuIdDate } from '@/utils/CustomValidation.js'
import filters from '@/utils/filters.js'
import qs from 'qs'
export default {
  components: {
    dialoginvoice,
    dialogaudit
  },
  data () {
    return {
      searchform: {

      },
      tableloading: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      Id: '', // 发票管理
      Ids: [],
      choosedata: [],
      allchecked: false,

      invoicevisible: false,
      invoicetitle: '',
      invoicedata: {},

      // 提交审核弹框
      audittitle: '提交发票凭证',
      auditvisible: false,
      auditdata: {},
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
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getInvoiceApplyPageList(this.operatiOBj)
    }
  },
  methods: {
    // 获取开票信息列表
    getInvoiceApplyPageList (operat) {
      let obj = {
        InvoiceTitle: this.searchform.InvoiceTitle,
        ProjectName: this.searchform.ProjectName,
        TaxNo: this.searchform.TaxNo,
        ApplyUserName: this.searchform.ApplyUserName,
        OperatorName: this.searchform.OperatorName,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      this.tableloading = true
      GetInvoiceApplyPageAllList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          this.total = response.Total
          this.tableData = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getInvoiceApplyPageList(this.operatiOBj)
    },
    // 查看发票
    watchinvoice (e, op) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))

      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))

      const { href } = this.$router.resolve({
        path: '/FinancialManagement/InvoiceDetail',
        query: {
          id: e.Id
        }
      })
      window.open(href, '_blank')
    },

    // 提交审核
    submitinvoice (e, op) {
      // 操作码
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      this.auditdata = copy(e)
      this.Id = e.Id
      this.auditvisible = true
    },
    closeauditdialog () {
      this.auditvisible = false
    },
    savecostaudit (e) {
      console.log(e);
      const operating = JSON.parse(window.localStorage.getItem('operating'))
      let obj = copy(e)
      obj.InvoiceApplyId = this.Id
      // obj.menuid = operating.MenuId
      // obj.operationcode = operating.OperationCode
      console.log(JSON.stringify(obj))
      AddFinancialInvoice(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: response.MessageContent,
            type: 'success'
          })
          this.auditvisible = false
          this.getInvoiceApplyPageList(this.operatiOBj)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },

    // 标记为已开具
    markinvoices (op) {
      // 判断是否待付款
      const operating = this.$operatedata(this.operates, op)
      for (let i = 0; i < this.choosedata.length; i++) {
        if (this.choosedata[i].Status !== 3) {
          this.$message({
            message: `Id为${this.choosedata[i].Id}的发票状态，不支持标记为已开具！`,
            type: 'warning'
          })
          return
        }
      }
      if (this.Ids.length) {
        let obj = {
          IdArr: this.Ids.join(','),
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        EditInvoiceApplyStatus(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '标记为已开具',
              type: 'success'
            })
            this.getInvoiceApplyPageList(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: '请选择需要标记的发票',
          type: 'warning'
        })
      }
    },
    // 标记为已开具
    markinvoice (e, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      if (e.Status !== 3) {
        this.$message({
          message: `审核未通过，不支持标记为已开具！`,
          type: 'warning'
        })
      } else {
        let obj = {
          IdArr: e.Id,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        EditInvoiceApplyStatus(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: '标记为已开具',
              type: 'success'
            })
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    // 多选
    handleSelectionChange (value) {
      this.Ids = []
      this.choosedata = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
        this.choosedata.push(value[i])
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getInvoiceApplyPageList(this.operatiOBj)
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getInvoiceApplyPageList(this.operatiOBj)
    },
    // 关闭弹框
    closedialog () {
      this.invoicevisible = true
    },
    // 开具发票
    savedialog (e) {

    },
  },
}
</script>

<style lang="scss">
.operate-container {
  background-color: $erpbgcolor;
  min-height: calc(100vh - 60px);
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
    .addmenu {
      margin-bottom: 16px;
      // width: 96px;
    }
    .el-button + .el-button {
      margin-left: 16px;
    }
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
  }
}
</style>