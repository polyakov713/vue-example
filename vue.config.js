module.exports = {
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    indentedSyntax: true,
                    indentWidth: 4,
                },
                prependData: `@import "@/assets/styles/_vars.sass";`,
            },
        },
    },

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
