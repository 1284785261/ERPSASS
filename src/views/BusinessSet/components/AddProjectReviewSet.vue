// 新建项目审核流程设置
<template>
  <div class="add-project-review-set-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="content">
      <div class="operate clearfix">
        <ul class="reviewlist">
          <li :class="{active: reviewindex==index}" v-for="(item, index) in reviewlist" :key="index" @click.stop="changetab(item)">
            <span>{{item.name}}</span>
            <i class="el-icon-close" @click.stop="deletetab(item)"></i>
          </li>
        </ul>
        <el-button size="small" class="addreview erpbtn" @click="addreview">新增审核人</el-button>
      </div>
      <div class="operate-content">
        <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="审核人维度" prop="name">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio :label="0">个人</el-radio>
                  <el-radio :label="1">角色</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="营销属性" prop="name">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio :label="0">不限</el-radio>
                  <el-radio :label="1">专职</el-radio>
                  <el-radio :label="2">全职</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="是否一票否决">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="选择审核人">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="适用项目业务类型">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="审核权限">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio :label="0">审核</el-radio>
                  <el-radio :label="1">知会</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="审核顺序">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="适用功能">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="适用对象">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item class="operate">
                <el-button @click="cancelform" size="small" class="erpbtn">取消</el-button>
                <el-button @click="saveform" size="small" class="erpbtn">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import {copy} from '@/utils/CustomValidation.js'
export default {
  components: {
    BreadCrumb
  },
  data() {
    return {
      urlList: [{
        name: '项目审核流程设置',
        router: '/SystemSetting/ProjectReviewSetting'
      }, {
        name: '添加项目审核流程设置',
        router: ''
      }],
      ruleForm: {},
      rules: {},
      reviewindex: 0,
      reviewlist: [{
        index: 0,
        name: '审核人1'
      },{
        index: 1,
        name: '审核人2'
      },{
        index: 2,
        name: '审核人3'
      }]
    }
  },
  methods: {
    // 切换tab栏
    changetab(e) {
      this.reviewindex = e.index
    },
    // 新增审核人
    addreview() {
      this.reviewlist.push({
        index: this.reviewlist.length,
        name: `审核人${this.reviewlist.length+1}`
      })
    },
    // 删除审核人
    deletetab(e) {
      var newarry = []
      for (let i = 0; i < this.reviewlist.length; i++) {
        if (this.reviewlist[i].index !== e.index) {
          newarry.push(this.reviewlist[i])
        }
      }
      this.reviewlist = copy(newarry)
    },
    // 取消
    cancelform() {

    },
    // 保存
    saveform() {

    }
  },
}
</script>

<style lang="scss">
  .add-project-review-set-container {
    .bread {
      margin-left: 24px;
      margin-bottom: 24px;
    }
    .content {
      margin-left: 24px;
      .operate {
        .reviewlist {
          > li {
            float: left;
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: relative;
            background-color: #A3B1CC;
            color: #fff;
            margin-right: 4px;
            border-radius:8px 8px 0px 0px;
            cursor: pointer;
            > i {
              width: 16px;
              height: 16px;
              background-color: #fff;
              border-radius: 8px;
              color: #A3B1CC;
              font-weight: 700;
              top: -8px;
              right: 0px;
              position: absolute;
            }
            &.active {
              background-color: #fff;
              color: $erp333;
            }
          }
        }
        .addreview {
          float: right;
        }
      }
      .operate-content {
        background-color: #fff;
        padding: 40px 40px 0px 40px;
          .el-form-item {
          margin-bottom: 24px;
          max-width: 336px;
          height: 69px;
          .el-form-item__label {
            line-height: 28px;
            font-size: $f14;
            color: $erp666;
            font-weight: 400;
            padding: 0;
          }
          .el-form-item__content {
            .el-input__inner {
              background-color: $erinputbgc;
            }
          }
          &.operate {
            height: 100%;
            max-width: 100%;
            text-align: center;
            .el-button+.el-button {
              margin-left: 24px;
            }
          }
        }
      }
    }
  }
</style>