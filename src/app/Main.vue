<template>
  <div id="app">
      <ReactWrapper :currentPage=routerPath notFoundPage="notFound" homePage="home" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ReactWrapper from "./components/ReactWrapper.vue";

@Component({
  components: {
    ReactWrapper,
  },
})
export default class Main extends Vue {

    get routerPath(){
        // take the first element in the path
        return window.location.pathname.split(process.env.BASE_URL)[1].split('/')[0].toLowerCase();
    }
}
</script>
