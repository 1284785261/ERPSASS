<template>
  <!-- 极坐标柱状图 -->
  <div :class="className" :style="{height:height,width:width}" style="margin-left:24px;display: inline-block;" />
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
      default:'100%',
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
      text: '工作汇总统计'
    }
  ],
        tooltip: {
    trigger: 'axis',
    axisPointer: {
    type: 'shadow',
    }
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 100,
    top: 260,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  series: [
    {
      name: '录入',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: '推荐',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '面试',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '试岗',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: '入职',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ],
  width:'80%',
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
