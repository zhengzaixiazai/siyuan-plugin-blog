const generateDynamicV = () => {
  const now = new Date()
  const year = now.getFullYear().toString()
  const month = (now.getMonth() + 1).toString().padStart(2, "0")
  const day = now.getDate().toString().padStart(2, "0")
  const hour = now.getHours().toString().padStart(2, "0")
  const minute = now.getMinutes().toString().padStart(2, "0")
  return year + month + day + hour + minute
}

const isDev = process.env.NODE_ENV === "development"
const appBase = "/plugins/siyuan-blog/"
const staticV = generateDynamicV()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/guide/concepts/typescript#nuxttsconfigjson
  typescript: {
    strict: true,
  },

  devtools: {
    enabled: true,
  },

  // build modules
  modules: ["@vueuse/nuxt", "@nuxtjs/i18n-edge", "@element-plus/nuxt", "@nuxtjs/color-mode"],

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  i18n: {
    vueI18n: "./i18n.ts",
  },

  // colorMode
  colorMode: {
    classSuffix: "",
  },

  vite: {
    define: { "process.env.DEV_MODE": `"${isDev}"` },
    plugins: [],

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    },
  },
  // https://github.com/element-plus/element-plus-nuxt-starter/blob/main/nuxt.config.ts
  elementPlus: {
    icon: "ElIcon",
    importStyle: "scss",
    themes: ["dark"],
  },

  // https://nuxt.com/docs/guide/going-further/custom-routing#hash-mode-spa
  ssr: false,
  // https://nuxt.com/docs/guide/going-further/custom-routing#hash-mode-spa
  router: {
    options: {
      hashMode: true,
    },
  },
  // nitro: {
  //   // 开启之后将进行静态伺服
  //   serveStatic: true,
  // },

  app: {
    baseURL: appBase,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{ rel: "stylesheet", href: appBase + "libs/fonts/webfont.css?v=" + staticV }],
      // https://nuxt.com/docs/api/configuration/nuxt-config#head
      script: isDev
        ? [
            {
              src: appBase + "libs/eruda/eruda.js",
            },
            {
              children: "eruda.init();console.log('eruda inited');",
            },
          ]
        : [],
    },
  },
})
