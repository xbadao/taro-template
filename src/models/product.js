import {
  handlePageListDataAssist,
  handleCommonDataAssist,
  handleListDataAssist
} from "../utils/tools";

import {
  pageListData,
  pageListNewArrivalData,
  pageListPlanSaleData,
  pageListBySearchData,
  getData,
  getSkuData
} from "../services/product";

export default {
  namespace: "product",
  state: {},

  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);
      yield put({
        type: "handlePageListData",
        payload: response
      });
    },
    *pageListNewArrival({ payload }, { call, put }) {
      const response = yield call(pageListNewArrivalData, payload);
      yield put({
        type: "handlePageListData",
        payload: response
      });
    },
    *pageListPlanSale({ payload }, { call, put }) {
      const response = yield call(pageListPlanSaleData, payload);
      yield put({
        type: "handlePageListData",
        payload: response
      });
    },
    *pageListBySearch({ payload }, { call, put }) {
      const response = yield call(pageListBySearchData, payload);
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
    },
    *getSku({ payload }, { call, put }) {
      const response = yield call(getSkuData, payload);
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
    },
    handleListData(state, action) {
      return handleListDataAssist(state, action);
    }
  }
};
