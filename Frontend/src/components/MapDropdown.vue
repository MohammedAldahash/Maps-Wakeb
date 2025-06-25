<template>
  <div class="map-type-dropdown">
    <button class="map-type-button">Map Type ▾</button>
    <div class="map-type-options">
        <button @click="selectType('streets')">Streets</button>
        <button @click="selectType('topographic')">topographic</button>
        <button @click="selectType('satellite')">satellite</button>
        <button @click="selectType('positron')">Positron</button>
        <button @click="selectType('light')">Light</button>
        <button @click="selectType('darkmatter')">Dark Matter</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['mapType'])

function selectType(type) {
  emit('mapType', type)
}
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
  background-color: #2f3e4d;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 3000;
  flex-direction: column;
  border-radius: 10px;
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

.map-type-options button:hover {
  background-color: #3f4e5d;
}

/* Show dropdown on hover */
.map-type-dropdown:hover .map-type-options {
  display: block;
}
</style>
