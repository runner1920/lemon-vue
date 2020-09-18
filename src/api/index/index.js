import request from '@/httpConfig/http';
// 身份认证校验
export function goinmber(data) {
  return request({
    url: '/web/member/personalAuth/v1/AM2001',
    method: 'post',
    data
  });
}
// 开始试算
export function submitForm(data) {
  return request({
    url: '/web/bill/sd/channel/query/discount/trial/v2/AB1919',
    method: 'post',
    data
  });
}
// 获取利率
export function getList(data) {
  return request({
    url: '/web/bill/sd/channel/bankStraight/query/discount/rate/v1/AB1915',
    method: 'post',
    data
  });
}
// 获取银行列表
export function getBankList(data) {
  return request({
    url: '/web/bill/sd/channel/list/v2/AB1918',
    method: 'post',
    data
  });
}
// 重新发起获取数据回显
export function getDetail(data) {
  return request({
    url: '/web/bill/sd/Account/getSDAccountDetailById/v1/AB1903',
    method: 'post',
    data
  });
}
// 该企业是否开通
export function isUse(data) {
  return request({
    url: '/web/bill/sd/Account/verifyEntNameAndGetManuscript/v1/AB1905',
    method: 'post',
    data
  });
}
// 工商信息查询
export function getCompanyInfo(data) {
  return request({
    url: '/web/bill/sd/Account/businessInformation/v1/AB1907',
    method: 'post',
    data
  });
}
// 开户
export function toAccount(data) {
  return request({
    url: '/web/bill/sd/Account/insertSDAccountRequest/v1/AB1906',
    method: 'post',
    data
  });
}
// 检测是否有已开通企业
export function checkOpen(data) {
  return request({
    url: '/web/bill/sd/Account/queryOpenBankByChannelCode/v1/AB1909',
    method: 'post',
    data
  });
}
// 确定选择企业
export function sureOpenBank(data) {
  return request({
    url: 'web/sticklogin/add/company/v1/AM2803',
    method: 'post',
    data
  });
}
// ocr识别营业执照
export function getOcrInfo(data) {
  return request({
    url: '/ocr/license/image/v1/CA0003',
    method: 'post',
    data
  });
}
// ocr识别身份证
export function getOcrInfoSFZ(data) {
  return request({
    url: '/ocr/idcard/image/v1/CA0002',
    method: 'post',
    data
  });
}
// 提交开户信息
export function submitOpenForm(data) {
  return request({
    url: '/web/bill/sd/jd/jdEnterpriseRegister/v1/AB2000',
    method: 'post',
    data
  });
}
// 获取京东开户状态
export function getJDstatus(data) {
  return request({
    url: '/web/bill/sd/jd/querySDJD/v1/AB2002',
    method: 'post',
    data
  });
}
// 注册京东
export function registerJD(data) {
  return request({
    url: '/web/bill/sd/jd/registerJDMht/v1/AB2004',
    method: 'post',
    data
  });
}
// 打款验证
export function submitRemit(data) {
  return request({
    url: '/web/bill/sd/jd/enterprisePayCheckMoney/v1/AB2003',
    method: 'post',
    data
  });
}
// 获取京东地址
export function getJDUrl(data) {
  return request({
    url: '/web/bill/sd/jd/queryCreditUrl/v1/AB2005',
    method: 'post',
    data
  });
}
// 上传京东文件
export function upDateJD(data) {
  return request({
    url: '/web/bill/sd/jd/jdFileUpload/v1/AB2001',
    method: 'post',
    data
  });
}
// 获取京东协议Url
export function getAgreeUrl(data) {
  return request({
    url: '/web/bill/sd/jd/hapiLogin/v1/AB2007',
    method: 'post',
    data
  });
}
// 是否阅读协议
export function getIsAgreeJD(data) {
  return request({
    url: '/web/bill/sd/jd/enterpriseQueryLsApply/v1/AB2006',
    method: 'post',
    data
  });
}
// 获取省地址
export function getProvince(data) {
  return request({
    url: '/web/bill/sd/jd/queryProvince/v1/AB2010',
    method: 'post',
    data
  });
}
// 获取市地址
export function getCityList(data) {
  return request({
    url: '/web/bill/sd/jd/queryCityByProvince/v1/AB2011',
    method: 'post',
    data
  });
}
// 获取开户银行
export function getOpenBankList(data) {
  return request({
    url: '/web/bill/sd/jd/queryAllByPI/v1/AB2009',
    method: 'post',
    data
  });
}
// 获取开户支行
export function getOpenBank(data) {
  return request({
    url: '/web/bill/sd/jd/queryByCityAndBank/v1/AB2008',
    method: 'post',
    data
  });
}
