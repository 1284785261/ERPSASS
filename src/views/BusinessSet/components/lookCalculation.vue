//查看社保计算页面
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <BreadCrumb :url-list="urlList" />
      <div class="From-box-content">
        <el-form ref="ruleForm" :model="searchObject" :rules="Formrules" class="forms-Compensation">
          <el-row>
            <el-col :span="12">
              <el-form-item label="规则名称" ref="Name" prop="RuleName" label-width="70px">
                <el-input v-model="searchObject.RuleName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="养老缴纳基数" ref="Name" prop="PensionBase">
                <el-input v-if="searchObject.PensionBase" v-model="searchObject.PensionBase+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="失业保险缴纳基数" ref="Name" prop="UnemployBase">
                <el-input v-if="searchObject.UnemployBase" v-model="searchObject.UnemployBase+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="工伤保险缴纳基数" ref="Name" prop="InjuryBase">
                <el-input v-if="searchObject.InjuryBase" v-model="searchObject.InjuryBase+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="医疗保险缴纳基数" ref="Name" prop="MedicalBase">
                <el-input v-if="searchObject.MedicalBase" v-model="searchObject.MedicalBase+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="生育保险缴纳基数" ref="Name" prop="BirthBase">
                <el-input v-if="searchObject.BirthBase" v-model="searchObject.BirthBase+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="大病医疗缴纳基数" ref="Name" prop="BigMedicalBase">
                <el-input v-if="searchObject.BigMedicalBase" v-model="searchObject.BigMedicalBase+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="养老缴纳计算方式" prop="PensionType" class="State">
                <p v-if="searchObject.PensionType == '0'">百分比</p>
                <p v-else>固定值</p>
              </el-form-item>
              <el-form-item label="失业保险缴纳计算方式" prop="UnemployType" class="State">
                <p v-if="searchObject.UnemployType == '0'">百分比</p>
                <p v-else>固定值</p>
              </el-form-item>
              <el-form-item label="工伤保险缴纳计算方式" prop="InjuryType" class="State">
                <p v-if="searchObject.InjuryType == '0'">百分比</p>
                <p v-else>固定值</p>
              </el-form-item>
              <el-form-item label="医疗保险缴纳计算方式" prop="MedicalType" class="State">
                <p v-if="searchObject.MedicalType == '0'">百分比</p>
                <p v-else>固定值</p>
              </el-form-item>
              <el-form-item label="生育保险缴纳计算方式" prop="BirthType" class="State">
                <p v-if="searchObject.BirthType == '0'">百分比</p>
                <p v-else>固定值</p>
              </el-form-item>
              <el-form-item label="大病医疗缴纳计算方式" prop="BigMedicalType" class="State">
                <p v-if="searchObject.BigMedicalType == '0'">百分比</p>
                <p v-else>固定值</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="基本养老保险比例（企业部分）" ref="Name" prop="PensionCompany">
                <el-input v-if="searchObject.PensionCompany && searchObject.PensionType == '0'" v-model="searchObject.PensionCompany+'%'" disabled />
                <el-input v-else-if="searchObject.PensionCompany && searchObject.PensionType == '1'" v-model="searchObject.PensionCompany+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="失业保险比例（企业部分）" ref="Name" prop="UnemployCompany">
                <el-input v-if="searchObject.UnemployCompany && searchObject.UnemployType == '0'" v-model="searchObject.UnemployCompany+'%'" disabled />
                <el-input v-else-if="searchObject.UnemployCompany && searchObject.UnemployType == '1'" v-model="searchObject.UnemployCompany+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="工伤保险比例（企业部分）" ref="Name" prop="InjuryCompany">
                <el-input v-if="searchObject.InjuryCompany && searchObject.InjuryType == '0'" v-model="searchObject.InjuryCompany+'%'" disabled />
                <el-input v-else-if="searchObject.InjuryCompany && searchObject.InjuryType == '1'" v-model="searchObject.InjuryCompany+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="医疗保险比例（企业部分）" ref="Name" prop="MedicalCompany">
                <el-input v-if="searchObject.MedicalCompany && searchObject.MedicalType == '0'" v-model="searchObject.MedicalCompany+'%'" disabled />
                <el-input v-else-if="searchObject.MedicalCompany && searchObject.MedicalType == '1'" v-model="searchObject.MedicalCompany+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="生育保险比例（企业部分）" ref="Name" prop="BirthCompany">
                <el-input v-if="searchObject.BirthCompany && searchObject.BirthType == '0'" v-model="searchObject.BirthCompany+'%'" disabled />
                <el-input v-else-if="searchObject.BirthCompany && searchObject.BirthType == '1'" v-model="searchObject.BirthCompany+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="大病医疗保险（企业部分）" ref="Name" prop="BigMedicalCompany">
                <el-input v-if="searchObject.BigMedicalCompany && searchObject.BigMedicalType == '0'" v-model="searchObject.BigMedicalCompany+'%'" disabled />
                <el-input v-else-if="searchObject.BigMedicalCompany && searchObject.BigMedicalType == '1'" v-model="searchObject.BigMedicalCompany+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="基本养老保险比例（个人部分）" ref="Name" prop="PensionPersonal">
                <el-input v-if="searchObject.PensionPersonal && searchObject.PensionType == '0'" v-model="searchObject.PensionPersonal+'%'" disabled />
                <el-input v-else-if="searchObject.PensionPersonal && searchObject.PensionType == '1'" v-model="searchObject.PensionPersonal+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="失业保险比例（个人部分）" ref="Name" prop="UnemployPersonal">
                <el-input v-if="searchObject.UnemployPersonal && searchObject.UnemployType == '0'" v-model="searchObject.UnemployPersonal+'%'" disabled />
                <el-input v-else-if="searchObject.UnemployPersonal && searchObject.UnemployType == '1'" v-model="searchObject.UnemployPersonal+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="工伤保险比例（个人部分）" ref="Name" prop="InjuryPersonal">
                <el-input v-if="searchObject.InjuryPersonal && searchObject.InjuryType == '0'" v-model="searchObject.InjuryPersonal+'%'" disabled />
                <el-input v-else-if="searchObject.InjuryPersonal && searchObject.InjuryType == '1'" v-model="searchObject.InjuryPersonal+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="医疗保险比例（个人部分）" ref="Name" prop="MedicalPersonal">
                <el-input v-if="searchObject.MedicalPersonal && searchObject.MedicalType == '0'" v-model="searchObject.MedicalPersonal+'%'" disabled />
                <el-input v-else-if="searchObject.MedicalPersonal && searchObject.MedicalType == '1'" v-model="searchObject.MedicalPersonal+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="生育保险比例（个人部分）" ref="Name" prop="BirthPersonal">
                <el-input v-if="searchObject.BirthPersonal && searchObject.BirthType == '0'" v-model="searchObject.BirthPersonal+'%'" disabled />
                <el-input v-else-if="searchObject.BirthPersonal && searchObject.BirthType == '1'" v-model="searchObject.BirthPersonal+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="大病医疗保险（个人部分）" ref="Name" prop="BigMedicalPersonal">
                <el-input v-if="searchObject.BigMedicalPersonal && searchObject.BigMedicalType == '0'" v-model="searchObject.BigMedicalPersonal+'%'" disabled />
                <el-input v-else-if="searchObject.BigMedicalPersonal && searchObject.BigMedicalType == '1'" v-model="searchObject.BigMedicalPersonal+'￥'" disabled />
                <el-input v-else disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="使用状态" prop="Status" class="State">
                <p v-if="searchObject.Status =='1'">启用</p>
                <p v-else>禁用</p>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
    </div>
  </div>
</template>
<script>
import { GetSIRule } from '@/api/BusinessSet.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import qs from 'qs'
export default {
  name: 'lookCalculation',
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '社保计算规则设置',
        router: '/BusinessSet/CalculationSecurity'
      }, {
        name: '查看社保计算规则',
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
        PensionType: '',
        PensionCompany: '',
        PensionPersonal: '',
        MedicalBase: '',
        MedicalType: '',
        MedicalCompany: '',
        MedicalPersonal: '',
        UnemployBase: '',
        UnemployType: '',
        UnemployCompany: '',
        UnemployPersonal: '',
        InjuryBase: '',
        InjuryType: '',
        InjuryCompany: '',
        InjuryPersonal: '',
        BirthBase: '',
        BirthType: '',
        BirthCompany: '',
        BirthPersonal: '',
        BigMedicalBase: '',
        BigMedicalType: '',
        BigMedicalCompany: '',
        BigMedicalPersonal: '',
        Status: '',
      }
    }
  },
  created () {
    if (this.$route.query && this.$route.query.Id) {
      this.CalculationId = this.$route.query.Id
      this.getCalculationDetal(this.CalculationId)
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
    }
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
      width: 100%;
      p {
        margin-top: 40px;
        margin-bottom: 0;
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