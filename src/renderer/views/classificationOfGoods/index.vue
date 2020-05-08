<template>
  <pagination-table v-model="formInline">
    <template v-slot:search>
      <el-form :inline="true" v-model="formInline.form">
        <el-form-item label="分类名称">
          <el-input v-model="formInline.form.name" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <cascader
            :options="options"
            @change="handleChange"
            v-model="formInline.form.treeString"
          ></cascader>
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
            <el-input v-model="scope.row.name" :disabled="!scope.row.edit" :class="{error : !scope.row.name}"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="所属分类" prop="treeString">
          <template slot-scope="scope">
            <cascader
              :options="options"
              @change="handleChange"
              v-model="scope.row.treeString"
              :disabled="!scope.row.edit"
            ></cascader>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="medium" v-if="!scope.row.edit">修改</el-button>
            <el-button @click="save(scope.row)" type="text" size="medium" v-else :disabled="!scope.row.name">保存</el-button>
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
  import { save } from '../../api/classification'
  import { Message } from 'element-ui'

  export default {
    mixins: [clientResize],
    name: 'index',
    components: { PaginationTable, Cascader },
    methods: {
      onSubmit() {
        this.formInline.search()
        console.log(this.formInline)
      },
      handleClick(row) {
        row.edit = true
      },
      handleChange(...value) {
      },
      async save(value) {
        value.parentId = value.treeString ? value.treeString.split('/')[value.treeString.split('/').length - 1] : 0
        await save(value).then(
          Message({
            message: '成功',
            type: 'success',
            duration: 2 * 1000
          })
        )
        this.onSubmit()
        this.getOptions()
      },
      getOptions() {
        getOptions().then(response => {
          this.options = response.data
        })
      }
    },
    mounted() {
      this.getOptions()
      this.onSubmit()
    },
    data() {
      return {
        percentage: 0.80,
        formInline: new PagedList('/classification/findAll', 2, true),
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.80,
        test: '',
        value: [],
        tableData: [],
        options: []
      }
    }
  }
</script>