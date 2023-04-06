<template>
  <section class="row">
    <div class="col-12">
      <h2 class="text-success mt-3">My Events</h2>
      <section class="row">
        <div class="col-md-3" v-for="t in towerEvents" :key="t.id">
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
      towerEvents: computed(() => AppState.tickets)
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
