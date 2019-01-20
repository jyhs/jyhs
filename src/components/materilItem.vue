<template>
  <view class="row retail-item">
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
              火焰木盒
            </wux-col>
            <wux-col span="4">
              指导价&nbsp;¥&nbsp;13
            </wux-col>
          </wux-row>
          <wux-row>
            <wux-col span="12">
                <wux-tag color="blue" prefixCls="home_materil">火焰木盒</wux-tag>
            </wux-col>
          </wux-row>
          <wux-row>
            <wux-col span="6">
                            <wux-rater :default-value="3" :font-size="15" disabled/>
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
.retail-item {
  background-color: #ffffff;
}

</style>
