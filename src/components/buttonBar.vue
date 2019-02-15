<template >
    <view class="bottom-btn">
      <view class="l l-collect" @click="goHome">
        <img class="icon" src="/static/images/ic_menu_choice_nor.png">
      </view>
      <view class="l l-collect" :data-id="item.id" @click="praise">
        <img class="icon" :src="collectBackImage">
      </view>
      <view class="l l-cart" :data-id="item.id" @click="addComment">
        <view class="box">
          <!-- <text class="cart-count">{{commentNo}}</text> -->
          <img class="icon" src="/static/images/comment.png">
        </view>
      </view>
      <view class="r fenxiang">
        <button :plain="true" open-type="share">分享</button>
      </view>
    </view>
</template>

<script>
import wx from 'wx';

export default {
  props: {
    item: {
      type: Object
    },
    onPraise: {
      type: Function
    }
  },
  data () {
    return {
      noCollectBackImage: '/static/images/icon_collect.png',
      hasCollectImage: '/static/images/icon_collect_checked.png',
      collectBackImage: '/static/images/icon_collect.png'
    }
  },
  onShow () {
    const user = wx.getStorageSync('userInfo');
    let flag = false;
    if (this.item.interaction && this.item.interaction.praiseList) {
      for (const praise of this.item.interaction.praiseList) {
        if (praise.user_id === user.id) {
          flag = true;
        }
      }
    }

    if (flag) {
      this.collectBackImage = this.hasCollectImage;
    } else {
      this.collectBackImage = this.noCollectBackImage;
    }
  },
  methods: {
    goHome () {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    async praise (e) {
      const flag = await this.onPraise(e);
      if (flag) {
        this.collectBackImage = this.hasCollectImage;
      } else {
        this.collectBackImage = this.noCollectBackImage;
      }
    },
    addComment (e) {
      const user = wx.getStorageSync('userInfo', this.userInfo);
      if (user) {
        wx.navigateTo({
          url: '/pages/comment/commentPost?typeId=2&valueId=' + this.item.id
        });
      } else {
        wx.reLaunch({
          url: '/pages/ucenter/login'
        });
      }
    }
  }
};
</script>

<style scoped>
.bottom-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 750rpx;
  height: 100rpx;
  display: flex;
  background: #fff;
  box-shadow: 1px -2px 2px #e9e9e9;
}

.bottom-btn .l {
  float: left;
  height: 100rpx;
  width: 162rpx;
  border: 1px solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-btn .l.l-collect {
  border-right: none;
  text-align: center;
}

.bottom-btn .l.l-cart .box {
  position: relative;
  height: 60rpx;
  width: 60rpx;
}

.bottom-btn .l.l-cart .cart-count {
  height: 28rpx;
  width: 28rpx;
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  background: #387ef5;
  text-align: center;
  font-size: 18rpx;
  color: #fff;
  line-height: 28rpx;
  border-radius: 50%;
}

.bottom-btn .l.l-cart .icon {
  position: absolute;
  top: 10rpx;
  left: 0;
}

.bottom-btn .l .icon {
  display: block;
  height: 44rpx;
  width: 44rpx;
}

.bottom-btn .c {
  float: left;
  height: 100rpx;
  line-height: 96rpx;
  flex: 1;
  text-align: center;
  color: #333;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
}

.bottom-btn .r {
  border: 1px solid #91d5ff;
  background: #91d5ff;
  float: left;
  height: 100rpx;
  line-height: 96rpx;
  flex: 1;
  text-align: center;
  color: #fff;
}

</style>
