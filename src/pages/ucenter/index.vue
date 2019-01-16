<template >
  <view>
    <view class="container">
      <view class="profile-info"/>
      <view class="user-menu">
        <view class="character-info">
          <view v-if="userInfo.avatarUrl">
              <img class="avatar" :src="userInfo.avatarUrl">
          </view>
           <view v-else>
            <navigator url="/pages/ucenter/login" class="a">
              <img class="avatar" :src="avatarUrl">
            </navigator>
          </view>
          <view class="character-text">
            <view class="name">
              <text class="name">{{userInfo.nickName}}</text>
            </view>
            <view class="character-itemlist">
              <navigator url="/pages/ucenter/collect">
                <view class="character-item">
                  <text class="txt">0</text>
                  <view>
                    <text class="description">关注商家</text>
                  </view>
                </view>
              </navigator>
              <navigator url="/pages/ucenter/collect">
                <view class="character-item">
                  <view class="character-item2">
                    <text class="txt">0</text>
                    <view>
                      <text class="description">生物收藏</text>
                    </view>
                  </view>
                </view>
              </navigator>
              <navigator url="/pages/ucenter/collect">
                <view class="character-item">
                  <text class="txt">0</text>
                  <view>
                    <text class="description">我的积分</text>
                  </view>
                </view>
              </navigator>
            </view>
          </view>
        </view>
        <view class="character-menu" v-if="userInfo.avatarUrl">
          <view class="item">
            <navigator url="/pages/ucenter/order" class="a">
              <view class="item-container">
                <view class="item-container-icon">
                  <text class="icon order"></text>
                  <text class="txt">我的订单</text>
                </view>
                <view class="item-container-end">
                  <text class="icon">></text>
                </view>
              </view>
            </navigator>
          </view>
          <view class="item">
            <navigator url="/pages/ucenter/coupon" class="a">
              <view class="item-container">
                <view class="item-container-icon">
                  <text class="icon coupon"></text>
                  <text class="txt">优惠券</text>
                </view>
                <view class="item-container-end">
                  <text class="icon">></text>
                </view>
              </view>
            </navigator>
          </view>
          <view class="item">
            <navigator url="/pages/ucenter/collect" class="a">
              <view class="item-container">
                <view class="item-container-icon">
                  <img class="icon" src="/static/images/icon_collect.png">
                  <text class="txt">我的收藏</text>
                </view>
                <view class="item-container-end">
                  <text class="icon">></text>
                </view>
              </view>
            </navigator>
          </view>
          <view class="item">
            <navigator url="../ucenter/footprint" class="a">
              <view class="item-container">
                <view class="item-container-icon">
                  <img class="icon" src="/static/images/footprint.png">
                  <text class="txt">我的足迹</text>
                </view>
                <view class="item-container-end">
                  <text class="icon">></text>
                </view>
              </view>
            </navigator>
          </view>
          <view class="item">
            <navigator url="../ucenter/address" class="a">
              <view class="item-container">
                <view class="item-container-icon">
                  <text class="icon address"></text>
                  <text class="txt">地址管理</text>
                </view>
                <view class="item-container-end">
                  <text class="icon">></text>
                </view>
              </view>
            </navigator>
          </view>
          <view class="item item-bottom">
            <navigator url="../ucenter/feedback" class="a">
              <view class="item-container">
                <view class="item-container-icon">
                  <text class="icon feedback"></text>
                  <text class="txt">意见反馈</text>
                </view>
                <view class="item-container-end">
                  <text class="icon">></text>
                </view>
              </view>
            </navigator>
          </view>
          <view class="item">
            <navigator url="../ucenter/express" class="a">
              <view class="item-container">
                <view class="item-container-icon">
                  <img class="icon" src="/static/images/car.png">
                  <text class="txt">物流查询</text>
                </view>
                <view class="item-container-end">
                  <text class="icon">></text>
                </view>
              </view>
            </navigator>
          </view>
          <view class="logout">
            <wux-button block type="assertive" @click="logout">退出</wux-button>
          </view>
        </view>
        <view class="character-menu"  v-else>
            <img class="avatar">
        </view>
       
      </view>
    </view>
  </view>
</template>

<script>
import wx from 'wx';
export default {
  data () {
    return {
      userInfo: {},
      avatarUrl: 'https://api2.huanjiaohu.com/user/getAvatar?userId=0',
      timeCounter: null,
      showtime: null,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    };
  },
  onShow () {
    this.userInfo = wx.getStorageSync('userInfo');
  },
  methods: {
    logout () {
      wx.clearStorageSync();
      wx.reLaunch({
        url: '/pages/ucenter/login'
      });
    }
  }
};
</script>

