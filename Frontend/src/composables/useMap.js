import { ref } from "vue";

export const map = ref(null);
export const mapType = ref('satellite');
export const userMarker = ref(null);
export const favorites = ref([]);
export const destination = ref(null);
export const addMarkerMode = ref(false);

export function useMap() {
  const setMap = (m) => map.value = m;
  const setMapType = (type) => mapType.value = type;

  const addFavorite = (location) => favorites.value.push(location);
  const removeFavorite = (name) => {
    favorites.value = favorites.value.filter(fav => fav.name !== name);
  };

  return {
    map, mapType, favorites, destination, addMarkerMode,
    setMap, setMapType, addFavorite, removeFavorite
  };
}
