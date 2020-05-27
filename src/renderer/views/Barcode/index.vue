<template>
<!--  <barcode v-bind:value="value" font-options='bold'>-->
<!--    Show this if the rendering fails.2-->
<!--  </barcode>-->
  <el-button type="primary" @click="click">查询</el-button>
</template>

<script>
  import VueBarcode from 'vue-barcode'

  export default {
    name: 'index',
    components: {
      'barcode': VueBarcode
    },
    data() {
      return {
        value: 123456
      }
    },
    methods: {
      click() {
        // 创建打印模板
      }
    }
  }
</script>

<style scoped>

</style>