<template>
  <div class="filename-option">
    <label class="radio-label" style="padding-left: 0;">Filename:</label>
    <el-input :placeholder="$t('excel.placeholder')" v-model="filename" style="width:340px;" prefix-icon="el-icon-document"/>
  </div>
</template>
<script>
export default {
  name: 'filenameOption',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    filename: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
