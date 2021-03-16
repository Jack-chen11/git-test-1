const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pages = require("./pages"); //加载多页配置，尽量可以不必要改动这里的代码

//  获取入口配置函数
function getEntry() {
    const entry = {};
    for (const page in pages) {
        entry[page] = pages[page].js;
    }
    return entry;
}

//针对多页应用的HtmlWebpackPlugin的配置
function getHtmlPlugins() {
    const plugins = [];
    for (const page in pages) {
        plugins.push(
            new HtmlWebpackPlugin({
                chunks: [page],
                template: path.resolve(__dirname, pages[page].html),
                filename: pages[page].out,
            })
        );
    }
    return plugins;
}

module.exports = {
    entry: getEntry(),
    output: {
        filename: "js/[name].[chunkhash:5].js", //js文件输出到 dist/js/xxx
        publicPath: "/", //公用的公共路径
        path: path.resolve(__dirname, "dist"), //输出目录为dist
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), //别名 @ = src 目录
            _: __dirname, //别名_=工程目录
        },
    },
    stats: {
        colors: true,
        modules: false,
    },
    module: {
        rules: [
            {
                //所有的图片都交给url-loader以及file-loader处理，在这里进行配置。
                test: /\.(png)|(gif)|(jpg)|(svg)|(bmp)|(eot)|(woff)|(ttf)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            //只要文件大小不超过这个就使用base64编码，否则就交给file-loader处理
                            limit: 10 * 1024,
                            name: "static/[name].[hash:5].[ext]",
                        },
                    },
                ],
            },
            {
                //所有的css文件以及pcss文件都交给postcss处理
                test: /\.(css)|(pcss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                //es6的语法都会使用babel进行编译
                test: /\.js$/,
                use: "babel-loader",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public"), //将public文件夹中的文件复制到
                    to: "./", //复制到输出目录的根目录
                },
            ],
        }),
        ...getHtmlPlugins(), //应用所有的页面模版，输出到指定目录
        new MiniCssExtractPlugin({
            //打包css代码，到文件中
            filename: "css/[name].css",
            chunkFilename: "css/common.[hash:5].css", //针对公共样式的文件名
        }),
    ],
};
