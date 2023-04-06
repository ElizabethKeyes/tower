<template>
  <section class="row px-4">
    <div class="col-12">
      <h4 class="text-success mt-5">My Events</h4>
      <section class="row">
        <div class="col-md-3" v-for="t in towerEvents" :key="t.id">
          <EventCard :towerEvent="t" />
        </div>
      </section>
    </div>
    <div class="col-12">
      <h4 class="text-success mt-5">Upcoming Events</h4>
      <section class="row">
        <div class="col-md-3" v-for="t in tickets" :key="t.id">
          <EventCard :towerEvent="t.event" />
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { ticketsService } from "../services/TicketsService.js"
import EventCard from "../components/EventCard.vue"
import { towerEventsService } from "../services/TowerEventsService.js"
export default {
  setup() {
    async function getTicketsByAccountId() {
      try {
        await ticketsService.getTicketsByAccountId();
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }

    onMounted(() => {
      getTicketsByAccountId();
    });
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      towerEvents: computed(() => AppState.towerEvents)
    };
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
