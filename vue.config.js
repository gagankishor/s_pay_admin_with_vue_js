const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost.com/spay_api/public/',
        ws: true,
        changeOrigin: true
      },
    }
  }
})