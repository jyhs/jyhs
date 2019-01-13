<template>
  <div class="container">
      <map id="myMap" :longitude="centerX" :latitude="centerY" :scale="scale" @controltap="controltap"  :markers="markers" @markertap="markertap" @regionchange="regionchange"  show-location :style="winStyle"></map>
      <cover-image class='kefu' src='/static/images/kefu.png' @click="gotoService"></cover-image>
      <div v-show="showDetail" class="all-bg">
      <cover-view class='dw-bg' @click="hidentap"></cover-view>
      <cover-image class='bg' src='/static/images/dw_bg.png' ></cover-image>
      <cover-image src='/static/images/dw_call.png' @click='callSomeone' class='dw_call'></cover-image>
      <cover-image :src='service.iconPath' class='dw_head'></cover-image>
      <cover-view class='dw-text-body'>{{service.description}}</cover-view>
      <cover-view class='dw-text-name'>{{service.name}}</cover-view>
      <cover-view class='dw-text-type'>{{service.type}}</cover-view>
      <cover-view class='dw-text-location'>{{service.location}}</cover-view>
      <cover-view class='dw-text-title'>{{service.title}}</cover-view>
      </div>
  </div>
</template>

<script>
import wx from 'wx';
import api from '@/utils/api';

export default {
  data () {
    return {
      service: {
        iconPath: 'https://api2.huanjiaohu.com/user/getAvatar?userId=5157',
        name: '',
        cityName: '',
        location: '',
        title: '',
        description: '',
        phone: '',
        type: ''
      },
      scale: 11,
      centerX: 121.475186,
      centerY: 31.228725,
      winStyle: 'width: 100%; height: 400px;',
      markers: [],
      showDetail: false
    }
  },
  async mounted () {
    const markers = []
    const serviceList = await api.getServiceList({'provinces': 'china'});
    for (let item of serviceList) {
      let marker = this.createMarker(item)
      markers.push(marker)
    }
    this.markers = markers
  },
  methods: {
    gotoService () {
      wx.navigateTo({
        url: '../help/index'
      })
    },
    callSomeone () {
      wx.makePhoneCall({
        phoneNumber: this.service.phone
      })
    },
    getUserInfo () {
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    regionchange (e) {
      if (e.type === 'end') {
        this.scale = e.scale
      }
    },
    markertap (e) {
      this.showDetail = true
      let maker = null
      for (let item of this.markers) {
        if (item.id === e.mp.markerId) {
          maker = item
        }
      }
      this.service = maker
    },
    hidentap (e) {
      this.showDetail = false
    },
    controltap (e) {
      this.moveToLocation()
    },
    moveToLocation: function () {
      this.mapCtx.moveToLocation()
    },
    createMarker (point) {
      let latitude = point.latitude
      let longitude = point.longitude
      this.includePoints = {
        latitude: latitude,
        longitude: longitude
      }
      let marker = {
        id: point.id || 0,
        name: point.name || '',
        latitude: latitude,
        longitude: longitude,
        width: 36,
        height: 36,
        userId: point.user_id,
        cityName: point.city_name,
        location: point.location,
        phone: point.phone,
        title: point.title,
        description: point.description,
        type: point.type,
        callout: {},
        iconPath: 'https://api2.huanjiaohu.com/user/getAvatar?userId=' + point.user_id
      }
      return marker
    }

  },

  created () {
    this.getUserInfo()
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let latitude = res.latitude
        let longitude = res.longitude
        this.centerX = longitude
        this.centerY = latitude
        this.scale = 12
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        let mapWidth = res.windowWidth
        let mapHeight = res.windowHeight
        this.winStyle = 'width:' + mapWidth + 'px;height:' + mapHeight + 'px;'
      }
    })
  },
  onShareAppMessage (options) {
    return {
      title: '礁岩海水到位服务',
      imageUrl: '/static/images/daowei.jpg'
    }
  }

}
</script>

<style scoped>
#map {
  padding: 40rpx;
}
.dw_msg{
  width: 30px;
  height: 30px;
  bottom:5%;
  position:absolute;
  left: 8%;
}
.dw_call{
  width: 70px;
  height: 30px;
  bottom:3%;
  position:absolute;
  right: 8%;
}
.bg{
  width: 94%;
  height: 45%;
  position: absolute;
  left: auto;
  right: auto;
  bottom: 1%;
}
.dw-text-body{
  width:85% ;
  top: 76%;
  position:absolute;
  font-size:12px;
  white-space:normal;
  left: 8%;
  color: #777;
  line-height:1.5;
}
.dw-text-name{
  width: 60%;
  bottom: 34%;
  position:absolute;
  font-size:18px;
  white-space:nowrap;
  left: 8%;
  line-height:1.4;
}
.dw_head{
  width:50px;
  height:50px;
  border-radius:50%;
  bottom:38%;
  position:absolute;
  left:10%;
  background-color:white;
  border:solid 4px white;
}
.dw-text-type{
  width: 25%;
  bottom: 34.5%;
  position:absolute;
  font-size:15px;
  white-space:normal;
  right: 8%;
  color:#777;
  white-space:normal;
  text-align:right;
}
.dw-text-location{
  width: 84%;
  bottom: 31%;
  position:absolute;
  font-size:12px;
  white-space:nowrap;
  left:8%;
  color:#777;
}
.dw-text-title{
  width: 85%;
  bottom: 24%;
  position:absolute;
  font-size:15px;
  white-space:normal;
  left:8%;
  color:rgb(17, 130, 196);
  line-height: 1.8;
}
.all-bg{
  width: 94%;
  left: 5%;
}
.cover-view
{
  line-height: 1;
}
.dw-bg
{
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left: 0;
  background-color: rgba(0,0,0,.6)
}
.kefu{
  width: 55px;
  height: 55px;
  position: absolute;
  top: 5%;
  right: 5%;
  animation:twinkling 2s 3 ease-in-out;
}
@-webkit-keyframes twinkling {
0% {
	opacity:0.5;
	filter:alpha(opacity=50);
	-webkit-transform:scale(1);
}
50% {
	opacity:1;
	filter:alpha(opacity=100);
	-webkit-transform:scale(1.12);
}
100% {
	opacity:0.5;
	filter:alpha(opacity=50);
	-webkit-transform:scale(1);
}
}
</style>
