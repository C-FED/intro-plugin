const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssnanoPlugin=require("@intervolga/optimize-cssnano-plugin");
const HtmlWebpackPlugin=require("html-webpack-plugin");

module.exports = [{
    devtool: "source-map",
    mode: "production",
    entry: {
        "Intro": path.resolve(__dirname, './src/index.ts')
    },
    output: {
        path: path.resolve(__dirname, './dist'), // 所有输出文件的目标路径
        filename: '[name].min.js',
        publicPath: "./", // 输出解析文件的目录，url 相对于 HTML 页面
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ],
                // 只命中src目录里的js文件，加快 Webpack 搜索速度
                include: path.resolve(__dirname, "./src/")
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader?minimize',
                    // publicPath: "../" // 用来覆盖项目路径,生成该css文件的文件路径
                }),
                // 只命中src目录里的js文件，加快 Webpack 搜索速度
                include: path.resolve(__dirname, "./src")
            },
        ]
    },
    plugins: [
        // 生成独立的css文件
        new ExtractTextPlugin("css/[name].min.css"),
        // 压缩css
        new OptimizeCssnanoPlugin,
        // 注入html
        new HtmlWebpackPlugin({
            title: "Intro plugin",
            filename: path.resolve(__dirname, "./dist/index.html"),
            template: path.resolve(__dirname, "./index.html"),
            minify: {
                removeComments: true, // 移除注释
                collapseWhitespace: true, // 移除空行
                removeAttributeQuotes: true, // 移除属性的引号
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            inject:'head',
            hash: true,
        })
    ],
    resolve: {
        extensions: [".ts", ".js"]
    }
}];
