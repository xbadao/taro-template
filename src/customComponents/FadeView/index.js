import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

function FadeView(props) {
  const { show: showValue } = props;

  const show = showValue || false;

  // eslint-disable-next-line no-unused-vars
  const handleTouchMove = e => {
    // eslint-disable-next-line no-undef
    if (fullscreen) {
      e.stopPropagation();
    }
  };

  return (
    <View
      className={`fade_view_containor ${
        show ? "fade_view_show" : "fade_view_hide"
        }`}
      style={{
        width: "100%",
        height: "100%",
        transition: "opacity 0.2s"
      }}
    >
      {props.children}
    </View>
  );
}

FadeView.defaultProps = {
  show: true
};

export default FadeView;
