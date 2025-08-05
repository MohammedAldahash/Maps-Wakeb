import { ref } from "vue";
import L from 'leaflet';

export const map = ref(null);
export const mapType = ref('streets');
export const userMarker = ref(null);
export const favorites = ref([]);
export const destination = ref(null);
export const addMarkerMode = ref(false);

//for destination we created the following:
export const userLocation = ref(null);
export const selectedPlace = ref(null);


export function useMap() {
  const setMap = (m) => map.value = m;
  const setMapType = (type) => mapType.value = type;

  const addFavorite = (location) => favorites.value.push(location);
  const removeFavorite = (name) => {
    favorites.value = favorites.value.filter(fav => fav.name !== name);
  };
  const getIconType= (type) =>{
    const icons={
      university: 'university.png',
      hospital: 'hospital.png',
      restaurant: 'restaurant.png',
      place_of_worship: 'mosque.png',
      supermarket: 'supermarket.png',
      bank: 'bank-location.png',
      fast_food: 'fast-food.png',
      museum: 'museum.png',
      mall: 'mall.png',
      mosque: 'mosque.png',
      fitness_centre: 'fitness-centre.png',
      sports_hall:'fitness-centre.png',
      sports_centre: 'fitness-centre.png',
      school: 'school.png',


    }
    return L.icon({
      iconUrl: `/src/assets/images/${icons[type]|| 'gps.png'}`,
      iconSize: [45, 50],
      iconAnchor: [15, 40],
      popupAnchor: [0, -35]
    });
  };
  return {
    map, mapType, favorites, destination, addMarkerMode,  userLocation, selectedPlace,
    setMap, setMapType, addFavorite, removeFavorite, getIconType
  };
}
