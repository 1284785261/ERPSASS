/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * 路由跳转的验证规则
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断用户是否是属于这个数组里的
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * z正则是否符合规范
 * @param {string} str
 */
var Email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
var Mobile = /^1[3456789]\d{9}$/
export function regular(str, value) {
  var is = true
  switch (value) {
    case 'Email':
      is = Email.test(str)
      break
    case 'Mobile':
      is = Mobile.test(str)
      break
    default:
      break;
  }
  return is
}
