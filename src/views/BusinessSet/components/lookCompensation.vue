//查看个税计算规则
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <BreadCrumb :url-list="urlList" />
      <div class="From-box-content">
        <el-form ref="ruleForm" :model="searchObject" :rules="Formrules" class="forms-Compensation">
          <el-form-item label="规则名称" prop="RuleName" class="Compensation-header">
            <el-input v-model="searchObject.RuleName" disabled size="small" />
          </el-form-item>
          <el-form-item label="起征点" prop="StartBase" class="Compensation-header">
            <el-input v-if="searchObject.StartBase" v-model="searchObject.StartBase+'￥'" disabled size="small" />
            <el-input v-else disabled />
          </el-form-item>
          <el-form-item class="phaselist-box">
            <div class="phaselist" v-for="(item,index) in searchObject.AddPersonalTaxLevelRuleList" :key=index>
              <el-form-item label="阶段最小值" prop="LevelMin">
                <el-input v-if="item.LevelMin" v-model="item.LevelMin+'￥'" disabled size="small" />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="阶段最大值" prop="LevelMax">
                <el-input v-if="item.LevelMax" v-model="item.LevelMax+'￥'" disabled size="small" />
                <el-input v-else disabled />
              </el-form-item>
              <el-form-item label="缴纳比例" prop="Scale">
                <el-input v-if="item.Scale" v-model="item.Scale+'%'" disabled size="small" />
                <el-input v-else disabled />
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="使用状态">
            <p v-if="searchObject.Status =='1'">启用</p>
            <p v-else>禁用</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { GetPersonalTaxRuleInfo } from '@/api/BusinessSet.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
  },
  data () {
    return {
      urlList: [{
        name: '个税计算规则设置',
        router: '/BusinessSet/CompensationCalculationRules'
      }, {
        name: '查看个税计算规则',
        router: ''
      }],
      CompensationId: '',
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
        Id: '',
        RuleName: '',
        StartBase: '',
        Status: '1',
        AddPersonalTaxLevelRuleList: [{
          Id: '',
          LevelMin: '',
          LevelMax: '',
          Scale: ''
        }]
      },
      Formrules: {}
    }
  },
  created () {
    if (this.$route.query && this.$route.query.Id) {
      this.CompensationId = this.$route.query.Id
      this.getCompensationDetal(this.CompensationId)
    }
  },
  methods: {
    //获取详情
    getCompensationDetal (Id) {
      let data = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetPersonalTaxRuleInfo(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          let PersonalTaxRuleInfo = response.Data.PersonalTaxRuleInfo
          this.searchObject.RuleName = PersonalTaxRuleInfo.RuleName
          this.searchObject.StartBase = PersonalTaxRuleInfo.StartBase
          this.searchObject.Status = PersonalTaxRuleInfo.Status + ''
          this.searchObject.Id = PersonalTaxRuleInfo.Id
          this.searchObject.AddPersonalTaxLevelRuleList = response.Data.GetPersonalTaxLevelRuleList
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
    margin: 40px;
    /deep/ .Compensation-header {
      width: 360px;
      display: inline-block;
      margin-right: 24px;
      input {
        background: $erinputbgc;
        border: none;
        height: 40px;
        line-height: 40px;
      }
    }
    .el-form-item {
      margin-bottom: 12px;
      .el-form-item__label {
        width: 50%;
        text-align: left;
        line-height: 24px;
        color: #666666;
      }

      .el-form-item__content {
        margin-left: 0;
        width: 360px;
        .el-select {
          display: block;
          /deep/ .el-input__suffix {
            top: 12px;
          }
        }
      }
      p {
        margin-top: 40px;
      }
    }
    .phaselist-box {
      margin-top: 20px;
      .phaselist {
        width: 360px;
        background: #f0f4fa;
        border-radius: 8px;
        position: relative;
        padding: 30px 24px;
        margin-right: 24px;
        float: left;
        .el-form-item {
          margin-bottom: 0;
          /deep/ .el-form-item__content {
            .el-input {
              .el-input__inner {
                background: #fff;
                border: none;
                height: 40px;
                line-height: 40px;
              }
            }
          }
        }
        .item-span {
          display: block;
          margin-top: 40px;
        }
      }
    }
  }
}
</style>