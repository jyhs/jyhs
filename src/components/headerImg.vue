<template >
  <view class="brand-info">
    <view class="name">
      <img class="img" :src="bannerInfo.img_url" background-size="cover"/>
      <view class="info-box">
        <view class="info">
          <text class="txt">{{bannerInfo.name}}</text>
          <text class="line"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    bannerInfo: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
  }

}
</script>

<style scoped>

.brand-info .name{
    width: 100%;
    height: 278rpx;
    position: relative;
}

.brand-info .img{
    /* position: absolute;
    top:0;
    left:0; */
    width: 750rpx;
    height: 278rpx;
}

.brand-info .info-box{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 278rpx;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.brand-info .info{
    display: block;
}

.brand-info .txt{
    display: block;
    height: 40rpx;
    font-size: 37.5rpx;
    color: #fff;
}

.brand-info .line{
    margin: 0 auto;
    margin-top: 16rpx;
    display: block;
    height: 2rpx;
    width: 145rpx;
    background: #fff;
}

</style>
