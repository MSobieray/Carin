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
        <v-list-item>
          <v-list-item-action>
            <v-icon>info</v-icon>
          </v-list-item-action>
          <v-list-item-title>Overview</v-list-item-title>
        </v-list-item>

        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>Development</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content
              >Repository URL:
              {{ projectData.development.repo.url }}</v-list-item-content
            >
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>Tech Stack</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                v-text="
                  `Front-End: ${projectData.development.techStack.front_end}`
                "
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                v-text="
                  `Back-End: ${projectData.development.techStack.back_end}`
                "
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-btn rounded text color="accent" @click="edit">Edit</v-btn>
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
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn color="accent" dark v-on="on">
                Save
              </v-btn>
            </template>
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="createPage(index)"
                >
                  {{ item.title }}
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
          <!-- <v-btn color="accent" flat @click="createPage()">Add Page</v-btn> -->
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
    column: 0,
    value: true,
    items: [{ title: "Save" }, { title: "Save & Close" }, { title: "Cancel" }]
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
    closeModal() {
      this.modal = false;
    },
    createPage(index) {
      if (index === 0 || index === 1) {
        this.$store.dispatch("Projects/createPage", {
          projectId: this.$route.params.projectID,
          column: this.column,
          page: {
            // id: incremented by firebase
            name: this.pageName,
            pages: []
          }
        });
        if (index === 1) {
          this.closeModal();
        }
      } else {
        this.closeModal();
      }
      this.pageName = "";
    }
  }
};
</script>
