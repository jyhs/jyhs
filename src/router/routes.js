module.exports = [
  {
    path: '/pages/index/index',
    name: 'index',
    config: {
      enablePullDownRefresh: true,
      usingComponents: {
        'wux-notice-bar': '../../static/wux/notice-bar/index',
        'wux-row': '../../static/wux/row/index',
        'wux-button': '../../static/wux/button/index',
        'wux-col': '../../static/wux/col/index',
        'wux-wing-blank': '../../static/wux/wing-blank/index',
        'wux-white-space': '../../static/wux/white-space/index',
        'wux-select': '../../static/wux/select/index',
        'wux-card': '../../static/wux/card/index',
        'wux-tag': '../../static/wux/tag/index',
        'wux-divider': '../../static/wux/divider/index',
        'wux-avatar': '../../static/wux/avatar/index',
        'wux-rater': '../../static/wux/rater/index',
        'wux-icon': '../../static/wux/icon/index'
      }
    }
  },
  {
    path: '/pages/second/index',
    name: 'second',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '礁岩二手'
    }
  },
  {
    path: '/pages/information/index',
    name: 'information',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '礁岩资讯'
    }
  },
  {
    path: 'pages/circle/index',
    name: 'circle',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '礁岩鱼圈'
    }
  },
  {
    path: 'pages/catalog/index',
    name: 'catalog',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '礁岩百科'
    }
  },
  {
    path: 'pages/nearby/index',
    name: 'nearby',
    config: {
      navigationBarTitleText: '礁岩附近'
    }
  },
  {
    path: 'pages/ucenter/index',
    name: 'ucenter',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '礁岩个人',
      usingComponents: {
        'wux-button': '../../static/wux/button/index',
        'wux-avatar': '../../static/wux/avatar/index',
        'wux-prompt': '../../static/wux/prompt/index',
        'wux-cell-group': '../../static/wux/cell-group/index',
        'wux-cell': '../../static/wux/cell/index',
        'wux-white-space': '../../static/wux/white-space/index',
        'wux-card': '../../static/wux/card/index',
        'wux-wing-blank': '../../static/wux/wing-blank/index',
        'wux-grids': '../../static/wux/grids/index',
        'wux-grid': '../../static/wux/grid/index'
      }
    }
  },
  {
    path: 'pages/mall/index',
    name: 'mall',
    config: {
      navigationBarTitleText: '礁岩商城'
    }
  },
  {
    path: 'pages/group/index',
    name: 'group',
    config: {
      navigationBarTitleText: '礁岩团购'
    }
  },
  {
    path: 'pages/game/index',
    name: 'game',
    config: {
      navigationBarTitleText: '礁岩荣耀'
    }
  },
  {
    path: 'pages/ucenter/login',
    name: 'ucenter',
    config: {
      navigationBarTitleText: '登录'
    }
  },
  {
    path: 'pages/category/category',
    name: 'category',
    config: {
      navigationBarTitleText: '分类'
    }
  },
  {
    path: 'pages/search/search',
    name: 'search',
    config: {
      navigationBarTitleText: '搜索'
    }
  },
  {
    path: 'pages/material/index',
    name: 'material',
    config: {
      navigationBarTitleText: '详情'
    }
  },
  {
    path: 'pages/help/index',
    name: 'help',
    config: {
      navigationBarTitleText: '礁岩帮助'
    }
  },
  {
    path: 'pages/topic/topic',
    name: 'topic',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '专题'
    }
  },
  {
    path: 'pages/cart/cart',
    name: 'cart',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '购物车'
    }
  },
  {
    path: 'pages/brand/brand',
    name: 'brand',
    config: {
      navigationBarTitleText: '品牌'
    }
  },
  {
    path: 'pages/brand/brandDetail',
    name: 'brandDetail',
    config: {
      navigationBarTitleText: '品牌详情'
    }
  },
  {
    path: 'pages/newGoods/newGoods',
    name: 'newGoods',
    config: {
      navigationBarTitleText: '新品'
    }
  },
  {
    path: 'pages/hotGoods/hotGoods',
    name: 'hotGoods',
    config: {
      navigationBarTitleText: '人气推荐'
    }
  },
  {
    path: 'pages/topic/topicDetail',
    name: 'topicDetail',
    config: {
      navigationBarTitleText: '专题详情'
    }
  },
  {
    path: 'pages/topic/topicComment',
    name: 'topicComment',
    config: {
      navigationBarTitleText: '专题评论'
    }
  },
  {
    path: 'pages/comment/comment',
    name: 'comment',
    config: {
      navigationBarTitleText: '商品评论'
    }
  },
  {
    path: 'pages/comment/commentPost',
    name: 'commentPost',
    config: {
      navigationBarTitleText: '提交评论'
    }
  },
  {
    path: 'pages/goods/goods',
    name: 'goods',
    config: {
      navigationBarTitleText: '商品详情'
    }
  },
  {
    path: 'pages/ucenter/order',
    name: 'order',
    config: {
      navigationBarTitleText: '我的订单'
    }
  },
  {
    path: 'pages/ucenter/orderDetail',
    name: 'orderDetail',
    config: {
      navigationBarTitleText: '订单详情'
    }
  },
  {
    path: 'pages/ucenter/coupon',
    name: 'coupon',
    config: {
      navigationBarTitleText: '优惠券'
    }
  },
  {
    path: 'pages/ucenter/collect',
    name: 'collect',
    config: {
      navigationBarTitleText: '我的收藏'
    }
  },
  {
    path: 'pages/ucenter/footprint',
    name: 'footprint',
    config: {
      navigationBarTitleText: '我的足迹'
    }
  },
  {
    path: 'pages/ucenter/address',
    name: 'address',
    config: {
      navigationBarTitleText: '地址管理'
    }
  },
  {
    path: 'pages/ucenter/addressAdd',
    name: 'addressAdd',
    config: {
      navigationBarTitleText: '编辑地址'
    }
  },
  {
    path: 'pages/ucenter/feedback',
    name: 'feedback',
    config: {
      navigationBarTitleText: '意见反馈'
    }
  },
  {
    path: 'pages/ucenter/express',
    name: 'express',
    config: {
      navigationBarTitleText: '物流查询'
    }
  },
  {
    path: 'pages/shopping/checkout',
    name: 'checkout',
    config: {
      navigationBarTitleText: '确认订单'
    }
  },
  {
    path: 'pages/shopping/address',
    name: 'address',
    config: {
      navigationBarTitleText: '地址管理'
    }
  },
  {
    path: 'pages/pay/pay',
    name: 'pay',
    config: {
      navigationBarTitleText: '支付'
    }
  },
  {
    path: 'pages/pay/payResult',
    name: 'payResult',
    config: {
      navigationBarTitleText: '支付结果'
    }
  }

]
