import request from '@/utils/request'

export function exportExcel(methodName, form, exportObject) {
  return request({
    url: '/export/excel?methodName=' + methodName,
    method: 'post',
    responseType: 'blob',
    data: {
      form,
      exportObject
    }
  })
}
