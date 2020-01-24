<template>
  <div class="column">
    <sitemap-page
      :data="data"
      :columnId="columnId"
      :className="'page parent-page'"
    />
  </div>
</template>

<script>
import sitemapPage from "./Project__sitemap_page";
export default {
  name: "SitemapColumn",
  props: {
    data: {
      type: Object,
      required: true
    },
    columnId: {
      type: Number
    }
  },
  components: {
    sitemapPage
  }
};
</script>

<style lang="scss" scoped>
.column {
  padding: 0px 20px;
  border-right: 1px solid white;
  height: calc(100vh - 200px);
}
</style>
