<template >
  <view class="container">
    <swiper class="banner" autoplay="true" interval="3000" duration="1000">
      <swiper-item v-for="item of banner" :key="item.id">
        <navigator :url="item.link">
          <img :src="item.image_url" background-size="cover">
        </navigator>
      </swiper-item>
    </swiper>
    <view class="row notice-bar-location">
      <wux-row>
        <wux-col span="9">
          <wux-notice-bar size="12" content="喜大普奔！礁岩海水小程序上线了！礁岩海水小程序上线了" loop speed="50"/>
        </wux-col>
        <wux-col span="3">
          <view class="location-select-btn" @click="selectProvince">
            <wux-icon type="ios-pin" color="#A3A3A3" size="14"/>&nbsp;{{provinceName}}
          </view>
          <wux-select id="province"/>
        </wux-col>
      </wux-row>
    </view>
    <view class="m-menu">
      <navigator class="item" :url="item.url" v-for="item of channel" :key="item.id">
        <img :src="item.icon_url" background-size="cover">
        <text>{{item.name}}</text>
      </navigator>
    </view>
    <view class="row jytt_module">
      <wux-wing-blank>
        <wux-row>
          <wux-col span="2"></wux-col>
          <wux-col span="8">
            <wux-row prefixCls="jytt_text">
              <wux-col span="2">
                <wux-tag color="red">最热</wux-tag>
              </wux-col>
              <wux-col span="10" class="wux-ellipsis--l3">喜大普奔！礁岩海水小程序上线了！</wux-col>
            </wux-row>
            <wux-row>
              <wux-col span="2">
                <wux-tag color="blue">最新</wux-tag>
              </wux-col>
              <wux-col span="10" class="wux-ellipsis--l3">喜大普奔！礁岩海水小程序上线了！</wux-col>
            </wux-row>
          </wux-col>
          <wux-col span="2"></wux-col>
        </wux-row>
      </wux-wing-blank>
    </view>
    <title  text="最新团购"/>
    <view class="row">
      <view v-if="groupList.length>0">
           <view v-for="group of groupList" :key="group.id">
                <cardItem :item='group'/>
                <wux-white-space size="small" />
            </view>
      </view>
      <view v-else class="wux-text--center">
          亲，热团都结束了
          <wux-white-space/>
      </view>
    </view>
    <wux-white-space size="small" />
    <swiper class="banner2" autoplay="true" interval="4000" duration="1500">
      <swiper-item v-for="item of banner2" :key="item.id">
        <navigator :url="item.link">
          <img :src="item.image_url" background-size="cover">
        </navigator>
      </swiper-item>
    </swiper>
    <title text="最新商品"/>
    <view class="row">
            <goodsItem :goodsList="goods"/>
    </view>
    <wux-white-space size="small" />
    <swiper class="banner2" autoplay="true" interval="3000" duration="1000">
      <swiper-item v-for="item of banner2" :key="item.id">
        <navigator :url="item.link">
          <img :src="item.image_url" background-size="cover">
        </navigator>
      </swiper-item>
    </swiper>
    <title text="最新零售"/>
    <view class="row">
      <view v-if="retailList.length>0">
         <view v-for="retail of retailList" :key="retail.id">
          <cardItem :item='retail'/>
          <wux-white-space size="small" />
         </view>
      </view>
       <view v-else class="wux-text--center">
          亲，当前省暂时还没有零售商家
          <wux-white-space/>
      </view>
    </view>
    <wux-white-space size="small" />
    <swiper class="banner2" autoplay="true" interval="3000" duration="1000">
      <swiper-item v-for="item of banner2" :key="item.id">
        <navigator :url="item.link">
          <img :src="item.image_url" background-size="cover">
        </navigator>
      </swiper-item>
    </swiper>
    <title text="最新鱼圈"/>
    <view class="row">
       <view v-for="friend of friends" :key="friend.id">
          <cardItem :item='friend'/>
          <wux-white-space size="small" />
      </view>
    </view>
    <swiper class="banner2" autoplay="true" interval="3000" duration="1000">
      <swiper-item v-for="item of banner2" :key="item.id">
        <navigator :url="item.link">
          <img :src="item.image_url" background-size="cover">
        </navigator>
      </swiper-item>
    </swiper>
    <title text="最新百科"/>
    <view class="row">
       <view v-for="item of materials" :key="item.id" :class="(index + 1) % 2 === 0 ? 'item-b item' : 'item'"
                   @click="$router.push({ path: '/pages/material/index', query: { id: item.id } })" >
                      <smallCard :item="item"/>
                      <wux-white-space size="small" />
       </view>
    </view>
    <wux-white-space size="small" />
    <wux-gallery id="wux-gallery"/>
  </view>
</template>

<script>
import { $wuxSelect } from '../../../static/wux/index';
import cardItem from '@/components/cardItem';
import goodsItem from '@/components/goodsItem';
import smallCard from '@/components/smallCard';
import title from '@/components/title';
import api from '@/utils/api';
import wx from 'wx';

