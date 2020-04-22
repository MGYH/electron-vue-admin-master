<template>
  <div>
    <el-row>
      <el-col :span="6"><el-input id="input" @keypress.enter.native="divClick(authcode)" v-model="authcode" autosize></el-input></el-col>
      <el-col :span="2"><svg-button icon-name="money" @click="click"></svg-button></el-col>
      <el-col :span="2"><svg-button icon-name="zfb" @click="click"></svg-button></el-col>
      <el-col :span="2"><svg-button icon-name="wx" @click="click"></svg-button></el-col>
      <el-col :span="2"><el-button @click='cancelPay' style="height: 2em">取消</el-button></el-col>
    </el-row>
    <el-table
      :data="tableData"
      show-summary
      :summary-method="getSummaries"
      style="width: 100%">
      <el-table-column
        label="商品 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="desc">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { alipay } from '@/api/pay'
  import SvgButton from '@/components/Button/SVGButton'

  export default {
    name: 'dashboard',
    components: { SvgButton },
    data() {
      return {
        tableData: [],
        authcode: '',
        currentInput: 'goodsInput'
      }
    },
    mounted() {
      this.focusOn()
    },
    methods: {
      click() {
        console.log('asdada')
      },
      init() {
        this.authCode = ''
        this.tableData = []
      },
      focusOn() {
        document.addEventListener('mousedown', function(e) {
          if (e.target.id !== 'input') {
            e.preventDefault()
          }
        }, false)
        document.getElementById('input').focus()
      },
      divClick(authCode) {
        console.log(authCode, '======')
        alipay(authCode).then(response => {
          console.log(response)
        })
        this.init()
      },
      pay(type) {
        console.log('==========')
        this.currentInput = 'payInput'
        this.focusOn('payInput')
      },
      cancelPay() {
        this.currentInput = 'goodsInput'
        this.focusOn('goodsInput')
        this.init()
      },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价'
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ' 元'
          } else {
            sums[index] = ''
          }
        })
        return sums
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
