<template>
  <pagination-table :model="formInline">
    <template v-slot:search>
      <el-form :inline="true" v-model="formInline.form">
        <el-form-item label="测试">
          <el-input v-model="formInline.form.test" placeholder="测试"></el-input>
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
        <el-table-column label="名称" prop="name">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" :disabled="!scope.row.edit"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="附属类别" prop="treeString">
          <template slot-scope="scope">
            <cascader
              :options="options"
              @change="handleChange"
              v-model="treeString"
            ></cascader>
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
  import { getOptions } from '@/api/classification'
  import Cascader from '@/components/Cascader/index'
  
  export default {
    mixins: [clientResize],
    name: 'index',
    components: { PaginationTable, Cascader },
    methods: {
      onSubmit() {
        console.log('==========', this.formInline)
        this.formInline.search()
        console.log(this.formInline)
      },
      handleClick(row) {
        row.edit = true
        console.log(row, this.treeString, '======123')
      },
      handleChange(...value) {
        console.log(value, '===123')
      },
      save(value) {
        console.log(value, '=========')
        // save(value).then()
      }
    },
    mounted() {
      getOptions().then(response => {
        console.log(response.data, '======-----123rr')
        this.options = response.data
      })
    },
    data() {
      return {
        percentage: 0.8,
        formInline: new PagedList('/classification/findAll', 30, true),
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.8,
        test: '',
        treeString: [],
        value: [],
        tableData: [],
        options: []
      }
    },
    computed: {
      getValue(val) {
        console.log(val, '==============ada')
        return val
        // return val.split('/')
      }
    }
  }
</script>