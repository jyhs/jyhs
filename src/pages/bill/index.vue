<template >
  <view class="container">
    <headerImg :bannerInfo="bannerInfo"/>
    <view class="row">
      <scroll-view scroll-y="true" style="height: 100%">
        <block v-for="item in groupList" :key="item.id">
          <cardItem :item="item"/>
          <wux-white-space size="small"/>
        </block>
      </scroll-view>
    </view>
    <loadMore :reflash="reflash" :text="text"/>
  </view>
</template>

<script>
import loadMore from '@/components/loadMore';
import headerImg from '@/components/headerImg';
import cardItem from '@/components/cardItem';
import api from '@/utils/groupApi';
export default {
  components: {
    loadMore,
    cardItem,
    headerImg
  },
  async onLoad () {
    this.groupPage = 1;
    const group = await api.getBillList({
      page: this.groupPage
    });
    const groupList = [];
    this.setGroupCard(group.data, groupList);
    this.groupList = groupList;
    this.winStyle = this.computedHeight(this.groupList);
  },
  data () {
    return {
      reflash: true,
      value: '',
      bannerInfo: {
        img_url: 'https://static.huanjiaohu.com/mini/index/banner2.jpg',
        name: '礁岩海水水族新零售'
      },
      groupList: [],
      groupPage: 1,
      winStyle: 'width:100%;height:100%'
    };
  },
  async onReachBottom () {
    this.groupPage = this.groupPage + 1;
    const group = await api.getBillList({
      page: this.groupPage
    });
    if (group.data.length === 0) {
      this.text = '已经到底了';
    } else {
      const groupList = [];
      this.setGroupCard(group.data, groupList);
      this.groupList = this.groupList.concat(groupList);
      this.winStyle = this.computedHeight(this.groupList);
    }
  },
  methods: {
    computedHeight (list) {
      return 'width:100%;height:' + list.length * 92 + 'px;';
    },
    setGroupCard (groups, list) {
      for (const group of groups) {
        group.headimgurl =
          'https://api2.huanjiaohu.com/user/getAvatar?userId=' + group.user_id;
        group.navigator_url = '/pages/group/buy?id=' + group.id;
        if (group.status === 0) {
          group.tag = ['已失效'];
        } else {
          group.tag = group.activity_code ? [group.activity_code] : ['生效中'];
        }
        group.time = group.end_date_format;
        group.title = group.name;
        group.name = group.contacts;
        group.city_name = group.city_name;
        group.price = group.sum;
        delete group.description;
        list.push(group);
      }
    }
  }
};
</script>

<style scoped>

</style>
