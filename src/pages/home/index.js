import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtLoadMore, AtActivityIndicator } from "taro-ui";
import {
  pretreatmentRequestParams,
  isUndefined,
  toNumber,
  stringIsNullOrWhiteSpace,
  isFunction,
  getCity,
  getSystemInfo
} from "../../utils/tools";
import Tips from "../../utils/tips";
import CustomPageCore from "../../customComponents/CustomPage/CustomPageCore";
import VariableView from "../../customComponents/VariableView";
import EmptyBox from "../../customComponents/EmptyBox";
import ImageBox from "../../customComponents/ImageBox";

import { modeConfig as variableViewConfig } from "../../customComponents/VariableView/variableViewConfig";
import {
  pagePathCollection,
  checkLoginResult,
  globalShareData,
  shareTransfer
} from "../../utils/customConfig";

import SearchBox from "./SearchBox";
import SwiperBox from "./SwiperBox";
import RankItem from "./RankItem";
import CommoditySaleBox from "./CommoditySaleBox";

import "./index.scss";

const navList = [
  {
    image: "http://qnfile.sanleyouyou.com/688840009.png",
    value: "平台推荐",
    type: "page",
    show: 1,
    open: 1,
    path: "customer/pages/newArrivalProductList/index"
  },
  {
    image: "http://qnfile.sanleyouyou.com/483539703.png",
    value: "富硒产品",
    type: "page",
    show: 1,
    open: 1,
    path: "customer/pages/rankProductList/index"
  },
  {
    image: "http://qnfile.sanleyouyou.com/664144796.png",
    value: "硒米商城",
    type: "page",
    show: 1,
    open: 1,
    path: "customer/pages/integralList/index"
  },
  {
    image: "http://qnfile.sanleyouyou.com/2087730384.png",
    value: "精选资讯",
    type: "page",
    show: 1,
    open: 1,
    path: "customer/pages/rankProductList/index?rankId=1251460150766735360"
  },
  {
    image: "http://qnfile.sanleyouyou.com/844202563.png",
    value: "会员服务",
    type: "page",
    show: 1,
    open: 1,
    path: ""
  }
];

@connect(({ home, product, entrance, remoteCheck, session, global }) => ({
  home,
  product,
  entrance,
  remoteCheck,
  session,
  global
}))
class Index extends CustomPageCore {
  config = {
    navigationBarTitleText: "三易云农 ",
    enablePullDownRefresh: true,
    navigationStyle: "custom",
    backgroundColor: "#c43f2e"
  };

  ifCheckLogin = false;

  constructor(props) {
    super(props);

    const info = this.getSystemInfoSync();
    const {
      windowHeight,
      windowWidth,
      screenHeight,
      statusBarHeight,
      pixelRatio
    } = info;

    const tabbarHeight =
      (screenHeight - windowHeight - statusBarHeight) * pixelRatio;

    this.state = {
      ...this.state,
      ...{
        variableViewMode: variableViewConfig.view,
        scrollHeight: windowHeight,
        screenHeight: screenHeight,
        windowHeight: windowHeight,
        windowWidth: windowWidth,
        tabbarHeight: tabbarHeight,
        showReminderCitySelectModal: false,
        loadApiPath: "home/getBrief",
        advertisingList: [],
        listRandom: [],
        hasMore: true,
        pageNo: 0,
        pageSize: 5,
        total: 0,
        currentProduct: null,
        showAuthorizationUserInfo: false,
        isFloatTop: false,
      }
    };
  }

  // componentDidMount() {
  //   // Taro.setNavigationBarColor({
  //   //   frontColor: "#ffffff",
  //   //   backgroundColor: "",
  //   //   animation: {
  //   //     duration: 400,
  //   //     timingFunc: "easeIn"
  //   //   }
  //   // });
  //   this.setCurrentInfo();
  //   this.adjustPageWhenDidMount();

  //   const that = this;

  //   this.checkSessionId(() => {
  //     if (!this.needAuthorize) {
  //       that.prepareInit();
  //     } else {
  //       that.checkLogin(() => {
  //         that.prepareInit();
  //       });
  //     }
  //   });
  // }

  adjustPageWhenDidMount() {
    this.boxBodyAnimation = this.createAnimation({
      duration: 100,
      timingFunction: "linear"
    });

    this.setState({
      boxBodyAnimationData: this.boxBodyAnimation.export()
    });
  }

