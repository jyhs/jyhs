<template >
<view class="container">
          <wux-wing-blank size="default">

  <view class="post-comment">
      <view class="row upload">
                 <wux-upload listType="picture-card" count="9"   :header="header" :formData="formData"  max="9" url="https://api2.huanjiaohu.com/circle/circle/upload" @success="onSuccess" @fail="onFail" @remove="onRemove">
                    <text>拍照</text>
                </wux-upload>
      </view>
      <view class="input-box">
          <textarea class="content" focus="true" @input="bindInpuntValue" maxlength="140" placeholder="留言经过筛选后，对所有人可见" />
          <text class="count">{{140 - content.length}}</text>
      </view>
      <view class="btns">
          <view class="close" @click="onClose">取消</view>
          <view class="post" @click="onPost">发表</view>
      </view>
  </view>
          </wux-wing-blank>

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
      countImg: 0,
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
      wx.setStorageSync('circle_conent' + this.$route.query.id, this.content)
    },
    async onPost () {
      if (this.countImg <= 0) {
        util.showErrorToast('请添加一张图片');
        return false;
      } else {
        const id = this.$route.query.id;
        const res = await api.addCircle({
          'circleId': id,
          'description': wx.getStorageSync('circle_conent' + id)
        });
        if (res > 0) {
          this.isCancel = false;
          wx.removeStorageSync('circle_conent' + id);
          this.$router.go(-1);
        }
      }
    },
    async onClose () {
      await api.deleteCircle({
        'circleId': this.$route.query.id
      });
      this.$router.go(-1);
    },
    onSuccess (e) {
      this.countImg = e.mp.detail.fileList.length;
    },
    onFail (e) {
      wx.showToast({
        title: '失败',
        duration: 2000,
        complete: () => {

        }
      })
    },
    async onRemove (e) {
      await api.deleteImage({ circleImgId: e.mp.detail.file.res.data });
      this.countImg = e.mp.detail.fileList.length;
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
  box-sizing: border-box;
}

.post-comment .input-box {
  position: relative;
  /* background: #fff; */
}

.post-comment .input-box .content {
  padding-top:10px;
  display: block;
  background: #fff;
  font-size: 14px;
  color: #000;
  height: 300rpx;
  width:100%;
  box-sizing: border-box;
  padding:10px;
  }

.post-comment .input-box .count {
  position: absolute;
  bottom:12px;
  right:4px;
  display: block;
  height: 30rpx;
  width: 50rpx;
  font-size: 28rpx;
  color: #999;
}

.post-comment .btns {
  font-size: 14px;
}

.post-comment .close {
  float: left;
  height: 96rpx;
  line-height: 96rpx;
  text-align: left;
  color: #666;
  padding: 0 30rpx;
}

.post-comment .post {
  float: right;
  height: 96rpx;
  line-height: 96rpx;
  text-align: right;
  padding: 0 30rpx;
}

.upload{
background-color:#ffffff;
margin-top:10px;
padding:10px;
box-sizing: border-box;
padding:10px;
}
</style>
