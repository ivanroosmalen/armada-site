module.exports = {
  devServer: {
    proxy: 'http://localhost:3000'
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/colors.scss";
          @import "@/assets/styles/mixins.scss";
        `
      }
    }
  }
}
