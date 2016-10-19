const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: "./src/main.js",

    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: "react-widget-bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-runtime', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.(scss|sass)$/,
        loaders: 'style!css!postcss?parser=postcss-scss'
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=8192&name=/[hash].[ext]'
      }
    ]
  },

  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'components'],
    // require时省略的扩展名，如：require('module') 不需要module.js
    extensions: ['', '.js', '.scss', '.css', '.json', '.html']
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-bundle.js'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index-template.html',
      inject: 'body'
    })
  ]
};
