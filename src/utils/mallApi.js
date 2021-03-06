import request from './request'

const ApiMallUrl = 'https://api2.huanjiaohu.com/mall/'

const api = {
  getIndexData: (r) => request.get('index/index', null, {
    baseURL: ApiMallUrl
  }),
  // 使用util的request方法，字符串变量即可
  // 微信登录
  AuthLoginByWeixin: ApiMallUrl + 'auth/loginByWeixin',
  // 获取微信统一下单prepay_id
  PayPrepayId: ApiMallUrl + 'pay/prepay',
  // （pay单独使用）获取微信统一下单prepay_id
  PayPrepayIdFunc: (paramObj) => request.get('pay/prepay', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 统计商品总数
  getGoodsCount: (r) => request.get('goods/count', null, {
    baseURL: ApiMallUrl
  }),
  // 获得分类商品列表,条件比较复杂用paramObj接收
  getGoodsList: (paramObj) => request.get('goods/list', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 获得分类数据
  getGoodsCategory: (paramObj) => request.get('goods/category', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 获得商品的详情
  getGoodsDetail: (paramObj) => request.get('goods/detail', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 新品
  getGoodsNew: (r) => request.get('goods/new', null, {
    baseURL: ApiMallUrl
  }),
  // 热门
  getGoodsHot: (r) => request.get('goods/hot', null, {
    baseURL: ApiMallUrl
  }),
  // 商品详情页的关联商品（大家都在看）
  getGoodsRelated: (paramObj) => request.get('goods/related', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 品牌列表
  getBrandList: (paramObj) => request.get('brand/list', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 品牌详情
  getBrandDetail: (paramObj) => request.get('brand/detail', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 获取购物车的数据
  getCartList: (r) => request.get('cart/index', null, {
    baseURL: ApiMallUrl
  }),
  // 添加商品到购物车
  CartAdd: (paramObj) => request.post('cart/add', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 更新购物车的商品
  CartUpdate: (paramObj) => request.post('cart/update', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 删除购物车的商品
  CartDelete: (paramObj) => request.post('cart/delete', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 选择或取消选择商品
  CartChecked: (paramObj) => request.post('cart/checked', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 获取购物车商品件数
  getCartGoodsCount: (r) => request.get('cart/goodscount', null, {
    baseURL: ApiMallUrl
  }),
  // 下单前信息确认
  CartCheckout: (paramObj) => request.get('cart/checkout', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 提交订单
  OrderSubmit: (paramObj) => request.post('order/submit', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 收藏列表
  getCollectList: (paramObj) => request.get('collect/list', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 添加或取消收藏
  CollectAddOrDelete: (paramObj) => request.post('collect/addordelete', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 专题列表
  getTopicList: (paramObj) => request.get('topic/list', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 专题详情
  getTopicDetail: (paramObj) => request.get('topic/detail', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 相关专题
  TopicRelated: (paramObj) => request.get('topic/related', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 搜索页面数据
  SearchIndex: (r) => request.get('search/index', null, {
    baseURL: ApiMallUrl
  }),
  // 搜索数据
  SearchResult: (r) => request.get('search/result', null, {
    baseURL: ApiMallUrl
  }),
  // 搜索帮助
  SearchHelper: (paramObj) => request.get('search/helper', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 清空搜索历史记录
  ClearSearchHistory: (r) => request.post('search/clearhistory', null, {
    baseURL: ApiMallUrl
  }),
  // 订单列表
  getOrderList: (r) => request.get('order/list', null, {
    baseURL: ApiMallUrl
  }),
  // 订单详情
  getOrderDetail: (paramObj) => request.get('order/detail', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 取消订单
  OrderCancel: (r) => request.get('order/cancel', null, {
    baseURL: ApiMallUrl
  }),
  // 物流详情
  getOrderExpress: (paramObj) => request.post('order/express', paramObj, {
    baseURL: ApiMallUrl
  }),
  // 足迹列表
  getFootprintList: (r) => request.get('footprint/list', null, {
    baseURL: ApiMallUrl
  }),
  // 删除足迹
  FootprintDelete: (paramObj) => request.post('footprint/delete', paramObj, {
    baseURL: ApiMallUrl
  })
}

export default api
