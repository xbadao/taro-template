import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import { isFunction } from "../../utils/tools";
import CustomComponentBase from "../../customComponents/CustomComponentBase";
import ImageBox from "../../customComponents/ImageBox";

import "./SearchBox.scss";

class SearchBox extends CustomComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      firstShow: false
    };
  }

  componentDidMount() {
    const { cityName: cityInitValue } = this.props;

    this.setState({
      city: cityInitValue || "定位中"
    });
  }

  componentWillReceiveProps(nextProps) {
    const { city: cityPrev } = this.state;
    const { cityName: cityNext } = nextProps;

    if (cityPrev !== cityNext) {
      this.setState({
        city: cityNext || "加载中"
      });
    }
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
    const { customer } = this.props;

    let address = "";

    if (customer != null) {
      address = customer.address || "";

      const index = address.indexOf("市");

      if (index >= 0) {
        address = address.substring(index + 1);
      }
    }

    const phone =
      customer != null
        ? customer.phone
          ? customer.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
          : ""
        : "";

    return (
      <View>
        <View className="main">
          <View className="mainRow at-row at-row__align--center">
            <View className="at-col at-col-1 at-col--auto">
              <View className="merchants">
                <ImageBox
                  className="merchantsIcon"
                  src="http://file.panduolakeji.com/1842013492.jpeg"
                />
              </View>
            </View>
            <View className="wordChants at-col at-col-9">
              <View className="merchantPhone">
                <View className="at-row at-row__align--center">
                  <View className="at-col at-col-1 at-col--auto realName">
                    {customer == null ? "" : customer.shopfront}
                  </View>
                  {/* <View
                    className="at-col at-col-1 at-col--auto"
                  >
                    <View className="text">
                      {customer == null ? "" : phone}
                    </View>
                  </View>
                  <View
                    className="at-col at-col-1 at-col--auto"
                  >
                    <View className="iconBox">
                  <ImageBox src="http://file.panduolakeji.com/389965683.png" />
                </View>
                  </View> */}
                </View>
              </View>
              <View style="height:10rpx"></View>
              <View className="merchantBox">
                <View className="at-row">
                  <View className="titleBox at-col">
                    <View className="left at-row">
                      {/* <View className="at-col at-col-1 at-col--auto">
                        收货地址：
                      </View> */}
                      <View className="title">
                        自提地址：{customer == null ? "" : customer.address}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SearchBox;
