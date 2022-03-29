//新建社保计算页面
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <BreadCrumb :url-list="urlList" />
      <div class="From-box-content">
        <el-form ref="ruleForm" :model="searchObject" :rules="Formrules" class="forms-Compensation">
          <el-row>
            <el-col :span="12">
              <el-form-item label="规则名称" ref="Name" prop="RuleName" label-width="70px">
                <el-input v-model="searchObject.RuleName"></el-input><span class="title">建议以地区名称的方式命名</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="养老缴纳基数" ref="Name" prop="PensionBase">
                <el-input v-model="searchObject.PensionBase">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="失业保险缴纳基数" ref="Name" prop="UnemployBase">
                <el-input v-model="searchObject.UnemployBase">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="工伤保险缴纳基数" ref="Name" prop="InjuryBase">
                <el-input v-model="searchObject.InjuryBase">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="医疗保险缴纳基数" ref="Name" prop="MedicalBase">
                <el-input v-model="searchObject.MedicalBase">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="生育保险缴纳基数" ref="Name" prop="BirthBase">
                <el-input v-model="searchObject.BirthBase">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="大病医疗缴纳基数" ref="Name" prop="BigMedicalBase">
                <el-input v-model="searchObject.BigMedicalBase">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="养老缴纳计算方式" prop="PensionType" class="State">
                <el-radio-group v-model="searchObject.PensionType">
                  <el-radio label="0">百分比</el-radio>
                  <el-radio label="1">固定值</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="失业保险缴纳计算方式" prop="UnemployType" class="State">
                <el-radio-group v-model="searchObject.UnemployType">
                  <el-radio label="0">百分比</el-radio>
                  <el-radio label="1">固定值</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="工伤保险缴纳计算方式" prop="InjuryType" class="State">
                <el-radio-group v-model="searchObject.InjuryType">
                  <el-radio label="0">百分比</el-radio>
                  <el-radio label="1">固定值</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="医疗保险缴纳计算方式" prop="MedicalType" class="State">
                <el-radio-group v-model="searchObject.MedicalType">
                  <el-radio label="0">百分比</el-radio>
                  <el-radio label="1">固定值</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="生育保险缴纳计算方式" prop="BirthType" class="State">
                <el-radio-group v-model="searchObject.BirthType">
                  <el-radio label="0">百分比</el-radio>
                  <el-radio label="1">固定值</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="大病医疗缴纳计算方式" prop="BigMedicalType" class="State">
                <el-radio-group v-model="searchObject.BigMedicalType">
                  <el-radio label="0">百分比</el-radio>
                  <el-radio label="1">固定值</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="基本养老保险比例（企业部分）" ref="Name" prop="PensionCompany">
                <el-input v-model="searchObject.PensionCompany">
                  <svg-icon v-if="searchObject.PensionType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.PensionType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="失业保险比例（企业部分）" ref="Name" prop="UnemployCompany">
                <el-input v-model="searchObject.UnemployCompany">
                  <svg-icon v-if="searchObject.UnemployType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.UnemployType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="工伤保险比例（企业部分）" ref="Name" prop="InjuryCompany">
                <el-input v-model="searchObject.InjuryCompany">
                  <svg-icon v-if="searchObject.InjuryType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.InjuryType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="医疗保险比例（企业部分）" ref="Name" prop="MedicalCompany">
                <el-input v-model="searchObject.MedicalCompany">
                  <svg-icon v-if="searchObject.MedicalType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.MedicalType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="生育保险比例（企业部分）" ref="Name" prop="BirthCompany">
                <el-input v-model="searchObject.BirthCompany">
                  <svg-icon v-if="searchObject.BirthType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.BirthType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="大病医疗保险（企业部分）" ref="Name" prop="BigMedicalCompany">
                <el-input v-model="searchObject.BigMedicalCompany">
                  <svg-icon v-if="searchObject.BigMedicalType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.BigMedicalType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="基本养老保险比例（个人部分）" ref="Name" prop="PensionPersonal">
                <el-input v-model="searchObject.PensionPersonal">
                  <svg-icon v-if="searchObject.PensionType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.PensionType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="失业保险比例（个人部分）" ref="Name" prop="UnemployPersonal">
                <el-input v-model="searchObject.UnemployPersonal">
                  <svg-icon v-if="searchObject.UnemployType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.UnemployType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="工伤保险比例（个人部分）" ref="Name" prop="InjuryPersonal">
                <el-input v-model="searchObject.InjuryPersonal">
                  <svg-icon v-if="searchObject.InjuryType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.InjuryType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="医疗保险比例（个人部分）" ref="Name" prop="MedicalPersonal">
                <el-input v-model="searchObject.MedicalPersonal">
                  <svg-icon v-if="searchObject.MedicalType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.MedicalType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="生育保险比例（个人部分）" ref="Name" prop="BirthPersonal">
                <el-input v-model="searchObject.BirthPersonal">
                  <svg-icon v-if="searchObject.BirthType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.BirthType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="大病医疗保险（个人部分）" ref="Name" prop="BigMedicalPersonal">
                <el-input v-model="searchObject.BigMedicalPersonal">
                  <svg-icon v-if="searchObject.BigMedicalType == '1'" slot="suffix" icon-class="money" class-name="way" />
                  <svg-icon v-if="searchObject.BigMedicalType == '0'" slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="使用状态" prop="Status" class="State">
                <el-radio-group v-model="searchObject.Status">
                  <el-radio label="1">启用</el-radio>
                  <el-radio label="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="footer-button">
            <el-button class="operation-button" type="primary" @click="cancel">取消</el-button>
            <el-button class="operation-button" type="primary" @click="Formsave('ruleForm')">保存</el-button>
          </div>
        </el-form>

      </div>
    </div>
  </div>
