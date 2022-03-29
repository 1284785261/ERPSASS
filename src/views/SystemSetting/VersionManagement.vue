//版本管理
<template>
  <div>
    <div class="version-box">
      <div class="version">
        <svg-icon icon-class="version" class-name="version-svg" />
        <p class="title">当前版本：</p>
        <p class="contents">V1.0</p>
      </div>
      <div class="version-Date">
        <svg-icon icon-class="versionTime" class-name="version-svg" />
        <div class="Date-box">
          <div>
            <p class="title">开始日期：</p>
            <p class="contents">2020年06月30号</p>
          </div>
          <div>
            <p class="title">结束日期：</p>
            <p class="contents">不限</p>
          </div>
        </div>

      </div>
    </div>
    <div class="authorization">
      <div class="author-label">易快报授权:</div>
      <el-input v-model="input" class="erpinput" size="middle" placeholder="请输入授权码"></el-input>
      <el-button class="erpbtn" size="middle" @click="submit">提交并授权</el-button>
      <div class="tip">授权码在易快报桌面端「企业管理」>「功能授权」>「开放接口」处，点击「获取验证码」取得。</div>
    </div>
    <!-- <div>
      <input type="file" ref="upload" accept=".doc,.docx,.pdf,.png,.jpg" @change="FileDD($event)">
      <span>111</span>
    </div> -->
  </div>
</template>
<script>
import { EKuaiBaoAuth } from '@/api/FinancialManagement'
import { MenuIdDate } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  data () {
    return {
      input: '',
    }
  },
  methods: {
    submit () {
      // 判断
      if (this.input) {
        let obj = {
          VerifyCode: this.input,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        EKuaiBaoAuth(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.$message({
              message: response.MessageContent,
              type: 'success'
            })
            this.input = ''
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: '请输入授权码',
          type: 'warning'
        })
      }
    },
    // FileDD (e) {
    //   var ca = JSON.parse(localStorage.getItem('dingding'));
    //   let space_Id = ca.m_Item3
    //   let data = new Date()
    //   dd.config({
    //     agentId: 676814553, // 必填，微应用ID
    //     corpId: 'dinge74cfe9c9025a48a35c2f4657eb6378f',//必填，企业ID
    //     timeStamp: data, // 必填，生成签名的时间戳
    //     nonceStr: '13135445', // 必填，生成签名的随机串
    //     signature: '', // 必填，签名
    //     type: 0,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
    //     jsApiList: [
    //       'biz.util.uploadAttachment'
    //     ] // 必填，需要使用的jsapi列表，注意：不要带dd。
    //   })
    //   dd.biz.util.uploadAttachment({
    //     image: { multiple: true, compress: false, max: 9, spaceId: space_Id },
    //     file: { spaceId: space_Id, max: 1 },
    //     types: ["photo", "file"],//PC端支持["photo","file","space"]
    //     onSuccess: function (result) {
    //       alert(JSON.stringify(result))
    //     },
    //     onFail: function (err) {
    //       alert(JSON.stringify(err))
    //     }
    //   });
    // }
  },
}
</script>
<style lang="scss" scoped>
.version-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 12px;
  .version,
  .version-Date {
    width: 50%;
    height: 420px;
    background: #fff;
    border-radius: 8px;
    margin: 24px 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .version-svg {
      font-size: 90px;
    }
    .Date-box {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        margin: 0 40px;
      }
    }
  }
}
/deep/ .title {
  font-size: 20px;
  color: #333;
}
/deep/ .contents {
  font-size: 16px;
  color: #999;
}
.authorization {
  padding: 40px;
  background-color: #fff;
  margin: 0 24px 24px 24px;
  border-radius: 8px;
  .author-label {
    float: left;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    color: $erp333;
    font-weight: 700;
    margin-right: 16px;
  }
  /deep/ .erpinput {
    width: 288px;
    margin-right: 24px;
    .el-input__inner {
      border-color: transparent;
      background-color: $erinputbgc;
    }
  }
  .tip {
    font-size: $f16;
    color: $erp999;
    margin-left: 122px;
    width: 288px;
    margin-top: 9px;
  }
}
</style>