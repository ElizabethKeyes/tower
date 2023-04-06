<template>
  <div class="bg-grey">
    <div v-for="t in tickets" :key="t.id">
      <img :src="t.profile?.picture" :title="'a photo of ' + t.profile?.name" class="profile-pic">
    </div>
    <h5 class="text-center py-2" v-if="tickets.length == 0">Hmm... No attendees yet. You could be the first!</h5>
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
  margin: .25em;
}
</style>