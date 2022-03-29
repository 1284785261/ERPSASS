// 查看工资计算规则
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box dialog-account" append-to-body :visible.sync="showSalary" :show-close="false" :destroy-on-close="true" width="600px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms-Account">
        <el-form-item label="规则名称">
          <el-input v-model="dataObject.RuleName" disabled clearablesize="small" />
        </el-form-item>
        <el-form-item label="基本工资">
          <el-input v-if="dataObject.BaseSalary > 0" v-model="dataObject.BaseSalary+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="查询公司">
          <el-input v-model="dataObject.CompanyName" disabled clearablesize="small" />
        </el-form-item>
        <el-form-item label="适用项目">
          <el-input v-model="dataObject.ProjectName" disabled clearablesize="small" />
        </el-form-item>
        <el-form-item label="岗位工资">
          <el-input v-if="dataObject.PostSalary > 0" v-model="dataObject.PostSalary+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="绩效工资">
          <el-input v-if="dataObject.PerformSalary > 0" v-model="dataObject.PerformSalary+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="日常加班工资/小时">
          <el-input v-if="dataObject.UsualOverTime > 0" v-model="dataObject.UsualOverTime+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="节假日加班工资/小时">
          <el-input v-if="dataObject.HolidayOverTime > 0" v-model="dataObject.HolidayOverTime+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="计时/计件工资">
          <el-input v-if="dataObject.UnitSalary > 0" v-model="dataObject.UnitSalary+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="房补">
          <el-input v-if="dataObject.HouseSupport > 0" v-model="dataObject.HouseSupport+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="餐补">
          <el-input v-if="dataObject.MealSupport > 0" v-model="dataObject.MealSupport+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="交通补">
          <el-input v-if="dataObject.TrafficSupport > 0" v-model="dataObject.TrafficSupport+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="通讯补">
          <el-input v-if="dataObject.CommSupport > 0" v-model="dataObject.CommSupport+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="高温补">
          <el-input v-if="dataObject.HighTempSupport > 0" v-model="dataObject.HighTempSupport+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="工会费用代扣">
          <el-input v-if="dataObject.UnionFee > 0" v-model="dataObject.UnionFee+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="其他附加项">
          <el-input v-if="dataObject.OtherAdd > 0" v-model="dataObject.OtherAdd+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="其他扣除项">
          <el-input v-if="dataObject.OtherReduce > 0" v-model="dataObject.OtherReduce+'￥'" disabled size="small" />
          <el-input v-else disabled />
        </el-form-item>
        <el-form-item label="使用状态">
          <p v-if="dataObject.Status =='1'">启用</p>
          <p v-else>禁用</p>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import filters from '@/utils/filters'
export default {
  name: 'lookSalary',
  components: {
  },
  props: ['showLookSalary', 'title', 'tempData'],
  data () {
    return {
      dataObject: {

      },
      showSalary: false
    }
  },
  watch: {
    showLookSalary (newvalue, oldvalue) {
      this.showSalary = newvalue
      this.dataObject = this.tempData
      this.dataObject.Status += ''
    }
  },
  methods: {
    close () {
      this.$emit('closelookSalary', false)
    }
  }
}

</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.dialog-account {
  /deep/ .el-dialog {
    .el-dialog__body {
      padding: 0 20px;
    }
  }
}
.forms-Account {
  position: relative;
  /deep/ .el-form-item {
    margin-bottom: 12px;
    width: 50%;
    float: left;
    padding: 0 20px;
    .el-form-item__label {
      text-align: left;
      line-height: 24px;
      color: #000;
    }

    .el-form-item__content {
      margin-left: 0;
      width: 100%;
      .el-select {
        display: block;
        /deep/ .el-input__suffix {
          top: 12px;
        }
      }
    }
  }
  p {
    margin-top: 24px;
  }
}
</style>