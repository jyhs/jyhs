<template >
<div>
    <view class="container">
    <swiper class="goodsimgs"  autoplay="true" interval="3000" duration="1000">
        <swiper-item v-for="(item, index) of gallery" :key="item.id" :data-index="index">
        <img :src="item.img_url" background-size="cover"/>
        </swiper-item>
    </swiper>
    <view class="service-policy">
        <view class="item"> &nbsp;&nbsp;{{categoryName}} > {{typeName}}</view>
        
    </view>

    <view class="material_all">
      <wux-row>
          <wux-col span="12">
              <view class="head">{{name}}</view>
          </wux-col>
      </wux-row>


        <view class="tag">
          <view v-for="tag of tags" :key="tag"  class="tagblue_small">{{tag}}</view>
        </view>

        <view class="title">
            <wux-row>
            <wux-col span="2">
                <view class="placeholder">学名:</view>
            </wux-col>
            <wux-col span="5">
                <view>{{sname}}</view>
            </wux-col>
            <wux-col span="2">
                <view class="placeholder">饲养难度:</view>
            </wux-col>
            <wux-col span="3">
                <view><wux-rater :defaultValue="raterVal" :font-size="11" disabled/></view>
            </wux-col>
        </wux-row>
        <wux-row>
             <wux-col span="2">
                <view class="placeholder">英文名:</view>
            </wux-col>
             <wux-col span="5">
                <view>
                  {{ename}}
                </view>
            </wux-col>
            <wux-col span="2">
                <view class="placeholder">团参考价:</view>
            </wux-col>
             <wux-col span="3">
                <view class="aboutprice">{{price}}</view>
            </wux-col>
        </wux-row>
        </view>
        <view class="descrition">
        <wxParse   :content="description"></wxParse>
        </view>
      </view>
          <wux-white-space size="small" />
    <view class="comments">
        <view class="h">
            <wux-icon type="ios-list-box" size="14" color="#ff8200" class="commicon" />
            <text class="t">最新评价</text>
            <navigator :url="'../comment/comment?valueId=' + id + '&typeId=1'" v-if="comment.data.length > 0">
                <text class="i" >查看全部</text>
            </navigator>
        </view>
    </view>
    <view  v-if="comment.data.length > 0">
    <view class="comments" v-for="item of comment.data" :key="item.id">
        <view class="b">
        <view class="item">
            <view class="info">
                <view class="user">
                    <img :src="item.user_info.avatar"/>
                    <text>{{item.user_info.nickname}}</text>
                </view>
                <view class="time">{{item.add_time}}</view>
            </view>
            <view class="content">
            {{item.content}}
            </view>
        </view>
        </view>
    </view>
     </view>
    <view class="no-comments" v-else>
        <view class="b" @click="postComment">
            <img class="icon" src="https://static.huanjiaohu.com/icon/noComment.png"/>
            <text class="txt">点击下方留言按钮,期待您的精彩留言</text>
        </view>
    </view>
          <wux-white-space size="small" />
    <view class="related-goods" v-if="relatedMaterials.length">
        <view class="h">
        <view class="line"></view>
        <text class="title">同类推荐</text>
        </view>
        <view class="b">
        <view class="item" v-for="(item, index) of relatedMaterials" :key="item.id" :data-index="index">
            <navigator :url="'/pages/material/index?id=' + item.id">
            <img class="img" :src="item.list_pic_url" background-size="cover"/>
            <text class="name">{{item.name}}</text>
            </navigator>
        </view>
        </view>
    </view>

      <view class="bottom-btn">
        <view class="l l-collect" @click="goHome">
            <img class="icon" src="/static/images/ic_menu_choice_nor.png"/>
        </view>
        <view class="l l-collect" @click="addCannelCollect">
            <img class="icon" :src="collectBackImage"/>
        </view>
        <view class="l l-cart" @click="addComment">
            <view class="box">
            <text class="cart-count">{{commentNo}}</text>
            <img  class="icon" src="/static/images/comment.png"/>
            </view>
        </view>
        <view class="r fenxiang">
          <button open-type='share'>分享</button>
        </view>
     </view>

    </view>
</div>
</template>

<script>

