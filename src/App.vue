<template>
  <div id="app">
    <router-view v-if="routerAlive" />
  </div>
</template>
<script>
import wx from "weixin-js-sdk";
import { getConfig } from "@/api/index";
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      routerAlive: true,
    };
  },
  mounted() {
    this.getConfig();
  },
  methods: {
    //获取配置信息
    getConfig() {
      var obj = {
        url: this.$secret.Base64(window.location.href.split("#")[0]),
      };
      getConfig(obj)
        .then((res) => {
          if (res.code === "000000") {
            let configInfo = res.data;
            wx.config({
              debug: false,
              appId: configInfo.appId,
              timestamp: configInfo.timestamp,
              nonceStr: configInfo.nonceStr,
              signature: configInfo.signature,
              jsApiList: [
                "updateTimelineShareData",
                "updateAppMessageShareData",
              ],
            });
            wx.ready(() => {
              //分享到朋友圈
              wx.updateTimelineShareData({
                title: `头号报价:交易信息撮合管家`,
                // 分享标题
                desc: `发布您的报价，系统自动匹配，微信消息通知，快来看看吧`,
                link:
                  window.location.protocol +
                  "//" +
                  window.location.host +
                  "/index",
                // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl:
                  "https://www.fichange.com/publicize/img/coupon_logo.png",
                // 分享图标
                success: function success() {},
              });
              //分享给朋友
              wx.updateAppMessageShareData({
                title: `头号报价:交易信息撮合管家`,
                // 分享标题
                desc: `发布您的报价，系统自动匹配，微信消息通知，快来看看吧`,
                // 分享描述
                link:
                  window.location.protocol +
                  "//" +
                  window.location.host +
                  "/index",
                imgUrl:
                  "https://www.fichange.com/publicize/img/coupon_logo.png",

                // 分享图标
                success: function success() {},
              });
            });
          } else {
            this.$msg.error(res.desc);
          }
        })
        .catch(() => {
          this.$msg.error("请求失败");
        });
    },
    reload() {
      this.routerAlive = false;
      this.$nextTick(() => {
        this.routerAlive = true;
      });
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1a1a1a;
  padding-top: constant(safe-area-inset-top);
  padding-right: constant(safe-area-inset-right);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-left: constant(safe-area-inset-left);
  height: 100%;
}
body {
  height: 100vh;
  overflow-y: auto;
  background: #f2f2f2;
  /* IOS禁止微信调整字体大小 */
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
