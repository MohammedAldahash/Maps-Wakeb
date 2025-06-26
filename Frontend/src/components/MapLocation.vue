<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import { useMap, userMarker  } from '@/composables/useMap'

const {map} = useMap()

function addUserLocation() {
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    if (map.value) {
      if (userMarker.value) {
      map.value.removeLayer(userMarker.value);
    }
      userMarker.value =L.marker([latitude, longitude])
        .addTo(map.value)
        .bindPopup('You are here')
        .openPopup();
      map.value.setView([latitude, longitude], 13);
    }
  });
}

onMounted(() => {
  addUserLocation()
})
</script>
