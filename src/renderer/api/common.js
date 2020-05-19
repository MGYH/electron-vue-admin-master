import request from '@/utils/request'

export function common(url, form) {
  return request({
    url: url,
    method: 'post',
    data: {
      form
    }
  })
}
