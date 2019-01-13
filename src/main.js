import Vue from 'vue'
import store from '@/store'
import App from '@/App'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.config.productionTip = false
Vue.use(MpvueRouterPatch)

const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  config: {
    pages: [
      'pages/index/index',
      'pages/circle/index',
      'pages/catalog/index',
      'pages/nearby/index',
      'pages/ucenter/index'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '礁岩海水',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    },
    tabBar: {
      'backgroundColor': '#fafafa',
      'borderStyle': 'white',
      'selectedColor': '#b4282d',
      'color': '#666',
      'list': [{
        'pagePath': 'pages/index/index',
        'iconPath': 'static/images/ic_menu_choice_nor.png',
        'selectedIconPath': 'static/images/ic_menu_choice_pressed.png',
        'text': '首页'
      },
      {
        'pagePath': 'pages/circle/index',
        'iconPath': 'static/images/ic_menu_topic_nor.png',
        'selectedIconPath': 'static/images/ic_menu_topic_pressed.png',
        'text': '鱼圈'
      },
      {
        'pagePath': 'pages/catalog/index',
        'iconPath': 'static/images/ic_menu_sort_nor.png',
        'selectedIconPath': 'static/images/ic_menu_sort_pressed.png',
        'text': '百科'
      },
      {
        'pagePath': 'pages/nearby/index',
        'iconPath': 'static/images/ic_menu_shoping_nor.png',
        'selectedIconPath': 'static/images/ic_menu_shoping_pressed.png',
        'text': '附近'
      },
      {
        'pagePath': 'pages/ucenter/index',
        'iconPath': 'static/images/ic_menu_me_nor.png',
        'selectedIconPath': 'static/images/ic_menu_me_pressed.png',
        'text': '我的'
      }
      ]
    }
  },
  'networkTimeout': {
    'request': 10000,
    'downloadFile': 10000
  },
  'debug': true
}
