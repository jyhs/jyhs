<template >
  <view class="container">
    <view class="row">
      <wux-tabs class="tabAll" defaultCurrent="tab1" theme="positive">
        <wux-tab key="tab1" title="最新"></wux-tab>
        <wux-tab key="tab2" title="最热"></wux-tab>
        <wux-tab key="tab3" title="按城市"></wux-tab>
        <wux-tab key="tab4" title="按类型"></wux-tab>
      </wux-tabs>
    </view>
       <view class="row">
                  <wux-gallery id="wux-gallery"/>
      <friendItem v-for="user in userList" :key="user.id" :user='user'/>
    </view>
  </view>
</template>

<script>
import friendItem from '@/components/friendItem';

export default {
  components: {
    friendItem
  },
  data () {
    return {
      title3: '',
      value3: '',
      userList: [
        {
          id: 0,
          urls: [
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=206',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=207',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=208'
          ]
        },
        {
          id: 1,
          urls: [
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=209',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=210',
            'https://api.huanjiaohu.com/material/getImageSmall?materialId=211'
          ]
        }
      ]
    }
  },
  async mounted () {},

  methods: {}
};
</script>

<style>
</style>
