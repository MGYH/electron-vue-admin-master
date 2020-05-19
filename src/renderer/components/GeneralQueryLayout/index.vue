<template>
    <div>
      <header>
        <slot name="search" @search="search()"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer style="text-align: center" >
      </footer>
    </div>

</template>

<script>
  export default {
    name: 'PaginationTable',
    methods: {
      search() {
        console.log('==========================')
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
