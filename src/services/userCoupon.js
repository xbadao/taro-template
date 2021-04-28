import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 * 用户券列表
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 * @param {status}  (0 未使用 1已使用)
 */
export async function listUserCouponData(data) {
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
    `/${apiVersion.version}/customerCenter/userCoupon/pageListUserCoupon`,
    data
  );
}

export async function listAvailableData(data) {
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
    `/${apiVersion.version}/customerCenter/userCoupon/listAvailable`,
    data
  );
}

/**
 *   点击领券
 * @param {couponId} 优惠券标识
 */
export async function takeData(data) {
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
    `/${apiVersion.version}/customerCenter/userCoupon/take`,
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
