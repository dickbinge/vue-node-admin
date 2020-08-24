<template>
  <div class="video-baberrage">
    <p class="info-content">
      video 视频弹幕显示
    </p>
    <div class="video-content">
      <video-player ref="video" :src="videoSrc" @play="handlerPlay" @pause="handlerPause" @ended="handlerEnded"></video-player>
      <baberrage
        :isShow="isShowbarrage"
        :barrageList="barrageList"/>
    </div>
  </div>
</template>
<script>
import videoSrc from '@/assets/video/oceans.mp4';
import videoPlayer from '@/components/videoPlayer';
import baberrage from '@/components/baberrage';
import { MESSAGE_TYPE } from 'vue-baberrage';

const colorBaberrage = '大头死变态~~~';
export default {
  name: 'videoBaberrage',
  components: {
    videoPlayer,
    baberrage,
  },
  data() {
    return {
      videoSrc,
      isShowbarrage: false,
      barrageList: [
        {
          id: 1,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: colorBaberrage,
          time: 3,
          barrageStyle: 'red',
        },
        {
          id: 2,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: colorBaberrage,
          time: 8,
          barrageStyle: 'green',
        },
        {
          id: 3,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: colorBaberrage,
          time: 10,
          barrageStyle: 'normal',
        },
        {
          id: 4,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: colorBaberrage,
          time: 5,
          barrageStyle: 'blue',
        },
        {
          id: 5,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: colorBaberrage,
          time: 6,
          barrageStyle: 'red',
        },
        {
          id: 6,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: colorBaberrage,
          time: 12,
          barrageStyle: 'normal',
        },
        {
          id: 7,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: colorBaberrage,
          time: 5,
          barrageStyle: 'red',
        },
        {
          id: 8,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: colorBaberrage,
          time: 5,
          barrageStyle: 'normal',
        },
        {
          id: 9,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: colorBaberrage,
          time: 8,
          barrageStyle: 'red',
        },
        {
          id: 10,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: colorBaberrage,
          time: 10,
          barrageStyle: 'yellow',
        },
      ],
    };
  },
  mounted() {
    this.barrageList.forEach((item) => {
      item.type = MESSAGE_TYPE.NORMAL;
    });
  },
  methods: {
    handlerPlay() {
      this.isShowbarrage = true;
    },
    handlerPause() {

    },
    handlerEnded() {
      this.isShowbarrage = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.video-baberrage {
  padding: 15px;
  .video-content {
    width: 800px;
    height: 450px;
    position: relative;
  }
}
</style>
