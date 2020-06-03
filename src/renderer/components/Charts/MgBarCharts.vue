<template>
  <div id="echartContainer" :style="{width:width, height: height }"></div>
</template>

<script>
  import { clientResize } from '@/mixins/getClientResize'

  export default {
    name: 'MgPieCharts',
    mixins: [clientResize],
    props: {
      data: {
        type: Array,
        required: true
      },
      subtext: {
        type: String,
        default: ''
      },
      text: {
        type: String
      }
    },
    data() {
      return {
        xSeries: [],
        ySeries1: [],
        ySeries2: [],
        echarts: null,
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.8 + 'px',
        width: ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 51) + 'px'
      }
    },
    mounted() {
      this.echarts = require('echarts')
      this.genData()
    },
    watch: {
      show(val) {
        this.genData()
      },
      data(val) {
        console.log('===========________', val)
        this.genData()
      }
    },
    methods: {
      init() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.echarts.init(document.getElementById('echartContainer'))
        // 绘制图表
        const title = {
          text: this.text,
          subtext: this.subtext,
          left: 'center'
        }
        myChart.setOption({
          title: title,
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.xSeries,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '销售额',
              type: 'bar',
              barWidth: '35%',
              data: this.ySeries1
            },
            {
              name: '利润',
              type: 'bar',
              barWidth: '35%',
              data: this.ySeries2
            }
          ]
        })
      },
      genData() {
        const _this = this
        this.initData()
        for (var i = 0; i < _this.data.length; i++) {
          _this.xSeries.push(_this.data[i].name)
          _this.ySeries1.push(_this.data[i].value1)
          _this.ySeries2.push(_this.data[i].value2)
        }
        this.init()
      },
      initData() {
        this.xSeries = []
        this.ySeries1 = []
        this.ySeries2 = []
        this.selected = {}
      }
    }
  }
</script>

<style scoped>

</style>