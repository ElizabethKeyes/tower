<template>
  <router-link v-if="towerEvent" :to="{ name: 'EventDetails', params: { towerEventId: towerEvent?.id } }">
    <div class="event-card" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }" role="link to event details">
      <div class="event-content" :class="{ capacityBorder: towerEvent.capacity <= 20 && towerEvent.capacity != 0 }">
        <div>
          <h6 class="mb-0">{{ towerEvent.name }}</h6>
          <p class="mb-0">{{ towerEvent.location }}</p>
          <p class="mb-0">{{ new Date(towerEvent.startDate).toLocaleDateString() }}</p>
        </div>
        <div>
          <p class="text-end mb-1" v-if="towerEvent.capacity > 0 && towerEvent.isCanceled == false"><span
              class="blue-text">{{
                towerEvent.capacity }}</span> spots
            left</p>
          <p class="red-message" v-else-if="towerEvent.capacity == 0 && towerEvent.isCanceled == false">Sold Out</p>
          <p class="red-message" v-else-if="towerEvent.isCanceled == true">Canceled</p>
        </div>
      </div>
    </div>
  </router-link>
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
  height: 35vh;
  margin-top: .5em;
  margin-bottom: .5em;
  background-position: center;
  background-size: cover;
  border-radius: 3px;
  border: solid 4px #474C61;
  display: flex;
  align-items: end
}

.event-card:hover {
  cursor: pointer;
  transform: scale(1.03);
}

.event-content {
  color: white;
  backdrop-filter: blur(5px);
  height: 45%;
  width: 100%;
  padding-left: .3em;
  padding-right: .3em;
  text-shadow: 1px 1px 2px black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.capacityBorder {
  border: 2px solid #56C7FB;
}

.blue-text {
  color: #56C7FB;
  font-weight: bold
}

.red-message {
  text-shadow: 0px 0px 0px;
  background-color: #FF5977;
  color: black;
  text-align: center;
  font-weight: bold;
  margin-bottom: 4px
}
</style>