import { handleCommonDataAssist } from "../utils/tools";

import { signInData, checkCityData, signData, registerData } from "../services/entrance";

export default {
  namespace: "entrance",

  state: {},

  effects: {
    *signIn({ payload }, { call, put }) {
      const response = yield call(signInData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *checkCity({ payload }, { call, put }) {
      const response = yield call(checkCityData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *sign({ payload }, { call, put }) {
      const response = yield call(signData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *register({ payload }, { call, put }) {
      const response = yield call(registerData, payload);
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
