<template>
    <div>
      <header>
        <slot name="search"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer style="text-align: center" v-if="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="value.total"
          @current-change="handleCurrentChange"
          :current-page="value.currentPage"
          :page-size="value.pageSize">
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
        this.value.currentPage = val
        this.value.search()
        this.$emit('page-change')
      }
    },
    props: {
      value: {
        type: Object
      },
      pagination: {
        default: true
      }
    },
    data() {
      return {
        total: 0,
        formLabelAlign: {}
      }
    },
    watch: {
      value(val) {
        this.$emit('input', val)
      }
    }
  }
</script>
