// 跟进信息详情
<template>
  <div class="follow-detail-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false"/>
    </div>
    <div class="detail-content">
      <div class="babel">
        <div class="title-name">客户跟进信息</div>
        <div class="babel-container" v-for="(item, index) in customerfollow" :key="index">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="content">
                <div class="content-label">跟进时间</div>
                <div class="content-detail">{{item.AddTime | Time}}</div>
              </div>
              <div class="content">
                <div class="content-label">跟进人</div>
                <div class="content-detail">{{item.SysUserName}}</div>
              </div>
              <div class="content">
                <div class="content-label">跟进内容</div>
                <div class="content-detail text">{{item.Content}}
                </div>
              </div>
              <div class="content">
                <div class="content-label">跟进阶段</div>
                <div class="content-detail">{{item.StepText}}</div>
              </div>
              <div class="content">
                <div class="content-label">关联的待办任务</div>
                <div class="content-detail">{{item.TaskContent}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { GetCompanyFollowList } from '@/api/CustomerManagement.js'
import { showLoading, hideLoading, MenuIdDate } from '@/utils/CustomValidation.js'
import filters from '@/utils/filters.js'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
  },
  data() {
    return {
      urlList: [{
        name: '我的客户',
        router: '/CustomerManagement/MyCustomer'
      }, {
        name: '客户跟进信息',
        router: ''
      }],
      customerfollow: [], // 客户信息
      Id: '', // 客户Id
      operating: {}, // 页面权限
    }
  },
  created() {
    // 获取操作operating
    this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
    
    this.Id = this.$route.query.id
    // 获取面包屑的内容
    let breadpath = JSON.parse(window.localStorage.getItem('breadpath')) || {}
    if (breadpath.router) {
      this.urlList[0] = breadpath
    }
    this.getCompanyFollowList()
  },
  methods: {
    // 获取跟进信息
    getCompanyFollowList() {
      let obj = {
        CompanyId: this.Id,
        menuid: this.operating.MenuId,
        operationcode: this.operating.OperationCode
      }
      GetCompanyFollowList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.customerfollow = response.Data
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
}
</script>

<style lang="scss">
  .follow-detail-container {
    .bread {
      margin-left: 24px;
      margin-bottom: 24px;
    }
    .detail-content {
      border-radius: 8px 0 0 8px;
      background-color: #fff;
      margin-left: 24px;
      padding: 40px 24px 40px 40px;
      .babel {
        // margin-bottom: 40px;
        .title-name {
          font-size: $f16;
          color: $erp333;
          position: relative;
          padding-left: 12px;
          line-height: 16px;
          font-weight: 700;
          margin-bottom: 24px;
          &::after {
            content: '';
            width: 4px;
            height: 16px;
            background-color: $erpcolor;
            position: absolute;
            left: 0;
          }
        }
        .babel-container {
          margin-right: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid $erpBK;
          margin-top: 40px;
          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            border-bottom: none;
          }
          .content {
            display: flex;
            font-size: $f14;
            line-height: 14px;
            margin-bottom: 24px;
            .content-label {
              margin-right: 12px;
              width: 114px;
              text-align: right;
              font-weight: 700;
            }
            .content-detail {
              flex: 1;
              color: $erp999;
              &.text {
                max-width: 600px;
              }
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
          // 附件样式
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
                background-color: #F0F4FA;
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
                  word-break:break-all;
                  overflow: hidden;
                  display: -webkit-box;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 2;  /*要显示的行数*/
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
                background-color: rgba(0,0,0,1);
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
                  }
                  > span {
                    font-size: $f14;
                    color: #fff;
                  }
                }
                .btn+.btn {
                  margin-left: 24px;
                }
              }
            }
            .img-box-list+.img-box-list {
              margin-left: 24px;
            }
          }
        }
      }
    }
  }
</style>