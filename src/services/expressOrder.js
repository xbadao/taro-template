import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

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

export async function payByWalletData(data) {
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
    `/${apiVersion.version}/productBusiness/expressOrder/payByWallet`,
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
