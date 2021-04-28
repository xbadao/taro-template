import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

export async function singleListData(data) {
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
    `/${apiVersion.version}/merchantCenter/merchantTransport/singleList`,
    data
  );
}

export async function competeData(data) {
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
    `/${apiVersion.version}/merchantCenter/merchantTransport/compete`,
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
