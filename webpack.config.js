const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './js/index.js',
        './scss/index.scss'
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'src'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'main.css',
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader?-url'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    externals: {
        $: "jquery",
        jQuery: "jquery"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};