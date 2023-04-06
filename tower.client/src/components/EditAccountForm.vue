<template>
  <form @submit.prevent="editAccount()">
    <div class="modal-content">
      <div class="modal-header header-bg">
        <h5 class="modal-title text-light" id="exampleModalLabel">Edit Your Account</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body row">
        <div class="col-12">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" placeholder="enter your name..." class="form-control mb-3"
            v-model="editable.name">
          <label for="picture">Profile Picture URL</label>
          <input type="url" name="picture" id="picture" placeholder="url..." class="form-control mb-3"
            v-model="editable.picture">
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
import { ref } from "vue";
import { accountService } from "../services/AccountService.js";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const editable = ref({ ...AppState.account })
    return {
      editable,

      async editAccount() {
        const accountData = editable.value
        await accountService.editAccount(accountData)
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