<script setup>
import { RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import MapDropdown from './components/MapDropdown.vue'
import { useUser } from '@/composables/usersStore';
import MapAddMarker from './components/MapAddMarker.vue';
const { logout } = useUser();

const route = useRoute()
const router = useRouter()
function handleLogout() {
  logout();
  router.push('/');
}

</script>

<template>
  <div class="app-container">
    <header class="navbar" v-if="route.path !== '/'">
      <nav>
        <div class="left-nav">
        <button @click="handleLogout">Logout</button>

        <RouterLink to="/map">Map</RouterLink>
        <MapDropdown/>

        </div>
        <div class="center-nav">
          <MapAddMarker />
        </div>

        <div class="right-nav">
          <img src="/src/assets/Wakeb-logo-removebg.png" alt="">
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
    font-size: 16px;

}

.left-nav, .right-nav {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

nav a {
  display: flex;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a.router-link-exact-active {
text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
  font-size: 16px;

}

.main-content {
  flex: 1;
  overflow: auto;
  margin-top: 60px;
}

button {
  font-size: 16px;
  background-color: #1f2d3d;
  color: white;
  border: none;
  padding: 8px 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.right-nav button:hover {
  background-color:#151e29
}

img {
  height: 40px; 
  object-fit: contain;
}
</style>