  // doWhenComponentFirstShow() {
  //   this.loadRandom();
  // }

  doWhenComponentRepeatedShow() {

  }

  doOtherWhenComponentCommonShow() { }

  afterReloadDataWhenAutoAndRepeatedShow() {
  }

  getApiData = props => {
    const {
      home: { data }
    } = props;

    return data;
  };

  afterFirstLoadSuccess() {
    this.loadRandom();
  }

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess(metaData, metaListData, extra, data) {

    //分享朋友圈
    // wx.showShareMenu({
    //   withShareTicket: true,
    //   menus: ['shareAppMessage', 'shareTimeline']
    // })

    const { advertisingList } = metaData;

    this.setState({
      advertisingList
    });
  }

  afterReloadSuccess() {
    const { variableViewMode } = this.state;

    if (variableViewMode == variableViewConfig.view) {
      this.stopPullDownRefresh();
      this.hideNavigationBarLoading();

      // this.pageNo = 0;

      this.setState(
        {
          pageNo: 0,
          listRandom: [],
          hasMore: true
        },
        () => {
          this.loadRandom();
        }
      );
    }

    this.showSuccess("已经刷新完了哦", 800);
  }

  supplementLoadRequestParams(o) {
    const d = o;

    const { pageSize, pageNo } = this.state;

    d.hot = "1";
    d.pageNo = pageNo + 1;
    d.pageSize = pageSize;

    return o;
  }

  // 新品
  loadRandom(callback) {
    const { dispatch } = this.props;

    let submitData = pretreatmentRequestParams({});

    submitData = this.supplementLoadRequestParams(submitData);

    dispatch({
      type: "home/listRandom",
      payload: submitData
    }).then(() => {
      const {
        home: { data }
      } = this.props;

      const { dataSuccess } = data;

      if (dataSuccess) {
        const { list } = data;

        const { listRandom } = this.state;

        for (let i = 0; i < listRandom.length; i++) {
          for (let j = 0; j < list.length; j++) {
            if (listRandom[i].productId === list[j].productId) {
              list.splice(j, 1);
              j--;
            }
          }
        }

        const listRandomCollection = [...(listRandom || []), ...(list || [])];

        const {
          extra: { total, pageNo, pageSize }
        } = data;

        const hasMore = this.checkHasMore(pageNo, pageSize, total);

        if (pageNo === 1) {
          if (this.boxBodyAnimation != null) {
            // this.boxBodyAnimation.opacity(1).step();

            this.setState({
              boxBodyAnimationData: this.boxBodyAnimation.export(),
              total: total,
              pageNo: pageNo,
              pageSize: pageSize,
              listRandom: listRandomCollection,
              hasMore
            });
          } else {
            this.setState({
              total: total,
              pageNo: pageNo,
              pageSize: pageSize,
              listRandom: listRandomCollection,
              hasMore
            });
          }
        } else {
          this.setState(
            {
              total: total,
              pageNo: pageNo,
              pageSize: pageSize,
              listRandom: listRandomCollection,
              hasMore
            },
            () => {
              if (isFunction(callback)) {
                callback();
              }
            }
          );
        }
      }
    });
  }

  onPullDownRefresh() {
    const { variableViewMode } = this.state;

    if (variableViewMode == variableViewConfig.view) {
      if (this.cartBoxBodyAnimation != null) {
        // this.cartBoxBodyAnimation.opacity(0).step();

        this.setState({
          cartBoxBodyAnimationData: this.cartBoxBodyAnimation.export(),
          needRunAnimation: true
        });
      }

      this.loadFirstPage();
    }
  }

  goToSearch() {
    //this.goToPath(pagePathCollection.search.path);
  }

  afterSwiperItemClick(o) {
    const { type, title, url, extra } = o;

    if (toNumber(type) === 10) {
      if (!stringIsNullOrWhiteSpace(url)) {
        this.goToWebPage(title, url);
      }
    }

    if (toNumber(type) === 20) {
      if (!isUndefined(extra)) {
        const { id } = extra;

        if (!isUndefined(id)) {
          if ((id || "") !== "") {
            this.goToProductDetail({ productId: id });
          }
        }
      }
    }

    if (toNumber(type) === 30) {
      if (!stringIsNullOrWhiteSpace(url)) {
        //this.goToPath(url);
      }
    }
  }

