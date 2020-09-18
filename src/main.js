import Vue from "vue";
import calc from "@/utils/calc";
import secret from "@/utils/secret";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

// 挂载常用方法
Vue.prototype.$secret = secret;
Vue.prototype.$calc = calc;
Vue.prototype.$accAdd = calc.accAdd;
Vue.prototype.$accSubtr = calc.accSubtr;
Vue.prototype.$accMul = calc.accMul;
Vue.prototype.$accDiv = calc.accDiv;
Vue.prototype.$formatNum = calc.formatNum;
// Vue.prototype.$http = axios;

// 二次封装$msg
Vue.prototype.$msg = {
  success: str => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.success(str);
  },
  error: str => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.error(str);
  },
  warning: str => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.warning(str);
  },
  info: str => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.info(str);
  },
  destroy: () => {
    Vue.prototype.$message.closeAll();
  }
};

// 权限检查方法
Vue.prototype.$_has = value => {
  const premissions = store.state.permission;
  if (
    premissions === undefined ||
    premissions === null ||
    premissions.length <= 0
  ) {
    return false;
  }
  if (premissions.indexOf(value) > -1) {
    return true;
  }
  return false;
};

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from "../mock";
if (process.env.NODE_ENV === "production") {
  mockXHR();
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
