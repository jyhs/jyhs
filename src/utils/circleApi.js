import request from './request'

const ApiCircleUrl = 'https://api2.huanjiaohu.com/circle/'
const api = {
  createCircle: (paramObj) => request.post('circle/create', paramObj, {
    baseURL: ApiCircleUrl
  })
}

export default api
