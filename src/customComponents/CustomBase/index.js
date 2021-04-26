import Taro from "@tarojs/taro";

import {
  defaultCoreState,
  toNumber,
  isFunction,
  isUndefined,
  getCity,
  setCity,
  getLocationMode,
  getMap,
  setMap,
  getLocation,
  setLocation,
  setLocationMode,
  removeLocation,
  getQQMapWX,
  setLastLocation,
  getLastLocation
} from "../../utils/tools";
import Tips from "../../utils/tips";
import CustomComponentBase from "../CustomComponentBase";
import {
  locationModeCollection,
  authLocationCollection,
  userLocation
} from "../../utils/customConfig";

class CustomBase extends CustomComponentBase {

  ifCheckLogin = true;

  lastLoadParams = null;

  needAuthorize = false;

  currentMapCityCode = "";

  currentCity = "";

  showCityChangeTipsInfo = false;

  showCityChangeTipsInfoAutoText = "即将切换城市";

  showCityChangeTipsInfoCustomText = "城市发生变化，即将刷新";

  showCityChangeTopInfo = false;

  showCityChangeTopInfoAutoText = "已经切换为您所在的城市";

  showCityChangeTopInfoCustomText = "已切换为目标城市";

  needReLocationWhenAutoAndRepeatedShow = false;

  constructor(props) {
    super(props);

    const coreState = defaultCoreState();
    const map = getMap();

    let mapCityCode = "";

    if (map != null) {
      const {
        ad_info: { adcode: cityCode }
      } = map;

      mapCityCode = `${cityCode || ""}`;
    }

    this.currentMapCityCode = mapCityCode;
    this.currentCity = `${getCity()}`;

    this.state = {
      ...this.state,
      ...{
        ...coreState
      }
    };
  }

  componentWillMount() {
    this.doWhenComponentWillMount();
  }

