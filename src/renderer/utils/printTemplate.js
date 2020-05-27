import PrintTemplate from 'print-template'

export default class Print {
  print(data) {
    const template = new PrintTemplate()
    // 模板数据
    const yto = {
      name: 'yto', // 模板名称
      unit: 'mm', // 尺寸 默认mm    mm / px
      size: [40, 30], // 模板大小  宽 76mm / 高130mm
      fixed: [ // 固定内容 比如：线条 、logo 广告、固定字体
        { type: 'line', x: 0, y: 0, length: 0 }
      ],
      data: { // 动态数据
        name: { type: 'text', x: 2, y: 2, fontSize: 3.5 },
        code: {
          type: 'barcode',
          x: 2,
          y: 10,
          format: 'CODE128A',
          width: 2,
          margin: 0,
          fontSize: 3.3,
          fontOptions: 'bold',
          displayValue: true,
          height: 13
        }
      }
    }
    // 添加模板
    template.push(yto)
    // 传入数据
    // 打印
    template.print('yto', data).then(pdf => {
      // 返回 jspdf
      // blob 地址
      pdf.output('bloburi', { filename: '条形码' })
      // 下载保存
      pdf.save('打印文件')
    })
  }
}
