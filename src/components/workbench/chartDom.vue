<template>
  <!-- 极坐标柱状图 -->
  <div :class="className" :style="{height:height,width:width}" style="margin: 0px 0px 0px 24px;display: inline-block;" />
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
      default:'48%',
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
         title: [
    {
      text: '任务目标完成百分比'
    }
  ],
  polar: {
    radius: [30, '80%']
  },
  radiusAxis: {
    // formatter:{},
    max: 4
  },
  angleAxis: {
    left:'2%',
    type: 'category',
    data: ['录入', '推荐', '面试', '试岗','入岗'],
    startAngle: 75
  },
  tooltip: {},
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 50,
    top: 260,
    data: ['录入', '推荐', '面试', '试岗','入岗']
  },
  series: {
    left:'2%',
    type: 'bar',
    data: [2, 1.2, 2.4, 3.6,2],
    coordinateSystem: 'polar',
    label: {
      show: true,
      position: 'left',
      formatter: '{b}: {c}'
    }
  },
  backgroundColor: '#fff',
  animation: false
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
