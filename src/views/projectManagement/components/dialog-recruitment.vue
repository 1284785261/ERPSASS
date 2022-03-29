<!-- 添加修改招聘信息 -->
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" width="968px" :lock-scroll="false" custom-class="recruitmentdialog" @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <div class="form-title">招聘业务信息</div>
        <div class="form-cont">
          <el-row :gutter="24">
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="接单人??">
                <el-input v-model="operateform.Name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="提交人??">
                <el-select v-model="operateform.value" placeholder="请选择提交人">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="招聘岗位">
                <el-input v-model="operateform.PositionName" :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="岗位人数">
                <el-input v-model="operateform.NeedNum" :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="管理费">
                <el-input v-model="operateform.MgrFee" :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="是否已签合同??">
                <el-input v-model="operateform.Name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="合同期限??">
                <el-input v-model="operateform.Name"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="上岗地址" class="path">
                <el-select v-model="postprovince" filterable placeholder="选择省份" clearable :disabled="iswatch">
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in postprovincelist" :key="index"></el-option>
                </el-select>
                <el-select v-model="postcity" filterable placeholder="选择城市" clearable :disabled="iswatch">
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in postcitylist" :key="index"></el-option>
                </el-select>
                <el-select v-model="operateform.AreaId" filterable placeholder="选择区县" clearable :disabled="iswatch">
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in postarealist" :key="index"></el-option>
                </el-select>
                <el-input v-model="operateform.Address" placeholder="请输入详情地址" clearable :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="上班时间" class="datetime">
                <!-- <el-input v-model="operateform.WorkTime"></el-input> -->
                <el-date-picker v-model="operateform.WorkTime" type="date" placeholder="选择日期" :disabled="iswatch"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="到岗时间" class="datetime">
                <!-- <el-input v-model="operateform.OnBoardTime"></el-input> -->
                <el-date-picker v-model="operateform.OnBoardTime" type="date" placeholder="选择日期" :disabled="iswatch"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="倒班时时间">
                <el-input v-model="operateform.ChangeTime" :disabled="iswatch"></el-input>
                <!-- <el-date-picker v-model="operateform.ChangeTime" type="date" placeholder="选择日期"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="休息时间">
                <el-input v-model="operateform.RestTime" :disabled="iswatch"></el-input>
                <!-- <el-date-picker v-model="operateform.RestTime" type="date" placeholder="选择日期"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
              <el-form-item label="岗位要求" class="text">
                <el-input type="textarea" :rows="6" v-model="operateform.Skills" maxlength="500" show-word-limit :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
              <el-form-item label="工作内容及职责" class="text">
                <el-input type="textarea" :rows="6" v-model="operateform.Description" maxlength="500" show-word-limit :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="试用期薪资">
                <el-input v-model="operateform.SalaryTry" :disabled="iswatch">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="试用期限">
                <el-input v-model="operateform.TryTime" placeholder="请输入试用期限" :disabled="iswatch"></el-input>
                <!-- <el-date-picker
                  v-model="operateform.TryTime"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  clearable
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="综合薪资">
                <el-input v-model="operateform.Salary" :disabled="iswatch">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="五险一金" class="text2">
                <el-input type="textarea" :rows="5" maxlength="100" show-word-limit v-model="operateform.SiFund" :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="是否包吃包住" class="text2">
                <el-input type="textarea" :rows="5" maxlength="100" show-word-limit v-model="operateform.LiveEat" :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="培训要求??">
                <el-radio-group v-model="operateform.Sex">
                  <el-radio label="1">有</el-radio>
                  <el-radio label="0">无</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="培训薪资" class="text2">
                <el-input type="textarea" :rows="5" maxlength="100" show-word-limit v-model="operateform.TrainSalary" :disabled="iswatch"></el-input>
                <!-- <el-input v-model="operateform.Name"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="岗位补贴" class="text2">
                <!-- <el-input v-model="operateform.PostSupport"></el-input> -->
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="operateform.PostSupport" :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="加班补贴" class="text2">
                <!-- <el-input v-model="operateform.OverTimeSupport"></el-input> -->
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="operateform.OverTimeSupport" :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="全勤奖" class="text2">
                <!-- <el-input v-model="operateform.FullTudy"></el-input> -->
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="operateform.FullTudy" :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="提成说明" class="text2">
                <!-- <el-input v-model="operateform.Commision"></el-input> -->
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="operateform.Commision" :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="其他补贴/福利" class="text2">
                <!-- <el-input v-model="operateform.OtherWelfare"></el-input> -->
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="operateform.OtherWelfare" :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="晋升空间" class="text2">
                <!-- <el-input v-model="operateform.Promotion"></el-input> -->
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="operateform.Promotion" :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
              <el-form-item label="应聘者需要提供的资料" class="text">
                <el-input type="textarea" :rows="6" v-model="operateform.NeedMaterial" maxlength="500" show-word-limit :disabled="iswatch"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- <div class="form-title">福利待遇</div>
        <div class="form-cont">
          
        </div> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="erpbtn" v-if="!iswatch" size="small" @click="save">保 存</el-button>
        <el-button class="erpbtn" v-if="iswatch" size="small" @click="closedialog">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetAreaList } from '@/api/Public.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  props: {
    title: {
      type: String,
    },
    visible: {
      type: Boolean,
    },
    iswatch: {
      type: Boolean,
      default: false,
    },
    contentdata: {
      type: Object
    }
  },
  watch: {
    visible (newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (this.contentdata.Id) {
        // if (this.contentdata.TryTime) {
        //   this.contentdata.TryTime = JSON.parse(this.contentdata.TryTime)
        // }
        this.operateform = this.contentdata
      }
    },
    // 上岗省变化
    postprovince (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.postcitylist = response.Data
            // 判断如果下拉里面没有这个Id就清空子集选项
            let isclear = this.postcitylist.find(v => {
              return v.Id == this.postcity
            })
            if (isclear) {
            } else {
              this.postcity = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.postcity = ''
        this.operateform.AreaId = ''
        this.postcitylist = []
        this.postarealist = []
      }
    },
    // 上岗市变化
    postcity (newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: '',
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.postarealist = response.Data
            let isclear = this.postarealist.find(v => {
              return v.Id == this.operateform.AreaId
            })
            if (isclear) {
            } else {
              this.operateform.AreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.postarealist = []
        this.operateform.AreaId = ''
      }
    },
    // 上岗地址反推
    "operateform.AreaId" (newvalue, oldvalue) {
      const str = this.postarealist.find(v => {
        return v.Id == newvalue
      })
      if (!str && !!newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            var select = response.Data.filter(v => {
              return v.isselect
            })
            if (select.find(v => v.Level == 1) !== undefined) {
              this.postprovince = select.find(v => v.Level == 1).Id
            }
            if (select.find(v => v.Level == 2) !== undefined) {
              this.postcity = select.find(v => v.Level == 2).Id
            }
            if (select.find(v => v.Level == 3) !== undefined) {
              this.operateform.AreaId = select.find(v => v.Level == 3).Id
            } else {
              this.operateform.AreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
  },
  data () {
    return {
      dialogVisible: false,
      operateform: {},
      rules: {

      },

      postprovince: '',
      postprovincelist: [],
      postcity: '',
      postcitylist: [],
      postarealist: []
    }
  },
  created () {
    let obj = {
      ParentId: 0,
      menuid: MenuIdDate(),
      operationcode: '1'
    }
    GetAreaList(qs.stringify(obj)).then(response => {
      if (response.IsSuccess) {
        this.postprovincelist = response.Data
      } else {
        this.$message({
          message: response.MessageContent,
          type: 'error'
        })
      }
    })
  },
  methods: {
    closedialog () {
      this.$emit('closerecruitment')
      this.operateform = {}
      this.postcity = ''
      this.postprovince = ''
    },
    save () {
      this.$refs.operateform.validate(v => {
        if (v) {
          let obj = this.operateform
          // obj.TryTime = JSON.stringify(this.operateform.TryTime)
          obj.AreaId = this.operateform.AreaId || this.postcity || this.postprovince
          this.$emit('saverecruitment', obj)
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
/deep/.recruitmentdialog {
  border-radius: 8px;
  .el-dialog__header {
    padding: 27px 40px;
    border-bottom: 1px solid #ccdaff;

    .el-dialog__title {
      font-size: $f16;
      font-weight: 700;
    }

    .el-dialog__headerbtn {
      top: 27px;
      right: 40px;
      font-size: 15px;
      width: 20px;
      height: 20px;
      border: 1px solid $erp999;
      border-radius: 10px;

      > i {
        position: absolute;
        left: 1.5px;
        top: 2px;
      }
    }
  }
  .el-dialog__body {
    padding: 24px 40px 40px 40px;
    .form-title {
      font-size: $f16;
      color: $erp333;
      line-height: 16px;
      position: relative;
      padding-left: 12px;
      margin-bottom: 24px;
      display: flex;
      // justify-content: space-between;
      > span {
        flex: 1;
      }
      > .operate {
        font-size: $f14;
        color: $erpplaceholder;
        width: 11%;
        text-align: right;
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
        // width: calc(100% - 64px);
        width: 100%;
        .el-input__inner {
          background-color: $erinputbgc;
        }
        .el-select {
          width: 100%;
        }
        .el-date-editor {
          width: 100%;
          span {
            width: 8%;
          }
          .el-range-input {
            background-color: #f0f4fa;
          }
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
      &.text2 {
        .el-form-item__content {
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
      // 两个时间
      &.dategroup {
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
          .el-date-editor {
            max-width: 160px;
            display: inline-block;
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
    }
    .form-cont {
      padding-bottom: 16px;
      margin-bottom: 40px;
      border-bottom: 1px solid $erpBK;
      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
        margin-bottom: 0;
      }
    }
  }
  .el-dialog__footer {
    padding: 0px 20px 40px !important;
    text-align: center !important;
  }
}
</style>