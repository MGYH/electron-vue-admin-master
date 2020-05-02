<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[30, 40, 50]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'MgPagination',
    props: {
      total: {
        require: true,
        default: 0
      }
    },
    data() {
      return {
        currentPage: 1
      }
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('handle-size-change', val)
      },
      handleCurrentChange(val) {
        this.$emit('handle-current-change', val)
      }
    }
  }
</script>
