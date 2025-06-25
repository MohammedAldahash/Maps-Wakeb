<script setup>
import { onMounted } from 'vue'
import { defineProps } from 'vue'
import L from 'leaflet'

const props = defineProps({
  map: Object
})

let userMarker = null

function addUserLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation not supported.')
    return
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const latlng = [position.coords.latitude, position.coords.longitude]

    if (props.map) {
      if (userMarker) {
        userMarker.setLatLng(latlng)
      } else {
        userMarker.value = L.marker(latlng).addTo(props.map).bindPopup('You are here').openPopup()
      }
      props.map.setView(latlng, 13)
    }
  }, () => {
    alert('Could not get your location.')
  })
}

onMounted(() => {
  addUserLocation()
})
</script>
