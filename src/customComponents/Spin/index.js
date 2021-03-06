import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";

import VerticalBox from "../VerticalBox";

import "./index.scss";

const defaultSpinColor = "#13CE66";
const defaultSpinSize = 32;

function Spin(props) {
  const {
    spin: spinValue,
    text: textValue,
    showLoading: showLoadingValue,
    fullscreen: fullscreenValue,
    spinColor: spinColorValue,
    spinSize: spinSizeValue
  } = props;

  const spin = spinValue || false;
  const text = textValue || "";
  const showLoading = showLoadingValue || false;
  const fullscreen = fullscreenValue || false;
  const spinColor = spinColorValue || defaultSpinColor;
  const spinSize = spinSizeValue || defaultSpinSize;

  const handleTouchMove = e => {
    if (fullscreen) {
      e.stopPropagation();
    }
  };

  return (
    <View className="spin_containor">
      <View
        className={`spin_overlay_box ${
          spin ? "spin_overlay_box_show" : "spin_overlay_box_hide"
          }`}
        style={{
          width: fullscreen ? "100vw" : "100%",
          height: fullscreen ? "100vh" : "100%",
          transition: spin ? null : "z-index 0.01s ease 0.2s"
        }}
      >
        <View
          className={`spin_overlay ${
            spin ? "spin_overlay_show" : "spin_overlay_hide"
            }`}
          style={{
            width: fullscreen ? "100vw" : "100%",
            height: fullscreen ? "100vh" : "100%",
            transition: "opacity 0.2s"
          }}
          onTouchMove={handleTouchMove}
        >
          <View style={{ height: "100%" }}>
            <View
              className="at-row at-row__align--center"
              style={{ height: "100%" }}
            >
              <View style="height:100%" className="at-col at-col-1" />
              <View className="at-col  at-col-10" style={{ height: "120rpx" }}>
                <View>
                  <VerticalBox
                    style={{ height: "100rpx" }}
                    alignJustify="center"
                  >
                    {showLoading ? (
                      <AtActivityIndicator
                        isOpened={spin}
                        content={text}
                        color={spinColor}
                        size={spinSize}
                      ></AtActivityIndicator>
                    ) : (
                        <View className="content_box">{text}</View>
                      )}
                  </VerticalBox>
                </View>
              </View>
              <View style="height:100%" className="at-col at-col-1" />
            </View>
          </View>
        </View>
      </View>

      {props.children}
    </View>
  );
}

Spin.defaultProps = {
  spin: false,
  fullscreen: false,
  text: "",
  showLoading: true,
  spinColor: defaultSpinColor,
  spinSize: defaultSpinSize
};

export default Spin;
