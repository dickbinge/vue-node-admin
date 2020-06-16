<template>
  <el-breadcrumb class="app-breadcrumb" :separator="separator">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList.filter(item => item.meta.title && item.meta.breadcrumb!== false)" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index=== levelList.length-1" class="no-redirect">
          {{generateTitle(item.meta.title)}}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{generateTitle(item.meta.title)}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp';

export default {
  name: 'Breadcrumb',
  props: {
    separator: {
      type: String,
      default: '/',
    },
  },
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    generateTitle(title) {
      const hasKey = this.$te(`route.${title}`);
      if (hasKey) {
        const translatedTitle = this.$t(`route.${title}`);
        return translatedTitle;
      }
      return title;
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => !!item.name);
      const first = matched[0];
      if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
        matched = [
          {
            path: '/dashboard',
            meta: {
              title: 'dashboard',
            },
          },
        ].concat(matched);
      }
      this.levelList = matched;
    },
  },
  pathCompile(path) {
    const { params } = this.$route;
    const toPath = pathToRegexp.compile(path);
    return toPath(params);
  },
  handleLink(item) {
    const { redirect, path } = item;
    if (redirect) {
      this.$router.push(redirect);
      return;
    }
    this.$route.push(this.pathCompile(path));
  },
};
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
