<template>
  <div class="event-card" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">
  </div>
</template>


<script>
import { TowerEvent } from "../models/TowerEvent.js";

export default {
  props: {
    towerEvent: {
      type: TowerEvent,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.event-card {
  height: 25vh;
  margin-top: .5em;
  margin-bottom: .5em;
  background-position: center;
  background-size: cover;
  ;
}
</style>