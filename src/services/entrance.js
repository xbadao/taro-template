import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 * 用户登录
 *
 * @export
 * @returns
 */
export async function signInData(data) {
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
    `/${apiVersion.version}/weApp/entrance/signInWithSession`,
    data
  );
}

/**
 * 用户登录
 *
 * @export
 * @returns
 */
export async function checkCityData(data) {
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
    `/${apiVersion.version}/weApp/entrance/checkCity`,
    data
  );
}


/**
 * 用户登录
 *
 * @export
 * @returns
 */
export async function signData(data) {
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
    `/${apiVersion.version}/weApp/entrance/signIn`,
    data
  );
}

export async function registerData(data) {
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
    `/${apiVersion.version}/weApp/entrance/register`,
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
