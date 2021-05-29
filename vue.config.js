module.exports = {
  // 表示你要配置个webpack的configure
  configureWebpack: {
    resolve: {
      // 别名
      alias: {
        'assets': '@/assets',
        'content': '@/content',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}