const paths = require('../paths')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const {ModuleFederationPlugin}=webpack.container
const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime'
    ]
  }
}

module.exports = {
  entry: `${paths.src}/index.js`,
  output: {
    filename: 'js/[name].bundle.js',
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    alias: {
      '@': `${paths.src}/modules`
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },

  module: {
    rules: [
      // JavaScript, React
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        use: babelLoader
      },
      // TypeScript
      {
        test: /.tsx?$/i,
        exclude: /node_modules/,
        use: [babelLoader, 'ts-loader']
      },
      // CSS, SASS
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'sass-loader'
        ]
      },
      // MD
      {
        test: /\.md$/i,
        use: ['html-loader', 'markdown-loader']
      },
      // static files
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff2?)$/i,
        type: 'asset'
      }
    ]
  },
  plugins: [
    // new ModuleFederationPlugin(
    //   {
    //     name: "webpack5",
    //     filename: 'remoteEntry.js',
    //     library: { type: "umd", name: "webpack5" },
    //     remotes: {
    //       '#util': "util@https://localhost:3030/remoteEntry.js",
    //     },
    //     exposes: {
    //       "./test": './src/modules/components/TodoList/index.js',
    //       "./cli": './src/Home',
    //     },
    //     shared: { react: { eager: true }, 'react-dom': { eager: true } },
    //   }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: `${paths.public}/index.html`,
      filename: 'index.html',
      templateParameters: {
        analytics: 'Google Analytics ID',
        author: 'Igor Agapov',
        publishedDate: '2021-02-27',
        description:
          'Full Webpack 5 Boilerplate for JavaScript, React & TypeScript projects',
        keywords:
          'webpack, webpack5, boilerplate, template, max, config, bundler, bundle, javascript, react, reactjs, react.js, typescript, project, app',
        title: 'Webpack5 Max',
        url: 'https://example.com'
      }
    }),


    new webpack.ProvidePlugin({
      React: 'react'
    }),

    new Dotenv({
      path: './config/.env'
    })
  ]
}
