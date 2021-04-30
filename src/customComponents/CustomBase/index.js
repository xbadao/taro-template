import Taro from "@tarojs/taro";

import {
  defaultCoreState,
  isFunction,
} from "../../utils/tools";
import CustomComponentBase from "../CustomComponentBase";

class CustomBase extends CustomComponentBase {

  ifCheckLogin = true;

  needAuthorize = false;

  constructor(props) {
    super(props);

    const coreState = defaultCoreState();

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

  // eslint-disable-next-line no-unused-vars

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
