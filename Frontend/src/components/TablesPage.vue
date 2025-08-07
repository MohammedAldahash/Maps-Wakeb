<!-- components/Tables.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { favorites, markers } from '@/composables/usersStore' // optional if you want to keep favorites in shared store
import "@/assets/styles/TablesPage.css";

const localMarkers = ref([])
const localFavorites = ref([]) // local ref for favorites

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
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(fav, index) in localFavorites" :key="index">
        <td>{{ fav.locationName }}</td>
        <td>{{ fav.locationType }}</td>
        <td>{{ fav.locationDescription || 'N/A' }}</td>
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
            <th>Type</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(marker, index) in markers" :key="index">
            <td>{{ marker.iconType }}</td>
            <td>{{ marker.iconType  }}</td>
            <td>{{ marker.locationDescription || 'N/A' }}</td>
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

<!-- 
<style scoped>
.dashboard-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  color: #fff;
}

.right-panel {
  flex: 1;
  min-width: 320px;
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.right-panel ul {
  list-style: none;
  background-color: #1e1e1e00;
  padding: 0;
}

.right-panel li {
  background: #333;
  margin-bottom: 0.8rem;
  padding: 0.8rem;
  border-radius: 8px;
  color: white;

}
.no-favorites {
  margin-top: 2rem;
  font-style: italic;
  color: gray;
}
.markers-section {
  margin-top: 2rem;
  color: white;
}

.markers-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #2c2c2c;
  border: 1px solid #444;
}

.markers-table th,
.markers-table td {
  padding: 12px 16px;
  border: 1px solid #444;
  text-align: left;
}

.markers-table th {
  background-color: #1f1f1f;
  font-weight: bold;
}

.markers-table tr:hover {
  background-color: #3a3a3a;
  transition: background-color 0.2s ease;
}

.empty-state {
  padding: 16px;
  font-style: italic;
  color: #999;
}

.delete-btn {
  background-color: #e3342f;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.delete-btn:hover {
  background-color: #cc1f1a;
}

</style> -->