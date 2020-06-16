<template>
  <div class="social-sign">
    <div class="sign-btn" @click="wechatHabdleClick('wechat')">
      <span class="wx-svg-container"><svg-icon icon-class="wechat" class="icon" /></span>微信
    </div>
    <div class="sign-btn" @click="tencentHabdleClick('tencent')">
      <span class="qq-svg-container"><svg-icon icon-class="qq" class="icon" /></span>QQ
    </div>
  </div>
</template>

<script>
export default {
  name: 'socialSign',
  data() {
    return {

    };
  },
  methods: {
    wechatHabdleClick(thirdpart) {
      console.log(thirdpart);
    },
    tencentHabdleClick(thirdpart) {
      console.log(thirdpart);
    },
  },
};
</script>

<style lang="scss">
.social-sign {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-self: center;
  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }
  .icon {
    font-size: 24px;
    color: #fff;
    margin-top: 8px;
  }
  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 5px;
  }
  .wx-svg-container {
    background-color: #24da70;
  }
  .qq-svg-container {
    background-color: #6ba2d6;
    margin-left: 50px;
  }
}
</style>
