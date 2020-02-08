// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from "vue";
import App from "@/components/layout/App";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import { checkAuthStatus } from "@/util";

Vue.config.productionTip = false;
checkAuthStatus().then(() => {
  new Vue({
    el: "#app",
    store,
    router,
    vuetify,
    render: h => h(App)
  });
});
