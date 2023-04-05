<template>
  <main class="container-fluid overflow-hidden">
    <section class="row">
      <div class="col-md-10">
        <Navbar />
        <router-view />
      </div>
      <div class="col-md-2">
        <Sidenav />
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Sidenav from "./components/Sidenav.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Sidenav }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}
</style>
