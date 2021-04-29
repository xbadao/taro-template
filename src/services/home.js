import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

export async function getMainData(data) {
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
    `/${apiVersion.version}/productBusiness/home/getMain`,
    data
  );
}

export async function getBriefData(data) {
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
    `/${apiVersion.version}/productBusiness/home/getBrief`,
    data
  );
}

export async function listRankBoxData(data) {
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
    `/${apiVersion.version}/productBusiness/home/listRankBox`,
    data
  );
}

export async function listRandomData(data) {
  if (useVirtualAccess()) {
    console.log("AAAAAAAAAAAAA");
    const result = await apiVirtualSuccessAccess(
      {
        date: []
      },
      false
    );

    return result;
  }

  return request.PostJson(
    `/${apiVersion.version}/productBusiness/product/pageList`,
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
