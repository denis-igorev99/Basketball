const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  pages: {
    index: {
      entry: "./src/index.ts",
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/shared/assets/scss/index.scss";`
      }
    }
  },
  publicPath: "/",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
  transpileDependencies: false,
});
