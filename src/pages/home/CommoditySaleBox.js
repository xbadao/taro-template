import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import { isEqual, isFunction, formatMoney } from "../../utils/tools";
import CustomComponentBase from "../../customComponents/CustomComponentBase";
import ImageBox from "../../customComponents/ImageBox";
import FlatTag from "../../customComponents/FlatTag";
import { planSaleStyle } from "../../utils/customConfig";

import "./CommoditySaleBox.scss";

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

  cartAction() {
    const { data, showCart } = this.props;

    if (isFunction(showCart)) {
      showCart(data);
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
          <View className="at-col at-col-4">
            <View className="imageContainor">
              <ImageBox
                imageBoxStyle={{ borderRadius: "10rpx" }}
                src={data.mainImageUrl}
                lazyLoad
                showOverlay={data.state != 1 || data.stock === 0}
                loadingEffect={!(data.state != 1 || data.stock === 0)}
                overlayText={
                  data.state != 1 ? "下架" : data.stock === 0 ? "售罄" : ""
                }
                clickAction={() => {
                  this.detailAction(data);
                }}
              />
            </View>
          </View>
          <View className="at-col at-col-8">
            <View className="infoBoxContainor">
              <View className="infoBox">
                <View
                  className="nameBox"
                  onClick={() => {
                    this.detailAction(data);
                  }}
                >
                  <View className="name">
                    {data.planSaleSwitch ? (
                      <FlatTag customStyle={planSaleStyle} text="预售" />
                    ) : null}
                    {`${data.title}${data.skuName == "" ? "" : `(${data.skuName})`
                      }`}
                  </View>
                </View>
                <View
                  className="description"
                  onClick={() => {
                    this.detailAction(data);
                  }}
                >
                  {data.keyword}
                </View>
                <View
                  className="feature at-row at-row__align--start"
                  onClick={() => {
                    this.detailAction(data);
                  }}
                >
                  {data.tagList
                    ? data.tagList.map((item, index) => (
                      <View
                        className="tagList at-col at-col-1 at-col--auto"
                        key={`tagList_${index}`}
                      >
                        {item}
                      </View>
                    ))
                    : ""}
                </View>
                <View className="buyBox">
                  <View
                    className="at-row  at-row__align--center">
                    <View className="at-col"
                      onClick={() => {
                        this.detailAction(data);
                      }}
                    >
                      <View className="at-row">
                        <View className="at-col at-col-1 at-col--auto personPurchasePrice">
                          {formatMoney(data.salePrice)}
                        </View>
                        <View className="at-col at-col-1 at-col--auto marketPrice">
                          {formatMoney(data.marketPrice)}
                        </View>
                      </View>
                    </View>
                    <View className="at-col at-col-1 at-col--auto"
                      onClick={() => {
                        this.cartAction(data);
                        // this.detailAction(data)

                      }}
                    >
                      <View className="iconBox ">
                        加入购物车
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
