<template>
  <div class="event-card" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">
    <div class="event-content">
      <h6 class="mb-0">{{ towerEvent.name }}</h6>
      <p class="mb-0">{{ towerEvent.location }}</p>
      <p class="mb-0">{{ new Date(towerEvent.startDate).toLocaleDateString() }}</p>
      <p class="text-end">{{ towerEvent.capacity }} spots left</p>
    </div>
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
  height: 30vh;
  margin-top: .5em;
  margin-bottom: .5em;
  background-position: center;
  background-size: cover;
  border-radius: 3px;
  border: solid 4px #474C61;
  display: flex;
  align-items: end
}

.event-content {
  color: white;
  backdrop-filter: blur(5px);
  height: 40%;
  width: 100%;
  padding-left: .3em;
  padding-right: .3em;
  text-shadow: 1px 1px 2px black;
}
</style>