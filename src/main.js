// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from "vue";
import App from "./App";
import { auth } from "./firebase/config";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

/* eslint-disable no-new */
auth.onAuthStateChanged(user => {
  new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
    vuetify,

    beforeCreate() {
      if (user) {
        try {
          this.$store.commit("Auth/LOGIN", user);
          this.$store.dispatch("loading", true);
          this.$store.dispatch("Auth/createUser", user);
          this.$store.dispatch("Sidebar/set", { type: "main" }, { root: true });
        } catch (err) {
          console.log(err);
        }
      } else {
        router.push("/login");
      }
    }
  });
});
