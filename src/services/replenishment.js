import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 *  订单分页列表
 * @param {state} 订单状态码 {0：未处理，1：已处理}
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function pageListData(data) {
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
    `/${apiVersion.version}/merchantCenter/replenishment/pageList`,
    data
  );
}

/**
 *  申请售后
 * @param {orderDetailId} 订单项标识
 * @param {images} 图片集合，以,分隔
 * @param {count} 数量，数字类型
 * @param {type} 售后类型，必须是数据源中的值，数字类型
 * @param {reasonType} 原因类型，必须是数据源中的值，数字类型
 * @param {reason} 售后原因 文本类型
 * @param {note} 备注 文本类型
 */
export async function applyData(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        data: {},
      },
      false
    );

    return result;
  }

  return request.PostJson(
    `/${apiVersion.version}/merchantCenter/replenishment/apply`,
    data
  );
}

/**
 *  为顾客申请售后
 * @param {orderDetailId} 订单项标识
 * @param {images} 图片集合，以,分隔
 * @param {count} 数量，数字类型
 * @param {type} 售后类型，必须是数据源中的值，数字类型
 * @param {reasonType} 原因类型，必须是数据源中的值，数字类型
 * @param {reason} 售后原因 文本类型
 * @param {note} 备注 文本类型
 */
export async function applyForCustomerData(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        data: {},
      },
      false
    );

    return result;
  }

  return request.PostJson(
    `/${apiVersion.version}/merchantCenter/replenishment/applyForCustomer`,
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
