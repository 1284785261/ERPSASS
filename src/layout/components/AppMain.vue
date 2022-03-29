<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    }
  },
  $route: {
    handler (val, oldval) {
      console.log(val)
    },
  },
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100% - 60px);
  /* width: calc(100% - 180px); */
  /* position: fixed; */
  background-color: #f0f4fa;
}
.fixed-header + .app-main {
  padding-top: 60px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
