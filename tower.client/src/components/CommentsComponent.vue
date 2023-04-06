<template>
  <section class="row">
    <div v-if="account.id" class="col-12">
      <form @submit.prevent="postComment()">
        <textarea name="comment box" id="comment-box" cols="30" rows="4" class="form-control mb-3"
          placeholder="tell the people..." v-model="editable.body"></textarea>
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
          <div class="d-flex justify-content-between">
            <p class="fw-bold mb-1">{{ c.creator.name }}</p>
            <div v-if="c.creatorId == account.id" class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                aria-expanded="false">
                ...
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li @click="deleteComment(c.id)">
                  <p class="dropdown-item mb-0 selectable"><i class="mdi mdi-delete-outline text-danger me-1"></i>Delete
                    Comment</p>
                </li>
              </ul>
            </div>
          </div>
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
      account: computed(() => AppState.account),

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
      },

      async deleteComment(commentId) {
        try {
          if (await Pop.confirm("Are you sure you'd like to delete this comment?", "This action can't be undone.", "Yes, I'm sure", "warning")) {
            await commentsService.deleteComment(commentId)
          }
        } catch (error) {
          logger.log(error)
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
  object-fit: cover;
  object-position: center;
}

.comment-card {
  background-color: #E2F9FF;
  padding: .5em;
  color: #2A2D3A;
  border-radius: 5px
}
</style>