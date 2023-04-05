<template>
  <section class="row custom-bg">
    <Login />
    <router-link :to="{ name: 'Home' }">
      <h5 class="mt-2 text-light">Home</h5>
    </router-link>
    <router-link :to="{ name: 'Account' }" v-if="user.isAuthenticated">
      <h5 class="mt-2 text-light">
        Account
      </h5>
    </router-link>
    <div class="d-flex flex-column align-items-center">
      <button v-if="user.isAuthenticated" class="btn btn-success mt-2 w-75">New Event</button>
      <!-- <button @click="login" v-if="!user.isAuthenticated" class="btn btn-outline-light mt-3 w-50">Login</button> -->
      <button @click="logout" v-if="user.isAuthenticated" class="btn btn-outline-light mt-3 w-75">
        Logout
      </button>
    </div>
  </section>
</template>


<script>
import { computed } from "vue";
import Login from "./Login.vue";
import { AppState } from "../AppState.js";
import { AuthService } from "../services/AuthService.js";

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
  components: { Login }
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
</style>