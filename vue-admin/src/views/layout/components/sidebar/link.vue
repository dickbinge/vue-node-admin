
<template>
  <component v-bind="linkProps(to)" :is="is">
    <slot/>
  </component>
</template>
<script>
import { isExternal } from '@/utils';

export default {
  name: 'AppLink',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      is: 'router-link',
    };
  },
  methods: {
    isExternalLink(routePath) {
      return isExternal(routePath);
    },
    linkProps(url) {
      // 如果地址中包含http等的打开一个新页面，否则是一个router-link
      if (this.isExternalLink(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener',
        };
      }
      return {
        is: 'router-link',
        to: url,
      };
    },
  },
};
</script>
