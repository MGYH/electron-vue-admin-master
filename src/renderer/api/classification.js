import request from '@/utils/request'

export function getOptions() {
  return request({
    url: '/classification/getOption',
    method: 'get'
  })
}

export function save(classification) {
  return request({
    url: '/classification/save',
    method: 'post',
    data: {
      classification
    }
  })
}
