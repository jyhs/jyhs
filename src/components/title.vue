<template >
<view class='row'>
    <view class="title">
      {{text}}
    </view>
</view>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    }
  }
};
</script>

<style>
.title {
  display: block;
  width:100%;
  margin:10px;
  font-size:14px;
  color:#000;
  padding-left:10px;
  border-left:solid 4px #2D9AE7;
}
</style>
