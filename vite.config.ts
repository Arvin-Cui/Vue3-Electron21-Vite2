import { defineConfig,loadEnv} from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// 自动导入element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

const root = process.cwd()
function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig=>{
    let env = {} as any
    const isBuild = command === 'build'
    if (!isBuild) {
      env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root)
    } else {
      env = loadEnv(mode, root)
    }
    return {
      base: env.VITE_BASE_PATH,
        publicDir: resolve(__dirname, './dist'),
        assetsInclude: resolve(__dirname, 'src/render/assets'),
      server: {
        port: 4000,
        proxy: {
          // 选项写法
          '/api': {
            target: 'https://sports.api.zxdev.top/api',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
          }
        },
        hmr: {
          overlay: false
        },
        host: '0.0.0.0'
      },
      plugins: [
          vue(),
          AutoImport({
              // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
              // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
              resolvers: [
                  ElementPlusResolver({
                      importStyle:'sass'
                  }),
                  // Auto import icon components
                  // 自动导入图标组件
                  IconsResolver({
                      prefix: 'Icon',
                  }),
              ],

          }),

          Components({
              resolvers: [
                  // Auto register icon components
                  // 自动注册图标组件
                  IconsResolver({
                      enabledCollections: ['ep'],
                  }),
                  // Auto register Element Plus components
                  // 自动导入 Element Plus 组件
                  ElementPlusResolver({
                      importStyle:'sass'
                  }),
              ],
          }),

          Icons({
              autoInstall: true,
          }),

      ],
      css: {
        preprocessorOptions: {
          scss: {
              additionalData: `@use "@/render/styles/layout.scss" as *;`,
          }
        }
      },
      resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
        alias: [
          // {
          //   find: 'vue-i18n',
          //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
          // },
          {
            find: /\@\//,
            replacement: `${pathResolve('src')}/`
          }
        ]
      },
    }
})
