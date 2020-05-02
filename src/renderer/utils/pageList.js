import request from '@/utils/request'

export function postSearch(self) {
  return request({
    url: self.url + '?pageNo=' + self.currentPage + 'pageSize=' + self.pageSize,
    method: 'post',
    data: self.form
  })
}
export default class PagedList {
  constructor(url) {
    this.currentPage = 1
    this.url = url
    this.total = 0
    this.data = []
    this.form = {}
    this.pageSize = 30
  }
  search() {
    const _this = this
    _this.data = []
    postSearch(this).then(response => {
      console.log(response.data)
      response.data.forEach(function(value, index) {
        value.edit = false
        _this.data.push(value)
      })
      this.total = this.data.length
    })
  }
}

