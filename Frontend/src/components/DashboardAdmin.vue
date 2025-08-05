<!-- components/DashboardUser.vue -->
<script setup>
import Profile from './ProfilePage.vue'
import Tables from './TablesPage.vue'
import "@/assets/styles/Dashboard.css"; // Import your styles
</script>


<template>
  <div class="dashboard-container">
    <Profile />
    <Tables />
  </div>
</template>


<!-- <style scoped>
.dashboard-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  color: #fff;
}
</style> -->
