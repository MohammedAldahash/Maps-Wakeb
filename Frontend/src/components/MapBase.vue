<script setup>
import 'leaflet/dist/leaflet.css'
import { onMounted, watch } from 'vue';
import L from 'leaflet'
const props = defineProps({
  mapType: {
    type: String,
    default: 'streets',
  }
})
let map= null
let currentLayer= null
const layers = {
  streets: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }),
  topographic: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap contributors'
  }),
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '© Esri & contributors'
}),
dark: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png', {
  attribution: '© Stadia Maps'
}),
light: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
  attribution: '© Stadia Maps'
}),
positron: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© CartoDB'
}),
darkmatter: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© CartoDB'
})


}
onMounted(()=>{
    map= L.map('map').setView([24.7136, 46.6753],12)

    currentLayer = layers[props.mapType] 
    currentLayer.addTo(map)
})
watch(() => props.mapType, (newType) => {
  if (map && layers[newType]) {
    map.removeLayer(currentLayer)
    currentLayer = layers[newType].addTo(map)
  }
})
</script>

<template>
<div id="map" class="map-container">
</div>
</template>

<style>
.map-container {
  height: 905px;
  width: 100%;
}
</style>