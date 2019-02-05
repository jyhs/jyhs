<template >
    <block>
        <wux-divider v-if="data.update_time">
            <wux-timeago :to="data.update_time*1000"/>
        </wux-divider>
        <navigator :url="'/pages/information/detail?media_id='+data.content.news_item[0].thumb_media_id">
            <wux-wing-blank>
                <view class="item-style">
                    <wux-row>
                        <wux-col span="12">
                            <wux-image
                                wux-class="image"
                                width="100%"
                                :src="data.content.news_item[0].thumb_url"
                                loading="图片加载中..."
                            />
                        </wux-col>
                    </wux-row>
                    <wux-white-space/>
                    <wux-row>
                        <wux-wing-blank>
                            <wux-col span="12" class="title">{{data.content.news_item[0].title}}</wux-col>
                        </wux-wing-blank>
                    </wux-row>
                    <wux-white-space/>
                    <wux-row>
                        <wux-wing-blank>
                            <wux-col
                                span="12"
                                class="description"
                            >{{data.content.news_item[0].digest}}</wux-col>
                        </wux-wing-blank>
                    </wux-row>
                    <wux-white-space/>
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
        </navigator>
        <wux-white-space/>
    </block>
</template>

<script>
import wx from 'wx';
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          width: '375px',
          height: '180px'
        };
      }
    }
  },
  onLoad () {
    wx.setStorage({
      key: this.data.content.news_item[0].thumb_media_id,
      data: this.data.content.news_item[0].url
    })
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
.text {
  color: #888;
  font-size: 14px;
}
</style>
