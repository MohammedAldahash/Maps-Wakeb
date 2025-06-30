<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import { useMap } from '@/composables/useMap'

const {map} = useMap()

function addUserLocation() {
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    if (map.value) {
      L.marker([latitude, longitude])
        .addTo(map.value)
      map.value.setView([latitude, longitude], 13);
    }
  });
}

onMounted(() => {
  addUserLocation()
})
</script>
