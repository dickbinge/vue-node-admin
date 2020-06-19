<template>
  <div class="demo-container">
    <p class="info-content">
      MarkDown编辑器示例。。。
    </p>
    <vue-markdown :source="source"></vue-markdown>
  </div>
</template>
<script>

import vueMarkdown from 'vue-markdown';

const content = `
**This is test**

* vue
* element
* webpack

`;
export default {
  name: 'markDown',
  components: {
    vueMarkdown,
  },
  data() {
    return {
      source: content,
    };
  },
};
</script>
