<template >
  <web-view :src="src"></web-view>
</template>

<script>
import wx from 'wx';

export default {
  async onLoad () {
    this.src = wx.getStorageSync(this.$route.query.media_id);
  },
  data () {
    return {
      src: ''
    };
  }
};
</script>

<style>
</style>
