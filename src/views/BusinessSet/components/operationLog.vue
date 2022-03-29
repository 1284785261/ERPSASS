<template>
  <div class="OperationLogDetails-Box">
    <el-dialog :close-on-click-modal="false" title="操作日志详情" class="dialog-box" append-to-body :visible.sync="showOperationLogDetails" :show-close="false" :destroy-on-close="true" width="900px" @close="closeDialog">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="OperationLogList" max-height="600" tooltip-effect="dark">
        <el-table-column align="center" prop="CommisionRuleTypeText" label="操作"  />
        <el-table-column align="center" prop="SysUserName" label="操作人"  />
        <el-table-column align="center" prop="AddTime" label="操作时间" min-width="" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              {{scope.row.AddTime.split('T').toString().replace(/-/g,'/').replace(/,/g,'    ')}}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagina-fonter">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="Total">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
		GetCommisionRuleLogPageList,
	} from '@/api/BusinessSet.js'
  import qs from 'qs'
export default {
  props: ['showOperationLogDetails', 'rowList'],
  data () {
    return {
      currentPage: 1,
      OperationLogList:[],
      PageSize: 10,
      tableloading: false,
      OperationLogDetailsList: [],
      Total:0,
    }
  },
  watch:{
    showOperationLogDetails(newVal){
      if(newVal){
        this.showOperationLogDetails=newVal;
        let {Id, str}=this.rowList
        this.getss(Id, str)
      }
    },
  },
  methods: {
    getss(Id, str){
      const operating = this.$operatedata(this.operates, str)
				let obj={
					CommisionRuleId: Id,
					PageIndex: this.currentPage,
					PageSize: 10,
					menuid: operating.MenuId,
					operationcode: operating.OperationCode
				}
				GetCommisionRuleLogPageList(qs.stringify(obj)).then(response => {
            this.OperationLogList=response.Data
            this.total = response.Total
				})
    },
    closeDialog () {
      // this.$emit('closeDialog',false)
    },
    close () {
      this.$emit('closeDialog', false)
   
    },
    
    handleSizeChange (val) {
      this.PageSize = val
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
    },
  }

}
</script>
<style lang="scss" scoped>

.pagina-fonter {
  margin-bottom: 20px;
}
.erp-table {
  margin-bottom: 30px;
}
</style>