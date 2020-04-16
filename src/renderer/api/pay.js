import request from '@/utils/request'

export function alipay(authCode) {
  return request({
    url: '/alipay/tradePay',
    method: 'post',
    data: {
      authCode
    }
  })
}
