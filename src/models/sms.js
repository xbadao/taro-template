import { handleCommonDataAssist } from "../utils/tools";

import { refreshCaptchaKeyData, sendRegisterCaptchaData } from "../services/sms";

export default {
    namespace: "sms",
    state: {},

    effects: {
        *refreshCaptchaKey({ payload }, { call, put }) {
            const response = yield call(refreshCaptchaKeyData, payload);
            yield put({
                type: "handleCommonData",
                payload: response
            });
        },
        *sendRegisterCaptcha({ payload }, { call, put }) {
            const response = yield call(sendRegisterCaptchaData, payload);
            yield put({
                type: "handleCommonData",
                payload: response
            });
        },
    },

    reducers: {
        handleCommonData(state, action) {
            return handleCommonDataAssist(state, action);
        }
    }
};
