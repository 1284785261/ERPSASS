<template>
  <div class="OperationLogDetails-Box">
    <el-dialog :close-on-click-modal="false" title="操作日志详情" class="dialog-box" append-to-body :visible.sync="showOperationLogDetails" :show-close="false" :destroy-on-close="true" width="900px" @close="closeDialog">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <div class="search-bar clearfix">
        <div class="condition">
          <div class="search-name">操作人</div>
          <el-input class="erpsearchinput" placeholder="请输入操作人姓名进行查询" clearable size="small" v-model="Modifier">
            <i class="el-icon-search el-input__icon" slot="suffix" />
          </el-input>
        </div>
        <div class="condition">
          <div class="search-name">操作</div>
          <el-select style="width: 120px;" placeholder="" clearable size="small" v-model="OperationType" @change="SelectChanges(OperationType)">
            <el-option v-for="(item,index) in OperationTypeList" :key="index" :value="item.value" :label="item.describe"></el-option>
          </el-select>
          <!-- <el-input class="erpsearchinput" placeholder="" clearable size="small" v-model="Modifier"> -->
          <!-- <i class="el-icon-search el-input__icon" slot="suffix" /> -->
          <!-- </el-input> -->
        </div>
        <div class="condition">
          <div class="search-name">操作时间</div>
          <el-date-picker class="picker" style="width: 200px;" value-format="yyyy-MM-dd HH:mm:ss" v-model="operation" type="daterange" size="small" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="condition">
          <el-button size="small" class="erpbtn" @click.native="searchtables">查询</el-button>
        </div>
      </div>
      <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="OperationLogList" max-height="600" tooltip-effect="dark">
        <el-table-column align="center" prop="OperationObjCode" min-width="130" fixed label="合同名称" />
        <!-- <el-table-column align="center" prop="Amount" label="金额明细" min-width="120" show-overflow-tooltip /> -->
        <el-table-column align="center" prop="OperationObjName" label="合同名称" min-width="100" show-overflow-tooltip />
        <!-- <el-table-column align="center" prop="CabinetPositionName" label="档案柜位置" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="MarkerColor" label="标志色系" min-width="80"/> -->
        <el-table-column align="center" prop="SysUserName" label="操作人" min-width="80" />
        <el-table-column align="center" prop="AddTime" label="操作时间" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              {{scope.row.AddTime.split('T').toString().replace(/-/g,'/').replace(/,/g,'    ')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="OperationTypeText" label="操作类型" min-width="100" />
      </el-table>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="Total">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import { GetArchivesEnumOperationType } from '@/api/FileManagement.js'
export default {
  props: ['showOperationLogDetails', 'OperationLogList', 'Total'],
  data () {
    return {
      OperationType: null,
      currentPage: 1,
      PageSize: 10,
      Modifier: '',
      operation: [],
      OperationTypeList: [],
      ModificationTime: '',
      tableloading: false,
      OperationLogDetailsList: [],
    }
  },
  created () {
    this.GetArchivesEnumOperationType()
  },
  methods: {
    SelectChanges (e) {
      let num = e
      this.$emit('sendOperationType', num)
    },
    closeDialog () {
      // this.$emit('closeDialog',false)
    },
    GetArchivesEnumOperationType () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetArchivesEnumOperationType(obj).then(res => {
        this.OperationTypeList = res
      })
    },
    close () {
      this.$emit('closeDialog', false)
      this.Modifier = ''
      this.operation = null
      this.OperationType = null
    },
    searchtables () {
      let StartTime = ''
      let EndTime = ''
      if (this.operation != null) {
        StartTime = this.operation[0]
        EndTime = this.operation[1]
      }
      let str = this.Modifier
      this.$emit('Modifier', str, StartTime, EndTime)
    },
    handleSizeChange (val) {
      this.PageSize = val
      this.$emit('sendSize', val)
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.$emit('sendIdx', val)
      this.currentPage = val
    },
  }

}
</script>
<style lang="scss" scoped>
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
    /deep/.search-name {
      font-size: $f16;
      color: $erp666;
      font-weight: 700;
      display: inline-block;
      margin-right: 7px;
      /deep/.el-date-editor,
      .el-range-separator {
        width: 10%;
      }
    }
    .el-input {
      display: inline-block;
      width: 170px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
}
.pagina-fonter {
  margin-bottom: 20px;
}
.erp-table {
  margin-bottom: 30px;
}
</style>