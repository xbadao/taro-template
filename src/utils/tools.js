import Taro from "@tarojs/taro";
import trimLodash from "lodash/trim";
import replaceLodash from "lodash/replace";
import isEqualLodash from "lodash/isEqual";
import isFunctionLodash from "lodash/isFunction";
import isArrayLodash from "lodash/isArray";
import isDateLodash from "lodash/isDate";
import filterLodash from "lodash/filter";
import sortByLodash from "lodash/sortBy";
import isUndefinedLodash from "lodash/isUndefined";
import reverseLodash from "lodash/reverse";
import findIndexLodash from "lodash/findIndex";
import randomLodash from "lodash/random";
import toNumberLodash from "lodash/toNumber";
import toStringLodash from "lodash/toString";
import _isFunction from 'lodash/isFunction';

import Tips from "./tips";

import QQMapWX from "../libs/qqmap-wx-jssdk.min";

import {
  getConfigData,
  checkDevelopment,
  logLevel
} from "./customConfig";

const storageKeyCollection = {
  token: "token",
  currentUrl: "currentUrl",
  openId: "openId",
  city: "city",
  map: "map",
  inviter: "inviter",
  effectiveCode: "effectiveCode",
  sessionId: "sessionId",
  sessionIdRefreshing: "sessionIdRefreshing",
  nextCheckLoginUnixTime: "nextCheckLoginUnixTime",
  metaData: "metaData",
  remoteCheck: "remoteCheck",
  needSyncInfo: "needSyncInfo",
  runTime: "runTime",
  codeTime: "codeTime",
  needAdPopUp: "needAdPopUp"
};

export function defaultCoreState() {
  return {
    firstShow: false,
    barShow: true,
    loadApiPath: "",
    autoLoad: true,
    dataLoading: true,
    firstLoadSuccess: false,
    reloading: false,
    subsequentLoading: false,
    processing: false,
    loadSuccess: false,
    showCitySelect: false,
    pageName: "",
    errorFieldName: "",
    submitApiPath: "",
    globalLoadSuccess: false
  };
}

export function getValue(obj) {
  return Object.keys(obj)
    .map(key => obj[key])
    .join(",");
}

/**
 * 替换指定字符串
 *
 * @export
 * @param {*} text
 * @param {*} maxLength
 * @param {*} ellipsisSymbol
 * @returns
 */
export function cutTargetText(text, maxLength, ellipsisSymbol = "...") {
  let result = text || "";

  const textLength = result.length;
  if (textLength > maxLength) {
    result = text.substr(0, maxLength - 3) + ellipsisSymbol;
  }

  return result;
}

/**
 * 替换指定字符串
 *
 * @export
 * @param {*} text
 * @param {*} replaceText
 * @param {*} beforeKeepNumber
 * @param {*} afterKeepNumber
 * @returns
 */
export function replaceTargetText(
  text,
  replaceText,
  beforeKeepNumber,
  afterKeepNumber
) {
  let result = text;

  const textLength = (text || "").length;
  if (textLength > 0 && (beforeKeepNumber >= 0 || afterKeepNumber >= 0)) {
    if (
      beforeKeepNumber >= textLength ||
      afterKeepNumber >= textLength ||
      (beforeKeepNumber || 0) + (afterKeepNumber || 0) >= textLength
    ) {
      result = text;
    } else {
      const beforeKeep = text.substr(0, beforeKeepNumber);

      const afterKeep = text.substr(
        textLength - afterKeepNumber,
        afterKeepNumber
      );

      result = beforeKeep + replaceText + afterKeep;
    }
  }

  return result || "";
}

/**
 * corsTarget
 * 跨域域名配置
 * @export
 * @param {*} v
 * @returns
 */
export function corsTarget() {
  const c = getConfigData();

  return checkDevelopment() ? c.corsTargetDevelopment : c.corsTargetProduction;
}

