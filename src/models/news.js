import {
  handlePageListDataAssist,
  handleListDataAssist,
  handleCommonDataAssist
} from "../utils/tools";

import { pageListData, getGalleryData, getData } from "../services/news";

export default {
  namespace: "news",
  state: {},

  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);
      yield put({
        type: "handlePageListData",
        payload: response
      });
    },
    *getGallery({ payload }, { call, put }) {
      const response = yield call(getGalleryData, payload);
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
