<script setup>
import "@/assets/styles/mapDestination.css";
import { watch } from 'vue';
import L from 'leaflet';
import { selectedPlace, userLocation, useMap } from '@/composables/mapStore';
const {map} = useMap();
let routeLine = null;
 
async function drawDestination() {
    if (routeLine) {
    map.value.removeLayer(routeLine);
  }
  const apiKey = '5b3ce3597851110001cf6248e3768205bb604479b1bb75945819e7ad';
  const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';

 const body = {
    coordinates: [
      [userLocation.value[1], userLocation.value[0]],[parseFloat(selectedPlace.value.lon), parseFloat(selectedPlace.value.lat)]
    ]
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // Draw road-following route from GeoJSON
    routeLine = L.geoJSON(data, {
      style: {
        color: 'blue',
        weight: 3
      }
    }).addTo(map.value);

    // Fit map to route
    map.value.fitBounds(routeLine.getBounds(), {
      padding: [40, 40]
    });

  } catch (err) {
    console.error('Routing error:', err);
    alert('Failed to load route. Please try again.');
  }

}


watch(selectedPlace, ()=>{
    if(routeLine){
        map.value.removeLayer(routeLine);
        routeLine = null;
    }
})
</script>

<template>
  <div class="destination-container">
    <button
      class="destination-button"
      :disabled="!userLocation || !selectedPlace"
      @click="drawDestination"
    ><img
        v-if="userLocation && selectedPlace"
        src="/src/assets/images/destination-on.png"
        alt="show destination"
        class="icon"
      />
      <img
        v-else
        src="/src/assets/images/destination-off.png"
        alt="search for location first"
        class="icon"
      /></button>
  </div>
</template>
