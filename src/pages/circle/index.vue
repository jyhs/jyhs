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
      buttons: [
        {
          label: '设置',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEUklEQVRYR7WXeaxdYxTFfyuGGGMmZm1VhJpqSomhqGgMJUFIHtKIWZCgpAQ1UyJIoyUkpEVjFjEPESSGihClhhBKlagQxBSWrJfvXOe9d8+796L7n/ty3tnfWWfvtdfaR/QYtkcDGzakLZa0oJcj1cvNtkcCHwDLNuT9BWwj6b1uz+0VwAnArcANwELgJ+Dn8rsWcAdwlqQblxaAa4ApwEqSfqk/xPYKQK7dJOnMpQXgfmC8pLztkLD9DfCapIP/NQDbuwGXAV+lpJKez2G2RwH5e4mksQ0AXgU2LiA/LHl7AicB6wNXSHqunjuAA7aXA0Kg1YE1gGWAT4AXgb6SOFXSdQ0ALgAuKnmzgd2BzYE/Ck/SopGSfqvyBwM4G8jh+wAfAycDJwJrAw8Cp0tKZRrD9rrljGOAb4FZ4QWwI/A4cLGkS4cAsJ03/gx4RdLE6gbbywPbSprXbV9L6bcH3q+/re2HgQnAaEmLcl+rArZnAhmz7SS928vDur3XdvjxETBX0nEtALa3AvLQOyVN7lDi8OR4IO1KfxOpXLRhlqRfO+RPDRmBsZLe6q+A7RnAqYUgnzYdUPobFo8BvgeeBBanRYU3keEJkr4Y5ozIeADfK6mvAnAEcA/wDnCopM8bWJ6HjwPC9hmSfq9x5cByRqZonCQPPsN2gD8NrAdMkvRYnQPjgYdK0rGSHq0fYPuo8oApkqY3AMzU3JLJkXTboPxJwN1A/OIwSc8OIGFpxRbAE2kFsHXdVGxHhHbISEr6swFAXijlXyRp51p1Nit6kv/tX3fMIWZk+xwgb7ilpDhff9j+OkSVtG8Hkj0CTJSU8a1yNyl9v0TStHp+OwDnAte2qUAAzJcUkWoM22ndAYMAbAB8CQwPwHbG6hkgJRsjaX7tLULAnYA1O7QgArNQ0i613E2BTFcsPNVp7Qt1Eu4FBH1stU/SfQ0kPE9SKjQkbGeUM9LtSBh1jT+kNYdLeqpFQtvpay4sAQ6S9EbDA14Adi0A4w1VjyNO8Yyri5llDMP2AWE7GpBJiy9MlnRXpQOR4RwwStJwQpT5zRxHeOKQUc9VAzqtAWLB+0lKqdtGEbMY2uzIcQWgkuIrJV3YgWSVFIesGddEJcUz6+bTUMVKdf+R4txoOwISjc/4ZQf438N2yB2bnzPAjAqAyo7n1Uet2PGIuiZ0g8x27HhB3ZxsP5ARbWvHBUQlQkeWHp+SJeQ/LCTfAbcDNwPrAG82LiQFQPobv14tm28ZmbTjZeDo8ubTJcWMhoTtgL2+rGRzgOyX0ZZMRCYsq1nzSlZAxO0uLzabpbR/iSz9yxj+KClT0A7A68BGwN6SqqV0j7LarQhMk/R2PbHXD5O5wCGSclg7AD8AL0nKWHYVvQK4Cjg/fi4p3wCtsB0dSJmX6odJ9Wl2WrHdlYFVgPym17l+hqSQrqvotQIjitoN93GaDbplYp1Q9ASgkDFLS+y1XfT8ef43B1zeMNlA22sAAAAASUVORK5CYII='
        },
        {
          label: '发表',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACzElEQVRYR82XTYiNYRTHf/+U1BiywMLHjDEhMeMrIh8LopSszCQLGRPKVyyoGSnlq2wmJJFm59sCG1EK2cj3TCRqkNhITGKDo6Pn1Z3r3vu+70xv17O973nO7znP//mfc0WZl8qcn/8fwMz6AdOAipTVGgrcl9RVKi62AmZ2F5iTMnn0+QtJE3oNYGb1wGPgDHAiJcQ6YCVQL+lpsdgeFTCz0cAY+KuNVUAzMFeSVyLxMrN5wG3gJHA6BBrQJelttNEfADMbBFwAFhfI8F7SiMSZo0xmvvcHYHiB2OvACkndEUA7sBo4BnzMC+iUdDEtQDhYAzAxJ9bzLQVmAO2SmiKAb8AdSUviEplZNbAdmOz3C/wCOoAnQJuk1wn2uOUQkipkZpVAdwjeVirYzPxEp8KT7AQ+he/HAiOBr8BaSedj9mkDtgKViQHMrAXYB1wGtuQKKXhFY/jdK9Qi6UAEYWb9gVpJz8LVpAMwszrgEXAJaJTkav5nmdkQ4FowLi+xX4uL/CiwEZgl6Z6ZJQcI9L7RMKBG0peY8jrEO+ANUCfph5n562oCNkj6nBZgEXADaJW0P05g4cSHgc3AQkk382PSAqwHjgPTJT1MCDAfcKU3S3LR9lhpAXYDe4CqXOHFXEMV4M9xlyQXbp8AXN1nU1bAu+cDoEGSO2yfALybPS92miKvoRXYC4yT9LJPAEFULqQpQLX7d0z5va94+TskLSgCmPwZBoAawE3kSowPuLWfA5YD44vZcioR5rjZTuAgcBXYlC/I0MrdcJYBOyQdKlapXgGESkS9YEA46SvAW/VMYBLgTS2bXpBTiagbekLXxU/AG1OabphOA0nMJ803+VfgU+93bzSSfIbLfJmZ+4oLdWA0kPiINBvwecDvNctVCxxxc5O0JgLwQdS9e1SWmXP27jkTBoUPBqZmDFB4Ks44acntY/8ZZQ1XdoDfmaKCtzx0xn4AAAAASUVORK5CYII='
        }
      ],
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
  methods: {
    click (e) {
      console.log(e)
    },
    onClick () {
      console.log(111)
    }
  },
  created (e) {
    console.log(e)
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