import api from '@/utils/api'
import wxParse from 'mpvue-wxparse'
import wx from 'wx'
export default {
  props: {
    material: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  components: {
    wxParse
  },
  data () {
    return {
      id: 0,
      material: {},
      gallery: [],
      comment: {
        data: {
          pic_list: {}
        }
      },
      relatedMaterials: [],
      tags: [],
      name: '',
      categoryName: '',
      typeName: '',
      sname: '',
      ename: '',
      price: '',
      description: '',
      raterVal: 5,
      commentNo: 0,
      noCollectBackImage: '/static/images/icon_collect.png',
      hasCollectImage: '/static/images/icon_collect_checked.png',
      collectBackImage: '/static/images/icon_collect.png'
    }
  },
  async onShow () {
    if (this.$route.query.id) {
      this.id = parseInt(this.$route.query.id);
    }
    this.getMaterialInfo();
  },
  methods: {
    goHome () {
      wx.reLaunch({
        url: '/pages/index/index'
      });
    },
    async addComment () {
      const user = wx.getStorageSync('userInfo', this.userInfo);
      if (user) {
        wx.navigateTo({
          url: '/pages/comment/commentPost?typeId=1&valueId=' + this.id
        });
      } else {
        wx.reLaunch({
          url: '/pages/ucenter/login'
        });
      }
    },
    async addCannelCollect () {
      const user = wx.getStorageSync('userInfo', this.userInfo);
      if (user) {
        const fouce = await api.fouceMaterialById({materialId: this.id});
        if (fouce.data) {
          const material = await api.getMaterialById({ materialId: this.id });
          if (material.focus_id) {
            this.collectBackImage = this.hasCollectImage;
          } else {
            this.collectBackImage = this.noCollectBackImage;
          }
        }
      } else {
        wx.reLaunch({
          url: '/pages/ucenter/login'
        });
      }
    },
    async getMaterialInfo () {
      const material = await api.getMaterialById({ materialId: this.id });
      const resImage = await api.getMaterialImageById({ materialId: this.id });
      const relatedMaterials = await api.getMaterialRandomList({ page: 1, size: 6, type: material.type, category: material.category });
      const commentCount = await api.getCommentCount({valueId: this.id, typeId: 1});
      const commentList = await api.getCommentList({valueId: this.id, typeId: 1});
      const root = 'https://static.huanjiaohu.com/image/material';
      const gallery = [];
      for (let img of resImage.image) {
        gallery.push({ img_url: root + img })
      }
      if (material.tag) {
        this.tags = material.tag.split(',');
      } else {
        this.tags = [];
      }
      if (material.level === 'yb') {
        this.raterVal = 3;
      } else if (material.level === 'ry') {
        this.raterVal = 1;
      } else {
        this.raterVal = 5;
      }
      if (material.focus_id) {
        this.collectBackImage = this.hasCollectImage;
      } else {
        this.collectBackImage = this.noCollectBackImage;
      }
      material['gallery'] = gallery;
      this.gallery = gallery;
      this.name = material.name;
      this.categoryName = material.category_name;
      this.typeName = material.type_name;
      this.sname = material.sname;
      this.ename = material.ename;
      this.price = material.price;
      this.description = material.description;
      this.comment = commentList.data;
      this.commentNo = commentCount.data.allCount;
      for (let relatedMaterial of relatedMaterials.data) {
        relatedMaterial.list_pic_url = 'https://api.huanjiaohu.com/material/getImageSmall?materialId=' + relatedMaterial.id
      }
      this.relatedMaterials = relatedMaterials.data;
    }
  },
  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      title: this.name
    }
  }
}
</script>

<style>
@import "../../utils/wxParse/wxParse.wxss";
.share{
   align-items: center;
  font-size: 25rpx;
  color: #666;
  background-color: #f4f4f4;
  padding-left: 0;
  padding-right: 0;
  line-height: 14px;
  border-radius:0;
  display:inline-block;
}
.container {
  margin-bottom: 100rpx;
}

.goodsimgs {
  width: 750rpx;
  height: 750rpx;
}

.goodsimgs image {
  width: 750rpx;
  height: 750rpx;
  background-color: #eee;
}


.comments {
  width: 100%;
  height: auto;
  padding:0 40rpx;
  background: #fff;
}


.comments .h .t {
  display: block;
  float: left;
  width: 50%;
  font-size: 38.5rpx;
  color: #333;
}

