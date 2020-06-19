<template>
  <div class="icon-container">
    <p class="info-content">
      <span class="add-btn">点击上传。。。。</span>
    </p>
    <div class="icons-wrapper">
      <div v-for="item of iconMap" :key="item" @click="handleCopy(generateIconCode(item), $event)" class="icon-item">
        <el-tooltip placement="top">
          <div slot="content">
            {{ generateIconCode(item) }}
          </div>
          <div class="icon-item">
            <svg-icon :icon-class="item" class-name="disabled" />
            <span>{{ item }}</span>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard';
import icons from './requireIcons';

export default {
  name: 'icons',
  data() {
    return {
      iconMap: icons,
    };
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class=${symbol}/>`;
    },
    handleCopy(text, event) {
      clipboard(text, event);
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-container {
  padding: 30px 15px;
  .icons-wrapper {
    margin: 0 auto;
    .icon-item {
      margin: 20px;
      width: 160px;
      height: 110px;
      float: left;
      text-align: center;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
      span {
        display: block;
        font-size: 24px;
        margin-top: 10px;
      }
      .disabled {
        pointer-events: none;
      }
    }
  }
}

</style>
