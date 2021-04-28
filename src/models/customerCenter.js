import {
  handlePageListDataAssist,
  handleCommonDataAssist,
  handleListDataAssist,
} from "../utils/tools";

import {
  listUserScoreProductData,
  listPeopleScoreLogData,
  getUserScoreProductData,
} from "../services/customerCenter";

export default {
  namespace: "customerCenter",
  state: {},

  effects: {
    *listUserScoreProduct({ payload }, { call, put }) {
      const response = yield call(listUserScoreProductData, payload);
      yield put({
        type: "handlePageListData",
        payload: response,
      });
    },

    *listPeopleScoreLog({ payload }, { call, put }) {
      const response = yield call(listPeopleScoreLogData, payload);
      yield put({
        type: "handlePageListData",
        payload: response,
      });
    },

    *getUserScore({ payload }, { call, put }) {
      const response = yield call(getUserScoreProductData, payload);
      yield put({
        type: "handleCommonData",
        payload: response,
      });
    },
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
    },
  },
};