/**
 * 判断是否是时间字符串
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isDatetime(v) {
  const date = `${typeof v === "undefined" ? null : v}`;
  const result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

  if (result == null) {
    return false;
  }

  const d = new Date(result[1], result[3] - 1, result[4]);
  return (
    d.getFullYear() === parseInt(result[1], 10) &&
    d.getMonth() + 1 === parseInt(result[3], 10) &&
    d.getDate() === parseInt(result[4], 10)
  );
}

export function toDatetime(v) {
  if ((v || null) == null) {
    return null;
  }

  const i = v.indexOf("T");

  if (i < 0) {
    const value = v.replace(/\-/g, "/");
    const result = new Date(value);
    return result;
  } else {
    const result = new Date(v);
    return result;
  }
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isNumber(v) {
  const str = `${typeof v === "undefined" ? null : v}`;

  if (str === "") {
    return false;
  }

  const regular = /^[0-9]*$/;
  const re = new RegExp(regular);
  return re.test(str);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toNumber(v) {
  const value = toNumberLodash(v);

  return Number.isNaN(value) ? 0 : value;
}

/**
 * 转换为文本
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toString(value) {
  return toStringLodash(value);
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isMoney(v) {
  const str = `${typeof v === "undefined" ? null : v}`;

  if (str === "") {
    return false;
  }

  const regular = /^([1-9][\d]{0,15}|0)(\.[\d]{1,2})?$/;
  const re = new RegExp(regular);
  return re.test(str);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toMoney(v) {
  if (isMoney(v)) {
    return parseFloat(v);
  }

  return 0;
}

/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */
export function formatMoney(
  numberSource,
  placesSource = 2,
  symbolSource = "¥",
  thousandSource = ",",
  decimalSource = "."
) {
  let number = numberSource || 0;
  //保留的小位数 可以写成 formatMoney(542986,3) 后面的是保留的小位数，否则默 认保留两位
  // eslint-disable-next-line no-restricted-globals
  let places = !isNaN((placesSource = Math.abs(placesSource)))
    ? placesSource
    : 2;
  //symbol表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")
  let symbol = symbolSource !== undefined ? symbolSource : "￥";
  //thousand表示每几位用,隔开,是货币标识
  let thousand = thousandSource || ",";
  //decimal表示小数点
  let decimal = decimalSource || ".";
  //negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
  //i表示处理过的纯数字
  let negative = number < 0 ? "-" : "";
  let i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + "";

  let j = i.length;

  j = j > 3 ? j % 3 : 0;

  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, symbolSource + "1" + thousand) +
    // 第一种方案
    // i.substr(j).replace(/(\d{3})(?=\d)/g, "$" + "1" + thousand) +
    // 第二种方案
    // i.substr(j).replace(/(?=(\B\d{3})+$)/g, thousand) +
    (places
      ? decimal +
      Math.abs(number - toNumber(i))
        .toFixed(places)
        .slice(2)
      : "")
  );
}

/**
 * 转换金额为人民币大写
 *
 * @export
 * @param {*} v
 * @returns
 */
