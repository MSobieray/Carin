<template>
  <v-list>
    <v-list-item-group v-if="!editable">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ page.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon @click="edit">edit</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list-item-group>
    <v-list-item-group v-else>
      <v-list-item>
        <v-list-item-content>
          <v-text-field
            v-if="editable"
            v-model="pageName"
            :placeholder="page.name"
          >
          </v-text-field>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon @click="save">save</v-icon>
        </v-list-item-icon>
        <v-list-item-icon>
          <v-icon @click="edit">cancel</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "pageData",
  data() {
    return {
      pageName: "",
      editable: false
    };
  },
  computed: {
    ...mapState("Sidebar", ["page"])
  },
  methods: {
    edit() {
      this.editable = !this.editable;
    },
    save() {
      this.$store.commit("Projects/EDIT_PAGE", {
        ...this.page,
        name: this.pageName
      });
      this.$store.commit("Sidebar/UPDATE_PAGE", {
        ...this.page,
        name: this.pageName
      });
      this.pageName = "";
      this.edit();

      // Todo - Save The Sitemap
    }
  }
};
</script>

<style lang="scss" scoped></style>
