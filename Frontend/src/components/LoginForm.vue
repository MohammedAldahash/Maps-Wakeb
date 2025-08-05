<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isLogedin, useUser } from '@/composables/usersStore';
import "@/assets/styles/LoginForm.css";
const {email, password, loginPage, name, setCurrentUser, setEmail, setName, setPassword} = useUser();
const router = useRouter()
const confirmPassword = ref('')
function toggleForm(){
  if(loginPage.value){
    loginPage.value = false
  }else{
    loginPage.value = true
  }
}
function handleLogin(){
    fetch('http://localhost:3001/users')
  .then(res => res.json())
  .then(users => {
    const user = users.find(u => u.email === email.value && u.password === password.value)
    if (user) {
      isLogedin.value = true
      setCurrentUser(user)
      setEmail(user.email);
      setName(user.name);
      setPassword(user.password);
      router.push('/map')
    } else {
      alert('Invalid credentials')
    }
  })
}
function handleRegister(){
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }
  fetch('http://localhost:3001/users')
    .then(res => res.json())
    .then(users => {
      const exists = users.find(u => u.email === email.value);
      if (exists) {
        alert('Email already registered.');
        return;
      }
    const newUser = {
        id: Date.now(),
        name: name.value,
        email: email.value,
        password: password.value,
        admin: false
      };

      fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(res => {
          if (res.ok) {
            alert('Registered successfully!');
            loginPage.value = true; // switch to login view
          } else {
            alert('Registration failed.');
          }
        });
    })
    .catch(() => {
      alert('Registration failed. Please try again.');
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
<!-- 
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
</style> -->