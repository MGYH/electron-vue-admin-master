<template>
  <div id="echartContainer" :style="{width:width, height: height }"></div>
</template>

<script>
  import { clientResize } from '@/mixins/getClientResize'

  export default {
    name: 'MgPieChartsWithOther',
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
        const _this = this
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
        myChart.on('legendselectchanged', function(params) {
          _this.seriesData = []
          const other = { name: '其他', value: 0 }
          for (var i = 0; i < _this.data.length && i < _this.num; i++) {
            _this.seriesData.push({
              name: _this.data[i].name,
              value: _this.data[i].value
            })
            if (!params.selected[_this.data[i].name]) {
              console.log(_this.data[i].value, '================1')
              if (_this.data[i].value) {
                console.log(_this.data[i].value, '================12')
                other.value += parseFloat(_this.data[i].value)
              }
            }
          }
          if (_this.data.length > _this.num) {
            for (var j = _this.num; j < _this.data.length; j++) {
              if (_this.data[j].value) {
                console.log(_this.data[j].value, '================13')
                other.value += parseFloat(_this.data[j].value)
              }
            }
            console.log(other.value)
            _this.seriesData.push(other)
          }
          myChart.setOption({
            series: [
              {
                data: _this.seriesData
              }
            ]
          })
        })
      },
      genData() {
        const _this = this
        this.initData()
        for (var i = 0; i < _this.data.length && i < _this.num; i++) {
          _this.legendData.push(_this.data[i].name)
          _this.seriesData.push({
            name: _this.data[i].name,
            value: _this.data[i].value
          })
          _this.selected[_this.data[i].name] = true
        }
        if (_this.data.length > _this.num) {
          const other = { name: '其他', value: 0 }
          for (var j = _this.num; j < _this.data.length; j++) {
            if (typeof (_this.data[j].value) !== 'undefined') {
              other.value += _this.data[j].value
            }
          }
          _this.selected['其他'] = true
          _this.legendData.push('其他')
          _this.seriesData.push(other)
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