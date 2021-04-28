import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

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
    `/${apiVersion.version}/customerCenter/customer/GetCurrentInfo`,
    data
  );
}

export async function getCurrentBalanceData(data) {
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
    `/${apiVersion.version}/customerCenter/customer/getCurrentBalance`,
    data
  );
}

export async function listPageAccountLogData(data) {
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
    `/${apiVersion.version}/customerCenter/customer/listPageAccountLog`,
    data
  );
}

/**
 *  获取自提码
 * @param { token }
 * @param { openId }
 */
export async function GetPickUpQRCodeData(data) {
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
    `/${apiVersion.version}/customerCenter/customer/GetPickUpQRCode`,
    data
  );
}

/**
 * 同步用户信息数据
 * @param {*} data
 */
export async function checkGetCustomerData(data) {
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
    `/${apiVersion.version}/customerCenter/customer/checkGetCustomer`,
    data
  );
}

/**
 * 同步用户信息数据
 * @param {*} data
 */
export async function syncInfoData(data) {
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
    `/${apiVersion.version}/customerCenter/customer/syncInfo`,
    data
  );
}

/**
 *  同步补全联系人信息接口
 * @param { userName userPhone } 姓名和电话
 */
export async function syncContactsInfoData(data) {
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
    `/${apiVersion.version}/customerCenter/customer/syncContactsInfo`,
    data
  );
}

// 初始化密码
export async function initializePayPasswordData(data) {
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
    `/${apiVersion.version}/customerCenter/customer/initializePayPassword`,
    data
  );
}

// 检测是否初始化密码
export async function checkNeedInitializePayPasswordData(data) {
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
    `/${apiVersion.version}/customerCenter/customer/CheckNeedInitializePayPassword`,
    data
  );
}

// 验证密码
export async function verifyPayPasswordData(data) {
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
    `/${apiVersion.version}/customerCenter/customer/verifyPayPassword`,
    data
  );
}

// 修改密码
export async function changePayPasswordData(data) {
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
    `/${apiVersion.version}/customerCenter/customer/changePayPassword`,
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
