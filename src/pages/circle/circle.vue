<template >
  <view class="container">
    <scroll-view scroll-y="true" style="height: 100%">
      <view class="row">
        <wux-row>
          <wux-col span="12">
            <cardItem :item="user"/>
          </wux-col>
        </wux-row>
      </view>
      <wux-cell-group class="pop_setaqua">
        <div class="img_all">
          <block v-for="(it,index) of thumImageList" :key="index">
            <view class="list_img" @tap="showGallery(index,$event)" :data-current="index">
              <wux-image width="100%" height="97px" loading="图片加载中..." :src="it"/>
            </view>
          </block>
          <block>
            <view class="list_img">
              <wux-upload
                :showUploadList="false"
                listType="picture-card"
                :max="max"
                count="1"
                :header="header"
                :formData="formData"
                url="https://api2.huanjiaohu.com/circle/circle/upload"
                @success="onSuccess"
                @fail="onFail"
              >
                <text>拍照</text>
              </wux-upload>
            </view>
          </block>
        </div>
      </wux-cell-group>
      <wux-cell-group>
        <wux-row v-if="circle.interaction&&praiseList.length" class="pub_toolsarea">
          <wux-col span="1" class="wux-text--center">
            <wux-icon type="md-heart" color="#A3A3A3" size="14"/>
          </wux-col>
          <wux-col span="11" class="wux-text--left">
            <image
              v-for="it of praiseList"
              :key="it.id"
              style="width: 25px; height: 25px; margin-right:5px;"
              :src="'https://api2.huanjiaohu.com/user/getAvatar?userId='+it.user_id"
            />
          </wux-col>
        </wux-row>
        <wux-row v-if="circle.interaction&&commentList.length" class="pub_toolsarea">
          <wux-col span="1" class="wux-text--center">
            <wux-icon type="ios-chatboxes" color="#A3A3A3" size="14"/>
          </wux-col>
          <wux-col span="11" class="wux-text--left">
            <div class="comment-detail" v-for="cit of commentList" :key="cit.id">
              <div class="comment-detail-left">
                <image
                  style="width: 35px; height: 35px; margin-right:5px;"
                  :src="cit.user_info.headimgurl"
                />
              </div>
              <div class="comment-detail-right">
                <div class="comment-detail-right-up">
                  <div>{{cit.user_info.name}}</div>
                  <div>{{cit.add_time}}</div>
                </div>
                <div class="comment-detail-right-down">{{cit.content}}</div>
              </div>
            </div>
          </wux-col>
        </wux-row>
        <view class="no-comments" v-else>
          <view class="b" @click="postComment">
            <img class="icon" src="https://static.huanjiaohu.com/icon/noComment.png">
            <text class="txt">点击下方留言按钮,期待您的精彩留言</text>
          </view>
        </view>
      </wux-cell-group>
      <title text="基本设置"/>
      <wux-cell-group class="pop_setaqua">
        <wux-cell title="鱼缸类型">
          <wux-segmented-control
            slot="footer"
            :default-current="circle.type"
            @change="typeChange"
            theme="positive"
            :values="value1"
          />
        </wux-cell>
        <wux-cell title="鱼缸尺寸">
          <wux-segmented-control
            slot="footer"
            :default-current="circle.size"
            @change="sizeChange"
            theme="positive"
            :values="value4"
          />
        </wux-cell>
        <wux-cell title="过滤方式">
          <wux-segmented-control
            slot="footer"
            :default-current="circle.filter"
            @change="filterChange"
            theme="positive"
            :values="value2"
          />
        </wux-cell>
        <wux-cell title="过滤系统">
          <wux-segmented-control
            slot="footer"
            :default-current="circle.bowlSystem"
            @change="systemChange"
            theme="positive"
            :values="value3"
          />
        </wux-cell>
      </wux-cell-group>
      <title text="高级设置"/>
      <wux-cell-group class="pop_setaqua">
        <wux-cell title="鱼缸品牌" :extra="circle.bowlBrand" @click="onClickBrand" :isLink="true"/>
        <wux-cell title="灯具品牌"></wux-cell>
        <wux-cell title="蛋分型号"></wux-cell>
        <wux-cell title="造流型号"></wux-cell>
        <wux-cell>&nbsp;</wux-cell>
      </wux-cell-group>
    </scroll-view>
    <wux-gallery id="wux-gallery"/>
    <wux-select id="wux-select1"/>
    <wux-select id="wux-select2"/>
    <wux-select id="wux-select3"/>
    <wux-select id="wux-select4"/>
    <view class="bottom-btn">
      <view class="l l-collect" @click="goHome">
        <img class="icon" src="/static/images/ic_menu_choice_nor.png">
      </view>
      <view class="l l-collect" @click="praise">
        <img class="icon" :src="collectBackImage">
      </view>
      <view class="l l-cart" @click="addComment">
        <view class="box">
          <text class="cart-count">{{commentNo}}</text>
          <img class="icon" src="/static/images/comment.png">
        </view>
      </view>
      <view class="r fenxiang">
        <button :plain="true" open-type="share">分享</button>
      </view>
    </view>
  </view>
</template>

<script>
import api from '@/utils/circleApi';
import wx from 'wx';
import cardItem from '@/components/cardItem';
import { $wuxGallery, $wuxSelect } from '../../../static/wux/index';
import title from '@/components/title';