  selectCity() {
    //this.goToPath(pagePathCollection.cityProductSelect.path);
  }

  goToRankProductList(e) {
    const { rankId } = e;

    if ((rankId || "") !== "") {
      this.setSwitchTabParams({ rankId: rankId });
    } else {
      this.clearSwitchTabParams();
    }

    //this.goToPath(pagePathCollection.rankProductList.path);
  }

  loadFirstPage(callback = null) {
    if (this.boxBodyAnimation != null) {
      // this.boxBodyAnimation.opacity(0.1).step();

      this.setState(
        {
          boxBodyAnimationData: this.boxBodyAnimation.export(),
          pageNo: 0,
          listRandom: [],
          hasMore: true
        },
        () => {
          this.reloadData(callback);
        }
      );
    } else {
      this.setState(
        {
          pageNo: 0,
          listRandom: [],
          hasMore: true
        },
        () => {
          this.reloadData(callback);
        }
      );
    }
  }

  loadNextPage() {
    const { reloading, hasMore } = this.state;

    if (!reloading && hasMore) {
      this.setState(
        {
          reloading: true,
          dataLoading: true,
          loadSuccess: false
        },
        () => {
          this.loadRandom(() => {
            this.setState({
              dataLoading: false,
              reloading: false
            });
          });
        }
      );
    }
  }

  onReachBottom() {
    const { hasMore } = this.state;

    if (hasMore) {
      this.loadNextPage();
    }
  }
  prepareAddToCart(item) {

    this.clickDecide(() => {
      const signInResult = this.getSignInResult();

      if (signInResult === checkLoginResult.fail) {
        this.setState({ showAuthorizationUserInfo: true, currentProduct: item });
        return;
      }

      this.showAddToCart({ currentProduct: item });
    })


  }

  actionItem(o) {
    const { type, open, path } = o;

    if (type === "page") {
      if (open == "1") {
        if (path) {
          //this.goToPath(o.path);
        }
      } else {
        Tips.info("即将开放，敬请期待");
      }
    }

    if (type === "wait") {
      const { text } = o;

      Tips.info(text || "暂未开放,敬请期待");
    }

    if (type === "tab") {
      if (o) {
        this.switchTab({
          url: `/${o.path}`
        });
      }

    }
  }

  comeBackTop() {
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  }

