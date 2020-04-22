import request from '@/utils/request'

export function getGoods(goodCode) {
  console.log(goodCode)
  return request({
    url: '/goods/getGoodsByCode',
    method: 'get',
    params: { goodCode }
  })
}

export function sellGoods(authCode, sellRecord, goodsList) {
  console.log(authCode, sellRecord, goodsList)
  return request({
    url: '/goods/sellGood',
    method: 'post',
    data: {
      authCode,
      sellRecord,
      goodsList
    }
  })
}
