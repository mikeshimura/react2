const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: 'development', // または 'production'

    entry: {
        index: './src/index.js',
        example: './src/example.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devtool: false,
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index', 'vendor'],
        }),
        new HtmlWebpackPlugin({
            template: './src/example.html',
            filename: 'example.html',
            chunks: ['example', 'vendor'],
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['file-loader'],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
                default: {
                    minChunks: 2,
                    reuseExistingChunk: true,
                    enforce: true,
                },
            },
        },
        runtimeChunk: {
            name: 'runtime',
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,

    },
};
