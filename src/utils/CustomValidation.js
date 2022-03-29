import { Loading } from 'element-ui'

// 设置cookie
export function setCookie (cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

// 获取cookie
export function getCookie (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

/**
 * 深度复制
 * @param { Object | Array | Date } source
 *
 */
export function copy (source) {
  var target
  if (arguments.length > 1) {
    target = arguments[0]
    source = arguments[1]
  } else {
    target = (isArray(source) ? [] : {})
  }
  for (var method in source) {
    var from = source[method]
    if (from && typeof from === 'object') {
      if (!isDate(from)) {
        target[method] = (isArray(from) ? [] : {})
        copy(target[method], from)
      } else {
        target[method] = new Date(from)
      }
    } else {
      target[method] = from
    }
  }
  return target
}

// 判断对象是不是数组类型
function isArray (obj) {
  return Array.isArray ? Array.isArray(obj) : (Object.prototype.toString.call(obj) === '[object Array]')
}

function isDate (obj) {
  return obj instanceof Date
}

// 自定义校验方法
/**
 * //校验是否是自然数
 * @param { String || Number } value
 */
export function isNumber (value) {
  return /^[0-9]+$/.test(value)
}

/**
 * //校验字符长度是否大于值
 * @param { String } str
 * @return {Number}
 */
export function getStrlength (str) {
  if (str == null || (typeof str) === 'object' || (typeof str) === 'undefined') {
    return 0
  }
  if ((typeof str) !== 'string') {
    str += ''
  }
  return str.replace(/[^\u0000-\u00ff]/g, 'xxx').length
}

/**
 * //自定义校验方法
 * @param { Object } rule
 * @param { String } value
 * @param { Function } callback
 */
export function checkSelect (rule, value, callback) {
  if (value.length <= 0) {
    callback(new Error('请选择期望行业'))
  } else {
    callback()
  }
}

export function checkProfessional (rule, value, callback) {
  if (value.length <= 0) {
    callback(new Error('请选择期望职业'))
  } else {
    callback()
  }
}

// 验证纯数字
export function checkNumbers (rule, value, callback) {
  console.log(rule, value, callback)
  const reg = /^[0-9]+$/
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('请输入13-23位纯数字'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 验证金额
export function checkNumber (rule, value, callback) {
  const reg = /^\d+$|^\d+[.]?\d+$/
  if (value === '') {
    callback(new Error('请输入金额'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的金额，例如：80.00'))
  } else {
    callback()
  }
}

// 验证数组期限
export function checkTimeLimit (rule, value, callback) {
  const reg = /^[0-9]+$/
  if (value === '') {
    callback(new Error('请输入收款期限'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入1-6位纯数字'))
  } else {
    callback()
  }
}

// 验证发票编号
export function InvoiceCodes (rule, value, callback) {
  const reg = /^[0-9]+$/
  if (value === '') {
    callback(new Error('请填写发票编号'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入1-8位纯数字'))
  } else {
    callback()
  }
}

// 验证大写英文+数字
export function checkEngNumber (rule, value, callback) {
  const reg = /^[A-Z0-9]+$/
  if (value === '') {
    callback(new Error('请输入统一社会信用代码'))
  } else if (!reg.test(value)) {
    callback(new Error('统一社会信用代码格式有误'))
  } else {
    callback()
  }
}

// 验证固定电话
export function checkFixedPhone (rule, value, callback) {
  const reg = /^[0-9_]+$/
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的固定电话'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

//百分比最大100%
export function checkPercentage (rule, value, callback) {
  const reg = /^\d+$|^\d+[.]?\d+$/
  console.log(rule, value, reg.test(value))
  if (value === '') {
    callback(new Error('请输入数字'))
  } else if (!reg.test(value)) {
    callback(new Error('只能输入数字'))
  } else if (value > 100) {
    callback(new Error('只能输入0-100的数值'))
  } else {
    callback()
  }
}

// 删除数据的空children
export function upAndDown (arr) {
  arr.forEach(obj => {
    if (obj.children.length <= 0) {
      delete obj.children
      return
    } else {
      upAndDown(obj.children)
    }
  })
}


export function uuid () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'   // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)   // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  var uuid = s.join('')
  return uuid
}
export function MenuIdDate () {
  var date = new Date()
  var myyear = date.getFullYear()
  var mymonth = date.getMonth() + 1
  var myweekday = date.getDate()
  if (mymonth < 10) {
    mymonth = '0' + mymonth
  }
  if (myweekday < 10) {
    myweekday = '0' + myweekday
  }
  return (myyear + '' + mymonth + '' + myweekday)
}
/**
 * @param {string} type "s"代表开始,"e"代表结束
 * @param {Date} date 输入的日期
 * 获取这周的起止时间
 */
export function getMonday (type, date, dates) {
  if (date) {
    var now = new Date(date)
  } else {
    var now = new Date()
  }
  var nowTime = now.getTime()
  var day = now.getDay()
  var longTime = 24 * 60 * 60 * 1000
  var n = longTime * 6 * (dates || 0)
  if (type === 's') {
    var dd = nowTime - (day - 0) * longTime + n
  }
  if (type === 'e') {
    var dd = nowTime + (6 - day) * longTime + n
  }
  dd = new Date(dd)
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1
  var d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  var day = y + '-' + m + '-' + d
  return day
}

/**
 * 获取月的起始时间
 */
export function getMonthTime (date) {
  if (date) {
    var now = new Date(date)
  } else {
    var now = new Date()
  }
  var beginTimes = now.getFullYear()
  var Month = now.getMonth() + 1
  var beginTimes = beginTimes + '-' + Month + '-1'
  return beginTimes
}

/**
 * 获得本季度的开始月份
 */
var now = new Date() // 当前日期
var nowMonth = now.getMonth() // 当前月
var nowYear = now.getFullYear() // 当前年
function formatDate (date) {
  var myyear = date.getFullYear()
  var mymonth = date.getMonth() + 1
  var myweekday = date.getDate()
  if (mymonth < 10) {
    mymonth = '0' + mymonth
  }
  if (myweekday < 10) {
    myweekday = '0' + myweekday
  }
  return (myyear + '/' + mymonth + '/' + myweekday)
}

function getQuarterStartMonth () {
  var quarterStartMonth = 0
  if (nowMonth < 3) {
    quarterStartMonth = 0
  }
  if (nowMonth > 2 && nowMonth < 6) {
    quarterStartMonth = 3
  }
  if (nowMonth > 5 && nowMonth < 9) {
    quarterStartMonth = 6
  }
  if (nowMonth > 8) {
    quarterStartMonth = 9
  }
  return quarterStartMonth
}
// 获得某月的天数
function getMonthDays (myMonth) {
  var monthStartDate = new Date(nowYear, myMonth, 1)
  var monthEndDate = new Date(nowYear, myMonth + 1, 1)
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
  return days
}

/**
 * 获得本季度的开始日期
 */
export function getQuarterStartDate () {
  var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1)
  return formatDate(quarterStartDate)
}

/**
 * 本季度的结束日期
 */
export function getQuarterEndDate () {
  var quarterEndMonth = getQuarterStartMonth() + 2
  console.log(nowYear)
  var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth))
  return formatDate(quarterStartDate)
}

/**
 * 上季度的开始日期
 */
export function getLastQuarterStartDate () {
  var now = new Date();
  var nowYear = now.getFullYear(); //当前年
  return new Date(nowYear, getQuarterStartMonth() - 3, 1);
}

/**
 * 上季度的结束日期
 */
export function getLastQuarterEndDate () {
  var quarterEndMonth = getQuarterStartMonth() - 1;
  var now = new Date();
  now.setMonth(quarterEndMonth);
  var nowMonth = now.getMonth();
  var nowYear = now.getFullYear();
  return new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
}

// 本周开始时间 周一为起始
export function getWeekStartDate () {
  var date = new Date()
  var day = date.getDay()
  if (day == 0) {
    var date1 = new Date(date - (day + 6) * 24 * 3600 * 1000)
  } else {
    var date1 = new Date(date - (day - 1) * 24 * 3600 * 1000)
  }
  return date1
}



var loading

const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '操作中，请等待......',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

var loginloading

const startlogin = () => {
  // loginloading = Loading.service({
  //   lock: true,
  //   body: true,
  //   customClass: 'loginloading',
  //   target: '#logintn',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(125, 125, 201, 0.7)'
  // })
  loginloading = Loading.service({
    lock: true,
    text: '登陆中，请耐心等待......',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

export const showlogin = () => {
  startlogin()
}

export const hidelogin = () => {
  if (loginloading) {
    loginloading.close()
  }
}

export const showLoading = () => {
  startLoading()
}
export const hideLoading = () => {
  if (loading) {
    loading.close()
  }
}

/**
 * @param array 要判断的数据
 * @param Id 唯一标识符,键对应的值
 * @param path 要判断的键
 */
export const menuishow = (array, Id, path) => {
  if (array) {
    var data = array.find(v => {
      return v[path] === Id
    })
  } else {
    return false
  }
  if (data) {
    return true
  } else {
    return false
  }
}

/**
 * @param array 判断操作的数组集合
 * @param operate 要判断的操作
 * 返回的结果为是否存在
 */
export const operatebtn = (array, operate) => {
  const isexit = array.find(v => {
    return v.OperationCode === operate
  })
  if (isexit) {
    return true
  } else {
    return false
  }
}

/**
 * @param array 判断操作的数组集合
 * @param operate 要判断的操作
 * 返回的结果为对应的第一个操作 或者为false
 */
export const operatedata = (array, operate) => {
  const isexit = array.find(v => {
    return v.OperationCode === operate
  })
  if (isexit) {
    return isexit
  } else {
    return false
  }
}

//相减得到月份
export const datemonth = (date1, date2) => {
  // 拆分年月日
  date1 = date1.split('-');
  // 得到月数
  date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
  // 拆分年月日
  date2 = date2.split('-');
  // 得到月数
  date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
  var m = Math.abs(date1 - date2);
  if (m > 0) {
    return m + '个月';
  } else {
    return '不满一个月';
  }

}

/**
 * 上月的开始
 */
export function getLastMonthStartDate () {
  var lastMonthDate = new Date(); //上月日期
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  return lastMonthDate;
}

/**
 * 上月的结束
 */
export function getLastMonthEndDate () {
  var lastMonthDate = new Date(); //上月日期
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  var lastMonth = lastMonthDate.getMonth();
  lastMonthDate.setDate(getMonthDays(lastMonth));
  return lastMonthDate;
}

//函数防抖
export function debounce (fn, delay = 3000) { //默认300毫秒
  var timer;
  return function () {
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args); // this 指向vue
    }, delay);
  };
}

/**
 * 数组切成多个小数组
 * @param {Array} array 要处理的数组
 * @param {Number} subGroupLength 小数组的长度
 */
export function group (array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }

  return newArray;
}

/**
 * 数组对象去重
 * @param {Array} arr 要处理的数组
 * @returns 返回一个新的数组
 */
export function unique (arr) {
  let set = new Set();
  for (let i = 0; i < arr.length; i++) {
    let str = objSort(arr[i])
    set.add(str)
  }
  //将数组中的字符串转回对象
  arr = [...set].map(item => {
    return JSON.parse(item)
  })
  return arr
}

function objSort (obj) {
  let newObj = {}
  //遍历对象，并将key进行排序
  Object.keys(obj).sort().map(key => {
    newObj[key] = obj[key]
  })
  //将排序好的数组转成字符串
  return JSON.stringify(newObj)
}
