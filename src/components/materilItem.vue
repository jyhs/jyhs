<template>
  <view class="row retail-item home_swzl">
    <wux-wing-blank>
      <wux-white-space/>
      <wux-row>
        <wux-col span="3">
          <wux-avatar
                src="https://api.huanjiaohu.com/material/getImageSmall?materialId=1812"
                shape="square"
                body-style="background-color: #ffffff;width:160rpx;height:120rpx;"
              />
        </wux-col>
        <wux-col span="9">
          <wux-row>
            <wux-col span="8">
              <view class="home_swzltitle">火焰木盒</view>
            </wux-col>
            <wux-col span="4">
              指导价&nbsp;¥&nbsp;13
            </wux-col>
          </wux-row>
           <wux-white-space size="small" /> <wux-white-space size="small" /> <wux-white-space size="small" />
          <wux-row>
            <wux-col span="12">
                <wux-tag color="blue" prefixCls="tagvolcano_small">火焰木盒</wux-tag>
            </wux-col>
          </wux-row>
          <wux-row>
            <wux-col span="6">
                            <wux-rater :default-value="3" :font-size="12" disabled/>
            </wux-col>
            <wux-col span="6">
            
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
.home_swzl{line-height:20px;color:#999;}
.home_swzltitle{font-size:12px;color:#000;}
.retail-item {
  background-color: #ffffff;
}

</style>
