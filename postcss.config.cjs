/* eslint-env node */
module.exports = {
    plugins: [
        require("postcss-nested"),
        require("postcss-each-variables"),
        require("postcss-each")({
            plugins: {
                beforeEach: [require("postcss-for"), require("postcss-color-mix")],
            },
        }),
        // require('cssnano')({preset: 'default'})   装上这个就可以是样式混淆了  因为我们前面把那个 false 了
    ],
};
