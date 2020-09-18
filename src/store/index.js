import Vue from "vue";
import Vuex from "vuex";
import calc from "@/utils/calc";
import cookie from "@/utils/cookie";
import { getConfig, wxFristLogin, wxLogin } from "@/api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: "",
    baseInfo: {},
    fromRoute: "",
    path: "",
    //唤起键盘隐藏底部按钮或菜单
    isShowFixed: true,
  },
  mutations: {
    setPath: (state, data) => {
      state.path = data;
    },
    login: (state, data) => {
      state.isLogin = data;
      localStorage.setItem("isLogin", true);
    },
    setToken: (state, data) => {
      state.token = data;
      localStorage.setItem("thbj_token", data);
    },
    setInfo: (state, data) => {
      localStorage.setItem("thbj_baseInfo", JSON.stringify(data));
      state.baseInfo = data;
    },
    //设置进入路由 用于返回上一级
    setFromRoute: (state, data) => {
      localStorage.setItem("fromRoute", data);
      state.fromRoute = data;
    },
    signOut: (state) => {
      state.isLogin = false;
      state.token = "";
      state.baseInfo = {};

      localStorage.clear();
      cookie.del("thbj_token");
    },
    //唤起键盘隐藏底部按钮或菜单
    setShowFixed: (state, data) => {
      state.isShowFixed = data;
    },
  },
  actions: {
    // 获取配置信息
    getConfig({ commit }, data) {
      return new Promise((resolve, reject) => {
        console.log(data, "data");
        getConfig(data)
          .then((response) => {
            if (response.code == "000000") {
              let configInfo = response.data;
              let scope = "snsapi_base";

              // data.isFrist = true;
              //true 走授权登陆
              if (data.isFrist) {
                scope = "snsapi_userinfo";
              }
              let httpName =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
                configInfo.appId +
                "&redirect_uri=" +
                calc.UrlEncode("https://www.fichange.com") +
                "&response_type=code&scope=" +
                scope +
                "&state=123#wechat_redirect";
              let nextPage = document.createElement("a");
              nextPage.setAttribute("href", httpName);
              nextPage.click();
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 微信登陆
    wxLogin({ commit }, data) {
      console.log(data, "登陆参数");
      return new Promise((resolve, reject) => {
        wxLogin(data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 微信授权登陆
    wxFristLogin({ commit }, data) {
      console.log(data, "登陆参数");
      return new Promise((resolve, reject) => {
        wxFristLogin(data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  modules: {},
});
