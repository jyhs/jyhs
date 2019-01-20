<template >
   <block>
                <wux-wing-blank>
                    <view class="item-style">
                        <wux-row>
                            <wux-col span="12">
                                <wux-image
                                    wux-class="image"
                                    :width="data.width"
                                    :height='data.height'
                                    :src="data.src"
                                    loading="Loading"
                                />
                            </wux-col>
                        </wux-row>
                              <wux-white-space/>

                        <wux-row>
                            <wux-wing-blank>
                                <wux-col span="12" class="title">{{data.title}}</wux-col>
                            </wux-wing-blank>
                        </wux-row>
                              <wux-white-space/>

                        <wux-row>
                            <wux-wing-blank>
                                <wux-col span="12" class="description">{{data.description}}</wux-col>
                            </wux-wing-blank>
                        </wux-row>
                                                      <wux-white-space/>

                    </view>
                </wux-wing-blank>
                      <wux-white-space/>
            </block>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          width: '375px',
          height: '180px',
          src: 'https://static.huanjiaohu.com/image/material/hy/1524499703-HYMH.png'
        };
      }
    }
  }
};
</script>

<style scoped>
.item-style {
  background-color: white;
  border-radius: 5px;
}
.item-style .title {
  font-size: 14px;
}
.item-style .description {
  font-size: 12px;
  color: #888;
}
</style>
