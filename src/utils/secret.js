const CryptoJS = require('crypto-js');

function ASCII(obj) {
  const arr = [];
  let num = 0;
  for (const i in obj) {
    arr[num] = i;
    num++;
  }
  const sortArr = arr.sort();
  const sortObj = {};
  for (const i in sortArr) {
    sortObj[sortArr[i]] = obj[sortArr[i]];
  }
  return sortObj;
}

const key = CryptoJS.enc.Utf8.parse(''); // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse(''); // 十六位十六进制数作为密钥偏移量

// 解密方法
function Decrypt(word) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

// 终极解密方法
function DecryptDe(word) {
  return JSON.parse(Decrypt(decodeURIComponent(word)));
}

// 加密方法
function Encrypt(word) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

// 终极加密方法
function EncryptEn(word) {
  return encodeURIComponent(Encrypt(JSON.stringify(ASCII(word))));
}

// Base64
// function Base64(word) {
//   const srcs = CryptoJS.enc.Utf8.parse(word);
//   const base64string = CryptoJS.enc.Base64.stringify(srcs);
//   return base64string.toString();
// }

// MD5
function MD5(word) {
  // let thisword = word;
  // Object.keys(thisword).map(key =>
  //   thisword[key]===null?delete thisword[key]:void 0)
  // return CryptoJS.MD5(encodeURIComponent(JSON.stringify(ASCII.sort_ASCII(thisword)))).toString();
  // let json = JSON.stringify(ASCII.sort_ASCII(word))
  // json = encodeURIComponent(json)
  // let json = Base64(JSON.stringify(ASCII.sort_ASCII(word)))
  // return CryptoJS.MD5(json).toString();

  const json = JSON.stringify(word);
  return CryptoJS.MD5(json).toString();
}

export default {
  Decrypt,
  Encrypt,
  MD5,
  DecryptDe,
  EncryptEn
};
