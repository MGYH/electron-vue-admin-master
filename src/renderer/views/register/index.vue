<template>
  <pagination-table v-model="formInline">
    <template v-slot:search>
      <el-form :inline="true" v-model="formInline.form" @submit.native.prevent>
        <el-form-item label="用户名">
          <el-input v-model="formInline.form.name" placeholder="用户名" @keypress.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="formInline.form.username" placeholder="登录名" @keypress.enter.native="onSubmit"></el-input>
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
        <el-table-column label="操作员姓名" prop="code">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" :disabled="!scope.row.edit"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作员登录名" prop="name" fit>
          <template slot-scope="scope">
            <el-input v-model="scope.row.username" :disabled="!scope.row.edit"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作员权限" prop="treeString" fit>
          <template slot-scope="scope">
            <el-select v-model="scope.row.role" placeholder="请选择权限" :disabled="!scope.row.edit">
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="普通用户" value=""></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="init(scope.row)" type="text" size="small" v-if="!scope.row.edit">初始化密码</el-button>
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
  import { initPassword, save } from '@/api/login'
  import { Message } from 'element-ui'
  import Cascader from '@/components/Cascader/index'

  export default {
    mixins: [clientResize],
    name: 'test',
    components: { PaginationTable, Cascader },
    mounted() {
      this.onSubmit()
    },
    methods: {
      onSubmit() {
        this.formInline.search()
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
            duration: 2 * 1000
          })
        )
        row.edit = false
      },
      init(row) {
        initPassword(row).then(
          Message({
            message: '成功',
            type: 'success',
            duration: 2 * 1000
          })
        )
      }
    },
    data() {
      return {
        percentage: 0.8,
        formInline: new PagedList('/user/findAll', 20, {}, true),
        height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * 0.8,
        test: '',
        tableData: [],
        options: []
      }
    }
  }
</script>