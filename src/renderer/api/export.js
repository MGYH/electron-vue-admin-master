import request from '@/utils/request'

export function exportExcel(methodName, form) {
  return request({
    url: '/export/excel?methodName=' + methodName,
    method: 'post',
    responseType: 'blob',
    data: {
      form
    }
  })
}
