import { connect } from "@tarojs/redux";
import { View, Image, Input } from "@tarojs/components";
import { AtInput, AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";

import { stringIsNullOrWhiteSpace, getCodeTime, setCodeTime, isFunction } from "../../utils/tools";
import Tips from "../../utils/tips";
import { appSetting, pagePathCollection } from "../../utils/customConfig";

import CustomPageCore from "../../customComponents/CustomPage/CustomPageCore";
import EverySpace from "../../customComponents/EverySpace";
import VerticalBox from "../../customComponents/VerticalBox";
import VariableView from "../../customComponents/VariableView";
import ImageBox from "../../customComponents/ImageBox";
import { modeConfig as variableViewConfig } from "../../customComponents/VariableView/variableViewConfig";

import "./index.scss";

@connect(({ entrance, remoteCheck, sms, session, global }) => ({
  entrance,
  remoteCheck,
  sms,
  session,
  global
}))
class Index extends CustomPageCore {
  config = {
    navigationBarTitleText: "注册"
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        variableViewMode: variableViewConfig.view,
        phoneNumber: "",
        captcha: "",
        password: "",
        passwordVerify: "",
        isUpCode: false,
        imageData: "",
        captchaKey: "",
        submitData: "",
        countdown: 0
      }
    };
  }

  doWhenComponentRepeatedShow() {
    this.difference();
  }

  doOtherWhenComponentCommonShow() {
    this.difference();
  }

  difference() {
    const beforeDate = getCodeTime();
    const newDate = new Date().getTime();
    const difference = parseInt((newDate - beforeDate) / 1000);

    if (difference <= 120) {
      this.timer(120 - difference)
    }
  }

  onNameChange(value) {
    this.setState({ phoneNumber: value });
  }

  onCodeChange(value) {
    this.setState({ captcha: value });
  }

  onPasswordChange(value) {
    this.setState({ password: value });
  }

  onPasswordVerifyChange(value) {
    this.setState({ passwordVerify: value });
  }

  register() {
    const { dispatch } = this.props;
    const { phoneNumber, password, passwordVerify, captcha } = this.state;

    if (stringIsNullOrWhiteSpace(phoneNumber)) {
      Tips.info("请输入手机号");
      return;
    }

    if (stringIsNullOrWhiteSpace(captcha)) {
      Tips.info("请输入验证码");
      return;
    }

    // if (stringIsNullOrWhiteSpace(password)) {
    //   Tips.info("请输入密码");
    //   return;
    // }

    // if (stringIsNullOrWhiteSpace(passwordVerify)) {
    //   Tips.info("请输入确认密码");
    //   return;
    // }

    // if (passwordVerify != password) {
    //   Tips.info("两次密码输入不一致");
    //   return;
    // }

    const submitData = {
      phone: phoneNumber,
      captcha,
      // password,
      // passwordVerify
    };

    Tips.loading("注册中，请稍后");

    this.setState({ processing: true });

    dispatch({
      type: "entrance/register",
      payload: submitData
    }).then(() => {
      const {
        entrance: { data }
      } = this.props;

      const { dataSuccess, data: { userId } } = data;

      if (dataSuccess) {
        const that = this;

        this.setCurrentUserId(userId);

        that.signInCore({}, () => {
          that.redirectToPath(`${pagePathCollection.shareDetailEntrance.path}`);
        })

        // Tips.info("注册成功", 1000, () => {
        //   that.redirectToPath(`${pagePathCollection.shareDetailEntrance.path}`);
        // });
      }

      this.setState({ processing: false, captcha: "" });

      Tips.loaded();
    });
  }

  upCode() {
    this.setState({
      captchaCode: ""
    })
    const { phoneNumber } = this.state;
    let tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (phoneNumber != null && tel.test(phoneNumber)) {
      this.codeImg(() => {
        this.setState({
          isUpCode: true
        })
      });

    } else {
      Tips.info("请输入正确的手机号")
    }
  }

  closeCode() {
    this.setState({
      isUpCode: false
    })
  }

  codeImg(callback) {
    const { dispatch } = this.props;

    this.setState({
      imageData: "http://file.panduolakeji.com/359438747.gif"
    })

    Tips.loading("加载中···");

    dispatch({
      type: "sms/refreshCaptchaKey",
      payload: {}
    }).then(() => {
      const {
        sms: { data }
      } = this.props;

      const { dataSuccess, data: d } = data;
      if (dataSuccess) {
        const that = this;


        const { image, captchaKey } = d;
        that.setState({
          imageData: image,
          captchaKey
        }, () => {

          if (isFunction(callback)) {
            callback();
          }
          Tips.loaded();
        })
      } else {

        Tips.loaded("加载失败");
      }

    });

  }

  onInputNum(e) {
    this.setState({
      captchaCode: e.detail.value
    })
  }

  timer(countdown) {
    const that = this;
    const timeOut = setTimeout(() => {
      countdown--;

      if (countdown == 0) {
        clearTimeout(timeOut);
      } else {
        that.timer(countdown)
      }
      that.setState({
        countdown
      })

    }, 1000);

  }

  getTestCode() {
    const { dispatch } = this.props;
    const { captchaKey, phoneNumber, captchaCode } = this.state;
    const submitData = { captchaKey, phone: phoneNumber, captchaCode }

    if (captchaCode.length < 4) {
      Tips.info("验证码不少于四位")

    } else {

      this.setState({
        isUpCode: false,
        captchaCode: ""
      })

      Tips.loading("发送中,请稍后");

      dispatch({
        type: "sms/sendRegisterCaptcha",
        payload: submitData
      }).then(() => {
        const {
          sms: { data }
        } = this.props;

        const { dataSuccess, } = data;

        if (dataSuccess) {
          setCodeTime(new Date().getTime());
          this.timer(120);
        }

        Tips.loaded("发送成功！");
      });
    }
  }

  renderScrollContent() {
    const {
      processing,
      windowHeight,
      phoneNumber,
      password,
      passwordVerify,
      isUpCode,
      imageData,
      countdown,
      captchaCode,
      captcha
    } = this.state;

    return (
      <View style={{ minHeight: `${windowHeight}px` }}>
        <View minHeight={`${windowHeight}px`}>
          <EverySpace direction="horizontal" size={120} />

          <View className="logo">
            <View className="logo_box">
              <ImageBox src={appSetting.logo} lazyLoad />
            </View>
          </View>
          <View className="at-row">
            <View className="at-col at-col-1"></View>
            <View className="at-col at-col-10">
              <View className="at-row">
                <View className="at-col at-col--auto" />
                <View className="at-col">
                  <VerticalBox style={{ height: "100rpx" }}>
                    <View className="at-row">
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

              <AtInput
                className="input_sign_in"
                name="phone"
                title="手机号码"
                type="phone"
                placeholder="请输入手机号"
                value={phoneNumber}
                required
                maxLength={30}
                onChange={v => {
                  this.onNameChange(v);
                }}
              />
              <AtInput
                clear
                title='验证码'
                type='number'
                maxLength='6'
                placeholder='请输入验证码'
                value={captcha}
                required
                onChange={(v) => { this.onCodeChange(v) }}
              >
                <View style={`${countdown == 0 ? "" : "color:#cccccc;"}`} onClick={() => { countdown == 0 ? this.upCode() : "" }}>{countdown == 0 ? "获取验证码" : `${countdown}s`}</View>
              </AtInput>
              {/* <AtInput
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
              <AtInput
                className="input_sign_in"
                name="passwordVerify"
                title="确认密码"
                type="password"
                placeholder="确认和密码输入一致"
                value={passwordVerify}
                required
                maxLength={30}
                onChange={v => {
                  this.onPasswordVerifyChange(v);
                }}
              /> */}
              <EverySpace direction="horizontal" size={60} />

              <AtButton
                loading={processing}
                disabled={processing}
                type="primary"
                onClick={() => {
                  this.register();
                }}
              >
                注册
              </AtButton>
            </View>
            <View className="at-col at-col-1"></View>
          </View>
        </View>
        <AtModal isOpened={isUpCode}>
          <AtModalHeader>验证码</AtModalHeader>
          <AtModalContent>
            <View className="at-row at-row__align--center">
              <View className="at-col at-col-1 at-col--auto">
                <Image className="codeImage" src={`data:image/png;base64,${imageData}`} onClick={() => {
                  this.codeImg();
                }} />
              </View>
              <View className="at-col">
                <Input className="inputCode" type='number' onInput={(e) => { this.onInputNum(e) }} placeholder='请输入验证码' maxlength='4' value={captchaCode} />
              </View>
            </View>
          </AtModalContent>
          <AtModalAction> <Button onClick={() => { this.closeCode() }}>取消</Button> <Button onClick={() => { this.getTestCode() }}>确定</Button> </AtModalAction>
        </AtModal>
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
