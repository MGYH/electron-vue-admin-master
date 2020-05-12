<template>
  <el-dialog title="新增商品" :visible.sync="visible" >
    <el-form :model="form" :inline="true">
      <el-form-item label="商品条码">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <cascader
          :options="options"
          v-model="form.treeString"
        ></cascader>
      </el-form-item>
      <el-form-item label="商品售价">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="保质期限">
        <el-input v-model="form.shelfLife">
          <el-select v-model="form.shelfLifeUnit" slot="append" placeholder="请选择">
            <el-option label="年" value="year"></el-option>
            <el-option label="月" value="month"></el-option>
            <el-option label="日" value="day"></el-option>
          </el-select>
        </el-input>
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
  import Cascader from '@/components/Cascader/index'
  import { getOptions } from '@/api/classification'
  export default {
    name: 'addGoodsDialog',
    components: { Cascader },
    data() {
      return {
        visible: false,
        options: []
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
      getOptions() {
        getOptions().then(response => {
          this.options = response.data
        })
      },
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
    },
    mounted() {
      this.getOptions()
    }
  }
</script>

<style scoped>

</style>