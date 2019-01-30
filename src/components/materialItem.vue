<template>
  <view class="row retail-item home_swzl">
    <wux-wing-blank>
      <wux-white-space/>
      <wux-row>
        <wux-col span="3">
          <wux-avatar
                :src='url'
                shape="square"
                body-style="background-color: #ffffff;width:160rpx;height:120rpx;"
              />
        </wux-col>
        <wux-col span="9">
          <wux-row>
            <wux-col span="8">
              <view class="home_swzltitle">{{item.name}}</view>
            </wux-col>
            <wux-col span="4" class="wux-text--right">
              <view class="tzdja">团参考价 </view>
              <view class="tzdjb"> {{item.price}}</view>
            </wux-col>
          </wux-row>
          <wux-row>
            <wux-col span="12">
                <view v-for="tag of tags" :key="tag" class="tagblue_small">{{tag}}</view>
            </wux-col>
          </wux-row>
          <wux-row>
            <wux-col span="6">
                            <wux-rater :default-value="rater" :font-size="11" disabled/>
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
  },
  data () {
    return {
      url: 'https://api.huanjiaohu.com/material/getImageSmall?materialId=' + this.item.id
    }
  },
  computed: {
    tags () {
      if (this.item.tag) {
        return this.item.tag.split(',');
      } else {
        return [];
      }
    },
    rater () {
      if (this.item.level === 'yb') {
        return 3;
      } else if (this.item.level === 'ry') {
        return 1;
      } else {
        return 5;
      }
    }
  }
};
</script>

<style scoped>
.home_swzl{line-height:21px;color:#999;}
.home_swzltitle{font-size:13px;color:#000;}
.retail-item {
  background-color: #ffffff;
}
.tzdja{font-size: 11px;display: inline-block;}
.tzdjb{font-size: 12px;display: inline;color:#ff8200}
</style>
