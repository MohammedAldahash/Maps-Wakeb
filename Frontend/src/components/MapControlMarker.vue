<script setup>
import { useMap } from '@/composables/mapStore';
import "@/assets/styles/MapControlMarker.css"; // Import your styles
const { addMarkerMode } = useMap();
</script>

<template>
  <button button @click="addMarkerMode = !addMarkerMode" class="control-button">
        <img
        v-if="!addMarkerMode"
        src="/src/assets/images/plus.png"
        alt="show destination"
        class="icon"
      />
      <img
        v-else
        src="/src/assets/images/plus-off.png"
        alt="search for location first"
        class="icon"
      />
  </button>
</template>
<!-- 
<style>
button{
background-color: #ffffff;
  color: rgb(35, 35, 35);
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);}
  button:hover{
     background-color: #e2e2e2;
  }
  img{
    width: 35px;
    height: 35px;
}
</style> -->