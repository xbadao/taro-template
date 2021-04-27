import Taro from "@tarojs/taro";
import {
  toNumber,
  isFunction,
  defaultCoreState,
  pretreatmentRequestParams,
  setCurrentUrl,
  isEqual,
  setToken,
  getToken,
  getOpenId,
  setOpenId,
  getLocation,
  getCity,
  setSessionId,
  getSessionId,
  setNeedSyncInfo,
  getLocationMode,
  getSessionIdRefreshing,
  sleep,
  setSessionIdRefreshing,
  removeSessionId,
  getEffectiveCode,
  setEffectiveCode,
  recordLog,
  setNextCheckLoginUnixTime,
  getNextCheckLoginUnixTime,
} from "../../../utils/tools";
import Tips from "../../../utils/tips";
import CustomBase from "../../CustomBase";
import {
  checkLoginResult,
  authLocationCollection,
  locationModeCollection,
  userLocation
} from "../../../utils/customConfig";

class Index extends CustomBase {
  lastLoadParams = null;

  requestingData = { type: "", payload: {} };

  constructor(props) {
    super(props);

    const defaultState = defaultCoreState();

    this.state = {
      ...defaultState,
      ...{
        metaData: null,
        metaListData: [],
      },
    };
  }

  doWhenAuthorizeFail(remoteData, callback) {
    const { code } = remoteData;

    if (code === 2001) {
      if (isFunction(callback)) {
        callback();
      }
    }
  }

  // 编译
  showInfo(message, duration = 3000) {
    this.showMessage(message, "info", duration);
  }

  showError(message, duration = 3000) {
    this.showMessage(message, "error", duration);
  }

  showSuccess(message, duration = 3000) {
    this.showMessage(message, "success", duration);
  }

  showWarn(message, duration = 3000) {
    this.showMessage(message, "warning", duration);
  }

  showMessage(message, type, duration = 3000) {
    Taro.atMessage({
      message: message,
      type: type,
      duration
    });
  }


  checkHasMore(pageNo, pageSize, total) {
    if ((total || 0) <= 0) {
      return false;
    }

    return (pageNo || 0) * (pageSize || 0) < (total || 0);
  }

  // 编译

  /**
   * 当城市信息发生变化时重新加载页面
   */
  callWhenCityChange(
    // eslint-disable-next-line no-unused-vars
    cityPre,
    // eslint-disable-next-line no-unused-vars
    city,
    // eslint-disable-next-line no-unused-vars
    locationRemote,
    // eslint-disable-next-line no-unused-vars
    areaOpen
  ) { }

  // eslint-disable-next-line no-unused-vars
  getStateNeedSetWillReceive(_nextProps) {
    return {};
  }

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate(_nextProps) {
    return false;
  }

  init() {
    const { autoLoad } = this.state;

    if (autoLoad) {
      recordLog("exec initLoad");

      this.initLoad();
    }
  }

  supplementLoadRequestParams(o) {
    return o;
  }

  initLoad(otherSuccessCallback = null) {
    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
      dataLoading,
      loadSuccess,
    } = this.state;

    recordLog(`initLoad loadApiPath ${loadApiPath}`);

    if ((loadApiPath || "") === "") {
      return;
    }

    const signInResult = this.getSignInResult();

    if (signInResult === checkLoginResult.fail && this.needAuthorize) {
      const { showAuthorizationUserInfo } = this.state;

      recordLog(
        `initLoad checkLoginResult.fail showAuthorizationUserInfo ${showAuthorizationUserInfo}`
      );

      if (!showAuthorizationUserInfo) {
        this.setState({ showAuthorizationUserInfo: true });
      }

      return;
    }

    if (!firstLoadSuccess) {
      this.beforeInitLoadRequest();
    }

    if (reloadingBefore) {
      this.beforeReLoadRequest();
    }

    let submitData = {};

    submitData = pretreatmentRequestParams(submitData);

    submitData = this.supplementLoadRequestParams(submitData);

    const checkResult = this.checkLoadRequestParams(submitData);

