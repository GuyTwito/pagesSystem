<template>
  <div class="wrapper">
    <component v-bind:is="currentPageFixed" class="component" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import pagesManage from "../pages";

@Component({
  components: pagesManage
})
export default class PageWrapper extends Vue {
  @Prop() readonly currentPage!: string;
  @Prop() readonly notFoundPage!: string;
  @Prop() readonly homePage!: string;

  get currentPageFixed() {
    const pageName = this.currentPage.toLowerCase();
    if (pageName === "/") return this.homePage.toLowerCase();
    if (
      Object.keys(pagesManage)
        .map(page => page.toLowerCase())
        .indexOf(pageName) !== -1
    )
      return pageName;
    return this.notFoundPage.toLowerCase();
  }
}
</script>

<style scoped lang="less">
.wrapper {
  overflow: hidden;
  width: 100%;
}

.component {
  overflow: hidden;
  display: flex;
  height: 100%;
}
</style>
