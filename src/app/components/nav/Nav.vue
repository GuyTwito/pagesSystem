<template>
  <div>
    <nav>
      <ul>
        <NavItem
          v-for="(link, i) in this.links"
          :key="i"
          :link="link.link"
          :name="link.name"
          :isChosen="isChosen(link.link)"
          @choosePage="choosePage"
        />
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavItem from "./NavItem.vue";

@Component({
  components: {
    NavItem,
  },
})
export default class Nav extends Vue {
  @Prop({ default: [] }) readonly links!: Array<{ link: string; name: string }>;
  @Prop({ default: "" }) readonly currentPage!: string;
  
  isChosen(link: string): boolean {
    return link === this.currentPage;
  }

  choosePage(link: string) {
    if (this.currentPage === link) return;
    this.$emit("choosePage", link);
  }
}
</script>

<style scoped lang="less">
.scrollbar {
  float: left;
  height: 30px;
  background: #f5f5f5;
  overflow-y: scroll;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #a19696;
  border: 2px solid #555555;
}

nav {
  .scrollbar;
  width: 120px;
  height: 100%;
  border: 1px solid;
  overflow: scroll;
  direction: rtl;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
