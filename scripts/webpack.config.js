const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV;
const production = env === 'production';

// render page
const page = (name) => {
  return new HtmlWebpackPlugin({
    inject: true,
    template: path.join(__dirname, `/../src/pug/${name}.pug`),
    filename: path.join(__dirname, `/../dev/${name}.html`)
  });
};

const config = {
  devtool: production ? 'source-map' : 'cheap-source-map',
  entry: {
    app: path.join(__dirname, '/../src/js/app.js')
  },
  output: {
    path: path.join(__dirname, '/../dev/dist'),
    filename: 'js/[name].js',
    publicPath: 'dist/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new FriendlyErrorsWebpackPlugin(),
    new ProgressBarPlugin(),
    new ExtractTextPlugin({ filename: 'css/app.css' }),
    new CopyWebpackPlugin([{ from: path.join(__dirname, '/../src/img'), to: '../img/' }]),
    page('index'),
    page('render')
  ],
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: '0.0.0.0',
    port: 8080,
    contentBase: path.join(__dirname, '../dev')
  },

  module: {
    rules: [{
      test: /.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: { babelrc: true }
      }
    },
    {
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      enforce: 'pre'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.vue$/,
      loader: 'eslint-loader',
      enforce: 'pre'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    },
    {
      test: /.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'stylus-loader?resolve url']
      })
    },
    {
      test: /\.(ttf|eot|svg)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]'
      }
    },
    {
      test: /.pug$/,
      exclude: /node_modules/,
      loader: 'pug-loader',
      options: {
        pretty: true
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  }
};

module.exports = config;
