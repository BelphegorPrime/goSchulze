var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');

var WebpackErrorNotificationPlugin = require('webpack-error-notification');

var config = {
    cache: true,
    devtool: 'inline-source-map',
    entry: [
        './frontend/public/js/main.js'
    ],
    output: {
        path: path.join(__dirname, 'public/dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new WebpackErrorNotificationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'frontend/public/'),
                loader: 'react-hot-loader!babel-loader'
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    }
};

module.exports = config;
