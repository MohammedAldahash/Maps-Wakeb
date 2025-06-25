<script setup>
import MapBase from '@/components/MapBase.vue';
import MapLocation from '@/components/MapLocation.vue';
import { ref, defineProps } from 'vue'

const props = defineProps({
  mapType: {
    type: String,
    default: 'satellite'
  }
})
const mapRef = ref(null)
function handleMapReady(mapInctance){
  mapRef.value = mapInctance
}
</script>

<template>
<div>
    <MapBase :mapType="props.mapType" @mapReady="handleMapReady" />
    <MapLocation v-if="mapRef" :map="mapRef"/>
</div>
</template>