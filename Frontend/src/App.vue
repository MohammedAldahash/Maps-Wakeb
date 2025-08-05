<script setup>
import { RouterView } from 'vue-router'
import NavbarView from '@/views/NavbarView.vue'
import '@/assets/styles/App.css'

</script>

<template>
  <div class="app-container">
    <NavbarView />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>
