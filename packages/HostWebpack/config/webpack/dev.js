const paths = require('../paths')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common')
const {ModuleFederationPlugin}=webpack.container
const pkg =require( '../../package.json')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    https:true,
    compress: true,
    contentBase: paths.build,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin(
      {
        name: pkg.name,
        filename: 'remoteEntry.js',
        remotes:{
          '@RemoteWebpack':"remote_webpack@https://localhost:8080/remoteEntry.js",
          '@RemoteUmi':"remote_umi@https://localhost:3030/remoteEntry.js",
        },
        exposes: {
          "./home": './src/Home',
          "./index": './src/App.js',
        },
        shared: [
          {
            'react': {
              eager:true,
              singleton: true,
            },
            'react-dom': {
              eager:true,
              singleton: true,
            },
          },
        ],
      }),
  ]
})
