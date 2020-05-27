import request from '@/utils/request'
import store from '@/store'

export function getGoods(goodCode) {
  return request({
    url: '/goods/getGoodsByCode',
    method: 'get',
    params: { goodCode }
  })
}

export function getGoodsByEntryCode(entryCode) {
  return request({
    url: '/goods/getGoodsByEntryCode',
    method: 'get',
    params: { entryCode }
  })
}

export function sellGoods(authCode, sellRecord, goodsList) {
  return request({
    url: '/goods/sellGood',
    method: 'post',
    data: {
      authCode,
      sellRecord,
      goodsList,
      name: store.getters.name
    }
  })
}

export function entryGoods(entryRecord, goodsList) {
  return request({
    url: '/goods/entryGood',
    method: 'post',
    data: {
      entryRecord,
      goodsList,
      name: store.getters.name
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
      good,
      name: store.getters.name
    }
  })
}

export function getPieChart(from) {
  return request({
    url: '/goods/getPieChart',
    method: 'post',
    data: {
      from
    }
  })
}
