import {
  handlePageListDataAssist,
  handleListDataAssist,
  handleCommonDataAssist
} from "../utils/tools";

import {
  listData,
  getData,
  getDefaultData,
  getDefaultShippingAddressData,
  getDefaultWithRecommendData,
  addData,
  quickAddData,
  updateInfoData,
  setDefaultData,
  removeData
} from "../services/shippingAddress";

export default {
  namespace: "shippingAddress",
  state: {},

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(listData, payload);
      yield put({
        type: "handleListData",
        payload: response
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *getDefault({ payload }, { call, put }) {
      const response = yield call(getDefaultData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *getDefaultShippingAddress({ payload }, { call, put }) {
      const response = yield call(getDefaultShippingAddressData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *getDefaultWithRecommend({ payload }, { call, put }) {
      const response = yield call(getDefaultWithRecommendData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *quickAdd({ payload }, { call, put }) {
      const response = yield call(quickAddData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *updateInfo({ payload }, { call, put }) {
      const response = yield call(updateInfoData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *setDefault({ payload }, { call, put }) {
      const response = yield call(setDefaultData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(removeData, payload);
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
