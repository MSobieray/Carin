// STORE INDEX
import Vue from "vue";
import Vuex from "vuex";

import Auth from "./modules/auth";
import Projects from "./modules/projects";
import Teams from "./modules/teams";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // Firebase,
    Auth,
    Projects,
    Teams
  }
});

export default store;
