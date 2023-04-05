<template>
  <h1>Welcome to the event details page</h1>
  <h1>Selected Event {{ towerEvent?.name }}</h1>
</template>


<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";

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
  }
}
</script>


<style lang="scss" scoped></style>