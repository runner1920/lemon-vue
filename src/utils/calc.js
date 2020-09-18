/* decimal.js */
import { Decimal } from 'decimal.js';
/*
  函数，加法函数，用来得到精确的加法结果
  说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
  参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
  调用：accAdd(arg1,arg2,d)
  返回值：两数相加的结果
 */
function accAdd(arg1, arg2, ...rest) {
  if (
    arg1 === '' ||
    arg1 === null ||
    arg2 === '' ||
    arg2 === null ||
    arg1 === undefined ||
    arg2 === undefined ||
    Number.isNaN(Number(arg1)) ||
    Number.isNaN(Number(arg2))
  ) {
    return 0;
  }
  const d = rest[0];
  const a = new Decimal(arg1);
  const b = new Decimal(arg2);
  const c = a.plus(b);
  const e = c.toFixed(d);
  return typeof d === 'number'
    ? parseFloat(e.toString())
    : parseFloat(c.toString());
}
/*
  函数：减法函数，用来得到精确的减法结果
  说明：函数返回较为精确的减法结果。
  参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数
  调用：accSubtr(arg1,arg2)
  返回值：两数相减的结果
 */
function accSubtr(arg1, arg2, ...rest) {
  if (
    arg1 === '' ||
    arg1 === null ||
    arg2 === '' ||
    arg2 === null ||
    arg1 === undefined ||
    arg2 === undefined ||
    Number.isNaN(Number(arg1)) ||
    Number.isNaN(Number(arg2))
  ) {
    return 0;
  }
  const d = rest[0];
  const a = new Decimal(arg1);
  const b = new Decimal(arg2);
  const c = a.minus(b);
  const e = c.toFixed(d);
  return typeof d === 'number'
    ? parseFloat(e.toString())
    : parseFloat(c.toString());
}
/*
  函数：乘法函数，用来得到精确的乘法结果
  说明：函数返回较为精确的乘法结果。
  参数：arg1：第一个乘数；arg2第二个乘数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
  调用：accMul(arg1,arg2)
  返回值：两数相乘的结果
 */
function accMul(arg1, arg2, ...rest) {
  if (
    arg1 === '' ||
    arg1 === null ||
    arg2 === '' ||
    arg2 === null ||
    arg1 === undefined ||
    arg2 === undefined ||
    Number.isNaN(Number(arg1)) ||
    Number.isNaN(Number(arg2))
  ) {
    return 0;
  }
  const d = rest[0];
  const a = new Decimal(arg1);
  const b = new Decimal(arg2);
  const c = a.times(b);
  const e = c.toFixed(d);
  return typeof d === 'number'
    ? parseFloat(e.toString())
    : parseFloat(c.toString());
}
/*
  函数：除法函数，用来得到精确的除法结果
  说明：函数返回较为精确的除法结果。
  参数：arg1：除数；arg2被除数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
  调用：accDivCoupon(arg1,arg2)
  返回值：arg1除于arg2的结果
 */
function accDivCoupon(arg1, arg2, ...rest) {
  if (
    arg1 === '' ||
    arg1 === null ||
    arg2 === '' ||
    arg2 === null ||
    arg1 === undefined ||
    arg2 === undefined ||
    Number.isNaN(Number(arg1)) ||
    Number.isNaN(Number(arg2))
  ) {
    return 0;
  }
  const d = rest[0];
  const a = new Decimal(arg1);
  const b = new Decimal(arg2);
  const c = a.dividedBy(b);
  const e = c.toFixed(d);
  return typeof d === 'number'
    ? parseFloat(e.toString())
    : parseFloat(c.toString());
}
/*
  函数：金额转大写函数
  说明：函数返回大写金额。
  参数：n：String | Number 需被转化的金额
  调用：toChinese(n)
  返回值：大写金额
 */
function toChinese(n) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return '数据非法';
  let unit = '京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分';
  let str = '';
  n += '00';
  const p = n.indexOf('.');
  if (p >= 0) n = n.substring(0, p) + n.substr(p + 1, 2);
  unit = unit.substr(unit.length - n.length);
  for (let i = 0; i < n.length; i++)
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
  return str
    .replace(/零(仟|佰|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(兆|万|亿|元)/g, '$1')
    .replace(/(兆|亿)万/g, '$1')
    .replace(/(京|兆)亿/g, '$1')
    .replace(/(京)兆/g, '$1')
    .replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, '$1$2零$3仟')
    .replace(/^元零?|零分/g, '')
    .replace(/(元|角)$/g, '$1整');
}
/*
  函数：json数组求和
  说明：函数返回对应字段的和(Number类型)
  参数：arr：Array 数组 key: String 需要求和的key值 d: String 多层级
  调用：arrAdd(arr,key)
  返回值：对应字段的和(Number类型)
 */
function arrAdd(arr, key, ...rest) {
  const d = rest[0];
  if (!d) {
    if (arr instanceof Array) {
      let num = 0;
      for (const i in arr) {
        if (
          Number.isNaN(Number(arr[i][key])) ||
          arr[i][key] === '' ||
          arr[i][key] === null ||
          arr[i][key] === undefined
        ) {
          return 0;
        }
        num = accAdd(arr[i][key], num);
      }
      return num;
    }
  } else if (arr instanceof Array) {
    let num = 0;
    for (const i in arr) {
      if (
        Number.isNaN(Number(arr[i][d][key])) ||
        arr[i][d][key] === '' ||
        arr[i][d][key] === null ||
        arr[i][d][key] === undefined
      ) {
        return 0;
      }
      num = accAdd(arr[i][d][key], num);
    }
    return num;
  }
  return 0;
}
/*
  函数：字符串拼接函数
  说明：字符串拼接。
  参数：soure: String 需要拼接的字符串 start：Array | Number 拼接位置 newStr: String 拼接字符
  调用：insertStr(soure,start,newStr)
  返回值：拼接后的字符串
 */
