import Taro, { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

class VerticalBox extends PureComponent {
  render() {
    const { style, align, alignJustify } = this.props;

    let alignStyle = "center";

    switch (align) {
      case "top":
        alignStyle = "flex-start";
        break;

      case "center":
        alignStyle = "center";
        break;

      case "bottom":
        alignStyle = "flex-end";
        break;

      default:
        alignStyle = "center";
        break;
    }

    let alignJustifyStyle = "flex-start";

    switch (alignJustify) {
      case "start":
        alignJustifyStyle = "flex-start";
        break;

      case "center":
        alignJustifyStyle = "center";
        break;

      case "end":
        alignJustifyStyle = "flex-end";
        break;

      case "between":
        alignJustifyStyle = "space-between";
        break;

      case "around":
        alignJustifyStyle = "space-around";
        break;

      default:
        alignJustifyStyle = "flex-start";
        break;
    }

    const flexStyle = {
      ...(style || {}),
      ...{ alignItems: alignStyle, justifyContent: alignJustifyStyle }
    };

    return (
      <View className="centerBox">
        <View className="flexBox" style={flexStyle}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

VerticalBox.defaultProps = {
  fitWidth: true,
  style: {},
  align: "center",
  alignJustify: "flex-start"
};

export default VerticalBox;
