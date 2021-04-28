import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import CustomComponentBase from "../CustomComponentBase";

class Index extends CustomComponentBase {
  render() {
    const { customStyle, text } = this.props;

    return <View style={customStyle || {}}>{text}</View>;
  }
}

export default Index;
