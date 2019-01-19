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
                <wux-col span="9">
                    <wux-notice-bar content="喜大普奔！礁岩海水小程序上线了！礁岩海水小程序上线了" loop speed="50"/>
                </wux-col>
                <wux-col span="3">
                    <view   class='location-select-btn'  @click='selectProvince'>上海</view>
                    <wux-select id="province" />
                </wux-col>
    </wux-row>
  </view>
  
  <view class="m-menu">
    <navigator  class="item" :url="item.url" v-for="item of channel" :key="item.id">
      <img :src="item.icon_url" background-size="cover" />
      <text>{{item.name}}</text>
    </navigator>
  </view>

  <view class="row">
    <wux-wing-blank>
    <wux-row>
                <wux-col span="2">
                  礁岩<br>头条
                </wux-col>
                <wux-col span="10">
                     <wux-row>
                                <wux-col span="2">
                                  <wux-tag color="red">最热</wux-tag>
                                </wux-col>
                                <wux-col span="10">
                                    喜大普奔！礁岩海水小程序上线了！礁岩海水小程序上线了
                                </wux-col>
                     </wux-row>
                     <wux-row>
                                <wux-col span="2">
                                  <wux-tag color="blue">最新</wux-tag>
                                </wux-col>
                                <wux-col span="10">
                                    喜大普奔！礁岩海水小程序上线了！礁岩海水小程序上线了
                                </wux-col>
                     </wux-row>
                </wux-col>
    </wux-row>
    </wux-wing-blank>
  </view>
          <wux-white-space/>
          <view class="row">
              <wux-wing-blank >
                <wux-card title="最新团购"   thumb="/static/images/footprint.png">
                    <view slot="body">
                     <groupItem/>
                                          <groupItem/>

                    </view>
                </wux-card>
             </wux-wing-blank>
          </view>
           <wux-white-space/>
          <view class="row">
              <wux-wing-blank >
                <wux-card title="最新商品"   thumb="/static/images/footprint.png">
                    <view slot="body">
                     最新商品
                    </view>
                </wux-card>
             </wux-wing-blank>
          </view>
          <wux-white-space/>
          <view class="row">
              <wux-wing-blank >
                <wux-card title="最新零售"   thumb="/static/images/footprint.png">
                    <view slot="body">
                     最新零售
                    </view>
                </wux-card>
             </wux-wing-blank>
          </view>
         
</view>
</template>

<script>
// import api from '@/utils/api'
import { $wuxSelect } from '../../../static/wux/index'
import groupItem from '@/components/groupItem'

export default {
  components: {
    groupItem
  },
  data () {
    return {
      title3: '',
      value3: '',
      'banner': [{
        'id': 1,
        'ad_position_id': 1,
        'media_type': 1,
        'name': '合作 谁是你的菜',
        'link': '/pages/category/category?id=1005002',
        'image_url': 'https://static.huanjiaohu.com/mini/index/banner1.jpg',
        'content': '合作 谁是你的菜',
        'end_time': 0,
        'enabled': 1
      }, {
        'id': 2,
        'ad_position_id': 1,
        'media_type': 1,
        'name': '活动 美食节',
        'link': '/pages/category/category?id=1005001',
        'image_url': 'https://static.huanjiaohu.com/mini/index/banner2.jpg',
        'content': '活动 美食节',
        'end_time': 0,
        'enabled': 1
      }, {
        'id': 3,
        'ad_position_id': 1,
        'media_type': 1,
        'name': '活动 母亲节',
        'link': '/pages/category/category?id=1005000',
        'image_url': 'https://static.huanjiaohu.com/mini/index/banner3.jpg',
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
        'name': '活动',
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
    selectProvince () {
      $wuxSelect('#province').open({
        value: this.value3,
        options: [{
          title: '画画',
          value: '1'
        },
        {
          title: '打球',
          value: '2'
        },
        {
          title: '唱歌',
          value: '3'
        },
        {
          title: '游泳',
          value: '4'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '睡觉',
          value: '6'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        },
        {
          title: '健身',
          value: '5'
        }
        ],
        onConfirm: (value, index, options) => {
          console.log('onConfirm', value, index, options)
        }
      })
    }
  },

  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      title: '礁岩海水',
      desc: '礁岩海水',
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
  width: 80rpx;
  height: 80rpx;
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

.location-select-btn{
background-color:transparent;
background-image: url("https://static.huanjiaohu.com/mini/index/triangle.png");
background-position-x: right;
background-position-y: center;
background-repeat: no-repeat;
margin-right:5px;
line-height: 36px;
border: none;
border-radius: 0;
padding: 0;
font-size: 12px;
text-align: center;
}
._wux-notice-bar > .wux-notice-bar {
  background: white;
}

</style>