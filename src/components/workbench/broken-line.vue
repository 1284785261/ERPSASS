<template>
  <!-- 折线图 -->
  <div :class="className" :style="{height:height,width:width}" style="margin: 20px;" />
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
      type: String
    },
    height: {
      type: String,
      default: '320px'
    },
    Data: Object
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
          text: '我的本周新增业绩图',
          textStyle: {
            color: '#000',
            fontSize: 18,
            lineHeight: 40
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            return params[0].data;
          }
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: this.Data.WeekData,
          label: {
            color: '#1588f8'
          }
        },
        yAxis: {
          type: 'value',
          textStyle: {
            color: '#1588f8'
          }
        },
        series: [{
          data: this.Data.AmountData,
          type: 'bar',
          show: true,
          color: '#7D8FB2',
          fontSize: 14,
          showBackground: true,
          backgroundStyle: {
            color: '#000'
          },
          barMaxWidth: 24,
          itemStyle: {
            color: '#1588F8',
            borderColor: '#1588F8'
          }
        }]
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
