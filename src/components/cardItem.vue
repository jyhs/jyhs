<template>
  <view class="row group-item ngrouppre">
    <wux-wing-blank>
      <wux-white-space/>
      <wux-row>
        <wux-col span="2" class="wux-text--left wux-ellipsis avatarstyle">
          <wux-avatar
            :data-id="item.user_id"
            :src="item.headimgurl"
            shape="square"
            body-style="background-color: #ffffff;width: 36px; height:36px;"
            @click="gotoCircle"
          />
        </wux-col>
        <wux-col span="10">
          <wux-row>
            <wux-col span="7">
              <view v-for="tag of item.tag" :key="tag">
                <wux-tag prefixCls="taggray_small" v-if="item.status==0">{{tag}}</wux-tag>
                <wux-tag prefixCls="tagblue_small" v-else>{{tag}}</wux-tag>
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
          <wux-row>
            <wux-col span="8" class="wux-text--left">
              <wux-icon type="ios-person" color="#cbcbcb" size="12"/>
              {{item.name}} - {{item.city_name}}
            </wux-col>
            <wux-col span="4" class="wux-text--right">
              <wux-icon type="md-time" color="#A3A3A3" size="12" v-if="item.time"/>
              {{item.time}}
            </wux-col>
          </wux-row>
          <wux-row v-if="item.description">
            <wux-col span="12">
              <wxParse :content="item.description"></wxParse>
            </wux-col>
          </wux-row>
          <wux-row v-if="item.thumImageList">
            <div class="img_all">
              <block v-for="it of item.thumImageList" :key="it.id">
                <view class="list_img" @tap="showGallery(it.id,$event)" :data-current="index">
                  <wux-image
                    width="100%"
                    height="96px"
                    :src="it"
                    loading="图片加载中..."
                    mode="aspectFill"
                    shape="rounded"
                  />
                </view>
              </block>
            </div>
          </wux-row>
          <wux-row v-if="item.interaction&&isInteraction">
            <wux-col span="6" class="wux-text--left">
              <wux-timeago :to="item.insert_date" v-if="item.insert_date"/>&nbsp;
              <span @click="showDelete" :data-id="item.id" v-if="showDeleteIcon">
                &nbsp;删除
              </span>
            </wux-col>
            <wux-col span="2" class="wux-text--right">
              <button :plain="true" :data-id="item.id" @click="commentClick">
                <wux-icon type="md-list" color="#A3A3A3" size="12"/>&nbsp;评论
              </button>
            </wux-col>
            <wux-col span="2" class="wux-text--right">
              <button :plain="true" :data-id="item.id" @click="praiseClick">
                <wux-icon type="ios-heart-empty" color="#A3A3A3" size="12"/>&nbsp;点赞
              </button>
            </wux-col>
            <wux-col span="2" class="wux-text--right">
              <button open-type="share" :plain="true" :data-id="item.id">
                <wux-icon type="md-share" color="#A3A3A3" size="12"/>&nbsp;分享
              </button>
            </wux-col>
          </wux-row>
          <wux-row v-if="item.interaction&&praiseList.length||commentList.length" class="pub_toolsarea">
            <div class="arrowicon"></div>
            <wux-row v-if="praiseList.length">
              <wux-col span="1" class="wux-text--center">
                <wux-icon type="ios-heart-empty" color="#576b95" size="12"/>
              </wux-col>
              <wux-col span="11" class="wux-text--left">
                <image
                  v-for="it of praiseList"
                  :key="it.id"
                  :data-id="it.user_id"
                  @click="gotoCircle"
                  style="width: 24px; height: 24px; margin-right:6px;"
                  :src="'https://api2.huanjiaohu.com/user/getAvatar?userId='+it.user_id"
                />
              </wux-col>
            </wux-row>
            <wux-row v-if="commentList.length">
              <wux-col span="12" class="wux-text--left">
                <view v-for="cit of commentList" :key="cit.id" :data-comment="cit" @click="commentContentClick">
                  <span class="comm_name"  :data-id="cit.user_info.id" @click="gotoCircle">{{cit.user_info.name}}</span>
                  <span v-if="cit.parent_comment" >&nbsp;回复</span>
                  <span class="comm_name" v-if="cit.parent_comment"  :data-id="cit.parent_comment.user_info.id" @click="gotoCircle">{{cit.parent_comment.user_info.name}}</span>
                  :&nbsp;{{cit.content}} 
                </view>
              </wux-col>
            </wux-row>
          </wux-row>
        </wux-col>
      </wux-row>
    </wux-wing-blank>
    <wux-row v-if="showComment" class="comment">
      <wux-cell>
        <wux-input
          placeholder="评论"
          wux-class="comment-input"
          :focus="true"
          @change="commentChange"
          @blur="commentBlur"
        />
        <button slot="footer" :data-id="item.id" size="mini" @click="postComment" :data-comment="commentInfo">发送</button>
      </wux-cell>
    </wux-row>
    <wux-popup position="bottom" :visible="showPopupComment"  @close="onCommentContentClose">
      <wux-cell-group class="pop_setaqua" title="评论操作">
        <wux-cell v-if="user.id !== commentInfo.user_info.id" :title="commentInfo.user_info.reply" @click="replyComment" :data-comment="commentInfo"/>
        <wux-cell v-if="user.id === commentInfo.user_info.id" :title="commentInfo.user_info.delete" @click="deleteComment" :data-comment="commentInfo"/>
      </wux-cell-group>
    </wux-popup>
  </view>
