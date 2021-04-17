import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";

import "./index.scss";


@connect(({ home }) => ({
  home,
}))
class Index extends Component {
  config = {
    navigationBarTitleText: "Home ",
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{

      }
    };
  }

  componentDidMount() {

  }


  doWhenComponentRepeatedShow() {

  }

  doOtherWhenComponentCommonShow() { }


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

  }


  renderScrollContent() {
    return (
      <View></View>
    );
  }

  render() {

    return (
      <View className="homeMain">
        <View>
          {this.renderScrollContent()}
        </View>
      </View>
    );
  }
}

export default Index;