</template>
<script>
import { EditSIRule, AddSIRule, GetSIRule } from '@/api/BusinessSet.js'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '社保计算规则设置',
        router: '/BusinessSet/CalculationSecurity'
      }, {
        name: '新建社保计算规则',
        router: ''
      }],
      Formrules: {},
      CalculationId: '',
      statusList: [{
        id: -1,
        label: '全部'
      }, {
        id: 0,
        label: '禁用'
      },
      {
        id: 1,
        label: '启用'
      }],
      searchObject: {
        RuleName: '',
        PensionBase: '',
        PensionType: '0',
        PensionCompany: '',
        PensionPersonal: '',
        MedicalBase: '',
        MedicalType: '0',
        MedicalCompany: '',
        MedicalPersonal: '',
        UnemployBase: '',
        UnemployType: '0',
        UnemployCompany: '',
        UnemployPersonal: '',
        InjuryBase: '',
        InjuryType: '0',
        InjuryCompany: '',
        InjuryPersonal: '',
        BirthBase: '',
        BirthType: '0',
        BirthCompany: '',
        BirthPersonal: '',
        BigMedicalBase: '',
        BigMedicalType: '0',
        BigMedicalCompany: '',
        BigMedicalPersonal: '',
        Status: '1',
      }
    }
  },
  created () {
    if (this.$route.query && this.$route.query.Id) {
      this.urlList[1].name = '修改社保计算规则'
      this.CalculationId = this.$route.query.Id
      this.getCalculationDetal(this.CalculationId)
    } else {
      this.urlList[1].name = '添加社保计算规则'
    }
  },
  methods: {
    //编辑时获取数据
    getCalculationDetal (Id) {
      let data = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSIRule(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          this.searchObject = response.Data
          for (let key in this.searchObject) {
            if (typeof (this.searchObject[key]) == 'number') {
              this.searchObject[key] = String(this.searchObject[key]);
            }
          }
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    //保存
    Formsave (form) {
      // 调用接口,保存数据
      showLoading()
      const operating = JSON.parse(localStorage.getItem('operating')) || {}
      this.searchObject.menuid = operating.MenuId
      this.searchObject.operationcode = operating.OperationCode
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.CalculationId) {
            EditSIRule(qs.stringify(this.searchObject)).then((response) => {
              hideLoading()
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '修改社保计算规则成功!'
                })
                setTimeout(() => {
                  this.$router.push('/BusinessSet/CalculationSecurity')
                }, 2000)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent
                })
              }
            })
          } else {
            AddSIRule(qs.stringify(this.searchObject)).then((response) => {
              hideLoading()
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '新增社保计算规则成功!'
                })
                setTimeout(() => {
                  this.$router.push('/BusinessSet/CalculationSecurity')
                }, 2000)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent
                })
              }
            })
          }

        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //取消操作
    cancel () {
      this.$router.go(-1)
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.Compensation-box {
  margin-left: 24px;
}
.From-box-content {
  margin-top: 24px;
  background: #fff;
  overflow: hidden;
  .forms-Compensation {
    margin: 24px 0;
    .el-row {
      padding: 0 24px;
      .el-col {
        min-width: 280px;
        max-width: 360px;
        .el-form-item {
          margin-bottom: 25px;
          .title {
            color: red;
            display: inline-block;
            position: absolute;
            right: -200px;
            top: 0;
          }
          .el-form-item__label {
            text-align: left;
            line-height: 24px;
            color: #666666;
          }

          .el-form-item__content {
            .el-select {
              display: block;
              /deep/ .el-input__suffix {
                top: 20px;
              }
            }
          }
          /deep/ input {
            background: $erinputbgc;
            border: none;
            height: 40px;
            line-height: 40px;
          }
          .way {
            font-size: 16px;
          }
        }
      }
    }

    /deep/ .State {
      display: inline-block;
      .el-radio-group {
        display: block;
        line-height: 41px;
        label {
          display: inline-block;
          &:nth-child(1) {
            margin-right: 100px;
          }
        }
      }
    }
    .footer-button {
      margin: 40px 0 30px 0;
      text-align: center;
      button {
        margin: 0 12px;
      }
    }
  }
}
</style>