<template>
  <!-- REPLACING Draggable with native Drag and Drop API -->
  <!-- <draggable
    :list="data.pages"
    :options="{ group: 'pages', animation: '500' }"
    @start="move"
    @end="endDrag"
    element="div"
    :class="className"
  > -->
  <div>
    <div
      v-for="(page, i) in data.pages"
      :key="`${page.id}-${i}`"
      draggable="true"
      @dragstart="move(index, $event)"
      @dragend="move(index, $event)"
    >
      <v-chip color="secondary" :label="true" text-color="primary">
        {{ page.name }}
      </v-chip>
      <sitemap-column :data="page"></sitemap-column>
    </div>
  </div>
  <!-- </draggable> -->
</template>

<script>
// import draggable from "vuedraggable";
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
    }
  },
  // components: {
  //   draggable
  // },
  data: () => ({
    onMove: false
  }),
  methods: {
    // Emit move event so all components can show a dropzone area.

    move(i, event) {
      // console.log({ this: this, item: evt.item, from: evt.from, to: evt.to })
      console.log(i, event);
      this.onMove = true;
    },
    endDrag() {
      this.onMove = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.page {
  min-height: 20px;

  &.parent-page {
    width: 33%;
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

    .child-page {
      height: 20vh;
    }

    &.move {
      .child-page {
        height: auto;
      }
    }
  }
}
</style>
