import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, {
  VantResolve
} from 'vite-plugin-style-import';
import {
  resolve
} from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  resolve: { // 类型：Record<string, string> | Array<{ find: string | RegExp, replacement: string }> 将会被传递到 @rollup/plugin-alias 作为它的 entries。
    alias: {
      '~': resolve(__dirname, './'),
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'] // 类型： string[] 导入时想要省略的扩展名列表。
  },


  server: {
    hmr: {
      overlay: false
    }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层

    // 服务配置
    // port: 4399,   // 类型： number 指定服务器端口;
    open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
    cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
    proxy: { // 类型： Record<string, string | ProxyOp 为开发服务器配置自定义代理规则
      '/dev': {
        target: 'http://192.168.35.96:8900/svr-become',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/dev', '')
      },
      //       '/dev': {
      //   target: 'http://192.168.35.96:8900/svr-become',
      //   pathRewrite: {
      //     '^/dev': ''
      //   }
      // }
    },
  },
})