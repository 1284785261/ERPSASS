<template>
  <div class="dashboard-container">
    <div class="dashboard-matters">
      <p class="dashboard-title">待办事项</p>
      <div class="dashboard-matters-todo">
        <div v-for="(item,index) in mattersList" :key="index" class="todo-box">
          <router-link to="" @click.native="Gotojump(item)">
            <toDo :icon="item.Icon" :title="item.Title" :numbers="item.Number" :unit="item.unit"></toDo>
          </router-link>
        </div>
      </div>
    </div>
    <div class="dashboard-centent">
      <div class="dashboard-left">
        <div>
          <p class="dashboard-title">营销趋势</p>
          <div class="Echart echart-module">
            <brokenLine :Data="marketData"></brokenLine>
          </div>
        </div>
        <div>
          <p class="dashboard-title">新增客户</p>
          <div class="progress">
            <div class="Title2-box" v-if="customerContent.length > 0">
              <span>客户名称</span>
              <span>业务人员名称</span>
              <span class="time">时间</span>
            </div>
            <div class="progress1 erpscroll" v-loading="progress1Show" v-if="customerContent.length > 0">
              <div class="progress-list" v-for="(item,index) in customerContent" :key="index">
                <div class="steps-two">
                  <div class="border"></div>
                  <div class="item-check2">
                    <svg-icon icon-class="check" class-name="check" />
                    <div class="item-check-box">
                      <span style="margin-left:30px;" :title="item.CompanyName">{{item.CompanyName}}</span>
                      <span>{{item.SysUserName}}</span>
                      <span>{{item.AddTime | YYMMddhhmmssTime}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="noData-box">
              <svg-icon icon-class="noData" class-name="noData-icon" />
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-right">
        <p class="dashboard-title">项目进展</p>
        <div class="progress">
          <div class="Title-box">
            <span>操作</span>
            <span class="time">时间</span>
          </div>
          <div class="progress2 erpscroll" v-infinite-scroll="load" infinite-scroll-immediate="false">
            <div class="progress-list" v-for="(item,index) in porjectContent" :key="index">
              <div class="steps-two">
                <div class="border"></div>
                <div class="item-check">
                  <svg-icon icon-class="check" class-name="check" />
                  <div class="item-check-box">
                    <div><span style="color:#1588f8;display: inline-block;">{{item.ProjectName}}</span>——<span style="color:#1588f8;display: inline-block;">{{item.SysUserName}}</span>{{item.Content}}</div>
                    <span class="time">{{item.AddTime | YYMMddhhmmssTime}}</span>
                  </div>
                </div>
              </div>
            </div>
            <p class="Titleprompt" v-if="loading">加载中...</p>
            <p class="Titleprompt" v-if="noMore && !loading">没有更多了</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import toDo from '@/components/workbench/to-do'
import brokenLine from '@/components/workbench/broken-line'
import { GetWorktableToDo, GetWorktableNewCompany, GetWorkAchientOfOneself, GetWorktableProjectAllLog } from '@/api/Workbench.js'
import filters from '@/utils/filters'
import { debounce, showLoading, hideLoading, MenuIdDate } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  name: 'Dashboard',
  components: {
    toDo,
    brokenLine
  },
  data () {
    return {
      result: false,
      marketData: {
        WeekData: [],
        AmountData: []
      },
      mattersList: [],
      number: 2,
      customerContent: [],
      porjectContent: [],
      loading: false,
      progress1Show: false,
      PageIndex: 1,
      PageSize: 20,
      TotalPage: 0
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    noMore () {
      //当起始页数大于总页数时停止加载
      return this.PageIndex >= this.TotalPage - 1;
    },
  },
  created () {
    this.getTableToDo()
    this.getCustomer()
    this.GetWorkAchient()
    this.GetWorkAlltable()

  },
  mounted () {
  },
  methods: {
    //获取代办事项
    getTableToDo () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetWorktableToDo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.mattersList = response.Data
            for (let i = 0; i < this.mattersList.length; i++) {
              if (this.mattersList[i].Title == '即将插入公海的客户') {
                this.mattersList[i].Router = '/CustomerManagement/MyCustomer'
                this.$set(this.mattersList[i], 'unit', '位')
              }
              if (this.mattersList[i].Title == '待上传合同的项目') {
                this.mattersList[i].Router = '/projectManagement/ParticipateProject?Status=-1'
                this.$set(this.mattersList[i], 'unit', '项')
              }
              if (this.mattersList[i].Title == '待服务的项目') {
                this.mattersList[i].Router = '/projectManagement/ParticipateProject?Status=5'
                this.$set(this.mattersList[i], 'unit', '项')
              }
              if (this.mattersList[i].Title == '待到期续签的项目') {
                this.mattersList[i].Router = '/projectManagement/ParticipateProject?Status=-1'
                this.$set(this.mattersList[i], 'unit', '项')
              }
              if (this.mattersList[i].Title == '已到期的项目') {
                this.mattersList[i].Router = '/projectManagement/ParticipateProject?Status=-1'
                this.$set(this.mattersList[i], 'unit', '项')
              }
              if (this.mattersList[i].Title == '待上传合同的员工') {
                this.mattersList[i].Router = '/OutsourcedEmployeeManagement/ExpatriateManagement'
                this.$set(this.mattersList[i], 'unit', '项')
              }
              if (this.mattersList[i].Title == '待到期续签的员工') {
                this.mattersList[i].Router = '/OutsourcedEmployeeManagement/ExpatriateManagement'
                this.$set(this.mattersList[i], 'unit', '位')
              }
              if (this.mattersList[i].Title == '已过期的员工') {
                this.mattersList[i].Router = '/OutsourcedEmployeeManagement/ExpatriateManagement'
                this.$set(this.mattersList[i], 'unit', '位')
              }
              if (this.mattersList[i].Title == '待招聘的需求') {
                this.mattersList[i].Router = '/RecruitmentManagement/RecruitmentRequirements'
                this.$set(this.mattersList[i], 'unit', '条')
              }
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //获取新增客户
    getCustomer () {
      this.progress1Show = true
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetWorktableNewCompany(qs.stringify(obj)).then(response => {
        this.progress1Show = false
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.customerContent = response.Data

          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }

      })
    },
    //获取营销数据
    GetWorkAchient () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetWorkAchientOfOneself(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            let arr = response.Data
            for (let i = 0; i < arr.length; i++) {
              this.marketData.WeekData.push(arr[i].Week)
              this.marketData.AmountData.push(arr[i].Amount)
            }
          } else {
            this.marketData = {
              WeekData: [
                "周一", "周二", "周三", "周四", "周五", "周六", "周日"
              ],
              AmountData: [0, 0, 0, 0, 0, 0, 0]
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }

      })
    },
    async GetWorkAlltable () {
      let obj = {
        PageIndex: this.PageIndex,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      await GetWorktableProjectAllLog(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.porjectContent = this.porjectContent.concat(response.Data)
            this.TotalPage = Math.ceil(response.Total / this.PageSize)
            this.loading = false
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.PageIndex += 1
        if (this.PageIndex > this.TotalPage) {
          this.loading = false
          return
        }
        debounce(this.GetWorkAlltable())
      }, 500)
    },
    //代办事项跳转页面
    searchrouter (list, name) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].children && list[i].children.length) {
          this.searchrouter(list[i].children, name)
        } else {
          if (list[i].path.indexOf(name) !== -1) {
            console.log(list[i]);
            console.log(this);
            this.result = true
            console.log(this.result);
            return
          }
        }
      }
    },
    Gotojump (item) {
      function getlast (params) {
        let str = params.split('/')
        var index = str[str.length - 1].indexOf('?') !== -1 ? str[str.length - 1].indexOf('?') : str[str.length - 1].length
        return str[str.length - 1].slice(0, index)
      }

      console.log(item);
      if (window.localStorage.getItem('setRouter')) {
        // 判断是否有这个页面
        let urlname = getlast(item.Router)
        let routerlist = JSON.parse(window.localStorage.getItem('setRouter'))
        console.log(urlname);
        console.log(routerlist);
        this.result = false
        this.searchrouter(routerlist, urlname)
        console.log(this.result);
        if (this.result) {
          if (item.Router && item.Number > 0) {
            this.$router.push(item.Router)
            this.$router.push({
              path: item.Router,
              query: {
                IdArr: item.Ids
              }
            })
          } else {
            this.$message({
              message: '暂无待办事项',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '无权限跳转页面',
            type: 'warning'
          })
          return
        }
      } else {
        this.$message({
          message: '无权限跳转页面',
          type: 'warning'
        })
        return
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  background: #f0f4fa;
  padding: 24px;
  .dashboard-matters {
    .dashboard-title {
      color: #333333;
      font-size: 18px;
      font-weight: 900;
    }
    .dashboard-matters-todo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .todo-box {
        width: 30%;
        min-width: 320px;
      }
    }
  }
  .dashboard-centent {
    overflow: hidden;
    min-width: 1000px;
    .dashboard-left {
      width: 49%;
      min-width: 20%;
      float: left;
      margin-right: 2%;
    }
    .dashboard-right {
      float: left;
      width: 49%;
      min-width: 20%;
    }
    .dashboard-title {
      color: #333333;
      font-size: 18px;
      font-weight: 900;
    }
    .Echart {
      min-height: 330px;
      background: #fff;
      border-radius: 8px;
    }
    .progress {
      min-height: 400px;
      max-height: 824px;
      background: #fff;
      border-radius: 8px;
      padding: 20px;
      .Title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        span {
          margin: 0 15%;
          color: #333333;
          font-weight: 600;
        }
      }
      .Title2-box {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
        margin-left: 32px;
        span {
          color: #333333;
          font-weight: 600;
          width: 30%;
          display: inline-block;
          text-align: center;
          margin-left: 5px;
        }
      }
      .progress1 {
        max-height: 318px;
        overflow-y: auto;
      }
      .progress2 {
        height: 750px;
        overflow-y: auto;
        .Titleprompt {
          text-align: center;
        }
      }
      .progress-list {
        padding: 0 20px 0 20px;
        .steps-two {
          position: relative;
          .border {
            width: 2px;
            height: 100%;
            background: #e5e5e5;
            position: absolute;
          }
          .item-check {
            line-height: 40px;
            position: relative;
            .check {
              position: absolute;
              left: -5px;
              top: 15px;
              font-size: 12px;
              fill: #e5e5e5;
            }
            .item-check-box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 20px;
              div {
                display: inline-block;
                font-size: 14px;
                margin-left: 30px;
                line-height: 28px;
                max-width: 500px;
              }
              .time {
                width: 160px;
              }
            }
          }
          .item-check2 {
            line-height: 40px;
            position: relative;
            .check {
              position: absolute;
              left: -5px;
              top: 9px;
              font-size: 12px;
            }
            .item-check-box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 20px;
              span {
                display: inline-block;
                font-size: 14px;
                margin-left: 40px;
                line-height: 28px;
                text-align: center;
                width: 300px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
              }
            }
          }
        }
      }
    }
    .echart-module {
      overflow: hidden;
      span {
        display: inline-block;
        font-size: 16px;
        margin-top: 30px;
        padding-left: 20px;
      }
      button {
        float: right;
        margin: 20px;
      }
    }
  }
}
.noData-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 360px;
  .noData-icon {
    font-size: 300px;
  }
}
</style>