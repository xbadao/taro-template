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
export async function listPageData(data) {
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
    `/${apiVersion.version}/customerCenter/expressOrder/pageList`,
    data
  );
}

/**
 *  订单分页列表
 * @param {state} 订单状态码 0：全部，1：派送中，2：已完成
 * @param {customerId} 指定的顾客 选填
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function listPageCustomerData(data) {
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
    `/${apiVersion.version}/merchantCenter/expressOrder/listPageCustomer`,
    data
  );
}

/**
 *  我的客户订单项分页列表
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function listPageCustomerOrderDetailData(data) {
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
    `/${apiVersion.version}/merchantCenter/expressOrder/listPageCustomerOrderDetail`,
    data
  );
}

/**
 *  我的团长订单分页列表
 * @param {state} 订单状态码 0：全部，1：派送中，2：已完成
 * @param {merchantId} 指定的团长 选填
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function listPageChildMerchantData(data) {
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
    `/${apiVersion.version}/merchantCenter/expressOrder/listPageMerchant`,
    data
  );
}

/**
 *  获取订单详情
 * @param {customerCenter/expressOrderId} 订单标识
 */
export async function getData(data) {
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
    `/${apiVersion.version}/customerCenter/expressOrder/get`,
    data
  );
}

/**
 *  获取订单详情
 * @param {customerCenter/expressOrderId} 订单标识
 */
export async function getCustomerUserOrderData(data) {
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
    `/${apiVersion.version}/merchantCenter/expressOrder/getCustomerUserOrder`,
    data
  );
}

/**
 *  获取顾客今日货单
 * @param {customerId} 订单标识
 */
export async function listCustomerPickUpGoodsData(data) {
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
    `/${apiVersion.version}/merchantCenter/expressOrder/listCustomerPickUpGoods`,
    data
  );
}

/**
 *  获取下级团长订单详情
 * @param {merchantCenter/expressOrderId} 订单标识
 */
export async function getMerchantUserOrderData(data) {
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
    `/${apiVersion.version}/merchantCenter/expressOrder/getMerchantUserOrder`,
    data
  );
}

/**
 *  直接购买
 * @param {productId} 商品标识
 * @param {count} 购买数量
 * @param {shippingAddressId} 收货地址标识
 */
export async function buyData(data) {
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
    `/${apiVersion.version}/productBusiness/expressOrder/buy`,
    data
  );
}

export async function buyFromCartData(data) {
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
    `/${apiVersion.version}/productBusiness/expressOrder/buyFromCart`,
    data
  );
}

/**
 * 通过微信付款
 * @param {customerCenter/expressOrderId} 订单标识
 */
export async function payByWeChatData(data) {
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
    `/${apiVersion.version}/productBusiness/expressOrder/payByWeChat`,
    data
  );
}

/**
 *  我的客户订单单项取货操作
 * @param {expressOrderId} 订单标识
 * @param {orderDetailId} 订单项标识
 */
export async function pickUpGoodsData(data) {
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
    `/${apiVersion.version}/merchantCenter/expressOrder/pickUpGoods`,
    data
  );
}

/**
 *  我的客户订单整体取货操作（暂不启用）
 * @param {expressOrderId} 订单标识
 */
export async function pickUpGoodsBatchData(data) {
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
    `/${apiVersion.version}/merchantCenter/expressOrder/pickUpGoods`,
    data
  );
}

/**
 *  取消订单
 * @param {expressOrderId} 用户标识
 */
export async function closeNoPayData(data) {
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
    `/${apiVersion.version}/customerCenter/expressOrder/closeNoPay`,
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