</template>

<script>
import { $wuxGallery } from '../../static/wux/index';
import wxParse from 'mpvue-wxparse';
import api from '@/utils/circleApi';
import wx from 'wx';
import { setTimeout } from 'timers';
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
    isInteraction: {
      type: Boolean,
      default () {
        return true;
      }
    },
    praiseList: {
      type: Array,
      default () {
        return this.item.interaction && this.item.interaction.praiseList
          ? this.item.interaction.praiseList
          : [];
      }
    },
    commentList: {
      type: Array,
      default () {
        return this.item.interaction && this.item.interaction.commentList
          ? this.item.interaction.commentList
          : [];
      }
    }
  },
  computed: {
    showDeleteIcon () {
      return this.item.user_id === this.user.id;
    }
  },
  onLoad () {
    this.user = wx.getStorageSync('userInfo');
  },
  data () {
    return {
      showComment: false,
      showPopupComment: false,
      commentInfo: {
        user_info: {}
      },
      content: '',
      user: {}
    };
  },
  methods: {
    async gotoCircle (e) {
      const circle = await api.getByUserId({ userId: e.mp.target.dataset.id, type: 0 });
      let id = null;
      if (circle && circle.id) {
        id = circle.id;
      } else {
        id = await api.createCircle({ userId: e.mp.target.dataset.id, type: 0 });
      }
      wx.navigateTo({
        url: '/pages/circle/personal?id=' + id
      });
    },
    showDelete (e) {
      wx.showModal({
        content: '确定删除?',
        success: async res => {
          if (res.confirm) {
            await this.item.delete(e.mp.target.dataset.id);
          }
        }
      });
    },
    async praiseClick (e) {
      const praiseList = await this.item.praise(e.mp.target.dataset.id);
      this.praiseList = praiseList;
    },
    async commentClick (e) {
      this.showComment = true;
      this.item.commentBtnClick(false);
    },
    async commentContentClick (e) {
      const commentInfo = Object.assign({}, e.mp.target.dataset.comment);
      commentInfo.user_info.reply = '回复: ' + commentInfo.user_info.name;
      commentInfo.user_info.delete = '删除: ' + commentInfo.content;
      this.commentInfo = commentInfo;
      this.showPopupComment = true;
      this.item.commentBtnClick(false);
    },
    async onCommentContentClose (e) {
      this.showPopupComment = false;
      this.item.commentBtnClick(true);
    },
    async deleteComment (e) {
      this.showPopupComment = false;
      this.item.commentBtnClick(true);
      const commentList = await this.item.deleteComment(e);
      this.commentList = commentList;
    },
    async replyComment (e) {
      this.showPopupComment = false;
      this.showComment = true;
    },
    commentBlur (e) {
      setTimeout(() => {
        this.showComment = false;
        this.item.commentBtnClick(true);
      }, 500);
    },
    async postComment (e) {
      this.showComment = false;
      this.item.commentBtnClick(true);
      const commentList = await this.item.commentPost(
        e.mp.target.dataset.id,
        this.content,
        e.mp.target.dataset.comment
      );
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
        showDelete: !!this.item.deleteImg,
        current,
        urls,
        [`delete`]: (current, urls) => {
          urls.splice(current, 1);
          this.item.deleteImg(current);
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
  color: #000;
  padding: 4px 0;
}
.ngrouppre {
  line-height: 24px;
  color: #999;
  font-size: 11px;
  border-bottom: solid 1px #f5f5f5;
  padding-bottom: 8px;
}
.ngrouppre button {
  line-height: 2;
  text-align: right;
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
  padding: 10px 10px 6px 0;
  background-color: #f7f7f7;
  margin-top:12px;
  line-height: 20px;
}
.arrowicon{
  position: absolute;
  margin-top:-16px;
  margin-left: 8px;
  background-image: url(https://static.huanjiaohu.com/mini/index/arrowbg.png);
  width: 22px;
  height: 10px;
}

.comment {
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #f7f7f7;
  z-index: 100;
}
.comment-input {
  background-color: #ffffff;
  margin-right: 10px;
}
.comment button{overflow: visible;}
.comm_name {
  font-weight: bold;
  color: #576b95;
  padding-left:7px;
}
.avatarstyle .wux-col--span-2 {
  overflow: hidden;
  border-right: solid 8px white;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px;
  font-size: 10px;
}
.wux-input__item {
  height: 2.5em!important;
  padding-left: 5px;
  font-size: 14px!important;
}
</style>
