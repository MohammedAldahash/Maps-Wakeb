<script setup>
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue';
import L from 'leaflet'

onMounted(()=>{
    const map= L.map('map').setView([24.7136, 46.6753],10)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: '@openStreetMap contributors'}).addTo(map)

}
)
</script>

<template>
<div id="map" class="map-container">
</div>
</template>

<style scoped>
.map-container {
  height: 100vh;
  width: 100vw;
}

</style>