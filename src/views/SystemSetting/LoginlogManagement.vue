//登陆日志管理
<template>
  <div class="industry-box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container" label-width="80px">
          <el-form-item label="登录账号">
            <el-input v-model="searchObject.UserId" suffix-icon="el-icon-search" clearable class="select-input" placeholder="请输入登录账号" />
          </el-form-item>
          <el-form-item label="账号名称">
            <el-input v-model="searchObject.UserName" clearable class="select-input" placeholder="请输入账号名称" />
          </el-form-item>
          <el-button class="search-button" size="mini" round @click="search">
            查询
          </el-button>
        </el-form>

      </div>
    </div>
    <div class="table-content">
      <div>
        <el-table ref="industrtTable" v-loading="tableloading" :data="LoginlogList" class="role-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark">
          <el-table-column align="center" prop="UserId" label="登录账号" />
          <el-table-column align="center" prop="Ip" label="登录IP" />
          <el-table-column align="center" prop="AddTime" label="操作时间">
            <template slot-scope="scope">
              <span>{{ scope.row.AddTime | YYMMddhhmmssTime }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>
<script>
import { SysLoginLogPageList } from '@/api/SystemSetting.js'
import filters from '@/utils/filters'
import { MenuIdDate } from '@/utils/CustomValidation.js'
export default {
  components: {},
  filters: {
    Time (val) {
      if (val == '0001-01-01T00:00:00' || !val) {
        return '——'
      } else {
        return new Date(val).Format('yyyy-MM-dd hh:mm')
      }
    }
  },
  data () {
    return {
      tableloading: false,
      searchObject: {
        UserId: '',
        UserName: ''
      },
      currentPage: 1,
      PageSize: 10,
      total: 0,
      LoginlogList: [
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.tableloading = true
      let obj = {
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        UserId: this.searchObject.UserId,
        UserName: this.searchObject.UserName,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      SysLoginLogPageList(obj).then(res => {
        this.tableloading = false
        if (res.IsSuccess) {
          this.LoginlogList = res.Data
          this.total = res.Total
        } else {
          this.LoginlogList = []
          this.total = 0
          this.$message({
            message: res.MessageContent,
            type: 'error'
          })
        }
      })
    },
    search () {
      this.currentPage = 1
      this.getData()
    },
    //  分页事件
    handleSizeChange (val) {
      this.PageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getData()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.industry-box {
  height: 100%;
}
.table-header {
  .el-row {
    .el-col {
      .grid-content {
        line-height: 50px;
        padding: 20px;
        span {
          min-width: 100px;
          display: inline-block;
        }
        .select-box {
          display: inline-block;
          box-sizing: border-box;
          width: calc(100% - 150px);
          .el-select {
            width: 100%;
          }
        }
        .buttons {
          margin-left: 70%;
        }
      }
    }
  }
}
</style>