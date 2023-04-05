<template>
  <section class="row">
    <div class="col-12">
      <div class="d-flex justify-content-center">
        <img src="../assets/img/seats.png" alt="" class="seats-pic">
        <div class="overlay-text text-light">
          <p>Get ahead of the scalpers.</p>
          <p>Reserve your seat now with</p>
          <p>real events for real people.</p>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="d-flex justify-content-evenly align-content-center bg-grey mt-4">
        <p class="mb-0 py-2">All</p>
        <p class="mb-0 py-2">Concert</p>
        <p class="mb-0 py-2">Convention</p>
        <p class="mb-0 py-2">Sport</p>
        <p class="mb-0 py-2">Digital</p>
      </div>
    </div>
    <div class="col-3">

    </div>
  </section>
</template>

<script>
import { onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export default {
  setup() {
    async function getAllTowerEvents() {
      try {
        await towerEventsService.getAllTowerEvents()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => getAllTowerEvents())
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.seats-pic {
  width: 95%;
  height: 30vh;
  margin-top: 2em;
  border: solid 2px #56C7FB;
  position: relative
}

.overlay-text {
  position: absolute;
  top: 156px;
  left: 69px;
  font-size: 18px;
  text-shadow: black 1px 1px 3px;
}
</style>
