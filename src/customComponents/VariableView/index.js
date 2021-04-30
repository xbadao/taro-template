import Taro from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import {
  AtMessage,
  AtModal,
  AtModalContent,
  // AtFloatLayout
} from "taro-ui";

import { isEqual, isFunction, recordLog } from "../../utils/tools";
import CustomComponentBase from "../CustomComponentBase";
import CheckAuthorizationUserInfo from "../CheckAuthorizationUserInfo";
import ImageBox from "../ImageBox";

import { modeConfig } from "./variableViewConfig";

import "./index.scss";

const modeSet = new Set([modeConfig.view, modeConfig.scrollView]);

class VariableView extends CustomComponentBase {
  //如果babel设置为es6的转码方式，会报错，因为定义静态属性不属于es6，而在es7的草案中。ES6的class中只有静态方法，没有静态属性。
  static defaultProps = {
    mode: modeConfig.view,
  };

  refreshBoxAnimation = null;
  refreshBoxPreloadAnimation = null;
  refreshBoxInitTop = -100;
  touchStartY = 0;
  touchEndY = 0;
  prepareRefresh = false;
  refreshBoxHeight = 0;
  touchMoveMaxY = 80;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      renderMode: modeConfig.view,
      isAtTop: false,
      touchToRefresh: false,
      refreshBoxAnimationData: null,
      refreshBoxPreloadAnimationData: null,
      showRefreshBackgroundBox: false,
    };
  }

  componentDidMount() {
    const { mode } = this.props;

    if (modeSet.has(mode)) {
      if (mode === modeConfig.scrollView) {
        this.refreshBoxAnimation = Taro.createAnimation({
          duration: 300,
          timingFunction: "linear",
        });

        this.refreshBoxPreloadAnimation = Taro.createAnimation({
          duration: 300,
          timingFunction: "linear",
        });

        this.setState(
          {
            renderMode: mode,
            refreshBoxAnimationData: this.refreshBoxAnimation.export(),
            refreshBoxPreloadAnimationData: this.refreshBoxPreloadAnimation.export(),
          },
          () => {
            const that = this;
            const query = Taro.createSelectorQuery().in(that.$scope);

            const node = query.select(".refreshBox");

            node
              .boundingClientRect((rect) => {
                if (rect != null) {
                  const { height: refreshBoxHeight } = rect;
                  that.refreshBoxHeight = refreshBoxHeight;
                  that.touchMoveMaxY = that.touchMoveMaxY + refreshBoxHeight;
                }
              })
              .exec();
          }
        );
      } else {
        this.setState({
          renderMode: mode,
        });
      }
    } else {
      const { renderMode: modeCurrent } = this.state;

      if (modeCurrent !== modeConfig.view) {
        this.setState({
          renderMode: modeConfig.view,
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isEqualProps = isEqual(
      {
        showAuthorizationUserInfo: this.props.showAuthorizationUserInfo,
        scrollHeight: this.props.scrollHeight,
      },
      {
        showAuthorizationUserInfo: nextProps.showAuthorizationUserInfo,
        scrollHeight: nextProps.scrollHeight,
      }
    );

    if (!isEqualProps) {
      return true;
    }

    const isEqualState = isEqual(this.state, nextState);

    if (!isEqualState) {
      return true;
    }

    return false;
  }

  onViewTouchStart(e) {
    const { enablePullDownRefresh: enablePullDownRefreshValue } = this.props;

    const enablePullDownRefresh = enablePullDownRefreshValue || false;

    if (!enablePullDownRefresh) {
      return;
    }

    const query = Taro.createSelectorQuery().in(this.$scope);

    const node = query.select(".scrollViewMain");

    node
      .scrollOffset((rect) => {
        const { scrollTop } = rect;

        if (scrollTop === 0) {
          this.prepareRefresh = true;

          this.touchStartY = e.touches[0].pageY;
        }
      })
      .exec();
  }

  onViewTouchMove(e) {
    const { enablePullDownRefresh: enablePullDownRefreshValue } = this.props;

    const enablePullDownRefresh = enablePullDownRefreshValue || false;

    if (!enablePullDownRefresh) {
      return;
    }

    if (this.prepareRefresh) {
      this.touchEndY = e.touches[0].pageY;

      let moveY = this.touchEndY - this.touchStartY;

      if (moveY > 0) {
        const { showRefreshBackgroundBox } = this.state;

        if (!showRefreshBackgroundBox) {
          this.setState({ showRefreshBackgroundBox: true });
        }
      }

      moveY = moveY > this.touchMoveMaxY ? this.touchMoveMaxY : moveY;

      if (moveY === this.touchMoveMaxY) {
        this.setState({ needRefresh: true });
      }

      if (moveY < this.touchMoveMaxY) {
        this.setState({ needRefresh: false });
      }

      if (this.refreshBoxAnimation != null) {
        this.refreshBoxAnimation.translateY(moveY).step();
        this.refreshBoxPreloadAnimation
          .rotate((moveY / this.touchMoveMaxY) * 360)
          .step();

        this.setState({
          refreshBoxAnimationData: this.refreshBoxAnimation.export(),
          refreshBoxPreloadAnimationData: this.refreshBoxPreloadAnimation.export(),
        });
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  onViewTouchCancel(e) {
    const { enablePullDownRefresh: enablePullDownRefreshValue } = this.props;

    const enablePullDownRefresh = enablePullDownRefreshValue || false;

    if (!enablePullDownRefresh) {
      return;
    }

    if (this.prepareRefresh) {
      if (this.refreshBoxAnimation != null) {
        this.refreshBoxAnimation.translateY(0).step();
        this.refreshBoxPreloadAnimation.rotate(0).step();

        this.setState({
          showRefreshBackgroundBox: false,
          refreshBoxAnimationData: this.refreshBoxAnimation.export(),
          refreshBoxPreloadAnimationData: this.refreshBoxPreloadAnimation.export(),
        });
      } else {
        this.setState({ showRefreshBackgroundBox: false });
      }

      this.prepareRefresh = false;
    }
  }

  // eslint-disable-next-line no-unused-vars
  onViewTouchEnd(e) {
    const { enablePullDownRefresh: enablePullDownRefreshValue } = this.props;

    const enablePullDownRefresh = enablePullDownRefreshValue || false;

    if (!enablePullDownRefresh) {
      return;
    }

    if (this.prepareRefresh) {
      const { needRefresh } = this.state;

      if (needRefresh) {
        const { onReload } = this.props;

        if (isFunction(onReload)) {
          onReload();

          this.setState({ needRefresh: false });
        }
      }

      if (this.refreshBoxAnimation != null) {
        this.refreshBoxAnimation.translateY(0).step();
        this.refreshBoxPreloadAnimation.rotate(0).step();

        this.setState({
          showRefreshBackgroundBox: false,
          refreshBoxAnimationData: this.refreshBoxAnimation.export(),
          refreshBoxPreloadAnimationData: this.refreshBoxPreloadAnimation.export(),
        });
      } else {
        this.setState({ showRefreshBackgroundBox: false });
      }

      this.prepareRefresh = false;
    }
  }

  onScrollToLower() {
    const { onLoadMore } = this.props;

    if (isFunction(onLoadMore)) {
      onLoadMore();
    }
  }


  render() {
    const {
      showAuthorizationUserInfo,
      scrollHeight,
      prepareGetAuthorizationUserInfo,
      afterGetUserInfo,
      afterCheckAuthorizationUserInfoClose,
    } = this.props;

    const {
      renderMode,
      scrollTopTarget,
      refreshBoxAnimationData,
      refreshBoxPreloadAnimationData,
      // showRefreshBackgroundBox,
      needRefresh,
    } = this.state;

    const showAuthorizationUserInfoValue = showAuthorizationUserInfo || false;

    recordLog(
      `VariableView render showAuthorizationUserInfoValue ${showAuthorizationUserInfoValue}`
    );

    if (renderMode === modeConfig.scrollView) {
      return (
        <View
          className="scrollViewContainor"
          style={{
            height: `${scrollHeight || 900}px`,
          }}
          onTouchStart={this.onViewTouchStart}
          onTouchMove={this.onViewTouchMove}
          onTouchCancel={this.onViewTouchCancel}
          onTouchEnd={this.onViewTouchEnd}
        >
          <AtMessage />

          <View className="refreshBox" animation={refreshBoxAnimationData}>
            <View className="pullRefreshBox">
              <View className="at-row at-row__align--center prepareRefreshBox">
                <View className="at-col emptyBox" />

                {!needRefresh ? (
                  <View className="at-col at-col-1 at-col--auto info">
                    {/* <View className="at-icon at-icon-arrow-down" />
                    下拉刷新 */}
                    <View
                      className="iconBox preload"
                      animation={refreshBoxPreloadAnimationData}
                    >
                      <ImageBox src="http://file.panduolakeji.com/a7be7d06-71ca-492d-ab66-99995de43f62.png" />
                    </View>
                  </View>
                ) : null}

                {needRefresh ? (
                  <View className="at-col at-col-1 at-col--auto info">
                    {/* <View className="at-icon at-icon-reload" />
                    松开刷新 */}
                    <View className="iconBox reload">
                      <ImageBox src="http://file.panduolakeji.com/3b528218-29d9-4130-8ae9-49c4e0adeefa.png" />
                    </View>
                  </View>
                ) : null}

                <View className="at-col emptyBox" />
              </View>
            </View>
          </View>

          {/* {showRefreshBackgroundBox ? (
            <View className="refreshBackground" />
          ) : null} */}

          <ScrollView
            className="scrollViewMain"
            scrollY
            scrollTop={scrollTopTarget}
            lowerThreshold={80}
            onScrollToLower={this.onScrollToLower}
          >
            <View className="containor selector">{this.props.children}</View>
          </ScrollView>
          {showAuthorizationUserInfoValue ? (
            <CheckAuthorizationUserInfo
              onPrepareGetAuthorizationUserInfo={
                prepareGetAuthorizationUserInfo
              }
              afterGetUserInfo={afterGetUserInfo}
              afterClose={afterCheckAuthorizationUserInfoClose}
            />
          ) : null}
        </View>
      );
    }

    return (
      <View className="containor">
        <AtMessage />

        {this.props.children}
        {showAuthorizationUserInfoValue ? (
          <CheckAuthorizationUserInfo
            onPrepareGetAuthorizationUserInfo={prepareGetAuthorizationUserInfo}
            afterGetUserInfo={afterGetUserInfo}
            afterClose={afterCheckAuthorizationUserInfoClose}
          />
        ) : null}
      </View>
    );
  }
}

export default VariableView;
