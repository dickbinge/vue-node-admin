
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const externals = {
  'element-ui': 'ELEMENT',
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
};

module.exports = {
  devServer: {
    port: 8098,
  },
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();

    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },

  publicPath: '',
};
