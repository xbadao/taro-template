import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 *  产品分页列表（按照类别）
 * @param {rankId} 类别标识
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function pageListData(data) {
  if (useVirtualAccess()) {
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
 *  新品分页列表
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function pageListNewArrivalData(data) {
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
    `/${apiVersion.version}/productBusiness/product/pageListNewArrival`,
    data
  );
}

/**
 * 预售分页列表
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function pageListPlanSaleData(data) {
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
    `/${apiVersion.version}/productBusiness/product/pageListPlanSale`,
    data
  );
}

/**
 *  产品搜索分页列表
 * @param {keywords} 搜索关键字
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function pageListBySearchData(data) {
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
    `/${apiVersion.version}/productBusiness/product/pageListBySearch`,
    data
  );
}

/**
 * 商品详情
 * @param {productBusiness/productId} 产品标识
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
    `/${apiVersion.version}/productBusiness/product/get`,
    data
  );
}

/**
 * 商品详情
 * @param {productBusiness/productId} 产品标识
 */
export async function getSkuData(data) {
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
    `/${apiVersion.version}/productBusiness/product/getSku`,
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
