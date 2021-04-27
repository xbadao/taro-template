import "@tarojs/async-await";
import Taro from "@tarojs/taro";
import { Provider } from "@tarojs/redux";

import CustomPageCore from "./customComponents/CustomPage/CustomPageCore";

import "./utils/request";
import Home from "./pages/home";
import dva from "./utils/dva";
import models from "./models";
import "./app.scss";

import {
  setInviter,
  setCity,
  getCity,
  getLocationMode,
  setLocationMode,
  getSessionIdRefreshing,
  removeRunTime,
  setNeedAdPopUp,
  setSessionIdRefreshing
} from "./utils/tools";
import { globalData } from "./utils/common";
import { locationModeCollection } from "./utils/customConfig";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const dvaApp = dva.createApp({
  initialState: {},
  models: models
});

const store = dvaApp.getStore();

class App extends CustomPageCore {
  config = {
    pages: [
      "pages/home/index",
      "pages/news/index",
      "pages/signIn/index",
      "pages/register/index",
      "pages/customer/index"
    ],
    preloadRule: {
      "pages/home/index": {
        network: "all",
        packages: ["customer"]
      }
    },
    window: {
      backgroundTextStyle: "dark",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "三易云农 ",
      navigationBarTextStyle: "black"
    },
    permission: {
      "scope.userLocation": {
        desc: "你的位置信息将用于筛选所在地的商品。"
      }
    },
    tabBar: {
      color: "#353535",
      selectedColor: "#C43F2E",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/home/index",
          iconPath: "./assets/tab-bar/home.png",
          selectedIconPath: "./assets/tab-bar/home-active.png",
          text: "首页"
        },
        {
          pagePath: "pages/news/index",
          iconPath: "./assets/tab-bar/cate.png",
          selectedIconPath: "./assets/tab-bar/cate-active.png",
          text: "资讯"
        },
        {
          pagePath: "pages/customer/index",
          iconPath: "./assets/tab-bar/user.png",
          selectedIconPath: "./assets/tab-bar/user-active.png",
          text: "我的"
        }
      ]
    }
    // networkTimeout: {
    //   request: 1000000,
    //   connectSocket: 100000,
    //   uploadFile: 100000,
    //   downloadFile: 100000
    // }
  };

  componentWillMount() {
    removeRunTime();
    const sessionIdRefreshing = getSessionIdRefreshing();

    if (sessionIdRefreshing) {
      setSessionIdRefreshing(false);
    }
  }

  /**
   *
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   * @memberof App
   */
  async componentDidMount() {
    const { dispatch } = store;

    setNeedAdPopUp(true);

    dispatch({
      type: "global/get",
      payload: { force: false }
    });

    // 获取参数
    const params = this.$router.params;
    const path = params.path;
    const query = params.query;
    const scene = params.scene;

    this.checkPath(path, query, scene);

    const cityPre = getCity();

    if ((query || null) != null) {
      const { city: cityValue } = query;

      if ((cityValue || "") !== "") {
        const locationMode = getLocationMode();

        if (cityPre === cityValue) {
          if (locationMode === locationModeCollection.auto) {
            // this.reLocation(null, false, false, true, dispatch);
          } else {
            setLocationMode(locationModeCollection.custom);
          }
        } else {
          setCity(cityValue);

          setLocationMode(locationModeCollection.custom);

          // dispatch({
          //   type: "global/getArea",
          //   payload: {}
          // });
        }
      } else {
        setLocationMode(locationModeCollection.auto);
        // this.reLocation(null, false, false, true, dispatch);
      }
    } else {
      setLocationMode(locationModeCollection.auto);
      // this.reLocation(null, false, false, true, dispatch);
    }

    const referrerInfo = params.referrerInfo;

    !globalData.extraData && (globalData.extraData = {});
    if (referrerInfo && referrerInfo.extraData) {
      globalData.extraData = referrerInfo.extraData;
    }
    if (query) {
      globalData.extraData = {
        ...globalData.extraData,
        ...query
      };
    }

    // 获取设备信息
    const sys = await Taro.getSystemInfo();
    sys && (globalData.systemInfo = sys);

    this.checkUpdateVersion();
  }

  componentDidShow() {

  }

  componentDidHide() { }

  componentDidCatchError() { }

  checkUpdateVersion() {
    //判断微信版本是否 兼容小程序更新机制API的使用
    if (this.canIUse("getUpdateManager")) {
      //创建 UpdateManager 实例
      const updateManager = this.getUpdateManager();
      // console.log("是否进入模拟更新");

      const that = this;

      //检测版本更新
      updateManager.onCheckForUpdate(res => {
        // console.log(`是否获取版本:${res.hasUpdate}`);
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //监听小程序有版本更新事件
          updateManager.onUpdateReady(() => {
            Taro.clearStorage();

            //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
            updateManager.applyUpdate();
          });
          updateManager.onUpdateFailed(() => {
            // 新版本下载失败
            that.showModal({
              title: "已经有新版本喽~",
              content:
                "请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~"
            });
          });
        }
      });
    } else {
      //TODO 此时微信版本太低（一般而言版本都是支持的）
      this.showModal({
        title: "溫馨提示",
        content:
          "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
      });
    }
  }

  checkPath(path, query, scene) {
    const { dispatch } = store;

    dispatch({
      type: "global/setGlobalQuery",
      payload: { path: path, query: query, scene: scene }
    });

    const { inviter } = query;

    if ((inviter || "") !== "") {
      setInviter(inviter);
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
