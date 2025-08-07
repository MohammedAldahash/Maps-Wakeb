<script setup>
import "@/assets/styles/mapSearch.css";
import { useMap } from '@/composables/mapStore';
import { ref } from 'vue';
import L from 'leaflet';
import axios from 'axios';
const {map, selectedPlace, userLocation ,getIconType} = useMap();

const query = ref('');
const results = ref([]);
const marker = ref(null);





function haversineDistance(coord1, coord2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in KM

  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function searchLocation() {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query.value)}&format=json&limit=50`;
    try{
        const response = await axios.get(url);
        let data = response.data;

        if (userLocation.value) {
          const [userLat, userLng] = userLocation.value;

          data = data.map(result => ({
          ...result,
          distance: haversineDistance(
            { lat: userLat, lng: userLng },
            { lat: parseFloat(result.lat), lng: parseFloat(result.lon) }
          )
        })).sort((a, b) => a.distance - b.distance).slice(0, 8);;
    }

        results.value = data;
    } catch (err) {
    console.error('Nominatim search error', err)}
}

function selectResult(result) {
  const lat = parseFloat(result.lat);
  const lon = parseFloat(result.lon);
  console.log(result)
  const icon = getIconType(result.type)

    if(marker.value){
        map.value.removeLayer(marker.value);
    }  
    if (map.value) {
        marker.value =L.marker([lat, lon], {icon})
        .addTo(map.value)
        map.value.setView([lat, lon], 14);

        selectedPlace.value = {
          name: result.name,
          display_name: result.display_name,
          type: result.type,          
          lat,
          lon,
        }
    }

    results.value = [];
    query.value = '';
}

function clearSearchResult() {
  if (marker.value) {
    map.value.removeLayer(marker.value);
    marker.value =null;
  }
  selectedPlace.value = null;
}
async function saveAsFavorite() {
  if (!selectedPlace.value) return;

  const payload = {
    locationName: selectedPlace.value.name || 'Unnamed Location',
    locationType: selectedPlace.value.type || 'unknown',
    locationDescription: selectedPlace.value.display_name || 'No description',
    latitude: selectedPlace.value.lat,
    longitude: selectedPlace.value.lon,
  };

  try {
    await fetch('http://localhost:8083/api/favorite/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload)
    });

    alert('Saved as favorite!');
    clearSearchResult(); // optional to reset UI
  } catch (err) {
    console.error('Failed to save favorite:', err);
    alert('Error saving favorite');
  }
}

</script>





<template>

  <div>
    <div class="search-box ">
        <input
        v-model="query"
        @keyup.enter="searchLocation"
        placeholder="Search for a place..."/>
        <ul v-if="results.length">
            <li
            v-for="result in results"  
            :key="result.id"
            @click="selectResult(result)">
        {{ result.display_name }}</li>
        </ul>
    </div>
    <div v-if="selectedPlace" class="info-card">
  <div class="info-content">
    <strong>{{ selectedPlace.name }}</strong><br />
    <!-- {{ selectedPlace.display_name }}<br /> -->
    Lat: {{ selectedPlace.lat }}<br />
    Lon: {{ selectedPlace.lon }}
  </div>
  <button class="close-btn" @click="clearSearchResult">X</button>
  <button class="save-btn" @click="saveAsFavorite">Save</button>
</div>
</div>
 </template>

<!-- <style>
.search-box {
  position: absolute;
  top: 70px;
  right: 20px;
  z-index: 1000;
  background: rgb(255, 255, 255);
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  width: 300px;
  
}

input {
  width: 100%;
  padding: 6px;
  border-radius: 4px;
  border: none;
}

ul {
    background-color: rgb(204, 204, 204);
  list-style: none;
  padding: 0;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
}

li {
  padding: 6px;
  cursor: pointer;
  color: #000;
}

li:hover {
  background-color: #f0f0f0;
}

.info-card {
  position: absolute;
  bottom: 30px;
  right: 20px;
  background: #ffffffdb;
  color:#444;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  z-index: 2000;
  display: flex;
  align-items: start;
  gap: 10px;
  max-width: 300px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #444;
  cursor: pointer;
  margin-left: auto;
}

</style> -->