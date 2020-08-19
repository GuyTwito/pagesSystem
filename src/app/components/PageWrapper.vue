<template>
    <div>
        START
        <br /><br />
        Card:
        <Card>I am a React Card</Card>
        <br />
        Search:
        <Hello text="dugri" />
        <br />
        END
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import {ReactInVue} from "vuera"

import HelloReact from "../pages/Hello"
const Hello = ReactInVue(HelloReact)

import CardReact from '@material-ui/core/Card'
const Card = ReactInVue(CardReact)


@Component({
  components: {
    Hello,
    Card
  }
})
export default class PageWrapper extends Vue {
}
</script>

<style scoped lang="less">


</style>