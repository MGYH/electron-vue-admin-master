<template>
  <div>
    <el-cascader
      :options="options"
      :separator="separator"
      :placeholder="placeholder"
      @change="handleChange"
      change-on-select
      :disabled="disabled"
      v-model="model" v-show="!disabled"
    ></el-cascader>
    <span v-show="disabled">{{label}}</span>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        model: this.value ? this.value.split(this.separator) : [],
        label: ''
      }
    },
    props: {
      options: {
        type: Array,
        required: true
      },
      value: {
        type: String
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
      },
      disabled: {
        type: Boolean
      }
    },
    mounted() {
      this.currentLabels(this.model)
    },
    methods: {
      handleChange(value) {
        this.currentLabels(value)
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
        this.label = label
        const value = values.join(this.separator)
        this.$emit('change', values[values.length - 1], label, value)
      }
    },
    watch: {
      model(value) {
        console.log('value', value)
        this.$emit('input', value.join(this.separator))
      },
      value(val) {
        console.log('val', val)
        this.model = val ? val.split(this.separator) : []
      }
    }
  }
</script>

<style scoped>

</style>