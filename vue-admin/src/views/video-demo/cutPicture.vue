<!--
 * @Description:
 * @Version: 2.0
 * @Autor: jingbin
 * @Date: 2020-08-12 20:15:18
 * @LastEditors: jingbin
 * @LastEditTime: 2020-08-22 18:09:24
-->
<template>
  <div class="cut-picture">
    <p class="info-content">
      video 视频截图
    </p>
    <div class="source-content">
      <div class="cut-video-content">
        <video-player ref="video" :src="videoSrc" @play="handlerPlay" @pause="handlerPause" @ended="handlerEnded"></video-player>
        <div class="button-content">
          <el-button type="primary" size="small" @click="handlerCutPicture">截取当前画面</el-button>
          <el-button size="small" @click="handlerVideo">视频录影</el-button>
        </div>
      </div>
      <div class="image-list">
        <el-scrollbar style="height:100%;" class="el-menuscrollbar">
          <div v-for="(img, index) of imageList" :key="index" class="image-detail" :style="imgContentStyle">
            <i class="el-icon-close icon-delete" @click="deleteImage(index)"></i>
            <img :src="img.src" @click="openOuter(item)" class="source-img" :width="img.width" :height="img.height"/>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <el-dialog
      title="截图"
      v-dialogDrag
      :visible.sync="showCutDialog"
      :close-on-click-modal="false"
      v-if="showCutDialog"
      :width="dialogWidth"
      class="dialog-content"
      top="5%">
      <transition name="fade">
        <div class="icon-pen" v-if="showPenBtn">
          <img :src="penBtnSrc" class="icon-pen-image" @click="showPenList" />
          <transition name="fade">
            <div class="icon-pen-content" v-if="showPen">
              <div class="icon-pen-color" v-for="(item,index) in penList" :key="index" :style="{ backgroundColor: item.code }" :class="{ 'is-active': item.code === checkedPen }" @click="checkPen(item)">
              </div>
            </div>
          </transition>
        </div>
      </transition>
      <canvas
        ref="icanvas"
        :width="canvasWidth"
        :height="canvasHeight"
        @mousedown="handlerMouseDown($event)"
        @mousemove="handlerMouseMove($event)"/>
      <div class="cancel-content"
        v-show="showCancelContent">
        <div class="button" @click="handlerClear">
          <img :src="clearIconSrc" class="icon-clear" height="22px"/>
          <span>清除</span>
        </div>
        <div class="button" @click="handlerCancel">
          <img :src="cancelIconSrc" class="icon-clear" height="22px"/>
          <span>撤销</span>
        </div>
      </div>
      <div slot="footer">
          <el-button @click="cancelEdit" size="small">取 消</el-button>
          <el-button @click="confirmEdit" size="small" type="primary">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import videoSrc from '@/assets/video/oceans.mp4';
import videoPlayer from '@/components/videoPlayer';
import penBtnSrc from '@/assets/images/pen_btn.png';
import clearIconSrc from '@/assets/images/cancel_btn.png';
import cancelIconSrc from '@/assets/images/clear_btn.png';

