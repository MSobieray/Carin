<template>
  <main>
    <v-navigation-drawer
      app
      stateless
      clipped
      right
      fixed
      value="true"
      v-if="projectData"
      v-model="sidebar"
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Overview</v-list-tile-title>
        </v-list-tile>

        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>Development</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content
              >Repository URL:
              {{ projectData.development.repo.url }}</v-list-tile-content
            >
          </v-list-tile>
        </v-list-group>

        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>Tech Stack</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title
                v-text="
                  `Front-End: ${projectData.development.techStack.front_end}`
                "
              ></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title
                v-text="
                  `Back-End: ${projectData.development.techStack.back_end}`
                "
              ></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
      <v-btn round flat color="accent" @click="edit">Edit</v-btn>
    </v-navigation-drawer>
    <h1 v-if="projectData" class="display-2">{{ projectData.title }}</h1>
    <site-map
      v-if="projectData && projectData.pages"
      :pages="projectData.pages"
    ></site-map>
    <h1 v-else>No Sitemap</h1>
  </main>
</template>

<script>
import siteMap from "./Project__sitemap.vue";
export default {
  props: ["projectData"],
  components: {
    "site-map": siteMap
  },
  data: () => ({
    sidebar: false
  }),
  methods: {
    edit() {
      this.sidebar = !this.sidebar;
      this.$store.commit("Projects/SHOW_STEPPER", true);
      this.$router.push({ name: "Project" });
    }
  }
};
</script>
