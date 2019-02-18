import request from './request'

const ApiGroupUrl = 'https://api2.huanjiaohu.com/group/'
const api = {
  getGroupListByLocation: (paramObj) => request.post('group/listByLocation', paramObj, {
    baseURL: ApiGroupUrl
  }),
  getGroupListByProvince: (paramObj) => request.post('group/list', paramObj, {
    baseURL: ApiGroupUrl
  }),
  getBillList: (paramObj) => request.post('bill/list', paramObj, {
    baseURL: ApiGroupUrl
  })
}

export default api
