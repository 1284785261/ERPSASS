<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/components/workbench/mixins/resize'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '678px'
    },
    piedata: Array
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    piedata (newvalue, oldvalue) {
      this.$nextTick(() => {
        this.initChart()
      })
    }
  },
  methods: {
    initChart () {
      console.log(this.piedata);
      let xdata = []
      let ydata = []
      for (let i = 0; i < this.piedata.length; i++) {
        if (this.piedata[i].Month > 9) {
          xdata.push(this.piedata[i].Year + '/' + this.piedata[i].Month)
        } else {
          xdata.push(this.piedata[i].Year + '/0' + this.piedata[i].Month)
        }
        ydata.push(this.piedata[i].Amount)
      }
      this.chart = echarts.init(this.$el, 'macarons')
      let option = {
        color: ['#2DD15C'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['毛利'],
          left: 0,
          orient: {
            orient: 'horizontal'
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: xdata
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                width: '2'
              }
            }
          }
        ],
        series: [
          {
            // name: '毛利',
            type: 'line',
            data: ydata,
          }
        ]
      }
      this.chart.showLoading({
        text: '',
        color: '#409eff',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.5)',
        zlevel: 0
      })
      setTimeout(() => {
        this.chart.setOption(option)
        this.chart.hideLoading()
      }, 500);
    }
  },
}
</script>

<style lang="scss">
.chart {
  background: #f0f4fa;
  border-radius: 8px;
}
</style>