import request from '@/utils/request'

export function pay(payment, authCode) {
  return request({
    url: '/' + payment + '/tradePay',
    method: 'get',
    params: { authCode }
  })
}
