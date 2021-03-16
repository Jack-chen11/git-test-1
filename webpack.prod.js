const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.js");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const prodConfig = {
    mode: "production",
    optimization: {
        splitChunks: {
            //分包配置
            chunks: "all",
            cacheGroups: {
                styles: {
                    minSize: 0,
                    test: /\.css$/,
                    minChunks: 2,
                },
            },
        },
    },
    plugins: [new WebpackBundleAnalyzer(), new CompressionWebpackPlugin()],
};

module.exports = merge(baseConfig, prodConfig);
