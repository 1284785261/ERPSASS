<!-- 修改工资详情 -->
<template>
  <div class="update-compensation-service-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="compensationform" label-position="top" :model="compensationform" :rules="rules" label-width="140px" class="compensationform">
        <div class="form-title">工资信息</div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Base" label="基本工资" prop="Base">
                <el-input v-model="compensationform.Base" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="应发工资">
                <el-input v-model="compensationform.ShouldPay" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="实发税前">
                <el-input v-model="compensationform.RealPayTaxBefore" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="实发税后">
                <el-input v-model="compensationform.RealPayTaxAfter" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="岗位工资">
                <el-input v-model="compensationform.Post" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="绩效工资">
                <el-input v-model="compensationform.Perform" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="加班工资">
                <el-input v-model="compensationform.OverTime" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="考勤应扣">
                <el-input v-model="compensationform.Daily" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="提成总额">
                <el-input v-model="compensationform.Commission" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="奖金总额">
                <el-input v-model="compensationform.Bonus" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="房补">
                <el-input v-model="compensationform.HouseSupport" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="餐补">
                <el-input v-model="compensationform.MealSupport" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="交通补贴">
                <el-input v-model="compensationform.TrafficSupport" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="通讯补贴">
                <el-input v-model="compensationform.CommSupport" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="高温补贴">
                <el-input v-model="compensationform.HighTempSupport" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="出差补贴">
                <el-input v-model="compensationform.TravelSupport" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="其他补贴">
                <el-input v-model="compensationform.OtherSupport" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="工会费">
                <el-input v-model="compensationform.UnionFee" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="罚金总额">
                <el-input v-model="compensationform.Fine" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-title">社保信息</div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="基本养老保险比例（企业部分）">
                <el-input v-model="compensationform.EndowmentEnt" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="失业保险比例（企业部分）">
                <el-input v-model="compensationform.UnemploymentEnt" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="工伤保险比例（企业部分）">
                <el-input v-model="compensationform.InjuryEnt" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="医疗保险比例（企业部分）">
                <el-input v-model="compensationform.MedicalEnt" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="生育保险比例（企业部分）">
                <el-input v-model="compensationform.BirthEnt" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="大病医疗保险（企业部分）">
                <el-input v-model="compensationform.BigMedicalEnt" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="长护保险（企业部分）">
                <el-input v-model="compensationform.LongCareEnt" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="养老保险（企业部分）补收补退">
                <el-input v-model="compensationform.EndowmentEntPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="医疗保险（企业部分）补收补退">
                <el-input v-model="compensationform.MedicalEntPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="大额医疗保险（企业部分）补收补退">
                <el-input v-model="compensationform.BigMedicalEntPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="失业保险（企业部分）补收补退">
                <el-input v-model="compensationform.UnemploymentEntPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="生育保险（企业部分）补收补退">
                <el-input v-model="compensationform.BirthEntPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="工伤保险（企业部分）补收补退">
                <el-input v-model="compensationform.InjuryEntPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="长护保险（企业部分）补收补退">
                <el-input v-model="compensationform.LongCareEntPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="基本养老保险比例（个人部分）">
                <el-input v-model="compensationform.EndowmentPers" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="失业保险比例（个人部分）">
                <el-input v-model="compensationform.UnemploymentPers" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="工伤保险比例（个人部分）">
                <el-input v-model="compensationform.InjuryPers" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="医疗保险比例（个人部分）">
                <el-input v-model="compensationform.MedicalPers" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="生育保险比例（个人部分）">
                <el-input v-model="compensationform.BirthPers" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="大病医疗保险（个人部分）">
                <el-input v-model="compensationform.BigMedicalPers" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="长护保险（个人部分）">
                <el-input v-model="compensationform.LongCarePers" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="养老保险（个人部分）补收补退">
                <el-input v-model="compensationform.EndowmentPersPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="医疗保险（个人部分）补收补退">
                <el-input v-model="compensationform.MedicalPersPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="大额医疗保险（个人部分）补收补退">
                <el-input v-model="compensationform.BigMedicalPersPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="失业保险（个人部分）补收补退">
                <el-input v-model="compensationform.UnemploymentPersPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="生育保险（个人部分）补收补退">
                <el-input v-model="compensationform.BirthPersPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="工伤保险（个人部分）补收补退">
                <el-input v-model="compensationform.InjuryPersPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="长护保险（个人部分）补收补退">
                <el-input v-model="compensationform.LongCarePersPayback" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-title">公积金信息</div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="公积金缴费（企业）">
                <el-input v-model="compensationform.HouseFundEnt" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="公积金缴费（个人）">
                <el-input v-model="compensationform.HouseFundPers" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="公积金缴纳（企业部分）补收补退">
                <el-input v-model="compensationform.HouseFundEntPayback" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="公积金缴纳（个人部分）补收补退">
                <el-input v-model="compensationform.HouseFundPersPayback" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-title">其他费用</div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="意外伤害险(企业部分)">
                <el-input v-model="compensationform.UnexpectEnt" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="残保金(企业部分)">
                <el-input v-model="compensationform.NoHealth" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="福利费用">
                <el-input v-model="compensationform.Benifits" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="管理费">
                <el-input v-model="compensationform.MgrFee" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="税费">
                <el-input v-model="compensationform.Tax" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="雇主险">
                <el-input v-model="compensationform.Employer" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="体检费用">
                <el-input v-model="compensationform.HealthExam" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="个税">
                <el-input v-model="compensationform.PersonalTax" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="其它加项1">
                <el-input v-model="compensationform.OtherAdd1" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="其它加项2">
                <el-input v-model="compensationform.OtherAdd2" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="其它加项3">
                <el-input v-model="compensationform.OtherAdd3" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="其它减项1">
                <el-input v-model="compensationform.OtherReduce1" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="其它减项2">
                <el-input v-model="compensationform.OtherReduce2" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="其它减项3">
                <el-input v-model="compensationform.OtherReduce3" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="bottom">
      <!-- 添加 -->
      <el-button class="erpbtn" size="small" @click="$router.go(-1)">取消</el-button>
      <el-button class="erpbtn" size="small" @click="updateform">保存</el-button>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import { GetSalaryInfo, EditSalary } from '@/api/CompensationServiceManagement.js'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { MenuIdDate, showLoading, hideLoading, copy, uuid, checkEngNumber } from '@/utils/CustomValidation.js'
