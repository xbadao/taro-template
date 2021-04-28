import {
  handlePageListDataAssist,
  handleCommonDataAssist,
} from "../utils/tools";

import {
  pageListData,
  applyData,
  applyForCustomerData,
} from "../services/replenishment";

export default {
  namespace: "replenishment",
  state: {},

  effects: {
    *listPage({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);
      yield put({
        type: "handlePageListData",
        payload: response,
      });
    },
    *apply({ payload }, { call, put }) {
      const response = yield call(applyData, payload);
      yield put({
        type: "handleCommonData",
        payload: response,
      });
    },
    *applyForCustomer({ payload }, { call, put }) {
      const response = yield call(applyForCustomerData, payload);
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
