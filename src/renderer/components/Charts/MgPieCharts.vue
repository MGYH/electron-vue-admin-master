<template>
  <div id="echartContainer" style="width:100%; height:500px"></div>
</template>

<script>
  const echarts = require('echarts')
  export default {
    name: 'MgPieCharts',
    props: {
      data: {
        type: Array,
        required: true
      },
      num: {
        type: Number,
        default: 10
      }
    },
    data() {
      return {
        legendData: [],
        seriesData: [],
        selected: {}
      }
    },
    mounted() {
      console.log(this.data)
      this.genData()
    },
    watch: {
      data(val) {
        console.log(val)
        this.genData()
      }
    },
    methods: {
      init() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echartContainer'))
        // 绘制图表
        const title = {
          text: '同名数量统计',
          subtext: '纯属虚构',
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
              name: '商品',
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
        for (var i = 0; i < _this.data.length; i++) {
          _this.legendData.push(_this.data[i].name)
          _this.seriesData.push({
            name: _this.data[i].name,
            value: _this.data[i].value
          })
          _this.selected[name] = i < _this.num
        }
        this.init()
      }
    }
  }
</script>

<style scoped>

</style>