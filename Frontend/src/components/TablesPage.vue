<!-- components/Tables.vue -->
<script setup>
import { ref } from 'vue'
import { favorites } from '@/composables/usersStore'
import "@/assets/styles/TablesPage.css"; // Import your styles 
const markers = ref([
  { name: "Mosque", type: "Place", locationDescription: "Main Street" },
  { name: "Coffee Shop", type: "Cafe", locationDescription: "Block 3" }
])

function deleteMarker(index) {
  markers.value.splice(index, 1)
}
</script>

<template>
  <div class="right-panel">
    <!-- Favorites -->
    <div class="favorites-section">
      <h3>Your Favorite Places</h3>
      <ul v-if="favorites.length > 0">
        <li v-for="(fav, index) in favorites" :key="index">
          <strong>{{ fav.name }}</strong> — {{ fav.type }}
          <small>{{ fav.locationDescription }}</small>
        </li>
      </ul>
      <p v-else class="no-favorites">No favorite locations yet.</p>
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
            <td>{{ marker.name }}</td>
            <td>{{ marker.type }}</td>
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