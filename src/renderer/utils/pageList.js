import request from '@/utils/request'

export function postSearch(self) {
  return request({
    url: self.url + '?pageNo=' + self.currentPage + '&pageSize=' + self.pageSize,
    method: 'post',
    data: self.form
  })
}
export default class PagedList {
  constructor(url, pageSize, isedit) {
    this.currentPage = 1
    this.url = url
    this.total = 0
    this.data = []
    this.form = {}
    this.pageSize = pageSize || 30
    this.isedit = isedit || false
  }
  search() {
    const _this = this
    _this.data = []
    postSearch(this).then(response => {
      _this.total = response.data.count
      response.data.list.forEach(function(value, index) {
        value.edit = false
        _this.data.push(value)
      })
    })
    if (this.isedit) {
      this.data.push({ edit: true })
    }
  }
}

