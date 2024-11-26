const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production', // または 'production'
    output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: '/',
    },

    entry: {
        // define HTML files here
        index: './src/index.html',  // => dist/index.html
        example: './src/example.html', // => dist/example.html
        // ...
    },

    plugins: [
        new HtmlBundlerPlugin({
            js: {
                // JS output filename extracted from source script loaded in HTML via `<script>` tag
                filename: 'js/[name].[contenthash:8].js',
            },
            css: {
                // CSS output filename extracted from source style loaded in HTML via `<link>` tag
                filename: 'css/[name].[contenthash:8].css',
            },

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
            // styles
            {
                test: /\.(css|sass|scss)$/,
                use: ['css-loader', 'sass-loader'],
            },
            // images
            {
                test: /\.(png|jpe?g|svg|ico)/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash:8][ext]',
                },
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