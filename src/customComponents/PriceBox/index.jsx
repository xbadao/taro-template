import Taro, { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";

import { formatMoney, isMoney } from "../../utils/tools";

class PriceBox extends PureComponent {
  render() {
    const {
      price,
      generalStyle,
      prefix,
      prefixStyle,
      integerPartStyle,
      pointStyle,
      decimalPartStyle
    } = this.props;

    const commonStyle = {
      ...(generalStyle || {}),
      ...{
        verticalAlign: "bottom"
      }
    };

    if (!isMoney(price)) {
      return "";
    }

    const money = formatMoney(price || 0, 2, "");

    const list = money.split(".");

    const integer = list[0];
    const decimal = list[1];

    return (
      <View style="display:inline">
        <View
          className="priceBox"
          style={{
            display: "flex",
            alignItems: "baseline",
            // justifyContent: "flex-end",
            lineHeight: 1
          }}
        >
          <View style={{ ...commonStyle, ...(prefixStyle || {}) }}>
            {prefix}
          </View>
          <View style={{ ...commonStyle, ...(integerPartStyle || {}) }}>
            {integer}
          </View>
          <View style={{ ...commonStyle, ...(pointStyle || {}) }}>.</View>
          <View style={{ ...commonStyle, ...(decimalPartStyle || {}) }}>
            {decimal}
          </View>
        </View>
      </View>
    );
  }
}

PriceBox.defaultProps = {
  price: 0,
  prefix: "",
  generalStyle: {},
  prefixStyle: {},
  integerPartStyle: {},
  pointStyle: {},
  decimalPartStyle: {}
};

export default PriceBox;
