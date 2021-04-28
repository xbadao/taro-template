import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 *  资讯商品列表
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function pageListData(data) {
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
    `/${apiVersion.version}/news/article/pageList `,
    data
  );
}

/**
 * 获取轮播数据
 * @param {*} data
 * @returns
 */
export async function getGalleryData(data) {
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
    `/${apiVersion.version}/news/article/getGallery`,
    data
  );
}

/**
 * 资讯详情
 * @param {articleId} 产品标识
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

  return request.PostJson(`/${apiVersion.version}/news/article/get`, data);
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
