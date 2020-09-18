/**
 * ajax请求配置
 */
import axios from "axios";
import cookie from "@/utils/cookie";
import secret from "@/utils/secret";
import router from "@/router";
import store from "@/store";

const service = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/rxtx/platform" : "/api", // 默认地址
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000 // request timeout
});
service.defaults.transformRequest = data => {
  let str = {};
  str.reqtime = new Date().getTime();
  str.sign = secret.MD5(data);
  str.data = JSON.stringify(data);
  str = secret.EncryptEn(str);
  return str;
};
// 路由请求拦截
// http request 拦截器
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers.platform = 4;
    config.headers.client = 3;
    if (localStorage.getItem("rongyitie_token")) {
      cookie.set(
        "rongyitie_token",
        localStorage.getItem("rongyitie_token"),
        1 / 12
      );
      config.headers.token = localStorage.getItem("rongyitie_token");
      if (cookie.get("rongyitie_token")) {
        // 用户每次操作，都将cookie设置成2小时
        cookie.set("rongyitie_token", cookie.get("rongyitie_token"), 1 / 12);
        config.headers.token = cookie.get("rongyitie_token");
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error.response);
  }
);

// 路由响应拦截
// http response 拦截器
service.interceptors.response.use(
  response => {
    if (window.location.hostname != "ryt.fichange.com") {
      console.log(secret.DecryptDe(response.data), response.config.url);
    }
    if (
      response.headers["content-type"] === "application/ms-excel;charset=UTF-8"
    ) {
      return response;
    }
    if (secret.DecryptDe(response.data).code === "400001") {
      store.commit("signOut");
      router.replace({
        name: "login"
      });
      const data = { code: "400001", desc: "登录已超时，请重新登录！" };
      console.log(data);
      return data;
    }
    if (secret.DecryptDe(response.data).code === "400004") {
      store.commit("signOut");
      router.replace({
        name: "login"
      });
      const data = {
        code: "400004",
        desc: "您的账号在它处登录成功，当前位置已退出，如有疑问请及时修改密码"
      };
      console.log(data);
      return data;
    }

    const data = secret.DecryptDe(response.data);
    return data;
    // return response.data;
  },
  error => Promise.reject(error)
);
export default service;