<style scoped>
page {
  height: 100%;
  width: 100%;
  background: #f4f4f4;
}
.container {
  background: #f4f4f4;
  height: auto;
  overflow: hidden;
  width: 100%;
  position: relative;
}
.profile-info {
  width: 100%;
  height: 470rpx;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 0 30.25rpx;
  background: url(https://static.huanjiaohu.com/image/login_banner.jpg);
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;

  /* background: #fff; */
}

/* .user-floatmenu{
  width: 90%;
  margin-top: -20px;
} */

.user-menu .avatar {
  height: 148rpx;
  width: 148rpx;
  border-radius: 10%;
  margin-top: 20rpx;
  margin-left: 20rpx;
}

.user-menu .info {
  flex: 1;
  height: 50rpx;
  margin-top: 100rpx;
  margin-left: 70rpx;
}

.user-menu .character-info .name {
  /* display: block; */
  /* height: 45rpx; */
  /* line-height: 45rpx; */
  /* font-size: 37.5rpx; */
  margin-top: 10rpx;
}

.profile-info .level {
  display: block;
  height: 30rpx;
  line-height: 30rpx;
  margin-bottom: 10rpx;
  color: #7f7f7f;
  font-size: 30rpx;
}

.user-menu {
  margin-top: -30px;
  width: 95%;
  height: auto;
  overflow: hidden;
  /* background: #fff; */
}

.user-menu .name{
  height: 20px;
  overflow: hidden;
}

.user-menu .item {
  /* float: left; */
  /* width: 33%; */
  display: flex;
  height: 78rpx;
  /* border-right: 1px solid rgba(0, 0, 0, 0.15); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  text-align: center;
}

.user-menu .item .item-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.user-menu .item .item-container .item-container-icon {
  display: flex;
}

.user-menu .item .item-container .item-container-end {
  margin-left: 200px;
}

.user-menu .item .a {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-menu .item.no-border {
  border-right: 0;
}

.user-menu .item.item-bottom {
  /* border-bottom: none; */
}

.user-menu .icon {
  margin: 0 auto;
  display: block;
  height: 52.803rpx;
  width: 52.803rpx;
  margin-bottom: 16rpx;
}

.user-menu image {
  opacity: 0.6;
}

.user-menu .icon.order {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -437.5rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.coupon {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -62.4997rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.gift {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -187.5rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.address {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 0 no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.security {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -500rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.kefu {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -312.5rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.help {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -250rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.feedback {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -125rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .txt {
  display: block;
  height: 24rpx;
  width: 100%;
  font-size: 24rpx;
  color: #333;
}

.logout {
  margin-top: 50rpx;
  height: 101rpx;
  width: 100%;
  line-height: 101rpx;
  text-align: center;
  background: #fff;
  color: #ea3732;
  font-size: 30rpx;
}
.login-list {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #fff;
  border-top: 1px solid #e1e1e1;
}

.userinfo-tel,
.userinfo-code {
  display: flex;
  justify-content: space-between;
  margin: 20px;
  border: solid 1px #d6d6d6;
  border-radius: 4px;
}
.userinfo-tel > input,
.userinfo-code > input {
  line-height: 48px;
  height: 48px;
  font-size: 14px;
  justify-content: space-between;
  width: 70%;
  padding-left: 36px;
}
.userinfo-tel > input {
  background: url(https://static.huanjiaohu.com/icon/phone.png);
  background-repeat: no-repeat;
  background-size: 8%;
  background-position: 10px;
}
.userinfo-code > input {
  background: url(https://static.huanjiaohu.com/icon/validate.png);
  background-repeat: no-repeat;
  background-size: 8%;
  background-position: 10px;
}
.userinfo-tel button,
.userinfo-code button {
  border: none;
  color: #278cec;
  height: 24px;
  margin: 12px 0 0 0;
  align-items: center;
  padding: 4px 0;
  border-left: solid 1px #d6d6d6;
  line-height: 24px;
  padding: 0;
  width: 30%;
  font-size: 14px;
  text-align: right;
  padding: 0 12px;
  border-radius: 0;
  flex-shrink: 0;
}
.captcha-button {
  font-size: 14px;
  line-height: 48px;
  padding-right: 10px;
  width: 50%;
  text-align: right;
}
.userinfo-tel button {
  border: none;
}

.login-list > image {
  width: 100%;
}

.userinfo-confirm {
  width: 100%;
}

.userinfo-confirm button {
  border: none;
  margin: 40px 20px 20px 20px;
  color: white;
  height: 48px;
  line-height: 48px;
  background: #26ab28;
}
.character-info {
  background: #fff;
  display: flex;
}

.character-menu {
  background: #fff;
}

.character-text {
  margin-left: 20rpx;
}

.character-itemlist {
  margin-top: 30rpx;
  justify-content: flex-end;
  display: flex;
}

.character-info .info {
  text-align: center;
  display: inherit;
  /* margin-left:320rpx; */
  margin-bottom: 20rpx;
}

.character-info .info navigator {
  margin: 0px 5px;
}

.character-item {
  font-size: 14px;
}
.character-item2 {
  margin: 0px 40px;
}

.character-item .txt {
  text-align: center;
  margin-bottom: 5px;
  font-size: 16px;
  color: rgb(216, 22, 22);
}
</style>
