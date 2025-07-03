import { ref } from 'vue';

export const email = ref('');
export const password = ref('');
export const favorites = ref([]);
export const loginPage = ref(true);
export const isLogedin = ref(false);
export const name = ref('');

export const currentUser = ref(null);
export function useUser(){
    const setEmail = (e) =>  email.value = e;
      const setCurrentUser = (user) => currentUser.value = user;
    const logout = () => {
    favorites.value = [];
    email.value = '';
    password.value = '';
    name.value = '';
    isLogedin.value = false;
  };
    return {
        email, setEmail, setCurrentUser,logout, password, favorites, loginPage, isLogedin, name
    }
}