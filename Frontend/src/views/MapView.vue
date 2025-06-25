<script setup>
import 'leaflet/dist/leaflet.css'
import MapBase from '@/components/MapBase.vue';
import { defineProps } from 'vue'

const props = defineProps({
  mapType: {
    type: String,
    default: 'satellite'
  }
})
</script>

<template>
<div>
    <MapBase :mapType="props.mapType"/>
</div>
</template>