<script setup>
import { useMap } from '@/composables/useMap';
import { ref } from 'vue';
import L from 'leaflet';
import axios from 'axios';
const {map, getIconType} = useMap();

const query = ref('');
const results = ref([]);
const marker = ref(null);

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
    }

    results.value = [];
    query.value = '';
}
</script>
 <template>
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
</style>