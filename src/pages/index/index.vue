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
          <wux-notice-bar content="喜大普奔！礁岩海水小程序上线了！礁岩海水小程序上线了" loop speed="50"/>
        </wux-col>
        <wux-col span="3">
          <view class="location-select-btn" @click="selectProvince">
            <wux-icon type="ios-pin" color="#A3A3A3" size="16"/>&nbsp;上海
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
    <wux-divider dashed position="left" text="最新团购"/>
    <view class="row">
      <groupItem/>
      <wux-white-space/>
      <groupItem/>
    </view>
    <wux-white-space/>
    <swiper class="banner2" autoplay="true" interval="3000" duration="1000">
      <swiper-item v-for="item of banner2" :key="item.id">
        <navigator :url="item.link">
          <img :src="item.image_url" background-size="cover">
        </navigator>
      </swiper-item>
    </swiper>
    <wux-divider dashed position="left" text="最新商品"/>
    <view class="row">
      <view class="index-section index-new">
        <view class="b">
          <view class="item" v-for="item of newGoods" :key="item.id">
            <navigator :url="'../goods/goods?id='+ item.id">
              <img class="img" :src="item.list_pic_url" background-size="cover">
              <text class="name">{{item.name}}</text>
              <text class="price">￥{{item.retail_price}}</text>
            </navigator>
          </view>
        </view>
      </view>
    </view>
    <wux-white-space/>
    <swiper class="banner2" autoplay="true" interval="3000" duration="1000">
      <swiper-item v-for="item of banner2" :key="item.id">
        <navigator :url="item.link">
          <img :src="item.image_url" background-size="cover">
        </navigator>
      </swiper-item>
    </swiper>
    <wux-divider dashed position="left" text="最新零售"/>
    <view class="row">
      <retailItem/>
      <wux-white-space/>
      <retailItem/>
    </view>
    <wux-white-space/>
    <swiper class="banner2" autoplay="true" interval="3000" duration="1000">
      <swiper-item v-for="item of banner2" :key="item.id">
        <navigator :url="item.link">
          <img :src="item.image_url" background-size="cover">
        </navigator>
      </swiper-item>
    </swiper>
    <wux-divider dashed position="left" text="最新鱼圈"/>
    <view class="row">
                  <wux-gallery id="wux-gallery"/>
      <friendItem v-for="user in userList" :key="user.id" :user='user'/>
    </view>
    <swiper class="banner2" autoplay="true" interval="3000" duration="1000">
      <swiper-item v-for="item of banner2" :key="item.id">
        <navigator :url="item.link">
          <img :src="item.image_url" background-size="cover">
        </navigator>
      </swiper-item>
    </swiper>
    <wux-divider dashed position="left" text="最新百科"/>
    <view class="row">
      <materilItem/>
      <wux-white-space/>
      <materilItem/>
    </view>
    <wux-white-space/>
  </view>
</template>

<script>
// import api from '@/utils/api'
import { $wuxSelect } from '../../../static/wux/index';
import groupItem from '@/components/groupItem';
import retailItem from '@/components/retailItem';
import friendItem from '@/components/friendItem';
import materilItem from '@/components/materilItem';

export default {
  components: {
    groupItem,
    retailItem,
    friendItem,
    materilItem
  },
  data () {
    return {
      title3: '',
      value3: '',
      userList: [
        {
          id: 0,
          urls: [
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=206',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=207',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=208'
          ]
        },
        {
          id: 1,
          urls: [
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=209',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=210',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=211'
          ]
        }
      ],
      newGoods: [
        {
          id: 1134030,
          name: '简约知性记忆棉坐垫',
          list_pic_url:
            'http://yanxuan.nosdn.127.net/aa49dfe878becf768eddc4c1636643a6.png',
          retail_price: 46
        },
        {
          id: 1134032,
          name: '趣味粉彩系列记忆棉坐垫',
          list_pic_url:
            'http://yanxuan.nosdn.127.net/8b30eeb17c831eba08b97bdcb4c46a8e.png',
          retail_price: 49
        },
        {
          id: 1135002,
          name: '宫廷奢华真丝四件套',
          list_pic_url:
            'http://yanxuan.nosdn.127.net/45548f26cfd0c7c41e0afc3709d48286.png',
          retail_price: 2599
        },
        {
          id: 1152161,
          name: '竹语丝麻印花四件套',
          list_pic_url:
            'http://yanxuan.nosdn.127.net/977401e75113f7c8334c4fb5b4bf6215.png',
          retail_price: 459
        }
      ],
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
      ]
    };
  },
  async mounted () {},

  methods: {
    selectProvince () {
      $wuxSelect('#province').open({
        value: this.value3,
        options: [
          {
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
          console.log('onConfirm', value, index, options);
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