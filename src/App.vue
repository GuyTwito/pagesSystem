<template>
  <div id="app">
    <Nav :links=links :currentPage=routerPath @choosePage="choosePage"/>
    <ReactWrapper :currentPage=routerPath notFoundPage="notFound" homePage="Home" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import router from "./router";

import { Nav, ReactWrapper } from "./app/components";
import pages, {AdditionalAttributes} from "./app/pages";

@Component({
  components: {
    Nav,
    ReactWrapper,
  },
})
export default class App extends Vue {
    // take the first element in the path
    private routerPath : string = window.location.pathname === process.env.BASE_URL ?
        process.env.BASE_URL
        :
        window.location.pathname.split(process.env.BASE_URL)[1].split('/')[0].toLowerCase();

    get links(){
        const attrs = (pageLink : string) => pageLink in AdditionalAttributes ?
                        AdditionalAttributes[pageLink]
                        :
                        {}
        return Object.keys(pages)
                    .filter((pageLink) => !attrs(pageLink).hide)
                    .map((pageLink) => {
                        return {
                            link: "link" in attrs(pageLink) ? 
                                    attrs(pageLink).link
                                    :
                                    pageLink,
                            name:  "name" in attrs(pageLink) ? 
                                    attrs(pageLink).name
                                    :
                                    pageLink
                        }
                    })
    }

    choosePage (link : string) {
        this.routerPath = link;
        router.replace(link)
    }
}
</script>

<style scoped lang="less">

#app { 
  position: fixed; 
  display: flex;
  height: 100%;
}

</style>