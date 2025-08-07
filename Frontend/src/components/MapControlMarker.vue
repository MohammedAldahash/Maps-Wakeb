<script setup>
import { ref, onBeforeUnmount, watch } from 'vue';
import { useMap } from '@/composables/mapStore';
import "@/assets/styles/MapControlMarker.css"; // Import your styles
const { map, addMarkerMode, getIconType } = useMap();
import L from 'leaflet';

// Selected icon type
const selectedIconType = ref(null);
let clickHandler = null;
const showIcons = ref(false);

const iconOptions = {
  university: 'university.png',
  hospital: 'hospital.png',
  restaurant: 'restaurant.png',
  supermarket: 'supermarket.png',
  bank: 'bank-location.png',
  fast_food: 'fast-food.png',
  museum: 'museum.png',
  mall: 'mall.png',
  mosque: 'mosque.png',
  sports_centre: 'fitness-centre.png',
  school: 'school.png',
};


watch(addMarkerMode, (enabled) => {
  if (!map.value) return;

  if (enabled && selectedIconType.value) {
    // Define the click handler
    clickHandler = function (e) {
      const { lat, lng } = e.latlng;
      const icon = getIconType(selectedIconType.value);
      // Create a marker at clicked location
      const marker = L.marker([lat, lng], {icon});
      marker.addTo(map.value);

      // Reset state
      addMarkerMode.value = false;
      selectedIconType.value = null
    };

    // Add click handler to the map
    map.value.on('click', clickHandler);
  } else {
    // Remove the click handler if it exists
    if (clickHandler) {
      map.value.off('click', clickHandler);
      clickHandler = null;
    }
  }
});

// Clean up on component unmount
onBeforeUnmount(() => {
  if (map.value && clickHandler) {
    map.value.off('click', clickHandler);
  }
});

function selectIcon(type) {
  selectedIconType.value = type;
  showIcons.value = false;
  addMarkerMode.value = true;
}

</script>

<template>
  <div>
    <!-- Main button -->
    <button @click="showIcons = !showIcons" class="control-button">
      <img
        v-if="!addMarkerMode"
        src="/src/assets/images/plus.png"
        alt="add marker"
        class="icon"
      />
      <img
        v-else
        src="/src/assets/images/plus-off.png"
        alt="cancel"
        class="icon"
      />
    </button>

    <!-- Icon selection panel -->
    <div v-if="showIcons" class="icon-panel">
      <h2>Select Marker Type:</h2>
      <div class="icon-grid">
        <button
          v-for="(icon, type) in iconOptions"
          :key="type"
          @click="selectIcon(type)"
          class="icon-option"
        >
          <img :src="`/src/assets/images/${icon}`" :alt="type" class="icon-thumb" />
          <span>{{ type }}</span>
        </button>
      </div>
    </div>
  </div>

</template>
