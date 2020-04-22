<template>
    <button class="mg-el-button" @click="click"><svg-icon :icon-class="iconName" className="mg-svg-class"/></button>
</template>

<script>
    export default {
      name: 'SVGButton',
      props: {
        iconName: {
          require: true
        }
      },
      data() {
        return {
        }
      },
      methods: {
        click() {
          this.$emit('click')
        }
      }
    }
</script>

<style scoped>
    .mg-el-button{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 0px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-size: 14px;
        border-radius: 4px;
    }
    .mg-svg-class{
        width: 30px;
        height: 40px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>