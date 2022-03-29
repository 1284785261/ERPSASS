<template>
  <!-- 极坐标柱状图 -->
  <div :class="className" :style="{height:height,width:width}" style="margin: 0;;display: inline-block;" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default:'50%',
    },
    height: {
      type: String,
      default: '420px'
    },
    Data: Object,
    default:{}
  },
  watch: {
    Data (newvalue, oldvalue) {
      this.$nextTick(() => {
        this.initChart()
      })
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      let objs = {
        title: {
        text: '简历转化率'
               },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}%'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 50,
    top: 260,
    data: ['录入', '推荐', '面试', '试岗','入岗']
  },
  series: [
    {
      type: 'funnel',
      left: '20%',
      width: '60%',
      label: {
        formatter: '{b}'
      },
      labelLine: {
        show: false
      },
      itemStyle: {
        opacity: 0.7,
        // color:'#fff',
        // borderColor:'#000'
      },
      emphasis: {
        label: {
          position: 'inside',
          formatter: '{b}: {c}%'
        }
      },
      data: [
        { value: 60, name: '录入' },
        { value: 40, name: '推荐' },
        { value: 20, name: '面试' },
        { value: 80, name: '试岗' },
        { value: 100, name: '入岗' }
      ]
    },
    {
      position: 'inside',
      type: 'funnel',
      left: '20%',
      width: '60%',
      maxSize: '80%',
      label: {
        position: 'inside',
        formatter: '{c}%',
        color: '#000'
      },
      itemStyle: {
        opacity: 0.7,
        borderColor: '#000',
        borderWidth: 2
      },
      emphasis: {
        label: {
          formatter: '{b}: {c}%'
        }
      },
      data: [
        { value: 30, name: '录入' },
        { value: 10, name: '推荐' },
        { value: 5, name: '面试' },
        { value: 50, name: '试岗' },
        { value: 80, name: '入岗' }
      ],
      z: 100
    }
  ],
      backgroundColor: '#fff',
      animation: false,
      }
      this.chart.showLoading({
        text: '',
        color: '#409eff',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.5)',
        zlevel: 0
      })
      setTimeout(() => {
        this.chart.setOption(objs)
        this.chart.hideLoading()
      }, 500);

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
