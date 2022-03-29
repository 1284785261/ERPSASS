<template>
  <div v-if="isRouterAlive">
    <header>
      <a class="logo" @click="openwork">
        <img src="@/assets/logo2.png" alt="锦绣前程猎头Saas系统">
      </a>

      <div class="right-menu">
        <div class="avatar-container" :class="[ishow(addrouter, 'System', 'path')? '':'avatas']">
          <span class="name">{{informationForm.UserName}}</span>
          <el-dropdown trigger="click" placement="bottom">
            <div class="avatar-wrapper">
              <img v-if="informationForm.Portrait" :src="informationForm.Portrait" class="user-avatar">
              <svg-icon v-else icon-class="circularHead" class-name="circularHead" />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <el-dropdown-item @click.native="updatepassword">
                <svg-icon icon-class="password2" class-name="password-icon" />修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="updateinformation">
                <svg-icon icon-class="edit" class-name="edit-icon" />编辑资料</el-dropdown-item>
              <!-- <el-dropdown-item class="del" @click="logouts">
                <svg-icon icon-class="cancellation2" class-name="cancellation-icon" />退出</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="buttons">
          <!-- <router-link v-if="ishow(addrouter, 'System', 'path')" to="" @click.native="handleSetting">
            <a>
              <svg-icon icon-class="setting2" class-name="card-panel-icon" />
            </a>
          </router-link> -->
          <!-- <span class="slod" /> -->
          <router-link to="" @click.native="logouts">
            <svg-icon icon-class="cancellation" class-name="card-panel-icon close" />
            <span>退出</span>
          </router-link>
        </div>
      </div>

      <div class="center-menu" v-if="ShowSetting">
        <!-- 工作台 -->
        <a @click="handleSetting" v-if="iscallbackset()">
          <svg-icon icon-class="setting2" class-name="setting" />
          <span>设置</span>
        </a>
        <a @click="callbackwork" v-if="!iscallbackset()">
          <svg-icon icon-class="setting2" class-name="setting" />
          <span>返回工作台</span>
        </a>
      </div>
      <div class="center-menu">
        <!-- 消息 -->
        <a @click="handleRemind" class="news">
          <svg-icon icon-class="message" class-name="setting" />
          <span>消息</span>
        </a>
      </div>
      <!-- <div class="center-menu">
        投屏
        <a @click="handleSetting" class="news">
          <svg-icon icon-class="Forscreen" class-name="setting" />
          <span>投屏</span>
        </a>
      </div> -->
      <div class="center-menu">
        <!-- 提醒 -->
        <a @click="handleWarn" class="news">
          <svg-icon icon-class="remind" class-name="setting" />
          <span>提醒</span>
        </a>
      </div>
    </header>

    <el-drawer :visible.sync="drawer" custom-class="right-resume" :size="drawersize" :modal="false" :show-close="false" direction="ttb">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <span>待处理（{{ Notmessage.length }}）</span>
            <!-- <span class="allbutton" @click.stop="Editstatus">批量标记为已处理</span> -->
          </template>
          <div v-if="Notmessage.length > 0">
            <div v-for="(item,index) in Notmessage" :key="index" class="remind-card">
              <div class="card-title">
                <el-checkbox v-model="item.checked" class="sasscheck">
                  <el-badge is-dot>{{ item.TypeText }}</el-badge>
                </el-checkbox>
                <div class="del" @click="DelMessage(item)">
                  <svg-icon icon-class="deletes" class-name="" />
                </div>
                <span class="titles" @click="EditMessage(item)">标记为已处理</span>
              </div>
              <div class="card-content">
                <div class="card-detail" @click="watchdetail(item)">{{ item.Content }}</div>
                <div class="card-time">{{ item.RemindTimeList[0] | RemindTime}}</div>
              </div>
            </div>
          </div>
          <div v-else class="NoData">
            <span>暂无数据！</span>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span>已处理（{{ message.length }}）</span>
            <span class="alldelete allbutton" @click.stop="AllDelete">批量删除</span>
          </template>
          <div v-if="message.length > 0">
            <div v-for="(item,index) in message" :key="index" class="remind-card">
              <div class="card-title">
                <el-checkbox v-model="item.checked" class="sasscheck">{{ item.TypeText }}
                </el-checkbox>
                <div class="del" @click="DelMessage(item)">
                  <svg-icon icon-class="deletes" class-name="" />
                </div>
              </div>
              <div class="card-content">
                <div class="card-detail" @click="watchdetail(item)">{{ item.Content }}</div>
                <div class="card-time">{{ item.RemindTimeList[0] | RemindTime}}</div>
              </div>
            </div>
          </div>
          <div v-else class="NoData">
            <span>暂无数据！</span>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-drawer>

    <el-dialog :close-on-click-modal="false" :title="dialogtitle" :visible.sync="dialogVisible" custom-class="remind-dialog" width="600px" :before-close="handleClose2">
      <div class="time">{{ reminddetail.RemindTime | formatTime }}</div>
      <div class="content">{{ reminddetail.Content }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button round size="mini" @click="DelMessage(reminddetail)">删除</el-button>
      </span>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" title="修改密码" :visible.sync="passwordVisible" class="dialog-box password-dialog" :show-close="false" width="400px" :before-close="handleClose">
      <i class="el-icon-circle-close closeButton" @click="passwordVisible = false"></i>
      <el-form ref="passwordForm" :model="passwordForm" status-icon :rules="rules" label-width="80px" class="passwordForm">
        <el-form-item label="旧密码" prop="oldpass">
          <el-input v-model="passwordForm.oldpass" class="grayinput" type="password" size="mini" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="passwordForm.pass" class="grayinput" type="password" size="mini" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="passwordForm.checkPass" class="grayinput" type="password" size="mini" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="footer-button">
        <el-button class="erpbtn" round size="small" @click="savepassword">保存</el-button>
        <el-button class="erpbtn" round size="small" @click="passwordVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 提醒设置 -->
    <AddRemind :showRemind="showRemind" :title="Remindtitle" :showType="true" @closeshowAddRemind="closeshowAddRemind" @AddRemindSave="AddRemindSave"></AddRemind>

    <el-dialog :close-on-click-modal="false" title="编辑资料" :visible.sync="informationVisible" class="dialog-box" :show-close="false" width="600px" :before-close="handleClose">
      <i class="el-icon-circle-close closeButton" @click="informationVisible = false"></i>
      <el-form ref="informationForm" :model="editform" status-icon :rules="rules" label-width="120px" class="informationForm">
        <!-- <el-form-item label="头像" prop="" class="label-item">
          <el-upload v-loading="loading" class="avatar-uploader" action="http://upload.brifure.com/service" :data="canshu" :show-file-list="false" :on-success="handleAvatarSuccess" :on-progress="uploadVideoProcess" :before-upload="beforeAvatarUpload">
            <img v-if="editform.Portrait" :src="editform.Portrait" class="avatar">
            <svg-icon v-else icon-class="circularHead" class-name="circularHead2" />
          </el-upload>
        </el-form-item> -->
        <el-form-item label="姓名" prop="UserName">
          <el-input v-model="editform.UserName" type="text" size="mini" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" prop="Sex">
          <el-select v-model="editform.Sex" size="mini" clearable class="Sex-input">
            <el-option label="女士" :value="0" />
            <el-option label="先生" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="Mobile">
          <el-input v-model="editform.Mobile" type="number" clearable size="mini" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="Email">
          <el-input v-model="editform.Email" type="text" clearable size="mini" autocomplete="off" />
        </el-form-item>
        <el-form-item label="微信号码" prop="WxOpenId">
          <el-input v-model="editform.WxOpenId" type="text" clearable size="mini" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数据访问权限:" prop="">
          <span>{{ editform.RightOrgRange }}</span>
        </el-form-item>
        <el-form-item label="功能操作权限:" prop="">
          <span>{{ editform.CompanyRoleId }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="erpbtn" round size="small" @click="updatePortrait">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { AddFinanceContract } from '@/api/financial'
import { GetMyRemindList, EditRemindStatus, DeleteRemind, GetRemind, AddReminds } from '@/api/Remind'
import { getrouter } from '@/router/addrouter.js'
import { MemberLoginOut } from '@/api/Login.js'
import { GetCurrentSysUser, EditSysUserPassward, EditSysUser } from '@/api/SystemSetting.js'
import AddRemind from '@/components/publicComponents/AddRemind'
// import { GetCurrentMember, EditMemberPassward, EditMemberPortrait, EditMember } from '@/api/Authority/account'
import filters from '@/utils/filters'
import { mapGetters } from 'vuex'
import { menuishow, copy, showLoading, hideLoading, MenuIdDate } from '@/utils/CustomValidation'
import { getmenu } from '@/router/addrouter.js'
import qs from 'qs'
export default {
  components: {
    AddRemind
  },
  filters: {
    formatTime (val) {
      if (val) {
        return new Date(val).Format('yyyy年MM月dd日 hh时mm分ss秒')
      } else {
        return '——'
      }
    },
    RemindTime (val) {
      if (val) {
        if (val == '0001-01-01T00:00:00') {
          return '——'
        } else {
          val = val.replace(new RegExp(/-/g), "/");
          return new Date(val).Format('yyyy-MM-dd hh:mm:ss')
        }
      } else {
        return '——'
      }
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passwordForm.checkPass !== '') {
          this.$refs.passwordForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      activeNames: ['2'],
      drawer: false,
      drawersize: '',
      screenHeight: document.body.clientHeight,
      timer: false,
      checked: false,
      dialogtitle: '', // 消息标题
      dialogVisible: false, // 消息弹框隐藏
      passwordVisible: false, // 修改密码弹框隐藏
      informationVisible: false, // 编辑资料弹框
      contractVisible: false, // 上传合同弹框
      projeclist: [], // 相关项目列表
      editData: {},
      rules: {
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      passwordForm: {
        oldpass: '',
        pass: '',
        checkPass: ''
      },
      informationForm: {
        name: '',
        Sex: ''
      },
      interval: 300000,
      instance: null,
      TimeList: [],
      DontRepeat: [],
      Repeat: [],
      timeInterval1: null,
      timeInterval2: null,
      Notmessage: [],
      message: [],
      addrouter: [], // 菜单
      loading: false,
      canshu: {},
      editform: {},
      reminddetail: {}, // 项目详情
      addresume: '', // 添加简历权限
      addproject: '', // 添加项目权限
      addEmployer: '', // 添加公司权限
      showRemind: false, // 提醒
      Remindtitle:'添加提醒',
      ShowSetting: false,
      isRouterAlive: true
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'setrouter'
      // 'activeIndex',
      // 'relatedProject'
      // 'addrouter'
    ])
  },
  watch: {
    screenHeight (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenHeight = val
        this.timer = true
        const that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          that.timer = false
        }, 400)
      }
    },
    // $route: {
    //   handler (val, oldval) {
    //     this.$refs.menuref.activeIndex = this.$route.meta.amount
    //   }
    // },
    // activeIndex (val, oldval) {
    //   this.$refs.menuref.activeIndex = val
    // }
  },
  mounted () {
    const that = this
    this.drawersize = ((this.screenHeight - 60) / this.screenHeight) * 100 + '%'
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
  },
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    // this.activeIndex2 = this.$route.meta.amount
    // this.projeclist = this.relatedProject
    // console.log(JSON.parse(window.localStorage.getItem('setRouter')))

    this.getRemind()
    this.getmessageList()
    this.timeInterval1 = setInterval(() => {
      this.getRemind()
    }, this.interval)

    this.timeInterval2 = setInterval(() => {
      if (this.TimeList.length > 0) {
        setTimeout(this.intervalTimer(), 0)
      }
    }, 1000)
    // this.addrouter = JSON.parse(localStorage.getItem('addrouter'))
    //获取当前账号
    GetCurrentSysUser(qs.stringify({ 'menuid': MenuIdDate(), 'operationcode': '1' })).then(response => {
      if (response.IsSuccess) {
        // console.log(response.Data);
        this.informationForm = response.Data
      } else {
        this.$message({
          message: response.MessageContent,
          type: 'error'
        })
      }
    })
    this.canshu = { message: "{ImageStreamName:'file',BussinessType:0}" }
    this.ShowSetting = window.localStorage.getItem('ShowSetting') == "true" ? true : false
  },
  destroyed () {
    // 组件销毁，关闭定时执行
    window.clearInterval(this.timeInterval1)
    window.clearInterval(this.timeInterval2)
  },
  methods: {
    iscallbackset () {
      if (this.$route.meta.amount !== '7') {
        return true
      } else {
        return false
      }
    },
    // 打开工作台
    openwork () {
      this.$router.push({
        path: '/'
      })
      this.$store.dispatch('app/chooseRouter', {
        amount: '1'
      })
    },
    // 获取消息列表数据
    getmessageList () {
      const obj = {
        Status: 0,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      const obj2 = {
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetMyRemindList(qs.stringify(obj)).then(response => {
        if (response.Data) {
          this.Notmessage = response.Data
          for (let i = 0; i < this.Notmessage.length; i++) {
            this.Notmessage[i].RemindTimeList = this.Notmessage[i].BeforeTime.split(',')
            this.$set(this.Notmessage[i], 'checked', false)
          }
        } else {
          this.Notmessage = []
        }
      })
      GetMyRemindList(qs.stringify(obj2)).then(response => {
        if (response.Data) {
          this.message = response.Data
          for (let i = 0; i < this.message.length; i++) {
            this.message[i].RemindTimeList = this.message[i].BeforeTime.split(',')
            this.$set(this.message[i], 'checked', false)
          }
        } else {
          this.message = []
        }
      })
    },
    // 获取消息提醒
    getRemind () {
      const obj = {
        Status: -1,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetMyRemindList(qs.stringify(obj)).then(res => {
        if (res.Data) {
          this.TimeList = res.Data
          for (let i = 0; i < this.TimeList.length; i++) {
            this.TimeList[i].RemindTimeList = this.TimeList[i].BeforeTime.split(',')
            if (this.TimeList[i].RemindTimeList.length == 1) {
              this.DontRepeat.push(this.TimeList[i])
            } else {
              this.Repeat.push(this.TimeList[i])
            }
          }
        }
      })
    },
    // 轮询请求通知数据
    intervalTimer () {
      const h = this.$createElement
      let show = true
      let show2 = true
      for (let i = 0; i < this.DontRepeat.length; i++) {
        const currTime = new Date().getTime()
        const RemindTime = new Date(this.DontRepeat[i].RemindTimeList[0]).getTime()
        if (show) {
          if (RemindTime - currTime <= 1000 && RemindTime - currTime >= 0) {
            const instance = this.$notify({
              title: this.DontRepeat[i].TypeText,
              message: this.DontRepeat[i].Content,
              duration: 0,
              onClick: () => {
                const obj = {
                  Id: this.DontRepeat[i].Id,
                  Status: '1',
                  menuid: MenuIdDate(),
                  operationcode: '1'
                }
                EditRemindStatus(qs.stringify(obj)).then(res => {
                })
                this.drawer = true
                instance.close()
              }
            })
            show = false
          }
        }
      }
      for (let i = 0; i < this.Repeat.length; i++) {
        for (let j = 0; j < this.Repeat[i].RemindTimeList.length; j++) {
          const currTime = new Date().getTime()
          const RemindTime = new Date(this.Repeat[i].RemindTimeList[j]).getTime()
          if (show2) {
            if (RemindTime - currTime <= 1000 && RemindTime - currTime >= 0) {
              if (j === 0) {
                const instance = this.$notify({
                  title: this.Repeat[i].TypeText,
                  message: this.Repeat[i].Content,
                  duration: 0,
                  onClick: () => {
                    const obj = {
                      Id: this.Repeat[i].Id,
                      Status: '1',
                      menuid: MenuIdDate(),
                      operationcode: '1'
                    }
                    EditRemindStatus(qs.stringify(obj)).then(res => {
                    })
                    this.drawer = true
                    instance.close()
                  }
                })
              } else {
                const instance2 = this.$notify({
                  title: this.Repeat[i].TypeText,
                  message: this.Repeat[i].Content,
                  duration: 0,
                  onClick: () => {
                    this.drawer = true
                    instance2.close()
                  }
                })
              }
              show2 = false
            }
          }
        }
      }
    },
    onclick (data) {
      const obj = {
        Id: data.Id,
        Status: '1',
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      EditRemindStatus(qs.stringify(obj)).then(res => {
      })
      this.drawer = true
      this.$notify.close()
    },
    // 查看详情信息
    watchdetail (e) {
      // 请求数据详情
      const obj = {
        Id: e.Id,
        Type: e.Type,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetRemind(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.reminddetail = response.Data
          this.dialogtitle = response.Data.TypeText
          this.dialogVisible = true
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 单个修改已处理
    EditMessage (data) {
      const obj = {
        Id: data.Id,
        Status: '1',
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.EditsData(obj)
    },
    // 修改已处理的方法
    EditsData (data) {
      EditRemindStatus(qs.stringify(data)).then(res => {
        if (res.IsSuccess) {
          this.$message({
            message: '标记已处理消息成功',
            type: 'success'
          })
          setTimeout(() => {
            this.getmessageList()
          }, 1000)
        } else {
          this.$message({
            message: res.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 单个删除消息
    DelMessage (data) {
      const arr = []
      arr.push(data.Id)
      this.DelMessageData(arr)
    },
    // 批量删除
    AllDelete () {
      const arr = []
      for (let i = 0; i < this.message.length; i++) {
        if (this.message[i].checked) {
          arr.push(this.message[i].Id)
        }
      }
      if (arr.length == 0) {
        this.$message({
          message: '请勾选需要删除的提醒',
          type: 'error'
        })
        return
      }
      this.DelMessageData(arr)
    },
    // 删除消息
    DelMessageData (data) {
      let Id = data.join(',')
      let obj = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      DeleteRemind(qs.stringify(obj)).then(res => {
        if (res.IsSuccess) {
          this.$message({
            message: '删除消息成功',
            type: 'success'
          })
          this.dialogVisible = false
          setTimeout(() => {
            this.getmessageList()
          }, 1000)
        } else {
          this.$message({
            message: res.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 跳转到设置
    handleSetting () {
      this.activeIndex2 = '7'
      this.$store.dispatch('app/chooseRouter', {
        amount: '7'
      })
      this.$router.push({
        path: '/SystemSetting'
      })
    },
    // 返回工作台
    callbackwork () {
      this.activeIndex2 = '1'
      this.$store.dispatch('app/chooseRouter', {
        amount: '1'
      })
      this.$router.push({
        path: '/'
      })
    },
    // 提示弹框
    handleWarn () {
      this.showRemind = true
    },
    //关闭添加提醒
    closeshowAddRemind (val) {
      this.showRemind = val
    },
    //保存添加提醒
    AddRemindSave (data) {
      showLoading()
      // data.Type = 1
      data.menuid = MenuIdDate()
      data.operationcode = 1
      AddReminds(qs.stringify(data)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.$message({
            type: 'success',
            message: '添加提醒成功!'
          })
          this.showRemind = false
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
        }
      })
    },
    // 跳转到办公
    handleoffice () {
      this.$router.push({
        path: '/Office1'
      })
    },
    // 关闭弹框
    handleClose () {
      this.$refs.passwordForm.clearValidate()
      this.passwordForm = {
        oldpass: '',
        pass: '',
        checkPass: ''
      }
      this.dialogVisible = false
      this.passwordVisible = false
      this.informationVisible = false
    },
    handleClose2 () {
      this.dialogVisible = false
    },
    // 退出登录
    logouts () {
      showLoading()
      MemberLoginOut().then(response => {
        hideLoading()
        if (response) {
          //   // 清除cookie
          document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          window.localStorage.clear()
          window.sessionStorage.clear()
          this.$store.commit('app/SET_ROUTER', [])
          this.$router.push({
            path: '/login'
          })
        }
        //  else {
        //   this.$message({
        //     type: 'error',
        //     message: response.MessageContent
        //   })
        // }

      })
    },
    // // 新建简历
    // newresume () {
    //   window.localStorage.setItem('operate', JSON.stringify(this.$operatedata(this.addresume, 'Add')))
    //   this.$router.push(`/talent-pool/add-talents`)
    // },
    // // 新建项目
    // newproject () {
    //   window.localStorage.setItem('operate', JSON.stringify(this.$operatedata(this.addproject, 'Add')))
    //   this.$router.push(`/project/add-project`)
    // },
    // // 新建公司
    // newcompany () {
    //   window.localStorage.setItem('operate', JSON.stringify(this.$operatedata(this.addEmployer, 'Add')))
    //   this.$router.push(`/addCompany`)
    // },
    // 打开消息
    handleRemind () {
      this.getmessageList()
      this.drawer = true
    },
    // 修改密码
    updatepassword () {
      this.passwordVisible = true
      this.passwordForm = this.$options.data().passwordForm
    },
    // 保存修改好的密码
    savepassword () {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          // 验证旧密码
          const oldpassword = this.$md5(this.passwordForm.oldpass).toUpperCase()
          if (oldpassword !== this.informationForm.Password) {
            this.$message({
              type: 'warning',
              message: '旧密码输入错误'
            })
            return
          }
          const obj = {
            Id: this.informationForm.Id,
            Password: this.$md5(this.passwordForm.checkPass).toUpperCase(),
            menuid: MenuIdDate(),
            operationcode: '1'
          }
          showLoading()
          EditSysUserPassward(qs.stringify(obj)).then(response => {
            hideLoading()
            if (response.IsSuccess) {
              this.passwordVisible = false
              this.$message({
                type: 'success',
                message: '修改密码成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: response.MessageContent
              })
            }
          })
        }
      })
    },
    // 修改账号头像
    updatePortrait () {
      const obj = this.editform
      obj.Url = this.editform.Portrait
      obj.menuId = MenuIdDate()
      obj.operationCode = '1'
      EditSysUser(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.$message({
            message: '编辑资料成功',
            type: 'success'
          })
          this.$router.go(0)
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 打开编辑资料
    updateinformation () {
      this.informationVisible = true
      this.editform = copy(this.informationForm)
    },
    ishow (array, Id, path) {
      return menuishow(array, Id, path)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt2M
    },
    // 上传时的钩子
    uploadVideoProcess (event, file, fileList) {
      this.loading = true
      // this.videoFlag = true
      // this.videoUploadPercent = Number(file.percentage.toFixed(0))
    },
    handleAvatarSuccess (res, file) {
      // this.videoFlag = false
      this.loading = false
      // this.videoUploadPercent = 0
      // this.form.Logo = URL.createObjectURL(file.raw);
      this.editform.Portrait = res.ImageUrl
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  overflow: hidden;
  line-height: 60px;
  height: 60px;
  border-bottom: 1px solid #ccdaff;
  // box-shadow: #638df8 0px 0px 10px 3px; //边框阴影
  z-index: 1000;
  .el-menu--horizontal > .el-menu-item {
    margin: 0 10px;
    padding: 0;
  }
  .logo {
    display: block;
    color: #fff;
    float: left;
    padding: 0 40px 0 40px;
    background-color: $erpcolor;
    img {
      width: 120px;
      height: 40px;
      vertical-align: middle;
      // padding-right: 20px;
    }
  }
  ul {
    float: left;
    a {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0 20px;
    }
  }
  .center-menu {
    float: right;
    position: relative;
    height: 100%;
    margin-right: 40px;
    a {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      // width: 40px;
      // margin: 10px 12px 0 12px;
      // border-radius: 50px;
      // box-shadow: #638df8 0px 0px 3px 1px; //边框阴影
      text-align: center;
      .setting {
        vertical-align: middle;
        font-size: 22px;
        margin-right: 8px;
        color: #999;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        line-height: 24px;
        font-size: $f16;
        color: $erp999;
        font-weight: 700;
      }
      .card-panel-icon {
        fill: #638df8 !important;
        font-size: 22px !important;
        vertical-align: top;
        margin-top: 7px;
      }
      /deep/ .is-dot {
        position: absolute;
        top: 5px;
        right: 8px;
      }
      // &.news {
      //   span {
      //     color: $erp999;
      //   }
      //   > svg {
      //     color: $erp999;
      //   }
      // }
      &:hover {
        span {
          color: $erp333;
        }
        .setting {
          color: $erp333;
        }
      }
    }
    &.dropdown {
      .el-dropdown {
        width: 40px;
        height: 40px;
        /deep/ .svg-icon {
          width: 1em;
          height: 1em;
        }
      }
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;
    display: flex;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: red;
        }
      }
    }
    .avatas {
      margin-right: 30px;
    }
    // 用户头像
    .avatar-container {
      position: relative;
      height: 100%;
      margin-right: 64px;
      .name {
        height: 100%;
        vertical-align: top;
        margin-left: 20px;
        margin-right: 16px;
        color: $erp333;
        font-weight: 700;
        display: inline-block;
        font-size: $f16;
        // line-height: 80px;
      }
      .el-dropdown {
        margin-top: 10px;
        width: 40px;
        height: 40px;
        .avatar-wrapper {
          width: 100%;
          height: 100%;
          > svg {
            font-size: 40px;
          }
        }
      }
      .avatar-wrapper {
        width: 100%;
        height: 100%;
        .user-avatar {
          cursor: pointer;
          width: 72px;
          height: 72px;
          border-radius: 20px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    // 退出按钮
    .buttons {
      display: inline-block;
      margin-right: 24px;
      position: relative;
      a {
        display: inline-block;
        width: 100%;
        line-height: 24px;
        .close {
          vertical-align: middle;
          font-size: 22px;
          margin-right: 8px;
          color: $erp999;
        }
        span {
          vertical-align: middle;
          line-height: 24px;
          font-size: $f16;
          font-weight: 700;
          color: $erp999;
        }
        &:hover {
          .close {
            color: $erp333;
          }
          span {
            color: $erp333;
          }
        }
      }
      .slod {
        display: inline-block;
        width: 2px;
        background: #638df8;
        height: 16px;
        position: absolute;
        top: 30px;
        right: 64px;
        transform: translate(-50%, -50%);
      }
    }
  }
}
// 个人信息下拉框
.user-dropdown {
  width: 180px;
  li {
    padding: 0 24px;
    height: 54px;
    font-size: 12px;
    color: #666;
    line-height: 54px;
    &.del {
      color: #f56262;
      &:active {
        background-color: #f56262 !important;
      }
      &:hover {
        background-color: #ffe5e5;
      }
    }
    svg {
      vertical-align: middle;
      margin-top: -4px;
      fill: #638df8;
      font-size: 24px;
      margin-right: 16px;
      &.cancellation-icon {
        color: #f56262;
      }
    }
    &:hover {
      background-color: #ccdaff;
    }
    &:active {
      background-color: #638df8;
      color: #fff;
      svg {
        color: #fff;
        &.edit-icon {
          background-color: #fff;
          color: #638df8;
        }
      }
    }
  }
}
.remind-card {
  /deep/ .titles {
    border-radius: 20px !important;
    margin-top: 9px !important;
    line-height: 30px !important;
    margin-right: 10px;
  }
}
.circularHead {
  cursor: pointer;
  vertical-align: -1px !important;
  font-size: 40px;
  fill: #638df8 !important;
}
.circularHead2 {
  cursor: pointer;
  font-size: 72px;
  fill: #638df8 !important;
}
.NoData {
  text-align: center;
  span {
    display: inline-block;
    color: #666;
    font-size: 16px;
    letter-spacing: 5px;
    padding-top: 54px;
  }
}
/deep/ .password-dialog {
  .el-form-item {
    margin: 24px 0 !important;
  }
  .footer-button {
    margin: 20px 0 12px 0;
    text-align: center;
    button {
      margin: 0 12px;
    }
  }
}
/deep/ .label-item {
  .el-form-item__label {
    line-height: 76px;
  }
  .avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
}
/deep/ .Sex-input {
  width: 100%;
}
</style>
