//发起招聘服务
<template>
  <div class="add-project-RecruitmentService">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="projectform" label-position="top" :model="recruitform" label-width="140px" class="projectform">
        <!-- 招聘业务信息 -->
        <div class="form-title">招聘业务信息</div>
        <div class="form-cont">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="招聘岗位">
                <el-input v-model="recruitform.PositionName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="岗位人数">
                <el-input v-model="recruitform.NeedNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="管理费">
                <el-input v-model="recruitform.MgrFee">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="上岗地址" class="path">
                <el-select v-model="postprovince" filterable placeholder="选择省份" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in postprovincelist" :key="index"></el-option>
                </el-select>
                <el-select v-model="postcity" filterable placeholder="选择城市" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in postcitylist" :key="index"></el-option>
                </el-select>
                <el-select v-model="recruitform.AreaId" filterable placeholder="选择区县" clearable>
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in postarealist" :key="index"></el-option>
                </el-select>
                <el-input v-model="recruitform.Address" placeholder="请输入详情地址" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="上班时间" class="datetime">
                <el-date-picker v-model="recruitform.WorkTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="到岗时间" class="datetime">
                <el-date-picker v-model="recruitform.OnBoardTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="倒班时间">
                <el-input v-model="recruitform.ChangeTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="休息时间">
                <el-input v-model="recruitform.RestTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
              <el-form-item label="岗位要求" class="text">
                <el-input type="textarea" :rows="6" v-model="recruitform.Skills" maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
              <el-form-item label="工作内容及职责" class="text">
                <el-input type="textarea" :rows="6" v-model="recruitform.Description" maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 福利待遇 -->
        <div class="form-title">福利待遇</div>
        <div class="form-cont">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="试用期薪资">
                <el-input v-model="recruitform.SalaryTry">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="试用期限">
                <!-- <el-date-picker v-model="recruitform.TryTime" type="datetimerange" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
                </el-date-picker> -->
                <el-input v-model="recruitform.TryTime" placeholder="请输入试用期限"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="综合薪资">
                <el-input v-model="recruitform.Salary">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="五险一金">
                <el-radio-group v-model="recruitform.SiFund">
                  <el-radio label="1">有</el-radio>
                  <el-radio label="0">无</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="是否包吃包住" class="text2">
                <el-input type="textarea" :rows="5" maxlength="100" show-word-limit v-model="recruitform.LiveEat"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="培训薪资" class="text2">
                <el-input type="textarea" :rows="5" maxlength="100" show-word-limit v-model="recruitform.TrainSalary"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="五险一金" class="text2">
                <!-- <el-radio-group v-model="recruitform.SiFund">
                  <el-radio label="1">有</el-radio>
                  <el-radio label="0">无</el-radio>
                </el-radio-group> -->
                <el-input type="textarea" :rows="5" maxlength="100" show-word-limit v-model="recruitform.SiFund"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="岗位补贴" class="text2">
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="recruitform.PostSupport"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="加班补贴" class="text2">
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="recruitform.OverTimeSupport"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="全勤奖" class="text2">
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="recruitform.FullTudy"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="提成说明" class="text2">
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="recruitform.Commision"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="其他补贴/福利" class="text2">
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="recruitform.OtherWelfare"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="晋升空间" class="text2">
                <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="recruitform.Promotion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
              <el-form-item label="应聘者需要提供的资料" class="text">
                <el-input type="textarea" :rows="6" v-model="recruitform.NeedMaterial" maxlength="500" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="bottom">
      <!-- 添加 -->
      <el-button class="erpbtn" size="small" @click="$router.go(-1)">取消</el-button>
      <el-button class="erpbtn" size="small" @click="addProjectRecruit('projectform')">保存</el-button>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { AddProjectRecruit } from '@/api/projectManagement.js'
import { GetAreaList } from '@/api/Public.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '项目管理',
        router: '/projectManagement/ProjectManagement'
      }, {
        name: '发起招聘服务',
        router: ''
      }],
      // 上岗地址
      postprovince: '',
      postcity: '',
      postprovincelist: [],
      postcitylist: [],
      postarealist: [],
      ProjectId: '',
      recruitform: {
        AreaId: ''
      },

      operating: {},
    }
  },
  watch: {
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
        this.recruitform.AreaId = ''
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
              return v.Id == this.recruitform.AreaId
            })
            if (isclear) {
            } else {
              this.recruitform.AreaId = ''
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
        this.recruitform.AreaId = ''
      }
    },
    // 上岗地址反推
    "recruitform.AreaId" (newvalue, oldvalue) {
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
              this.recruitform.AreaId = select.find(v => v.Level == 3).Id
            } else {
              this.recruitform.AreaId = ''
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    }
  },
  created () {
    // 获取操作operating
    this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
    this.getAreaList()
    this.ProjectId = this.$route.query.Id
  },
  methods: {
    // 获取省地址列表
    getAreaList () {
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
    addProjectRecruit (from) {
      this.$refs[from].validate((valid) => {
        if (valid) {
          let obj = this.recruitform
          // 处理上岗地址
          obj.AreaId = this.recruitform.AreaId || this.postcity || this.postprovince
          obj.ProjectId = this.ProjectId
          obj.menuid = MenuIdDate(),
            obj.operationcode = '1'
          // obj.TryTime = obj.TryTime.join(',')
          AddProjectRecruit(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              this.$message({
                message: '发起招聘成功',
                type: 'success'
              })
              this.$router.go(-1)
            } else {
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.add-project-RecruitmentService {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .projectform {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 80px 40px;
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
      margin-bottom: 20px;
      .el-form-item__label {
        line-height: 14px;
        font-size: $f14;
        color: $erp666;
        font-weight: 400;
        padding-bottom: 8px;
      }
      .el-form-item__content {
        width: calc(100% - 64px);
        .el-input__inner {
          background-color: $erinputbgc;
        }
        .el-select {
          width: 100%;
        }
        .el-date-editor--datetimerange {
          width: 100%;
          border: 1px solid #fff;
        }
      }
      input {
        background: #f0f4fa;
        border: none;
        height: 40px;
        line-height: 40px;
      }
      textarea {
        background: #f0f4fa;
        border: none;
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
            resize: none;
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
            resize: none;
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
    // 循环的样式
    .form-cont {
      padding-bottom: 16px;
      margin-bottom: 40px;
      border-bottom: 1px solid $erpBK;
      &:last-child {
        border-bottom: none;
      }
      .post-list {
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
          // position: absolute;
          // right: 0;
          // bottom: 0px;
          justify-content: flex-end;
          display: flex;
        }
        .btn {
          cursor: pointer;
          margin-left: 64px;
          font-size: $f14;
          color: $erpplaceholder;
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