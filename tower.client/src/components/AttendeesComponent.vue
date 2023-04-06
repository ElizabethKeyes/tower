<template>
  <div class="bg-grey d-flex">
    <div v-for="t in tickets" :key="t.id">
      <img :src="t.profile?.picture" :alt="'a photo of ' + t.profile?.name" :title="t.profile?.name" class="profile-pic">
    </div>
    <div class="w-100" v-if="tickets.length == 0">
      <h5 class="text-center py-2">Hmm... No attendees yet. You could be the first!</h5>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    return {
      tickets: computed(() => AppState.tickets)
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-pic {
  border-radius: 100%;
  height: 8vh;
  width: 8vh;
  margin: .25em;
  object-fit: cover;
  object-position: center;
}
</style>