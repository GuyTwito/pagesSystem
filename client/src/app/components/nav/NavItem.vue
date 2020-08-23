<template>
  <div>
    <li :class="isChosen ? 'chosen' : ''" class="navItem" @click="choosePage(link)">{{ name }}</li>
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
  &:hover {
    background-color: #acacac;
  }
}

.chosen {
  background-color: #dc143c;
}

.navItem {
  padding: 5px;
  margin: 4px;
  border-radius: 30px;
  box-shadow: 1px 2px #888888;
}
</style>
