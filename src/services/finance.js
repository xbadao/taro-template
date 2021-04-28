import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 *  账户变动分页列表
 * @param {pageNo} 页码
 * @param {pageSize} 页面条目数
 */
export async function listPagePeopleAccountLogData(data) {
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
    `/${apiVersion.version}/merchantCenter/finance/listPagePeopleAccountLog`,
    data
  );
}

/**
 * 申请提现
 * @param {money} 金额 大于0的数
 */
export async function withdrawalApplyData(data) {
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
    `/${apiVersion.version}/merchantCenter/finance/withdrawalApply`,
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
