<template>
  <div class="overflow">
    <div class="tower-event-card"
      :style="{ backgroundImage: `url(${towerEvent?.coverImg})`, backgroundPosition: 'center' }">
      <section class="row blur">
        <div class="col-md-5 d-flex align-items-center">
          <img :src="towerEvent?.coverImg" :alt="'cover photo for' + towerEvent?.name" class="featured-pic">
        </div>
        <div class="col-md-7 card-content">
          <div>
            <div class="d-flex justify-content-between">
              <div>
                <h5>{{ towerEvent?.name }}</h5>
                <h6 class="text-info">{{ towerEvent?.location }}</h6>
              </div>
              <div>

                <div v-if="towerEvent?.creatorId == account.id && towerEvent?.isCanceled == false"
                  class="dropdown d-flex justify-content-end ">
                  <button class="btn dropdown-toggle text-light p-0 my-dropdown" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    ...
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li @click="cancelEvent()" class="no-text-shadow selectable">
                      <p class="dropdown-item mb-0"><i class="mdi mdi-cancel text-danger me-1"></i>Cancel Event
                      </p>
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#editModal" class="no-text-shadow selectable">
                      <p class="dropdown-item mb-0"><i class="mdi mdi-pencil text-dark me-1"></i>Edit Event
                      </p>
                    </li>
                  </ul>
                </div>

                <h6 class="text-info">{{ new Date(towerEvent?.startDate).toLocaleDateString() }}</h6>
              </div>
            </div>
            <p class="mt-2">{{ towerEvent?.description }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <h5 v-if="towerEvent?.capacity > 0 && towerEvent?.isCanceled == false"><span class="text-info fw-bold"
                :class="{ 'text-danger': towerEvent?.capacity <= 20 }">{{
                  towerEvent?.capacity }}</span> Spots Left</h5>
            <h5 v-else-if="towerEvent?.capacity == 0 && towerEvent?.isCanceled == false" class="red-message">Sold Out</h5>
            <h5 v-else-if="towerEvent?.isCanceled" class="red-message">Cancelled</h5>
            <div v-show="!hasTicket && account?.id">
              <button @click="attendEvent()" v-show="towerEvent?.isCanceled == false && towerEvent?.capacity > 0"
                class="btn btn-warning attend-button">Attend <img src="../assets/img/personIcon.svg" height="20"
                  alt="person icon"></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <Modal id="editModal">
    <template #modalFormContent>
      <EditEventForm />
    </template>
  </Modal>
</template>


<script>
import { computed } from "vue";
import { TowerEvent } from "../models/TowerEvent.js";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { ticketsService } from "../services/TicketsService.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import Modal from "./Modal.vue";
import EditEventForm from "./EditEventForm.vue";


export default {
  setup() {
    const route = useRoute();
    return {
      towerEvent: computed(() => AppState.towerEvent),
      account: computed(() => AppState.account),
      hasTicket: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
      async attendEvent() {
        try {
          const towerEventId = route.params.towerEventId;
          await ticketsService.attendEvent(towerEventId);
          this.towerEvent.capacity--;
        }
        catch (error) {
          logger.log(error);
          Pop.error(error.message);
        }
      },
      async cancelEvent() {
        try {
          if (await Pop.confirm("Are you sure you'd like to cancel this event?", "This action can't be undone.", "Yes, I'm sure", "warning")) {
            const towerEventId = route.params.towerEventId;
            await towerEventsService.cancelEvent(towerEventId);
          }
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }
    };
  },
  components: { Modal, EditEventForm }
}
</script>


<style lang="scss" scoped>
.tower-event-card {
  min-height: 50vh;
  margin-top: 2em;
  background-size: 125%;
  text-shadow: 1px 1px 2px black;
  position: relative
}

.blur {
  min-height: 50vh;
  margin-top: 2em;
  background-color: #246D8E99;
  backdrop-filter: blur(6px);
  padding-top: 2em;
  padding-bottom: 2em;
}

.featured-pic {
  object-fit: cover;
  object-position: center;
  height: 42vh;
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

.red-message {
  text-shadow: 0px 0px 0px;
  background-color: #FF5977;
  color: black;
  text-align: center;
  font-weight: bold;
  padding-left: 1em;
  padding-right: 1em
}

.my-dropdown {
  position: absolute;
  top: -33px;
  right: -7px
}

.no-text-shadow {
  text-shadow: 0px 0px 0px black;

}
</style>
