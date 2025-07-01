<script setup>
import { useMap } from '@/composables/mapStore';
import { ref } from 'vue';
import L from 'leaflet';
import axios from 'axios';
const {map, getIconType} = useMap();

const query = ref('');
const results = ref([]);
const marker = ref(null);
const selectedPlace = ref(null)
async function searchLocation() {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query.value)}&format=json&limit=8`;
    try{
        const response = await axios.get(url);
        results.value = response.data;
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
          name: result.display_name,
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
    Lat: {{ selectedPlace.lat }}<br />
    Lon: {{ selectedPlace.lon }}
  </div>
  <button class="close-btn" @click="clearSearchResult">✖</button>
</div>
</div>
 </template>

<style>
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

</style>