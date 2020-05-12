<template>
  <div>
    <el-form :inline="true" @submit.native.prevent>
      <el-form-item label="商品条码">
        <el-input v-model="goodCode" placeholder="商品条码" @keypress.enter.native="onSearch"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onSubmit">入库</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      :height="height"
      ref="singleTable"
      class="editTable"
      @row-click="rowClick"
      @current-change="handleCurrentChange"
      show-summary
      :summary-method="getSummaries"
      style="width: 100%">
      <el-table-column label="条形码" prop="code"></el-table-column>
      <el-table-column label="名称" prop="name">
      </el-table-column>
      <el-table-column label="数量" prop="num">
        <template slot-scope="scope">
          <el-input v-model="scope.row.num" :disabled="!scope.row.edit"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="进价" prop="purchasePrice">
        <template slot-scope="scope">
          <el-input v-model="scope.row.purchasePrice"  :disabled="!scope.row.edit"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="出厂日期" prop="price">
        <template slot-scope="scope">
          <el-input v-model="scope.row.price" :disabled="!scope.row.edit"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <add-goods-dialog :show="dialogFormVisible" :form="{code:goodCode}" @dialog-close="dialogClose"></add-goods-dialog>
  </div>
</template>

<script>
  import PaginationTable from '@/components/Table/PaginationTable'
  import { clientResize } from '@/mixins/getClientResize'
  import { getGoods, entryGoods } from '@/api/goods'
  import addGoodsDialog from './addGoodsDialog'
  import { Message, MessageBox } from 'element-ui'
export default {
    mixins: [clientResize],
    name: 'test',
    components: { PaginationTable, addGoodsDialog },
    methods: {
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
        val.edit = true
        this.currentRow.edit = false
        this.currentRow = val
      },
      dialogClose(form) {
        console.log(form, '---------------')
        this.dialogFormVisible = false
        if (form) {
          this.onSearch()
        }
        this.goodCode = ''
      },
      onSearch() {
        const _this = this
        // this.goodCode.forEach(function(value) {
        //   if (value) {
        //     _this.addList(value)
        //   }
        // })
        _this.addList(this.goodCode)
      },
      getSummaries(param) {
        const _this = this
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 2) {
            sums[index] = '总价'
            return
          } else if (index === 3) {
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
              sums[index] += ' 元'
            } else {
              sums[index] = ''
            }
          }
        })
        return sums
      },
      addList(goodCode) {
        const _this = this
        if (this.codeList.includes(goodCode)) {
          this.tableData.forEach(function(value, index) {
            if (value.code === goodCode) {
              value.num += 1
              _this.setCurrent(value)
              return
            }
          })
        } else {
          getGoods(goodCode).then(response => {
            if (response.data.length > 0) {
              _this.codeList.push(goodCode)
              response.data[0].num = 1
              response.data[0].total = response.data[0].price
              _this.tableData.push(response.data[0])
              _this.setCurrent(response.data[0])
            } else {
              MessageBox.confirm('商品不存在，是否新增', '商品信息不存在', {
                confirmButtonText: '新增',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                _this.dialogFormVisible = true
              })
            }
          })
        }
        this.goodCode = ''
      },
      onSubmit() {
        const _this = this
        entryGoods({}, _this.tableData).then(response => {
          Message({
            message: '成功',
            type: 'success',
            duration: 1 * 1000
          })
          _this.init()
        })
      },
      init() {
        this.tableData = []
        this.codeList = []
        this.focusOn('goodCode')
      }
    },
    data() {
      return {
        percentage: 0.8,
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.8,
        goodCode: '',
        tableData: [],
        currentRow: {},
        codeList: [],
        dialogFormVisible: false,
        options: []
      }
    }
  }
</script>