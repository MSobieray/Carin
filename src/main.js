// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import Vue from "vue";
import App from "./App";
import { auth } from "./firebase/config";
import "./plugins/vuetify";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

/* eslint-disable no-new */
auth.onAuthStateChanged(user => {
  new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
    async beforeCreate() {
      if (user) {
        try {
          this.$store.commit("Auth/LOGIN", user);
          this.$store.dispatch("loading", true);
          this.$store.dispatch("Auth/createUser", user);
        } catch (err) {
          console.log(err);
        }
      } else {
        router.push("/login");
      }
    }
  });
});
