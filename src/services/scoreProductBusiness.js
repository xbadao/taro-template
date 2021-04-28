import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 *  硒米商品列表
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function listPageIntegralData(data) {
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
    `/${apiVersion.version}/scoreProductBusiness/scoreProduct/pagelist`,
    data
  );
}

/**
 * 商品详情
 * @param {scoreProductId} 产品标识
 */
export async function getIntegralData(data) {
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
    `/${apiVersion.version}/ScoreProductBusiness/ScoreProduct/get`,
    data
  );
}

/**
 *  直接购买
 * @param {scoreProductId} 商品标识
 * @param {count} 购买数量
 * @param {shippingAddressId} 收货地址标识
 */
export async function buyData(data) {
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
    `/${apiVersion.version}/scoreProductBusiness/userScoreOrder/buy `,
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
