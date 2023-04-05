<template>
  <section class="row px-4">
    <div class="col-12">
      <EventDetailsCard />
    </div>
  </section>
</template>


<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import EventDetailsCard from '../components/EventDetailsCard.vue'

export default {
  setup() {
    const route = useRoute()
    async function getTowerEventById() {
      try {
        const towerEventId = route.params.towerEventId
        await towerEventsService.getTowerEventById(towerEventId)
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getTowerEventById()
    })
    return {
      towerEvent: computed(() => AppState.towerEvent)
    }
  },
  components: { EventDetailsCard }
}
</script>


<style lang="scss" scoped></style>