// 定义初始坐标
export default {
  name: 'cutPicture',
  components: {
    videoPlayer,
  },
  data() {
    return {
      videoSrc,
      penBtnSrc,
      clearIconSrc,
      cancelIconSrc,
      showCutDialog: false,
      tempImageCanvasList: [], // 暂时存放之前编辑的画面
      showPenBtn: false,
      showPen: false,
      penList: [
        {
          code: 'yellow',
        },
        {
          code: 'white',
        },
        {
          code: 'red',
        },
      ],
      checkedPen: 'white',
      canvasWidth: 800,
      canvasHeight: 400,
      showCancelContent: false,
      dialogWidth: '1000px',
      playerRef: null,
      imageCanvas: new Image(), // 缓存当前初始截图
      isMouseDown: false, // 判断鼠标是否按下
      coordinate: {
        X: 0,
        Y: 0,
        X1: 0,
        Y1: 0,
      },
      flag: 0,
      imageList: [],
      imgContentStyle: {},
    };
  },
  created() {
    document.addEventListener('mouseup', this.handlerMouseUp);
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.handlerMouseUp);
  },
  mounted() {
    this.$nextTick(() => {
      this.playerRef = this.$refs.video.$refs.videoPlayer;
    });
  },
  methods: {
    getCanvasImage() {
      if (this.playerRef) {
        const videoEl = this.playerRef.$refs.video;
        const videoWidth = videoEl.videoWidth;
        const videoHeight = videoEl.videoHeight;
        this.canvasWidth = videoWidth;
        this.canvasHeight = videoHeight;
        const canvasEl = this.$refs.icanvas;
        const ctx = canvasEl.getContext('2d');
        ctx.drawImage(videoEl, 0, 0, videoWidth, videoHeight);
        const tempImage = canvasEl.toDataURL('image/jpeg');
        this.imageCanvas.src = tempImage;
        const imgObj = new Image();
        imgObj.src = tempImage;
        this.tempImageCanvasList.push(imgObj);
      }
    },
    handlerPlay() {
    },
    handlerPause() {
    },
    handlerEnded() {
    },
    handlerCutPicture() {
      this.showCutDialog = true;
      this.playerRef.player.pause(); // 截图的时候暂停视频播放
      this.$nextTick(() => {
        this.tempImageCanvasList = [];
        this.getCanvasImage();
        this.showCancelContent = false;
      });
    },
    showPenList() {
      this.showPen = !this.showPen;
      this.showCancelContent = false;
    },
    checkPen(pen) {
      this.checkedPen = pen.code;
      this.showCancelContent = false;
    },
    // 清除
    handlerClear() {
      this.showCancelContent = false;
      const canvasEl = this.$refs.icanvas;
      const ctx = canvasEl.getContext('2d');
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      ctx.drawImage(this.imageCanvas, 0, 0, this.canvasWidth, this.canvasHeight);
      this.tempImageCanvasList = [];
    },
    // 撤销
    handlerCancel() {
      this.showCancelContent = false;
      this.tempImageCanvasList.pop();
      const canvasEl = this.$refs.icanvas;
      const ctx = canvasEl.getContext('2d');
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasWidth);
      if (this.tempImageCanvasList.length === 0) {
        ctx.drawImage(this.imageCanvas, 0, 0, this.canvasWidth, this.canvasHeight);
      } else {
        ctx.drawImage(this.tempImageCanvasList[this.tempImageCanvasList.length - 1], 0, 0, this.canvasWidth, this.canvasHeight);
      }
    },
    deleteImage(index) {
      this.imageList.splice(index, 1);
    },
    confirmEdit() {
      const canvasEl = this.$refs.icanvas;
      const obj = {};
      obj.src = canvasEl.toDataURL('image/jpeg');
      obj.width = `${this.canvasWidth / 4}px`;
      obj.height = `${this.canvasHeight / 4}px`;
      this.imgContentStyle = {
        width: obj.width,
        height: obj.height,
      };
      this.imageList.push(obj);
      this.showCutDialog = false;
      this.playerRef.player.play();
    },
    cancelEdit() {
      this.showCutDialog = false;
      this.playerRef.player.play();
    },
    handlerMouseDown(e) {
      this.isMouseDown = true;
      // 记录鼠标点下的坐标
      this.coordinate.X = e.offsetX;
      this.coordinate.Y = e.offsetY;
      this.showPenBtn = false;
      this.showCancelContent = false;
    },
    handlerMouseMove(e) {
      if (this.isMouseDown) {
        this.coordinate.X1 = e.offsetX;
        this.coordinate.Y1 = e.offsetY;
        this.showPenBtn = false;
        this.drawLine();
        this.flag++;
      }
    },
    handlerMouseUp() {
      this.isMouseDown = false;
      this.showPenBtn = true;
      this.showCancelContent = true;
      const canvasEl = this.$refs.icanvas;
      if (this.flag !== 0 && canvasEl) {
        const imgObj = new Image();
        imgObj.src = canvasEl.toDataURL('image/jpeg');
        this.tempImageCanvasList.push(imgObj);
        this.flag = 0;
      }
    },
    drawLine() {
      const {
        X, Y, X1, Y1,
      } = this.coordinate;
      const canvasEl = this.$refs.icanvas;
      const ctx = canvasEl.getContext('2d');
      if (this.flag > 0) {
        ctx.beginPath();
      }
      ctx.moveTo(X, Y); // 起点
      ctx.lineWidth = 4; // 定义画笔宽度
      ctx.strokeStyle = this.checkedPen || 'white';
      ctx.lineTo(X1, Y1);
      ctx.stroke();
      this.coordinate.X = X1;
      this.coordinate.Y = Y1;
    },
    handlerVideo() {

    },
    handlerUpLoad() {

    },
  },
};
</script>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.cut-picture {
  padding: 15px;
  .source-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .cut-video-content {
    width: 800px;
    height: 450px;
    position: relative;
  }
  .image-list {
    width: calc(100% - 800px);
    height: 450px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .image-detail {
      width: 100%;
      position: relative;
      margin-bottom: 15px;
      margin-right: 20px;
      .icon-delete {
        position: absolute;
        font-size: 14px;
        right: 5px;
        margin-top: 8px;
        z-index: 2;
        color: #fff;
        cursor: pointer;
        background-color: rgba($color: #182752, $alpha: 0.8);
        border-radius: 50%;
      }
    }
  }
  .button-content {
    margin-top: 20px;
    padding: 15px;
    display: flex;
  }
  .dialog-content {
    .el-dialog__body {
      position: relative;
      padding: 20px;
      .icon-pen {
        position: absolute;
        right: 30px;
        top: 30px;
        &-image {
          height: 40px;
          cursor: pointer;
        }
        &-content {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        &-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin: auto;
          margin-bottom: 10px;
          cursor: pointer;
          &.is-active {
            border: 4px solid #ddd;
            box-sizing: content-box;
          }
        }
      }
      .cancel-content {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: space-around;
        .button {
          margin-right: 15px;
          padding: 8px 15px;
          border-radius: 8px;
          background-color: rgba($color: #000000, $alpha: 0.3);
          display: flex;
          align-items: center;
          cursor: pointer;
          span {
            color: #fff;
            height: 22px;
            line-height: 26px;
          }
        }
      }
    }
  }
}
</style>
<style>
.el-menuscrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
}
.el-scrollbar__thumb {
  background-color: #3e97f6;
}
</style>
