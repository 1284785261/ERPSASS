//新建个税计算规则
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <BreadCrumb :url-list="urlList" />
      <div class="From-box-content">
        <el-form ref="ruleForm" :model="searchObject" :rules="Formrules" class="forms-Compensation">
          <el-form-item label="规则名称" prop="RuleName" class="Compensation-header">
            <el-input v-model="searchObject.RuleName" size="small" />
          </el-form-item>
          <el-form-item label="起征点" prop="StartBase" class="Compensation-header">
            <el-input v-model="searchObject.StartBase" size="small">
              <svg-icon slot="suffix" icon-class="money" class-name="way" />
            </el-input>
          </el-form-item>
          <el-form-item class="phaselist-box">
            <div class="phaselist" v-for="(item,index) in searchObject.AddPersonalTaxLevelRuleList" :key=index>
              <i v-if="searchObject.AddPersonalTaxLevelRuleList.length > 1" class="el-icon-circle-close closeButton" @click="delPhase(item,index)"></i>
              <el-form-item label="阶段最小值" prop="LevelMin">
                <span class="item-span" v-if="CompensationId">{{item.LevelMin+'￥'}}</span>
                <el-input v-else v-model="item.LevelMin" size="small" @blur="filterMin(index)">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="阶段最大值" prop="LevelMax">
                <span class="item-span" v-if="CompensationId">{{item.LevelMax+'￥'}}</span>
                <el-input v-else v-model="item.LevelMax" size="small" @blur="filterMax(index)">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
              <el-form-item label="缴纳比例" prop="Scale">
                <span class="item-span" v-if="CompensationId">{{item.Scale+'%'}}</span>
                <el-input v-else v-model="item.Scale" size="small">
                  <svg-icon slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
              <div class="font-button">
                <a class="editphase" v-if="item.Id" @click="Editphase(item,index)"><i class="el-icon-edit-outline"></i>修改</a>
                <a class="addphase" @click="addphase" v-show="index == searchObject.AddPersonalTaxLevelRuleList.length - 1"><i class="el-icon-circle-plus-outline"></i>添加缴纳阶段</a>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="使用状态" prop="Status" class="State">
            <el-radio-group v-model="searchObject.Status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="footer-button">
            <el-button class="operation-button" type="primary" @click="cancel">取消</el-button>
            <el-button class="operation-button" type="primary" @click="Formsave('ruleForm')">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <AddPhase :showAddPhase="showAddPhase" :tempData="tempData" :title="PhaseTitle" @closePhase="closePhase" @PhaseSave="PhaseSave"></AddPhase>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import AddPhase from './addPhase'
