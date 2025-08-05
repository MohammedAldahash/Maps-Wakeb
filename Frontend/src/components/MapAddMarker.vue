<script setup>
import { onMounted, onUnmounted } from 'vue';
import L from 'leaflet';
import { useMap } from '@/composables/mapStore';
import { useUser } from '@/composables/usersStore';
import "@/assets/styles/mapAddMarker.css"; // Import your styles
const { map, addMarkerMode, getIconType } = useMap();
const { email, favorites } = useUser();

let mapClickHandler = null;

function saveMarkerToBackend(markerData) {
  // Send a POST request to save to db.json
  fetch('http://localhost:3001/markers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(markerData),
  }).then(res => {
    if (!res.ok) alert("Error saving marker");
  });
}

onMounted(() => {
  mapClickHandler = (e) => {
    if (!addMarkerMode.value || !map.value || !email.value) return;

    const { lat, lng } = e.latlng;
    const type = prompt('Enter type of place (e.g., school, mosque, restaurant):');

    const icon = getIconType(type);

    const marker = L.marker([lat, lng], { icon }).addTo(map.value);
    marker.bindPopup(`Custom Marker: ${type}`).openPopup();

    const newMarker = {
      id: Date.now(),
      userEmail: email.value,
      lat,
      lng,
      type,
    };

    // Save locally in favorites
    favorites.value.push(newMarker);

    // Save to backend
    saveMarkerToBackend(newMarker);
    console.log(favorites)
  };

  if (map.value) {
    map.value.on('click', mapClickHandler);
  }
});

onUnmounted(() => {
  if (map.value && mapClickHandler) {
    map.value.off('click', mapClickHandler);
  }
});
</script>

<template>
  <div class="marker-mode-indicator" v-if="addMarkerMode">
    Add Marker Mode ON - Click on the map to add a marker.
  </div>
</template>

<!-- <style scoped>
.marker-mode-indicator {
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);

  background: #2c4158;
  color: #f8f8f8;
    padding:  5px 12px;
  border-radius: 8px;
  z-index: 1500;
  font-weight: bold;
}
</style> -->
