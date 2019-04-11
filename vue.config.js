module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/or/client/' : '/',
  devServer: {

    proxy: {
      '/testpro': {
        // target: 'http://192.168.1.104',
        // target: 'http://172.16.21.78',
         target: "http://localhost:80",
        //target: "http://172.16.21.218",
        secure: false,
        ws: true,
        changeOrigin: true
      }
    }
  }
}
