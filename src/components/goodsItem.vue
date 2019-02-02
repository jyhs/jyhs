<template>
      <view class="row cate-item">
            <view class="b">
                <view v-for="item of goodsList" :key="item.id" :class="(index + 1) % 2 === 0 ? 'item-b item' : 'item'"
                   @click="$router.push({ path: '/pages/material/index', query: { id: item.id } })" >
                    <img class="img" :src="item.headimgurl" background-size="cover" />
                    <text class="name">{{item.title}}</text>
                    <text class="price">￥{{item.price}}</text>
                </view>
            </view>
        </view>
</template>

<script>
export default {
  props: {
    goodsList: {
      type: Array
    }
  }
};
</script>

<style scoped>

.cate-item .b{
  width: 750rpx;
  padding: 0 6.25rpx;
  height: auto;
  overflow: hidden;
}

.cate-item .b .item{
  float: left;
  background: #fff;
  width: 365rpx;
  margin-bottom: 6.25rpx;
  padding-bottom: 33.333rpx;
  height: auto;
  overflow: hidden;
  text-align: center;
}

.cate-item .b .item-b{
  margin-left: 6.25rpx;
}

.cate-item .item .img{
  padding-top: 15px;
  width: 302rpx;
  height: 302rpx;
  border-radius: 5px; 
}

.cate-item .item .name{
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

.cate-item .item .price{
  display: block;
  width: 365.625rpx;
  height: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #b4282d;
}

</style>
