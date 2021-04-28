import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 *  订单分页列表
 * @param {keywords} 搜索词
 * @param {state} 订单状态码
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function listUserScoreProductData(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        list: [],
      },
      false
    );

    return result;
  }

  return request.PostJson(
    `/${apiVersion.version}/customerCenter/userScoreOrder/pageList`,
    data
  );
}

// 硒米变动记录
export async function listPeopleScoreLogData(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        list: [],
      },
      false
    );

    return result;
  }

  return request.PostJson(
    `/${apiVersion.version}/customerCenter/peopleScoreLog/pageList`,
    data
  );
}

/**
 *  获取订单详情
 *
 */
export async function getUserScoreProductData(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        date: {},
      },
      false
    );

    return result;
  }

  return request.PostJson(
    `/${apiVersion.version}/customerCenter/userScoreOrder/get`,
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