export function formatMoneyToChinese(v) {
  let money = v;

  const cnNumber = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; // 汉字的数字
  const cnIntBasic = ["", "拾", "佰", "仟"]; // 基本单位
  const cnIntUnits = ["", "万", "亿", "兆"]; // 对应整数部分扩展单位
  const cnDecUnits = ["角", "分", "毫", "厘"]; // 对应小数部分单位
  // let cnInteger = "整"; // 整数金额时后面跟的字符
  const cnIntLast = "元"; // 整型完以后的单位
  const maxNum = 999999999999999.9999; // 最大处理的数字

  let IntegerNum; // 金额整数部分
  let DecimalNum; // 金额小数部分
  let ChineseString = ""; // 输出的中文金额字符串
  let parts; // 分离金额后用的数组，预定义
  if (money === "") {
    return "";
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    return "超出最大处理数字";
  }
  if (money === 0) {
    ChineseString = cnNumber[0] + cnIntLast;

    return ChineseString;
  }
  money = money.toString(); // 转换为字符串
  if (money.indexOf(".") === -1) {
    IntegerNum = money;
    DecimalNum = "";
  } else {
    parts = money.split(".");

    [IntegerNum, DecimalNum] = parts;
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
    let zeroCount = 0;
    const IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i += 1) {
      const n = IntegerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n === "0") {
        zeroCount += 1;
      } else {
        if (zeroCount > 0) {
          ChineseString += cnNumber[0];
        }
        zeroCount = 0; // 归零
        ChineseString += cnNumber[parseInt(n, 10)] + cnIntBasic[m];
      }
      if (m === 0 && zeroCount < 4) {
        ChineseString += cnIntUnits[q];
      }
    }
    ChineseString += cnIntLast;
    // 整型部分处理完毕
  }
  if (DecimalNum !== "") {
    // 小数部分
    const decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i += 1) {
      const n = DecimalNum.substr(i, 1);
      if (n !== "0") {
        ChineseString += cnNumber[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseString === "") {
    ChineseString += cnNumber[0] + cnIntLast;
  }

  return ChineseString;
}

/**
 *计算时间间隔
 * @param {startTime} 起始时间
 * @param {endTime} 结束时间
 */
export function calculateTimeInterval(startTime, endTime) {
  const timeBegin = startTime.getTime();
  const timeEnd = endTime.getTime();
  const total = (timeEnd - timeBegin) / 1000;

  const day = parseInt(total / (24 * 60 * 60)); //计算整数天数
  const afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
  const hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
  const afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
  const min = parseInt(afterHour / 60); //计算整数分
  const afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数

  return {
    day,
    hour: hour,
    minute: min,
    second: afterMin
  };
}

export function formatDatetime(date, fmt) {
  if ((date || null) == null) {
    return "";
  }

  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  // eslint-disable-next-line no-unused-vars
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}

export function seededRandom(seed, min = 0, max = 1) {
  const maxValue = max || 1;
  const minValue = min || 0;
  const seedValue = (seed * 9301 + 49297) % 233280;
  const rnd = seedValue / 233280.0;
  return minValue + rnd * (maxValue - minValue);
}

/**
 * 通过种子返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */
export function getRandomColor(seed) {
  // eslint-disable-next-line
  return `#${`00000${((seededRandom(seed) * 0x1000000) << 0).toString(
    16
  )}`.substr(-6)}`;
}

export function stringIsNullOrWhiteSpace(value) {
  return trim(replace(value || "", " ", "")) === "";
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordLog(record, level = logLevel.debug) {
  if (logShowInConsole()) {
    console.log({ level, record: record ? record : "" });
  }
}

function logShowInConsole() {
  return process.env.NODE_ENV === "development";
}

/**
 * 封装表单项配置
 *
 * @export
 * @param {*} v
 * @param {*} justice
 * @param {*} defaultValue
 * @param {*} originalOption
 * @param {*} convertValue
 */
export function refitFieldDecoratorOption(
  v,
  justice,
  defaultValue,
  originalOption,
  convertValue
) {
  const result = originalOption;
  const justiceV = typeof justice !== "undefined" && justice !== null;
  const defaultV =
    typeof defaultValue === "undefined" || defaultValue === null
      ? ""
      : defaultValue;

  if (justiceV) {
    if (isFunction(convertValue)) {
      result.initialValue = convertValue(v) || defaultV;
    } else {
      result.initialValue = v || defaultV;
    }
  }

  return result;
}

/**
 * 封装公共数据
 *
 * @export 数据集合
 * @param {*} listData 源数据集合
 * @param {*} empty 要添加的首个数据
 * @param {*} otherListData 要添加的其他数据集合
 * @returns 封装后的数据集合
 */
export function refitCommonData(listData, empty, otherListData) {
  let result = new Array();

  if (typeof listData !== "undefined") {
    if (listData !== null) {
      result = [...listData];
    }
  }

  if (typeof otherListData !== "undefined") {
    if (otherListData !== null) {
      result = [...result, ...otherListData];
    }
  }

  if (typeof empty !== "undefined") {
    if (empty !== null) {
      result = [empty, ...result];
    }
  }

  return result;
}

/**
 * 获取Token键名
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getTokenKeyName() {
  return storageKeyCollection.token;
}

/**
 * 获取Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getToken() {
  const key = getTokenKeyName();

  return getStringFromLocalStorage(key);
}

/**
 * 设置Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setToken(token) {
  const key = getTokenKeyName();

  return saveStringToLocalStorage(key, token || "");
}

/**
 * 清除Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeToken() {
  const key = getTokenKeyName();

  removeFromStorage(key);
}

/**
 * 获取CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCurrentUrl() {
  const key = storageKeyCollection.currentUrl;

  return getJsonFromLocalStorage(key);
}

/**
 * 设置CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setCurrentUrl(url) {
  const key = storageKeyCollection.currentUrl;

  const isTab = (url || "").startsWith("/pages/");

  const data = {
    url: url || "",
    isTab
  };

  return saveJsonToLocalStorage(key, data);
}

/**
 * 移除CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCurrentUrl() {
  const key = storageKeyCollection.currentUrl;

  removeFromStorage(key);
}

/**
 * 获取OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getOpenId() {
  const key = storageKeyCollection.openId;

  return getStringFromLocalStorage(key);
}

/**
 * 设置OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setOpenId(openId) {
  const key = storageKeyCollection.openId;

  return saveStringToLocalStorage(key, openId || "");
}

/**
 * 移除OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeOpenId() {
  const key = storageKeyCollection.openId;

  removeFromStorage(key);
}

/**
 * 获取EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getEffectiveCode() {
  const key = storageKeyCollection.effectiveCode;

  return getStringFromLocalStorage(key);
}

/**
 * 设置EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setEffectiveCode(effectiveCode) {
  const key = storageKeyCollection.effectiveCode;

  saveStringToLocalStorage(key, effectiveCode || "");
}

/**
 * 移除EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeEffectiveCode() {
  const key = storageKeyCollection.effectiveCode;

  removeFromStorage(key);
}

/**
 * 获取SessionId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSessionId() {
  const key = storageKeyCollection.sessionId;

  return getStringFromLocalStorage(key);
}

/**
 * 设置SessionId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSessionId(sessionId) {
  const key = storageKeyCollection.sessionId;

  saveStringToLocalStorage(key, sessionId || "");
}

/**
 * 移除SessionId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSessionId() {
  const key = storageKeyCollection.sessionId;

  removeFromStorage(key);
}

/**
 * 获取SessionIdRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSessionIdRefreshing() {
  const key = storageKeyCollection.sessionIdRefreshing;

  const v = getStringFromLocalStorage(key);

  return v === "true";
}

/**
 * 设置SessionIdRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSessionIdRefreshing(sessionIdRefreshing) {
  const key = storageKeyCollection.sessionIdRefreshing;

  saveStringToLocalStorage(
    key,
    sessionIdRefreshing || false ? "true" : "false"
  );
}

/**
 * 移除SessionIdRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSessionIdRefreshing() {
  const key = storageKeyCollection.sessionIdRefreshing;

  removeFromStorage(key);
}

/**
 * 获取nextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getNextCheckLoginUnixTime() {
  const key = storageKeyCollection.nextCheckLoginUnixTime;

  return toNumber(getStringFromLocalStorage(key));
}

/**
 * 设置NextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setNextCheckLoginUnixTime(nextCheckLoginUnixTime) {
  const key = storageKeyCollection.nextCheckLoginUnixTime;

  saveStringToLocalStorage(key, nextCheckLoginUnixTime || "");
}

/**
 * 移除NextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeNextCheckLoginUnixTime() {
  const key = storageKeyCollection.nextCheckLoginUnixTime;

  removeFromStorage(key);
}

/**
 * 获取City
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCity() {
  const key = storageKeyCollection.city;

  return getStringFromLocalStorage(key);
}

/**
 * 设置City
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setCity(city) {
  const key = storageKeyCollection.city;

  saveStringToLocalStorage(key, `${city || ""}`);
}

/**
 * 移除City
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCity() {
  const key = storageKeyCollection.city;

  removeFromStorage(key);
}


/**
 * 获取map
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getMap() {
  const key = storageKeyCollection.map;

  const data = getJsonFromLocalStorage(key);

  if ((data || null) == null) {
    return null;
  }

  return data;
}

/**
 * 设置map
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setMap(map) {
  const key = storageKeyCollection.map;

  // 地理位置信息有效期30分钟
  const nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  map.dataVersion = nowVersion;

  return saveJsonToLocalStorage(key, map || "");
}

/**
 * 移除map
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeMap() {
  const key = storageKeyCollection.map;

  Taro.removeStorageSync(key);
}

/**
 * 获取推荐人（分享人）
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getInviter() {
  const key = storageKeyCollection.inviter;

  return getStringFromLocalStorage(key) || "";
}

/**
 * 设置推荐人（分享人）
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setInviter(inviter) {
  const key = storageKeyCollection.inviter;

  saveStringToLocalStorage(key, inviter || "");
}


/**
 * 获取get第一次运行时间
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getRunTime() {
  const key = storageKeyCollection.runTime;

  return getStringFromLocalStorage(key);
}

/**
 * 设置get第一次运行时间
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setRunTime(runTime) {
  const key = storageKeyCollection.runTime;

  return saveStringToLocalStorage(key, runTime || 0);
}

/**
 * 移除get第一次运行时间
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeRunTime() {
  const key = storageKeyCollection.runTime;

  removeFromStorage(key);
}

/**
 * 获取是否需要弹出广告栏
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getNeedAdPopUp() {
  const key = storageKeyCollection.needAdPopUp;

  const popUp = getStringFromLocalStorage(key);

  return popUp;
}

/**
 * 设置是否需要弹出广告栏
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setNeedAdPopUp(popUp) {
  const key = storageKeyCollection.needAdPopUp;

  saveStringToLocalStorage(key, popUp || false);
}

/**
 * 获取是否需要同步用户信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getNeedSyncInfo() {
  const key = storageKeyCollection.needSyncInfo;

  const need = (getStringFromLocalStorage(key) || "") === "0";

  return need;
}

/**
 * 设置是否需要同步用户信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setNeedSyncInfo(need) {
  const key = storageKeyCollection.needSyncInfo;

  saveStringToLocalStorage(key, `${(need || false) == false ? 0 : 1}`);
}

/**
 * 获取验证码时间
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCodeTime() {
  const key = storageKeyCollection.codeTime;

  return getStringFromLocalStorage(key);
}

/**
 * 设置验证码时间
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setCodeTime(codeTime) {
  const key = storageKeyCollection.codeTime;

  return saveStringToLocalStorage(key, codeTime || 0);
}

/**
 * 移除验证码时间
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCodeTime() {
  const key = storageKeyCollection.codeTime;

  removeFromStorage(key);
}

/**
 * 错误消息模型
 */
export function errorCustomData() {
  return {
    code: -1,
    message: "",
    data: null,
    list: [],
    extra: null
  };
}

export function dataExceptionNotice(d) {
  const { code, message: messageText } = d;
  const c = errorCustomData();

  let key = "lastCustomMessage";

  const lastCustomMessage = getJsonFromLocalStorage(key) || {
    code: -1,
    message: "",
    time: new Date().getTime()
  };

  if (code !== c.code) {
    if (code === 2002) {
      return;
    }

    // 注册状态1002 不提示
    if (code === 1002) {
      return;
    }

    if (code === 2001) {
      // removeToken();
      // const currentUrl = getCurrentUrl();
      // Taro.reLaunch({
      //   url: `${currentUrl}`,
      //   fail: () => {
      //     Taro.reLaunch({ url: `/${pagePathCollection.home.path}` });
      //   }
      // });
    } else {
      if ((messageText || "") !== "") {
        const currentTime = new Date().getTime();
        if (code === lastCustomMessage.code) {
          if (currentTime - lastCustomMessage.time > 800) {
            Tips.info(messageText);

            saveJsonToLocalStorage(key, {
              code,
              message: messageText,
              time: currentTime
            });
          }
        } else {
          Tips.info(messageText);

          saveJsonToLocalStorage(key, {
            code,
            message: messageText,
            time: currentTime
          });
        }
      }
    }
  }
}

/**
 * 同步线程挂起若干时间(毫秒)
 * @param  n
 */
export function sleep(n, callback) {
  let start = new Date().getTime();

  while (true) {
    if (new Date().getTime() - start > n) {
      break;
    }
  }

  if (isFunction(callback)) {
    callback();
  }
}

/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldDescription(v, op, other) {
  const o = (other || "") === "" ? "" : `,${other}`;
  return `请${op || "输入"}${v}${o}!`;
}

/**
 * 预处理单项数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemoteSingleData(d) {
  const { code, message: messageText } = d || errorCustomData();
  let v = {};

  if (code === 200) {
    const { data, extra } = d;
    v = {
      code,
      message: messageText,
      data: data || {},
      extra: extra || {},
      dataSuccess: true
    };
  } else {
    const { data, extra } = d;
    v = {
      code,
      message: messageText || "网络异常",
      data: data || null,
      extra: extra || null,
      dataSuccess: false
    };

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * 预处理集合数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemoteListData(d, listItemHandler) {
  const { code, message: messageText } = d || errorCustomData();
  let v = {};

  if (code === 200) {
    const { list: listData, extra: extraData } = d;
    const list = (listData || []).map((item, index) => {
      let o = item;

      if (!o.hasOwnProperty("key")) {
        o.key = `list-${index}`;
      }

      if (isFunction(listItemHandler)) {
        o = listItemHandler(o);
      }
      return o;
    });

    v = {
      code,
      message: messageText,
      count: (list || []).length,
      list,
      extra: extraData,
      dataSuccess: true
    };
  } else {
    v = {
      code,
      message: messageText || "网络异常",
      count: 0,
      list: [],
      extra: null,
      dataSuccess: false
    };

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * 预处理分页数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemotePageListData(d, listItemHandler) {
  const { code, message: messageText, data } = d || errorCustomData();
  let v = {};

  if (code === 200) {
    const { list: listData, extra: extraData } = d;
    const { pageNo } = extraData;
    const list = (listData || []).map((item, index) => {
      let o = item;

      if (!o.hasOwnProperty("key")) {
        o.key = `${pageNo}-${index}`;
      }

      if (isFunction(listItemHandler)) {
        o = listItemHandler(o);
      }
      return o;
    });

    v = {
      code,
      message: messageText,
      count: (list || []).length,
      list,
      pagination: {
        total: extraData.total,
        pageSize: extraData.pagesize,
        current: parseInt(pageNo || 1, 10) || 1
      },
      extra: extraData,
      dataSuccess: true
    };
  } else {
    v = {
      code,
      message: messageText || "网络异常",
      count: 0,
      list: [],
      data: data || null,
      extra: null,
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1
      },
      dataSuccess: false
    };

    dataExceptionNotice(v);
  }
  return v;
}

/**
 * 预处理数据请求
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRequestParams(params, customHandle = {}) {
  let submitData = { ...{}, ...(params || {}) };

  if (isFunction(customHandle)) {
    submitData = customHandle(submitData);
  }

  return submitData;
}

/**
 * 是否使用模拟访问
 *
 * @export
 * @returns
 */
export function useVirtualAccess() {
  // return process.env.NODE_ENV === 'development';
  // return true;
  return false;
}

/**
 * 封装模拟的登录验证
 *
 * @returns
 */
export function apiVirtualAuthorize() {
  const tokenValue = getStringFromLocalStorage(getTokenKeyName());
  return (tokenValue || "") !== "";
}

/**
 * 封装模拟的错误返回
 *
 * @export
 * @param {*} statusCode
 * @param {*} messageText
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export function apiVirtualFailData(
  statusCode,
  messageText,
  needAuthorize = true
) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      Tips.info(messageText);

      return {
        code: statusCode,
        message: messageText
      };
    }

    return {
      code: 2001,
      msg: "未授权的访问"
    };
  }

  Tips.info(messageText);

  return {
    code: statusCode,
    message: messageText
  };
}

/**
 * 封装模拟的正确返回
 *
 * @export
 * @param {*} successData
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export function apiVirtualSuccessData(successData, needAuthorize = true) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      return {
        code: 200,
        msg: "",
        ...successData
      };
    }

    return {
      code: 2001,
      msg: "未授权的访问"
    };
  }

  return {
    code: 200,
    msg: "",
    ...successData
  };
}

/**
 * 封装正确的虚拟访问
 *
 * @export
 * @param {*} dataVirtual
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export async function apiVirtualSuccessAccess(
  dataVirtual,
  needAuthorize = true
) {
  let result = {};
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(apiVirtualSuccessData(dataVirtual, needAuthorize));
    }, 300);
  }).then(data => {
    result = data;
  });

  Tips.info("由虚拟访问返回");

  const { code } = result;

  if (code === 2001) {
    // Taro.redirectTo({ url: "/user/login" });
  }

  return result;
}

/**
 * 封装失败的虚拟访问
 *
 * @export
 * @param {*} dataVirtual
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export async function apiVirtualFailAccess(dataVirtual, needAuthorize = true) {
  let result = {};
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(apiVirtualFailData(dataVirtual, needAuthorize));
    }, 300);
  }).then(data => {
    result = data;
  });

  Tips.info("由虚拟访问返回");

  const { code, message: messageText } = result;

  if (code === 2001) {
    // Taro.redirectTo({ url: "/user/login" });
  } else if (code !== 200) {
    Tips.info(messageText);
  }

  return result;
}

/**
 * 封装模拟访问
 *
 * @export
 * @param {*} dataBuildExport function
 * dataBuildExport function示例
 * apiVirtualAccess(resolve => {
 *   setTimeout(() => {
 *     const { password, userName, type } = params;
 *     if (password === '888888' && userName === 'admin') {
 *       resolve(
 *         apiVirtualSuccessData(
 *           {
 *             id: 1,
 *             token: '059b1900-7d7b-40aa-872f-197d04b03385',
 *             userName: 'admin',
 *             type,
 *             role: [],
 *             currentAuthority: 'admin',
 *           },
 *           false
 *         )
 *       );
 *     } else if (password === '123456' && userName === 'user') {
 *       resolve(
 *         apiVirtualSuccessData(
 *           {
 *             id: 2,
 *             token: 'a9f98dab-00c1-4929-b79f-bacd1a7846d0',
 *             userName: 'user',
 *             type,
 *             role: [],
 *             currentAuthority: 'user',
 *           },
 *           false
 *         )
 *       );
 *     } else {
 *       resolve(apiVirtualFailData(1001, '用户名不存在或密码错误', false));
 *     }
 *   }, 300);
 * });
 * @returns
 */
export async function apiVirtualAccess(dataBuildFunction) {
  let result = {};
  await new Promise(resolve => {
    if (isFunction(dataBuildFunction)) {
      setTimeout(dataBuildFunction(resolve));
    }
  }).then(data => {
    result = data;
  });

  Tips.info("由虚拟访问返回");

  const { code, message: messageText } = result;

  if (code !== 200) {
    Tips.info(messageText);
  }

  return result;
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToLocalStorage(key, value) {
  Taro.setStorageSync(key, value);
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToLocalStorage(key, json) {
  Taro.setStorageSync(key, JSON.stringify(json || {}));
}

/**
 * 获取本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromLocalStorage(key) {
  const jsonString = Taro.getStorageSync(key);

  return jsonString;
}

/**
 * 获取本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromLocalStorage(key) {
  const jsonString = Taro.getStorageSync(key);

  if (jsonString !== "") {
    return JSON.parse(jsonString || "{}");
  }

  return null;
}

export function removeFromStorage(key) {
  Taro.removeStorageSync(key);
}

/**
 * 获取本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getQQMapWX() {
  const mapSdk = new QQMapWX({
    key: "FHSBZ-INGWK-ANPJF-AJ4DG-LPTRS-HAFGY"
  });

  return mapSdk;
}

/**
 * 获取本地数据
 * @export
 * @param {value} 对比源
 * @param {other} 对比对象
 * 执行深比较来确定两者的值是否相等。
 * 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 不支持函数和DOM节点比较。
 */
export function isEqual(value, other) {
  return isEqualLodash(value, other);
}

export function cloneWithoutMethod(value) {
  if (value == null) {
    return null;
  }

  return JSON.parse(JSON.stringify(value));
}

export function isFunction(value) {
  return isFunctionLodash(value);
}

export function isArray(value) {
  return isArrayLodash(value);
}

/**
 * 筛选需要的集合
 * @param {collection} 可筛选的对象，例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */
export function filter(collection, predicateFunction) {
  return filterLodash(collection, predicateFunction);
}

/**
 * 创建一个元素数组。 以 predicateFunction 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 predicateFunction 调用1个参数： (value)。
 * @param {collection}  (Array|Object), 用来迭代的集合。
 * @param {predicateFunction} 这个函数决定排序
 */
export function sortBy(collection, predicateFunction) {
  return sortByLodash(collection, predicateFunction);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function findIndex(array, predicateFunction, fromIndex = 0) {
  return findIndexLodash(array, predicateFunction, fromIndex);
}

/**
 * 产生一个包括 lower 与 upper 之间的数。 如果只提供一个参数返回一个0到提供数之间的数。 如果 floating 设为 true，或者 lower 或 upper 是浮点数，结果返回浮点数。 注意: JavaScript 遵循 IEEE-754 标准处理无法预料的浮点数结果。
 * @param {lower} (Array): 要搜索的数组。
 * @param {floating} 这个函数会在每一次迭代调用
 * @param {floating} (number): The index to search from.
 */
export function random(lower, upper, floating = false) {
  return randomLodash(lower, upper, floating);
}

export function reverse(array) {
  return reverseLodash(array);
}

export function isUndefined(value) {
  return isUndefinedLodash(value);
}

export function isDate(value) {
  return isDateLodash(value);
}

export function trim(source) {
  return trimLodash(source);
}

export function replace(source, pattern, replacement) {
  return replaceLodash(source, pattern, replacement);
}

/**
 * 获取metaData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getMetaDataCache() {
  const key = storageKeyCollection.metaData;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    removeMetaDataCache();
    return null;
  }

  if ((d.dataVersion || null) === null) {
    removeMetaDataCache();
    return null;
  }

  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  if (d.dataVersion !== now) {
    removeMetaDataCache();
    return null;
  }

  return d.metaData || null;
}

/**
 * 设置metaData缓存
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setMetaDataCache(o) {
  const key = storageKeyCollection.metaData;

  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  const d = {
    metaData: o || null,
    dataVersion: now
  };

  return saveJsonToLocalStorage(key, d);
}

/**
 * 设置metaData缓存
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function removeMetaDataCache() {
  const key = storageKeyCollection.metaData;

  return Taro.removeStorageSync(key);
}

/**
 * 获取remoteCheck缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getRemoteCheckCache() {
  const key = storageKeyCollection.remoteCheck;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.dataVersion || null) === null) {
    return null;
  }

  const now = parseInt(new Date().getTime() / 1000 / 10, 10);

  if (d.dataVersion !== now) {
    return null;
  }

  return d.data || null;
}

/**
 * 设置remoteCheck缓存,10秒钟过期
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setRemoteCheckCache(o) {
  const key = storageKeyCollection.remoteCheck;

  const now = parseInt(new Date().getTime() / 1000 / 10, 10);

  const d = {
    data: o || null,
    dataVersion: now
  };

  return saveJsonToLocalStorage(key, d);
}

export function handleCommonDataAssist(state, action, callback = null) {
  const { payload: d, alias } = action;

  let v = pretreatmentRemoteSingleData(d);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return {
      ...state,
      data: v
    };
  }

  const aliasData = {};
  aliasData[alias] = v;

  return {
    ...state,
    ...aliasData
  };
}

export function handleListDataAssist(
  state,
  action,
  pretreatment = null,
  callback = null
) {
  const { payload: d, alias } = action;

  let v = pretreatmentRemoteListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return {
      ...state,
      data: v
    };
  }

  const aliasData = {};
  aliasData[alias] = v;

  return {
    ...state,
    ...aliasData
  };
}

export function handlePageListDataAssist(
  state,
  action,
  pretreatment = null,
  callback = null
) {
  const { payload: d, alias } = action;

  let v = pretreatmentRemotePageListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return {
      ...state,
      data: v
    };
  }

  const aliasData = {};
  aliasData[alias] = v;

  return {
    ...state,
    ...aliasData
  };
}


export function getSystemInfo() {
  if (Taro.globalSystemInfo && !Taro.globalSystemInfo.ios) {
    return Taro.globalSystemInfo;
  } else {
    // h5环境下忽略navbar
    if (!_isFunction(Taro.getSystemInfoSync)) {
      return null;
    }
    let systemInfo = Taro.getSystemInfoSync() || {
      model: '',
      system: ''
    };
    let ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
    let rect;
    try {
      rect = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null;
      if (rect === null) {
        throw 'getMenuButtonBoundingClientRect error';
      }
      //取值为0的情况  有可能width不为0 top为0的情况
      if (!rect.width || !rect.top || !rect.left || !rect.height) {
        throw 'getMenuButtonBoundingClientRect error';
      }
    } catch (error) {
      let gap = ''; //胶囊按钮上下间距 使导航内容居中
      let width = 96; //胶囊的宽度
      if (systemInfo.platform === 'android') {
        gap = 8;
        width = 96;
      } else if (systemInfo.platform === 'devtools') {
        if (ios) {
          gap = 5.5; //开发工具中ios手机
        } else {
          gap = 7.5; //开发工具中android和其他手机
        }
      } else {
        gap = 4;
        width = 88;
      }
      if (!systemInfo.statusBarHeight) {
        //开启wifi的情况下修复statusBarHeight值获取不到
        systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      }
      rect = {
        //获取不到胶囊信息就自定义重置一个
        bottom: systemInfo.statusBarHeight + gap + 32,
        height: 32,
        left: systemInfo.windowWidth - width - 10,
        right: systemInfo.windowWidth - 10,
        top: systemInfo.statusBarHeight + gap,
        width: width
      };
      console.log('error', error);
      console.log('rect', rect);
    }

    let navBarHeight = '';
    if (!systemInfo.statusBarHeight) {
      //开启wifi和打电话下
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      navBarHeight = (function () {
        let gap = rect.top - systemInfo.statusBarHeight;
        return 2 * gap + rect.height;
      })();

      systemInfo.statusBarHeight = 0;
      systemInfo.navBarExtendHeight = 0; //下方扩展4像素高度 防止下方边距太小
    } else {
      navBarHeight = (function () {
        let gap = rect.top - systemInfo.statusBarHeight;
        return systemInfo.statusBarHeight + 2 * gap + rect.height;
      })();
      if (ios) {
        systemInfo.navBarExtendHeight = 4; //下方扩展4像素高度 防止下方边距太小
      } else {
        systemInfo.navBarExtendHeight = 0;
      }
    }

    systemInfo.navBarHeight = navBarHeight; //导航栏高度不包括statusBarHeight
    systemInfo.capsulePosition = rect; //右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
    systemInfo.ios = ios; //是否ios
    Taro.globalSystemInfo = systemInfo; //将信息保存到全局变量中,后边再用就不用重新异步获取了
    //console.log('systemInfo', systemInfo);
    return systemInfo;
  }
}
