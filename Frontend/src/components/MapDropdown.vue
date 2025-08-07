<script setup>
  import { useMap } from '@/composables/mapStore';
  import '@/assets/styles/MapDropdown.css';
  const {setMapType} = useMap();
</script>

<template>
  <div class="map-type-dropdown">
    <button class="map-type-button">Map Type ▾</button>
    <div class="map-type-options">
        <button class="map-option" @click="setMapType('streets')">Streets</button>
        <hr/>
        <button class="map-option" @click="setMapType('topographic')">topographic</button>
        <hr/>
        <button class="map-option" @click="setMapType('satellite')">satellite</button>
        <hr/>
        <button class="map-option" @click="setMapType('positron')">Positron</button>
        <hr/>
        <button class="map-option" @click="setMapType('light')">Light</button>
        <hr/>
        <button class="map-option" @click="setMapType('darkmatter')">Dark Matter</button>
    </div>
  </div>
</template>