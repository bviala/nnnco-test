module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_DEV_PROXY_TARGET
      }
    }
  }
}
