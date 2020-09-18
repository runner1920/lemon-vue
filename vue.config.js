const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    port: 7777,
    proxy: {
      '/api': {
        // target: 'http://rongyixing.dkfjkjg.com/rxtx/platform', // 阿里云预生产环境
        // target: 'https://www.fichange.com/rxtx/platform', // 生产环境
        target: 'http://192.168.3.36/rxtx/platform', // 本地测试环境
        // target: 'http://192.168.3.2/rxtx/platform', // 本地开发环境
        // target: 'http://192.168.3.25/rxtx/platform', // 联调环境
        autoOpenBrowser: true,
        changeOrigin: true,
        overlay: {
          warnings: true,
          errors: true
        },
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 关闭eslint
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@layout', resolve('src/layout')) // 对应布局组件
      .set('@common', resolve('src/components/common')) // 对应公用组件
      .set('@containers', resolve('src/components/containers')) // 对应容器层
      .set('@views', resolve('src/views')) // 对应页面
      .set('@img', resolve('src/assets/img')) // 对应图片
      .set('@style', resolve('src/style')); // 对应样式
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: './src/style/common.scss'
        })
        .end();
    });
  }
};
