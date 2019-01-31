<template >
<div>
    <view class="container">
    <swiper class="goodsimgs" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <swiper-item v-for="(item, index) of gallery" :key="item.id" :data-index="index">
        <img :src="item.img_url" background-size="cover"/>
        </swiper-item>
    </swiper>
    <view class="service-policy">
        <view class="item"> &nbsp;&nbsp;{{categoryName}} > {{typeName}}</view>
        <view>
           <wux-icon type="ios-git-branch" size="12" />
           <button open-type='share' class='share'>分享</button>
        </view>
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
    <view class="comments" v-if="comment.count > 0">
        <view class="h">
        <navigator :url="'../comment/comment?valueId=' + goods.id + '&typeId=0'">
            <text class="t">评价({{comment.count > 999 ? '999+' : comment.count}})</text>
            <text class="i">查看全部</text>
        </navigator>
        </view>
        <view class="b">
        <view class="item">
            <view class="info">
            <view class="user">
                <img :src="comment.data.avatar"/>
                <text>{{comment.data.nickname}}</text>
            </view>
            <view class="time">{{comment.data.add_time}}</view>
            </view>
            <view class="content">
            {{comment.data.content}}
            </view>
            <view class="imgs" v-if="comment.data.pic_list.length">
            <image class="img" v-for="(item, index) of comment.data.pic_list" :key="item.id" :data-index="index" :src="item.pic_url"/>
            </view>
            <view class="spec">白色 2件</view>
        </view>
        </view>
    </view>
    

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
    </view>
</div>
</template>

<script>

