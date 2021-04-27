export const pagePathCollection = {
  signIn: { path: "pages/signIn/index" },
  register: { path: "pages/register/index" },
  home: { path: "pages/home/index" },
  news: { path: "pages/news/index" },
  // customer
  customer: { path: "pages/customer/index" },
};

export const globalShareData = {
  title: "过品质生活，上三易云农 ，每一款产品，就像做给自己的家人！",
  path: `/${pagePathCollection.home.path}`,
  imageUrl: "http://qnfile.sanleyouyou.com/711337757.jpeg"
};

export const imageDomain = "http://file.panduolakeji.com";

export const appSetting = {
  platformName: "三易云农",
  appName: "三易云农会员注册",
  logo: `${imageDomain}/407148283.jpeg`,
  copyrightLogo: `${imageDomain}/9e8b5d72b37c87a092f3f4bb620a711.png`,
  copyrightLogoText: "潘多拉科技",
  copyright: "Copyright © 2020 河南潘多拉科技有限公司出品"
};

export const buyMode = {
  unknown: 0,
  buy: 1,
  buyFromCart: 2
};

export const userCouponMode = {
  unknown: 0,
  global: 1,
  special: 2
};

export const couponScopeCollection = {
  none: -1,
  unlimited: 0,
  rank: 1,
  goods: 2,
  multipleGoods: 3
};

export const couponUseRules = [
  "全场券、品类券以及多品券一个订单仅限使用一张。",
  "单品券每个订单中每个购物车项可使用一张；但不能和全场券、品类券以及多品券组合使用。"
];

export const shippingAddressListInMode = {
  manage: 0,
  select: 1
};

export const checkLoginResult = {
  unknown: -1,
  fail: 0,
  success: 1
};

export const anonymousVisitor = {
  token: "anonymous"
};

export const goodsTypeCollection = {
  product: 1,
  lineTicket: 3
};

export const locationModeCollection = {
  unknown: 0,
  auto: 1,
  custom: 2
};

export const logLevel = {
  debug: "debug",
  warn: "warn",
  error: "error"
};

export const shareTransfer = {
  home: "0",
  productDetail: "1",
  productDiscountDetail: "2",
  productPresaleDetail: "3",
  integralDetail: "4",
  customer: "5",
  webPage: "7",
  productList: "10",
  outboundList: "12",
  shareOrderDetail: "14",
  newsDetail: "15"
};

export const decorationNew = {
  style: {
    position: "absolute",
    top: 0,
    left: 0,
    background: "linear-gradient(to left, #ff6666, #ff4444)",
    color: "#fff",
    width: "48rpx",
    height: "26rpx",
    lineHeight: "26rpx",
    fontSize: "24rpx",
    padding: "6rpx 8rpx",
    borderRadius: "0 0 16rpx 0",
    boxSizing: "content-box"
  },
  text: "新品"
};

export const explosiveStyle = {
  style: {
    position: "absolute",
    top: 0,
    right: "15rpx",
    background: "#FF0801",
    color: "#fff",
    width: "70rpx",
    height: "70rpx",
    lineHeight: "65rpx",
    fontSize: "26rpx",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: "0 0 35rpx 35rpx",
    boxSizing: "content-box"
  },
  text: "爆品"
};

export const presellStyle = {
  style: {
    position: "absolute",
    top: 0,
    right: "15rpx",
    background: "#34B731",
    color: "#fff",
    width: "70rpx",
    height: "70rpx",
    lineHeight: "65rpx",
    fontSize: "26rpx",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: "0 0 35rpx 35rpx",
    boxSizing: "content-box"
  },
  text: "预售"
};

export const planSaleStyle = {
  display: "inline-block",
  background: "linear-gradient(to left, #35c551, #71e088)",
  color: "#fff",
  width: "48rpx",
  height: "22rpx",
  lineHeight: "22rpx",
  fontSize: "22rpx",
  padding: "6rpx 8rpx",
  borderRadius: "16rpx 0 16rpx 0",
  textAlign: "center",
  marginRight: "2rpx",
  boxSizing: "content-box"
};

export const planSaleStyleTwo = {
  style: {
    background: "linear-gradient(to left, #35c551, #71e088)",
    color: "#fff",
    width: "48rpx",
    height: "22rpx",
    lineHeight: "22rpx",
    fontSize: "22rpx",
    padding: "6rpx 8rpx",
    borderRadius: "10rpx 0 16rpx 0",
    textAlign: "center",
    marginRight: "2rpx",
    boxSizing: "content-box"
  },
  text: "预售"
};

export const hotCakesStyle = {
  display: "inline-block",
  background: "#FF0018",
  color: "#fff",
  width: "auto",
  height: "auto",
  fontSize: "18rpx",
  padding: "4rpx 9rpx",
  borderRadius: "6rpx",
  textAlign: "center",
  marginRight: "6rpx",
  verticalAlign: "middle",
  boxSizing: "content-box",
  lineHeight: "1"
};

export const authLocationCollection = {
  unknown: 0,
  yes: 1,
  no: 2
};

export const buyActionCollection = {
  addToCart: 1,
  buy: 2
};

export const businessTypeCollection = {
  productNormal: 1,
  productPlanSale: 1
};

export function getConfigData() {
  // return {
  //   corsTargetDevelopment: "https://developexpress.panduolakeji.com",
  //   corsTargetProduction: "https://developexpress.panduolakeji.com"
  // };

  return {
    corsTargetDevelopment: "https://syyn.sanleyouyou.com",
    corsTargetProduction: "https://syyn.sanleyouyou.com"
  };
}

export const shareBrandImg = {
  brandImg: "http://qnfile.sanleyouyou.com/711337757.png"
};

export const defaultImg = "http://file.panduolakeji.com/1302942278.png";

export const defaultAvatarImage =
  "http://file.panduolakeji.com/fe9f38c8-1c2b-4643-a9c6-32ba2e7c33b9.png";

export function checkDevelopment() {
  return process.env.NODE_ENV === "development";
}

export const apiVersion = {
  version: "v1"
  // version: "beta",
};

export const userLocation = false;

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
