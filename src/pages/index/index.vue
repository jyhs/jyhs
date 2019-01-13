<template >
<view class="container">
  <swiper class="banner" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
    <swiper-item v-for="item of banner" :key="item.id">
      <navigator :url="item.link">
        <img :src="item.image_url" background-size="cover" />
      </navigator>
    </swiper-item>
  </swiper>
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
        'url': '/pages/category/category?id=1005000',
        'icon_url': 'https://yanxuan.nosdn.127.net/243e5bf327a87217ad1f54592f0176ec.png',
        'sort_order': 1
      }, {
        'id': 2,
        'name': '团购',
        'url': '/pages/category/category?id=1005001',
        'icon_url': 'https://yanxuan.nosdn.127.net/f109afbb7e7a00c243c1da29991a5aa3.png',
        'sort_order': 2
      }, {
        'id': 3,
        'name': '二手',
        'url': '/pages/category/category?id=1008000',
        'icon_url': 'https://yanxuan.nosdn.127.net/288b0e864a24763bade8e22c0c39ff02.png',
        'sort_order': 3
      }, {
        'id': 4,
        'name': '游戏',
        'url': '/pages/category/category?id=1010000',
        'icon_url': 'https://yanxuan.nosdn.127.net/863b1e4a6c84fb33f5d09d91d2a36881.png',
        'sort_order': 4
      }, {
        'id': 5,
        'name': '资讯',
        'url': '/pages/category/category?id=1019000',
        'icon_url': 'https://yanxuan.nosdn.127.net/a13a24413e66474cc7b0551984cfe9d4.png',
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

.a-brand .b {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  position: relative;
}

.a-brand .wrap {
  position: relative;
}

.a-brand .img {
  position: absolute;
  left: 0;
  top: 0;
}

.a-brand .mt {
  position: absolute;
  z-index: 2;
  padding: 27rpx 31rpx;
  left: 0;
  top: 0;
}

.a-brand .mt .brand {
  display: block;
  font-size: 33rpx;
  height: 43rpx;
  color: #333;
}

.a-brand .mt .price, .a-brand .mt .unit {
  font-size: 25rpx;
  color: #999;
}

.a-brand .item-1 {
  float: left;
  width: 375rpx;
  height: 252rpx;
  overflow: hidden;
  border-top: 1rpx solid #fff;
  margin-left: 1rpx;
}

.a-brand .item-1:nth-child(2n+1){
  margin-left: 0;
  width: 374rpx;
}

.a-brand .item-1 .img {
  width: 375rpx;
  height: 253rpx;
}

.a-new .b {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  padding: 0 31rpx 45rpx 31rpx;
}

.a-new .b .item {
  float: left;
  width: 302rpx;
  margin-top: 10rpx;
  margin-left: 21rpx;
  margin-right: 21rpx;
}

.a-new .b .item-b {
  margin-left: 42rpx;
}

.a-new .b .img {
  width: 302rpx;
  height: 302rpx;
}

.a-new .b .name {
  text-align: center;
  display: block;
  width: 302rpx;
  height: 35rpx;
  margin-bottom: 14rpx;
  overflow: hidden;
  font-size: 30rpx;
  color: #333;
}

.a-new .b .price {
  display: block;
  text-align: center;
  line-height: 30rpx;
  font-size: 30rpx;
  color: #b4282d;
}

.a-popular {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.a-popular .b .item {
  border-top: 1px solid #d9d9d9;
  margin: 0 20rpx;
  height: 264rpx;
  width: 710rpx;
}

.a-popular .b .img {
  margin-top: 12rpx;
  margin-right: 12rpx;
  float: left;
  width: 240rpx;
  height: 240rpx;
}

.a-popular .b .right {
  float: left;
  height: 264rpx;
  width: 456rpx;
  display: flex;
  flex-flow: row nowrap;
}

.a-popular .b .text {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  height: 264rpx;
  width: 456rpx;
}

.a-popular .b .name {
  width: 456rpx;
  display: block;
  color: #333;
  line-height: 50rpx;
  font-size: 30rpx;
}

.a-popular .b .desc {
  width: 456rpx;
  display: block;
  color: #999;
  line-height: 50rpx;
  font-size: 25rpx;
}

.a-popular .b .price {
  width: 456rpx;
  display: block;
  color: #b4282d;
  line-height: 50rpx;
  font-size: 33rpx;
}

.a-topic .b {
  height: 533rpx;
  width: 750rpx;
  padding: 0 0 48rpx 0;
}

.a-topic .b .list {
  height: 533rpx;
  width: 750rpx;
  white-space: nowrap;
}

.a-topic .b .item {
  display: inline-block;
  height: 533rpx;
  width: 680.5rpx;
  margin-left: 30rpx;
  overflow: hidden;
}

.a-topic .b .item:last-child {
  margin-right: 30rpx;
}

.a-topic .b .img {
  height: 387.5rpx;
  width: 680.5rpx;
  margin-bottom: 30rpx;
}

.a-topic .b .np {
  height: 35rpx;
  margin-bottom: 13.5rpx;
  color: #333;
  font-size: 30rpx;
}

.a-topic .b .np .price {
  margin-left: 20.8rpx;
  color: #b4282d;
}

.a-topic .b .desc {
  display: block;
  height: 30rpx;
  color: #999;
  font-size: 24rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}

.good-grid {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.good-grid .h {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 130rpx;
  font-size: 33rpx;
  color: #333;
}

.good-grid .b {
  width: 750rpx;
  padding: 0 6.25rpx;
  height: auto;
  overflow: hidden;
}

.good-grid .b .item {
  float: left;
  background: #fff;
  width: 365rpx;
  margin-bottom: 6.25rpx;
  height: 452rpx;
  overflow: hidden;
  text-align: center;
}

.good-grid .b .item .a{
  height: 452rpx;
  width: 100%;
}

.good-grid .b .item-b {
  margin-left: 6.25rpx;
}

.good-grid .item .img {
  margin-top: 20rpx;
  width: 302rpx;
  height: 302rpx;
}

.good-grid .item .name {
  display: block;
  width: 320rpx;
  padding: 0 20rpx;
  overflow: hidden;
  height: 35rpx;
  margin: 11.5rpx 0 22rpx 0;
  text-align: center;
  font-size: 30rpx;
  color: #333;
}

.good-grid .item .price {
  display: block;
  width: 365.625rpx;
  height: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #b4282d;
}

.good-grid .more-item{
  height: 100%;
  width: 100%;
}

.more-a{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.good-grid .more-a .txt{
  height: 33rpx;
  width: 100%;
  line-height: 33rpx;
  color: #333;
  font-size: 33rpx;
}

.good-grid .more-a .icon{
  margin: 60rpx auto 0 auto;
  width: 70rpx;
  height: 70rpx;
}

</style>