.comments .h .i {
  display: block;
  float: right;
  width: 164rpx;
  height: 100.5rpx;
  line-height: 100.5rpx;
  background: url(https://static.huanjiaohu.com/icon/right_arrow.png) right center no-repeat;
  background-size: 52rpx;
}

.comments .b {
  height: auto;
  width: 720rpx;
}

.comments .item {
  height: auto;
  width: 720rpx;
  overflow: hidden;
}

.comments .info {
  height: 67rpx;
  width: 100%;
  padding: 10px 0;
}

.comments .user {
  float: left;
  width: auto;
  height: 67rpx;
  line-height: 67rpx;
  font-size: 0;
}

.comments .user image {
  float: left;
  width: 67rpx;
  height: 67rpx;
  margin-right: 17rpx;
  border-radius: 50%;
}

.comments .user text {
  display: inline-block;
  width: auto;
  height: 66rpx;
  overflow: hidden;
  font-size: 29rpx;
  line-height: 66rpx;
}

.comments .time {
  display: block;
  float: right;
  width: auto;
  height: 67rpx;
  line-height: 67rpx;
  color: #7f7f7f;
  font-size: 25rpx;
  margin-right: 30rpx;
}

.comments .content {
  width: 720rpx;
  padding:5px;
  line-height: 45.8rpx;
  font-size: 24rpx;
  background-color:#f7f7f7;
}

.comments .imgs {
  width: 720rpx;
  height: auto;
  margin-bottom: 25rpx;
}

.comments .imgs .img {
  height: 150rpx;
  width: 150rpx;
  margin-right: 28rpx;
}

.comments .spec {
  width: 720rpx;
  padding-right: 30rpx;
  line-height: 30rpx;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 30rpx;
}

.related-goods {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.related-goods .h {
  position: relative;
  width: 750rpx;
  padding: 56.25rpx 0;
  background: #fff;
  text-align: center;
}

.related-goods .h .line {
  display: inline-block;
  position: absolute;
  top: 72rpx;
  left: 0;
  z-index: 2;
  height: 1px;
  margin-left: 225rpx;
  width: 300rpx;
  background: #ccc;
}

.related-goods .h .title {
  display: inline-block;
  position: absolute;
  top: 56.125rpx;
  left: 0;
  z-index: 3;
  height: 33rpx;
  margin-left: 285rpx;
  width: 200rpx;
  background: #fff;
}

.related-goods .b {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.related-goods .b .item {
  float: left;
  background: #fff;
  width: 312rpx;
  height: auto;
  overflow: hidden;
  text-align: center;
  padding: 15rpx 31.25rpx;
}

.related-goods .item .img {
  width: 311.45rpx;
  height: 311.45rpx;
}

.related-goods .item .name {
  display: block;
  width: 311.45rpx;
  height: 35rpx;
  margin: 11.5rpx 0 15rpx 0;
  text-align: center;
  overflow: hidden;
  font-size: 30rpx;
  color: #333;
}

.related-goods .item .price {
  display: block;
  width: 311.45rpx;
  height: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #b4282d;
}


.bottom-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 750rpx;
  height: 100rpx;
  display: flex;
  background: #fff;
}

.bottom-btn .l {
  float: left;
  height: 100rpx;
  width: 162rpx;
  border: 1px solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-btn .l.l-collect {
  border-right: none;
  text-align: center;
}

.bottom-btn .l.l-cart .box {
  position: relative;
  height: 60rpx;
  width: 60rpx;
}

.bottom-btn .l.l-cart .cart-count {
  height: 28rpx;
  width: 28rpx;
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  background: #b4282d;
  text-align: center;
  font-size: 18rpx;
  color: #fff;
  line-height: 28rpx;
  border-radius: 50%;
}

.bottom-btn .l.l-cart .icon {
  position: absolute;
  top: 10rpx;
  left: 0;
}

.bottom-btn .l .icon {
  display: block;
  height: 44rpx;
  width: 44rpx;
}

.bottom-btn .c {
  float: left;
  height: 100rpx;
  line-height: 96rpx;
  flex: 1;
  text-align: center;
  color: #333;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
}

.bottom-btn .r {
  border: 1px solid #91d5ff;
  background: #91d5ff;
  float: left;
  height: 100rpx;
  line-height: 96rpx;
  flex: 1;
  text-align: center;
  color: #fff;
}

button {

  background-color: #91d5ff;
 color: #fff;
}



.material_all{
  background-color:white;
  font-size: 12px;
  display: block;
  width: 100%;
  padding:12px;
}
.material_all .head{
  font-size: 20px;
  color:#000;
  margin-left:10px;
  text-align: center;
}
.material_all > .tag{padding:10px 10px 0 10px;}
.material_all > .tag > .tagblue_small{margin-right:5px;}
.material_all > .title{line-height:24px;background-color:#F8F8F8;border: solid 1px #EAEAEA;margin:10px;padding:5px;font-size:11px;color:#000}
.material_all > .title .placeholder{color:#9B9B9B;}
.material_all > div{font-size: 11px!important}
.material_all > .title .aboutprice{color:#ff8200;font-weight: bold;}
.material_all > .descrition{color:#4A4A4A;line-height: 20px;padding:0 15px;}
.bottom-btn .fenxiang{background-color:#87d74f;border:none;border-radius: 0;border:none}
.fenxiang button {background-color:#87d74f;border: none;line-height:50px;}


.no-comments{
    height: 100px;
    width:100%;
    text-align:center;
    background-color:white;
    border-bottom:dashed 1px #f5f5f5;
}
.no-comments .txt{
    text-align: center;
    font-size: 12px;
    color: #9b9b9b;
}
.commicon{float:left;margin-right:5px;margin-left:10px;}
.no-comments .icon{
    margin: 48rpx auto 18rpx auto;
    height: 24px;
    display: block;
    width: 24px;
}

.comments .h .t {
  display: block;
  float: left;
  width: 50%;
  font-size: 14px;
  color: #ff8200;
}
.comments .h {
  line-height:42px;
}


.service-policy {
  width: 720rpx;
  height: 36px;
  background: #f4f4f4;
  padding: 0 15px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}




.service-policy .item {
  background-size: 10rpx;
  margin-left:-10rpx;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  color: #999;
}
</style>
