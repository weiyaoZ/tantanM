module.exports = {
  // 关闭 eslint
  lintOnSave: false,
  // 在打包时自动将 .map 文件删除
  productionSourceMap: false,
  // 代理跨域
  devServer: {
    proxy: {
      // '^/api'为开头的请求路径
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''},
        ws: true,//用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      }
    }
  }
}
