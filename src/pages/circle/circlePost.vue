<template >
<view class="container">
  
  <view class="post-comment">
    <wux-wing-blank>
      <view class="row upload">
                 <wux-upload listType="picture-card" count="1"   :header="header" :formData="formData"  max="9" url="https://api2.huanjiaohu.com/circle/circle/upload" @success="onSuccess" @fail="onFail">
                    <text>拍照</text>
                </wux-upload>
      </view>
    </wux-wing-blank>
      <view class="input-box">
          <textarea class="content" focus="true" @input="bindInpuntValue" maxlength="140" placeholder="留言经过筛选后，对所有人可见" />
          <text class="count">{{140 - content.length}}</text>
      </view>
      <view class="btns">
          <view class="close" @click="onClose">取消</view>
          <view class="post" @click="onPost">发表</view>
      </view>
  </view>

</view>
</template>

<script>
import api from '@/utils/circleApi';
import util from '@/utils/util';
import wx from 'wx';

export default {
  data () {
    return {
      typeId: 0,
      valueId: 0,
      content: '',
      formData: null,
      header: null,
      isCancel: true
    }
  },
  onShow () {
    this.formData = {'circleId': this.$route.query.id};
    this.isCancel = true;
    this.content = '';
  },
  onLoad () {
    this.header = {'Authorization': wx.getStorageSync('token')};
  },
  async onUnload () {
    if (this.isCancel) {
      await api.deleteCircle({
        'circleId': this.$route.query.id
      });
    }
  },
  methods: {
    bindInpuntValue (event) {
      let value = event.target.value;
      if (value && value.length > 140) {
        return false;
      }
      this.content = event.target.value;
    },
    async onPost () {
      if (!this.content) {
        util.showErrorToast('请填写评论');
        return false;
      }
      const res = await api.addCircle({
        'circleId': this.$route.query.id,
        'description': this.content
      });
      if (res > 0) {
        this.isCancel = false;
        this.$router.go(-1);
      }
    },
    async onClose () {
      await api.deleteCircle({
        'circleId': this.$route.query.id
      });
      this.$router.go(-1);
    },
    onSuccess () {

    },
    onFail (e) {
      wx.showToast({
        title: '失败',
        duration: 2000,
        complete: () => {

        }
      })
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

.upload{
  padding:30rpx 30rpx;
background-color:#ffffff;

}
</style>
