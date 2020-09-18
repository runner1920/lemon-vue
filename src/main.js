import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import calc from "@/utils/calc";
import secret from "@/utils/secret";
import "@style/vant.scss";
import { Dialog, Notify, Toast } from "vant";

Vue.config.productionTip = false;
// 挂载常用方法
Vue.prototype.$secret = secret;
Vue.prototype.$calc = calc;
Vue.prototype.$accAdd = calc.accAdd;
Vue.prototype.$accSubtr = calc.accSubtr;
Vue.prototype.$accMul = calc.accMul;
Vue.prototype.$accDiv = calc.accDiv;
Vue.prototype.$formatNum = calc.formatNum;
Vue.prototype.$dialog = Dialog;
Vue.prototype.$toast = Toast;

//禁止缩放字体
(function () {
  if (
    typeof WeixinJSBridge == "object" &&
    typeof WeixinJSBridge.invoke == "function"
  ) {
    handleFontSize();
  } else {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", handleFontSize);
      document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
    }
  }
  function handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on("menu:setfont", function () {
      WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    });
  }
})();

// 二次封装$msg
Vue.prototype.$msg = {
  success: (str) => {
    Notify.clear;
    // 成功通知
    Notify({ type: "success", message: str });
  },
  error: (str) => {
    Notify.clear;
    // 危险通知
    Notify({ type: "danger", message: str });
  },
  warning: (str) => {
    Notify.clear;
    // 警告通知
    Notify({ type: "warning", message: str });
  },
  info: (str) => {
    Notify.clear;
    // 主要通知
    Notify({ type: "primary", message: str });
  },
};
//设置rem
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function () {
      var clientWidth = docEl.clientWidth;

      if (!clientWidth) return;

      docEl.style.fontSize = 50 * (clientWidth / 375) + "px";

      console.log(docEl.style.fontSize);
    };

  if (!doc.addEventListener) return;

  win.addEventListener(resizeEvt, recalc, false);

  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

// vuex数据更新
const fromRoute = localStorage.getItem("fromRoute");
store.commit("setFromRoute", fromRoute);
if (localStorage.getItem("isLogin")) {
  const isLogin = localStorage.getItem("isLogin");
  const baseInfo = localStorage.getItem("thbj_baseInfo");
  const token = localStorage.getItem("thbj_token");

  store.commit("login", isLogin ? JSON.parse(isLogin) : false);
  store.commit("setInfo", JSON.parse(baseInfo));
  store.commit("setToken", token);
}

// 解决iponex浏览器底部覆盖tab问题
var state1 = {
  title: "title",
  url: "#",
};
window.history.pushState(state1, "title", "#");

//没有登陆走微信授权登陆
router.beforeEach(async (to, from, next) => {
  store.commit("setPath", to.name);
  // set page title
  document.title = "头号报价";
  if (from.name) {
    store.commit("setFromRoute", from.name);
  }
  if (!store.state.isLogin) {
    //判断是否微信
    let ua = navigator.userAgent.toLowerCase();
    let isWeixin = ua.indexOf("micromessenger") != -1;

    if (isWeixin) {
      if (!to.query.code) {
        //如果需要再微信浏览器默认登陆
        // const configInfo = await store.dispatch("getConfig", {
        //   url: secret.Base64(window.location.href.split("#")[0]),
        // });
        // const configInfo = await store.dispatch("getConfig", {
        //   url: secret.Base64("https://www.fichange.com"),
        // });
      } else {
        let response;
        //1 需要授权登陆
        if (localStorage.getItem("isFrist") == 1) {
          response = await store.dispatch("wxFristLogin", {
            code: to.query.code,
          });
        } else {
          response = await store.dispatch("wxLogin", {
            code: to.query.code,
          });
        }
        if (response.code === "000000") {
          //未注册 需要授权code
          if (response.data.bindStatus == 1) {
            localStorage.setItem("isFrist", 1);
            store.dispatch("getConfig", {
              url: secret.Base64("https://www.fichange.com"),
              isFrist: true,
            });
            // next("/register");
          } else {
            store.commit("login", true);
            store.commit("setToken", response.data.token);
            store.commit("setInfo", response.data);
          }
          console.log(2222);
        } else {
          console.log(111111);
          Vue.prototype.$msg.error(response.desc);
        }
      }
      next();
    } else {
      if (to.name == "setPhone") {
        Dialog.alert({
          message: "请在微信内打开后操作",
        }).then(() => {
          // next();
        });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
