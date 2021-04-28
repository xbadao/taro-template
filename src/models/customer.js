import {
  handlePageListDataAssist,
  handleListDataAssist,
  handleCommonDataAssist
} from "../utils/tools";

import {
  getCurrentInfoData,
  getCurrentBalanceData,
  listPageAccountLogData,
  checkGetCustomerData,
  syncInfoData,
  syncContactsInfoData,
  getPickUpQRCodeData,
  initializePayPasswordData,
  checkNeedInitializePayPasswordData,
  verifyPayPasswordData,
  changePayPasswordData
} from "../services/customer";

export default {
  namespace: "customer",
  state: {},

  effects: {
    *getCurrentInfo({ payload }, { call, put }) {
      const response = yield call(getCurrentInfoData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *getCurrentBalance({ payload }, { call, put }) {
      const response = yield call(getCurrentBalanceData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *listPageAccountLog({ payload }, { call, put }) {
      const response = yield call(listPageAccountLogData, payload);
      yield put({
        type: "handlePageListData",
        payload: response
      });
    },
    *checkGetCustomer({ payload }, { call, put }) {
      const response = yield call(checkGetCustomerData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *syncInfo({ payload }, { call, put }) {
      const response = yield call(syncInfoData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *syncContactsInfo({ payload }, { call, put }) {
      const response = yield call(syncContactsInfoData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *GetPickUpQRCode({ payload }, { call, put }) {
      const response = yield call(getPickUpQRCodeData, payload);
      yield put({
        type: "handleCommonData",
        payload: response,
        alias: "pickUpCodeData"
      });
    },
    *initializePayPassword({ payload }, { call, put }) {
      const response = yield call(initializePayPasswordData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *checkNeedInitializePayPassword({ payload }, { call, put }) {
      const response = yield call(checkNeedInitializePayPasswordData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *verifyPayPassword({ payload }, { call, put }) {
      const response = yield call(verifyPayPasswordData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *changePayPassword({ payload }, { call, put }) {
      const response = yield call(changePayPasswordData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    handleListData(state, action) {
      return handleListDataAssist(state, action);
    },
    handlePageListData(state, action) {
      return handlePageListDataAssist(state, action);
    },
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    }
  }
};
