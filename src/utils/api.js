import request from './request'

const ApiCommonUrl = 'https://api2.huanjiaohu.com/api/'

const api = {
  getProvinces: (paramObj) => request.post('location/getProvinces', paramObj, {
    baseURL: ApiCommonUrl
  }),
  getActiveList: (paramObj) => request.post('active/getActiveList', paramObj, {
    baseURL: ApiCommonUrl
  }),
  getInformationById: (paramObj) => request.post('information/getInformationById', paramObj, {
    baseURL: ApiCommonUrl
  }),
  getInformationList: (paramObj) => request.post('information/getSubscriptionList', paramObj, {
    baseURL: ApiCommonUrl
  }),
  fouceMaterialById: (paramObj) => request.post('material/focus', paramObj, {
    baseURL: ApiCommonUrl
  }),
  getMaterialImageById: (paramObj) => request.post('material/getImage', paramObj, {
    baseURL: ApiCommonUrl
  }),
  getMaterialById: (paramObj) => request.post('material/get', paramObj, {
    baseURL: ApiCommonUrl
  }),
  getMaterialRandomList: (paramObj) => request.post('material/randomList', paramObj, {
    baseURL: ApiCommonUrl
  }),
  getMaterialList: (paramObj) => request.post('material/list', paramObj, {
    baseURL: ApiCommonUrl
  }),
  getMaterialCount: (paramObj) => request.post('material/count', paramObj, {
    baseURL: ApiCommonUrl
  }),
  getCategoryAll: (paramObj) => request.post('material/categoryAll', paramObj, {
    baseURL: ApiCommonUrl
  }),
  login: (paramObj) => request.post('user/loginByMiniProgram', paramObj, {
    baseURL: ApiCommonUrl
  }),
  // 获得服务列表
  getServiceList: (paramObj) => request.post('service/list', paramObj, {
    baseURL: ApiCommonUrl
  }),
  // 发送验证码
  getVerification: (paramObj) => request.post('tools/sendVerification', paramObj, {
    baseURL: ApiCommonUrl
  }),
  // 验证码检验
  validateVerification: (paramObj) => request.post('tools/validateVerification', paramObj, {
    baseURL: ApiCommonUrl
  }),
  // 分类目录全部分类数据接口
  getCatalogList: (r) => request.get('catalog/index', null, {
    baseURL: ApiCommonUrl
  }),
  // 分类目录当前分类数据接口
  getCatalogCurrent: (paramObj) => request.get('catalog/current', paramObj, {
    baseURL: ApiCommonUrl
  }),
  // 评论列表
  getCommentList: (paramObj) => request.get('comment/list', paramObj, {
    baseURL: ApiCommonUrl
  }),
  // 评论总数
  getCommentCount: (paramObj) => request.get('comment/count', paramObj, {
    baseURL: ApiCommonUrl
  }),
  // 发表评论
  CommentPost: (paramObj) => request.post('comment/post', paramObj, {
    baseURL: ApiCommonUrl
  }),
  // 收货地址列表
  getAddressList: (r) => request.get('address/list', null, {
    baseURL: ApiCommonUrl
  }),
  // 收货地址详情
  getAddressDetail: (paramObj) => request.get('address/detail', paramObj, {
    baseURL: ApiCommonUrl
  }),
  // 保存收货地址
  AddressSave: (paramObj) => request.post('address/save', paramObj, {
    baseURL: ApiCommonUrl
  }),
  // 删除收获地址
  AddressDelete: (paramObj) => request.post('address/delete', paramObj, {
    baseURL: ApiCommonUrl
  }),
  // 获取区域列表
  getRegionList: (paramObj) => request.get('region/list', paramObj, {
    baseURL: ApiCommonUrl
  })

}

export default api
