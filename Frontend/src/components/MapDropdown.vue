<template>
  <div class="map-type-dropdown">
    <button class="map-type-button">Map Type ▾</button>
    <div class="map-type-options">
        <button @click="setMapType('streets')">Streets</button>
        <hr/>
        <button @click="setMapType('topographic')">topographic</button>
        <hr/>
        <button @click="setMapType('satellite')">satellite</button>
        <hr/>
        <button @click="setMapType('positron')">Positron</button>
        <hr/>
        <button @click="setMapType('light')">Light</button>
        <hr/>
        <button @click="setMapType('darkmatter')">Dark Matter</button>
    </div>
  </div>
</template>

<script setup>
  import { useMap } from '@/composables/useMap';
  const {setMapType} = useMap();

// const emit = defineEmits(['mapType'])

// function selectType(type) {
//   emit('mapType', type)
// }
</script>

<style scoped>
.map-type-dropdown {
  position: relative;
}

.map-type-button {
  background-color: #1f2d3d;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  padding: 8px 12px;
}

.map-type-options {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #2f3e4de3;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 3000;
  flex-direction: column;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.map-type-options button {
  width: 100%;
  background: none;
  border: none;
  color: white;
  padding: 10px;
  text-align: left;
  cursor: pointer;
}
hr{
border: none;
  height: 2px;
  background-color: #1f2d3d; 
}

.map-type-options button:hover {
  background-color: #3f4e5d;
    border-radius: 10px;
}

/* Show dropdown on hover */
.map-type-dropdown:hover .map-type-options {
  display: block;
}
</style>