export default {
  components: {
    BreadCrumb,
  },
  data () {
    return {
      urlList: [{
        name: '薪酬管理',
        router: '/CompensationServiceManagement/CompensationManagement'
      }, {
        name: '修改工资',
        router: ''
      }],
      compensationform: {

      },
      rules: {},
      Id: '',
    }
  },
  created () {
    this.Id = this.$route.query.id
    this.getSalaryInfo()
  },
  methods: {
    // 获取工资详情
    getSalaryInfo () {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      showLoading()
      GetSalaryInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.compensationform = response.Data
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    },
    updateform () {
      let obj = this.compensationform
      obj.Id = this.Id
      obj.menuid = MenuIdDate()
      obj.operationcode = 1
      showLoading()
      EditSalary(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 500);
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
        hideLoading()
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.update-compensation-service-container /deep/ {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .form-content {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 80px 40px;
    .compensationform {
      .form-title {
        font-size: $f16;
        color: $erp333;
        line-height: 16px;
        position: relative;
        padding-left: 12px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        > .operate {
          font-size: $f14;
          color: $erpplaceholder;
        }
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 16px;
          background-color: $erpcolor;
        }
      }
      // 表格样式
      .el-form-item {
        margin-bottom: 24px;
        .el-form-item__label {
          line-height: 14px;
          font-size: $f14;
          color: $erp666;
          font-weight: 400;
          padding-bottom: 8px;
        }
        .el-form-item__content {
          // max-width: 336px;
          width: 100%;
          .el-input__inner {
            background-color: $erinputbgc;
          }
          .el-select {
            width: 100%;
          }
        }
        // 地址样式
        &.path {
          .el-form-item__content {
            max-width: 100%;
            .el-select {
              max-width: 240px;
              margin-right: 24px;
              margin-bottom: 24px;
            }
            .el-input {
              max-width: 336px;
            }
          }
        }
        // 文本框样式
        &.text {
          .el-form-item__content {
            max-width: 100%;
            .el-textarea__inner {
              background-color: $erinputbgc;
            }
            .el-input__count {
              bottom: 2px;
              height: 30px;
              line-height: 30px;
              right: 20px;
              background: $erinputbgc;
            }
          }
        }
        // 时间选择器样式
        &.datetime {
          .el-form-item__content {
            .el-date-editor {
              width: 100%;
            }
          }
        }
        // vue-tree-input样式
        &.vue-tree {
          .el-form-item__content {
            .vue-treeselect {
              // min-height: 40px;
              height: 40px;
              .vue-treeselect__control {
                height: 40px;
                background-color: $erinputbgc;
                .vue-treeselect__value-container {
                  height: 40px;
                }
                .vue-treeselect__control-arrow-container {
                  height: 40px;
                }
              }
            }
          }
        }
        // 添加客户关联关系样式
        &.addrelation {
          .el-form-item__content {
            > span {
              cursor: pointer;
              > .svg-icon {
                margin-right: 10px;
              }
            }
          }
        }
        // // 底部添加按钮
        // &.bottom {
        //   .el-form-item__content {
        //     text-align: center;
        //     max-width: 100%;
        //     .el-button+.el-button {
        //       margin-left: 24px;
        //     }
        //   }
        // }
      }
      // 循环的样式
      .form-cont {
        padding-bottom: 16px;
        margin-bottom: 40px;
        border-bottom: 1px solid $erpBK;
        &:last-child {
          border-bottom: none;
        }
        .contact-list {
          position: relative;
          margin-bottom: 40px;
          padding-bottom: 16px;
          border-bottom: 1px solid $erpBK;
          // 最后一个添加联系人样式
          &:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
            .operate-btn {
              bottom: 24px;
            }
          }
          // 底部操作按钮
          .operate-btn {
            position: absolute;
            right: 0;
            bottom: 40px;
            display: flex;
          }
          .btn {
            cursor: pointer;
            margin-left: 64px;
            font-size: $f14;
            color: $erpplaceholder;
          }
          // 顶部编辑按钮
          .operate-top {
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
      // 关联关系
      .el-row.relation {
        position: relative;
        .operate {
          display: flex;
          position: absolute;
          right: 0;
          bottom: 24px;
          .btn {
            cursor: pointer;
            margin-left: 64px;
            font-size: $f14;
            color: $erpplaceholder;
          }
        }
      }
      // 附件上传样式
      .file-cont {
        display: flex;
        flex-wrap: wrap;
        .img-box-list {
          width: 160px;
          height: 120px;
          position: relative;
          margin-bottom: 40px;
          > input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 10;
            cursor: pointer;
          }
          > .img-box {
            width: 100%;
            height: 100%;
            position: absolute;
            background-color: #f0f4fa;
            border-radius: 8px;
            > .filetype {
              display: inline-block;
              background-color: $erpcolor;
              padding: 10px 12px;
              font-size: $f14;
              line-height: 14px;
              color: #fff;
              border-radius: 8px;
            }
            > .filename {
              font-size: $f14;
              color: $erp666;
              height: 40px;
              width: 110px;
              margin: 12px 24px 0 24px;
              letter-spacing: 0;
              word-break: break-all;
              overflow: hidden;
              display: -webkit-box;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2; /*要显示的行数*/
              -webkit-box-orient: vertical;
            }
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          > .img-box-hover {
            position: absolute;
            width: 100%;
            height: 30px;
            background-color: rgba(0, 0, 0, 1);
            opacity: 0.4;
            bottom: 0;
            display: flex;
            justify-content: center;
            border-radius: 0 0 8px 8px;
            .btn {
              position: relative;
              cursor: pointer;
              > input {
                width: 100%;
                height: 100%;
                opacity: 0;
                position: absolute;
                cursor: pointer;
              }
              .svg-icon {
                font-size: $f14;
                color: #fff;
              }
              > span {
                font-size: $f14;
                color: #fff;
                padding-left: 4px;
              }
            }
            .btn + .btn {
              margin-left: 24px;
            }
          }
        }
        .img-box-list + .img-box-list {
          margin-left: 24px;
        }
      }
    }
  }
  // 底部添加按钮
  .bottom {
    position: fixed;
    box-shadow: 0px 0px 20px 0px rgba(21, 136, 248, 0.1);
    bottom: 0;
    right: 0;
    margin-bottom: 0;
    text-align: center;
    width: calc(100% - 224px);
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    z-index: 999;
    .el-button + .el-button {
      margin-left: 24px;
    }
  }
}
</style>