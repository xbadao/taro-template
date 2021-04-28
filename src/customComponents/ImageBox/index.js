import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";

import { defaultImg } from "../../utils/customConfig";
import { isFunction } from "../../utils/tools";
import CustomComponentBase from "../CustomComponentBase";

import "./index.scss";

class ImageBox extends CustomComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      hide: false,
      loadSuccess: false,
    };
  }

  componentDidMount() { }

  componentWillUnmount() { }

  onImageLoadSuccess() {
    const {
      showOverlay: showOverlayValue,
      loadingEffect: loadingEffectValue,
    } = this.props;

    const showOverlay = showOverlayValue || false;

    const loadingEffect = loadingEffectValue || false;

    if (loadingEffect && !showOverlay) {
      this.setState({
        loadSuccess: true,
      });
    }
  }

  onImageError() {
    const { hideWhenLoadError } = this.props;

    if (hideWhenLoadError) {
      this.setState({ hide: true });
    }
  }

  onImageClick() {
    const { clickAction } = this.props;

    if (isFunction(clickAction)) {
      clickAction();
    }
  }

  render() {
    const {
      lazyLoad,
      src,
      aspectRatio,
      imageBoxStyle,
      borderRadius: borderRadiusValue,
      imageMode,
      showMode: showModeValue,
      circle: circleValue,
      backgroundColor: backgroundColorValue,
      showOverlay: showOverlayValue,
      overlayText: overlayTextValue,
      loadingEffect: loadingEffectValue,
      decoration: decorationValue,
    } = this.props;

    const { hide, loadSuccess } = this.state;

    let aspectRatioVal = aspectRatio || 1;

    const showOverlay = showOverlayValue || false;

    const loadingEffect = loadingEffectValue || false;

    const overlayText = overlayTextValue || "";

    const decoration = decorationValue || null;

    aspectRatioVal = aspectRatioVal <= 0 ? 1 : aspectRatioVal;

    const borderRadiusDefaultStyle =
      borderRadiusValue && true ? { borderRadius: "8rpx" } : {};

    const circle = circleValue || false;

    if (circle) {
      borderRadiusDefaultStyle.borderRadius = "50%";
    }

    let defaultImage = defaultImg

    if (src) {
      defaultImage = src
    }



    const imageBoxStyleValue = {
      ...imageBoxStyle,
      ...borderRadiusDefaultStyle,
      // ...(hide ? { display: "none" } : {})
    };

    const backgroundColor =
      (backgroundColorValue || null) == null
        ? {}
        : { backgroundColor: backgroundColorValue };

    const showMode = showModeValue || "box";

    if (hide) {
      return null;
    }

    if (showMode === "loading" || showMode === "box") {
      return (
        <View className="imageBox" style={{ ...imageBoxStyleValue }}>
          {aspectRatioVal === 1 ? <View className="placeholderBox" /> : null}

          {aspectRatioVal !== 1 ? (
            <View
              className="placeholderBox"
              style={{ marginTop: `${aspectRatioVal * 100}%` }}
            />
          ) : null}

          {showOverlay ? (
            <View
              className="overlayBox overlayText"
              onClick={this.onImageClick}
            >
              <View className="at-row at-row__align--center fullHeight">
                <View className="at-col" />
                <View className="at-col at-col-1 at-col--auto">
                  <View className="overlayText">{overlayText}</View>
                </View>
                <View className="at-col" />
              </View>
            </View>
          ) : null}

          {showMode == "loading" ? <AtActivityIndicator mode="center" /> : null}

          {loadingEffect && !loadSuccess && !showOverlay && !lazyLoad ? (
            <View
              className="overlayBox overlayLoading"
              onClick={this.onImageClick}
            >
              <View className="loadingBoxInner">
                <AtActivityIndicator mode="center" />
              </View>
            </View>
          ) : null}

          {(decoration || null) != null ? (
            <View className="decorationBox" onClick={this.onImageClick}>
              <View className="decorationBoxInner">
                <View style={decoration.style}>{decoration.text}</View>
              </View>
            </View>
          ) : null}

          {showMode == "box" ? (
            <Image
              className={`imageItem image${
                loadingEffect && !showOverlay
                  ? !loadSuccess
                    ? " imageLoadAnimationInit"
                    : " imageLoadAnimation"
                  : ""
                }`}
              style={{
                ...borderRadiusDefaultStyle,
                ...backgroundColor,
              }}
              src={defaultImage}
              lazyLoad={lazyLoad || false}
              mode={imageMode}
              onLoad={() => {
                this.onImageLoadSuccess();
              }}
              onError={() => {
                this.onImageError();
              }}
              onClick={() => {
                this.onImageClick();
              }}
            />
          ) : null}
        </View>
      );
    }
    if (showMode === "contentImage") {
      return (
        <View style={{ ...imageBoxStyleValue }}>
          <Image
            className="contentImage"
            src={defaultImage}
            lazyLoad={lazyLoad || false}
            mode="widthFix"
            onError={this.onImageError}
            onClick={this.onImageClick}
          />
        </View>
      );
    }

    return null;
  }
}

export default ImageBox;
