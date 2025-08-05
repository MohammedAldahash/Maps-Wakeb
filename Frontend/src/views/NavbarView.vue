<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import MapDropdown from '@/components/MapDropdown.vue'
import MapAddMarker from '@/components/MapAddMarker.vue'
import { useUser } from '@/composables/usersStore'
import '@/assets/styles/NavbarView.css'
const { logout } = useUser()
const route = useRoute()
const router = useRouter()

function handleLogout() {
  logout()
  router.push('/')
}
</script>

<template>
  <header class="navbar" v-if="route.path !== '/'">
    <nav>
      <div class="left-nav">
        <button @click="handleLogout" class="logout">Logout</button>
        <RouterLink to="/map">Map</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <MapDropdown />
      </div>

      <div class="center-nav">
        <MapAddMarker />
      </div>

      <div class="right-nav">
        <img src="/src/assets/images/Wakeb-logo-removebg.png" alt="Wakeb Logo" />
      </div>
    </nav>
  </header>
</template>
