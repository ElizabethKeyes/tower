<template>
  <section class="row custom-bg">
    <Login />
    <router-link :to="{ name: 'Home' }">
      <h5 class="mt-4 text-light">Home</h5>
    </router-link>
    <router-link :to="{ name: 'Account' }" v-if="user.isAuthenticated">
      <h5 class="mt-4 text-light">
        Account
      </h5>
    </router-link>
    <div class="d-flex flex-column align-items-center">
      <button v-if="user.isAuthenticated" class="btn btn-success mt-4 mb-1 w-75 text-black" data-bs-toggle="modal"
        data-bs-target="#createModal">New Event</button>
      <!-- <button @click="login" v-if="!user.isAuthenticated" class="btn btn-outline-light mt-3 w-50">Login</button> -->
      <button @click="logout" v-if="user.isAuthenticated" class="btn btn-outline-light mt-4 w-75">
        Logout
      </button>
    </div>
  </section>
  <Modal id="createModal">
    <template #modalFormContent>
      <CreateEventForm />
    </template>
  </Modal>
</template>


<script>
import { computed } from "vue";
import Login from "./Login.vue";
import { AppState } from "../AppState.js";
import { AuthService } from "../services/AuthService.js";
import Modal from "./Modal.vue";
import CreateEventForm from "./CreateEventForm.vue";

export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    };
  },
  components: { Login, Modal, CreateEventForm }
}
</script>


<style lang="scss" scoped>
.custom-bg {
  background-image: linear-gradient(180deg, #474C61, #2A2D3A 80%);
  height: 100vh;
  justify-content: center;
  text-align: center;
  align-content: start
}

@media screen and (max-width: 768px) {
  .row {
    display: none;

  }
}
</style>