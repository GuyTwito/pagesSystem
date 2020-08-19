<template>
  <div>
    ReactWrapper<br /><br />
    <component v-bind:is="currentPageFixed" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import pagesManage from "../pages";

@Component({
  components: pagesManage,
})
export default class ReactWrapper extends Vue {
  @Prop() readonly currentPage!: string;
  @Prop() readonly notFoundPage!: string;
  @Prop() readonly homePage!: string;

  get currentPageFixed() {
    const pageName = this.currentPage.toLowerCase();
    if(pageName === "")
      return this.homePage
    if (Object.keys(pagesManage).map((page) => page.toLowerCase()).indexOf(pageName) !== -1)
      return pageName;
    return this.notFoundPage;
  }
}
</script>

<style scoped lang="less"></style>
