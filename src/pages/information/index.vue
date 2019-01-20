<template >
  <view class="container">
    <view class='row'>
       <wux-search-bar
      clear=""
      show-cancel
      :value="value"
      controlled
      placeholder="搜索资讯"
      @confirm="onConfirm"
      @clear="onClear"
    />
  </view>
    <scroll-view scroll-y="true" style="height: 100%">
      <block v-for="item in data" :key="item.id">
        <oneCard :data="item"/>
        <moreCard :data="item" v-if="item.list"/>
      </block>
      <loadMore :reflash="reflash"/>
    </scroll-view>
  </view>
</template>

<script>
import loadMore from '@/components/loadMore';
import oneCard from '@/components/oneCard';
import moreCard from '@/components/moreCard';

import { setTimeout } from 'timers';
export default {
  components: {
    loadMore,
    oneCard,
    moreCard
  },
  data () {
    return {
      reflash: false,
      value: '',
      data: [
        {
          id: 1,
          width: '375px',
          height: '180px',
          src:
            'https://static.huanjiaohu.com/image/ad/china/4.jpg?r=0.609779170857945',
          title: '火焰木盒',
          description:
            '蓝木瓜为比较常见的箱鲀，饲养困难，很难开口，可以尝试冰冻丰年虾等天然饵料。蓝木瓜非常温顺，适合和其他鱼类混养。此类非常喜欢啃食管虫....'
        },
        {
          id: 1,
          width: '375px',
          height: '180px',
          src:
            'https://static.huanjiaohu.com/image/ad/china/3.jpg?r=0.609779170857945',
          description:
            '蓝木瓜为比较常见的箱鲀，饲养困难，很难开口，可以尝试冰冻丰年虾等天然饵料。蓝木瓜非常温顺，适合和其他鱼类混养。此类非常喜欢啃食管虫....',
          list: [
            {
              title: '火焰木盒',
              src:
                'https://static.huanjiaohu.com/image/material/hy/1524499703-HYMH.png'
            }
          ]
        },
        {
          id: 1,
          width: '375px',
          height: '180px',
          src:
            'https://static.huanjiaohu.com/image/ad/china/1.jpg?r=0.609779170857945',
          title: '火焰木盒',
          description:
            '蓝木瓜为比较常见的箱鲀，饲养困难，很难开口，可以尝试冰冻丰年虾等天然饵料。蓝木瓜非常温顺，适合和其他鱼类混养。此类非常喜欢啃食管虫....'
        },
        {
          id: 1,
          width: '375px',
          height: '180px',
          src:
            'https://static.huanjiaohu.com/image/ad/china/4.jpg?r=0.609779170857945',
          description:
            '蓝木瓜为比较常见的箱鲀，饲养困难，很难开口，可以尝试冰冻丰年虾等天然饵料。蓝木瓜非常温顺，适合和其他鱼类混养。此类非常喜欢啃食管虫....',
          list: [
            {
              title: '火焰木盒',
              src:
                'https://static.huanjiaohu.com/image/material/hy/1524499703-HYMH.png'
            },
            {
              title: '火焰木盒',
              src:
                'https://static.huanjiaohu.com/image/material/hy/1524499703-HYMH.png'
            }
          ]
        }
      ],
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
        src:
          'https://static.huanjiaohu.com/image/ad/china/2.jpg?r=0.609779170857945',
        title: '火焰木盒',
        description:
          '蓝木瓜为比较常见的箱鲀，饲养困难，很难开口，可以尝试冰冻丰年虾等天然饵料。蓝木瓜非常温顺，适合和其他鱼类混养。此类非常喜欢啃食管虫....'
      });
      this.data.push({
        id: 1,
        width: '375px',
        height: '180px',
        src:
          'https://static.huanjiaohu.com/image/ad/china/4.jpg?r=0.609779170857945',
        list: [
          {
            title: '火焰木盒',
            src:
              'https://static.huanjiaohu.com/image/material/hy/1524499703-HYMH.png'
          },
          {
            title: '火焰木盒',
            src:
              'https://static.huanjiaohu.com/image/material/hy/1524499703-HYMH.png'
          }
        ]
      });
      this.reflash = false;
    }, 3000);
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
