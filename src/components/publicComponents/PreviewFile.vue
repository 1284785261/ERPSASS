// 预览  img  word PDF
<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="titlename" class="dialog-box previewFile" :visible.sync="FileShow" append-to-body :destroy-on-close="true" width="800px" @close="colse">
      <img v-if="isImg ==1" :src="previewFileUrl">
      <iframe v-if="isImg == 2" id="iframe2" class="iframeStyle" :src="previewFileUrl" type="application/x-google-chrome-pdf" width="100%" height="100%" />
      <iframe v-if="isImg == 3" id="iframe3" class="iframeStyle" :src="previewFileUrl" width="100%" height="100%" />
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="colse">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'PreviewFile',
  props: {
    titlename: {
      type: String,
      default: '预览合同'
    },
    isImg: {
      type: Number
    },
    iframeShow: {
      type: Boolean,
      default: false
    },
    previewFileUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      FileShow: false
    }
  },
  watch: {
    iframeShow (newvalue, oldvalue) {
      this.FileShow = newvalue
    }
  },
  methods: {
    colse () {
      this.$emit('closeFileShow', false)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>