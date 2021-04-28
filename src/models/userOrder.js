import {
  handlePageListDataAssist,
  handleCommonDataAssist,
  handleListDataAssist
} from "../utils/tools";

import {
  listPageData,
  listPageCustomerData,
  listPageCustomerOrderDetailData,
  listPageChildMerchantData,
  getData,
  getCustomerUserOrderData,
  getMerchantUserOrderData,
  buyData,
  buyFromCartData,
  payByWeChatData,
  pickUpGoodsData,
  pickUpGoodsBatchData,
  listCustomerPickUpGoodsData,
  closeNoPayData
} from "../services/userOrder";

export default {
  namespace: "userOrder",
  state: {},

  effects: {
    *listPage({ payload }, { call, put }) {
      const response = yield call(listPageData, payload);
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
    *listPageCustomerOrderDetail({ payload }, { call, put }) {
      const response = yield call(listPageCustomerOrderDetailData, payload);
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
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *listCustomerPickUpGoods({ payload }, { call, put }) {
      const response = yield call(listCustomerPickUpGoodsData, payload);

      yield put({
        type: "handleListData",
        payload: response
      });
    },
    *getCustomerUserOrder({ payload }, { call, put }) {
      const response = yield call(getCustomerUserOrderData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *getMerchantUserOrder({ payload }, { call, put }) {
      const response = yield call(getMerchantUserOrderData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
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
    *pickUpGoods({ payload }, { call, put }) {
      const response = yield call(pickUpGoodsData, payload);
      yield put({
        type: "handleListData",
        payload: response
      });
    },
    *pickUpGoodsBatch({ payload }, { call, put }) {
      const response = yield call(pickUpGoodsBatchData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *closeNoPay({ payload }, { call, put }) {
      const response = yield call(closeNoPayData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
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
