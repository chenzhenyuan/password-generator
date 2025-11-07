import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 优化建议已内置：别名、构建分块、开发服务器友好设置、按环境调整 sourcemap/压缩等
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    base: './',
    plugins: [react()],

    // 路径别名：import x from '@/...'
    resolve: {
      alias: {
        // 使用 import.meta.url 以兼容 ESM 环境 — Vite 接受 URL 或字符串路径
        '@': new URL('./src', import.meta.url).pathname,
      },
    },

    // 开发服务器优化（本地开发更友好）
    server: {
      port: 5173,
      open: true,
      // strictPort: true,
    },

    // 依赖预构建 / 缓存目录
    optimizeDeps: {
      // 可以在需要时显式 include 常用库以加速预构建
      include: [],
    },

    // 构建配置
    build: {
      target: 'es2018', // 兼顾现代浏览器与较旧环境
      sourcemap: !isProd, // 开发环境生成 sourcemap，生产环境默认关闭
      minify: isProd ? 'esbuild' : false,
      brotliSize: true,
      chunkSizeWarningLimit: 600,
      // 将构建产物放在 static 目录下，并把 js/css 分别放到 scripts/styles
      assetsDir: 'static',
      rollupOptions: {
        output: {
          entryFileNames: 'static/scripts/[name]-[hash].js',
          chunkFileNames: 'static/scripts/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const ext = assetInfo.name ? assetInfo.name.split('.').pop() : '';
            if (ext === 'css') return 'static/styles/[name]-[hash][extname]';
            // images/fonts and others stay under static/<ext> or static/
            return 'static/[name]-[hash][extname]';
          },
          // 自动将 node_modules 中的包拆分为独立 chunk，便于浏览器缓存
          manualChunks(id: string) {
            if (id.indexOf('node_modules') !== -1) {
              const parts = id.toString().split('node_modules/')[1].split('/');
              // vendor chunk: 按包名拆分（例如 @scope/pkg 或 pkg）
              return parts[0].charAt(0) === '@' ? `${parts[0]}/${parts[1]}` : parts[0];
            }
          },
        },
      },
    },

    // CSS 预处理器配置（保留原先设置）
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },

    // 缓存目录（可按需修改）
    cacheDir: 'node_modules/.vite',
  }
})