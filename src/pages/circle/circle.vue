<template >
  <view class="container">
    <scroll-view scroll-y="true" style="height: 100%">
      <view class="row">
        <wux-row>
          <wux-col span="12">
            <cardItem :item="circle" :praiseList="praiseList" :commentList="commentList" :isInteraction="false"/>
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
      praiseList: [],
      commentList: []
    };
  },
  async onShow () {
    this.id = this.$route.query.id;
    this.circle = await api.getCircleById({ circleId: this.id });
    this.circle['commentBtnClick'] = () => {};
    this.circle['deleteComment'] = this.deleteComment;
    this.circle['commentPost'] = this.commentPost;
    this.praiseList = this.circle.interaction && this.circle.interaction.praiseList
      ? this.circle.interaction.praiseList
      : [];
    this.commentList = this.circle.interaction && this.circle.interaction.commentList
      ? this.circle.interaction.commentList
      : [];
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
    },
    async deleteComment (e) {
      const commentId = e.mp.target.dataset.comment.id;
      const typeId = e.mp.target.dataset.comment.type_id;
      const valueId = e.mp.target.dataset.comment.value_id;
      const commentList = await api.commentDelete({ commentId, typeId, valueId });
      return commentList;
    },
    async commentPost (id, content, comment) {
      const list = await api.commentPost({
        valueId: id,
        typeId: 2,
        content: content,
        parentComment: comment
      });
      return list;
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
.container{
  background-color: #ffffff;
}
</style>
