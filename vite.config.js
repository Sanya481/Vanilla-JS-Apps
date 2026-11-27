import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Vanilla-JS-Apps/',
  root: '.', // Указываем корневую папку с исходниками (где index.html)

  publicDir: 'public', // Явно указываем папку с статикой

  // Куда собирается проект (аналог 'dist')
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Очищать папку при сборке
    // Опционально: настройка полифилов для старых браузеров
    target: 'es2015',
    assetsDir: 'assets', // Папка для assets в dist
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // -> dist/index.html
        cart: resolve(__dirname, 'book-store.html'), // -> dist/book-store.html
        portfolio: resolve(__dirname, 'portfolio.html'), // -> dist/portfolio.html
        library: resolve(__dirname, 'library.html'),
        survey: resolve(__dirname, 'survey-form.html'),
        delivery: resolve(__dirname, 'delivery-form.html'),
        cardCrafter: resolve(__dirname, 'card-crafter.html'),
        promiseLoader: resolve(__dirname, 'promise-loader.html'),
        networkMonitor: resolve(__dirname, 'network-monitor.html'),
        filmArchive: resolve(__dirname, 'film-archive.html'),
        warehouse: resolve(__dirname, 'warehouse.html'),
        deliveryTracker: resolve(__dirname, 'delivery-tracker.html'),
      },
      output: {
        // Разделяем файлы по типам в разные папки
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? ''

          // Получаем расширение файла надёжно: 'book-1.jpg' → 'jpg'
          const extType = name.split('.').pop()?.toLowerCase() ?? ''

          // 2. Проверяем: это изображение?
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(extType)) {
            const path = 'assets/images/[name]-[hash][extname]'
            return path // → assets/images/book-1-aBc123.jpg
          }

          // 3. Проверяем: это CSS?
          if (/css/i.test(extType)) {
            const path = 'assets/css/[name]-[hash][extname]'
            return path // → assets/css/main-xYz456.css
          }

          // Шрифты
          if (/woff2?|eot|ttf|otf/i.test(extType)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }

          // Всё остальное
          return 'assets/[name]-[hash][extname]'
        },

        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },

  // Настройка сервера для разработки
  server: {
    port: 3000, // Порт
    open: '/index.html', // Автоматически открывать главную страницу
  },

  // Настройка алиасов для путей
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@scss': resolve(__dirname, 'src/scss'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
         @use "@/scss/utils/variables" as *;
          @use "@/scss/utils/global" as *;
          @use "@/scss/utils/reset" as *;
        `,
      },
    },
  },
})
