// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import pkg from '../package.json'

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  // hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: { type: 'hash' },
  devServer:{
    https:true,
    headers : {
      'Access-Control-Allow-Origin': '*',
    }
  },
  chainWebpack:(memo, { env, webpack, createCSSRule })=>{
    const { ModuleFederationPlugin } = webpack.container;
    memo.output.publicPath('auto');
    memo.plugin('ModuleFederation').use(ModuleFederationPlugin,[
      {
        name: pkg.name,
        filename: 'remoteEntry.js',
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
        remotes:{
          '@HostWebpack':'host_webpack@https://localhost:8000/remoteEntry.js',
          '@RemoteUmi':"remote_umi@https://localhost:3030/remoteEntry.js",
        }
      }
    ])
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'root-entry-name': 'default',
    'primary-color-hover':defaultSettings.primaryColor
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: { type: 'none' },
  webpack5: {},
  exportStatic: {},
});
