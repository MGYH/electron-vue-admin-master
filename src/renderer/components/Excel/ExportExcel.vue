<template>
  <el-button type="primary" icon="excel" @click="exportExcel">导出EXCEL</el-button>
</template>

<script>
  import { exportExcel } from '@/api/export'

  export default {
    name: 'ExportExcel',
    props: {
      filename: {
        type: String,
        default: Date.parse(new Date())
      },
      form: {
        type: Object
      },
      methodname: {
        type: String
      }
    },
    methods: {
      exportExcel() {
        exportExcel(this.methodname, this.form).then(response => {
          console.log(response)
          const fileName = this.filename + '.xlsx'
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(response, fileName)
          } else {
            var link = document.createElement('a')
            link.href = window.URL.createObjectURL(response)
            link.download = fileName
            link.click()
            window.URL.revokeObjectURL(link.href)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>