  componentDidMount() {
    this.setCurrentInfo();
    this.adjustPageWhenDidMount();

    const that = this;

    this.checkSessionId(() => {
      if (!this.needAuthorize) {
        if (this.ifCheckLogin) {
          that.checkLogin();
        }
        that.prepareInit();
      } else {
        if (this.ifCheckLogin) {
          that.checkLogin(() => {
            that.prepareInit();
          });
        } else {
          that.prepareInit();
        }

      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setCurrentInfo();
    this.doWorkWhenWillReceive(nextProps);
  }

  componentDidShow() {
    this.setCurrentInfo();

    const { firstShow, loadSuccess } = this.state;

    if (!firstShow) {
      this.doWhenComponentFirstShow();

      this.setState({ firstShow: true });
    } else {
      const that = this;

      this.checkSessionId(() => {
        if (this.ifCheckLogin) {
          that.checkLogin();
        }
      });

      this.doWhenComponentRepeatedShow();

      if (this.needReLocationWhenAutoAndRepeatedShow) {
        const locationMode = getLocationMode();

        if ((userLocation || false) && locationMode === locationModeCollection.auto) {
          const { dispatch } = this.props;

          this.reLocation(
            (location, map) => {
              this.checkCity(
                location,
                map,
                (
                  cityChanged,
                  city,
                  // eslint-disable-next-line no-unused-vars
                  cityPre,
                  // eslint-disable-next-line no-unused-vars
                  locationRemote,
                  // eslint-disable-next-line no-unused-vars
                  areaOpen
                ) => {
                  if (toNumber(this.currentCity) !== toNumber(city)) {
                    setCity(city);

                    this.setCurrentCity(city);

                    if (loadSuccess) {
                      if (this.showCityChangeTipsInfo) {
                        Tips.toast(this.showCityChangeTipsInfoAutoText);
                      }

                      this.reloadDataWhenAutoAndRepeatedShow(d => {
                        this.afterReloadDataWhenAutoAndRepeatedShow(d, () => {
                          if (this.showCityChangeTopInfo) {
                            this.showSuccess(
                              this.showCityChangeTopInfoAutoText,
                              800
                            );
                          }
                        });
                      });
                    }
                  }
                }
              );
            },
            false,
            false,
            false,
            dispatch
          );
        } else {
          const city = getCity();

          if (toNumber(this.currentCity) !== toNumber(city)) {
            this.setCurrentCity(city);

            if (loadSuccess) {
              if (this.showCityChangeTipsInfo) {
                Tips.info(this.showCityChangeTipsInfoCustomText);
              }

              this.reloadDataWhenAutoAndRepeatedShow(d => {
                this.afterReloadDataWhenAutoAndRepeatedShow(d, () => {
                  if (this.showCityChangeTopInfo) {
                    this.showSuccess(this.showCityChangeTopInfoCustomText);
                  }
                });
              });
            }
          }
        }
      }
    }

    this.doWhenComponentCommonShow();

    this.doOtherWhenComponentCommonShow();
  }

  componentDidHide() {
    this.doWhenComponentHide();
  }

  componentWillUnmount() {
    this.beforeUnmount();
    this.setState = () => { };
    this.afterUnmount();
  }

  doWhenComponentWillMount() { }

  doWhenComponentFirstShow() { }

  doWhenComponentRepeatedShow() { }

  doWhenComponentCommonShow() { }

  doOtherWhenComponentCommonShow() { }

  doWhenComponentHide() { }

  beforeUnmount() { }

  afterUnmount() { }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenWillReceive(nextProps) { }

  extendState() {
    return {};
  }

  adjustPageWhenDidMount() { }

  // eslint-disable-next-line no-unused-vars
  checkSessionId(callback) {
    if (isFunction(callback)) {
      callback();
    }
  }

  // eslint-disable-next-line no-unused-vars
  checkLogin(callback) { }

  prepareInit() {
    this.beforeInit(() => {
      this.init();
    });
  }

  beforeInit(callback) {
    if (isFunction(callback)) {
      callback();
    }

    this.initOther();
  }

  init() { }

  // eslint-disable-next-line no-unused-vars
  initLoad(otherSuccessCallback = null) { }

  initOther() { }

  reloadData(callback = null) {
    this.setState({ reloading: true }, () => {
      this.initLoad(callback);
    });
  }

  // eslint-disable-next-line no-unused-vars
  getApiData(props) {
    return {};
  }

  setCurrentInfo() { }

  reLocation(
    successCallback,
    forceReLocation = false,
    showLoading = false,
    fromLaunch = false,
    dispatch = null,
    failCallback
  ) {
    let needRelocation = forceReLocation || false;

    const location = getLocation();
    const mapData = getMap();
    const locationMode = getLocationMode();

    if (locationMode !== locationModeCollection.auto) {
      removeLocation();
    }

    if (!forceReLocation) {
      if ((location || null) == null || (mapData || null) == null) {
        needRelocation = true;
      } else {
        this.setLocationResult(
          {
            locationGet: true,
            locationAuth: authLocationCollection.yes
          },
          null,
          dispatch
        );

        if (isFunction(successCallback)) {
          successCallback(location, mapData);
        }
      }
    }

    if (needRelocation) {
      if (showLoading) {
        Tips.info("定位中,请稍后", 1500);
      }

      const that = this;

      that.getPhoneLocation({
        success: l => {
          that.setLocationResult(
            {
              locationGet: true,
              locationAuth: authLocationCollection.yes
            },
            null,
            dispatch
          );

          setLocationMode(locationModeCollection.auto);

          setLocation(l, null, dispatch);

          const { latitude, longitude } = l;

          const map = getQQMapWX();

          map.reverseGeocoder({
            location: {
              latitude: !latitude ? 34.7533581487 : latitude,
              longitude: !longitude ? 113.6313915479 : longitude
            },
            success: function (res) {
              const { result } = res;

              setMap(result);

              setLastLocation(result);

              if (isFunction(successCallback)) {
                successCallback(l, result);
              }
            },
            // eslint-disable-next-line no-unused-vars
            fail: function (res) {
              // const { status, message } = res;

              if (mapData != null) {
                setMap(mapData);
                setLastLocation(mapData);

                if (isFunction(successCallback)) {
                  successCallback(l, mapData);
                }
              } else {
                const mapDataLast = getLastLocation();

                if (mapDataLast != null) {
                  if (isFunction(successCallback)) {
                    successCallback(l, mapDataLast);
                  }
                } else {
                  setLocationMode(locationModeCollection.custom);

                  if (location != null) {
                    setLocation(location);
                  }

                  if (mapData != null) {
                    setMap(mapData);
                    setLastLocation(mapData);

                    if (isFunction(successCallback)) {
                      successCallback(l, mapData);
                    }
                  } else {
                    if (mapDataLast != null) {
                      if (isFunction(successCallback)) {
                        successCallback(l, mapDataLast);
                      }
                    } else {
                      setLocationMode(locationModeCollection.custom);

                      if (location != null) {
                        setLocation(location);
                      }

                      if (isFunction(successCallback)) {
                        successCallback(l, null);
                      }
                    }
                  }
                }
              }

              // Tips.info(`解析地理位置失败,${message}(${status})`);
            },
            complete: function () { }
          });
        },
        fail: failLocationResult => {
          setLocationMode(locationModeCollection.custom);

          if (location != null) {
            setLocation(location);
          }

          if (mapData != null) {
            setMap(mapData);
          }

          const { errMsg } = failLocationResult;

          if (errMsg === "getLocation:fail auth deny") {
            that.setLocationResult(
              {
                locationGet: false,
                locationAuth: authLocationCollection.no
              },
              null,
              dispatch
            );

            Tips.info("您已禁止获取位置信息");
          } else {
            that.getSetting({
              success: res => {
                const { authSetting } = res;

                let authLocation = authLocationCollection.unknown;

                if ((authSetting || null) != null) {
                  const v = authSetting["scope.userLocation"];

                  if (!isUndefined(v)) {
                    if (v) {
                      authLocation = authLocationCollection.yes;

                      Tips.info("获取定位失败");
                    } else {
                      authLocation = authLocationCollection.no;

                      Tips.info("您已拒绝程序获取定位信息");
                    }
                  }
                }

                that.setLocationResult(
                  {
                    locationGet: false,
                    locationAuth: authLocation
                  },
                  null,
                  dispatch
                );

                if (fromLaunch) {
                  if (authLocation === authLocationCollection.unknown) {
                  }
                }
              },
              fail: () => {
                that.setLocationResult(
                  {
                    locationGet: false,
                    locationAuth: authLocationCollection.unknown
                  },
                  null,
                  dispatch
                );

                Tips.info("获取定位权限信息失败");
              },
              complete: () => { }
            });
          }

          if (isFunction(failCallback)) {
            failCallback();
          }
        },
        complete: () => {
          // if (showLoading) {
          //   Tips.loaded();
          // }
        }
      });
    }
  }

  setCurrentCity(city) {
    this.currentCity = `${city || ""}`;
  }

  // eslint-disable-next-line no-unused-vars
  checkCity(location, map, callback, force = false) { }

  reloadDataWhenAutoAndRepeatedShow(callback) {
    this.reloadData(callback);
  }

  // eslint-disable-next-line no-unused-vars
  afterReloadDataWhenAutoAndRepeatedShow(d, callback) {
    if (isFunction(callback)) {
      callback;
    }
  }
}

export default CustomBase;
