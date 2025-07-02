<script setup>
import L from 'leaflet';
import { selectedPlace, userLocation, useMap } from '@/composables/mapStore';
const {map} = useMap();
let routeLine = null;
console.log(userLocation)
console.log(selectedPlace)
function drawDestination() {
    if (routeLine) {
    map.value.removeLayer(routeLine);
  }
    const userLatLng = userLocation.value;
  const destinationLatLng =[
    parseFloat(selectedPlace.value.lat),
    parseFloat(selectedPlace.value.lon)
  ];
  console.log(userLatLng)
console.log(destinationLatLng)
  routeLine = L.polyline([userLatLng, destinationLatLng], {
    color: 'blue',
    weight: 4,
    dashArray: '8, 10'
  }).addTo(map.value);

  // Zoom to fit both points
  map.value.fitBounds([userLatLng, destinationLatLng], {
    padding: [40, 40]
  });
}

</script>

<template>
  <div class="destination-container">
    <button
      class="destination-button"
      :disabled="!userLocation || !selectedPlace"
      @click="drawDestination"
    ><img
        v-if="userLocation && selectedPlace"
        src="/public/destination-on.png"
        alt="show destination"
        class="icon"
      />
      <img
        v-else
        src="/public/destination-off.png"
        alt="search for location first"
        class="icon"
      /></button>
  </div>
</template>
<style scoped>
.destination-container {
  position: absolute;
  top: 70px;
  right: 325px;
  z-index: 1500;
}

.destination-button {
  background-color: #ffffff;
  color: rgb(35, 35, 35);
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.destination-button:disabled {
  background-color: #cacacac4;
  cursor: not-allowed;
}
img{
    width: 35px;
    height: 35px;
}
</style>
