import request from './request'

const ApiNearbyUrl = 'https://api2.huanjiaohu.com/nearby/'

const api = {
  getServiceList: (paramObj) => request.post('service/list', paramObj, {
    baseURL: ApiNearbyUrl
  })

}

export default api
