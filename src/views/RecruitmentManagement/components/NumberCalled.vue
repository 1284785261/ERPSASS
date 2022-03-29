  <!-- 已招人数 -->
<template>
  <div>
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="social-security-management-container">
      <div class="search-bar clearfix">
        <div class="condition">
          <div class="search-name">员工名称</div>
          <el-input class="erpsearchinput" clearable placeholder="请输入员工名称查询" size="small" v-model="searchform.StaffUserName">
            <i class="el-icon-search el-input__icon" slot="suffix" />
          </el-input>
        </div>
        <div class="condition">
          <div class="search-name">联系电话</div>
          <el-input class="erpsearchinput" clearable placeholder="请输入联系电话查询" size="small" v-model="searchform.StaffMobile">
            <i class="el-icon-search el-input__icon" slot="suffix" />
          </el-input>
        </div>
        <div class="condition">
          <el-button size="small" class="erpbtn" @click="searchtable">查询</el-button>
        </div>
      </div>
      <div class="table-content">
        <div class="operate-table">
          <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="CalledList" max-height="600" tooltip-effect="dark">
            <el-table-column align="center" prop="StaffId" min-width="55" fixed label="员工工号" />
            <el-table-column align="center" prop="StaffName" label="员工姓名" min-width="120" show-overflow-tooltip />
            <el-table-column align="center" prop="Sex" label="性别" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.Sex | SexTWO}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="StaffMobile" label="联系电话" min-width="120" />
            <el-table-column align="center" prop="Diploma" label="最高学历" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.Diploma | Diploma}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="SysUserName" label="录入人员" min-width="120" />
            <el-table-column align="center" prop="AddTime" label="录入时间" min-width="150">
              <template slot-scope="scope">
                <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="UpdateTime" label="更新时间" min-width="150">
              <template slot-scope="scope">
                <span>{{scope.row.UpdateTime | YYMMddhhmmssTime}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagina-fonter">
          <el-pagination :current-page="currentPage" :page-sizes="[10, 50, 100, 1000]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetProjectRecruitStaffList } from '@/api/projectManagement.js'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import filters from '@/utils/filters'
import qs from 'qs'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '招聘需求管理',
        router: '/RecruitmentManagement/RecruitmentRequirements'
      }, {
        name: '已招人数',
        router: ''
      }],
      searchform: {
        ProjectRecruitId: '',
        StaffUserName: '',
        StaffMobile: ''
      },
      tableloading: false, // 加载动画
      currentPage: 1,
      PageSize: 10,
      total: 0,
      CalledList: []
    }
  },
  created () {
    if (this.$route.query.Id) {
      this.searchform.ProjectRecruitId = this.$route.query.Id
      this.getCalled()
    }
  },
  methods: {
    searchtable () {
      this.currentPage = 1
      this.getCalled()
    },
    //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      this.getCalled()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCalled()
    },
    //获取招聘需求列表数据
    getCalled (operat) {
      this.tableloading = true
      let data = this.searchform
      data.PageIndex = this.currentPage || 1
      data.PageSize = this.PageSize || 10
      data.menuid = MenuIdDate()
      data.operationcode = '1'
      GetProjectRecruitStaffList(qs.stringify(data)).then(response => {
        this.tableloading = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.CalledList = response.Data
            this.total = response.Total
          } else {
            this.CalledList = []
            this.total = 0
          }
        } else {
          this.CalledList = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.bread {
  margin-left: 24px;
}
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
  .table-content {
    border-radius: 0;
  }
}
</style>