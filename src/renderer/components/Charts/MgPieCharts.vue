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
      num: {
        type: Number,
        default: 10
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
        legendData: [],
        seriesData: [],
        selected: {},
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
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 30,
            top: 40,
            bottom: 20,
            data: this.legendData,
            selected: this.selected
          },
          series: [
            {
              name: '商品名称',
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              data: this.seriesData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },
      genData() {
        const _this = this
        this.initData()
        for (var i = 0; i < _this.data.length; i++) {
          _this.legendData.push(_this.data[i].name)
          _this.seriesData.push({
            name: _this.data[i].name,
            value: _this.data[i].value
          })
          _this.selected[_this.data[i].name] = i < _this.num
        }
        this.init()
      },
      initData() {
        this.legendData = []
        this.seriesData = []
        this.selected = {}
      }
    }
  }
</script>

<style scoped>

</style>