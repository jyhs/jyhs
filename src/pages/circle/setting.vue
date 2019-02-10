<template >
  <view class="container">
    <view class="row">
      <wux-row>
        <wux-col span="10">
          <cardItem :item="user"/>
        </wux-col>
        <wux-col span="1">
          <view class="setting">&nbsp;分享</view>
        </wux-col>
        <wux-col span="1">
          <view class="setting">&nbsp;分享</view>
        </wux-col>
      </wux-row>
    </view>
    <swiper class="banner" :current="current">
      <swiper-item>
        <view class="content">
          <view class="row upload">
            <div class="img_all">
              <block v-for="(it,index) of urls" :key="index">
                <view class="list_img" @tap="showGallery(index,$event)" :data-current="index">
                  <img :src="it">
                </view>
              </block>
            </div>
            <view class="upload-btn">
              <wux-upload
                url="https://api2.huanjiaohu.com/circle/circle/upload"
                @success="onSuccess"
                @fail="onFail"
              >
                <button type="default">拍照上传</button>
              </wux-upload>
            </view>
          </view>
          <scroll-view scroll-y="true" style="height: 100%">
            <view v-for="friend of friends" :key="friend.id">
              <cardItem :item="friend"/>
              <wux-white-space size="small"/>
            </view>
            <loadMore :reflash="reflash"/>
          </scroll-view>
        </view>
      </swiper-item>
      <swiper-item>
        <scroll-view scroll-y="true" style="height: 100%">
          <view class="content">
            <wux-cell-group title="基本设置">
              <wux-cell title="鱼缸类型">
                <wux-segmented-control
                  slot="footer"
                  default-current="-1"
                  @change="typeChange"
                  theme="positive"
                  :values="value1"
                />
              </wux-cell>
              <wux-cell title="过滤方式">
                <wux-segmented-control
                  slot="footer"
                  default-current="-1"
                  @change="filterChange"
                  theme="positive"
                  :values="value2"
                />
              </wux-cell>
              <wux-cell title="过滤系统">
                <wux-segmented-control
                  slot="footer"
                  default-current="-1"
                  @change="systemChange"
                  theme="positive"
                  :values="value3"
                />
              </wux-cell>
              <wux-cell title="鱼缸尺寸">
                <wux-segmented-control
                  slot="footer"
                  default-current="-1"
                  @change="sizeChange"
                  theme="positive"
                  :values="value4"
                />
              </wux-cell>
            </wux-cell-group>
            <wux-cell-group title="高级设置">
              <wux-cell title="鱼缸类型">
                <wux-segmented-control
                  slot="footer"
                  default-current="-1"
                  @change="typeChange"
                  theme="positive"
                  :values="value1"
                />
              </wux-cell>
              <wux-cell title="过滤方式">
                <wux-segmented-control
                  slot="footer"
                  default-current="-1"
                  @change="filterChange"
                  theme="positive"
                  :values="value2"
                />
              </wux-cell>
              <wux-cell title="过滤系统">
                <wux-segmented-control
                  slot="footer"
                  default-current="-1"
                  @change="systemChange"
                  theme="positive"
                  :values="value3"
                />
              </wux-cell>
              <wux-cell title="鱼缸尺寸">
                <wux-segmented-control
                  slot="footer"
                  default-current="-1"
                  @change="sizeChange"
                  theme="positive"
                  :values="value4"
                />
              </wux-cell>
              <wux-cell hover-class="none">
                <wux-button block type="positive" @tap="open">开缸</wux-button>
              </wux-cell>
            </wux-cell-group>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
    <wux-gallery id="wux-gallery"/>
  </view>
</template>

<script>
import api from '@/utils/api';
import util from '@/utils/util';
import wx from 'wx';
import { setTimeout } from 'timers';
import cardItem from '@/components/cardItem';
import { $wuxGallery } from '../../../static/wux/index';

export default {
  components: {
    cardItem
  },
  data () {
    return {
      current: 0,
      user: {},
      isPopup: true,
      value1: ['SPS缸', 'LPS缸', 'FOT缸'],
      value2: ['底滤', '背滤'],
      value3: ['柏林系统', 'ZEO', 'ATS'],
      value4: ['微缸', '小型', '中型', '大型'],
      urls: [
        'https://api.huanjiaohu.com/material/getImageSmall?materialId=206',
        'https://api.huanjiaohu.com/material/getImageSmall?materialId=207',
        'https://api.huanjiaohu.com/material/getImageSmall?materialId=208'
      ]
    };
  },
  async onLoad () {
    const user = wx.getStorageSync('userInfo', this.userInfo);
    user.title = '我的云端海缸';
    user.navigate_url = '/pages/circle/circle';
    this.user = user;
  },
  async onShow () {
    const setting = await api.getCircleSetting();
    if (setting.id) {
      const list = await api.listByUserId({type: 0});
      let id = null;
      if (list.data.length === 0) {
        id = await api.createCircle({type: 0});
      } else {
        id = list.data[0].id;
      }
      wx.setStorageSync('my-circle-id', id);
      wx.navigateTo({
        url: '/pages/circle/circlePost?id=' + id
      });
    } else {
      this.isPopup = true;
    }
  },

  methods: {
    change (e) {
      this.current = e.mp.detail.key;
    },
    showGallery (index, e) {
      const { current } = e.currentTarget.dataset;
      const urls = this.urls;
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
    },
    open () {
      wx.showToast({
        title: '开缸成功',
        duration: 2000,
        complete: () => {
          this.isPopup = false;
        }
      });
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
      // console.log('监听输入事件', event);
      let value = event.target.value;
      // 判断是否超过140个字符
      if (value && value.length > 140) {
        return false;
      }
      this.content = event.target.value;
    },
    // 提交评论
    async onPost () {
      if (!this.content) {
        util.showErrorToast('请填写评论');
        return false;
      }
      const res = await api.CommentPost({
        valueId: this.valueId,
        typeId: this.typeId,
        content: this.content
      });
      if (res.errno === 0) {
        wx.showToast({
          title: '评论成功',
          duration: 2000,
          complete: () => {
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        });
      }
    },
    // 返回上一页
    onClose () {
      this.$router.go(-1);
    }
  },
  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      title: 'xbyjShop',
      desc: '仿网易严选小程序商城',
      path: '/pages/comment/commentPost'
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
.upload-btn {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
