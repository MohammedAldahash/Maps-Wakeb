<!-- components/Tables.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { favorites, markers } from '@/composables/usersStore' // optional if you want to keep favorites in shared store
import "@/assets/styles/TablesPage.css";
import { useMap } from '@/composables/mapStore'

const { getIconType } = useMap();

const localMarkers = ref([])
const localFavorites = ref([]) // local ref for favorites
function getIconUrl(type) {
  return getIconType(type).options.iconUrl;
}

async function deleteMarker(index) {

  
  const marker = localMarkers.value[index];
  const id = marker.markerId;

  try {
    const response = await fetch(`http://localhost:8084/api/marker/deleteMar?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      localMarkers.value.splice(index, 1); // Remove from localMarkers
      console.log(`Marker with ID ${id} deleted.`);
    } else {
      console.error(`Failed to delete marker: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting marker:', error);
  }
}

async function fetchMarkers() {
  try {
    const res = await fetch('http://localhost:8084/api/marker/getByUser', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.ok) {
      console.log(res.json)
      localMarkers.value = await res.json()
      console.log("Fetched markers:", markers.value)
      markers.value = localMarkers.value // sync with shared store
    } else {
      console.error("Failed to fetch markers")
    }
  } catch (e) {
    console.error(e)
  }
}

async function fetchFavorites() {
  try {
    const res = await fetch('http://localhost:8083/api/favorite/getByUser', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.ok) {
      console.log(res.json)

      localFavorites.value = await res.json()
      // optional: sync with shared store
      console.log("Fetched favorites:", localFavorites.value)
      favorites.value = localFavorites.value
    } else {
      console.error("Failed to fetch favorites")
    }
  } catch (e) {
    console.error(e)
  }
}
async function deleteFavorite(index) {
  const favorite = localFavorites.value[index];
  const id = favorite.favoriteId;

  try {
    const response = await fetch(`http://localhost:8083/api/favorite/deleteFav?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      localFavorites.value.splice(index, 1); // Remove from localFavorites
      console.log(`Favorite with ID ${id} deleted.`);
    } else {
      console.error(`Failed to delete favorite: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting favorite:', error);
  }
}

onMounted(() => {
  fetchMarkers()
  fetchFavorites()
})
</script>

<template>
  <div class="right-panel">
    <!-- Favorites -->
<div class="markers-section">
  <h2>Your Favorite Places</h2>

  <table v-if="localFavorites.length !== 0" class="markers-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>latitude</th>
        <th>longitude</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(fav, index) in localFavorites" :key="index">
        <td>{{ fav.locationName }}</td>
        <td>{{ fav.locationType }}</td>
        <td>{{ fav.latitude || 'N/A' }}</td>
        <td>{{ fav.longitude || 'N/A' }}</td>
        <td>
          <button class="delete-btn" @click="deleteFavorite(index)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

  <div v-else class="empty-state">
    No favorite locations yet.
  </div>
</div>


    <br />
    <hr />

    <!-- Markers -->
    <div class="markers-section">
      <h2>Your Markers</h2>

      <table v-if="markers.length != 0" class="markers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>icon</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(marker, index) in markers" :key="index">
            <td>{{ marker.iconType }}</td>
            <td>
              <img :src="getIconUrl(marker.iconType)" alt="icon" width="35" height="35" />
            </td>
            <td>{{ marker.latitude || 'N/A' }}</td>
            <td>{{ marker.longitude || 'N/A' }}</td>
            <td>
              <button class="delete-btn" @click="deleteMarker(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="markers.length === 0" class="empty-state">
        No markers added yet.
      </div>
    </div>
  </div>
</template>
