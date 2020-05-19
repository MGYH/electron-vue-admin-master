export const clientResize = {
  data() {
    return {
      timer: false,
      percentage: 1,
      // 顶部的高度51
      height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51)
    }
  },
  mounted() {
    console.log('minix')
    const that = this
    console.log(this.height, that.percentage)
    that.height = ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51) * that.percentage
    window.onresize = () => {
      return (() => {
        window.tableHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 51
        that.height = window.tableHeight * this.percentage
      })()
    }
  },
  watch: {
    height(val) {
      if (!this.timer) {
        this.height = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    },
    percentage(val) {
      console.log(this.height, val, this.height)
      this.height = val * this.height
    }
  }
}
