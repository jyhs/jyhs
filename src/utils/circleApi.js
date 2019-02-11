import request from './request'

const ApiCircleUrl = 'https://api2.huanjiaohu.com/circle/'
const api = {
  createCircle: (paramObj) => request.post('circle/create', paramObj, {
    baseURL: ApiCircleUrl
  }),
  addCircle: (paramObj) => request.post('circle/add', paramObj, {
    baseURL: ApiCircleUrl
  }),
  deleteCircle: (paramObj) => request.post('circle/delete', paramObj, {
    baseURL: ApiCircleUrl
  }),
  listCircle: (paramObj) => request.post('circle/list', paramObj, {
    baseURL: ApiCircleUrl
  }),
  listByUserId: (paramObj) => request.post('circle/listByUserId', paramObj, {
    baseURL: ApiCircleUrl
  }),
  getCircleSetting: (paramObj) => request.post('setting/getByUserId', paramObj, {
    baseURL: ApiCircleUrl
  }),
  praise: (paramObj) => request.post('circle/praise', paramObj, {
    baseURL: ApiCircleUrl
  }),
  openCircleSetting: (paramObj) => request.post('setting/open', paramObj, {
    baseURL: ApiCircleUrl
  }),
  commentPost: (paramObj) => request.post('circle/commentPost', paramObj, {
    baseURL: ApiCircleUrl
  })

}

export default api
