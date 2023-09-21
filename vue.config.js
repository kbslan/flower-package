'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Admin' // page title

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/flower',
  // outputDir: 'dist',
  // assetsDir: '/static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8088,
    open: true,
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8099', // 后端服务器的地址
        ws: false, // 关闭websocket
        // pathRewrite: { '^/api': '' }, // If you don't want /api to be passed along, we need to rewrite the path
        changeOrigin: true // 允许跨域,
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }

}