  onPageScroll() {
    const self = this;

    const { screenHeight, isFloatTop, tabbarHeight } = this.state;

    const ifTrue = screenHeight - tabbarHeight;

    const query = Taro.createSelectorQuery();

    // query.select(".rankBoxContainor").boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      if (res[0].scrollTop <= ifTrue === isFloatTop) {
        self.setState({
          isFloatTop: !isFloatTop
        });
      }
    });
  }

  onShareAppMessage() {

    const { metaData } = this.state;
    const currentUserId = this.getCurrentUserId();
    const city = getCity();

    const o = {
      title: "三易云农",
      path: `/${pagePathCollection.shareDetailEntrance.path}?transfer=${shareTransfer.home
        }&city=${city}${(currentUserId || "") === "" ? "" : `&inviter=${currentUserId}`
        }`,
      imageUrl:
        (metaData.weAppShareImageUrl || "") === ""
          ? globalShareData.imageUrl
          : metaData.weAppShareImageUrl,

    };

    return o;
  }

  renderScrollContent() {
    const {
      firstLoadSuccess,
      metaData,
      advertisingList,
      listRandom,
      dataLoading,
      hasMore,
      pageNo,
      total,
      windowHeight,
      reloading,
      isFloatTop
    } = this.state;

    // const notice = this.getNoticeText();

    const globalSystemInfo = getSystemInfo();
    const { navBarHeight, navBarExtendHeight } = globalSystemInfo;

    let rankGridData = [];

    if ((metaData || null) != null) {
      // rankGridData = metaData.rankList;
      rankGridData = metaData.navList;
    }

    // rankGridData = rankGridData.map((item) => {
    //   return {
    //     image: item.imageUrl,
    //     value: item.name,
    //     rankId: item.rankId,
    //     type: "page",
    //     show: 1,
    //     open: 1,
    //     path: `customer/pages/rankProductList/index?rankId=${item.rankId}`
    //   };
    // });

    const rankGridDataList = rankGridData;

    // for (let i = 0; i <= 9; i++) {
    //   rankGridDataList[i] = !isUndefined(rankGridDataList[i]) ? rankGridDataList[i] : fake
    // }

    return (
      <View style={{ minHeight: `${windowHeight}px` }}>
        <SearchBox
          goToSearch={() => {
            this.goToSearch();
          }}
        />

        <View className="whiteBackground">
          <SwiperBox
            loadSuccess={firstLoadSuccess}
            listData={advertisingList || []}
            afterItemClick={item => {
              this.afterSwiperItemClick(item);
            }}
          />

          <View className="rankBoxContainor">
            {firstLoadSuccess ? null : (
              <AtActivityIndicator mode="center" />
            )}

            {firstLoadSuccess ? (
              <View className="rankBox">
                {rankGridDataList.map((item, index) => (
                  <View
                    key={`rankItem_Icon_${index}`}
                    className="item"
                    style={{ width: "20%" }}
                  >
                    {item.show == 1 ? (
                      <RankItem
                        data={item}
                        clickItem={o => {
                          this.clickDecide(() => {
                            this.actionItem(o);
                          })
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>

        {/* listRandom */}
        {listRandom.length > 0 ?
          <View className="recommendation at-row at-row__justify--start at-row__align--center">
            <View className="hot at-col  at-col-1 at-col--auto">
              <Image
                className="hotIcon"
                src="http://file.yurukeji.com.cn/1413145874.png"
              />
            </View>
            <View className="hotWord at-col at-col-1 at-col--auto">富硒馆</View>
          </View>
          : ""}
        <View className="saleCommodityBox">
          {listRandom.map((items, index) => (
            <View key={`saleBox_${items.key}${index}`} className="saleBox">
              <CommoditySaleBox
                data={items}
                showDetail={o => {
                  this.goToProductDetail(o);
                }}
                showRankProductList={o => {
                  this.goToRankProductList(o);
                }}
                showCart={o => {
                  this.prepareAddToCart(o);
                }}
              />
            </View>
          ))}
        </View>

        {firstLoadSuccess && !dataLoading ? (
          listRandom.length == 0 && !hasMore ? (
            <View>
              <EmptyBox message="暂时还没有东西哦" />
            </View>
          ) : (
            <View className="moreBox">
              <AtLoadMore
                status={dataLoading ? "loading" : hasMore ? "more" : "noMore"}
                loadingText={pageNo === 0 ? "" : "加载中"}
                moreText={pageNo === 0 ? "" : "查看更多"}
                noMoreText={total === 0 ? "" : "没有更多哦"}
                onClick={() => {
                  this.loadNextPage();
                }}
              />
            </View>
          )
        ) : (
          <View className="moreBox">
            <AtLoadMore
              status={dataLoading ? "loading" : hasMore ? "more" : "noMore"}
              loadingText={pageNo === 0 ? "" : "加载中"}
              moreText={pageNo === 0 ? "" : "查看更多"}
              noMoreText={total === 0 ? "" : "没有更多哦"}
              onClick={() => {
                this.loadNextPage();
              }}
            />
          </View>
        )}
        {/* 售卖货品 */}
        <View
          className={isFloatTop ? "floatTop" : "pear"}
          onClick={() => {
            this.comeBackTop();
          }}
        >
          <ImageBox
            className="floatTopIcon"
            circle
            src="http://file.panduolakeji.com/10993419.png"
          />
        </View>
      </View>
    );
  }

  render() {
    const {
      loadSuccess,
      variableViewMode,
      scrollHeight,
      showAuthorizationUserInfo,
      showReminderCitySelectModal,
      currentProduct,
    } = this.state;

    return (
      <View className="homeMain">
        <VariableView
          mode={variableViewMode}
          onReload={() => {
            this.loadFirstPage();
          }}
          scrollHeight={scrollHeight}
          showAuthorizationUserInfo={showAuthorizationUserInfo}
          showReminderCitySelectModal={showReminderCitySelectModal}
          selectCity={() => {
            this.setState({ showReminderCitySelectModal: false }, () => {
              this.selectCity();
            });
          }}
          cancelSelectCity={() => {
            this.setState({ showReminderCitySelectModal: false });
          }}
          onLoadMore={() => {
            this.loadNextPage();
          }}
          afterCheckAuthorizationUserInfoClose={() => {
            this.setState({ showAuthorizationUserInfo: false });
          }}
        >
          {this.renderScrollContent()}
        </VariableView>
      </View>
    );
  }
}

export default Index;
