<template >
  <view class="container background">
    <scroll-view scroll-y="true" :style="winStyle">
      <view class="profile-info" @click="showDialog">
          <wux-image
                width="100%"
                :src="cover_url"
                loading="图片加载中..."
                mode="aspectFill"
           />
      </view>
      <view class="userinfo wux-margin-right--10" @click="gotoMyCircle">
            <wux-image
                    width="50px"
                    height="50px"
                    :src="user.headimgurl"
              />
      </view>
      <view class="wux-clearfix circle-info"></view>
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
    <wux-popup position="bottom" :visible="showOpenPopup" :maskClosable="false">
      <wux-cell-group class="pop_setaqua" title="第一次使用需要开缸">
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
    <wux-popup  :visible="showUpload" title="更换封面" content="给你的鱼圈选一个漂亮的封面吧" @close="onClose">
          <wux-upload
                      url="https://api2.huanjiaohu.com/circle/setting/upload"
                      :header="header"
                      @success="onSuccess"
                      @fail="onFail"
                      count="1"
                      max="1"
                    >
                  <wux-button block type="positive">拍照/上传</wux-button>
          </wux-upload>
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
      showOpenPopup: false,
      showAdd: true,
      showUpload: false,
      value1: ['SPS缸', 'LPS缸', 'FOT缸'],
      value2: ['底滤', '背滤'],
      value3: ['柏林系统', 'ZEO', 'ATS'],
      value4: ['<30cm', '<45cm', '<80cm', '>80cm'],
      newList: [],
      newPage: 1,
      setting: {
        bowlType: -1,
        bowlSize: -1,
        bowlFilter: -1,
        bowlSystem: -1
      },
      header: {},
      cover_url: null,
      winStyle: 'width:100%;height:100%'
    };
  },
  onShareAppMessage (options) {
    const share = {
      title: '礁岩鱼圈',
      path: '/pages/circle/index',
      imageUrl: 'https://static.huanjiaohu.com/image/share/default.jpg',
      success: res => {
        console.log('转发成功', res);
      },
      fail: res => {
        console.log('转发失败', res);
      }
    };

    if (options.from === 'button') {
      const eData = options.target.dataset;
      share.path = '/pages/circle/circle?id=' + eData.id;
    }

    return share;
  },
  async onShow () {
    this.loadingCircle();
  },
  async onLoad () {
    const user = wx.getStorageSync('userInfo');
    const setting = await api.getCircleSetting();
    this.header = {'Authorization': wx.getStorageSync('token')};
    if (user) {
      if (setting && setting.id) {
        if (setting.cover_url) {
          this.cover_url = setting.cover_url;
        } else {
          this.cover_url = 'https://static.huanjiaohu.com/image/login_banner.jpg';
        }
      } else {
        this.cover_url = 'https://static.huanjiaohu.com/image/login_banner.jpg';
        this.showOpenPopup = true;
        this.showAdd = false;
      }
      this.user = user;
    } else {
      wx.reLaunch({
        url: '/pages/ucenter/login'
      });
    }
  },
  methods: {
    async loadingCircle () {
      const newList = await api.listCircle({ page: 1 });
      if (newList.data.length > 0) {
        for (const item of newList.data) {
          item['praise'] = this.praise;
          item['commentPost'] = this.commentPost;
          item['commentBtnClick'] = this.onCommentBtnClick;
          item['deleteComment'] = this.deleteComment;
          item['delete'] = this.delete;
        }
        this.newList = newList;
        this.newPage = 1;
        this.winStyle = 'width:100%;height:' + this.newList.data.length * 200 + 'px;';
      }
    },
    onClose () {
      this.showUpload = false;
      this.showAdd = true;
    },
    async onSuccess (e) {
      this.cover_url = JSON.parse(e.mp.detail.file.res.data).cover_url;
      this.showUpload = false;
    },
    onFail (e) {
      wx.showToast({
        title: '失败',
        duration: 2000,
        complete: () => {

        }
      })
    },
    showDialog () {
      this.showUpload = true;
      this.showAdd = false;
    },
    onCommentBtnClick (flag = false) {
      this.showAdd = flag;
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
    async deleteComment (e) {
      const commentId = e.mp.target.dataset.comment.id;
      const typeId = e.mp.target.dataset.comment.type_id;
      const valueId = e.mp.target.dataset.comment.value_id;
      const list = await api.commentDelete({ commentId, typeId, valueId });
      return list;
    },
    async commentPost (id, content, comment) {
      const list = await api.commentPost({
        valueId: id,
        typeId: 2,
        content: content,
        parentComment: comment
      });
      return list;
    },
    async add (e) {
      wx.showLoading({
        title: '加载中'
      });
      const id = await api.createCircle({ type: 1 });
      wx.setStorageSync('add-circle-id', id);
      wx.navigateTo({
        url: '/pages/circle/circlePost?id=' + id
      });
      wx.hideLoading();
    },
    async gotoMyCircle () {
      const circle = await api.getByUserId({ type: 0 });
      let id = null;
      if (circle && circle.id) {
        id = circle.id;
      } else {
        id = await api.createCircle({ type: 0 });
      }
      wx.navigateTo({
        url: '/pages/circle/personal?id=' + id
      });
    },
    async open () {
      if (this.setting.bowlType < 0) {
        util.showErrorToast('请选择鱼缸类型');
      } else if (this.setting.bowlSize < 0) {
        util.showErrorToast('请选择鱼缸尺寸');
      } else if (this.setting.bowlFilter < 0) {
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
          this.showOpenPopup = false;
          this.showAdd = true;
          this.loadingCircle();
        } else {
          util.showErrorToast('开缸失败');
        }
      }
    },
    typeChange (e) {
      this.setting.bowlType = e.mp.detail.key + '';
    },
    sizeChange (e) {
      this.setting.bowlSize = e.mp.detail.key + '';
    },
    systemChange (e) {
      this.setting.bowlSystem = e.mp.detail.key + '';
    },
    filterChange (e) {
      this.setting.bowlFilter = e.mp.detail.key + '';
    }
  },
  async onReachBottom () {
    this.reflash = true;
    this.newPage = this.newPage + 1;
    const newList = await api.listCircle({ page: this.newPage });
    for (const item of newList.data) {
      item['praise'] = this.praise;
      item['comment'] = this.comment;
    }
    newList.data = this.newList.data.concat(newList.data);
    this.newList = newList;
    this.winStyle =
      'width:100%;height:' + this.newList.data.length * 200 + 'px;';
  }
};
</script>

<style scoped>
.background {
  background-color: #ffffff
}
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
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: absolute
}

.userinfo{
  position: absolute;
  right: 0;
  top:360rpx;
  z-index: 101;
}

.circle-info{
  height:440rpx;
  background-color: #ffffff;
}
</style>
