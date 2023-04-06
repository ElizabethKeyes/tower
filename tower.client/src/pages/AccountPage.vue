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
      <section class="row justify-content-center">
        <div class="col-md-10" v-for="t in tickets" :key="t?.id">
          <div class="bg-grey mb-4 ticket-card">
            <img :src="t.event?.coverImg" :alt="t.event?.name + ' cover image'" class="ticket-img">
            <div class="mt-2 ms-2">
              <h6 class="text-light">{{ t.event?.name }}</h6>
              <h6 class="text-info">{{ t.event?.location }}</h6>
              <h6 class="text-info">{{ new Date(t.event?.startDate).toLocaleDateString() }}</h6>
              <div class="bg-dark ticket-circle"></div>
            </div>
            <button class="btn btn-danger text-black cancel-button" @click="cancelTicket(t?.id)">Cancel
              Ticket</button>
          </div>
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
      towerEvents: computed(() => AppState.towerEvents),

      async cancelTicket(ticketId) {
        try {
          if (await Pop.confirm("Are you sure you'd like to cancel your ticket?", "This action can't be undone.", "Yes, I'm sure", "warning")) {
            await ticketsService.cancelTicket(ticketId)
          }
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    };
  },
  components: { EventCard }
}
</script>

<style scoped>
.ticket-card {
  height: 25vh;
  width: 100%;
  display: flex;
  position: relative
}

.ticket-img {
  height: 100%;
  width: 40%;
  object-fit: cover;
  object-position: center;
}

.ticket-circle {
  height: 15vh;
  width: 15vh;
  border-radius: 100%;
  position: absolute;
  right: -65px;
  bottom: 43px
}

.cancel-button {
  max-height: 5vh;
  position: absolute;
  bottom: 10px;
  right: 47px;
}
</style>