import { AddPersonalTaxRule, GetPersonalTaxRuleInfo, DelPersonalTaxLevelRule, EditPersonalTaxRule } from '@/api/BusinessSet.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    AddPhase
  },
  data () {
    return {
      urlList: [{
        name: '个税计算规则设置',
        router: '/BusinessSet/CompensationCalculationRules'
      }, {
        name: '新建个税计算规则',
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
      tempData: {},
      tempDataIndex: 0,
      Formrules: {},
      showAddPhase: false,
      PhaseTitle: '',
      showValidation: true
    }
  },
  created () {
    if (this.$route.query && this.$route.query.Id) {
      this.urlList[1].name = '修改个税计算规则'
      this.CompensationId = this.$route.query.Id
      this.getCompensationDetal(this.CompensationId)
    } else {
      this.urlList[1].name = '添加个税计算规则'
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
    },
    filterMin (index) {
      if (Number(this.searchObject.AddPersonalTaxLevelRuleList[0].LevelMin) < Number(this.searchObject.StartBase)) {
        this.$message({
          type: 'error',
          message: '起征点不能小于第一阶段最小值'
        })
        this.showValidation = false
      }
    },
    filterMax (index) {
      if (Number(this.searchObject.AddPersonalTaxLevelRuleList[index].LevelMax) < Number(this.searchObject.AddPersonalTaxLevelRuleList[index].LevelMin)) {
        this.$message({
          type: 'error',
          message: '当前阶段最大值不能小于阶段最小值'
        })
        this.showValidation = false
      }
    },
    //添加缴纳阶段
    addphase () {
      this.PhaseTitle = '添加缴纳阶段'
      this.showAddPhase = true
    },
    //修改缴纳阶段
    Editphase (item, index) {
      this.tempData = item
      this.tempDataIndex = index
      this.PhaseTitle = '修改缴纳阶段'
      this.showAddPhase = true
    },
    delPhase (item, index) {
      if (item.Id) {
        const obj = {
          IdArr: item.Id,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        this.$confirm('此操作将从数据库中删除该阶段缴纳比例', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DelPersonalTaxLevelRule(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.searchObject.AddPersonalTaxLevelRuleList.splice(index, 1)
            } else {
              this.$message({
                type: 'error',
                message: response.MessageContent
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.searchObject.AddPersonalTaxLevelRuleList.splice(index, 1)
      }

    },
    PhaseSave (obj) {
      if (this.PhaseTitle == '添加缴纳阶段') {
        this.searchObject.AddPersonalTaxLevelRuleList.push(obj)
      } else {
        this.searchObject.AddPersonalTaxLevelRuleList[this.tempDataIndex] = obj
      }

      this.showAddPhase = false
    },
    //保存操作
    Formsave (form) {
      showLoading()
      this.$refs[form].validate((valid) => {
        if (valid) {
          const operating = JSON.parse(localStorage.getItem('operating')) || {}
          if (this.CompensationId) {
            let Formobj = {
              EditPersonalTaxRuleDtoInfo: {
                RuleName: this.searchObject.RuleName,
                StartBase: this.searchObject.StartBase,
                Status: this.searchObject.Status,
                AreaId: 0
              },
              AddPersonalTaxLevelRuleList: this.searchObject.AddPersonalTaxLevelRuleList
            }
            Formobj.EditPersonalTaxRuleDtoInfo.Id = this.searchObject.Id
            Formobj.menuid = operating.MenuId
            Formobj.operationcode = operating.OperationCode
            EditPersonalTaxRule(qs.stringify(Formobj)).then((response) => {
              hideLoading()
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '修改个税计算规则成功!'
                })
                setTimeout(() => {
                  this.$router.push('/BusinessSet/CompensationCalculationRules')
                }, 2000)
              } else {
                this.$message({
                  type: 'error',
                  message: response.MessageContent
                })
              }
            })
          } else {
            let Formobj = {
              AddPersonalTaxRuleDtoInfo: {
                RuleName: this.searchObject.RuleName,
                StartBase: this.searchObject.StartBase,
                Status: this.searchObject.Status,
                AreaId: 0
              },
              AddPersonalTaxLevelRuleList: this.searchObject.AddPersonalTaxLevelRuleList,
            }
            Formobj.menuid = operating.MenuId
            Formobj.operationcode = operating.OperationCode
            AddPersonalTaxRule(qs.stringify(Formobj)).then((response) => {
              hideLoading()
              if (response.IsSuccess) {
                this.$message({
                  type: 'success',
                  message: '添加个税计算规则成功!'
                })
                setTimeout(() => {
                  this.$router.push('/BusinessSet/CompensationCalculationRules')
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
    closePhase (val) {
      this.showAddPhase = val
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
      .way {
        font-size: 16px;
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
        .closeButton {
          color: #f56262;
          position: absolute;
          left: 90%;
          top: 16px;
          font-size: 20px;
          display: inline-block;
        }
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
        .font-button {
          height: 50px;
          margin-top: 10px;
          i {
            font-size: 16px;
            margin-right: 8px;
          }
          .addphase,
          .editphase {
            color: #a3b1cc;
            font-size: 14px;
            &:hover {
              color: #1588f8;
            }
          }
          .addphase {
            float: right;
          }
          .editphase {
            float: left;
          }
        }
      }
    }
    /deep/ .State {
      .el-radio-group {
        display: block;
        margin-top: 50px;
        label {
          &:nth-child(1) {
            margin-right: 120px;
          }
        }
      }
    }
    .footer-button {
      margin: 100px 0 100px 0;
      text-align: center;
      button {
        margin: 0 12px;
      }
    }
  }
}
</style>