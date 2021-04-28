import {
  handlePageListDataAssist,
  handleCommonDataAssist
} from "../utils/tools";

import {
  listSelectData,
  listPageCustomerData,
  listPageChildMerchantData,
  getCurrentInfoData,
  getOverviewInfoData,
  geBalanceInfoData,
  updateBankData,
  updateCurrentInfoData,
  initApplyData,
  applyData
} from "../services/merchant";

export default {
  namespace: "merchant",
  state: {},

  effects: {
    *listSelect({ payload }, { call, put }) {
      const response = yield call(listSelectData, payload);
      yield put({
        type: "handlePageListData",
        payload: response
      });
    },
    *listPageCustomer({ payload }, { call, put }) {
      const response = yield call(listPageCustomerData, payload);
      yield put({
        type: "handlePageListData",
        payload: response
      });
    },
    *listPageChildMerchant({ payload }, { call, put }) {
      const response = yield call(listPageChildMerchantData, payload);
      yield put({
        type: "handlePageListData",
        payload: response
      });
    },
    *getCurrentInfo({ payload }, { call, put }) {
      const response = yield call(getCurrentInfoData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *getOverviewInfo({ payload }, { call, put }) {
      const response = yield call(getOverviewInfoData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *geBalanceInfo({ payload }, { call, put }) {
      const response = yield call(geBalanceInfoData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *updateBankInfo({ payload }, { call, put }) {
      const response = yield call(updateBankData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *updateCurrentInfo({ payload }, { call, put }) {
      const response = yield call(updateCurrentInfoData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *initApply({ payload }, { call, put }) {
      const response = yield call(initApplyData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *apply({ payload }, { call, put }) {
      const response = yield call(applyData, payload);
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
