<template >
  <view>
    <view class="container">
      <view class="profile-info">
        <view v-if="userInfo.avatarUrl">
          <wux-avatar
            size="large"
            :src="userInfo.avatarUrl"
            body-style="background-color: #ffffff;width:100rpx;height:100rpx;border-radius:50rpx;line-height:100rpx;"
          />
        </view>
        <view v-else>
          <navigator url="/pages/ucenter/login">
            <wux-avatar
              size="large"
              :src="avatarUrl"
              body-style="background-color: #ffffff;width:100rpx;height:100rpx;border-radius:50rpx;line-height:100rpx;"
            />
          </navigator>
        </view>
        <view class="sub-title">{{userInfo.nickName}}</view>
      </view>
      <view class="user-menu" v-if="userInfo.avatarUrl">
        <view class="character-text">
          <view class="character-itemlist">
            <navigator url="/pages/ucenter/collect">
              <view class="character-item">
                <text>50</text>
                <view class="page__desc"></view>
                <text class="description">优惠券</text>
              </view>
            </navigator>
            <navigator url="/pages/ucenter/collect">
              <view class="character-item">
                <text>218</text>
                <view class="page__desc"></view>
                <text class="description">我的积分</text>
              </view>
            </navigator>
            <navigator url="/pages/ucenter/collect">
              <view class="character-item">
                <text>218</text>
                <view class="page__desc"></view>
                <text class="description">我的余额</text>
              </view>
            </navigator>
          </view>
        </view>
      </view>
      <wux-white-space/>
      <view class="character-info">
        <view class="character-menu" v-if="userInfo.avatarUrl">
          <wux-wing-blank>
            <wux-card title="商城订单" extra="商城">
              <view slot="body">
                <wux-grids col="4" :bordered="false">
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_ppay.png"
                    label="待付款"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_psend.png"
                    label="待发货"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_receive.png"
                    label="待收获"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_pcomm.png"
                    label="待评价"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_back.png"
                    label="退款退货"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_confirm.png"
                    label="待确认"
                  />
                </wux-grids>
              </view>
            </wux-card>
          </wux-wing-blank>
          <wux-white-space/>
          <wux-wing-blank>
            <wux-card title="我是鱼友" extra="零售/团购">
              <view slot="body">
                <wux-grids col="4" :bordered="false">
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_ppay.png"
                    label="待付款"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_psend.png"
                    label="进行中"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_receive.png"
                    label="已完成"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_pcomm.png"
                    label="待评价"
                  />
                </wux-grids>
              </view>
            </wux-card>
          </wux-wing-blank>
          <wux-white-space/>
          <wux-wing-blank>
            <wux-card title="我是团长" extra="零售/团购">
              <view slot="body">
                <wux-grids col="4" :bordered="false">
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_ppay.png"
                    label="未截单"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_psend.png"
                    label="进行中"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_receive.png"
                    label="已结束"
                  />
                </wux-grids>
              </view>
            </wux-card>
          </wux-wing-blank>
          <wux-white-space/>
          <wux-wing-blank>
            <wux-card title="我是渔场" extra="零售/团购">
              <view slot="body">
                <wux-grids col="4" :bordered="false">
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_ppay.png"
                    label="未截单"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_psend.png"
                    label="进行中"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_receive.png"
                    label="已结束"
                  />
                </wux-grids>
              </view>
            </wux-card>
          </wux-wing-blank>
          <wux-white-space/>
          <wux-wing-blank>
            <wux-card title="我的设置">
              <view slot="body">
                <wux-grids col="4" :bordered="false">
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_ppay.png"
                    label="个人设置"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_psend.png"
                    label="我的足迹"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_receive.png"
                    label="我的收藏"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_receive.png"
                    label="我的云缸"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_receive.png"
                    label="地址管理"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_receive.png"
                    label="意见反馈"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_receive.png"
                    label="清除缓存"
                  />
                  <wux-grid
                    thumb="https://static.huanjiaohu.com/mini/index/ic_receive.png"
                    label="退出登录"
                  />
                </wux-grids>
              </view>
            </wux-card>
          </wux-wing-blank>
          <wux-white-space/>
        </view>
        <view v-else>
          <wux-white-space body-style="height: 120rpx"/>
          <wux-prompt
            :visible="true"
            icon="https://static.huanjiaohu.com/mini/index/ic_exit.png"
            title="您还没有登录"
          />
          <wux-button block type="light" size="small" @click="logout">登录</wux-button>
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
    },
    login () {}
  }
};
</script>

<style scoped>
.container {
  background: #f4f4f4;
  height: auto;
  overflow: hidden;
  width: 100%;
  position: relative;
}
.profile-info {
  width: 100%;
  height: 370rpx;
  display: flex;
  background: url(https://static.huanjiaohu.com/image/login_banner.jpg);
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.user-menu {
  margin-top: -30px;
  width: 95%;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  justify-content: center;
  border-radius: 20rpx;
  padding-bottom: 15px;
}
.user-menu .icon {
  margin: 0 auto;
  display: block;
  height: 52.803rpx;
  width: 52.803rpx;
  margin-bottom: 16rpx;
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

.character-info {
  display: flex;
  justify-content: center;
  border-radius: 15rpx;
  align-items: center;
  height: auto;
  width: 100%;
}

.character-menu {
  width: 100%;
}

.character-menu button {
  padding: 30rpx 30rpx;
}

.user-menu .character-text {
  margin-left: 20rpx;
}

.user-menu .character-itemlist {
  margin-top: 30rpx;
  justify-content: flex-end;
  display: flex;
}

.user-menu .character-info .info {
  text-align: center;
  display: inherit;
  /* margin-left:320rpx; */
  margin-bottom: 20rpx;
}

.user-menu .character-info .info navigator {
  margin: 0px 5px;
}

.user-menu .character-item {
  font-size: 14px;
  padding: 0 20px;
  text-align: center;
}
.user-menu .character-item .txt {
  text-align: center;
  margin-bottom: 5px;
  font-size: 16px;
  color: rgb(216, 22, 22);
}
</style>
