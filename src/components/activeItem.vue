<template>
  <view class="row active-item">
    <wux-wing-blank>
            <wux-white-space/>
      <wux-row>
        <wux-col span="3">
          <wux-avatar
            :src="data.src"
            shape="square"
            body-style="background-color: #ffffff;width:80px;height:80px;"
          />
        </wux-col>
        <wux-col span="9">
          <wux-row>
            <wux-col span="12" ><view class="titlecolor">{{data.title}}</view></wux-col>
          </wux-row>
                <wux-white-space/>

          <wux-row>
            <wux-col span="12">
              <view class="price">{{data.price}}</view>
            </wux-col>
          </wux-row>
                <wux-white-space/>

          <wux-row>
            <wux-col span="5">
              <view class="time">{{data.time}}</view>
            </wux-col>
            <wux-col span="7" class="wux-text--right">
              <view class="text">
                <wux-icon type="ios-chatboxes" color="#A3A3A3" size="16"/>&nbsp;13
                &nbsp;
                &nbsp;
                <wux-icon type="ios-thumbs-up" color="#A3A3A3" size="16"/>&nbsp;20
                &nbsp;
                &nbsp;
                <wux-icon type="md-share" color="#A3A3A3" size="16"/>&nbsp;分享
              </view>
            </wux-col>
          </wux-row>
        </wux-col>
      </wux-row>
    </wux-wing-blank>
      <wux-white-space/>
</view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.active-item {
  background-color: #ffffff;
  width: 95%;
  margin: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}
.price {
  color: #ef473a;
}
.text{
    color: #888;
    font-size: 12px;
}
.time{
      font-size: 12px;
          color: #888;
}
.titlecolor{
  color:#000;
  font-size: 14px;
  }
</style>
