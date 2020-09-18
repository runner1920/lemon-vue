import request from '@/httpConfig/http';
// 登陆
export function login(data) {
  return request({
    url: 'web/sticklogin/stick/login/v1/AM2802',
    method: 'post',
    data
  });
}
// 是否输入邀请码登陆
export function checkYQ(data) {
  return request({
    url: '/web/sticklogin/check/phoneNumber/v1/AM2801',
    method: 'post',
    data
  });
}
// 注册
export function register(data) {
  return request({
    url: '/web/stickregister/stick/register/v1/AM2803',
    method: 'post',
    data
  });
}
// 获取图片验证码
export function getAuthCode(data) {
  return request({
    url: '/web/verify/check/code',
    method: 'post',
    data
  });
}
// 发送短信验证码
export function getAuthTwo(data) {
  return request({
    url: '/web/member/login/send/msg',
    method: 'post',
    data
  });
}
// 邀请码是否正确
export function isYQ(data) {
  return request({
    url: 'web/sticklogin/verif/promotionCode/v1/AM2807',
    method: 'post',
    data
  });
}
// 检验原密码
export function checkPassWord(data) {
  return request({
    url: '/web/member/login/check/login/passwod',
    method: 'post',
    data
  });
}
// 重置密码
export function resetPassWord(data) {
  return request({
    url: '/web/member/login/back/password',
    method: 'post',
    data
  });
}
