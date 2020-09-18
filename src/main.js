import Vue from 'vue';
import ElementUI from 'element-ui';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import calc from '@/utils/calc';
import secret from '@/utils/secret';
// import axios from '@/httpConfig/http';
import '@style/element-variables.scss';
import '@/assets/font/iconfont.css';
// eslint-disable-next-line import/order
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

// import platform from '@/utils/platform';
// import cookie from '@/utils/cookie';

Vue.config.productionTip = false;
// Vue.use(ElementUI);
Vue.use(require('vue-wechat-title'));

Vue.use(ElementUI, {
  size: 'medium',
});

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
  success: (str) => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.success(str);
  },
  error: (str) => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.error(str);
  },
  warning: (str) => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.warning(str);
  },
  info: (str) => {
    Vue.prototype.$message.closeAll();
    Vue.prototype.$message.info(str);
  },
  destroy: () => {
    Vue.prototype.$message.closeAll();
  },
};

// vuex数据更新
if (localStorage.getItem('rongyitie_isLogin')) {
  const isLogin = localStorage.getItem('rongyitie_isLogin');
  const conpanyInfo = localStorage.getItem('rongyitie_conpanyInfo');
  const baseInfo = localStorage.getItem('rongyitie_baseInfo');
  const token = localStorage.getItem('rongyitie_token');
  const isSuper = localStorage.getItem('isSuper');
  const isEnt = localStorage.getItem('isEnt');
  const hasOpenAccount = localStorage.getItem('hasOpenAccount');
  store.commit('login', JSON.parse(isLogin));
  store.commit('conpanyInfo', JSON.parse(conpanyInfo));
  store.commit('baseInfo', JSON.parse(baseInfo));
  store.commit('setToken', token);
  store.commit('isSuper', JSON.parse(isSuper));
  store.commit('isEnt', JSON.parse(isEnt)); // 1是有企业，2是没有企业
  store.commit('hasOpenAccount', JSON.parse(hasOpenAccount)); // 1注册过企业，2是没有注册
}

// 权限检查方法
Vue.prototype.$_has = (value) => {
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

// 百度数据埋点
// eslint-disable-next-line
const _hmt = _hmt || [];
// eslint-disable-next-line
window._hmt = _hmt;
(() => {
  const hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?7866262f690211a27af9d0561fb8ff5b';
  hm.id = 'baidu_tj';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
  const cnzz = document.createElement('script');
  cnzz.src = 'https://s9.cnzz.com/z_stat.php?id=1277927283&web_id=1277927283';
  cnzz.id = 'cnzz_tj';
  s.parentNode.insertBefore(cnzz, s);

  // 新增统计
  const hmNew = document.createElement('script');
  hmNew.src = 'https://hm.baidu.com/hm.js?217e8f0faa8a442a44757209b598b8f9';
  const sNew = document.getElementsByTagName('script')[0];
  sNew.parentNode.insertBefore(hmNew, sNew);
})();

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// 登录判断
router.beforeEach((to, from, next) => {
  // 设置当前path
  store.commit('setPath', to.path);
  // 开始
  NProgress.start();
  // 判断该路由是否需要登录权限
  if (store.state.isLogin) {
    if (to.path === '/login') {
      next({
        path: '/index',
      });
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
  } else if (to.meta.requireAuth) {
    next({
      path: '/login',
    });
    Vue.prototype.$msg.error('登陆后才能查看此页面哦');
    NProgress.done();
  } else {
    next();
    NProgress.done();
  }
});

Vue.directive('scroll', {
  bind: (el, binding) => {
    let eventAction = true;
    const distance = 40; // (unit: px)
    el.onscroll = (e) => {
      const scrollHeight = e.target.scrollHeight - e.target.clientHeight;
      const residualHeight = scrollHeight - e.target.scrollTop;
      if (
        typeof binding.value === 'function' &&
        residualHeight < distance &&
        eventAction
      ) {
        binding.value();
        eventAction = false;
      } else if (residualHeight > distance) {
        eventAction = true;
      }
    };
  },
});

// 路由切换时置顶
router.afterEach(() => {
  NProgress.done();
  window.scrollTo(0, 0);
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
