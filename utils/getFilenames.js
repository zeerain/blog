/**
 * 获取一个目录下的所有文件名
 * 使用方法：var filehelper = require('./getFilenames.js')
 * filehelper.getFileNames("/Users/fangzheng/JavaDev/blog/docs/BigData/Flume/")
 */
const fs = require('fs')
// 排除检查的文件
const excludes = ['.DS_Store', '.vuepress']

const filehelper = {
  getFileNames: function (rpath) {
    let filenames = [];
    fs.readdirSync(rpath).forEach(file => {
      if (excludes.indexOf(file) < 0) {
        fullpath = rpath + file
        let fileinfo = fs.statSync(fullpath)
        if (fileinfo.isFile()) {
          if (file === 'README.md') {
            file = '';
          } else {
            file = file.replace('.md', '');
          }
          filenames.push(file);
        }
      }
    })
    // console.log('排序后: ', filenames)
    filenames.sort(); // 排序
    // console.log('排序后: ', filenames)
    return filenames;
  }
}
module.exports = filehelper;