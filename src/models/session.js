import { handleCommonDataAssist } from "../utils/tools";

import { refreshSessionIdData } from "../services/session";

export default {
  namespace: "session",

  state: {},

  effects: {
    *refreshSessionId({ payload }, { call, put }) {
      const response = yield call(refreshSessionIdData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    }
  },

  reducers: {
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    }
  }
};
