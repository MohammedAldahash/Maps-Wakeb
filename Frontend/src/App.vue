<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header class="navbar">
      <nav>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/map">Map</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
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
