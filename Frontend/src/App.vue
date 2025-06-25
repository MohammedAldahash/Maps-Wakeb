<script setup>
import { RouterLink, RouterView, useRoute} from 'vue-router'
import MapDropdown from './components/MapDropdown.vue'
import { ref } from 'vue'
const selectedMapType = ref('streets')

const route = useRoute()
function handleMapTypeChange(type){
  selectedMapType.value = type
}
</script>

<template>
  <div class="app-container">
    <header class="navbar" v-if="route.path !== '/'">
      <nav>
        
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/map">Map</RouterLink>
        <MapDropdown @mapType="handleMapTypeChange" />
        
        <RouterLink to="/">Logout</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView :mapType="selectedMapType" @mapType="handleMapTypeChange"/>
    </main>
  </div>
</template>

<style scoped>

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0;
}

header.navbar {
  position: fixed;
  width: 100%;
  z-index: 1000;
  background-color: #1f2d3d;
  padding: 1rem 2rem;
  color: white;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}

.main-content {
  flex: 1;
  overflow: auto;
  margin-top: 60px;
}
</style>
