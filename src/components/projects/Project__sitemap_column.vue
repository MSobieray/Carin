<template>
  <div>
    <div
      v-for="(page, i) in data.pages"
      :key="`${page.id}-${i}`"
      draggable
      @dragstart="dragStart($event, page.id)"
      @drop="drop($event, page.id, columnId)"
      @dragover.prevent="dragOver($event)"
      @dragleave="dragLeave($event)"
      :class="className"
    >
      <v-chip color="secondary" :label="true" text-color="primary">
        {{ page.name }}
      </v-chip>
      <sitemap-column :data="page" :columnId="columnId"></sitemap-column>
    </div>
  </div>
</template>

<script>
export default {
  name: "SitemapColumn",
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
  data: () => ({
    onMove: false
  }),
  methods: {
    dragStart(event, pageId) {
      event.stopPropagation();
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("page-id", pageId);
    },
    dragOver(event) {
      event.stopPropagation();
      event.currentTarget.classList.add("drop");
    },
    dragLeave(event) {
      event.stopPropagation();
      event.currentTarget.classList.remove("drop");
    },
    drop(event, toPageId, toColumnId) {
      event.stopPropagation();
      event.currentTarget.classList.remove("drop");
      const fromPageId = parseInt(event.dataTransfer.getData("page-id"));
      this.$store.commit("Projects/UPDATE_SITEMAP", {
        fromPageId,
        toPageId,
        toColumnId
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.page {
  min-height: 20px;

  &.parent-page {
    // width: 33%;
    height: 100vh;
    border-right: 1px solid var(--v-secondary-base);
  }

  .child-page {
    margin-left: 10px;
  }

  .sortable-ghost {
    background: red;
  }

  .drop {
    border: solid 1px var(--v-accent-base);

    span {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    &.move {
      .child-page {
        height: auto;
      }
    }
  }
}
</style>
