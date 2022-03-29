<!-- 外派员工黑名单 -->
<template>
  <div class="expatriate-management-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">员工名称</div>
        <el-input class="erpsearchinput" placeholder="请输入员工名称进行查询" size="small" v-model="searchform.UserName">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">身份证号码</div>
        <el-input class="erpsearchinput" placeholder="请输入身份证号码进行查询" size="small" v-model="searchform.IdCode">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">就职项目</div>
        <el-input class="erpsearchinput" placeholder="请输入就职项目进行查询" size="small" v-model="searchform.ProjectName">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">员工单位</div>
        <el-input class="erpsearchinput" placeholder="请输入员工单位进行查询" size="small" v-model="searchform.CompanyName">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">社保/工资/公积金打款账号</div>
        <el-input class="erpsearchinput" placeholder="请输入社保/工资/公积金进行查询" size="small" v-model="searchform.Comprehensive">
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="searchtable" /> -->
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="screening-compent">
        <!-- 筛选列组件 -->
        <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" label="全选" />
          <el-table-column align="center" v-if="$getColumsFlag('StaffContractCode',checkboxVal)" prop="StaffContractCode" label="员工编码" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('UserName',checkboxVal)" prop="UserName" fixed label="员工姓名" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="watchcode" @click="watchstaff(scope.row, 'View')">{{scope.row.UserName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('Sex',checkboxVal)" prop="Sex" label="性别" min-width="55">
            <template slot-scope="scope">
              {{scope.row.Sex | Sex}}
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('IdCode',checkboxVal)" prop="IdCode" label="身份证号码" min-width="160" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('Mobile',checkboxVal)" prop="Mobile" label="联系电话" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('BankAccount',checkboxVal)" prop="BankAccount" label="工资卡账号" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('BankNamestr',checkboxVal)" prop="BankNamestr" label="工资卡开户行" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('SiAccount',checkboxVal)" prop="SiAccount" label="社保账号" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('SiAreaName',checkboxVal)" prop="SiAreaName" label="原参保地" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('FundAccount',checkboxVal)" prop="FundAccount" label="公积金账号" min-width="120" />
          <el-table-column align="center" v-if="$getColumsFlag('PersonalTaxRuleId',checkboxVal)" prop="PersonalTaxRuleId" label="原个税扣除规则" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('CompanyName',checkboxVal)" prop="CompanyName" label="曾用工单位" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('ProjectName',checkboxVal)" prop="ProjectName" label="曾就职项目" min-width="120" show-overflow-tooltip />
          <!-- <el-table-column align="center" prop="Position" label="就职岗位" /> -->
          <el-table-column align="center" v-if="$getColumsFlag('BfCompanyName',checkboxVal)" prop="BfCompanyName" label="入职公司" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('JoinTime',checkboxVal)" prop="JoinTime" label="入职时间" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.JoinTime | Time}}
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('LastQuitCert',checkboxVal)" prop="LastQuitCert" label="原公司离职证明状态" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.LastQuitCert | LastQuitCert}}
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('StatusText',checkboxVal)" prop="StatusText" label="目前就职状态" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('LeaveSysUserName',checkboxVal)" prop="LeaveSysUserName" label="离职办理人" min-width="140" show-overflow-tooltip />
          <el-table-column align="center" v-if="$getColumsFlag('AddTime',checkboxVal)" prop="AddTime" label="添加时间" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.AddTime | Time}}
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="$getColumsFlag('LeaveTime',checkboxVal)" prop="LeaveTime" label="离职时间" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.LeaveTime | Time}}
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" min-width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'ModifyRemark')" @click.native="EditRemark(scope.row, 'ModifyRemark')">修改备注</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="selectall(allchecked)">全选</el-checkbox>
        <el-button v-if="$operatebtn(operates, 'RemoveBlacklist')" size="small" class="addmenu erpbtn" @click="Removeditem('RemoveBlacklist')">移出黑名单</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="dialog">
      <!-- 修改备注 -->
      <BlackContent :showBlackContent="showBlackContent" :title="BlackTitle" :itemMap="itemMap" @BlackContentSave="BlackContentSave" @closeBlackContent="closeBlackContent"></BlackContent>
    </div>
  </div>
</template>

