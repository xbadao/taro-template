import Taro from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import {
  AtCurtain,
  //  AtRate
  AtActionSheet,
  AtActionSheetItem
} from "taro-ui";

// import CustomPageCore from "../../customComponents/CustomPage/CustomPageCore";
import { formatMoney, getSystemInfo } from "../../utils/tools";
import Tips from "../../utils/tips";
import CustomPageCore from "../../customComponents/CustomPage/CustomPageCore";
import VariableView from "../../customComponents/VariableView";
import NavBar from "../../customComponents/navbar_lxy";
import Spin from "../../customComponents/Spin";
import ImageBox from "../../customComponents/ImageBox";
import { modeConfig as variableViewConfig } from "../../customComponents/VariableView/variableViewConfig";
import {
  pagePathCollection,
  checkLoginResult,
} from "../../utils/customConfig";

import ItemBox from "./ItemBox";
import ItemServiceBox from "./ItemServiceBox";
import SearchBox from "./SearchBox";

import "./index.scss";

const orderNavList = [
  {
    image: "http://file.panduolakeji.com/833148900.png",
    value: "待配送",
    type: "page",
    path: ""
  },
  {
    image: "http://file.panduolakeji.com/298622278.png",
    value: "配送中",
    type: "page",
    path: ""
  },
  {
    image: "http://file.panduolakeji.com/532672292.png",
    value: "已完成",
    type: "page",
    path: ""
  },
  {
    image: "http://file.panduolakeji.com/330584182.png",
    value: "售后/退款",
    type: "page",
    path: ""
    // type: "page",
    // path: `${pagePathCollection.reimburseApply.path}`,
  }
];

const actionNavList = [
  {
    key: "cart",
    image: "http://file.panduolakeji.com/1049112235.png",
    value: "发票信息",
    type: "wait",
    tabName: "cart",
    // path: "",
    text: "即将开放，敬请期待"
  },
  // {
  //   key: "alliance",
  //   image: "http://file.panduolakeji.com/1200521353.png",
  //   value: "子账号管理",
  //   tabName: "",
  //   type: ""
  //   // path: "",
  // },

  // {
  //   key: "supplier",
  //   image: "http://file.panduolakeji.com/1087247203.png",
  //   value: "成为供货商",
  //   tabName: "secondService",
  //   type: "service"
  // },
  {
    key: "service",
    image: "http://file.panduolakeji.com/1520694352.png",
    value: "客服与帮助",
    tabName: "firstService",
    type: "service"
    // text: "即将开放，敬请期待哦",
  },
  {
    key: "",
    image: "http://file.panduolakeji.com/101397986.png",
    value: "意见反馈",
    tabName: "",
    type: "wait",
    text: "即将开放，敬请期待"
  },
  {
    key: "setting",
    image: "http://file.panduolakeji.com/948419475.png",
    value: "收货地址",
    type: "page",
    path: ""
  },
  {
    key: "setting",
    image: "http://file.panduolakeji.com/1689090223.png",
    value: "设置",
    type: "page",
    path: ""
  }
  // {
  //   image: "http://file.panduolakeji.com/1695021591.png",
  //   value: "售后记录",
  //   type: "page",
  //   path: `${pagePathCollection.recordAfterSales.path}?indexFox=0`
  // }
];

@connect(({ customer, entrance, remoteCheck, session, global }) => ({
  customer,
  entrance,
  remoteCheck,
  session,
  global
}))
class Cart extends CustomPageCore {
  config = {
    navigationBarTitleText: "个人中心",
    enablePullDownRefresh: true,
    navigationStyle: "custom",
    backgroundColor: "#fff"
  };

  boxAnimation = null;

  constructor(props) {
    super(props);

    const info = this.getSystemInfoSync();

    const { windowHeight } = info;

    this.state = {
      ...this.state,
      ...{
        variableViewMode: variableViewConfig.view,
        scrollHeight: windowHeight,
        windowHeight: windowHeight,
        loadApiPath: "customer/getCurrentInfo",
        balanceNum: 0,
        isOpened: false,
        score: "",
        customerService: false,
        listCall: [],
        category: 0
      }
    };
  }

