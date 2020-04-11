const path = require('path')
const rootpath = path.dirname(__dirname) //执行一次dirname将目录定位到docs的上级目录，也就是博客根目录
const docs = rootpath + "/docs"
const utils = require('./index')
const filehelper = require('./getFilenames')

/**
 * 侧边栏的配置（顺序无所谓）
 * utils.genSidebar('Java基础', filehelper.getFileName(docs+"/Java/Basic/"), false),
 */
function genSidebarConf(relativPath, title = '目录', collapsable = true, sidebarDepth = 2) {
  return {
    [relativPath]: utils.genSidebar(title, filehelper.getFileNames(docs + relativPath), collapsable, sidebarDepth)
  }
}

module.exports = genSidebarConf