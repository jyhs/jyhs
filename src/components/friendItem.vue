<template>
  <view class="row friend-item">
    <wux-wing-blank>
      <wux-white-space/>
      <wux-row>
        <wux-col span="2">
          <wux-avatar
            src="https://api.huanjiaohu.com/user/getAvatar?userId=3152"
            body-style="background-color: #ffffff;width:120rpx;height:120rpx;line-height:120rpx;"
          />
        </wux-col>
        <wux-col span="10">
           <wux-row>
            <wux-col span="12">
              <wux-icon type="md-person" color="#A3A3A3" size="12"/>&nbsp;天鸿水族
            </wux-col>
          </wux-row>
          <wux-white-space/>
          <wux-row>
            <wux-col span="8">
              <wux-icon type="ios-pin" color="#A3A3A3" size="12"/>&nbsp;上海
            </wux-col>
            <wux-col span="4">
              <wux-icon type="md-time" color="#A3A3A3" size="12"/>&nbsp;2019-09-09
            </wux-col>
          </wux-row>
          <wux-white-space/>
        </wux-col>
      </wux-row>
         <wux-row>
            <wux-col span="12">
              鱼缸描述：我的海缸太屌了
            </wux-col>
          </wux-row>
          <wux-white-space/>
          <wux-row>
            <div class="img_all">
              <block v-for="item of user.urls" :key="item.id">
                <view class="list_img" @tap="showGallery(user.id,$event)" :data-current="index">
                  <img :src="item">
                </view>
              </block>
            </div>
          </wux-row>
      <wux-white-space/>
    </wux-wing-blank>
  </view>
</template>

<script>
import { $wuxGallery } from '../../static/wux/index'

export default {
  props: {
    user: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  methods: {
    showGallery (index, e) {
      const { current } = e.currentTarget.dataset
      const urls = this.user.urls
      this.$wuxGallery = $wuxGallery()
      this.$wuxGallery.show({
        showDelete: false,
        current,
        urls,
        [`delete`]: (current, urls) => {
          urls.splice(current, 1)
          this.setData({
            urls
          })
          return true
        },
        cancel () {
          console.log('Close gallery')
        },
        onTap (current, urls) {
          console.log(current, urls)
          return true
        },
        onChange (e) {
          console.log(e)
        }
      })
    }
  }
};
</script>

<style scoped>
.friend-item {
  background-color: #ffffff;
  margin-bottom: 1px;
}

.list_head {
  width: 95%;
  display: inline-flex;
}
.user_head {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  left: 10%;
  background-color: white;
  border: solid 4px white;
}
.user_info {
  margin-left: 10px;
  margin-top: 15px;
  width: 80%;
}
.user_name {
  width: 100%;
  font-size: 14px;
  white-space: normal;
  line-height: 1.5;
}
.user_addres {
  width: 100px;
  font-size: 12px;
  white-space: normal;
  color: #777;
  line-height: 1.5;
}
.user_date {
  width: 100%;
  font-size: 12px;
  white-space: normal;
  color: #777;
  line-height: 1.5;
  margin-left: 60%;
}
.list_img {
  width: 31%;
  height: 100px;
  display: inline-block;
}
.list_img:nth-child(2),
.list_img:nth-child(3) {
  margin-left: 1%;
}
.list_img > img {
  width: 100%;
  height: 100%;
}
.img_all {
  text-align: center;
}
.say_icon {
  margin-left: 85%;
  margin-right: 1%;
}
.say_count {
  width: 10%;
  font-size: 12px;
  white-space: normal;
  color: #777;
}
.say_all {
  display: flex;
  line-height: 26px;
}
</style>
