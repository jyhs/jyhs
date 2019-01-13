<template>
  <div class="container">
    <h1 class="title_head">礁岩海水到位服务帮助</h1>
    <p class="text_info">
      <span><strong>服务是海水商业的灵魂！</strong></span>
      <span>礁岩海水到位服务能够让鱼友快速找到自己附近的工作室服务以及商家：</span>
      <span>无论是在<i>加热棒坏掉</i>的冬天，还是在<i>水管漏水</i>的夜晚，还是在<i>上水泵突然挂掉</i>的时候，附近的商家和工作室一定最靠谱的<i class="red">解决方案</i>。</span>
      <span>附近的器材和设备销售商也可以让你以最快的速度，甚至是同城当天收到货，无需等待明天或后天从异地寄来的包裹！一睹为快！</span>
      <span>如鱼友需要稳定的鱼缸维护服务或测量水质，也可以问附近的商家或工作室是否愿意承接，附近的永远是响应最快的！</span>
      <span>附近的商家或工作室可以帮你过温过水，也可以想办法让你半夜10点下班后还安全的拿到你今天团的鱼！虽然提供的服务不尽相同，但礁岩海水到位服务帮助本地零售商以及工作室快速分享自己的位置，以及能够提供的各种服务，让附近的客户迅速找到自己！</span>
      <span>鱼友可点左下角礁岩海水获取其他服务信息。</span>
      <span>商家请点击右下角在线帮助免费加入。</span>

    </p>
    <button open-type="contact" class="button_contact">在线帮助</button>
    <button class="button_goback" @click="gotoJyhs">电话帮助</button>
    </span>
  </div>
</template>

<script>
import wx from 'wx';

export default {
  data () {
    return {

    }
  },
  onShareAppMessage (options) {
    return {
      title: '礁岩海水帮助',
      imageUrl: '/static/daowei.jpg',
      path: '/pages/help/main'
    }
  },
  methods: {
    gotoMap () {
      wx.navigateBack()
    },
    gotoJyhs () {
      wx.makePhoneCall({
        phoneNumber: '15821495852'
      })
    }
  }

}
</script>

<style scoped>
.kefu{
  width: 55px;
  height: 55px;
  position: absolute;
  top: 5%;
  right: 5%;
}
.title_head{
  top: 8%;
  font-size:  20px;
  padding-top:15px;
  padding-bottom:15px;
}
.text_info{
  width:88% ;
  font-family: HelveticaNeue,Helvetica,Arial,sans-serif;
  font-size: 16px;
  color: #9b9b9b;
  text-align: left;
  line-height:1.3em;
}
.text_info > span
{
  display:block;
  padding-bottom:10px;
}
.text_info i
{
  display:inline;
}
.text_info i.red
{
  display:inline;
}
.button_index{
  width:120px ;
  top: 46%;
  left: 8%;
  position:absolute;
  border-radius: 8px;
  background-color: #0082d5;
  color: white;
  font-size: 14px;
}
.button_contact{
  background-color: #2db311;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 0;
  color: white;
  width: 50%;
  background-image: url('https://static.huanjiaohu.com/icon/dw_wechat.png');
  background-repeat: no-repeat;
  background-position-x:44px;
  background-position-y:12px;
  padding-left:50px;
}
.button_goback{
  background-color: #2D9AE7;
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 0;
  color: white;
  width: 50%;
  background-image: url('https://static.huanjiaohu.com/icon/dw_wechat.png');
  background-repeat: no-repeat;
  background-position-x:44px;
  background-position-y:12px;
  padding-left:50px;
}
</style>
