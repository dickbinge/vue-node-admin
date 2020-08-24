<!--
 * @Description:
 * @Version: 2.0
 * @Autor: jingbin
 * @Date: 2020-07-03 18:23:14
 * @LastEditors: jingbin
 * @LastEditTime: 2020-08-22 16:59:11
-->
<template>
  <div class="video-player-content">
    <video-player
      height=83%
      width=90%
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
      @play="handlerPlay"
      @pause="handlerPause"
      @ended="handlerEnded"/>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';

export default {
  name: 'vuePlayer',
  props: {
    autoplay: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'video/mp4',
    },
    src: {
      type: String,
      default: '',
    },
    poster: String,
  },
  data() {
    return {
    };
  },
  computed: {
    playerOptions() {
      return {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: this.autoplay, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下会消除任何音频
        loop: this.loop, // 是否视频一结束就重新开始
        preload: 'auto', // // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: this.type, // 类型
          src: this.src, // url地址
        }],
        poster: this.poster,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: true, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      };
    },
  },
  methods: {
    handlerPlay() {
      this.$emit('play');
    },
    handlerPause() {
      this.$emit('pause');
    },
    handlerEnded() {
      this.$emit('ended');
    },
  },
};
</script>
<style lang="scss" scoped>
.video-player-content {
  width: 100%;
  height: 100%;
}
</style>
