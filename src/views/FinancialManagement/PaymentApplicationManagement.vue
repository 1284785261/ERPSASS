<!-- 付款申请管理 -->
<template>
  <div class="payment-application-management">
    <div class="search-bar clearfix" v-show="!IsWatch">
      <div class="condition">
        <div class="search-name">付款公司</div>
        <el-input class="erpsearchinput" placeholder="请输入付款公司进行查询" clearable size="small" v-model="searchform.BfCompanyName" />
      </div>
      <!-- <div class="condition">
        <div class="search-name">收款方</div>
        <el-input class="erpsearchinput" placeholder="请输入收款方进行查询" clearable size="small" v-model="searchform.Accepter" />
      </div>
      <div class="condition">
        <div class="search-name">银行账号</div>
        <el-input class="erpsearchinput" placeholder="请输入银行账号进行查询" clearable size="small" v-model="searchform.Account" />
      </div> -->
      <div class="condition">
        <div class="search-name">经办部门</div>
        <el-input class="erpsearchinput" placeholder="请输入经办部门进行查询" clearable size="small" v-model="searchform.HandleOrg" />
      </div>
      <div class="condition">
        <div class="search-name">经办人</div>
        <el-input class="erpsearchinput" placeholder="请输入经办人进行查询" clearable size="small" v-model="searchform.HandleUser" />
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content" v-show="!IsWatch">
      <div class="operate-top">
        <!-- <el-button size="small" v-if="$operatebtn(operates, 'Modify')" class="addmenu erpbtn" @click="markpaids('Modify')">标记为已付款</el-button> -->
        <div class="screening-compent">
          <!-- 筛选列组件 -->
          <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" fixed="left" min-width="55" label="全选" />
          <el-table-column align="center" v-if="$getColumsFlag('Title',checkboxVal)" label="付款申请单名称" min-width="200">
            <template slot-scope="scope">
              <span class="watchcode" @click="watchapply(scope.row)">{{scope.row.Title}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('BfCompanyName',checkboxVal)" prop="BfCompanyName" label="付款公司" min-width="120" />
          <!-- <el-table-column align="center" v-if="$getColumsFlag('Accepter',checkboxVal)" prop="Accepter" label="收款方" min-width="120" /> -->
          <el-table-column align="center" v-if="$getColumsFlag('ClassBankName',checkboxVal)" prop="ClassBankName" label="工资打款行" min-width="120" show-overflow-tooltip />
          <!-- <el-table-column align="center" v-if="$getColumsFlag('Account',checkboxVal)" prop="Account" label="银行账号" min-width="120" /> -->
          <el-table-column align="center" v-if="$getColumsFlag('MethodText',checkboxVal)" prop="MethodText" label="付款方式" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('Amount',checkboxVal)" prop="Amount" label="付款金额" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('TypeText',checkboxVal)" prop="TypeText" label="类型" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('UsedFor',checkboxVal)" prop="UsedFor" label="用途说明" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('HandleOrgName',checkboxVal)" prop="HandleOrgName" label="经办部门" min-width="200" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('HandleUserName',checkboxVal)" prop="HandleUserName" label="经办人" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" label="发起时间" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | Time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('StatusText',checkboxVal)" prop="StatusText" label="审核状态" min-width="120" />
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="scope.row.Type != '1' && scope.row.Status===3 && $operatebtn(operates, 'Modify')" @click.native="markpaid2(scope.row, 'Modify')">标记为已经付款</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Type == '1' && $operatebtn(operates, 'View')" @click.native="watchwork(scope.row, 'View')">查看工资明细</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Import')" @click.native="openimport(scope.row, 'Import')">导入发放回执</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination :key="1" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <div class="search-bar clearfix" v-show="IsWatch">
      <div class="condition">
        <div class="search-name">员工姓名</div>
        <el-input class="erpsearchinput" placeholder="请输入员工姓名进行查询" clearable size="small" v-model="memberseatch.StaffName" />
      </div>
      <div class="condition">
        <div class="search-name">身份证号</div>
        <el-input class="erpsearchinput" placeholder="请输入身份证号进行查询" clearable size="small" v-model="memberseatch.IdCode" />
      </div>
      <div class="condition">
        <div class="search-name">银行账号</div>
        <el-input class="erpsearchinput" placeholder="请输入银行账号进行查询" clearable size="small" v-model="memberseatch.Account" />
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchmember">查询</el-button>
      </div>
    </div>
    <div class="content" v-show="IsWatch">
      <el-button size="small" class="addmenu erpbtn" @click="goback">返回</el-button>
      <div class="operate-top">
        <el-button size="small" v-if="$operatebtn(operates, 'Import')" class="addmenu erpbtn" @click="openimport('', 'Import')">导入发放回执</el-button>
        <el-button size="small" v-if="$operatebtn(operates, 'Modify')" class="addmenu erpbtn" @click="markpaids('Modify')">标记为已付款</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="memberList" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" label="全选" />
          <el-table-column align="center" prop="StaffId" width="100" label="员工工号" />
          <el-table-column align="center" prop="StaffName" label="员工姓名" />
          <el-table-column align="center" prop="IdCode" label="身份证号" />
          <el-table-column align="center" prop="Status" label="发放状态">
            <template slot-scope="scope">
              <span>{{scope.row.Status | typeStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Amount" label="发放金额" />
          <el-table-column align="center" prop="PaidAmount" label="实发金额" />
          <el-table-column align="center" fixed="right" prop="Name" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="scope.row.Status == '0'">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="scope.row.Status == '0' && $operatebtn(operates, 'Modify')" @click.native="markpaid(scope.row, 'Modify')">标记为已经付款</el-dropdown-item>
                    <!-- <el-dropdown-item v-if="$operatebtn(operates, 'View')" @click.native="watchwork(scope.row, 'View')">查看工资结算表</el-dropdown-item> -->
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialog">
      <el-dialog :close-on-click-modal="false" :title="accounttitle" :visible.sync="accountVisible" width="480px" custom-class="erpdialog" :lock-scroll="false" @close="accountclosedialog">
        <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
          <el-form-item label="发放日期">
            <el-date-picker v-model="operateform.date" type="date" placeholder="选择发放日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">保 存</el-button>
        </span>
      </el-dialog>
    </div>
    <dialogimport :title="importtitle" :visible="importvisible" @closeimport="closeimport" @importreceipt="importreceipt" />
    <el-dialog :close-on-click-modal="false" title="部分导入失败提示" :visible.sync="reportvisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closereport">
      <div class="error-box">
        <div class="error-top">
          <div class="success-total">成功 {{errordata.Successes}}</div>
          <div class="error-total">文件导入失败 <span>{{errordata.Errors}}</span> 条</div>
        </div>
        <div class="error-content erpscroll">
          <div class="row" v-for="(item, index) in errordata.Message" :key="index">
            <div class="con">{{item}}</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closereport">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetFinanceApplyPayPageList, EditApplyPayStatus, GetSalaryPayMemberList, EditSalaryPayMemberStatus, ImportAndIssueReceipt } from '@/api/FinancialManagement.js'
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import dialogimport from './components/dialog-import'
import qs from 'qs'
import filters from '@/utils/filters.js'
export default {
  components: {
    dialogimport,
    ScreeningComponent
  },
  filters: {
    typeStatus (value) {
      if (value === 0) {
        return '待发放'
      } else if (value === 1) {
        return '已发放'
      } else if (value === 2) {
        return '发放失败'
      }
    },
  },
  data () {
    return {
      searchform: {
        BfCompanyName: '',
        Account: '',
        Accepter: '',
        HandleOrg: '',
        HandleUser: ''
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "付款申请单名称", prop: "Title" },
        { label: "付款公司", prop: "BfCompanyName" },
        { label: "收款方", prop: "Accepter" },
        { label: "工资打款行", prop: "ClassBankName" },
        { label: "银行账号", prop: "Account" },
        { label: "付款方式", prop: "MethodText" },
        { label: "付款金额", prop: "Amount" },
        { label: "类型", prop: "TypeText" },
        { label: "用途说明", prop: "UsedFor" },
		{ label: "经办部门", prop: "HandleOrgName" },
        { label: "经办人", prop: "HandleUserName" },
        { label: "发起时间", prop: "AddTime" },
        { label: "审核状态", prop: "StatusText" },
      ],
      tableloading: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      Ids: [],
      checkdata: [],

      rules: {
        date: [{ type: 'date', required: true, message: '请选择入账日期', trigger: 'change' }]
      },
      accounttitle: '标记为已付款',
      accountVisible: false,
      operateform: {
        date: '',
      },
      IdArr: '',

      IsWatch: false,
      memberList: [],
      memberseatch: {
        Status: '',
        StaffName: '',
        IdCode: ''
      },
      ApplyPayId: '',

      importtitle: '',
      importvisible: false,
      reportvisible: false, // 上传报告
      errordata: {}, // 错误信息

      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
    }
  },
  created () {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations
      this.operatiOBj.menuid = this.$operatedata(this.operates, 'Query').MenuId
      this.getFinanceApplyPayPageList(this.operatiOBj)
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
    // 获取付款申请列表
    getFinanceApplyPayPageList (operat) {
      let obj = {
        BfCompanyName: this.searchform.BfCompanyName,
        Account: this.searchform.Account,
        Accepter: this.searchform.Accepter,
        HandleOrg: this.searchform.HandleOrg,
        HandleUser: this.searchform.HandleUser,
        Type: '-1',
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || '1'
      }
      this.tableloading = true
      GetFinanceApplyPayPageList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.tableData = response.Data
            console.log(this.tableData)
            this.total = response.Total
          } else {
            this.tableData = []
            this.total = 0
          }
        } else {
          this.tableData = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 获取员工详情列表
    searchmember () {
      let Status
      if (this.memberseatch.Status === '') {
        Status = -1
      } else {
        Status = this.memberseatch.Status
      }
      let obj = {
        ApplyPayId: this.ApplyPayId,
        StaffName: this.memberseatch.StaffName,
        IdCode: this.memberseatch.IdCode,
        Status: Status,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      this.tableloading = true
      GetSalaryPayMemberList(qs.stringify(obj)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.memberList = response.Data
            this.total = response.Total
            this.IsWatch = true
          } else {
            this.memberList = []
            this.$message({
              message: '暂无工资明细！',
              type: 'warning'
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
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getFinanceApplyPayPageList(this.operatiOBj)
    },
    // 查看工资计算表
    watchwork (e, op) {
      this.ApplyPayId = e.Id
      this.searchmember()
    },
    // 查看申请详情
    watchapply (e) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))

      const { href } = this.$router.resolve({
        path: '/FinancialManagement/PaymentApplicationDetail',
        query: {
          id: e.Id
        }
      })
      window.open(href, '_blank')
    },
    // 标记为已付款
    markpaid (e, str) {
      // 判断是否审核通过
      this.Ids = [e.Id]
      this.accountVisible = true
      //
    },
    //不是工资类型时标记为已付款
    markpaid2 (e, str) {
      const operating = this.$operatedata(this.operates, str)
      let obj = {
        IdArr: e.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      EditApplyPayStatus(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '已标记为付款状态！',
            type: 'success'
          })
          this.getFinanceApplyPayPageList(this.operatiOBj)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    markpaids (str) {
      if (this.Ids.length) {
        for (let i = 0; i < this.checkdata.length; i++) {
          if (this.checkdata[i].Status !== 0) {
            this.$message({
              message: `${this.checkdata[i].StaffName}的发放状态为已发放，不支持标记为付款！`,
              type: 'warning'
            })
            return
          }
        }
        const operating = this.$operatedata(this.operates, str)
        this.accountVisible = true
        // let obj = {
        //   Id: this.Ids.join(','),
        //   menuid: operating.MenuId,
        //   operationcode: operating.OperationCode
        // }
        // EditApplyPayStatus(qs.stringify(obj)).then(response => {
        //   if (response.IsSuccess) {
        //     this.$message({
        //       message: '已标记为付款状态！',
        //       type: 'success'
        //     })
        //     this.getFinanceApplyPayPageList(this.operatiOBj)
        //   } else {
        //     this.$message({
        //       message: response.MessageContent,
        //       type: 'error'
        //     })
        //   }
        // })
      } else {
        this.$message({
          message: '请选择要标记为付款的人员',
          type: 'warning'
        })
      }
    },
    // 打开导入发放回执弹框
    openimport (data, str) {
      if (data) {
        this.ApplyPayId = data.Id
      }
      this.importtitle = "导入发放回执"
      this.importvisible = true
    },
    // 关闭导入发放回执弹框
    closeimport () {
      this.importvisible = false
    },
    // 开始导入发放回执
    importreceipt (data) {
      let paramdata = new FormData()
      paramdata.append('file', data.files)
      paramdata.append('TemplateType', data.TemplateType)
      paramdata.append('ApplyPayId', this.ApplyPayId)
      paramdata.append('SheetName', data.SheetName)
      paramdata.menuid = MenuIdDate()
      paramdata.operationcode = '1'
      ImportAndIssueReceipt(paramdata).then(response => {
        if (response.IsSuccess) {
          this.importvisible = false
          if (this.IsWatch) {
            this.searchmember()
          }
          if (response.Data.Errors !== 0) {
            this.errordata = response.Data
            this.reportvisible = true
          } else {
            this.$message({
              type: 'success',
              message: "发放回执导入成功"
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    // 关闭错误弹框
    closereport () {
      this.errordata = {}
      this.reportvisible = false
    },
    // 多选
    handleSelectionChange (value) {
      this.Ids = []
      this.checkdata = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
        this.checkdata.push(value[i])
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
      this.getFinanceApplyPayPageList(this.operatiOBj)
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getFinanceApplyPayPageList(this.operatiOBj)
    },
    // 返回
    goback () {
      this.ApplyPayId = ''
      this.IsWatch = false
      this.getFinanceApplyPayPageList(this.operatiOBj)
      this.memberList = []
    },

    // 弹框操作
    accountclosedialog () {
      this.operateform.date = ''
      // this.$refs.operateform.resetFields()
    },
    save () {
      let obj = {
        Id: this.Ids.join(','),
        Status: 1,
        PayDate: this.operateform.date,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      EditSalaryPayMemberStatus(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: response.MessageContent,
            type: 'success'
          })
          this.accountVisible = false
          this.searchmember()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.payment-application-management /deep/ {
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
  .addmenu {
    margin-bottom: 16px;
  }
  .operate-top {
    float: right;
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
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
.erpdialog {
  .error-box {
    .error-top {
      margin-bottom: 24px;
      .error-total {
        font-size: $f14;
        color: $erp333;
        > span {
          color: $erpred;
        }
      }
    }
    .error-content {
      max-height: calc(100vh - 600px);
      overflow-y: auto;
      // margin-bottom: 24px;
      .row {
        line-height: 20px;
        margin-bottom: 24px;
        min-height: 20px;
        display: flex;
        color: $erp999;
        .index {
          width: 48px;
        }
        .con {
          text-align: center;
          color: $erp999;
          flex: 1;
        }
      }
    }
  }
}
</style>