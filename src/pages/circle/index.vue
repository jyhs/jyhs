<template >
  <view class="container">
    <view class='row'>
              <navigator @click='setting'>
                  <wux-row>
                          <wux-col span="11">
                                    <cardItem :item="user"/>
                          </wux-col>
                          <wux-col span="1">
                            <view class="setting">&nbsp;</view>
                          </wux-col>
                  </wux-row>
              </navigator>
  </view>
    <view class="row">
      <wux-tabs class="tabAll" defaultCurrent="tab1" theme="positive">
        <wux-tab key="tab1" title="最新"></wux-tab>
        <wux-tab key="tab2" title="最热"></wux-tab>
        <wux-tab key="tab3" title="省市"></wux-tab>
        <wux-tab key="tab4" title="我的"></wux-tab>
      </wux-tabs>
    </view>
    <scroll-view scroll-y="true" style="height: 100%">
      <view v-for="friend of friends" :key="friend.id">
        <cardItem :item="friend"/>
        <wux-white-space size="small"/>
      </view>
      <loadMore :reflash="reflash"/>
    </scroll-view>
    <wux-gallery id="wux-gallery"/>
    <cover-image class='add' src='https://static.huanjiaohu.com/mini/index/ydhg_btn.png' @click="add"></cover-image>
      <wux-popup position="bottom" :visible="isPopup">
    <wux-cell-group class="pop_setaqua" title="第一次使用需要开缸">
        <wux-cell  title="鱼缸类型">
                  <wux-segmented-control slot="footer" default-current="-1" @change="typeChange" theme="positive"	 :values="value1" />
        </wux-cell>
        <wux-cell  title="过滤方式">
                  <wux-segmented-control slot="footer" default-current="-1" @change="filterChange" theme="positive"	 :values="value2" />
        </wux-cell>
        <wux-cell  title="过滤系统">
                  <wux-segmented-control slot="footer" default-current="-1" @change="systemChange" theme="positive"	 :values="value3" />
        </wux-cell>
        <wux-cell  title="鱼缸尺寸">
                  <wux-segmented-control slot="footer" default-current="-1" @change="sizeChange" theme="positive"	 :values="value4" />
        </wux-cell>
        <wux-cell hover-class="none">
            <wux-button block type="positive" @tap="open">开缸</wux-button>
        </wux-cell>
    </wux-cell-group>
</wux-popup>
  </view>
</template>

<script>
import cardItem from '@/components/cardItem';
import loadMore from '@/components/loadMore';
import wx from 'wx';
import { setTimeout } from 'timers';

export default {
  components: {
    cardItem,
    loadMore
  },
  data () {
    return {
      title3: '',
      reflash: false,
      user: {},
      isPopup: false,
      value1: ['SPS缸', 'LPS缸', 'FOT缸'],
      value2: ['底滤', '背滤'],
      value3: ['柏林系统', 'ZEO', 'ATS'],
      value4: ['微缸<30cm', '小型<45cm', '中型<80cm', '大型>80cm'],
      friends: [
        {
          id: 0,
          headimgurl: 'https://api.huanjiaohu.com/user/getAvatar?userId=5482',
          link: '../goods/goods?id=1135002',
          time: '2019-01-20',
          name: 'York',
          city_name: '上海',
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
          time: '2019-01-20',
          name: 'Tony',
          city_name: '上海',
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
          time: '2019-01-20',
          name: 'Tony',
          city_name: '上海',
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
      ]
    };
  },
  mounted () {
    const user = wx.getStorageSync('userInfo', this.userInfo);
    if (user) {
      user.title = '我的云端海缸';
      this.user = user;
    } else {
      wx.reLaunch({
        url: '/pages/ucenter/login'
      });
    }
  },
  methods: {
    add (e) {
      wx.navigateTo({
        url: '/pages/circle/circlePost'
      });
    },
    setting () {
      this.isPopup = true;
    },
    open () {
      wx.showToast({
        title: '开缸成功',
        duration: 2000,
        complete: () => {
          this.isPopup = false;
          wx.navigateTo({
            url: '/pages/circle/circle'
          });
        }
      })
    },
    typeChange (e) {
      console.log(e.mp.detail.key)
    },
    sizeChange (e) {
      console.log(e.mp.detail.key)
    },
    systemChange (e) {
      console.log(e.mp.detail.key)
    },
    filterChange (e) {
      console.log(e.mp.detail.key)
    }
  },
  onReachBottom () {
    this.reflash = true;
    setTimeout(() => {
      this.friends.push({
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
      });
      this.friends.push({
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
      });
      this.reflash = false;
    }, 2000);
  }
};
</script>

<style scoped>
.add{
  width: 55px;
  height: 55px;
  position: fixed;
  bottom: 1%;
  right: 5%;
}
.setting{
  display: block;
  line-height:185rpx;
  background:url(https://static.huanjiaohu.com/icon/right_arrow.png) right center no-repeat;
  background-size:42rpx;
  background-color:#ffffff;
}
.pop_setaqua .wux-cell-group__hd {padding:0 30px;}
</style>
