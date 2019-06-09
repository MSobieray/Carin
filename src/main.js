// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";
import App from "./App";
import { auth } from "./firebase/config";
import "./plugins/vuetify";
import router from "./router";
import store from "./store";

Vue.use(Vuetify, {
  theme: {
    primary: colors.blueGrey.lighten1,
    secondary: colors.blueGrey.lighten5,
    accent: colors.lightGreen.base,
    error: colors.red.darken4,
    disabled: colors.grey.darken2,
    alert: colors.red.accent1
  },
  options: {
    customProperties: true
  },
  iconfont: "md"
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
auth.onAuthStateChanged(user => {
  new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
    async created() {
      if (user) {
        try {
          await this.$store.commit("Auth/LOGIN", user);
          this.$store.dispatch("Teams/getCurrentTeam");
          this.$store.dispatch("Teams/getTeams");
        } catch (err) {
          console.log(err);
        }
      } else {
        router.push("/login");
      }
    }
  });
});
