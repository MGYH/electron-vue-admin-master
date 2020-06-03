<template>
  <pagination-table v-model="formInline" @page-change="getOptions">
    <template v-slot:search>
      <el-form :inline="true" v-model="formInline.form" @submit.native.prevent>
        <el-form-item label="商品条码">
          <el-input v-model="formInline.form.code" placeholder="商品条码" @keypress.enter.native="onSubmit" id="goodcode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template>
      <el-table
        :data="formInline.data"
        :height="height"
        class="editTable"
        style="width: 100%">
        <el-table-column label="商品条码" prop="code">
          <template slot-scope="scope">
            <el-input v-model="scope.row.code" :disabled="!scope.row.edit"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name" fit>
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" :disabled="!scope.row.edit"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="所属分类" prop="treeString" fit>
          <template slot-scope="scope">
            <cascader
              :options="options"
              v-model="scope.row.treeString"
              :disabled="!scope.row.edit"
            ></cascader>
          </template>
        </el-table-column>
        <el-table-column label="商品售价" prop="price">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price" :disabled="!scope.row.edit"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="保质期限" prop="shelfLife" fit>
          <template slot-scope="scope">
            <el-input v-model="scope.row.shelfLife" :disabled="!scope.row.edit">
              <el-select v-model="scope.row.shelfLifeUnit" slot="append" placeholder="请选择" :disabled="!scope.row.edit">
                <el-option label="年" value="年"></el-option>
                <el-option label="月" value="月"></el-option>
                <el-option label="日" value="日"></el-option>
              </el-select>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="!scope.row.edit">修改</el-button>
            <el-button @click="save(scope.row)" type="text" size="small" v-else>保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </pagination-table>
</template>

<script>
  import PaginationTable from '../../components/Table/PaginationTable'
  import { clientResize } from '@/mixins/getClientResize'
  import PagedList from '@/utils/pageList'
  import { save } from '@/api/goods'
  import { Message } from 'element-ui'
  import { getOptions } from '@/api/classification'
  import Cascader from '@/components/Cascader/index'

  export default {
    mixins: [clientResize],
    name: 'test',
    components: { PaginationTable, Cascader },
    mounted() {
      this.onSubmit()
      this.getOptions()
    },
    methods: {
      onSubmit() {
        this.formInline.search()
        this.getOptions()
      },
      handleClick(row) {
        row.edit = true
        console.log(row)
      },
      save(row) {
        save(row).then(
          Message({
            message: '成功',
            type: 'success',
            duration: 5 * 1000
          })
        )
        row.edit = false
      },
      getOptions() {
        getOptions().then(response => {
          this.options = response.data
        })
      }
    },
    data() {
      return {
        percentage: 0.8,
        formInline: new PagedList('/goods/findAll', 20, {}, true),
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.8,
        test: '',
        tableData: [],
        options: []
      }
    }
  }
</script>