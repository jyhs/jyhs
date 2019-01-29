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
            <wux-col span="4">
              指导价&nbsp;¥&nbsp;{{item.price}}
            </wux-col>
          </wux-row>
          <wux-row>
            <wux-col span="12">
                <wux-tag v-for="tag of tags" :key="tag" prefixCls="tagblue_small">{{tag}}</wux-tag>
            </wux-col>
          </wux-row>
          <wux-row>
            <wux-col span="6">
                            <wux-rater :default-value="rater" :font-size="12" disabled/>
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
.home_swzl{line-height:20px;color:#999;}
.home_swzltitle{font-size:12px;color:#000;}
.retail-item {
  background-color: #ffffff;
}

</style>
