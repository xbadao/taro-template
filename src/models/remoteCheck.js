import {
  pretreatmentRemoteSingleData,
  handleCommonDataAssist,
  getRemoteCheckCache,
  setRemoteCheckCache
} from "../utils/tools";

import { checkLoginData } from "../services/remoteCheck";

export default {
  namespace: "remoteCheck",

  state: {},

  effects: {
    *checkLogin({ payload }, { call, put }) {
      let fromRemote = false;

      let result = getRemoteCheckCache();

      if ((result || null) == null) {
        fromRemote = true;
      }

      if (fromRemote) {
        result = yield call(checkLoginData, payload);

        const data = pretreatmentRemoteSingleData(result);

        const { dataSuccess } = data;

        if (dataSuccess) {
          setRemoteCheckCache(result);
        }
      }

      yield put({
        type: "handleCommonData",
        payload: result
      });
    }
  },

  reducers: {
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    }
  }
};
