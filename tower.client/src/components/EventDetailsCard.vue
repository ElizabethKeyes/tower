<template>
  <div class="overflow">
    <div class="tower-event-card"
      :style="{ backgroundImage: `url(${towerEvent?.coverImg})`, backgroundPosition: 'center' }">
      <section class="row blur">
        <div class="col-5 d-flex align-items-center">
          <img :src="towerEvent?.coverImg" :alt="'cover photo for' + towerEvent?.name" class="featured-pic">
        </div>
        <div class="col-7 card-content">
          <div>
            <div class="d-flex justify-content-between">
              <div>
                <h5>{{ towerEvent?.name }}</h5>
                <h6 class="text-info">{{ towerEvent?.location }}</h6>
              </div>
              <div>
                <h6 class="text-info">{{ new Date(towerEvent?.startDate).toLocaleDateString() }}</h6>
              </div>
            </div>
            <p class="mt-2">{{ towerEvent?.description }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <h5><span class="text-primary fw-bold">{{ towerEvent?.capacity }}</span> Spots Left</h5>
            <button class="btn btn-warning attend-button">Attend <img src="../assets/img/personIcon.svg" height="20"
                alt="person icon"></button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { TowerEvent } from "../models/TowerEvent.js";
import { AppState } from "../AppState.js";

export default {
  setup() {
    return {
      towerEvent: computed(() => AppState.towerEvent)
    }
  }
}
</script>


<style lang="scss" scoped>
.tower-event-card {
  height: 50vh;
  margin-top: 2em;
  background-size: 125%;
}

.blur {
  height: 50vh;
  margin-top: 2em;
  background-color: #246D8E99;
  backdrop-filter: blur(6px);
  padding-top: 2em;
  padding-bottom: 2em;
}

.featured-pic {
  object-fit: cover;
  object-position: center;
  height: 100%;
  width: 100%;
  border: 2px solid #CCF3FD66;
  margin-left: 1em;
}

.overflow {
  overflow: hidden;
}

.card-content {
  color: #e9ecef;
  padding-left: 1em;
  padding-right: 1.75em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.attend-button {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 9vw;

}
</style>

d-flex align-items-center