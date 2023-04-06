<template>
  <section class="row">
    <div class="col-12">

      <form @submit.prevent="postComment()">
        <textarea name="comment box" id="comment-box" cols="30" rows="4" class="form-control mb-3"
          placeholder="write a comment..." v-model="editable.body"></textarea>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-success text-black">Post Comment</button>
        </div>
      </form>
    </div>
    <section class="row my-3 pe-0" v-for="c in comments" :key="c.id">
      <div class="col-2 d-flex align-items-center">
        <img :src="c.creator.picture" :alt="'a photo of ' + c.creator.name" :title="'a photo of ' + c.creator.name"
          class="profile-pic">
      </div>
      <div class="col-10 pe-0">
        <div class="comment-card">
          <p class="fw-bold mb-1">{{ c.creator.name }}</p>
          <p>{{ c.body }}</p>
        </div>
      </div>
    </section>
  </section>
</template>


<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { commentsService } from "../services/CommentsService.js";

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      comments: computed(() => AppState.comments),
      async postComment() {
        try {
          const form = window.event.target
          const commentData = editable.value
          commentData.eventId = route.params.towerEventId
          console.log(editable.value)
          await commentsService.postComment(commentData)
          form.reset()
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
.profile-pic {
  width: 10vh;
  height: 10vh;
  border-radius: 100%;
}

.comment-card {
  background-color: #E2F9FF;
  padding: .5em;
  color: #2A2D3A
}
</style>