const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const entry = {
    index: "./src/index.js",
    example: "./src/example.js",
}

module.exports = {
    mode: 'production',
    entry: entry,
    output: {
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].chunk.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            chunks: ['runtime', 'vendors', 'index'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'example.html',
            chunks: ['runtime', 'vendors', 'example'],
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
        usedExports: true,
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    priority: -10,
                    name: 'vendors',
                }
            }
        },
    },

};