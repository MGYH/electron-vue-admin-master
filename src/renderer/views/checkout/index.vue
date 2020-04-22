<template>
  <div>
    <el-table
      :data="tableData"
      show-summary
      stripe
      :height="500"
      :max-height="500"
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
        label="单价"
        prop="price">
      </el-table-column>
      <el-table-column
        label="数量"
        prop="num">
        <template slot-scope="num"><el-input v-model="num.row.num" @keyup.native="caculate(num.row)"></el-input></template>
      </el-table-column>
      <el-table-column
        label="合计"
        prop="total">
      </el-table-column>
    </el-table>
    <input id="input" @keypress.enter="divClick(authcode)" v-model="authcode"  style="width: 0px;padding: 0px;height: 0px;border: 0px">
    <el-row :gutter="2" v-if="sellRecord.totalMoney > 0">
      <el-col :span="1"><svg-button :icon-name="payment === 'cash' ? 'cash-selected':'cash'" @click="paymentClick('cash')"></svg-button></el-col>
      <el-col :span="1"><svg-button :icon-name="payment === 'zfb' ? 'zfb-selected':'zfb'" @click="paymentClick('zfb')"></svg-button></el-col>
      <el-col :span="1"><svg-button :icon-name="payment === 'wx' ? 'wx-selected':'wx'" @click="paymentClick('wx')"></svg-button></el-col>
      <el-col :span="20"  v-if="sellRecord.totalMoney > 0">
      <el-form :model="sellRecord" :rules="rules" ref="ruleForm" label-width="100px">
        <el-col :span="5"  v-if="payment==='cash'">
          <el-form-item label="实收" prop="paid">
            <el-input id="paid"  v-model="sellRecord.paid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5"  v-if="payment==='cash'">
          <el-form-item label="找零" prop="change">
            <el-input v-model="sellRecord.paid" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button @click='focusOn' style="height: 40px">继续添加</el-button>
          <el-button @click='cancelPay' style="height: 40px" v-if="payment==='cash'">取消</el-button>
          <el-button @click='confirm' style="height: 40px" :disabled='sellRecord.change < 0' v-if="payment==='cash'">确定</el-button>
        </el-form-item>
      </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import { pay } from '@/api/pay'
  import { getGoods, sellGoods } from '@/api/goods'
  import SvgButton from '@/components/Button/SVGButton'
  import { Message } from 'element-ui'

  export default {
    name: 'checkout',
    components: { SvgButton },
    data() {
      var validate = (rule, value, callback) => {
        if (this.sellRecord.paid >= this.sellRecord.totalMoney) {
          return callback()
        } else {
          return callback(new Error())
        }
      }
      return {
        tableData: [],
        authcode: '',
        currentInput: 'goodsInput',
        payment: 'money',
        isPay: false,
        heigth: '200',
        sellRecord: {
          totalMoney: 0,
          paid: 0,
          change: 0
        },
        rules: {
          paid: [
            { required: true, message: '请输入收款金额', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' },
            { validator: validate, trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.focusOn()
      this.init()
    },
    methods: {
      paymentClick(payment) {
        console.log('===========payment')
        this.payment = payment
        this.isPay = true
      },
      init() {
        this.authcode = ''
        this.isPay = false
        this.tableData = []
        this.payment = ''
      },
      focusOn() {
        this.isPay = false
        document.getElementById('input').focus()
      },
      divClick(authCode) {
        if (this.isPay) {
          this.pay(authCode)
        } else {
          this.addGoods(authCode)
        }
        this.authcode = ''
      },
      caculate(row) {
        console.log(row, row.num)
        console.log(parseInt(row.num), parseFloat(row.price) * parseInt(row.num), '========')
        row.total = parseFloat(row.price) * parseFloat(row.num)
        this.focusOn()
      },
      pay(authCode) {
        const _this = this
        sellGoods(authCode, _this.sellRecord, _this.tableData).then(response => {
          _this.init()
          Message({
            message: '成功',
            type: 'success',
            duration: 5 * 1000
          })
        })
      },
      confirm() {
        this.init()
        Message({
          message: '成功',
          type: 'success',
          duration: 5 * 1000
        })
      },
      addGoods(goodCode) {
        const _this = this
        getGoods(goodCode).then(response => {
          response.data[0].num = 1
          response.data[0].total = response.data[0].price
          _this.tableData.push(response.data[0])
          _this.authcode = ''
        })
      },
      cancelPay() {
        this.init()
      },
      getSummaries(param) {
        const _this = this
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 3) {
            sums[index] = '总价'
            return
          } else if (index === 4) {
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
              _this.sellRecord.totalMoney = sums[index]
              sums[index] += ' 元'
            } else {
              sums[index] = ''
            }
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
