import {
  handlePageListDataAssist,
  handleCommonDataAssist
} from "../utils/tools";

import {
  listPagePeopleAccountLogData,
  withdrawalApplyData
} from "../services/finance";

export default {
  namespace: "finance",
  state: {},

  effects: {
    *listPagePeopleAccountLog({ payload }, { call, put }) {
      const response = yield call(listPagePeopleAccountLogData, payload);
      yield put({
        type: "handlePageListData",
        payload: response
      });
    },
    *withdrawalApply({ payload }, { call, put }) {
      const response = yield call(withdrawalApplyData, payload);
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
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    }
  }
};
