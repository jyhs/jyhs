<template >
  <view class="container">
    <view class="row">
      <wux-tabs class="tabAll" defaultCurrent="tab1" theme="positive">
        <wux-tab key="tab1" title="最新"></wux-tab>
        <wux-tab key="tab2" title="最热"></wux-tab>
        <wux-tab key="tab3" title="按城市"></wux-tab>
        <wux-tab key="tab4" title="按类型"></wux-tab>
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
  </view>
</template>

<script>
import cardItem from '@/components/cardItem';
import loadMore from '@/components/loadMore';

export default {
  components: {
    cardItem,
    loadMore
  },
  data () {
    return {
      title3: '',
      value3: '',
      reflash: false,
      friends: [
        {
          id: 0,
          avatar: 'https://api.huanjiaohu.com/user/getAvatar?userId=5482',
          link: '../goods/goods?id=1135002',
          tags: ['最新'],
          time: '2019-01-20',
          title: '我的鱼缸',
          name: 'York',
          city: '上海',
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
          avatar: 'https://api.huanjiaohu.com/user/getAvatar?userId=5481',
          link: '../goods/goods?id=1135002',
          tags: ['最热'],
          time: '2019-01-20',
          title: '我的鱼缸',
          name: 'Tony',
          city: '上海',
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
          avatar: 'https://api.huanjiaohu.com/user/getAvatar?userId=5481',
          link: '../goods/goods?id=1135002',
          tags: ['最热'],
          time: '2019-01-20',
          title: '我的鱼缸',
          name: 'Tony',
          city: '上海',
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
      ]
    };
  },
  onReachBottom () {
    this.reflash = true;
    setTimeout(() => {
      this.friends.push({
        id: 1,
        avatar: 'https://api.huanjiaohu.com/user/getAvatar?userId=5481',
        link: '../goods/goods?id=1135002',
        tags: ['最热'],
        time: '2019-01-20',
        title: '我的鱼缸',
        name: 'Tony',
        city: '上海',
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
        avatar: 'https://api.huanjiaohu.com/user/getAvatar?userId=5481',
        link: '../goods/goods?id=1135002',
        tags: ['最热'],
        time: '2019-01-20',
        title: '我的鱼缸',
        name: 'Tony',
        city: '上海',
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

<style>
</style>
