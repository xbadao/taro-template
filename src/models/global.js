import {
  handleListDataAssist,
  handleCommonDataAssist,
  pretreatmentRemoteSingleData,
  getMetaDataCache,
  setMetaDataCache,
  getRunTime,
  setRunTime,
} from "../utils/tools";
import {
  checkLoginResult,
} from "../utils/customConfig";

import {
  getData,
  getExchangeShareData,
  getCreateShareUrlParams,
  testData
} from "../services/global";

export default {
  namespace: "global",

  state: {
    needSyncUserInfo: false,
    // type=0 减    type=1  加
    Integral: { type: 0, integralNum: 0 },
    globalLoadSuccess: false,
    globalQuery: { path: "", query: {}, scene: 0 },
    needReloadHome: false,
    switchTabParams: null,
    needReloadShoppingCart: false,
    notice: {},
    rankList: [],
    cityList: [],
    replenishmentReasonTypeList: [],
    refundReasonTypeList: [],
    replenishmentTypeList: [],
    selectProduct: null,
    selectCartList: [],
    selectShippingAddress: null,
    quickPrepareAddShippingAddress: null,
    needReloadShippingAddressList: false,
    selectOrderItemForReplenishment: null,
    selectOrderItemForRefund: null,
    needReloadCustomerUserOrderDetail: false,
    needReloadBalance: false,
    searchHistoryList: [],
    simpleSearchHistoryList: [],
    currentUserId: "",
    checkLoginProcessing: false,
    checkSignInProcessing: false,
    signInResult: checkLoginResult.unknown,
    shareResourceList: [],
    needBalancePayment: false,
  },

  effects: {
    *test({ payload }, { call, put }) {
      const response = yield call(testData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *setSwitchTabParams({ payload }, { put }) {
      yield put({
        type: "changeSwitchTabParams",
        payload
      });
    },
    *setNeedReloadShoppingCart({ payload }, { put }) {
      yield put({
        type: "changeNeedReloadShoppingCart",
        payload
      });
    },
    *setNeedReloadShippingAddressList({ payload }, { put }) {
      yield put({
        type: "changeNeedReloadShippingAddressList",
        payload
      });
    },
    *setNotice({ payload }, { put }) {
      yield put({
        type: "changeNotice",
        payload
      });
    },
    *setRankList({ payload }, { put }) {
      yield put({
        type: "changeRankList",
        payload
      });
    },
    *setReplenishmentReasonTypeList({ payload }, { put }) {
      yield put({
        type: "changeReplenishmentReasonTypeList",
        payload
      });
    },
    *setReplenishmentTypeList({ payload }, { put }) {
      yield put({
        type: "changeReplenishmentTypeList",
        payload
      });
    },
    *setReplenishmentSimpleTypeList({ payload }, { put }) {
      yield put({
        type: "changeRefundReasonSimpleTypeList",
        payload
      });
    },
    *setRefundReasonTypeList({ payload }, { put }) {
      yield put({
        type: "changeRefundReasonTypeList",
        payload
      });
    },
    *setSelectProduct({ payload }, { put }) {
      yield put({
        type: "changeSelectProduct",
        payload
      });
    },
    *setSelectCartList({ payload }, { put }) {
      yield put({
        type: "changeSelectCartList",
        payload
      });
    },
    *setSelectShippingAddress({ payload }, { put }) {
      yield put({
        type: "changeSelectShippingAddress",
        payload
      });
    },
    *setQuickPrepareAddShippingAddress({ payload }, { put }) {
      yield put({
        type: "changeQuickPrepareAddShippingAddress",
        payload
      });
    },
    *setSelectOrderItemForReplenishment({ payload }, { put }) {
      yield put({
        type: "changeSelectOrderItemForReplenishment",
        payload
      });
    },
    *setSelectOrderItemForRefund({ payload }, { put }) {
      yield put({
        type: "changeSelectOrderItemForRefund",
        payload
      });
    },
    *setNeedReloadCustomerUserOrderDetail({ payload }, { put }) {
      yield put({
        type: "changeNeedReloadCustomerUserOrderDetail",
        payload
      });
    },
    *setNeedReloadBalance({ payload }, { put }) {
      yield put({
        type: "changeNeedReloadBalance",
        payload
      });
    },
    *setSearchHistoryList({ payload }, { put }) {
      yield put({
        type: "changeSearchHistoryList",
        payload
      });
    },
    *setSimpleSearchHistoryList({ payload }, { put }) {
      yield put({
        type: "changeSimpleSearchHistoryList",
        payload
      });
    },
    *setCurrentUserId({ payload }, { put }) {
      yield put({
        type: "changeCurrentUserId",
        payload
      });
    },
    *setCheckSignInProcessing({ payload }, { put }) {
      yield put({
        type: "changeCheckSignInProcessing",
        payload
      });
    },
    *setCheckLoginProcessing({ payload }, { put }) {
      yield put({
        type: "changeCheckLoginProcessing",
        payload
      });
    },
    *setSignInResult({ payload }, { put }) {
      yield put({
        type: "changeSignInResult",
        payload
      });
    },
    *setShareResourceList({ payload }, { put }) {
      yield put({
        type: "changeShareResourceList",
        payload
      });
    },
    *setNeedBalancePayment({ payload }, { put }) {
      yield put({
        type: "changeNeedBalancePayment",
        payload
      });
    },
    *exchangeShareData({ payload }, { call, put }) {
      const response = yield call(getExchangeShareData, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    },
    *createShareUrlParams({ payload }, { call, put }) {
      const response = yield call(getCreateShareUrlParams, payload);
      yield put({
        type: "handleCommonData",
        payload: response
      });
    }
  },

  reducers: {
    handleListData(state, action) {
      return handleListDataAssist(state, action);
    },
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
    changeMetaData(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    changeGlobalQuery(state, { payload }) {
      return {
        ...state,
        globalQuery: payload
      };
    },
    changeNeedSyncUserInfo(state, { payload }) {
      return {
        ...state,
        needSyncUserInfo: payload
      };
    },
    changeIntegral(state, { payload }) {
      return {
        ...state,
        Integral: payload
      };
    },
    changeNeedReloadHome(state, { payload }) {
      return {
        ...state,
        needReloadHome: payload
      };
    },
    changeLoadSuccess(state, { payload }) {
      return {
        ...state,
        loadSuccess: payload
      };
    },
    changeSwitchTabParams(state, { payload }) {
      return {
        ...state,
        switchTabParams: payload
      };
    },
    changeNeedReloadShoppingCart(state, { payload }) {
      return {
        ...state,
        needReloadShoppingCart: payload
      };
    },
    changeNeedReloadShippingAddressList(state, { payload }) {
      return {
        ...state,
        needReloadShippingAddressList: payload
      };
    },
    changeNotice(state, { payload }) {
      return {
        ...state,
        notice: payload
      };
    },
    changeRankList(state, { payload }) {
      return {
        ...state,
        rankList: payload
      };
    },
    changeReplenishmentReasonTypeList(state, { payload }) {
      return {
        ...state,
        replenishmentReasonTypeList: payload
      };
    },
    changeReplenishmentTypeList(state, { payload }) {
      return {
        ...state,
        replenishmentTypeList: payload
      };
    },
    changeRefundReasonTypeList(state, { payload }) {
      return {
        ...state,
        refundReasonTypeList: payload
      };
    },
    changeSelectProduct(state, { payload }) {
      return {
        ...state,
        selectProduct: payload
      };
    },
    changeSelectCartList(state, { payload }) {
      return {
        ...state,
        selectCartList: payload
      };
    },
    changeSelectShippingAddress(state, { payload }) {
      return {
        ...state,
        selectShippingAddress: payload
      };
    },
    changeQuickPrepareAddShippingAddress(state, { payload }) {
      return {
        ...state,
        quickPrepareAddShippingAddress: payload
      };
    },
    changeSelectOrderItemForReplenishment(state, { payload }) {
      return {
        ...state,
        selectOrderItemForReplenishment: payload
      };
    },
    changeSelectOrderItemForRefund(state, { payload }) {
      return {
        ...state,
        selectOrderItemForRefund: payload
      };
    },
    changeNeedReloadCustomerUserOrderDetail(state, { payload }) {
      return {
        ...state,
        needReloadCustomerUserOrderDetail: payload
      };
    },
    changeNeedReloadBalance(state, { payload }) {
      return {
        ...state,
        needReloadBalance: payload
      };
    },
    changeSearchHistoryList(state, { payload }) {
      return {
        ...state,
        searchHistoryList: payload
      };
    },
    changeSimpleSearchHistoryList(state, { payload }) {
      return {
        ...state,
        simpleSearchHistoryList: payload
      };
    },
    changeCurrentUserId(state, { payload }) {
      return {
        ...state,
        currentUserId: payload
      };
    },
    changeCheckSignInProcessing(state, { payload }) {
      return {
        ...state,
        checkSignInProcessing: payload
      };
    },
    changeCheckLoginProcessing(state, { payload }) {
      return {
        ...state,
        checkLoginProcessing: payload
      };
    },
    changeSignInResult(state, { payload }) {
      return {
        ...state,
        signInResult: payload
      };
    },
    changeShareResourceList(state, { payload }) {
      return {
        ...state,
        shareResourceList: payload
      };
    },
    changeNeedBalancePayment(state, { payload }) {
      return {
        ...state,
        needBalancePayment: payload
      };
    },
  }
};
