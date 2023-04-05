<template>
  <section class="row px-4">
    <div class="col-12">
      <EventDetailsCard />
      <p class="text-secondary mt-3">See who is attending</p>
      <AttendeesComponent />
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
import EventDetailsCard from '../components/EventDetailsCard.vue';
import { ticketsService } from '../services/TicketsService.js'
import AttendeesComponent from "../components/AttendeesComponent.vue";

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

    async function getTowerEventAttendees() {
      try {
        const towerEventId = route.params.towerEventId
        await ticketsService.getTowerEventAttendees(towerEventId)
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getTowerEventById(),
        getTowerEventAttendees()
    })
    return {
      towerEvent: computed(() => AppState.towerEvent)
    }
  },
  components: { EventDetailsCard, AttendeesComponent }
}
</script>


<style lang="scss" scoped></style>