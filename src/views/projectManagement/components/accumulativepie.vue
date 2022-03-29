<!-- 累计还款占比饼状图 -->
<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/components/workbench/mixins/resize'
export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '120px'
    },
    height: {
      type: String,
      default: '120px'
    },
    piedata: Object
  },
  data() {
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
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      console.log(this.chart);
      
      let objs = {
        tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      color: ['#2DD15C', '#1588F8'],
      series: [
        {
          name: '累计回款占比',
          type: 'pie',
          radius: ['100%', '60%'],
          // avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          hoverAnimation: false,
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: '30',
          //     fontWeight: 'bold'
          //   }
          // },
          // labelLine: {
          //   show: false
          // },
          data: [
            {value: 335, name: '待回款'},
            {value: 310, name: '已回款'},
          ]
        }
      ]}
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
  },
}
</script>