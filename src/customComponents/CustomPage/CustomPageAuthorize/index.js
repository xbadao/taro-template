import Taro from "@tarojs/taro";
import { pagePathCollection } from "../../../utils/customConfig";

import CustomPageCommon from "../CustomPageCommon";

class Index extends CustomPageCommon {
  constructor(props) {
    super(props);

    this.needAuthorize = true;

    this.state = {
      ...this.state,
      ...{
        showAuthorizationUserInfo: false
      }
    };
  }

  //用于重定义登录失败的交互逻辑
  doWhenSignInFail() {
    this.redirectToPath(pagePathCollection.register.path);
  }
}

export default Index;
