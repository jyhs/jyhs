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
  font-size:12px;
  color:#666;
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
  padding: 0 4px;
  height: 14px;
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
.tagvolcano_small{
  font-size: 10px;
  border:solid 1px #ffaf6f;
  color:#e2875a;
  background-color: #fff3eb;
  border-radius:4px;
  padding:0px 4px;
  display: inline;
}
.taggreen_small{
  font-size: 10px;
  border:solid 1px #b7eb8f;
  color:#52c41a;
  background-color: #f6ffed;
  border-radius:4px;
  padding:0px 4px;
  display: inline;
}
.tagblue_small{
  font-size: 10px;
  border:solid 1px #91d5ff;
  color:#2a99ff;
  background-color: #e6f7ff;
  border-radius:4px;
  padding:0px 4px;
  display: inline;
  margin-right:6px;
}
.wux-whitespace--small{
  height:1px!important;
}
.retail-item ._wux-rater .wux-rater
{
  vertical-align:baseline!important;
}
.pop_setaqua .wux-cell {padding:4px 10px;font-size: 14px;line-height:48px;}
.pop_setaqua .wux-segment{margin:0;min-height:32px;}
.pop_setaqua .wux-cell__text{width:100%;}
.pop_setaqua .wux-segment__item {font-size:12px;padding:6px;white-space: nowrap;}
.pop_setaqua .wux-cell-group__hd{color:#000;font-size: 18px;}
</style>