function insertStr(soure, start, newStr = ' ') {
  if (soure) {
    if (start instanceof Array) {
      let oldString = soure;
      start.forEach((e) => {
        oldString = oldString.slice(0, e) + newStr + oldString.slice(e);
      });
      return oldString;
    }
    return soure.slice(0, start) + newStr + soure.slice(start);
  }
  return '';
}
/*
  函数：深拷贝函数
  说明：数组或对象深拷贝
  参数：source: Array | Object 需要拷贝的数组或对象
  调用：objDeepCopy(source)
  返回值：拷贝后的数组或对象
 */
function objDeepCopy(source) {
  const sourceCopy = source instanceof Array ? [] : {};
  for (const item in source) {
    sourceCopy[item] =
      typeof source[item] === 'object'
        ? objDeepCopy(source[item])
        : source[item];
  }
  return sourceCopy;
}
/*
  函数：字符串截取函数
  说明：字符串截取拼接
  参数：str: String 需要处理的字符串 start: Number 起始位置 end: Number 结束位置 newStr: String 需要拼接的值
  调用：subStr(str, start, end, newStr)
  返回值：处理后的字符串
 */
function subStr(str, start, end, newStr = '') {
  if (str) {
    return str.substring(0, start) + newStr + str.substring(str.length - end);
  }
  return '';
}
/*
  函数：保留中文函数
  说明：保留中文,舍弃其他
  参数：strValue: String 需要处理的字符串
  调用：GetChinese(strValue)
  返回值：处理后的字符串
 */
function GetChinese(strValue) {
  if (strValue != null && strValue !== '') {
    const reg = /[\u4e00-\u9fa5]/g;
    return strValue.match(reg).join('');
  }
  return '';
}
/*
  函数：日期函数
  说明：时间戳或日期格式转格式化后的日期
  参数：str: String | Date 需要格式化的date或时间戳 arguments1: String 年月日格式化的间隔符 arguments2 时分秒格式化的间隔符
  调用：getDates(str)
  返回值：dateObj 对象, 内置格式化年 月 日 时 分 秒 YYYY-MM-DD YYYY-MM-DD HH:MM:SS格式 (如果arguments1或arguments2有参数, 返回值根据arguments1或arguments2参数返回相应格式化后的值)
 */
function getDates(str, ...rest) {
  let data = null;
  if (typeof str === 'object') {
    data = str;
  } else if (typeof str === 'string' || typeof str === 'number') {
    data = new Date(str);
  }
  const b = rest[0];
  const c = rest[1];

  const year = `${data.getFullYear()}`;
  const monthNum = data.getMonth() + 1;
  let month = `${data.getMonth() + 1}`;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = `${data.getDate()}`;
  if (day < 10) {
    day = `0${day}`;
  }
  let hours = `${data.getHours()}`;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = `${data.getMinutes()}`;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = `${data.getSeconds()}`;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  let dayNum = '';
  let daysNum = '';
  daysNum = data;
  daysNum.setMonth(data.getMonth() + 1);
  daysNum.setDate(0);
  dayNum = daysNum.getDate();
  let getHMS = '';
  if (typeof c === 'string') {
    getHMS = `${hours}${c}${minutes}${c}${seconds}`;
  } else {
    getHMS = `${hours}:${minutes}:${seconds}`;
  }
  let getYMD = '';
  let getYMDHMS = '';
  if (typeof b === 'string') {
    getYMD = `${year}${b}${month}${b}${day}`;
  } else {
    getYMD = `${year}-${month}-${day}`;
  }
  getYMDHMS = `${getYMD} ${getHMS}`;
  return {
    year,
    month,
    monthNum,
    day,
    hours,
    minutes,
    seconds,
    dayNum,
    getHMS,
    getYMD,
    getYMDHMS
  };
}
/*
  函数：金额格式化函数
  说明：将金额进行格式化
  参数：str: Number | String 需要处理的数字或字符串形式的数字
  调用：formatNum(str)
  返回值：格式化后的金额字符串
 */
// 金额美化
function formatNum(str, type = 1) {
  if (str === '-' || str === null || str === undefined) {
    return str;
  }
  if (typeof str !== 'string') {
    if (Number.isNaN(Number(str))) {
      return '';
    }
  }
  str = +str;
  // zh中文格式  it-IT美元格式
  const formatStr = str.toLocaleString('zh', {
    style: 'decimal'
  });
  if (type === 2) {
    return formatStr;
  }
  if (str.toString().indexOf('.') === -1) {
    return `${formatStr}.00`;
  }
  const minute = str.toString().substr(str.toString().indexOf('.'));
  if (minute.length < 3) {
    return `${formatStr}0`;
  }
  return `${formatStr}`;
}
export default {
  accAdd,
  accSubtr,
  accMul,
  accDivCoupon,
  toChinese,
  insertStr,
  subStr,
  GetChinese,
  formatNum,
  objDeepCopy,
  arrAdd,
  getDates
};
