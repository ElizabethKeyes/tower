<template>
  <section class="row px-4 justify-content-center">
    <div class="col-12">
      <EventDetailsCard />
      <p class="text-secondary mt-3">See who is attending</p>
      <AttendeesComponent />
    </div>
    <div class="col-md-10">
      <p class="text-secondary mt-3">See what people are saying</p>
      <div class="bg-grey py-2 px-4 mb-4">
        <p class="text-success text-end mt-1" v-if="account.id">Join the conversation</p>
        <CommentsComponent />
        <h5 v-if="comments.length == 0" class="text-center py-2 mb-0">No comments yet... Let us hear from you!</h5>
      </div>

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
import CommentsComponent from "../components/CommentsComponent.vue";
import { commentsService } from '../services/CommentsService.js'

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

    async function getCommentsByEventId() {
      try {
        const towerEventId = route.params.towerEventId
        await commentsService.getCommentsByEventId(towerEventId)
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getTowerEventById(),
        getTowerEventAttendees(),
        getCommentsByEventId()
    })
    return {
      account: computed(() => AppState.account),
      towerEvent: computed(() => AppState.towerEvent),
      comments: computed(() => AppState.comments)
    }
  },
  components: { EventDetailsCard, AttendeesComponent, CommentsComponent }
}
</script>


<style lang="scss" scoped></style>