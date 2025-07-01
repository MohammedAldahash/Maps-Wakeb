<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const email = ref('')
const password = ref('')
const router = useRouter()
const isLogin = ref(false)
function toggleForm(){
  if(isLogin.value){
    isLogin.value = false
  }else{
    isLogin.value = true
  }
}
function handleLogin(){
    fetch('http://localhost:3001/users')
  .then(res => res.json())
  .then(users => {
    const user = users.find(u => u.email === email.value && u.password === password.value)
    if (user) {
      router.push('/map')
    } else {
      alert('Invalid credentials')
    }
  })
}
function handleRegister(){
  fetch('http://localhost:3001/users', {
  })
}
</script>


<template>
    <div class="content">

    <form @submit.prevent="isLogin? handleLogin(): handleRegister()" class="login-form">
        <h2>{{ isLogin ? 'Sign In' : 'Register' }}</h2>
        <hr/>
        <template v-if="!isLogin">
        <label>your name: </label>
        <input v-model="name" type="text" placeholder="Full Name..." required />
        </template>

        <label>your email: </label>
        <input v-model="email" type="email" placeholder="Email..." required/>
        <label >Your password: </label>
        <input v-model="password" type="password" placeholder="Password..." required/>
        
        <template v-if="!isLogin">
          <label>confirm password: </label>
        <input v-model="password" type="password" placeholder="Confirm Password..." required/>
        </template>

      <button type="submit">{{ isLogin ? 'Sign In' : 'Register' }}</button>    

      <p @click="toggleForm()" class="switch-link">
      {{ isLogin ? "Don't have an account? Register" : "Already have an account? Sign In" }}
    </p>

    </form>
    </div>
</template>

<style>
.content{
    display: flex; 
    justify-content: center;
     justify-items: center;
}
.login-form {
  width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background-color: rgb(39, 46, 56);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0,0,0.7);
  color: white;
  border: none;

}

.login-form input,
.login-form button {
  padding: 10px;
  font-size: 1rem;
  border-radius: 10px;
  color: black;
  border: none;

}
.login-form h2{
    font-weight: bold;          /* Makes the text bold */
    text-align: center;

}

.login-form button {
  background-color: rgb(72, 105, 151);
  color: white;
  font-weight: bold;          /* Makes the text bold */
  border: none;               /* Removes default border */
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth hover */
  box-shadow: 0 4px 10px rgba(0, 0,0,0.3);

}
.switch-link:hover{
  cursor: pointer;
  color: rgb(115, 145, 244);
}
.login-form button:hover {
  background-color: rgb(58, 85, 125); /* Darker on hover */
}
</style>