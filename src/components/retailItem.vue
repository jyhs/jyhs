<template>
  <view class="row retail-item">
    <wux-wing-blank>
      <wux-white-space/>
      <wux-row>
        <wux-col span="2">
          <wux-avatar
            src="https://api.huanjiaohu.com/user/getAvatar?userId=3152"
            body-style="background-color: #ffffff;width:120rpx;height:120rpx;line-height:120rpx;"
          />
          <br>
          <wux-icon type="ios-pin" color="#A3A3A3" size="12"/>&nbsp;上海
        </wux-col>
        <wux-col span="10">
          <wux-row>
            <wux-col span="10">
              <wux-icon type="md-person" color="#A3A3A3" size="12"/>&nbsp;天鸿水族
              <wux-rater :default-value="3" :font-size="12" disabled/>
            </wux-col>
            <wux-col span="2">
              <wux-icon type="ios-chatboxes" color="#A3A3A3" size="12"/>&nbsp;13
            </wux-col>
          </wux-row>

          <wux-row>
            <view class="retial_title">
            <wux-col span="12">月亮公主（周六）年前免运费团</wux-col>
            </view>
          </wux-row>
               <wux-white-space size="small" />

          <wux-row>
            <wux-col span="3">
              <wux-avatar
                src="https://api.huanjiaohu.com/material/getImageSmall?materialId=1812"
                shape="square"
                body-style="background-color: #ffffff;width:120rpx;height:120rpx;"
              />
            </wux-col>
            <wux-col span="3">
              <wux-avatar
                src="https://api.huanjiaohu.com/material/getImageSmall?materialId=73"
                shape="square"
                body-style="background-color: #ffffff;width:120rpx;height:120rpx;"
              />
            </wux-col>
            <wux-col span="3">
              <wux-avatar
                src="https://api.huanjiaohu.com/material/getImageSmall?materialId=232"
                shape="square"
                body-style="background-color: #ffffff;width:120rpx;height:120rpx;"
              />
            </wux-col>
            <wux-col span="3">
              <wux-avatar
                src="https://api.huanjiaohu.com/material/getImageSmall?materialId=206"
                shape="square"
                body-style="background-color: #ffffff;width:120rpx;height:120rpx;"
              />
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
.retail-item {
  background-color: #ffffff;
  line-height: 20px;
  font-size: 11px;
}
.retial_title
{
  font-weight: bold;
  font-color:#000;
}

</style>
