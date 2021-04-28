import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 *  搜索历史列表
 * @param {number} 请求的数量
 */
export async function listProductSearchHistoryData(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        list: []
      },
      false
    );

    return result;
  }

  return request.PostJson(
    `/${apiVersion.version}/productBusiness/searchHistory/listProductSearchHistory`,
    data
  );
}

export async function clearProductSearchHistoryData(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        data: {}
      },
      false
    );

    return result;
  }

  return request.PostJson(
    `/${apiVersion.version}/productBusiness/searchHistory/clearProductSearchHistory`,
    data
  );
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
