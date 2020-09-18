import request from "@/utils/request";
// 登陆
export function login(data) {
  return request({
    url: "web/sticklogin/stick/login/v1/AM2802",
    method: "post",
    data
  });
}
