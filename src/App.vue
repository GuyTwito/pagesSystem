<template>
  <div id="app">
      <page-wrapper/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageWrapper from "./app/components/PageWrapper.vue";

@Component({
    components: {
        'page-wrapper': PageWrapper
    }
})
export default class App extends Vue {}
</script>

<style>
</style>