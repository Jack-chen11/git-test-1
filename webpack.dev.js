var merge = require("webpack-merge");
var baseConfig = require("./webpack.config.js");

const devConfig = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        open: true,
        port: 8000,
        proxy: {
            //需要跨域的可以在此处配置
        },
        stats: "minimal",
    },
};

//merge就是将两个配置合并，如果有重复项就是使用后面的覆盖前面的
module.exports = merge(baseConfig, devConfig);
