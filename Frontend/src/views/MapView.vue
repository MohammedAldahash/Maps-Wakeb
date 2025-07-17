<script setup>
import MapBase from '@/components/MapBase.vue';
import MapDestination from '@/components/MapDestination.vue';
import MapLocation from '@/components/MapUserLocation.vue';
import MapSearch from '@/components/MapSearch.vue';
import MapControlMarker from '@/components/MapControlMarker.vue';
</script>

<template>
<div>
    <MapBase/>
    <MapLocation/>
        <MapSearch/>

<div class="extentions">
    <MapDestination/>
    <MapControlMarker/>
</div>
</div>
</template>

<style>
.extentions{
    display: flex ;
    position: absolute;
  top: 70px;
  right: 325px;
  z-index: 1500;
    align-items: center;
  gap: 12px;
  flex-direction: row-reverse; /* ← Reverses the order */

}

</style>