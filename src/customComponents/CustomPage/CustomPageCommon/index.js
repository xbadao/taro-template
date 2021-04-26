import Taro from "@tarojs/taro";

import {
  toNumber,
  isFunction,
  refitCommonData,
  getCity,
  setLocationMode,
  setLocation,
  setCity,
  stringIsNullOrWhiteSpace,
  random
} from "../../../utils/tools";
import Tips from "../../../utils/tips";
import CustomPageCore from "../CustomPageCore";
import {
  pagePathCollection,
  buyMode,
  buyActionCollection as shoppingPanelAction,
  checkLoginResult,
  globalShareData,
  goodsTypeCollection,
  locationModeCollection,
  userLocation
} from "../../../utils/customConfig";

class Index extends CustomPageCore {
  isClick = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        shoppingPanelShow: false,
        shoppingPanelAction: shoppingPanelAction.addToCart,
        expressShoppingCartCount: 0
      }
    };
  }

  //用于重定义登录失败的交互逻辑
  doWhenSignInFail() {
    this.redirectToPath(pagePathCollection.register.path);
  }

  clickDecide(callback) {
    this.checkSessionId(() => {
      this.setCheckSignInProcessing(false, () => {
        this.checkLogin(() => {
          if (isFunction(callback)) {
            callback();
          }
        });
      });
    });
  }

  doOtherWhenComponentCommonShow() { }

  /**
   * 当城市信息发生变化时重新加载页面
   */
  callWhenCityChange(
    cityPre,
    city,
    locationRemote,
    // eslint-disable-next-line no-unused-vars
    areaOpen
  ) {
    this.setState({ city });

    // const locationResult = this.getLocationResult();

    let cityLocal = getCity();
    setCity(city);

    // cityLocal = cityLocal === "" ? "410100000000" : cityLocal;
    cityLocal = cityLocal === "" ? "" : cityLocal;

    if (areaOpen === 1 && toNumber(cityLocal) === toNumber(city)) {
      this.setCurrentCity(city);
    } else {
      //城市没有开通，弹出城市选择提示框
      if (areaOpen !== 1) {
        setLocationMode(locationModeCollection.custom);

        const { latitude, longitude } = locationRemote;

        const locationCity = {
          accuracy: 65,
          dataVersion: 871937,
          errMsg: "getLocation:ok",
          horizontalAccuracy: 65,
          latitude: latitude,
          longitude: longitude,
          speed: -1,
          verticalAccuracy: 65
        };

        setLocation(locationCity);

        this.setCurrentCity(city);
        this.setState({ showReminderCitySelectModal: true });

        this.reloadData();
      } else {
        if (toNumber(cityLocal) !== toNumber(city)) {
          Tips.info("即将切换到您所在的城市");

          this.setCurrentCity(city);

          this.reloadData(() => {
            this.showSuccess("城市数据已经刷新");
          });
        }
      }

      const { dispatch } = this.props;

      dispatch({
        type: "global/get",
        payload: { force: true }
      });
    }

    // if (areaOpen !== 1 || toNumber(cityLocal) !== toNumber(city)) {
    //   setLocationMode(locationModeCollection.custom);

    //   if (toNumber(cityLocal) !== toNumber(city)) {
    //     setCity(city);
    //   }

    //   const { latitude, longitude } = locationRemote;

    //   const location = {
    //     accuracy: 65,
    //     dataVersion: 871937,
    //     errMsg: "getLocation:ok",
    //     horizontalAccuracy: 65,
    //     latitude: latitude,
    //     longitude: longitude,
    //     speed: -1,
    //     verticalAccuracy: 65
    //   };

    //   setLocation(location);

    //   if (locationResult.locationAuth === authLocationCollection.unknown) {
    //     // 定位授权情况未知的情况下跳转城市选择页面
    //     this.goToPath(pagePathCollection.cityProductSelect.path, () => {
    //       this.setState({ showReminderCitySelectModal: false });
    //       this.reloadData();
    //     });
    //   } else {
    //     this.setState({ showReminderCitySelectModal: true });
    //     this.reloadData();
    //   }
    // }
  }

  getNeedSyncUserInfo() {
    const {
      global: { needSyncUserInfo }
    } = this.props;

    return needSyncUserInfo || false;
  }

  setNeedSyncUserInfo(v) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setNeedSyncUserInfo",
      payload: v
    });
  }

  getIntegral() {
    const {
      global: { Integral }
    } = this.props;

    return Integral || false;
  }

  setIntegral(v) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setIntegral",
      payload: v
    });
  }

  // 加载公共数据
  reloadGlobalData() {
    const { dispatch } = this.props;

    dispatch({
      type: "global/get",
      payload: { force: true }
    });
  }

  getRankList = () => {
    const { global } = this.props;
    return refitCommonData(global.rankList);
  };

  getCityList = () => {
    const { global } = this.props;
    return global.cityList || [];
  };

  getCityName = () => {
    const list = this.getCityList();

    const city = getCity();

    let result = "";

    (list || []).forEach(o => {
      if (`${o.locationInfoCode || ""}` === `${city}`) {
        result = o.name;
      }
    });

    return result;
  };

  // 售后原因
  getReplenishmentReasonTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.replenishmentReasonTypeList);
  };

  // 售后类型
  getReplenishmentTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.replenishmentTypeList);
  };

  // 退款原因
  getRefundReasonTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.refundReasonTypeList);
  };

  getNotice = () => {
    const { global } = this.props;
    return global.notice;
  };

  getNoticeText() {
    const notice = this.getNotice();

    return notice == null ? "" : notice.text || "";
  }

  getGlobalSuccess() {
    const {
      global: { globalLoadSuccess }
    } = this.props;

    return globalLoadSuccess;
  }

  getNeedReloadShoppingCart() {
    const {
      global: { needReloadShoppingCart }
    } = this.props;

    return needReloadShoppingCart;
  }

  setNeedReloadShoppingCart(params) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setNeedReloadShoppingCart",
      payload: params
    });
  }

  getNeedBalancePayment() {
    const {
      global: { needBalancePayment }
    } = this.props;

    return needBalancePayment;
  }

  setNeedBalancePayment(params) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setNeedBalancePayment",
      payload: params
    });
  }

  getNeedReloadBalance() {
    const {
      global: { needReloadBalance }
    } = this.props;

    return needReloadBalance;
  }

  setNeedReloadBalance(params, callback) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setNeedReloadBalance",
      payload: params || false
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  getSelectProduct() {
    const {
      global: { selectProduct }
    } = this.props;

    return selectProduct;
  }

  setSelectProduct(params, callback) {
    const { dispatch } = this.props;

    const d = params == null ? null : { ...{}, ...params };

    dispatch({
      type: "global/setSelectProduct",
      payload: d
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  clearSelectProduct() {
    this.setSelectProduct(null);
  }

  getSelectShippingAddress() {
    const {
      global: { selectShippingAddress }
    } = this.props;

    return selectShippingAddress;
  }

  setSelectShippingAddress(params, callback) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setSelectShippingAddress",
      payload: params || null
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  clearSelectShippingAddress() {
    this.setSelectShippingAddress(null);
  }

  getSelectCartList() {
    const {
      global: { selectCartList }
    } = this.props;

    return selectCartList;
  }

  setSelectCartList(list, callback) {
    const { dispatch } = this.props;

    const listData = (list || []).map(o => {
      const d = { ...{}, ...o };

      return d;
    });

    dispatch({
      type: "global/setSelectCartList",
      payload: listData
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  clearSelectCartList() {
    this.setSelectCartList([]);
  }

  getSelectOrderItemForReplenishment() {
    const {
      global: { selectOrderItemForReplenishment }
    } = this.props;

    return selectOrderItemForReplenishment;
  }

  setSelectOrderItemForReplenishment(params, callback) {
    const { dispatch } = this.props;

    const d = params == null ? null : { ...{}, ...params };

    dispatch({
      type: "global/setSelectOrderItemForReplenishment",
      payload: d
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  clearSelectOrderItemForReplenishment() {
    this.setSelectOrderItemForReplenishment(null);
  }

  getSelectOrderItemForRefund() {
    const {
      global: { selectOrderItemForRefund }
    } = this.props;

    return selectOrderItemForRefund;
  }

  setSelectOrderItemForRefund(params, callback) {
    const { dispatch } = this.props;

    const d = params == null ? null : { ...{}, ...params };

    dispatch({
      type: "global/setSelectOrderItemForRefund",
      payload: d
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  clearSelectOrderItemForRefund() {
    this.setSelectOrderItemForRefund(null);
  }

  getSwitchTabParams() {
    const {
      global: { switchTabParams }
    } = this.props;

    return switchTabParams;
  }

  setSwitchTabParams(params) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setSwitchTabParams",
      payload: params
    });
  }

  clearSwitchTabParams() {
    this.setSwitchTabParams(null);
  }


  getShareResourceList() {
    const {
      global: { shareResourceList }
    } = this.props;

    return shareResourceList || [];
  }

  // setShareResourceList(o, callback) {
  //   const { dispatch } = this.props;

  //   dispatch({
  //     type: "global/setShareResourceList",
  //     payload: o || []
  //   }).then(() => {
  //     if (isFunction(callback)) {
  //       callback();
  //     }
  //   });
  // }

  getCurrentUserId() {
    const {
      global: { currentUserId }
    } = this.props;

    return currentUserId || "";
  }

  setCurrentUserId(o, callback) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setCurrentUserId",
      payload: o || ""
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  clearCurrentUserId() {
    this.setCurrentUserId(null);
  }

  getNeedReloadShippingAddressList() {
    const {
      global: { needReloadShippingAddressList }
    } = this.props;

    return needReloadShippingAddressList;
  }

  setNeedReloadShippingAddressList(o, callback) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setNeedReloadShippingAddressList",
      payload: o
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  getGlobalQuery() {
    const {
      global: { globalQuery }
    } = this.props;

    return globalQuery || { path: "", query: {}, scene: 0 };
  }

  setGlobalQuery(o, callback) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setGlobalQuery",
      payload: o || { path: "", query: {}, scene: 0 }
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  getNeedReloadHome() {
    const {
      global: { needReloadHome }
    } = this.props;

    return needReloadHome;
  }

  setNeedReloadHome(o, callback) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setNeedReloadHome",
      payload: o || false
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  getNeedReloadCustomerUserOrderDetail() {
    const {
      global: { needReloadCustomerUserOrderDetail }
    } = this.props;

    return needReloadCustomerUserOrderDetail || false;
  }

  setNeedReloadCustomerUserOrderDetail(o, callback) {
    const { dispatch } = this.props;

    dispatch({
      type: "global/setNeedReloadCustomerUserOrderDetail",
      payload: o || false
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  getSearchHistoryList() {
    const {
      global: { searchHistoryList }
    } = this.props;

    return searchHistoryList;
  }

  getSimpleSearchHistoryList() {
    const {
      global: { simpleSearchHistoryList }
    } = this.props;

    return simpleSearchHistoryList;
  }

  setSearchHistoryList(list, callback) {
    const { dispatch } = this.props;

    const listData = (list || []).map(o => {
      const d = { ...{}, ...o };

      return d;
    });

    dispatch({
      type: "global/setSearchHistoryList",
      payload: listData
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  addSearchHistory(o, callback) {
    const list = this.getSearchHistoryList();

    list.unshift(o);

    this.setSearchHistoryList(list, callback);
  }

  setSimpleSearchHistoryList(list, callback) {
    const { dispatch } = this.props;

    const listData = (list || []).map(o => {
      const d = { ...{}, ...o };

      return d;
    });

    dispatch({
      type: "global/setSimpleSearchHistoryList",
      payload: listData
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  }

  addSimpleSearchHistory(o, callback) {
    const list = this.getSimpleSearchHistoryList();

    list.unshift(o);

    this.setSimpleSearchHistoryList(list, callback);
  }

  goToHomeTab(callback = null) {
    this.switchTab({
      url: `/${pagePathCollection.home.path}`,
      success: () => {
        if (isFunction(callback)) {
          callback();
        }
      }
    });
  }

  goToCartTab() {
    this.switchTab({
      url: `/${pagePathCollection.cart.path}`
    });
  }

  goToUserTab() {
    this.switchTab({
      url: `/${pagePathCollection.customer.path}`
    });
  }

  goToProductTab(rankId = "") {
    if ((rankId || "") !== "") {
      this.setSwitchTabParams({ rankId: rankId });
    } else {
      this.clearSwitchTabParams();
    }

    this.switchTab({
      url: `/${pagePathCollection.productList.path}`
    });
  }

  // goToProductDetail(o, redirect = false) {
  //   const { productId, planSaleSwitch } = o;

  //   if ((productId || "") === "") {
  //     return;
  //   }

  //   if ((planSaleSwitch || false) == true) {
  //     const path = `${pagePathCollection.productPresaleDetail.path}?productId=${productId}`;

  //     if (redirect) {
  //       this.redirectToPath(path);
  //     } else {
  //       this.goToPath(path);
  //     }
  //   } else {
  //     const path = `${pagePathCollection.productDetail.path}?productId=${productId}`;

  //     if (redirect) {
  //       this.redirectToPath(path);
  //     } else {
  //       this.goToPath(path);
  //     }
  //   }
  // }

  goToProductDetail(o, redirect = false) {
    const { productId, productSkuId, indexSku } = o;

    if ((productId || "") === "") {
      return;
    }

    const path = `${pagePathCollection.productDetail.path}?productId=${productId}&productSkuId=${productSkuId}&indexSku=${indexSku}`;

    if (redirect) {
      this.redirectToPath(path);
    } else {
      this.goToPath(path);
    }
  }

  goToBatchPurchaseDetail(o, redirect = false) {
    const { productId } = o;

    if ((productId || "") === "") {
      return;
    }

    const path = `${pagePathCollection.batchPurchaseDetail.path}?productId=${productId}`;

    if (redirect) {
      this.redirectToPath(path);
    } else {
      this.goToPath(path);
    }
  }

  goToShopPurchaseDetail(o, redirect = false) {
    const { productId } = o;

    if ((productId || "") === "") {
      return;
    }

    const path = `${pagePathCollection.shopPurchaseDetail.path}?productId=${productId}`;

    if (redirect) {
      this.redirectToPath(path);
    } else {
      this.goToPath(path);
    }
  }

  goToAddShippingAddress() {
    this.goToPath(pagePathCollection.shippingAddressAdd.path);
  }

  /**
   * 检测是否满足显示购物面板的条件，在需要时重载
   */
  checkCanShowShoppingPanel() {
    return true;
  }

  // eslint-disable-next-line no-unused-vars
  showAddToCart(otherState = null) {
    const checkResult = this.checkCanShowShoppingPanel();

    if (checkResult) {
      const s = otherState == null ? null : { ...{}, ...otherState };

      if (s != null) {
        this.setState({
          ...s,
          shoppingPanelShow: true,
          shoppingPanelAction: shoppingPanelAction.addToCart
        });
      } else {
        this.setState({
          shoppingPanelShow: true,
          shoppingPanelAction: shoppingPanelAction.addToCart
        });
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  showBuy(o) {
    const checkResult = this.checkCanShowShoppingPanel();

    if (checkResult) {
      this.setState({
        shoppingPanelShow: true,
        shoppingPanelAction: shoppingPanelAction.buy
      });
    }
  }

  closeShoppingPanel() {
    this.setState({
      shoppingPanelShow: false
    });
  }

  addToCart(o) {
    this.setState({
      shoppingPanelShow: false
    });

    Tips.loading("加入购物车中");

    const { dispatch } = this.props;

    dispatch({
      type: "cart/add",
      payload: o
    }).then(() => {
      const {
        cart: { data }
      } = this.props;

      Tips.loaded();

      const { dataSuccess, data: metaData } = data;

      if (dataSuccess) {
        const { expressShoppingCartCount } = metaData;

        this.setState({ expressShoppingCartCount });

        Tips.success("已加入购物车");

        this.setNeedReloadShoppingCart(true);
      } else {
        this.doWhenAuthorizeFail(data, () => {
          const signInResult = this.getSignInResult();

          if (signInResult === checkLoginResult.success) {
            this.signIn({}, () => {
              const reSignInResult = this.getSignInResult();
              if (reSignInResult === checkLoginResult.success) {
                this.addToCart(o);
              } else {
                this.setState({ showAuthorizationUserInfo: true });
              }
            });
          } else {
            this.setState({ showAuthorizationUserInfo: true });
          }
        });
      }
    });
  }

  goToBuyProduct(item, comeTo) {
    const {
      shoppingData: { city }
    } = item;

    // const cityLocal = getCity();

    // if (toNumber(cityLocal) !== toNumber(city)) {
    //   Tips.info(`该商品不在${this.getCityName()}，跨地区无法配送，不能购买`);

    //   this.closeShoppingPanel();
    //   return;
    // }

    this.setSelectProduct(item, () => {
      this.closeShoppingPanel();

      if (comeTo == "comeFrom") {
        this.goToPath(
          `${pagePathCollection.batchPurchaseOrderConfirm.path}?mode=${buyMode.buy}`
        );
        return;
      }

      if (comeTo == "comeFromShopPurchase") {
        this.goToPath(
          `${pagePathCollection.shopPurchaseOrderConfirm.path}?mode=${buyMode.buy}`
        );
        return;
      }

      this.goToPath(
        `${pagePathCollection.orderConfirm.path}?mode=${buyMode.buy}`
      );
    });
  }

  goToWebPage(title, url) {
    if (stringIsNullOrWhiteSpace(url)) {
      Tips.info("缺少目标页面地址，无法跳转");

      return;
    }

    const titleEncode = encodeURIComponent(title || "");
    const urlEncode = encodeURIComponent(url);

    this.goToPath(
      `${pagePathCollection.webPage.path}?title=${titleEncode}&url=${urlEncode}`
    );
  }

  goToPaySuccessPage(title, url) {
    if (stringIsNullOrWhiteSpace(url)) {
      Tips.info("缺少目标页面地址，无法跳转");

      return;
    }

    const titleEncode = encodeURIComponent(title || "");
    const urlEncode = encodeURIComponent(url);

    this.goToPath(
      `${pagePathCollection.paySuccessWebView.path}?title=${titleEncode}&url=${urlEncode}`
    );
  }


  // eslint-disable-next-line no-unused-vars
  afterShoppingPanelClose(o) {
    this.setState({
      shoppingPanelShow: false,
      shoppingPanelAction: shoppingPanelAction.addToCart
    });
  }

  reLaunchHome() {
    this.reLaunch({
      url: `/${pagePathCollection.home.path}`
    });
  }

  checkHasMore(pageNo, pageSize, total) {
    if ((total || 0) <= 0) {
      return false;
    }

    return (pageNo || 0) * (pageSize || 0) < (total || 0);
  }

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

  doLocation(afterDoLocationCallback = null) {
    const { dispatch } = this.props;

    this.reLocation(
      (location, map) => {
        this.checkCity(
          location,
          map,
          (
            cityChanged,
            city,
            cityPre,
            locationRemote,
            // eslint-disable-next-line no-unused-vars
            areaOpen
          ) => {
            let cityLocal = getCity();
            setCity(city);
            this.setCurrentCity(city);

            // cityLocal = cityLocal === "" ? "410100000000" : cityLocal;
            cityLocal = cityLocal === "" ? "" : cityLocal;

            if (areaOpen === 1 && toNumber(cityLocal) === toNumber(city)) {
              Tips.info("当前已经是您所在的城市");
            } else {
              // 检测当前的城市发生了变化（主要由于当前点的城市运营关闭等情况，正常情况下不会出现变化），显示选择城市提示框，并将城市设置为默认
              //定位的城市没有开通，弹出城市选择提示框
              if (areaOpen !== 1) {
                setLocationMode(locationModeCollection.custom);
                const { latitude, longitude } = locationRemote;

                const locationCity = {
                  accuracy: 65,
                  dataVersion: 871937,
                  errMsg: "getLocation:ok",
                  horizontalAccuracy: 65,
                  latitude: latitude,
                  longitude: longitude,
                  speed: -1,
                  verticalAccuracy: 65
                };

                setLocation(locationCity);

                this.setState({ showReminderCitySelectModal: true });

                this.reloadData(d => {
                  if (isFunction(afterDoLocationCallback)) {
                    afterDoLocationCallback(d);
                  }
                });
              } else {
                if (toNumber(cityLocal) !== toNumber(city)) {
                  Tips.info("即将切换到您所在的城市");

                  this.reloadData(d => {
                    this.showInfo("数据已经刷新");

                    if (isFunction(afterDoLocationCallback)) {
                      afterDoLocationCallback(d);
                    }
                  });
                }
              }

              dispatch({
                type: "global/get",
                payload: { force: true }
              });
            }
          },
          true
        );
      },
      true,
      true,
      false,
      dispatch,
      () => {
        Tips.info("获取定位失败");
      }
    );
  }
}

export default Index;
