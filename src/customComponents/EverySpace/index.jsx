import { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtDivider } from "taro-ui";

import { stringIsNullOrWhiteSpace } from "@/utils/tools";

export const spaceModeCollection = {
  space: "space",
  divider: "divider"
};

class EverySpace extends PureComponent {
  render() {
    const {
      mode,
      size,
      direction,
      backgroundColor,
      margin,
      borderRadius,
      dividerProps
    } = this.props;

    if (mode === spaceModeCollection.divider) {
      return <AtDivider {...(dividerProps || {})} />;
    }

    if (size <= 0) {
      return <View />;
    }

    if (direction !== "vertical" && direction !== "horizontal") {
      return <View />;
    }

    const customStyle = {
      ...{},
      ...(stringIsNullOrWhiteSpace(backgroundColor || "")
        ? {}
        : { backgroundColor: backgroundColor }),
      ...(stringIsNullOrWhiteSpace(margin || "") ? {} : { margin: margin }),
      ...(stringIsNullOrWhiteSpace(borderRadius || "")
        ? {}
        : { borderRadius: borderRadius })
    };

    if (direction === "horizontal") {
      return (
        <View
          style={{
            ...{
              height: `${size}rpx`
            },
            ...customStyle
          }}
        />
      );
    }

    if (direction === "vertical") {
      return (
        <View
          style={{
            ...{
              height: `100%`,
              width: `${size}rpx`
            },
            ...customStyle
          }}
        />
      );
    }

    return <View />;
  }
}

EverySpace.defaultProps = {
  mode: spaceModeCollection.space,
  size: 10,
  direction: "vertical",
  backgroundColor: "",
  margin: "",
  borderRadius: "",
  dividerProps: {}
};

export default EverySpace;
