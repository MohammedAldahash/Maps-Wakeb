<script setup>
import { RouterLink, RouterView, useRoute} from 'vue-router'
import MapDropdown from './components/MapDropdown.vue'
const route = useRoute()
</script>

<template>
  <div class="app-container">
    <header class="navbar" v-if="route.path !== '/'">
      <nav>
        <div class="left-nav">
        <RouterLink to="/map">Map</RouterLink>
        <MapDropdown/>
        </div>
        <div class="right-nav">
        <RouterLink to="/">Logout</RouterLink>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <RouterView/>
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
  height: 60px;
  width: 100%;
  z-index: 1000;
  background-color: #1f2d3d;
  padding: 1rem 2rem;
  color: white;
}

nav {
  display: flex;
  justify-content: space-between;
    align-items: center;
  gap: 1rem;
}

.left-nav, .right-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

nav a {
  display: flex;
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
