import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtLoadMore } from "taro-ui";

import { getSystemInfo } from "../../utils/tools";
import CustomPageCore from "../../customComponents/CustomPage/CustomPageCore";
import VariableView from "../../customComponents/VariableView";
import EmptyBox from "../../customComponents/EmptyBox";
import NavBar from "../../customComponents/navbar_lxy";
import { modeConfig as variableViewConfig } from "../../customComponents/VariableView/variableViewConfig";
import { pagePathCollection } from "../../utils/customConfig";

import ItemBox from "./ItemBox";
import SwiperBox from "./SwiperBox";

import "./index.scss";

const advertisingList = [{
  imageUrl: "http://file.panduolakeji.com/1680435312.jpeg?imageMogr2/thumbnail/340x340/format/jpg/blur/1x0/quality/75"
}]

@connect(
  ({ news, entrance, remoteCheck, session, global }) => ({
    news,
    entrance,
    remoteCheck,
    session,
    global,
  })
)
class Index extends CustomPageCore {
  config = {
    navigationBarTitleText: "三易云农 ",
    enablePullDownRefresh: true,
    navigationStyle: "custom",
    backgroundColor: "#c43f2e"
  };

  boxBodyAnimation = null;

  ifCheckLogin = false;

  constructor(props) {
    super(props);

    const info = this.getSystemInfoSync();

    const { windowHeight } = info;

    this.showCityChangeTipsInfo = true;

    this.state = {
      ...this.state,
      ...{
        variableViewMode: variableViewConfig.view,
        scrollHeight: windowHeight,
        windowHeight: windowHeight,
        boxBodyAnimationData: null,
        loadApiPath: "news/pageList",
        pageNo: 0,
        randomLoading: false,
        total: 0,
        pageSize: 10,
        hasMore: true,
        currentProduct: null,
        listData: [],
        listBanner: []
      },
    };
  }

  adjustPageWhenDidMount() {
    this.boxBodyAnimation = this.createAnimation({
      duration: 100,
      timingFunction: "linear",
    });

    this.setState({
      boxBodyAnimationData: this.boxBodyAnimation.export(),
    });
  }

  getApiData = (props) => {
    const {
      news: { data },
    } = props;

    return data;
  };

  supplementLoadRequestParams(o) {
    const d = o;

    const { pageSize, pageNo } = this.state;

    d.pageNo = pageNo + 1;
    d.pageSize = pageSize;

    return o;
  }

  afterFirstLoadSuccess() {
    if (this.boxBodyAnimation != null) {
      this.boxBodyAnimation.opacity(1).step();

      this.setState({
        boxBodyAnimationData: this.boxBodyAnimation.export(),
      });
    }
  }

  afterLoadSuccess(metaData, metaListData, extra, data) {
    const { listData: listDataPrev } = this.state;

    const {
      extra: { total, pageNo, pageSize },
    } = data;

    const hasMore = this.checkHasMore(pageNo, pageSize, total);

    const listData = [...listDataPrev, ...(metaListData || [])];

    this.setState({
      total: total,
      pageNo: pageNo,
      pageSize: pageSize,
      listData: listData,
      hasMore,
    });

    this.getGallery();
  }



  getGallery() {
    const { dispatch } = this.props;

    dispatch({
      type: "news/getGallery",
      payload: {}
    }).then(() => {
      const {
        news: { data }
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {

        const { list } = data;

        this.setState({
          listBanner: list
        })
      }
    })
  }

  goToNewsDetail(o) {

    this.goToPath(
      `${pagePathCollection.newsDetail.path}?articleId=${o.articleId}`
    );
  }

  afterReloadSuccess() {
    const { variableViewMode } = this.state;

    if (variableViewMode == variableViewConfig.view) {
      this.stopPullDownRefresh();
      this.hideNavigationBarLoading();
    }
  }

  loadFirstPage() {
    this.setState({ pageNo: 0, listData: [], hasMore: true }, () => {
      this.reloadData();
    });
  }

  loadNextPage() {
    const { reloading, hasMore } = this.state;

    if (!reloading && hasMore) {
      this.reloadData();
    }
  }

  onPullDownRefresh() {
    const { variableViewMode } = this.state;

    if (variableViewMode == variableViewConfig.view) {
      if (this.cartBoxBodyAnimation != null) {
        this.cartBoxBodyAnimation.opacity(0).step();

        this.setState({
          cartBoxBodyAnimationData: this.cartBoxBodyAnimation.export(),
          needRunAnimation: true,
        });
      }

      this.loadFirstPage();
    }
  }

  onReachBottom() {
    const { hasMore } = this.state;

    if (hasMore) {
      this.loadNextPage();
    }
  }

  renderScrollContent() {

    const globalSystemInfo = getSystemInfo();
    const { navBarHeight, navBarExtendHeight } = globalSystemInfo;

    const {
      firstLoadSuccess,
      dataLoading,
      windowHeight,
      boxBodyAnimationData,
      hasMore,
      listData,
      pageNo,
      total,
      listBanner
    } = this.state;

    return (
      <View className="containorInner">
        <View className="box" style={{ minHeight: `${windowHeight}px` }}>
          <View className="nav">
            <NavBar
              title=""
              background="rgba(0,0,0,0)"
              color="#fff"
              iconTheme="white"
              extClass="lxy-navbar-extclass"
              renderLeft={
                <View style="padding-left:25rpx">
                  三易云农
                </View>
              }
            />
          </View>
          <View className="boxBody" style={`padding-top:${navBarHeight + navBarExtendHeight}px`} animation={boxBodyAnimationData}>

            {listBanner.length > 0 ?
              <View className='swiper'>
                <SwiperBox
                  loadSuccess={firstLoadSuccess}
                  listData={listBanner || []}
                  afterItemClick={item => {
                    this.afterSwiperItemClick(item);
                  }}
                />
              </View>
              : ""}

            {listData.map((item) => (
              <View key={`${item.key}`} className="saleBox">
                <ItemBox
                  data={item}
                  showDetail={(o) => {
                    this.goToNewsDetail(o);
                  }}
                />
              </View>
            ))}
          </View>

          {firstLoadSuccess && !dataLoading ? (
            listData.length == 0 && !hasMore ? (
              <View>
                <EmptyBox message="暂时还没有东西哦" />
              </View>
            ) : (
              <View className="moreBox">
                <AtLoadMore
                  status={dataLoading ? "loading" : hasMore ? "more" : "noMore"}
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
                moreText={pageNo === 0 ? "" : "查看更多"}
                noMoreText={total === 0 ? "" : "没有更多哦"}
                onClick={() => {
                  this.loadNextPage();
                }}
              />
            </View>
          )}
        </View>
      </View>
    );
  }

  render() {
    const {
      variableViewMode,
      scrollHeight,
      showAuthorizationUserInfo,
    } = this.state;

    return (
      <View className="containorMain">
        <VariableView
          mode={variableViewMode}
          onReload={() => {
            this.loadFirstPage();
          }}
          scrollHeight={scrollHeight}
          onLoadMore={() => {
            this.loadNextPage();
          }}
          showAuthorizationUserInfo={showAuthorizationUserInfo}
        >
          {this.renderScrollContent()}
        </VariableView>
      </View>
    );
  }
}

export default Index;
