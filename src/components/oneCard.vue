<template >
    <block>
        <wux-divider v-if="data.time">
            <view>
                <text class="text">{{data.time}}</text>
            </view>
        </wux-divider>
        <wux-wing-blank>
            <view class="item-style">
                <wux-row>
                    <wux-col span="12">
                        <wux-image
                            wux-class="image"
                            :width="data.width"
                            :height="data.height"
                            :src="data.src"
                            loading="Loading"
                        />
                    </wux-col>
                </wux-row>
                <wux-white-space/>
                <wux-row>
                    <wux-wing-blank>
                        <wux-col span="12" class="title">{{data.title}}</wux-col>
                    </wux-wing-blank>
                </wux-row>
                <wux-white-space/>
                <wux-row v-if="data.description">
                    <wux-wing-blank>
                        <wux-col span="12" class="description">{{data.description}}</wux-col>
                    </wux-wing-blank>
                </wux-row>
                <wux-white-space v-if="data.description"/>
                <wux-row v-if="data.comment">
                    <wux-wing-blank>
                        <wux-col span="10" class="description">
                            <wux-icon type="ios-chatboxes" color="#A3A3A3" size="16"/>&nbsp;13
                            &nbsp;
                            &nbsp;
                            <wux-icon type="ios-thumbs-up" color="#A3A3A3" size="16"/>&nbsp;20
                        </wux-col>
                        <wux-col span="2" class="description wux-text--right" v-if="data.share">
                            <wux-icon type="md-share" color="#A3A3A3" size="16"/>&nbsp;分享
                        </wux-col>
                    </wux-wing-blank>
                </wux-row>
                <wux-white-space v-if="data.comment"/>
            </view>
        </wux-wing-blank>
        <wux-white-space/>
    </block>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          width: '375px',
          height: '180px',
          src:
            'https://static.huanjiaohu.com/image/material/hy/1524499703-HYMH.png'
        };
      }
    }
  }
};
</script>

<style scoped>
.item-style {
  background-color: white;
  border-radius: 5px;
}
.item-style .title {
  font-size: 14px;
}
.item-style .description {
  font-size: 12px;
  color: #888;
}
.text{
    color: #888;
    font-size: 14px;
}
</style>
