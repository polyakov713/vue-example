module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.loaders = {
          scss: 'vue-style-loader!css-loader!sass-loader',
          sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
        };

        return options;
      });
  },
};
