<template>
  <el-dialog title="新增商品" :visible.sync="visible" >
    <el-form :model="form">
      <el-form-item label="商品条码">
        <el-input v-model="form.code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品售价">
        <el-input v-model="form.price" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="保质期">
        <el-input v-model="form.shelfLife" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { save } from '@/api/goods'
  import { Message } from 'element-ui'
  export default {
    name: 'addGoodsDialog',
    data() {
      return {
      }
    },
    props: {
      show: {
        require: true
      },
      form: {
        require: true
      }
    },
    watch: {
      show(val) {
        this.visible = val
      }
    },
    methods: {
      save() {
        save(this.form).then(response => {
          this.$emit('dialog-close', this.form)
          Message({
            message: '成功',
            type: 'success',
            duration: 3 * 1000
          })
          this.show = false
        })
      },
      close() {
        this.form = null
        this.$emit('dialog-close', this.form)
      }
    }
  }
</script>

<style scoped>

</style>