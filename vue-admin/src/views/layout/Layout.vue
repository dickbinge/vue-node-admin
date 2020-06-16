<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutSide" />
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  Navbar, Sidebar, AppMain, TagsView,
} from './components';
// eslint-disable-next-line import/no-cycle
import resizeHandler from './mixin/resizeHandler';

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
  },
  mixins: [resizeHandler],
  computed: {
    ...mapGetters(['sidebar', 'device']),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .drawer-bg {
    background-color: #000;
    opacity: .3;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 999;
  }
}
</style>
