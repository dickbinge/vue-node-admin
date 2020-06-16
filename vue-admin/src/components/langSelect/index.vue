<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="lang-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'langSelect',
  computed: {
    ...mapGetters(['language']),
  },
  methods: {
    handleSetLanguage(lang) {
      console.log(lang);
      this.$i18n.locale = lang;
      this.$store.dispatch('setLanguage', lang);
      this.$message.success('Switch Language Success!');
    },
  },
};
</script>

<style scoped>
.lang-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px !important;
}
</style>
