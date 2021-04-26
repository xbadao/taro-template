import Taro, { Component } from "@tarojs/taro";

import { isEqual, cloneWithoutMethod } from "../../utils/tools";

class CustomComponentBase extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const sourceProps = cloneWithoutMethod(this.props);
    const targetProps = cloneWithoutMethod(nextProps);

    const isEqualProps = isEqual(sourceProps, targetProps);

    if (!isEqualProps) {
      return true;
    }

    const sourceState = cloneWithoutMethod(this.state);
    const targetState = cloneWithoutMethod(nextState);

    const isEqualState = isEqual(sourceState, targetState);

    if (!isEqualState) {
      return true;
    }

    return false;
  }

  getUrlParams() {
    return this.$router.params;
  }

  getSetting(params) {
    Taro.getSetting(params);
  }

  switchTab(params) {
    Taro.switchTab(params);
  }

  reLaunch(params) {
    Taro.reLaunch(params);
  }

  navigateTo(params) {
    Taro.navigateTo(params);
  }

  redirectTo(params) {
    Taro.redirectTo(params);
  }

  navigateBack(params) {
    Taro.navigateBack(params);
  }

  getSystemInfoSync() {
    return Taro.getSystemInfoSync();
  }

  createSelectorQuery() {
    return Taro.createSelectorQuery();
  }

  createAnimation(params) {
    return Taro.createAnimation(params);
  }

  getPhoneLocation(params) {
    return Taro.getLocation(params);
  }

  requestPayment(params) {
    return Taro.requestPayment(params);
  }

  uploadFile(params) {
    return Taro.uploadFile(params);
  }

  downloadFile(params) {
    return Taro.downloadFile(params);
  }

  getClipboardData(params) {
    return Taro.getClipboardData(params);
  }

  setClipboardData(params) {
    return Taro.setClipboardData(params);
  }

  makePhoneCall(params) {
    return Taro.makePhoneCall(params);
  }

  setNavigationBarTitle(params) {
    return Taro.setNavigationBarTitle(params);
  }

  showNavigationBarLoading() {
    Taro.showNavigationBarLoading();
  }

  hideNavigationBarLoading() {
    Taro.hideNavigationBarLoading();
  }

  stopPullDownRefresh() {
    Taro.stopPullDownRefresh();
  }

  /**
   * 判断小程序的API，回调，参数，组件等是否在当前版本可用
   * @param {*} schema
   */
  canIUse(schema) {
    return Taro.canIUse(schema);
  }

  getUpdateManager() {
    return Taro.getUpdateManager();
  }

  showModal(params) {
    return Taro.showModal(params);
  }

  getCurrentPages() {
    return Taro.getCurrentPages();
  }

  render() {
    return null;
  }
}

export default CustomComponentBase;
