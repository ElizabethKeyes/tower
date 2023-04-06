<template>
  <form @submit.prevent="editEvent()">
    <div class="modal-content">
      <div class="modal-header header-bg">
        <h5 class="modal-title text-light" id="exampleModalLabel">Edit Your Event</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body row">
        <div class="col-12">
          <label for="eventName">Event Name</label>
          <input type="text" name="eventName" id="eventName" class="form-control mb-2"
            placeholder="title/name of event..." required v-model="editable.name">
          <label for="description">Description</label>
          <textarea name="description" id="description" cols="30" rows="5" placeholder="what's going on at the event?"
            class="form-control mb-2" required v-model="editable.description"></textarea>
          <label for="coverImg">Cover Image</label>
          <input type="url" class="form-control mb-2" required placeholder="image url..." v-model="editable.coverImg">
          <label for="location">Location</label>
          <input type="text" placeholder="where is the event happening?" required class="form-control mb-2"
            v-model="editable.location">
        </div>
        <div class="col-6 mb-2">
          <label for="capacity">Capacity</label>
          <input type="number" class="form-control" placeholder="how many tickets for sale?" required
            v-model="editable.capacity">
        </div>
        <div class="col-6 mb-2">
          <label for="startDate">Start Date</label>
          <input type="date" class="form-control" required v-model="editable.startDate">
        </div>
        <div class="col-6">
          <label for="type">Type of Event</label>
          <select name="type" class="form-control" id="type" required v-model="editable.type">
            <option value="" disabled selected hidden>Select an option...</option>
            <option value="concert">Concert</option>
            <option value="convention">Convention</option>
            <option value="sport">Sport</option>
            <option value="digital">Digital</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-success text-black" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { towerEventsService } from "../services/TowerEventsService.js";

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()

    watchEffect(() => {
      if (AppState.towerEvent) {
        editable.value = { ...AppState.towerEvent }
      }
    })

    return {
      editable,

      async editEvent() {
        try {
          const towerEventId = route.params.towerEventId
          const towerEventData = editable.value
          await towerEventsService.editEvent(towerEventId, towerEventData)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.header-bg {
  background-image: linear-gradient(#474C61, #2A2D3A);
}
</style>