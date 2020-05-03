import request from '@/utils/request'

export function getOptions() {
  return request({
    url: '/classification/getOption',
    method: 'get'
  })
}

export function save(classification) {
  return request({
    url: '/classification/getOption',
    method: 'post',
    data: {
      classification
    }
  })
}