import api from '@/utils/api'
import wxParse from 'mpvue-wxparse'

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
      goods: {},
      gallery: [],
      attribute: [],
      issueList: [],
      comment: [],
      tags: [],
      specificationList: [],
      productList: [],
      relatedMaterials: [],
      cartGoodsCount: 0,
      userHasCollect: 0,
      number: 1,
      name: '',
      categoryName: '',
      typeName: '',
      sname: '',
      ename: '',
      price: '',
      description: '',
      raterVal: 5,
      checkedSpecText: '请选择规格数量',
      openAttr: false,
      noCollectImage: '/static/images/icon_collect.png',
      hasCollectImage: '/static/images/icon_collect_checked.png',
      collectBackImage: '/static/images/icon_collect.png',
      goodDetailHTMLstr: ''
    }
  },
  async onShow () {
    if (this.$route.query.id) {
      this.id = parseInt(this.$route.query.id);
    }
    this.getMaterialInfo();
  },
  methods: {

    async getMaterialInfo () {
      const material = await api.getMaterialById({ materialId: this.id });
      const resImage = await api.getMaterialImageById({ materialId: this.id });
      const relatedMaterials = await api.getMaterialRandomList({ page: 1, size: 6, type: material.type, category: material.category });

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
      material['gallery'] = gallery;
      this.gallery = gallery;
      this.name = material.name;
      this.categoryName = material.category_name;
      this.typeName = material.type_name;
      this.sname = material.sname;
      this.ename = material.ename;
      this.price = material.price;
      this.description = material.description;
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
  font-size: 14px;
  color:#666;
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

.service-policy {
  width: 720rpx;
  height: 73rpx;
  background: #f4f4f4;
  padding: 0 31.25rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.service-policy .item {
  background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png) 0 center no-repeat;
  background-size: 10rpx;
  padding-left: 15rpx;
  display: flex;
  align-items: center;
  font-size: 25rpx;
  color: #666;
}

.goods-info {
  width: 750rpx;
  height: 306rpx;
  overflow: hidden;
  background: #fff;
}

.goods-info .c {
  display: block;
  width: 718.75rpx;
  height: 100%;
  margin-left: 31.25rpx;
  padding: 38rpx 31.25rpx 38rpx 0;
  border-bottom: 1px solid #f4f4f4;
}

.goods-info .c text {
  display: block;
  width: 687.5rpx;
  text-align: center;
}

.goods-info .name {
  height: 41rpx;
  margin-bottom: 5.208rpx;
  font-size: 41rpx;
  line-height: 41rpx;
}

.goods-info .desc {
  height: 43rpx;
  margin-bottom: 41rpx;
  font-size: 24rpx;
  line-height: 36rpx;
  color: #999;
}

.goods-info .price {
  height: 35rpx;
  font-size: 35rpx;
  line-height: 35rpx;
  color: #b4282d;
}

.goods-info .brand {
  margin-top: 23rpx;
  min-height: 40rpx;
  text-align: center;
}

.goods-info .brand text {
  display: inline-block;
  width: auto;
  padding: 2px 30rpx 2px 10.5rpx;
  line-height: 35.5rpx;
  border: 1px solid #f48f18;
  font-size: 25rpx;
  color: #f48f18;
  border-radius: 4px;
  background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/detailTagArrow-18bee52dab.png) 95% center no-repeat;
  background-size: 10.75rpx 18.75rpx;
}

.section-nav {
  width: 750rpx;
  height: 108rpx;
  background: #fff;
  margin-bottom: 20rpx;
}

.section-nav .t {
  float: left;
  width: 600rpx;
  height: 108rpx;
  line-height: 108rpx;
  font-size: 29rpx;
  color: #333;
  margin-left: 31.25rpx;
}

.section-nav .i {
  float: right;
  width: 52rpx;
  height: 52rpx;
  margin-right: 16rpx;
  margin-top: 28rpx;
}

.section-act .t {
  float: left;
  display: flex;
  align-items: center;
  width: 600rpx;
  height: 108rpx;
  overflow: hidden;
  line-height: 108rpx;
  font-size: 29rpx;
  color: #999;
  margin-left: 31.25rpx;
}

.section-act .label {
  color: #999;
}

.section-act .tag {
  display: flex;
  align-items: center;
  padding: 0 10rpx;
  border-radius: 3px;
  height: 37rpx;
  width: auto;
  color: #f48f18;
  overflow: hidden;
  border: 1px solid #f48f18;
  font-size: 25rpx;
  margin: 0 10rpx;
}

.section-act .text {
  display: flex;
  align-items: center;
  height: 37rpx;
  width: auto;
  overflow: hidden;
  color: #f48f18;
  font-size: 29rpx;
}

.comments {
  width: 100%;
  height: auto;
  padding-left: 30rpx;
  background: #fff;
  margin: 20rpx 0;
}

.comments .h {
  height: 102.5rpx;
  line-height: 100.5rpx;
  width: 718.75rpx;
  padding-right: 16rpx;
  border-bottom: 1px solid #d9d9d9;
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
  background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/address-right-990628faa7.png) right center no-repeat;
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
  height: 127rpx;
  width: 100%;
  padding: 33rpx 0 27rpx 0;
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
  padding-right: 30rpx;
  line-height: 45.8rpx;
  font-size: 29rpx;
  margin-bottom: 24rpx;
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

.goods-attr {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  padding: 0 31.25rpx 25rpx 31.25rpx;
  background: #fff;
}

.goods-attr .t {
  width: 687.5rpx;
  height: 104rpx;
  line-height: 104rpx;
  font-size: 38.5rpx;
  margin-left: 10rpx;
}

.goods-attr .item {
  width: 687.5rpx;
  height: 68rpx;
  padding: 11rpx 20rpx;
  margin-bottom: 11rpx;
  background: #f7f7f7;
  font-size: 38.5rpx;
  margin-left: 10rpx;
}

.goods-attr .left {
  float: left;
  font-size: 25rpx;
  width: 134rpx;
  height: 45rpx;
  line-height: 45rpx;
  overflow: hidden;
  color: #999;
}

.goods-attr .right {
  float: left;
  font-size: 36.5rpx;
  margin-left: 20rpx;
  width: 480rpx;
  height: 45rpx;
  line-height: 45rpx;
  overflow: hidden;
  color: #333;
}

.wxParse view {
    margin-bottom: -15rpx;
}

.detail {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.detail image {
  width: 750rpx;
  display: block;
}

.common-problem {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.common-problem .h {
  position: relative;
  height: 145.5rpx;
  width: 750rpx;
  padding: 56.25rpx 0;
  background: #fff;
  text-align: center;
}

.common-problem .h .line {
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

.common-problem .h .title {
  display: inline-block;
  position: absolute;
  top: 56.125rpx;
  left: 0;
  z-index: 3;
  height: 33rpx;
  margin-left: 285rpx;
  width: 180rpx;
  background: #fff;
}

.common-problem .b {
  width: 720rpx;
  height: auto;
  overflow: hidden;
  padding: 0rpx 30rpx;
  background: #fff;
}

.common-problem .item {
  height: auto;
  overflow: hidden;
  padding-bottom: 25rpx;
}

.common-problem .question-box .spot {
  float: left;
  display: block;
  height: 8rpx;
  width: 8rpx;
  background: #b4282d;
  border-radius: 50%;
  margin-top: 11rpx;
}

.common-problem .question-box .question {
  /* float: left; */
  line-height: 30rpx;
  padding-left: 20rpx;
  display: block;
  font-size: 26rpx;
  padding-bottom: 15rpx;
  color: #303030;
}

.common-problem .answer {
  line-height: 36rpx;
  padding-left: 16rpx;
  font-size: 26rpx;
  color: #787878;
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
  border-left: none;
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
  border: 1px solid #b4282d;
  background: #b4282d;
  float: left;
  height: 100rpx;
  line-height: 96rpx;
  flex: 1;
  text-align: center;
  color: #fff;
}

.attr-pop-box {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, .5);
  z-index: 8;
  bottom: 0;
  /* display: none; */
}

.attr-pop {
  width: 100%;
  height: auto;
  max-height: 780rpx;
  padding: 31.25rpx;
  background: #fff;
  position: fixed;
  z-index: 9;
  bottom: 100rpx;
  overflow-y: auto;
}

.attr-pop .close {
  position: absolute;
  width: 48rpx;
  height: 48rpx;
  right: 80rpx;
  overflow: hidden;
  top: 31.25rpx;
}

.attr-pop .close .icon {
  width: 48rpx;
  height: 48rpx;
}

.attr-pop .img-info {
  width: 687.5rpx;
  height: 177rpx;
  overflow: hidden;
  margin-bottom: 41.5rpx;
}

.attr-pop .img {
  float: left;
  height: 177rpx;
  width: 177rpx;
  background: #f4f4f4;
  margin-right: 31.25rpx;
}

.attr-pop .info {
  float: left;
  height: 177rpx;
  width: 440rpx;
  display: flex;
  align-items: center;
}

.attr-pop .p {
  font-size: 33rpx;
  color: #333;
  height: 33rpx;
  line-height: 33rpx;
  margin-bottom: 10rpx;
}

.attr-pop .a {
  font-size: 29rpx;
  color: #333;
  height: 40rpx;
  line-height: 40rpx;
}

.spec-con {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.spec-con .name {
  height: 32rpx;
  margin-bottom: 22rpx;
  font-size: 29rpx;
  color: #333;
}

.spec-con .values {
  height: auto;
  margin-bottom: 31.25rpx;
  font-size: 0;
}

.spec-con .value {
  display: inline-block;
  height: 62rpx;
  padding: 0 35rpx;
  line-height: 56rpx;
  text-align: center;
  margin-right: 25rpx;
  margin-bottom: 16.5rpx;
  border: 1px solid #333;
  font-size: 25rpx;
  color: #333;
}

.spec-con .value.disable {
  border: 1px solid #ccc;
  color: #ccc;
}

.spec-con .value.selected {
  border: 1px solid #b4282d;
  color: #b4282d;
}

.number-item .selnum {
  width: 322rpx;
  height: 71rpx;
  border: 1px solid #ccc;
  display: flex;
}

.number-item .cut {
  width: 93.75rpx;
  height: 100%;
  text-align: center;
  line-height: 65rpx;
}

.number-item .number {
  flex: 1;
  height: 100%;
  text-align: center;
  line-height: 68.75rpx;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  float: left;
}

.number-item .add {
  width: 93.75rpx;
  height: 100%;
  text-align: center;
  line-height: 65rpx;
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
}
.material_all > .tag{padding:5px 10px;}
.material_all > .tag > .tagblue_small{margin-right:5px;}
.material_all > .title{line-height:24px;background-color:#F8F8F8;border: solid 1px #EAEAEA;margin:10px;padding:5px;font-size:11px;color:#000}
.material_all > .title .placeholder{color:#9B9B9B;}
.material_all > .title .aboutprice{color:#ff8200;font-weight: bold;}
.material_all > .descrition{color:#4A4A4A;line-height: 20px;padding:0 15px;}
</style>
