<template>
  <view class="row group-item ngrouppre">
    <wux-wing-blank>
      <wux-white-space/>
      <navigator :url="item.link">
        <wux-row>
          <wux-col span="2">
            <wux-avatar
              :src="item.avatar"
              shape="cycle"
              body-style="background-color: #ffffff;margin:6px 12px;"
            />
          </wux-col>
          <wux-col span="10">
            <wux-row>
              <wux-col span="5">
                <view v-for="tag of item.tags" :key="tag">
                  <wux-tag prefixCls="taggreen_small">{{tag}}</wux-tag>
                </view>
              </wux-col>
              <wux-col span="7" class="wux-text--right">
                <wux-icon type="md-time" color="#A3A3A3" size="12"/>
                &nbsp;&nbsp;{{item.time}}
              </wux-col>
            </wux-row>
            <wux-row>
              <view class="fontbd">
                <wux-col span="12">{{item.title}}</wux-col>
              </view>
            </wux-row>
            <wux-row>
              <wux-col span="7">
                <wux-icon type="md-person" color="#A3A3A3" size="12"/>
                &nbsp;{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;
                <wux-icon type="ios-pin" color="#A3A3A3" size="12"/>
                &nbsp;{{item.city}}
              </wux-col>
              <wux-col span="5" class="wux-assertive wux-text--right jine">¥&nbsp;{{item.price}}</wux-col>
            </wux-row>
          </wux-col>
        </wux-row>
      </navigator>
      <wux-row v-if="item.descption">
        <wux-col span="12"><view class="ydhg_des">{{item.descption}}</view></wux-col>
      </wux-row>
      <wux-row v-if="item.urls">
        <div class="img_all">
          <block v-for="it of item.urls" :key="it.id">
            <view class="list_img" @tap="showGallery(it.id,$event)" :data-current="index">
              <img :src="it">
            </view>
          </block>
        </div>
      </wux-row>
      <wux-row v-if="item.bottom">
        <wux-col span="4" class="wux-text--right">
          <wux-icon type="ios-chatboxes" color="#A3A3A3" size="12"/>
          &nbsp;评论({{item.bottom.comment}})
        </wux-col>
        <wux-col span="4" class="wux-text--right">
          <wux-icon type="md-thumbs-up" color="#A3A3A3" size="12"/>
          &nbsp;点赞({{item.bottom.thumbs}})
        </wux-col>
        <wux-col span="4" class="wux-text--right">
          <wux-icon type="md-share" color="#A3A3A3" size="12"/>&nbsp;分享
        </wux-col>
      </wux-row>
    </wux-wing-blank>
     <wux-white-space/>
  </view>
</template>

<script>
import { $wuxGallery } from '../../static/wux/index';
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  methods: {
    showGallery (index, e) {
      const { current } = e.currentTarget.dataset;
      const urls = this.item.urls;
      this.$wuxGallery = $wuxGallery();
      this.$wuxGallery.show({
        showDelete: false,
        current,
        urls,
        [`delete`]: (current, urls) => {
          urls.splice(current, 1);
          this.setData({
            urls
          });
          return true;
        },
        cancel () {
          console.log('Close gallery');
        },
        onTap (current, urls) {
          console.log(current, urls);
          return true;
        },
        onChange (e) {
          console.log(e);
        }
      });
    }
  }
};
</script>

<style scoped>
.ngrouppre {
  line-height: 22px;
  color: #999;
  font-size: 11px;
}
.fontbd {
  color: #000;
  font-size: 12px;
}
.jine {
  font-weight: bold;
  font-size: 12px;
}
.group-item {
  background-color: #ffffff;
}
.list_img {
  width: 33%;
  height: 90px;
  display: inline-block;
}
.list_img:nth-child(2),
.list_img:nth-child(3) {
  margin-left: 0.5%;
}
.list_img > img {
  width: 100%;
  height: 100%;
}
.fontbd{
  font-size:13px;
  overflow: hidden;
  white-space: nowrap;
}
.ydhg_des{font-size: 13px;color:#000;}
</style>
