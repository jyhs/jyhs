<template >
  <view class="container">
    <view class="row">
      <wux-tabs
        class="tabAll"
        controlled
        :current="tabCurrent"
        defaultCurrent="0"
        theme="positive"
        @change="change"
      >
        <wux-tab key="0" title="进行中"></wux-tab>
        <wux-tab key="1" title="已结束"></wux-tab>
      </wux-tabs>
    </view>
    <swiper :style="winStyle" :current="current" @change="swiperChange">
      <swiper-item>
        <view class="row">
          <scroll-view scroll-y="true" style="height: 100%">
            <block v-for="item in activingList" :key="item.id">
              <bigCard :data="item"/>
            </block>
          </scroll-view>
        </view>
      </swiper-item>
      <swiper-item>
         <view class="row">
          <scroll-view scroll-y="true" style="height: 100%">
            <block v-for="item in noActivingList" :key="item.id">
              <bigCard :data="item"/>
            </block>
            <loadMore :reflash="reflash"/>
          </scroll-view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import loadMore from '@/components/loadMore';
import bigCard from '@/components/bigCard';
import api from '@/utils/api';
import wx from 'wx';
export default {
  components: {
    loadMore,
    bigCard
  },
  async onLoad () {
    // this.winStyle =
    //   'width:100%;height:' + this.informationList.item.length * 370 + 'px;';
  },
  data () {
    return {
      reflash: false,
      value: '',
      current: 0,
      tabCurrent: 0,
      activingList: [],
      noActivingList: [],
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

</style>
