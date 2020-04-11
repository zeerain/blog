const secretkeyConf = require('./secretKeyConf')
const moment = require('moment')

module.exports = {
  '@vuepress/pwa': {
    serviceWorker: true,
    updatePopup: {
      message: "发现新内容可用.",
      buttonText: "刷新"
    }
  },
  '@vuepress/last-updated': {
    transformer: (timestamp, lang) => {
      moment.locale(lang)
      return moment(timestamp).fromNow()
    }
  },
  '@vuepress/back-to-top': true,
  '@vuepress/google-analytics': {
    'ga': secretkeyConf.ga
  },
  '@vuepress/medium-zoom': true,
}