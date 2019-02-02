<template >
<view class="container">
  <view class='row'>
    <wux-row>
            <wux-col span="11">
                      <cardItem :item="user"/>
            </wux-col>
             <wux-col span="1">
               <view class="setting">&nbsp;</view>
            </wux-col>
    </wux-row>
  </view>
  <view class="post-comment">
      <view class="input-box">
          <textarea class="content" focus="true" @input="bindInpuntValue" maxlength="140" placeholder="留言经过筛选后，对所有人可见" />
          <text class="count">{{140 - content.length}}</text>
      </view>
      <view class="btns">
          <view class="close" @click="onClose">取消</view>
          <view class="post" @click="onPost">发表</view>
      </view>
  </view>
  <wux-popup position="bottom" :visible="true">
    <wux-cell-group title="第一次使用需要开缸">
        <wux-cell  title="鱼缸类型">
                  <wux-segmented-control controlled  default-current="2" :values="value" />
        </wux-cell>
        <wux-cell hover-class="none">
            <wux-button block type="balanced" bindtap="close2">Yes</wux-button>
        </wux-cell>
    </wux-cell-group>
</wux-popup>
</view>
</template>

<script>
import api from '@/utils/api';
import util from '@/utils/util';
import wx from 'wx';
import { setTimeout } from 'timers';
import cardItem from '@/components/cardItem';

export default {
  components: {
    cardItem
  },
  data () {
    return {
      typeId: 0,
      valueId: 0,
      content: '',
      user: {},
      value: ['Segment1', 'Segment2', 'Segment3']
    }
  },
  async mounted () {
    const user = wx.getStorageSync('userInfo', this.userInfo);
    user.title = '我的云端海缸';
    this.user = user;
    if (this.$route.query.typeId && this.$route.query.valueId) {
      this.typeId = parseInt(this.$route.query.typeId);
      this.valueId = parseInt(this.$route.query.valueId);
    }
  },

  methods: {
    onClose2 () {
      console.log(11)
    },
    bindInpuntValue (event) {
      // console.log('监听输入事件', event);
      let value = event.target.value;
      // 判断是否超过140个字符
      if (value && value.length > 140) {
        return false;
      }
      this.content = event.target.value;
    },
    // 提交评论
    async onPost () {
      if (!this.content) {
        util.showErrorToast('请填写评论');
        return false;
      }
      const res = await api.CommentPost({
        valueId: this.valueId,
        typeId: this.typeId,
        content: this.content
      });
      if (res.errno === 0) {
        wx.showToast({
          title: '评论成功',
          duration: 2000,
          complete: () => {
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        })
      }
    },
    // 返回上一页
    onClose () {
      this.$router.go(-1);
    }
  },
  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      title: 'xbyjShop',
      desc: '仿网易严选小程序商城',
      path: '/pages/comment/commentPost'
    }
  }
}
</script>

<style scoped>
page, .container {
  height: 100%;
  background: #f4f4f4;
}

.post-comment {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  padding: 30rpx;
}

.post-comment .input-box {
  height: 337.5rpx;
  width: 690rpx;
  position: relative;
  /* background: #fff; */
}

.post-comment .input-box .content {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  background: #fff;
  font-size: 29rpx;
  color: #333;
  height: 300rpx;
  width: 650rpx;
  padding: 20rpx;
  margin-left: 30rpx;
}

.post-comment .input-box .count {
  position: absolute;
  bottom:10rpx;
  right:-20rpx;
  display: block;
  height: 30rpx;
  width: 50rpx;
  font-size: 29rpx;
  color: #999;
}

.post-comment .btns {
  height: 108rpx;
}

.post-comment .close {
  float: left;
  height: 108rpx;
  line-height: 108rpx;
  text-align: left;
  color: #666;
  padding: 0 30rpx;
}

.post-comment .post {
  float: right;
  height: 108rpx;
  line-height: 108rpx;
  text-align: right;
  padding: 0 30rpx;
}
.setting{
  display: block;
  line-height:145rpx;
  background:url(https://static.huanjiaohu.com/icon/right_arrow.png) right center no-repeat;
  background-size:42rpx;
  background-color:#ffffff;

}

</style>
