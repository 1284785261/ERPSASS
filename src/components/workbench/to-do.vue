<template>
  <div class="matters-box">
    <svg-icon :icon-class="icon" class-name="iconTitle" />
    <div class="Title">{{title}}</div>
    <div class="matters-number">
      <span class="numbers">{{numbers}}</span>
      <span class="units">{{unit}}</span>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'toDo',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    numbers: {
      type: Number,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    }
  },

}
</script>
<style lang="scss" scoped>
.matters-box {
  min-width: 220px;
  height: 80px;
  background: #fff;
  border-radius: 8px;
  // margin-right: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  position: relative;
  .iconTitle {
    width: 24px;
    height: 24px;
    margin: 0 16px;
  }

  .matters-number {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    .numbers {
      font-size: 24px;
      color: #000;
      margin-right: 16px;
    }
    .units {
      font-size: 14px;
      color: #1588f8;
    }
    i {
      margin-right: 24px;
      margin-left: 40px;
    }
  }
  .Title {
    font-size: 14px;
    color: #666;
  }
}
</style>