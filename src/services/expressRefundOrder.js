import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 *  单项子订单申请退款
 * @param {orderDetailId} 订单项标识
 * @param {reason} 售后原因 文本类型
 * @param {note} 备注 文本类型
 */
export async function applyData(data) {
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
    `/${apiVersion.version}/customerCenter/expressRefundOrder/apply`,
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
