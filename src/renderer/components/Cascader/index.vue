<template>
  <el-cascader
    :options="options"
    :separator="separator"
    :placeholder="placeholder"
    @change="handleChange"
    change-on-select
    v-model="model"
  ></el-cascader>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        model: this.value
      }
    },
    props: {
      options: {
        type: Array,
        required: true
      },
      value: {
        type: Array
      },
      props: {
        type: Object,
        default() {
          return {
            children: 'children',
            label: 'label',
            value: 'value',
            disabled: 'disabled'
          }
        }
      },
      separator: {
        type: String,
        default: '/'
      },
      placeholder: {
        type: String,
        default: '请选择'
      }
    },
    methods: {
      handleChange(value) {
        this.currentLabels(value)
        console.log('===========value', this.value)
      },
      currentLabels(values) {
        let options = this.options
        const labels = []
        values.forEach(value => {
          const targetOption = options && options.filter(option => option['value'] === value)[0]
          if (targetOption) {
            labels.push(targetOption['label'])
            options = targetOption['children']
          }
        })
        const label = labels.join(this.separator)
        const value = values.join(this.separator)
        this.$emit('change', values[values.length - 1], label, value)
      }
    },
    watch: {
      model(value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style scoped>

</style>