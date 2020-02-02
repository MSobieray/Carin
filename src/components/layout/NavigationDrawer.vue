<template>
  <v-navigation-drawer v-model="drawerProp" width="80%" app>
    <!-- TODO: Only Show the tabs if inside of a project else just use main sidebar -->

    <template slot="prepend">
      <v-tabs
        v-model="tab"
        show-arrows
        center-active
        slider-size="1"
        centered
        grow
        background-color="primary"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-1" @click="changeSidebar('main')">Main</v-tab>
        <v-tab href="#tab-2" @click="changeSidebar('project')"
          >Project Info</v-tab
        >
        <v-tab v-if="page" href="#tab-3" @click="changeSidebar('page')"
          >Page Info</v-tab
        >
      </v-tabs>
    </template>
    <template slot="default">
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
          <component :is="`sidebar-${type}`" :user="user" />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import SidebarMain from "@/components/sidebars/Sidebar_main";
import SidebarLogin from "@/components/sidebars/Sidebar_login";
import SidebarPage from "@/components/sidebars/Sidebar_page";
import SidebarProject from "@/components/sidebars/Sidebar_project";
export default {
  name: "NavigationDrawer",
  props: {
    user: {
      type: [Object, Boolean]
    },
    drawer: {
      // vuetify requires default to be null
      required: true
    }
  },
  data() {
    return {
      tab: null
    };
  },
  components: {
    SidebarMain,
    SidebarLogin,
    SidebarPage,
    SidebarProject
  },
  computed: {
    ...mapState("Sidebar", ["type", "page"]),
    drawerProp: {
      get() {
        return this.drawer;
      },
      set(val) {
        if (val !== this.drawer) {
          this.$emit("toggleDrawer", val);
        }
      }
    },
    displayTabs() {
      return this.$router.name === "ProjectOverview";
    }
  },
  methods: {
    changeSidebar(sidebar) {
      this.$store.dispatch("Sidebar/set", { type: sidebar });
    }
  },
  watch: {
    type(val) {
      this.sidebar = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  max-width: 400px;
}
</style>
