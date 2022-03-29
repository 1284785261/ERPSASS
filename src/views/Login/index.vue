<template>
  <div class="login-container">
    <div class="logo_Title">
      <img src="../../assets/logo2.png">
      <!-- <h3 class="title">锦绣前程ERP管理系统</h3> -->
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <!-- <p class="Introduction">您好！</p>
        <p class="Introduction">
          欢迎登录锦绣前ERP管理系统，我们将致力于为您提供最优质的服务。
        </p> -->
        <p class="Introduction">锦绣前程ERP</p>
      </div>

      <el-form-item prop="UserId" class="content-box">
        <span class="svg-container">
          <svg-icon icon-class="portrait" class-name="card-panel-icon" />
        </span>
        <el-input ref="UserId" v-model="loginForm.UserId" placeholder="请输入用户账号" name="UserId" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="Password" class="content-box">
        <span class="svg-container">
          <svg-icon icon-class="password" class-name="card-panel-icon" />
        </span>
        <el-input :key="passwordType" ref="Password" v-model="loginForm.Password" :type="passwordType" placeholder="请输入密码" name="Password" tabindex="1" auto-complete="on" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- <el-form-item prop="Verification" class="Verification">
        <span class="svg-container">
          <svg-icon icon-class="Verification" class-name="card-panel-icon" />
        </span>
        <div class="boredres" />
        <el-input v-model="loginForm.Verification" placeholder="请输入验证码" name="UserId" type="text" tabindex="1" auto-complete="on" />
        <div class="verify-box" @click="refreshCode">
          <SIdentify :identify-code="identifyCode" />
        </div>
      </el-form-item> -->

      <el-button id="logintn" :loading="loading" class="loginButton" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      <a class="forget" @click="forgetWord">忘记密码了?</a>

    </el-form>
    <div v-if="forgetShow" class="forgetDiv">
      <p>请联系系统管理员</p>
    </div>
  </div>
</template>

