import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import { isFunction, getSystemInfo } from "../../utils/tools";
import CustomComponentBase from "../../customComponents/CustomComponentBase";
import NavBar from "../../customComponents/navbar_lxy";
import ImageBox from "../../customComponents/ImageBox";

import "./SearchBox.scss";

class SearchBox extends CustomComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
    };
  }

  componentDidMount() {

  }

  componentDidShow() {

  }

  componentWillReceiveProps(nextProps) {

  }

  searchAction() {
    const { goToSearch } = this.props;

    if (isFunction(goToSearch)) {
      goToSearch();
    }
  }

  cityAction() {
    const { selectCity } = this.props;

    if (isFunction(selectCity)) {
      selectCity();
    }
  }


  render() {
    const { express } = this.props;

    let address = "";

    if (express != null) {
      address = express.address || "";

      const index = address.indexOf("市");

      if (index >= 0) {
        address = address.substring(index + 1);
      }
    }

    const globalSystemInfo = getSystemInfo();
    const { navBarHeight, navBarExtendHeight } = globalSystemInfo;

    return (
      <View>
        <View className="main backgroundImg">
          <View className="nav">
            <NavBar
              title=""
              background="rgba(0,0,0,0)"
              color="#fff"
              iconTheme="white"
              extClass="lxy-navbar-extclass"
              renderLeft={
                <View className="columnDown" >
                  <View className="merchantBox">
                    <View className="boxFrame at-row at-row__align--center at-row__justify--center">
                      <View className="titleBox at-col">
                        三易云农-
                      </View>
                      <View className="changeMerchantActionBox at-col at-col-1 at-col--auto">
                        助农富农兴农
                      </View>
                    </View>
                  </View>
                </View>
              }
            />
          </View>
        </View>
        <View
          style={`padding-top:${navBarHeight + navBarExtendHeight}px`}
        >
          <View className="topTwo at-row at-row__align--center ">
            <View
              className="box at-col at-col-auto"
              onClick={() => {
                this.searchAction();
              }}
            >
              <View className="searchFrame at-row at-row__align--center">
                <View className="searchIcon at-col-1 at-col--auto">
                  <View className="search">
                    <ImageBox src="http://file.yurukeji.com.cn/135856346.png" />
                  </View>
                </View>
                <View className="searchText at-col at-col-4">
                  请输入您想要的商品
                </View>
              </View>
            </View>
            <View className="reLocationBox at-col at-col-1 at-col--auto" >
              搜索
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SearchBox;
