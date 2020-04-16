import request from '@/utils/request'

export function getGoods(goodCode) {
  return request({
    url: '/goods/getGoodsByCode',
    method: 'post',
    data: {
      goodCode
    }
  })
}
