<template>
  <v-container grid-list-xl>
    <v-layout>
      <v-btn
        color="accent"
        absolute
        right
        :disabled="!sitemapUpdated"
        @click="saveSitemap"
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
    saveSitemap() {
      this.$store
        .dispatch("Projects/updateSitemap", {
          projectId: this.$route.params.projectID,
          pages: this.pages
        })
        .then(() => (this.sitemapUpdated = false));
    }
  }
};
</script>

<style lang="scss" scoped></style>
