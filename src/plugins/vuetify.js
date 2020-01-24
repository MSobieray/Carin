import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.blueGrey.lighten1,
        secondary: colors.blueGrey.lighten5,
        accent: colors.lightGreen.base,
        error: colors.red.darken4,
        disabled: colors.grey.darken2,
        alert: colors.red.accent1
      }
    }
  },
  icons: {
    iconfont: "md"
  }
});
