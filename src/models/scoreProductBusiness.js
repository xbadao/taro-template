import {
  handlePageListDataAssist,
  handleCommonDataAssist,
} from "../utils/tools";

import {
  listPageIntegralData,
  getIntegralData,
  buyData,
} from "../services/scoreProductBusiness";

export default {
  namespace: "scoreProductBusiness",
  state: {},

  effects: {
    *listPageIntegral({ payload }, { call, put }) {
      const response = yield call(listPageIntegralData, payload);
      yield put({
        type: "handlePageListData",
        payload: response,
      });
    },

    *getIntegral({ payload }, { call, put }) {
      const response = yield call(getIntegralData, payload);
      yield put({
        type: "handleCommonData",
        payload: response,
      });
    },

    *buy({ payload }, { call, put }) {
      const response = yield call(buyData, payload);
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
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
  },
};
