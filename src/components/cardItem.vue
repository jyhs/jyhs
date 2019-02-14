<template>
  <view class="row group-item ngrouppre">
    <wux-wing-blank>
      <wux-white-space/>
      <wux-row>
        <wux-col span="2"  class="wux-text--left wux-ellipsis avatarstyle">
          <wux-avatar
            :src="item.headimgurl"
            shape="cycle"
            body-style="background-color: #ffffff;width: 24px; height:24px;"
          /><br/>
           <wux-icon type="ios-pin" color="#cbcbcb" size="10"/>
           {{item.city_name}}       
        </wux-col>
        <wux-col span="9">
          <wux-row>
            <wux-col span="7">
              <view v-for="tag of item.tag" :key="tag">
                <wux-tag prefixCls="tagblue_small">{{tag}}</wux-tag>
              </view>
            </wux-col>
           <wux-col span="5" class="wux-assertive jine wux-text--right">
                 <span v-if="item.price>=0">¥</span>
                  {{item.price}}
           </wux-col>
          </wux-row>
          <wux-row v-if="item.title">
            <view class="fontbd">
              <wux-col span="12">{{item.title}}</wux-col>
            </view>
          </wux-row>
          <wux-row >
             <wux-col span="4" class="wux-text--left">
                <wux-icon type="md-time" color="#A3A3A3" size="12" v-if="item.time"/>
                {{item.time}}
            </wux-col>
             <wux-col span="8" class="wux-text--left">
              <wux-icon type="ios-person" color="#cbcbcb" size="12"/> {{item.name}}
            </wux-col>
          </wux-row>
        </wux-col>
         <wux-col span="1"  class="wux-text--right">
           <wux-icon type="ios-pin" color="#cbcbcb" size="12"/>
        </wux-col>
      </wux-row>
      <wux-row v-if="item.description">
        <wux-col span="12">
          <wxParse :content="item.description"></wxParse>
        </wux-col>
      </wux-row>
      <wux-white-space v-if="item.description"/>
      <wux-row v-if="item.thumImageList">
        <div class="img_all">
          <block v-for="it of item.thumImageList" :key="it.id">
            <view class="list_img" @tap="showGallery(it.id,$event)" :data-current="index">
              <wux-image
                width="100%"
                height="97px"
                :src="it"
                loading="图片加载中..."
                mode="aspectFill"
                shape="rounded"
              />
            </view>
          </block>
        </div>
      </wux-row>
      <wux-row >
            <wux-col span="6" class="wux-text--left">
            </wux-col>
             <wux-col span="2" class="wux-text--right">
              <button :plain="true" :data-id="item.id" @click="comment" v-if="item.interaction">
                <wux-icon type="ios-chatboxes" color="#A3A3A3" size="12"/>
                评论
              </button>
            </wux-col>
             <wux-col span="2" class="wux-text--right">
              <button :plain="true" :data-id="item.id" @click="praise" v-if="item.interaction">
                <wux-icon type="ios-heart-empty" color="#A3A3A3" size="12"/>
                点赞
              </button>
            </wux-col>
             <wux-col span="2" class="wux-text--right">
              <button open-type="share" :plain="true" :data-id="item.id"  v-if="item.interaction">
                <wux-icon type="md-share" color="#A3A3A3" size="12"/>
                分享
              </button>
            </wux-col>
          </wux-row>
      <wux-row v-if="item.interaction&&praiseList.length" class="pub_toolsarea">
        <wux-col span="1" class="wux-text--center">
          <wux-icon type="ios-heart-empty" color="#1171ca" size="12"/>
        </wux-col>
        <wux-col span="11" class="wux-text--left">
          <image
            v-for="it of praiseList"
            :key="it.id"
            style="width: 24px; height: 24px; margin-right:6px;"
            :src="'https://api2.huanjiaohu.com/user/getAvatar?userId='+it.user_id"
          />
        </wux-col>
      </wux-row>
      
       <wux-row v-if="item.interaction&&commentList.length" class="pub_toolsarea">
        <wux-col span="1" class="wux-text--center">
          <wux-icon type="ios-chatboxes" color="#1171ca" size="12"/>
        </wux-col>
        <wux-col span="11" class="wux-text--left">
          <div v-for="cit of commentList" :key="cit.id">
                  {{cit.user_info.name}}: {{cit.content}}
          </div>
        </wux-col>
      </wux-row>
    </wux-wing-blank>
     <wux-row v-if="showComment" class="comment">
       <wux-cell>
          <wux-input  placeholder="评论" wux-class="comment-input" :focus="true" @change="commentChange"/>
          <button  slot="footer" :data-id="item.id" size="mini" @click="postComment">
            发送
           </button>
        </wux-cell>
      </wux-row>
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
    },
    commentClick: {
      type: Function
    }
  },
  data () {
    return {
      praiseList: this.item.interaction && this.item.interaction.praiseList ? this.item.interaction.praiseList : [],
      commentList: this.item.interaction && this.item.interaction.commentList ? this.item.interaction.commentList : [],
      showComment: false,
      content: ''
    };
  },
  methods: {
    async praise (e) {
      const praiseList = await this.item.praise(e.mp.target.dataset.id);
      this.praiseList = praiseList;
    },
    async comment (e) {
      this.showComment = true;
      this.commentClick(false);
    },
    async postComment (e) {
      this.showComment = false;
      this.commentClick(true);
      const commentList = await this.item.comment(e.mp.target.dataset.id, this.content);
      this.commentList = commentList;
    },
    commentChange (e) {
      this.content = e.mp.detail.value;
    },
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

<style>
@import "../utils/wxParse/wxParse.wxss";
.wxParse {
  margin: 0;
  line-height: 1.4;
}
.ngrouppre {
  line-height: 24px;
  color: #999;
  font-size: 11px;
  border-bottom:solid 1px #f5f5f5;
  padding-bottom:8px;
}
.ngrouppre button{line-height: 2;text-align: right}
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
  color: #333;
  padding:10px 10px 10px 0;
  line-height:1.2;
  background-color:#efefef;
}

.comment{
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #999;
  z-index: 100;
}
.comment-input{
  background-color: #ffffff;
  margin-right: 10px;
}
.avatarstyle .wux-col--span-2{
overflow:hidden;
border-right:solid 8px white;
white-space:nowrap;
text-overflow:ellipsis;
padding:0 4px;
font-size:10px;
}

</style>
