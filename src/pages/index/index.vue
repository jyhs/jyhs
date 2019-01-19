<template >
<view class="container">
  <swiper class="banner" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
    <swiper-item v-for="item of banner" :key="item.id">
      <navigator :url="item.link">
        <img :src="item.image_url" background-size="cover" />
      </navigator>
    </swiper-item>
  </swiper>
  <view class="row">
    <wux-row>
                <wux-col span="10">
        <wux-notice-bar content="喜大普奔！礁岩海水小程序上线了！礁岩海水小程序上线了" loop speed="50"/>
                </wux-col>
                <wux-col span="2">
                    <view class="placeholder">wux</view>
                </wux-col>
    </wux-row>
  </view>
  <view class="m-menu">
    <navigator  class="item" :url="item.url" v-for="item of channel" :key="item.id">
      <img :src="item.icon_url" background-size="cover" />
      <text>{{item.name}}</text>
    </navigator>
  </view>

</view>
</template>

<script>
// import api from '@/utils/api'
export default {
  computed: {

  },
  data () {
    return {
      'banner': [{
        'id': 1,
        'ad_position_id': 1,
        'media_type': 1,
        'name': '合作 谁是你的菜',
        'link': '/pages/category/category?id=1005002',
        'image_url': 'http://yanxuan.nosdn.127.net/65091eebc48899298171c2eb6696fe27.jpg',
        'content': '合作 谁是你的菜',
        'end_time': 0,
        'enabled': 1
      }, {
        'id': 2,
        'ad_position_id': 1,
        'media_type': 1,
        'name': '活动 美食节',
        'link': '/pages/category/category?id=1005001',
        'image_url': 'http://yanxuan.nosdn.127.net/bff2e49136fcef1fd829f5036e07f116.jpg',
        'content': '活动 美食节',
        'end_time': 0,
        'enabled': 1
      }, {
        'id': 3,
        'ad_position_id': 1,
        'media_type': 1,
        'name': '活动 母亲节',
        'link': '/pages/category/category?id=1005000',
        'image_url': 'http://yanxuan.nosdn.127.net/8e50c65fda145e6dd1bf4fb7ee0fcecc.jpg',
        'content': '活动 母亲节',
        'end_time': 0,
        'enabled': 1
      }],
      'channel': [{
        'id': 1,
        'name': '商城',
        'url': '/pages/mall/index',
        'icon_url': 'https://static.huanjiaohu.com/mini/index/mall.png',
        'sort_order': 1
      }, {
        'id': 2,
        'name': '团购',
        'url': '/pages/group/index',
        'icon_url': 'https://static.huanjiaohu.com/mini/index/group.png',
        'sort_order': 2
      }, {
        'id': 3,
        'name': '二手',
        'url': '/pages/second/index',
        'icon_url': 'https://static.huanjiaohu.com/mini/index/second.png',
        'sort_order': 3
      }, {
        'id': 4,
        'name': '游戏',
        'url': '/pages/game/index',
        'icon_url': 'https://static.huanjiaohu.com/mini/index/game.png',
        'sort_order': 4
      }, {
        'id': 5,
        'name': '资讯',
        'url': '/pages/information/index',
        'icon_url': 'https://static.huanjiaohu.com/mini/index/information.png',
        'sort_order': 5
      }]
    }
  },
  async mounted () {

  },

  methods: {

  },

  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      title: 'xbyjShop',
      desc: '仿网易严选小程序商城',
      path: '/pages/index/index'
    }
  }
}
</script>

<style>
.banner {
  width: 750rpx;
  height: 417rpx;
}

.banner image {
  width: 100%;
  height: 417rpx;
}

.m-menu {
  display: flex;
  height: 181rpx;
  width: 750rpx;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
}

.m-menu .item {
  flex: 1;
  display: block;
  padding: 20rpx 0;
}

.m-menu image {
  display: block;
  width: 58rpx;
  height: 58rpx;
  margin: 0 auto;
  margin-bottom: 12rpx;
}

.m-menu text {
  display: block;
  font-size: 24rpx;
  text-align: center;
  margin: 0 auto;
  line-height: 1;
  color: #333;
}

.a-section {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  background: #fff;
  color: #333;
  margin-top: 20rpx;
}

.a-section .h {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 130rpx;
}

.a-section .h .txt {
  padding-right: 30rpx;
  background: url("http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/index-titleArrow-219f348910.png") right 4rpx no-repeat;
  background-size: 16.656rpx 27rpx;
  display: inline-block;
  height: 36rpx;
  font-size: 33rpx;
  line-height: 36rpx;
}


</style>
