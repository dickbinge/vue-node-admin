<template>
  <div class="vue-quill">
    <p class="info-content">
      vue-quill-editor 使用示例
    </p>
    <div class="edit-container">
      <quill-editor
        ref="editor"
        v-model="editorContent"
        :options="editorOption">
      </quill-editor>
    </div>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';

export default {
  name: 'vueQuill',
  components: {
    quillEditor,
  },
  data() {
    return {
      editorContent: '',
      editorOption: {
        placeholder: '请输入',
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'link', 'image'],
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ font: [] }], // 字体
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ align: [] }], // 对齐方式
            ['blockquote', 'code-block'], // 引用，代码块
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ direction: 'rtl' }], // 文本方向
            ['clean'], // 清楚字体样式
            ['image', 'video'], // 上传图片、上传视频
          ],
        },
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.vue-quill {
  padding: 15px;
}
</style>
