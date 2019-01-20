<script>
import '../static/wux/styles/index.wxss';

export default {
  mpType: 'app'
}
</script>

<style>
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  background: #f4f4f4;
  font-size: 28rpx;
}
.row{
  width: 100%;
}

.jytt_module {
  font-size: 12px;
  background-image: url("https://static.huanjiaohu.com/mini/index/jytt_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  white-space: nowrap;
  height: 60px;
  line-height: 22px;
}

.jytt_text{
  padding-top: 8px;
}

.jytt_module .wux-tag--red,
.jytt_module .wux-tag--blue {
  font-size: 10px;
  padding: 0 6px;
  height: 15px;
}
._wux-notice-bar .wux-notice-bar{
  background-color: white;
}
.wux-card__thumb{
  margin-top:-4px;
  height:24px!important;
  width:24px!important;
}
.wux-grid__thumb{
  opacity: .8;
  height:24px!important;
  width:24px!important;
  }
.wux-grid__label{font-size: 12px!important}
.wux-card__content {
  font-size: 16px;
  font-weight: bold;
  padding-top:6px;
}
</style>
