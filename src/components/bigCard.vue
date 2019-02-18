<template >
    <block>
        <wux-divider v-if="data.update_time">
            <wux-timeago :to="data.content.create_time*1000"/>
        </wux-divider>
        <view class="space" v-else/>
        <wux-wing-blank>
            <view class="item-style">
                <view v-if="style">
                    <navigator :url="data.content.news_item[0].navigator_url">
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
                    </navigator>
                    <wux-white-space/>
                </view>
                <view v-else>
                    <navigator :url="data.content.news_item[0].navigator_url">
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
                        <cover-view class="cover-text">{{data.content.news_item[0].title}}</cover-view>
                    </navigator>
                    <wux-row v-for="(item,index) of sublist" :key="index">
                        <navigator :url="item.navigator_url">
                            <wux-col span="10">
                                <wux-row>
                                    <wux-wing-blank>
                                        <wux-col span="12" class="title">{{item.title}}</wux-col>
                                    </wux-wing-blank>
                                </wux-row>
                                <wux-white-space/>
                                <wux-row>
                                    <wux-wing-blank>
                                        <wux-col span="12" class="description">{{item.digest}}</wux-col>
                                    </wux-wing-blank>
                                </wux-row>
                            </wux-col>
                            <wux-col span="2">
                                <wux-image
                                    wux-class="image"
                                    width="50px"
                                    height="50px"
                                    :src="item.thumb_url"
                                    loading="图片加载中..."
                                />
                            </wux-col>
                        </navigator>
                    </wux-row>
                </view>
                <wux-row v-if="data.comment">
                    <wux-wing-blank>
                        <wux-col span="10" class="description">
                            <wux-icon type="ios-chatboxes" color="#A3A3A3" size="16"/>&nbsp;13
                            &nbsp;
                            &nbsp;
                            <wux-icon type="ios-heart-empty" color="#A3A3A3" size="16"/>&nbsp;20
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
  computed: {
    style () {
      if (this.data.content.news_item.length === 1) {
        return true;
      } else {
        return false;
      }
    },
    sublist () {
      if (this.data.content.news_item.length === 1) {
        return this.data.content.news_item;
      } else {
        return this.data.content.news_item.slice(
          1,
          this.data.content.news_item.length
        );
      }
    }
  },
  onLoad () {
    for (const item of this.data.content.news_item) {
      wx.setStorage({
        key: item.id + '',
        data: item
      });
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
.text {
  color: #888;
  font-size: 14px;
}
.cover-text {
  font-size: 30rpx;
  color: #ffffff;
  position: relative;
  bottom: 40rpx;
  z-index: 100;
  left: 20rpx;
}
.space:first-child {
  margin-top: 10px;
}
</style>
