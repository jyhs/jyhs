<template>
  <view class="row group-item">
    <wux-wing-blank>
      <wux-white-space/>
      <wux-row>
        <wux-col span="2">
          <wux-avatar
            src="https://api.huanjiaohu.com/user/getAvatar?userId=3152"
            body-style="background-color: #ffffff;width:100rpx;height:100rpx;line-height:100rpx;"
          />
        </wux-col>
        <wux-col span="10">
          <wux-row>
            <wux-col span="5">
              <wux-tag color="green">热团中</wux-tag>
            </wux-col>
            <wux-col span="7" class="wux-text--right">
              <wux-icon type="md-time" color="#A3A3A3" size="16"/>&nbsp;2019-01-18 00:00
            </wux-col>
          </wux-row>
          <wux-white-space/>
          <wux-row>
            <wux-col span="12">月亮公主（周六）年前免运费团</wux-col>
          </wux-row>
          <wux-white-space/>
          <wux-row>
            <wux-col span="5" class="wux-assertive">¥2307</wux-col>
            <wux-col span="7" class="wux-text--right">
              <wux-icon type="md-person" color="#A3A3A3" size="16"/>&nbsp;月亮姐姐
              <wux-icon type="ios-pin" color="#A3A3A3" size="16"/>&nbsp;上海
            </wux-col>
          </wux-row>
        </wux-col>
      </wux-row>
      <wux-white-space/>
    </wux-wing-blank>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.group-item {
  background-color: #ffffff;
}
</style>
