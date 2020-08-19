<template>
  <div>
    <li :class="isChosen ? 'chosen' : ''" @click="choosePage(link)">
      {{ name }}
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NavItem extends Vue {
  @Prop({ default: false }) readonly link!: string;
  @Prop({ default: false }) readonly name!: string;
  @Prop({ default: false }) readonly isChosen!: boolean;

  choosePage(link: string) {
    this.$emit("choosePage", this.link);
  }
}
</script>

<style scoped lang="less">
li {
  border: 1px solid;
}

.chosen {
  background-color: #ff0000;
}
</style>
