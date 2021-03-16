module.exports = {
    index: {
        js: "./src/pages/index/index.js", //页面入口
        html: "./src/pages/index/index.html", //页面使用的模版
        out: "index.html", //输出目录中的页面文件名
    },
    other: {
        js: "./src/pages/other/index.js", //页面入口
        html: "./src/pages/other/index.html", //页面使用的模版
        out: "other.html", //输出目录中的页面文件名
    },
    //如果有更多的页面都可以加进来，按照上面的格式
};
