import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import CustomComponentBase from "../CustomComponentBase";
import ImageBox from "../ImageBox";

import "./index.scss";

class EmptyBox extends CustomComponentBase {
  render() {
    const { imageUrl, message } = this.props;

    const url = imageUrl || "http://file.panduolakeji.com/1302942278.png";

    const text = message || "";

    return (
      <View className="emptyBoxContainor">
        <View className="at-row at-row__align--center">
          <View className="at-col" />
          <View className="at-col at-col-1 at-col--auto">
            <View className="emptyBoxContainorInner">
              <View className="at-row at-row__align--center">
                <View className="at-col" />
                <View className="at-col at-col-1 at-col--auto">
                  <View className="imageContainor">
                    <ImageBox src={url} />
                  </View>
                </View>
                <View className="at-col" />
              </View>
              {text === "" ? null : <View className="messageBox">{text}</View>}
            </View>
          </View>
          <View className="at-col" />
        </View>
      </View>
    );
  }
}

export default EmptyBox;
