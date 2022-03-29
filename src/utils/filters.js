import Vue from 'vue'

Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}

Vue.filter('Diploma', function (value) {
  const val = parseInt(value)
  let msg = ''
  switch (val) {
    case 0: msg = '中专及以下'; break
    case 1: msg = '高中'; break
    case 2: msg = '大专'; break
    case 3: msg = '本科'; break
    case 4: msg = '研究生'; break
    case 5: msg = '硕士'; break
    case 6: msg = '博士'; break
    default:
      msg = ''
  }
  return msg
})
Vue.filter('WorkStatus', function (value) {
  const val = parseInt(value)
  let msg = ''
  switch (val) {
    case 0: msg = '离职随时到岗'; break
    case 1: msg = '在职月内到岗'; break
    case 2: msg = '在职考虑机会'; break
    case 3: msg = '在职暂不考虑'; break
  }
  return msg
})
Vue.filter('workYear', function (value) {
  let msg = ''
  switch (value) {
    case 0: msg = '应届生'; break
    case 1: msg = '1年内'; break
    case 2: msg = '1~3年'; break
    case 3: msg = '3~5年'; break
    case 4: msg = '5~10年'; break
    case 5: msg = '10年以上'; break
  }
  return msg
})

Vue.filter('salaryType', function (value) {
  let msg = ''
  const val = parseInt(value)
  switch (val) {
    case 0: msg = '月薪'; break
    case 1: msg = '年薪'; break
  }
  return msg
})

Vue.filter('City', function (value) {
  let arr = []
  if (value) {
    arr = value.split(',')
    return arr[2].substring(0, arr[2].length - 1)
  } else {
    return '——'
  }
})

Vue.filter('Time', function (value) {
  if (value) {
    if (value == '0001-01-01T00:00:00') {
      return '——'
    } else {
      return new Date(value).Format('yyyy-MM-dd')
    }
  } else {
    return '——'
  }
})

Vue.filter('percentage', function (value) {
  // if (value) {
  if (value > 0) {
    var val = Number(value * 100).toFixed(2)
    val += '%'
    return val
  } else {
    return 0 + '%'
  }
  // }
})

Vue.filter('countryName', function (value) {
  if (value) {
    var test = value.split(',')
    var newtest = test.shift()
    return test.join(',')
  } else {
    return ''
  }
})

// 使用状态
Vue.filter('usestatus', function (value) {
  let msg = ''
  switch (value) {
    case 0: msg = '禁用'; break
    case 1: msg = '启用'; break
  }
  return msg
})

// 使用状态
Vue.filter('Status2', function (value) {
  let msg = ''
  switch (value) {
    case 1: msg = '启用'; break
    case 2: msg = '禁用'; break
  }
  return msg
})


// 审核状态
Vue.filter('audittatus', function (value) {
  let msg = ''
  switch (value) {
    case 0: msg = '未审核'; break
    case 1: msg = '通过审核'; break
    case 2: msg = '不通过审核'; break
  }
  return msg
})

// 公司状态
Vue.filter('companyStatus', function (value) {
  let msg = ''
  switch (value) {
    case 0: msg = '已注销'; break
    case 1: msg = '正常营业'; break
  }
  return msg
})

// 性别
Vue.filter('Sex', function (value) {
  let msg = ''
  switch (value) {
    case 0: msg = '女士'; break
    case 1: msg = '先生'; break
  }
  return msg
})

Vue.filter('IsMoney', function (value) {
  if (value) {
    return value + '元'
  } else {
    return '无'
  }
})

// 年月日时分秒 时间
Vue.filter('YYMMddhhmmssTime', function (value) {

  if (value) {
    if (value == '0001-01-01T00:00:00') {
      return '——'
    } else {
      return new Date(value).Format('yyyy-MM-dd hh:mm:ss')
    }
  } else {
    return '——'
  }
})

// 生日格式
Vue.filter('Birthday', function (value) {
  if (value) {
    if (value == '0001-01-01T00:00:00') {
      return '——'
    } else {
      return new Date(value).Format('yyyy年MM月dd日')
    }
  } else {
    return '——'
  }
})

Vue.filter('SignType', function (value) {
  let msg = ''
  switch (value) {
    case 0: msg = '电子版'; break
    case 1: msg = '纸质版'; break
  }
  return msg
})

Vue.filter('archiveType', function (value) {
  let msg = ''
  switch (value) {
    case 0: msg = '待存档'; break
    case 1: msg = '已存档'; break
  }
  return msg
})

Vue.filter('Priority', function (value) {
  let msg = ''
  switch (value) {
    case 0: msg = '低'; break
    case 1: msg = '中'; break
    case 2: msg = '高'; break
  }
  return msg
})

Vue.filter('Tender', function (value) {
  let msg = ''
  switch (value) {
    case 0: msg = '否'; break
    case 1: msg = '是'; break
  }
  return msg
})

Vue.filter('InvoiceDemand', function (value) {
  let msg = ''
  switch (value) {
    case 0: msg = '增值税专用发票'; break
    case 1: msg = '增值税普通发票'; break
  }
  return msg
})

Vue.filter('SiFund', function (value) {
  let msg = ''
  switch (value) {
    case '0': msg = '无'; break
    case '1': msg = '有'; break
  }
  return msg
})
//解析Json文件
Vue.filter('Attachment', function (value) {
  let msg = ''
  if (value) {
    let arr = []
    arr = JSON.parse(value)
    msg = arr[0].Url
  }
  return msg
})

//补齐月份
Vue.filter('Month', function (value) {
  let msg = ''
  if (value > 9) {
    msg = value
  } else {
    msg = '0' + value
  }
  return msg
})

//过滤男女
Vue.filter('SexTWO', function (value) {
  let msg = ''
  switch (value) {

    case 0: msg = '女'; break
    case 1: msg = '男'; break
  }
  return msg
})

//加￥单位
Vue.filter('MoneyUnit', function (value) {
  let msg = '￥' + 0
  let repeat = /[\.]/
  if (value != 0) {
    if (repeat.test(value)) {
      msg = '￥' + value.toFixed(2)
    } else if (value == null) {
      msg = '￥' + 0
    } else {
      msg = '￥' + value
    }
  }

  return msg
})

//加%
Vue.filter('Proportion', function (value) {
  let msg = ''
  msg = value + '%'
  return msg
})

// 末尾加元
Vue.filter('EedMoney', function (value) {
  let msg = ''
  msg = value + ' 元'
  return msg
})
// 末尾加￥
Vue.filter('BIDMoney', function (value) {
  let msg = ''
  if (value > 0) {
    msg = value + ' ￥'
  } else {
    msg = 0
  }
  return msg
})

//保留两位小数
Vue.filter('KeepTwo', function (value) {
  let msg = ''
  let repeat = /[\.]/
  if (value && value > 0 && repeat.test(value)) {
    return msg = value.toFixed(2)
  } else {
    return msg = value
  }
})

//地址过滤直辖市显示
Vue.filter('AddressFiltering', function (value) {
  if (value) {
    let msg = ''
    let arr = value.split(',')
    if (arr.length >= 3) {
      if (arr[2].indexOf(arr[1]) > -1) {
        arr.splice(1, 1)
        return msg = arr.join('')
      } else {
        return msg = arr.join('')
      }
    }
  }
  else {
    return '--'
  }
})