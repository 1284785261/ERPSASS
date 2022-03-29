<template>
  <div>
    <div v-for="(smallitss, index) in datas" :key="index">
      <div style="display:block;margin-left:20px;">
        <el-checkbox v-model="smallitss.Status" @change="ACchoose(datas,smallitss, smallitss.Status, index)" style="display:block;">{{smallitss.MenuName}}</el-checkbox>
        <div style="margin-left:24px;">
          <el-checkbox v-for="(items, indexs) in smallitss.Operations" :key="items.Id" v-model="items.Status" @change="COchoose(datas,smallitss,items, index, items.Status, indexs)" style="line-height:30px;">{{items.OperationName}}</el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['datas', 'item', 'itemall'],
  data () {
    return {
      sings: true
    }
  },
  created () {
  },
  methods: {
    // 第二级数组全选和反选
    ACchoose (data, pe, val, index) {
      if (pe.Operations) {
        for (let i = 0; i < pe.Operations.length; i++) {
          this.$set(pe.Operations[i], 'Status', val)
        }
        this.$emit('selectAll', data, val, this.item, this.itemall)
      }
    },
    // 第三级数组选择
    COchoose (data, smallitss, items, index, indexs) {
      // console.log(data, smallitss, items)
      let flag = true
      for (let i = 0; i < smallitss.Operations.length; i++) {
        if (smallitss.Operations[i].Status != this.sings) {
          flag = false
          break;
        }
      }
      if (smallitss.Operations.length) {
        smallitss.Status = flag;
      } else {
        smallitss.Status = false
      }
      this.$emit('selectAllFuck', data, smallitss, this.item, this.itemall)
    }
  }


}
</script>
<style lang="scss" scoped>
</style>