<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import { useMap } from '@/composables/mapStore'
const {map, userLocation} = useMap()

function addUserLocation() {
  navigator.geolocation.getCurrentPosition((pos) => {
    userLocation.value = [pos.coords.latitude,pos.coords.longitude];
    if (map.value) {
      L.marker(userLocation.value)
        .addTo(map.value)
      map.value.setView(userLocation.value, 13);
    }
  });
}

onMounted(() => {
  addUserLocation()
})
</script>
