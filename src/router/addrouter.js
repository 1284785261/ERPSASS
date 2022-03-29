import Layout from '@/layout'

function childrenrouter (array, params) {
  let route = []
  for (let i = 0; i < array.length; i++) {
    let singlechild = {}
    singlechild.path = getlast(array[i].path)
    singlechild.name = array[i].name
    // singlechild.components = `@/views${array[i].path}`
    singlechild.meta = array[i].meta
    singlechild.meta.amount = params
    singlechild.meta.operations = array[i].operations
    route.push(singlechild)
    singlechild.component = () => import(`@/views${array[i].path}`)
  }
  return route
}

function childrenmenu (array) {
  let menu = []
  for (let i = 0; i < array.length; i++) {
    let singlechild = {}
    singlechild.path = getlast(array[i].path)
    singlechild.name = array[i].name
    singlechild.meta = array[i].meta
    menu.push(singlechild)
  }
  return menu
}

// 获得最后一个单词 例如/api/Project/GetProjectList
function getlast (params) {
  let str = params.split('/')
  return str[str.length - 1]
}

export function getrouter (router) {
  let routes = []
  for (let i = 0; i < router.length; i++) {
    let single = {}
    single.path = router[i].path
    single.name = router[i].name
    single.component = Layout
    if (router[i].path !== '/SystemSetting') {
      if (router[i].children && router[i].children.length) {
        single.redirect = router[i].children[0].path
        single.children = childrenrouter(router[i].children, '1')
      }
    } else {
      if (router[i].children && router[i].children.length) {
        single.redirect = router[i].children[0].path
        single.children = childrenrouter(router[i].children, '7')
      }
    }
    single.meta = router[i].meta
    routes.push(single)
  }
  // console.log(routes);

  return routes
}

// 菜单处理
export function getmenu (router) {
  let menulist = []
  let sysmenulist = []
  // if (router && router.length) {
  for (let i = 0; i < router.length; i++) {
    if (router[i].path !== '/SystemSetting') {
      let single = {}
      single.path = router[i].path
      single.name = router[i].name
      if (router[i].children && router[i].children.length) {
        single.children = childrenmenu(router[i].children)
      }
      single.meta = router[i].meta
      menulist.push(single)
    } else {
      if (router[i].children && router[i].children.length) {
        for (let j = 0; j < router[i].children.length; j++) {
          let single = {}
          single.path = router[i].children[j].path
          single.name = router[i].children[j].name
          single.meta = router[i].children[j].meta
          sysmenulist.push(single)
        }
      }
    }
    // }
  }
  return { menulist, sysmenulist }
}