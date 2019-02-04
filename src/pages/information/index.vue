<template >
  <view class="container">
    <view class="row">
      <wux-search-bar
        clear=""
        show-cancel
        :value="value"
        controlled
        placeholder="搜索美篇/美图/美拍"
        @confirm="onConfirm"
        @clear="onClear"
      />
    </view>
    <view class="row">
      <wux-tabs
        class="tabAll"
        controlled
        :current="tabCurrent"
        defaultCurrent="0"
        theme="positive"
        @change="change"
      >
        <wux-tab key="0" title="美篇"></wux-tab>
        <wux-tab key="1" title="美图"></wux-tab>
        <wux-tab key="2" title="美拍"></wux-tab>
      </wux-tabs>
    </view>
    <swiper :style="winStyle" :current="current" @change="swiperChange">
      <swiper-item>
        <view class="row">
          <scroll-view scroll-y="true" style="height: 100%">
            <block v-for="item in informationList.item" :key="item.media_id">
              <oneCard :data="item"/>
            </block>
            <loadMore :reflash="reflash"/>
          </scroll-view>
        </view>
      </swiper-item>
      <swiper-item>
        <scroll-view scroll-y="true" style="height: 100%">
          <div class="img_all">
            <block v-for="(it,index) of imageList" :key="index">
              <view class="list_img" @tap="showGallery(index,$event)" :data-current="index">
                <img :src="it">
              </view>
            </block>
          </div>
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view scroll-y="true" style="height: 100%">
          <view style="background:#ffffff">
            <wux-cell
              :title="it.name"
              is-link
              v-for="(it,index) of videoList.item"
              :key="index"
              @click="clickItem(it)"
            />
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
    <wux-gallery id="wux-gallery"/>
  </view>
</template>

<script>
import loadMore from '@/components/loadMore';
import oneCard from '@/components/oneCard';
import api from '@/utils/api';
import { $wuxGallery } from '../../../static/wux/index';
import wx from 'wx';
export default {
  components: {
    loadMore,
    oneCard
  },
  async onLoad () {
    this.informationList = await api.getInformationList({
      page: this.newPage,
      size: 10,
      type: 'news'
    });
    const imageList = await api.getInformationList({
      page: this.imgPage,
      size: 30,
      type: 'image'
    });
    this.videoList = await api.getInformationList({
      page: this.imgPage,
      size: 30,
      type: 'video'
    });

    const imgaes = [];
    for (let img of imageList.item) {
      imgaes.push(img.url);
    }
    this.imageList = imgaes;
    this.winStyle =
      'width:100%;height:' + this.informationList.item.length * 370 + 'px;';
  },
  data () {
    return {
      reflash: false,
      value: '',
      current: 0,
      tabCurrent: 0,
      informationList: {},
      videoList: {},
      imageList: [],
      newPage: 1,
      imgPage: 1,
      winStyle: 'width:100%;height:100%'
    };
  },
  async onReachBottom () {
    this.reflash = true;
    this.newPage = this.newPage + 10;
    const informationList = await api.getInformationList({
      page: this.newPage,
      size: 10,
      type: 'news'
    });
    informationList.item = this.informationList.item.concat(
      informationList.item
    );
    this.informationList = informationList;
    this.winStyle =
      'width:100%;height:' + this.informationList.item.length * 370 + 'px;';
    this.reflash = false;
  },
  methods: {
    async clickItem (e) {
      const informationList = await api.getInformationById({
        id: e.media_id
      });
      wx.setStorageSync(e.media_id, informationList.down_url);
      wx.navigateTo({
        url: '/pages/information/detail?media_id=' + e.media_id
      })
    },
    swiperChange (e) {
      this.tabCurrent = e.mp.detail.current;
    },
    change (e) {
      this.current = e.mp.detail.key;
    },
    onConfirm () {
      console.log('onConfirm');
    },
    onClear () {
      this.value = '';
    },
    showGallery (index, e) {
      const { current } = e.currentTarget.dataset;
      const urls = this.imageList;
      this.$wuxGallery = $wuxGallery();
      this.$wuxGallery.show({
        showDelete: false,
        current,
        urls,
        [`delete`]: (current, urls) => {
          urls.splice(current, 1);
          this.setData({
            urls
          });
          return true;
        },
        cancel () {
          console.log('Close gallery');
        },
        onTap (current, urls) {
          console.log(current, urls);
          return true;
        },
        onChange (e) {
          console.log(e);
        }
      });
    }
  }
};
</script>

<style scoped>
.item-style {
  background-color: white;
  border-radius: 5px;
}
.item-style .title {
  font-size: 14px;
}
.item-style .description {
  font-size: 12px;
  color: #888;
}

.list_img {
  width: 33%;
  height: 90px;
  display: inline-block;
}
.list_img:nth-child(2),
.list_img:nth-child(3) {
  margin-left: 0.5%;
}
.list_img > img {
  width: 100%;
  height: 100%;
}
video {
  position: static;
}
</style>
