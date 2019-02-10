<template >
  <view class="container">
    <view class="row" @tap="gotoMyCircle">
      <wux-row>
        <wux-col span="11">
          <cardItem :item="user"/>
        </wux-col>
        <wux-col span="1">
          <view class="setting">&nbsp;</view>
        </wux-col>
      </wux-row>
    </view>
    <wux-white-space size="small"/>
    <view class="row">
      <wux-tabs class="tabAll" defaultCurrent="tab1" theme="positive">
        <wux-tab key="tab1" title="最新"></wux-tab>
        <wux-tab key="tab2" title="最热"></wux-tab>
        <wux-tab key="tab3" title="同省"></wux-tab>
        <wux-tab key="tab4" title="我的"></wux-tab>
      </wux-tabs>
    </view>
    <scroll-view scroll-y="true" style="height: 100%">
      <view v-for="friend of newList.data" :key="friend.id">
        <cardItem :item="friend" :commentClick="onCommentClick"/>
        <wux-white-space size="small"/>
      </view>
      <loadMore :reflash="reflash"/>
    </scroll-view>
    <wux-gallery id="wux-gallery"/>
    <cover-image
      v-if="showAdd"
      class="add"
      src="https://static.huanjiaohu.com/mini/index/ydhg_btn.png"
      @click="add"
    ></cover-image>
    <wux-popup position="bottom" :visible="isPopup">
      <wux-cell-group class="pop_setaqua" title="第一次使用需要开缸">
        <wux-cell title="鱼缸名字">
          <wux-input slot="footer" placeholder="设置一个很吊的名字吧" @change="titleChange"/>
        </wux-cell>
        <wux-cell title="鱼缸类型">
          <wux-segmented-control
            slot="footer"
            default-current="-1"
            @change="typeChange"
            theme="positive"
            :values="value1"
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
        <wux-cell hover-class="none">
          <wux-button block type="positive" @tap="open">开缸</wux-button>
        </wux-cell>
      </wux-cell-group>
    </wux-popup>
  </view>
</template>

<script>
import cardItem from '@/components/cardItem';
import loadMore from '@/components/loadMore';
import wx from 'wx';
import { setTimeout } from 'timers';
import api from '@/utils/circleApi';
import util from '@/utils/util';