<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent'
import dialogresignation from './components/dialog-resignation'
import BlackContent from './components/BlackContent.vue'
import { GetStaffBlackPageList, GetStaffBlackInfo, EditStaffBlack, DeleteStaffBlack } from '@/api/OutsourcedEmployeeManagement.js'
import filters from '@/utils/filters'
import { showLoading, hideLoading, copy, MenuIdDate } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    // dialogresignation,
    BlackContent,
    ScreeningComponent
  },
  filters: {
    LastQuitCert (value) {
      if (value == 0) {
        return '未提交'
      } else if (value == 1) {
        return '已提交'
      } else {
        return ''
      }
    },
  },
  data () {
    return {
      searchform: {
        UserName: '',
        IdCode: '',
        CompanyName: '',
        ProjectName: '',
        Comprehensive: '',
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "员工编码", prop: "StaffContractCode" },
        { label: "员工姓名", prop: "UserName" },
        { label: "性别", prop: "Sex" },
        { label: "身份证号码", prop: "IdCode" },
        { label: "联系电话", prop: "Mobile" },
        { label: "工资卡账号", prop: "BankAccount" },
        { label: "工资卡开户行", prop: "BankNamestr" },
        { label: "社保账号", prop: "SiAccount" },
        { label: "社保参保地", prop: "SiAreaName" },
        { label: "公积金账号", prop: "FundAccount" },
        { label: "原个税扣除规则", prop: "PersonalTaxRuleId" },
        { label: "曾用工单位", prop: "CompanyName" },
        { label: "曾就职项目", prop: "ProjectName" },
        { label: "入职公司", prop: "BfCompanyName" },
        { label: "入职时间", prop: "JoinTime" },
        { label: "原公司离职证明状态", prop: "LastQuitCert" },
        { label: "目前就职状态", prop: "StatusText" },
        { label: "离职办理人", prop: "LeaveSysUserName" },
        { label: "添加时间", prop: "AddTime" },
        { label: "离职时间", prop: "LeaveTime" },
      ],
      tableloading: false, // 表格加载
      allchecked: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
      Ids: [],
      showBlackContent: false,
      BlackTitle: '修改黑名单',
      itemMap: {
        Id: '',
        Remark: ''
      },
      operates: [], // 获取页面权限
    }
  },
  created () {
    // 获取页面权限
    this.operates = this.$route.meta.operations
    console.log(JSON.parse(JSON.stringify(this.operates)))
    this.getStaffHistoryPageList()
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
    // 获取外包员工信息
    getStaffHistoryPageList () {
      let obj = {
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        UserName: this.searchform.UserName,
        IdCode: this.searchform.IdCode,
        CompanyName: this.searchform.CompanyName,
        ProjectName: this.searchform.ProjectName,
        Comprehensive: this.searchform.Comprehensive,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.tableloading = true
      GetStaffBlackPageList(qs.stringify(obj)).then(response => {
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
    // 搜索
    searchtable () {
      this.currentPage = 1
      this.getStaffHistoryPageList()
    },
    // 员工详情
    watchstaff (e, op) {
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path
      }
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('breadpath', JSON.stringify(breadpath))
      if (!operating.MenuId) {
        this.$message({
          message: '没有权限查看',
          type: 'warning'
        })
        return
      }
      const { href } = this.$router.resolve({
        path: '/OutsourcedEmployeeManagement/ExpatriateEmployeesDeatil',
        query: {
          id: e.Id,
          type: true
        }
      })
      window.open(href, '_blank')
    },
    //打开修改备注
    EditRemark (data, op) {
      // 记录操作码,
      const operating = this.$operatedata(this.operates, op)
      window.localStorage.setItem('operating', JSON.stringify(operating))
      let obj = {
        StaffId: data.StaffId,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetStaffBlackInfo(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.itemMap.Id = response.Data.Id
          this.itemMap.Remark = response.Data.Remark
          this.showBlackContent = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //保存修改备注
    BlackContentSave (data) {
      const operating = JSON.parse(window.localStorage.getItem('operating')) || {}
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      showLoading()
      EditStaffBlack(qs.stringify(data)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            message: '修改黑名单备注成功',
            type: 'success'
          })
          this.showBlackContent = false
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //关闭修改备注
    closeBlackContent (val) {
      this.showBlackContent = val
    },
    //移出黑名单
    Removeditem (op) {
      const operating = this.$operatedata(this.operates, op)
      if (this.Ids.length == 0) {
        this.$message({
          message: '请勾选要移出黑名单的员工！',
          type: 'warning'
        })
        return
      }
      let obj = {
        IdArr: this.Ids.join(','),
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('你确定批量移出员工黑名单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        showLoading()
        DeleteStaffBlack(qs.stringify(obj)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '移出黑名单成功!'
            })
            this.getStaffHistoryPageList()
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
          message: '已取消操作'
        })
      })
    },
    handleSelectionChange (value) {
      this.Ids = []
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id)
      }
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    },
    // 全选
    selectall () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getStaffHistoryPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getStaffHistoryPageList()
    },

  },
}
</script>

<style lang="scss">
.expatriate-management-container {
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
      width: 96px;
    }
  }
  .content {
    background-color: #fff;
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 8px 0px 0px 8px;
    .screening-compent {
      float: right;
      margin-bottom: 10px;
      margin-right: 15px;
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