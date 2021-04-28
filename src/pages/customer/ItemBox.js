import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import { isEqual, isFunction } from "../../utils/tools";
import CustomComponentBase from "../../customComponents/CustomComponentBase";
import ImageBox from "../../customComponents/ImageBox";

import "./ItemBox.scss";

class ItemBox extends CustomComponentBase {
  shouldComponentUpdate(nextProps, nextState) {
    const isEqualProps = isEqual(this.props.data, nextProps.data);

    if (!isEqualProps) {
      return true;
    }

    const isEqualState = isEqual(this.state, nextState);

    if (!isEqualState) {
      return true;
    }

    return false;
  }

  clickAction() {
    const { data, clickItem } = this.props;

    if (isFunction(clickItem)) {
      clickItem(data);
    }
  }

  render() {
    const { data, index } = this.props;

    if (data == null) {
      return null;
    }

    return (
      <View
        className="actionBox"
        onClick={() => {
          this.clickAction(data);
        }}
      >
        <View className="imageContainor">
          <View className="at-row at-row__justify--center">

            {index === "1" ? (
              <View className="at-col at-col-1 at-col--auto">
                <View className="imageContainorInner">
                  <ImageBox
                    className="imageContainorInnerIcon"
                    src={data.image}
                  />
                </View>
              </View>
            ) : (
                <View className="at-col at-col-1 at-col--auto">
                  <Image className="imageContainorInnerIcon" src={data.image} />
                </View>
              )}
          </View>
        </View>
        <View className="textBox">
          <View className="at-row at-row__align--center fullHeight">
            <View className="at-col" />
            <View className="at-col text">{data.value}</View>
            <View className="at-col" />
          </View>
        </View>
      </View>
    );
  }
}

export default ItemBox;
