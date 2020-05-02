<template>
  <div>
    <el-form :inline="true" @submit.native.prevent>
      <el-form-item label="商品条码">
        <el-input v-model="goodCode" placeholder="商品条码" @keypress.enter.native="onSearch"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      :height="height"
      ref="singleTable"
      class="editTable"
      @row-click="rowClick"
      @current-change="handleCurrentChange"
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
      <el-table-column label="保质期" prop="shelfLife">
      </el-table-column>
    </el-table>
<!--    <add-goods-dialog :show="dialogFormVisible" :form="{code:goodCode}" @dialog-close="dialogClose"></add-goods-dialog>-->
  </div>
</template>

<script>
  import PaginationTable from '@/components/Table/PaginationTable'
  import { clientResize } from '@/mixins/getClientResize'
  import { getGoods } from '@/api/goods'
  import addGoodsDialog from './addGoodsDialog'
  import { MessageBox } from 'element-ui'
export default {
    mixins: [clientResize],
    name: 'test',
    components: { PaginationTable, addGoodsDialog },
    methods: {
      onSubmit() {
  
      },
      onSave() {
  
      },
      rowClick(row) {
        // Todo 临时将name+space来处理数据不修改无法修改选中行
        row.name += ' '
        this.setCurrent(row)
        row.name += ' '
      },
      setCurrent(row) {
        console.log(row, '==========')
        this.$refs.singleTable.setCurrentRow(row)
      },
      handleCurrentChange(val) {
        console.log(val, '==========12')
        val.edit = true
        this.currentRow.edit = false
        this.currentRow = val
      },
      dialogClose(form) {
        this.dialogFormVisible = false
        if (form) {
          this.onSearch()
        }
        this.goodCode = ''
      },
      onSearch() {
        const _this = this
        if (this.codeList.includes(this.goodCode)) {
          this.tableData.forEach(function(value, index) {
            if (value.code === _this.goodCode) {
              value.num += 1
              _this.setCurrent(value)
              _this.goodCode = ''
              return
            }
          })
        } else {
          getGoods(_this.goodCode).then(response => {
            if (response.data.length > 0) {
              _this.codeList.push(response.data[0].code)
              response.data[0].num = 1
              response.data[0].total = response.data[0].price
              _this.tableData.push(response.data[0])
              _this.goodCode = ''
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
      }
    },
    mounted() {
    },
    data() {
      return {
        percentage: 0.8,
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.8,
        goodCode: '',
        tableData: [],
        currentRow: {},
        codeList: [],
        dialogFormVisible: false
      }
    }
  }
</script>