<template>
  <div>
    <el-form :inline="true" @submit.native.prevent>
      <el-form-item label="商品条码">
        <el-input v-model="goodCode" placeholder="商品条码" @keypress.enter.native="onSearch" id="goodCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      show-summary
      stripe
      :height="height"
      ref="singleTable"
      class="editTable"
      @row-click="rowClick"
      @current-change="handleCurrentChange"
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
        <template slot-scope="num"><el-input v-model="num.row.num" @keyup.native="caculate(num.row)" :disabled="!num.row.edit"></el-input></template>
      </el-table-column>
      <el-table-column
        label="合计"
        prop="total">
      </el-table-column>
    </el-table>
    <input id="input" @keypress.enter="divClick(authcode)" v-model="authcode"  style="width: 0px;padding: 0px;height: 0px;border: 0px">
    <el-row :gutter="3" v-if="sellRecord.totalMoney > 0" style="margin-right: 0px">
      <el-col :span="1"><svg-button :icon-name="sellRecord.payment === 'cash' ? 'cash-selected':'cash'" @click="paymentClick('cash')"></svg-button></el-col>
      <el-col :span="1"><svg-button :icon-name="sellRecord.payment === 'zfb' ? 'zfb-selected':'zfb'" @click="paymentClick('zfb')"></svg-button></el-col>
      <el-col :span="1"><svg-button :icon-name="sellRecord.payment === 'wx' ? 'wx-selected':'wx'" @click="paymentClick('wx')"></svg-button></el-col>
      <el-col :span="20"  v-if="sellRecord.totalMoney > 0">
      <el-form :inline="true" style="padding-left: 4px" v-if="sellRecord.payment==='cash'">
          <el-form-item label="实收">
            <el-input  v-model="sellRecord.paid" @keyup.native="caculateChange" :class="{error : sellRecord.paid <sellRecord.totalMoney}"></el-input>
          </el-form-item>
          <el-form-item label="找零">
            <el-input v-model="sellRecord.change" disabled></el-input>
          </el-form-item>
        <el-form-item>
          <el-button @click='cancelPay' style="height: 40px" v-if="sellRecord.payment==='cash'">取消</el-button>
          <el-button @click='pay()' style="height: 40px"  type="success" :disabled='sellRecord.change < 0' v-if="sellRecord.payment==='cash'">确定</el-button>
        </el-form-item>
      </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
        goodCode: '',
        currentInput: 'goodsInput',
        heigth: '200',
        sellRecord: {
          totalMoney: 0,
          paid: '',
          change: 0,
          payment: ''
        },
        percentage: 0.6,
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.6,
        currentRow: {},
        codeList: [],
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
      this.init()
    },
    methods: {
      caculateChange() {
        this.sellRecord.change = (parseFloat(this.sellRecord.paid) - parseFloat(this.sellRecord.totalMoney)).toFixed(1)
      },
      paymentClick(payment) {
        if (this.sellRecord.payment !== payment) {
          this.sellRecord.payment = payment
          this.focusOn('input')
        } else {
          this.sellRecord.payment = ''
          this.focusOn('goodCode')
        }
      },
      init() {
        this.authcode = ''
        this.tableData = []
        this.codeList = []
        this.sellRecord = {
          totalMoney: 0,
          paid: '',
          change: 0,
          payment: ''
        }
        this.focusOn('goodCode')
      },
      focusOn(id) {
        if (this.sellRecord.payment === 'zfb' || this.sellRecord.payment === 'wx') {
          document.addEventListener('mousedown', this.myfunction)
        } else {
          document.removeEventListener('mousedown', this.myfunction)
        }
        document.getElementById(id).focus()
      },
      divClick(authCode) {
        this.pay(authCode)
        this.authcode = ''
      },
      myfunction(e) {
        if (e.target.id !== 'input') {
          e.preventDefault()
        }
      },
      caculate(row) {
        console.log(row, row.num)
        console.log(parseInt(row.num), parseFloat(row.price) * parseInt(row.num), '========')
        row.total = parseFloat(row.price) * parseFloat(row.num)
      },
      pay(authCode) {
        const _this = this
        sellGoods(authCode, _this.sellRecord, _this.tableData).then(response => {
          _this.init()
          Message({
            message: '成功',
            type: 'success',
            duration: 1 * 1000
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
              _this.sellRecord.totalMoney = sums[index].toFixed(2)
              _this.sellRecord.paid = _this.sellRecord.totalMoney
              sums[index] += ' 元'
            } else {
              sums[index] = ''
            }
          }
        })
        return sums
      },
      rowClick(row) {
        // Todo 临时将name+space来处理数据不修改无法修改选中行
        row.name += ' '
        this.setCurrent(row)
        row.name += ' '
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row)
      },
      handleCurrentChange(val) {
        if (val) {
          val.edit = true
          this.currentRow.edit = false
          this.currentRow = val
        }
      },
      dialogClose(form) {
        this.dialogFormVisible = false
        if (form) {
          this.onSearch()
        }
        this.goodCode = ''
      },
      onSearch() {
        console.log('=============')
        const _this = this
        if (this.codeList.includes(this.goodCode)) {
          this.tableData.forEach(function(value, index) {
            if (value.code === _this.goodCode) {
              value.num = parseInt(value.num) + 1
              value.total = (value.num * value.price).toFixed(2)
              _this.setCurrent(value)
              _this.goodCode = ''
              return
            }
          })
        } else {
          getGoods(_this.goodCode).then(response => {
            console.log(response)
            if (response.data.length > 0) {
              _this.codeList.push(response.data[0].code)
              response.data[0].num = 1
              response.data[0].total = (response.data[0].price * 1).toFixed(2)
              _this.tableData.push(response.data[0])
              _this.goodCode = ''
              _this.setCurrent(response.data[0])
            } else {
              Message({
                message: '商品条码未找到对应商品，请确认！！！',
                type: 'warning',
                duration: 1 * 1000
              })
              _this.goodCode = ''
            }
          })
        }
      }
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
