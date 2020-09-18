import request from "@/httpConfig/http";
//上传文件
export function uploadFile(data) {
  return request({
    url: "/file/upload/one",
    method: "post",
    data,
  });
}

//获取微信配置信息
export function getConfig(data) {
  return request({
    url: "/wechat/config/h5/getConfig",
    method: "post",
    data,
  });
}

//微信授权登录-第一次登陆-注册
export function wxFristLogin(data) {
  return request({
    url: "/web/qt/login/auth",
    method: "post",
    data,
  });
}
//微信授权登录-后续登陆
export function wxLogin(data) {
  return request({
    url: "/web/qt/login/login",
    method: "post",
    data,
  });
}

// 获取短信验证码
export function getMsgCode(data) {
  return request({
    url: "/web/member/login/send/msg",
    method: "post",
    data,
  });
}
// 绑定手机号
export function setPhone(data) {
  return request({
    url: "/web/qt/login/auth/two",
    method: "post",
    data,
  });
}
//大厅列表
export function getHomeList(data) {
  return request({
    url: "/web/qt/bill/page/v1/AM3302",
    method: "post",
    data,
  });
}
