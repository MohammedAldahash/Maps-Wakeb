<script setup>
import 'leaflet/dist/leaflet.css'
import { onMounted, watch} from 'vue';
import leaflet from 'leaflet'
import { useMap} from '@/composables/useMap';

const{ setMap, mapType } = useMap();

// const props = defineProps({
//   mapType: {
//     type: String,
//     default: 'streets',
//   }
// })

let map= null
let currentLayer= null
const arrLayers = {
  streets: leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }),
  topographic: leaflet.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap contributors'
  }),
  satellite: leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '© Esri & contributors'
}),
dark: leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png', {
  attribution: '© Stadia Maps'
}),
light: leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
  attribution: '© Stadia Maps'
}),
positron: leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© CartoDB'
}),
darkmatter: leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© CartoDB'
})
}

onMounted(()=>{
    map= leaflet.map('map').setView([24.7136, 46.6753],10)
    setMap(map);
    currentLayer = arrLayers[mapType.value] 
    currentLayer.addTo(map)
})

watch(mapType, (newType) => {
  if (map && arrLayers[newType]) {
    map.removeLayer(currentLayer)
    currentLayer = arrLayers[newType].addTo(map)
  }
})
</script> 

<template>
<div id="map" class="map-container">
</div>
</template>

<style scoped>
.map-container {
    display: flex;
    height: 905px;
    width: 100%;
}
</style>
