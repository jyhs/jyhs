<template >
  <view class="container">
    <view class="profile-info">
    </view>
    <wux-white-space size="small"/>
    <scroll-view scroll-y="true" :style="winStyle">
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
      newPage: 1,
      setting: {
        type: -1,
        size: -1,
        filter: -1,
        bowlSystem: -1
      },
      winStyle: 'width:100%;height:100%'

    };
  },
  onShareAppMessage (options) {
    const share = {
      title: '礁岩鱼圈',
      path: '/pages/circle/index',
      imageUrl: 'https://static.huanjiaohu.com/image/share/default.jpg',
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
    const newList = await api.listCircle({page: this.newPage});
    for (const item of newList.data) {
      item['praise'] = this.praise;
      item['comment'] = this.comment;
    }
    this.newList = newList;
    this.newPage = 1;
    this.winStyle = 'width:100%;height:' + this.newList.data.length * 120 + 'px;';
  },
  async onLoad () {
    const user = wx.getStorageSync('userInfo');
    if (user) {
      const setting = await api.getCircleSetting();
      user.title = setting ? setting.title : '我的云端海缸';
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
    async comment (id, comment) {
      const list = await api.commentPost({'valueId': id, 'typeId': 2, 'content': comment});
      return list;
    },
    async add (e) {
      wx.showLoading({
        title: '加载中'
      });
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
      wx.hideLoading();
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
  async onReachBottom () {
    this.reflash = true;
    this.newPage = this.newPage + 1;
    const newList = await api.listCircle({page: this.newPage});
    for (const item of newList.data) {
      item['praise'] = this.praise;
      item['comment'] = this.comment;
    }
    newList.data = this.newList.data.concat(
      newList.data
    );
    this.newList = newList;
    this.winStyle = 'width:100%;height:' + this.newList.data.length * 120 + 'px;';
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

.profile-info {
  width: 100%;
  height: 370rpx;
  display: flex;
  background: url(https://static.huanjiaohu.com/image/login_banner.jpg);
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

</style>
