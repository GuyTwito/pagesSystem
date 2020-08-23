<template>
  <div id="app">
    <Nav :links="links" :currentPage="routerPath" @choosePage="choosePage" />
    <PageWrapper :currentPage="routerPath" notFoundPage="notFound" homePage="Home" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "./router";

import { Nav, PageWrapper } from "./app/components";
import pages, { AdditionalAttributes, homePage } from "./app/pages";

@Component({
  components: {
    Nav,
    PageWrapper
  }
})
export default class App extends Vue {
  private routerPath: string =
    window.location.pathname === process.env.BASE_URL
      ? process.env.BASE_URL
      : // take the first element in the path
        window.location.pathname
          .split(process.env.BASE_URL || "/")[1]
          .split("/")[0]
          .toLowerCase();

  get links() {
    const attrs = (pageLink: string) =>
      pageLink in AdditionalAttributes ? AdditionalAttributes[pageLink] : {};
    return Object.keys(pages)
      .filter(pageLink => !attrs(pageLink).hidden)
      .map(pageLink => {
        return {
          link: homePage === pageLink ? "/" : pageLink,
          name: "name" in attrs(pageLink) ? attrs(pageLink).name : pageLink
        };
      });
  }

  choosePage(link: string) {
    this.routerPath = link;
    router.replace(link);
  }
}
</script>

<style lang="less">
.scrollbar {
  float: left;
  height: 30px;
  background: #f5f5f5;
  overflow: auto;
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

#app {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
