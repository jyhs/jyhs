<template >
    <view class="container">
      <headerImg :bannerInfo="bannerInfo"/>
        <view class="row">
            <wux-tabs
                class="tabAll"
                controlled
                :current="tabCurrent"
                defaultCurrent="0"
                theme="positive"
                @change="change"
            >
                <wux-tab key="0" title="团购"></wux-tab>
                <wux-tab key="1" title="零售"></wux-tab>
            </wux-tabs>
        </view>
        <swiper :style="winStyle" :current="current" @change="swiperChange">
            <swiper-item>
                <view class="row">
                    <scroll-view scroll-y="true" style="height: 100%">
                        <block v-for="item in groupList" :key="item.id">
                            <cardItem :item="item"/>
                            <wux-white-space size="small"/>
                        </block>
                    </scroll-view>
                </view>
            </swiper-item>
            <swiper-item>
                <scroll-view scroll-y="true" style="height: 100%">
                    <block v-for="item in retailList" :key="item.id">
                        <cardItem :item="item"/>
                        <wux-white-space size="small"/>
                    </block>
                </scroll-view>
            </swiper-item>
        </swiper>
        <view style="height:10px;width:100%;background-color: white;"/>
        <loadMore :reflash="reflash" :text="text"/>
    </view>
</template>

<script>
import loadMore from '@/components/loadMore';
import headerImg from '@/components/headerImg';
import cardItem from '@/components/cardItem';
import api from '@/utils/groupApi';
import wx from 'wx';
export default {
  components: {
    loadMore,
    cardItem,
    headerImg
  },
  async onLoad () {
    const province = wx.getStorageSync('province');
    this.groupPage = 1;
    this.current = 0;
    const group = await api.getGroupListByProvince({
      province,
      page: this.groupPage
    });
    const groupList = [];
    this.setGroupCard(group.data, groupList, province);
    this.groupList = groupList;
    this.winStyle = this.computedHeight(this.groupList);
  },
  data () {
    return {
      reflash: true,
      value: '',
      current: 0,
      tabCurrent: 0,
      bannerInfo: {
        'img_url': 'https://static.huanjiaohu.com/mini/index/banner2.jpg',
        'name': '礁岩海水水族新零售'
      },
      groupList: [],
      retailList: [],
      groupPage: 1,
      retailPage: 1,
      winStyle: 'width:100%;height:100%'
    };
  },
  async onReachBottom () {
    if (this.tabCurrent === 1) {
      this.retailPage = this.retailPage + 1;
      const group = await api.getGroupListByProvince({
        province: 'china',
        page: this.retailPage
      });
      if (group.data.length === 0) {
        this.text = '已经到底了';
      } else {
        const retailList = [];
        this.setGroupCard(group.data, retailList, 'china');
        this.retailList = this.retailList.concat(retailList);
        this.winStyle = this.computedHeight(this.retailList);
      }
    } else {
      this.groupPage = this.groupPage + 1;
      const province = wx.getStorageSync('province');
      const group = await api.getGroupListByProvince({
        province,
        page: this.groupPage
      });
      if (group.data.length === 0) {
        this.text = '已经到底了';
      } else {
        const groupList = [];
        this.setGroupCard(group.data, groupList, province);
        this.groupList = this.groupList.concat(groupList);
        this.winStyle = this.computedHeight(this.groupList);
      }
    }
  },
  methods: {
    async swiperChange (e) {
      if (e.mp.detail.current === 1) {
        if (this.retailList.length === 0) {
          const group = await api.getGroupListByProvince({
            province: 'china',
            page: this.retailPage
          });
          const retailList = [];
          this.setGroupCard(group.data, retailList, 'china');
          this.retailList = retailList;
        }
        this.winStyle = this.computedHeight(this.retailList);
      } else {
        this.winStyle = this.computedHeight(this.groupList);
      }
      this.tabCurrent = e.mp.detail.current;
    },
    computedHeight (list) {
      return 'width:100%;height:' + list.length * 92 + 'px;'
    },
    change (e) {
      this.current = e.mp.detail.key;
    },
    setGroupCard (groups, list, province) {
      for (const group of groups) {
        group.headimgurl =
          'https://api2.huanjiaohu.com/user/getAvatar?userId=' + group.user_id;
        group.navigator_url = '/pages/group/buy?id=' + group.id;
        if (group.status === 0) {
          group.tag = ['已结束'];
        } else {
          group.tag = group.activity_code ? [group.activity_code] : ['热团中'];
        }
        group.time = group.end_date_format;
        group.title = group.name;
        group.name = group.contacts;
        group.city_name = group.city_name;
        group.price = group.sum;
        delete group.description;
        if (group.province === province) {
          list.push(group);
        }
      }
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
