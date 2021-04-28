import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 * 获取元数据
 *
 * @export
 * @returns
 */
export async function getData(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        data: {}
      },
      false
    );

    return result;
  }

  return request.PostJson(`/${apiVersion.version}/metaData/get`, data);
}


export async function getExchangeShareData(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        date: {}
      },
      false
    );

    return result;
  }

  return request.PostJson(
    `/${apiVersion.version}/share/exchangeShareData`,
    data
  );
}

export async function getCreateShareUrlParams(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        date: {}
      },
      false
    );

    return result;
  }

  return request.PostJson(
    `/${apiVersion.version}/share/createShareUrlParams`,
    data
  );
}

/**
 * 测试函数
 *
 * @export
 * @returns
 */
export async function testData() {
  return {};
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