<script>
// import { Workbenchrouter, Projectrouter, Resumerouter, Employerrouter, Financerouter, Officerouter, Reportrouter, Systemrouter } from '@/router/addrouter.js'
// import SIdentify from '@/components/PopComponents/Identify'
// import qs from 'qs'
// import { GetCompanyRoleRightsMenu, login } from '@/api/user.js'
// import { GetJsticket } from '@/api/projectManagement'
import { AutoUpdatePublicCompany } from '@/api/CustomerManagement'
import { MemberLogin } from '@/api/Login'
import { GetCurrentSysUser } from '@/api/SystemSetting'
import qs from 'qs'
import { MenuIdDate, showlogin, hidelogin } from '@/utils/CustomValidation'
export default {
  name: 'Login',
  components: {
    // SIdentify
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入正确的用户账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能少于1位'))
      } else {
        callback()
      }
    }
    const validateVerification = (rule, value, callback) => {
      if (value.toUpperCase() != this.identifyCode.toUpperCase() && value.toLowerCase() != this.identifyCode.toLowerCase()) {
        callback(new Error('请和右侧验证码输入一致'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        UserId: '',
        Password: '',
        Verification: ''
      },
      identifyCode: '',
      identifyCodes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      loginRules: {
        UserId: [{ required: true, trigger: 'blur', validator: validateUsername }],
        Password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        Verification: [{ required: true, trigger: 'blur', validator: validateVerification }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      forgetShow: false
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        // this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created () {
    window.addEventListener('keydown', this.handleKeyDown, true)
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 验证码abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    },
    // 显示密码
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.Password.focus()
      })
    },
    handleKeyDown (e) {
      let key = null
      if (window.event === undefined) {
        key = e.keyCode
      } else {
        key = window.event.keyCode
      }
      if (key === 13) {
        this.handleLogin()
      }
    },
    publicopera (array, code, path) {
      if (array && array.length) {
        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array[i].children.length; j++) {
            if (array[i].children[j].path.indexOf(path) !== -1) {
              localStorage.setItem(code, JSON.stringify(array[i].children[j].meta))
              return
            } else {
              localStorage.setItem(code, JSON.stringify({}))
            }
          }
        }
      } else {
        localStorage.setItem(code, JSON.stringify({}))
      }
    },
    // 提交
    handleLogin () {
      this.$refs.loginForm.validate((valid, obj) => {
        if (valid) {
          // this.loading = true
          showlogin()
          const Password = this.$md5(this.loginForm.Password).toUpperCase()
          const obj = {
            UserId: this.loginForm.UserId,
            Password: Password
          }

          MemberLogin(qs.stringify(obj)).then(response => {
            if (response.IsSuccess) {
              if (response.Data.Token) {
                // V1.4 版本更新 token 后面多了一位判断是否是管理员
                const admin = response.Data.Token.substring(response.Data.Token.length - 1)
                // console.log(admin);
                document.cookie = "admin" + "=" + admin
                const Token = response.Data.Token.substring(0, response.Data.Token.length - 1)
                // console.log(Token);
                document.cookie = "Token" + "=" + Token;

                // // 后端要加的不知名接口
                // AutoUpdatePublicCompany()
                let obj = {
                  menuid: MenuIdDate(),
                  operationcode: '1'
                }
                GetCurrentSysUser(qs.stringify(obj)).then(responseBy => {
                  // hidelogin()
                  if (responseBy.IsSuccess && responseBy.Data) {
                    window.localStorage.setItem('Current', JSON.stringify({ 'currentId': responseBy.Data.Id, 'currentUser': responseBy.Data.UserName }))
                    window.localStorage.setItem('Org', JSON.stringify({ 'OrgName': responseBy.Data.OrgName, 'OrgId': responseBy.Data.OrgId }))
                    this.$router.push({ path: '/' })
                    console.log(this.$router)
                  } else {
                    this.$message({
                      message: responseBy.MessageContent,
                      type: 'error'
                    })
                  }
                })
                // 获取钉钉授权信息
                // GetJsticket().then(response => {
                //   console.log(response);
                //   window.localStorage.setItem('dingding', JSON.stringify(response.Data))
                // })
              }
            } else {
              hidelogin()
              // this.loading = false
              this.$message({
                message: response.MessageContent,
                type: 'error'
              })
            }
            // this.refreshCode()
          }).catch(err => {
            hidelogin()
            this.$message({
              message: err,
              type: 'error'
            })
          })
        } else {
          return false
        }
      })
    },
    forgetWord () {
      this.forgetShow = true
      setTimeout(() => {
        this.forgetShow = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 46px;
    width: 85%;
    line-height: 52px;
    top: 0;
    left: 33px;
    input {
      background: transparent;
      border: inherit;
      // border-radius: inherit!important;
      -webkit-appearance: none;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 35px;
      caret-color: $cursor;

      &:-webkit-autofill {
        // box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0.4) inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-transition-delay: 99999s;
        -webkit-transition: color 99999s ease-out,
          background-color 99999s ease-out;
      }
    }
  }

  .el-form-item {
    border: 1px solid #fff;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 24px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
@media screen and (max-width: 1000px) {
  .login-container {
    .logo_Title {
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translate(-50%, 0);
    }
    .login-form {
      position: absolute;
      left: 50%;
      top: 35%;
      transform: translate(-50%, 0);
    }
  }
}
@media screen and (min-width: 1000px) {
  .login-container {
    .logo_Title {
      position: absolute;
      left: 24%;
      top: 40%;
    }
    .login-form {
      position: absolute;
      left: 54%;
      top: 27%;
    }
  }
}
.login-container {
  min-height: 100vh;
  width: 100%;
  background: url("./../../assets/bargin.png") no-repeat 100% 100%;
  // background-color: skyblue;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
  /deep/ .logo_Title {
    img {
      margin-left: 15px;
    }
    .title {
      font-size: 36px;
      color: $light_gray;
      // margin: 0px auto 40px auto;
      text-align: left;
      font-weight: normal;
    }
  }
  .login-form {
    width: 360px;
    max-width: 100%;
    overflow: hidden;
    /deep/ .content-box {
      height: 48px;
      .el-form-item__content {
        height: 46px;
        .el-input__inner {
          position: absolute;
          top: 0;
          height: 100%;
          border-radius: 0;
          line-height: 100%;
        }
        .el-form-item__error {
          padding-top: 6px;
        }
      }
    }
    /deep/ .Verification {
      height: 48px;
      width: 175px;
      border: none;
      background: none;
      border-radius: 0;
      border-bottom: 1px solid #fff;
      .el-input {
        width: 75%;
      }
      .el-input__inner {
        height: 100%;
        line-height: 100%;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    color: $dark_gray;
    width: 30px;
    display: inline-block;
    position: absolute;
    top: 0;
    svg {
      margin: 10px 0 0 15px;
    }
  }

  .title-container {
    position: relative;
    margin-bottom: 20px;
    .Introduction {
      font-size: 30px;
      color: #ffffff;
      max-width: 350px;
      line-height: 20px;
      font-weight: 500;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.card-panel-icon {
  width: 20px;
  height: 24px;
  fill: #fff;
  vertical-align: sub;
}
.boredres {
  height: 24px;
  width: 1px;
  background: #fff;
  position: absolute;
  right: -28px;
  top: 13px;
}
.verify-box {
  position: absolute;
  right: -184px;
  top: 0;
}
.loginButton {
  background: #1586f7;
  border: none;
  padding: 16px 20px;
  margin-top: 20px;
  margin-bottom: 10px !important;
  /deep/ span {
    font-size: 16px;
  }
  &:hover {
    background: #3838ac;
  }
  &:active {
    background: #3838ac;
  }
}
.forget {
  font-size: 14px;
  color: #fff;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
}
.forgetDiv {
  width: 200px;
  height: 85px;
  background: #000;
  position: fixed;
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -50%);
  border-radius: 10px;
  p {
    color: #fff;
    text-align: center;
    line-height: 30px;
    margin: 12px;
  }
}
</style>