export default {
  components: {
    cardItem,
    smallCard,
    title,
    goodsItem
  },
  data () {
    return {
      materials: [],
      groupList: [],
      goods: [
        {
          id: 1135001,
          headimgurl: 'http://static.huanjiaohu.com/mini/catalog/type_device_03.jpg',
          link: '../goods/goods?id=1135002',
          tag: ['热卖中'],
          title: '武强水族蛋分',
          price: '2130'
        },
        {
          id: 1135002,
          headimgurl: 'http://static.huanjiaohu.com/mini/catalog/type_device_03.jpg',
          link: '../goods/goods?id=1135002',
          tag: ['热卖中'],
          time: '2019-01-20',
          title: '武强水族蛋分',
          name: '武强',
          city_name: '上海',
          price: '2130',
          bottom: {
            comment: '12',
            thumbs: '22'
          }
        },
        {
          id: 1135003,
          headimgurl: 'http://static.huanjiaohu.com/mini/catalog/type_device_03.jpg',
          link: '../goods/goods?id=1135002',
          tag: ['热卖中'],
          time: '2019-01-20',
          title: '武强水族蛋分',
          name: '武强',
          city_name: '上海',
          price: '2130',
          bottom: {
            comment: '12',
            thumbs: '22'
          }
        },
        {
          id: 1135004,
          headimgurl: 'http://static.huanjiaohu.com/mini/catalog/type_device_03.jpg',
          link: '../goods/goods?id=1135002',
          tag: ['热卖中'],
          time: '2019-01-20',
          title: '武强水族蛋分',
          name: '武强',
          city_name: '上海',
          price: '2130',
          bottom: {
            comment: '12',
            thumbs: '22'
          }
        }
      ],
      retailList: [],
      friends: [
        {
          id: 0,
          headimgurl: 'https://api.huanjiaohu.com/user/getAvatar?userId=5482',
          link: '../goods/goods?id=1135002',
          tag: ['最新'],
          time: '2019-01-20',
          title: '我的鱼缸',
          name: 'York',
          city_name: '上海',
          price: '2130',
          descption: '我的鱼缸很牛逼啥都有，带鱼还有好几条',
          urls: [
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=206',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=207',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=208'
          ],
          bottom: {
            comment: '12',
            thumbs: '22'
          }
        },
        {
          id: 1,
          headimgurl: 'https://api.huanjiaohu.com/user/getAvatar?userId=5481',
          link: '../goods/goods?id=1135002',
          tag: ['最热'],
          time: '2019-01-20',
          title: '我的鱼缸',
          name: 'Tony',
          city_name: '上海',
          price: '2130',
          descption: '我的鱼缸很牛逼啥都有，带鱼还有好几条',
          urls: [
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=206',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=207',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=208'
          ],
          bottom: {
            comment: '12',
            thumbs: '22'
          }
        }
      ],
      title3: '',
      value3: '',
      banner: [
        {
          id: 1,
          ad_position_id: 1,
          media_type: 1,
          name: '合作 谁是你的菜',
          link: '/pages/category/category?id=1005002',
          image_url: 'https://static.huanjiaohu.com/mini/index/banner1.jpg',
          content: '合作 谁是你的菜',
          end_time: 0,
          enabled: 1
        },
        {
          id: 2,
          ad_position_id: 1,
          media_type: 1,
          name: '活动 美食节',
          link: '/pages/category/category?id=1005001',
          image_url: 'https://static.huanjiaohu.com/mini/index/banner2.jpg',
          content: '活动 美食节',
          end_time: 0,
          enabled: 1
        },
        {
          id: 3,
          ad_position_id: 1,
          media_type: 1,
          name: '活动 母亲节',
          link: '/pages/category/category?id=1005000',
          image_url: 'https://static.huanjiaohu.com/mini/index/banner3.jpg',
          content: '活动 母亲节',
          end_time: 0,
          enabled: 1
        }
      ],
      banner2: [
        {
          id: 1,
          ad_position_id: 1,
          media_type: 1,
          name: '合作 谁是你的菜',
          link: '/pages/category/category?id=1005002',
          image_url: 'https://static.huanjiaohu.com/image/ad/sh/1.jpg',
          content: '合作 谁是你的菜',
          end_time: 0,
          enabled: 1
        },
        {
          id: 2,
          ad_position_id: 1,
          media_type: 1,
          name: '活动 美食节',
          link: '/pages/category/category?id=1005001',
          image_url: 'https://static.huanjiaohu.com/image/ad/sh/2.jpg',
          content: '活动 美食节',
          end_time: 0,
          enabled: 1
        },
        {
          id: 3,
          ad_position_id: 1,
          media_type: 1,
          name: '活动 母亲节',
          link: '/pages/category/category?id=1005000',
          image_url: 'https://static.huanjiaohu.com/image/ad/sh/3.jpg',
          content: '活动 母亲节',
          end_time: 0,
          enabled: 1
        }
      ],
      channel: [
        {
          id: 1,
          name: '商城',
          url: '/pages/mall/index',
          icon_url: 'https://static.huanjiaohu.com/mini/index/mall.png?r=123',
          sort_order: 1
        },
        {
          id: 2,
          name: '团购',
          url: '/pages/group/index',
          icon_url: 'https://static.huanjiaohu.com/mini/index/group.png?r=123',
          sort_order: 2
        },
        {
          id: 3,
          name: '活动',
          url: '/pages/active/index',
          icon_url: 'https://static.huanjiaohu.com/mini/index/active.png?r=123',
          sort_order: 3
        },
        {
          id: 4,
          name: '游戏',
          url: '/pages/game/index',
          icon_url: 'https://static.huanjiaohu.com/mini/index/game.png?r=123',
          sort_order: 4
        },
        {
          id: 5,
          name: '资讯',
          url: '/pages/information/index',
          icon_url:
            'https://static.huanjiaohu.com/mini/index/information.png?r=123',
          sort_order: 5
        }
      ],
      province: 'sh',
      provinceName: '上海'
    };
  },
  async mounted () {
    const provinceList = await api.getProvinces();
    const provinces = [];
    for (const item of provinceList) {
      if (item.code !== 'china') {
        provinces.push({
          title: item.name,
          value: item.code
        });
      }
    }
    this.provinces = provinces;
    const res = await api.getMaterialRandomList({ page: 1, size: 10 });
    this.materials = res.data;
  },
  onLoad () {
    const self = this;
    wx.getLocation({
      type: 'wgs84',
      success: async function (res) {
        const group = await api.getGroupListByLocation({ 'location': res.latitude + ',' + res.longitude });
        self.setGroupCard(group.data);
      }
    });
  },
  methods: {
    setGroupCard (groups) {
      const groupList = [];
      const retailList = [];
      for (const group of groups) {
        group.headimgurl = 'https://api.huanjiaohu.com/user/getAvatar?userId=' + group.user_id;
        group.navigator_url = '/pages/group/buy?id=' + group.id;
        group.tag = group.activity_code ? [group.activity_code] : ['热团中']
        group.time = group.end_date_format;
        group.title = group.name;
        group.name = group.contacts;
        group.city_name = group.city_name;
        group.price = group.sum;
        if (group.status === 0) {
          if (group.user_type.indexOf('lss') >= 0) {
            retailList.push(group)
          } else {
            groupList.push(group)
          }
        }
      }

      this.groupList = groupList;
      this.retailList = retailList;
    },
    selectProvince () {
      const self = this;
      $wuxSelect('#province').open({
        value: this.province,
        toolbar: {
          title: '请选择你所在的省',
          confirmText: '确定'
        },
        options: this.provinces,
        onConfirm: async function (value, index, options) {
          this.province = value;
          this.provinceName = options[index].title;
          const group = await api.getGroupListByProvince({ 'province': value });
          self.setGroupCard(group.data);
        }
      });
    }
  },

  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      title: '礁岩海水',
      desc: '礁岩海水',
      path: '/pages/index/index'
    };
  }
};
</script>

