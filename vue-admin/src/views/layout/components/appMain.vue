<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'appMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    },
  },
};
</script>
<style lang="scss">
.app-main {
  min-height: calc(100% - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
