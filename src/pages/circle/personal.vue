<template >
  <view class="container">
    <scroll-view scroll-y="true" style="height: 100%">
      <view class="row">
        <wux-row>
          <wux-col span="12">
            <cardItem :item="circle" :commentClick="onCommentClick"/>
          </wux-col>
        </wux-row>
      </view>
      <title text="基本设置"/>
      <wux-cell-group class="pop_setaqua">
        <wux-cell title="鱼缸类型">
          <wux-segmented-control
            slot="footer"
            :disabled="!isOwer"
            :default-current="circle.bowlType"
            :current="circle.bowlType?circle.bowlType:-1" 
            controlled
            @change="typeChange"
            theme="positive"
            :values="value1"
          />
        </wux-cell>
        <wux-cell title="鱼缸尺寸">
          <wux-segmented-control
            slot="footer"
            :disabled="!isOwer"
            :default-current="circle.bowlSize"
            :current="circle.bowlSize?circle.bowlSize:-1" 
            controlled
            @change="sizeChange"
            theme="positive"
            :values="value4"
          />
        </wux-cell>
        <wux-cell title="过滤方式">
          <wux-segmented-control
            slot="footer"
            :disabled="!isOwer"
            :default-current="circle.bowlFilter"
            :current="circle.bowlFilter?circle.bowlFilter:-1" 
            controlled
            @change="filterChange"
            theme="positive"
            :values="value2"
          />
        </wux-cell>
        <wux-cell title="过滤系统">
          <wux-segmented-control
            slot="footer"
            :disabled="!isOwer"
            :default-current="circle.bowlSystem"
            :current="circle.bowlSystem?circle.bowlSystem:-1" 
            controlled
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
     <view class="bottom-btn" v-if="isOwer">
        <wux-upload count="9"   :header="header" :formData="formData"  max="9" url="https://api2.huanjiaohu.com/circle/circle/upload" @success="onSuccess" @fail="onFail">
                    <wux-button block type="positive">拍照</wux-button>
        </wux-upload>
     </view>
    <wux-gallery id="wux-gallery"/>
    <wux-select id="wux-select1"/>
    <wux-select id="wux-select2"/>
    <wux-select id="wux-select3"/>
    <wux-select id="wux-select4"/>
    
  </view>
</template>

<script>
import api from '@/utils/circleApi';
import wx from 'wx';
import cardItem from '@/components/cardItem';
import { $wuxSelect } from '../../../static/wux/index';
import title from '@/components/title';

export default {
  components: {
    cardItem,
    title
  },
  data () {
    return {
      formData: null,
      header: null,
      id: null,
      value1: ['SPS缸', 'LPS缸', 'FOT缸'],
      value2: ['底滤', '背滤'],
      value3: ['柏林系统', 'ZEO', 'ATS'],
      value4: ['微缸', '小型', '中型', '大型'],
      circle: {}
    };
  },
  computed: {
    isOwer () {
      const user = wx.getStorageSync('userInfo');
      if (user.id === this.circle.user_id) {
        return true;
      } else {
        return false;
      }
    }
  },
  async onLoad () {
    const token = wx.getStorageSync('token');
    this.header = { Authorization: token };
  },
  async onShow () {
    this.id = this.$route.query.id;
    this.formData = {'circleId': this.id};
    this.loadingCircle();
  },
  methods: {
    async loadingCircle () {
      this.circle = await api.getCircleById({ circleId: this.id });
      this.circle['praise'] = this.praise;
      this.circle['comment'] = this.comment;
      this.circle['delete'] = this.delete;
      this.circle['deleteImg'] = this.deleteImg;
    },
    onClickBrand () {
      $wuxSelect('#wux-select1').open({
        value: this.circle.bowlBrand,
        options: ['法官', '医生', '猎人', '学生', '记者', '其他'],
        onConfirm: (value, index, options) => {
          if (index !== -1) {
            this.$set(this.circle, 'bowlBrand', options[index]);
            api.updateCircleSetting(this.circle);
          }
        }
      });
    },
    async deleteImg (id) {
      const imgObj = this.circle.imageList[id];
      await api.deleteImage({ circleImgId: imgObj.id });
      this.loadingCircle();
    },
    async delete (id) {
      await api.deleteCircle({
        'circleId': id
      });
      this.loadingCircle();
    },
    async praise (id) {
      const list = await api.praise({ circleId: id });
      return list;
    },
    onCommentClick (flag = false) {
      this.isOwer = flag;
    },
    async comment (id, comment) {
      const list = await api.commentPost({
        valueId: id,
        typeId: 2,
        content: comment
      });
      return list;
    },
    throttle (method, context) {
      clearTimeout(method.tId);
      method.tId = setTimeout(function () {
        method.call(context)
      }, 1000)
    },
    async onSuccess (e) {
      this.throttle(this.loadingCircle)
    },
    async typeChange (e) {
      this.circle.bowlType = e.mp.detail.key + '';
      await api.updateCircleSetting(this.circle);
      this.loadingCircle();
    },
    sizeChange (e) {
      this.circle.bowlSize = e.mp.detail.key + '';
      api.updateCircleSetting(this.circle);
    },
    systemChange (e) {
      this.circle.bowlSystem = e.mp.detail.key + '';
      api.updateCircleSetting(this.circle);
    },
    filterChange (e) {
      this.circle.bowlFilter = e.mp.detail.key + '';
      api.updateCircleSetting(this.circle);
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
.bottom-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 1px -2px 2px #e9e9e9;
}
</style>
