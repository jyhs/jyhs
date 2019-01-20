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
  padding:10px 15px;
}
</style>
