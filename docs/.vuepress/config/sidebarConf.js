const path = require('path')
const rootpath = path.join(__dirname, '..', '..', '..') //执行一次dirname将目录定位到docs的上级目录，也就是博客根目录
const genSidebarConf = require(rootpath + '/utils/genSidebarConf.js')

// 各类型侧边栏配置对象
const javascript = genSidebarConf('/front-end/javascript/', 'JAVASCRIPT')
const css = genSidebarConf('/front-end/css/', 'CSS')
const h5 = genSidebarConf('/front-end/h5/', 'H5与小程序')
const framework = genSidebarConf('/front-end/framework/', '各种框架')
const pack = genSidebarConf('/front-end/vue/', 'vue')
const frontEnd = genSidebarConf('/front-end/', '前端', false)
const tools = genSidebarConf('/tools/', '工具', false)
const linux = genSidebarConf('/linux/', 'LINUX', false)
const notes = genSidebarConf('/notes/', 'NOTES', false)
const essays = genSidebarConf('/essays/', 'ESSAYS', false)
const about = genSidebarConf('/about/', '关于', false)

module.exports = Object.assign({}, linux, notes, essays, about, javascript, css, h5, framework, pack, frontEnd, tools)