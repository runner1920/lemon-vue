import { Message, MessageBox } from 'element-ui';
import calc from '@/utils/calc';
import router from '@/router';
import store from '@/store';
import secret from '@/utils/secret';
import axios from '@/httpConfig/http';

// 用户设备信息
function $getInfo() {
  const { platform, userAgent } = navigator;
  const info = [];
  let tempArray = '';
  if (platform.indexOf('Win') > -1) {
    if (userAgent.indexOf('Windows NT 5.0') > -1) {
      info[0] = 'Win2000';
    } else if (userAgent.indexOf('Windows NT 5.1') > -1) {
      info[0] = 'WinXP';
    } else if (userAgent.indexOf('Windows NT 5.2') > -1) {
      info[0] = 'Win2003';
    } else if (userAgent.indexOf('Windows NT 6.0') > -1) {
      info[0] = 'WindowsVista';
    } else if (
      userAgent.indexOf('Windows NT 6.1') > -1 ||
      userAgent.indexOf('Windows 7') > -1
    ) {
      info[0] = 'Win7';
    } else if (userAgent.indexOf('Windows 8') > -1) {
      info[0] = 'Win8';
    } else if (userAgent.indexOf('Windows NT 10.0') > -1) {
      info[0] = 'Win10';
    } else {
      info[0] = 'Other';
    }
  } else if (platform.indexOf('Mac') > -1) {
    info[0] = 'Mac';
  } else if (platform.indexOf('X11') > -1) {
    info[0] = 'Unix';
  } else if (platform.indexOf('Linux') > -1) {
    info[0] = 'Linux';
  } else {
    info[0] = 'Other';
  }
  if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
    tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
    info[1] = tempArray[1] + tempArray[2];
  } else if (/MSIE \d+\.\d+/.test(userAgent)) {
    tempArray = /MS(IE) (\d+\.\d+)/.exec(userAgent);
    info[1] = tempArray[1] + tempArray[2];
  } else if (/[Cc]hrome\/\d+/.test(userAgent)) {
    tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
    info[1] = tempArray[1] + tempArray[2];
  } else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
    tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(
      userAgent
    );
    info[1] = tempArray[3] + tempArray[1];
  } else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
    tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
    info[1] = tempArray[1] + tempArray[2];
  } else {
    info[1] = 'unknown';
  }
  return info;
}

