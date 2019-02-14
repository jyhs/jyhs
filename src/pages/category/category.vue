<template >
  <view class="container">
    <view class="cate-nav">
      <scroll-view
        scroll-x="true"
        class="cate-nav-body"
        style="width: 750rpx;"
        :scroll-left="scrollLeft"
      >
        <view
          v-for="item of navList"
          :class="id === item.id ? 'active item' : 'item'"
          :key="item.id"
          @click="switchCate"
          :data-id="item.id"
          :data-index="index"
        >
          <view class="name">{{item.name}}</view>
        </view>
      </scroll-view>
    </view>
    <scroll-view scroll-y="true" scroll-top="scrollTop" style="height: 100%;margin-top:64rpx;">
      <view
        v-for="item of goodsList"
        :key="item.id"
        :class="(index + 1) % 2 === 0 ? 'item-b item' : 'item'"
        @click="$router.push({ path: '/pages/material/index', query: { id: item.id } })"
      >
        <smallCard :item="item"/>
        <wux-white-space size="small"/>
      </view>
      <loadMore :reflash="reflash"/>
    </scroll-view>
  </view>
</template>

<script>
import mallApi from '@/utils/mallApi';
import api from '@/utils/api';
import loadMore from '@/components/loadMore';
import smallCard from '@/components/smallCard';
export default {
  components: {
    loadMore,
    smallCard
  },
  data () {
    return {
      navList: [],
      goodsList: [],
      id: 0,
      currentCategory: {},
      paerntCategory: {},
      scrollLeft: 0,
      scrollTop: 0,
      scrollHeight: 0,
      page: 1,
      reflash: false,
      size: 20 // 默认10000尽量大，查到所有符合的数据
    };
  },
  async onReachBottom () {
    this.reflash = true;
    const parentCode = this.parentCategory.code;
    const curentType = this.currentCategory.code;
    this.page += 1;
    const res = await api.getMaterialList({
      category: parentCode,
      type: curentType,
      page: this.page,
      size: this.size
    });
    this.goodsList = this.goodsList.concat(res.data);
    this.reflash = false;
  },
  async onLoad () {
    if (this.$route.query.id) {
      this.id = parseInt(this.$route.query.id);
    }
    await this.getCategoryInfo();
  },

  methods: {
    // 获取类别信息
    async getCategoryInfo () {
      const resData = await mallApi.getGoodsCategory({ id: this.id });
      if (resData.errno === 0) {
        this.navList = resData.data.brotherCategory;
        let currentIndex = 0;
        let navListCount = this.navList.length;
        for (let i = 0; i < navListCount; i++) {
          currentIndex += 1;
          if (this.navList[i].id === this.id) {
            break;
          }
        }
        if (currentIndex > navListCount / 2 && navListCount > 5) {
          this.scrollLeft = currentIndex * 60;
        }
        this.page = 1;
        this.currentCategory = resData.data.currentCategory;
        this.parentCategory = resData.data.parentCategory;
        const parentCode = this.parentCategory.code;
        const curentType = this.currentCategory.code;
        const res = await api.getMaterialList({
          category: parentCode,
          type: curentType,
          page: this.page,
          size: this.size
        });
        this.goodsList = res.data;
      }
    },

    // 切换商品类别
    switchCate (event) {
      // console.log('触发了点击事件，event为：', event);
      if (this.id === event.currentTarget.dataset.id) {
        return false;
      }
      var clientX = event.clientX;
      var currentTarget = event.currentTarget;
      if (clientX < 60) {
        this.scrollLeft = currentTarget.offsetLeft - 60;
      } else if (clientX > 330) {
        this.scrollLeft = currentTarget.offsetLeft;
      }
      this.id = event.currentTarget.dataset.id;
      // 重新请求数据
      this.getCategoryInfo();
    }
  },
  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      title: 'xbyjShop',
      desc: '仿网易严选小程序商城',
      path: '/pages/category/category'
    };
  }
};
</script>

<style scoped>
.container {
  background: #f9f9f9;
}
.cate-nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.cate-nav-body {
  height: 84rpx;
  white-space: nowrap;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.cate-nav .item {
  display: inline-block;
  height: 84rpx;
  min-width: 130rpx;
  padding: 0 15rpx;
  text-align: center;
}

.cate-nav .item .name {
  display: block;
  height: 68rpx;
  padding: 0 20rpx;
  line-height: 80rpx;
  color: #333;
  font-size: 28rpx;
  width: auto;
}

.cate-nav .item.active .name {
  color: #387ef5;
  border-bottom: 2px solid #387ef5;
}

.cate-item {
  margin-top: 94rpx;
  height: auto;
  overflow: hidden;
}

.cate-item .h {
  height: 145rpx;
  width: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cate-item .h .name {
  display: block;
  height: 35rpx;
  margin-bottom: 18rpx;
  font-size: 30rpx;
  color: #333;
}

.cate-item .h .desc {
  display: block;
  height: 24rpx;
  font-size: 24rpx;
  color: #999;
}

.cate-item .b {
  width: 750rpx;
  padding: 0 6.25rpx;
  height: auto;
  overflow: hidden;
}

.cate-item .b .item {
  float: left;
  background: #fff;
  width: 365rpx;
  margin-bottom: 6.25rpx;
  padding-bottom: 33.333rpx;
  height: auto;
  overflow: hidden;
  text-align: center;
}

.cate-item .b .item-b {
  margin-left: 6.25rpx;
}

.cate-item .item .img {
  width: 302rpx;
  height: 302rpx;
}

.cate-item .item .name {
  display: block;
  width: 320rpx;
  height: 35rpx;
  margin: 11.5rpx 0 22rpx 0;
  text-align: center;
  overflow: hidden;
  padding: 0 20rpx;
  font-size: 30rpx;
  color: #333;
}

.cate-item .item .price {
  display: block;
  width: 365.625rpx;
  height: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #b4282d;
}
</style>
