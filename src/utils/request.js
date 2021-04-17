import Taro from "@tarojs/taro";
import {
  useVirtualAccess,
  corsTarget,
  getToken,
  getOpenId,
  getCity,
  getInviter,
  getSessionId,
  getLocationMode,
} from "./tools";
import Tips from "./tips";
import { appId } from "../customConfig/config";

const requestMethod = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
  trace: "TRACE",
  connect: "CONNECT"
};

export class Request {
  /**
   *
   * @static request请求 基于 Taro.request
   * @param {Options} opts
   */
  static request(opts) {

    let options = Object.assign(opts, {
      header: {
        appId: appId,
        token: getToken(),
        openId: getOpenId(),
        city: getCity(),
        inviter: getInviter(),
        sessionId: getSessionId(),
        locationMode: getLocationMode(),
      },
      fail: res => {
        Tips.loaded();

        const { errMsg } = res;

        Tips.info(errMsg);
      }
    });
    // console.log(options);
    return Taro.request(options).then(response => {

      // response.data.statusCode = response.statusCode

      return response.data;
    });
  }

  /**
   *
   * @static 开始Post请求
   * @returns
   * @memberof PostJson
   */
  static PostJson(urlParam, data, header = {}) {
    const corsUrl = corsTarget();
    const url = useVirtualAccess() ? urlParam : `${corsUrl}${urlParam}`;

    return Request.request({
      url,
      data: data || {},
      header: header || {},
      method: requestMethod.post
    });
  }
}

export default Request;
