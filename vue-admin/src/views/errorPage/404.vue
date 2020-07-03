<template>
  <div class="errpage-content">
    <el-row class="wscn-http404">
      <el-col :span="12" class="pic-404">
        <img :src="errImg" alt="404" class="pic-404__parent"/>
        <img class="pic-404__child left" src="@/assets/images/404_cloud.png" alt="404">
        <img class="pic-404__child mid" src="@/assets/images/404_cloud.png" alt="404">
        <img class="pic-404__child right" src="@/assets/images/404_cloud.png" alt="404">
      </el-col>
      <el-col :span="12" class="bullshit">
        <h1 class="bullshit__oops">OOPS!</h1>
        <span class="bullshit__info">版权所有 <a href="https://www.baidu.com">百度一下</a></span>
        <p class="bullshit__headline">网管说这个网页你不能进.....</p>
        <span class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</span>
        <router-link to="/" class="bullshit__return-home">返回首页</router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import errImg from '@/assets/images/404.png';

export default {
  name: 'page401',
  data() {
    return {
      dialogVisible: false,
      errImg: `${errImg}?${new Date()}`,
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
    };
  },
  methods: {
    back() {
      this.$router.push('/dashboard');
    },
  },
};
</script>
<style lang="scss" scoped>
.errpage-content {
  transform: translate(-50%,-50%);
  position: absolute;
  top: 40%;
  left: 50%;
  .wscn-http404 {
    position: relative;
    width: 1200px;
    padding: 0 50px;
    overflow: hidden;
    .pic-404 {
      position: relative;
      float: left;
      width: 600px;
      overflow: hidden;
      &__parent {
        width: 100%;
      }
      &__child {
        position: absolute;
        &.left {
          width: 80px;
          top: 17px;
          left: 220px;
          opacity: 0;
          animation-name: cloudLeft;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1s;
        }
        &.mid {
          width: 46px;
          top: 10px;
          left: 420px;
          opacity: 0;
          animation: cloudMid 2s linear 1.2s 1 normal forwards;
        }
        &.right {
          width: 62px;
          top: 100px;
          left: 500px;
          animation: coludRight 1s linear 1s 1 normal forwards;
        }
        @keyframes cloudLeft {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }
          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }
          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }
          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }
        @keyframes cloudMid {
          0% {
            top: 10px;
            left: 420px;
            opacity: 0;
          }
          20% {
            top: 40px;
            left: 360px;
            opacity: 1;
          }
          70% {
            top: 130px;
            left: 180px;
            opacity: 1;
          }
          100% {
            top: 160px;
            left: 120px;
            opacity: 0;
          }
        }
        @keyframes cloudRight {
          0% {
            top: 100px;
            left: 500px;
            opacity: 0;
          }
          20% {
            top: 120px;
            left: 460px;
            opacity: 1;
          }
          80% {
            top: 180px;
            left: 340px;
            opacity: 1;
          }
          100% {
            top: 200px;
            left: 300px;
            opacity: 0;
          }
        }
      }
    }
    .bullshit {
      position: relative;
      float: left;
      width: 300px;
      padding: 30px 0;
      overflow: hidden;
      &__oops {
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      &__info {
        font-size: 13px;
        line-height: 16px;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        color: grey;
        opacity: 0;
        a {
          color: #1482f0;
        }
      }
      &__headline {
        font-size: 20px;
        line-height: 24px;
        color: #222;
        font-weight: bold;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        opacity: 0;
      }
      &__return-home {
        display: block;
        width: 110px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        background-color: #1482f0;
        color: #fff;
        text-align: center;
        border-radius: 18px;
        margin-top: 30px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
        opacity: 0;
      }
      @keyframes slideUp {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
}
</style>
