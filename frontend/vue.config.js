const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader') 
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};