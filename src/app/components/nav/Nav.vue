<template>
  <div>
    <nav class="scrollbar">
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
    NavItem
  }
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
nav {
  width: 120px;
  height: 100%;
  border: 1px solid;
  direction: rtl;
}

ul {
  margin: 0;
  padding: 0;
  direction: ltr;
}
</style>
