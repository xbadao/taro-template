import { connect } from "@tarojs/redux";
import { View } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";

import Tips from "../../utils/tips";
import { appSetting, pagePathCollection } from "../../utils/customConfig";
import {
  setToken,
  setCity,
  setNeedSyncInfo,
  stringIsNullOrWhiteSpace
} from "../../utils/tools";
import CustomPageCore from "../../customComponents/CustomPage/CustomPageCore";
import EverySpace from "../../customComponents/EverySpace";
import VerticalBox from "../../customComponents/VerticalBox";
import VariableView from "../../customComponents/VariableView";
import ImageBox from "../../customComponents/ImageBox";
import { modeConfig as variableViewConfig } from "../../customComponents/VariableView/variableViewConfig";

import "./index.scss";

@connect(({ entrance, remoteCheck, session, global }) => ({
  entrance,
  remoteCheck,
  session,
  global
}))
class Index extends CustomPageCore {
  config = {
    navigationBarTitleText: "登录"
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        variableViewMode: variableViewConfig.view,
        loginName: "",
        password: ""
      }
    };
  }

  onNameChange(value) {
    this.setState({ loginName: value });
  }

  onPasswordChange(value) {
    this.setState({ password: value });
  }

  login() {
    const { dispatch } = this.props;
    const { loginName, password } = this.state;

    if (stringIsNullOrWhiteSpace(loginName)) {
      Tips.info("请输入登录名");
      return;
    }

    if (stringIsNullOrWhiteSpace(password)) {
      Tips.info("请输入密码");
      return;
    }

    const submitData = {
      loginName: loginName + "@qyqx.com",
      password
    };

    Tips.loading("登录中，请稍后");

    this.setState({ processing: true });

    dispatch({
      type: "entrance/sign",
      payload: submitData
    }).then(() => {
      const {
        entrance: { data }
      } = this.props;

      const { dataSuccess } = data;

      if (dataSuccess) {
        const {
          data: {
            currentAuthority,
            token: tokenValue,
            areaFlag,
            city,
            needSupplementInfo
          }
        } = data;

        setToken(tokenValue);
        setCity(city);
        setNeedSyncInfo(needSupplementInfo);

        const that = this;

        Tips.info("登录成功", 1000, () => {
          that.setPreloadTargetParams(
            {
              url: `${pagePathCollection.merchantTransportPageList.path}`
            },
            () => {
              that.redirectToPath(`${pagePathCollection.preload.path}`);
            }
          );
        });
      }

      this.setState({ processing: false });

      Tips.loaded();
    });
  }

  renderScrollContent() {
    const { processing, windowHeight, loginName, password } = this.state;

    return (
      <View style={{ minHeight: `${windowHeight}px` }}>
        <View minHeight={`${windowHeight}px`}>
          <EverySpace direction="horizontal" size={300} />

          <View className="at-row">
            <View className="at-col at-col-1"></View>
            <View className="at-col at-col-10">
              <View className="at-row">
                <View className="at-col at-col--auto" />
                <View className="at-col">
                  <VerticalBox style={{ height: "100rpx" }}>
                    <View className="at-row">
                      <View className="at-col at-col-1 at-col--auto">
                        <View className="logo_box">
                          <ImageBox src={appSetting.logo} lazyLoad />
                        </View>
                      </View>
                      <View className="at-col overflowXHidden">
                        <VerticalBox style={{ height: "100rpx" }}>
                          <View className="title">{appSetting.appName}</View>
                        </VerticalBox>
                      </View>
                    </View>
                  </VerticalBox>
                </View>
                <View className="at-col at-col--auto" />
              </View>

              <EverySpace direction="horizontal" size={40} />

              <View className="at-row at-row__align--center">
                <View className="at-col at-col-9">
                  <AtInput
                    className="input_sign_in"
                    name="loginName"
                    title="用户名"
                    type="text"
                    placeholder="请输入用户名"
                    value={loginName}
                    required
                    maxLength={30}
                    onChange={v => {
                      this.onNameChange(v);
                    }}
                  />
                </View>
              </View>
              <AtInput
                className="input_sign_in"
                name="password"
                title="密码"
                type="password"
                placeholder="请输入密码，不少于6位"
                value={password}
                required
                maxLength={30}
                onChange={v => {
                  this.onPasswordChange(v);
                }}
              />

              <EverySpace direction="horizontal" size={60} />

              <AtButton
                loading={processing}
                disabled={processing}
                type="primary"
                onClick={() => {
                  this.login();
                }}
              >
                登录
              </AtButton>
            </View>
            <View className="at-col at-col-1"></View>
          </View>
          <View
            className="register"
            onClick={() => {
              this.goToPath(pagePathCollection.register.path);
            }}
          >
            注册
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { variableViewMode, scrollHeight } = this.state;

    return (
      <View className="mainContainor">
        <VariableView mode={variableViewMode} scrollHeight={scrollHeight}>
          <View>{this.renderScrollContent()}</View>
        </VariableView>
      </View>
    );
  }
}

export default Index;
