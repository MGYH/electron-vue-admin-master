<template>
    <div>
      <header>
        <slot name="search"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer style="text-align: center" v-if="isPagination">
        <el-pagination
          layout="prev, pager, next"
          :total="model.total"
          :current-page="model.currentPage"
          :page-size="model.pageSize">
        </el-pagination>
      </footer>
    </div>

</template>

<script>
  export default {
    name: 'PaginationTable',
    title: '分页表格',
    methods: {
      handleSizeChange(row) {
        console.log(row)
      },
      handleCurrentChange(val) {
        this.$emit('handle-current-change', val)
      }
    },
    // model ：{count : 0,pagesize:'1',page}
    props: {
      model: {
        require: true
      },
      isPagination: {
        default: true
      }
    },
    mounted() {
      console.log('---------____')
    },
    data() {
      return {
        total: 0,
        formLabelAlign: {}
      }
    },
    watch: {
      'tableData'(val) {
        this.total = val.length
      }
    }
  }
</script>
