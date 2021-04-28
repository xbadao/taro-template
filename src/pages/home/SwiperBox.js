import Taro from "@tarojs/taro";
import { View, Swiper, SwiperItem } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";

import { isFunction } from "../../utils/tools";
import CustomComponentBase from "../../customComponents/CustomComponentBase";
import ImageBox from "../../customComponents/ImageBox";

import "./SwiperBox.scss";

class SwiperBox extends CustomComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      list: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { listData } = this.props;
    const { listData: listDataNext } = nextProps;

    if ((listData || []).length !== (listDataNext || []).length) {
      this.setState({
        current: 0,
        list: listDataNext || [],
      });
    }
  }

  onSwiperChange(e) {
    const {
      detail: { current: currentIndex },
    } = e;

    this.setState({ current: currentIndex });
  }

  itemClickAction(item) {
    const { afterItemClick } = this.props;

    if (isFunction(afterItemClick)) {
      afterItemClick(item);
    }
  }

  render() {
    const { loadSuccess, listData } = this.props;
    const { current, list } = this.state;

    return (
      <Swiper
        indicatorColor="fff"
        indicatorActiveColor="#fff"
        circular
        indicatorDots
        autoplay
        current={current}
        className="advertisingBoxContainor"
        onChange={(e) => {
          this.onSwiperChange(e);
        }}
      >
        {loadSuccess ? null : (
          <SwiperItem key="-10000">
            <View className="advertisingBox">
              <AtActivityIndicator mode="center" />
            </View>
          </SwiperItem>
        )}

        {loadSuccess
          ? (listData || []).map((item) => (
            <SwiperItem
              key={`${item.key}`}
              className="advertisingBoxContainor"
            >
              <View
                className="advertisingBox"
                onClick={() => {
                  this.itemClickAction(item);
                }}
              >
                <ImageBox src={item.imageUrl} loadingEffect />
              </View>
            </SwiperItem>
          ))
          : null}
      </Swiper>
    );
  }
}

export default SwiperBox;
