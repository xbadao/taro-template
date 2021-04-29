import { handlePageListDataAssist, handleListDataAssist, handleCommonDataAssist } from "../utils/tools";

import {
  getMainData,
  getBriefData,
  listRankBoxData,
  listRandomData,
  listTopData
} from "../services/home";

export default {
  namespace: "home",

  state: {},

  effects: {
    *getMain({ payload }, { call, put }) {
      const response = yield call(getMainData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *getBrief({ payload }, { call, put }) {
      const response = yield call(getBriefData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *listRankBox({ payload }, { call, put }) {
      const response = yield call(listRankBoxData, payload);
      yield put({
        type: "handleListData",
        payload: response,
        alias: "listRankBoxData"
      });
    },
    *listRandom({ payload }, { call, put }) {
      const response = yield call(listRandomData, payload);
      yield put({
        type: "handlePageListData",
        payload: response
      });
    },
    *listTop({ payload }, { call, put }) {
      const response = yield call(listTopData, payload);
      yield put({
        type: "handleCommonData",
        payload: response,
        alias: "listTopData"
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
