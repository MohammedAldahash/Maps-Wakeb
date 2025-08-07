<script setup>
import { RouterView } from 'vue-router'
import NavbarView from '@/views/NavbarView.vue'
import '@/assets/styles/App.css'

</script>

<template>
  <div class="app-container">
    <video       v-if="$route.path === '/'|| $route.path === '/dashboard'"
 autoplay muted loop playsinline class="bg-video">
      <source src="@/assets/background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
        <div
      v-if="$route.path === '/'|| $route.path === '/dashboard'"
      class="bg-overlay"
    ></div>

    <NavbarView />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>
