<template>
  <view class="row group-item ngrouppre">
    <wux-wing-blank>
      <wux-white-space/>
      <wux-row>
        <wux-col span="2">
          <wux-avatar
            :src="item.headimgurl"
            shape="cycle"
            body-style="background-color: #ffffff;margin:10px 12px;"
          />
        </wux-col>
        <wux-col span="10">
          <wux-row>
            <wux-col span="5">
              <view v-for="tag of item.tag" :key="tag">
                <wux-tag prefixCls="tagblue_small">{{tag}}</wux-tag>
              </view>
            </wux-col>
            <wux-col span="7" class="wux-text--right">
              <wux-icon type="md-time" color="#A3A3A3" size="12" v-if="item.time"/>
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
              &nbsp;{{item.city_name}}
            </wux-col>
            <wux-col span="5" class="wux-assertive wux-text--right jine">
              <span v-if="item.price">¥</span>
              &nbsp;{{item.price}}
            </wux-col>
          </wux-row>
        </wux-col>
      </wux-row>
      <wux-row v-if="item.description">
        <wux-col span="12">
          <wxParse :content="item.description"></wxParse>
        </wux-col>
      </wux-row>
      <wux-white-space/>
      <wux-row v-if="item.thumImageList">
        <div class="img_all">
          <block v-for="it of item.thumImageList" :key="it.id">
            <view class="list_img" @tap="showGallery(it.id,$event)" :data-current="index">
              <wux-image
                width="100%"
                height="117px"
                :src="it"
                loading="图片加载中..."
                mode="aspectFill"
                shape="rounded"
              />
            </view>
          </block>
        </div>
      </wux-row>
      <wux-row v-if="item.buttom" class="pub_toolsarea">
        <wux-col span="4" class="wux-text--center">
          <wux-icon type="ios-chatboxes" color="#A3A3A3" size="14"/>&nbsp;评论
          <span class="pointnum">{{item.comment}}</span>
        </wux-col>
        <wux-col span="4" class="wux-text--center">
          <wux-icon type="md-thumbs-up" color="#A3A3A3" size="14"/>&nbsp;点赞
          <span class="pointnum">{{item.thumbs}}</span>
        </wux-col>
        <wux-col span="4" class="wux-text--center">
          <button open-type="share" :plain="true" :data-id="item.id" :data-title="item.title">
            <wux-icon type="md-share" color="#A3A3A3" size="12"/>&nbsp;分享
          </button>
        </wux-col>
      </wux-row>
    </wux-wing-blank>
  </view>
</template>

<script>
import { $wuxGallery } from '../../static/wux/index';
import wxParse from 'mpvue-wxparse';
export default {
  components: {
    wxParse
  },
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
      const urls = this.item.bigImageList;
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
        cancel () {},
        onTap (current, urls) {
          return true;
        },
        onChange (e) {}
      });
    }
  }
};
</script>

<style scoped>
@import "../utils/wxParse/wxParse.wxss";

.ngrouppre {
  line-height: 24px;
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
  height: 117px;
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
.fontbd {
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
}
.ydhg_des {
  font-size: 14px;
  color: #000;
  padding: 0 0 4px 0;
}
.pub_toolsarea {
  display: block;
  font-size: 12px;
  color: #999;
  padding: 0 0 6px 0;
}

.pub_toolsarea .pointnum {
  color: #02a2fd;
}
</style>
