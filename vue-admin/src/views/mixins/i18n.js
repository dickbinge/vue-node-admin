export default {
  methods: {
    generateTitle(title) {
      const hasKey = this.$te(`route.${title}`);
      if (hasKey) {
        const translatedTitle = this.$t(`route.${title}`);
        return translatedTitle;
      }
      return title;
    },
  },
};
