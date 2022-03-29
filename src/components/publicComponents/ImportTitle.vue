<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="reportvisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="colse">
      <div class="error-box">
        <div class="error-top">
          <div class="success-total"><span>{{errorData.MessageContent}}<span v-if="errorData.Data && errorData.Data.length > 0">，内容如下：</span></span></div>
        </div>
        <!-- 导入错误 -->
        <div class="error-content" v-if="errorData.Data && errorData.Data.length > 0">
          <div class="row" v-for="(item, index) in errorData.Data" :key="index">
            <!-- <div class="index">第{{index+1}}条</div> -->
            <div class="con">{{item}}</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="colse" v-if="errorData.Data && errorData.Data.length > 0">修改后重新导入</el-button>
        <el-button type="primary" @click="colse" v-else>关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ImportTitle',
  props: {
    TitleShow: {
      type: Boolean,
      default: false
    },
    errorData: {
      type: Object,
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      reportvisible: false
    }
  },
  watch: {
    TitleShow (newvalue, oldvalue) {
      this.reportvisible = newvalue
    }
  },
  methods: {
    colse () {
      this.$emit('closeTitle', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.error-box {
  .error-top {
    margin-bottom: 24px;
    .error-total {
      font-size: $f14;
      color: $erp333;
      > span {
        color: $erpred;
      }
    }
  }
  .error-content {
    // margin-bottom: 24px;
    .row {
      line-height: 20px;
      margin-bottom: 24px;
      min-height: 20px;
      display: flex;
      color: $erp999;
      .index {
        width: 48px;
      }
      .con {
        color: $erp999;
        flex: 1;
      }
    }
  }
}
</style>