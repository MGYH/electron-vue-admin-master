import request from '@/utils/request'

export function getGoods(goodCode) {
  return request({
    url: '/goods/getGoodsByCode',
    method: 'get',
    params: { goodCode }
  })
}

export function sellGoods(authCode, sellRecord, goodsList) {
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

export function entryGoods(entryRecord, goodsList) {
  return request({
    url: '/goods/entryGood',
    method: 'post',
    data: {
      entryRecord,
      goodsList
    }
  })
}

export function entryReport() {
  return request({
    url: '/report/entryGoodReport',
    method: 'post',
    data: {
    }
  })
}

export function save(good) {
  return request({
    url: '/goods/save',
    method: 'post',
    data: {
      good
    }
  })
}
