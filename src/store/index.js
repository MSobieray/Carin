// STORE INDEX
import Vue from "vue";
import Vuex from "vuex";

import Auth from "./modules/auth";
import Global from "./global";
import Notifications from "./modules/notifications";
import Projects from "./modules/projects";
import Teams from "./modules/teams";

Vue.use(Vuex);

const store = new Vuex.Store({
  ...Global,
  modules: {
    // Firebase,
    Auth,
    Projects,
    Teams,
    Notifications
  }
});

export default store;
