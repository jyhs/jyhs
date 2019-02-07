<template >
  <div>
    <view class="container" v-if="content">
       <view class="descrition">
        <wxParse   :content="content"></wxParse>
        </view>
    </view>
    <web-view :src="src" v-else></web-view>
  </div>
</template>

<script>
import wx from 'wx';
import wxParse from 'mpvue-wxparse'

export default {
  components: {
    wxParse
  },
  async onLoad () {
    this.src = null;
    const item = wx.getStorageSync(this.$route.query.id);
    if (item.url) {
      this.src = item.url;
      this.content = null;
    } else {
      this.content = item.content;
    }
  },
  data () {
    return {
      src: '',
      content: null
    };
  }
};
</script>

<style>
</style>
