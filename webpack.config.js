const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    entry: {
        app: './src/js/builder.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/dist/'
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
      }),
      page('index'),
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
      proxy: {
        '*': {
          target: 'http://builder.dev/',
          changeOrigin: true
        }
      },
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
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }, {
        test: /.styl$/,
        loader: 'style-loader!css-loader!stylus-loader?resolve url'
      }, {
        test: /\.(ttf|eot|svg)(\?.*)?$/,
        loader: 'file-loader',
        query: {
            name: 'fonts/[name].[ext]'
        }
      }, {
        test: /.pug$/,
        exclude: /node_modules/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }]
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
    },

};

module.exports = config;
