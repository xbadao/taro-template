import {
  handlePageListDataAssist,
  handleCommonDataAssist,
  handleListDataAssist
} from "../utils/tools";

import {
  buyData,
  buyFromCartData,
  payByWeChatData,
  payByWalletData
} from "../services/expressOrder";

export default {
  namespace: "expressOrder",
  state: {},

  effects: {
    *buy({ payload }, { call, put }) {
      const response = yield call(buyData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *buyFromCart({ payload }, { call, put }) {
      const response = yield call(buyFromCartData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *payByWeChat({ payload }, { call, put }) {
      const response = yield call(payByWeChatData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *payByWallet({ payload }, { call, put }) {
      const response = yield call(payByWalletData, payload);
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
