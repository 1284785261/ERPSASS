//查看平均工资
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="查看月均工资" class="dialog-box dialog-account" append-to-body :visible.sync="showLookWage" :show-close="false" :destroy-on-close="true" width="500px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="Wage-Account">
        <el-form-item label="月均工资" prop="WageNum" class="recipientMan1" v-loading="WageNumloading">
          <el-input v-model="dataObject.WageNum" disabled clearable class="select-input">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="统计范围" prop="StaffId">
          <el-radio-group v-model="radio" @change="changeRadio">
            <el-radio :label="item.label" v-for="(item,index) in radioList" :key="index">{{item.title}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择起始年月" prop="StartDate" class="Date">
          <el-date-picker v-model="dataObject.StartDate" :picker-options="pickerOptions1" clearable type="date" placeholder="选择起始年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择终止年月" prop="EndDate" class="Date">
          <el-date-picker v-model="dataObject.EndDate" :picker-options="pickerOptions2" clearable type="date" placeholder="选择终止年月">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round size="small" @click="close">取消</el-button>
        <el-button round size="small" @click="calculateDialog('ruleForm')">计算月均工资</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetStaffAverageWage } from '@/api/OutsourcedEmployeeManagement.js'
import { showLoading, hideLoading, copy, MenuIdDate } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'LookWage',
  props: ['showWage', 'WageId'],
  data() {
    const _this = this
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          if (_this.dataObject.ExpireDate) {
            const data = new Date(_this.dataObject.ExpireDate)
            data.setDate(data.getDate() - 1)
            return time.getTime() > data
          } else {
            return false
          }
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          if (_this.dataObject.StartDate) {
            const data = new Date(_this.dataObject.StartDate)
            data.setDate(data.getDate())
            return time.getTime() < data
          } else {
            return false
          }
        }
      },
      radioList: [{
        label: '0',
        title: '近半年（自然年）'
      }, {
        label: '1',
        title: '近一年（自然年）'
      }, {
        label: '2',
        title: '自定义'
      }],
      dataObject: {
        WageNum: 0,
        StartDate: '',
        EndDate: ''
      },
      radio: '1',
      showLookWage: false,
      Id: '',
      WageNumloading: false,
    }
  },
  watch: {
    showWage(newvalue, oldvalue) {
      this.showLookWage = newvalue
      this.Id = this.WageId
      var date = new Date();
      this.dataObject.StartDate = date.getFullYear() - 1 + '-01-01'
      this.dataObject.EndDate = date.getFullYear() - 1 + '-12-31'
      if (this.showLookWage) {
        this.calculateDialog()
      }

    }
  },
  methods: {
    calculateDialog(form) {
      let obj = {
        Id: this.Id,
        StartDate: this.dataObject.StartDate,
        EndDate: this.dataObject.EndDate,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.WageNumloading = true
      GetStaffAverageWage(qs.stringify(obj)).then(response => {
        this.WageNumloading = false
        if (response.IsSuccess) {
          if (response.Data) {
            this.dataObject.WageNum = response.Data.AverageWage
          } else {
            this.dataObject.WageNum = 0
          }
          this.$message({
            message: '月均工资计算成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    changeRadio(val) {
      var date = new Date();
      if (val == 0) {
        if (date.getMonth() + 1 < 7) {
          this.dataObject.StartDate = date.getFullYear() - 1 + '-07-01'
          this.dataObject.EndDate = date.getFullYear() - 1 + '-12-31'
        } else {
          this.dataObject.StartDate = date.getFullYear() + '-01-01'
          this.dataObject.EndDate = date.getFullYear() + '-07-01'
        }
      } else if (val == 1) {
        this.dataObject.StartDate = date.getFullYear() - 1 + '-01-01'
        this.dataObject.EndDate = date.getFullYear() - 1 + '-12-31'
      } else {
        this.dataObject.StartDate = ''
        this.dataObject.EndDate = ''
      }
    },
    close() {
      this.radio = '1'
      this.dataObject.StartDate = ''
      this.dataObject.EndDate = ''
      this.$emit('closeWage', false)
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
.Wage-Account {
  position: relative;
  padding: 0 20px;
  /deep/ .el-form-item {
    margin-bottom: 12px;
    width: 100%;
    .el-form-item__label {
      float: initial;
      line-height: 24px;
      color: #666666;
    }

    // .el-form-item__content {
    //   margin-left: 0;
    //   width: 100%;
    //   .el-select {
    //     display: block;
    //     /deep/ .el-input__suffix {
    //       top: 12px;
    //     }
    //   }
    // }
  }
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
      height: 40px;
    }
  }
}
</style>