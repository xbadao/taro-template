import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

export async function listData(data) {
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
    `/${apiVersion.version}/customerCenter/shippingAddress/List`,
    data
  );
}

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
    `/${apiVersion.version}/customerCenter/shippingAddress/get`,
    data
  );
}

export async function getDefaultShippingAddressData(data) {
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
    `/${apiVersion.version}/customerCenter/shippingAddress/getDefaultShippingAddress`,
    data
  );
}

export async function getDefaultWithRecommendData(data) {
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
    `/${apiVersion.version}/customerCenter/shippingAddress/getDefaultWithRecommend`,
    data
  );
}

export async function addData(data) {
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
    `/${apiVersion.version}/customerCenter/shippingAddress/add`,
    data
  );
}

export async function quickAddData(data) {
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
    `/${apiVersion.version}/customerCenter/shippingAddress/quickAdd`,
    data
  );
}

export async function updateInfoData(data) {
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
    `/${apiVersion.version}/customerCenter/shippingAddress/updateInfo`,
    data
  );
}

export async function setDefaultData(data) {
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
    `/${apiVersion.version}/customerCenter/shippingAddress/setDefault`,
    data
  );
}

export async function removeData(data) {
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
    `/${apiVersion.version}/customerCenter/shippingAddress/remove`,
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
