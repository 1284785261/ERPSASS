//开户信息管理
<template>
  <div class="social-security-management-container">
    <div class="search-bar clearfix">
      <div class="condition">
        <div class="search-name">公司名称</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入公司名称查询" size="small" v-model="searchform.BfCompanyName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">开户银行</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入开户银行查询" size="small" v-model="searchform.BankName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <div class="search-name">开户人</div>
        <el-input class="erpsearchinput" clearable placeholder="请输入开户人查询" size="small" v-model="searchform.SysUserName">
          <i class="el-icon-search el-input__icon" slot="suffix" />
        </el-input>
      </div>
      <div class="condition">
        <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="operate-top">
        <el-button size="small" class="erpbtn" v-if="$operatebtn(operates, 'Add')" @click="OpenAddCollection('Add')">新增开户行</el-button>
      </div>
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="AccountInformationList" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" min-width="55" label="全选" fixed="left" />
          <el-table-column align="center" prop="Id" min-width="55" label="序号" />
          <el-table-column align="center" prop="BfCompanyName" label="公司名称" min-width="150" />
          <el-table-column align="center" prop="Account" label="银行账号" min-width="150" />
          <el-table-column align="center" prop="BankName" label="开户银行" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="Branch" label="开户支行" min-width="150" />
          <el-table-column align="center" prop="Remark" label="备注说明" min-width="150" show-overflow-tooltip />
          <el-table-column align="center" prop="SysUserName" label="操作人" min-width="120" />
          <el-table-column align="center" prop="AddTime" label="添加时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="($operatebtns(operates,['Modify','Delete']))">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="$operatebtn(operates, 'Modify')" @click.native="EditAddCollection(scope.row,'Modify')">编辑</el-dropdown-item>
                    <el-dropdown-item v-if="$operatebtn(operates, 'Delete')" @click.native="DeteleClaimSituation(scope.row,'Delete')">删除</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot-operation" v-if="($operatebtns(operates,['Delete']))">
        <el-checkbox class="footcheck erpcheck" v-model="checked" @change="batchSelectAll">全选</el-checkbox>
        <el-button round class="operation-button del-button" v-if="$operatebtn(operates,'Delete')" size="mini" @click="Alldelete('Delete')">批量删除</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>

      <!-- 添加回款 -->
      <AddBank :showAddBank="showAddBank" :tempData="tempData" :AddBankTitle="AddBankTitle" @AddBankSave="AddBankSave" @closeAddBank="closeAddBank"></AddBank>
    </div>
  </div>
</template>
<script>
import { GetBfBankPageList, AddBfBank, EditBfBank, GetBfBankInfo, DeleteBfBank } from '@/api/FinancialManagement.js'
import AddBank from './components/AddBank.vue'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    AddBank
  },
  data () {
    return {
      searchform: {
        BfCompanyName: '',
        BankName: '',
        SysUserName: '',
      },
      currentPage: 1,
      PageSize: 10,
      total: 0,
      AccountInformationList: [],
      tableloading: false, // 加载动画
      showAddBank: false,
      AddBankTitle: '',
      tempData: {},
      multipleSelection: [],
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
      this.getAccumulation(this.operatiOBj)
    }
  },
  methods: {
    searchtable () {
      this.currentPage = 1
      this.getAccumulation(this.operatiOBj)
    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      this.getAccumulation(this.operatiOBj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAccumulation(this.operatiOBj)
    },
    //获取公司银行开户列表数据
    getAccumulation (operat) {
      this.tableloading = true
      let data = this.searchform
      data.PageIndex = this.currentPage || 1
      data.PageSize = this.PageSize || 1
      data.menuid = operat.menuid || MenuIdDate()
      data.operationcode = operat.OperationCode || '1'
      GetBfBankPageList(qs.stringify(data)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.AccountInformationList = response.Data
            this.total = response.Total
          } else {
            this.AccountInformationList = []
            this.total = 0
          }
        } else {
          this.AccountInformationList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 单个删除
    DeteleClaimSituation (value, str) {
      const operating = this.$operatedata(this.operates, str)
      const obj = {
        IdArr: value.Id,
        menuid: operating.MenuId,
        operationcode: operating.OperationCode
      }
      this.$confirm('此操作将删除该开户行信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteBfBank(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getAccumulation(this.operatiOBj)
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
    // 批量删除
    Alldelete (str) {
      if (this.multipleSelection.length) {
        let arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].Id)
        }
        const operating = this.$operatedata(this.operates, str)
        const obj = {
          IdArr: arr.join(','),
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        }
        this.$confirm('此操作将批量删除选中的开户行信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteBfBank(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getAccumulation(this.operatiOBj)
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
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的开户行信息'
        })
      }
    },
    //打开添加收款流水
    OpenAddCollection (str) {
      this.AddBankTitle = '新建开户行'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      this.showAddBank = true
    },
    //修改收款流水
    EditAddCollection (data, str) {
      this.AddBankTitle = '修改开户行'
      const operating = this.$operatedata(this.operates, str)
      localStorage.setItem('operating', JSON.stringify(operating))
      const obj = {
        Id: data.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetBfBankInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.tempData = response.Data
          this.showAddBank = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //保存开户行信息
    AddBankSave (data) {
      showLoading()
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      data.menuid = operating.MenuId
      data.operationcode = operating.OperationCode
      if (data.Id) {
        EditBfBank(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '修改开户行成功!'
            })
            this.showAddBank = false
            this.getAccumulation(this.operatiOBj)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        AddBfBank(qs.stringify(data)).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.$message({
              type: 'success',
              message: '新建开户行成功!'
            })
            this.showAddBank = false
            this.getAccumulation(this.operatiOBj)
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
    closeAddBank (val) {
      this.showAddBank = val
    },
    // 表头多选
    handleSelectionChange (value) {
      this.checked = value.length == this.AccountInformationList.length
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
</style>