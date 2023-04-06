<template>
  <section class="row">
    <div class="col-12">

      <form>
        <textarea name="comment box" id="comment-box" cols="30" rows="4" class="form-control mb-3"
          placeholder="write a comment..."></textarea>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-success text-black">Post Comment</button>
        </div>
      </form>
    </div>
    <section class="row my-3" v-for="c in comments" :key="c.id">
      <div class="col-2 d-flex align-items-center">
        <img :src="c.creator.picture" :alt="'a photo of ' + c.creator.name" :title="'a photo of ' + c.creator.name"
          class="profile-pic">
      </div>
      <div class="col-10">
        <div class="comment-card">
          <p class="fw-bold mb-1">{{ c.creator.name }}</p>
          <p>{{ c.body }}</p>
        </div>
      </div>
    </section>
  </section>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    return {
      comments: computed(() => AppState.comments)
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