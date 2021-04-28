import { handleCommonDataAssist } from "../utils/tools";

import {
  applyData,
} from "../services/expressRefundOrder";

export default {
  namespace: "expressRefundOrder",
  state: {},

  effects: {
    *apply({ payload }, { call, put }) {
      const response = yield call(applyData, payload);
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
