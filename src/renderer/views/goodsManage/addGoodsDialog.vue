<template>
  <el-dialog title="新增商品" :visible.sync="visible" >
    <el-form :model="form" :inline="true">
      <el-form-item label="商品条码">
        <el-input v-model="form.code" disabled></el-input>
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
        <el-input v-model="form1.shelfLife">
          <el-select v-model="form1.shelfLifeUnit" slot="append" placeholder="请选择">
            <el-option label="年" value="年"></el-option>
            <el-option label="月" value="月"></el-option>
            <el-option label="日" value="日"></el-option>
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
        options: [],
        form: {},
        form1: {}
      }
    },
    props: {
      show: {
        require: true
      },
      value: {
        type: Object
      }
    },
    watch: {
      show(val) {
        this.visible = val
      },
      visible(val) {
        if (!val && this.show) {
          this.show = false
          this.close()
        }
      },
      value(val) {
        console.log(val, '============')
        this.form = val
      }
    },
    methods: {
      getOptions() {
        getOptions().then(response => {
          this.options = response.data
        })
      },
      save() {
        const _this = this
        save(this.form).then(response => {
          this.$emit('dialog-close', _this.form)
          Message({
            message: '成功',
            type: 'success',
            duration: 3 * 1000
          })
          this.show = false
        })
      },
      close() {
        this.$emit('dialog-close', false)
      }
    },
    mounted() {
      this.getOptions()
    }
  }
</script>

<style scoped>

</style>