<script setup>
import { ref } from 'vue'
import { name, email, password, useUser } from '@/composables/usersStore'
import "@/assets/styles/ProfilePage.css"; // Import your styles
const { setName, setEmail, setPassword } = useUser()

const localName = ref(name.value)
const localEmail = ref(email.value)

const editing = ref(false)
const changingPassword = ref(false)

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const message = ref('')
const error = ref('')

function toggleEdit() {
  editing.value = !editing.value
}

function saveChanges() {
  error.value = ''
  message.value = ''

  setName(localName.value)
  setEmail(localEmail.value)
  message.value = 'Profile updated successfully.'
  editing.value = false
}

function changePassword() {
  error.value = ''
  message.value = ''

  if (oldPassword.value !== password.value) {
    error.value = 'Old password is incorrect.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'New passwords do not match.'
    return
  }

  setPassword(newPassword.value)
  message.value = 'Password updated successfully.'

  oldPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  changingPassword.value = false
}
</script>

<template>
  <div class="left-panel">
    <h2>Profile info</h2>

    <div v-if="!editing" class="user-info">
      <p><strong>Name:</strong> {{ localName }}</p>
      <p><strong>Email:</strong> {{ localEmail }}</p>
    </div>

    <div v-else class="edit-form">
      <label>Name:</label>
      <input v-model="localName" />

      <label>Email:</label>
      <input v-model="localEmail" />
    </div>

    <div class="buttons">
      <button @click="editing ? saveChanges() : toggleEdit()">
        {{ editing ? 'Save Changes' : 'Edit Profile' }}
      </button>
      <button v-if="editing" @click="toggleEdit">Cancel</button>
    </div>

    <br />
    <hr />

    <div class="password-section">
      <button @click="changingPassword = !changingPassword">
        {{ changingPassword ? 'Cancel Password Change' : 'Change Password' }}
      </button>

      <div v-if="changingPassword" class="password-form">
        <label>Old Password:</label>
        <input type="password" v-model="oldPassword" />

        <label>New Password:</label>
        <input type="password" v-model="newPassword" />

        <label>Confirm New Password:</label>
        <input type="password" v-model="confirmPassword" />

        <button @click="changePassword">Update Password</button>
      </div>
    </div>

    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>


<!-- 
<style scoped>


.left-panel{
  flex: 1;
  min-width: 320px;
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.user-info p {
  margin: 0.5rem 0;
}

.edit-form label,
.password-form label {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.edit-form input,
.password-form input {
  width: 100%;
  padding: 0.4rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #2a2a2a;
  color: white;
}

.buttons,
.password-section {
  margin-top: 1rem;
}

button {
  background-color: #2979ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-right: 0.5rem;
  cursor: pointer;
}

button:hover {
  background-color: #1565c0;
}

.success {
  color: lightgreen;
}

.error {
  color: salmon;
}

.toggle-btn {
  margin-bottom: 1rem;
  background-color: #444;
}


</style> -->