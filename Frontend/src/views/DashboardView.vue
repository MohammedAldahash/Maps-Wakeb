<script setup>
import DashboardUser from '../components/DashboardUser.vue'
import DashboardAdmin from '../components/DashboardAdmin.vue'
import { useUser } from '@/composables/usersStore'

const { isAdmin } = useUser()
</script>

<template>
  <component :is="isAdmin ? DashboardAdmin : DashboardUser" />
</template>
