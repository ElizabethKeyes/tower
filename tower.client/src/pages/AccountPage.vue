<template>
  <section class="row px-4">
    <div class="col-12">
      <div class="d-flex">
        <h4 class="text-success mt-5">My Events</h4>
        <button class="btn btn-success text-black w-25 h-50 mt-5 ms-3 mb-3" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapseMyEvents" aria-expanded="false" aria-controls="collapseMyEvents">
          Expand/Collapse Events
        </button>
        <button class="btn btn-info h-50 mt-5 ms-3" data-bs-toggle="modal" data-bs-target="#editAccountModal">Edit
          Account</button>
      </div>
      <section class="row">
        <div class="collapse show" id="collapseMyEvents">
          <div class="row">
            <div class="col-md-3" v-for="t in myTowerEvents" :key="t.id">
              <EventCard :towerEvent="t" />
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="col-12">
      <h4 class="text-success mt-5">Upcoming Events</h4>
      <section class="row justify-content-center mt-4">
        <div class="col-md-10" v-for="t in tickets" :key="t?.id">
          <div class="bg-grey mb-4 ticket-card">
            <router-link v-if="tickets" :to="{ name: 'EventDetails', params: { towerEventId: t.event?.id } }"
              class="my-link">
              <img :src="t.event?.coverImg" :alt="t.event?.name + ' cover image'" class="ticket-img">
            </router-link>
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
  <Modal id="editAccountModal">
    <template #modalFormContent>
      <EditAccountForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { ticketsService } from "../services/TicketsService.js"
import EventCard from "../components/EventCard.vue"
import { towerEventsService } from "../services/TowerEventsService.js"
import Modal from "../components/Modal.vue"
import EditAccountForm from "../components/EditAccountForm.vue"

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
      myTowerEvents: computed(() => AppState.towerEvents.filter(t => t.creatorId == AppState.account.id)),

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
  components: { EventCard, Modal, EditAccountForm }
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
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.my-link {
  width: 40%;
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
