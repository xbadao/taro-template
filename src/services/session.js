import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 * 刷新sessionId
 *
 * @export
 * @returns
 */
export async function refreshSessionIdData(data) {
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
    `/${apiVersion.version}/weApp/entrance/refreshSessionId`,
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
