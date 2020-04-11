<template>
  <div id="vcomments"></div>
</template>

<script>
  export default {
    mounted() {
      this.renderValine()
    },
    methods: {
      renderValine() {
        const Valine = require('valine')
        const leancloudStorage = require('leancloud-storage')
        // require window 
        if (typeof window !== undefined) {
          window.AV = leancloudStorage
        }
        // 初始化valine
        new Valine({
          el: '#vcomments',
          appId: 'fNRdGXw2Nxllsf5X5tphLghS-gzGzoHsz', // your appId
          appKey: 'JWQotRV97pL9bH90nhrl22br', // your appKey
          notify: false, // 邮件提醒 
          verify: false, // 验证码
          avatar: 'monsterid',
          placeholder: '欢迎留言与我分享您的想法...',
          path: window.location.pathname // 虽然默认就是这个，但是不加会导致不重新加载评论
        })
      }
    }
  }
</script>