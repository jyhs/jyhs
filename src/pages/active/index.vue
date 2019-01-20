<template >
    <view class="container">
        <view class='row'>
       <wux-search-bar
      clear=""
      show-cancel
      :value="value"
      controlled
      placeholder="搜索活动"
      @confirm="onConfirm"
      @clear="onClear"
    />
  </view>
        <scroll-view scroll-y="true" style="height: 100%">
            <block v-for="item in data" :key="item.id">
                <oneCard :data="item"/>
            </block>
            <loadMore :reflash="reflash"/>
        </scroll-view>
    </view>
</template>

<script>
import loadMore from '@/components/loadMore';
import oneCard from '@/components/oneCard';

import { setTimeout } from 'timers';
export default {
  components: {
    loadMore,
    oneCard
  },
  data () {
    return {
      reflash: false,
      data: [{
        id: 1,
        width: '375px',
        height: '180px',
        src: 'https://static.huanjiaohu.com/image/ad/china/1.jpg?r=0.609779170857945',
        title: '淘宝开张了',
        comment: {
          goodNumber: 10,
          commentNumber: 20
        },
        share: true
      }, {
        id: 1,
        width: '375px',
        height: '180px',
        src: 'https://static.huanjiaohu.com/image/ad/china/2.jpg?r=0.609779170857945',
        title: '淘宝开张了',
        comment: {
          goodNumber: 10,
          commentNumber: 20
        },
        share: true,
        time: '2019年01月20日'
      }, {
        id: 1,
        width: '375px',
        height: '180px',
        src: 'https://static.huanjiaohu.com/image/ad/china/3.jpg?r=0.609779170857945',
        title: '淘宝开张了',
        comment: {
          goodNumber: 10,
          commentNumber: 20
        },
        share: true
      }, {
        id: 1,
        width: '375px',
        height: '180px',
        src: 'https://static.huanjiaohu.com/image/ad/china/4.jpg?r=0.609779170857945',
        title: '淘宝开张了',
        comment: {
          goodNumber: 10,
          commentNumber: 20
        },
        share: true,
        time: '2019年01月19日'
      }],
      refreshing: false
    };
  },
  onReachBottom () {
    this.reflash = true;
    setTimeout(() => {
      this.data.push({
        id: 1,
        width: '375px',
        height: '180px',
        src: 'https://static.huanjiaohu.com/image/ad/china/1.jpg?r=0.609779170857945',
        title: '淘宝开张了',
        comment: {
          goodNumber: 10,
          commentNumber: 20
        },
        share: true
      });
      this.data.push({
        id: 1,
        width: '375px',
        height: '180px',
        src: 'https://static.huanjiaohu.com/image/ad/china/1.jpg?r=0.609779170857945',
        title: '淘宝开张了',
        comment: {
          goodNumber: 10,
          commentNumber: 20
        },
        share: true,
        time: '2019年01月14日'
      });
      this.reflash = false;
    }, 3000)
  },
  methods: {
    onConfirm () {
      console.log('onConfirm');
    },
    onClear () {
      this.value = '';
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
