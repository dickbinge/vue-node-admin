<template>
  <section class="app-main" v-watermark="watermarkInfo">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'appMain',
  computed: {
    ...mapState(['user']),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    },
    watermarkInfo() {
      return this.user.name;
    },
  },
};
</script>
<style lang="scss">
.app-main {
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
