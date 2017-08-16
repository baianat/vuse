const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const env = process.env.NODE_ENV;
const production = env === 'production';

// render page
const page = (name) => {
  return new HtmlWebpackPlugin({
    inject: true,
    template: `./src/pug/${name}.pug`,
    filename: `../${name}.html`
  });
};

const config = {
  devtool: production ? 'source-map' : 'cheap-source-map',
  entry: {
    app: './src/js/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: 'dist/'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    page('index'),
    new FriendlyErrorsWebpackPlugin(),
    new ProgressBarPlugin()
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
    port: 8080
  },

  module: {
    rules: [{
      test: /.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ],
          plugins: [require('babel-plugin-transform-object-rest-spread')]
        }
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
      loaders: ['style-loader', 'css-loader']
    },
    {
      test: /.styl$/,
      loader: 'style-loader!css-loader!stylus-loader?resolve url'
    },
    {
      test: /\.(ttf|eot|svg)(\?.*)?$/,
      loader: 'file-loader',
      query: {
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