// 判断用户设备(mobile or pc)
function browserRedirect() {
  const sUserAgent = navigator.userAgent.toLowerCase();
  const bIsIpad = sUserAgent.match(/ipad/i) === 'ipad';
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os';
  const bIsMidp = sUserAgent.match(/midp/i) === 'midp';
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4';
  const bIsUc = sUserAgent.match(/ucweb/i) === 'ucweb';
  const bIsAndroid = sUserAgent.match(/android/i) === 'android';
  const bIsCE = sUserAgent.match(/windows ce/i) === 'windows ce';
  const bIsWM = sUserAgent.match(/windows mobile/i) === 'windows mobile';
  return (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  );
}
// 新建a标签跳转
function openNewUrl(href, target) {
  const a = document.createElement('a');
  a.setAttribute('href', href);
  a.setAttribute('target', target);
  a.setAttribute('id', 'startTelMedicine');
  // 防止反复添加
  if (document.getElementById('startTelMedicine')) {
    document.body.removeChild(document.getElementById('startTelMedicine'));
  }
  document.body.appendChild(a);
  a.click();
}
// 判断用户设备(mobile or pc)
function IsPC() {
  const userAgentInfo = navigator.userAgent;
  const Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

// 银行类型
function $getBankType(type, acceptorOpenBankName) {
  const banktype = +type;
  if (banktype === 1) {
    return '国股';
  }
  if (banktype === 2) {
    return '大商';
  }
  if (banktype === 3) {
    return '城商';
  }
  if (banktype === 4) {
    return '外资';
  }
  if (banktype === 5) {
    return '农商';
  }
  if (banktype === 6) {
    return '农联';
  }
  if (banktype === 7) {
    return '农信';
  }
  if (banktype === 8) {
    return '农合';
  }
  if (banktype === 9) {
    return '民营';
  }
  if (banktype === 10) {
    return '村镇';
  }
  if (banktype === 11) {
    return '财务公司';
  }
  if (
    banktype === '' ||
    banktype === null ||
    banktype === undefined ||
    banktype === 0
  ) {
    if (
      acceptorOpenBankName === '' ||
      acceptorOpenBankName === null ||
      acceptorOpenBankName === undefined
    ) {
      return '';
    }
    return acceptorOpenBankName;
  }
  return '其他';
}

// 年利率处理
function formatRateYear(str) {
  if (Number.isNaN(Number(str))) {
    return '';
  }
  const formatStr = str.toString();
  if (formatStr.indexOf('.') === -1) {
    return `${formatStr}.0%`;
  }
  return `${formatStr}%`;
}

// 价格格式化 含有计算后的每十万计费
function $getFeeNoType(feeType, rateYear, FeePerTen, Fee) {
  if (feeType === 1) {
    if (rateYear && FeePerTen) {
      const FeePerTenMoney = calc.accDivCoupon(FeePerTen, 100);
      const FeeMoney = calc.accDivCoupon(Fee, 100);
      return `${formatRateYear(rateYear)}+${FeePerTenMoney}/${FeeMoney}`;
    }
    if (rateYear && !FeePerTen) {
      const FeeMoney = calc.accDivCoupon(Fee, 100);
      return `${formatRateYear(rateYear)}+0/${FeeMoney}`;
    }
    if (!rateYear && FeePerTen) {
      const FeePerTenMoney = calc.accDivCoupon(FeePerTen, 100);
      return `${FeePerTenMoney}`;
    }
  } else if (feeType === 2) {
    if (Fee) {
      const FeeMoney = calc.accDivCoupon(Fee, 100);
      return `${FeeMoney}`;
    }
  }
  return '';
}

// 价格格式化 不含有计算后的每十万计费
function $getFee(feeType, rateYear, FeePerTen, Fee) {
  if (feeType === 1) {
    if (rateYear && FeePerTen) {
      const FeePerTenMoney = calc.accDivCoupon(FeePerTen, 100);
      return `${formatRateYear(rateYear)}+${FeePerTenMoney}元/十万`;
    }
    if (rateYear && !FeePerTen) {
      return `${formatRateYear(rateYear)}+0元/十万`;
    }
    if (!rateYear && FeePerTen) {
      const FeePerTenMoney = calc.accDivCoupon(FeePerTen, 100);
      return `${FeePerTenMoney}元/十万`;
    }
    return false;
  }
  if (feeType === 2) {
    if (Fee) {
      const FeeMoney = calc.accDivCoupon(Fee, 100);
      return `${FeeMoney}元/十万`;
    }
  }
  return '';
}

// 格式化价格
function $getFeeMain(feeType, rateYear, FeePerTen, Fee) {
  if (feeType === 1) {
    if (rateYear && FeePerTen) {
      const FeePerTenMoney = calc.accDivCoupon(FeePerTen, 100);
      return `${formatRateYear(rateYear)}+${FeePerTenMoney}元/十万`;
    }
    if (rateYear && !FeePerTen) {
      return `年利率不低于${formatRateYear(rateYear)}`;
    }
    if (!rateYear && FeePerTen) {
      const FeePerTenMoney = calc.accDivCoupon(FeePerTen, 100);
      return `每十万手续费不低于${FeePerTenMoney}元`;
    }
    return '';
  }
  if (feeType === 2) {
    if (Fee) {
      const FeeMoney = calc.accDivCoupon(Fee, 100);
      return `每十万扣费不低于${FeeMoney}元`;
    }
    return '';
  }
  return '';
}

// 是否有瑕疵
function $hasFlaw(array) {
  if (array instanceof Array) {
    const isFlaw = array.some((e) => e.flaw === 1);
    return isFlaw;
  }
  return false;
}

// 格式化瑕疵
function $flawList(array, separator) {
  if (array instanceof Array) {
    return array
      .filter((e) => e.flaw === 1)
      .map((e) => e.name)
      .join(separator);
  }
  return '';
}

// 金额格式化
function $getBillMoney(min, max) {
  if (min && max) {
    const minMoney = calc.accDivCoupon(min, 1000000);
    const maxMoney = calc.accDivCoupon(max, 1000000);
    return `${minMoney}万-${maxMoney}万元`;
  }
  if (min && !max) {
    const minMoney = calc.accDivCoupon(min, 1000000);
    return `${minMoney}万元以上`;
  }
  if (!min && max) {
    const maxMoney = calc.accDivCoupon(max, 1000000);
    return `${maxMoney}万元以下`;
  }
  return '';
}

// 天数格式化
function $getBillTime(min, max) {
  if (min && max) {
    return `${min}-${max}天`;
  }
  if (min && !max) {
    return `${min}天以上`;
  }
  if (!min && max) {
    return `${max}天及以下`;
  }
  return '';
}

function $dueType(dueType) {
  if (dueType === 1) {
    return '半年';
  }
  if (dueType === 2) {
    return '不足';
  }
  if (dueType === 3) {
    return '一年';
  }
  if (dueType === 4) {
    return '超期';
  }
  if (dueType === 5) {
    return '其他';
  }
  return '';
}

// 心愿单列表
function $wishMain(
  banktype,
  acceptorOpenBankName,
  minBillMoney,
  maxBillMoney,
  minDutDate,
  maxDutDate,
  dueType,
  flawFlag,
  feeType,
  maxRateYear,
  maxFeePerTen,
  maxFee,
  style
) {
  const arr = [];
  const getBankType = $getBankType(banktype, acceptorOpenBankName);
  if (getBankType) {
    arr.push(getBankType);
  }
  const getBillMoney = $getBillMoney(minBillMoney, maxBillMoney);
  if (getBillMoney) {
    arr.push(getBillMoney);
  }

  const getBillTime = $getBillTime(minDutDate, maxDutDate);
  if (getBillTime) {
    arr.push(getBillTime);
  }
  const dueTypes = $dueType(dueType);
  if (dueTypes) {
    arr.push(dueTypes);
  }
  if (flawFlag) {
    arr.push(flawFlag === 1 ? '有瑕疵' : '无瑕疵');
  }
  const getFeeMain = $getFeeMain(feeType, maxRateYear, maxFeePerTen, maxFee);
  if (getFeeMain) {
    arr.push(getFeeMain);
  }
  if (arr.length > 0) {
    return arr.join(style);
  }
  return '';
}

// 星期
function $getDay(date) {
  const getDay = new Date(date).getDay();
  const weekday = [];
  weekday[0] = '日';
  weekday[1] = '一';
  weekday[2] = '二';
  weekday[3] = '三';
  weekday[4] = '四';
  weekday[5] = '五';
  weekday[6] = '六';
  return weekday[getDay];
}

// 星期
function $getDayAll(date) {
  const getDay = new Date(date).getDay();
  const weekday = [];
  weekday[0] = '星期日';
  weekday[1] = '星期一';
  weekday[2] = '星期二';
  weekday[3] = '星期三';
  weekday[4] = '星期四';
  weekday[5] = '星期五';
  weekday[6] = '星期六';
  return weekday[getDay];
}

// 剩余天数
function $timeFn(date1) {
  if (!date1) {
    return 0;
  }
  let dateYMD = '';
  let year2 = '';
  let mouth2 = '';
  let days2 = '';
  let dayDiff = '';
  let day1 = '';
  let day2 = '';
  const dateBegin = new Date();
  day1 = new Date(
    dateBegin.getFullYear(),
    dateBegin.getMonth(),
    dateBegin.getDate()
  );
  if (date1.indexOf(' ') > 0) {
    [dateYMD] = date1.split(' ');
  } else {
    dateYMD = date1;
  }
  if (dateYMD.indexOf('-') > 0) {
    [year2, mouth2, days2] = dateYMD.split('-');
  } else if (dateYMD.indexOf('/') > 0) {
    [year2, mouth2, days2] = dateYMD.split('/');
  }
  day2 = new Date(year2, mouth2 - 1, days2);
  dayDiff = (day2 - day1) / 86400000;
  if (dayDiff > 0) {
    return dayDiff;
  }
  return 0;
}

// 退出登录
function signOut() {
  store.commit('signOut');
  router.push({
    name: 'login'
  });
}

// 瑕疵跳转函数
function jumpFlawList(frontBillInfo, draftBackInfoList, flawLists, f = 2) {
  localStorage.removeItem('thisFlawList');
  const thisFlawList = {};
  thisFlawList.frontBillInfo = frontBillInfo;
  thisFlawList.draftBackInfoList = draftBackInfoList;
  thisFlawList.draftFlaw = flawLists;
  thisFlawList.f = f;
  console.log(thisFlawList);
  localStorage.setItem('thisFlawList', secret.EncryptEn(thisFlawList));
  const routeUrl = router.resolve({
    name: 'flaw'
  });
  window.open(routeUrl.href, '_blank');
}

// 跳转了解交易流程
function jumpJiaoy() {
  const routeUrl = router.resolve({
    name: 'watching'
  });
  window.open(routeUrl.href, '_blank');
}

// 购票跳转页面
function jumpHallBuy(item) {
  router.push({
    name: 'hallBuy',
    query: {
      i: secret.Encrypt(item.id),
      cr: secret.Encrypt(item.createMemberId),
      c: secret.Encrypt(item.companyId),
      f: item.orderFlag
    }
  });
}

// 查詢瑕疵接口
// function postFlawList(id, flag = 1, f = 2, row) {
//   let api;
//   const obj = {};
//   if (flag === 2) {
//     obj.orgBillId = id;
//     api = '/billrepe/new/query/flaw/detail/current/v1/AB2008';
//   } else {
//     obj.companyBillInfoId = id;
//     obj.optFlag = 2;
//     if (row.sourceType === 10) {
//       obj.optFlag = 2;
//       obj.companyBillInfoId = row.companyBillInfoId || row.id;
//     } else if (row.sourceType === 20) {
//       obj.optFlag = 1;
//       obj.orgBillId = row.orgBillId;
//     } else if (row.sourceType === 30) {
//       obj.optFlag = 3;
//       obj.orgStockBillNegatiationId = row.orgStockBillNegatiationId;
//     } else if (row.sourceType === 40) {
//       obj.optFlag = 4;
//       obj.companyBillDraftId = row.companyBillDraftId;
//     }
//     api = '/billrepe/new/query/flaw/detail/history/v1/AB2009';
//   }
//   console.log('瑕疵参数', obj);
//   axios
//     .post(api, obj)
//     .then((data) => {
//       console.log('瑕疵', data);
//       if (data.code === '000000') {
//         // const Datas = JSON.stringify(data.data);
//         // jumpFlawList(draftBackInfoList, draftOneResp);
//         // const routeUrl = router.resolve({
//         //   name: 'endorse',
//         //   query: { Datas }
//         // });
//         // window.open(routeUrl.href, '_blank');
//         const { frontBillInfo, draftBackInfoList, draftFlawVO } = data.data;
//         jumpFlawList(
//           frontBillInfo,
//           draftBackInfoList,
//           draftFlawVO.billDetails,
//           f
//         );
//       } else {
//         Message.error(data.desc);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       Message.error('请求失败');
//     });
// }

// 倒计时
function timer(e) {
  const days = parseInt(e / (1000 * 60 * 60 * 24), 10);
  let hours = parseInt((e % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60), 10);
  if (days > 0) {
    hours += days * 24;
  }
  let minutes = parseInt((e % (1000 * 60 * 60)) / (1000 * 60), 10);
  let seconds = +((e % (1000 * 60)) / 1000).toFixed();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (hours === '00') {
    return `${minutes}分${seconds}秒`;
  }
  return `${hours}时${minutes}分${seconds}秒`;
}

// 显示操作密码
// function showTx(callback) {
//   store.commit('CHANGE_COMMON_FLAG', {
//     showTx: true
//   });
//   store.commit('SET_FUNC', {
//     txSubmit: callback
//   });
// }

// // 关闭操作密码
// function closeTx() {
//   store.commit('CHANGE_COMMON_FLAG', {
//     showTx: false
//   });
//   store.commit('SET_FUNC', {
//     txSubmit: null
//   });
//   store.commit('CHANGE_VALUE', {
//     txCode: ''
//   });
// }

// 显示所属企业
// function showEnt(callback) {
//   store.commit('CHANGE_COMMON_FLAG', {
//     showEnt: true
//   });
//   store.commit('SET_FUNC', {
//     entSubmit: callback
//   });
// }

// // 关闭所属企业
// function closeEnt() {
//   store.commit('CHANGE_COMMON_FLAG', {
//     showEnt: false
//   });
//   store.commit('SET_FUNC', {
//     entSubmit: null
//   });
// }

// // 显示短信验证码
// function showMsg(mobile, submitCallback, renewCallBack) {
//   store.commit('CHANGE_COMMON_FLAG', {
//     showMsg: true
//   });
//   store.commit('SET_MSG_MOBILE', calc.subStr(mobile, 3, 4, '****'));
//   store.commit('SET_FUNC', {
//     msgSubmit: submitCallback,
//     msgRenew: renewCallBack
//   });
//   store.commit('SET_MEG_INFO');
// }

// // 关闭短信验证码
// function closeMsg() {
//   store.commit('CHANGE_COMMON_FLAG', {
//     showMsg: false
//   });
//   store.commit('SET_FUNC', {
//     msgSubmit: null,
//     msgRenew: null
//   });
//   store.commit('CHANGE_VALUE', {
//     msgCode: ''
//   });
//   store.commit('SET_MSG_MOBILE', '');
//   store.commit('CLOSE_MSG_TIMER');
// }

// // 显示设置操作密码
// function showSetTx() {
//   store.commit('CHANGE_COMMON_FLAG', {
//     showSetTx: true
//   });
// }

// // 需要验证操作密码
// function checkedTxCode(callback) {
//   if (store.state.hasTxPsw) {
//     showTx(callback);
//   } else {
//     MessageBox.confirm('您还未设置操作密码，请先设置', '去设置', {
//       distinguishCancelAndClose: true,
//       confirmButtonText: '确定',
//       cancelButtonText: '取消'
//     })
//       .then(() => {
//         showSetTx();
//         store.commit('SET_FUNC', {
//           txSubmit: callback
//         });
//       })
//       .catch(() => {});
//   }
// }

// 进入企业
// function $getQiye(entMemberId, callback) {
//   const userOperationInfo = $getInfo();
//   const [osInfo, browserVersion] = userOperationInfo;
//   const obj = {
//     osInfo,
//     browserVersion,
//     memberId: store.state.userInfo.memberId,
//     entMemberId
//   };
//   axios
//     .post('/web/enterprise/query/member/enterpriseInfo', obj)
//     .then((data) => {
//       console.log(data);
//       if (data.code === '000000') {
//         localStorage.setItem('permission', '');
//         store.commit('SET_ENT_STATE', '');
//         localStorage.setItem('entName', data.data.entName);
//         localStorage.setItem('hasSuperManager', data.data.hasSuperManager);
//         localStorage.setItem('entMemberId', data.data.entMemberId);
//         let entMembers = [];
//         entMembers = JSON.stringify(data.data.permissionAndMenuInfo.entMembers);
//         localStorage.setItem('entMembers', entMembers);
//         store.commit(
//           'SET_ENTRILES',
//           data.data.permissionAndMenuInfo.entMembers
//         );
//         let permission = [];
//         permission = JSON.stringify(data.data.permissionAndMenuInfo.permission);
//         localStorage.setItem('permission', permission);
//         store.commit('HAS_SUPER_MANAGER', data.data.hasSuperManager);
//         store.commit(
//           'SET_ENT_STATE',
//           data.data.permissionAndMenuInfo.permission
//         );
//         store.commit('ISENT', true);
//         store.commit('SET_ENTNAME', data.data.entName);
//         store.commit('SET_ENTID', data.data.entMemberId);
//         if (callback) {
//           callback();
//         } else {
//           router.push({
//             name: 'backstage'
//           });
//         }
//         closeEnt();
//       } else {
//         Message.error(data.desc);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       Message.error('请求失败');
//     });
// }

/* 隐位函数 */
function setHidePosi(str, type = 'bank') {
  if (type === 'bank') {
    if (str.length > 8) {
      const hideStr = new Array(str.length - 8).fill('*').join('');
      return calc.subStr(str, 4, 4, hideStr);
    }
    return str;
  }
  if (type === 'mobile') {
    if (/^1\d{10}$/.test(str)) {
      const hideStr = new Array(str.length - 7).fill('*').join('');
      return calc.subStr(str, 3, 4, hideStr);
    }
    return str;
  }
  return str;
}

/* 票号格式化 */
function setBillNoFo(billNo) {
  return calc.insertStr(billNo, [1, 14, 23, 32]);
}

export default {
  IsPC,
  formatRateYear,
  $getBillTime,
  $getFeeMain,
  $getBillMoney,
  $dueType,
  $wishMain,
  $getInfo,
  browserRedirect,
  $getBankType,
  $getFee,
  $getDay,
  $getDayAll,
  $getFeeNoType,
  $hasFlaw,
  $flawList,
  $timeFn,
  signOut,
  // signEntOut,
  jumpHallBuy,
  jumpFlawList,
  // postFlawList,
  timer,
  // $getQiye,
  // showTx,
  // closeTx,
  // showMsg,
  // closeMsg,
  // showSetTx,
  // checkedTxCode,
  // showEnt,
  // closeEnt,
  setHidePosi,
  setBillNoFo,
  jumpJiaoy,
  openNewUrl
};
