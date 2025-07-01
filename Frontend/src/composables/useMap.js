import { ref } from "vue";
import L from 'leaflet';

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
  const getIconType= (type) =>{
    const icons={
      university: 'education.png',
      hospital: 'hospital.png',
      restaurant: 'restaurant.png',
      place_of_worship: 'mosque.png',
      supermarket: 'supermarket.png',
      bank: 'bank-location.png',
    }
    return L.icon({
      iconUrl: `/public/${icons[type]|| 'gps.png'}`,
      iconSize: [45, 50],
      iconAnchor: [15, 40],
      popupAnchor: [0, -35]
    });
  };
  return {
    map, mapType, favorites, destination, addMarkerMode,
    setMap, setMapType, addFavorite, removeFavorite, getIconType
  };
}
