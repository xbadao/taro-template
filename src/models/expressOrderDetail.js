import {
  handlePageListDataAssist,
  handleCommonDataAssist,
  handleListDataAssist
} from "../utils/tools";

import { pageListData, getData } from "../services/expressOrderDetail";

export default {
  namespace: "expressOrderDetail",
  state: {},

  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);
      yield put({
        type: "handlePageListData",
        payload: response
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
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
