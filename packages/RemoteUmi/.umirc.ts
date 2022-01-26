import { defineConfig } from 'umi';
import routes from './router'
import pkg from './package.json'

const BASE_URI='/remote/'
export default defineConfig({
  base:BASE_URI,
  chainWebpack:(memo, { env, webpack, createCSSRule })=>{
    const { ModuleFederationPlugin } = webpack.container;
    memo.output.publicPath('auto');
    memo.plugin('ModuleFederation').use(ModuleFederationPlugin,[
      {
        name: pkg.name,
        filename: 'remoteEntry.js',
        exposes: {
          "./index": './src/pages/index.tsx',
          "./routes":"./router",
          "./remote":"./remote"
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
      }
    ])
  },

  devServer:{
    https:true,
    headers : {
      'Access-Control-Allow-Origin': '*',
    }
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  // mfsu: {},
  fastRefresh: {},
  webpack5:{}
  // https://umijs.org/config#webpack5
  // 使用 webpack 5 代替 webpack 4 进行构建
});
