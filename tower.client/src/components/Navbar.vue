<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="home page link" src="../assets/img/TowerLogo.svg" role="home page button" height="45" class="mt-4" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'Home' }" class="btn text-success lighten-30 selectable text-uppercase">
            Home
          </router-link>
        <li>
          <router-link :to="{ name: 'Account' }" class="btn text-success lighten-30 selectable text-uppercase"
            v-if="user?.isAuthenticated">
            My Account
          </router-link>
        </li>
        <li>
          <p v-if="user?.isAuthenticated" class="btn text-success lighten-30 selectable text-uppercase" @click="logout()">
            Logout</p>
        </li>
        <li>
          <p v-if="!user?.isAuthenticated" class="btn text-success lighten-30 selectable text-uppercase" @click="login()">
            Login</p>
        </li>
        <!-- <li>
          <button v-if="accountId" class="btn btn-success mt-4 mb-1 w-75 text-black" data-bs-toggle="modal"
            data-bs-target="#createModal">New Event</button>
        </li> -->
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <!-- <Login /> -->
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Login from './Login.vue'
import { AuthService } from "../services/AuthService.js";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async login() {
        AuthService.loginWithPopup()
      },
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }

  .navbar-nav {
    display: none;
  }
}
</style>
