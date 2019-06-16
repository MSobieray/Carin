import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/es5/util/colors";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  theme: {
    primary: colors.blueGrey.lighten1,
    secondary: colors.blueGrey.lighten5,
    accent: colors.lightGreen.base,
    error: colors.red.darken4,
    disabled: colors.grey.darken2,
    alert: colors.red.accent1
  },
  iconfont: "md"
});
