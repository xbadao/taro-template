import { handleListDataAssist, handleCommonDataAssist } from "../utils/tools";

import {
  listProductSearchHistoryData,
  clearProductSearchHistoryData
} from "../services/searchHistory";

export default {
  namespace: "searchHistory",
  state: {},

  effects: {
    *listProductSearchHistory({ payload }, { call, put }) {
      const response = yield call(listProductSearchHistoryData, payload);
      yield put({
        type: "handleListData",
        payload: response
      });
    },
    *clearProductSearchHistory({ payload }, { call, put }) {
      const response = yield call(clearProductSearchHistoryData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    }
  },

  reducers: {
    handleListData(state, action) {
      return handleListDataAssist(state, action);
    },
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    }
  }
};