export default {
  components: {
    cardItem,
    title
  },
  data () {
    return {
      current: 0,
      user: {},
      setting: null,
      formData: null,
      header: null,
      id: null,
      value1: ['SPS缸', 'LPS缸', 'FOT缸'],
      value2: ['底滤', '背滤'],
      value3: ['柏林系统', 'ZEO', 'ATS'],
      value4: ['微缸', '小型', '中型', '大型'],
      thumImageList: [],
      max: 9,
      praiseList: [],
      commentList: [],
      commentNo: 0,
      circle: {},
      noCollectBackImage: '/static/images/icon_collect.png',
      hasCollectImage: '/static/images/icon_collect_checked.png',
      collectBackImage: '/static/images/icon_collect.png'
    };
  },
  async onLoad () {
    this.id = this.$route.query.id;
    const token = wx.getStorageSync('token');
    this.circle = await api.getCircleById({ circleId: this.id });
    console.log(this.circle);
    if (token) {
      this.header = { Authorization: token };
    } else {
    }
    const circle = Object.assign({}, this.circle);
    delete circle.interaction;
    delete circle.thumImageList;
    this.user = circle;
    this.formData = { circleId: this.id };
    this.thumImageList = this.circle.thumImageList;
    if (this.thumImageList.length < 9) {
      this.max = 9 - this.thumImageList.length;
    } else {
      this.max = 0;
    }
    this.praiseList =
      this.circle.interaction && this.circle.interaction.praiseList
        ? this.circle.interaction.praiseList
        : [];
    const user = wx.getStorageSync('userInfo');
    let flag = false;
    for (const praise of this.praiseList) {
      if (praise.user_id === user.id) {
        flag = true;
      }
    }
    if (flag) {
      this.collectBackImage = this.hasCollectImage;
    } else {
      this.collectBackImage = this.noCollectBackImage;
    }
  },
  async onShow () {
    this.commentList = await api.getComments({ circleId: this.id });
    this.commentNo = this.commentList.length;
  },
  methods: {
    onClickBrand () {
      $wuxSelect('#wux-select1').open({
        value: this.circle.bowl_brand,
        options: ['法官', '医生', '猎人', '学生', '记者', '其他'],
        onConfirm: (value, index, options) => {
          if (index !== -1) {
            this.$set(this.circle, 'bowlBrand', options[index]);
            api.updateCircleSetting(this.circle);
          }
        }
      });
    },
    goHome () {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    async addComment () {
      const user = wx.getStorageSync('userInfo', this.userInfo);
      if (user) {
        wx.navigateTo({
          url: '/pages/comment/commentPost?typeId=2&valueId=' + this.id
        });
      } else {
        wx.reLaunch({
          url: '/pages/ucenter/login'
        });
      }
    },
    async praise () {
      const user = wx.getStorageSync('userInfo');
      const praiseList = await api.praise({ circleId: this.id });
      let flag = false;
      for (const praise of praiseList) {
        if (praise.user_id === user.id) {
          flag = true;
        }
      }
      this.praiseList = praiseList;
      if (flag) {
        this.collectBackImage = this.hasCollectImage;
      } else {
        this.collectBackImage = this.noCollectBackImage;
      }
    },
    change (e) {
      this.current = e.mp.detail.key;
    },
    showGallery (index, e) {
      const { current } = e.currentTarget.dataset;
      const urls = this.circle.bigImageList;
      this.$wuxGallery = $wuxGallery();
      this.$wuxGallery.show({
        showDelete: true,
        current,
        urls,
        [`delete`]: (current, urls) => {
          urls.splice(current, 1);
          const imgObj = this.circle.imageList[current];
          api.deleteImage({ circleImgId: imgObj.id }).then(res => {
            this.thumImageList = urls;
            if (this.thumImageList.length < 9) {
              this.max = 9 - this.thumImageList.length;
            } else {
              this.max = 0;
            }
          });
          return true;
        },
        cancel () {
          // console.log('Close gallery');
        },
        onTap (current, urls) {
          return true;
        },
        onChange (e) {
          console.log(e);
        }
      });
    },
    async onSuccess () {
      this.circle = await api.getCircleById({ circleId: this.id });
      this.thumImageList = this.circle.thumImageList;
    },
    typeChange (e) {
      console.log(e.mp.detail.key);
    },
    sizeChange (e) {
      console.log(e.mp.detail.key);
    },
    systemChange (e) {
      console.log(e.mp.detail.key);
    },
    filterChange (e) {
      console.log(e.mp.detail.key);
    },
    bindInpuntValue (event) {
      let value = event.target.value;
      if (value && value.length > 140) {
        return false;
      }
      this.content = event.target.value;
    },
    // 返回上一页
    onClose () {
      this.$router.go(-1);
    }
  },
  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      path: '/pages/circle/circle?id=' + this.id
    };
  }
};
</script>

<style scoped>
page,
.container {
  height: 100%;
  background: #f4f4f4;
}
.banner {
  width: 750rpx;
  height: 1000rpx;
}
.setting {
  display: block;
  line-height: 145rpx;
  background-size: 42rpx;
  background-color: #ffffff;
}
.upload {
  padding: 30rpx 30rpx;
  background-color: #ffffff;
  min-height: 1000rpx;
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

.bottom-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 750rpx;
  height: 100rpx;
  display: flex;
  background: #fff;
  box-shadow: 1px -2px 2px #e9e9e9;
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
  background: #387ef5;
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
.no-comments {
  height: 100px;
  width: 100%;
  text-align: center;
  background-color: white;
  border-bottom: dashed 1px #f5f5f5;
  padding-top: 20rpx;
}
.no-comments .txt {
  text-align: center;
  font-size: 12px;
  color: #9b9b9b;
}
.commicon {
  float: left;
  margin-right: 5px;
  margin-left: 10px;
}
.no-comments .icon {
  margin: 48rpx auto 18rpx auto;
  height: 24px;
  display: block;
  width: 24px;
}
.comment-detail {
  display: flex;
}
.comment-detail-right {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.comment-detail-right-up {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