    if (checkResult) {
      // while (this.getCheckSignInProcessing()) {
      //   sleep(100);
      // }

      const requestingDataPre = this.getRequestingData();

      if (
        isEqual(requestingDataPre, {
          type: loadApiPath,
          payload: submitData,
        })
      ) {
        return;
      }

      if (dataLoading && !loadSuccess) {
        this.initLoadCore(submitData, otherSuccessCallback);
      } else {
        this.setState(
          {
            dataLoading: true,
            loadSuccess: false,
          },
          () => {
            this.initLoadCore(submitData, otherSuccessCallback);
          }
        );
      }
    }
  }

  initLoadCore(requestData, otherSuccessCallback) {
    const { dispatch } = this.props;

    const { loadApiPath, firstLoadSuccess } = this.state;

    this.setRequestingData({ type: loadApiPath, payload: requestData });

    recordLog(`initLoadCore dispatch type ${loadApiPath}`);

    dispatch({
      type: loadApiPath,
      payload: requestData,
    })
      .then(() => {
        try {
          const data = this.getApiData(this.props);

          const { dataSuccess } = data;

          let metaData = null;
          let metaListData = [];
          let metaExtra = null;

          if (dataSuccess) {
            const {
              list: metaListDataRemote,
              data: metaDataRemote,
              extra: metaExtraRemote,
            } = data;

            metaData = metaDataRemote || null;
            metaListData = metaListDataRemote || [];
            metaExtra = metaExtraRemote || null;

            this.setState({
              metaData,
              metaListData: metaListData || [],
            });

            this.afterLoadSuccess(
              metaData,
              metaListData || [],
              metaExtra,
              data
            );
          }

          const { reloading: reloadingComplete } = this.state;

          if (reloadingComplete) {
            this.afterReloadSuccess();
          }

          this.setState(
            {
              dataLoading: false,
              loadSuccess: dataSuccess,
              reloading: false,
              metaData,
              metaListData,
              firstLoadSuccess: !firstLoadSuccess ? true : firstLoadSuccess,
            },
            () => {
              if (!firstLoadSuccess) {
                this.afterFirstLoadSuccess();
              }
            }
          );

          if (isFunction(otherSuccessCallback)) {
            otherSuccessCallback(data);
          }

          this.clearRequestingData();
        } catch (error) {
          recordLog(error);

          throw error;
        }
      })
      .catch((res) => {
        recordLog(res);

        Tips.info("网络请求失败了，请检查下是否联网");

        setSessionIdRefreshing(false);
      });
  }

  getRequestingData() {
    return this.requestingData;
  }

  setRequestingData(params) {
    const d =
      params == null
        ? { type: "", payload: {} }
        : { ...{ type: "", payload: {} }, ...params };

    this.requestingData = d;
  }

  clearRequestingData() {
    this.requestingData = { type: "", payload: {} };
  }

  beforeInitLoadRequest() { }

  beforeReLoadRequest() { }

  // eslint-disable-next-line no-unused-vars
  checkLoadRequestParams(o) {
    return true;
  }

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess(metaData, metaListData, extra, data) {
    // throw new Error("方法 afterLoadSuccess 需要重载实现");
  }

  afterFirstLoadSuccess() { }

  afterReloadSuccess() {
    this.setState({ reloading: false });
  }

  redirectToPath(path) {
    if ((path || "") == "") {
      return;
    }

    this.redirectTo({
      url: `/${path}`,
    });
  }

  goToPath(path, callback = null) {
    if ((path || "") == "") {
      return;
    }

    this.navigateTo({
      url: `/${path}`,
      success: () => {
        if (isFunction(callback)) {
          callback();
        }
      },
    });
  }

  hideTabBar(params) {
    const { barShow } = this.state;

    if (barShow) {
      this.setState({ barShow: false }, () => {
        Taro.hideTabBar(params);
      });
    }
  }

  showTabBar(params) {
    const { barShow } = this.state;

    if (!barShow) {
      this.setState({ barShow: true }, () => {
        Taro.showTabBar(params);
      });
    }
  }

  getCheckSignInProcessing() {
    const {
      global: { checkSignInProcessing },
    } = this.props;

    return checkSignInProcessing || false;
  }

  setCheckSignInProcessing(o, callback) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setCheckSignInProcessing",
      payload: o || false,
    }).then(() => {
      recordLog(
        `setCheckSignInProcessing global/setCheckSignInProcessing ${o || false}`
      );

      recordLog(callback);

      if (isFunction(callback)) {
        callback();
      }
    });
  }

  getCheckLoginProcessing() {
    const {
      global: { checkLoginProcessing },
    } = this.props;

    return checkLoginProcessing || false;
  }

  setCheckLoginProcessing(o, callback) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setCheckLoginProcessing",
      payload: o || false,
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  setCurrentInfo() {
    const router = this.$router;

    const { path, params } = router;

    let p = "";

    const keys = Object.keys(params || {});
    if (keys.length > 0) {
      p = keys.map((o) => `${o}=${params[o]}`).join("&");
    }

    setCurrentUrl(`${path}${p === "" ? "" : `?${p}`}`);
  }

  signInWithUserInfo(userInfo, callback) {
    this.setState({ showAuthorizationUserInfo: false });

    const location = getLocation();

    this.signInWithUserInfoCore(location, userInfo, callback);
  }

  signInWithUserInfoCore(location, userInfo, callback) {
    const { dispatch } = this.props;

    const locationMode = getLocationMode();

    if ((userLocation || false) && locationMode == locationModeCollection.auto) {
      if ((location || null) == null) {
        const that = this;

        this.reLocation(
          () => {
            that.signIn(userInfo, callback);
          },
          false,
          false,
          false,
          dispatch,
          () => {
            that.signIn(userInfo, callback);
          }
        );
      } else {
        this.signIn(userInfo, callback);
      }
    } else {
      this.signIn(userInfo, callback);
    }
  }

  refreshSessionId(callback) {
    const sessionIdRefreshing = getSessionIdRefreshing();

    if (!sessionIdRefreshing) {
      setSessionIdRefreshing(true);

      const that = this;

      Taro.login({ timeout: 1000 })
        .then((res) => {
          const { code } = res;

          recordLog("refreshSessionId Taro.login");
          recordLog({ code });

          if (code) {
            setEffectiveCode(code);

            const { dispatch } = that.props;

            dispatch({
              type: "session/refreshSessionId",
              payload: { code },
            })
              .then(() => {
                const {
                  session: { data },
                } = that.props;

                const { dataSuccess, data: metaData } = data;

                if (dataSuccess) {
                  const { code: effectiveCodeRemote, sessionId } = metaData;
                  const effectiveCode = getEffectiveCode();

                  if (effectiveCode === (effectiveCodeRemote || "no")) {
                    setSessionId(sessionId);
                  }

                  if (isFunction(callback)) {
                    callback();
                  }
                } else {
                  removeSessionId();
                }

                setSessionIdRefreshing(false);
              })
              .catch(() => {
                Tips.info("网络请求失败了，请检查下是否联网");

                removeSessionId();

                setSessionIdRefreshing(false);

                if (isFunction(callback)) {
                  callback();
                }
              });
          } else {
            Tips.info("获取微信Code失败");

            removeSessionId();

            setSessionIdRefreshing(false);

            if (isFunction(callback)) {
              callback();
            }
          }
        })
        .catch((res) => {
          recordLog("refreshSessionId Taro.login catch");
          recordLog({ res });

          Tips.info("获取微信登录失败");

          removeSessionId();

          setSessionIdRefreshing(false);

          if (isFunction(callback)) {
            callback();
          }
        });
    } else {
      this.refreshSessionIdWhenRefreshing(callback);
    }
  }

  refreshSessionIdWhenRefreshing(callback, timeTotal = 0) {
    if (timeTotal > 3000) {
      Tips.info("长时间等待");

      if (isFunction(callback)) {
        callback();
      }

      return;
    }

    sleep(100, () => {
      const sessionIdRefreshingAfterSleep = getSessionIdRefreshing();

      if (sessionIdRefreshingAfterSleep) {
        this.refreshSessionIdWhenRefreshing(callback, timeTotal + 100);
      } else {
        if (isFunction(callback)) {
          callback();
        }
      }
    });
  }

  signIn(params, callback) {
    const { dispatch } = this.props;

    const that = this;

    const locationMode = getLocationMode();

    if ((userLocation || false) && locationMode == locationModeCollection.auto) {
      recordLog("signIn locationModeCollection.auto");

      this.reLocation(
        (location, map) => {
          const { latitude, longitude } = location || {
            latitude: 34.7533581487,
            longitude: 113.6313915479,
          };

          const {
            ad_info: { adcode: city },
          } = map;

          params.latitude = latitude || "";
          params.longitude = longitude || "";
          params.city = city;

          const checkSignInProcessing = that.getCheckSignInProcessing();

          if (!checkSignInProcessing) {
            that.setCheckSignInProcessing(true, () => {
              that.signInCore(params, callback);
            });
          }
        },
        false,
        false,
        false,
        dispatch,
        () => {
          const checkSignInProcessing = that.getCheckSignInProcessing();

          if (!checkSignInProcessing) {
            that.setCheckSignInProcessing(true, () => {
              that.signInCore(params, callback);
            });
          }
        }
      );
    } else {
      recordLog("signIn locationModeCollection.auto - else");

      if (userLocation || false) {
        that.signInWhenCheckSignInProcessing(
          params,
          (o, p) => {
            recordLog(`signInWhenCheckSignInProcessing callback exec`);
            recordLog(o);
            recordLog(p);

            o.setCheckSignInProcessing(true, () => {
              o.signInCore(p, callback);
            });
          },
          0
        );
      } else {
        const checkSignInProcessing = that.getCheckSignInProcessing();

        if (!checkSignInProcessing) {
          that.setCheckSignInProcessing(true, () => {
            that.signInCore(params, callback);
          });
        }
      }


    }
  }

  signInWhenCheckSignInProcessing(params, callback, timeTotal = 0) {
    const that = this;

    if (timeTotal > 3000) {
      if (isFunction(callback)) {
        callback(that, params);
      }

      return;
    }

    sleep(100, () => {
      const checkSignInProcessing = that.getCheckSignInProcessing();

      recordLog(
        `signInWhenCheckSignInProcessing sleep checkSignInProcessing：${checkSignInProcessing}`
      );

      if (checkSignInProcessing) {
        this.signInWhenCheckSignInProcessing(params, callback, timeTotal + 100);
      } else {
        if (isFunction(callback)) {
          callback(that, params);
        }
      }
    });
  }

  signInCore(params, callback) {
    const { dispatch } = this.props;
    const cityPre = getCity();

    Tips.loading("处理中");

    dispatch({
      type: "entrance/signIn",
      payload: params,
    }).then(() => {
      const {
        entrance: { data },
      } = this.props;

      Tips.loaded();

      const { dataSuccess, data: metaData } = data;

      if (dataSuccess) {
        const {
          token,
          openId,
          city,
          userId,
          signInResult,
          sessionEffective,
          needSyncInfo,
          location: locationRemote,
          areaOpen,
        } = metaData;

        if (typeof sessionEffective === "boolean") {
          if (sessionEffective) {
            setToken(token);
            setOpenId(openId);
            setNeedSyncInfo(needSyncInfo);

            recordLog(
              "signInCore sessionEffective this.setCheckSignInProcessing"
            );

            this.setCheckSignInProcessing(false);

            const signInResultPre = this.getSignInResult();

            this.setSignInResult(signInResult, () => {
              if (
                signInResultPre === checkLoginResult.fail &&
                signInResult === checkLoginResult.success
              ) {
                if (this.needAuthorize) {
                  this.reloadData();
                }
              }
            });

            if (toNumber(cityPre) !== toNumber(city)) {
              this.callWhenCityChange(
                `${cityPre || ""}`,
                `${city || ""}`,
                locationRemote,
                areaOpen
              );
            }
            recordLog(`signInCore callback exec`);
            recordLog(callback);
            if (isFunction(callback)) {
              callback(metaData);
            }
          } else {
            this.refreshSessionId(() => {
              this.signInCore(params, callback);
            });
          }
        } else {
          Tips.info("无效数据");
        }
      } else {
        removeSessionId();
        this.doWhenSignInFail();
      }
    });
  }

  doWhenSignInFail() {
    // Tips.info("请关闭小程序后重新打开");
  }

  checkCity(location, map, callback, force = false) {
    if ((map || null) == null) {
      this.showError("未获取到城市信息", 800);

      return;
    }

    const { dispatch } = this.props;

    const {
      ad_info: { adcode: cityCodeValue },
    } = map;

    const cityCode = `${cityCodeValue || ""}`;

    if (!force) {
      if (this.currentMapCityCode === cityCode) {
        if (isFunction(callback)) {
          const city = getCity();

          callback(false, city, city, location, city, 1);
        }

        return;
      }
    }

    this.currentMapCityCode = cityCode;

    dispatch({
      type: "entrance/checkCity",
      payload: { city: cityCode },
    }).then(() => {
      const {
        entrance: { data },
      } = this.props;

      const { dataSuccess, data: metaData } = data;

      if (dataSuccess) {
        if (isFunction(callback)) {
          const { city, location: locationRemote, areaOpen } = metaData;

          const cityPre = getCity();

          const cityChanged = toNumber(cityPre) !== toNumber(city);

          callback(cityChanged, city, cityPre, locationRemote, areaOpen);
        }
      }
    });
  }

  checkSessionId(callback) {
    const sessionIdRefreshing = getSessionIdRefreshing();

    if (!sessionIdRefreshing) {
      const sessionId = getSessionId();

      var that = this;

      if ((sessionId || "") === "") {
        this.refreshSessionId(callback);
      } else {
        recordLog(
          "checkSessionId sessionIdRefreshing sessionId else Taro.checkSession"
        );

        Taro.checkSession({
          success: (res) => {
            recordLog(
              "checkSessionId sessionIdRefreshing Taro.checkSession success"
            );
            recordLog({ res });

            if (isFunction(callback)) {
              callback();
            }
          },
          fail(res) {
            recordLog(
              "checkSessionId sessionIdRefreshing Taro.checkSession fail"
            );
            recordLog({ res });

            that.refreshSessionId(callback);
          },
        });
      }
    } else {
      recordLog(
        "checkSessionId sessionIdRefreshing else this.checkSessionIdWhenSessionIdRefreshing"
      );

      this.checkSessionIdWhenSessionIdRefreshing(() => {
        this.checkSessionId(callback);
      });
    }
  }

  checkSessionIdWhenSessionIdRefreshing(callback, timeTotal = 0) {
    if (timeTotal > 3000) {
      if (isFunction(callback)) {
        callback();
      }

      return;
    }

    sleep(100, () => {
      const sessionIdRefreshingAfterSleep = getSessionIdRefreshing();

      if (sessionIdRefreshingAfterSleep) {
        this.checkSessionIdWhenSessionIdRefreshing(callback, timeTotal + 100);
      } else {
        if (isFunction(callback)) {
          callback();
        }
      }
    });
  }

  // 检测是否需要重新请求凭证
  checkLogin(callback) {
    const { dispatch } = this.props;

    const signInResult = this.getSignInResult();
    const locationMode = getLocationMode();

    if (signInResult === checkLoginResult.unknown) {
      recordLog("checkLoginResult.unknown");
      if ((userLocation || false) && locationMode === locationModeCollection.auto) {
        recordLog("locationModeCollection.auto - checkLoginResult.auto");

        this.reLocation(
          () => {
            this.signIn({}, callback);
          },
          false,
          false,
          false,
          dispatch,
          () => {
            this.signIn({}, callback);
          }
        );
      } else {
        recordLog("locationModeCollection.auto - else");
        recordLog(callback);

        this.signIn({}, callback);
      }
    } else {
      if ((userLocation || false) && locationMode === locationModeCollection.auto) {
        recordLog("checkLoginResult.auto");

        this.reLocation(
          () => {
            this.checkLoginAfterLocation(callback);
          },
          false,
          false,
          false,
          dispatch,
          () => {
            this.checkLoginAfterLocation(callback);
          }
        );
      } else {
        this.checkLoginAfterLocation(callback);
      }
    }
  }

  checkLoginAfterLocation(callback) {
    const checkLoginProcessing = this.getCheckLoginProcessing();

    if (checkLoginProcessing) {
      return;
    }

    const tokenCurrent = getToken();
    const openIdCurrent = getOpenId();
    const location = getLocation();
    const city = getCity();

    if (
      (tokenCurrent || "") !== "" &&
      (openIdCurrent || "") !== "" &&
      (city || "") !== "" &&
      (location || null) !== null
    ) {
      const signInResult = this.getSignInResult();

      if (signInResult === checkLoginResult.fail) {
        if (!this.needAuthorize) {
          return;
        } else {
          if (isFunction(callback)) {
            callback();
          }

          return;
        }
      }
    }

    this.checkLoginCore(callback);
  }

  checkLoginCore(callback) {
    const currentNextCheckLoginUnixTime = getNextCheckLoginUnixTime();

    const currentUnixTime = parseInt(new Date().getTime() / 1000, 10);

    recordLog("checkLoginCore");
    recordLog({
      currentNextCheckLoginUnixTime,
      currentUnixTime,
    });

    if (currentUnixTime < currentNextCheckLoginUnixTime) {
      if (isFunction(callback)) {
        callback();
      }

      return;
    }

    const { dispatch } = this.props;

    dispatch({
      type: "remoteCheck/checkLogin",
      payload: {},
    }).then(() => {
      const {
        remoteCheck: { data },
      } = this.props;

      const { dataSuccess, data: metaData } = data;

      if (dataSuccess) {
        const { needRefresh, nextCheckLoginUnixTime } = metaData;

        setNextCheckLoginUnixTime(nextCheckLoginUnixTime);

        if (needRefresh) {
          this.signIn({}, callback);
        } else {
          const signInResult = this.getSignInResult();

          if (signInResult === checkLoginResult.fail && this.needAuthorize) {
            const { showAuthorizationUserInfo } = this.state;

            if (!showAuthorizationUserInfo) {
              this.setState({ showAuthorizationUserInfo: true });
            }
          }

          if (signInResult === checkLoginResult.success) {
            if (isFunction(callback)) {
              callback();
            }
          }

          this.setCheckLoginProcessing(false);
        }
      }
    });
  }

  getSignInResult() {
    const {
      global: { signInResult },
    } = this.props;

    return signInResult;
  }

  setSignInResult(params, callback) {
    const { dispatch } = this.props;

    let v = params;

    if (v !== checkLoginResult.fail && v !== checkLoginResult.success) {
      v = checkLoginResult.unknown;
    }

    dispatch({
      type: "global/setSignInResult",
      payload: v,
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  getLocationResult() {
    const {
      global: { locationResult },
    } = this.props;

    return locationResult;
  }

  setLocationResult(o, callback, dispatchFunc = null) {
    if (dispatchFunc == null) {
      const { dispatch } = this.props;

      dispatch({
        type: "global/setLocationResult",
        payload: o || {
          locationGet: false,
          locationAuth: authLocationCollection.unknown,
        },
      }).then(() => {
        if (isFunction(callback)) {
          callback();
        }
      });
    } else {
      dispatchFunc({
        type: "global/setLocationResult",
        payload: o || {
          locationGet: false,
          locationAuth: authLocationCollection.unknown,
        },
      }).then(() => {
        if (isFunction(callback)) {
          callback();
        }
      });
    }
  }
}

export default Index;
