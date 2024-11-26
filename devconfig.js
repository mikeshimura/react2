const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// HTMLファイルと対応するエントリーポイントのリストを生成
const htmlFiles = fs.readdirSync(path.resolve(__dirname, 'src')).filter(file => file.endsWith('.html'));

const entry = {};
htmlFiles.forEach(file => {
    const name = path.basename(file, '.html');
    entry[name] = `./src/${name}.js`;
});

module.exports = {
    mode: 'development',
    entry: entry,
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: htmlFiles.map(file => {
        const name = path.basename(file, '.html');
        return new HtmlWebpackPlugin({
            template: `./src/${file}`,
            filename: `${file}`,
            chunks: [name],
        });
    }),
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
                test: /\.svg$/, use: ['file-loader'], // または 'svg-inline-loader'
            }
        ],
    },
    devServer: {
        static: { directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
};