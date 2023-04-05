<template>
  <section class="row px-4">
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
    <div class="col-12 mb-3">
      <div class="d-flex justify-content-evenly align-content-center bg-grey mt-4 py-2">
        <button class="btn text-light" :class="{ selectedUnderline: filterCategory === '' }"
          @click="changeFilterCategory('')">All</button>
        <button class="btn text-light" :class="{ selectedUnderline: filterCategory === c.toLowerCase() }"
          v-for="c in categories" @click="changeFilterCategory(c)">{{ c }}</button>
      </div>
    </div>
    <div class="col-md-3" v-for="t in towerEvents" :key="t.id">
      <EventCard :towerEvent="t" />
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { computed } from "@vue/reactivity";
import { AppState } from '../AppState.js'
import EventCard from "../components/EventCard.vue";

export default {
  setup() {
    const filterCategory = ref('')
    async function getAllTowerEvents() {
      try {
        await towerEventsService.getAllTowerEvents();
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => getAllTowerEvents());
    return {
      filterCategory,
      categories: ['Concert', 'Convention', 'Sport', 'Digital'],
      towerEvents: computed(() => {
        if (!filterCategory.value) {
          return AppState.towerEvents
        } else { return AppState.towerEvents.filter(e => e.type == filterCategory.value) }
      }),

      changeFilterCategory(category) {
        filterCategory.value = category.toLowerCase()
      }
    };
  },
  components: { EventCard }
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
  width: 100%;
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

.selectedUnderline {
  border-bottom: 5px #79E7AB solid;
  border-radius: 0px
}
</style>