  adjustPageWhenDidMount() {
    Taro.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: "",
      animation: {
        duration: 400,
        timingFunc: "easeIn"
      }
    });
  }

  doWhenComponentFirstShow() {

  }


  getApiData = props => {
    const {
      customer: { data }
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess(metaData, metaListData, extra, data) {
    const { needSyncInfo } = metaData;
  }

  afterFirstLoadSuccess() { }

  afterReloadSuccess() {
    const { variableViewMode } = this.state;

    if (variableViewMode == variableViewConfig.view) {
      this.stopPullDownRefresh();
      this.hideNavigationBarLoading();
    }

    this.showSuccess("已经刷新完了哦", 800);
  }

  syncUserInfo(e) {
    const { dispatch } = this.props;

    this.setState({ showAuthorizationUserInfo: false });

    Tips.loading("同步用户信息");

    const {
      detail: {
        userInfo: { avatarUrl, nickName, gender, country, city, province }
      }
    } = e;

    dispatch({
      type: "customer/syncInfo",
      payload: { avatarUrl, nickName, gender, country, city, province }
    }).then(() => {
      const {
        customer: { data }
      } = this.props;

      const { dataSuccess, data: metaData } = data;

      if (dataSuccess) {
        this.setState({ metaData })
      }

      Tips.loaded();
    });
  }

  onPullDownRefresh() {
    const { variableViewMode } = this.state;

    if (variableViewMode == variableViewConfig.view) {
      this.showNavigationBarLoading();
      this.reloadData();
    }
  }


  showModel() {
    const signInResult = this.getSignInResult();

    if (signInResult === checkLoginResult.fail) {
      const { showAuthorizationUserInfo } = this.state;

      if (!showAuthorizationUserInfo) {
        this.setState({ showAuthorizationUserInfo: true });
      }
    }
  }


  onClose() {
    this.setState({
      isOpened: false
    });
  }


  renderScrollContent() {
    // const globalLoadSuccess = this.getGlobalSuccess();

    const {
      firstLoadSuccess,
      windowHeight,
      metaData,
      balanceNum,
      isOpened,
      score,
      customerService,
      listCall,
      category
    } = this.state;

    const globalSystemInfo = getSystemInfo();
    const { navBarHeight, navBarExtendHeight } = globalSystemInfo;

    let customer = "";

    if ((metaData || "") != "") {
      customer = metaData.customer;
    }

    const signInResult = this.getSignInResult();


    const actionNavListData = (actionNavList || []).map(o => {
      const d = o;

      return d;
    });

    const listData = [
      ...actionNavListData,
      ...(metaData != null
        ? [
          {
            key: "integralList",
            image: "http://file.yurukeji.com.cn/1733106808.png",
            value: "硒米商城",
            type: "page",
            path: ""
          },
          {
            key: "integralChangeRecord",
            image: "http://file.yurukeji.com.cn/362601067.png",
            value: "兑换记录",
            type: "page",
            path: ""
          }
        ]
        : ""),];

    return (
      <View className="customerMainContainor">
        <View
          className="customerBox"
          style={{ minHeight: `${windowHeight}px` }}
        >
          {firstLoadSuccess && metaData ? (
            <View className="customerBoxBody">
              <View className="nav">
                <NavBar
                  title=""
                  background="rgba(0,0,0,0)"
                  color="#000"
                  iconTheme="white"
                  extClass="lxy-navbar-extclass"
                  renderLeft={<View className="headTitle">个人中心</View>}
                />
              </View>
              <View className="headMain"
                style={`padding-top:${navBarHeight + navBarExtendHeight}px`}
              >

                <View className="headBottom">
                  <View className="messagePerson">
                    <View className="infoBox">
                      <View className="at-row at-row__align--center">
                        <View className="at-col at-col-1 at-col--auto">
                          <View className="avatarBox">
                            <ImageBox
                              imageBoxStyle={{ borderRadius: "20rpx" }}
                              src={
                                metaData == null
                                  ? "http://file.panduolakeji.com/fe9f38c8-1c2b-4643-a9c6-32ba2e7c33b9.png"
                                  : metaData.avatar
                              }
                            />
                            {/* <View className="crown">
                              <ImageBox src="http://file.panduolakeji.com/202126067.png" />
                            </View> */}
                          </View>
                        </View>
                        <View className="at-col rightBox">
                          <View className="nameBox">
                            <View className="at-row at-row__align--center">
                              <View className="at-col">
                                <View
                                  className="nameText"
                                  onClick={() => {
                                    this.showModel();
                                  }}
                                >
                                  <View>
                                    {metaData == null
                                      ? "点击登录"
                                      : metaData.nickname}
                                  </View>
                                </View>
                                <View className="lookAddress">
                                  账号：{metaData.id}
                                </View>
                              </View>
                              <View
                                className="at-col at-col-1 at-col--auto"
                                onClick={this.handleChange.bind(this)}
                              >
                                <View className="rightIconBox">
                                  <Image src="http://file.panduolakeji.com/2036011571.png" />
                                </View>
                              </View>
                            </View>
                          </View>
                          <View className="identity at-row at-row__justify--between at-row__align--center">
                            <View className="at-col at-col-1 at-col--auto">
                              <View className="at-row at-row__align--center">
                                <View className="identityLeft at-col at-col-1 at-col--auto">
                                  <Image src="http://file.panduolakeji.com/1980262283.png" />
                                </View>
                                <View className="identityRight at-col at-col-1 at-col--auto">
                                  普通认证
                                </View>
                              </View>
                            </View>
                            <View className="at-col at-col-1 at-col--auto">
                              <View className="at-row at-row__align--center">
                                <View className="identityLeft at-col at-col-1 at-col--auto">
                                  <Image src="http://qnfile.sanleyouyou.com/2141347812.png" />
                                </View>
                                <View className="identityRight at-col at-col-1 at-col--auto">
                                  初级会员
                                </View>
                              </View>
                            </View>
                            <View className="at-col at-col-1 at-col--auto">
                              <View className="at-row at-row__align--center">
                                <View className="identityLeft at-col at-col-1 at-col--auto">
                                  <Image src="http://file.panduolakeji.com/1316914633.png" />
                                </View>
                                <View className="identityRight at-col at-col-1 at-col--auto">
                                  成为合伙人
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="memberLogo">
                  <View className="interestsFrame">
                    <View className="interests at-row at-row__align--center at-row__justify--center">
                      <View className="at-col at-col-1 interestsLeft">
                        <Image src="http://file.panduolakeji.com/583659742.png" />
                      </View>
                      <View className="at-col at-col-1 at-col--auto brandDescription">
                        成为合伙人
                    </View>
                    </View>
                    {/* <View className="at-col at-col-1 at-col--auto">
                      <View className="at-row at-row__align--center">
                        <View className="at-col at-col-1 at-col--auto">
                          <View className="interestsLeft">
                            <ImageBox src="http://file.panduolakeji.com/583659742.png" />
                          </View>
                        </View>
                        <View className="at-col at-col-1 at-col--auto companyName">
                          三易云农
                        </View>
                      </View>
                    </View>
                    <View className="at-col at-col-1 at-col--auto">
                      <View className="interestsRight at-row at-row__align--center">
                        <View className="exclusive at-col at-col at-col-1 at-col--auto">
                          直采直供
                        </View>
                      </View>
                    </View> */}
                  </View>
                  <View className="hideBlock">

                  </View>
                </View>
              </View>
              <View className="content">
                <View className="headMessage">
                  <View className="at-row at-row__justify--between">
                    <View
                      className="at-col at-col-3 reLeft"
                      onClick={() => {
                        if (signInResult === checkLoginResult.fail) {
                          this.showModel();

                          return;
                        }

                        this.goToPath(
                          ""
                        );
                      }}
                    >
                      <View className="dataMoney">
                        <Image src="http://file.panduolakeji.com/2093983826.png" />
                      </View>
                      <View className="designation">我的钱包</View>
                    </View>
                    <View
                      className="at-col at-col-3 reRight"
                      onClick={() => {
                        if (signInResult === checkLoginResult.fail) {
                          this.showModel();

                          return;
                        }

                        // this.goToPath(pagePathCollection.balance.path);
                        this.goToPath("");
                      }}
                    >
                      <View className="data">
                        {metaData == null
                          ? "0"
                          : metaData.score != null
                            ? metaData.score
                            : "0"}
                      </View>
                      <View className="designation">硒米</View>
                    </View>
                    <View
                      className="at-col at-col-3 reRight"
                      onClick={() => {
                        if (signInResult === checkLoginResult.fail) {
                          this.showModel();

                          return;
                        }

                        // this.goToPath(pagePathCollection.balance.path);
                        this.goToPath("");
                      }}
                    >
                      <View className="data">
                        {formatMoney(
                          metaData == null
                            ? 0
                            : balanceNum != 0
                              ? balanceNum
                              : metaData.balance,
                          2,
                          ""
                        )}
                      </View>
                      <View className="designation">余额</View>
                    </View>
                    <View
                      className="at-col at-col-3 reRight"
                      onClick={() => {
                        if (signInResult === checkLoginResult.fail) {
                          this.showModel();

                          return;
                        }

                        this.goToPath("");
                      }}
                    >
                      <View className="data">
                        <View className="userCouponNum">
                          {metaData == null
                            ? 0
                            : metaData.userCouponTotalCount
                              ? metaData.userCouponTotalCount
                              : 0}
                        </View>
                      </View>
                      <View className="designation">优惠券</View>
                    </View>
                  </View>
                </View>
                <View className="divideBox" />
                <View key className="actionContainor">
                  <View className="titleBox">
                    <View className="left">商城订单</View>
                    <View className="right">
                      <View className="all">
                        <View
                          className="subTitle"
                          onClick={() => {
                            this.goToPath(
                              ""
                            );
                          }}
                        >
                          <View className="at-row at-row__align--center">
                            <View className="at-col at-col at-col-1 at-col--auto">
                              全部订单
                            </View>
                            <View className="at-col at-col at-col-1 at-col--auto">
                              <View className="rightTo">
                                <ImageBox
                                  className="rightIcon"
                                  src="http://file.panduolakeji.com/1011339070.png"
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className="actionBoxContainor">
                    <View className="at-row at-row--wrap">
                      {orderNavList.map((item, index) => (
                        <View
                          key={`orderBox_${index}`}
                          className="at-col at-col-3"
                        >
                          <ItemBox
                            data={item}
                            index="1"
                            clickItem={o => {
                              if (signInResult === checkLoginResult.fail) {
                                this.showModel();

                                return;
                              }

                              this.actionItem(o);
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                <View className="divideBox" />

                <View View key className="actionContainor">
                  <View className="titleBox">
                    <View className="left">我的服务</View>
                    <View className="right">
                      <View className="all">
                        <View className="subTitle"></View>
                      </View>
                    </View>
                  </View>
                  <View className="actionBoxContainor">
                    <View className="at-row at-row--wrap">
                      {listData.map((item, index) => (
                        <View
                          key={`actionBox_nav_${index}`}
                          className="at-col at-col-4"
                        >
                          <ItemServiceBox
                            data={item}
                            clickItem={o => {
                              this.actionItem(o);
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                {/* {listCallCenter.length > 0 ? (
                  <View className="phoneBox">
                    {(listCallCenter || []).map((item, index) => (
                      <View
                        key={`actionBox_nav_${index}`}
                        className="at-row boxItem"
                      >
                        <View className="at-col at-col-3 phoneTxt">
                          {item.category == 100
                            ? item.categoryName
                            : item.category == 200
                            ? item.categoryName
                            : item.category == 300
                            ? item.categoryName
                            : null}
                        </View>
                        <View className="at-col at-col-6">
                          {item.list.map((phoneItem, phoneNum) => (
                            <View
                              key={`actionBox_nav_${phoneNum}`}
                              className="phoneItem"
                              onClick={() => {
                                this.makePhoneCall({
                                  phoneNumber: phoneItem.contactInformation,
                                });
                              }}
                            >
                              {phoneItem.contactInformation}
                            </View>
                          ))}
                        </View>
                        <View
                          className="at-row at-row__align--end at-row__justify--end padding"
                          onClick={() => {
                            this.makePhoneCall({
                              phoneNumber: item.list[0].contactInformation,
                            });
                          }}
                        >
                          <View className="dial">
                            {item.category == 100
                              ? "联系客服"
                              : item.category == 200
                              ? "联系客服"
                              : item.category == 300
                              ? "投诉"
                              : null}
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : (
                  ""
                )} */}
              </View>

              <AtActionSheet
                isOpened={customerService}
                onCancel={() => {
                  this.serviceClose();
                }}
                onClose={() => {
                  this.serviceClose();
                }}
                cancelText="取消"
                title={
                  category == 200
                    ? "客服电话"
                    : category == 400
                      ? "城市加盟电话"
                      : category == 500
                        ? "供应商加盟电话"
                        : ""
                }
              >
                {listCall.length > 0
                  ? listCall.map((item, index) => (
                    <AtActionSheetItem
                      key={`AtActionSheetItem${index}`}
                      onClick={() => {
                        this.makePhoneCall({
                          phoneNumber: item.contactInformation
                        });
                      }}
                    >
                      {category == 200
                        ? `电话${index + 1}: ${item.contactInformation}`
                        : category == 400
                          ? `电话${index + 1}: ${item.contactInformation}`
                          : category == 500
                            ? `电话${index + 1}: ${item.contactInformation}`
                            : ""}
                    </AtActionSheetItem>
                  ))
                  : ""}
                {category == 200 ? (
                  <AtActionSheetItem>
                    <Button open-type="contact" bindcontact="handleContact">
                      在线客服
                    </Button>
                  </AtActionSheetItem>
                ) : (
                  ""
                )}
              </AtActionSheet>
            </View>
          ) : null}
        </View>
      </View>
    );
  }

  render() {
    const {
      scrollHeight,
      showAuthorizationUserInfo,
      firstLoadSuccess
    } = this.state;

    const signInResult = this.getSignInResult();

    return (
      <View className="customerMain">
        <Spin fullscreen spin={!firstLoadSuccess}>
          <VariableView
            onReload={() => {
              this.reloadData();
            }}
            scrollHeight={scrollHeight}
            showAuthorizationUserInfo={showAuthorizationUserInfo}
            prepareGetAuthorizationUserInfo={callback => {
              this.checkSessionId(callback);
            }}
            afterCheckAuthorizationUserInfoClose={() => {
              this.setState({ showAuthorizationUserInfo: false });
            }}
          >
            {this.renderScrollContent()}
          </VariableView>
        </Spin>
      </View>
    );
  }
}

export default Cart;
