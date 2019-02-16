<template >
  <view class="container">
     <scroll-view scroll-y="true" style="height: 100%">
            <block v-for="item in informationList.item" :key="item.media_id">
              <bigCard :data="item"/>
            </block>
            <loadMore :reflash="reflash"/>
          </scroll-view>
  </view>
</template>

<script>
import loadMore from '@/components/loadMore';
import bigCard from '@/components/bigCard';
import api from '@/utils/api';
export default {
  components: {
    loadMore,
    bigCard
  },
  async onShow () {
    this.loadInformation();
  },
  data () {
    return {
      reflash: false,
      value: '',
      current: 0,
      tabCurrent: 0,
      informationList: {},
      newPage: 1,
      winStyle: 'width:100%;margin-top:44px;height:100%'
    };
  },
  async onReachBottom () {
    this.reflash = true;
    this.newPage = this.newPage + 10;
    const informationList = await api.getActiveList({
      page: this.newPage,
      size: 10,
      type: 'news'
    });
    informationList.item = this.informationList.item.concat(
      informationList.item
    );
    for (const item of informationList.item) {
      for (const it of item.content.news_item) {
        delete it['content'];
        it['navigator_url'] = '/pages/webview/index?id=' + it.thumb_media_id;
        it['id'] = it.thumb_media_id;
      }
    }
    this.informationList = informationList;
    this.winStyle = 'width:100%;margin-top:44px;height:' + this.informationList.item.length * 370 + 'px;';
    this.reflash = false;
  },
  methods: {
    async loadInformation () {
      const informationList = await api.getActiveList({
        page: 1,
        size: 10,
        type: 'news'
      });
      for (const item of informationList.item) {
        for (const it of item.content.news_item) {
          delete it['content'];
          it['navigator_url'] = '/pages/webview/index?id=' + it.thumb_media_id;
          it['id'] = it.thumb_media_id;
        }
      }
      this.informationList = informationList;
      this.winStyle = 'width:100%;margin-top:44px;height:' + this.informationList.item.length * 370 + 'px;';
    }
  }
};
</script>

<style scoped>

</style>
