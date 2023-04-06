<template>
  <div class="modal fade container-fluid" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <slot name="modalFormContent"></slot>
    </div>
  </div>
</template>

<!-- FIXME restrict dates to future dates only -->

<script>
import { ref } from "vue";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRouter } from "vue-router";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const router = useRouter()
    return {


    }
  }
}
</script>


<style lang="scss" scoped></style>