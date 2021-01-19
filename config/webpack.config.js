//配置文件
//当运行 npm run build 命令时候
//会根据本文件的配置详情进行打包

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const NpmInstallWebpackPlugin = require('npm-install-webpack-plugin'); //自动npm -i缺少的npm 包
const CompressionPlugin = require("compression-webpack-plugin"); //压缩代码
module.exports = {
    entry: function (){ //入口文件
        return path.join(__dirname,"../src/index.js");
    },
    output: {
        path: path.join(__dirname,"../build"),
        filename: 'index.js'
    },
    module: {
        rules: [
            { test: /\.less$/,use: ['css-loader','style-loader','less-loader'] }, //预处理less
            { test: /\.css$/, use: ['css-loader','style-loader'] },//预处理css
            { test: /\.(png|jpg|jpeg|gif)$/, use: ['file-loader']},
            { test: /\.js$/,use: ['babel-loader'],exclude: /(node_modules|bower_components)/ }
        ]
    },
    plugins: [
        // new CompressionPlugin({
        //     threshold:1024*1
        // }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname,"../public/index.html"),
            inject: true,
            filename: "index.html"
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new NpmInstallWebpackPlugin() //在开发时候自动安装缺少的依赖
    ]
};
