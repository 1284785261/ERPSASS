<!-- 操作日志 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showOperation" :show-close="false" :destroy-on-close="true" width="1000px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <div class="search-bar clearfix">
        <div class="condition">
          <div class="search-name">操作人</div>
          <el-input class="erpsearchinput" clearable placeholder="" size="small" v-model="searchform.SysUser" />
        </div>
        <div class="condition">
          <div class="search-name">操作类型</div>
          <el-select v-model="searchform.Type" class="erpsearchinput" size="small" placeholder="">
            <el-option v-for="item in TypeList" :key="item.value" :label="item.describe" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="condition">
          <div class="search-name">操作时间</div>
          <el-date-picker v-model="searchform.periodOf" class="period" size="small" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始月份" end-placeholder="结束月份">
          </el-date-picker>
        </div>
        <div class="condition">
          <el-button size="small" class="erpbtn" @click="searchtable">搜索</el-button>
        </div>
      </div>
      <div class="content">
        <div class="operate-table" v-if="type == 1">
          <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
            <el-table-column align="center" prop="ProjectContractCode" label="合同编号" min-width="120" />
            <el-table-column align="center" prop="ProjectContractName" label="合同名称" min-width="120" show-overflow-tooltip />
            <el-table-column align="center" prop="SysUserName" label="操作人" min-width="120" />
            <el-table-column align="center" prop="AddTime" label="操作时间" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="OperationTypeText" label="操作" min-width="100" />
          </el-table>
        </div>
        <div class="operate-table" v-if="type == 2">
          <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="tableData" max-height="600" tooltip-effect="dark">
            <el-table-column align="center" prop="StaffContractCode" label="合同编号" min-width="120" />
            <el-table-column align="center" prop="SysUserName" label="操作人" min-width="120" />
            <el-table-column align="center" prop="AddTime" label="操作时间" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="OperationTypeTxet" label="操作" min-width="100" />
          </el-table>
        </div>
      </div>
      <div class="pagina-fonter dialog-pagina">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetProjectContractOperationLogPageList, GetProjectContractEnumOperationType } from '@/api/projectManagement.js'
import { GetStaffContractOperationLogPageList } from '@/api/Public.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'OperationLog',
  props: ['showOperationLog', 'Id', 'title', 'type'],
  data () {
    return {
      searchform: {
        Id: '',
        SysUser: '',
        Type: '-1',
        periodOf: [],
        StartTime: '',
        EndTime: ''
      },
      TypeList: [],
      showOperation: false,
      tableloading: false,
      tableData: [],
      PageSize: 10,
      currentPage: 1,
      total: 0,
    }
  },
  watch: {
    showOperationLog (newvalue, oldvalue) {
      this.showOperation = newvalue
      this.searchform = this.$options.data().searchform
      this.searchform.Id = this.Id
      this.getType()
      this.getPageList()
    }
  },
  created () {

  },
  methods: {
    getType () {
      let data = {
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetProjectContractEnumOperationType(qs.stringify(data)).then(res => {
        this.TypeList = res
        this.TypeList.unshift({ value: '-1', describe: "全部" })
      })
    },
    // 查询
    searchtable () {
      this.currentPage = 1
      this.getPageList()
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getPageList()
    },
    getPageList () {
      if (this.type == '1') {
        let data = {
          ProjectContractId: this.searchform.Id,
          SysUserName: this.searchform.SysUser,
          OperationType: this.searchform.Type,
          StartTime: '',
          EndTime: '',
          PageIndex: this.currentPage || 1,
          PageSize: this.PageSize || 10,
          menuid: MenuIdDate(),
          operationcode: 1
        }
        if (this.searchform.periodOf && this.searchform.periodOf.length > 0) {
          data.StartTime = this.searchform.periodOf[0]
          data.EndTime = this.searchform.periodOf[1]
        }
        this.tableloading = true
        GetProjectContractOperationLogPageList(qs.stringify(data)).then(response => {
          this.tableloading = false
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.tableData = response.Data
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
      } else if (this.type == '2') {
        let data = {
          StaffContractId: this.searchform.Id,
          SysUserName: this.searchform.SysUser,
          OperationType: this.searchform.Type,
          StartTime: '',
          EndTime: '',
          PageIndex: this.currentPage || 1,
          PageSize: this.PageSize || 10,
          menuid: MenuIdDate(),
          operationcode: 1
        }
        if (this.searchform.periodOf && this.searchform.periodOf.length > 0) {
          data.StartTime = this.searchform.periodOf[0]
          data.EndTime = this.searchform.periodOf[1]
        }
        this.tableloading = true
        GetStaffContractOperationLogPageList(qs.stringify(data)).then(response => {
          this.tableloading = false
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.tableData = response.Data
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
      }

    },
    close () {
      this.$emit('CloseOperationLog', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-bar {
  padding: 12px 24px 12px 0;
  // height: 80px;
  .condition {
    // float: left;
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
    /deep/ .el-select {
      width: 150px;

      .el-input__inner {
        border: 1px solid #e3e3e6;
        border-radius: 5px;
      }
    }
    /deep/ .el-input {
      display: inline-block;
      width: 150px;
      .el-input__inner {
        border: 1px solid #e3e3e6;
        border-radius: 5px;
      }
    }
    .period {
      width: 250px;
    }
  }
}
.dialog-pagina {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>