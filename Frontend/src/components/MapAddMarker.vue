<script setup>
import { useMap } from '@/composables/mapStore';
const {addMarkerMode} = useMap();
</script>
<template>
  <div class="marker-mode-indicator" v-if="addMarkerMode">
    Add Marker Mode ON - Click on the map to add a marker.
  </div>
</template>

