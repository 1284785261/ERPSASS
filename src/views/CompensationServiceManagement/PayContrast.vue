<!--薪酬对比管理-->
<template>
  <div class="social-security-management-container">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="员工姓名" label-width="80px">
            <el-input v-model="searchform.StaffName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入员工姓名查询" />
          </el-form-item>
          <el-form-item label="就职项目" label-width="80px">
            <el-input v-model="searchform.ProjectName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入就职项目查询" />
          </el-form-item>
          <el-form-item label="所属年月" label-width="80px">
            <el-date-picker v-model="searchform.YearMonth" class="select-input" type="month" placeholder="请选择所属年月"></el-date-picker>
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="searchtable">
            搜索
          </el-button>
        </el-form>

      </div>
    </div>
    <div class="content">
      <div class="operate-table">
        <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="PayContrastList" max-height="600" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" label="全选" />
          <el-table-column align="center" prop="StaffId" label="员工ID" />
          <el-table-column align="center" prop="StaffName" label="姓名" />
          <el-table-column align="center" prop="IdCode" label="身份证号码" />
          <el-table-column align="center" prop="ProjectName" label="项目名称" />
          <el-table-column align="center" prop="Year" label="工资所属年月">
            <template slot-scope="scope">
              <span>{{scope.row.Year}}/{{scope.row.Month | Month}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="EntSiDeffience" label="企业社保部分差额合计">
            <template slot-scope="scope">
              <span>{{scope.row.EntSiDeffience | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="PerSiTotalDeffience" label="个人社保部分差额合计">
            <template slot-scope="scope">
              <span>{{scope.row.PerSiTotalDeffience | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="HouseFundEntDeffience" label="公积金差额（企业部分）">
            <template slot-scope="scope">
              <span>{{scope.row.HouseFundEntDeffience | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="HouseFundPersDeffience" label="公积金差额（个人部分）">
            <template slot-scope="scope">
              <span>{{scope.row.HouseFundPersDeffience | MoneyUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <a @click="LookContrast(scope.row)" style="color:#1588F8;">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-bottom">
        <el-checkbox class="allcheck erpcheck" v-model="allchecked" @change="batchSelectAll">全选</el-checkbox>
        <el-button size="small" class="erpbtn" @click="ExportPayContrast">导出</el-button>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 查看详情 -->
    <LookPayContrast :showLookPayContrast="showLookPayContrast" :tempData="tempData" :dialogTitle="dialogTitle" @closeAddCardSave="closeAddCardSave"></LookPayContrast>
  </div>
</template>

<script>
import { GetSalaryDeffienceList, ExportSalaryDeffienceList, GetOnCreditPageList, GetOnCreditInfo, EditOnCredit, DeleteOnCredit } from '@/api/CompensationServiceManagement.js'
import { MenuIdDate, showLoading, hideLoading, uuid } from '@/utils/CustomValidation'
import LookPayContrast from './components/LookPayContrast.vue'
import qs from 'qs'
import filters from '@/utils/filters'
export default {
  components: {
    LookPayContrast
  },
  data () {
    return {
      searchform: {
        StaffName: '',
        ProjectName: '',
        YearMonth: '',
        Year: '',
        Month: '',
      },
      currentPage: 1,
      PageSize: 10,
      total: 0,
      AccountList: [],
      PayContrastList: [],
      tableloading: false, // 加载动画
      tableData: [], // 表格
      multipleSelection: [],
      allchecked: false,
      showImportSocialSecurity: false,
      TitleShow: false,
      showLookPayContrast: false,
      dialogTitle: '添加挂账账户',
      tempData: {}
    }
  },

  created () {
    this.getPayContrast()
  },
  methods: {
    searchtable () {
      this.currentPage = 1
      this.getPayContrast()
    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      this.getPayContrast()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getPayContrast()
    },
    // 获取列表详情
    getPayContrast () {
      this.tableloading = true
      if (this.searchform.YearMonth) {
        let myDate = new Date(this.searchform.YearMonth)
        this.searchform.Year = myDate.getFullYear()
        this.searchform.Month = myDate.getMonth() + 1
      }
      let data = {
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize,
        Year: this.searchform.Year || '',
        Month: this.searchform.Month || '',
        StaffName: this.searchform.CompanyName,
        ProjectName: this.searchform.ProjectName,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSalaryDeffienceList(qs.stringify(data)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.PayContrastList = response.Data
            this.total = response.Total
          } else {
            this.PayContrastList = []
            this.total = 0
          }
        } else {
          this.PayContrastList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 多选
    handleSelectionChange (value) {
      this.allchecked = value.length == this.PayContrastList.length
      this.multipleSelection = value
    },
    batchSelectAll () {
      this.$refs.multipleTable.toggleAllSelection(this.allchecked)
    },
    LookContrast (data) {
      this.tempData = data
      this.showLookPayContrast = true
    },
    ExportPayContrast () {
      if (this.multipleSelection.length > 0) {
        let arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].StaffId)
        }
        // 处理时间
        if (this.searchform.YearMonth) {
          this.searchform.Year = this.searchform.date.getFullYear()
          this.searchform.Month = this.searchform.date.getMonth() + 1
        } else {
          this.searchform.Year = ''
          this.searchform.Month = ''
        }
        const obj = {
          Ids: arr.join(','),
          Year: this.searchform.Year,
          Month: this.searchform.Month,
          StaffName: this.searchform.StaffName,
          ProjectName: this.searchform.ProjectName,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        showLoading()
        ExportSalaryDeffienceList(qs.stringify(obj)).then(response => {
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
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要导出的薪酬对比明细'
        })
      }
    },
    // 关闭开户窗口
    closeAddCardSave (val) {
      this.showLookPayContrast = val
    }

  }
}
</script>

<style lang="scss" scoped>
.social-security-management-container {
  .operate-top {
    float: right;
    margin-bottom: 16px;
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