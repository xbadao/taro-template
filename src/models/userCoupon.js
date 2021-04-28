import {
  handleListDataAssist,
  handleCommonDataAssist,
  handlePageListDataAssist
} from "../utils/tools";

import {
  listUserCouponData,
  listAvailableData,
  takeData
} from "../services/userCoupon";

export default {
  namespace: "userCoupon",

  state: {},

  effects: {
    *listUserCoupon({ payload }, { call, put }) {
      const response = yield call(listUserCouponData, payload);
      yield put({
        type: "handlePageListData",
        payload: response,
        alias: "listUserCouponData"
      });
    },
    *listAvailable({ payload }, { call, put }) {
      const response = yield call(listAvailableData, payload);
      yield put({
        type: "handleListData",
        payload: response,
        alias: "listAvailableData"
      });
    },
    *take({ payload }, { call, put }) {
      const response = yield call(takeData, payload);
      yield put({
        type: "handleCommonData",
        payload: response,
        alias: "takeData"
      });
    }
  },

  reducers: {
    handlePageListData(state, action) {
      return handlePageListDataAssist(state, action);
    },
    handleListData(state, action) {
      return handleListDataAssist(state, action);
    },
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    }
  }
};
