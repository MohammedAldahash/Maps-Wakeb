<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isLogedin, useUser } from '@/composables/usersStore'; // ✅ removed `password` from here
import "@/assets/styles/LoginForm.css";

const { email, loginPage, name, setCurrentUser } = useUser();
const router = useRouter();
const password = ref('');
const confirmPassword = ref('');


function toggleForm(){
  if(loginPage.value){
    loginPage.value = false
  }else{
    loginPage.value = true
  }
}
async function handleLogin() {
  try {
    const res = await fetch('http://localhost:8082/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    if (!res.ok) throw new Error('Login failed');
    
    const data = await res.json();

    localStorage.setItem('token', data.token);
console.log(data.token)
    // ✅ properly await name fetch
    const nameRes = await fetch('http://localhost:8082/api/user/getName', {
      headers: {
        'Authorization': 'Bearer ' + data.token
      }
    });
console.log(nameRes)
    if (!nameRes.ok) throw new Error('Failed to get name');

    const nameText = await nameRes.text(); // backend returns plain string
console.log(nameText)
    isLogedin.value = true;
    setCurrentUser({ email: email.value, name: nameText });
    router.push('/map');
  } catch (err) {
    alert('Invalid credentials or failed to fetch name');
    console.error(err);
  }
}
function handleRegister() {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match")
    return
  }

  fetch('http://localhost:8082/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  })
    .then(res => {
      if (res.ok) {
        alert('Registered successfully!')
        loginPage.value = true // go to login page
      } else {
        return res.text().then(msg => { throw new Error(msg) })
      }
    })
    .catch(err => {
      alert('Registration failed: ' + err.message)
    })

}
</script>


<template>
    <div class="content">

    <form @submit.prevent="loginPage? handleLogin(): handleRegister()" class="login-form">
        <h2>{{ loginPage ? 'Sign In' : 'Register' }}</h2>
        <hr/>
        <template v-if="!loginPage">
        <label>your name: </label>
        <input v-model="name" type="text" placeholder="Full Name..." required />
        </template>

        <label>your email: </label>
        <input v-model="email" type="email" placeholder="Email..." required/>
        <label >Your password: </label>
        <input v-model="password" type="password" placeholder="Password..." required/>
        
        <template v-if="!loginPage">
          <label>confirm password: </label>
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password..." required/>
        </template>

      <button type="submit">{{ loginPage ? 'Sign In' : 'Register' }}</button>    

      <p @click="toggleForm()" >
        <span>
          {{ loginPage ? "Don't have an account? " : "Already have an account? " }}
        </span>
        <span class="switch-link">
          {{ loginPage ? "Register" : "Sign In" }}
        </span>
      </p>


    </form>
    </div>
</template>
