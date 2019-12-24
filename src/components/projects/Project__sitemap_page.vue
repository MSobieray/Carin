<template>
  <div>
    <div
      v-for="(page, index) in data.pages"
      :key="`${page.id}-${index}`"
      draggable
      @dragstart="dragStart($event, page.id)"
      @drop="drop($event, page.id, index)"
      @dragover.prevent="dragOver($event)"
      @dragleave="dragLeave($event)"
      :class="className"
    >
      <v-chip
        @click="updateSidebar(page)"
        color="secondary"
        :label="true"
        text-color="primary"
      >
        {{ page.name }}
      </v-chip>
      <sitemap-page :data="page" :columnId="columnId"></sitemap-page>
    </div>
  </div>
</template>

<script>
export default {
  name: "sitemap-page",
  props: {
    data: {
      type: Object,
      required: true
    },
    className: {
      type: String,
      required: false,
      default: "page child-page"
    },
    columnId: {
      type: Number
    }
  },
  methods: {
    dragStart(event, pageId) {
      event.stopPropagation();
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData(
        "page",
        JSON.stringify(this.$store.getters["Projects/findPage"](pageId))
      );
    },
    dragOver(event) {
      event.stopPropagation();
      event.currentTarget.classList.add("drop");
    },
    dragLeave(event) {
      event.stopPropagation();
      event.currentTarget.classList.remove("drop");
    },
    drop(event, toPageId, toPageIndex) {
      event.stopPropagation();
      event.currentTarget.classList.remove("drop");

      const pageMoved = JSON.parse(event.dataTransfer.getData("page"));
      // TODO: create a mutation to remove the page
      // the mutaiton should return a promise
      // once the page is removed then run the add page mutation

      // this.$store.commit("Projects/REMOVE_PAGE", {
      //   fromPageId: pageMoved.id,
      //   toPageId
      // });

      this.$store.commit("Projects/UPDATE_SITEMAP", {
        movedPage: pageMoved,
        toPageId,
        toPageIndex
      });
    },
    updateSidebar(page) {
      this.$store.commit("Sidebar/TOGGLE", true);
      this.$store.commit(
        "Sidebar/UPDATE",
        Object.assign(page, { type: "page" })
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
.page {
  min-height: 20px;

  .child-page {
    margin-left: 10px;
  }
}

.drop {
  border: solid 1px var(--v-accent-base);

  span {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
