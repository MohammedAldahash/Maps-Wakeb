import { ref } from 'vue';

export const email = ref(localStorage.getItem('email') || '');
export const name = ref(localStorage.getItem('name') || '');
export const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));
export const loginPage = ref(true);
export const isLogedin = ref(localStorage.getItem('isLogedin') === 'true');
export const currentUser = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'));
export const markers = ref(JSON.parse(localStorage.getItem('markers') || '[]'));

export function useUser() {
  const setEmail = (e) => {
    email.value = e;
    localStorage.setItem('email', e);
  };

  const setName = (n) => {
    name.value = n;
    localStorage.setItem('name', n);
  };

  const setFavorites = (fav) => {
    favorites.value = fav;
    localStorage.setItem('favorites', JSON.stringify(fav));
  };

  const setCurrentUser = (user) => {
    currentUser.value = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const setLoginStatus = (status) => {
    isLogedin.value = status;
    localStorage.setItem('isLogedin', status);
  };

  const logout = () => {
    favorites.value = [];
    email.value = '';
    name.value = '';
    isLogedin.value = false;
    currentUser.value = null;

    localStorage.removeItem('favorites');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('isLogedin');
    localStorage.removeItem('currentUser');
  };

  return {
    email,
    name,
    favorites,
    currentUser,
    isLogedin,
    loginPage,
    setEmail,
    setName,
    setFavorites,
    setCurrentUser,
    setLoginStatus,
    logout
  };
}
