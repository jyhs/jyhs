<template >
  <view class="container">
    <scroll-view scroll-y="true" style="height: 100%">
      <view class="row">
        <wux-row>
          <wux-col span="12">
            <cardItem :item="circle" :praiseList="praiseList"/>
          </wux-col>
        </wux-row>
      </view>
    </scroll-view>
    <wux-gallery id="wux-gallery"/>
    <buttonBar :item="circle" :onPraise="praise"/>
  </view>
</template>

<script>
import api from '@/utils/circleApi';
import wx from 'wx';
import cardItem from '@/components/cardItem';
import buttonBar from '@/components/buttonBar';

export default {
  components: {
    cardItem,
    buttonBar
  },
  data () {
    return {
      id: null,
      circle: {},
      praiseList: []
    };
  },
  async onLoad () {
    // console.log(this.circle);
    // const user = wx.getStorageSync('userInfo');
    // let flag = false;
    // for (const praise of this.praiseList) {
    //   if (praise.user_id === user.id) {
    //     flag = true;
    //   }
    // }
    // if (flag) {
    //   this.collectBackImage = this.hasCollectImage;
    // } else {
    //   this.collectBackImage = this.noCollectBackImage;
    // }
  },
  async onShow () {
    this.id = this.$route.query.id;
    const circle = await api.getCircleById({ circleId: this.id });
    this.circle = Object.assign({}, circle);
    this.praiseList = this.circle.interaction && this.circle.interaction.praiseList
      ? this.circle.interaction.praiseList
      : [];
    // this.commentList = await api.getComments({ circleId: this.id });
    // this.commentNo = this.commentList.length;
  },
  methods: {
    async praise (e) {
      const user = wx.getStorageSync('userInfo');
      const praiseList = await api.praise({ circleId: this.id });
      this.praiseList = praiseList;
      let flag = false;
      for (const praise of praiseList) {
        if (praise.user_id === user.id) {
          flag = true;
        }
      }
      return flag;
    }
  },
  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      path: '/pages/circle/circle?id=' + this.id
    };
  }
};
</script>

<style scoped>

</style>