export default {
  components: {
    cardItem,
    loadMore
  },
  data () {
    return {
      title3: '',
      reflash: false,
      user: {},
      isPopup: false,
      showAdd: true,
      value1: ['SPS缸', 'LPS缸', 'FOT缸'],
      value2: ['底滤', '背滤'],
      value3: ['柏林系统', 'ZEO', 'ATS'],
      value4: ['<30cm', '<45cm', '<80cm', '>80cm'],
      newList: [],
      setting: {
        type: -1,
        size: -1,
        filter: -1,
        bowlSystem: -1
      }
    };
  },
  onShareAppMessage (options) {
    const share = {
      title: '礁岩鱼圈',
      path: '/pages/circle/index',
      imageUrl: 'https://static.huanjiaohu.com/image/share/default/jpg',
      success: (res) => {
        console.log('转发成功', res);
      },
      fail: (res) => {
        console.log('转发失败', res);
      }
    }

    if (options.from === 'button') {
      const eData = options.target.dataset;
      share.path = '/pages/circle/circle?id=' + eData.id;
      share.title = eData.title;
    }

    return share;
  },
  async onShow () {
    const newList = await api.listCircle();
    for (const item of newList.data) {
      item['praise'] = this.praise;
    }
    this.newList = newList;
  },
  async onLoad () {
    const user = wx.getStorageSync('userInfo');
    if (user) {
      user.title = '我的云端海缸';
      user.navigator_url = '/pages/circle/index';
      this.user = user;
    } else {
      this.user = {
        navigator_url: '/pages/ucenter/login',
        headimgurl: 'https://api.huanjiaohu.com/user/getAvatar?userId=0',
        tag: ['未登录'],
        time: '2019-01-01',
        title: '请点击登录',
        name: '礁岩海水',
        city_name: '上海',
        isLogin: false
      };
    }
  },
  methods: {
    onCommentClick (flag = false) {
      this.showAdd = flag;
    },
    async praise (id) {
      const list = await api.praise({'circleId': id});
      return list;
    },
    async add (e) {
      const setting = await api.getCircleSetting();
      if (setting.id) {
        const id = await api.createCircle({ type: 1 });
        wx.setStorageSync('add-circle-id', id);
        wx.navigateTo({
          url: '/pages/circle/circlePost?id=' + id
        });
      } else {
        this.isPopup = true;
      }
    },
    async gotoMyCircle () {
      const setting = await api.getCircleSetting();
      if (setting.id) {
        const list = await api.listByUserId({ type: 0 });
        let id = null;
        if (list.data.length === 0) {
          id = await api.createCircle({ type: 0 });
        } else {
          id = list.data[0].id;
        }
        wx.setStorageSync('my-circle-id', id);
        console.log(id);
        wx.navigateTo({
          url: '/pages/circle/circle?id=' + id
        });
      } else {
        this.isPopup = true;
      }
    },
    async open () {
      if (!this.setting.title) {
        util.showErrorToast('请填写鱼缸名字');
      } else if (this.setting.type < 0) {
        util.showErrorToast('请选择鱼缸类型');
      } else if (this.setting.size < 0) {
        util.showErrorToast('请选择鱼缸尺寸');
      } else if (this.setting.filter < 0) {
        util.showErrorToast('请选择过滤方式');
      } else if (this.setting.bowlSystem < 0) {
        util.showErrorToast('请选择过滤系统');
      } else {
        const setting = await api.openCircleSetting(this.setting);
        if (setting) {
          wx.showToast({
            title: '开缸成功',
            duration: 2000
          });
        } else {
          util.showErrorToast('开缸失败');
        }
      }
    },
    titleChange (e) {
      this.setting.title = e.mp.detail.value;
    },
    typeChange (e) {
      this.setting.type = e.mp.detail.key + '';
    },
    sizeChange (e) {
      this.setting.size = e.mp.detail.key + '';
    },
    systemChange (e) {
      this.setting.bowlSystem = e.mp.detail.key + '';
    },
    filterChange (e) {
      this.setting.filter = e.mp.detail.key + '';
    }
  },
  onReachBottom () {
    this.reflash = true;
    setTimeout(() => {
      this.friends.push({
        id: 1,
        headimgurl: 'https://api.huanjiaohu.com/user/getAvatar?userId=5481',
        link: '../goods/goods?id=1135002',
        tag: ['最热'],
        time: '2019-01-20',
        title: '我的鱼缸',
        name: 'Tony',
        city_name: '上海',
        price: '2130',
        descption: '我的鱼缸很牛逼啥都有，带鱼还有好几条',
        urls: [
          'https://api.huanjiaohu.com/material/getImageSmall?materialId=206',
          'https://api.huanjiaohu.com/material/getImageSmall?materialId=207',
          'https://api.huanjiaohu.com/material/getImageSmall?materialId=208'
        ],
        bottom: {
          comment: '12',
          thumbs: '22'
        }
      });
      this.friends.push({
        id: 1,
        headimgurl: 'https://api.huanjiaohu.com/user/getAvatar?userId=5481',
        link: '../goods/goods?id=1135002',
        tag: ['最热'],
        time: '2019-01-20',
        title: '我的鱼缸',
        name: 'Tony',
        city_name: '上海',
        price: '2130',
        descption: '我的鱼缸很牛逼啥都有，带鱼还有好几条',
        urls: [
          'https://api.huanjiaohu.com/material/getImageSmall?materialId=206',
          'https://api.huanjiaohu.com/material/getImageSmall?materialId=207',
          'https://api.huanjiaohu.com/material/getImageSmall?materialId=208'
        ],
        bottom: {
          comment: '12',
          thumbs: '22'
        }
      });
      this.reflash = false;
    }, 2000);
  }
};
</script>

<style scoped>
.add {
  width: 55px;
  height: 55px;
  position: fixed;
  bottom: 1%;
  right: 5%;
}
.setting {
  display: block;
  line-height: 180rpx;
  background: url(https://static.huanjiaohu.com/icon/right_arrow.png) right
    center no-repeat;
  background-size: 42rpx;
  background-color: #ffffff;
}

</style>
