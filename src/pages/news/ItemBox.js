import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import { isEqual, isFunction, toDatetime, formatDatetime } from "../../utils/tools";
import CustomComponentBase from "../../customComponents/CustomComponentBase";
import ImageBox from "../../customComponents/ImageBox";
import FlatTag from "../../customComponents/FlatTag";
import { planSaleStyle } from "../../utils/customConfig";

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

  detailAction() {
    const { data, showDetail } = this.props;

    if (isFunction(showDetail)) {
      showDetail(data);
    }
  }

  render() {
    const { data } = this.props;

    if (data == null) {
      return null;
    }

    return (
      <View className="itemBox">
        <View className="at-row">
          <View className="at-col at-col-5">
            <View className="imageContainor">
              <ImageBox
                imageBoxStyle={{ borderRadius: "10rpx" }}
                src={data.image}
              />
            </View>
          </View>
          <View className="at-col at-col-7">
            <View className="infoBoxContainor">
              <View className="infoBox">
                <View
                  className="nameBox"
                  onClick={() => {
                    this.detailAction(data);
                  }}
                >
                  <View className="name">
                    {data.subtitle}
                  </View>
                </View>
                <View className="buyBox">
                  <View
                    className="at-row at-row__align--center at-row__justify--between"
                    onClick={() => {
                      this.detailAction(data);
                    }}
                  >
                    <View className="at-col at-col-1 at-col--auto">
                      <View className="at-row at-row__align--center">
                        <View className="at-col at-col-1 at-col--auto salePrice">
                          <View className="salePriceIcon">
                            <Image src="http://file.panduolakeji.com/103087903.png" />
                          </View>
                        </View>
                        <View className="at-col at-col-1 at-col--auto marketPrice">
                          {formatDatetime(toDatetime(data.createTime), "yyyy-MM-dd")}
                        </View>
                      </View>
                    </View>
                    <View className="at-col at-col-1 at-col--auto">
                      <View className="at-row at-row__align--center">
                        <View className="at-col at-col-1 at-col--auto salePrice">
                          <View className="salePriceIcon">
                            <Image src="http://file.panduolakeji.com/1815831189.png" />
                          </View>
                        </View>
                        <View className="at-col at-col-1 at-col--auto marketPrice" style="padding-left:5rpx">
                          {data.accessCount || 0}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ItemBox;
