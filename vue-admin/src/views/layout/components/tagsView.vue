<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath}"
        :key="tag.path"
        class="tags-view-item"
        :class="isActive(tag)?'active':''"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)">
        {{ generateTitle(tag.title) }}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left: left+'px',top: top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ $t('tagsView.refresh') }}</li>
      <li @click="closeSelectedTag(selectedTag)">{{ $t('tagsView.close') }}</li>
      <li @click="closeOtherTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags">{{ $t('tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>
<script>
import ScrollPane from '@/components/scrollPane';

export default {
  name: 'TagsVIew',
  components: {
    ScrollPane,
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
  },
  watch: {
    $route() {
      this.addViewTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        window.addEventListener('click', this.closeMenu);
      } else {
        window.removeEventListener('click', this.closeMenu);
      }
    },
  },
  mounted() {
    this.addViewTags();
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
    isActive(route) {
      return route.path === this.$route.path;
    },
    addViewTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch('addView', this.$route);
      }
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.ScrollPane.moveToTarget(tag);

            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route);
            }
            break;
          }
        }
      });
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: `/redirect${fullPath}`,
          });
        });
      });
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          const latestView = visitedViews.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView);
          } else {
            this.$router.push('/');
          }
        }
      });
    },
    closeOtherTags() {
      this.$router.push(this.selectedTag);
      this.$store.dispatch('delOtherViews', this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews');
      this.$router.push('/');
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right
      this.left = left > maxLeft ? maxLeft : left;
      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba($color: #000000, $alpha: .12), 0 0 3px 0 rgba($color: #000000, $alpha: .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background: #42b983;
        border-color: #42b983;
        color: #fff;
        &:before {
          content: '';
          background-color: #fff;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    position: absolute;
    z-index: 100;
    list-style-type: none;
    padding: 5px 0;
    margin: 0;
    background: #fff;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba($color: #000000, $alpha: .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
