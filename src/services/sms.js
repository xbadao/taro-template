import request from "../utils/request";
import { apiVirtualSuccessAccess, useVirtualAccess } from "../utils/tools";
import { apiVersion } from "../utils/customConfig";

/**
 *验证码
 *
 * @export
 * @returns
 */
export async function refreshCaptchaKeyData(data) {
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
        `/${apiVersion.version}/sms/refreshCaptchaKey`,
        data
    );
}

/**
 *获取短信
 *
 * @export
 * @returns
 */
export async function sendRegisterCaptchaData(data) {
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
        `/${apiVersion.version}/sms/sendRegisterCaptcha`,
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
