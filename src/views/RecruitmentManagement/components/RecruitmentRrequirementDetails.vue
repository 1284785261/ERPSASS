//查看招聘需求详情
<template>
  <div>
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="Details-box">
      <div class="babel">
        <div class="title-name">基本信息</div>
        <div class="babel-container">
          <el-row class="follow-row">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">招聘岗位</div>
                <div class="content-detail" v-if="ProjectDetail.PositionName">{{ProjectDetail.PositionName}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">岗位人数</div>
                <div class="content-detail" v-if="ProjectDetail.NeedNum">{{ProjectDetail.NeedNum}}人</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">管理费</div>
                <div class="content-detail" v-if="ProjectDetail.MgrFee">{{ProjectDetail.MgrFee}}元</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">上岗地址</div>
                <div class="content-detail" v-if="ProjectDetail.AreaName">{{ProjectDetail.AreaName | AddressFiltering}}{{ProjectDetail.Address}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">上班时间</div>
                <div class="content-detail" v-if="ProjectDetail.WorkTime">{{ProjectDetail.WorkTime | Time}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">到岗时间</div>
                <div class="content-detail" v-if="ProjectDetail.OnBoardTime">{{ProjectDetail.OnBoardTime | Time}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">倒班时间</div>
                <div class="content-detail" v-if="ProjectDetail.ChangeTime">{{ProjectDetail.ChangeTime}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">休息时间</div>
                <div class="content-detail" v-if="ProjectDetail.RestTime">{{ProjectDetail.RestTime}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="content">
                <div class="content-label">岗位要求</div>
                <div class="content-detail" v-if="ProjectDetail.Skills">{{ProjectDetail.Skills}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="content">
                <div class="content-label">工作内容及职责</div>
                <div class="content-detail" v-if="ProjectDetail.Description">{{ProjectDetail.Description}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="babel">
        <div class="title-name">福利待遇</div>
        <div class="babel-container">
          <el-row class="follow-row">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">试用期薪资</div>
                <div class="content-detail" v-if="ProjectDetail.SalaryTry">{{ProjectDetail.SalaryTry}}元</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">试用期限</div>
                <div class="content-detail" v-if="ProjectDetail.TryTime">{{ProjectDetail.TryTime}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">综合薪资</div>
                <div class="content-detail" v-if="ProjectDetail.Salary">{{ProjectDetail.Salary}}元</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">是否包吃住</div>
                <div class="content-detail" v-if="ProjectDetail.LiveEat">{{ProjectDetail.LiveEat}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">五险一金</div>
                <div class="content-detail" v-if="ProjectDetail.SiFund">{{ProjectDetail.SiFund}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">全勤奖</div>
                <div class="content-detail" v-if="ProjectDetail.FullTudy">{{ProjectDetail.FullTudy}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">岗位补贴</div>
                <div class="content-detail" v-if="ProjectDetail.PostSupport">{{ProjectDetail.PostSupport}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">培训薪资</div>
                <div class="content-detail" v-if="ProjectDetail.TrainSalary">{{ProjectDetail.TrainSalary}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">其他补贴/福利</div>
                <div class="content-detail" v-if="ProjectDetail.OtherWelfare">{{ProjectDetail.OtherWelfare}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">加班补贴</div>
                <div class="content-detail" v-if="ProjectDetail.OverTimeSupport">{{ProjectDetail.OverTimeSupport}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">应聘者需要提供的资料</div>
                <div class="content-detail" v-if="ProjectDetail.NeedMaterial">{{ProjectDetail.NeedMaterial}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">提成说明</div>
                <div class="content-detail" v-if="ProjectDetail.Commision">{{ProjectDetail.Commision}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">晋升空间</div>
                <div class="content-detail" v-if="ProjectDetail.Promotion">{{ProjectDetail.Promotion}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="footer-button">
        <el-button class="erpbtn" size="small" @click="cancel">关闭</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { GetProjectRecruitById } from '@/api/projectManagement.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import filters from '@/utils/filters'
import qs from 'qs'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '招聘需求管理',
        router: '/RecruitmentManagement/RecruitmentRequirements'
      }, {
        name: '查看招聘需求详情',
        router: ''
      }],
      ProjectDetail: {},
      Id: ''
    }
  },
  created () {
    this.Id = this.$route.query.Id
    this.getProjectRecruit()
  },
  methods: {
    // 获取招聘信息
    getProjectRecruit () {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectRecruitById(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.ProjectDetail = response.Data
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    cancel () {
      window.open('about:blank', '_self').close()
    },
  }
}
</script>
<style lang="scss" scoped>
.Details-box {
  margin: 20px;
  background: #fff;
}
.bread {
  margin-left: 24px;
  margin-bottom: 24px;
}
.babel {
  padding-bottom: 40px;
  padding: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .title-name {
    font-size: $f16;
    color: $erp333;
    position: relative;
    padding-left: 12px;
    line-height: 16px;
    font-weight: 700;
    margin-bottom: 24px;
    &::after {
      content: "";
      width: 4px;
      height: 16px;
      background-color: $erpcolor;
      position: absolute;
      left: 0;
    }
  }
  .babel-container {
    padding-bottom: 16px;
    border-bottom: 1px solid $erpBK;

    .content {
      display: flex;
      font-size: $f14;
      line-height: 14px;
      margin-bottom: 24px;
      .content-label {
        margin-right: 12px;
        width: 150px;
        text-align: right;
        font-weight: 700;
      }
      .content-detail {
        flex: 1;
        color: $erp999;
      }
    }
    .follow-row {
      padding-bottom: 16px;
      border-bottom: 1px solid $erpBK;
      margin-bottom: 40px;
      &:last-child {
        padding-bottom: 0;
        border-bottom: none;
        margin-bottom: 0;
      }
    }
  }
}
.footer-button {
  text-align: center;
  background: #ffffff;
  padding: 30px;
}
</style>