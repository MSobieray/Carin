<template>
  <main>
    <!-- TODO: move into the contextual sidebar -->
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
    <!-- TODO: Add visual queue to add a page when no pages are present -->
    <v-btn fab color="accent" fixed bottom right @click="openModal">
      <v-icon>add</v-icon>
    </v-btn>

    <!-- TODO: Create A modal Component with a SLOT -->
    <v-dialog
      v-model="modal"
      max-width="1000"
      lazy
      transition="slide-y-reverse-transition"
    >
      <v-card>
        <v-card-title class="headline" primary-title>Add New Page</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-select
                  :items="columns"
                  v-model="column"
                  label="Parent Page"
                ></v-select>
                <v-text-field
                  label="Page Name"
                  required
                  v-model="pageName"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" flat @click="createPage()">Add Page</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import siteMap from "./Project__sitemap.vue";
export default {
  name: "ProjectOverview",
  props: {
    projectData: {
      type: Object
    }
  },
  components: {
    "site-map": siteMap
  },
  data: () => ({
    sidebar: false,
    modal: false,
    pageName: "",
    column: 0
  }),
  computed: {
    columns() {
      const columns = this.projectData.pages.map(page => {
        return { text: page.pages[0].name, value: page.column };
      });
      columns.push({ text: "Create New Column", value: columns.length });
      return columns;
    }
  },
  methods: {
    edit() {
      this.sidebar = !this.sidebar;
      this.$store.commit("Projects/SHOW_STEPPER", true);
      this.$router.push({ name: "Project" });
    },
    openModal() {
      this.modal = true;
    },
    createPage() {
      this.$store.dispatch("Projects/createPage", {
        projectId: this.$route.params.projectID,
        column: this.column,
        page: {
          // id: incremented by firebase
          name: this.pageName,
          pages: []
        }
      });
      this.pageName = "";
    }
  }
};
</script>
