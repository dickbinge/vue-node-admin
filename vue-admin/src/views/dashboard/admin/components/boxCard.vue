<template>
  <div class="box-card">
    <header>
      <slot name="header">
        <img :src="headerImg" />
      </slot>
    </header>
    <section>
      <div style="position: relative;">
        <pan-thumb :image="avatar" class="pan-thumb" :width="70"/>
        <mill-ki class="millki-text" :text="mallkiText" />
        <div class="progress-content">
          <div class="progress-item" v-for="(item, index) in progressList" :key="index">
            <span>{{item.text}}</span>
            <el-progress :percentage="item.precentage" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import panThumb from '@/components/panThumb';
import millKi from '@/components/millKi';

export default {
  name: 'boxCard',
  components: {
    panThumb,
    millKi,
  },
  props: {
    headerImg: String,
    avatar: String,
    mallkiText: String,
    progressList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
.box-card {
  background-color: #fff;
  height: 100%;
  border: 1px solid #ebeef5;
  transition: .3s;
  border-radius: 4px;
  overflow: hidden;
  &:hover{
    box-shadow: 0 2px 12px 0 rgba($color: #000000, $alpha: .1);
  }
  &:focus {
    box-shadow: 0 2px 12px 0 rgba($color: #000000, $alpha: .1);
  }
  header {
    width: 100%;
    height: 220px;
    position: relative;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.5s linear;
      -webkit-transition: all 0.5s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  section {
    padding: 20px;
    .pan-thumb {
      z-index: 100;
      position: absolute;
      top: -45px;
      left: 0px;
      border: 5px solid #fff;
      background-color: #fff;
      margin: auto;
      box-shadow: none;
    }
    .millki-text {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 20px;
      font-weight: bold;
    }
    .progress-content {
      padding-top: 35px;
      .progress-item {
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
    @media only screen and (max-width: 1510px) {
      .millki-text {
        display: none;
      }
    }
  }
}
</style>
