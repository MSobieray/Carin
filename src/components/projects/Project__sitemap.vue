<template>
  <v-container grid-list-xl>
    <v-layout>
      <v-btn
        color="accent"
        absolute
        right
        :disabled="!sitemapUpdated"
        @click="savePages"
      >
        save
        <v-icon right>save</v-icon>
      </v-btn>
      <sitemap-column
        v-for="page in pages"
        :key="page.column"
        :columnId="page.column"
        :data="page"
      />
    </v-layout>
  </v-container>
</template>

<script>
import SitemapColumn from "./Project__sitemap_column.vue";
export default {
  name: "sitemap-container",
  props: {
    pages: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data: () => ({
    sitemapUpdated: false
  }),
  components: {
    "sitemap-column": SitemapColumn
  },
  watch: {
    pages: {
      handler() {
        this.sitemapUpdated = true;
      },
      deep: true
    }
  },
  methods: {
    savePages() {
      this.$store
        .dispatch("Projects/addPage", {
          projectId: this.$route.params.projectID,
          pages: this.pages
        })
        .then(() => (this.sitemapUpdated = false));
    }
  }
  // data: () => ({
  //   pages: [
  //     {
  //       id: 4,
  //       pages: [
  //         {
  //           name: "Latest Home",
  //           pages: [
  //             {
  //               id: 2,
  //               name: "Child of Home",
  //               pages: [
  //                 {
  //                   id: 33,
  //                   name: "Child of home home",
  //                   pages: []
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       id: 2,
  //       pages: [
  //         {
  //           name: "About",
  //           pages: [
  //             {
  //               id: 3,
  //               name: "Child of About",
  //               pages: [
  //                 {
  //                   id: 5,
  //                   name: "Child of Child of About",
  //                   pages: []
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       id: 43,
  //       pages: [
  //         {
  //           name: "Projects",
  //           pages: [
  //             {
  //               id: 3,
  //               name: "Child of Project",
  //               pages: [
  //                 {
  //                   id: 5,
  //                   name: "Child of Child of Project",
  //                   pages: []
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // })
};
</script>

<style lang="stylus" scoped></style>
