<template >
  <view class="container">
    <view class="row">
      <scroll-view scroll-y="true" :style="winStyle">
        <block v-for="item in activingList" :key="item.id" v-if='item.content.news_item[0].status==1'>
          <bigCard :data="item"/>
        </block>
        <loadMore :reflash="reflash"/>
      </scroll-view>
    </view>
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
    this.page = 1;
    const activingList = await api.getActiveList({
      page: this.page,
      size: 10
    });
    for (const active of activingList) {
      for (const item of active.content.news_item) {
        item['navigator_url'] = '/pages/webview/index?id=' + item.id;
      }
    }
    this.activingList = activingList;
    this.winStyle =
      'width:100%;height:' + this.activingList.length * 370 + 'px;';
  },
  data () {
    return {
      reflash: false,
      value: '',
      page: 1,
      activingList: [],
      winStyle: 'width:100%;height:100%'
    };
  },
  async onReachBottom () {
    this.reflash = true;
    this.page = this.page + 1;
    const list = await api.getActiveList({
      page: this.page,
      size: 10
    });
    const newList = this.activingList.concat(
      list
    );
    this.activingList = newList;
    this.winStyle =
      'width:100%;height:' + this.activingList.length * 370 + 'px;';
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
</style>
