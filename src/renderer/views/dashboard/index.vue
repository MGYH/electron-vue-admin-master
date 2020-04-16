<template>
  <el-input id="goodsInput" v-model="authcode" placeholder="请输入内容" @keypress.enter.native="confrim(authcode)" ></el-input>
  <el-input id="payInput" v-model="authcode" placeholder="请输入内容" @keypress.enter.native="confrim(authcode)" ></el-input>
  <el-button @click='pay("money")'><svg-icon icon-class="money" /></el-button>
  <el-button @click='pay("zfb")'><svg-icon icon-class="zfb" /></el-button>
  <el-button @click='pay("wx")'><svg-icon icon-class="wx" /></el-button>
  <el-button @click='cancelPay'>取消</el-button>
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
</template>

<script>
import { mapGetters } from 'vuex'
import { alipay } from '@/api/pay'

export default {
  name: 'dashboard',
  data() {
    return {
      tableData: [],
      authCode: ''
    }
  },
  mounted() {
    this.focusOn()
  },
  methods: {
    init() {
      this.authCode = ''
      this.tableData = []
    },
    focusOn(id) {
      document.addEventListener('mousedown', function(e) {
        if (e.target.id !== id) {
          e.preventDefault()
        }
      }, false)
    },
    divClick(authCode) {
      alipay(authCode).then(response => {
        console.log(response)
      })
      this.init()
    },
    pay(type) {
      this.focusOn('payInput')
    },
    cancelPay() {
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
