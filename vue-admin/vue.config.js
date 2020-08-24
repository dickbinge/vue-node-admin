/*
 * @Description:
 * @Version: 2.0
 * @Autor: jingbin
 * @Date: 2020-05-18 15:27:52
 * @LastEditors: jingbin
 * @LastEditTime: 2020-08-21 17:18:34
 */

module.exports = {
  devServer: {
    port: 8099,
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
