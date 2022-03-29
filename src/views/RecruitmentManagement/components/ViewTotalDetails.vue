<!--查看人数详情-->
<template>
  <div class="OperationLogDetails-Box">
    <el-dialog :close-on-click-modal="false" :title="Titles" class="dialog-box" append-to-body :visible.sync="ShowDialog" :show-close="false" :destroy-on-close="true" width="1200px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="ViewDetails" max-height="600" tooltip-effect="dark">
        <el-table-column align="center" prop="Id" min-width="80" fixed label="序号" />
        <el-table-column align="center" prop="StaffName" label="入职员工姓名" min-width="120" show-overflow-tooltip />
        <el-table-column align="center" prop="ProjectName" label="推荐项目" min-width="100" show-overflow-tooltip />
        <el-table-column align="center" prop="PositionName" label="推荐岗位" min-width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="RecruitProvisionTypeText" label="招聘计提类型" min-width="80"/> -->
        <el-table-column align="center" prop="RecruitTypeText" label="招聘类型" min-width="80" />
        <el-table-column align="center" prop="StatusText" label="在职状态" min-width="80" />
        <el-table-column align="center" prop="EntryTime" label="入职时间" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              {{scope.row.EntryTime | YYMMddhhmmssTime}}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="WorkDays" label="上班天数" min-width="80" />
        <el-table-column align="center" prop="DepartureTime" label="离职时间" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              {{scope.row.DepartureTime | YYMMddhhmmssTime}}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Bonus" label="奖金" min-width="80" />
        <el-table-column align="center" prop="Remark" label="备注" min-width="80" />
        <el-table-column align="center" prop="RecommenderName" label="推荐人" min-width="80" />
        <el-table-column align="center" prop="ChannelTypeText" label="渠道类型" min-width="80" />
        <el-table-column align="center" prop="AddTime" label="录入时间" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              {{scope.row.AddTime | YYMMddhhmmssTime}}
            </div>
          </template>
        </el-table-column>
      </el-table>
        <div slot="footer" class="dialog-footer-multiple">
        <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['ViewShow', 'ViewDetails', 'Titles'],
  data () {
    return {
      ShowDialog:false,
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
  },
  watch:{
    ViewShow(newVal,oldVal){
      this.ShowDialog=newVal
    }
  },
  methods: {
   //关闭弹窗
    close () {
      this.$emit('closeDialog', false)
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