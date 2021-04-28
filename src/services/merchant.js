import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

export async function listSelectData(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        list: []
      },
      false
    );

    return result;
  }

  return request.PostJson(`/${apiVersion.version}/merchant/listSelect`, data);
}

/**
 *  我的客户分页列表
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
    `/${apiVersion.version}/merchantCenter/customer/pageList`,
    data
  );
}

/**
 *  我的团长分页列表
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
    `/${apiVersion.version}/merchantCenter/merchant/listPageChildMerchant`,
    data
  );
}

export async function getFromMerchantData(data) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess(
      {
        date: {}
      },
      false
    );

    return result;
  }

  return request.PostJson(`/${apiVersion.version}/share/getFromMerchant`, data);
}

export async function getCurrentInfoData(data) {
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
    `/${apiVersion.version}/merchantCenter/merchant/getCurrentInfo`,
    data
  );
}

export async function getOverviewInfoData(data) {
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
    `/${apiVersion.version}/merchantCenter/merchant/getOverviewInfo`,
    data
  );
}

export async function geBalanceInfoData(data) {
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
    `/${apiVersion.version}/merchantCenter/merchant/geBalanceInfo`,
    data
  );
}

export async function updateBankData(data) {
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
    `/${apiVersion.version}/merchantCenter/merchant/updateBankInfo`,
    data
  );
}

/**
 * 更新团长信息
 * @param {name} 姓名
 * @param {phone} 手机号
 * @param {phone2} 紧急联系方式
 * @param {address} 地址
 */
export async function updateCurrentInfoData(data) {
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
    `/${apiVersion.version}/merchantCenter/merchant/updateCurrentInfo`,
    data
  );
}

/**
 * 申请团长初始化
 */
export async function initApplyData(data) {
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
    `/${apiVersion.version}/merchantCenter/merchant/initApply`,
    data
  );
}

/**
 * 申请成为团长
 * @param {name} 姓名
 * @param {merchantCenter/merchantName} 社区名称
 * @param {phone} 手机号
 * @param {city} 申请城市标识数字
 * @param {communityName} 社区名称
 * @param {communityAddress} 社区地址
 */
export async function applyData(data) {
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
    `/${apiVersion.version}/merchantCenter/merchant/apply`,
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