<style scoped>
.index-section {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  background: #fff;
  color: #333;
  padding-bottom: 70rpx;
}

.index-new .b {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.index-new .b .item {
  float: left;
  width: 302rpx;
  margin-top: 10rpx;
  margin-left: 21rpx;
  margin-right: 21rpx;
}

.index-new .b .item-b {
  margin-left: 42rpx;
}

.index-new .b .img {
  width: 302rpx;
  height: 302rpx;
}

.index-new .b .name {
  text-align: center;
  display: block;
  width: 302rpx;
  height: 35rpx;
  margin-bottom: 14rpx;
  overflow: hidden;
  font-size: 30rpx;
  color: #333;
}

.index-new .b .price {
  display: block;
  text-align: center;
  line-height: 30rpx;
  font-size: 30rpx;
  color: #b4282d;
}

.banner {
  width: 750rpx;
  height: 306rpx;
}

.banner image {
  width: 100%;
  height: 306rpx;
}

.banner2 {
  width: 750rpx;
  height: 140rpx;
}

.banner2 image {
  width: 100%;
  height: 140rpx;
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
  background: url("http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/index-titleArrow-219f348910.png")
    right 4rpx no-repeat;
  background-size: 16.656rpx 27rpx;
  display: inline-block;
  height: 36rpx;
  font-size: 33rpx;
  line-height: 36rpx;
}

.location-select-btn {
  background-color: transparent;
  background-image: url("https://static.huanjiaohu.com/mini/index/triangle.png");
  background-position-x: right;
  background-position-y: center;
  background-repeat: no-repeat;
  line-height: 36px;
  border: none;
  border-radius: 0;
  padding-right: 15px;
  margin-right: 10px;
  font-size: 12px;
  text-align: right;
}

.notice-bar-location {
  background: white;
}

</style>